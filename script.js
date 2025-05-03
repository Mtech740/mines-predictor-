const gridSize = 5;
const mineCount = 3;
let tiles = [];
let mines = [];
let predictedSafe = [];
let gameActive = true;

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  tiles = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.addEventListener("click", () => handleTileClick(i));
    grid.appendChild(tile);
    tiles.push(tile);
  }
}

function placeMines() {
  mines = [];
  while (mines.length < mineCount) {
    const index = Math.floor(Math.random() * gridSize * gridSize);
    if (!mines.includes(index)) {
      mines.push(index);
    }
  }
}

function predictSafeTiles() {
  predictedSafe = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    if (!mines.includes(i)) {
      predictedSafe.push(i);
    }
  }
  highlightPrediction();
}

function highlightPrediction() {
  tiles.forEach((tile, i) => {
    tile.classList.remove("safe", "mine");
    if (predictedSafe.includes(i)) {
      tile.classList.add("safe");
      tile.textContent = "🪙";
    }
  });
}

function handleTileClick(index) {
  if (!gameActive) return;

  if (mines.includes(index)) {
    tiles[index].classList.add("mine");
    tiles[index].textContent = "💣";
    gameActive = false;
    alert("Oops! You hit a mine.");
  } else {
    tiles[index].classList.add("safe");
    tiles[index].textContent = "🪙";
  }
}

function restartGame() {
  gameActive = true;
  createGrid();
  placeMines();
  predictSafeTiles();
}

window.onload = () => {
  createGrid();
  placeMines();
  predictSafeTiles();
};
