//Random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Create color cell
function setCell(x, y, color) {
	
	var row = field.rows[y].cells[x];
	//if snake
	if (color == "rgb(139, 0, 0)") {
		
		if (row.style.backgroundColor == "rgb(34, 139, 34)") {
			elem(1, 'rgb(34, 139, 34)'); //add new eat
			elem(1, 'rgb(139, 137, 112)'); //add new wall
			score++;
			row.style.backgroundColor = color;
		}

		else if (row.style.backgroundColor == "rgb(139, 137, 112)" || row.style.backgroundColor == "rgb(139, 0, 0)") {
			$("#idfield").html("<h1>Game over! Press the spacebar to continue. <br/> You take: "+score+" eats."+"</h1>");
			clearInterval(interval);
			document.onkeyup = function(space) {
				
				if (space.keyCode == 32) {
					$("#idfield").remove();
					$('#mainmenu').show("clip", 500);
				}
			}
		}

		else {
			row.style.backgroundColor = color;
			deleteSnake();
		}

	}

	else if (color == "rgb(255, 255, 255)") {

		row.style.backgroundColor = color;

	}
	
	else {
		if (row.style.backgroundColor != "rgb(255, 255, 255)") {
			setCell(getRandomInt(1, cell-2), getRandomInt(1, cell-2), color);
		}
		else {
			row.style.backgroundColor = color;
		}
	}
}

//create elements n times in random place
function elem (n, color) {
	for (var i = 1; i <= n; i++) {
		setCell(getRandomInt(1, cell-2), getRandomInt(1, cell-2), color);	
	}
}