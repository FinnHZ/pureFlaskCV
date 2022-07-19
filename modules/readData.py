import pandas as pd


class ReadData:
    def __init__(self, expPath, basicPath, sumPath) -> None:
        self.expPath = expPath
        self.basicPath = basicPath
        self.sumPath = sumPath

    def expRead(self):
        df_exp = pd.read_excel(self.expPath)
        expDataContent = df_exp.values
        expInfoList = []

        for i in range(0, len(expDataContent)):
            itemDict = {}
            for j in range(0, len(expDataContent[i])):
                cellContent = expDataContent[i][j]
                if j == 0:
                    itemDict["id"] = cellContent
                elif j == 1:
                    itemDict["expCompany"] = cellContent
                elif j == 2:
                    itemDict["expDate"] = cellContent
                elif j == 3:
                    itemDict["expPosition"] = cellContent
                elif j == 4:
                    itemDict["expSkills"] = cellContent
                elif j == 5:
                    itemDict["expTitle"] = cellContent
                elif j == 6:
                    cellContentList = list(cellContent.split("."))
                    itemDict["expDescription"] = cellContentList
            expInfoList.append(itemDict)

        return expInfoList

    def basicRead(self):
        df_ba = pd.read_excel(self.basicPath)
        basicDataContent = df_ba.values
        basicInfoList = {}
        jobList = []
        linkList = []
        textList = []

        for i in range(0, len(basicDataContent)):
            basicItem = basicDataContent[i]
            if i == 0:
                for j in range(0, len(basicItem)):
                    jobList.append(basicItem[j])
                basicInfoList["jobList"] = jobList
            elif i == 1:
                for j in range(0, len(basicItem)):
                    linkList.append(basicItem[j])
                basicInfoList["linkList"] = linkList
            else:
                textItem = []
                for j in range(0, len(basicItem)):
                    textItem.append(basicItem[j])
                textList.append(textItem)
        basicInfoList["textList"] = textList
        return basicInfoList
                
    def sumRead(self):
        df_su = pd.read_excel(self.sumPath)
        sumDataContent = df_su.values
        sumInfoList = []

        for i in range(0, len(sumDataContent)):
            sumItem = sumDataContent[i]
            temItem = []
            for j in range(0, len(sumItem)):
                temItem.append(sumItem[j])
            sumInfoList.append(temItem)
        return sumInfoList
