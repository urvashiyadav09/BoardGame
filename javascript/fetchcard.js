fetch('https://www.anapioficeandfire.com/api/characters?page=30&pageSize=30')
	.then(result => result.json())
	.then((gameResult) => {
		gameCharacters(gameResult);
	})
	.catch(err => console.log(err))
	

function gameCharacters(gameResult) {

	var j = 0;

	for (i = 0; i < gameResult.length; i++) {
		if (gameResult[i].titles[0] && gameResult[i].culture && gameResult[i].born) {

			j = j + 1;

			var card = 'card' + j;
			var cardInfo = document.createElement('p');

			cardInfo.innerHTML += '<span class="setcard"><b>Name:&nbsp;&nbsp;</b>' + gameResult[i].name + '</span>';
			cardInfo.innerHTML += '<span class="setcard"><b>Gender:&nbsp;&nbsp;</b>' + gameResult[i].gender + '</span>';
			cardInfo.innerHTML += '<span class="setcard"><b>Culture:&nbsp;&nbsp;</b>' + gameResult[i].culture + '</span>';
			cardInfo.innerHTML += '<span class="setcard"><b>Born:&nbsp;&nbsp;</b>' + gameResult[i].born + '</span>';
			cardInfo.innerHTML += '<span class="setcard"><b>Title:&nbsp;&nbsp;</b>' + gameResult[i].titles[0] + '</span>';

			document.getElementById(card).appendChild(cardInfo);
			
		}
	}
}
