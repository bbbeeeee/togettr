define(['models/contribution'], function(Contribution) {
	return Backbone.Collection.extend({
  	model: Contribution,
  	url: '/api/contribution'
	});
});