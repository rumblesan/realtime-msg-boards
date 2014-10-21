/// <reference path="Boards.ts" />
/// <reference path="Server.ts" />
/// <reference path="modules/Pusher.d.ts" />
/// <reference path="modules/ki.d.ts" />

declare var Processing: any;
declare var words: any;
declare var boardName: string;

$(function () {

    var pushercfg = {
        app: '93491',
        key: '4a4d7ef213beae63ed74',
        wsHost: 'ws-megabus.pusher.com',
        httpHost: 'sockjs-megabus.pusher.com'
    };


    var server = new ServerComs(boardName);
    var boards = new Boards(server);

    $('#createWord').on('click', function (e: Event) {
        var el = $<HTMLInputElement>('#newWord')[0];
        boards.createWord(el.value);
        el.value = '';
    });

    var processing = new Processing(
        document.getElementById('sketch'),
        boards.createSketch()
    );

    var pusher = new Pusher(pushercfg.key, pushercfg);
    var channel: PublicChannel = pusher.subscribe(boardName);

    channel.bind('new-word', function (data: WordData) {
        boards.addWord(data.text, data.xPos, data.yPos);
    });

    channel.bind('update-word', function (data: WordData) {
        boards.updateWord(data.text, data.xPos, data.yPos);
    });

    // Add existing words
    for (var i = 0; i < words.length; i += 1) {
        boards.addWord(words[i].text, words[i].xPos, words[i].yPos);
    }

});

