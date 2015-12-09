'use strict'; //keeps secure

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();


mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) { //wraps all simple code in this function
//port - default, clementinejs is database want to use, if not created yet, it will be created
//CALLBACK = error, database object
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }


    app.use('/public', express.static(process.cwd() + '/public')); //binds directore to a shortcut - can reference outside easily

    app.use('/controllers', express.static(process.cwd() + '/app/controllers')); //binds directory to a shortcut

     routes(app, db); //pass db object to routes along with app - used to help pass data to client side

app.listen(8080, function () {
    console.log('Listening on port 8080...');
});
});

