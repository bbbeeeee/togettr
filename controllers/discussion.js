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

exports.addComment = function(req, res) {
  if(req.user){
    db.collection('comments', function(err, collection){
      if(err){
        console.log(err);
        res.send('failed');
      }
      collection.insert({comment: req.body.comment, project: req.body.projectIdentifier}, 
        function(err, doc){console.log(doc);res.send(doc);});
      
    });
  }
  else{
    res.send("not logged in");
  }
}

exports.getAllComments = function(req, res){
if(req.user){
    if(req.query){
      console.log(req.query);
      db.collection('comments', function(err, collection){
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

exports.getOneComment = function(req, res){

}

exports.delComment = function(req, res){

}