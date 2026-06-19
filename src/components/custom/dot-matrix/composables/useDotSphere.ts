// BC.W-VIZ-DOTMATRIX — the static dots-buffer alloc + the two substrate-`setup` builders
// (the WGPU instanced-billboard primary + the WebGL2 instanced-billboard fallback).
//
// NO compute pass — the phyllotaxis layout is closed-form (the dots never move relative to
// each other; only the spin matrix + the depth-fade are per-frame). ONE render pass over
// the STATIC `dots` buffer + a small per-frame uniform block.
//
// `createDotWGPUSetup` returns a `setupWGPU(device, ctx, format)` the `createGpuSubstrate`
// picker invokes on the WebGPU primary path. It builds: (1) the dots STORAGE buffer
// (seeded ONCE with the JS phyllotaxis positions), (2) the instanced-billboard RENDER
// pipeline, (3) the typed uniform buffer — then returns the substrate's per-frame hooks.
// Each `frame(t)` writes the spin/pointer/breath uniforms then records ONE render pass
// (instanced draw of `6 × N`).
//
// `createDotGLSetup` returns the `setupGL(gl)` WebGL2 callback — the SAME instanced
// billboards via `gl_VertexID`/`gl_InstanceID` + `gl.drawArraysInstanced`. No Canvas2D
// anywhere (§E). Both setups invoke `onFrame(t)` from inside their frame callback (the
// shared pointer field push-step — the no-own-rAF discipline).

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { DOT_MATRIX_WGSL } from "../shaders/dot-matrix.wgsl";
import {
    DOT_MATRIX_VERT_GLSL,
    DOT_MATRIX_FRAG_GLSL,
} from "../shaders/dot-matrix.glsl";
import { MAX_DOT_STOPS, type DotMatrixConfig } from "../constants";
import { breathRadius, spinMatrix } from "./dotMatrixField";
import {
    DOT_BYTES,
    SPHERE2_OFFSET,
    SPHERE2_SCALE,
    buildDotsBuffer,
    createDotRenderScratch,
    dotInstanceCount,
    packDotRenderUniforms,
    restingPointer,
    type DotPointerState,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (lib.dom declares the TYPES not the VALUE namespaces).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;

export interface DotSetupDeps {
    canvas: HTMLCanvasElement;
    config: DotMatrixConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame. */
    getPalette: () => OklchStop[];
    /** The live transient pointer state (the interactive parallax/dimple/bloom). */
    pointer: DotPointerState;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /** The per-frame pointer hook — advances the shared field (the no-own-rAF discipline). */
    onFrame?: (timeSec: number) => void;
}

function resolutionPx(canvas: HTMLCanvasElement): { w: number; h: number } {
    return { w: canvas.width || 1, h: canvas.height || 1 };
}

/** Build the dot-matrix `setupWGPU(device, context, format)` callback. */
export function createDotWGPUSetup(
    deps: DotSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, pointer, shouldContinue, onFrame } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[DotMatrix] dot-matrix.wgsl",
            code: DOT_MATRIX_WGSL,
        });

        // The STATIC dots buffer (the JS phyllotaxis positions, seeded ONCE).
        const dots = buildDotsBuffer(config);
        const instanceCount = dotInstanceCount(config);
        const dotsBuffer = device.createBuffer({
            label: "[DotMatrix] dots",
            size: instanceCount * DOT_BYTES,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
            mappedAtCreation: true,
        });
        new Float32Array(dotsBuffer.getMappedRange()).set(dots);
        dotsBuffer.unmap();

        const renderUniform = device.createBuffer({
            label: "[DotMatrix] render-uniforms",
            size: createDotRenderScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bgl = device.createBindGroupLayout({
            label: "[DotMatrix] bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_VERTEX,
                    buffer: { type: "read-only-storage" },
                },
            ],
        });
        const pipeline = device.createRenderPipeline({
            label: "[DotMatrix] render-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
            vertex: { module, entryPoint: "vs_main" },
            fragment: {
                module,
                entryPoint: "fs_main",
                targets: [
                    {
                        format,
                        blend: {
                            color: {
                                srcFactor: "one",
                                dstFactor: "one-minus-src-alpha",
                                operation: "add",
                            },
                            alpha: {
                                srcFactor: "one",
                                dstFactor: "one-minus-src-alpha",
                                operation: "add",
                            },
                        },
                    },
                ],
            },
            primitive: { topology: "triangle-list" },
        });
        const bindGroup = device.createBindGroup({
            label: "[DotMatrix] bg",
            layout: bgl,
            entries: [
                { binding: 0, resource: { buffer: renderUniform } },
                { binding: 1, resource: { buffer: dotsBuffer } },
            ],
        });

        const scratch = createDotRenderScratch();

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
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const dpr = resolveBudgetDpr();
            const breath = breathRadius(timeSec, config.breathing, 0.6);
            packDotRenderUniforms(
                scratch,
                config,
                timeSec,
                resolutionPx(canvas),
                dpr,
                pointer,
                breath,
                getPalette(),
            );
            device.queue.writeBuffer(renderUniform, 0, scratch.buffer);

            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: "[DotMatrix] frame" });
            const rpass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view,
                        clearValue: bgClear(config),
                        loadOp: "clear",
                        storeOp: "store",
                    },
                ],
            });
            rpass.setPipeline(pipeline);
            rpass.setBindGroup(0, bindGroup);
            rpass.draw(6, instanceCount, 0, 0); // 6 verts (quad) × N instances
            rpass.end();
            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                dotsBuffer.destroy();
                renderUniform.destroy();
            },
        };
    };
}

