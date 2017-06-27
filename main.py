from flask import Flask, render_template
import json
import requests
app = Flask(__name__)


@app.route('/')
def main():
    data = requests.get("http://swapi.co/api/planets")
    data = data.text
    data_to_json = json.loads(data)
    planet_info = []
    for results in data_to_json['results']:
        planet_info.append(results)
    next_link = data_to_json['next']
    previous_link = data_to_json['previous']

    return render_template("index.html", planet_info=planet_info, next_link=next_link, previous_link=previous_link)


@app.route('/sign-up')
def sign_up():
    return render_template("sign_up.html")


@app.route('/log-in')
def log_in():
    return render_template("log_in.html")


if __name__ == '__main__':
    app.run(debug=True)