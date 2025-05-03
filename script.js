const grid = document.getElementById("grid");
const mineCountSelect = document.getElementById("mineCount");
const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

let tiles = [];

function createGrid() {
  grid.innerHTML = "";
  tiles = [];
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    grid.appendChild(tile);
    tiles.push(tile);
  }
}

function predictSafeTiles() {
  const mineCount = parseInt(mineCountSelect.value);
  const mineIndices = new Set();

  // Randomly select mine positions
  while (mineIndices.size < mineCount) {
    mineIndices.add(Math.floor(Math.random() * 25));
  }

  tiles.forEach((tile, index) => {
    tile.classList.remove("safe", "mine");
    if (mineIndices.has(index)) {
      tile.classList.add("mine");
      tile.innerHTML = "💣";
    } else {
      tile.classList.add("safe");
      tile.innerHTML = "🪙";
    }
  });
}

function resetGrid() {
  tiles.forEach(tile => {
    tile.classList.remove("safe", "mine");
    tile.innerHTML = "";
  });
}

predictBtn.addEventListener("click", predictSafeTiles);
resetBtn.addEventListener("click", resetGrid);

// Create initial grid
createGrid();
