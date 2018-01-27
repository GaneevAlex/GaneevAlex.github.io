"use strict";
//Конструктор поля
class Field {
	constructor(playField, gameOver) {
		this.$gameOver = gameOver;
		this.$playField = playField;
		this.reset();
	}
	//Начальные параметры
	reset() {
		//Значения в поле
		this.fillField = [];

		for (let i = 0; i < 4; i++) {
			this.fillField[i] = [];
			for (let j = 0; j < 4; j++) {
				this.fillField[i][j] = 0;
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
				this.moveCells(this.lengthField, this.lengthField-1, true);
				break;
			case 'left': 
				this.moveCells(this.lengthField, 0, true);
				break;
			case 'down': 
				this.moveCells(this.lengthField, this.lengthField-1, false);
				break;
			case 'up': 
				this.moveCells(this.lengthField, 0, false);
				break;
		}
	}
	//Функция передвижения
	//fieldLength = fillField.length;
	//from right/down = fillField.length-1, left/up = 0;
	//horisont  left/right = true, up/down = false
	moveCells(fieldLength, from, horisont) {

		this.summValueCells(fieldLength, from, horisont);

		let zeroCheck;
		const inc = from == 0 ? 1 : -1;

		for (let i = 0; i < fieldLength; i++) {
			for (let j = from; j >= 0 && j < fieldLength; j += inc) {
				//Проверка направления - вертикальное/горизонтальное
				if (!horisont) {
					zeroCheck = !this.notZero(j, i);

				} else {
					zeroCheck = !this.notZero(i, j);
				}
				//Если ноль
				if (zeroCheck) { 
					let k = j;
					while ((k < fieldLength) && (k >= 0)) {
						k += inc;
						if (horisont) {
							if ((this.moveToEmpty(i, j, i, k))) {
							break;
							};
						} else {
							if (this.moveToEmpty(j, i, k, i)) {
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
	moveToEmpty(i, j, l, k) {
		if (l < 0 || l > 3) {
			return false;
		}

		if (this.fillField[l][k] > 0) {
			this.fillField[i][j] = this.fillField[l][k];
			let numElement = this.findElement(l, k);
			this.arrayElements[numElement].drowCell(i, j);
			this.fillField[l][k] = 0;	
			this.checkCreate = 1;
			return true;
		}
	}
	//Функция сложения
	//fieldLength = fillField.length;
	//from right/down = fillField.length-1, left/up = 0;
	//horisont  right/left = true, down/up = false
	summValueCells(fieldLength, from, horisont) {
		let zeroCheck;
		const inc = from == 0 ? 1 : -1;

		for (let i = 0; i < fieldLength; i++) {
			for (let j = from; j >= 0 && j < fieldLength; j += inc) {
				//Проверка направления - вертикальное/горизонтальное
				if (!horisont) {
					zeroCheck = this.notZero(j, i);

				} else {
					zeroCheck = this.notZero(i, j);
				}

				let k = j;
				//для left/right
				if (zeroCheck && horisont) { 
					// ищем первую не нулевую клетку
					while (k < fieldLength && k >= 0) {  
						k += inc;

						if(this.notZero(i, k)) {
							break;
						}
					}

					this.summIfEqual(i, j, i, k);
					//для up/down
				} else if (zeroCheck && !horisont) { 
					// ищем первую не нулевую клетку
					while (k < fieldLength && k >= 0) { 
						k += inc;

						if(this.notZero(k, i)) {
							break;
						}
					}

					this.summIfEqual(j, i, k, i)
				}
			}
		}
	}
	//Для инверсии обхода столбец/строка,
	//сложение, если значения ячеек равны
	summIfEqual(i, j, l, k) {
		if (l < 0 || l > 3) {
			return true;
		}

		if (this.fillField[i][j] == this.fillField[l][k]) {
			let numElement = this.findElement(i, j);
			this.arrayElements[numElement].updateCell(this.fillField[i][j]);
			this.deleteCell(l, k);
			this.fillField[i][j] = this.fillField[i][j]*2;
			this.fillField[l][k] = 0;
			this.checkCreate = 1;
			this.scoreCount(this.fillField[i][j]);
			return true;
		}
	}
	//проверка на равенство нулю
	notZero(i, j) {
		if (i < 0 || i > 3) {
			return true

		} else if (this.fillField[i][j] == 0) {
				return false;

		} else {
				return true;
		}
	}
	//Добавление новой ячейки
	createCell() {
		let randomI = this.randomInt(3);
		let randomJ = this.randomInt(3);
		let checkThis = this.checkCell(randomI, randomJ);

		if (checkThis == 'create') {
			let value;
			let random = this.randomInt(10);

			if (random > 9) {
				value = 4;

			} else {
					value = 2;
			}

			let newElement = new Cell(randomI, randomJ, value);
			this.arrayElements.push(newElement);
			let appendCell = newElement.createElement();
			this.$playField.append(appendCell);
			newElement.setThisElement();
			this.fillField[randomI][randomJ] = value;
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
	checkCell(i, j) {
		if (this.checkFill() && this.fillField[i][j] != 0) {
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
	deleteCell(i, j) {
		const self = this;
		let numElement = this.findElement(i, j);
		let rem = self.arrayElements.splice(numElement, 1);

		rem[0].element.fadeOut(300);

		setTimeout(function() {
			$(rem[0].element).remove();
			return false;
		}, 50);
	}
	//Поиск ячейки в массиве
	findElement(n, m) {
		for (let i = 0; i < this.arrayElements.length; i++) {
			if (this.arrayElements[i].row == n && this.arrayElements[i].col == m) {
				return i;
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

		for (let i = 0; i < this.lengthField; i++) {
			for (let j = 0; j < this.lengthField; j++) {
				//Для всех строк, кроме последней, проверяем равенство ячейки с правой и нижней
				if (i < this.lengthField-1) {
					if (j < this.lengthField-1) {
						if ((this.fillField[i][j] == this.fillField[i][j+1])) {
							return true;

						} else if (this.fillField[i][j] == this.fillField[i+1][j]) {
								return true;
						}

					} else {
							if (this.fillField[i][j] == this.fillField[i+1][j]) {
								return true;
							}
						}
					//Для последней строки, проверяем равенство ячейки с правой
				} else if (i == this.lengthField-1) {
						if (j < this.lengthField-1) {
							if ((this.fillField[i][j] == this.fillField[i][j+1])) {
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
