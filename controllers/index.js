
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.failed = function(req, res){
	res.render('failed', { title: 'NONONONONO'});
};