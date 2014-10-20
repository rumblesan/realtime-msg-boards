#! /usr/bin/env python

from flask import Flask, request
import pusher

app = Flask(__name__)
app.config.from_object('fridge-cfg')

p = pusher.Pusher(
    app_id=app.config['PUSHER_APP_ID'],
    key=app.config['PUSHER_KEY'],
    secret=app.config['PUSHER_SECRET'],
    host=app.config['PUSHER_HOST']
)


wordstate = {}


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/word/create', methods=['POST'])
def newWord():
    worddata = request.get_json()
    newword = worddata['word']
    if newword in wordstate:
        return ("Already exists")
    else:
        wordstate[newword] = worddata
        p['fridge'].trigger('new-word', worddata)
        return ("Created %s" % newword, 200)


@app.route('/words')
def getWords():
    print(wordstate)
    return "words", 200


if __name__ == '__main__':
    app.run()
