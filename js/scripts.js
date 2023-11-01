// let diceRoll = Math.floor(Math.random() * 6) +1;

// Business Logic for ScoreTally constructor

function ScoreTally() {
  this.scores = {};
}


// Business Logic for PlayerScore constructor

function PlayerScore(playerNumber, currentScore) {
  this.playerNumber = playerNumber;
  this.currentScore = currentScore;
}

PlayerScore.prototype.addScore = function(input) {
  this.currentScore += input;
}


// Business Logic



// UI Logic