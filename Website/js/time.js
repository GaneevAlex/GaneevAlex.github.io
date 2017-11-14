"use strict"

function currenttime(when) {
	var d = new Date();
	var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if (when == "current") {
		$(".currentdate").html(day[d.getDay()]+" "+d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear()+" y." +"<br/>"
		+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());	
	}
	else {
		$("#postingdate").html(d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear()+" y."
			+" "+d.getHours()+":"+d.getMinutes());		
	}
}

