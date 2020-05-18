localStorage.clear();

// Retrieve all cards from HTML and store them in a variable
var allCards = document.querySelectorAll(".displayCard__cardSelect");
var gamePlayer = null;
var selectedPlayerName = document.getElementById("selected_playerName");

allCards.forEach(function(gamePlayer){
	gamePlayer.addEventListener('click' , function(){

		    // Retrieve player name on each click on a card using data-attribute and store it in a variable
			var playerName = this.dataset.name;
			console.log(playerName);
		    // Store player name in a variable which is defined null outside from the function
		    gamePlayer = playerName;
		    localStorage.setItem('Player', gamePlayer);
     
// Check condition on start_button to enable it when any of the card is selected
		if(gamePlayer == null){
			 document.getElementById("start_button").disabled = true;
		}
		else{
			 document.getElementById("start_button").disabled = false;
		}

// Display the selected Card Name at the top of the web pageSize
    selectedPlayerName.innerHTML = 'Selected Player:&nbsp;&nbsp;' + gamePlayer;
		 this.classList.add("selectedPlayerName");

//Change the background color of active card and active class is defined in CSS
	var activeCard = document.getElementsByClassName("active");
  if (activeCard.length > 0) {
    activeCard[0].className = activeCard[0].className.replace(" active", "");
  }
  this.className += " active";
	});
});
