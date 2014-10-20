/*jslint browser: true */
/*global reqwest */

(function (w) {

    var urls = {
        createword: '/word/create',
        updateword: '/word/update',
    };

    w.createServer = function (cfg) {
        var Server, Word;
        Server = {};
        Server.Word = Word = {};

        Word.create = function (data, cb) {
            reqwest({
                url: urls.createword,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: cb
            });
        };

        Word.update = function (data, cb) {
            reqwest({
                url: urls.updateword,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: cb
            });
        };

        return Server;
    };

}(window));

