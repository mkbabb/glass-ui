// BB.W-VIZ-SUITE (W-CONCENTRIC) — the WebGL2 `setupGL` builder (the ~5-10%-tail path).
//
// A clean aurora-class fullscreen pass: compile the full-screen-triangle vertex + the
// `CONCENTRIC_FRAG_GLSL` fragment (which evaluates the SAME radial-Fourier field the WGSL
// primary does, splicing the SHARED GLSL color chunk), and on each `frame(t)` upload the
// uniform table (the SAME field/center/ring/palette data the WGPU uniform bridge packs,
// here as plain GL uniforms — concentric has no storage buffer, it is a pure fragment
// field, so the parity is `verified` not `degraded`). It owns NO scheduling — the canvas
// lifecycle leaf delivers the frame.

import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    CONCENTRIC_VERT_GLSL,
    CONCENTRIC_FRAG_GLSL,
} from "../shaders/concentric.glsl";
import {
    MAX_RINGS,
    MAX_CENTERS,
    MAX_RING_STOPS,
    renderModeToInt,
    type ConcentricConfig,
} from "../constants";
import type { RingCenter } from "./ringField";
import { CONCENTRIC_FIELD_NORM } from "./uniformBridgeWGPU";

export interface ConcentricGLSetupDeps {
    canvas: HTMLCanvasElement;
    config: ConcentricConfig;
    getPalette: () => OklchStop[];
    getCenters: () => RingCenter[];
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useConcentric advances the shared pointer field +
     * injects the transient cursor center here (the no-own-rAF discipline). ZERO own rAF.
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
    const { canvas, config, getPalette, getCenters, shouldContinue, onFrame } = deps;

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
        const uAxis = u("uAxis");
        const uFieldNorm = u("uFieldNorm");
        const uAspect = u("uAspect");
        const uCenterCount = u("uCenterCount");
        const uRingCount = u("uRingCount");
        const uStopCount = u("uStopCount");
        const uRenderMode = u("uRenderMode");
        const uHasBackground = u("uHasBackground");
        const uLine = u("uLine");
        const uBg = u("uBg");
        const uRings = u("uRings[0]");
        const uCenters = u("uCenters[0]");
        const uPalette = u("uPalette[0]");

        function resize(): void {
            const dpr = resolveBudgetDpr();
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const w = Math.max(1, Math.round(cssW * dpr));
            const h = Math.max(1, Math.round(cssH * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        function frame(timeSec: number): void {
            // Advance the shared pointer field + inject the transient cursor center (the
            // no-own-rAF discipline — the renderer's loop feeds the push-API).
            onFrame?.(timeSec);
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const aspect = cssW / Math.max(cssH, 1);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTime, timeSec);
            gl.uniform1f(uSpeed, config.speed);
            gl.uniform2f(uAxis, config.axisRatio[0], config.axisRatio[1]);
            gl.uniform1f(uFieldNorm, CONCENTRIC_FIELD_NORM);
            gl.uniform1f(uAspect, aspect);

            const centers = getCenters();
            const centerCount = Math.min(centers.length, MAX_CENTERS);
            const ringCount = Math.min(config.ringComponents.length, MAX_RINGS);
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_RING_STOPS);
            gl.uniform1i(uCenterCount, centerCount);
            gl.uniform1i(uRingCount, ringCount);
            gl.uniform1i(uStopCount, stopCount);
            gl.uniform1i(uRenderMode, renderModeToInt(config.renderMode));

            // line stroke geometry (field-distance units): half-width, AA softness, levels.
            gl.uniform3f(
                uLine,
                config.lineWidth,
                config.lineSoftness,
                config.contourLevels,
            );

            if (config.background === "transparent") {
                gl.uniform1f(uHasBackground, 0);
                gl.uniform3f(uBg, 0, 0, 0);
            } else {
                gl.uniform1f(uHasBackground, 1);
                const lin = oklchToLinear(config.background);
                gl.uniform3f(uBg, lin[0], lin[1], lin[2]);
            }

            const ringData = new Float32Array(MAX_RINGS * 3);
            for (let i = 0; i < MAX_RINGS; i++) {
                const r = config.ringComponents[i];
                ringData[i * 3 + 0] = r?.amplitude ?? 0;
                ringData[i * 3 + 1] = r?.wavelength ?? 1;
                ringData[i * 3 + 2] = r?.phase ?? 0;
            }
            gl.uniform3fv(uRings, ringData);

            const centerData = new Float32Array(MAX_CENTERS * 4);
            for (let i = 0; i < MAX_CENTERS; i++) {
                const c = centers[i];
                centerData[i * 4 + 0] = c?.x ?? 0;
                centerData[i * 4 + 1] = c?.y ?? 0;
                centerData[i * 4 + 2] = c?.weight ?? 0;
                centerData[i * 4 + 3] = c?.rotAlpha ?? 0;
            }
            gl.uniform4fv(uCenters, centerData);

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
