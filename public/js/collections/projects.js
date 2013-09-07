define(['models/project'], function(Project) {
	return Backbone.Collection.extend({
  		model: Project,
  		url: '/api/project',
    comparator: function(m){
      //return -m.get('dateCreated').getTime();
    },
    parse: function(response){
      console.log("Projects:");
      console.log(response);
      for(var i = 0; i < response.length; i++){
        response[i].shortIdea = response[i].idea.substring(0, 230) + "...";
      }
      return response;
    }
	});
});