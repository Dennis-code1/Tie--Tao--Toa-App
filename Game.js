const cells = document.querySelectorAll(".cell");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showResult(`Player ${currentPlayer} Wins! 🎉`);
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    showResult("It's a Draw 🤝");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  return winningCombinations.some((combo) => {
    return combo.every((index) => board[index] === currentPlayer);
  });
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.classList.remove("hidden");
}

newGameBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  resultScreen.classList.add("hidden");
});
