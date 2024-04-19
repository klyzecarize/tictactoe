let isPlayer1Turn = true;
let isVacant = true;
let winCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],
];
let movePlacements = {x:[], y:[]};
let placementChecker = [];
let currentPlayer = '';

function clickSample(id) {
	checkIfVacant(id);
	if (isVacant){
		if(isPlayer1Turn){
			document.getElementById(id).innerHTML = 'o';
			document.getElementById(id).style.backgroundColor = 'green';
			document.getElementById(id).style.color = 'white';
			movePlacements.y.push(id);
			placementChecker = movePlacements.y;
			isPlayer1Turn = false;
			currentPlayer = 'Player 1';
			forEachCombos();
		} else {
			document.getElementById(id).innerHTML = 'x';
			document.getElementById(id).style.backgroundColor = 'red';
			document.getElementById(id).style.color = 'white';
			movePlacements.x.push(id);
			placementChecker = movePlacements.x;
			isPlayer1Turn = true;
			currentPlayer = 'Player 2';
			forEachCombos();
		}
	} else {
		alert('The cell is occupied')
	}
	
}

function checkIfVacant(id){
	if (document.getElementById(id).innerHTML === 'o' || document.getElementById(id).innerHTML === 'x'){
		isVacant = false;
	} else {
		isVacant = true;
	}
}

function forEachCombos(){
	let win = false;
	let is3True = 0;	

	if(placementChecker.length > 2){
		if (checkWinCombos()){
			setTimeout(function() {
			  	if (confirm(currentPlayer + " Win")) {
			  		gameMode('reset');
				} else {
			  		gameMode('cancel');

				    alert('Why did you press cancel? You should have confirmed');
				}
		  	},10)	
		}
	}
		
}

function checkWinCombos(){
	let is3True = 0;
	for (var i = winCombos.length - 1; i >= 0; i--) {
		for (var x = winCombos[i].length - 1; x >= 0; x--) {
			placementChecker.forEach(function(res){
				if(winCombos[i][x] === parseInt(res)){
					is3True+=1;				
				}
			})
		}
		if(is3True === 3){
			console.log('Win')
			return win = true;
			break;

		} else {
			is3True = 0;		
		}
	}
}

function gameMode(mode){
    console.log('Thanks for confirming');

	if(mode === 'reset'){
		isPlayer1Turn = true;
		movePlacements = {x:[], y:[]};
		placementChecker = [];
		currentPlayer = '';

		for (var i = 0; i < 9; i++) {
			document.getElementById(i).innerHTML = '';
			document.getElementById(i).style.backgroundColor = '';
			document.getElementById(i).style.color = 'black';
			if (document.getElementById(i).onclick === ''){
				document.getElementById(i).onclick = 'clickSample(this.id)';
			}
		}
	} if (mode === 'cancel'){
		for (var i = 0; i < 9; i++) {
			document.getElementById(i).onclick = '';
		}
	}
}

