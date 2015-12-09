'use strict';

function clickHandler (db) {//create function that takes a db

    var clicks = db.collection('clicks'); //define the mongodb collection - creates collection if doesnt exist (collection = table of data)
    
    
    //FUNCTION ADD CLICKS
    this.addClick = function (req, res) {
    clicks
        .findAndModify(
            {}, //query - returns all instances
            { '_id': 1 }, //define sort order
            { $inc: { 'clicks': 1 } }, //update records - inc = increase by certain number
            function (err, result) {
                if (err) { throw err; }

                res.json(result);
            }
        );
};

    //FUNCTION RESET CLICKS
this.resetClicks = function (req, res) { // function to reset clicks 
    clicks
        .update(
            {}, //query
            { 'clicks': 0 }, //update value
            function (err, result) {
                if (err) { throw err; }

                res.json(result);
            }
        );
};
    
//FUNCTION - return clicks json if present, if not - create clicks field
   this.getClicks = function (req, res) {

  var clickProjection = { '_id': false }; //dont return id

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

module.exports = clickHandler; //export module so can be used elsewhere