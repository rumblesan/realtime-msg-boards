/*jslint browser: true */
/*global word, reqwest */

(function (w) {

    w.createApp = function (cfg, urls) {

        var App, appstate, constants;

        App = {};
        appstate = {
            words: [],
            grabbedWord: null
        };
        constants = {
            textSize: 30,
            canvasHeight: 768,
            canvasWidth: 1024
        };

        App.processing = function (processing) {

            processing.setup = function () {
                processing.size(constants.canvasWidth, constants.canvasHeight);
                processing.background(255);

                processing.textSize(constants.textSize);
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
                if (appstate.grabbedWord !== null) {
                    appstate.grabbedWord.setPosition(processing.mouseX, processing.mouseY);
                }
            };

        };

        App.addWord = function (newWord, xPos, yPos) {
            appstate.words.push(word.create(newWord, xPos, yPos, constants.textSize));
        };

        App.createWord = function (newWord) {
            var xPos, yPos;
            xPos = Math.random() * (constants.canvasWidth - 100);
            yPos = Math.random() * (constants.canvasHeight - 30);
            reqwest({
                url: urls.createword,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    word: newWord,
                    xPos: xPos,
                    yPos: yPos
                }),
                success: function (resp) {
                    console.log(resp);
                }
            });

        };

        return App;

    };

}(window));

