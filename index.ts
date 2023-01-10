import './style.css';

const appDiv: HTMLElement = document.getElementById('app');
const canvas = document.createElement('canvas');

appDiv.append(canvas);

const ctx = canvas.getContext('2d');

canvas.width = appDiv.offsetWidth;
canvas.height = appDiv.offsetHeight;

ctx.strokeRect(0, 0, 100, 100);

let pan = false;
let startX, startY;
let setX = 0,
  setY = 0;
canvas.addEventListener('mousedown', (event) => {
  pan = true;
  startX = event.offsetX;
  startY = event.offsetY;
});
canvas.addEventListener('mouseup', (move) => {
  if (!pan) {
    return;
  }
  pan = false;
  setX = setX + move.offsetX - startX;
  setY = setY + move.offsetY - startY;
});
canvas.addEventListener('mouseleave', (move) => {
  if (!pan) {
    return;
  }
  pan = false;
  setX = setX + move.offsetX - startX;
  setY = setY + move.offsetY - startY;
});

canvas.addEventListener('mousemove', (move) => {
  if (!pan) {
    return;
  }
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(setX + (move.offsetX - startX), setY + (move.offsetY - startY));
  ctx.strokeRect(0, 0, 100, 100);
});
