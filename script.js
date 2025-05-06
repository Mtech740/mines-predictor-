const gridSize = 5;
let selectedTiles = [];

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.addEventListener("click", () => {
      tile.classList.toggle("selected");
      selectedTiles[i] = tile.classList.contains("selected") ? 1 : 0;
    });
    grid.appendChild(tile);
    selectedTiles[i] = 0;
  }
}

async function handlePrediction() {
  const predictions = await predictSafeTiles(selectedTiles);
  const tiles = document.querySelectorAll(".tile");

  predictions.forEach((p, i) => {
    if (p > 0.5) {
      tiles[i].classList.add("safe");
    } else {
      tiles[i].classList.remove("safe");
    }
  });

  // Accuracy Display (for simulation only)
  const accuracy = (predictions.filter(p => p > 0.5).length / 25) * 100;
  document.getElementById("accuracyDisplay").innerText = `Prediction Confidence: ${accuracy.toFixed(1)}%`;
}

document.getElementById("predictBtn").addEventListener("click", handlePrediction);
window.onload = createGrid;
