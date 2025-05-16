const gridSize = 5;
let model;

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;

    tile.addEventListener("click", () => {
      tile.classList.toggle("clicked");
      tile.textContent = tile.classList.contains("clicked") ? "S" : "";
    });

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
    const ys = rawData.map(entry =>
      entry.board.map(cell => (cell === 0 ? 1 : 0))
    );

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

async function predictAndHighlight() {
  if (!model) {
    console.log("Model not loaded yet. Please wait.");
    return;
  }

  const tiles = document.querySelectorAll(".tile");

  // Build input from current tile states
  const inputBoard = Array.from(tiles).map(tile =>
    tile.classList.contains("clicked") ? 0 : 0  // this is placeholder: we will improve later
  );

  const inputTensor = tf.tensor2d([inputBoard]);
  const prediction = model.predict(inputTensor);
  const predictionData = await prediction.data();

  prediction.dispose();
  inputTensor.dispose();

  tiles.forEach((tile, index) => {
    tile.classList.remove("safe");
    if (predictionData[index] > 0.5) {
      tile.classList.add("safe");
    }
  });

  console.log("Predictions:", predictionData);
}

window.onload = async () => {
  console.log("Page loaded, creating grid...");
  createGrid();

  console.log("Starting model training...");
  await loadModel();

  console.log("Model training complete.");
};

document.getElementById("predictBtn").addEventListener("click", predictAndHighlight);
