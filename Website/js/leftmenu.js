"use strict"

var visability = false;
var margins;
var move;

function leftmenu() {

$('#leftmenu').click(function(){

	if (visability == false) {
		margins = 210;
		$('aside div').show("drop");
		$('#leftmenu strong').html('&laquo');
		$('header, section, footer').css({"margin-left": +margins+"px"});
		visability = true;	
	}
	else {
		$('aside div').hide("drop");
		$('#leftmenu').hide("slide");

		setTimeout (function(){ 
			$('#leftmenu strong').html('&raquo');
			move = setInterval(function(){
			margins -=10;
			
			if (margins <= 10) {
				clearInterval(move);
			}

			$('header, section, footer').css({"margin-left": +margins+"px"});
			}, 10);
		},300);

		visability = false;			
		$('#leftmenu').show("slide");
	}
});	
}
