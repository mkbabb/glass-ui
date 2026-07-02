// BD.W-CONCENTRIC-RELIEF — the WebGL2 `setupGL` builder (the ~5-10%-tail path, and Safari).
//
// A clean aurora-class fullscreen pass: compile the full-screen-triangle vertex + the
// `CONCENTRIC_FRAG_GLSL` fragment (which evaluates the SAME level-set topography + opaque
// finishing layer the WGSL primary does, splicing the SHARED GLSL color chunk), and on each
// `frame(t)` upload the uniform table (the SAME field/topo/tune/palette data the WGPU uniform
// bridge packs, here as plain GL uniforms — concentric has no storage buffer, it is a pure
// fragment field, so the parity is `verified` not `degraded`). It owns NO scheduling — the
// canvas lifecycle leaf delivers the frame.

import type {
    WebGLCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import {
    CONCENTRIC_VERT_GLSL,
    CONCENTRIC_FRAG_GLSL,
} from "../shaders/concentric.glsl";
import {
    MAX_RING_STOPS,
    type ConcentricConfig,
} from "../constants";
import type { Vec2 } from "./levelField";
import { CONCENTRIC_FIELD_NORM } from "./uniformBridgeWGPU";

export interface ConcentricGLSetupDeps {
    canvas: HTMLCanvasElement;
    config: ConcentricConfig;
    getPalette: () => OklchStop[];
    /** The pointer in DOMAIN space (the cursor gravity well) — re-read each frame. */
    getCursor: () => Vec2;
    /** The spring-eased traveling-wave envelope amplitude (0..1; PRM → 0). */
    getAmp: () => number;
    /** The velocity-HEAVE multiplier on the cursor well (1.0 at rest → grows with speed). */
    getWellScale: () => number;
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useConcentric advances the shared pointer field +
     * derives the cursor in domain space here (the no-own-rAF discipline). ZERO own rAF.
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
        throw new Error(`[Concentric] shader compile failed: ${log}`);
    }
    return sh;
}

/** Build the `setupGL(gl)` callback the `createGpuSubstrate` WebGL2 path invokes. */
export function createConcentricGLSetup(
    deps: ConcentricGLSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getPalette, getCursor, getAmp, getWellScale, shouldContinue, onFrame } = deps;

    return function setupGL(gl) {
        const vs = compile(gl, gl.VERTEX_SHADER, CONCENTRIC_VERT_GLSL);
        const fs = compile(gl, gl.FRAGMENT_SHADER, CONCENTRIC_FRAG_GLSL);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`[Concentric] link failed: ${gl.getProgramInfoLog(program)}`);
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
        const uSpeed = u("uSpeed");
        const uCellSize = u("uCellSize");
        const uFieldNorm = u("uFieldNorm");
        const uAspect = u("uAspect");
        const uStopCount = u("uStopCount");
        const uHasBackground = u("uHasBackground");
        const uLine = u("uLine");
        const uLightDir = u("uLightDir");
        const uBg = u("uBg");
        const uWave = u("uWave");
        const uWave2 = u("uWave2");
        const uTopo = u("uTopo");
        const uCursor = u("uCursor");
        const uTune = u("uTune");
        const uPalette = u("uPalette[0]");

        // BG.W-VIZ-RESIZE-ADOPT — upload-only (the leaf sized the backing store).
        function resize(s?: BackingSize): void {
            gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
        }

        function frame(timeSec: number): void {
            // Advance the shared pointer field + inject the transient cursor center (the
            // no-own-rAF discipline — the renderer's loop feeds the push-API).
            onFrame?.(timeSec);
            const aspect = canvas.width / Math.max(canvas.height, 1);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTime, timeSec);
            gl.uniform1f(uSpeed, config.speed);
            gl.uniform1f(uCellSize, config.cellSize);
            gl.uniform1f(uFieldNorm, CONCENTRIC_FIELD_NORM);
            gl.uniform1f(uAspect, aspect);

            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_RING_STOPS);
            gl.uniform1i(uStopCount, stopCount);

            // line stroke geometry (px units): half-width, AA softness, contour levels, index stride.
            gl.uniform4f(
                uLine,
                config.lineWidth,
                config.lineSoftness,
                config.contourLevels,
                config.indexEvery,
            );
            gl.uniform2f(uLightDir, config.lightDir[0], config.lightDir[1]);

            // the traveling-wave CELL-WARP + the topography + the cursor gravity well (velocity-HEAVED).
            gl.uniform4f(uWave, config.waveDir[0], config.waveDir[1], config.waveK, config.waveOmega);
            gl.uniform4f(uWave2, config.waveSigma, config.twistMax, config.shearMax, getAmp());
            gl.uniform4f(uTopo, config.heightOctaves, config.heightSeed, config.swellAmp, config.perturbAmp);
            const cursor = getCursor();
            gl.uniform4f(uCursor, cursor.x, cursor.y, config.cursorWell * getWellScale(), config.interactive ? 1 : 0);

            // the finishing-layer tunables (tone gain, hillshade depth, index multiplier, ink darken).
            gl.uniform4f(uTune, config.toneGain, config.shadeAmp, config.indexMul, config.inkDarken);

            if (config.background === "transparent") {
                gl.uniform1f(uHasBackground, 0);
                gl.uniform3f(uBg, 0, 0, 0);
            } else {
                gl.uniform1f(uHasBackground, 1);
                const lin = oklchToLinear(config.background);
                gl.uniform3f(uBg, lin[0], lin[1], lin[2]);
            }

            const palData = new Float32Array(MAX_RING_STOPS * 3);
            for (let i = 0; i < MAX_RING_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }
            gl.uniform3fv(uPalette, palData);

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
