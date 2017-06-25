from flask import Flask, render_template
import json
import requests
app = Flask(__name__)


@app.route('/')
def main():
    data = requests.get("http://swapi.co/api/planets")
    data = data.text
    data_to_json = json.loads(data)
    print(data_to_json)
    return render_template("index.html")


@app.route('/sign-up')
def sign_up():
    return render_template("sign_up.html")


@app.route('/log-in')
def log_in():
    return render_template("log_in.html")


if __name__ == '__main__':
    app.run(debug=True)