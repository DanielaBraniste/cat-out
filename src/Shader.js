import vertexShaderSource from '../shaders/sprite.vert';
import fragmentShaderSource from '../shaders/sprite.frag';

export default class {
  constructor(gl, projection) {
    this.gl = gl;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    this.projection = gl.getUniformLocation(this.program, 'projection');

    this.vertexPosition = gl.getAttribLocation(this.program, 'vertexPosition');
    this.vertexTexCoord = gl.getAttribLocation(this.program, 'vertexTexCoord');

    gl.useProgram(this.program);

    this.gl.uniformMatrix4fv(this.projection, false, projection);
  }

  use() {
    this.gl.enableVertexAttribArray(this.vertexPosition);
    this.gl.enableVertexAttribArray(this.vertexTexCoord);

    this.gl.vertexAttribPointer(this.vertexPosition, 2, this.gl.FLOAT, false,
                                16, 0);

    this.gl.vertexAttribPointer(this.vertexTexCoord, 2, this.gl.FLOAT, false,
                                16, 8);
  }
}
