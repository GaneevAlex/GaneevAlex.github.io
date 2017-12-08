/*Вычисление направления мыши*/
function direction() {
	direct = "";
	var x = xdown - xup;
	var y = ydown - yup;
	
	if (x>=sens || x<=-sens) {
		if (x>=sens) {
			direct = "left";
		}
		else {
			direct = "right";
		}
	}
	else if (y>=sens || y<=-sens) {
		if (y>=sens) {
			direct = "up";
		}
		else {
			direct = "down";
		}
	}
}

/*Вычисление координаты ячейки*/
function calculatexy(e) {
	var $thing = $('.thing');
	var left = parseInt($thing.eq(e).css('left'));
	var top = parseInt($thing.eq(e).css('top'));
	currentleft = parseInt(left/100);
	currenttop = parseInt(top/100);
}

/*Суммирование двух одинаковых ячеек по x*/
function summcellx() {

	for (var i = 0; i < fillfield.length; i++) {

		for (var j = 0; j < fillfield[i].length; j++) {

			if (fillfield[i][j] != 0) {
				var k = j;

				while (fillfield[i][k+1]==0 && k < fillfield[i].length-1) {
					k++;
				}

				if (fillfield[i][j] == fillfield[i][k+1]) {
					updatesell(i, j, fillfield[i][j]);
					fillfield[i][j] = fillfield[i][j]*2;
					fillfield[i][k+1] = 0;
					deletecell(i, k+1);
					checkcreate = 1;
					scorecount(fillfield[i][j]);
				}
			}	
		}
	}
}

function summcellxreverce() {

	for (var i = 0; i < fillfield.length; i++) {

		for (var j = fillfield[i].length-1; j > 0; j--) {

			if (fillfield[i][j] != 0) {
				var k = j;

				while (fillfield[i][k-1]==0 && k > 0) {
					k--;
				}

				if (fillfield[i][j] == fillfield[i][k-1]) {
					updatesell(i, j, fillfield[i][j]);
					fillfield[i][j] = fillfield[i][j]*2;
					fillfield[i][k-1] = 0;
					deletecell(i, k-1);
					checkcreate = 1;
					scorecount(fillfield[i][j]);
				}
			}	
		}
	}
}


/*Суммирование двух одинаковых ячеек по y*/
function summcelly() {
	for (var i = 0; i < fillfield.length-1; i++) {
		for (var j = 0; j < fillfield[i].length; j++) {

			if (fillfield[i][j] != 0) {
				var k = i;

				while ((k < 2) && (fillfield[k+1][j]==0)) {
					k++;
				}

				if (fillfield[i][j] == fillfield[k+1][j]) {
					
					updatesell(i, j, fillfield[i][j]);
					fillfield[i][j] = fillfield[i][j]*2;
					fillfield[k+1][j] = 0;
					deletecell(k+1, j);
					checkcreate = 1;
					scorecount(fillfield[i][j]);
				}
			}
		}
	}
}

function summcellyreverce() {
	for (var i = fillfield.length-1; i > 0; i--) {
		for (var j = 0; j < fillfield[i].length; j++) {

			if (fillfield[i][j] != 0) {
				var k = i;

				while (fillfield[k-1][j]==0 && k > 1) {
					k--;
				}

				if (fillfield[i][j] == fillfield[k-1][j]) {
					
					updatesell(i, j, fillfield[i][j]);
					fillfield[i][j] = fillfield[i][j]*2;
					fillfield[k-1][j] = 0;
					deletecell(k-1, j);
					checkcreate = 1;
					scorecount(fillfield[i][j]);
				}
			}
		}
	}
}


/*Подсчет очков*/
function scorecount(value){
	score += value;
	$("#score").html('Score: '+score);
}