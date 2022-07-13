from flask_mail import Mail, Message
from flask import flash, current_app

class EmailFunc:
    def __init__(self, controller) -> None:
        # self.controller = controller
        self.controller = current_app.app_context()
        self.mail = Mail(self.controller)

    def initialSetting(self):
        user = './static/document/user.txt'
        with open(user, encoding='utf-8') as file:
            content = file.readlines()
            print(type(content), content)


        self.controller.config['MAIL_DEBUG'] = True
        self.controller.config['MAIL_SUPPRESS_SEND'] = False
        self.controller.config['TESTING'] = False
        self.controller.config['MAIL_SERVER'] = 'smtp.gmail.com'
        self.controller.config['MAIL_PORT'] = 465
        self.controller.config['MAIL_USE_TLS'] = False
        self.controller.config['MAIL_USE_SSL'] = True
        self.controller.config['MAIL_USERNAME'] = 'finn.he0102@gmail.com'
        self.controller.config['MAIL_PASSWORD'] = 'xxxxxxxxxx'   # if you want to use it, please change the less security setting in google account


    # def sendValidate(self, visitorEmail, visitorName):
        



        # message = Message(subject='Member expiration reminder',sender = 'chiyuhe903@gmail.com', recipients=[visitorEmail],body='Hi,%s. Please use verification code %s to log in my website, it is valid within 5 minutes!' % (visitorName, vertification))    
        # try:        
        #     self.mail.send(message)        
        #     flash('Successfully! I have sent the vertification code to your e-mail, please check that!')
        # except:        
        #     flash('Sorry! The vertification code sent unsuccessfully! Please try again later')
