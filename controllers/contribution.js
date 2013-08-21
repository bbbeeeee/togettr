var Db = require('mongodb').Db
  , MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server
  , ReplSetServers = require('mongodb').ReplSetServers
  , ObjectID = require('mongodb').ObjectID
  , Binary = require('mongodb').Binary
  , GridStore = require('mongodb').GridStore
  , Grid = require('mongodb').Grid
  , Code = require('mongodb').Code
  , BSON = require('mongodb').pure().BSON
  , assert = require('assert')
  , bcrypt = require('bcrypt');


//All project docs will have reference to project
var db;

exports.getDb = function(_db){
	db = _db;
}

exports.add = function(req, res) {
  if(req.user){
    db.collection('contributions', function(err, collection){
      if(err){
        console.log(err);
        res.send('failed');
      }
      collection.insert({contribution: req.body.contribution, 
        project: req.body.projectIdentifier,
        creator: ObjectID(req.user._id.toString()),
        dateCreated: new Date()
      },

        function(err, doc){console.log(doc);res.send(doc);});
      
    });
  }
  else{
    res.send("not logged in");
  }
}

exports.getAll = function(req, res){
if(req.user){
    if(req.query){
      console.log(req.query);
      db.collection('contributions', function(err, collection){
        if(req.query.project){
        collection.find({project: req.query.project}, 
          {limit: 10, skip: req.query.page *10, sort:[['dateCreated', -1]]}, 
          function(err, cursor){
          if(err){
            res.send('failed')
          }else{
            cursor.toArray(function(err, documents){
              res.json(documents)
            });
          }
        });
        }
        else if(req.query._id){
          collection.find({_id: ObjectID(req.query._id.toString())}, 
          {limit: 1}, 
          function(err, cursor){
          if(err){
            res.send('failed')
          }else{
            cursor.toArray(function(err, documents){
              res.json(documents)
            });
          }
        });
        }
        });
    }
    
    else res.send("lol");
  }
  else res.send("not logged in");
}

exports.getOne = function(req, res){

}

exports.del = function(req, res){
  if(req.user){
    console.log("psl");
    console.log(req.params);
    db.collection('contributions', function(err, collection){
      collection.remove({_id: ObjectID(req.params.id)}, {w: 1, single: true}, function(err, num){
        assert.equal(null, err);
        assert.equal(1, num);

        res.send(undefined);
      });
    });
  
  }
  else{
    res.send("not logged in");
  }
}