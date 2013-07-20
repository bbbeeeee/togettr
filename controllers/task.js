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
	
var db;

exports.getDb = function(_db){
	db = _db;
}

exports.add = function(req, res) {
  if(req.user){
    db.collection('tasks', function(err, collection){
      collection.findOne({name: req.body.task}, function(err, doc){
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
}

exports.del = function(req, res) {
  if(req.user){
    db.collection('tasks', function(err, collection){
      collection.findOne({name: req.body.task}, function(err, doc){
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
}

exports.finish = function(req, res){

}
