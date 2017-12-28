/*Класс для рисования стрелок*/
var DrowArrow = function() {

	this.drow = function(first, last) {
		
		var newArrowCanvas = $('section').append('<canvas class = "newCanvas arrow" ></canvas>');
		arrowCanvas = $('.newCanvas');
		var context = arrowCanvas.get(0).getContext("2d");
		context.strokeStyle = 'red';
		this.first = (first*13)+16;
		this.last = (last*13)+16;

		context.beginPath();
		context.moveTo(this.first, 120);
		context.quadraticCurveTo((this.last+this.first)/2, (this.first-this.last+200)/1.8, this.last, 120);
		context.stroke();
		context.moveTo(this.last, 120);
		context.lineTo(this.last-10, 115);
		context.stroke();
		context.moveTo(this.last, 120);
		context.lineTo(this.last-(this.last-this.first)/25, 108+((this.last-this.first)*0.01));
		context.stroke();

		$('.newCanvas').fadeIn();
		$('.newCanvas').removeClass('newCanvas');
	}

	/*Передвижение элементов по селектору, над стрелками*/
	this.moveElement = function(x, y, selector) {
		var currentInput = $(selector);
		var x1 = (y+x)*10+37.5-(14-y)*1.8;
		var y1 = (95-(((20-2*(14-y))-(y+x)))*5);
		currentInput.css({
			top: y1 +'px',
			left: x1 +'px'
		});
	}

}