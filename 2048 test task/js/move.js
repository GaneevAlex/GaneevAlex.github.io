/*Отображение джойстика*/
function joy(x, y) {

	$('#gamepad').css({
		display: 'block',
		top: y-180,
		left: x-180
	});

	$(document).on('mouseup', function(){
		$('#gamepad').css({
			display: 'none',
		});
	});
}

/*Движение вправо*/
function rightmove() {
	summcellxreverce();

	for (var i = 0; i < fillfield.length; i++) {
		for (var j = fillfield[i].length-1; j >= 0 ; j--) {
			if (fillfield[i][j] == 0 && j > 0) {
				var k = j;
				while ((fillfield[i][j]==0) && (k > 0)) {
					k--;
					if (fillfield[i][k] != 0) {
						fillfield[i][j] = fillfield[i][k];
						drowcell(i, k, i, j);
						fillfield[i][k] = 0;	
						checkcreate = 1;
					}
				}
			}
		}
	}
}

/*Движение влево*/
function leftmove() {
	summcellx();

	for (var i = 0; i < fillfield.length; i++) {
		for (var j = 0; j < fillfield[i].length ; j++) {
			if (fillfield[i][j] == 0 && j < fillfield[i].length-1) {
				var k = j;
				while ((fillfield[i][j]==0) && (k < fillfield[i].length-1)) {
					k++;
					if (fillfield[i][k]!=0) {
						fillfield[i][j] = fillfield[i][k];
						drowcell(i, k, i, j);
						fillfield[i][k] = 0;
						checkcreate = 1;
					}
				}
			}
		}
	}
}
/*Движение вниз*/
function downmove() {
	summcellyreverce();

	for (var i = fillfield.length-1; i >=0 ; i--) {
		for (var j = 0; j < fillfield[i].length; j++) {
			if (fillfield[i][j] == 0 && i > 0) {
				var k = i;
				while ((fillfield[i][j]==0) && (k > 0)) {
					k--;
					if (fillfield[k][j]!=0) {
						fillfield[i][j] = fillfield[k][j];
						drowcell(k, j, i, j);
						fillfield[k][j] = 0;
						checkcreate = 1;
					}
				}
			}
		}
	}
}

/*Движение вверх*/
function upmove() {
	summcelly();

	for (var i = 0; i < fillfield.length ; i++) {
		for (var j = 0; j < fillfield[i].length; j++) {
			if (fillfield[i][j] == 0 && i < fillfield.length-1) {
				var k = i;
				while ((fillfield[i][j]==0) && (k < fillfield.length-1)) {
					k++;
					if (fillfield[k][j]!=0) {
						fillfield[i][j] = fillfield[k][j];
						drowcell(k, j, i, j);
						fillfield[k][j] = 0;
						checkcreate = 1;
					}
				}
			}
		}
	}
}

/*Движение*/
function move() {
	checkcreate = 0;
	if (direct == "left") {
		leftmove();
	}
	else if (direct == "right") {
		rightmove();
	}
	else if (direct == "up") {
		upmove();
	}
	else if (direct == "down") {
		downmove();
	}
}


/*Удаление ячейки*/
function deletecell(i, j) {
	var $thing = $('.thing');
	$thing.each(function(e){
		calculatexy(e);
		if (currenttop == i && currentleft == j) {
			$thing.eq(e).fadeOut()
			setTimeout(function() {
				$thing.eq(e).remove()
				return false;
			}, 50);
		}
	});
}

/*Создание ячейки*/
function createcell() {
	
	var value;
	var random = Math.random();

	if (random > 0.9) {
		value = 4;
	}
	else {
		value = 2;
	}
	
	var randomi = Math.floor(Math.random()*4);
	var randomj = Math.floor(Math.random()*4);
	var checkthis = checkfill(randomi, randomj);

	if (checkthis == 'create') {
		var $playfield = $('#playfield');

		$playfield.append('<div class="new thing t'+value+'" style="top:'+((randomi*100)+1)+'px; left:'
			+((randomj*100)+1)+'px;"></div>');
		fillfield[randomi][randomj] = value;

		var $newelement = $('.new');
		$newelement.fadeOut();
		setTimeout(function(){
			$newelement.fadeIn();
			$newelement.removeClass('new');
		}, 50);
	}
	else if (checkthis == 'busy') {
		return false;
	}
	else if (checkthis == 'repeat') {
		createcell();
	}
	else {
		return false;
	}
}

/*Обновление ячейки*/
function updatesell(i,j,value) {
	var $thing = $('.thing');
	$thing.each(function(e){
		calculatexy(e);
		
		if (currenttop == i && currentleft == j) {
			$thing.eq(e).removeClass('t'+value);
			$thing.eq(e).addClass('t'+(value*2));
			return false;
		}
	});
}

/*Перерисовка ячейки*/
function drowcell(i,j, newi, newj) {
	var $thing = $('.thing');
	$thing.each(function(e){
		calculatexy(e);

		if (currenttop == i && currentleft == j) {
			currentleft = ((newj*100)+1).toString();
			currenttop = ((newi*100)+1).toString();
			
			$thing.eq(e).css('left',currentleft+'px');
			$thing.eq(e).css('top', currenttop+'px');
			return false;
				
		}
	});
}