precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;

uniform vec3 vec;
uniform float size;
uniform vec3 theta;

void main() {
  fColor = vColor;
  vec3 angle = radians(theta);
	vec3 vcos = cos(angle);
	vec3 vsin = sin(angle);
  
  mat4 rotation_x = mat4(
		1.0, 0.0, 0.0, 0.0,
		0.0, vcos.x, vsin.x, 0.0,
		0.0, -vsin.x, vcos.x, 0.0,
		0.0, 0.0, 0.0, 1.0
	);

	mat4 rotation_y = mat4(
		vcos.y, 0.0, -vsin.y, 0.0,
		0.0, 1.0, 0.0, 0.0,
		vsin.y, 0.0, vcos.y, 0.0,
		0.0, 0.0, 0.0, 1.0
	);

	mat4 rotation_z = mat4(
		vcos.z, vsin.z, 0.0, 0.0,
		-vsin.z, vcos.z, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);


	mat4 scaling = mat4(
		size, 0.0, 0.0, 0.0,
		0.0, size, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);

	mat4 translation = mat4(
		1.0, 0.0, 0.0, vec.x,
		0.0, 1.0, 0.0, vec.y,
		0.0, 0.0, 1.0, vec.z,
		0.0, 0.0, 0.0, 1.0
	);

  gl_Position = vec4(vPosition, 0.0, 1.0) * scaling * rotation_z * rotation_y * rotation_x;
	gl_Position = gl_Position * translation;
}