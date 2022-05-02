export default class Point {
  x = 0;
  y = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(param1, param2 = 0) {
    if (param1 instanceof Point) {
      this.x += param1.x;
      this.y += param1.y;
    } else if (!isNaN(param1) && !isNaN(param2)) {
      this.x += param1;
      this.y += param2;
    }
    return this;
  }

  multiply(param1) {
    if (param1 instanceof Point) {
      this.x *= param1.x;
      this.y *= param1.y;
    } else if (!isNaN(param1)) {
      this.x *= param1;
      this.y *= param1;
    }
    return this;
  }

  divide(param1) {
    if (param1 instanceof Point) {
      this.x /= param1.x;
      this.y /= param1.y;
    } else if (!isNaN(param1)) {
      this.x /= param1;
      this.y /= param1;
    }
    return this;
  }

  random(maxX, maxY) {
    this.x = Math.floor(Math.random() * maxX);
    this.y = Math.floor(Math.random() * maxY);
    return this;
  }

  distance(point2) {
    return Math.sqrt((point2.x - this.x) ** 2 + (point2.y - this.y) ** 2);
  }

  distanceFast(point2) {
    let x = point2.x - this.x;
    let y = point2.y - this.y;
    return x * x + y * y;
  }

  rotate(angle, centerPoint) {
    let radians = (Math.PI / 180) * -angle;
    let sin = Math.sin(radians);
    let cos = Math.cos(radians);

    let nx =
      cos * (this.x - centerPoint.x) +
      sin * (this.y - centerPoint.y) +
      centerPoint.x;
    let ny =
      cos * (this.y - centerPoint.y) -
      sin * (this.x - centerPoint.x) +
      centerPoint.y;

    this.x = nx;
    this.y = ny;
    return this;
  }

  Midpoint(point2) {
    return P((this.x + point2.x) / 2, (this.y + point2.y) / 2);
  }

  Slope(point2) {
    return (point2.y - this.y) / (point2.x - this.x); // m = (y2 - y1) / (x2 - x1);
  }
}

export function P(x, y) {
  return new Point(x, y);
}
