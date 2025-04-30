// script.js const gridElement = document.getElementById('grid'); const message = document.getElementById('message'); const gridSize = 5; const totalMines = 3; let minePositions = [];

function generateGrid() { gridElement.innerHTML = ''; minePositions = generateMines();

for (let i = 0; i < gridSize * gridSize; i++) { const tile = document.createElement('div'); tile.classList.add('tile'); tile.dataset.index = i;

tile.addEventListener('click', () => {
  if (minePositions.includes(i)) {
    tile.classList.add('mine');
    message.textContent = 'Boom! That was a mine!';
  } else {
    tile.classList.add('safe');
    message.textContent = 'Safe! Keep going...';
  }
});

gridElement.appendChild(tile);

} }

function generateMines() { const positions = new Set(); while (positions.size < totalMines) { const randomIndex = Math.floor(Math.random() * gridSize * gridSize); positions.add(randomIndex); } return Array.from(positions); }

function resetGame() { message.textContent = 'Click a tile to begin!'; generateGrid(); }

// Smart Predictor Mode (for fun) function highlightSafeTiles() { const allTiles = document.querySelectorAll('.tile'); for (let i = 0; i < allTiles.length; i++) { if (!minePositions.includes(i)) { allTiles[i].style.border = '2px solid lime'; } } }

generateGrid(); highlightSafeTiles();

