"use strict";
function Cell(row, col, value) {
	this.row = row;
	this.col = col;
	this.value = value;
 	this.$playField = $('#playfield');

	Object.defineProperties(this, {
		currentLeft: {
			get: function() {
				return parseInt((this.col*100)+1);
			}
		},
		currentTop:	{
			get: function() {
				return parseInt((this.row*100)+1);
			}
		}
	});
 	
 	this.element = this.createElement();
}
//Обновление значения ячейки
Cell.prototype.updateCell = function(value) {
	this.element.removeClass('t'+value);
	this.element.addClass('t'+(value*2));
	this.value = value*2;
	return false;
}
//Передвижение в другое место
Cell.prototype.drowCell = function(newRow, newCol) {
	this.row = newRow;
	this.col = newCol;
	this.element.css('left',`${this.currentLeft}px`);
	this.element.css('top', `${this.currentTop}px`);
	return false;
}

Cell.prototype.createElement = function() {
	let appendElement = `<div class = "new thing t${this.value}" style = "top: ${this.currentTop}px; left: ${this.currentLeft}px;"></div>`;
	this.$playField.append(appendElement);
	let $newElement = $('.new');
	this.element = $newElement;
	$newElement.fadeIn(600);
	$newElement.removeClass('new');
	return this.element;
}