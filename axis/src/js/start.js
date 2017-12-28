/*Класс уравнения, запуск отрисовки*/
var Equation = function(first, last, equal) {

	DrowArrow.apply(this, arguments);
	this.equal = equal;
	this.a = last;
	this.b = this.equal - this.a;
	this.startPoint = first;

	var $firstSumm = $('.firstSumm');
	$firstSumm.html(this.a);
	var $secondSumm = $('.secondSumm');
	$secondSumm.html(this.b);
	var $equal = $('.equal');
	$equal.append('<p id = "equalNum">?<p>');

	this.drow(first, this.a);
	this.moveElement(this.startPoint, this.a, '.active');
	this.currentPlace = 1;
}

/*Диапазон значений слагаемых*/
var ValuesSumm = function(a1, a2, e1, e2) {
	
/*Генератор случайных чисел*/
	function randomInteger(min, max) {
	    var rand = min + Math.random() * (max + 1 - min);
	    rand = Math.floor(rand);
	    return rand;
	}

	var a = randomInteger(a1, a2);
	var eq = randomInteger(e1, e2);
	
	var newEquestion = new Solution(0, a, eq);

}

/*Начать сначала*/
var Again = function(a1, a2, e1, e2) {

	$('section').html('<h2 id="equation"><div class="firstSumm"></div><p> + </p><div class="secondSumm"></div><p>=</p><div class="equal"><form id="eInput"><input type="text" class = "equalInput"></form></div></h2><form id="inputs"><input type="text" class="active"></form><canvas id="arrow"></canvas><div class="sprite"><img src="img/sprite.png">	</div>');
		new ValuesSumm(a1, a2, e1, e2);
}
