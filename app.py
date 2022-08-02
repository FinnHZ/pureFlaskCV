from flask import Flask
import controller
import os
# from datetime import timedelta 

app = Flask(__name__)
# app.secret_key = 'My_CV'
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = 3600 # = timedelta(days=7)

app.register_blueprint(controller.cv_controller)




if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)