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
 	_db = db;
	passport.serializeUser(function(user, done) {

    done(null, user)
  });

  passport.deserializeUser(function(user, done){
  	oid = new ObjectID.createFromHexString(user._id);

    _db.collection('users').findOne({_id: oid}, function(err, doc){
    	delete doc.password

    	done(err, doc);
   	});
   });
 	}

	passport.use(new LocalStrategy(
	  function(email, password, done) {	
	  	_db.collection('users').findOne({email: email}, function(err, doc){
	  		if(err){
	 				console.log(err);
	  			return done(err);
	  		}
	 			else if(!doc){
	 				return done(null, false);
	  		}
	  		else if(doc){
	 				bcrypt.compare(password, doc.password, function(err, res){
	 					if(res == true){
	 						delete doc.password;
  						return done(null, doc);	  					}
	  				else{
	  					return done(null, false);
	  				}
	  			});
	  		}
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
