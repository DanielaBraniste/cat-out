import Fish from "./Fish";

let vertexBuffer = null;

export default class {
  constructor(renderer, game, x, y) {
    this.renderer = renderer;
    this.game = game;

    this.vertices = new Float32Array([
      x, y,
      2.0, 1.0
    ]);

    if (!vertexBuffer) {
      vertexBuffer = renderer.gl.createBuffer();
    }

    this.updateBuffer();

    this.x = x;
    this.y = y;

    this.launch = Math.random() * 1000;
    this.launched = false;
  }

  updateBuffer() {
    this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,
                                vertexBuffer);
    this.renderer.gl.bufferData(this.renderer.gl.ARRAY_BUFFER, this.vertices,
                                this.renderer.gl.STATIC_DRAW);
  }

  update(speed) {
    this.x -= speed / 15;
    this.vertices[0] = Math.round(this.x);

    this.launch -= TIME_STEP;

    if (!this.launched && this.launch <= 0) {
      this.game.bonuses.push(new Fish(this.renderer, this.x, this.y - 50));
      this.launched = true;
    }
  }

  draw() {
    this.updateBuffer();
    this.renderer.draw(vertexBuffer);
  }
}
