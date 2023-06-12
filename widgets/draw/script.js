const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeDisplay = document.getElementById("size");
const colorChoice = document.getElementById("color");
const clearBtn = document.getElementById("clear");

let size = 10;
let x = undefined;
let y = undefined;
let color = "black";
let isPressed = false;

sizeDisplay.innerText = size;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

increaseBtn.addEventListener("click", () => {
  size >= 350 ? (size = 350) : size++;
  sizeDisplay.innerText = size;
});
decreaseBtn.addEventListener("click", () => {
  size <= 0 ? (size = 0) : size--;
  sizeDisplay.innerText = size;
});

colorChoice.addEventListener("change", (e) => {
  color = e.target.value;
  console.log(color);
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// Save
