async function predictAndHighlight() {
  if (!model) {
    console.log("Model not loaded yet. Please wait.");
    return;
  }

  const tiles = document.querySelectorAll(".tile");

  const inputBoard = Array.from(tiles).map(tile =>
    tile.classList.contains("clicked") ? 0 : -1
  );

  const inputTensor = tf.tensor2d([inputBoard]);
  const prediction = model.predict(inputTensor);
  const predictionData = await prediction.data();

  prediction.dispose();
  inputTensor.dispose();

  let correctCount = 0;
  let totalPredictable = 0;

  tiles.forEach((tile, index) => {
    tile.classList.remove("safe", "mine");

    const wasClicked = tile.classList.contains("clicked");
    const predictedSafe = predictionData[index] > 0.5;
    const predictedMine = predictionData[index] < 0.2;

    if (!wasClicked) {
      totalPredictable++;
      if (predictedSafe) {
        tile.classList.add("safe");
      } else if (predictedMine) {
        tile.classList.add("mine");
      }
    }

    // Accuracy tracker (assume clicked = safe = correct)
    if (wasClicked && predictedSafe) {
      correctCount++;
    }
  });

  console.log("Predictions:", predictionData);
  alert(`Correct predictions: ${correctCount} out of ${totalPredictable} unknowns`);
}
