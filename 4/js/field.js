//Create game field
function createField(columns, rows) {
	
	field = document.createElement('table');
	field.id = "idfield";
	$(field).css({'display' : 'none'});
	$('body').append(field);

	for (var i = 1; i <= rows; i++) {
		var tr = document.createElement('tr');
			for (var j = 1; j <= columns; j++) {
				var td = document.createElement('td');
				$(td).css({'background-color' : "rgb(255, 255, 255)"});
				$(tr).append(td);
			}
		$(field).append(tr);
	}
	//Animation field
	$("#idfield").fadeIn(500, function() {
			interval = setInterval(function(){move()}, speed)
		});
	//create wall and eat
	elem(eatn, "rgb(34, 139, 34)");
	elem(wall, "rgb(139, 137, 112)");
}
