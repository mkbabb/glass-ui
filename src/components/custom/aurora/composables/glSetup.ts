/**
 * Aurora GL setup seam — shader compile/link + geometry + the uniform location
 * cache. The GL-lifecycle orchestrator (`runtime.ts`) calls `createGlProgram` on a
 * fresh context (on arm AND on every webglcontextrestored), so a GPU context loss
 * self-heals: each call rebuilds the program + the full-screen triangle + the
 * `UNIFORM_NAMES` location cache against the fresh `gl`.
 *
 * The `UNIFORM_NAMES` const-assertion is the single source of truth for the
 * shader-uniform boundary: a NEW uniform name must be added here, and the cache is
 * keyed off it, so a fresh uniform always gets a location slot.
 */

// AV.W14 — the error-checked compile/link is the shared `glass/webgl/compile`
// leaf; aurora keeps its `[Aurora]` diagnostic label via the `label` arg.
import { compileShader, linkProgram } from "../../../../composables/glass/webgl/compile";

const AURORA_LABEL = "[Aurora]";

export const UNIFORM_NAMES = [
    "uTime",
    "uPalette",
    "uStopCount",
    "uNucleiCount",
    "uNucleiPos",
    "uNucleiRadius",
    "uNucleiPaletteBias",
    "uNucleiValueBias",
    "uNucleiDriftRadius",
    "uNucleiDriftPhase",
    "uNucleiElong",
    "uNucleiAngle",
    "uSoftmaxBeta",
    "uValueVariance",
    "uWarpAmount",
    "uWarpScale",
    "uWarpDrift",
    "uWarpMode",
    "uNoiseOctaves",
    "uMedium",
    "uHuePath",
    "uFlowPattern",
    "uFlowFocal",
    "uFlowAngle",
    "uFlowCurl",
    "uCursor",
    "uCursorStrength",
    "uCursorRadius",
    // AW.W8.1 — the velocity-reactive flow uniforms.
    "uCursorVelocity",
    "uCursorBurst",
    "uStrokeAmount",
    "uStrokeScale",
    "uStrokeAnisotropy",
    "uStrokeLayers",
    "uStrokeMode",
    // AW.W4.1 — stroke-orientation source (flow | tensor).
    "uStrokeOrient",
    // AW.W4.2 — the movable impasto relight axis (cursor-as-light in AW.W8).
    "uLightDir",
    "uLightColor",
    "uWetEdge",
    "uGranulation",
    "uImpasto",
    "uBrokenColor",
    "uCanvasGrain",
    // BG.W-AUR-METAL-FINISH — the metal-medium knobs (uMedium==8/9).
    "uMetalPolish",
    "uMetalHeightScale",
    "uNucleiDrift",
    "uPaletteDrift",
    "uBreathDepth",
    "uBreathPeriod",
    "uSaturation",
    "uPaperGrain",
    "uAlpha",
    // BD.W-AUR-VIVIDNESS — the §3 chroma-floor strength.
    "uVividness",
] as const;

export type UniformName = (typeof UNIFORM_NAMES)[number];

export type UniformLocations = Record<UniformName, WebGLUniformLocation | null>;

export interface GlProgram {
    program: WebGLProgram;
    vs: WebGLShader;
    fs: WebGLShader;
    uniforms: UniformLocations;
    geometry: { vao: WebGLVertexArrayObject; buf: WebGLBuffer };
}

/**
 * Compile + link the shader pair, build the full-screen triangle (one draw covers
 * the viewport), and resolve the uniform location cache. Leaves the program bound.
 */
export function createGlProgram(
    gl: WebGL2RenderingContext,
    vertexSrc: string,
    fragmentSrc: string,
): GlProgram {
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc, AURORA_LABEL);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc, AURORA_LABEL);
    const program = linkProgram(gl, vs, fs, AURORA_LABEL);
    gl.useProgram(program);

    // Full-screen triangle: covers the viewport with one draw.
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform location cache — one slot per UNIFORM_NAMES entry.
    const uniforms = {} as UniformLocations;
    for (const n of UNIFORM_NAMES) uniforms[n] = gl.getUniformLocation(program, n);

    return { program, vs, fs, uniforms, geometry: { vao, buf } };
}
