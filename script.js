const gridSize = 5;
let tiles = [];

function createGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  tiles = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = '?';
    grid.appendChild(tile);
    tiles.push(tile);
  }
}

function predictSafeTiles() {
  resetGrid();
  const safeTiles = new Set();
  while (safeTiles.size < 22) {
    safeTiles.add(Math.floor(Math.random() * 25));
  }
  tiles.forEach((tile, i) => {
    if (safeTiles.has(i)) {
      tile.classList.add('safe');
      tile.textContent = '✔';
    } else {
      tile.classList.add('mine');
      tile.textContent = '✖';
    }
  });
}

function resetGrid() {
  tiles.forEach(tile => {
    tile.className = 'tile';
    tile.textContent = '?';
  });
}

// Create grid on page load
createGrid();
