from flask_mail import Mail, Message


@app.route("/payment_reminder", methods = ['GET','POST'])  # this part is email function for remind member "your membership is going to expire"
def payment_reminder():
    if request.method == 'POST':
        memberid_reminder = request.form.get('paymentmemberid')
        print(memberid_reminder)
        name_reminder = request.form.get('paymentmembername')
        duedate_reminder = request.form.get('paymentduedate')
        cur = getCursor()
        cur.execute("SELECT email_address FROM member WHERE user_id = %s;",(memberid_reminder,))
        email_select = cur.fetchall()
        email_listtype = [j for i in email_select for j in i]
        email_receive = email_listtype[0]
        print(email_receive)
        message = Message(subject='Member expiration reminder',sender = 'chiyuhe903@gmail.com', recipients=[email_receive],body='Hi,%s. Your membership will expire at %s !' % (name_reminder,duedate_reminder,))    
        try:        
            mail.send(message)        
            flash('Successfully! You have sent reminder email to  %s !' % (name_reminder,))
            return redirect(url_for('membership_list_manager' ))     
        except Exception as e:        
            flash('Sorry! The reminder email to  %s unsuccessfully!' % (name_reminder,))
            return redirect(url_for('membership_list_manager' )) 
