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
	erase();

	console.log(wall);
	console.log(speed);
	console.log(eatn);
	var menu = document.createElement('form');
	menu.id = 'mainmenu';
	menu.innerHTML = "<h2> SNAKE </h2> <h4> Main Menu</h4>";
	var start = document.createElement('input');
	start.type = 'button';
	start.value = 'Start Game';
	menu.appendChild(start);
	
	var setting = document.createElement('input');
	setting.type = 'button';
	setting.value = 'Setting';
	menu.appendChild(setting);

	document.body.appendChild(menu);

	start.onclick = startgame;
	setting.onclick = settings;

}

//Create new game
function startgame() {
	//Animation main menu
	var menu = document.getElementById('mainmenu')
	var start = Date.now();
	var timer = setInterval( function() {
	var timePassed = Date.now() - start;

	function drow(timer) {
		menu.style.opacity = (30/timer);
	}

		if (timePassed >= 1000) {
			clearInterval(timer);

			erase();
			//Reset the parameters for repeat game
			field = document.createElement('table');
			field.id = 'field';
			document.body.appendChild(field);
			createField(cell, cell);
			setCell(positionx, positiony, 'red');
			elem(eatn, 'green');
			elem(wall, 'yellow');
			interval = setInterval(function(){move()}, speed);
		}

		drow(timePassed);

	}, 20);
}

	
//Set settings
function settings() {
	erase();
	var menu = document.createElement('form');
	menu.id = 'menusettings';
	menu.innerHTML = "<legend> Settings menu </legend>";
	//Speed
	var speedrange = document.createElement('div');
	var speedinput = document.createElement('input');
	speedrange.innerHTML = "<h4>Speed snake:</h4>";
	speedinput.type = 'range';
	speedinput.min = '1';
	speedinput.max = '10';
	speedinput.step = '1';
	speedinput.value = String(500/speed);
	speedinput.oninput = speedy;
	
	function speedy() {
		speed = 500/speedinput.value;
	} 
	//Number of walls
	var wallmenu = document.createElement('div');
	var wallinput = document.createElement('input');
	wallmenu.innerHTML = "<h4>Number of walls:</h4>";
	wallinput.type = 'number';
	wallinput.min = '0';
	wallinput.max = '20';
	wallinput.step = '1';
	wallinput.value = String(wall);
	wallinput.oninput = walls;
	wallinput.onkeypress = function(e) {
		return false;
	}

	function walls() {
		wall = wallinput.value;
	}
	//Number of eats
	var eatmenu = document.createElement('div');
	var eatinput = document.createElement('input');
	eatmenu.innerHTML = "<h4>Number of eats:</h4>";
	eatinput.id = 'eatcheck';
	eatinput.type = 'number';
	eatinput.min = '0';
	eatinput.max = '20';
	eatinput.step = '1';
	eatinput.value = String(eatn);
	eatinput.oninput = eats;
	eatinput.onkeypress = function(e) {
		return false;
	}

	function eats() {
		eatn = eatinput.value;
	}
	//Button save
	var save = document.createElement('input');
	save.type = 'button';
	save.value = 'Save changes';

	document.body.appendChild(menu);
	speedrange.appendChild(speedinput);
	wallmenu.appendChild(wallinput);
	eatmenu.appendChild(eatinput);
	menu.appendChild(speedrange);
	menu.appendChild(wallmenu);
	menu.appendChild(eatmenu);
	menu.appendChild(save);

	save.onclick = mainMenu;
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
				tr.appendChild(td);
			}
		field.appendChild(tr);
	}
}

//Create color cell
function setCell(x, y, color) {
	
	var row = field.rows[y].cells[x];
	
	if (row.style.backgroundColor == 'green') {
		if (eatn > 1) {
			eatn--;
		}
		else if (eatn == 1) {
			var massage = document.body;
			massage.innerHTML = "<h1>Congraduation you win!</h1>";
			clearInterval(interval);
			document.onkeyup = function() {
			location.reload();
			}		
		}
	}

	else if (row.style.backgroundColor == 'yellow') {
		var massage = document.body;
			massage.innerHTML = "<h1>Game over, you crash of wall!</h1>";
			clearInterval(interval);
			document.onkeyup = function() {
			location.reload();
			}
	}

	row.style.backgroundColor = color;
}


//create elements n times
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

	console.log('next');
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
		var massage = document.body;
		massage.innerHTML = "<h1>Game over, you lose. Press any key.</h1>";
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

//Cleaner
function erase() {
	document.body.innerHTML = '';
}

window.onload = function() {
	mainMenu();
}