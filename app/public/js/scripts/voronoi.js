import Draw from "./draw.js";
import Point, { P } from "./point.js";
import ColorRGBA, { Color, RGBA } from "./color.js";
import VoronoiView from "./../views/voronoiView.js";
import voronoiView from "./../views/voronoiView.js";

let width = 700;
let height = 700;
let amount = 10;
let motionSpeed = 2;
let bbox = { xl: 0, xr: width, yt: 0, yb: height }; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
let points = [];
let velocitys = [];
let colors = [];

VoronoiView.render({}, true);
VoronoiView.RegisterEvents();
VoronoiView.OnParamsUpdate(OnParamsUpdate);
VoronoiView.OnReset(Reset);
VoronoiView.OnMotionToggle(ToggleMotion);

const projectContainer = document.querySelector(".voronoiCanvas");
const main = document.querySelector("main");

//Create Canvas
var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
projectContainer.insertAdjacentElement("afterbegin", canvas);

//Canvas Mouse Events
canvas.addEventListener("click", function (e) {
  let clickPos = P(e.clientX, e.clientY).add(
    P(-canvas.getBoundingClientRect().x, -canvas.getBoundingClientRect().y)
  );
  AddPoint(clickPos);
  Reload();
});

canvas.addEventListener("mousemove", function (e) {
  let movePos = P(e.clientX, e.clientY).add(
    P(-canvas.getBoundingClientRect().x, -canvas.getBoundingClientRect().y)
  );

  points[0].x = movePos.x;
  points[0].y = movePos.y;
  Reload();
});

const voronoiCore = new Voronoi();
let diagram;
const draw = new Draw(canvas);
draw.background(Color.white);

function OnParamsUpdate() {
  Reload();
}

function Reload() {
  draw.background(Color.white);
  compute();

  const params = VoronoiView.GetVoronoiParams();
  if (params.bColoredAreas) {
    DrawColoredCells();
  }

  if (params.bEdges) {
    DrawEdges();
  }

  if (params.bCenterPoints) {
    DrawPoints();
  }

  if (params.amount !== amount) {
    amount = params.amount;
    Reset();
  }
}

function Reset() {
  createPoints();
  Reload();
}

function CreateVoronoi() {
  compute();

  draw.fillColor(RGBA(255, 0, 0));
  draw.circle(points[0], 10, true);
  let targetCell = diagram.cells[points[0].voronoiId];
  let halfEdges = targetCell.halfedges;
  draw.strokeColor(RGBA(0, 255, 0));

  let v = halfEdges[0].getStartpoint();
  draw.ctx.beginPath();
  draw.ctx.moveTo(v.x, v.y);
  for (let i = 0; i < halfEdges.length; i++) {
    let v = halfEdges[i].getEndpoint();
    draw.ctx.lineTo(v.x, v.y);
    // draw.line(
    //   P(targetEdge.va.x, targetEdge.va.y),
    //   P(targetEdge.vb.x, targetEdge.vb.y)
    // );
  }

  draw.ctx.fillStyle = "#faa";
  draw.ctx.fill();
}

function createPoints() {
  points = [];
  for (let i = 0; i < amount; i++) {
    let p = P(1, 2).random(canvas.width, canvas.height);
    points.push(p);
    velocitys.push({
      x: (Math.random() - 0.5) * motionSpeed,
      y: (Math.random() - 0.5) * motionSpeed
    });
    colors.push(RGBA().random());
  }
}

function compute() {
  diagram = voronoiCore.compute(points, bbox);
}

function DrawColoredCells() {
  for (let p = 0; p < points.length; p++) {
    let targetCell = diagram.cells[points[p].voronoiId];
    let halfEdges = targetCell.halfedges;

    let v = halfEdges[0].getStartpoint();
    draw.ctx.beginPath();
    draw.ctx.moveTo(v.x, v.y);
    for (let i = 0; i < halfEdges.length; i++) {
      let v = halfEdges[i].getEndpoint();
      draw.ctx.lineTo(v.x, v.y);
      // draw.line(
      //   P(targetEdge.va.x, targetEdge.va.y),
      //   P(targetEdge.vb.x, targetEdge.vb.y)
      // );
    }

    draw.fillColor(colors[p]);
    draw.ctx.fill();
  }
}

function DrawPoints() {
  draw.strokeColor(RGBA(0, 0, 0));
  draw.fillColor(RGBA(0, 0, 0));
  draw.ctx.beginPath();

  for (let i = 0; i < points.length; i++) {
    draw.ctx.moveTo(points[i].x, points[i].y);
    draw.ctx.rect(points[i].x, points[i].y, 4, 4);
  }
  draw.ctx.fill();
}

function DrawEdges() {
  draw.strokeColor(RGBA(0, 0, 0));
  draw.fillColor(RGBA(0, 0, 0));
  draw.strokeWidth(1);

  draw.ctx.beginPath();

  let nEdges = diagram.edges.length;
  let edges = diagram.edges;
  for (let i = 0; i < nEdges; i++) {
    draw.ctx.moveTo(edges[i].va.x, edges[i].va.y);
    draw.ctx.lineTo(edges[i].vb.x, edges[i].vb.y);
  }
  draw.ctx.stroke();
}

function AddPoint(point) {
  points.push(point);
  velocitys.push({
    x: (Math.random() - 0.5) * motionSpeed,
    y: (Math.random() - 0.5) * motionSpeed
  });
  colors.push(RGBA().random());
}

let motionInterval = null;
let changeInterval = null;

function ToggleMotion() {
  if (motionInterval) {
    clearInterval(motionInterval);
    clearInterval(changeInterval);
    motionInterval = null;
    changeInterval = null;
  } else {
    motionInterval = setInterval(Motion, 30);
    changeInterval = setInterval(ChangeVelocitys, 1000);
  }
}

function Motion() {
  for (let i = 0; i < points.length; i++) {
    let newX = points[i].x + velocitys[i].x;
    let newY = points[i].y + velocitys[i].y;
    if (newX <= 0 || newX >= width || newY <= 0 || newY >= height) {
      velocitys[i].x = (Math.random() - 0.5) * motionSpeed;
      velocitys[i].y = (Math.random() - 0.5) * motionSpeed;
    } else {
      points[i].x = newX;
      points[i].y = newY;
    }
  }
  Reload();
}

function ChangeVelocitys() {
  let changeAmount = Math.floor(amount * 0.25);

  for (let i = 0; i < changeAmount; i++) {
    let randIndex = Math.floor(Math.random() * velocitys.length);
    velocitys[randIndex].x = (Math.random() - 0.5) * motionSpeed;
    velocitys[randIndex].y = (Math.random() - 0.5) * motionSpeed;
  }
}

Reset();

console.log("Voronoi active", projectContainer);
