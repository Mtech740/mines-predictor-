const gridElement = document.getElementById('grid');
const predictButton = document.getElementById('predictButton');
const accuracyDisplay = document.getElementById('accuracyDisplay');

let model;

async function createModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [25], units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
}

function createGrid() {
  gridElement.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    gridElement.appendChild(tile);
  }
}

function getDummyInput() {
  return Array(25).fill(0).map(() => Math.random());
}

function updateGridWithPrediction(prediction) {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile, index) => {
    tile.classList.remove('safe', 'mine');
    if (prediction[index] > 0.5) {
      tile.classList.add('safe');
    } else {
      tile.classList.add('mine');
    }
  });
}

predictButton.addEventListener('click', async () => {
  const input = tf.tensor([getDummyInput()]);
  const output = model.predict(input);
  const prediction = Array.from(await output.data());
  updateGridWithPrediction(prediction);

  // Optional: Display dummy accuracy
  const accuracy = (prediction.filter(p => p > 0.5).length / 25) * 100;
  accuracyDisplay.textContent = `Prediction Confidence: ${accuracy.toFixed(2)}%`;
});

createModel().then(() => {
  createGrid();
});
