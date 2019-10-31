precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scaleX;
uniform float scaleY;
uniform float translate;
uniform float backtranslate;

void main() {
  fColor = vColor;
  mat4 translationMatrix = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translate, 0.0, 0.0, 1.0
  );

  mat4 translationMatrix2 = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    backtranslate, 0.0, 0.0, 1.0
  );

  mat4 rotationMatrix = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 scalationMatrix = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = translationMatrix * vec4(vPosition, 0.0, 1.0);
  gl_Position = scalationMatrix * gl_Position;
  gl_Position = rotationMatrix * gl_Position;
  gl_Position = translationMatrix2 * gl_Position;
}