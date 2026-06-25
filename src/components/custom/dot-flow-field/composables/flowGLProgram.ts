// BD.W-DOTFLOW-AURORA-CURRENT — the shared WebGL2 program helpers for the dot-flow backends.
//
// compile/link a GLSL program, probe a float-FBO target's renderability (R-A capability
// fallback), and pack a Float32Array to half-float (the RGBA32F-absent upload). Carved out of
// the WebGL2 substrate leaf so the `field` and `flow` setups share one helper seam
// (no-god-module). The shader strings + the per-mode draw loops stay in their setup leaves.

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

/** Probe whether an internal format is color-renderable as a float FBO target (R-A). */
export function probeRenderable(
    gl: WebGL2RenderingContext,
    internal: number,
    type: number,
): boolean {
    const tex = gl.createTexture();
    const fbo = gl.createFramebuffer();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, 2, 2, 0, gl.RGBA, type, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(fbo);
    gl.deleteTexture(tex);
    return ok;
}

/** Pack a Float32Array to half-float (RGBA16F upload) — the RGBA32F-absent fallback (R-A). */
export function float32ToHalf(src: Float32Array): Uint16Array {
    const out = new Uint16Array(src.length);
    for (let i = 0; i < src.length; i++) out[i] = f32ToF16(src[i]);
    return out;
}

/** IEEE-754 float32 → float16 bits (the standard round-to-nearest packing). */
export function f32ToF16(val: number): number {
    const f32 = new Float32Array(1);
    const i32 = new Int32Array(f32.buffer);
    f32[0] = val;
    const x = i32[0];
    const sign = (x >> 16) & 0x8000;
    let exp = ((x >> 23) & 0xff) - 127 + 15;
    let mant = x & 0x7fffff;
    if (exp <= 0) return sign;
    if (exp >= 0x1f) return sign | 0x7c00;
    mant = mant >> 13;
    return sign | (exp << 10) | mant;
}
