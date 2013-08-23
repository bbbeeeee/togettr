define(['models/idea'], function(Idea) {
	return Backbone.Collection.extend({
  	model: Idea,
  	url: '/api/idea',
    comparator: function(m){
      return -m.get('dateCreated').getTime();
    },
    parse: function(response){
      console.log(response);
       if(response.length > 0){
        _.each(response, function(item, index, list){
          console.log(response.length);
          response[index].dateCreated = new Date(response[index].dateCreated);

        });
      }
      
      return response;
    }
	});
});