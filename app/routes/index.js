'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js'); //load clickhandler 

module.exports = function (app, db) { //allow this to be exported

    var clickHandler = new ClickHandler(db); //new instance of clickhandler object with db as param

    app.route('/') //route 1 - send index.html file to browser
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

   app.route('/api/clicks') //route 2 - run getClicks functions within clickHandler
        .get(clickHandler.getClicks);
};