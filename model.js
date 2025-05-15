let model;

async function loadModel() {
  const response = await fetch("https://mtech740.github.io/Mines-data-collector/data.json");
  const rawData = await response.json();

  const xs = rawData.map(entry => entry.board);
  const ys = rawData.map(entry =>
    entry.board.map(cell => cell === 0 ? 1 : 0)  // Safe = 1, Mine = 0
  );

  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [25], units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  await model.fit(tf.tensor2d(xs), tf.tensor2d(ys), {
    epochs: 20,
    shuffle: true
  });

  console.log("Model trained and ready.");
}
