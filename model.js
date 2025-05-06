let model;

async function loadModel() {
  model = await tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [25], units: 64, activation: 'relu' }),
      tf.layers.dense({ units: 25, activation: 'sigmoid' })
    ]
  });

  // For now, simulate prediction accuracy by initializing random weights
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

  // Fake training step to initialize weights
  const xTrain = tf.randomUniform([10, 25]);
  const yTrain = tf.randomUniform([10, 25]);
  await model.fit(xTrain, yTrain, { epochs: 1 });
}

async function predictSafeTiles(gridData) {
  if (!model) await loadModel();

  const input = tf.tensor2d([gridData]);
  const prediction = model.predict(input);
  const output = await prediction.data();

  // Return indexes with highest values (safe tile suggestions)
  return Array.from(output)
    .map((value, index) => ({ index, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // top 5 suggestions
    .map(item => item.index);
}
