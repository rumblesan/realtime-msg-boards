/*jslint browser: true */
/*global */

(function (w) {

    var word = {};

    word.create = function (text, startXPos, startYPos, textSize) {

        var word, wordstate;

        word = {};
        wordstate = {
            text: text,
            xPos: startXPos,
            yPos: startYPos,
            xSize: (text.length * 15),
            ySize: textSize + 5
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
            var x1, x2, y1, y2;
            x1 = wordstate.xPos;
            x2 = wordstate.xPos + wordstate.xSize;
            y1 = wordstate.yPos;
            y2 = wordstate.yPos + wordstate.ySize;

            processing.beginShape();
            processing.vertex(x1, y1);
            processing.vertex(x2, y1);
            processing.vertex(x2, y2);
            processing.vertex(x1, y2);
            processing.vertex(x1, y1);
            processing.endShape();
            processing.fill(0);
            processing.text(wordstate.text, (x1 + 3), (y1 + 3), wordstate.xSize, wordstate.ySize);
            processing.fill(255);
        };

        word.inBounds = function (xCoord, yCoord) {
            var x1, x2, y1, y2;
            x1 = wordstate.xPos;
            x2 = wordstate.xPos + wordstate.xSize;
            y1 = wordstate.yPos;
            y2 = wordstate.yPos + wordstate.ySize;

            return ((xCoord >= x1) && (xCoord <= x2) && (yCoord >= y1) && (yCoord <= y2));
        };

        return word;

    };

    w.word = word;

}(window));

