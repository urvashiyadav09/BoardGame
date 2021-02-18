
//display current player name (retrieve it from the local storage and stored in a variable)
var PlayerName1 = localStorage.getItem('Player1');
var PlayerName2 = localStorage.getItem('Player2');

//append the current player name in h3(Select Player Name) using innerHtml
document.getElementById('player_name1').innerHTML = 'Player1:&nbsp;&nbsp;' + PlayerName1;
document.getElementById('player_name2').innerHTML = 'Player2:&nbsp;&nbsp;' + PlayerName2;

// players array

const players = [{name: PlayerName1}, {name: PlayerName2}]

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
// selecting player
var currentPlayer = 0;

//retrive the dice element from html and stored it in a variable
var gameDice = document.getElementById("roll_dice");

//define the global variable playerScore (which will store the score of player on every dice roll)
var playerScore = [0,0];


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
		playerScore[currentPlayer] = playerScore[currentPlayer] + rollDiceNumber;
	
		//this will move coins inside the borad
		moveCircle();

		// To start the game, if first player has 1 score and second player has zero
		// both players overlape due to positioning of second player inside the board

		// OR both player at same point during the play time
		if((playerScore[0] === playerScore[1]) || (playerScore[0] === 1 && playerScore[1] === 0)){
			document.getElementById('player_overlape').innerHTML = PlayerName1 + ' & ' + PlayerName2 + ' are at same place.';
		}
		else{
			document.getElementById('player_overlape').innerHTML = '';
		}
		
		// increasing player loop and again setting to zero 
		currentPlayer++;
    
    	if(currentPlayer >= players.length) {
        currentPlayer = 0;
    	}

	}, 700);
});


//----------------CODE TO MOVE THE GREEN CIRCLE ON DICE ROLLING-------------------//
//define a null array to store the total number of squares from game board
var totalBoardSquare = [];

//intializing the variables
var circleTokenCount1 = 0;
var circleTokenCount2 = 0;
var diceNewNumber = 0;
var circleTokenMoveRow = [0,0];
var circleTokenMoveColumn = [0,0];


function moveCircle() {

	//call a drawGameBoard() function because game board will draw every time when the circle is moving inside it
	drawGameBoard();

	//generate the total number of game board square and store them in an array which is defined outside from the function
	totalBoardSquare = Math.round(gameBoardRow * gameBoardColumn);

	//check the codition for the player if he will cross the total number of board squares than he will be stay at the previous square
	if (playerScore[currentPlayer] > totalBoardSquare) {
		playerScore[currentPlayer] = playerScore[currentPlayer] - diceNumber;
	}

	// updating score on the display
	document.getElementById('game_score1').innerHTML = 'Player1 Score(pink)&nbsp:&nbsp' + playerScore[0];
	document.getElementById('game_score2').innerHTML = 'Player2 Score(green)&nbsp:&nbsp' + playerScore[1];
	
	//computation of how many rows and column will move dice when it is rolling and store them in a variable
	circleTokenMoveRow[currentPlayer] = Math.floor(playerScore[currentPlayer] / gameBoardColumn);
	circleTokenMoveColumn[currentPlayer] = playerScore[currentPlayer] % gameBoardRow;
	
	//default board index is 0 , make it to start 1 when the circle dice is moving on the board
	circleTokenMoveColumn[currentPlayer] = circleTokenMoveColumn[currentPlayer] - 1;
	
	//Placing both coins out of the board, when game starts everytime
	if (playerScore[1] === 0) {
		document.getElementById("game_token1").remove();
		document.getElementById("game_token2").remove();
	}
	

	//keep the index of last column in each row on dice roll (for e.g if total score is 10 than it will say 0th row 10th column)
	if (playerScore[currentPlayer] % gameBoardColumn === 0) {
		circleTokenMoveRow[currentPlayer] = circleTokenMoveRow[currentPlayer] - 1;
		circleTokenMoveColumn[currentPlayer] = gameBoardColumn - 1;
	}

	//draw circles inside the board
	
	// draw one circle
	var circleRadius = 45;
	chessBoard.beginPath();
	chessBoard.arc((boardSquareHeightWidth * circleTokenMoveColumn[0]) + circleRadius,
	(boardSquareHeightWidth * circleTokenMoveRow[0]) + circleRadius,
	circleRadius, 0, Math.PI * 2, false);
	chessBoard.fillStyle = "#FF1493";
	chessBoard.fill();
		
	// draw another circle
	chessBoard.beginPath();
	chessBoard.arc((boardSquareHeightWidth * circleTokenMoveColumn[1]) + circleRadius,
	(boardSquareHeightWidth * circleTokenMoveRow[1]) + circleRadius,
	circleRadius, 0, Math.PI * 2, false);
	chessBoard.fillStyle = "#006400";
	chessBoard.fill();

	// increaing count of each player
	if(currentPlayer === 0){circleTokenCount1 = circleTokenCount1 + 1;}
	if(currentPlayer === 1){circleTokenCount2 = circleTokenCount2 + 1;}
	 

	//if player is on the last square of the board(player win the game) then it goes to winner.html page
	// this sleep function is introduced to wait for some time to show the winner.
	function sleep(ms) {
		return new Promise(
		  waitScore => setTimeout(waitScore, ms)
		);
	  }
	  
	  async function gameWinWait() {
		if (playerScore[currentPlayer] == totalBoardSquare) {
			
			var winnerPlayer = players[currentPlayer].name;
			localStorage.setItem('gameWinner', winnerPlayer);
			await sleep(1000);
			window.location.href = "winner.html";
		}
	  }
	  
	  gameWinWait();
}
