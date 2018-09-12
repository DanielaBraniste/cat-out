import Shader from "./Shader";

export default class {
  constructor() {
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.id = 'canvas-container';

    document.body.appendChild(this.canvasContainer);

    this.canvas = document.createElement('canvas');
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;

    this.gl = this.canvas.getContext('webgl');
    this.gl.clearColor(0.53, 0.8, 0.98, 1.0);
    this.gl.enable(this.gl.BLEND);

    this.canvasContainer.appendChild(this.canvas);

    this.textCanvas = document.createElement('canvas');
    this.textCanvas.id = 'text-canvas';
    this.textCanvas.width = SCREEN_WIDTH;
    this.textCanvas.height = SCREEN_HEIGHT;

    this.textContext = this.textCanvas.getContext('2d');
    this.textContext.font = '48px Verdana, Arial, Helvetica, sans-serif';
    this.textContext.textAlign = 'center';
    this.textContext.fillStyle = 'white';

    this.canvasContainer.appendChild(this.textCanvas);

    this.projection = new Float32Array([
      2.0 / SCREEN_WIDTH, 0.0, 0.0, 0.0,
      0.0, -2.0 / SCREEN_HEIGHT, 0.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      -1.0, 1.0, 0.0, 1.0
    ]);

    this.shader = new Shader(this.gl, this.projection);

    this.texture = this.gl.createTexture();

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0,
                       this.gl.RGBA, this.gl.UNSIGNED_BYTE,
                       new Uint8Array([0, 0, 255, 255]));

    this.setUpTexture();

    const image = new Image();

    image.addEventListener('load', () => {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,
                         this.gl.UNSIGNED_BYTE, image);

      this.setUpTexture();
    });

    image.crossOrigin = '';
    image.src = 'TILES_TEXTURE';
  }

  setUpTexture() {
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S,
                          this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T,
                          this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER,
                          this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER,
                          this.gl.NEAREST);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.textContext.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  draw(vertexBuffer) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.shader.use();
    this.gl.drawArrays(this.gl.POINTS, 0, 1);
  }
}
