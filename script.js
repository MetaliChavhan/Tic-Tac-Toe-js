const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]            // Diagonals
];

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;

function startGame() {
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
}

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = `It's a draw!`;
    running = false;
  } else {
    switchPlayer();
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
}

restartBtn.addEventListener("click", restartGame);

startGame();

