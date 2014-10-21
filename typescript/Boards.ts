/// <reference path="Word.ts" />
/// <reference path="Server.ts" />
/// <reference path="lib/Option.ts" />

interface WordArray {
    [index: number]: Word;
    push(word: Word): number;
    length: number
}

interface ProcessingProgram {
    (processing: any): void
}

class Boards {

    static constants = {
        textSize: 30,
        canvasHeight: 768,
        canvasWidth: 1024
    };

    private words: WordArray;
    private grabbedWord: Maybe<Word>;
    private server: ServerComs

    constructor(server: ServerComs) {
        this.words = [];
        this.grabbedWord = Nothing.instance<Word>();
        this.server = server;
    }

    addWord(text: string, xPos: number, yPos: number): number {
        return this.words.push(
            new Word(text, xPos, yPos, Boards.constants.textSize)
        );
    }

    createWord(text: string): void {
        this.server.Word.create({
            text: text,
            xPos: Math.floor(Math.random() * (Boards.constants.canvasWidth - 100)),
            yPos: Math.floor(Math.random() * (Boards.constants.canvasHeight - 30))
        });
    }

    updateWord(text: string, xPos: number, yPos: number) {
        for (var i = 0; i < this.words.length; i += 1) {
            var w = this.words[i];
            if (w.getText() === text) {
                w.setPosition({x: xPos, y: yPos});
            }
        }
    }

    createSketch(): ProcessingProgram {
        var self = this;
        return (processing: any) => {

            processing.setup = function () {
                processing.size(
                    Boards.constants.canvasWidth,
                    Boards.constants.canvasHeight
                );
                processing.background(255);

                processing.textSize(Boards.constants.textSize);
            };

            processing.draw = function () {
                processing.background(200);

                for (var i = 0; i < self.words.length; i += 1) {
                    self.words[i].draw(processing);
                }
            };

            processing.mousePressed = function () {
                for (var i = 0; i < self.words.length; i += 1) {
                    var w = self.words[i];
                    if (w.inBounds({x: processing.mouseX, y: processing.mouseY})) {
                        self.grabbedWord = new Just(w);
                    }
                }
            };

            processing.mouseReleased = function () {
                if (self.grabbedWord.isDefined) {
                    self.server.Word.update(self.grabbedWord.get().toJSON());
                    self.grabbedWord = Nothing.instance<Word>();
                }
            };

            processing.mouseDragged = function () {
                if (self.grabbedWord.isDefined) {
                    self.grabbedWord.map(
                        (w) => w.setPosition(
                            {x: processing.mouseX, y: processing.mouseY}
                        )
                    )
                }
            };

        };
    }

}

