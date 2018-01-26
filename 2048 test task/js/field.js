"use strict";
//Конструктор поля
function Field() {
	/*Было ли действие*/
	this.checkCreate = 0; 
	/*подсчет очков*/
	this.score = 0; 
	/*Значения в поле*/
	this.fillField = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	this.lengthField = this.fillField.length;
	this.arrayElements = [];
	this.createCell();
	this.createCell();
}
//Вызов функций движения
Field.prototype.move = function(direct) {
	switch(direct) {
		case 'right': 
	      this.moveCells(4, 3, false, true);
	      break;
		case 'left': 
	      this.moveCells(4, 0, true, true);
	      break;
		case 'down': 
	      this.moveCells(4, 3, false, false);
	      break;
		case 'up': 
	      this.moveCells(4, 0, true, false);
	      break;
	}
}
//Функция передвижения
//fieldLength = fillField.length;
//from right/down = fillField.length-1, left/up = 0;
//isIncrement = true ? ++ : -- (right/down -1, left/up 1);
//horisont  left/right = true, up/down = false
Field.prototype.moveCells = 
  function (fieldLength, from, isIncrement, horisont) {
	
	this.summValueCells(fieldLength, from, isIncrement, horisont);
	
	let zeroCheck;
	const inc = isIncrement ? 1 : -1;

	for (let i = 0; i < fieldLength; i++) {
		for (let j = from; j >= 0 && j < fieldLength ; j += inc) {
			
			if (!horisont) {
				zeroCheck = !this.notZero(j, i);
			} else {
				zeroCheck = !this.notZero(i, j);
			}

			if (zeroCheck) { //если ноль
				let k = j;
				while ((k < fieldLength) && (k >= 0)) {
					k += inc;
					if (horisont) {
						if ((this.checkBusy(i, j, i, k))) {
							break;
						};

					} else {
						if (this.checkBusy(j, i, k, i)) {
							break;
						};
					}
				}
			}
		}
	}
}
//Для инверсии обхода столбец/строка,
//двигаем, если можно
Field.prototype.checkBusy =
  function(i, j, l, k) {
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
//isIncrement = true ? ++ : -- (right/down -1, left/up 1);
//horisont  right/left = true, down/up = false
Field.prototype.summValueCells = 
  function(fieldLength, from, isIncrement, horisont) {
	
	let zeroCheck;
	const inc = isIncrement ? 1 : -1;

	for (let i = 0; i < fieldLength; i++) {
		for (let j = from; j >= 0 && j < fieldLength; j += inc) {
			
			if (!horisont) {
				zeroCheck = this.notZero(j, i);
			} else {
				zeroCheck = this.notZero(i, j);
			}

			let k = j;
			if (zeroCheck && horisont) { //для left/right
				while (k < fieldLength && k >= 0) {  // ищем первую не нулевую клетку
					k += inc;

					if(this.notZero(i, k)) {
						break;
					}
				}
				
				this.checkEqual(i, j, i, k);

				} else if (zeroCheck && !horisont) { //для up/down

	 				while (k < fieldLength && k >= 0) { // ищем первую не нулевую клетку
	 					k += inc;

	 					if(this.notZero(k, i)) {
	 						break;
	 					}
	 				}
					
					this.checkEqual(j, i, k, i)
				}
			}
		}
	}
//Для инверсии обхода столбец/строка,
//сложение, если значения ячеек равны
Field.prototype.checkEqual = 
  function(i, j, l, k) {
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
Field.prototype.notZero = 
  function(i, j) {
	if (i < 0 || i > 3) {
		return true
	}
	else if (this.fillField[i][j] == 0) {
		return false;
	} else {
		return true;
	}
}
/*Добавление новой ячейки*/
 Field.prototype.createCell = function() {
 	
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
Field.prototype.randomInt = function(max) {
	return Math.floor(Math.random() * (max+1));
}
/*Проверка есть ли свободные ячейки*/
Field.prototype.checkFill = function() { 
	
	if (Math.pow(this.lengthField, 2) > this.arrayElements.length) {
		return true;

	} else {
		this.gameOver();
	}
	
	return false;
}
/*Проверка есть ли что-то в ячейке*/
Field.prototype.checkCell = function(i, j) {
	if (this.checkFill() && this.fillField[i][j] != 0) {
		return 'repeat';
	}
	else {
		return 'create';
	}
}
/*Проверка на необходимость создания ячейки*/
Field.prototype.checkNewCell = function() {
	if (this.checkCreate == 1) {
		this.checkCreate = 0;
		this.createCell();

	} else {
		this.checkFill();
	}
}
/*Удаление ячейки*/
 Field.prototype.deleteCell = function(i, j) {
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
 Field.prototype.findElement = function(n, m) {
 	for (let i = 0; i < this.arrayElements.length; i++) {
 		if (this.arrayElements[i].row == n && this.arrayElements[i].col == m) {
 			return i;
 		}
 	} 
 }
/*Подсчет очков*/
Field.prototype.scoreCount = function(value){
	this.score += value;
	$("#score").html('Score: '+this.score);
}
/*Проверка на возможность ходов*/
Field.prototype.gameOver = function() {

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

	$('#gameover h1').show(600);
	return false;
}