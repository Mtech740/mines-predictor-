const gridSize = 5;
let currentInput = new Array(25).fill(0);

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = `tile-${i}`;
    grid.appendChild(tile);
  }
}

async function predictSafeTiles(board) {
  if (!model) await loadModel();
  const inputTensor = tf.tensor2d([board]);
  const prediction = model.predict(inputTensor);
  return (await prediction.array())[0];
}

async function predictAndHighlight() {
  const prediction = await predictSafeTiles(currentInput);

  prediction.forEach((val, idx) => {
    const tile = document.getElementById(`tile-${idx}`);
    tile.classList.remove("safe");
    if (val > 0.5) tile.classList.add("safe");
  });
}

document.getElementById("predictBtn").addEventListener("click", predictAndHighlight);

window.onload = () => {
  createGrid();
  loadModel();
};
