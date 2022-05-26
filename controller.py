from flask import Blueprint
from flask import render_template

cv_controller = Blueprint('cv_controller', __name__, template_folder='templates')

@cv_controller.route('/')
def home():
    return render_template('home.html')


@cv_controller.route('/coverLetter')
def coverLetter():
    return render_template('coverLetterPage.html')