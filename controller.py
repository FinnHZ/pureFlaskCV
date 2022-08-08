from flask import Blueprint, flash, redirect
from flask import render_template, request, url_for, session
import json
import csv
from modules.constantStore import accessDocument, experiencePath, basicInfoPath, summaryInfoPath, educationInfoPath, workInfoPath, skillsPath, collectionPath
from modules.readData import ReadData
import os



cv_controller = Blueprint('cv_controller', __name__, template_folder='templates')

docContents = ReadData(experiencePath, basicInfoPath, summaryInfoPath, educationInfoPath, workInfoPath, skillsPath, collectionPath)
experienceInfo = docContents.expRead()
basicInfo = docContents.basicRead()
summaryInfo = docContents.sumRead()
educationInfo = docContents.eduRead()
workDetailInfo = docContents.workRead()
skillsDataSetInfo = docContents.skillRead()
collectionsDataInfo = docContents.collectionRead()

@cv_controller.route('/', methods = ['GET','POST'])
def login():
    return render_template('login.html')


@cv_controller.route('/loginValidate', methods = ['GET','POST'])
def loginValidate():
    if request.method == "POST":
        userName = request.form.get("username")
        password = request.form.get("password")
        loginData = [userName, password]
        # loginContent = None
        file = open (accessDocument)
        loginContent = csv.reader(file)
            
        if loginData in loginContent:
            file.close()
            session['username'] = loginData[0]
            deliveryDict = {"info": loginData[0]}
            return render_template("home.html", validateInfo = json.dumps(deliveryDict))
        else:
            flash("Sorry, please enter the valid username/password or contact with me!")
            return redirect(url_for('cv_controller.login' ))


@cv_controller.route('/logout', methods = ['GET','POST'])
def logout():
        data_ajax = request.get_json()
        logoutCmd = str(data_ajax['logout_json'])
        if logoutCmd == "logout":
            session.pop('username')
            delivery_logout = {}
            delivery_logout['cmd'] = "logout"

            ddelivery_logout_json = json.dumps(delivery_logout)

            return ddelivery_logout_json





@cv_controller.route('/home', methods = ['GET','POST'])  #/home
def home():
    try:
        if session['username'] != None:
            # deliveryDict = {"info": session['username']}
            # return render_template("home.html", validateInfo = json.dumps(deliveryDict))
            return render_template("home.html")
    except:
        return redirect(url_for('cv_controller.login' ))

@cv_controller.route('/information', methods = ['GET','POST'])
def information():

    job_basic = basicInfo["jobList"]
    link_basic = basicInfo["linkList"]
    text_basic = basicInfo["textList"]
    summary_basic = summaryInfo

    educationDicList = educationInfo

    workInfo = workDetailInfo

    skillsInfo = skillsDataSetInfo[0]

    try:
        if session['username'] != None:
            # deliveryDict = {"info": session['username']}
            # return render_template('information.html', job_basic = job_basic, link_basic = link_basic, text_basic = text_basic, summary_basic = summary_basic,
            #                     educationDicList = educationDicList, workInfo = workInfo, skillsInfo = skillsInfo, validateInfo = json.dumps(deliveryDict))
            return render_template('information.html', job_basic = job_basic, link_basic = link_basic, text_basic = text_basic, summary_basic = summary_basic,
                                educationDicList = educationDicList, workInfo = workInfo, skillsInfo = skillsInfo)
    except:
        return redirect(url_for('cv_controller.login' ))
    
    




@cv_controller.route("/changeWorkPage", methods=['GET','POST'])
def changeWorkPage():
    if request.method == "POST":
        # obj = json.loads(request.form.get("pageNum_json"))     # another method for receiving another kind of json data from ajax.
        data_ajax = request.get_json()
        pageNum = str(data_ajax['pageNum_json'])


        workInfo = workDetailInfo

        currentWorkInfo = workInfo[int(pageNum)-1]
        
        delivery_workPage = {}
        delivery_workPage['pageInfo'] = currentWorkInfo

        delivery_workPage_json = json.dumps(delivery_workPage)

        return delivery_workPage_json


