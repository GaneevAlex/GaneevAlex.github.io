"use strict";
//Конструктор поля
class Field {
	constructor(playField, numberCells) {
    	this.$gameOverMenu = $('#gameover-wrap, #restart');
    	this.$gameOver = $('#gameover-wrap');
		this.$playField = playField;
		this.drowFieldCells(numberCells);
		this.resetView();
		this.arrayElements = [];
		this.fieldModel = new FieldModel(this, numberCells);
	}
	//Обнуление параметров
	resetView() {
		//Если рестарт игры
		if (this.arrayElements) {
			this.$gameOver.fadeOut(600);

            this.arrayElements = [];
				
				let $thing = $('.thing');

				$thing.each(function(e){
					$thing.eq(e).remove();
				});

				this.fieldModel.reset();
		}
		//Текущий рекорд
		this.record = this.recordView();
		//Обнуление очков
		this.scoreCount(0);
	}
	//Вызов функций движения
	move(direct) {
		switch(direct) {
			case 'right': 
				this.fieldModel.summValueCells(false, true);
				break;
			case 'left': 
				this.fieldModel.summValueCells(true, true);
				break;
			case 'down': 
				this.fieldModel.summValueCells(false, false);
				break;
			case 'up': 
				this.fieldModel.summValueCells(true, false);
				break;
		}
		this.fieldModel.checkNewCell();
	}
	//Рисуем клетки поля
	drowFieldCells(numCells) {
		for (let number = 1; number <= Math.pow(numCells, 2); number++) {
			this.$playField.append('<div class="back"></div>');
			this.$playField.css("width", `${numCells*100}px`);
		}
	}
	//Добавление новой ячейки
	createCellView(row, col, value) {
			let newElement = new Cell(row, col, value);
			//Добавляем в массив элементов
			this.arrayElements.push(newElement);
			//Добавляем на поле
			let appendCell = newElement.createElement();
			this.$playField.append(appendCell);
			//Сохраняем DOM элемент в ячейке
			newElement.setThisElement();
			//Отображаем новый элемент
			newElement.element.fadeIn(600);
			newElement.element.removeClass('new');
	}
	//Сдвигаем ячейку
	moveView(row, col, tmpRow, tmpCol) {
			let numElement = this.findElement(tmpRow, tmpCol);
			this.arrayElements[numElement].drowCell(row, col);
	}
	//Отображение результатов сложения ячеек
	summView(row, col, tmpRow, tmpCol) {
			let numElement = this.findElement(row, col);
			let thisIsCell = this.arrayElements[numElement];
			thisIsCell.updateCell(thisIsCell.value);
			this.deleteCell(tmpRow, tmpCol);
			this.scoreCount(thisIsCell.value);
	}
	//Поиск ячейки в массиве
	findElement(thisRow, thisCol) {
		for (let index = 0; index < this.arrayElements.length; index++) {
			if (this.arrayElements[index].row === thisRow && this.arrayElements[index].col === thisCol) {
				return index;
			}
		} 
	}
	//Удаление ячейки
	deleteCell(row, col) {
		let numElement = this.findElement(row, col);
		let rem = this.arrayElements.splice(numElement, 1);

		rem[0].element.slideUp(200);

		setTimeout(function() {
			$(rem[0].element).remove();
			return false;
		}, 200);
	}
	//Подсчет/отображение очков
	scoreCount(value) {
		if (value === 0) {
			this.score = value;
		}

		this.score += value;
		$("#score").html('Score: ' + this.score);
	}
	//Вывод рекорда
	recordView() {
		this.record = localStorage.getItem('record') || 0;
		$('#record').html('Record: ' + this.record);
		return this.record;
	}
	//Сохранение рекорда и показ окна конца игры
	ifGameOver() {
		if (this.record < this.score) {
			this.record = localStorage.setItem('record', this.score);
		}
		this.$gameOverMenu.show(400);
		this.$gameOverMenu.css('visibility', 'visible');
		this.$gameOver.css('display', 'table');
	}
}