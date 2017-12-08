/*Стартовые настройки*/
function startgame() {
	
	createcell();
	createcell();

	var $playfield = $('#playfield');
	var $everywhere = $('#playfield, html');
	var mousedown = false;

	$playfield.bind('mousedown').mousedown(function () {
	    mousedown = true;
	});

	/*Координаты курсора*/
	$playfield.on( "mousedown", function(e) {
	  xdown = e.clientX;
	  ydown = e.clientY;
	  joy(xdown, ydown);
	});

	$everywhere.on( "mouseup", function(e) {
	  xup = e.clientX;
	  yup = e.clientY;
	  if (mousedown) {
	  	direction();
	  	move();
	  	checknewsell();
	  }
	});

	$playfield.bind('mouseup').mouseup(function () {
	    mousedown = false;
	});
}