/*jslint */
/*global word */

var magnets = function (processing) {

    var appstate = {
        words: []
    };

    processing.setup = function () {
        processing.size(1024, 768);
        processing.background(100);

        processing.textSize(30);

        appstate.words.push(word.create('foo', 300, 300));

    };

    processing.draw = function () {
        var i;
        for (i = 0; i < appstate.words.length; i += 1) {
            appstate.words[i].draw(processing);
        }
    };

};

