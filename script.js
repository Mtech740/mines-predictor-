function predictTile() {
  const safeTiles = [];
  const totalTiles = 25;
  const mines = 3;
  
  while (safeTiles.length < (totalTiles - mines)) {
    const tile = Math.floor(Math.random() * totalTiles) + 1;
    if (!safeTiles.includes(tile)) {
      safeTiles.push(tile);
    }
  }
  
  const prediction = safeTiles[Math.floor(Math.random() * safeTiles.length)];
  document.getElementById('prediction').innerText = "Safe Tile: " + prediction;
}
