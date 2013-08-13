define(['models/task'], function(Task) {
	return Backbone.Collection.extend({
  	model: Task,
  	url: '/api/task'
	});
});