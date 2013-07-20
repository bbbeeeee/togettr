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

exports.create = function(req, res) {
  if(req.user){
    db.collection('ideas', function(err, collection){
      if(err){
        console.log(err);
        res.send('failed');
      }
      collection.insert({idea: req.body.idea});
      
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

exports.get = function(req, res){
  if(req.user){
    db.collection('ideas', function(err, collection){
      collection.findOne({name: req.body.name}, function(err, doc){
        if(err){
          res.send('failed')
        }
        else if(doc == null){

        }
        else if(doc){

        }
      })
    })
  }
}