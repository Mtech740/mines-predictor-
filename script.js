let grid = document.getElementById("grid");
let tiles = [];

for (let i = 0; i < 25; i++) {
  let tile = document.createElement("div");
  tile.classList.add("tile");
  tile.dataset.index = i;
  grid.appendChild(tile);
  tiles.push(tile);
}

async function predictSafeTiles() {
  const response = await fetch("strategies.json");
  const strategies = await response.json();

  // Clear old classes
  tiles.forEach(tile => {
    tile.classList.remove("safe", "unsafe");
  });

  // Count safety
  let counts = Array(25).fill(0);
  for (let strategy of strategies) {
    for (let safeIndex of strategy.safeTiles) {
      counts[safeIndex]++;
    }
  }

  // Find threshold
  let maxCount = Math.max(...counts);
  for (let i = 0; i < 25; i++) {
    if (counts[i] >= maxCount * 0.7) {
      tiles[i].classList.add("safe");
    } else {
      tiles[i].classList.add("unsafe");
    }
  }
}
