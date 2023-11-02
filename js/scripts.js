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
    return "nothing"
  } else if (diceRoll > 1) {
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
  let winMessageHolder = document.getElementById("winMessage");
  if (aiMode === 0) {
    if (gameMode === 0) {
      if (gameScoreTally.scores[currentTurn].currentScore >= 100) {
        winMessageHolder.setAttribute("class", "green")
        winMessageHolder.innerText = "Player " + currentTurn + " wins!";
        displayGameButtons(false);
        displayScores()
      } else {
        changePlayerTurn();
      }
    } else if (gameMode === 1) {
      if (gameScoreTally.scores[currentTurn].currentScore >= 200) {
        winMessageHolder.setAttribute("class", "green")
        winMessageHolder.innerText = "Player " + currentTurn + " wins!";
        displayGameButtons(false);
        displayScores();
      } else {
        changePlayerTurn();
    }
  }
} else {
  if (gameMode === 0) {
    if (gameScoreTally.scores[currentTurn].currentScore >= 100) {
      if (currentTurn === 1) {
      winMessageHolder.setAttribute("class", "green")
      winMessageHolder.innerText = "Player wins!";
      displayGameButtons(false);
      displayScores()
      } else {
        winMessageHolder.setAttribute("class", "red")
        winMessageHolder.innerText = "AI wins!"
        displayGameButtons(false);
        displayScores()
      }
    } else {
      changePlayerTurn();
    }
  } else if (gameMode === 1) {
    if (gameScoreTally.scores[currentTurn].currentScore >= 200) {
      if (currentTurn === 1) {
      winMessageHolder.setAttribute("class", "green")
      winMessageHolder.innerText = "Player wins!";
      displayGameButtons(false);
      displayScores();
      } else {
        winMessageHolder.setAttribute("class", "red")
        winMessageHolder.innerText = "AI wins!"
        displayGameButtons(false);
        displayScores()
      }
    } else {
      changePlayerTurn();
  }
}
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
    if (gameMode === 0) {
      let diceRollTotal = rollDice(currentTurn);
      displayRolledNumber(diceRollTotal, 0);
      if (diceRollTotal === "nothing") {
        console.log("AI rolls: " + diceRollTotal);
        turnTotal = 0;
        holdDice();
      } else {
        console.log("AI rolls: " + diceRollTotal);
        turnTotal += diceRollTotal;
        diceRollTotal = rollDice(currentTurn)
        displayRolledNumber(diceRollTotal, 0);
        if (diceRollTotal === "nothing") {
          console.log("AI rolls: " + diceRollTotal);
          turnTotal = 0;
          holdDice();
        } else {
          console.log("AI rolls: " + diceRollTotal);
          turnTotal += diceRollTotal;
          holdDice();
        }
      }
    } else if (gameMode === 1) {
      let diceRollTotal = rollDice(currentTurn);
      let diceRollTotalB = rollDice(currentTurn);
      displayRolledNumber(diceRollTotal, diceRollTotalB);
      if (diceRollTotal === "nothing" && diceRollTotalB === "nothing") {
        console.log("AI rolls: " + diceRollTotal + " & " + diceRollTotalB);
        resetScore();
      } else if (diceRollTotal === "nothing" || diceRollTotalB === "nothing") {
        console.log("AI rolls: " + diceRollTotal + " & " + diceRollTotalB);
        turnTotal = 0;
        holdDice();
        return;
      } else {
        console.log("AI rolls: " + diceRollTotal + " & " + diceRollTotalB);
        turnTotal += diceRollTotal + diceRollTotalB;
        diceRollTotal = rollDice(currentTurn);
        diceRollTotalB = rollDice(currentTurn);
        displayRolledNumber(diceRollTotal, diceRollTotalB);
        if (diceRollTotal === "nothing" && diceRollTotalB === "nothing") {
          console.log("AI rolls: " + diceRollTotal + " & " + diceRollTotalB);
          resetScore();
        } else if (diceRollTotal === "nothing" || diceRollTotalB === "nothing") {
          console.log("AI rolls: " + diceRollTotal + " & " + diceRollTotalB);
          turnTotal = 0;
          holdDice();
          return;
        } else {
          console.log("AI rolls: " + diceRollTotal + " & " + diceRollTotalB);
          turnTotal += diceRollTotal + diceRollTotalB;
          holdDice();
        }
      }
    }
  }
  else {
    if (gameMode === 0) {
      let diceRollTotal = rollDice(currentTurn);
      displayRolledNumber(diceRollTotal, 0);
      for (diceRollTotal = 0; diceRollTotal < 16; diceRollTotal) {
        let currentRollTotal = rollDice(currentTurn);
        displayRolledNumber(currentRollTotal, 0);
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
    } else if (gameMode === 1) {
      for (combinedDiceTotal = 0; combinedDiceTotal < 23; combinedDiceTotal) {
        let currentRollTotalA = rollDice(currentTurn);
        let currentRollTotalB = rollDice(currentTurn);
        displayRolledNumber(currentRollTotalA, currentRollTotalB);
        if (currentRollTotalA === "nothing" && currentRollTotalB === "nothing") {
          console.log("AI rolls: " + currentRollTotalA + "&" + currentRollTotalB);
          resetScore();
          return;
        } else if (currentRollTotalA === "nothing" || currentRollTotalB === "nothing") {
          console.log("AI rolls: " + currentRollTotalA + " & " + currentRollTotalB);
          turnTotal = 0;
          holdDice();
          return;
        } else {
          combinedDiceTotal += currentRollTotalA + currentRollTotalB;
          turnTotal = combinedDiceTotal;
          console.log("AI rolls: " + currentRollTotalA + " & " + currentRollTotalB)
        }
      }
      holdDice();
    }
  }
}

function playerTurn() {
  event.preventDefault();
  let diceRollTotal = rollDice(currentTurn);
  if (gameMode === 0) {
    displayRolledNumber(diceRollTotal, 0);
    console.log("Human rolls: " + diceRollTotal);
    if (diceRollTotal === "nothing") {
      turnTotal = 0;
      holdDice();
      return
    }
    turnTotal += diceRollTotal;
    displayTurnTotal(turnTotal);
  } else if (gameMode === 1) {
    let diceRollTotalB = rollDice(currentTurn);
    displayRolledNumber(diceRollTotal, diceRollTotalB);
    console.log("Human rolls: " + diceRollTotal + " & " + diceRollTotalB)
    if (diceRollTotal === "nothing" && diceRollTotalB === "nothing") {
      resetScore();
    } else if (diceRollTotal === "nothing" || diceRollTotalB === "nothing") {
      turnTotal = 0;
      holdDice();
      return
    } else {
      turnTotal += diceRollTotal + diceRollTotalB;
      displayTurnTotal(turnTotal);
    }
  }
}

function resetScore() {
  gameScoreTally.scores[currentTurn].currentScore = 0;
  changePlayerTurn();
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

function displayRolledNumber(rolledNumberA, rolledNumberB) {
  let rolledNumberDisplay = document.getElementById("rolledNumberDisplay");
  rolledNumberDisplay.removeAttribute("class");
  if (gameMode === 0) {
    rolledNumberDisplay.innerText = "You rolled a " + rolledNumberA + ".";
    if (rolledNumberA === "nothing" && aiMode === 0) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "Player " + currentTurn + " rolled a 1, meaning they score nothing and it's the next player's turn.";
    } else if (rolledNumberA === "nothing" && aiMode != 0 && currentTurn === 1) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "You rolled a 1, meaning you score nothing and it's the AI player's turn.";
    } else if (rolledNumberA === "nothing" && aiMode != 0 && currentTurn === 2) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "AI rolled a 1, meaning it scored nothing and it's your turn.";
    }
  } else if (gameMode === 1) {
    rolledNumberDisplay.innerText = "You rolled a " + rolledNumberA + " with the first die and a " + rolledNumberB + " with the second.";

    // Player-only two dice messages
    if ((rolledNumberA === "nothing" && rolledNumberB === "nothing") && aiMode === 0) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "Player " + currentTurn + " rolled a 1 with both dice, meaning their score was reset to 0 and it's the next player's turn.";
    } else if ((rolledNumberA === "nothing" || rolledNumberB === "nothing") && aiMode === 0) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "Player " + currentTurn + " rolled a 1 with one of their dice, meaning they score nothing and it's the next player's turn.";
    }

    // AI two dice messages
    //// Player 1 (human) messages
    else if ((rolledNumberA === "nothing" && rolledNumberB === "nothing") && aiMode != 0 && currentTurn === 1) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "You rolled a 1 with both dice, meaning your score was reset to 0 and it's the AI player's turn.";
    } else if ((rolledNumberA === "nothing" || rolledNumberB === "nothing") && aiMode != 0 && currentTurn === 1) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "You rolled a 1 with one of your dice, meaning you score nothing and it's the AI player's turn.";
    }

    //// Player 2 (AI) messages
    else if ((rolledNumberA === "nothing" && rolledNumberB === "nothing") && aiMode != 0 && currentTurn === 2) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "AI rolled a 1 with both dice, meaning their score was reset to 0 and it's your turn.";
    } else if ((rolledNumberA === "nothing" || rolledNumberB === "nothing") && aiMode != 0 && currentTurn === 2) {
      rolledNumberDisplay.setAttribute("class", "red");
      rolledNumberDisplay.innerText = "AI rolled a 1 with one of their dice, meaning they score nothing and it's your turn.";
    }
  }
}

