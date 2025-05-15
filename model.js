let model;

async function loadData() {
  const response = await fetch('https://mtech740.github.io/Mines-data-collector/data.json');
  const raw = await response.json();
  const inputs = raw.map(entry => entry.input);
  const labels = raw.map(entry => entry.output);
  return { inputs, labels };
}

async function trainModel(inputs, labels) {
  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [25], units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  const xs = tf.tensor2d(inputs);
  const ys = tf.tensor2d(labels);
  await model.fit(xs, ys, { epochs: 20 });
}

async function predictSafeTiles(input) {
  if (!model) {
    const data = await loadData();
    await trainModel(data.inputs, data.labels);
  }

  const inputTensor = tf.tensor2d([input]);
  const prediction = model.predict(inputTensor);
  const result = prediction.arraySync()[0];
  return result;
}
