import Sprite from "./Sprite";

export default class extends Sprite {
  constructor(renderer, input, x, y, u, v) {
    super(renderer, x, y, u, v);

    this.input = input;

    this.timer = 0;
    this.x = x;
    this.y = y;
    this.dy = 0.0;
    this.ay = 0.0;
  }

  update(speed, obstacles) {
    this.timer += TIME_STEP;

    if (this.timer >= 25000 / speed && this.y === 400.0) {
      this.timer = 0;

      this.vertices[2] = this.vertices[2] === 0.0 ? 1.0 : 0.0;
    }

    if (this.input.justPressed && this.y === 400.0) {
      this.dy = -22.0;
      this.ay = 1.0;
    }

    this.dy += this.ay;
    this.y += this.dy;

    this.vertices[1] = this.y;

    if (this.y >= 400.0) {
      this.y = 400.0;

      this.ay = 0.0;
      this.dy = 0.0;
    }

    this.updateBuffer();

    for (const obstacle of obstacles) {
      if (Math.abs(obstacle.x - this.x) < 100.0 &&
          Math.abs(obstacle.y - this.y) < 100.0) {
        return true;
      }
    }

    return false;
  }
}
