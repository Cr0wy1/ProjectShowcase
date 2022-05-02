import projectCanvasView from "./../views/projectCanvasView.js";
import Draw from "./draw.js";
import Point, { P } from "./point.js";
import ColorRGBA, { Color, RGBA } from "./color.js";

projectCanvasView.render({}, true);
projectCanvasView.AddSlider("Angle", 1, 90, 50).oninput = OnParamsUpdate;
projectCanvasView.AddSlider("Size", 1, 200, 120).oninput = OnParamsUpdate;
projectCanvasView.AddSlider("Shrink Percent", 50, 80, 80).oninput =
  OnParamsUpdate;
projectCanvasView.AddSlider("Thickness", 1, 20, 10).oninput = OnParamsUpdate;
projectCanvasView.OnParamsUpdate(OnParamsUpdate);
projectCanvasView.AddCanvasDownload("Fractal Tree");

const canvas = projectCanvasView.GetCanvas();
const draw = new Draw(canvas);
let width = 900;
let height = 600;
canvas.width = width;
canvas.height = height;
let startAngle = 25;
let length = 120;
let shrinkPercent = 0.8;
let baseThickness = 10;

function OnParamsUpdate() {
  const params = projectCanvasView.GetParams();
  startAngle = params.angle / 2;
  length = params.size;
  shrinkPercent = params.shrinkpercent / 100;
  baseThickness = params.thickness;
  Create();
}

function Create() {
  const startP = P(width / 2, height);

  draw.background(Color.white);
  draw.strokeColor(RGBA(54, 43, 15));
  draw.fillColor(RGBA(54, 43, 15));

  draw.ctx.shadowBlur = 15;
  draw.ctx.shadowColor = "rgba(0,0,0,0.8)";

  DrawBranch(startP, length, 0, baseThickness);
}

function DrawBranch(startP, len, angle, branchWidth) {
  draw.ctx.beginPath();
  draw.ctx.save();
  draw.ctx.lineWidth = branchWidth;
  draw.ctx.translate(startP.x, startP.y);
  draw.ctx.rotate((angle * Math.PI) / 180);
  draw.ctx.moveTo(0, 0);
  draw.ctx.lineTo(0, -len);
  draw.ctx.stroke();

  if (len < 10) {
    //leaves
    draw.fillColor(RGBA(20, 70, 30));
    draw.ctx.beginPath();
    draw.ctx.arc(0, -len, 20 * Math.random(), 0, Math.PI / 2);
    draw.ctx.fill();

    draw.ctx.restore();

    return;
  }

  DrawBranch(P(0, -len), len * shrinkPercent, -startAngle, branchWidth * 0.8);
  DrawBranch(P(0, -len), len * shrinkPercent, startAngle, branchWidth * 0.8);

  draw.ctx.restore();
}

Create();
