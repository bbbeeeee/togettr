define(['models/project'], function(Project) {
	return Backbone.Collection.extend({
  		model: Project,
  		url: '/api/project',
    comparator: function(m){
      //return -m.get('dateCreated').getTime();
    },
    parse: function(response){
     
      return response;
    }
	});
});