let vertexBuffer = null;

export default class {
  constructor(renderer, x, y) {
    this.renderer = renderer;

    this.vertices = new Float32Array([
      Math.round(x), Math.round(y),
      4.0, 0.0
    ]);

    if (!vertexBuffer) {
      vertexBuffer = renderer.gl.createBuffer();
    }

    this.updateBuffer();

    this.x = x;
    this.y = y;

    this.timer = 0;
  }

  updateBuffer() {
    this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,
                                vertexBuffer);
    this.renderer.gl.bufferData(this.renderer.gl.ARRAY_BUFFER, this.vertices,
                                this.renderer.gl.STATIC_DRAW);
  }

  update(speed) {
    this.timer += TIME_STEP;

    if (this.timer >= 400) {
      this.timer = 0;

      this.vertices[3] = this.vertices[3] === 0.0 ? 1.0 : 0.0;
    }

    this.x -= speed / 22;

    this.vertices[0] = Math.round(this.x);
  }

  draw() {
    this.updateBuffer();
    this.renderer.draw(vertexBuffer);
  }
}
