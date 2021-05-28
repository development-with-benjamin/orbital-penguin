import sys
import os
from ftplib import FTP
from multiprocessing import cpu_count
import pandas
import json
import threading

# FTP client that downloads a folder from a remote host
class FtpClient(FTP):
    def __init__(self, url: str, path=''):
        super().__init__(url)
        self.__url = url
        self.__REMOTE_DATA_PATH = path
        self.__LOCAL_DATA_PATH = os.path.dirname(os.path.abspath(__file__)) + '/data'
        self.__mkdir(self.__LOCAL_DATA_PATH)

        self.data = []
        try:
            self.login()
            self.enumerate(self.__REMOTE_DATA_PATH, self.__LOCAL_DATA_PATH)
            self.close()
        except Exception as e:
            print(e)

    def enumerate(self, remotePath: str, localPath: str) -> None:
        try:
            self.cwd(remotePath)
            workingDir = remotePath
            directories = self.nlst()
            localPath = localPath + '/' + workingDir.split('/')[-1]
            self.__mkdir(localPath)
            for element in directories:
                # element is a a file 
                if element.find('.') != -1:
                    self.retrieve(element, localPath, workingDir)
                else:
                    remotePath = workingDir + '/' + element
                    self.enumerate(remotePath, localPath)
        except Exception as e:
            raise e

    def retrieve(self, file, localPath, remotePath) -> None:
        localFile = localPath + '/' + file
        if os.path.isfile(localFile):
            return
        remoteFile = remotePath + '/' + file
        filehandle = open(localFile, mode='wb')
        print(localFile) # debugging and kinda progress status
        try:
            self.retrbinary(f'RETR {remoteFile}', filehandle.write)
        except Exception as e:
            raise Exception('RETR: ' + e.args)
        filehandle.close()

    """
    @brief iterates through a folder and converts content of csv files into a json file. Uses always as many threads as cores are on the system 
    @param string fromPath      system path from where csv files should be read.
    @param string toPath        system path where json file should be safed.
    """
    def searchCsv(self, fromPath: str, toPath: str) -> None:
        files = os.listdir(fromPath)
        numberCpus = cpu_count()
        _files = list(self.__divideList(files, numberCpus))

        threads = []
        for fileset in _files:
            threads.append(threading.Thread(target=self.__searchCsv, args=(fromPath, toPath, fileset)))
            threads[-1].start()

        for th in threads:
            th.join()
            
        with open(toPath, mode='w') as jsonfile:
            json.dump(self.data, jsonfile)

    """
    @brief iterates through a folder and loads content of a single csv into memory
    """
    def __searchCsv(self, fromPath: str, toPath: str, files: list) -> None:
        for file in files:
            if file[-4:] == ".csv":
                csvpath = fromPath + "/" + file
                self.convertCsv2Json(csvpath)
        
    def convertCsv2Json(self, csvpath: str) -> None:
        date = self.__getDateFromFileNameInPath(csvpath)
        dataPoints = []
        df = pandas.read_csv(csvpath)
        df.drop(df.columns.difference(['# Latitude',' Longitude', ' COTotalColumn']), 1, inplace=True)
        for i, row in df.iterrows():
            dataPoint = {
                'value': row[' COTotalColumn'],
                'lng': row[' Longitude'],
                'lat': row['# Latitude']
            }
            dataPoints.append(dataPoint)
        
        dataset = {
            'date': date,
            'data': dataPoints
        }
        self.data.append(dataset)

    def __getFileNameFromPath(self, path: str) -> str:
        list = path.split('/')
        return list[-1]

    def __getDateFromFileNameInPath(self, path: str) -> str:
        filename = self.__getFileNameFromPath(path)
        return filename[7:11] + '-' + filename[12:14] + '-' + filename[15:17]

    def __mkdir(self, path: str) -> None:
        if(not os.path.isdir(path)):
            os.mkdir(path)  
    
    """
    @brief divides a list into a list of sublists
    """
    def __divideList(self, l, n):  
        for i in range(0, len(l), n): 
            yield l[i:i + n]
    
