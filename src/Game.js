import Renderer from "./Renderer";
import Input from "./Input";
import Tama from "./Tama";
import Cucumber from "./Cucumber";

export default class {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();

    this.tama = new Tama(this.renderer, this.input, 100.0, 400.0, 0.0, 0.0);

    this.cucumbers = [];

    this.lastTimestamp = 0;
    this.timeAccumulator = 0;

    this.speed = 100;
    this.lastCucumber = 0;
    this.score = 0;

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
        this.lastCucumber = 0;
        this.score = 0;

        this.cucumbers = [];
      }

      if (this.started) {
        if (this.tama.update(this.speed, this.cucumbers)) {
          this.started = false;
          this.over = true;
        }

        for (const cucumber of this.cucumbers) {
          cucumber.update(this.speed);
        }

        this.lastCucumber++;

        if (this.lastCucumber > 80 && Math.random() > 0.8) {
          let count = 1 + Math.floor(this.speed / 180);

          for (let i = 0; i < count; i++) {
            this.cucumbers.push(
              new Cucumber(this.renderer, 1200.0 + i * SPRITE_SIZE, 400.0,
                           2.0, 0.0)
            );
          }

          this.lastCucumber = 0;
        }

        this.speed += 0.1;
        this.score += 0.1;

        if (this.speed === 500.0) {
          this.speed = 500.0;
        }
      }

      this.timeAccumulator -= TIME_STEP;
    }

    this.renderer.clear();
    this.tama.draw();

    for (const cucumber of this.cucumbers) {
      cucumber.draw();
    }

    if (this.start) {
      this.renderer.textContext.textAlign = 'center';

      this.renderer.textContext.font =
        '92px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.textContext.fillText('CAT OUT!', SCREEN_WIDTH / 2, 100);

      this.renderer.textContext.font =
        '48px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.textContext.fillText('PRESS SPACE TO BEGIN',
                                         SCREEN_WIDTH / 2, 500);
    } else if (this.over) {
      this.renderer.textContext.textAlign = 'center';

      this.renderer.textContext.font =
        '92px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.textContext.fillText('GAME OVER!', SCREEN_WIDTH / 2, 100);

      this.renderer.textContext.font =
        '48px Verdana, Arial, Helvetica, sans-serif';

      this.renderer.textContext.fillText(
        `FINAL SCORE: ${Math.round(this.score)}`, SCREEN_WIDTH / 2, 200
      );

      this.renderer.textContext.fillText('PRESS SPACE TO TRY AGAIN',
                                         SCREEN_WIDTH / 2, 500);
    } else {
      this.renderer.textContext.textAlign = 'left';
      this.renderer.textContext.font =
        '48px Verdana, Arial, Helvetica, sans-serif';
      this.renderer.textContext.fillText(`SCORE: ${Math.round(this.score)}`,
                                         20, 50);
    }
  }

  run() {
    requestAnimationFrame(timestamp => this.update(timestamp));
  }
}
