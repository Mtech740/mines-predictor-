function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;

    // User can mark the tile as safe (S) or suspected mine (M)
    tile.addEventListener("click", () => {
      tile.classList.toggle("clicked");

      if (tile.classList.contains("clicked")) {
        tile.textContent = "S";  // You can later support M for mine
      } else {
        tile.textContent = "";
      }
    });

    grid.appendChild(tile);
  }
}
