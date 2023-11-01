Describe: ScoreTally()

Test: "It will construct a new object that contains PlayerScore objects"
Code: let newScoreTally = new ScoreTally;
Expected Output: newScoreTally{}


Describe: PlayerScore(playerName, currentScore)

Test: "It will construct a new object that contains an individual player's score"
Code: let player1Score = new PlayerScore(player1, 0);
Expected Output: player1Score{ playerName: player1, currentScore: 0}


Describe: PlayerScore.prototype.addScore(rollResult)

Test: "It will add current player's score to their total currentScore"
Code: player1Score.prototype.addScore(6)
Expected Output: 6


Describe: playerTurn(playerNumber)

Test: "It will add the value of a roll to player score if the roll does not equal 1 and will allow the player to reroll"
Code: playerTurn(1)
Expected Output: undefined (function-scoped variable creation would not return output)

Test: "It will not add the value of a roll to player score if the roll equals 1 and will not allow the player to reroll"
Code: playerTurn(1)
Expected Output: undefined (function-scoped variable creation would not return output)






Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to "hold":

- If the player rolls a 1, they score nothing and it becomes the next player's turn.
- If the player rolls any other number, it is added to their turn total and the player's turn continues.
- If a player chooses to "hold", their turn total is added to their score, and it becomes the next player's turn.
The first player to score 100 or more points wins.


--------------

function PlayerScore(playerName, currentScore) {
  this.playerName
  this.currentScore
}

PlayerScore.prototype.addScore(rollResult) {
  this.currentScore += rollResult;
}

// Global Variables

let player1Score = new PlayerScore(1,0)
let player2Score = new PlayerScore(2,0)

gameScoreTally.scores[player1Score, player2Score]


myScoreTally  [player1Score{ playerName: player1, currentScore: 0}, player2Score{ playerName: player2, currentScore: 0}]


let turnTotalP1 = 0;
let turnTotalP2 = 0;




function playerTurn(playerNumber) {
  let turnTotal = turnTotal
  if (turnTotal === null) {
    turnTotal = 0
  }
  roll()
    if (result of roll is 1) {
      scorenothing
    } if (result of roll is 2-6) {
      add result to turnTotal

    }
  gameScoreTally.scores[playerNumber].prototype.addScore(turnTotal)
  turnTotalP1 = 0
  
}

keepRolling = 1;

for(let i = 0, i < keepRolling, i++) {
  roll() {
  if (result is 1) {
    keepRolling = 0
  } else if (result is 2-6) {
    

    keepRolling ++1
    add result to turnTotal
  }
}
}



------

let player1Score = new PlayerScore(1,0)
let player2Score = new PlayerScore(2,0)

let playerTurn = 1;

function changePlayerTurn() {
  if (playerTurn === 1) {
    playerTurn = 2;
  } else {
    playerTurn = 1;
  }
}

function playerTurn(playerNumber) {
  let (playerNumber + "TurnTotal") = 0
  "Button: Roll" add event listener for click. Onclick call roll(playerNumber) function
  "Button: Hold" add event listener for click. Onclick call hold(playerNumber) function

}

roll(playerNumber) {
  let diceRoll = Math.floor(Math.random() * 6) +1;
  if (diceRoll === 1) {
    hide the roll button
  } else if (diceRoll > 1) {
    let (playerNumber + "TurnTotal") += diceRoll;
  }
}

Button: Hold
proceed to player2Turn