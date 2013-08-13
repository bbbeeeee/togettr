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



/*
  app.get('/projects', project.projects);
  app.get('/projects/more', project.moreProjects); //More (JSON response)
  app.get('/project/:id', project.project);
  app.post('/open/project', project.open);

  
/*
  app.post('/project/:id/comment', discussion.comment);
  app.del('/project/:id/comment/:id', discussion.deleteComment);
  app.post('/project/:id/task', task.add);
  app.del('/project/:id/task', task.del);
  app.put('/project/:id/finishtask', task.finish);
  app.post('/project/:id/idea', idea.add);
  app.del('/project/:id/idea', idea.del);
*/
  app.get('/api/user', user.getCurrentUser);
  app.put('/api/user/:id', user.update);
  
  app.post('/api/project', project.create);
  app.get('/api/project/:id', project.get);
  app.get('/api/project', project.get); //search
  app.del('/api/project/:id', project.del);
  app.put('/api/project/:id', project.update);
  app.put('/api/project/:id/join', project.join);

  app.post('/api/idea', idea.add);
  app.get('/api/idea', idea.getAll);
  app.get('/api/idea/:id', idea.getOne);
  app.del('/api/idea/:id', idea.del);
  //app.put('/api/idea/:id', idea.update);

  app.post('/api/comment', discussion.addComment);
  app.get('/api/comment', discussion.getAllComments);
  app.get('/api/comment/:id', discussion.getOneComment);
  app.del('/api/comment/:id', discussion.delComment);

  app.post('/api/task', task.add);
  app.get('/api/task', task.getAll);
  app.get('/api/task/:id', task.getOne);
  app.del('/api/task/:id', task.del);
  app.put('/api/task/:id', task.update);


  /* API Maybe?
  You can create, read, update, or delete
		Project (gets all tasks, ideas, and discussion/updates, and members)
		Task
		Idea
		

		Members can be added to projects, tasks

		All project, task, idea are going to be attributed to a creator (member)

  
   
  app.post('/api/project', project.create);
  app.get('/api/project/:id', project.get);
  app.del('/api/project/:id', project.del);


  app.post('/api/task', task.create);
  app.get('/api/task/:id', task.get);
  app.del('/api/task/:id', task.del);
  app.put('/api/task/:id', task.update);

  app.post('/api/idea', idea.create);
  app.get('/api/idea/:id', idea.get);
  app.del('/api/idea/:id', idea.del);
  app.put('/api/idea/:id', idea.update);

  app.get('/api/project/:id/members', project.getProjectMembers);
  app.get('/api/project/:id/members/:memberID', project.getMember);

  //When someone joins a project, they will be added to it


  //users
  app.put('/project/:id/join', user.joinProject);
  app.get('/user/:id', user.getUser);
	*/


}