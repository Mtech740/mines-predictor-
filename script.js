let board = Array(25).fill(null);
let modelLoaded = false;
let model;

// Load the model dynamically
async function loadModel() {
  if (!modelLoaded) {
    const module = await import('./model.js');
    model = module;
    modelLoaded = true;
  }
}

function createBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board = Array(25).fill(null);

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = '';
    tile.dataset.index = i;

    tile.addEventListener('click', () => {
      if (tile.classList.contains('safe')) {
        tile.classList.remove('safe');
        tile.classList.add('mine');
        tile.textContent = 'M';
        board[i] = 1;
      } else if (tile.classList.contains('mine')) {
        tile.classList.remove('mine');
        tile.textContent = '';
        board[i] = null;
      } else {
        tile.classList.add('safe');
        tile.textContent = 'S';
        board[i] = 0;
      }
    });

    boardDiv.appendChild(tile);
  }
}

async function predict() {
  await loadModel();

  if (!model || !model.predictSafeTiles) {
    alert("Model not loaded yet. Please wait.");
    return;
  }

  const filledTiles = board.map(v => (v === null ? 0 : v));
  const predictions = await model.predictSafeTiles(filledTiles);

  let correct = 0;
  let totalPredictions = 0;

  predictions.forEach((p, i) => {
    const tile = document.querySelector(`[data-index="${i}"]`);
    if (tile && board[i] === null) {
      if (p > 0.7) {
        tile.classList.add('safe');
        tile.textContent = 'S';
        board[i] = 0;
        correct++;
        totalPredictions++;
      } else if (p < 0.3) {
        tile.classList.add('mine');
        tile.textContent = 'M';
        board[i] = 1;
        totalPredictions++;
      } else {
        tile.classList.add('unknown');
      }
    }
  });

  const accuracyDisplay = document.getElementById('accuracy');
  if (accuracyDisplay) {
    accuracyDisplay.textContent = `Correct predictions: ${correct} / ${totalPredictions}`;
  }
}

document.getElementById('predictBtn').addEventListener('click', predict);
document.getElementById('resetBtn').addEventListener('click', createBoard);

// Initial board setup
createBoard();
