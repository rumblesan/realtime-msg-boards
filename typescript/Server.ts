/// <reference path="Word.ts" />
/// <reference path="modules/reqwest.d.ts" />

interface ServerComsI {
    Word: ServerWordComsI
}

interface ServerWordComsI {
    create(data: WordData): void
    update(data: WordData): void
}

class ServerComs implements ServerComsI {

    Word: WordComs;

    constructor(boardName: string) {
        this.Word = new WordComs(boardName);
    }

}

interface WordComsUrls {
    create: string;
    update: string;
}

class WordComs implements ServerWordComsI {

    urls: WordComsUrls;

    constructor(boardName: string) {
        this.urls = {
            create: '/board/' + boardName + '/word/create',
            update: '/board/' + boardName + '/word/update',
        }
    }

    create(data: WordData): void {
        reqwest({
            url: this.urls.create,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    }

    update(data: WordData): void {
        reqwest({
            url: this.urls.update,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    }

}

