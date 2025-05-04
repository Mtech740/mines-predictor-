const gridSize = 5;
const mineCount = 3;
let accuracyHistory = [];

const grid = document.getElementById('grid');
const accuracyEl = document.getElementById('accuracy');
const resultEl = document.getElementById('result');

function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.index = i;
    grid.appendChild(tile);
  }
}

function getStrategies() {
  return fetch('strategies.json')
    .then(res => res.json())
    .then(data => data);
}

function predictSafeTiles(strategies) {
  const tileScores = Array(gridSize * gridSize).fill(0);

  strategies.forEach(set => {
    set.safeTiles.forEach(i => {
      tileScores[i]++;
    });
  });

  const predictions = [];
  for (let i = 0; i < tileScores.length; i++) {
    predictions.push({ index: i, score: tileScores[i] });
  }

  predictions.sort((a, b) => b.score - a.score);
  return predictions.slice(0, gridSize * gridSize - mineCount).map(t => t.index);
}

function highlightPredictions(indices) {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.classList.remove('safe', 'mine');
    const index = parseInt(tile.dataset.index);
    if (indices.includes(index)) {
      tile.classList.add('safe');
      tile.innerHTML = '🪙';
    } else {
      tile.classList.add('mine');
      tile.innerHTML = '💣';
    }
  });
}

function updateAccuracy(predicted, actualSafe) {
  const correct = predicted.filter(index => actualSafe.includes(index)).length;
  const accuracy = Math.round((correct / predicted.length) * 100);
  accuracyHistory.push(accuracy);
  const average = Math.round(accuracyHistory.reduce((a, b) => a + b, 0) / accuracyHistory.length);
  accuracyEl.textContent = `Prediction Accuracy: ${average}%`;
}

document.getElementById('predict').addEventListener('click', async () => {
  const strategies = await getStrategies();
  const predicted = predictSafeTiles(strategies);
  const actual = strategies[Math.floor(Math.random() * strategies.length)].safeTiles;
  highlightPredictions(predicted);
  updateAccuracy(predicted, actual);
  resultEl.textContent = `Prediction made using ${strategies.length} strategy samples.`;
});

document.getElementById('restart').addEventListener('click', () => {
  createGrid();
  resultEl.textContent = '';
});

createGrid();
