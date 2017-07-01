from flask import Flask, render_template, request, redirect, url_for, session
import data_handler
from conn_man import connect_to_db
import pw_hash
import psycopg2


app = Flask(__name__)
app.secret_key = "Super secret key, this is."
app.config['SESSION_TYPE'] = 'filesystem'


@app.route("/", methods=["GET", "POST"])
def main():
    return render_template("index.html")


@app.route("/log-in", methods=['GET', 'POST'])
def log_in():
    try:
        reg_user_list = data_handler.login(connect_to_db())
        username = request.form.get('usr-login')
        password = request.form.get('pwd-login')
        h_password = pw_hash.hash_pw(password)
        usr_tpl = (username, h_password,)
        for elem in reg_user_list:
            if usr_tpl == elem:
                session['username'] = username
                return render_template("index.html", username=username, h_password=h_password)
    except AttributeError:
        return render_template('log_in.html')
    
    return render_template('log_in.html')


@app.route("/sign-up", methods=['GET', 'POST'])
def sign_up():
    try:
        if request.form.get("user-signup") and request.form.get("pwd-signup"):
            username = request.form.get("user-signup")
            password = request.form.get("pwd-signup")
            password = pw_hash.hash_pw(password)
            data_handler.sign_up(username, password, connect_to_db())
            return redirect(url_for("main"))
    except psycopg2.IntegrityError:
            message = "This username is already in use, pick another one."
            return render_template('sign_up.html', message=message)

    return render_template('sign_up.html')


@app.route("/log-out")
def logout():
    session.pop('username', None)
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)