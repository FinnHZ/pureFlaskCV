from flask import Blueprint
from flask import render_template, jsonify, request
import json

cv_controller = Blueprint('cv_controller', __name__, template_folder='templates')

@cv_controller.route('/')
def login():
    return render_template('login.html')

@cv_controller.route('/home')
def home():
    return render_template('home.html')

@cv_controller.route('/information')
def information():

    #  the data below should be from excel/ csv or database  (method should be written in the modules folder)
    job_basic = ["Graduate", "Software Developer & Website full-stack Developer"]
    link_basic = ["https://www.linkedin.com/in/chiyu-he-3b1695232/","https://github.com/FinnHZ"]
    text_basic = [["Full Name:", "Chiyu He"], ["Prefer Name:", "Finn"], ["Address:", "35 Buffon St, Waltham, Christchurch, 8023"], ["E-mail:", "finn.he0102@gmail.com"]]
    summary_basic = [["sum1", "Over 50/% /of courses arrive A grade (4/6)."], ["sum2", "3 web projects development experience - full-stack developer."], ["sum3", "1 desk application development experience - software developer (tkinter )."], ["sum4", "1 C# .NET Framework solution improvement experience."], ["sum5", "Over half year internship experience."]]
    educationDicList = [
        {"uni": "Lincoln University", "date":"Nov 2020 - Feb 2022", "degree":"Master of Computer Applications - MCA", "magior":"Advanced Programming, Arc GIS, Industry Project, Software Development, Studio Project, Business Analysis"},
        {"uni": "Xihua University", "date":"Sep 2009 - Jun 2013  ", "degree":"Bachelor of Engineering (Automation Engineer Technology/Technician)", "magior":"Advanced Mathematics, Neural Networks(basic), PLC, C++(basic), VB(basic ), Analog electronic circuit, Digital electronic circuit, Circuit principle"},
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

    expInfo = [
      {
        "id":"1",
        "expCompany":"Lincoln University , Canterbury", 
        "expDate":"Mar 2021- Apr 2021", 
        "expPosition":"Full-stack developer",
        "expSkills":"Python, Flask, PostgreSQL, HTML, CSS, Jira, Git/GitHub",
        "expTitle": "A simulation web project for Lincoln University gym management system.",
        "expDescription":["Get the requirements from simulation customer's interview document.",
                        "Create an information management system with a different access level.",
                        "Features Include class booking, class management, finance management, member information management, and background service(e-mail and notification).", 
                        "Visualize the static data of the CSV file."
                      ]
      },
      {
        "id":"2",
        "expCompany":"Lincoln University , Canterbury", 
        "expDate":"May 2021 - Jun 2021", 
        "expPosition":"Full-stack except database", 
        "expSkills":"Python, Flask, PostgreSQL, HTML, CSS, eChart, JavaScript",
        "expTitle": "A data visualization web project for agriculture data.",
        "expDescription":["Organize the agriculture data and analyze it.",
                        "Visualize the agriculture data from a database.(line chart / bar chart).",
                      ]
      },
      {
        "id":"3",
        "expCompany":"AuCom Electronics Ltd , Canterbury", 
        "expDate":"Jul 2021 - Oct 2021", 
        "expPosition":"Full-stack developer", 
        "expSkills":"Python, Flask, Microsoft SQL server, HTML, CSS, jQuery, eChart, Apache",
        "expTitle": "Be responsible for hotel product development and assist over 100 hotels in analyzing hotel operational data and operating hotels.",
        "expDescription":["A data upload and management web system project.",
                        "Features for analyzing the data of a special type file and uploading it into the database.",
                        "Features for monitoring the process of upload and pass rate of the data in the database.",
                        "Features for exporting the data as CSV file.",
                        "Features for analyzing and visualizing the data.",
                        "Deploy the website on the server through Apache."
                        ]
      },
      {
        "id":"4",
        "expCompany":"AuCom Electronics Ltd , Canterbury", 
        "expDate":"Nov 2021 - Feb 2022", 
        "expPosition":" Software developer", 
        "expSkills":"Python, Tkinter, Matplsotlib",
        "expTitle": "A data upload and visualization desk application(software based on Matplsotlib) project.",
        "expDescription":["Features for analyzing the data and uploading it.",
                        "Features for monitoring and comparing the dynamic temperature data."
                      ]
      },
      {
        "id":"5",
        "expCompany":"AuCom Electronics Ltd , Canterbury", 
        "expDate":"Feb 2022 - present", 
        "expPosition":" Software developer", 
        "expSkills":" - C# .NET Framework",
        "expTitle": "The features extension for a hardware test software(based on .Net Framework).",
        "expDescription":["Fix older Bugs.",
                        "Make the process of machine work become automatic from manual."
                      ]
      },
      {
        "id":"6",
        "expCompany":"Self-employee , Canterbury", 
        "expDate":"Mar 2022 - present", 
        "expPosition":" Full-stack developer", 
        "expSkills":"Python, Flask, HTML, CSS, react, eChart, Git/GitHub",
        "expTitle": "Self CV Website",
        "expDescription":["Back-end data process",
                        "react front-end build",
                        "Dynamic validation features",
                        "Dynamic charts",
                        "Background management channel"
                      ]
      }
    ]



    return render_template('information.html', job_basic = job_basic, link_basic = link_basic, text_basic = text_basic, summary_basic = summary_basic,
                                               educationDicList = educationDicList, workInfo = workInfo, expInfo = expInfo)



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
        
        currentPageInfo = workInfo[int(pageNum)-1]
        
        delivery_workPage = {}
        delivery_workPage['pageInfo'] = currentPageInfo

        delivery_workPage_json = json.dumps(delivery_workPage)

        return delivery_workPage_json

@cv_controller.route("/changeExpPage", methods=['GET','POST'])
def changeExpPage():
    if request.method == "POST":
        # obj = json.loads(request.form.get("pageNum_json"))     # another method for receiving another kind of json data from ajax.
        data_ajax = request.get_json()
        pageNum = str(data_ajax['pageNum_json'])

        expInfo = [
          {
            "id":"1",
            "expCompany":"Lincoln University , Canterbury", 
            "expDate":"Mar 2021- Apr 2021", 
            "expPosition":"Full-stack developer",
            "expSkills":"Python, Flask, PostgreSQL, HTML, CSS, Jira, Git/GitHub",
            "expTitle": "A simulation web project for Lincoln University gym management system.",
            "expDescription":["Get the requirements from simulation customer's interview document.",
                            "Create an information management system with a different access level.",
                            "Features Include class booking, class management, finance management, member information management, and background service(e-mail and notification).", 
                            "Visualize the static data of the CSV file."
                          ]
          },
          {
            "id":"2",
            "expCompany":"Lincoln University , Canterbury", 
            "expDate":"May 2021 - Jun 2021", 
            "expPosition":"Full-stack except database", 
            "expSkills":"Python, Flask, PostgreSQL, HTML, CSS, eChart, JavaScript",
            "expTitle": "A data visualization web project for agriculture data.",
            "expDescription":["Organize the agriculture data and analyze it.",
                            "Visualize the agriculture data from a database.(line chart / bar chart).",
                          ]
          },
          {
            "id":"3",
            "expCompany":"AuCom Electronics Ltd , Canterbury", 
            "expDate":"Jul 2021 - Oct 2021", 
            "expPosition":"Full-stack developer", 
            "expSkills":"Python, Flask, Microsoft SQL server, HTML, CSS, jQuery, eChart, Apache",
            "expTitle": "Be responsible for hotel product development and assist over 100 hotels in analyzing hotel operational data and operating hotels.",
            "expDescription":["A data upload and management web system project.",
                            "Features for analyzing the data of a special type file and uploading it into the database.",
                            "Features for monitoring the process of upload and pass rate of the data in the database.",
                            "Features for exporting the data as CSV file.",
                            "Features for analyzing and visualizing the data.",
                            "Deploy the website on the server through Apache."
                            ]
          },
          {
            "id":"4",
            "expCompany":"AuCom Electronics Ltd , Canterbury", 
            "expDate":"Nov 2021 - Feb 2022", 
            "expPosition":" Software developer", 
            "expSkills":"Python, Tkinter, Matplsotlib",
            "expTitle": "A data upload and visualization desk application(software based on Matplsotlib) project.",
            "expDescription":["Features for analyzing the data and uploading it.",
                            "Features for monitoring and comparing the dynamic temperature data."
                          ]
          },
          {
            "id":"5",
            "expCompany":"AuCom Electronics Ltd , Canterbury", 
            "expDate":"Feb 2022 - present", 
            "expPosition":" Software developer", 
            "expSkills":" - C# .NET Framework",
            "expTitle": "The features extension for a hardware test software(based on .Net Framework).",
            "expDescription":["Fix older Bugs.",
                            "Make the process of machine work become automatic from manual."
                          ]
          },
          {
            "id":"6",
            "expCompany":"Self-employee , Canterbury", 
            "expDate":"Mar 2022 - present", 
            "expPosition":" Full-stack developer", 
            "expSkills":"Python, Flask, HTML, CSS, react, eChart, Git/GitHub",
            "expTitle": "Self CV Website",
            "expDescription":["Back-end data process",
                            "react front-end build",
                            "Dynamic validation features",
                            "Dynamic charts",
                            "Background management channel"
                          ]
          }
        ]
        
        currentPageInfo = expInfo[int(pageNum)-1]
        
        delivery_expPage = {}
        delivery_expPage['pageInfo'] = currentPageInfo

        delivery_expPage_json = json.dumps(delivery_expPage)

        return delivery_expPage_json








@cv_controller.route('/skills')
def skills():
    return render_template('skills.html')