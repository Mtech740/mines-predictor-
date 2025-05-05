// script.js
let model;

async function loadModel() {
    model = await tf.sequential({
        layers: [
            tf.layers.dense({ inputShape: [25], units: 64, activation: 'relu' }),
            tf.layers.dense({ units: 64, activation: 'relu' }),
            tf.layers.dense({ units: 25, activation: 'sigmoid' }) // 25 tiles
        ]
    });

    model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

    // Random weights for now — you can later train and load real weights
    console.log("Model initialized.");
}

function predictSafeTiles() {
    if (!model) {
        alert("Model is not loaded yet.");
        return;
    }

    const input = tf.tensor2d([Array(25).fill(0)]); // No historical input for now
    const prediction = model.predict(input).arraySync()[0];

    const threshold = 0.5;
    const predictedTiles = prediction.map((val, index) => ({
        index,
        isSafe: val > threshold
    }));

    highlightTiles(predictedTiles);
}

function highlightTiles(predictions) {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        const pred = predictions.find(p => p.index === index);
        if (pred && pred.isSafe) {
            tile.classList.add('safe');
        } else {
            tile.classList.remove('safe');
        }
    });
}

function createGrid() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.innerText = i + 1;
        board.appendChild(tile);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadModel();
    createGrid();
    document.getElementById('predictButton').addEventListener('click', predictSafeTiles);
});
