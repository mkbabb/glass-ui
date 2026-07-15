// BI.W-FOURIER-RIBBON — the WebGL2 `setupGL` builder (the instanced-ribbon fallback tail).
//
// The fullscreen fragment SDF (the O(pixels×segments) loop) RETIRED onto instanced geometry
// (proof:viz-fourier-ribbon FB1). On each `frame(t)` the CPU steps the SAME `partialSumAt`
// math source into the curve-sample + chain-tip tables — the ONE evaluator the WGSL compute
// kernel transcribes — then ASSEMBLES the per-layer instance buffer (cel → epicycle → trail →
// head) and issues one `drawArraysInstanced` per layer. Each instance is a small capsule/AABB
// quad covering ONLY its own segment bbox (the vertex expands the unit quad), running the
// EXACT `segDist` over-composite the fullscreen loop ran — pixel-identical, O(covered_pixels).
// NO second math law; parity is `verified`. NEVER reached on a capable engine (Chrome/Safari
// ride the WGSL instanced primary). It owns NO scheduling — the canvas lifecycle leaf delivers
// the frame.

import type {
    WebGLCanvasFrame,
    BackingSize,
} from "../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../composables/color";
import { oklchToLinear } from "../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    FOURIER_FIELD_VERT_GLSL,
    FOURIER_FIELD_FRAG_GLSL,
} from "../shaders/fourier-field.glsl";
import {
    planRibbonLayers,
    RIBBON_LAYER_ID,
    RIBBON_QUAD_STRIP,
    RIBBON_QUAD_STRIP_VERTS,
    RIBBON_INSTANCE_FLOATS,
    type RibbonLayerKind,
} from "../shaders/fourier-field.ribbon";
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

