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
    position_basic = "Graduate"
    job_basic = "Software Developer & Website full-stack Developer"
    text_basic = [["Full Name:", "Chiyu He"], ["Prefer Name:", "Finn"], ["Address:", "35 Buffon St, Waltham, Christchurch, 8023"], ["E-mail:", "finn.he0102@gmail.com"]]
    summary_basic = [["sum1", "Over 50/% /of courses arrive A grade (4/6)."], ["sum2", "3 web projects development experience - full-stack developer (1 simulation + 2 real )."], ["sum3", "1 desk application development experience - software developer (tkinter )."], ["sum4", "C# .NET Framework programming experience"], ["sum5", "Over half year internship experience."]]
    
    return render_template('information.html', position_basic = position_basic, job_basic = job_basic, text_basic = text_basic, summary_basic = summary_basic)

@cv_controller.route('/skills')
def skills():
    return render_template('skills.html')