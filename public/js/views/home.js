define([], function(Users, Projects, TemplUtil){
	
	var HomeView = Backbone.View.extend({
	  el: '#content',
	  render: function(){
	    $('#content').html("Need to make home (tasks, updates, etc.) page layout");
	  }
	});
	return HomeView;
});