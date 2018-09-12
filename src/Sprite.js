export default class {
  constructor(renderer, x, y, u, v) {
    this.renderer = renderer;

    this.vertices = new Float32Array([
      x, y,
      u, v
    ]);

    this.vertexBuffer = renderer.gl.createBuffer();

    this.updateBuffer();
  }

  updateBuffer() {
    this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,
                                this.vertexBuffer);
    this.renderer.gl.bufferData(this.renderer.gl.ARRAY_BUFFER, this.vertices,
                                this.renderer.gl.STATIC_DRAW);
  }

  draw() {
    this.renderer.draw(this.vertexBuffer);
  }
}
