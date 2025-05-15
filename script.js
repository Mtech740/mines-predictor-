function createGrid() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = `tile-${i}`;
    board.appendChild(tile);
  }
}

async function predictSafeTiles() {
  if (!model) {
    alert("Model not loaded yet. Please wait...");
    return;
  }

  const input = new Array(25).fill(0); // empty board
  const inputTensor = tf.tensor2d([input]);
  const prediction = model.predict(inputTensor);
  const values = await prediction.data();

  values.forEach((val, index) => {
    const tile = document.getElementById(`tile-${index}`);
    if (val > 0.5) tile.classList.add("safe");
  });
}

document.getElementById("predictBtn").addEventListener("click", predictSafeTiles);

window.onload = async () => {
  createGrid();
  await loadModel();
};
