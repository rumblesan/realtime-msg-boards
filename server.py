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


words = {}


@app.route('/')
def index():
    wordinfo = words.values()
    return render_template('index.html', wordinfo=wordinfo)


@app.route('/word/create', methods=['POST'])
def newWord():
    word_data = request.get_json()
    word_text = str(word_data['text'])
    print(word_data)
    if word_text in words:
        return ("Already exists")
    else:

        words[word_text] = {}
        words[word_text]['text'] = word_text
        words[word_text]['xPos'] = int(word_data['xPos'])
        words[word_text]['yPos'] = int(word_data['yPos'])

        p['fridge'].trigger('new-word', word_data)
        return ("Created %s" % word_text, 200)


@app.route('/word/update', methods=['POST'])
def updateWord():
    word_data = request.get_json()
    word_text = str(word_data['text'])
    if word_text not in words:
        return ("Doesn't exist", 404)
    else:

        words[word_text]['xPos'] = int(word_data['xPos'])
        words[word_text]['yPos'] = int(word_data['yPos'])

        p['fridge'].trigger('update-word', word_data)
        return ("Updated %s" % word_text, 200)


if __name__ == '__main__':
    app.run()
