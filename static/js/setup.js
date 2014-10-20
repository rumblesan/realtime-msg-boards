/*jslint browser: true */
/*global domready, pusher, createApp, createServer, $, Processing, Pusher, words */

(function (w) {

    domready(function () {

        var canvas,
            processing,
            pushercfg,
            pusher,
            channel,
            App,
            Server,
            i;

        pushercfg = {
            app: '93491',
            key: '4a4d7ef213beae63ed74',
            wsHost: 'ws-megabus.pusher.com',
            httpHost: 'sockjs-megabus.pusher.com'
        };

        Server = createServer({});

        App = createApp({}, Server);

        $('#createWord').on('click', function (e) {
            App.createWord($('#newWord')[0].value);
            $('#newWord')[0].value = '';
        });

        canvas = document.getElementById('sketch');
        processing = new Processing(canvas, App.processing);

        pusher = new Pusher(pushercfg.key, pushercfg);
        channel = pusher.subscribe('fridge');

        channel.bind('new-word', function (data) {
            App.addWord(data.text, data.xPos, data.yPos);
        });

        channel.bind('update-word', function (data) {
            App.updateWord(data.text, data.xPos, data.yPos);
        });

        // Add existing words
        for (i = 0; i < words.length; i += 1) {
            App.addWord(words[i].text, words[i].xPos, words[i].yPos);
        }

    });

}(window));

