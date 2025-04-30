const grid = document.getElementById("grid");

// Create grid tiles
for (let i = 0; i < 25; i++) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.textContent = "?";
  grid.appendChild(tile);
}

// Predict safe tiles
function predict() {
  reset(); // Clear old states

  const tiles = Array.from(document.getElementsByClassName("tile"));
  const safeIndices = getRandomIndices(3); // Pick 3 safe tiles
  tiles.forEach((tile, index) => {
    if (safeIndices.includes(index)) {
      tile.classList.add("safe");
      tile.textContent = "💰";
    } else if (Math.random() < 0.2) {
      tile.classList.add("mine");
      tile.textContent = "💣";
    }
  });
}

// Reset the grid
function reset() {
  const tiles = document.getElementsByClassName("tile");
  Array.from(tiles).forEach(tile => {
    tile.className = "tile";
    tile.textContent = "?";
  });
}

// Utility to pick random indices
function getRandomIndices(count) {
  const indices = [];
  while (indices.length < count) {
    const rand = Math.floor(Math.random() * 25);
    if (!indices.includes(rand)) {
      indices.push(rand);
    }
  }
  return indices;
}
