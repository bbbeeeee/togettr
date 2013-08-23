define(['models/comment'], function(Comment) {
	return Backbone.Collection.extend({
  	model: Comment,
  	url: '/api/comment',
    comparator: function(m){
      return -m.get('dateCreated').getTime();
    },
    parse: function(response){
      console.log(response);
      _.each(response, function(item, index, list){
        response[index].dateCreated = new Date(response[index].dateCreated);

      });
      console.log(response[0].dateCreated.getDate());
      return response;
    }
	});
});