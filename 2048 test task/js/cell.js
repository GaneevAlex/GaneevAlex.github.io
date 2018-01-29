"use strict";
class Cell {
	constructor(row, col, value) {
		this.row = row;
		this.col = col;
		this.value = value;
	}
	//Установка значений положения ячейки для css left/top
	get currentLeft() {
		return parseInt((this.col * 100) + 1);
	}
	get	currentTop() {
		return parseInt((this.row * 100) + 1);
	}
	//Создание новой ячейки
	createElement() {
		let appendElement = `<div class = "new thing t${this.value}" 
				style = "top: ${this.currentTop}px; left: ${this.currentLeft}px;"></div>`;
		return appendElement;
	}
	//Запись DOM элемента в свойства
	setThisElement() {
	 		this.element = $('.new');
	 		return this.element;
	}
	//Обновление значения ячейки
 	updateCell(value) {
 		this.element.removeClass('t'+value);
 		this.element.addClass('t'+(value*2));
 		this.value = value*2;
 		return false;
 	}
 	//Передвижение в другое место
 	drowCell(newRow, newCol) {
 		this.row = newRow;
 		this.col = newCol;
 		this.element.css('left',`${this.currentLeft}px`);
 		this.element.css('top', `${this.currentTop}px`);
 		return false;
 	}
}