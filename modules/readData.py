import pandas as pd


class ReadData:
    def __init__(self, expPath, basicPath, sumPath, eduPath, workPath, skillPath) -> None:
        self.expPath = expPath
        self.basicPath = basicPath
        self.sumPath = sumPath
        self.eduPath = eduPath
        self.workPath = workPath
        self.skillPath = skillPath

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

    def eduRead(self):
        df_edu = pd.read_excel(self.eduPath)
        eduDataContent = df_edu.values
        eduInfoList = []

        for i in range(0, len(eduDataContent)):
            itemDict = {}
            for j in range(0, len(eduDataContent[i])):
                cellContent = eduDataContent[i][j]
                if j == 0:
                    itemDict["id"] = cellContent
                elif j == 1:
                    itemDict["uni"] = cellContent
                elif j == 2:
                    itemDict["date"] = cellContent
                elif j == 3:
                    itemDict["degree"] = cellContent
                elif j == 4:
                    itemDict["major"] = cellContent
            eduInfoList.append(itemDict)

        return eduInfoList

    def workRead(self):
        df_work = pd.read_excel(self.workPath)
        workDataContent = df_work.values
        workInfoList = []

        for i in range(0, len(workDataContent)):
            itemDict = {}
            for j in range(0, len(workDataContent[i])):
                cellContent = workDataContent[i][j]
                if j == 0:
                    itemDict["id"] = cellContent
                elif j == 1:
                    itemDict["workCompany"] = cellContent
                elif j == 2:
                    itemDict["workDate"] = cellContent
                elif j == 3:
                    itemDict["workPosition"] = cellContent
                elif j == 4:
                    cellContentList = list(cellContent.split("."))
                    itemDict["workDescription"] = cellContentList
            workInfoList.append(itemDict)

        return workInfoList

    def skillRead(self):
        df_skill = pd.read_excel(self.skillPath)
        skillDataContent = df_skill.values
        skills_0 = []
        skills_1 = {}
        skills_2 = []

        #generate skills_0
        for i in range(0, len(skillDataContent)):
            sk0List = []
            for j in range(0, len(skillDataContent[i])):
                cellContent = skillDataContent[i][j]
                if j == 0:
                    sk0List.append(cellContent)
                else:
                    cellContentList = list(cellContent.split(';'))
                    if j == 2:
                        cellContentList = list(map(lambda x: int(x), cellContentList))
                    sk0List.append(cellContentList)
            skills_0.append(sk0List)


        
        #generate skills_1  & #generate skills_2
        for item in skills_0:
            skills_1[item[0]] = item
            sk2Dict = {}
            sk2Dict["value"] = sum(item[2])
            sk2Dict["name"] = item[0]
            skills_2.append(sk2Dict)

        return [skills_0,skills_1,skills_2]
