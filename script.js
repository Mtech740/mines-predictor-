const gridSize = 5;
const mineCount = 3;
let gameTiles = [];

function setupGame() {
  const gameDiv = document.getElementById('game');
  gameDiv.innerHTML = '';
  gameTiles = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.index = i;
    gameTiles.push(tile);
    gameDiv.appendChild(tile);
  }
}

function predictSafeTiles() {
  fetch('strategies.json')
    .then(res => res.json())
    .then(data => {
      const safeIndexes = data.safeIndexes || [];

      gameTiles.forEach((tile, i) => {
        tile.classList.remove('safe', 'mine');
        if (safeIndexes.includes(i)) {
          tile.classList.add('safe');
        } else {
          tile.classList.add('mine');
        }
      });
    })
    .catch(err => console.error("Error loading prediction data:", err));
}

setupGame();
