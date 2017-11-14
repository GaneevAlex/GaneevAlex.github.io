"use strict"

var toggle = true;

function togglemousescroll(bool) {

	if (bool == toggle) {
			
			toggle = true;
		}
		else {
			toggle = false;
		}

	document.onmousewheel=function(){ 
		return toggle;
	};
};

function supportform() {

	var supp = $('#support');

	supp.prev().click(function(){
		togglemousescroll(false);
		supp.toggle();
		supp.find('input:first').focus();
	});
	
	supp.find('h1').click(function(){
		supp.hide();
		togglemousescroll(false);
	});

	$("input[value = 'Submit']").click(function(){
		supp.css({"display" : "none"});
		$('#successmessage').append("<p>Successful</p>");
		supp.find('form')[0].reset();
		$('#successmessage p').hide("highlight", {color: 'green'}, 1000);
		setTimeout(function(){
			$('#successmessage p').remove();
		}, 1000);

		togglemousescroll(false);
	});
}