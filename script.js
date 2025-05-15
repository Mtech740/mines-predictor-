async function loadModel() {
  try {
    console.log("Loading training data...");
    const response = await fetch("https://mtech740.github.io/Mines-data-collector/data.json");
    const rawData = await response.json();
    console.log(`Data loaded: ${rawData.length} rounds`);

    // ... rest of your model setup and training code ...

    console.log("Training started...");
    await window.model.fit(tf.tensor2d(xs), tf.tensor2d(ys), {
      epochs: 20,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss=${logs.loss.toFixed(4)}, accuracy=${logs.acc || logs.accuracy}`);
        }
      }
    });

    console.log("Model trained and ready.");
  } catch (error) {
    console.error("Error loading or training model:", error);
  }
}
