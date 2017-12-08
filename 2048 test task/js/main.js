/*Настройки по умолчанию*/
var xdown=0;
var xup=0;
var ydown=0;
var yup=0;
/*Чувствительность перемещения мыши в px*/
var sens = 40;
/*Направление*/
var direct; 
/*Текущее положение ячейки*/
var currentleft;
var currenttop;
/*Было ли сложение*/
var checkcreate = 0;
/*подсчет очков*/
var score = 0; 
/*Значения в поле*/
var fillfield = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];

 $(document).ready(function () {

	startgame();

});