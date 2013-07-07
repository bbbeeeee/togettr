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




module.exports = function(passport, config, db) {

	passport.serializeUser(function(user, done) {
    done(null, user._id)
  });

  passport.deserializeUser(function(id, done) {
    mongoClient.open(function(err, mongoClient){
    	var db = mongoClient.db('youtaan');

    	db.collection('users').findOne({_id: id}, function(err, doc){
    		mongoClient.close();
    		done(err, doc);
    	});
    })
  });

	passport.use(new LocalStrategy(
	  function(email, password, done) {
	  	console.log("begin");

	  	mongoClient.open(function(err, mongoClient){
	  		var db = mongoClient.db('youtaan');
	  		
	  		db.collection('users').findOne({email: email}, function(err, doc){
	  			if(err){
	  				console.log(err);
	  				mongoClient.close();
	  				return done(err);
	  			}
	  			else if(!doc){
	  				console.log("no doc");
	  				mongoClient.close();
	  				return done(null, false);

	  			}
	  			else if(doc){
	  				bcrypt.compare(password, doc.password, function(err, res){
	  					if(res == true){
	  						console.log("yessss");
	  						mongoClient.close();
	  						return done(null, doc);
	  					}
	  					else{
	  						console.log("password wrong");
	  						mongoClient.close();
	  						return done(null, false);
	  					}
	  				});
	  			}
	  			mongoClient.close();
	  			return done(null, doc);
	  		});
	  			
	  	});
			
	  }
	));

/*
  passport.use(new FacebookStrategy({
		clientID: con.FACEBOOK_ID,
		clientSecret: con.FACEBOOK_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
		},
		function(accessToken, refreshToken, profile, done){

		}
	));
*/
}