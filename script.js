document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    grid.appendChild(tile);
  }
});

function predictSafeTiles() {
  const tiles = document.querySelectorAll('.tile');
  resetGrid();
  let predictedCount = 5;
  let selected = new Set();

  while (selected.size < predictedCount) {
    let index = Math.floor(Math.random() * tiles.length);
    if (!selected.has(index)) {
      selected.add(index);
      tiles[index].classList.add('predicted');
    }
  }
}

function resetGrid() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => tile.classList.remove('predicted'));
}
