#! /usr/bin/env python

from flask import Flask
app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/word/<newword>', methods=['POST'])
def newWord(newword):
    print(newword)
    return "Created %s" % newword


if __name__ == '__main__':
    app.run()
