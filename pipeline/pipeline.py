import sys
import os
from ftplib import FTP

class Pipeline(FTP):
    def __init__(self, url: str, path=''):
        super().__init__(url)
        self.__url = url
        self.__REMOTE_DATA_PATH = path
        self.__LOCAL_DATA_PATH = os.path.dirname(os.path.abspath(__file__)) + '/data'
        self.__mkdir(self.__LOCAL_DATA_PATH)
        try:
            self.login()
            self.enumerate(self.__REMOTE_DATA_PATH, self.__LOCAL_DATA_PATH)
            self.close()
        except Exception as e:
            print(e)

    def enumerate(self, remotePath: str, localPath) -> None:
        try:
            self.cwd(remotePath)
            workingDir = self.pwd()
            directories = self.nlst()
            localPath = localPath + '/' + workingDir.split('/')[-1]
            self.__mkdir(localPath)
            for element in directories:
                # element is a a file 
                if element.find('.') != -1:
                    self.retrieve(element, localPath, workingDir)
                else:
                    self.enumerate(element, localPath)
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
            print('RETR')
            print(e)
        filehandle.close()

    def __mkdir(self, path: str) -> None:
        if(not os.path.isdir(path)):
            os.mkdir(path)  

def main():
    url = 'data.asc-csa.gc.ca'
    path = 'users/OpenData_DonneesOuvertes/pub/MOPITT'
    try:    
        p = Pipeline(url, path)

    except Exception as e:
        print(e)

if __name__ == '__main__':
    main()