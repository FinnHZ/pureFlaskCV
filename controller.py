from multiprocessing.sharedctypes import RawValue
import re
from flask import Blueprint, flash, redirect
from flask import render_template, jsonify, request, url_for
import json
from flask_mail import Mail, Message
import csv
from modules.constantStore import accessDocument, experiencePath, basicInfoPath, summaryInfoPath
from modules.readData import ReadData
import os



cv_controller = Blueprint('cv_controller', __name__, template_folder='templates')

docContents = ReadData(experiencePath, basicInfoPath, summaryInfoPath)
experienceInfo = docContents.expRead()
basicInfo = docContents.basicRead()
summaryInfo = docContents.sumRead()

@cv_controller.route('/', methods = ['GET','POST'])
def login():

    return render_template('login.html')


@cv_controller.route('/loginValidate', methods = ['GET','POST'])
def loginValidate():
    if request.method == "POST":
        userName = request.form.get("username")
        password = request.form.get("password")
        loginData = [userName,password]
        # loginContent = None
        file = open (accessDocument)
        loginContent = csv.reader(file)
            
        if loginData in loginContent:
            file.close()
            return render_template("home.html")
        else:
            flash("Sorry, please enter the valid username/password or contact with me!")
            return redirect(url_for('cv_controller.login' ))



@cv_controller.route('/home', methods = ['GET','POST'])  #/home
def home():
    return render_template('home.html')

@cv_controller.route('/information', methods = ['GET','POST'])
def information():

    job_basic = basicInfo["jobList"]
    link_basic = basicInfo["linkList"]
    text_basic = basicInfo["textList"]
    summary_basic = summaryInfo


    educationDicList = [
        {
          "id": "1",
          "uni": "Lincoln University", "date":"Nov 2020 - Feb 2022", 
          "degree":"Master of Computer Applications - MCA", 
          "major":"Advanced Programming, Arc GIS, Industry Project, Software Development, Studio Project, Business Analysis"
        },
        {
          "id": "2",
          "uni": "Xihua University", 
          "date":"Sep 2009 - Jun 2013  ", 
          "degree":"Bachelor of Engineering (Automation Engineer Technology/Technician)", 
          "major":"Advanced Mathematics, Neural Networks(basic), PLC, C++(basic), VB(basic ), Analog electronic circuit, Digital electronic circuit, Circuit principle"
        },
    ]

    workInfo = [ 
      {
        "id": "1",
        "workCompany": "Hongfujin Precision Electronics(Chengdu)Co.,Ltd , China", 
        "workDate": "Oct 2013 - July 2014", 
        "workPosition": "Automatic Engineer", 
        "workDescription": ["Be responsible for maintenance for the iPad production line."]
      },
      {
        "id": "2",
        "workCompany": "China National Tobacco Corporation , China", 
        "workDate": "Aug 2014 - Feb 2018", 
        "workPosition": " Management Staff", 
        "workDescription": ["Be responsible for tobacco product sales work and sales data analysis."]
      },
      {
        "id": "3",
        "workCompany": "Trip.com Group , China", 
        "workDate": "Mar 2018 - Oct 2019", 
        "workPosition": "Product Manager", 
        "workDescription": ["Be responsible for hotel product development and assist over 100 hotels in analyzing hotel operational data and operating hotels."]
      },
      {
        "id": "4",
        "workCompany": "AuCom electronics Ltd , Canterbury", 
        "workDate": "July 2021- present", 
        "workPosition": "Intern -> Graduate", 
        "workDescription": ["Be responsible for data upload and background management system developments and machine process system improvement work."]
      }
    ]


    skillsInfo =  [
        ["Language", ["Python", "HTML", "CSS", "JavaScript", "C#"]],
        ["Frameworks/libraries", ["Flask", "jQuery", "react", "Tkinter", "eChart", "Matplotlib"]],
        ["Database", ["PostgreSQL", "Microsoft SQL server"]],
        ["Tools", ["Jira", "Git/GitHub", "ArcGIS", "Apache"]]
    ]


    return render_template('information.html', job_basic = job_basic, link_basic = link_basic, text_basic = text_basic, summary_basic = summary_basic,
                                               educationDicList = educationDicList, workInfo = workInfo, skillsInfo = skillsInfo)



