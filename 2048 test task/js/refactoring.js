 /*Движение вправо*/
 function rightMove() {
 	moveRefactoring(4, 3, false, true);
 }
 /*Движение влево*/
 function leftMove() {
 	moveRefactoring(4, 0, true, true);
 }
 /*Движение вниз*/
 function downMove() {
 	moveRefactoring(4, 3, false, false);
 }
 /*Движение вверх*/
 function upMove() {
 	moveRefactoring(4, 0, true, false);
 }

 //fieldLength = fillField.length;
 //from right/down = fillField.length-1, left/up = 0;
 //isIncrement = true ? ++ : -- (right/down -1, left/up 1);
 //horisont  left/right = true, up/down = false
  function moveRefactoring(fieldLength, from, isIncrement, horisont) {
	
	summRefactoring(fieldLength, from, isIncrement, horisont);
  	
  	let zeroCheck;
  	let inc = isIncrement ? 1 : -1;

 	for (let i = 0; i < fieldLength; i++) {
 		for (let j = from; j >= 0 && j < fieldLength ; j += inc) {
 			
 			if (!horisont) {
 				zeroCheck = !notZero(j, i);
 			} else {
 				zeroCheck = !notZero(i, j);
 			}

 			if (zeroCheck) {
 				let k = j;
 				while ((k < fieldLength) && (k >= 0)) {
 					k += inc;
 					if (horisont) {
 						if ((checkBusy(i, j, i, k))) {
 							break;
 						};

 					} else {
 						if (checkBusy(j, i, k, i)) {
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
 function checkBusy(i, j, l, k) {
 	if (l == 4 || l == -1) {
 		return false;
 	}
 	if (fillField[l][k] > 0) {
 		fillField[i][j] = fillField[l][k];
 		drowCell(l, k, i, j);
 		fillField[l][k] = 0;	
 		checkCreate = 1;
 		return true;
 	}
 }
//fieldLength = fillField.length;
 //from right/down = fillField.length-1, left/up = 0;
 //isIncrement = true ? ++ : -- (right/down -1, left/up 1);
 //horisont  right/left = true, down/up = false
 function summRefactoring(fieldLength, from, isIncrement, horisont) {
  	let zeroCheck;
  	let inc = isIncrement ? 1 : -1;

 	for (let i = 0; i < fieldLength; i++) {
 		for (let j = from; j >= 0 && j < fieldLength ; j += inc) {
 			
 			if (!horisont) {
 				zeroCheck = notZero(j, i);
 			} else {
 				zeroCheck = notZero(i, j);
 			}

 			let k = j;
 			if (zeroCheck && horisont) {
 				while (k < fieldLength && k >= 0) {  // ищем первую не нулевую клетку
 					k += inc;

 					if(notZero(i, k)) {
 						break;
 					}
 				}
 				
 				if ((checkEqual(i, j, i, k))) {
 						break;
 					};

 				} else if (zeroCheck && !horisont) {

	 				while (k < fieldLength && k >= 0) { // ищем первую не нулевую клетку
	 					k += inc;

	 					if(notZero(k, i)) {
	 						break;
	 					}
	 				}
 				
	 				if (checkEqual(j, i, k, i)) {
	 						break;
	 				};
 				}
 			}
 		}
 	}
//Для инверсии обхода столбец/строка,
//сложение, если есть такая возможность
 function checkEqual(i, j, l, k) {
 	if (l < 0 || l > 3) {
 		return true;
 	}

 	if (fillField[i][j] == fillField[l][k]) { //если равны, то складываем
 		updateCell(i, j, fillField[i][j]);
 		fillField[i][j] = fillField[i][j]*2;
 		fillField[l][k] = 0;
 		deleteCell(l, k);
 		checkCreate = 1;
 		scoreCount(fillField[i][j]);
 		return true;
 	}
 }
//проверка на равенство нулю
function notZero(i, j) {
	if (i < 0 || i > 3) {
		return true
	}
	else if (fillField[i][j] == 0) {
		return false;
	} else {
		return true;
	}
}

/*Вычисление координаты ячейки*/
function calculateXY(e) {
	let $thing = $('.thing');
	let left = parseInt($thing.eq(e).css('left'));
	let top = parseInt($thing.eq(e).css('top'));
	currentLeft = parseInt(left/100);
	currentTop = parseInt(top/100);
}

/*Подсчет очков*/
function scoreCount(value){
	score += value;
	$("#score").html('Score: '+score);
}

/*Проверка есть ли свободные ячейки*/
function checkFill(i, j) { //сверять с массивом ячеек, длина 
							//поля в квадрате должна быть больше

	for (let n = 0; n < fillField.length; n++) {
		for (let k = 0; k < fillField[n].length; k++) {
			if (fillField[n][k] == 0) {
				return checkCell(i, j);
			}
		}
	}
	gameOver();
	return false;
}

/*Проверка есть ли что-то в ячейке*/
function checkCell(i, j) {
	if (fillField[i][j] != 0) {
		return 'repeat';
	}
	else {
		return 'create';
	}
}

/*Проверка на необходимость создания ячейки*/
function checkNewCell() {
	if (checkCreate == 1) {
		checkCreate = 0;
		createCell();
	}
	else {
		gameOver();
	}
}

/*Проверка на возможность ходов*/
function gameOver() {
	
	for (let i = 0; i < fillField.length; i++) {
		for (let j = 0; j < fillField[i].length; j++) {
			
			if (i == 0) {
				if (j < fillField[i].length-1) {
					if ((fillField[i][j] == fillField[i][j+1])) {
						return 'busy';
					}
					else if (fillField[i][j] == fillField[i+1][j]) {
						return 'busy';
					}
				}
				else {
					if (fillField[i][j] == fillField[i+1][j]) {
						return 'busy';
					}
				}
			}
			else if (i < fillField.length-1) {
				if (j < fillField[i].length-1) {
					if ((fillField[i][j] == fillField[i][j+1])) {
						return 'busy';
					}
					else if (fillField[i][j] == fillField[i+1][j]) {
						return 'busy';
					}
				}
				else {
					if (fillField[i][j] == fillField[i+1][j]) {
						return 'busy';
					}
				}
			}
			else if (i == fillField.length-1) {
				if (j < fillField[i].length-1) {
					if ((fillField[i][j] == fillField[i][j+1])) {
						return 'busy';
					}
				}
			}
		}
	}

	$('#gameover h1').show(600);
	return false;
}

 /*Удаление ячейки*/
 function deleteCell(i, j) {
 	let $thing = $('.thing');
 	$thing.each(function(e){
 		calculateXY(e);
 		if (currentTop == i && currentLeft == j) {
 			$thing.eq(e).fadeOut(300)
 			setTimeout(function() {
 				$thing.eq(e).remove()
 				return false;
 			}, 50);
 		}
 	});
 }

 /*Создание ячейки*/
 function createCell() {
 	
 	let randomI = randomInt(3);
 	let randomJ = randomInt(3);
 	let checkThis = checkFill(randomI, randomJ);

 	if (checkThis == 'create') {
 		let value;
 		let random = randomInt(10);

 		if (random > 9) {
 			value = 4;
 		
 		} else {
 			value = 2;
 		}

 		this.$playField = $('#playfield');

 		this.$playField.append('<div class="new thing t'+value+'" style="top:'+((randomI*100)+1)+'px; left:'
 			+((randomJ*100)+1)+'px;"></div>');
 		fillField[randomI][randomJ] = value;

 		let $newelement = $('.new');
 		$newelement.fadeIn(600);
		$newelement.removeClass('new');
 	
 	} else if (checkThis == 'repeat') {
 		createCell();
 	
 	} else {
 		return false;
 	}
 }

 //Случайное целое
 function randomInt(max) {
 	return Math.floor(Math.random() * (max+1));
 }

 /*Обновление ячейки*/
 function updateCell(i,j,value) {
 	let $thing = $('.thing');
 	$thing.each(function(e){
 		calculateXY(e);
 		
 		if (currentTop == i && currentLeft == j) {
 			$thing.eq(e).removeClass('t'+value);
 			$thing.eq(e).addClass('t'+(value*2));
 			return false;
 		}
 	});
 }

 /*Перерисовка ячейки*/
 function drowCell(i,j, newi, newj) {
 	let $thing = $('.thing');
 	$thing.each(function(e){
 		calculateXY(e);

 		if (currentTop == i && currentLeft == j) {
 			currentLeft = ((newj*100)+1).toString();
 			currentTop = ((newi*100)+1).toString();
 			
 			$thing.eq(e).css('left',currentLeft+'px');
 			$thing.eq(e).css('top', currentTop+'px');
 			return false;
 				
 		}
 	});
 }

 /*Стартовые настройки*/
 function startGame() {
 	
 	
 	createCell();
 	createCell();
	mouse = new Mouse();
 	
 }

 /*Настройки по умолчанию*/

 /*Текущее положение ячейки*/
 var currentLeft;
 var currentTop;
 /*Было ли сложение*/
 var checkCreate = 0;
 /*подсчет очков*/
 var score = 0; 
 /*Значения в поле*/
 var fillField = [
 	[0,0,0,0],
 	[0,0,0,0],
 	[0,0,0,0],
 	[0,0,0,0]
 ];

//Конструктор для управления с помощью мыши
  function Mouse() {
 	let self = this;
 	let $playField = $('#playfield');
 	let $everyWhere = $('#playfield, html');
 	let mouseDown = false; //проверка на удержание кнопки мыши
 	let xDown=0, xUp=0, yDown=0, yUp=0; //координаты мыши во время нажатия
  	this.sens = 40; //чувствительность сдвига

 	$playField.bind('mousedown').mousedown(function () {
 	    mouseDown = true;
 	});

 	/*Координаты курсора*/
 	$playField.on( "mousedown", function(e) {
 	  xDown = e.pageX;
 	  yDown = e.pageY;
 	  joy(xDown, yDown);
 	});

 	$everyWhere.on( "mouseup", function(e) { 
 	  xUp = e.pageX;					
 	  yUp = e.pageY;
 	  
 	  if (mouseDown) {
 	  	self.moveDirection();
 	  	checkNewCell();
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
 Mouse.prototype.moveDirection = function() {

 	if (this.x >= this.sens || this.x <= -this.sens) {
 		if (this.x >= this.sens) {
 			leftMove();
 		
 		} else {
 			rightMove();
 		}
 		
 	} else if (this.y >= this.sens || this.y <=- this.sens) {
 		if (this.y >= this.sens) {
 			upMove();
 		
 		} else {
 			downMove();
 		}
 	}
 }
 /*Отображение джойстика*/
 Mouse.prototype.joy = function(x, y) {

 }
 function joy(x, y) {

 	$('#gamepad').css({
 		display: 'block',
 		top: y-80,
 		left: x-80
 	});

 	$(document).on('mouseup', function(){
 		$('#gamepad').css({
 			display: 'none',
 		});
 	});
 }

  $(document).ready(function () {

 	startGame();

 });