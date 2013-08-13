define(function(){
	var Templ = function(){};

	Templ.prototype = {
		fillTemplate: function(that, templ, fillers){
  		var template = _.template($(templ).html(), fillers);
  		that.$el.html(template);
		}
	}
	return Templ;
});