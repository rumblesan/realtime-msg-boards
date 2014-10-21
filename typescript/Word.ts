/// <reference path="lib/Coords.ts" />

interface WordData {
    text: string;
    xPos: number;
    yPos: number
}

class Word {

    private text: string;
    private position: Lib.Coords;
    private width: number;
    private height: number;

    constructor (text: string, xPos: number, yPos: number, textSize: number) {
        this.text = text;
        this.position = {x: xPos, y: yPos};
        this.width = (text.length * 15) + 5,
        this.height = textSize + 5
    }

    getText(): string {
        return this.text;
    }

    getPosition(): Lib.Coords {
        return this.position;
    }

    setPosition(coords: Lib.Coords): void {
        this.position = coords;
    }

    draw(processing: any): void {
        var x1 = this.position.x;
        var x2 = this.position.x + this.width;
        var y1 = this.position.y;
        var y2 = this.position.y + this.height;

        processing.beginShape();
        processing.vertex(x1, y1);
        processing.vertex(x2, y1);
        processing.vertex(x2, y2);
        processing.vertex(x1, y2);
        processing.vertex(x1, y1);
        processing.endShape();
        processing.fill(0);
        processing.text(this.text, (x1 + 3), (y1 + 3), this.width, this.height);
        processing.fill(255);
    }

    inBounds(coords: Lib.Coords): boolean {
        var x1 = this.position.x;
        var x2 = this.position.x + this.width;
        var y1 = this.position.y;
        var y2 = this.position.y + this.height;
        return (
            (coords.x >= x1) &&
            (coords.x <= x2) &&
            (coords.y >= y1) &&
            (coords.y <= y2)
        );
    }

    toJSON(): WordData {
        return {
            text: this.text,
            xPos: this.position.x,
            yPos: this.position.y
        };
    }

}

