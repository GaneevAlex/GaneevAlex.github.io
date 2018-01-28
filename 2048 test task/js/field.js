"use strict";
//Конструктор поля
class Field {
	constructor(playField) {
    this.$gameOver = $('#gameover, #restart');
		this.$playField = playField;
		this.reset();
	}
	//Обнуление параметров
	reset() {
   
    this.$gameOver.fadeOut(600);

		//Значения в поле
		this.fillField = [];

		for (let row = 0; row < 4; row++) {
			this.fillField[row] = [];
			for (let col = 0; col < 4; col++) {
				this.fillField[row][col] = 0;
			}
		}
		//Удаление старых ячеек
		if ($('.thing')) {
			let $thing = $('.thing');
			$thing.each(function(e){
				$thing.eq(e).remove();
			});
		}
		//Длина поля
		this.lengthField = this.fillField.length;
		//Текущий рекорд
		this.record = this.recordView();
		//Обнуление очков
		this.scoreCount(0);
		//Свойство для распознования нужно ли создавать новую ячейку
		this.checkCreate = 0;
		//Массив существующих ячеек
		this.arrayElements = [];
		this.createCell();
		this.createCell();
	}
	//Вызов функций движения
	move(direct) {
		switch(direct) {
			case 'right': 
				this.summValueCells(this.lengthField, this.lengthField-1, true);
				break;
			case 'left': 
				this.summValueCells(this.lengthField, 0, true);
				break;
			case 'down': 
				this.summValueCells(this.lengthField, this.lengthField-1, false);
				break;
			case 'up': 
				this.summValueCells(this.lengthField, 0, false);
				break;
		}
	}
	//Функция передвижения
	//fieldLength = fillField.length;
	//from right/down = fillField.length-1, left/up = 0;
	//horisont  left/right = true, up/down = false
	moveCells(fieldLength, from, horisont) {

		let zeroCheck;
		const inc = from == 0 ? 1 : -1;

		for (let row = 0; row < fieldLength; row++) {
			for (let col = from; col >= 0 && col < fieldLength; col += inc) {
				//Проверка направления - вертикальное/горизонтальное
				if (!horisont) {
					zeroCheck = !this.notZero(col, row);

				} else {
					zeroCheck = !this.notZero(row, col);
				}
				//Если ноль
				if (zeroCheck) { 
					let tmp = col;
					while ((tmp < fieldLength) && (tmp >= 0)) {
						tmp += inc;
						if (horisont) {
							if ((this.moveToEmpty(row, col, row, tmp))) {
							break;
							};
						} else {
							if (this.moveToEmpty(col, row, tmp, row)) {
							break;
							};
						}
					}
				}
			}
		}
	}
	//Для инверсии обхода столбец/строка,
	//двигаем, если есть ячейка в строке/столбце
	moveToEmpty(row, col, tmpRow, tmpCol) {
		if (tmpRow < 0 || tmpRow > this.lengthField-1) {
			return false;
		}

		if (this.fillField[tmpRow][tmpCol] > 0) {
			this.fillField[row][col] = this.fillField[tmpRow][tmpCol];
			let numElement = this.findElement(tmpRow, tmpCol);
			this.arrayElements[numElement].drowCell(row, col);
			this.fillField[tmpRow][tmpCol] = 0;	
			this.checkCreate = 1;
			return true;
		}
	}
	//Функция сложения
	//fieldLength = fillField.length;
	//from right/down = fillField.length-1, left/up = 0;
	//horisont  right/left = true, down/up = false
	summValueCells(fieldLength, from, horisont) {

		this.moveCells(fieldLength, from, horisont);
		let zeroCheck;
		const inc = from == 0 ? 1 : -1;

		for (let row = 0; row < fieldLength; row++) {
			for (let col = from; col >= 0 && col < fieldLength; col += inc) {
				//Проверка направления - вертикальное/горизонтальное
				if (!horisont) {
					zeroCheck = this.notZero(col, row);

				} else {
					zeroCheck = this.notZero(row, col);
				}

				let tmp = col;
				//для left/right
				if (zeroCheck && horisont) { 
					// ищем первую не нулевую клетку
					while (tmp < fieldLength && tmp >= 0) {  
						tmp += inc;

						if(this.notZero(row, tmp)) {
							break;
						}
					}

					this.summIfEqual(row, col, row, tmp);
					//для up/down
				} else if (zeroCheck && !horisont) { 
					// ищем первую не нулевую клетку
					while (tmp < fieldLength && tmp >= 0) { 
						tmp += inc;

						if(this.notZero(tmp, row)) {
							break;
						}
					}

					this.summIfEqual(col, row, tmp, row)
				}
			}
		}
		this.moveCells(fieldLength, from, horisont);

	}
	//Для инверсии обхода столбец/строка,
	//сложение, если значения ячеек равны
	summIfEqual(row, col, tmpRow, tmpCol) {
		if (tmpRow < 0 || tmpRow > this.lengthField-1) {
			return true;
		}

		if (this.fillField[row][col] == this.fillField[tmpRow][tmpCol]) {
			let numElement = this.findElement(row, col);
			this.arrayElements[numElement].updateCell(this.fillField[row][col]);
			this.deleteCell(tmpRow, tmpCol);
			this.fillField[row][col] = this.fillField[row][col]*2;
			this.fillField[tmpRow][tmpCol] = 0;
			this.checkCreate = 1;
			this.scoreCount(this.fillField[row][col]);
			return true;
		}
	}
	//проверка на равенство нулю
	notZero(row, col) {
		if (row < 0 || row > this.lengthField-1) {
			return true

		} else if (this.fillField[row][col] == 0) {
				return false;

		} else {
				return true;
		}
	}
	//Добавление новой ячейки
	createCell() {
		let randomRow = this.randomInt(3);
		let randomCol = this.randomInt(3);
		let checkThis = this.checkCell(randomRow, randomCol);

		if (checkThis == 'create') {
			let value;
			let random = this.randomInt(10);

			if (random > 9) {
				value = 4;

			} else {
					value = 2;
			}

			let newElement = new Cell(randomRow, randomCol, value);
			this.arrayElements.push(newElement);
			let appendCell = newElement.createElement();
			this.$playField.append(appendCell);
			newElement.setThisElement();
			this.fillField[randomRow][randomCol] = value;
			newElement.element.fadeIn(600);
			newElement.element.removeClass('new');

		} else if (checkThis == 'repeat') {
				this.createCell();

		} else {
				return false;
		}
	}
	//Случайное целое
	randomInt(max) {
		return Math.floor(Math.random() * (max+1));
	}
	//Проверка есть ли свободные ячейки
	checkFill(){ 
		if (Math.pow(this.lengthField, 2) > this.arrayElements.length) {
			return true;

		} else {
				this.gameOver();
			}
	}
	//Проверка есть ли что-то в ячейке
	checkCell(row, col) {
		if (this.checkFill() && this.fillField[row][col] != 0) {
			return 'repeat';

		} else {
				return 'create';
			}
	}
	//Проверка на необходимость создания ячейки
	checkNewCell() {
		if (this.checkCreate == 1) {
			this.checkCreate = 0;
			this.createCell();

		} else {
				this.checkFill();
			}
	}
	//Удаление ячейки
	deleteCell(row, col) {
		const self = this;
		let numElement = this.findElement(row, col);
		let rem = self.arrayElements.splice(numElement, 1);

		rem[0].element.fadeOut(300);

		setTimeout(function() {
			$(rem[0].element).remove();
			return false;
		}, 100);
	}
	//Поиск ячейки в массиве
	findElement(thisRow, thisCol) {
		for (let index = 0; index < this.arrayElements.length; index++) {
			if (this.arrayElements[index].row == thisRow && this.arrayElements[index].col == thisCol) {
				return index;
			}
		} 
	}
	//Подсчет очков
	scoreCount(value) {
		if (value == 0) {
			this.score = value;
		}

		this.score += value;
		$("#score").html('Score: ' + this.score);
	}
	//Вывод/сохранение рекорда
	recordView() {
		this.record = localStorage.getItem('record') || 0;
		$('#record').html('Record: ' + this.record);
		return this.record;
	}
	setRecord() {
		if (this.record < this.score) {
			this.record = localStorage.setItem('record', this.score);
		}
	}
	//Проверка на возможность ходов
	gameOver() {

		for (let row = 0; row < this.lengthField; row++) {
			for (let col = 0; col < this.lengthField; col++) {
				//Для всех строк, кроме последней, проверяем равенство ячейки с правой и нижней
				if (row < this.lengthField-1) {
					if (col < this.lengthField-1) {
						if ((this.fillField[row][col] == this.fillField[row][col+1])) {
							return true;

						} else if (this.fillField[row][col] == this.fillField[row+1][col]) {
								return true;
						}

					} else {
							if (this.fillField[row][col] == this.fillField[row+1][col]) {
								return true;
							}
						}
					//Для последней строки, проверяем равенство ячейки с правой
				} else if (row == this.lengthField-1) {
						if (col < this.lengthField-1) {
							if ((this.fillField[row][col] == this.fillField[row][col+1])) {
								return true;
							}
						}
					}
			}
		}
		
		this.$gameOver.show(400);
		this.setRecord();
		return false;
	}
}
