const gameBoard = (() => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".statusText");
    const restartBtn = document.querySelector(".restartBtn");
    var options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = false;
  
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    
    return {cells, statusText, restartBtn, options, winConditions, currentPlayer, running}
})();


const gamePlay = (() => {

    function cellClicked() {
      const cellIndex = this.getAttribute("cellIndex");
  
      if (gameBoard.options[cellIndex] != "" || !gameBoard.running) {
        return;
      }
  
      updateCell(this, cellIndex);
      checkWinner();
    }
    function updateCell(cell, index) {
      gameBoard.options[index] = gameBoard.currentPlayer;
      cell.textContent = gameBoard.currentPlayer;
    }
    function changePlayer() {
      gameBoard.currentPlayer = gameBoard.currentPlayer == "X" ? "O" : "X";
      gameBoard.statusText.textContent = `${gameBoard.currentPlayer}'s turn`;
    }
    function checkWinner() {
      let roundWon = false;
      for (let i = 0; i < gameBoard.winConditions.length; i++) {
        const condition = gameBoard.winConditions[i];
        const cellA = gameBoard.options[condition[0]];
        const cellB = gameBoard.options[condition[1]];
        const cellC = gameBoard.options[condition[2]];
  
        if (cellA == "" || cellB == "" || cellC == "") {
          continue;
        }
  
        if (cellA == cellB && cellB == cellC) {
          roundWon = true;
          break;
        }
      }
      if (roundWon) {
        gameBoard.statusText.textContent = `${gameBoard.currentPlayer} wins!`;
        gameBoard.running = false;
      } else if (!gameBoard.options.includes("")) {
        gameBoard.statusText.textContent = "Draw!";
        gameBoard.running = false;
      } else {
        changePlayer();
      }
    }
    function restartGame() {
      gameBoard.currentPlayer = "X";
      gameBoard.options = ["", "", "", "", "", "", "", "", ""];
      gameBoard.statusText.textContent = `${gameBoard.currentPlayer}'s turn`;
      gameBoard.cells.forEach((cell) => (cell.textContent = ""));
      gameBoard.running = true;
    }
    return{cellClicked, restartGame}
  })();
  
  const startGame = (() => {
  function initializeGame() {
    gameBoard.cells.forEach((cell) => cell.addEventListener("click", gamePlay.cellClicked));
    gameBoard.restartBtn.addEventListener("click", gamePlay.restartGame);
    gameBoard.statusText.textContent = `${gameBoard.currentPlayer}'s turn`;
    gameBoard.running = true;
  }
  initializeGame();
})();