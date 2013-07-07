/*----------------Routes for site-----------------------
	Command center for routing
	When adding routes, if you use a new controller, add them at top




*/
var mongoose = require('mongoose')
	, user = require('../controllers/user.js')
	, controllers = require('../controllers');
module.exports = function(app, passport, db){
	

	app.get('/', controllers.index);
	app.get('/failed', controllers.failed);
	//--------------Users-----------------

	app.post('/auth/local', 
		passport.authenticate('local', { successRedirect: '/', failureRedirect: '/failed'}), 
		function(req, res){
			res.redirect('/', {title: "u in nigga"});
		});
	/*
	app.get('/auth/facebook', passport.authenticate('facebook', 
		{ scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), 
		user.signin);
  app.get('/auth/facebook/callback', 
  	passport.authenticate('facebook', { failureRedirect: '/login' }), 
  	users.authCallback);
*/
  app.post('/signup', user.signup);
}