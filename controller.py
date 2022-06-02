from flask import Blueprint
from flask import render_template

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
    return render_template('information.html', job_basic = job_basic, link_basic = link_basic, text_basic = text_basic, summary_basic = summary_basic,
                                               educationDicList = educationDicList)

@cv_controller.route('/skills')
def skills():
    return render_template('skills.html')