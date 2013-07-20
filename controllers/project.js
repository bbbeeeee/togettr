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

// Get individual project or if query string, get project matches
exports.get = function(req, res){

	if(req.user){
		if(req.query){
			console.log(req.query);
			db.collection('projects', function(err, collection){
				if(req.query == {}){
					collection.find({}, function(err, cursor){
						cursor.toArray(function(err, documents){
							console.log(documents);
							res.json(documents);
						})
					});
				}
				collection.find(req.query, function(err, cursor){
					cursor.toArray(function(err, documents){
						console.log("nig");
						res.json(documents);
					})
				});
			});

		}
		else{
			db.collection('projects', function(err, collection){
				collection.findOne({name: req.body.identifier}, function(err, doc){
					if(err){
						res.send('failed');
					}
					else if(doc == null){
						res.send('no project');
					}
					else if(doc){
						res.send(doc);
					}
				});
			});
		}
	}
	else{
		res.redirect('not logged in');
	}
} 

// Open (Create) a new project idea
exports.create = function(req, res) {
	if(req.user){
		db.collection('projects', function(err, collection){
			collection.findOne({name: req.body.identifier}, function(err, doc){
				if(err){
					res.send('failed');
				}
				if(doc == null){
					collection.insert({name:  req.body.name, 
																		identifier: req.body.identifier,
																		category: req.body.category,
																		idea: req.body.idea,
																		originator: req.user._id,
																		dateCreated: new Date()},
														{safe: true},
														function(err, doc){ console.log(doc); res.send(doc); }); 

				}
				else if(doc){
					console.log('project exists');
					res.redirect('/');
				}
			});
		});
	}
	else {
		res.send("not logged in");
	}
}


exports.del = function(req, res){
	if(req.user){
		db.collection('projects', function(err, collection){
			collection.remove({identifier: req.body.identifier}, {single: true}, function(err, item){
				res.redirect('/');
			});
		});
	}
	else{
		res.redirect('/');
	}
}

exports.update = function(req, res){
	if(req.user){

	}
}
// Search for projects
exports.projects = function(req, res){

}

// More projects in search --- ajax request --- json response
exports.moreProjects = function(req, res){

}

