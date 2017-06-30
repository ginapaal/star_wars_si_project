from flask import Flask, render_template, request, redirect, url_for
import data_handler
from conn_man import connect_to_db
import pw_hash


app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def main():
    return render_template("index.html")


@app.route("/log-in", methods=['GET', 'POST'])
def log_in():
    reg_user_list = data_handler.login(connect_to_db())
    print(reg_user_list)
    username = request.form.get('usr-login')
    print(username)

    return render_template('log_in.html')


@app.route("/sign-up", methods=['GET', 'POST'])
def sign_up():
    if request.form.get("user-signup") and request.form.get("pwd-signup"):
        username = request.form.get("user-signup")
        password = request.form.get("pwd-signup")
        password = pw_hash.hash_pw(password)
        data_handler.sign_up(username, password, connect_to_db())
        return redirect(url_for("main"))

    return render_template('sign_up.html')


if __name__ == '__main__':
    app.run(debug=True)