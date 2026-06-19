// BC.W-VIZ-DOTFLOW — the lattice-buffer alloc + the two substrate-`setup` builders (the
// WGPU compute+render two-pass primary + the WebGL2 fullscreen-fragment fallback).
//
// `createFlowWGPUSetup` returns a `setupWGPU(device, ctx, format)` the `createGpuSubstrate`
// picker invokes on the WebGPU primary path. It builds: (1) the lattice STORAGE buffer
// (seeded once at the anchor origins), (2) the COMPUTE pipeline (the anchored-displacement
// + restoring-spring kernel), (3) the instanced-billboard RENDER pipeline, and (4) the two
// typed uniform buffers — then returns the substrate's per-frame hooks. Each `frame(t)`
// records ONE command encoder: a compute pass (dispatch `ceil(count/64)`) then a render
// pass (instanced draw of `6 × count` vertices) then submit.
//
// `createFlowGLSetup` returns the `setupGL(gl)` WebGL2 callback — a clean aurora-class
// fullscreen-fragment pass (the §4.2 retopology made the field fragment-friendly). The
// Canvas2D point-cloud is GONE — clean break. Both setups invoke `onFrame(t)` from inside
// their frame callback (the shared pointer field push-step — the no-own-rAF discipline).

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { FLOW_FIELD_COMPUTE_WGSL } from "../shaders/flow-field.compute.wgsl";
import { FLOW_FIELD_RENDER_WGSL } from "../shaders/flow-field.render.wgsl";
import {
    FLOW_FIELD_VERT_GLSL,
    FLOW_FIELD_FRAG_GLSL,
} from "../shaders/flow-field.glsl";
import type { FlowFieldConfig } from "../constants";
import { MAX_WAVE_COMPONENTS, MAX_FLOW_STOPS } from "../constants";
import {
    FLOW_PARTICLE_BYTES,
    FLOW_BASE_BRIGHT,
    FLOW_DOMAIN_HALF,
    createFlowComputeScratch,
    createFlowRenderScratch,
    flowGridGeometry,
    packFlowComputeUniforms,
    packFlowRenderUniforms,
    seedLatticeBuffer,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; `lib.dom` declares the TYPES
// not the VALUE namespaces — naming them keeps the call sites readable, mirroring the
// goo-blob wgpuSetup).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;
const SHADER_STAGE_COMPUTE = 0x4;

const WORKGROUP_SIZE = 64;

export interface FlowSetupDeps {
    canvas: HTMLCanvasElement;
    config: FlowFieldConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live palette edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useDotFlowField advances the shared
     * `usePointerVelocityField` here (the no-own-rAF discipline; the renderer's loop feeds
     * the push-API tick). ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
}

/** A px-min reader (the lattice density rides the min CSS dimension). */
function cssMin(canvas: HTMLCanvasElement): number {
    return Math.min(canvas.clientWidth || 320, canvas.clientHeight || 320);
}

/**
 * Build the dot-flow-field `setupWGPU(device, context, format)` callback. Closes over the
 * config/palette getters + the renderer's demand gate + the pointer `onFrame` hook.
 */
export function createFlowWGPUSetup(
    deps: FlowSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame } = deps;

    return function setupWGPU(device, context, format) {
        // Resolve the lattice geometry ONCE at setup (off the mount-time canvas size); the
        // storage buffer is sized to it (a resize re-uses the same lattice — the dots just
        // re-distribute over the new aspect).
        let geometry = flowGridGeometry(config.gridPitch, cssMin(canvas));

        const computeModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.compute.wgsl",
            code: FLOW_FIELD_COMPUTE_WGSL,
        });
        const renderModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.render.wgsl",
            code: FLOW_FIELD_RENDER_WGSL,
        });

        // The lattice storage buffer (seeded once at the anchor origins; pulled to its
        // sub-cell displacement target each compute pass — NO advection, NO re-seed).
        const seed = seedLatticeBuffer(geometry);
        const particleBuffer = device.createBuffer({
            label: "[DotFlowField] lattice",
            size: geometry.count * FLOW_PARTICLE_BYTES,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
            mappedAtCreation: true,
        });
        new Float32Array(particleBuffer.getMappedRange()).set(seed);
        particleBuffer.unmap();

        const computeUniform = device.createBuffer({
            label: "[DotFlowField] compute-uniforms",
            size: createFlowComputeScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });
        const renderUniform = device.createBuffer({
            label: "[DotFlowField] render-uniforms",
            size: createFlowRenderScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const computeBGL = device.createBindGroupLayout({
            label: "[DotFlowField] compute-bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_COMPUTE,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_COMPUTE,
                    buffer: { type: "storage" },
                },
            ],
        });
        const computePipeline = device.createComputePipeline({
            label: "[DotFlowField] compute-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [computeBGL] }),
            compute: { module: computeModule, entryPoint: "cs_main" },
        });
        const computeBindGroup = device.createBindGroup({
            label: "[DotFlowField] compute-bg",
            layout: computeBGL,
            entries: [
                { binding: 0, resource: { buffer: computeUniform } },
                { binding: 1, resource: { buffer: particleBuffer } },
            ],
        });

        const renderBGL = device.createBindGroupLayout({
            label: "[DotFlowField] render-bgl",
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
        const renderPipeline = device.createRenderPipeline({
            label: "[DotFlowField] render-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [renderBGL] }),
            vertex: { module: renderModule, entryPoint: "vs_main" },
            fragment: {
                module: renderModule,
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
        const renderBindGroup = device.createBindGroup({
            label: "[DotFlowField] render-bg",
            layout: renderBGL,
            entries: [
                { binding: 0, resource: { buffer: renderUniform } },
                { binding: 1, resource: { buffer: particleBuffer } },
            ],
        });

        const computeScratch = createFlowComputeScratch();
        const renderScratch = createFlowRenderScratch();
        let lastTime = -1;

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
            // Re-resolve the lattice geometry for the new min dimension (the buffer is
            // already sized to the mount-time count; we keep `count` ≤ the seed count).
            const g = flowGridGeometry(config.gridPitch, cssMin(canvas));
            geometry = { ...g, count: Math.min(g.count, seed.length / 4) };
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const dt =
                lastTime < 0 ? 0 : Math.min(Math.max(timeSec - lastTime, 0), 0.05);
            lastTime = timeSec;

            const aspect =
                (canvas.clientWidth || 320) / Math.max(canvas.clientHeight || 320, 1);

            packFlowComputeUniforms(computeScratch, config, timeSec, dt, geometry);
            device.queue.writeBuffer(computeUniform, 0, computeScratch.buffer);

            packFlowRenderUniforms(
                renderScratch,
                config,
                timeSec,
                aspect,
                cssMin(canvas),
                geometry,
                getPalette(),
            );
            device.queue.writeBuffer(renderUniform, 0, renderScratch.buffer);

            const dispatchX = Math.ceil(geometry.count / WORKGROUP_SIZE);
            const encoder = device.createCommandEncoder({
                label: "[DotFlowField] frame",
            });
            const cpass = encoder.beginComputePass();
            cpass.setPipeline(computePipeline);
            cpass.setBindGroup(0, computeBindGroup);
            cpass.dispatchWorkgroups(dispatchX);
            cpass.end();

            const view = context.getCurrentTexture().createView();
            const rpass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view,
                        clearValue: { r: 0, g: 0, b: 0, a: 0 },
                        loadOp: "clear",
                        storeOp: "store",
                    },
                ],
            });
            rpass.setPipeline(renderPipeline);
            rpass.setBindGroup(0, renderBindGroup);
            rpass.draw(6, geometry.count, 0, 0); // 6 verts (quad) × N instances
            rpass.end();
            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                particleBuffer.destroy();
                computeUniform.destroy();
                renderUniform.destroy();
            },
        };
    };
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
        throw new Error(`[DotFlowField] shader compile failed: ${log}`);
    }
    return sh;
}

