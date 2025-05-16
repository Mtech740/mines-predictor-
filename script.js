let board = Array(25).fill(null);
let modelLoaded = false;
let model;

// Create a debug log display
function log(message) {
  const logBox = document.getElementById('logBox');
  if (logBox) {
    const entry = document.createElement('div');
    entry.textContent = message;
    logBox.appendChild(entry);
  }
}

async function loadModel() {
  try {
    if (!modelLoaded) {
      const module = await import('./model.js');
      model = module;
      modelLoaded = true;
      log('✅ Model loaded');
    }
  } catch (err) {
    log('❌ Failed to load model: ' + err.message);
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
  document.getElementById('accuracy').textContent = '';
  document.getElementById('logBox').innerHTML = '';
}

async function predict() {
  await loadModel();

  if (!model || !model.predictSafeTiles) {
    log("❌ Model not ready.");
    return;
  }

  const inputBoard = board.map(v => (v === null ? 0 : v));
  log("⚙️ Running prediction...");
  try {
    const predictions = await model.predictSafeTiles(inputBoard);
    log("✅ Predictions received.");

    let correct = 0;
    let total = 0;

    predictions.forEach((p, i) => {
      const tile = document.querySelector(`[data-index="${i}"]`);
      if (tile && board[i] === null) {
        total++;
        if (p > 0.7) {
          tile.classList.add('safe');
          tile.textContent = 'S';
          board[i] = 0;
          correct++;
        } else if (p < 0.3) {
          tile.classList.add('mine');
          tile.textContent = 'M';
          board[i] = 1;
        } else {
          tile.classList.add('unknown');
        }
      }
    });

    document.getElementById('accuracy').textContent = `Correct predictions: ${correct} / ${total}`;
    log(`✅ Prediction complete: ${correct} correct out of ${total}`);
  } catch (err) {
    log("❌ Prediction failed: " + err.message);
  }
}

document.getElementById('predictBtn').addEventListener('click', predict);
document.getElementById('resetBtn').addEventListener('click', createBoard);

createBoard();
