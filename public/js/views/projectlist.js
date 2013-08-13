define(['collections/users', 
        'collections/projects', 
        'util/template'], 
        function(Users, 
          Projects,
          TemplUtil){
  var ProjectListView = Backbone.View.extend({
  el: '#projects',
  render: function(){
        var that = this;
    window.users.fetch({data: $.param({currentUser: true}), 
      success: function(uuser){
        window.projects.fetch();
        currentUser = uuser.models[0];
        console.log(currentUser.attributes.projects);
        console.log(projects);
        _projects = currentUser.attributes.projects;
        var _userProjects = [];
        //need logic to test if already queried for projects
        
        for(var i = 0; i < _projects.length; i++){
          var x = window.projects.get({id: _projects[i]});
          console.log(_projects[i]);
          console.log(window.projects)
          window.projects.fetch({data: $.param({_id: _projects[i]}),
            success: function(_theProject, response, options){
              //_userProjects[i] = projects.where({_id: _projects[i]}); 
              console.log(_theProject.models[0].attributes.name);
              $('#projectList').append('<li><a href="#/project/' +
                _theProject.models[0].attributes.identifier + '">' + 
                _theProject.models[0].attributes.name + '</a></li>'); 
          }
        });

        }
        console.log("hahah");
        //window.template.fillTemplate(that, '#user-project-list-template', {userProjects: _userProjects});
          
      }
        
    });
  }
  });

  return ProjectListView;
});