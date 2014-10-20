#! /usr/bin/env python

from flask import Flask
import pusher

app = Flask(__name__)
app.config.from_object('fridge-cfg')

p = pusher.Pusher(
    app_id=app.config['PUSHER_APP_ID'],
    key=app.config['PUSHER_KEY'],
    secret=app.config['PUSHER_SECRET'],
    host=app.config['PUSHER_HOST']
)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/word/<newword>', methods=['POST'])
def newWord(newword):
    print(newword)
    p['fridge'].trigger('new-word', {'word': newword})
    return ("Created %s" % newword, 200)


if __name__ == '__main__':
    app.run()
