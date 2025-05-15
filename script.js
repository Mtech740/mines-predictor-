const gridSize = 5;
let currentInput = new Array(25).fill(0);

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = `tile-${i}`;
    grid.appendChild(tile);
  }
}

async function predictSafeTiles(board) {
  if (!window.model) {
    console.log("Model not loaded yet, loading now...");
    await loadModel();
  }
  console.log("Predicting safe tiles...");
  const inputTensor = tf.tensor2d([board]);
  const prediction = window.model.predict(inputTensor);
  const predictionArray = await prediction.array();
  console.log("Prediction:", predictionArray);
  return predictionArray[0];
}

async function loadModel() {
  try {
    console.log("Loading model and training...");
    const response = await fetch("https://mtech740.github.io/Mines-data-collector/data.json");
    const rawData = await response.json();
    console.log(`Data loaded with ${rawData.length} rounds`);

    const xs = rawData.map(entry => entry.board);
    const ys = rawData.map(entry =>
      entry.board.map(cell => (cell === 0 ? 1 : 0)) // Safe = 1, Mine = 0
    );

    window.model = tf.sequential();
    window.model.add(tf.layers.dense({ inputShape: [25], units: 64, activation: "relu" }));
    window.model.add(tf.layers.dense({ units: 25, activation: "sigmoid" }));

    window.model.compile({ optimizer: "adam", loss: "binaryCrossentropy", metrics: ["accuracy"] });

    await window.model.fit(tf.tensor2d(xs), tf.tensor2d(ys), {
      epochs: 20,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc || logs.accuracy}`);
        },
      },
    });

    console.log("Model trained and ready.");
  } catch (error) {
    console.error("Error loading or training model:", error);
  }
}

async function predictAndHighlight() {
  console.log("Predict button clicked");
  try {
    const prediction = await predictSafeTiles(currentInput);

    prediction.forEach((val, idx) => {
      const tile = document.getElementById(`tile-${idx}`);
      tile.classList.remove("safe");
      if (val > 0.5) tile.classList.add("safe");
    });
  } catch (error) {
    console.error("Prediction failed:", error);
  }
}

document.getElementById("predictBtn").addEventListener("click", predictAndHighlight);

window.onload = () => {
  createGrid();
  loadModel();
};
