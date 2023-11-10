const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let zoom = 1;
let depth = 2;
let startX = 50;
let startY = 200;
let endX = 550;
let endY = 200;
let zooming = false;
let zoomStartX = 0;
let zoomStartY = 0;

function drawKochCurve(x1, y1, x2, y2, depth) {
  if (depth === 0) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  } else {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 3;

    const angle = Math.atan2(deltaY, deltaX);

    const p1x = x1 + (deltaX / 3);
    const p1y = y1 + (deltaY / 3);

    const p2x = p1x + Math.cos(angle - Math.PI / 3) * length;
    const p2y = p1y + Math.sin(angle - Math.PI / 3) * length;

    const p3x = p1x + Math.cos(angle - Math.PI / 3) * length;
    const p3y = p1y + Math.sin(angle - Math.PI / 3) * length;

    const p4x = x1 + (2 * deltaX / 3);
    const p4y = y1 + (2 * deltaY / 3);

    drawKochCurve(x1, y1, p1x, p1y, depth - 1);
    drawKochCurve(p1x, p1y, p2x, p2y, depth - 1);
    drawKochCurve(p2x, p2y, p3x, p3y, depth - 1);
    drawKochCurve(p3x, p3y, p4x, p4y, depth - 1);
    drawKochCurve(p4x, p4y, x2, y2, depth - 1);
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateDepth() {
  const depthInput = document.getElementById("depth");
  const newDepth = parseInt(depthInput.value);

  if (!isNaN(newDepth) && newDepth >= 0) {
    clearCanvas();
    depth = newDepth;
    drawKochCurve(startX, startY, endX, endY, depth);
  }
}

function resetView() {
  zoom = 1;
  depth = 2;
  startX = 50;
  startY = 200;
  endX = 550;
  clearCanvas();
  drawKochCurve(startX, startY, endX, endY, depth);
}

function handleMouseDown(event) {
    zooming = true;
    zoomStartX = event.clientX - canvas.getBoundingClientRect().left;
    zoomStartY = event.clientY - canvas.getBoundingClientRect().top;
}

function handleMouseUp(event) {
    if (zooming) {
        const zoomEndX = event.clientX - canvas.getBoundingClientRect().left;
        const zoomEndY = event.clientY - canvas.getBoundingClientRect().top;

        const rectWidth = zoomEndX - zoomStartX;
        const rectHeight = zoomEndY - zoomStartY;

        const centerX = (zoomStartX + zoomEndX) / 2;
        const centerY = (zoomStartY + zoomEndY) / 2;

        zoom *= canvas.width / rectWidth;

        startX = centerX - (centerX - startX) * zoom;
        endX = centerX + (endX - centerX) * zoom;
        startY = centerY - (centerY - startY) * zoom;

        clearCanvas();
        drawKochCurve(startX, startY, endX, endY, depth);

        zooming = false;
    }
}

function handleMouseMove(event) {
    if (zooming) {
        clearCanvas();
        drawKochCurve(startX, startY, endX, endY, depth);
        context.fillStyle = "rgba(0, 0, 0, 0.3)";
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;
        const rectWidth = x - zoomStartX;
        const rectHeight = y - zoomStartY;
        context.fillRect(zoomStartX, zoomStartY, rectWidth, rectHeight);
    }
}

document.getElementById("depth").addEventListener("input", updateDepth);
document.getElementById("resetView").addEventListener("click", resetView);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);

// Initial draw with default depth
resetView();
