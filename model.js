// A simple mock model for demo purposes (normally you'd load a real trained model)
async function predictSafeTiles() {
  // Simulate prediction: pick 3 random tiles
  const safeIndices = [];
  while (safeIndices.length < 3) {
    const r = Math.floor(Math.random() * 25);
    if (!safeIndices.includes(r)) {
      safeIndices.push(r);
    }
  }
  return safeIndices;
}
