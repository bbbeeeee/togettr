define(['models/task'], function(Task) {
	return Backbone.Collection.extend({
  	model: Task,
  	url: '/api/task',
    comparator: function(m){
      return -m.get('dateCreated').getTime();
    },
    parse: function(response){
      console.log(response);
      if(response.length > 0){
        _.each(response, function(item, index, list){
          response[index].dateCreated = new Date(response[index].dateCreated);

        });
      }
      
      return response;
    }
	});
});