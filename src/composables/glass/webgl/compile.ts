/**
 * Shared WebGL2 shader compile/link pair (AV.W14) — the single error-checked
 * source the aurora GL setup (`glSetup.ts`) and the goo-blob renderer
 * (`useMetaballRenderer.ts`) both build their program from. Each consumer was
 * hand-rolling a byte-identical `compile`/`link` differing only in the error
 * log prefix; the `label` parameter preserves that per-consumer diagnostic.
 *
 * On a compile/link failure the GL resource is deleted before the throw (so a
 * caller that catches does not leak a dead shader/program), and the GPU info
 * log is named in the message — the loud failure, not a silent draw of garbage.
 */

/** Compile a single shader; throws (and deletes the shader) on COMPILE_STATUS failure. */
export function compileShader(
    gl: WebGL2RenderingContext,
    type: number,
    src: string,
    label = "[glass-ui:webgl]",
): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh) ?? "unknown";
        gl.deleteShader(sh);
        throw new Error(`${label} shader compile failed:\n${log}`);
    }
    return sh;
}

/** Link a vertex/fragment shader pair; throws (and deletes the program) on LINK_STATUS failure. */
export function linkProgram(
    gl: WebGL2RenderingContext,
    vs: WebGLShader,
    fs: WebGLShader,
    label = "[glass-ui:webgl]",
): WebGLProgram {
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(p) ?? "unknown";
        gl.deleteProgram(p);
        throw new Error(`${label} program link failed:\n${log}`);
    }
    return p;
}
