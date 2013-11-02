function more(ev, thing, thingId, thingName){
	var page = $(thingId' > li').length / 10;
        page = Math.ceil(page);
        thing.fetch({data: $.param({project: this.pid, page: page}),
          success: function(items, res, options){
            if(items.length != 0){
              _.each(items.models, function(item){
              	console.log("haha");
                if(item.attributes.creator == window.currentUser.attributes._id){

                  $(thingId).append('<li>' + item.get(thingName)  + 
                  '<i id="' + item.attributes._id + '" class="icon-trash deletable"></i></li>');

                }
                else{
                  $(thingId).append('<li>' + item.get(thingName)  + 
                  '</li>');
                }
              });
            }
            else console.log("no more");
          }});
        console.log(page);

}

//
var page = $('#contributions > li').length / 10;
        page = Math.ceil(page);
        window.contributions.fetch({data: $.param({project: this.pid, page: page}),
          success: function(items, res, options){
            if(items.length != 0){
              _.each(items.models, function(item){
                if(item.attributes.creator == window.currentUser.attributes._id){

                  $('#contributions').append('<li>' + item.get("contribution")  + 
                  '<i id="' + item.attributes._id + '" class="icon-trash deletable"></i></li>');

                }
                else{
                  $('#contributions').append('<li>' + item.get("contribution")  + 
                  '</li>');
                }
              });
            }
            else console.log("no more");
          }});
        console.log(page);
        //

        var page = $('#ideas > li').length / 10;
        page = Math.ceil(page);
        window.ideas.fetch({data: $.param({project: this.pid, page: page}),
          success: function(items, res, options){
            if(items.length != 0){
              _.each(items.models, function(item){
                if(item.attributes.creator == window.currentUser.attributes._id){
                  $('#ideas').append('<li>' + item.get("idea")  + 
                  '<i id="' + item.attributes._id + '" class="icon-trash deletable"></i></li>');
                }
                else{
                  $('#ideas').append('<li>' + item.get("idea")  + 
                  '</li>');
                }
              });
            }
            else console.log("no more");
          }});
        console.log(page);

        var page = $('#tasks > li').length / 10;
        page = Math.ceil(page);
        window.tasks.fetch({data: $.param({project: this.pid, page: page}),
          success: function(items, res, options){
            if(items.length != 0){
              _.each(items.models, function(item){
                if(item.attributes.creator == window.currentUser.attributes._id){
                  $('#ideas').append('<li>' + item.get("tasks")  + 
                  '<i id="' + item.attributes._id + '" class="icon-trash deletable"></i></li>');
                }
                else{
                  $('#ideas').append('<li>' + item.get("tasks")  + 
                  '</li>');
                }
              });
            }
            else console.log("no more");
          }});
        console.log(page);