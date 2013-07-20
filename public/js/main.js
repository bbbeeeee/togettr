function htmlEncode(value){
  return $('<div/>').text(value).html();
}

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


/* How this is all gonna work
Projects will hold the models:
  Project (project info)
  Idea (idea with info)
  Comment (comment with info)
  Task (task with info)
  and aggregate them based on the Project identifier (project-identifier)
*/





var Project = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: '/api/project'
});

var Idea = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: '/api/idea'
});

var Comment = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: '/api/comment'
});

var Task = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: '/api/task'
});

var Projects = Backbone.Collection.extend({
  model: Project,
  url: '/api/project'
});


var pro = new Project();
var search_params = {
  name: 'a'
}
var x = pro.fetch({data: $.param(search_params)});
console.log(x);
var NewProjectView = Backbone.View.extend({
  el: '#content',
  events: {
    'submit .new-project-form': 'submitProject'
  },
  submitProject: function(ev){
    var projectDetails = $(ev.currentTarget).serializeObject();
    
    console.log(projectDetails);
    project.save(projectDetails, {
      success: function(project, res, options){
        console.log(res[0]);
        Projects.add(res);
        router.navigate('', {trigger: true});
      },
      error: function(model, xhr, options){
        console.log('sss');
        if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
         window.location.href = "http://localhost:3000";

      }
    });
    return false;
  },
  render: function() {
    
    var template = _.template($('#new-project-template').html(), {});
    this.$el.html(template);
  }
});

var ProjectPageView = Backbone.View.extend({
  el: '#content',
  events: {
    'submit .new-task-form': 'newTask',
    'submit .new-idea-form': 'newIdea',
    'submit .new-comment-form': 'newComment',

  },
  render: function(options) {

    var template = _.template($('#project-page-template').html(), {identifier: options.identifier});
    this.$el.html(template);
  },
  newTask: function(){

  },
  newIdea: function(){

  },
  newComment: function(){

  }
});

var ExploreView = Backbone.View.extend({
  el: '#content',
  events: {

  },
  render: function() {
    var ssearch_params = {
      name: 'a'
    }
    var that = this;
    projects.fetch({
      success: function(pprojects){
        console.log(pprojects);
        var template = _.template($('#explore-template').html(), {projects: pprojects.models});
        that.$el.html(template);
      }
    });
    
  }
});

// Collections
var projects = new Projects();

// Models
var project = new Project();
var idea = new Idea();
var task = new Task();
var comment = new Comment();

// Views
var newProjectView = new NewProjectView();
var projectPageView = new ProjectPageView();
var exploreView = new ExploreView();

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'explore': 'explore',
    'explore?*queryString': 'exploreMore',
    'project/:identifier': 'project',
    'new-project': 'newproject'
  },
  home: function(){
    $('#content').html("fdgasdfgadf");
  },
  explore: function(){
    exploreView.render();
  },
  exploreMore: function(queryString){
    var searchString = $.QueryString["searchString"] ? $.QueryString["searchString"] : "";
    var page = ($.QueryString["page"]) ? $.QueryString["page"] : 1;
    console.log(page);
  },
  project: function(identifier){
    console.log("KASJLDAS");
    projectPageView.render({identifier: identifier});
  },
  newproject: function(){
    newProjectView.render();
  }
});

var router = new Router;
/*
router.on('route:home', function(){
  $('#content').html("<label>Search</label>");
});

router.on('route:explore', function(){
    exploreView.render();
});

router.on('route:exploreMore', function(queryString){
  var searchString = $.QueryString["searchString"] ? $.QueryString["searchString"] : "";
  var page = ($.QueryString["page"]) ? $.QueryString["page"] : 1;
  console.log(page);

})
router.on('project', function(identifier){
  console.log("KASJLDAS");
  projectPageView.render({identifier: id});
});

router.on('route:new-project', function(){
  newProjectView.render();
});
*/



Backbone.history.start();
