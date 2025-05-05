let model;

async function predict() {
  if (!model) {
    model = await tf.loadLayersModel("model.json");
  }

  // Replace with actual input if available
  const dummyInput = tf.tensor2d([Array(25).fill(0)]);
  const output = model.predict(dummyInput);
  const data = await output.data();
  return Array.from(data);
}
