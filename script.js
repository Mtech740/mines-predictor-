function generatePrediction() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  const safeTiles = new Set();
  while (safeTiles.size < 22) {
    safeTiles.add(Math.floor(Math.random() * 25));
  }

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (safeTiles.has(i)) {
      tile.classList.add('safe');
    }
    grid.appendChild(tile);
  }
}
