/*jslint */
/*global word */

var magnets = function (processing) {

    var appstate, constants;
    appstate = {
        words: [],
        grabbedWord: null
    };
    constants = {
        textSize: 30
    };

    processing.setup = function () {
        processing.size(1024, 768);
        processing.background(255);

        processing.textSize(constants.textSize);

        appstate.words.push(word.create('testing', 300, 300, constants.textSize));

    };

    processing.draw = function () {
        processing.background(200);
        var i;
        for (i = 0; i < appstate.words.length; i += 1) {
            appstate.words[i].draw(processing);
        }
    };

    processing.mousePressed = function () {
        var w, i;
        for (i = 0; i < appstate.words.length; i += 1) {
            w = appstate.words[i];
            if (w.inBounds(processing.mouseX, processing.mouseY)) {
                appstate.grabbedWord = w;
            }
        }
    };

    processing.mouseReleased = function () {
        appstate.grabbedWord = null;
    };

    processing.mouseDragged = function () {
        appstate.grabbedWord.setPosition(processing.mouseX, processing.mouseY);
    };

};

