import projectCanvasView from "../views/projectCanvasView.js";
import Draw from "./draw.js";
import Point, { P } from "./point.js";
import ColorRGBA, { Color, RGBA } from "./color.js";

let width = 700;
let height = 700;
const cellAmount = 30;
const cellXSize = Math.floor(width / cellAmount);
const cellYSize = Math.floor(height / cellAmount);
width += cellXSize * 2;
height += cellYSize * 2;

class GridCell {
  bVisited = false;
  size = 20;
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Grid {
  width = 20;
  height = 20;
  cells = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this._constructCells();
  }

  _constructCells() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells.push(new GridCell(x, y));
      }
    }
  }

  GetCell(x, y) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1
      ? null
      : this.cells[y * this.width + x];
  }

  Draw(draw) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.cells[y * this.width + x];
        if (cell.bVisited == true) {
          draw.strokeColor(RGBA(255, 0, 0));
          draw.fillColor(RGBA(255, 0, 0));
        } else {
          draw.strokeColor(RGBA(0, 0, 0));
          draw.fillColor(RGBA(0, 0, 0));
        }
        draw.rect(P(x * cell.size, y * cell.size), cell.size, cell.size, true);
      }
    }
  }

  GetUnvisitedNeighbors(x, y) {
    let neighbors = [];
    const up = this.GetCell(x, y + 1);
    const down = this.GetCell(x, y - 1);
    const right = this.GetCell(x + 1, y);
    const left = this.GetCell(x - 1, y);
    up && !up.bVisited ? neighbors.push(up) : "";
    down && !down.bVisited ? neighbors.push(down) : "";
    right && !right.bVisited ? neighbors.push(right) : "";
    left && !left.bVisited ? neighbors.push(left) : "";

    return neighbors;
  }

  GetRandomUnvisitedNeighbor(x, y) {
    let neighbors = this.GetUnvisitedNeighbors(x, y);

    if (neighbors.length <= 0) {
      return null;
    } else {
      let randIndex = Math.floor(Math.random() * neighbors.length);
      return neighbors[randIndex];
    }
  }
}

class Path {
  grid;
  pathCells = [];
  cCell;
  interval;
  params;
  constructor(grid) {
    this.grid = grid;
  }

  Start(draw) {
    this.cCell = this.grid.GetCell(0, 0);

    this.pathCells.push(this.cCell);
    this.cCell.bVisited = true;

    this.params = projectCanvasView.GetParams();

    if (this.params.type === "boxed") {
      draw.background(Color.black);
      draw.strokeWidth(0);
      draw.strokeColor(RGBA(255, 255, 255));
      draw.fillColor(RGBA(255, 255, 255));
      this.DrawBoxed(this.cCell);
    } else if (this.params.type === "border") {
      draw.strokeWidth(5);
      draw.background(Color.black);
      draw.strokeColor(RGBA(255, 255, 255));
      draw.fillColor(RGBA(255, 255, 255));
    }

    this.interval = setInterval(this.Tick.bind(this), 1);
  }

  Stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  DrawBoxed(neighbor) {
    let bridgePoint = P(neighbor.x - this.cCell.x, neighbor.y - this.cCell.y);
    bridgePoint.divide(2).add(P(this.cCell.x, this.cCell.y));

    P;
    draw.rect(
      P(
        neighbor.x * (cellXSize / 2) * 2 + cellXSize * 1.25,
        neighbor.y * (cellYSize / 2) * 2 + cellYSize * 1.25
      ),
      cellXSize / 2,
      cellYSize / 2,
      true
    );

    draw.rect(
      P(
        bridgePoint.x * (cellXSize / 2) * 2 + cellXSize * 1.25,
        bridgePoint.y * (cellYSize / 2) * 2 + cellYSize * 1.25
      ),
      cellXSize / 2,
      cellYSize / 2,
      true
    );
  }

  Tick() {
    let neighbor = this.grid.GetRandomUnvisitedNeighbor(
      this.cCell.x,
      this.cCell.y
    );
    if (neighbor) {
      if (this.params.type === "boxed") {
        this.DrawBoxed(neighbor);
      } else if (this.params.type === "border") {
        const adjunct1 = P(this.cCell.x, this.cCell.y).add(
          P(-neighbor.x, -neighbor.y)
        );
        const adjunct2 = P(adjunct1.x, adjunct1.y)
          .multiply(3.6)
          .add(-adjunct1.x, -adjunct1.y);
        draw.line(
          P(
            this.cCell.x * cellXSize + cellXSize + cellXSize / 2 + adjunct2.x,
            this.cCell.y * cellYSize + cellYSize + cellYSize / 2 + adjunct2.y
          ),
          P(
            neighbor.x * cellXSize + cellXSize + cellXSize / 2,
            neighbor.y * cellYSize + cellYSize + cellYSize / 2
          )
        );
      }

      this.cCell = neighbor;
      this.pathCells.push(this.cCell);
      this.cCell.bVisited = true;
    } else {
      this.pathCells.pop();
      if (this.pathCells.length <= 0) {
        this.Stop();
      } else {
        this.cCell = this.pathCells[this.pathCells.length - 1];
      }
    }
  }
}

projectCanvasView.render({}, true);
projectCanvasView.AddSelection("Type", ["boxed", "border"]);
projectCanvasView.AddCanvasDownload("Maze");
projectCanvasView.AddButton("Generate").addEventListener("click", Reset);
projectCanvasView.OnParamsUpdate(OnParamsUpdate);
const canvas = projectCanvasView.GetCanvas();
canvas.width = width;
canvas.height = height;
const draw = new Draw(canvas);
let grid = new Grid(cellAmount, cellAmount);
let path = new Path(grid);

Reset();

function Reset() {
  path.Stop();
  draw.background(Color.white);
  grid = new Grid(cellAmount, cellAmount);
  path = new Path(grid);
  path.Start(draw);
}

function OnParamsUpdate() {
  Reset();
}

//grid.Draw(draw);
