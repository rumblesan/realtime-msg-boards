/*jslint browser: true */
/*global */

(function (w) {

    var word = {};

    word.create = function (text, startXPos, startYPos) {

        var word = {},
            wordstate = {
                text: text,
                xPos: startXPos,
                yPos: startYPos
            };

        word.getText = function () {
            return wordstate.text;
        };

        word.getPosition = function () {
            return [wordstate.xPos, wordstate.yPos];
        };

        word.setPosition = function (newX, newY) {
            wordstate.xPos = newX;
            wordstate.yPos = newY;
        };

        word.draw = function (processing) {
            processing.text(wordstate.text, wordstate.xPos, wordstate.yPos);
        };

        return word;

    };

    w.word = word;

}(window));

