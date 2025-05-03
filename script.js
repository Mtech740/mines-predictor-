const grid = document.getElementById("grid");
const minesInput = document.getElementById("mines");
const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

let tiles = [];
let mineCount = 3;

function createGrid() {
  grid.innerHTML = "";
  tiles = [];

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    grid.appendChild(tile);
    tiles.push(tile);
  }
}

function resetGrid() {
  tiles.forEach(tile => {
    tile.classList.remove("safe", "mine");
    tile.innerHTML = "";
  });
}

function getSafeTiles(count) {
  const allIndices = Array.from({ length: 25 }, (_, i) => i);
  const mineIndices = [];

  while (mineIndices.length < count) {
    const rand = Math.floor(Math.random() * allIndices.length);
    mineIndices.push(...allIndices.splice(rand, 1));
  }

  const safeTiles = allIndices;
  return { safeTiles, mineIndices };
}

function predictSafeTiles() {
  resetGrid();
  mineCount = parseInt(minesInput.value) || 3;
  const { safeTiles, mineIndices } = getSafeTiles(mineCount);

  safeTiles.forEach(i => {
    tiles[i].classList.add("safe");
    tiles[i].innerHTML = "💰";
  });

  mineIndices.forEach(i => {
    tiles[i].classList.add("mine");
    tiles[i].innerHTML = "💣";
  });
}

// Event Listeners
predictBtn.addEventListener("click", predictSafeTiles);
resetBtn.addEventListener("click", resetGrid);

createGrid();
