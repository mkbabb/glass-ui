// BG.W-DOTFLOW-REBUILD — the shared WebGL2 compile/link helper for the streamline fragment pass.
//
// The float-FBO probe + half-float packers (the trail-ping-pong support) are GONE with the
// mote/trail architecture — the streamline render is a single opaque fullscreen fragment, no
// FBO. Only the error-checked compile/link survives (no-god-module: the shader strings + the
// draw loop stay in flowSetupGL.ts).

export function compileGL(
    gl: WebGL2RenderingContext,
    type: number,
    src: string,
): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`[DotFlowField] shader compile failed: ${log}`);
    }
    return sh;
}

export function linkGL(
    gl: WebGL2RenderingContext,
    vsSrc: string,
    fsSrc: string,
): WebGLProgram {
    const vs = compileGL(gl, gl.VERTEX_SHADER, vsSrc);
    const fs = compileGL(gl, gl.FRAGMENT_SHADER, fsSrc);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`[DotFlowField] link failed: ${gl.getProgramInfoLog(program)}`);
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return program;
}
