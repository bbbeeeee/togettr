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
	, _ = require('underscore')
	, $ = require('jquery').create();

var db;

exports.getDb = function(_db){
	db = _db;
}
exports.get = function(req, res){

	if(req.user){
		if(req.query){
			console.log(req.query);
			db.collection('incubator', function(err, collection){
				if(req.query == {} || !req.query){
					//no query
					collection.find({}, function(err, cursor){
						cursor.toArray(function(err, documents){
							console.log(documents);
							res.json(documents);
						})
					});
				}
				else if(req.query.page){
					//more pages
					console.log(req.query.page);
					var limit = 10;
					var skip = (req.query.page - 1) * 10;
					delete req.query.page;
					collection.find(req.query, {limit: limit, skip: skip}, function(err, cursor){
					cursor.toArray(function(err, documents){
						res.json(documents);
					});
				});
				}
				else{
					var limit = req.query.page ? req.query.page*10 : 2;
					if(req.query._id){
						//just one
						//req.query._id = ObjectID(req.query._id);
						console.log(req.query._id);
						collection.find({_id: ObjectID(req.query._id.toString())}, {limit: 1}, function(err, cursor){
							cursor.toArray(function(err, documents){
								//console.log("lol");
								//console.log(documents);
								res.json(documents);
							});
						});
					}
					else{
						//explore 1st page
						collection.find(req.query, {limit: limit}, function(err, cursor){
						cursor.toArray(function(err, documents){
							//console.log("lols");
							//console.log(documents);
							res.json(documents);
						});
						});
					}
				}
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
    	res.send("not logged in");
  	}
} 

// Open (Create) a new project idea
exports.create = function(req, res) {
	if(req.user){
		db.collection('incubator', function(err, collection){
			collection.findOne({identifier: req.body.identifier}, function(err, doc){
				if(err){
					res.send('failed');
				}
				if(doc == null){
					collection.insert({name:  req.body.name, 
																		identifier: req.body.identifier,
																		category: req.body.category,
																		idea: req.body.idea,
																		originator: req.user._id,
																		dateCreated: new Date(),
																		upvotes: 0,
																		downvotes: 0,
																		pledges: []
																		},
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
		db.collection('incubator', function(err, collection){
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

