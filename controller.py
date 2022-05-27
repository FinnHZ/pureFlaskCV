from flask import Blueprint
from flask import render_template

cv_controller = Blueprint('cv_controller', __name__, template_folder='templates')

@cv_controller.route('/')
def login():
    return render_template('login.html')

@cv_controller.route('/mainPage')
def mainPage():
    return render_template('mainPage.html')
