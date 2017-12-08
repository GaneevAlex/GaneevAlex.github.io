
/*Проверка есть ли свободные ячейки*/
function checkfill(i, j) {

	for (var n = 0; n < fillfield.length; n++) {
		for (var k = 0; k < fillfield[n].length; k++) {
			if (fillfield[n][k] == 0) {
				return checkcell(i, j);
			}
		}
	}
	gameover();
	return false;
}

/*Проверка есть ли что-то в ячейке*/
function checkcell(i, j) {
	if (fillfield[i][j] != 0) {
		return 'repeat';
	}
	else {
		return 'create';
	}
}

/*Проверка на необходимость создания ячейки*/
function checknewsell() {
	if (checkcreate == 1) {
		checkcreate = 0;
		createcell();
	}
	else {
		gameover();
	}
}

/*Проверка на возможность ходов*/
function gameover() {
	
	for (var i = 0; i < fillfield.length; i++) {
		for (var j = 0; j < fillfield[i].length; j++) {
			
			if (i == 0) {
				if (j < fillfield[i].length-1) {
					if ((fillfield[i][j] == fillfield[i][j+1])) {
						return 'busy';
					}
					else if (fillfield[i][j] == fillfield[i+1][j]) {
						return 'busy';
					}
				}
				else {
					if (fillfield[i][j] == fillfield[i+1][j]) {
						return 'busy';
					}
				}
			}
			else if (i < fillfield.length-1) {
				if (j < fillfield[i].length-1) {
					if ((fillfield[i][j] == fillfield[i][j+1])) {
						return 'busy';
					}
					else if (fillfield[i][j] == fillfield[i+1][j]) {
						return 'busy';
					}
				}
				else {
					if (fillfield[i][j] == fillfield[i+1][j]) {
						return 'busy';
					}
				}
			}
			else if (i == fillfield.length-1) {
				if (j < fillfield[i].length-1) {
					if ((fillfield[i][j] == fillfield[i][j+1])) {
						return 'busy';
					}
				}
			}
		}
	}

	$('#gameover h1').css('display', 'table-cell');
	return false;
}
