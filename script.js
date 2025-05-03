let gameTiles = document.querySelectorAll('.tile');
let mineCount = 3;
let isPredicting = false;

// Load strategy data
let strategyData = [];

fetch('strategies.json')
  .then(response => response.json())
  .then(data => {
    strategyData = data;
    console.log("Strategy data loaded:", strategyData);
  })
  .catch(error => {
    console.error("Failed to load strategy data:", error);
  });

// Generate random mines (for demo)
function generateMines() {
  let mines = new Set();
  while (mines.size < mineCount) {
    mines.add(Math.floor(Math.random() * 25));
  }
  return Array.from(mines);
}

// Apply prediction logic using strategy
function predictSafeTiles() {
  if (!strategyData.length) {
    alert("Prediction data not loaded yet.");
    return;
  }

  // Count tile appearances in good strategies
  let tileScore = new Array(25).fill(0);

  strategyData.forEach(entry => {
    entry.safe_tiles.forEach(index => {
      tileScore[index]++;
    });
  });

  // Sort safest tiles
  let sorted = tileScore
    .map((score, index) => ({ index, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 22); // Leave 3 for mines

  highlightPredictions(sorted.map(t => t.index));
}

function highlightPredictions(indices) {
  gameTiles.forEach((tile, i) => {
    tile.classList.remove('safe', 'mine');
    if (indices.includes(i)) {
      tile.classList.add('safe');
    } else {
      tile.classList.add('mine');
    }
  });
}

// Handle Predict Button
document.getElementById('predictBtn').addEventListener('click', () => {
  if (isPredicting) return;
  isPredicting = true;
  predictSafeTiles();
  isPredicting = false;
});
