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

    tile.addEventListener("click", () => {
      tile.classList.toggle("selected");
      selectedTiles[i] = tile.classList.contains("selected") ? 1 : 0;
    });

    grid.appendChild(tile);
    selectedTiles.push(0);
  }
}

async function predictAndHighlight() {
  if (typeof predictSafeTiles !== "function") {
    alert("Model not loaded or training function missing!");
    return;
  }

  const predictions = await predictSafeTiles(selectedTiles);
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach((tile, idx) => {
    if (predictions[idx] > 0.5) {
      tile.classList.add("safe");
    } else {
      tile.classList.remove("safe");
    }
  });
}

document.getElementById("predictBtn").addEventListener("click", predictAndHighlight);

window.onload = createGrid;
