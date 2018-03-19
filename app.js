var twgl = require("twgl.js");

const canvas = document.getElementById("gl-canvas");
const gl = canvas.getContext("webgl");

var vss = require('ify-loader!./shaders/basic.vert.glsl');
var fss = require('ify-loader!./shaders/basic.frag.glsl');

var progInfo = twgl.createProgramInfo(gl, [vss, fss]);

var quadDataArr = {
    aPos: { numComponents: 2, data: [-1, -1, 1, -1, 1, 1, -1, 1] },
    aUV: { numComponents: 2, data: [0, 0, 1, 0, 1, 1, 0, 1] },
    indices: { numComponents: 3, data: [0, 1, 2, 2, 3, 0] }
};

gl.clearColor(0.0, 0.0, 0.0, 1.0);

const bufferInfo = twgl.createBufferInfoFromArrays(gl, quadDataArr);

function render(time) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(progInfo.program);
    twgl.setBuffersAndAttributes(gl, progInfo, bufferInfo);
    twgl.setUniforms(progInfo, { uResolution: [512, 512], uTime: time });
    twgl.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(render);
}

render(0);