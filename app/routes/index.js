'use strict';

module.exports = function (app) { //exports the code to be used elsewhere
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html'); //moves into public file
        });
};