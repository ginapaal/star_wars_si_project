from flask import Flask, request, render_template, redirect, url_for
import json
import requests
app = Flask(__name__)

page_counter = 1


@app.route('/')
def main():
    global page_counter
    if request.args.get('prev'):
        page_counter -= 1
    elif request.args.get('next'):
        page_counter += 1

    if page_counter <= 0 or page_counter > 7:
        if request.args.get('back'):
            data = "http://swapi.co/api/planets/?page=1"
            return redirect(url_for('main'))
        return render_template("error.html")

    data = "http://swapi.co/api/planets/?page=" + str(page_counter)
    response = requests.get(data)
    response = response.text
    data_to_json = json.loads(response)
    planet_info = []
    for result in data_to_json['results']:
        planet_info.append(result)

    return render_template("index.html", planet_info=planet_info)


@app.route('/sign-up')
def sign_up():
    return render_template("sign_up.html")


@app.route('/log-in')
def log_in():
    return render_template("log_in.html")


if __name__ == '__main__':
    app.run(debug=True)