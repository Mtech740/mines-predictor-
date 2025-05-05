const grid = document.getElementById("grid");
const predictButton = document.getElementById("predict-button");
const accuracyDisplay = document.getElementById("accuracy");
let accuracyHistory = [];
let predictionsMade = 0;
let correctPredictions = 0;

// Create 5x5 grid
for (let i = 0; i < 25; i++) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.index = i;
  tile.onclick = () => {
    if (tile.classList.contains("predicted")) {
      tile.classList.add("correct");
      correctPredictions++;
    } else {
      tile.classList.add("mine");
    }
    predictionsMade++;
    updateAccuracy();
  };
  grid.appendChild(tile);
}

// Simulated strategy data
const strategyData = {
  "safePatterns": [
    [0, 6, 12], [1, 7, 13], [2, 8, 14], [3, 9, 15],
    [4, 10, 16], [5, 11, 17], [6, 12, 18], [7, 13, 19]
  ]
};

function predictSafeTiles() {
  clearTiles();
  const prediction = strategyData.safePatterns[Math.floor(Math.random() * strategyData.safePatterns.length)];
  prediction.forEach(index => {
    const tile = grid.children[index];
    tile.classList.add("predicted");
  });
}

function clearTiles() {
  for (let i = 0; i < 25; i++) {
    grid.children[i].className = "tile";
  }
}

function updateAccuracy() {
  const currentAccuracy = (correctPredictions / predictionsMade) * 100;
  accuracyHistory.push(currentAccuracy);

  // Keep only last 10 records
  if (accuracyHistory.length > 10) accuracyHistory.shift();

  const average = accuracyHistory.reduce((a, b) => a + b, 0) / accuracyHistory.length;
  accuracyDisplay.innerText = `Accuracy (last 10): ${average.toFixed(1)}%`;
}

predictButton.onclick = predictSafeTiles;
