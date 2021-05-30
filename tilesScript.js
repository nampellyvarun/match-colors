var arrColors =["red", "blue", "green", "yellow", "orange", "brown", "pink", "violet", "red", "blue", "green", "yellow", "orange", "brown", "pink", "violet"];
var c = 0, attempt = 0, lives = 3, done = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], tilesMatched = 0;
var firstTile, firstDone;
var squares = document.querySelectorAll(".square");
var ic1 = document.getElementById("i1");
var ic2 = document.getElementById("i2");
var ic3 = document.getElementById("i3");

function sleep(ms)
{
      return new Promise(resolve => setTimeout(resolve, ms));
}	

function showColor(tile, i)
{
	tile.style.backgroundColor = arrColors[i];
}

function firstClick(tile)
{
	firstTile = tile;
}

async function matched(tile1, tile2)
{
	await sleep(200);
	tile1.style.backgroundColor = "grey";
	tile2.style.backgroundColor = "grey";
}

async function gameWonOrLost(verdict)
{
	await sleep(300);
	if(verdict === 0)
	{
		if(confirm("Oops! You lost. Press ok to play again. Press close to quit the game."))
		{
			location.reload();
		}
		else
		{ 
			window.close();
		}
	}
	else if(verdict === 1)
	{
		if(confirm("Yey! You won. Press ok to play again. Press close to quit the game."))
		{
			location.reload();
		}
		else
		{ 
			window.close();
		}
	}
}

function loseLife()
{
	if(lives === 3)
	{
		ic1.setAttribute("class","black");
		lives -= 1;
	}
	else if(lives === 2)
	{
		ic2.setAttribute("class","black");
		lives -= 1;
	}
	else
	{
		ic3.setAttribute("class","black");	
		gameWonOrLost(0);		
	}
}

async function notMatched(tile1, tile2)
{
	await sleep(800);
	tile1.style.backgroundColor = "black";
	tile2.style.backgroundColor = "black";
}

for (let i = 0; i < squares.length; i++)
{
	arrColor = shuffleArray(arrColors);
	squares[i].addEventListener("click", function()
	{	
		if(done[i] === 0)
		{	
			squares[i].style.background = "black";
			showColor(this, i);
			if(c === 0)
			{
				c = 1;
				firstClick(this);
				firstDone = i;
			}
			else if(c === 1 && firstTile === this){}
			else if(c === 1 && firstTile !== this && firstTile.style.backgroundColor === this.style.backgroundColor)
			{
				c = 0;
				matched(this, firstTile);
				done[firstDone] = 1;
				done[i] = 1;
				tilesMatched += 2;
				if(tilesMatched === 16){gameWonOrLost(1);}
			}
			else if(c === 1 && firstTile !== this && firstTile.style.backgroundColor !== this.style.backgroundColor)
			{
				c = 0;
				attempt++;
				notMatched(this, firstTile);
				if(attempt > 7)
				{
					loseLife();
				}
			}
		}
	});
}

function help()
{
	alert("Welcome to the game. Here are the instructions:\n1) Match any 2 tiles with the same color.\n2) You have three lives left to match all of them.\n3) For first seven wrong attempts, you don't lose your life.\n4) After that, for every mismatch, you lose one heart.\n5) You can play until you lose all the three hearts.");
}

function newGame()
{
	location.reload();
}

function shuffleArray(array) 
{
   	array.sort(() => Math.random() - 0.5);
	return array; 
}