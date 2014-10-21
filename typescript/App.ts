/// <reference path="Fridge.ts" />
/// <reference path="Server.ts" />

declare var domready: any;
declare var $: any;
declare var Processing: any;
declare var Pusher: any;
declare var words: any;

domready(function () {

    var pushercfg = {
        app: '93491',
        key: '4a4d7ef213beae63ed74',
        wsHost: 'ws-megabus.pusher.com',
        httpHost: 'sockjs-megabus.pusher.com'
    };


    var fridge = new Fridge(Server);

    $('#createWord').on('click', function (e) {
        fridge.createWord($('#newWord')[0].value);
        $('#newWord')[0].value = '';
    });

    var processing = new Processing(
        document.getElementById('sketch'),
        fridge.createSketch()
    );

    var pusher = new Pusher(pushercfg.key, pushercfg);
    var channel = pusher.subscribe('fridge');

    channel.bind('new-word', function (data) {
        fridge.addWord(data.text, data.xPos, data.yPos);
    });

    channel.bind('update-word', function (data) {
        fridge.updateWord(data.text, data.xPos, data.yPos);
    });

    // Add existing words
    for (var i = 0; i < words.length; i += 1) {
        fridge.addWord(words[i].text, words[i].xPos, words[i].yPos);
    }

});