/** The GL curve-sample count (the trail draws this − 1 capsule instances). */
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
    /**
     * BG.W-FOURIER-BEAUTY B3 — the 2-D cursor FOLLOW (model-space center lean). Mirrors the
     * WGSL arm exactly (both read the SAME uFit center) — parity-safe by construction.
     * `{x:0,y:0}` (ambient/PRM) is byte-identical to today.
     */
    getPointerLean?: () => { x: number; y: number };
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
    const getPointerLean = deps.getPointerLean;

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

        // ── VAO: the static unit-quad (divisor 0) + the per-frame instance buffer (divisor 1) ──
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const quadBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
        gl.bufferData(gl.ARRAY_BUFFER, RIBBON_QUAD_STRIP, gl.STATIC_DRAW);
        const aCorner = gl.getAttribLocation(program, "aCorner");
        gl.enableVertexAttribArray(aCorner);
        gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(aCorner, 0);

        // The instance buffer — one Float32Array holding all layers back-to-back, re-pointed
        // per layer by attribute byte offset (WebGL2 has no baseInstance).
        const MAX_INSTANCES =
            (GL_MAX_CURVE_SAMPLES - 1) * 2 + GL_MAX_PHASORS * 2 + 1; // cel-rope+trail, cel-arm+epi, head
        const instanceScratch = new Float32Array(MAX_INSTANCES * RIBBON_INSTANCE_FLOATS);
        const instBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
        gl.bufferData(gl.ARRAY_BUFFER, instanceScratch.byteLength, gl.DYNAMIC_DRAW);
        const STRIDE = RIBBON_INSTANCE_FLOATS * 4; // 32 bytes
        const aSeg = gl.getAttribLocation(program, "aSeg");
        const aData = gl.getAttribLocation(program, "aData");
        gl.enableVertexAttribArray(aSeg);
        gl.enableVertexAttribArray(aData);
        gl.vertexAttribPointer(aSeg, 4, gl.FLOAT, false, STRIDE, 0);
        gl.vertexAttribPointer(aData, 4, gl.FLOAT, false, STRIDE, 16);
        gl.vertexAttribDivisor(aSeg, 1);
        gl.vertexAttribDivisor(aData, 1);
        gl.bindVertexArray(null);

        const u = (name: string) => gl.getUniformLocation(program, name);
        const uFit = u("uFit");
        const uTrail = u("uTrail");
        const uEnv = u("uEnv");
        const uLoom = u("uLoom"); // FOURIER-LOOM §2b/§3b — (squashGain, celGain, _pad, _pad)
        const uLayer = u("uLayer");
        const uEdgeMargin = u("uEdgeMargin");
        const uStopCount = u("uStopCount");
        const uPalette = u("uPalette[0]");

        // Scratch — the CPU-stepped curve (x,y,age) + chain (x,y) tables (the SAME evaluator).
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

        // BG.W-VIZ-RESIZE-ADOPT — upload-only (the leaf sized the backing store).
        function resize(s?: BackingSize): void {
            gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
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

            // BG.W-VIZ-RESIZE-ADOPT — the box in CSS px derives from the LEAF-sized backing store.
            const aspect = canvas.width / Math.max(canvas.height, 1);
            const cssMin =
                Math.min(canvas.width, canvas.height) / Math.max(resolveBudgetDpr(), 1);
            const trailModel = trailWidthToModel(config.trailWidth, fit.scale, cssMin);
            const halfW = trailModel * 0.5;
            // The instanced-quad AA-feather slop (model units) padding each bbox (~6 CSS px).
            const edgeMargin = (6 * 2) / (Math.max(fit.scale, 1e-6) * Math.max(cssMin, 1));

            // The cel ink lags behind the travel: −T·halfW·1.4 (the SAME offset both engines use).
            const hx = curveData[0];
            const hy = curveData[1];
            const bx = curveData[3];
            const by = curveData[4];
            const dx = hx - bx;
            const dy = hy - by;
            const s = Math.hypot(dx, dy);
            const tx = s > 1e-4 ? dx / s : 1;
            const ty = s > 1e-4 ? dy / s : 0;
            const celOffX = -tx * halfW * 1.4;
            const celOffY = -ty * halfW * 1.4;

            // ── Assemble the per-layer instance buffer (draw order: cel → epicycle → trail → head) ──
            const layers = planRibbonLayers({
                sampleCount,
                armCount: armN,
                showEpicycles: config.showEpicycles,
                celGain: config.celGain,
            });
            const offsets = new Map<RibbonLayerKind, number>(); // start FLOAT index per layer
            let cursor = 0;
            const writeInst = (
                ax: number,
                ay: number,
                bx2: number,
                by2: number,
                age: number,
                strokeHalf: number,
                arg2: number,
            ): void => {
                instanceScratch[cursor++] = ax;
                instanceScratch[cursor++] = ay;
                instanceScratch[cursor++] = bx2;
                instanceScratch[cursor++] = by2;
                instanceScratch[cursor++] = age;
                instanceScratch[cursor++] = strokeHalf;
                instanceScratch[cursor++] = arg2;
                instanceScratch[cursor++] = 0;
            };
            for (const layer of layers) {
                offsets.set(layer.kind, cursor);
                if (layer.kind === "cel-rope") {
                    for (let i = 0; i < sampleCount - 1; i++) {
                        const o = i * 3;
                        writeInst(
                            curveData[o] + celOffX,
                            curveData[o + 1] + celOffY,
                            curveData[o + 3] + celOffX,
                            curveData[o + 4] + celOffY,
                            0,
                            halfW,
                            1.0,
                        );
                    }
                } else if (layer.kind === "cel-arm") {
                    for (let k = 0; k < armN; k++) {
                        const o = k * 2;
                        writeInst(
                            chainData[o] + celOffX,
                            chainData[o + 1] + celOffY,
                            chainData[o + 2] + celOffX,
                            chainData[o + 3] + celOffY,
                            0,
                            halfW * 0.55,
                            0.7,
                        );
                    }
                } else if (layer.kind === "epicycle") {
                    const segDenom = Math.max(armN - 1, 1);
                    for (let k = 0; k < armN; k++) {
                        const o = k * 2;
                        writeInst(
                            chainData[o],
                            chainData[o + 1],
                            chainData[o + 2],
                            chainData[o + 3],
                            0,
                            halfW,
                            k / segDenom,
                        );
                    }
                } else if (layer.kind === "trail") {
                    for (let i = 0; i < sampleCount - 1; i++) {
                        const o = i * 3;
                        const age = Math.max(curveData[o + 2], curveData[o + 5]);
                        writeInst(
                            curveData[o],
                            curveData[o + 1],
                            curveData[o + 3],
                            curveData[o + 4],
                            age,
                            halfW,
                            0,
                        );
                    }
                } else {
                    // head — one instance off curveSamples[0]/[1]
                    writeInst(
                        curveData[0],
                        curveData[1],
                        curveData[3],
                        curveData[4],
                        0,
                        halfW,
                        0,
                    );
                }
            }
            const totalFloats = cursor;

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
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Upload the assembled instance data.
            gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, instanceScratch.subarray(0, totalFloats));

            // BG.W-FOURIER-BEAUTY B3 — lean the fit CENTER toward the cursor (the 2-D follow);
            // ambient/PRM is {0,0} → byte-identical. The ONE uFit uniform carries it.
            const lean = getPointerLean?.() ?? { x: 0, y: 0 };
            gl.uniform4f(uFit, fit.centerX - lean.x, fit.centerY - lean.y, fit.scale, aspect);
            gl.uniform4f(uTrail, trailModel, PEAK_ALPHA, HEAD_GLOW_ALPHA, TRAIL_FADE_EXP);
            gl.uniform4f(
                uEnv,
                TRAIL_FLOOR,
                config.intensity,
                config.showEpicycles ? 1 : 0,
                config.rainbowChain ? 1 : 0,
            );
            gl.uniform4f(uLoom, config.squashGain, config.celGain, 0, 0);
            gl.uniform1f(uEdgeMargin, edgeMargin);
            gl.uniform1i(uStopCount, stopCount);
            gl.uniform3fv(uPalette, palData);

            // Draw each layer: re-point the instance attributes at the layer's byte offset, set
            // the layer id + blend, and issue one instanced draw over the quad.
            for (const layer of layers) {
                const startFloat = offsets.get(layer.kind) ?? 0;
                const byteOffset = startFloat * 4;
                gl.vertexAttribPointer(aSeg, 4, gl.FLOAT, false, STRIDE, byteOffset);
                gl.vertexAttribPointer(aData, 4, gl.FLOAT, false, STRIDE, byteOffset + 16);
                gl.uniform1i(uLayer, RIBBON_LAYER_ID[layer.kind]);
                if (layer.blend === "max") {
                    // FB5 — the epicycle-join seam fix: per-channel MAX → adjacent arms UNION.
                    gl.blendEquation(gl.MAX);
                    gl.blendFunc(gl.ONE, gl.ONE);
                } else {
                    gl.blendEquation(gl.FUNC_ADD);
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                }
                gl.drawArraysInstanced(
                    gl.TRIANGLE_STRIP,
                    0,
                    RIBBON_QUAD_STRIP_VERTS,
                    layer.instanceCount,
                );
            }
            // Restore the default add-blend equation for any subsequent GL user.
            gl.blendEquation(gl.FUNC_ADD);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(program);
                gl.deleteBuffer(quadBuf);
                gl.deleteBuffer(instBuf);
                gl.deleteVertexArray(vao);
            },
        };
    };
}
