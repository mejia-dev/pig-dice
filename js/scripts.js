// Business Logic for ScoreTally constructor

function ScoreTally() {
  this.scores = {};
}

ScoreTally.prototype.trackScore = function (playerScore) {
  this.scores[playerScore.playerNumber] = playerScore;
}

// Business Logic for PlayerScore constructor

function PlayerScore(playerNumber, currentScore) {
  this.playerNumber = playerNumber;
  this.currentScore = currentScore;
}

PlayerScore.prototype.addScore = function (input) {
  this.currentScore += input;
}


// Define Global Variables
let gameScoreTally = new ScoreTally;
let p1Score = new PlayerScore(1, 0)
let p2Score = new PlayerScore(2, 0)
gameScoreTally.trackScore(p1Score);
gameScoreTally.trackScore(p2Score);
let currentTurn = 2;
let turnTotal = 0;
let aiMode = 0;
let gameMode = 0;
// 0 is normal
// 1 is two-dice


// Global Business Logic
function changePlayerTurn() {
  event.preventDefault();
  checkGameMode()
  showGame()
  hideGameOptionsDiv()
  displayScores()
  turnTotal = 0;
  if (currentTurn === 1) {
    currentTurn = 2;
    if (aiMode != 0) {
      displayGameButtons(false);
      aiTurn();
    }
    displayCurrentPlayerTurn();
    return;
  } else {
    currentTurn = 1;
    displayGameButtons(true);
    displayCurrentPlayerTurn();
    return;
  }
}

function rollDice() {
  event.preventDefault();
  let diceRoll = Math.floor(Math.random() * 6) + 1;
  if (diceRoll === 1) {
    displayRolledNumber(diceRoll);
    return "nothing"
  } else if (diceRoll > 1) {
    displayRolledNumber(diceRoll);
    return diceRoll;
  }
}

function holdDice() {
  event.preventDefault();
  gameScoreTally.scores[currentTurn].addScore(turnTotal)
  if (turnTotal != 0) {
    hideRolledMessages();
  }
  hideTurnMessages();
  checkWinningConditions();
}

function checkWinningConditions() {
  if (gameScoreTally.scores[currentTurn].currentScore >= 100) {
    let winMessageHolder = document.getElementById("winMessage");
    winMessageHolder.innerText = "Player " + currentTurn + " wins!";
    displayGameButtons(false);
    displayScores()
  } else {
    changePlayerTurn();
  }
}

function checkGameMode() {
  const gameModeSelected = document.querySelector("input[name='gameMode']:checked").value;
  if (gameModeSelected === "normal") {
    gameMode = 0;
  } else if (gameModeSelected === "two-dice") {
    gameMode = 1;
  }
}

// AI-Specific Business Logic

function setAiMode() {
  event.preventDefault();
  mode = event.target.id
  if (mode === "playWithHardAi") {
    aiMode = 2;
  } else {
    aiMode = 1;
  }
  changePlayerTurn();
}

function aiTurn() {
  if (aiMode === 1) {
    let diceRollTotal = rollDice(currentTurn)
    if (diceRollTotal === "nothing") {
      turnTotal = 0;
      holdDice();
    } else {
      turnTotal += diceRollTotal;
      diceRollTotal = rollDice(currentTurn)
      if (diceRollTotal === "nothing") {
        turnTotal = 0;
        holdDice();
      } else {
        turnTotal += diceRollTotal;
        holdDice();
      }
    }
  }
  else {
    for (diceRollTotal = 0; diceRollTotal < 16; diceRollTotal) {
      currentRollTotal = rollDice(currentTurn);
      if (currentRollTotal === "nothing") {
        turnTotal = 0;
        console.log("AI rolls: " + currentRollTotal);
        holdDice();
        return;
      } else {
        diceRollTotal += currentRollTotal;
        turnTotal = diceRollTotal;
        console.log("AI rolls: " + currentRollTotal);
      }
    }
    holdDice();
  }
}

function playerTurn() {
  event.preventDefault();
  let diceRollTotal = rollDice(currentTurn);
  let diceRollTotalB = rollDice(currentTurn);
  if (gameMode === 0) {
    console.log("Human rolls: " + diceRollTotal);
    if (diceRollTotal === "nothing") {
      turnTotal = 0;
      holdDice();
      return
    }
    turnTotal += diceRollTotal;
    displayTurnTotal(turnTotal);
} else if (gameMode === 1) {
  console.log("Human rolls: " + diceRollTotal + " & " + diceRollTotalB)
  if (diceRollTotal === "nothing" && diceRollTotalB === "nothing") {
    resetScore();
  }
}
}

