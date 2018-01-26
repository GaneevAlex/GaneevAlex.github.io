function Cell(top, left, value) {
	this.top = top;
	this.left = left;
	this.value = value;
 	this.$playField = $('#playfield');
 	this.currentTop = parseInt((this.top*100)+1);
 	this.currentLeft = parseInt((this.left*100)+1);
 	this.element = this.createElement();

	Object.defineProperties(this, {
		currentLeft: {
			get: function() {
				return this.currentLeft = parseInt((this.left*100)+1);
			}
		},
		currentTop:	{
			get: function() {
				return this.currentTop = parseInt((this.top*100)+1);
			}
		}
	});
	
}
/*Обновление ячейки*/
Cell.prototype.updateCell = function(value) {
	this.element.removeClass('t'+value);
	this.element.addClass('t'+(value*2));
	this.value = value*2;
	return false;
}

Cell.prototype.drowCell = function(newI, newJ) {
	this.top = newI;
	this.left = newJ;
	this.element.css('left',`${this.currentLeft}px`);
	this.element.css('top', `${this.currentTop}px`);
	return false;
}

Cell.prototype.createElement = function() {
	let appendElement = `<div class = "new thing t${this.value}" style = "top: ${this.currentTop}px; left: ${this.currentLeft}px;"></div>`;
	this.$playField.append(appendElement);
	let $newElement = $('.new');
	this.element = $newElement;
	$newElement.fadeIn(600);
	$newElement.removeClass('new');
	return this.element;

}