/**
 * Build the `setupGL(gl)` callback the `createGpuSubstrate` WebGL2 path invokes — a clean
 * aurora-class fullscreen fragment pass (the retopology made the dot-lattice + brightness
 * model fragment-friendly; the Canvas2D point-cloud is GONE, clean break). It evaluates
 * the SAME `flowField.ts` height/displacement field the WGSL primary does, splicing the
 * SHARED GLSL color chunk (the ONE color source → no drift between the two backends).
 */
export function createFlowGLSetup(
    deps: FlowSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame } = deps;

    return function setupGL(gl) {
        const vs = compileGL(gl, gl.VERTEX_SHADER, FLOW_FIELD_VERT_GLSL);
        const fs = compileGL(gl, gl.FRAGMENT_SHADER, FLOW_FIELD_FRAG_GLSL);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(
                `[DotFlowField] link failed: ${gl.getProgramInfoLog(program)}`,
            );
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
        const uTime = u("uTime");
        const uWindSpeed = u("uWindSpeed");
        const uCurlStrength = u("uCurlStrength");
        const uDomainHalf = u("uDomainHalf");
        const uAspect = u("uAspect");
        const uGridPitchDomain = u("uGridPitchDomain");
        const uDotRadiusDomain = u("uDotRadiusDomain");
        const uDisplaceAmp = u("uDisplaceAmp");
        const uContrast = u("uContrast");
        const uBaseBright = u("uBaseBright");
        const uWaveBandCenter = u("uWaveBandCenter");
        const uWaveBandWidth = u("uWaveBandWidth");
        const uGlobeMask = u("uGlobeMask");
        const uWaveCount = u("uWaveCount");
        const uStopCount = u("uStopCount");
        const uHasBackground = u("uHasBackground");
        const uBg = u("uBg");
        const uWaves = u("uWaves[0]");
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
            const min = cssMin(canvas);
            const aspect =
                (canvas.clientWidth || 320) / Math.max(canvas.clientHeight || 320, 1);
            const geometry = flowGridGeometry(config.gridPitch, min);
            const pxPerDomain = min / (2 * FLOW_DOMAIN_HALF);
            const dotRadiusDomain = config.dotSize / Math.max(pxPerDomain, 1e-4);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTime, timeSec);
            gl.uniform1f(uWindSpeed, config.windSpeed);
            gl.uniform1f(uCurlStrength, config.curlStrength);
            gl.uniform1f(uDomainHalf, FLOW_DOMAIN_HALF);
            gl.uniform1f(uAspect, aspect);
            gl.uniform1f(uGridPitchDomain, geometry.pitchDomain);
            gl.uniform1f(uDotRadiusDomain, dotRadiusDomain);
            gl.uniform1f(uDisplaceAmp, config.displaceAmp);
            gl.uniform1f(uContrast, config.contrast);
            gl.uniform1f(uBaseBright, FLOW_BASE_BRIGHT);
            gl.uniform1f(uWaveBandCenter, config.waveBandCenter);
            gl.uniform1f(uWaveBandWidth, config.waveBandWidth);
            gl.uniform1f(uGlobeMask, config.globeMask ? 1 : 0);

            const waveCount = Math.min(
                config.waveComponents.length,
                MAX_WAVE_COMPONENTS,
            );
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
            gl.uniform1i(uWaveCount, waveCount);
            gl.uniform1i(uStopCount, stopCount);

            if (config.background === "transparent") {
                gl.uniform1f(uHasBackground, 0);
                gl.uniform3f(uBg, 0, 0, 0);
            } else {
                gl.uniform1f(uHasBackground, 1);
                const lin = oklchToLinear(config.background);
                gl.uniform3f(uBg, lin[0], lin[1], lin[2]);
            }

            const waveData = new Float32Array(MAX_WAVE_COMPONENTS * 4);
            for (let i = 0; i < MAX_WAVE_COMPONENTS; i++) {
                const w = config.waveComponents[i];
                waveData[i * 4 + 0] = w?.amplitude ?? 0;
                waveData[i * 4 + 1] = w?.wavelength ?? 1;
                waveData[i * 4 + 2] = w?.direction ?? 0;
                waveData[i * 4 + 3] = w?.phase ?? 0;
            }
            gl.uniform4fv(uWaves, waveData);

            const palData = new Float32Array(MAX_FLOW_STOPS * 3);
            for (let i = 0; i < MAX_FLOW_STOPS; i++) {
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
