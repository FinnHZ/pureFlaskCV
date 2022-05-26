from flask import Flask
import controller

app = Flask(__name__)

app.register_blueprint(controller.cv_controller)

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)