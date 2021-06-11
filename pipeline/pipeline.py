import json
from FtpClient import FtpClient

def main():
    # endpoint to connect to
    url = 'data.asc-csa.gc.ca'
    path = '/users/OpenData_DonneesOuvertes/pub/MOPITT'

    # change to your paths 
    csvpath = "/home/benjo/ausbildung/fhsalzburg/6.Semester/deepData/orbital-penguin/pipeline/data/MOPITT/2019"
    jsonpath = "./co2"
    try:    
        pipeline = FtpClient(url, path)
        print("start converting to json")
        pipeline.convertCsv(csvpath, jsonpath)
    except Exception as e:
        print(e)

if __name__ == '__main__':
    main()