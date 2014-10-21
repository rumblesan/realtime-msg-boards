/// <reference path="Word.ts" />
/// <reference path="modules/reqwest.d.ts" />

interface ServerComs {
    Word: ServerWordComs
}

interface ServerWordComs {
    create(data: WordData): void
    update(data: WordData): void
}

module Server {

    var urls = {
        createword: '/word/create',
        updateword: '/word/update',
    };

    export module Word {
        export function create(data: WordData): void {
            reqwest({
                url: urls.createword,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });
        }

        export function update(data: WordData): void {
            reqwest({
                url: urls.updateword,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });
        }
    }

}

