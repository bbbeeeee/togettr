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
	, FacebookStrategy = require('passport-facebook').Strategy
	, nodemailer = require('nodemailer');
var mongoClient = new MongoClient(new Server("localhost", 27017));
var config= require('../config/config.js')
var db;

exports.getDb = function(_db){
	db = _db;
}

exports.login = function(req, res){
  res.send('lol');
}

exports.logout = function(req, res){

}

exports.signup = function(req, res){
		
	  db.collection('users', function(err, collection){
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
	 						res.redirect('/');
	 					}
	 					collection.insert({password: hash, 
	 						email: req.body.email, 
	 						firstname: req.body.firstname, 
	 						lastname: req.body.lastname, 
	 						projects:[],
	 						dateCreated: new Date()}, 
	 						function(err, item){
	 							var smtpTransport = nodemailer.createTransport("SMTP",{
						    	service: "Gmail",
							    auth: {
							        user: config.email.username,
							        pass: config.email.password
							    }
								});
								var mailOptions = {
							    from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
							    to: req.body.email,  // list of receivers
							    subject: "Hello ✔", // Subject line
							    text: "Hello world ✔", // plaintext body
							    html: "<div style='color:red;'>Hello world ✔</div>" // html body
								}
								smtpTransport.sendMail(mailOptions, function(error, response){
							    if(error){
							        console.log(error);
							    }else{
							        console.log("Message sent: " + response.message);
							    }
	 							});
	 					res.redirect('/');
	 					
	 				});
	 			});
				
	 		});
		}
		 	else if(doc){
		 			console.log("NEED TO DO SOMETHING");
		 			res.redirect('/');
		 	}
	 		});	
	  });

}

exports.confirmUser = function(req, res){

}

exports.getCurrentUser = function(req, res){
	res.send(req.user);
}

exports.getUser = function(req, res){
	if(req.query.currentUser){
		res.send(req.user);
	}
	else{
		res.send("lolololllololol");
	}
}
exports.update = function(req, res){

}

exports.joinProject = function(req, res){
	
}