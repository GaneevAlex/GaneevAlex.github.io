/*Обработка данных и действия*/
var Solution = function(first, last, equal) {

	Equation.apply(this, arguments);
	var number;
	var lengthEqual = 0;

	var self = this;

	/*Значения нажатых кнопок*/
	function decode(push) {
		if (push == 49 || push == 97) {
			number = 1;
		}
		else if (push == 50 || push == 98) {
			number = 2;
		}
		else if (push == 51 || push == 99) {
			number = 3;
		}
		else if (push == 52 || push == 100) {
			number = 4;
		}
		else if (push == 53 || push == 101) {
			number = 5;
		}
		else if (push == 54 || push == 102) {
			number = 6;
		}
		else if (push == 55 || push == 103) {
			number = 7;
		}
		else if (push == 56 || push == 104) {
			number = 8;
		}
		else if (push == 57 || push == 105) {
			number = 9;
		}
		else if (push == 8) {
			number = 'backspace';
		}
	}

	/*Очистка импутов*/
	var resetInputs = function(selector) {
		$(selector).trigger('reset');
	}

	/*Проверка введенных данных*/
	var check = function(numberKey) {
			resetInputs('#inputs');
		/*Проверка на правильность ввода первого слагаемого*/
		if (self.currentPlace == 1) {
			if (numberKey != self.a) {
				$('.active').css('color', 'red');
				$('.firstSumm').css('backgroundColor', 'yellow');
			}
			else {
				$('.active').css('color', 'black');
				$('.firstSumm').css('backgroundColor', 'inherit');
				self.currentPlace = 2;
				self.drow(self.a, self.equal);
				self.moveElement(self.a, self.equal, '.active');
				$('#inputs').append('<p class = "firstSummPlace">'+self.a+'</p>');
				self.moveElement(self.startPoint, self.a, '.firstSummPlace');

				$(".active").replaceWith($(".active").clone(true)); //Для очистки инпута

			}
		}
		/*Проверка на правильность ввода второго слагаемого*/
		else if (self.currentPlace == 2) {
			if (numberKey != self.b) {
				$('.active').css('color', 'red');
				$('.secondSumm').css('backgroundColor', 'yellow');
			}
			else {
				$('.active').css('color', 'black');
				$('.secondSumm').css('backgroundColor', 'inherit');
				self.currentPlace = 3;
				$('#inputs').append('<p class = "secondSummPlace">'+self.b+'</p>');
				self.moveElement(self.a, self.equal, '.secondSummPlace');
				$('.active').css('display', 'none');
				$('.equalInput').css('display', 'inline-block');
				$('#equalNum').css('display', 'none');
			}
		}

		else if (self.currentPlace == 3) {
			/*Проверка на стирание вручную*/
			if (numberKey != 'backspace') {
				lengthEqual++;
			}
			else {
				if (lengthEqual > 0) {
					lengthEqual--;
				}
			}
			/*Проверка на количество символов - если два, то сравниваем с ответом, если больше то очищаем*/
			if (lengthEqual == 2) {
				var summ;
				var $equalInput = $('.equalInput');
				summ = $equalInput.val();
				if (summ != self.equal) {
					$('.equalInput').css('color', 'red');
				}
				else {
					$('.equalInput').css('display', 'none');
					$('#equalNum').css('display', 'inline-block');
					$('#equalNum').html(summ);
					
					$('section').append('<button>Отлично!<br> Ещё раз?</button>')
					$('button').click(function() {
						new Again(aMin, aMax, equalMin, equalMax);
					});
				}
			}
			if (lengthEqual > 2) {
				resetInputs("#eInput");
				lengthEqual = 0;
			}
		}
	}

	$('.active, .equalInput').keyup(function(event) {
		var push = event.keyCode;
		decode(push);
		check(number);
	});
}