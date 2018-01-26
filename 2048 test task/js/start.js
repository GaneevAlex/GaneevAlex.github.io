"use strict";
//Конструктор для инициализации управления и запуска игры
  function Start() {
 	
	this.$playField = $('#playfield');
	this.$everyWhere = $('#playfield, html');
	this.$gamepad = $('#gamepad');
	this.mouseDown = false; //проверка на удержание кнопки мыши
	//координаты мыши во время нажатия
	this.xDown = 0;
	this.xUp = 0;
	this.yDown = 0;
	this.yUp = 0; 
	//чувствительность сдвига
 	this.sens = 40; 

	this.startGameListener();
	this.restartGameListener();
  	this.lastRecord();
  	this.cursorCoordinates();

//Координаты для вычисления направления сдвига курсора
 	Object.defineProperties(this, {
 		dx: { 
 			get: function() {
 				return (this.xDown - this.xUp);
 			}
 		},
 		dy: {
 			get: function() {
 				return (this.yDown - this.yUp);
 			}
 		}
 	});
 }
//Координаты курсора при нажатии/отжатии кнопки
 Start.prototype.cursorCoordinates = function() {
 	const self = this;
 	
 	this.$playField.on( "mousedown", function(e) {
 	  self.xDown = e.pageX;
 	  self.yDown = e.pageY;
 	  self.mouseDown = true;
 	  self.joy(self.xDown, self.yDown);
 	});

 	this.$everyWhere.on( "mouseup", function(e) { 
 	  self.xUp = e.pageX;					
 	  self.yUp = e.pageY;
 	  
 	  if (self.mouseDown) {
 	  	self.moveDirection();
 	  	self.mouseDown = false;
 	  }
 	});
 }
//Определение в какую сторону сдвигаем
 Start.prototype.moveDirection = function() {

 	if (this.dx >= this.sens || this.dx <= -this.sens) {
 		if (this.dx >= this.sens) {
			this.field.move('left');
 		
 		} else {
 			this.field.move('right');
 		}
 		
 	} else if (this.dy >= this.sens || this.dy <= -this.sens) {
 		if (this.dy >= this.sens) {
 			this.field.move('up');
 		
 		} else {
 			this.field.move('down');
 		}
 	}
 	this.field.checkNewCell();
 }
 /*Отображение джойстика*/
 Start.prototype.joy = function(x, y) {
 	const self = this;

 	this.$gamepad.css({
 		display: 'block',
 		top: y-80,
 		left: x-80
 	});

 	$(document).on('mouseup', function(){
 		self.$gamepad.css({
 			display: 'none',
 		});
 	});
 }
 //Последний рекорд
 Start.prototype.lastRecord = function() {
 	const lastRecord = localStorage.getItem('record') || 0;
 	$("#record").html('Record: ' + lastRecord);
 }
 //Начало игры
 Start.prototype.startGameListener = function() {
 	const self = this;
	
	$('#start').on('click', function(){
 	
 	self.field = new Field();
	
	const $menu = $('#menu');
	$menu.fadeOut(600);

	setTimeout(function() {
		$menu.remove()}, 800);
	});
 }
//Начать заного
 Start.prototype.restartGameListener = function() {
 	const self = this;

	$('#restart').on('click', function(){
		self.field.reset();
		const $gameOver = $('#gameover');
		$gameOver.fadeOut(600);
	})
}

 $(document).ready(function () {

	const start = new Start();	
 
 });