/** The WebGPU clear value (the near-black demo ground, or transparent). */
function bgClear(config: DotMatrixConfig): GPUColor {
    if (config.background === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
    const lin = oklchToLinear(config.background);
    return { r: lin[0], g: lin[1], b: lin[2], a: 1 };
}

function compileGL(
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
        throw new Error(`[DotMatrix] shader compile failed: ${log}`);
    }
    return sh;
}

/**
 * Build the `setupGL(gl)` callback the `createGpuSubstrate` WebGL2 path invokes — the SAME
 * instanced billboards via `gl.drawArraysInstanced`. It seeds the SAME JS phyllotaxis dot
 * buffer the WGSL primary uses + splices the SHARED GLSL color chunk (the ONE color source
 * → no drift between backends). No Canvas2D anywhere (§E).
 */
export function createDotGLSetup(
    deps: DotSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getPalette, pointer, shouldContinue, onFrame } = deps;

    return function setupGL(gl) {
        const vs = compileGL(gl, gl.VERTEX_SHADER, DOT_MATRIX_VERT_GLSL);
        const fs = compileGL(gl, gl.FRAGMENT_SHADER, DOT_MATRIX_FRAG_GLSL);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(
                `[DotMatrix] link failed: ${gl.getProgramInfoLog(program)}`,
            );
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        const dots = buildDotsBuffer(config);
        const instanceCount = dotInstanceCount(config);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        // The static quad corners (6 verts: two triangles).
        const cornerBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1, 1, -1, -1, 1,
                -1, 1, 1, -1, 1, 1,
            ]),
            gl.STATIC_DRAW,
        );
        const cornerLoc = gl.getAttribLocation(program, "aCorner");
        gl.enableVertexAttribArray(cornerLoc);
        gl.vertexAttribPointer(cornerLoc, 2, gl.FLOAT, false, 0, 0);

        // The instanced per-dot data (unitPos.xyz, sphereIdx) — divisor 1.
        const dotBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, dotBuf);
        gl.bufferData(gl.ARRAY_BUFFER, dots, gl.STATIC_DRAW);
        const dotLoc = gl.getAttribLocation(program, "aDot");
        gl.enableVertexAttribArray(dotLoc);
        gl.vertexAttribPointer(dotLoc, 4, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(dotLoc, 1);
        gl.bindVertexArray(null);

        const u = (name: string) => gl.getUniformLocation(program, name);
        const uU0 = u("uU0");
        const uU1 = u("uU1");
        const uU2 = u("uU2");
        const uU3 = u("uU3");
        const uU4 = u("uU4");
        const uU5 = u("uU5");
        const uSpin = u("uSpin");
        const uBg = u("uBg");
        const uStopCount = u("uStopCount");
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
            onFrame?.(timeSec);
            const dpr = resolveBudgetDpr();
            const resW = canvas.width || 1;
            const resH = canvas.height || 1;
            const resMin = Math.min(resW, resH) || 1;
            const aspect = resW / Math.max(resH, 1);
            const breath = breathRadius(timeSec, config.breathing, 0.6);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            if (config.background === "transparent") {
                gl.clearColor(0, 0, 0, 0);
            } else {
                const lin = oklchToLinear(config.background);
                gl.clearColor(lin[0], lin[1], lin[2], 1);
            }
            gl.clear(gl.COLOR_BUFFER_BIT);

            const dotSizeNdc = (config.dotSize * dpr * 2) / resMin;
            gl.uniform4f(uU0, resW, resH, dpr, timeSec);
            gl.uniform4f(uU1, config.radius, dotSizeNdc, config.baseOpacity, aspect);
            gl.uniform4f(uU2, 0.15, 0.85 * config.depthFade, 0.6, 0.4);
            gl.uniform4f(uU3, config.parallax, pointer.push, pointer.bloom, pointer.active);
            gl.uniform4f(uU4, pointer.x, pointer.y, SPHERE2_SCALE, breath);
            gl.uniform4f(
                uU5,
                SPHERE2_OFFSET.x,
                SPHERE2_OFFSET.y,
                config.background === "transparent" ? 0 : 1,
                0,
            );

            // The spin matrix (column-major for the GLSL mat3 uniform — same columns).
            const m = spinMatrix(
                timeSec,
                (config.axisTilt * Math.PI) / 180,
                config.rotationSpeed,
            );
            gl.uniformMatrix3fv(uSpin, false, [
                m[0], m[3], m[6],
                m[1], m[4], m[7],
                m[2], m[5], m[8],
            ]);

            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_DOT_STOPS);
            gl.uniform1i(uStopCount, stopCount);
            if (config.background === "transparent") {
                gl.uniform4f(uBg, 0, 0, 0, 0);
            } else {
                const lin = oklchToLinear(config.background);
                gl.uniform4f(uBg, lin[0], lin[1], lin[2], 1);
            }

            const palData = new Float32Array(MAX_DOT_STOPS * 3);
            for (let i = 0; i < MAX_DOT_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }
            gl.uniform3fv(uPalette, palData);

            gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount);
            gl.bindVertexArray(null);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(program);
                gl.deleteVertexArray(vao);
                gl.deleteBuffer(cornerBuf);
                gl.deleteBuffer(dotBuf);
            },
        };
    };
}

export { restingPointer };
