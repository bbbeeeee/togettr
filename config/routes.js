/*----------------Routes for site-----------------------
	Command center for routing
	When adding routes, if you use a new controller, add them at top


<input type="hidden" name="_method" value="put"/>
<input type="hidden" name="_method" value="delete"/>

*/
var mongoose = require('mongoose')
	, user = require('../controllers/user.js')
	, project = require('../controllers/project.js')
	, controllers = require('../controllers');
module.exports = function(app, passport, db){
	

	app.get('/', controllers.index);
	app.get('/failed', controllers.failed);
	app.put('/delete', project.delete);
	//--------------Users-----------------

	app.post('/auth/local', 
		passport.authenticate('local', { successRedirect: '/', failureRedirect: '/failed'}), 
		function(req, res){});
	/*
	app.get('/auth/facebook', passport.authenticate('facebook', 
		{ scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), 
		user.signin);
  app.get('/auth/facebook/callback', 
  	passport.authenticate('facebook', { failureRedirect: '/login' }), 
  	users.authCallback);
*/
	app.get('/auth/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
  app.post('/auth/signup', user.signup);


  //projects
  //app.get('/projectlist', project.getProjectlist);

  //app.get('/projects/:id', project.)
}