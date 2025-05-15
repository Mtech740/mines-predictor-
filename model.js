let model;

async function loadData() {
  const res = await fetch("data.json");
  const raw = await res.json();

  const inputs = raw.map(entry => entry.board);
  const labels = raw.map(entry =>
    entry.board.map(cell => (cell === 1 ? 0 : 1)) // Treat safe tiles as 1 (target)
  );

  return {
    x: tf.tensor2d(inputs),
    y: tf.tensor2d(labels)
  };
}

async function trainModel() {
  const { x, y } = await loadData();

  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [25], units: 64, activation: "relu" }));
  model.add(tf.layers.dense({ units: 25, activation: "sigmoid" }));
  model.compile({ optimizer: "adam", loss: "binaryCrossentropy", metrics: ["accuracy"] });

  await model.fit(x, y, {
    epochs: 50,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(`Epoch ${epoch + 1} - Accuracy: ${(logs.acc * 100).toFixed(2)}%`)
    }
  });

  console.log("Training complete.");
}

async function predictSafeTiles(board) {
  if (!model) await trainModel();
  const prediction = model.predict(tf.tensor2d([board]));
  return (await prediction.array())[0];
}
