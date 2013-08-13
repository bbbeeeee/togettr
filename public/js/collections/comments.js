define(['models/comment'], function(Comment) {
	return Backbone.Collection.extend({
  	model: Comment,
  	url: '/api/comment'
	});
});