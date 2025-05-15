const gridSize = 5;
let model;

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    grid.appendChild(tile);
  }
}

async function loadModel() {
  try {
    console.log("Loading training data...");
    const response = await fetch("https://mtech740.github.io/Mines-data-collector/data.json");
    const rawData = await response.json();
    console.log(`Data loaded: ${rawData.length} rounds`);

    const xs = rawData.map(entry => entry.board);
    const ys = rawData.map(entry => {
      return entry.board.map(cell => (cell === 0 ? 1 : 0));
    });

    const inputTensor = tf.tensor2d(xs);
    const labelTensor = tf.tensor2d(ys);

    model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [25], units: 64, activation: "relu" }));
    model.add(tf.layers.dense({ units: 25, activation: "sigmoid" }));
    model.compile({ loss: "binaryCrossentropy", optimizer: "adam", metrics: ["accuracy"] });

    console.log("Training model...");
    await model.fit(inputTensor, labelTensor, {
      epochs: 10,
      batchSize: 16,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss=${logs.loss.toFixed(4)}, accuracy=${(logs.acc * 100).toFixed(2)}%`);
        },
      },
    });

    console.log("Model trained and ready.");
  } catch (error) {
    console.error("Error loading or training model:", error);
  }
}

function predictAndHighlight() {
  if (!model) {
    console.log("Model not loaded yet. Please wait.");
    return;
  }

  const dummyInput = tf.tensor2d([Array(25).fill(0)]);
  const prediction = model.predict(dummyInput).dataSync();
  console.log("Predictions:", prediction);

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.classList.remove("safe");
    if (prediction[index] > 0.5) {
      tile.classList.add("safe");
    }
  });
}

window.onload = async () => {
  console.log("Page loaded, creating grid...");
  createGrid();

  console.log("Starting model training...");
  await loadModel();

  console.log("Model training complete.");
};

document.getElementById("predictBtn").addEventListener("click", predictAndHighlight);
