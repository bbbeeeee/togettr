define(['models/project', 'util/template'], function(Project, TemplUtil){
	var NewProjectView = Backbone.View.extend({
	  el: '#content',
	  events: {
	    'submit .new-project-form': 'submitProject'
	  },
	  submitProject: function(ev){
	  	
	    var projectDetails = $(ev.currentTarget).serializeObject();
	    
	    console.log(projectDetails);
	    newProject = new Project();
	    newProject.save(projectDetails, {
	      success: function(project, res, options){
	        console.log(res[0]);
	        window.router.navigate('', {trigger: true});
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
	  	var template = new TemplUtil();
	    window.template.fillTemplate(this, '#new-project-template', {});
	  }
	});
	return NewProjectView;
})