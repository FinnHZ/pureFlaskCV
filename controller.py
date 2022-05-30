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
    return render_template('information.html')

@cv_controller.route('/skills')
def skills():
    return render_template('skills.html')