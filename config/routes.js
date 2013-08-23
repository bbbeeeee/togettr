/*----------------Routes for site-----------------------
	Command center for routing
	When adding routes, if you use a new controller, add them at top


<input type="hidden" name="_method" value="put"/>
<input type="hidden" name="_method" value="delete"/>

God gave people two eyes, two ears, and one mouth﻿ so they can look and listen twice as much as they talk


I need updates to be aggregate of all updates in project
*/
var mongoose = require('mongoose')
	, user = require('../controllers/user')
	, project = require('../controllers/project')
  , discussion = require('../controllers/discussion')
  , task = require('../controllers/task')
  , idea = require('../controllers/idea.js')
  , contribution = require('../controllers/contribution.js')
	, controllers = require('../controllers');

module.exports = function(app, passport, db){
	
  //app.get('/login', controllers.login);
	app.get('/', controllers.index);
	app.get('/failed', controllers.failed);

	//--------------Users-----------------

	app.post('/auth/local', 
		passport.authenticate('local', { successRedirect: '/', failureRedirect: '/failed'}), 
		function(req, res){});
	app.get('/auth/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
  app.post('/auth/signup', user.signup);

  app.get('/api/user', user.getUser);
  app.put('/api/user/:id', user.update);
  
  app.post('/api/project', project.create);
  app.get('/api/project/:id', project.get);
  app.get('/api/project', project.get); 
  app.del('/api/project/:id', project.del);
  app.put('/api/project/:id', project.update);

  app.post('/api/idea', idea.add);
  app.get('/api/idea', idea.getAll);
  app.get('/api/idea/:id', idea.getOne);
  app.del('/api/idea/:id', idea.del);
  app.put('/api/idea/:id', idea.update);

  app.post('/api/discussion', discussion.addComment);
  app.get('/api/discussion', discussion.getAllComments);
  app.get('/api/discussion/:id', discussion.getOneComment);
  app.del('/api/discussion/:id', discussion.delComment);

  app.post('/api/contribution', contribution.add);
  app.get('/api/contribution', contribution.getAll);
  app.get('/api/contribution/:id', contribution.getOne);
  app.del('/api/contribution/:id', contribution.del);
  app.put('/api/contributions/:id', contribution.update);
  
  app.post('/api/task', task.add);
  app.get('/api/task', task.getAll);
  app.get('/api/task/:id', task.getOne);
  app.del('/api/task/:id', task.del);
  app.put('/api/task/:id', task.update);

}