document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("grid");
  const predictBtn = document.getElementById("predictBtn");
  const resultDiv = document.getElementById("predictionResult");

  // Create a 5x5 grid
  const gridSize = 5;
  let tiles = [];

  function createGrid() {
    gridContainer.innerHTML = "";
    tiles = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.index = i;
      tile.addEventListener("click", () => {
        tile.classList.toggle("selected");
      });
      gridContainer.appendChild(tile);
      tiles.push(tile);
    }
  }

  function getGridData() {
    return tiles.map(tile => tile.classList.contains("selected") ? 1 : 0);
  }

  function highlightPredictions(indices) {
    tiles.forEach((tile, index) => {
      tile.classList.remove("safe");
      if (indices.includes(index)) {
        tile.classList.add("safe");
      }
    });

    resultDiv.textContent = `Suggested safe tiles: ${indices.map(i => i + 1).join(", ")}`;
  }

  predictBtn.addEventListener("click", async () => {
    const gridData = getGridData();
    const predictedIndices = await predictSafeTiles(gridData);
    highlightPredictions(predictedIndices);
  });

  createGrid();
});
