/*jslint browser: true */
/*global Word */

(function (w) {

    w.createApp = function (cfg, Server) {

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
                if (appstate.grabbedWord !== null) {
                    Server.Word.update(appstate.grabbedWord.toJSON());
                    appstate.grabbedWord = null;
                }
            };

            processing.mouseDragged = function () {
                if (appstate.grabbedWord !== null) {
                    appstate.grabbedWord.setPosition(processing.mouseX, processing.mouseY);
                }
            };

        };

        App.addWord = function (text, xPos, yPos) {
            appstate.words.push(Word.create(text, xPos, yPos, constants.textSize));
        };

        App.createWord = function (text) {
            var xPos, yPos;
            xPos = Math.floor(Math.random() * (constants.canvasWidth - 100));
            yPos = Math.floor(Math.random() * (constants.canvasHeight - 30));
            Server.Word.create({
                text: text,
                xPos: xPos,
                yPos: yPos
            });
        };

        App.updateWord = function (text, xPos, yPos) {
            var w, i;
            for (i = 0; i < appstate.words.length; i += 1) {
                w = appstate.words[i];
                if (w.getText() === text) {
                    w.setPosition(xPos, yPos);
                }
            }
        };

        return App;

    };

}(window));

