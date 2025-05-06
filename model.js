let model;

async function loadModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [25] }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  // Optional: Load pre-trained weights here if available
}

async function predictSafeTiles(boardData) {
  if (!model) await loadModel();

  const inputTensor = tf.tensor([boardData]);
  const prediction = model.predict(inputTensor);
  const predictionData = await prediction.data();
  return predictionData;
}
