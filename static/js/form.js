/*jslint browser: true */
/*global $, reqwest */

(function (w) {

    w.formBehaviour = function (urls) {

        $('#createWord').on('click', function (e) {
            reqwest({
                url: urls.createword,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    newword: $('#newWord')[0].value
                }),
                success: function (resp) {
                    console.log('Sent word', resp);
                }
            });
        });

    };

}(window));

