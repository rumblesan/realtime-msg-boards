/*jslint browser: true */
/*global $, reqwest */

(function (w) {

    w.formBehaviour = function (urls) {

        $('#createWord').on('click', function (e) {
            reqwest({
                url: urls.createword + $('#newWord')[0].value,
                method: 'post',
                success: function (resp) {
                    console.log('sent word', resp);
                }
            });
        });

    };

}(window));

