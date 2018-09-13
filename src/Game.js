import Renderer from "./Renderer";
import Input from "./Input";
import Audio from "./Audio";
import Tama from "./Tama";
import Cucumber from "./Cucumber";
import Puddle from "./Puddle";
import Ground from "./Ground";
import Cloud from "./Cloud";

export default class {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.audio = new Audio();

    this.tama = new Tama(this.renderer, this.input, this.audio, this,
                         100.0, 410.0, 0.0, 0.0);

    this.obstacles = [];
    this.decorations = [];
    this.bonuses = [];

    this.lastTimestamp = 0;
    this.timeAccumulator = 0;

    this.speed = 100;
    this.lastDecoration = 0;
    this.lastObstacle = 0;
    this.score = 0;
    this.bestScore = 0;

    this.start = true;
    this.over = false;
    this.started = false;
  }

  update(timestamp) {
    requestAnimationFrame(timestamp => this.update(timestamp));

    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (deltaTime > 2500) {
      return;
    }

    this.timeAccumulator += deltaTime;

    while (this.timeAccumulator >= TIME_STEP) {
      this.input.update();

      if (this.input.justPressed && !this.started) {
        this.started = true;
        this.start = false;
        this.over = false;

        this.speed = 100;
        this.lastObstacle = 0;
        this.lastCloud = 0;
        this.score = 0;

        this.obstacles = [];
        this.bonuses = [];
      }

      while (this.lastDecoration <= SCREEN_WIDTH + SPRITE_SIZE) {
        this.decorations.push(
          new Ground(this.renderer, this.lastDecoration, 538)
        );

        this.lastCloud++;

        if (this.lastCloud >= 5 && Math.random() > 0.8) {
          this.lastCloud = 0;

          this.decorations.push(
            new Cloud(this.renderer, this.lastDecoration,
                      100 + Math.random() * 150)
          );
        }

        this.lastDecoration += SPRITE_SIZE;
      }

      if (this.started) {
        for (const decoration of this.decorations) {
          decoration.update(this.speed);
        }

        this.decorations =
          this.decorations.filter(decoration => decoration.x >= -130);

        for (const obstacle of this.obstacles) {
          obstacle.update(this.speed);
        }

        this.obstacles = this.obstacles.filter(obstacle => obstacle.x >= -130);

        for (const bonus of this.bonuses) {
          bonus.update(this.speed);
        }

        this.bonuses = this.bonuses.filter(bonus => bonus.active);

        if (this.tama.update(this.speed, this.obstacles, this.bonuses)) {
          this.started = false;
          this.over = true;
        }

        this.lastDecoration -= this.speed / 15;

        this.lastObstacle++;

        if (this.lastObstacle > 80 && Math.random() > 0.8) {
          let count = 1 + Math.floor(this.speed / 180);

          for (let i = 0; i < count; i++) {
            if (Math.random() < 0.66) {
              this.obstacles.push(
                new Cucumber(this.renderer, 1200.0 + i * SPRITE_SIZE, 410.0)
              );
            } else {
              this.obstacles.push(
                new Puddle(this.renderer, this,
                           1200.0 + i * SPRITE_SIZE, 498.0)
              );
            }
          }

          this.lastObstacle = 0;
        }

        this.speed += 0.1;
        this.score += 0.1;

        if (this.score > this.bestScore) {
          this.bestScore = this.score;
        }

        if (this.speed === 750.0) {
          this.speed = 750.0;
        }
      }

      this.timeAccumulator -= TIME_STEP;
    }

    this.renderer.clear();

    for (const decoration of this.decorations) {
      decoration.draw();
    }

    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }

    for (const bonus of this.bonuses) {
      bonus.draw();
    }

    this.tama.draw();

    if (this.start) {
      this.renderer.textContext.textAlign = 'center';

      this.renderer.textContext.font =
        '92px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.drawText('CAT OUT!', SCREEN_WIDTH / 2, 100, 8);

      this.renderer.textContext.font =
        '48px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.drawText('PRESS SPACE TO BEGIN', SCREEN_WIDTH / 2, 450);
    } else if (this.over) {
      this.renderer.textContext.textAlign = 'center';

      this.renderer.textContext.font =
        '92px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.drawText('GAME OVER!', SCREEN_WIDTH / 2, 100, 8);

      this.renderer.textContext.font =
        '48px Verdana, Arial, Helvetica, sans-serif';

      this.renderer.drawText(
        `FINAL SCORE: ${Math.round(this.score)}`, SCREEN_WIDTH / 2, 200
      );

      if (this.score >= this.bestScore) {
        this.renderer.drawText('NEW HIGH SCORE!', SCREEN_WIDTH / 2, 260);
      }

      this.renderer.drawText('PRESS SPACE TO TRY AGAIN', SCREEN_WIDTH / 2, 450);
    } else {
      this.renderer.textContext.font =
        '48px Verdana, Arial, Helvetica, sans-serif';

      this.renderer.textContext.textAlign = 'left';
      this.renderer.drawText(`SCORE: ${Math.round(this.score)}`, 20, 50);

      this.renderer.textContext.textAlign = 'right';
      this.renderer.drawText(
        `HIGH SCORE: ${Math.round(this.bestScore)}`, SCREEN_WIDTH - 20, 50
      );
    }
  }

  run() {
    requestAnimationFrame(timestamp => this.update(timestamp));
  }
}
