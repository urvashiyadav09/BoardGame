//display current player name (retrieve it from the local storage and stored in a variable)
var winnerPlayerName = localStorage.getItem('Player');

//append the winner player name
document.getElementById('winner_name').innerHTML = 'Ye Hey!&nbsp;&nbsp;' + winnerPlayerName + '&nbsp;&nbsp;Win the game.&nbsp;&nbsp;';
