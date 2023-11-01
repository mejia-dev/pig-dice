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


// Business Logic
function playerTurn(playerNumber) {
  let keepRolling = 1;
  let turnTotal = 0;
  for(let i = 0; i < keepRolling; i++) {
    let diceRoll = Math.floor(Math.random() * 6) +1;    
    if (diceRoll === 1) {
      keepRolling = 0;
    } else if (diceRoll > 1) {
      
  
      //(event listener for reroll)
      turnTotal = turnTotal + diceRoll
      //(event listener for hold)
      gameScoreTally.scores[playerNumber].addScore(turnTotal)
    }
  gameScoreTally.scores[playerNumber].prototype.addScore(turnTotal)
  turnTotalP1 = 0
  

  }
}





// UI Logic