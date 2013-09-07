define(['collections/projects', 
        'util/template'], 
	function(Projects, 
          TemplUtil){
	var ExploreView = Backbone.View.extend({
  el: '#content',
  events: {
    'submit .joinForm': 'join',
    'click .joinButton': 'join'
  },
  render: function() {
    var that = this;
    window.projects.fetch({data: $.param({page: 1}), 
      success: function(pprojects){
        console.log(window.projects);
        
        window.template.fillTemplate(that, '#explore-template', {projects: pprojects.models});
      },
      error: function(model, xhr, options){
        if(xhr.responseText == "failed" || xhr.responseText == "not logged in")
         window.location.href = "http://localhost:3000";
      }
    }); 
  },
  join: function(ev) {
    var details = $(ev.currentTarget).serializeObject();
    console.log(details);
    updatedProject = window.projects.findWhere({id: details.projectId});
    
    
    return false;
  }
  });
  return ExploreView;
})