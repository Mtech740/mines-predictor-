import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.18.0/dist/tf.min.js';

let model;

async function loadTrainingData() {
  const response = await fetch('data.json');
  const rawData = await response.json();

  const inputs = rawData.map(d => d.board.map(v => v === 1 ? 1 : 0));
  const labels = rawData.map(d => d.board.map(v => v === 1 ? 0 : 1)); // 1 = safe

  return {
    xs: tf.tensor2d(inputs),
    ys: tf.tensor2d(labels)
  };
}

async function trainModel() {
  const { xs, ys } = await loadTrainingData();

  model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [25], units: 128, activation: 'relu' }));
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 25, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 16,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss.toFixed(4)} | Accuracy = ${(logs.acc * 100).toFixed(2)}%`);
      }
    }
  });

  console.log('Training complete.');
}

export async function predictSafeTiles(board) {
  if (!model) await trainModel();

  const input = tf.tensor2d([board], [1, 25]);
  const prediction = model.predict(input);
  const result = await prediction.data();

  return Array.from(result);
          }
