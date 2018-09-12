uniform mat4 projection;

attribute vec2 vertexPosition;
attribute vec2 vertexTexCoord;

varying vec2 texCoord;
varying float tint;

void main() {
  gl_PointSize = SPRITE_SIZE;
  gl_Position = projection * vec4(vertexPosition, 0.0, 1.0);

  texCoord = vertexTexCoord;
}
