// let diceRoll = Math.floor(Math.random() * 6) +1;

// Business Logic for ScoreTally constructor

function ScoreTally() {
  this.scores = {};
}

ScoreTally.prototype.trackScore = function(playerScore) {
  this.scores[playerScore.playerNumber] = playerScore;
}

// Business Logic for PlayerScore constructor

function PlayerScore(playerNumber, currentScore) {
  this.playerNumber = playerNumber;
  this.currentScore = currentScore;
}

PlayerScore.prototype.addScore = function(input) {
  this.currentScore += input;
}


// Define Global Variables
let gameScoreTally = new ScoreTally;
let p1Score = new PlayerScore(1,0)
let p2Score = new PlayerScore(2,0)
gameScoreTally.trackScore(p1Score);
gameScoreTally.trackScore(p2Score);
let currentTurn = 1;


// Business Logic
function changePlayerTurn() {
  if (currentTurn === 1) {
    currentTurn = 2;
    playerTurn(2);
  } else {
    currentTurn = 1;
    playerTurn(1);
  }
}

function playerTurn(playerNumber) {
  let keepRolling = 1;
  let turnTotal = 0;
  for(let i = 0; i < keepRolling; i++) {
    console.log("Number of Roll: " + i);
    let diceRoll = Math.floor(Math.random() * 6) +1;
    console.log("Value of Dice: " + diceRoll);
    if (diceRoll === 1) {
      keepRolling = 0;
      changePlayerTurn();
    } else if (diceRoll > 1) {
      
      turnTotal = turnTotal + diceRoll
      //(event listener for reroll)
      keepRolling = keepRolling + 1;
      //(event listener for hold)
      turnTotal = turnTotal + diceRoll
      gameScoreTally.scores[playerNumber].addScore(turnTotal)
      keepRolling = i-1;
      changePlayerTurn();
    }
  gameScoreTally.scores[playerNumber].prototype.addScore(turnTotal)
  turnTotalP1 = 0
  

  }
}





// UI Logic