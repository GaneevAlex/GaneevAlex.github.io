
function createMatrix()
{
	var matrix = document.getElementById('matrix');
	var n = 20 * 20;	
	
	for (var i = 0; i < n; i++)
	{
		var div = document.createElement('div');
		div.className = 'cell';
		matrix.appendChild(div);
	}
}


function getCell(Upd, eat)
{
	if (Upd==eat) {
		alert("Game Over");
		location.reload();

	}
}


function setCell(Upd, Upd2)
{
	
var set2 = document.getElementsByClassName('cell')[Upd2];
	set2.style.backgroundColor = 'white';

	var set = document.getElementsByClassName('cell')[Upd];
	set.style.backgroundColor = 'red';
	console.log(set);
	console.log(Upd);
	console.log(Upd2);
}


window.onload = function()
{
	var Upd2 = 0;
	var row = 1;
	var col = 0;
	var Upd = col;

	createMatrix();	
	setCell(Upd, Upd2);

	var eat = document.getElementsByClassName('cell')[100];
	eat.style.backgroundColor = 'Green';
	getCell(Upd, 100);

	document.onkeyup = function(key) {
	if (key.keyCode >= 37 && key.keyCode <= 40) {
		if (key.keyCode == 37){
			col--;
			console.log("left");
		}
		else if (key.keyCode == 38){
			row--;
			console.log("up");
		}
		else if (key.keyCode == 39){
			col++;
			console.log("right");
			}
		else if (key.keyCode == 40){
			row++;
			console.log("down");
			}

		Upd = col;

		if (row>=1)
		{
		Upd += 20*(row-1);
		}
		
		if (row < 1 || row > 20 || col < 0 || col > 19) {
			alert("Game Over, you lose!")
			location.reload();
		}

		setCell(Upd, Upd2);
		getCell(Upd, 100);

		Upd2 = Upd;	
	}
	
	else {
		console.log("else");
		}	
	

}
}				
