import Sprite from "./Sprite";

export default class extends Sprite {
  constructor(renderer, input, audio, game, x, y, u, v) {
    super(renderer, x, y, u, v);

    this.input = input;
    this.audio = audio;
    this.game = game;

    this.timer = 0;
    this.x = x;
    this.y = y;
    this.dy = 0.0;
    this.ay = 0.0;
  }

  update(speed, obstacles, bonuses) {
    this.timer += TIME_STEP;

    if (this.timer >= 25000 / speed && this.y === 410.0) {
      this.timer = 0;

      this.vertices[2] = this.vertices[2] === 0.0 ? 1.0 : 0.0;

      this.audio.play('sawtooth', 200, 300, 0.2);
    }

    if (this.input.justPressed && this.y === 410.0) {
      this.dy = -22.0;
      this.ay = 1.0;

      this.audio.play('square', 400, 600, 0.5);
    }

    this.dy += this.ay;
    this.y += this.dy;

    this.vertices[1] = Math.round(this.y);

    if (this.y >= 410.0) {
      this.y = 410.0;

      this.ay = 0.0;
      this.dy = 0.0;
    }

    this.updateBuffer();

    for (const obstacle of obstacles) {
      if (Math.abs(obstacle.x - this.x) < 100.0 &&
          Math.abs(obstacle.y - this.y) < 100.0) {
        this.audio.play('square', 500, 300, 0.5);

        return true;
      }
    }

    for (const bonus of bonuses) {
      if (Math.abs(bonus.x - this.x) < 100.0 &&
          Math.abs(bonus.y - this.y) < 100.0) {
        bonus.active = false;

        this.audio.play('triangle', 600, 800, 0.5);

        this.game.score += 100;
      }
    }

    return false;
  }
}
