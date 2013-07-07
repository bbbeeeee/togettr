
/*
 * GET home page.
 */
var db;

exports.getDb = function(_db){
	db = _db;
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
}

exports.failed = function(req, res){
	res.render('failed', { title: 'NONONONONO'});
}