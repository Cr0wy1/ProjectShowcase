export default class ColorRGBA {
  r = 255;
  g = 255;
  b = 255;
  a = 1.0;

  constructor(r = 255, g = 255, b = 255, a = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  GetRGBAStr() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  White() {
    return RGBA(255, 255, 255, 1.0);
  }

  random() {
    this.r = Math.floor(Math.random() * 255);
    this.g = Math.floor(Math.random() * 255);
    this.b = Math.floor(Math.random() * 255);
    this.a = 1;
    return this;
  }
}

export const Color = {
  white: RGBA(255, 255, 255, 1.0),
  black: RGBA(0, 0, 0, 1.0)
};

export function RGBA(r = 255, g = 255, b = 255, a = 2.0) {
  return new ColorRGBA(r, g, b, a);
}
