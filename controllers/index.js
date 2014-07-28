
/*
 * GET home page.
 */
var db;

exports.getDb = function(_db){
	db = _db;
}
//if not logged in redirect to /login
//if logged in render index.html in public
//in order to have pretty urls
exports.index = function(req, res){
	if(!req.user) res.redirect('/join.html');
	else res.redirect('/home');
}

exports.failed = function(req, res){
	res.render('failed', { title: 'Uh oh...'});
}

