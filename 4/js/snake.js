//Create snake
var i;
function createSnake(){
	snakearr.push({
		x: positionx, 
		y: positiony
	});
	i = (snakearr.length-1);
	setCell(snakearr[i].x, snakearr[i].y, "rgb(139, 0, 0)");
}
//deletetail
function deleteSnake(){
	if (i >= 1){
		var tail = snakearr.shift();
		setCell(tail.x, tail.y, "rgb(255, 255, 255)");	
	}
}
//move snake
function move() {
//Keyboard input
	document.onkeyup = function(key) {			
			var push = key.keyCode;
			switch(push) {
				case 37:
				direct = "left";
				console.log('left');
				break;
				case 38:
				direct = "up";
				console.log('up');
				break;
				case 39:
				direct = "right";
				console.log('right');
				break;
				case 40:
				direct = "down";
				console.log('down');
				break;
			}
		}
//check direction
		switch(direct) {	
			case "left":
			positionx--;
			break;
			case "up":
			positiony--;
			break;
			case "right":
			positionx++;
			break;
			case "down":
			positiony++;
			break;
		}
//check crash board
		if (positionx < 0 || positiony < 0 || positionx > cell-1 || positiony > cell-1) {		
			$("#idfield").html("<h1>Game over, you lose. Press the spacebar to continue.<br/> You take: "+score+" eats."+"</h1>");
			clearInterval(interval);
			document.onkeyup = function(space) {
				if (space.keyCode == 32) {
					$("#idfield").remove();
					$('#mainmenu').show("clip", 500);
				}
			}
		}

		else { 
			createSnake();
		}
	}