@cv_controller.route("/changeWorkPage", methods=['GET','POST'])
def changeWorkPage():
    if request.method == "POST":
        # obj = json.loads(request.form.get("pageNum_json"))     # another method for receiving another kind of json data from ajax.
        data_ajax = request.get_json()
        pageNum = str(data_ajax['pageNum_json'])

        workInfo = [ 
          {
            "id": "1",
            "workCompany": "Hongfujin Precision Electronics(Chengdu)Co.,Ltd , China", 
            "workDate": "Oct 2013 - July 2014", 
            "workPosition": "Automatic Engineer", 
            "workDescription": ["Be responsible for maintenance for the iPad production line."]
          },
          {
            "id": "2",
            "workCompany": "China National Tobacco Corporation , China", 
            "workDate": "Aug 2014 - Feb 2018", 
            "workPosition": " Management Staff", 
            "workDescription": ["Be responsible for tobacco product sales work and sales data analysis."]
          },
          {
            "id": "3",
            "workCompany": "Trip.com Group , China", 
            "workDate": "Mar 2018 - Oct 2019", 
            "workPosition": "Product Manager", 
            "workDescription": ["Be responsible for hotel product development and assist over 100 hotels in analyzing hotel operational data and operating hotels."]
          },
          {
            "id": "4",
            "workCompany": "AuCom electronics Ltd , Canterbury", 
            "workDate": "July 2021- present", 
            "workPosition": "Intern -> Graduate", 
            "workDescription": ["Be responsible for data upload and background management system developments and machine process system improvement work."]
          }
        ]
        
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

        educationDicList = [
            {
              "id": "1",
              "uni": "Lincoln University", "date":"Nov 2020 - Feb 2022", 
              "degree":"Master of Computer Applications - MCA", 
              "major":"Advanced Programming, Arc GIS, Industry Project, Software Development, Studio Project, Business Analysis"
            },
            {
              "id": "2",
              "uni": "Xihua University", 
              "date":"Sep 2009 - Jun 2013  ", 
              "degree":"Bachelor of Engineering (Automation Engineer Technology/Technician)", 
              "major":"Advanced Mathematics, Neural Networks(basic), PLC, C++(basic), VB(basic ), Analog electronic circuit, Digital electronic circuit, Circuit principle"
            },
        ]
        
        currentEduInfo = educationDicList[int(pageNum)-1]
        
        delivery_eduPage = {}
        delivery_eduPage['pageInfo'] = currentEduInfo

        delivery_eduPage_json = json.dumps(delivery_eduPage)

        return delivery_eduPage_json







###############################################

