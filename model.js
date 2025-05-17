async function loadData() {
  const response = await fetch('https://raw.githubusercontent.com/Mtech740/Mines-data-collector/main/data.json');
  const data = await response.json();

  const inputs = data.map(entry => entry.board.map(v => v === 0 ? 0 : 1));
  const labels = data.map(entry => entry.board.map(v => v === 0 ? 1 : 0));

  return { inputs, labels };
}

async function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [25], units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  return model;
}

async function trainModel(model, inputs, labels) {
  const xs = tf.tensor2d(inputs);
  const ys = tf.tensor2d(labels);
  await model.fit(xs, ys, {
    epochs: 20,
    batchSize: 16,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc?.toFixed(4)}`);
      }
    }
  });
}

async function predictSafeTiles(inputBoard) {
  if (!window.model) {
    console.log("Model not loaded yet. Please wait...");
    return Array(25).fill(0);
  }

  const input = tf.tensor2d([inputBoard]);
  const output = window.model.predict(input);
  const prediction = await output.array();
  return prediction[0];
}

(async () => {
  const { inputs, labels } = await loadData();
  window.model = await createModel();
  await trainModel(window.model, inputs, labels);
  console.log("Model loaded and trained.");
})();
