"use strict";

var col = 0;
var row = 1;
var Upd = 0;
var Upd2 = 0;



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


function setCell(mesh, color)
{
	
	var set = document.getElementsByClassName('cell')[mesh];
	set.style.backgroundColor = color;
	
}

function delCell(lastmesh) {

	var set2 = document.getElementsByClassName('cell')[lastmesh];
	set2.style.backgroundColor = "white";

}



window.onload = function()
{
	var direct = "right";
	createMatrix();	
	setCell(0, "red");

	var eat = setCell(100, "green");
	getCell(0, 100, "green");

	setCell(25, "yellow");
	setCell(45, "yellow");
	setCell(65, "yellow");

	document.onkeyup = function(key) {
	if (key.keyCode >= 37 && key.keyCode <= 40) {
		if (key.keyCode == 37){
			direct = "left";
			console.log("left");
		}
		else if (key.keyCode == 38){
			direct = "up";
			console.log("up");
		}
		else if (key.keyCode == 39){
			direct = "right";
			console.log("right");
			}
		else if (key.keyCode == 40){
			direct = "down";
			console.log("down");
			}
	}
	
	else {
		console.log("else");
		}	

	}

	setInterval(function() {

	if (direct == "left") {
		col--;
	}
	else if (direct == "up" ) {
		row--;	
	}
	else if (direct == "right" ) {
		col++;	
	}
	else if (direct == "down") {
		row++;
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

		setCell(Upd, "red");
		delCell(Upd2);
		getCell(Upd, 100);
		getCell(Upd, 25);
		getCell(Upd, 45);
		getCell(Upd, 65);


		Upd2 = Upd;

	}, 500);


}				
