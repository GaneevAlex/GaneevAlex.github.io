function mainMenu() {

	var menu = document.createElement('form');
	menu.id = 'mainmenu';
	$(menu).html('<h2> SNAKE </h2>'+'<h4> Main Menu </h4>');
	$(menu).append("<input type = 'button' id = start value = 'Start Game'>");
	$(menu).append("<input type = 'button' id = setting value = 'Setting'>");

	$('body').append(menu);
	
	settings();

	$('#start').click(function(){
		//animation button
		$('#start').effect("pulsate",{times:3}, 300, function(){
		//Animation main menu		
		$('#mainmenu').fadeOut(500, startgame);	
		});	
	});
	//Animation main menu and settings
	$('#setting').click(function() {
		$('#mainmenu').slideUp(400, function() {
			$('#menusettings').slideDown();
		})
	});
}

//Set settings
function settings() {
	//for save parameters after game over
	var setwall = wall;	
	var seteat = eatn;
	//create menu
	var menu = document.createElement('form');
	menu.id = 'menusettings';
	$(menu).slideUp(0);
	$(menu).html("<legend> Settings menu </legend>");
	//Speed
	var speedrange = document.createElement('div');
	$(speedrange).html("<h4>Speed snake:</h4>");
	$(speedrange).append("<input type = 'range' id = speedinput min = 1 max = 10 step = 1 value = " +String(500/speed)+ " >");
	$(speedrange).on('input', speedy);
	//Change speed
	function speedy() {
		var speedinput = $('#speedinput');
		speed = 500/speedinput.val();
	} 
	//Number of walls
	var wallmenu = document.createElement('div');
	$(wallmenu).html("<h4>Number of walls:</h4>");
	$(wallmenu).append("<input type = 'number' id = wallinput min = 0 max = 20 step = 1 value =" +String(setwall)+ " >")
	$(wallmenu).on('input', walls);
	$(wallmenu).keypress(function(e){
		return false;
	});
	//Change number walls
	function walls() {
		var wallinput = $('#wallinput');
		wall = wallinput.val();
		setwall = wall;
	}
	//Number of eats
	var eatmenu = document.createElement('div');
	$(eatmenu).html("<h4>Number of eats:</h4>");
	$(eatmenu).append("<input type = 'number' id = eatinput min = 1 max = 20 step = 1 value = " +String(seteat)+ ">")
	$(eatmenu).on('input', eats);
	$(eatmenu).keypress(function(e) {
		return false;
	});
	//Change number of eat
	function eats() {
		var eatinput = $('#eatinput');
		eatn = eatinput.val();
		seteat = eatn;
	}
	
	$('body').append(menu);
	$(menu).append(speedrange);
	$(menu).append(wallmenu);
	$(menu).append(eatmenu);
	//Button save
	$(menu).append("<input type = 'button' id = save value = 'Save changes'>");
	var save = $('#save');
	$(save).click(function() {
		$(menu).slideUp(400, function() {
			$('#mainmenu').slideDown()})   //animation menu
	});
}
