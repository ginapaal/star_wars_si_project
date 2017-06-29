from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/log-in")
def log_in():
    return render_template("log_in.html")


@app.route("/sign-up")
def sign_up():
    return render_template("sign_up.html")


if __name__ == '__main__':
    app.run(debug=True)