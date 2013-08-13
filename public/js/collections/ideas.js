define(['models/idea'], function(Idea) {
	return Backbone.Collection.extend({
  	model: Idea,
  	url: '/api/idea'
	});
});