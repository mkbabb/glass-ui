// BC.W-VIZ-PAPERGRID — the WebGL2 `setupGL` builder (the ~5-10%-tail path).
//
// A clean aurora/concentric-class fullscreen pass: compile the full-screen-triangle vertex +
// the `PAPER_GRID_FRAG_GLSL` fragment (which evaluates the SAME liquid grid the WGSL primary
// does, splicing the SHARED `CURL_FBM_GLSL` curl chunk + the GLSL color OETF), and on each
// `frame(t)` upload the uniform table (the SAME field/warp/grid/cursor data the WGPU uniform
// bridge packs, here as plain GL uniforms — paper-grid has no storage buffer, it is a pure
// fragment field, so parity is `verified` not `degraded`). GPU, NOT a Canvas2D context. It
// owns NO scheduling — the canvas lifecycle leaf delivers the frame.

import type {
    WebGLCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgl/useWebGLCanvas";
import { oklchToLinear } from "../../../../composables/color";
import {
    PAPER_GRID_VERT_GLSL,
    PAPER_GRID_FRAG_GLSL,
} from "../shaders/paper-grid.glsl";
import type { PaperGridConfig } from "../constants";
import { gridScaleFor, type Vec2 } from "./paperGrid";

export interface PaperGridGLSetupDeps {
    canvas: HTMLCanvasElement;
    config: PaperGridConfig;
    getCursor: () => Vec2;
    /** The spring-eased traveling-wave envelope amplitude (0..1; PRM → 0). */
    getAmp: () => number;
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — usePaperGrid advances the shared pointer field + derives
     * the transient cursor here (the no-own-rAF discipline). ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`[PaperGrid] shader compile failed: ${log}`);
    }
    return sh;
}

/** Build the `setupGL(gl)` callback the `createGpuSubstrate` WebGL2 path invokes. */
export function createPaperGridGLSetup(
    deps: PaperGridGLSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getCursor, getAmp, shouldContinue, onFrame } = deps;

    return function setupGL(gl) {
        const vs = compile(gl, gl.VERTEX_SHADER, PAPER_GRID_VERT_GLSL);
        const fs = compile(gl, gl.FRAGMENT_SHADER, PAPER_GRID_FRAG_GLSL);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`[PaperGrid] link failed: ${gl.getProgramInfoLog(program)}`);
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        // Full-screen triangle (NDC corners covering the viewport, no index buffer).
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW,
        );
        const loc = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);

        const u = (name: string) => gl.getUniformLocation(program, name);
        const uTime = u("uTime");
        const uGridScale = u("uGridScale");
        const uMajorEvery = u("uMajorEvery");
        const uAspect = u("uAspect");
        const uGrid = u("uGrid");
        const uFieldAlpha = u("uFieldAlpha");
        const uHasBackground = u("uHasBackground");
        const uCursor = u("uCursor");
        const uBulgeMode = u("uBulgeMode");
        const uInteractive = u("uInteractive");
        const uWave = u("uWave");
        const uWave2 = u("uWave2");
        const uLineColor = u("uLineColor");
        const uBg = u("uBg");
        // The FACE (BD.W-PAPERGRID-FACE) — the height-lit filled cell interior.
        const uFace = u("uFace");
        const uLightDir = u("uLightDir");
        const uFaceLo = u("uFaceLo");
        const uFaceMid = u("uFaceMid");
        const uFaceHi = u("uFaceHi");

        // BG.W-VIZ-RESIZE-ADOPT — upload-only (the leaf sized the backing store).
        function resize(s?: BackingSize): void {
            gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
        }

        function frame(timeSec: number): void {
            // Advance the shared pointer field + derive the transient cursor (the no-own-rAF
            // discipline — the renderer's loop feeds the push-API).
            onFrame?.(timeSec);
            const aspect = canvas.width / Math.max(canvas.height, 1);
            const viewExtentPx = canvas.height || 1;
            const gridScale = gridScaleFor(viewExtentPx, config.cellSize);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTime, timeSec);
            gl.uniform1f(uGridScale, gridScale);
            gl.uniform1f(uMajorEvery, config.majorEvery);
            gl.uniform1f(uAspect, aspect);

            // The traveling-wave CELL-TWIST ride (mirrors the WGPU bridge — the C3 cure).
            gl.uniform4f(uWave, config.waveDir[0], config.waveDir[1], config.waveK, config.waveOmega);
            gl.uniform4f(uWave2, config.waveSigma, config.twistMax, config.shearMax, getAmp());
            gl.uniform1f(uInteractive, config.interactive ? 1 : 0);

            const minorPitchPx = Math.max(config.cellSize, 1);
            const targetWidth = config.lineWidth / minorPitchPx;
            const targetWidthMajor = (config.lineWidth * 1.6) / minorPitchPx;
            gl.uniform4f(uGrid, targetWidth, targetWidthMajor, config.minorAlpha, config.majorAlpha);

            gl.uniform1f(uFieldAlpha, config.fieldAlpha);

            const cursor = getCursor();
            gl.uniform4f(
                uCursor,
                cursor.x,
                cursor.y,
                config.bulgeStrength,
                config.bulgeRadius,
            );
            gl.uniform1f(uBulgeMode, config.bulgeMode === "attract" ? -1 : 1);

            const ink = oklchToLinear(config.lineColor);
            gl.uniform3f(uLineColor, ink[0], ink[1], ink[2]);

            // The FACE (BD.W-PAPERGRID-FACE): faceAlpha:0 default → the face evaporates →
            // byte-identical to the HEAD line-only render. The 3-stop warm-divergent ramp + the
            // cel key-light (FOLD A/B/D/E).
            gl.uniform4f(uFace, config.faceAlpha, config.faceRelief, config.squashK, config.baseInset);
            gl.uniform2f(uLightDir, config.lightDir[0], config.lightDir[1]);
            const fLo = oklchToLinear(config.faceWarmLo);
            const fMid = oklchToLinear(config.faceWarmMid);
            const fHi = oklchToLinear(config.faceWarmHi);
            gl.uniform3f(uFaceLo, fLo[0], fLo[1], fLo[2]);
            gl.uniform3f(uFaceMid, fMid[0], fMid[1], fMid[2]);
            gl.uniform3f(uFaceHi, fHi[0], fHi[1], fHi[2]);

            if (config.background === "transparent") {
                gl.uniform1f(uHasBackground, 0);
                gl.uniform3f(uBg, 0, 0, 0);
            } else {
                gl.uniform1f(uHasBackground, 1);
                const bg = oklchToLinear(config.background);
                gl.uniform3f(uBg, bg[0], bg[1], bg[2]);
            }

            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.bindVertexArray(null);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(program);
                gl.deleteVertexArray(vao);
                gl.deleteBuffer(buf);
            },
        };
    };
}
