async function predictAndHighlight() {
  if (!model) {
    console.log("Model not loaded yet. Please wait.");
    return;
  }

  console.log("Predict button clicked");

  const dummyInput = tf.tensor2d([Array(25).fill(0)]);
  const prediction = model.predict(dummyInput);
  const predictionData = await prediction.data();

  // Clean up tensor memory
  prediction.dispose();
  dummyInput.dispose();

  console.log("Predictions:", predictionData);

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.classList.remove("safe");
    if (predictionData[index] > 0.5) {
      tile.classList.add("safe");
    }
  });
}
