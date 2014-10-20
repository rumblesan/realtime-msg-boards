#! /usr/bin/env python

from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/word/<newword>', methods=['POST'])
def newWord(word):
    print(word)


if __name__ == '__main__':
    app.run()
