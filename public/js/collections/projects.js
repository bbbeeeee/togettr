define(['models/project'], function(Project) {
	return Backbone.Collection.extend({
  		model: Project,
  		url: '/api/project'
	});
});