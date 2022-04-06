import Point, { P } from "./point.js";
import ColorRGBA, { Color, RGBA } from "./color.js";

export default class Draw {
  canvas;
  ctx;

  constructor(canvas) {
    this.canvas = canvas;
    if (canvas) {
      this.ctx = canvas.getContext("2d");
    }
  }

  line(point1, point2) {
    if (point1 instanceof Point && point2 instanceof Point) {
      this.ctx.moveTo(point1.x, point1.y);
      this.ctx.lineTo(point2.x, point2.y);
      this.ctx.stroke();
    } else {
      console.log("Draw line: point1 or point2 is not a Point");
    }
  }

  background(color) {
    if (color instanceof ColorRGBA) {
      this.ctx.fillStyle = color.GetRGBAStr();
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      console.log("Draw background: color is not a Color");
    }
  }

  fillColor(color) {
    if (color instanceof ColorRGBA) {
      this.ctx.fillStyle = color.GetRGBAStr();
    } else {
      console.log("Draw fillColor: color is not a Color");
    }
  }

  strokeColor(color) {
    if (color instanceof ColorRGBA) {
      this.ctx.strokeStyle = color.GetRGBAStr();
    } else {
      console.log("Draw strokeColor: color is not a Color");
    }
  }

  strokeWidth(width) {
    this.ctx.lineWidth = width;
  }

  circle(point, radius, bFill = false) {
    if (point instanceof Point) {
      this.ctx.beginPath();

      this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
      if (bFill === true) {
        this.ctx.fill();
      }

      this.ctx.stroke();
    } else {
      console.log("Draw circle: point is not a Point");
    }
  }

  pixel(point) {
    if (point instanceof Point) {
      this.ctx.fillRect(point.x, point.y, 1, 1);
    } else {
      console.log("Draw pixel: point is not a Point");
    }
  }

  GetWidth() {
    return this.canvas.width;
  }

  GetHeight() {
    return this.canvas.height;
  }
}
