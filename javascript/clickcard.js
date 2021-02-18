localStorage.clear();

// Retrieve all cards from HTML and store them in a variable
var allCards = document.querySelectorAll(".displayCard__cardSelect");


function selectPlayers(){
    var firstPlayer = document.getElementById('selectPlayer1');
    var firstPlayerName = firstPlayer.options[firstPlayer.selectedIndex].value;

    var secondPlayer = document.getElementById('selectPlayer2');
    var secondPlayerName = secondPlayer.options[secondPlayer.selectedIndex].value;

    localStorage.setItem('Player1', firstPlayerName);
    localStorage.setItem('Player2', secondPlayerName);

}

selectPlayers();
