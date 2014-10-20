/*jslint browser: true */
/*global domready, pusher, createApp, $, Processing, Pusher */

(function (w) {

    domready(function () {

        var canvas,
            processing,
            pushercfg,
            pusher,
            channel,
            App,
            urls;

        urls = {
            createword: '/word/create'
        };

        pushercfg = {
            app: '93491',
            key: '4a4d7ef213beae63ed74',
            wsHost: 'ws-megabus.pusher.com',
            httpHost: 'sockjs-megabus.pusher.com'
        };

        App = createApp({}, urls);

        $('#createWord').on('click', function (e) {
            App.createWord($('#newWord')[0].value);
        });

        canvas = document.getElementById('sketch');
        processing = new Processing(canvas, App.processing);

        pusher = new Pusher(pushercfg.key, pushercfg);
        channel = pusher.subscribe('fridge');
        channel.bind('new-word', function (data) {
            App.addWord(data.word, data.xPos, data.yPos);
        });

    });

}(window));

