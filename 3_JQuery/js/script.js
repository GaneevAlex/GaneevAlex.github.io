"use strict";

//Date for game
var interval;
var positionx = 0;
var positiony = 0;
var lastpositionx = 0;
var lastpositiony = 0;
var cell = 20; //Number cells
var eatn = 3; //Number eat
var direct = 'right'; //direction snake
var wall = 5; //number of wall
var speed = 100;
var field;

//Main menu
function mainMenu() {

	var menu = document.createElement('form');
	menu.id = 'mainmenu';
	$(menu).html('<h2> SNAKE </h2>'+'<h4> Main Menu </h4>');
	$(menu).append("<input type = 'button' id = start value = 'Start Game'>");
	$(menu).append("<input type = 'button' id = setting value = 'Setting'>");

	$('body').append(menu);
	
	settings();

	$('#start').click(startgame);
	//Animation main menu and settings
	$('#setting').click(function() {
		$('#mainmenu').slideUp(400, function() {
			$('#menusettings').slideDown();
		})
	});
}

//Create new game
function startgame() {
	
	//Animation main menu
	$('#mainmenu').fadeOut(500, play);
	//Start drow
	function play() {
			field = document.createElement('table');
			$(field).css({'display' : 'none'});
			$('body').append(field);
			createField(cell, cell);
			setCell(positionx, positiony, 'red');
			elem(eatn, 'green');
			elem(wall, 'yellow');
			//Animation field
			$(field).fadeIn(500, function() {
					interval = setInterval(function(){move()}, speed)
				});
		}
}

//Set settings
function settings() {
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
	$(wallmenu).append("<input type = 'number' id = wallinput min = 0 max = 20 step = 1 value =" +String(wall)+ " >")
	$(wallmenu).on('input', walls);
	$(wallmenu).keypress(function(e){
		return false;
	});
	//Change number walls
	function walls() {
		var wallinput = $('#wallinput');
		wall = wallinput.val();
	}
	//Number of eats
	var eatmenu = document.createElement('div');
	$(eatmenu).html("<h4>Number of eats:</h4>");
	$(eatmenu).append("<input type = 'number' id = eatinput min = 1 max = 20 step = 1 value = " +String(eatn)+ ">")
	$(eatmenu).on('input', eats);
	$(eatmenu).keypress(function(e) {
		return false;
	});
	//Change number of eat
	function eats() {
		var eatinput = $('#eatinput');
		eatn = eatinput.val();
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
			$('#mainmenu').slideDown()})
	});
}

//Random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Create game field
function createField(columns, rows) {
	
	for (var i = 1; i <= rows; i++) {
		var tr = document.createElement('tr');
			for (var j = 1; j <= columns; j++) {
				var td = document.createElement('td');
				$(td).css({'background-color' : 'white'});
				$(tr).append(td);
			}
		$(field).append(tr);
	}
}

//Create color cell
function setCell(x, y, color) {
	
	var row = field.rows[y].cells[x];

	if (color == 'red' || color == 'white') {
		
		if (row.style.backgroundColor == 'green') {
			if (eatn > 1) {
			eatn--;
			}
			else if (eatn == 1) {
				$('body').html("<h1>Congraduation you win!</h1>");
				clearInterval(interval);
				document.onkeyup = function() {
				location.reload();
			}		
		}
	}

		else if (row.style.backgroundColor == 'yellow') {
				$('body').html("<h1>Game over, you crash of wall!</h1>");
				clearInterval(interval);
				document.onkeyup = function() {
				location.reload();
				}
		}
		
		row.style.backgroundColor = color;
	}
	
	else {
		if (row.style.backgroundColor != 'white') {
			setCell(getRandomInt(1, cell-2), getRandomInt(1, cell-2), color);
		}
		else {
			row.style.backgroundColor = color;
		}
	}
}

//create elements n times in random place
function elem (n, color) {
	for (var i = 1; i <= n; i++) {
		setCell(getRandomInt(1, cell-2), getRandomInt(1, cell-2), color);	
	}
}

//move snake
function move() {

document.onkeyup = function(key) {			//Keyboard input
		var push = key.keyCode;
		switch(push) {
			case 37:
			direct = "left";
			console.log('left');
			break;
			case 38:
			direct = "up";
			console.log('up');
			break;
			case 39:
			direct = "right";
			console.log('right');
			break;
			case 40:
			direct = "down";
			console.log('down');
			break;
		}
	}

	switch(direct) {						//check direction
		case "left":
		positionx--;
		break;
		case "up":
		positiony--;
		break;
		case "right":
		positionx++;
		break;
		case "down":
		positiony++;
		break;
	}

	if (positionx < 0 || positiony < 0 || positionx > cell-1 || positiony > cell-1) {		//check board
		$('body').html("<h1>Game over, you lose. Press any key.</h1>");
		clearInterval(interval);
		document.onkeyup = function() {
			location.reload();
		}
	}

	else { 
		setCell(positionx, positiony, 'red');
		setCell(lastpositionx, lastpositiony, 'white');

		lastpositionx = positionx;
		lastpositiony = positiony;
	}
}

window.onload = function() {
	mainMenu();
}