@cv_controller.route("/changeEduPage", methods=['GET','POST'])
def changeEduPage():
    if request.method == "POST":
        # obj = json.loads(request.form.get("pageNum_json"))     # another method for receiving another kind of json data from ajax.
        data_ajax = request.get_json()
        pageNum = str(data_ajax['pageNum_json'])

        educationDicList = educationInfo
        
        currentEduInfo = educationDicList[int(pageNum)-1]
        
        delivery_eduPage = {}
        delivery_eduPage['pageInfo'] = currentEduInfo

        delivery_eduPage_json = json.dumps(delivery_eduPage)

        return delivery_eduPage_json







#skill           ##############################################

@cv_controller.route('/skills', methods = ['GET','POST'])
def skills():
    expInfo = experienceInfo

    skills_1 = skillsDataSetInfo[1]
    skills_2 = skillsDataSetInfo[2]
    
    colKnowledges = collectionsDataInfo
    try:
        if session['username'] != None:
            # 变量名 = json.dumps(要传递的数据)  下面这种形式是用于传递JSON数据给前端js解析使用，要传递的数据这里可以是任何形式，不一定要字典类型！！
            # deliveryDict = {"info": session['username']}
            # return render_template('skills.html', expInfo = expInfo, colKnowledges = colKnowledges, skillsDetail = json.dumps(skills_1), skillsDis = json.dumps(skills_2), validateInfo = json.dumps(deliveryDict))
            return render_template('skills.html', expInfo = expInfo, colKnowledges = colKnowledges, skillsDetail = json.dumps(skills_1), skillsDis = json.dumps(skills_2))
    except:
        return redirect(url_for('cv_controller.login' ))



@cv_controller.route("/changeExpPage", methods=['GET','POST'])
def changeExpPage():
    if request.method == "POST":
        # obj = json.loads(request.form.get("pageNum_json"))     # another method for receiving another kind of json data from ajax.
        data_ajax = request.get_json()
        pageNum = str(data_ajax['pageNum_json'])

        expInfo = experienceInfo

        currentExpInfo = expInfo[int(pageNum)-1]
        
        delivery_expPage = {}
        delivery_expPage['pageInfo'] = currentExpInfo

        delivery_expPage_json = json.dumps(delivery_expPage)

        return delivery_expPage_json




#settings           ##############################################
@cv_controller.route("/settings", methods=['GET','POST'])
def settings():
    file = open (accessDocument)
    accessContent = list(csv.reader(file))
    
    for i in range(0, len(accessContent)):
        accessContent[i].append(i+1)

    print(session['username'])

    try:
        if session['username'] == 'Finn':
            # deliveryDict = {"info": session['username']}
            # return render_template('settings.html', accessList = accessContent, validateInfo = json.dumps(deliveryDict))
            return render_template('settings.html', accessList = accessContent)
    except:
        return redirect(url_for('cv_controller.login' ))


@cv_controller.route("/settingsChange", methods=['GET','POST'])
def settingsChange():
    if request.method == "POST":
        usersData = request.get_json()
        usersList = usersData['users_json']
        updateResult = 0
        if os.path.exists(accessDocument):
            os.remove(accessDocument)
        
        with open(accessDocument, "w", encoding="utf8", newline="") as f:
            newFile = csv.writer(f)
            newFile.writerows(usersList)
        
        updateResult = 1
        delivery_updateResult = {}
        delivery_updateResult['result'] = updateResult
        delivery_updateResult_json = json.dumps(delivery_updateResult)
        return delivery_updateResult_json


@cv_controller.route("/settingsValidate", methods=['GET','POST'])
def settingsValidate():
    if request.method == "POST":
        validateInfo = request.get_json()
        infoList = validateInfo["setting_json"]
        delivery_validate = {}

        file_author = open (accessDocument)
        authorContent = list(csv.reader(file_author))
        requireName = authorContent[0][0]
        requirePass = authorContent[0][1]

        print(requireName, requirePass)


        if infoList[0] == requireName and infoList[1] == requirePass:
            delivery_validate['result'] = "1"
            session['username'] = 'Finn'
        else:
            delivery_validate['result'] = "0"

        delivery_validate_json = json.dumps(delivery_validate)
        
        return delivery_validate_json

