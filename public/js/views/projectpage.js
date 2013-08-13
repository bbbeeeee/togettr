define(['collections/comments',
				'collections/ideas',
				'collections/projects',
				'collections/tasks',
				'collections/users',
				'models/comment',
				'models/idea',
				'models/task'], 
			function(
				Comments,
				Ideas,
				Projects,
				Tasks,
				Users,
				Comment,
				Idea,
				Task){
	var ProjectPageView = Backbone.View.extend({
  el: '#content',
  events: {
    'submit .new-task-form': 'newTask',
    'submit .new-idea-form': 'newIdea',
    'submit .new-comment-form': 'newComment',
    'submit .join-form': 'join'
  },
  render: function(options) {
  	var projects = new Projects();
		var ideas = new Ideas();
		var comments = new Comments();
		var tasks = new Tasks();
		var users = new Users();
		var currentUser;
		users.fetch({data: $.param({currentUser: true}), 
		  success: function(uuser){
		    currentUser = uuser.models[0];
		  }
		}); 
    var pid = options.identifier;

    var _ideas, _tasks, _comments;
    var that = this;


    window.ideas.fetch
    ({data: $.param({project: pid, page: 0}),
      success: function(ideaCollection, response, options){
        window.tasks.fetch({data: $.param({project: pid, page: 0}),
          success: function(taskCollection, response, options){
            window.comments.fetch({data: $.param({project: pid, page: 0}),
              success: function(commentCollection, response, options){

                var theProject = window.projects.where({identifier: pid})[0];
                if(theProject === undefined){
                  window.projects.fetch({data: $.param({identifier:pid}),
                    success: function(_theProject, response, options){
                      theProject = window.projects.where({identifier: pid})[0];
                      console.log(theProject);
                      template.fillTemplate(that, '#project-page-template', {
                        Project: theProject,
                        identifier: pid,
                        currentUser: currentUser,
                        ideas: ideaCollection.models,
                        tasks: taskCollection.models,
                        comments: commentCollection.models
                      });
                    }});

                }
                else{
                  template.fillTemplate(that, '#project-page-template', {
                    Project: theProject,
                    identifier: pid,
                    currentUser: currentUser,
                    ideas: ideaCollection.models,
                    tasks: taskCollection.models,
                    comments: commentCollection.models
                  });
                }
            }
          });
        }
      });
    },
      error: function(collection, response, options){
        console.log(response);
        _ideas = response;
        console.log(collection);
        if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
         window.location.href = "http://localhost:3000";
      }}); 
  },
  newTask: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    var newTask = new Task(); 
    newTask.save(details, {
      success: function(task, res, options){
        $('#tasks').append('<li>' + task.get("task") + '</li>');
        $('.newTask').val("");
      },
      error: function(model, xhr, options){
      console.log('sss');
      if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
        window.location.href = "http://localhost:3000";
      }
    });
    return false;
  },
  newIdea: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    var newIdea = new Idea();
    newIdea.save(details, {
      success: function(idea, res, options){
      	console.log(idea);
        $('#ideas').append('<li>' + idea.get("idea") + '</li>');
        $('.newIdea').val("");
      },
      error: function(model, xhr, options){
      console.log('sss');
      if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
        window.location.href = "http://localhost:3000";
      }
    });
    return false;
  },
  newComment: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    var newComment = new Comment();
    newComment.save(details, {
      success: function(comment, res, options){
        $('#comments').append('<li>' + comment.get("comment") + '</li>');
        $('.newComment').val("");
      },
      error: function(model, xhr, options){
      console.log('error: ' + xhr.responseText);
      if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
        window.location.href = "http://localhost:3000";
      }
    });
    return false;
  },
  join: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    updatedProject = window.projects.where({_id: details.projectId})[0];
    console.log(window.projects);
    if(typeof updatedProject.attributes.members == 'undefined'){
      //updatedProject.attributes.members = [details.userId];
      updatedProject.save({members: [details.userId], updateType: "join", projectId: details.projectId}, {
        success: function(project, res, options){
          users.fetch({data: $.param({currentUser: true}), 
            success: function(uuser){
              currentUser = uuser.models[0];
            }
          }); 
          window.router.navigate('', {trigger: true});
        },
        error: function(model, xhr, options){
          if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
            window.location.href = "http://localhost:3000";
        }  
      });
      return false;
    }
    else if(updatedProject.attributes.members.indexOf(details.userId) == -1){
      updatedProject.attributes.members.push(details.userId);
      var x = updatedProject.attributes.members;
      updatedProject.save({members: x, updateType: "join", projectId: details.projectId}, {
        success: function(project, res, options){
          users.fetch({data: $.param({currentUser: true}), 
            success: function(uuser){
              currentUser = uuser.models[0];
            }
          }); 
          window.router.navigate('', {trigger: true});
        },
        error: function(model, xhr, options){
          if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
            window.location.href = "http://localhost:3000";
        }  
      });
      return false;
    }
    else if(updatedProject.attributes.members.indexOf(details.userId) != -1){
			console.log("already joined");
			return false;
    }
    console.log(updatedProject);
    //sync updated project, add to project list of user with userId --- all in project.join
    return false;
  }
	});
	return ProjectPageView;
});