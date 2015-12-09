'use strict';

function clickHandler (db) {//create function that takes a db

    var clicks = db.collection('clicks'); //define the mongodb collection - creates collection if doesnt exist (collection = table of data)

   this.getClicks = function (req, res) {

  var clickProjection = { '_id': false };

  clicks.findOne({}, clickProjection, function (err, result) {
     if (err) {
        throw err;
     }

     if (result) {
        res.json(result);
     } else {
        clicks.insert({ 'clicks': 0 }, function (err) {
           if (err) {
              throw err;
           }

           clicks.findOne({}, clickProjection, function (err, doc) {
              if (err) {
                 throw err;
              }

              res.json(doc);
           });
        });
     }
  });
};
}

module.exports = clickHandler;