function resetScore() {
  gameScoreTally.scores[currentTurn].currentScore = 0;
}

// UI Logic

function displayScores() {
  let p1ScoreDisplay = document.getElementById("displayScoreP1");
  let p2ScoreDisplay = document.getElementById("displayScoreP2");
  let p1Score = gameScoreTally.scores[1].currentScore;
  let p2Score = gameScoreTally.scores[2].currentScore;
  p1ScoreDisplay.innerText = p1Score;
  p2ScoreDisplay.innerText = p2Score;
}

function displayRolledNumber(rolledNumber) {
  let rolledNumberDisplay = document.getElementById("rolledNumberDisplay");
  rolledNumberDisplay.removeAttribute("class");
  rolledNumberDisplay.innerText = "You rolled a " + rolledNumber + ".";
  if (rolledNumber === 1 && aiMode === 0) {
    rolledNumberDisplay.setAttribute("class", "red");
    rolledNumberDisplay.innerText = "Player " + currentTurn + " rolled a " + rolledNumber + ", meaning they score nothing and it's the next player's turn.";
  } else if (rolledNumber === 1 && aiMode != 0 && currentTurn === 1) {
    rolledNumberDisplay.setAttribute("class", "red");
    rolledNumberDisplay.innerText = "You rolled a " + rolledNumber + ", meaning you score nothing and it's the AI player's turn.";
  } else if (rolledNumber === 1 && aiMode != 0 && currentTurn === 2) {
    rolledNumberDisplay.setAttribute("class", "red");
    rolledNumberDisplay.innerText = "AI rolled a " + rolledNumber + ", meaning it scored nothing and it's your turn.";
  }
}

function hideRolledMessages() {
  let rolledNumberDisplay = document.getElementById("rolledNumberDisplay");
  rolledNumberDisplay.innerText = "";
}

function displayTurnTotal(turnTotal) {
  let turnTotalDisplay1 = document.getElementById("turnTotalDisplay1");
  let turnTotalDisplay2 = document.getElementById("turnTotalDisplay2");
  turnTotalDisplay1.innerHTML = "Your current total for this turn is " + turnTotal + "." + "Would you like to Roll Dice again, or Hold your current score?";
  turnTotalDisplay2.innerHTML = "Adding this total to your current score would bring you to " + (parseInt(turnTotal) + parseInt(gameScoreTally.scores[currentTurn].currentScore)) + ".";
}

function hideTurnMessages() {
  let turnTotalDisplay1 = document.getElementById("turnTotalDisplay1");
  let turnTotalDisplay2 = document.getElementById("turnTotalDisplay2");
  turnTotalDisplay1.innerHTML = "";
  turnTotalDisplay2.innerHTML = "";
}

function displayCurrentPlayerTurn() {
  let currentTurnDisplay = document.getElementById("currentPlayerTurn");
  let turn = currentTurn;
  currentTurnDisplay.innerText = "Player " + currentTurn + "'s Turn!";
}

function hideGameOptionsDiv() {
  let gameOptionsDiv = document.getElementById("divGameOptions");
  gameOptionsDiv.setAttribute("class", "hidden");
}

function showGame() {
  let gameDiv = document.getElementById("divGame");
  let scoresDiv = document.getElementById("divScores");
  gameDiv.removeAttribute("class");
  scoresDiv.removeAttribute("class");
}

function displayGameButtons(input) {
  let gameButtons = document.getElementById("gameButtons");
  if (input === true) {
    gameButtons.removeAttribute("class");
  } else if (input === false) {
    gameButtons.setAttribute("class", "hidden");
  }
}

window.addEventListener("load", function () {
  this.document.getElementById("playGame").addEventListener("click", changePlayerTurn);
  this.document.getElementById("playWithAi").addEventListener("click", setAiMode);
  this.document.getElementById("playWithHardAi").addEventListener("click", setAiMode);
  this.document.getElementById("hold").addEventListener("click", holdDice);
  this.document.getElementById("rollDice").addEventListener("click", playerTurn);
})