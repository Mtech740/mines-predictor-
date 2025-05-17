async function loadData() {
  const response = await fetch('https://raw.githubusercontent.com/Mtech740/Mines-data-collector/main/data.json');
  const data = await response.json();

  // Shuffle data to avoid learning fixed order
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  const inputs = data.map(entry => entry.board.map(v => v === 1 ? 1 : 0));  // input: 1 = mine, 0 = safe
  const labels = data.map(entry => entry.board.map(v => v === 1 ? 0 : 1));  // target: 1 = safe tile

  return { inputs, labels };
}

async function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [25], units: 128, activation: 'relu' }));
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

async function trainModel(model, inputs, labels) {
  const xs = tf.tensor2d(inputs);
  const ys = tf.tensor2d(labels);

  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 16,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, acc = ${(logs.acc * 100).toFixed(2)}%`);
      }
    }
  });
}

async function predictSafeTiles(board) {
  if (!window.model) {
    console.log("Model not loaded yet. Please wait...");
    return Array(25).fill(0);
  }

  const input = tf.tensor2d([board], [1, 25]);
  const output = window.model.predict(input);
  const result = await output.data();

  return Array.from(result);
}

(async () => {
  const { inputs, labels } = await loadData();
  window.model = await createModel();
  await trainModel(window.model, inputs, labels);
  console.log("Model loaded and trained.");
})();
