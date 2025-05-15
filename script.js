const gridSize = 5;
let selectedTiles = [];

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  selectedTiles = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = i;
    grid.appendChild(tile);
    selectedTiles.push(0);
  }
}

async function predictAndHighlight() {
  const predictions = await predictSafeTiles(selectedTiles);
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach((tile, idx) => {
    tile.classList.remove("safe");
    if (predictions[idx] > 0.5) {
      tile.classList.add("safe");
    }
  });
}

document.getElementById("predictBtn").addEventListener("click", predictAndHighlight);

window.onload = createGrid;
