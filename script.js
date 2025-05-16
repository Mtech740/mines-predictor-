let tiles = [];
let inputData = Array(25).fill(0);

function createGrid() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  tiles = [];

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.textContent = "";
    tile.addEventListener("click", () => toggleTile(i));
    board.appendChild(tile);
    tiles.push(tile);
  }
}

function toggleTile(index) {
  const tile = tiles[index];
  inputData[index] = inputData[index] === 0 ? 1 : 0;
  tile.textContent = inputData[index] === 1 ? "M" : "";
  tile.classList.toggle("mine");
}

function predictSafeTiles() {
  console.log("Model loaded\n⚙️ Running prediction...");
  // Fake prediction: just pick first 3 safe tiles (0s)
  const safeIndexes = inputData
    .map((val, idx) => (val === 0 ? idx : -1))
    .filter(idx => idx !== -1)
    .slice(0, 3);

  // Remove old safe markers
  tiles.forEach(tile => tile.classList.remove("safe"));

  // Highlight new safe tiles
  safeIndexes.forEach(index => {
    tiles[index].classList.add("safe");
  });
}

function resetBoard() {
  inputData = Array(25).fill(0);
  createGrid();
}

document.getElementById("predict").addEventListener("click", predictSafeTiles);
document.getElementById("reset").addEventListener("click", resetBoard);

createGrid();
