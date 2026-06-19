// BC.W-VIZ-FOURIER — the WebGL2 `setupGL` builder (the genuinely-absent-tail path).
//
// A clean fullscreen fragment pass: compile the full-screen-triangle vertex + the
// `FOURIER_FIELD_FRAG_GLSL` fragment (the SDF twin of the WGSL render pass, splicing the
// SHARED GLSL color chunk). On each `frame(t)` the CPU steps the SAME `partialSumAt`/
// `positionsAt` math source — the ONE evaluator the WGSL compute kernel transcribes — into
// the curve-sample + chain-tip uniform arrays, then uploads + draws. NO second math law;
// parity is `verified` (the same SDF over the same evaluator). NEVER reached on a capable
// engine. It owns NO scheduling — the canvas lifecycle leaf delivers the frame.

import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    FOURIER_FIELD_VERT_GLSL,
    FOURIER_FIELD_FRAG_GLSL,
} from "../shaders/fourier-field.glsl";
import {
    MAX_FOURIER_STOPS,
    type FourierFieldConfig,
} from "../constants";
import { partialSumAt, type BasisComponent } from "../math";
import {
    computeFourierFit,
    trailWidthToModel,
    type FourierFit,
} from "./uniformBridgeWGPU";

/** The GL uniform-array curve cap (kept under typical GL uniform limits). */
const GL_MAX_CURVE_SAMPLES = 256;
const GL_MAX_PHASORS = 64;
const PEAK_ALPHA = 0.92;
const HEAD_GLOW_ALPHA = 0.95;
const TRAIL_FADE_EXP = 1.35;
const TRAIL_FLOOR = 0.34;

export interface FourierGLSetupDeps {
    canvas: HTMLCanvasElement;
    config: FourierFieldConfig;
    getSpectrum: () => readonly BasisComponent[];
    getPalette: () => OklchStop[];
    getHeadT: () => number;
    shouldContinue: () => boolean;
    onFrame?: (timeSec: number) => void;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`[FourierField] shader compile failed: ${log}`);
    }
    return sh;
}

/** Build the `setupGL(gl)` callback the `createGpuSubstrate` WebGL2 path invokes. */
export function createFourierGLSetup(
    deps: FourierGLSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getSpectrum, getPalette, getHeadT, shouldContinue, onFrame } =
        deps;

    return function setupGL(gl) {
        const vs = compile(gl, gl.VERTEX_SHADER, FOURIER_FIELD_VERT_GLSL);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FOURIER_FIELD_FRAG_GLSL);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`[FourierField] link failed: ${gl.getProgramInfoLog(program)}`);
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);

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
        const uFit = u("uFit");
        const uTrail = u("uTrail");
        const uEnv = u("uEnv");
        const uSampleCount = u("uSampleCount");
        const uArmCount = u("uArmCount");
        const uStopCount = u("uStopCount");
        const uPalette = u("uPalette[0]");
        const uCurve = u("uCurve[0]");
        const uChain = u("uChain[0]");

        // Scratch arrays (vec3 curve = x,y,age; vec2 chain = x,y).
        const curveData = new Float32Array(GL_MAX_CURVE_SAMPLES * 3);
        const chainData = new Float32Array((GL_MAX_PHASORS + 1) * 2);
        const palData = new Float32Array(MAX_FOURIER_STOPS * 3);

        let activeSpectrum: readonly BasisComponent[] | null = null;
        let fit: FourierFit = { centerX: 0, centerY: 0, scale: 1 };
        let phasorCount = 0;

        function syncSpectrum(): void {
            const spectrum = getSpectrum();
            if (spectrum === activeSpectrum) return;
            activeSpectrum = spectrum;
            phasorCount = Math.min(spectrum.length, GL_MAX_PHASORS);
            fit = computeFourierFit(spectrum);
        }

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
            onFrame?.(timeSec);
            syncSpectrum();
            const spectrum = activeSpectrum as BasisComponent[] | null;
            if (!spectrum) return;

            const headT = getHeadT();
            const harmonicN = Math.max(
                1,
                Math.min(Math.round(config.harmonics), phasorCount),
            );
            const armN = config.showEpicycles
                ? Math.max(1, Math.min(Math.round(config.epicycleArms), harmonicN))
                : 0;
            const sampleCount = GL_MAX_CURVE_SAMPLES;
            const denom = Math.max(sampleCount - 1, 1);

            // Step the comet curve (the SAME partialSumAt the WGSL transcribes).
            for (let i = 0; i < sampleCount; i++) {
                const frac = i / denom; // 0 = head, 1 = tail
                const age = 1 - frac;
                let t = headT - config.trailArc * frac;
                t -= Math.floor(t);
                const [x, y] = partialSumAt(spectrum, t, harmonicN);
                const o = i * 3;
                curveData[o + 0] = x;
                curveData[o + 1] = y;
                curveData[o + 2] = age;
            }
            // Step the epicycle chain tips (positionsAt read at the running tip = partialSumAt(t,k)).
            const armLim = Math.min(armN, harmonicN);
            for (let k = 0; k <= GL_MAX_PHASORS; k++) {
                const o = k * 2;
                if (k <= armLim) {
                    const [x, y] = partialSumAt(spectrum, headT, k);
                    chainData[o + 0] = x;
                    chainData[o + 1] = y;
                } else {
                    chainData[o + 0] = 0;
                    chainData[o + 1] = 0;
                }
            }

            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const cssMin = Math.min(cssW, cssH);
            const aspect = cssW / Math.max(cssH, 1);
            const trailModel = trailWidthToModel(config.trailWidth, fit.scale, cssMin);
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_FOURIER_STOPS);
            for (let i = 0; i < MAX_FOURIER_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform4f(uFit, fit.centerX, fit.centerY, fit.scale, aspect);
            gl.uniform4f(
                uTrail,
                trailModel,
                PEAK_ALPHA,
                HEAD_GLOW_ALPHA,
                TRAIL_FADE_EXP,
            );
            gl.uniform4f(
                uEnv,
                TRAIL_FLOOR,
                config.intensity,
                config.showEpicycles ? 1 : 0,
                config.rainbowChain ? 1 : 0,
            );
            gl.uniform1i(uSampleCount, sampleCount);
            gl.uniform1i(uArmCount, armN);
            gl.uniform1i(uStopCount, stopCount);
            gl.uniform3fv(uPalette, palData);
            gl.uniform3fv(uCurve, curveData);
            gl.uniform2fv(uChain, chainData);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(program);
                gl.deleteBuffer(buf);
                gl.deleteVertexArray(vao);
            },
        };
    };
}
