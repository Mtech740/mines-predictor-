let gridSize = 5;
let prediction = [];
let actualClicks = 0;
let correctClicks = 0;

function createGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.onclick = () => handleClick(tile, i);
    grid.appendChild(tile);
  }
}

function handleClick(tile, index) {
  actualClicks++;
  if (prediction.includes(index)) {
    tile.classList.add('safe');
    correctClicks++;
  } else {
    tile.classList.add('mine');
  }
  updateAccuracy();
}

function updateAccuracy() {
  const accuracy = actualClicks === 0 ? 0 : Math.round((correctClicks / actualClicks) * 100);
  document.getElementById('accuracy').innerText = `${accuracy}%`;
}

function predictTiles() {
  fetch('strategies.json')
    .then(res => res.json())
    .then(data => {
      const tiles = Array.from({ length: 25 }, (_, i) => i);
      prediction = tiles.sort(() => Math.random() - 0.5).slice(0, data.safeTilesCount || 6);
      highlightPredictedTiles();
    });
}

function highlightPredictedTiles() {
  const grid = document.getElementById('grid').children;
  for (let i = 0; i < 25; i++) {
    grid[i].classList.remove('safe', 'mine');
    if (prediction.includes(i)) {
      grid[i].classList.add('safe');
    }
  }
}

function restart() {
  prediction = [];
  actualClicks = 0;
  correctClicks = 0;
  document.getElementById('accuracy').innerText = '0%';
  createGrid();
}
window.onload = createGrid;
