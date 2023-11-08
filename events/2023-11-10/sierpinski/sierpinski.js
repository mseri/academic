const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let zoom = 1;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let size = 200;
let depth = 2;

let zooming = false;
let zoomStartX = 0;
let zoomStartY = 0;

function drawSierpinski(x, y, s, d) {
  if (d === 0) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + s, y);
    context.lineTo(x + s / 2, y - (s * Math.sqrt(3)) / 2);
    context.closePath();
    context.fillStyle = "green";
    context.fill();
  } else {
    const s2 = s / 2;
    drawSierpinski(x, y, s2, d - 1);
    drawSierpinski(x + s2, y, s2, d - 1);
    drawSierpinski(x + s2 / 2, y - (s2 * Math.sqrt(3)) / 2, s2, d - 1);
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateDepth() {
  const depthInput = document.getElementById("depth");
  const newDepth = parseInt(depthInput.value);

  if (!isNaN(newDepth) && newDepth >= 0) {
    depth = newDepth;
    clearCanvas();
    drawSierpinski(centerX - size / 2, centerY, size, depth);
  }
}

function resetView() {
  zoom = 1;
  depth = 2;
  centerX = canvas.width / 2;
  centerY = 2 * canvas.height / 3;
  size = 200;
  clearCanvas();
  drawSierpinski(centerX - size / 2, centerY, size, depth);
}


document.getElementById("updateDepth").addEventListener("click", updateDepth);
document.getElementById("resetView").addEventListener("click", resetView);

// Initial draw
resetView();

