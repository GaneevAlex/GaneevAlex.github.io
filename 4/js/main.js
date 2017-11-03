"use strict";

//Date for game
var interval, positionx, positiony;
var cell = 20; //Number of cells
var eatn = 3; //Number of eat
var direct; //direction snake
var wall = 5; //number of wall
var speed = 100; //speed snake
var field;
var score;
var snakearr;

//Create new game
function startgame() {
	//default settings
	snakearr = [];
	positionx = 0;
	positiony = 0;
	direct = 'right';
	score = 0;
	//create field
	createField(cell, cell);
	createSnake();
}



window.onload = function() {
	mainMenu();
}