@cv_controller.route('/skills', methods = ['GET','POST'])
def skills():
     
    expInfo = experienceInfo


    skills_1 = {  
                "Language": ["Language", ["Python", "HTML", "CSS", "JavaScript", "C#"], [1,2,3,4,5]],
                "Frameworks/libraries": ["Frameworks/libraries", ["Flask", "jQuery", "react", "Tkinter", "eChart", "Matplotlib"],[1,2,3,4,5,6]],
                "Database": ["Database", ["PostgreSQL", "Microsoft SQL server"],[1,2]],
                "Tools": ["Tools", ["Jira", "Git/GitHub", "ArcGIS", "Apache"],[1,2,3,4]]
              }
    
    skills_2 = [   
                { "value": 5, "name": 'Language' },
                { "value": 6, "name": 'Frameworks/libraries' },
                { "value": 2, "name": 'Database' },
                { "value": 4, "name": 'Tools' }
            ]

    colKnowledges = [["1", "know ledg exx xxxx xxx xxx xxxx xxxxx xxxxx xxxxx xxxxx xxxx xxxxx xxxxxx xxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxx", "type", "knowledge location"], ["2", "content1", "content2", "content3ssssssssssssssssssssssssssssssss"],
    ["q1", "knowledge brief description", "type", "knowledge location"], ["q2", "content1", "content2", "content3"],
    ["w1", "knowledge brief description", "type", "knowledge location"], ["w2", "content1", "content2", "content3"],
    ["e1", "knowledge brief description", "type", "knowledge location"], ["e2", "content1", "content2", "content3"],
    ["r1", "knowledge brief description", "type", "knowledge location"], ["r2", "content1", "content2", "content3"],
    ["t1", "knowledge brief description", "type", "knowledge location"], ["t2", "content1", "content2", "content3"],
    ["y1", "knowledge brief description", "type", "knowledge location"], ["y2", "content1", "content2", "content3"],
    ["u1", "knowledge brief description", "type", "knowledge location"], ["u2", "content1", "content2", "content3"],
    ["i1", "knowledge brief description", "type", "knowledge location"], ["i2", "content1", "content2", "content3"],
    ["o1", "knowledge brief description", "type", "knowledge location"], ["o2", "content1", "content2", "content3"],
    ["p1", "knowledge brief description", "type", "knowledge location"], ["p2", "content1", "content2", "content3"],
    ["a1", "knowledge brief description", "type", "knowledge location"], ["a2", "content1", "content2", "content3"],
    ["s1", "knowledge brief description", "type", "knowledge location"], ["s2", "content1", "content2", "content3"],
    ["d1", "knowledge brief description", "type", "knowledge location"], ["d2", "content1", "content2", "content3"],
    ["f1", "knowledge brief description", "type", "knowledge location"], ["f2", "content1", "content2", "content3"],
    ["g1", "knowledge brief description", "type", "knowledge location"], ["g2", "content1", "content2", "content3"],
    ["h1", "knowledge brief description", "type", "knowledge location"], ["h2", "content1", "content2", "content3"],
    ["j1", "knowledge brief description", "type", "knowledge location"], ["j2", "content1", "content2", "content3"],
    ["k1", "knowledge brief description", "type", "knowledge location"], ["k2", "content1", "content2", "content3"],
    ["l1", "knowledge brief description", "type", "knowledge location"], ["l2", "content1", "content2", "content3"],
    ["z1", "knowledge brief description", "type", "knowledge location"], ["z2", "content1", "content2", "content3"],
    ["x1", "knowledge brief description", "type", "knowledge location"], ["x2", "content1", "content2", "content3"],
    ["c1", "knowledge brief description", "type", "knowledge location"], ["c2", "content1", "content2", "content3"],
    ["v1", "knowledge brief description", "type", "knowledge location"], ["v2", "content1", "content2", "content3"],
    ["b1", "knowledge brief description", "type", "knowledge location"], ["b2", "content1", "content2", "content3"],
    ["n1", "knowledge brief description", "type", "knowledge location"], ["n2", "content1", "content2", "content3"],
    ["m1", "knowledge brief description", "type", "knowledge location"], ["m2", "content1", "content2", "content3"],
    ["*1", "knowledge brief description", "type", "knowledge location"], ["*2", "content1", "content2", "content3"]
  ] 


    # 变量名 = json.dumps(要传递的数据)  下面这种形式是用于传递JSON数据给前端js解析使用，要传递的数据这里可以是任何形式，不一定要字典类型！！！
    return render_template('skills.html', expInfo = expInfo, colKnowledges = colKnowledges, skillsDetail = json.dumps(skills_1), skillsDis = json.dumps(skills_2))



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

@cv_controller.route("/settings", methods=['GET','POST'])
def settings():
    file = open (accessDocument)
    accessContent = list(csv.reader(file))
    
    for i in range(0, len(accessContent)):
        accessContent[i].append(i+1)
        
    return render_template('settings.html', accessList = accessContent)


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
        if infoList[0] == "Finn" and infoList[1] == "1234567890!@#$%^&*()":
            delivery_validate['result'] = "1"
        else:
            delivery_validate['result'] = "0"

        delivery_validate_json = json.dumps(delivery_validate)
        
        return delivery_validate_json

