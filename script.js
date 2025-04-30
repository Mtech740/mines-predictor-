const grid = document.getElementById('grid');

function predictSafeTiles() {
  let safeTiles = new Set();
  while (safeTiles.size < 22) {
    safeTiles.add(Math.floor(Math.random() * 25));
  }
  return safeTiles;
}

const safeTiles = predictSafeTiles();

for (let i = 0; i < 25; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.innerText = '?';

  tile.addEventListener('click', () => {
    if (safeTiles.has(i)) {
      tile.classList.add('safe');
      tile.innerText = '✓';
    } else {
      tile.classList.add('mine');
      tile.innerText = 'X';
    }
  });

  grid.appendChild(tile);
}
