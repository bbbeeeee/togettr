$(document).ready(function(){
var sidebarVisible = true;
console.log("LOL");
$('#toggleSidebar').css({color: "red"});
$('#toggleSidebar').click(function(){
	console.log("lol");
	if(sideBarVisible == 1){
		$('#sidebar').animate({
			left: "-=250",
		}, 1000, function(){
			$('#toggleSidebar').animate({
				left: "+=50"
			}, 500, function(){ sideBarVisible = false });
		});
	}else{
		$('#sidebar').animate({
			left: "-=250",
		}, 1000, function(){
			$('#toggleSidebar').animate({
				left: "-=50"
			}, 500, function(){ sidebarVisible = true });
		});
	}
});
});