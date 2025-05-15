const grid = document.getElementById("grid");
grid.innerHTML = "";
for(let i=0; i<25; i++) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.textContent = i+1;
  grid.appendChild(tile);
}
