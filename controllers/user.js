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
var mongoClient = new MongoClient(new Server("localhost", 27017));

exports.login = function(req, res){
  res.send('lol');
}

exports.logout = function(req, res){

}

exports.signup = function(req, res){
	mongoClient.open(function(err, mongoclient){
	  var db = mongoclient.db('youtaan');

	  db.createCollection('users', function(err, collection){
	  	collection.findOne({email: req.body.email}, function(err, doc){
	  		console.log(doc);
	  		if(doc == null){
	  			console.log("lol");
	  			
		 			bcrypt.genSalt(10, function(err, salt){
		 				console.log(salt);
		 				if(err) console.log(err);
		 				bcrypt.hash(req.body.password, salt, function(err, hash){
		 					if(err) {
		 						console.log(err); 
		 						mongoClient.close(); 
		 						res.redirect('/');
		 					}
		 					collection.insert({password: hash, email: req.body.email}, function(err, item){});
		 					mongoClient.close();
		 					res.redirect('/');
		 					
		 				});
		 			});
				
		 		}
		 		else if(doc){
		 			console.log('f niggas' + doc._id);
		 			mongoClient.close();
		 			res.redirect('/');
		 		}
	 		});	
	  });
	});
}


