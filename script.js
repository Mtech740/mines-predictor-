document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");

  // Create a 5x5 grid
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = i;
    grid.appendChild(tile);
  }

  document.getElementById("predictBtn").addEventListener("click", async () => {
    const predictions = await predict();
    updateTiles(predictions);
  });
});

function updateTiles(predictions) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.classList.remove("safe");
    if (predictions[index] > 0.5) {
      tile.classList.add("safe");
    }
  });
}
