define(['collections/comments',
        'collections/contributions',
				'collections/ideas',
				'collections/projects',
				'collections/tasks',
				'collections/users',
				'models/comment',
        'models/contribution',
				'models/idea',
				'models/task'], 
			function(
				Comments,
        Contributions,
				Ideas,
				Projects,
				Tasks,
				Users,
				Comment,
        Contribution,
				Idea,
				Task){
	var ProjectPageView = Backbone.View.extend({
  el: '#content',
  events: {
    'submit .new-task-form': 'newTask',
    'submit .new-idea-form': 'newIdea',
    //'submit .new-comment-form': 'newComment',
    'submit .new-contribution-form': 'newContribution',
    'submit .join-form': 'join',
    'click .more': 'more',
    'click .deletable': 'delete' 
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
    this.pid=options.identifier;
    var _ideas, _tasks, _comments;
    var that = this;
    console.log(pid);
    console.log(window.projects);
    
    function moreOf(ev, thing, thingId, thingName){
      var page = $(thingId + ' > li').length / 10;
            page = Math.ceil(page);
            thing.fetch({data: $.param({project: this.pid, page: page}),
              success: function(items, res, options){
                if(items.length != 0){
                  _.each(items.models, function(item){
                    if(item.attributes.creator == window.currentUser.attributes._id){

                      $(thingId).append('<li>' + item.get(thingName)  + 
                      '<i id="' + item.attributes._id + '" class="icon-trash deletable"></i></li>');

                    }
                    else{
                      $(thingId).append('<li>' + item.get(thingName)  + 
                      '</li>');
                    }
                  });
                }
                else console.log("no more");
              }});
            console.log(page);
    }
    //maybe add later: only fetch again if do not already have in there
    /*
    if(window.projects.where({identifier: pid})[0] && window.contributions.where({project: pid}) != []){
      console.log(window.contributions.where({project: pid}));
      console.log(window.contributions)
      window.projects.fetch({data: $.param({identifier:pid}),
        success: function(){
          template.fillTemplate(that, '#project-page-template', {
            Project: window.projects.where({identifier: pid})[0],
            identifier: pid,
            currentUser: currentUser,
            ideas: window.ideas.where({project: pid}),
            tasks: window.tasks.where({project: pid}),
            contributions: window.contributions.where({project: pid})
          });
      }});
    */
    window.ideas.fetch
    ({add: true, remove: false, data: $.param({project: pid, page: 0}),
      success: function(ideaCollection, response, options){
        console.log(window.ideas);
        window.tasks.fetch({add: true, remove: false, data: $.param({project: pid, page: 0}),
          success: function(taskCollection, response, options){
            window.contributions.fetch({add: true, remove: false, data: $.param({project: pid, page: 0}),
              success: function(contributionCollection, response, options){
                var theProject = window.projects.where({identifier: pid})[0];
                if(theProject === undefined){
                  window.projects.fetch({add: true, remove: false, data: $.param({identifier:pid}),
                    success: function(_theProject, response, options){
                      theProject = window.projects.where({identifier: pid})[0];
                      var ideas = window.ideas.where({project: pid});
                      var tasks = window.tasks.where({project: pid});
                      var contributions = window.contributions.where({project: pid});
                      template.fillTemplate(that, '#project-page-template', {
                        Project: theProject,
                        identifier: pid,
                        currentUser: currentUser,
                        ideas: ideas,
                        tasks: tasks,
                        contributions: contributions
                      });
                    }});

                }
                else{
                  var ideas = window.ideas.where({project: pid});
                      var tasks = window.tasks.where({project: pid});
                      var contributions = window.contributions.where({project: pid});
                  template.fillTemplate(that, '#project-page-template', {
                    Project: theProject,
                    identifier: pid,
                    currentUser: currentUser,
                    ideas: ideas,
                    tasks: tasks,
                    contributions: contributions
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
    if(details.task != ""){
    var newTask = new Task(); 
    newTask.save(details, {
      success: function(task, res, options){
        if(res[0].creator == window.currentUser.attributes._id){
          console.log(window.currentUser.attributes._id);
          $('#tasks').prepend('<li>' + task.get("task") + 
            '<i id="' + res[0]._id + '" class="icon-trash deletable"></i></li>');
        }
        else{ 
          $('#tasks').prepend('<li>' + task.get("task") + '</li>');
        }
        $('.newTask').val("");
      },
      error: function(model, xhr, options){
      console.log('sss');
      if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
        window.location.href = "http://localhost:3000";
      }
    });
    return false;
    }
    else return false;
  },
  newIdea: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    if(details.idea != ""){
    var newIdea = new Idea();
    newIdea.save(details, {
      success: function(idea, res, options){
      	console.log(idea);
        if(res[0].creator == window.currentUser.attributes._id){
          $('#ideas').prepend('<li>' + idea.get("idea")  + 
            '<i id="' + res[0]._id + '" class="icon-trash deletable"></i></li>');
        
        }
        else{ 
          $('#ideas').prepend('<li>' + idea.get("idea") + '</li>');
        }
        $('.newIdea').val("");
      },
      error: function(model, xhr, options){
      console.log('sss');
      if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
        window.location.href = "http://localhost:3000";
      }
    });
    return false;
    }
    else return false;
  },
  /*newComment: function(ev){
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
  },*/
  newContribution: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    if(details.contribution != ""){
      $('.newContribution').val("");
    var newContribution = new Contribution();
    newContribution.save(details, {
      success: function(contribution, res, options){
        if(res[0].creator == window.currentUser.attributes._id){
          console.log(res);
          $('#contributions').prepend('<li>' + contribution.get("contribution")  + 
            '<i id="' + res[0]._id + '" class="icon-trash deletable"></i></li>');
          $('.newContribution').val("");
        }
        else{ 
          $('#contributions').append('<li>' + contribution.get("contribution") + '</li>');
        }
        $('.newContribution').val("");
      },
      error: function(model, xhr, options){
      console.log('error: ' + xhr.responseText);
      if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
        window.location.href = "http://localhost:3000";
      }
    });
    return false;
    }
    else return false;
  },
  join: function(ev){
    var details = $(ev.currentTarget).serializeObject();
    updatedProject = window.projects.where({_id: details.projectId})[0];
    console.log(window.projects);
    //should not happen because members is already initiated in creation of user
    if(typeof updatedProject.attributes.members == 'undefined'){
      //updatedProject.attributes.members = [details.userId];
      updatedProject.save({members: [details.userId], updateType: "join", projectId: details.projectId}, {
        success: function(project, res, options){
          //$('projectList').append('<li>' + project.attributes.name + '</li>');
          users.fetch({data: $.param({currentUser: true}), 
            success: function(uuser, res, options){
              currentUser = uuser.models[0];
              //$('projectList').append('<li>' + project.attributes.name + '</li>');
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
          window.users.fetch({data: $.param({currentUser: true}), 
            success: function(uuser){
              currentUser = uuser.models[0];
            }
          }); 
          $('#projectList').append('<li><a href="#/project/' +
                project.attributes.identifier + '">' + 
                project.attributes.name + '</a></li>'); 
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
    return false;
  },
  more: function(ev){
    console.log(ev.currentTarget.name);
    
    switch (ev.currentTarget.name)
    {
      case "contributions":
        moreOf(ev, window.contributions, "#contributions", "contribution");
        break;
      case "ideas":
        moreOf(ev, window.ideas, "#ideas", "idea");
        break;
      case "tasks":
        moreOf(ev, window.tasks, "#tasks", "task");
        break;
    }
  },
  delete: function(ev){
    console.log(ev.currentTarget);
    var name = ev.currentTarget.id;
    var x = $('i[id="' + name + '"]').parent().parent().attr('id');
    switch (x)
    {
      case "contributions":

        console.log(window.contributions);
        var g = window.contributions.where({_id: ev.currentTarget.id})[0];
        console.log(g);
        if(g == undefined){
          window.contributions.fetch({data: $.param({_id: ev.currentTarget.id}),
            success: function(collection, res, options){
              var g = window.contributions.where({_id: ev.currentTarget.id})[0];
              g.destroy({
                success: function(model, response, options){
                  console.log(model);
                  $('i[id="' + name + '"]').parent().remove();
                },
                error: function(model, xhr, options){
                  console.log(xhr);
                }
              });
            },
            error: function(collection, response, options){
            }
          });
        }
        else{
          g.destroy({
          success: function(model, response, options){
            console.log(model);
            $('i[id="' + name + '"]').parent().remove();
          },
          error: function(model, xhr, options){
            console.log(xhr);
          }
        });
        }
        console.log(g)
        break;
      case "ideas":
        console.log(window.ideas);
        var g = window.ideas.where({_id: ev.currentTarget.id})[0];
        console.log(g);
        if(g == undefined){
          console.log("1");
          window.ideas.fetch({data: $.param({_id: ev.currentTarget.id}),
            success: function(collection, res, options){
              var g = window.ideas.where({_id: ev.currentTarget.id})[0];
              g.destroy({
                success: function(model, response, options){
                  console.log(model);
                  $('i[id="' + name + '"]').parent().remove();
                },
                error: function(model, xhr, options){
                  console.log(xhr);
                }
              });
            },
            error: function(collection, response, options){
            }
          })
        }
        else{
          console.log("2");
          g.destroy({
          success: function(model, response, options){
            console.log(model);
            $('i[id="' + name + '"]').parent().remove();
            
          },
          error: function(model, xhr, options){
            console.log(xhr);
          }
        });
        }
        console.log(g)
        break;
      case "tasks":
        console.log(window.tasks);
        var g = window.tasks.where({_id: ev.currentTarget.id})[0];
        console.log(g);
        if(g == undefined){
          window.tasks.fetch({data: $.param({_id: ev.currentTarget.id}),
            success: function(collection, res, options){
              var g = window.tasks.where({_id: ev.currentTarget.id})[0];
              g.destroy({
                success: function(model, response, options){
                  console.log(model);
                  $('i[id="' + name + '"]').parent().remove();
                },
                error: function(model, xhr, options){
                  console.log(xhr);
                }
              });
            },
            error: function(collection, response, options){
            }
          })
        }
        else{
          g.destroy({
          success: function(model, response, options){
            console.log(model);
            $('i[id="' + name + '"]').parent().remove();
          },
          error: function(model, xhr, options){
            console.log(xhr);
          }
        });
        }
        console.log(g)
        break;
    }
  }
	});
	return ProjectPageView;
});