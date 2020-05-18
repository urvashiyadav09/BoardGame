
//display current player name (retrieve it from the local storage and stored in a variable)
var currentPlayerName = localStorage.getItem('Player');

//append the current player name in h3(Select Player Name) using innerHtml
document.getElementById('player_name').innerHTML = 'Player Name:&nbsp;&nbsp;' + currentPlayerName;

//-------------DRAW A GAME BOARD---------------------------//
//variables to define the game board square height and width
var boardSquareHeightWidth = 90;
// dice number for using in different functions after using in innerHTML
var diceNumber = 0;

//access the canvas
var board = document.getElementById('board_canvas');
var chessBoard = board.getContext('2d');

//variable to define the game board rows and game board columns
var gameBoardRow = (board.width) / boardSquareHeightWidth;
var gameBoardColumn = (board.height) / boardSquareHeightWidth;

function drawGameBoard() {
	for (var i = 0; i < gameBoardRow; i++) {
		for (var j = 0; j < gameBoardColumn; j++) {
			if (i % 2 == j % 2) {
				chessBoard.fillStyle = "#edbb99";
				chessBoard.fillRect(boardSquareHeightWidth * i, boardSquareHeightWidth * j, boardSquareHeightWidth, boardSquareHeightWidth);
			} else {
				chessBoard.fillStyle = "#641e16";
				chessBoard.fillRect(boardSquareHeightWidth * i, boardSquareHeightWidth * j, boardSquareHeightWidth, boardSquareHeightWidth);
			}
		}
	}
}

window.onload = drawGameBoard();
//------------CODE TO ROLL THE DICE ON BOARD--------------------//
//retrive the dice element fromm html and stored it in a variable
var gameDice = document.getElementById("roll_dice");

//define the global variable playerScore (which will store the score of player on every dice roll)
var playerScore = 0;

// click event on dice
gameDice.addEventListener("click", function() {

	//Change the text on dice when it is rolling
	gameDice.innerHTML = "Dice Rolling.";

	setTimeout(function() {
		//define the dice side
		var diceSides = 6;

		//generate the random number when dice is rolling
		var rollDiceNumber = Math.floor(Math.random() * diceSides) + 1;

		//after rooling the dice append the generated dice number into the gameDice variable
		diceNumber = rollDiceNumber;
		gameDice.innerHTML = rollDiceNumber;

		//generate the player score and append it in the game_socre id defined in html
		playerScore = playerScore + rollDiceNumber;
		//document.getElementById('game_score').innerHTML = '<span>Player Score:&nbsp</span>' + playerScore;

		//calling a move circle function
		moveCircle();

	}, 700);
});


//----------------CODE TO MOVE THE GREEN CIRCLE ON DICE ROLLING-------------------//
//define a null array to store the total number of squares from game board
var totalBoardSquare = [];

//define a circleTokenCount varible on the game board in which the game board index start from zero for first one
var circleTokenCount = 0;

var diceNewNumber = 0;

function moveCircle() {

	//call a drawGameBoard() function because game board will draw every time when the circle is moving inside it
	drawGameBoard();

	//generate the total number of game board square and store them in an array which is defined outside from the function
	totalBoardSquare = Math.round(gameBoardRow * gameBoardColumn);
	console.log('totalBoardSquare', totalBoardSquare);

	//check the codition for the player if he will cross the total number of board squares than he will be stay at the previous square
	if (playerScore > totalBoardSquare) {
		playerScore = playerScore - diceNumber; //rollDiceNumber
		console.log('player score crossed the total number of board squares.')
	}
document.getElementById('game_score').innerHTML = 'Player Score&nbsp:&nbsp' + playerScore;
	//generate the nuber how many rows and column will move dice when it is rolling and store them in a variable
	var circleTokenMoveRow = Math.floor(playerScore / gameBoardColumn);
	console.log('circleTokenMoveRow1', circleTokenMoveRow);

	var circleTokenMoveColumn = playerScore % gameBoardRow;
	console.log('circleTokenMoveColumn1', circleTokenMoveColumn);

	//default board index is 0 , make it to start 1 when the circle dice is moving on the board
	circleTokenMoveColumn = circleTokenMoveColumn - 1;
	if (circleTokenCount === 0) {
		//remove the circle token from its position(define outside from the canvas) when player start the game
		document.getElementById("game_token").remove();
	}

	//keep the index of last column in each row on dice roll (for e.g if total score is 10 than it will say 0th row 10th column)
	if (playerScore % gameBoardColumn === 0) {
		circleTokenMoveRow = circleTokenMoveRow - 1;
		circleTokenMoveColumn = gameBoardColumn - 1;
		console.log('circleTokenMoveRow2', circleTokenMoveRow);
		console.log('circleTokenMoveColumn2', circleTokenMoveColumn);
	}

	//draw a new circle inside the board
	var circleRadius = 45;
	chessBoard.beginPath();
	chessBoard.arc((boardSquareHeightWidth * circleTokenMoveColumn) + circleRadius,
		(boardSquareHeightWidth * circleTokenMoveRow) + circleRadius,
		circleRadius, 0,
		Math.PI * 2, false
	);
	chessBoard.fillStyle = "#FF1493";
	chessBoard.fill();

	circleTokenCount = circleTokenCount + 1;

	//if player is on the last square of the board(player win the game) then it goes to winner.html page
	
	function sleep(ms) {
		return new Promise(
		  waitScore => setTimeout(waitScore, ms)
		);
	  }
	  
	  async function gameWinWait() {
		if (playerScore == totalBoardSquare) {
			await sleep(1000);
			window.location.href = "winner.html";
			console.log('Player win the game');
		}
	  }
	  
	  gameWinWait();
}
