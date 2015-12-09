'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js'); //load clickhandler 

module.exports = function (app, db) { //allow this to be exported

    var clickHandler = new ClickHandler(db); //new instance of clickhandler object with db as param

    app.route('/') //route 1 - send index.html file to browser
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

        
        app.route('/api/clicks') //run functions to update db
        .get(clickHandler.getClicks) //get request returns click number
        .post(clickHandler.addClick) //post request adds click
        .delete(clickHandler.resetClicks); // delete request resets clicks
};