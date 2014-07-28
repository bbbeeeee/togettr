define([], function(Users, Projects, TemplUtil){
	
	var HomeView = Backbone.View.extend({
	  el: '#content',
	  render: function(){
	    $('#content').html("Check out your projects, join one in the fascinatory, or start a new one!");
	  }
	});
	return HomeView;
});