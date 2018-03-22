var twgl = require("twgl.js");
var shaderLoader = require("./shaders");

const canvas = document.getElementById("gl-canvas");
const gl = canvas.getContext("webgl");

// var sz = [window.innerWidth, window.innerHeight];
var sz = [512, 512];

// window.onresize = () => {
//     sz = [window.innerWidth, window.innerHeight];
//     setCanvasSize();
//     console.log("resized");
// }

function setCanvasSize() {
    canvas.clientWidth = sz[0];
    canvas.clientHeight = sz[1];
    canvas.width = sz[0];
    canvas.height = sz[1];
}

setCanvasSize();

var vss = shaderLoader("basic.vert.glsl");//require('ify-loader!./shaders/basic.vert.glsl');
var fss = shaderLoader("basic.frag.glsl")//require('ify-loader!./shaders/basic.frag.glsl');

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
    twgl.setUniforms(progInfo, { uResolution: sz, uTime: time });
    twgl.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(render);
}

render(0);