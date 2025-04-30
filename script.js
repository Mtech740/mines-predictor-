document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('mineGrid');
  const predictButton = document.getElementById('predictButton');

  // Generate 25 tiles
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
  }

  predictButton.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('predicted-safe'));

    const safeTilesCount = 22;
    const selectedIndexes = new Set();

    while (selectedIndexes.size < safeTilesCount) {
      const index = Math.floor(Math.random() * tiles.length);
      selectedIndexes.add(index);
    }

    selectedIndexes.forEach(index => {
      tiles[index].classList.add('predicted-safe');
    });
  });
});
