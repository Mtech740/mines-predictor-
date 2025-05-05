let model;

async function loadModel() {
  model = await tf.loadLayersModel('model/model.json');
  console.log("Model loaded successfully.");
}

async function predictSafeTiles() {
  if (!model) {
    console.warn("Model not loaded yet.");
    return [];
  }

  // Dummy input: adjust this for real game state if needed
  const input = tf.tensor2d([Array(25).fill(0)], [1, 25]);

  const prediction = model.predict(input);
  const predictionData = await prediction.data();

  // Select top 3 predicted safe tiles
  const indexed = predictionData.map((val, idx) => ({ idx, val }));
  indexed.sort((a, b) => b.val - a.val);

  return indexed.slice(0, 3).map(item => item.idx);
}

loadModel();
