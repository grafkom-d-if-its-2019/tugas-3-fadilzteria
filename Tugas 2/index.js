(function() {

    var canvas, gl, program;
    glUtils.SL.init({ callback:function() { main(); }});

    function main() {

        window.addEventListener('resize', resizer);

        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
    
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
           
        gl.useProgram(program);
        
        resizer();
    }

    function draw() {
        // Write the positions of vertices to a vertex shader
        //var n = initBuffers_rotateTriangle(gl);
        var n = initBuffers_shape(gl);

        var translateUniformLocation = gl.getUniformLocation(program, 'translate');
        var backtranslateUniformLocation = gl.getUniformLocation(program, 'backtranslate');
        var translate = 0.4;
        var backtranslate = -0.4;

        var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
        var theta = 0;
        var theta2 = 0;

        var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
        var scaleX = 1.0;
        var scaleX2 = 1.0;
        gl.uniform1f(scaleXUniformLocation, scaleX);

        var scaleYUniformLocation = gl.getUniformLocation(program, 'scaleY');
        var scaleY = 1.0;
        gl.uniform1f(scaleYUniformLocation, scaleY);

        var melebar = 1.0;

        function render() {
            // Rotate
            translate = 0.4;
            backtranslate = -0.4;
            gl.uniform1f(translateUniformLocation, translate);
            gl.uniform1f(backtranslateUniformLocation, backtranslate);

            scaleX = 1.0;
            gl.uniform1f(scaleXUniformLocation, scaleX);

            theta2 += 0.0102;
            theta = theta2;
            gl.uniform1f(thetaUniformLocation, theta);
            gl.clearColor(0.15, 0.15, 0.15, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.LINE_LOOP, 0, 25);

            // Reflection
            translate = -0.4;
            backtranslate = 0.4;
            gl.uniform1f(translateUniformLocation, translate);
            gl.uniform1f(backtranslateUniformLocation, backtranslate);

            theta = 0;
            gl.uniform1f(thetaUniformLocation, theta);

            if (scaleX2 >= 1.0) melebar = -1.0;
            else if (scaleX2 <= -1.0) melebar = 1.0;
            scaleX2 += 0.0102 * melebar;
            scaleX = scaleX2;
            gl.uniform1f(scaleXUniformLocation, scaleX);
            
            gl.drawArrays(gl.TRIANGLES, 27, 63);

            requestAnimationFrame(render);
        }
        render();

    }

    function initBuffers_shape() {
        var vertices = new Float32Array([
            -0.65, -0.5, 1.0, 1.0, 0.0,
            -0.65, -0.4, 1.0, 0.0, 1.0,
            -0.6, -0.4, 0.0, 1.0, 1.0,
            -0.6, +0.4, 1.0, 1.0, 0.0,
            -0.65, +0.4, 1.0, 0.0, 1.0,
            -0.65, +0.5, 0.0, 1.0, 1.0,
            -0.5, +0.5, 1.0, 1.0, 0.0, 
            -0.4, -0.2, 1.0, 0.0, 1.0,
            -0.3, +0.5, 0.0, 1.0, 1.0,
            -0.15, +0.5, 1.0, 1.0, 0.0,
            -0.15, +0.4, 1.0, 0.0, 1.0,
            -0.2, +0.4, 0.0, 1.0, 1.0,
            -0.2, -0.4, 1.0, 1.0, 0.0,
            -0.15, -0.4, 1.0, 0.0, 1.0,
            -0.15, -0.5, 0.0, 1.0, 1.0,
            -0.3167, -0.5, 1.0, 1.0, 0.0,
            -0.3167, -0.4, 1.0, 0.0, 1.0,
            -0.2667, -0.4, 0.0, 1.0, 1.0,
            -0.2667, +0.3, 1.0, 1.0, 0.0,
            -0.375, -0.4, 1.0, 0.0, 1.0,
            -0.425, -0.4, 0.0, 1.0, 1.0,
            -0.5333, +0.3, 1.0, 1.0, 0.0,
            -0.5333, -0.4, 1.0, 0.0, 1.0,
            -0.4833, -0.4, 0.0, 1.0, 1.0,
            -0.4833, -0.5, 1.0, 1.0, 0.0,

            -0.4833, -0.4, 1.0, 1.0, 0.0,
            -0.4833, -0.5, 1.0, 1.0, 0.0,

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
        ]);

        var n = 90;

        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Membuat sambungan untuk attribute
        var vPosition = gl.getAttribLocation(program, 'vPosition');
        var vColor = gl.getAttribLocation(program, 'vColor');
        gl.vertexAttribPointer(
        vPosition,    // variabel yang memegang posisi attribute di shader
        2,            // jumlah elemen per atribut
        gl.FLOAT,     // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
        0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);

        return n;
    }

    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        draw();
    }

})();