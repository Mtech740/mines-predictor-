document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const predictBtn = document.getElementById("predictBtn");
  const minesInput = document.getElementById("mines");
  const strategyInfo = document.getElementById("strategyInfo");
  let tiles = [];

  // Create 5x5 grid
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    grid.appendChild(tile);
    tiles.push(tile);
  }

  // Fetch strategies
  let strategies = [];
  fetch("strategies.json")
    .then(res => res.json())
    .then(data => {
      strategies = data;
    });

  // Clear grid highlights
  function resetGrid() {
    tiles.forEach(tile => {
      tile.classList.remove("safe", "mine");
      tile.innerHTML = "";
    });
    strategyInfo.innerText = "";
  }

  // Apply a strategy
  function applyStrategy(pattern) {
    resetGrid();
    pattern.forEach(cell => {
      const index = convertToIndex(cell);
      if (index !== null) {
        tiles[index].classList.add("safe");
        tiles[index].innerHTML = "🪙";
      }
    });
  }

  // Convert grid coordinate like "B2" to tile index
  function convertToIndex(coord) {
    const letters = ["A", "B", "C", "D", "E"];
    const x = letters.indexOf(coord[0].toUpperCase());
    const y = parseInt(coord[1]) - 1;
    if (x === -1 || isNaN(y)) return null;
    return y * 5 + x;
  }

  // Predict button click
  predictBtn.addEventListener("click", () => {
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];
    applyStrategy(strategy.pattern);
    strategyInfo.innerText = `Strategy: ${strategy.name} - ${strategy.description}`;
  });
});
