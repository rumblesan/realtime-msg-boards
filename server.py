#! /usr/bin/env python

from flask import Flask, request, render_template, redirect, url_for
import pusher
import random
import string

app = Flask(__name__)
app.config.from_object('boards-cfg')

p = pusher.Pusher(
    app_id=app.config['PUSHER_APP_ID'],
    key=app.config['PUSHER_KEY'],
    secret=app.config['PUSHER_SECRET'],
    host=app.config['PUSHER_HOST']
)


serverstate = {}


@app.route('/')
def index():
    name = ''.join(
        random.choice(
            string.ascii_uppercase + string.digits
        ) for _ in range(10)
    )
    return redirect(url_for('open_board', board_name=name))


@app.route('/board/<string:board_name>')
def open_board(board_name):
    if board_name not in serverstate:
        serverstate[board_name] = {
            'words': {}
        }
    wordinfo = serverstate[board_name]['words'].values()
    return render_template(
        'index.html',
        wordinfo=wordinfo,
        board_name=board_name
    )


@app.route('/board/<string:board_name>/word/create', methods=['POST'])
def newWord(board_name):
    if board_name not in serverstate:
        return "Board doesn't exist", 404
    else:
        word_data = request.get_json()
        word_text = str(word_data['text'])
        board_words = serverstate[board_name]['words']
        if word_text in board_words:
            return ("Already exists")
        else:

            board_words[word_text] = {}
            board_words[word_text]['text'] = word_text
            board_words[word_text]['xPos'] = int(word_data['xPos'])
            board_words[word_text]['yPos'] = int(word_data['yPos'])

            p[board_name].trigger('new-word', word_data)
            return ("Created %s" % word_text, 200)


@app.route('/board/<string:board_name>/word/update', methods=['POST'])
def updateWord(board_name):
    if board_name not in serverstate:
        return "Board doesn't exist", 404
    else:
        word_data = request.get_json()
        word_text = str(word_data['text'])
        board_words = serverstate[board_name]['words']
        if word_text not in board_words:
            return ("Doesn't exist", 404)
        else:

            board_words[word_text]['xPos'] = int(word_data['xPos'])
            board_words[word_text]['yPos'] = int(word_data['yPos'])

            p[board_name].trigger('update-word', word_data)
            return ("Updated %s" % word_text, 200)


if __name__ == '__main__':
    app.run()
