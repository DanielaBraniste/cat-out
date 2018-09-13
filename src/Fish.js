let vertexBuffer = null;

export default class {
  constructor(renderer, x, y) {
    this.renderer = renderer;

    this.vertices = new Float32Array([
      x, y,
      3.0, 0.0
    ]);

    if (!vertexBuffer) {
      vertexBuffer = renderer.gl.createBuffer();
    }

    this.updateBuffer();

    this.x = x;
    this.y = y;

    this.dy = -30.0;
    this.ay = 1.0;

    this.active = true;
  }

  updateBuffer() {
    this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,
                                vertexBuffer);
    this.renderer.gl.bufferData(this.renderer.gl.ARRAY_BUFFER, this.vertices,
                                this.renderer.gl.STATIC_DRAW);
  }

  update(speed) {
    this.x -= speed / 15;

    this.dy += this.ay;
    this.y += this.dy;

    this.vertices[0] = Math.round(this.x);
    this.vertices[1] = Math.round(this.y);

    this.vertices[3] = this.dy < 0 ? 0.0 : 1.0;

    if (this.y > 500 || this.x < -150) {
      this.active = false;
    }
  }

  draw() {
    this.updateBuffer();
    this.renderer.draw(vertexBuffer);
  }
}
