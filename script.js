const grid = document.getElementById("grid");

// Create 5x5 grid
for (let i = 0; i < 25; i++) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.id = `tile-${i}`;
  tile.textContent = i;
  grid.appendChild(tile);
}

document.getElementById("predictButton").addEventListener("click", async () => {
  console.log("Button clicked");
  const predictions = await predictSafeTiles();

  // Reset all tiles
  for (let i = 0; i < 25; i++) {
    document.getElementById(`tile-${i}`).style.backgroundColor = "#333";
  }

  // Highlight predicted safe tiles
  predictions.forEach(i => {
    document.getElementById(`tile-${i}`).style.backgroundColor = "green";
  });
});