function hideRolledMessages() {
  let rolledNumberDisplay = document.getElementById("rolledNumberDisplay");
  rolledNumberDisplay.innerText = "";
}

function displayTurnTotal(turnTotal) {
  let turnTotalDisplay1 = document.getElementById("turnTotalDisplay1");
  let turnTotalDisplay2 = document.getElementById("turnTotalDisplay2");
  turnTotalDisplay1.innerHTML = "Your current total for this turn is " + turnTotal + ". Would you like to Roll Dice again, or Hold your current score?";
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
  let subTitle = document.getElementById("subTitle");
  subTitle.setAttribute("class", "hidden");
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

function mouseLocation() {
  let e = e || window.event;
}

function walkPig(event) {
  const pigWalker = document.getElementById("pigWalker");
  pigWalker.style.left = event.clientX + 'px';
}

function onMouseMove() {
  event.preventDefault();
  const pigWalker = document.getElementById("pigWalker");
  pigWalker.style.left = event.clientX + 'px';
}


window.addEventListener("load", function () {
  this.document.getElementById("playGame").addEventListener("click", changePlayerTurn);
  this.document.getElementById("playWithAi").addEventListener("click", setAiMode);
  this.document.getElementById("playWithHardAi").addEventListener("click", setAiMode);
  this.document.getElementById("hold").addEventListener("click", holdDice);
  this.document.getElementById("rollDice").addEventListener("click", playerTurn);
  this.document.addEventListener('mousemove', onMouseMove);
})