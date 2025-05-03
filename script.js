const grid = document.getElementById('grid');
const predictBtn = document.getElementById('predictBtn');
const MINES_COUNT = 3;
let minePositions = [];

function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('data-index', i);
    grid.appendChild(tile);
  }
}

function placeMines() {
  minePositions = [];
  while (minePositions.length < MINES_COUNT) {
    const pos = Math.floor(Math.random() * 25);
    if (!minePositions.includes(pos)) {
      minePositions.push(pos);
    }
  }
}

function predictSafeTiles() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => tile.classList.remove('safe', 'mine'));
  
  for (let i = 0; i < 25; i++) {
    const tile = tiles[i];
    if (minePositions.includes(i)) {
      tile.classList.add('mine');
      tile.innerHTML = '💣';
    } else {
      tile.classList.add('safe');
      tile.innerHTML = '🪙';
    }
  }
}

// Setup
createGrid();
placeMines();

predictBtn.addEventListener('click', () => {
  predictSafeTiles();
});
