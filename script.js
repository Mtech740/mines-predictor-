let model;
const gridSize = 5;
const numMines = 3;
const grid = [];
const board = document.getElementById('board');
const predictButton = document.getElementById('predict-button');
const statusText = document.getElementById('status');

function createGrid() {
    board.innerHTML = '';
    grid.length = 0;
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.row = i;
            tile.dataset.col = j;
            tile.onclick = () => toggleTile(i, j, tile);
            board.appendChild(tile);
            row.push({ selected: false, element: tile });
        }
        grid.push(row);
    }
}

function toggleTile(row, col, tile) {
    const cell = grid[row][col];
    cell.selected = !cell.selected;
    tile.classList.toggle('selected', cell.selected);
}

function getInputGrid() {
    return grid.flat().map(cell => (cell.selected ? 1 : 0));
}

async function loadModel() {
    try {
        model = await tf.loadLayersModel('model.json');
        console.log('Model loaded');
        statusText.textContent = 'Model loaded and ready.';
    } catch (err) {
        console.error('Failed to load model:', err);
        statusText.textContent = 'Error loading model.';
    }
}

async function predict() {
    if (!model) {
        statusText.textContent = 'Model not loaded yet.';
        return;
    }

    const inputGrid = getInputGrid();
    const inputTensor = tf.tensor([inputGrid]);

    const prediction = model.predict(inputTensor);
    const predictionData = await prediction.data();
    prediction.dispose();

    showPredictedTiles(predictionData);
}

function showPredictedTiles(predictions) {
    predictions.forEach((value, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const tile = grid[row][col].element;

        if (value >= 0.7) {
            tile.classList.add('safe');
        } else {
            tile.classList.remove('safe');
        }
    });

    statusText.textContent = 'Prediction updated.';
}

predictButton.addEventListener('click', predict);

window.onload = () => {
    createGrid();
    loadModel();
};
