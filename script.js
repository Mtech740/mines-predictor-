let tiles = [];
let inputData = [];

function createGrid() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  tiles = [];

  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = "";
    tile.dataset.index = i;
    tile.addEventListener("click", () => toggleTile(i));
    board.appendChild(tile);
    tiles.push(tile);
    inputData.push(0);
  }
}

function toggleTile(index) {
  const tile = tiles[index];
  if (tile.classList.contains("mine")) {
    tile.classList.remove("mine");
    tile.textContent = "";
    inputData[index] = 0;
  } else {
    tile.classList.add("mine");
    tile.textContent = "M";
    inputData[index] = 1;
  }
}

function predictSafeTiles() {
  const result = [];
  for (let i = 0; i < 25; i++) {
    if (inputData[i] === 0) {
      result.push(i);
    }
  }

  for (const tile of tiles) tile.classList.remove("safe");

  result.slice(0, 3).forEach(index => {
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
