
/*
 * GET home page.
 */
var db;

exports.getDb = function(_db){
	db = _db;
}

exports.index = function(req, res){
	if(!req.user) res.render('index', { title: 'Express' });
	else res.redirect('/home.html');
}

exports.failed = function(req, res){
	res.render('failed', { title: 'NONONONONO'});
}

