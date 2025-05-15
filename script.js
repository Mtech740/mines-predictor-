async function predictAndHighlight() {
  if (!model) {
    console.log("Model not loaded yet. Please wait.");
    return;
  }

  console.log("Predict button clicked");
  const dummyInput = tf.tensor2d([Array(25).fill(0)]);
  const prediction = await model.predict(dummyInput).data();
  console.log("Predictions:", prediction);

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.classList.remove("safe");
    if (prediction[index] > 0.5) {
      tile.classList.add("safe");
    }
  });
}
