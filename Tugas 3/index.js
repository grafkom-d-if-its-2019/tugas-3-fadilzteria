(function() {

    var canvas, gl, program, programCube;
    glUtils.SL.init({ callback:function() { main(); }});

    function main() {

        window.addEventListener('resize', resizer);

        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
    
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment),
            vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
            fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

        resizer();
    }

    function draw() {
        var thetaLoc = gl.getUniformLocation(program, 'theta');
		var transLoc = gl.getUniformLocation(program, 'vec');
		var sizeLoc = gl.getUniformLocation(program, 'size');
		var size = 0.3;
		var thetaT = [20, 60, 0];
		var vec = [0, 0, 0];
		var vecX = 0.0055;
		var vecY = 0.0102;
		var vecZ = 0.06;
        var adder = 1.02;
        
        var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
        var thetaCube = [20, 60, 0];
        
        function cube() {
			gl.useProgram(programCube);
			// Definisi verteks dan buffer
			// Missing Lines : AD, DC, EF, DH
			var cubeVertices = [
				//ABCD
				-0.5, -0.5, 0.5, 1.0, 1.0, 0.0,    //A
				-0.5, 0.5, 0.5, 1.0, 1.0, 0.0,     //B
				-0.5, 0.5, 0.5, 1.0, 1.0, 0.0,     //B
				0.5, 0.5, 0.5, 1.0, 1.0, 0.0,      //C
				0.5, 0.5, 0.5, 1.0, 1.0, 0.0,      //C
				0.5, -0.5, 0.5, 1.0, 1.0, 0.0,     //D
				0.5, -0.5, 0.5, 1.0, 1.0, 0.0,     //D
				-0.5, -0.5, 0.5, 1.0, 1.0, 0.0,    //A

				//DCGH
				0.5, 0.5, 0.5, 1.0, 1.0, 0.0,      //C
				0.5, 0.5, -0.5, 1.0, 1.0, 0.0,     //G
				0.5, -0.5, 0.5, 1.0, 1.0, 0.0,     //D
				0.5, -0.5, -0.5, 1.0, 1.0, 0.0,    //H

				//ABFE
				-0.5, -0.5, 0.5, 1.0, 1.0, 0.0,    //A
				-0.5, -0.5, -0.5, 1.0, 1.0, 0.0,   //E
				-0.5, 0.5, 0.5, 1.0, 1.0, 0.0,     //B
				-0.5, 0.5, -0.5, 1.0, 1.0, 0.0,    //F

				//EFGH
				-0.5, -0.5, -0.5, 1.0, 1.0, 0.0,   //E
				-0.5, 0.5, -0.5, 1.0, 1.0, 0.0,    //F
				-0.5, 0.5, -0.5, 1.0, 1.0, 0.0,    //F
				0.5, 0.5, -0.5, 1.0, 1.0, 0.0,     //G
				0.5, 0.5, -0.5, 1.0, 1.0, 0.0,     //G
				0.5, -0.5, -0.5, 1.0, 1.0, 0.0,    //H
				0.5, -0.5, -0.5, 1.0, 1.0, 0.0,    //H
				-0.5, -0.5, -0.5, 1.0, 1.0, 0.0,   //E

			];

			var cubeVertexBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

			var vPosition = gl.getAttribLocation(programCube, "vPosition");
			var vColor = gl.getAttribLocation(programCube, "vColor");
			gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
			gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

			gl.enableVertexAttribArray(vPosition);
			gl.enableVertexAttribArray(vColor);

			gl.uniform3fv(thetaLocCube, thetaCube);
		}

		function triangle() {
			gl.useProgram(program);

			var triangleVertices = [
				// Left
                +0.15, -0.5, 1.0, 1.0, 0.0,
                +0.15, -0.4, 1.0, 0.0, 1.0,
                +0.3167, -0.5, 0.0, 1.0, 1.0,
    
                +0.15, -0.4, 1.0, 1.0, 0.0,
                +0.3167, -0.4, 1.0, 0.0, 1.0,
                +0.3167, -0.5, 0.0, 1.0, 1.0,
    
                +0.2, -0.4, 1.0, 1.0, 0.0,
                +0.2, +0.3, 1.0, 0.0, 1.0,
                +0.2667, -0.4, 0.0, 1.0, 1.0,
    
                +0.2, +0.3, 1.0, 1.0, 0.0,
                +0.2667, +0.3, 1.0, 0.0, 1.0,
                +0.2667, -0.4, 0.0, 1.0, 1.0,
    
                +0.2, +0.3, 1.0, 1.0, 0.0,
                +0.2667, +0.3, 1.0, 0.0, 1.0,
                +0.2, +0.5, 0.0, 1.0, 1.0,
    
                +0.2, +0.5, 1.0, 1.0, 0.0,
                +0.2667, +0.3, 1.0, 0.0, 1.0,
                +0.3, +0.5, 0.0, 1.0, 1.0,
    
                +0.15, +0.4, 1.0, 1.0, 0.0,
                +0.15, +0.5, 1.0, 0.0, 1.0,
                +0.2, +0.4, 0.0, 1.0, 1.0,
    
                +0.15, +0.5, 1.0, 1.0, 0.0,
                +0.2, +0.5, 1.0, 0.0, 1.0,
                +0.2, +0.4, 0.0, 1.0, 1.0,
    
                // Center
                +0.3, +0.5, 1.0, 1.0, 0.0,
                +0.375, -0.4, 1.0, 0.0, 1.0,
                +0.2667, +0.3, 0.0, 1.0, 1.0,
    
                +0.3, +0.5, 1.0, 1.0, 0.0,
                +0.375, -0.4, 1.0, 0.0, 1.0,
                +0.4, -0.2, 0.0, 1.0, 1.0,
     
                +0.4, -0.2, 1.0, 1.0, 0.0,
                +0.375, -0.4, 1.0, 0.0, 1.0,
                +0.425, -0.4, 0.0, 1.0, 1.0,
    
                +0.4, -0.2, 1.0, 1.0, 0.0,
                +0.5, +0.5, 1.0, 0.0, 1.0,
                +0.425, -0.4, 0.0, 1.0, 1.0,
    
                +0.5, +0.5, 1.0, 1.0, 0.0,
                +0.425, -0.4, 1.0, 0.0, 1.0,
                +0.5333, +0.3, 0.0, 1.0, 1.0,
    
                // Right
                +0.5333, +0.3, 1.0, 1.0, 0.0,
                +0.5, +0.5, 1.0, 0.0, 1.0,
                +0.6, +0.5, 0.0, 1.0, 1.0,
    
                +0.6, +0.5, 1.0, 1.0, 0.0,
                +0.6, +0.3, 1.0, 0.0, 1.0,
                +0.5333, +0.3, 0.0, 1.0, 1.0,
     
                +0.6, +0.5, 1.0, 1.0, 0.0,
                +0.65, +0.5, 1.0, 0.0, 1.0,
                +0.6, +0.4, 0.0, 1.0, 1.0,
                
                +0.65, +0.5, 1.0, 1.0, 0.0,
                +0.6, +0.4, 1.0, 0.0, 1.0,
                +0.65, +0.4, 0.0, 1.0, 1.0,
    
                +0.5333, +0.3, 1.0, 1.0, 0.0,
                +0.6, +0.3, 1.0, 0.0, 1.0,
                +0.5333, -0.4, 0.0, 1.0, 1.0,
    
                +0.6, +0.3, 1.0, 1.0, 0.0,
                +0.5333, -0.4, 1.0, 0.0, 1.0,
                +0.6, -0.4, 0.0, 1.0, 1.0,
    
                +0.4833, -0.4, 1.0, 1.0, 0.0,
                +0.65, -0.4, 1.0, 0.0, 1.0,
                +0.4833, -0.5, 0.0, 1.0, 1.0,
    
                +0.65, -0.4, 1.0, 1.0, 0.0,
                +0.4833, -0.5, 1.0, 0.0, 1.0,
                +0.65, -0.5, 0.0, 1.0, 1.0,
			];

			var triangleVertexBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

			var vPosition = gl.getAttribLocation(program, "vPosition");
			var vColor = gl.getAttribLocation(program, "vColor");

			gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
			gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

			gl.uniform1f(sizeLoc, size);

			if (vec[0] > 0.5 * (1 - size) || vec[0] < -0.5 * (1 - size))
				vecX = vecX * -1;
			vec[0] += vecX;

			if (vec[1] > 0.5 * (1 - size) || vec[1] < -0.5 * (1 - size))
				vecY = vecY * -1;
			vec[1] += vecY;

			if (vec[2] > 0.5 * (1 - size) || vec[2] < -0.5 * (1 - size))
				vecZ = vecZ * -1;
			vec[2] += vecZ;

			gl.uniform3fv(transLoc, vec);

			thetaT[1] += (adder * 3);

			gl.uniform3fv(thetaLoc, thetaT);
        }
        
        function render() {
			gl.clearColor(0.15, 0.15, 0.15, 1.0);
			gl.enable(gl.DEPTH_TEST);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			cube();
            gl.drawArrays(gl.LINES, 0, 24);
            
            triangle();
			gl.drawArrays(gl.TRIANGLES, 0, 63);

			requestAnimationFrame(render);
		}
		render();
    
    }
    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        draw();
    }

})();