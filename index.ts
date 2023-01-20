import './style.css';

const appDiv: HTMLElement = document.getElementById('app');
const canvas = document.createElement('canvas');

appDiv.append(canvas);

const ctx = canvas.getContext('2d');

canvas.width = appDiv.offsetWidth;
canvas.height = appDiv.offsetHeight;

let pan = false;
let startX, startY;
let setX = 0,
  setY = 0;
let scale = 1;
canvas.addEventListener('mousedown', (event) => {
  pan = true;
  startX = event.offsetX;
  startY = event.offsetY;
});

const draw = () => {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.transform(scale, 0, 0, scale, setX, setY);
  ctx.strokeRect(100, 100, 200, 200);
  ctx.strokeRect(0, 0, 400, 400);
};

draw();

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
  setX = setX + (move.offsetX - startX);
  setY = setY + (move.offsetY - startY);
});

canvas.addEventListener('mousemove', (move) => {
  if (!pan) {
    return;
  }

  setX += move.offsetX - startX;
  setY += move.offsetY - startY;
  startX = move.offsetX;
  startY = move.offsetY;
  draw();
});

canvas.addEventListener('wheel', (event) => {
  const delta = event.deltaY * 0.001;

  const s = (scale - delta) / scale;
  const cx = event.clientX;
  const cy = event.clientY;
  const lx = -setX;
  const ly = -setY;
  setX = -((cx + lx) * s - cx);
  setY = -((cy + ly) * s - cy);

  scale -= delta;

  draw();
});
