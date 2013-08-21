requirejs.config({
  baseUrl: '../js',
  paths: {
    "jquery": [
      "//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min",
      "vendor/jquery/jquery.min"
    ],
    "underscore": [
      "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min",
      "vendor/backbone/backbone.min"
    ],
    "backbone": [
      "//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min",
      "vendor/backbone/backbone.min"
    ]
  }
});
require([
  'models/comment',
  'models/contribution',
  'models/idea', 
  'models/project', 
  'models/task', 
  'models/user',
  'collections/comments',
  'collections/contributions',
  'collections/ideas',
  'collections/projects',
  'collections/tasks',
  'collections/users',
  'views/explore',
  'views/home',
  'views/newproject',
  'views/projectpage',
  'views/projectlist',
  'util/template'
  ],
  function(
    Comment,
    Contribution,
    Idea,
    Project,
    Task,
    User,
    Comments,
    Contributions,
    Ideas,
    Projects,
    Tasks,
    Users,
    ExploreView,
    HomeView,
    NewProjectView,
    ProjectPageView,
    ProjectListView,
    Templ) 
  {
//var template = new templ();
//var strings = new Strings();
window.template = new Templ();
$.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://localhost:3000' + options.url;
});

var sidebarVisible = true;

$('#toggleSidebar').click(function(){
  if(sidebarVisible == true){
    sidebarVisible = false;
    $('#sidebar').animate({
      left: "-=250"
    },300);
    $('#toggleSidebar').animate({
      left: "-=200"
    },300);
    $('#content').animate({
      marginLeft: "-=250"
    }, 300);
    
  }else{
    sidebarVisible = true;
    $('#sidebar').animate({
      left: "+=250",
    }, 300);
    $('#toggleSidebar').animate({
        left: "+=200",
      }, 300);
    $('#content').animate({
      marginLeft: "+=250"
    }, 300);
    
  }
});

// Collections

window.projects = new Projects();
window.ideas = new Ideas();
window.comments = new Comments();
window.contributions = new Contributions();
window.tasks = new Tasks();
window.users = new Users();

users.fetch({data: $.param({currentUser: true}), 
  success: function(uuser){
    
    window.currentUser = uuser.models[0];
    console.log(window.currentUser);
    var j = new Date(window.currentUser.attributes.dateCreated);
    console.log(new Date(window.currentUser.attributes.dateCreated).getDate());

  }
}); 



window.projects.fetch();
console.log(window.projects);


function getUserProjects(){
   window.users.fetch({data: $.param({currentUser: true}), 
      success: function(uuser, res, options){
        window.projects.fetch();
        currentUser = uuser.models[0];
        _projects = window.currentUser.attributes.projects;
        var _userProjects = [];
        
        
        for(var i = 0; i < _projects.length; i++){
          var x = window.projects.get({id: _projects[i]});
          console.log(_projects[i]);
          console.log(window.projects);
          //check if projects already in here         
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
          
      },
      error: function(model, xhr, options){
        console.log("screwed");
      }
        
    });
}

getUserProjects();



// Views
var homeView = new HomeView();
var newProjectView = new NewProjectView();
var projectPageView = new ProjectPageView();
var exploreView = new ExploreView();
var projectListView = new ProjectListView();
var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'incubator': 'fascinatory',
    'fascinatory': 'fascinatory',
    'explore': 'explore',
    'explore?*queryString': 'exploreMore',
    'project/:identifier': 'project',
    'new-project': 'newproject'
  },
  home: function(){
    //projectListView.render();
    homeView.render();

  },
  fascinatory: function(){
    exploreView.render();
  },
  exploreMore: function(queryString){
    var searchString = $.QueryString.searchString ? $.QueryString.searchString : "";
    var page = ($.QueryString.page) ? $.QueryString.page : 1;
    console.log(page);
  },
  project: function(identifier){
    projectPageView.render({identifier: identifier});
  },
  newproject: function(){
    newProjectView.render();
  }
});

window.router = new Router();


Backbone.history.start();


});