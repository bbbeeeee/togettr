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
  , passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, FacebookStrategy = require('passport-facebook').Strategy
	, con = require('./config');


var mongoClient = new MongoClient(new Server("localhost", 27017));
var users;
module.exports = function() {

	mongoClient.open(function(err, mongoClient){
		var db = mongoClient.db('youtaan');
		users = db.collection('users');
		return users
		module.exports = {
		getUsers: function() { 
			console.log(users);
			return users; 
			}
		};
	});

}