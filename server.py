#! /usr/bin/env python

from flask import Flask, request, render_template
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
    wordinfo = wordstate.values()
    print(wordinfo)
    return render_template('index.html', wordinfo=wordinfo)


@app.route('/word/create', methods=['POST'])
def newWord():
    worddata = request.get_json()
    newword = str(worddata['word'])
    if newword in wordstate:
        return ("Already exists")
    else:
        wordstate[newword] = {
            'word': newword,
            'xPos': int(worddata['xPos']),
            'yPos': int(worddata['yPos'])
        }
        p['fridge'].trigger('new-word', worddata)
        return ("Created %s" % newword, 200)


@app.route('/words')
def getWords():
    print(wordstate)
    return "words", 200


if __name__ == '__main__':
    app.run()
