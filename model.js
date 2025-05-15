let model;

async function loadModel() {
  const response = await fetch("data.json");
  const rawData = await response.json();

  const xs = [];
  const ys = [];

  rawData.forEach(entry => {
    xs.push(entry.board);
    const label = new Array(25).fill(0);
    entry.board.forEach((cell, index) => {
      if (cell === 1) label[index] = 1;
    });
    ys.push(label);
  });

  const inputTensor = tf.tensor2d(xs);
  const labelTensor = tf.tensor2d(ys);

  model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, inputShape: [25], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  await model.fit(inputTensor, labelTensor, {
    epochs: 15,
    batchSize: 16,
  });

  console.log("Model trained.");
}
