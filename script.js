document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const predictBtn = document.getElementById("predictBtn");
  const minesCount = 3;
  const gridSize = 25;
  let predictedTiles = [];

  // Create the 5x5 grid
  for (let i = 0; i < gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.innerHTML = `<span class="coin">?</span>`;
    grid.appendChild(tile);
  }

  // Reset prediction visuals
  function resetGrid() {
    document.querySelectorAll(".tile").forEach(tile => {
      tile.classList.remove("safe", "mine");
      tile.querySelector(".coin").textContent = "?";
    });
  }

  // Simulate prediction logic
  function predictSafeTiles() {
    resetGrid();
    predictedTiles = [];

    while (predictedTiles.length < gridSize - minesCount) {
      const randIndex = Math.floor(Math.random() * gridSize);
      if (!predictedTiles.includes(randIndex)) {
        predictedTiles.push(randIndex);
      }
    }

    // Display predicted safe tiles
    document.querySelectorAll(".tile").forEach(tile => {
      const index = parseInt(tile.dataset.index);
      if (predictedTiles.includes(index)) {
        tile.classList.add("safe");
        tile.querySelector(".coin").textContent = "🪙";
      } else {
        tile.classList.add("mine");
        tile.querySelector(".coin").textContent = "💣";
      }
    });
  }

  predictBtn.addEventListener("click", predictSafeTiles);
});
