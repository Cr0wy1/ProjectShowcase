import projectCanvasView from "./../views/projectCanvasView.js";
import Draw from "./draw.js";
import Point, { P } from "./point.js";
import ColorRGBA, { Color, RGBA } from "./color.js";

let MAX_ITERATION = 20;

projectCanvasView.render({}, true);
projectCanvasView.OnParamsUpdate(OnParamsUpdate);
projectCanvasView.AddSlider("Iterations", 2, 20, 10);
projectCanvasView
  .AddButton("Iteration Steps")
  .addEventListener("click", IterationsSteps);
projectCanvasView.AddCanvasDownload("Mandelbrot");

const canvas = projectCanvasView.GetCanvas();
const draw = new Draw(canvas);
let width = 900;
let height = 600;
canvas.width = width;
canvas.height = height;

function OnParamsUpdate() {
  MAX_ITERATION = projectCanvasView.GetParams().iterations;
  console.log(projectCanvasView.GetParams());

  Create();
}

function mandelbrot(c) {
  let z = { x: 0, y: 0 },
    n = 0,
    p,
    d;
  do {
    p = {
      x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
      y: 2 * z.x * z.y
    };
    z = {
      x: p.x + c.x,
      y: p.y + c.y
    };
    d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
    n += 1;
  } while (d <= 2 && n < MAX_ITERATION);
  return [n, d <= 2];
}

const REAL_SET = { start: -2, end: 1 };
const IMAGINARY_SET = { start: -1, end: 1 };

const colors = new Array(16)
  .fill(0)
  .map((_, i) =>
    i === 0 ? "#000" : `#${(((1 << 24) * Math.random()) | 0).toString(16)}`
  );

let bIsFinished = false;

function Create() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let complex = {
        x: REAL_SET.start + (x / width) * (REAL_SET.end - REAL_SET.start),
        y:
          IMAGINARY_SET.start +
          (y / height) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
      };

      const [m, isMandelbrotSet] = mandelbrot(complex);
      draw.ctx.fillStyle =
        colors[isMandelbrotSet ? 0 : (m % colors.length) - 1 + 1];
      draw.ctx.fillRect(x, y, 1, 1);
    }
  }
  bIsFinished = true;
}

function IterationsSteps() {
  MAX_ITERATION = 2;
  Create();
  const interval = setInterval(() => {
    console.log("Hello");

    if (bIsFinished) {
      bIsFinished = false;
      MAX_ITERATION += 1;
      if (MAX_ITERATION > 25) {
        clearInterval(interval);
      }
      Create();
    }
  }, 100);
}

Create();
