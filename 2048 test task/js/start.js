"use strict";
//Конструктор для управления с помощью мыши
  function Start() {

 	this.field = new Field();

 	const self = this;
 	const $playField = $('#playfield');
 	const $everyWhere = $('#playfield, html');
 	this.$gamepad = $('#gamepad');
 	let mouseDown = false; //проверка на удержание кнопки мыши
 	let xDown = 0, xUp = 0, yDown = 0, yUp = 0; //координаты мыши во время нажатия
  	this.sens = 40; //чувствительность сдвига

 //Координаты курсора при нажатии/отжатии кнопки
 	$playField.on( "mousedown", function(e) {
 	  xDown = e.pageX;
 	  yDown = e.pageY;
 	  mouseDown = true;
 	  self.joy(xDown, yDown);
 	});

 	$everyWhere.on( "mouseup", function(e) { 
 	  xUp = e.pageX;					
 	  yUp = e.pageY;
 	  
 	  if (mouseDown) {
 	  	self.moveDirection();
 	  	mouseDown = false;
 	  }

 	});
//Координаты для вычисления направления сдвига курсора
 	Object.defineProperties(self, {
 		x: { 
 			get: function() {
 				return (xDown - xUp);
 			}
 		},
 		y: {
 			get: function() {
 				return (yDown - yUp);
 			}
 		}
 	});
 }
//Определение в какую сторону сдвигаем
 Start.prototype.moveDirection = function() {

 	if (this.x >= this.sens || this.x <= -this.sens) {
 		if (this.x >= this.sens) {
			this.field.move('left');
 		
 		} else {
 			this.field.move('right');
 		}
 		
 	} else if (this.y >= this.sens || this.y <= -this.sens) {
 		if (this.y >= this.sens) {
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
 	self.$gamepad.css({
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

 $(document).ready(function () {
 	const start = new Start();
 });