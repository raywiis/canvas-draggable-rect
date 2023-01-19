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
  ctx.scale(scale, scale);
  ctx.translate(setX, setY);
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
  setX = setX + (move.offsetX - startX) * (1 / scale);
  setY = setY + (move.offsetY - startY) * (1 / scale);
});

canvas.addEventListener('mousemove', (move) => {
  if (!pan) {
    return;
  }

  setX += (move.offsetX - startX) * (1 / scale);
  setY += (move.offsetY - startY) * (1 / scale);
  startX = move.offsetX;
  startY = move.offsetY;
  draw();
});

canvas.addEventListener('wheel', (event) => {
  const delta = event.deltaY * 0.001;

  const prescale = scale;
  const prescaleX = event.offsetX;
  const prescaleY = event.offsetY;

  scale -= delta;

  const scaleCoff = scale / prescale;
  const scaleX = prescaleX * scaleCoff;
  const scaleY = prescaleY * scaleCoff;
  const dx = prescaleX - scaleX;
  const dy = prescaleY - scaleY;

  // setX /= scaleCoff;
  setX += dx;

  console.log({ prescaleX, prescaleY, dx });

  // console.log(x);
  // setY += dy;
  draw();
});
