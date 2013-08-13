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
  , bcrypt = require('bcrypt')
	, LocalStrategy = require('passport-local').LocalStrategy
	, FacebookStrategy = require('passport-facebook').Strategy;
/*

  if(req.user){
    db.collection('', function(err, collection){
      collection.findOne({name: req.body.name}, function(err, doc){
        if(err){

        }
        else if(doc == null){

        }
        else if(doc){
          
        }
      })
    })
  }
  else{
    res.redirect('/');
  }

*/	
var db;

exports.getDb = function(_db){
	db = _db;
}

exports.add = function(req, res) {
  if(req.user){
    console.log("lol");
    db.collection('ideas', function(err, collection){
      console.log(req.user);
      if(err){
        console.log(err);
        res.send('failed');
      }
      collection.insert({idea: req.body.idea, 
        project: req.body.projectIdentifier, 
        creatorId: req.user._id
        }, 
        function(err, doc){console.log(doc);res.send(doc);});
      
    });
  }
  else{
    res.send("not logged in");
  }
}

exports.del = function(req, res) {
  if(req.user){
    db.collection('ideas', function(err, collection){
      collection.findOne({name: req.body.name}, function(err, doc){
        if(err){
          console.log(err);
        }
        else if(doc == null){
          res.send('failed');
        }
        else if(doc){
          
        }
      })
    })
  }
  else{
    res.send("not logged in");
  }
}

exports.getOne = function(req, res){
  if(req.user){
    if(req.query){
      db.collection('ideas', function(err, collection){
        collection.findOne({}, function(err, doc){
          if(err){
            res.send('failed')
          }
          else if(doc == null){

          }
          else if(doc){
            res.send(doc);
          }
        })
      });
    }
  }
}

exports.getAll= function(req, res){
  if(req.user){
    if(req.query){
      console.log(req.query);
      db.collection('ideas', function(err, collection){
        collection.find({project: req.query.project}, {limit: 10, skip: req.query.page *10}, function(err, cursor){
          if(err){
            res.send('failed')
          }else{
            cursor.toArray(function(err, documents){
              res.json(documents)
            });
          }
        })
      });
    }
    else res.send("lol");
  }
  else res.send("not logged in");
}