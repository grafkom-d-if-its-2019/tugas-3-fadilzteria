precision mediump float;
attribute vec3 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;

void main()
{
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

	gl_Position = vec4(vPosition, 1.0) * rotation_z * rotation_y * rotation_x ;
}