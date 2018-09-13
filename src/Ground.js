let vertexBuffer = null;

export default class {
  constructor(renderer, x, y) {
    this.renderer = renderer;

    this.vertices = new Float32Array([
      x, y,
      0.0, 1.0
    ]);

    if (!vertexBuffer) {
      vertexBuffer = renderer.gl.createBuffer();
    }

    this.updateBuffer();

    this.x = x;
    this.y = y;
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
  }

  draw() {
    this.updateBuffer();
    this.renderer.draw(vertexBuffer);
  }
}
