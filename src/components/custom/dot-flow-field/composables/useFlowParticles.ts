// BB.W-VIZ-SUITE (W-FLOWFIELD) — the particle-buffer alloc + the two substrate-`setup`
// builders (the WGPU compute+render two-pass primary + the Canvas2D fallback).
//
// `createFlowWGPUSetup` returns a `setupWGPU(device, ctx, format)` the `createGpuSubstrate`
// picker invokes on the WebGPU primary path. It builds: (1) the particle STORAGE buffer
// (seeded once), (2) the COMPUTE pipeline (the curl-noise advection kernel over the
// storage buffer), (3) the instanced-billboard RENDER pipeline, and (4) the two typed
// uniform buffers — then returns the substrate's per-frame hooks. Each `frame(t)` records
// ONE command encoder: a compute pass (dispatch `ceil(count/64)`) then a render pass
// (instanced draw of `6 × count` vertices over the navy clear) then submit.
//
// `createFlowGLSetup` returns the `setupGL(gl)` WebGL2 callback — but per the §3a
// Triumvirate the WebGL2 path is the CPU-stepped Canvas2D point cloud (the fourier /
// constellation precedent), NOT transform-feedback. It is a thin shim: the renderer hands
// the substrate the Canvas2D stepper from `flow-field.glsl.ts`. (The `useGpuSubstrate`
// picker's `setupGL` slot is WebGL2-typed; the Canvas2D fallback rides `useCanvas2D`
// directly when WebGPU is absent — see `useDotFlowField`.)

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { OklchStop } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { FLOW_FIELD_COMPUTE_WGSL } from "../shaders/flow-field.compute.wgsl";
import { FLOW_FIELD_RENDER_WGSL } from "../shaders/flow-field.render.wgsl";
import type { FlowFieldConfig } from "../constants";
import { MAX_PARTICLES } from "../constants";
import {
    FLOW_PARTICLE_BYTES,
    createFlowComputeScratch,
    createFlowRenderScratch,
    packFlowComputeUniforms,
    packFlowRenderUniforms,
    seedParticleBuffer,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; `lib.dom` declares the TYPES
// not the VALUE namespaces — naming them keeps the call sites readable, mirroring the
// goo-blob wgpuSetup).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const BUFFER_USAGE_VERTEX = 0x20; // unused (instanced from storage) — documented complete
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;
const SHADER_STAGE_COMPUTE = 0x4;

void BUFFER_USAGE_VERTEX;

const WORKGROUP_SIZE = 64;

export interface FlowWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    config: FlowFieldConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live palette edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /** Reduced-motion read (the substrate owns the query; the renderer maps the clock). */
    getReducedMotion: () => boolean;
}

/**
 * Build the dot-flow-field `setupWGPU(device, context, format)` callback. Closes over the
 * config/palette getters + the renderer's demand gate.
 */
export function createFlowWGPUSetup(
    deps: FlowWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, shouldContinue } = deps;

    return function setupWGPU(device, context, format) {
        const particleCount = Math.min(
            Math.max(config.particleCount, 1),
            MAX_PARTICLES,
        );

        const computeModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.compute.wgsl",
            code: FLOW_FIELD_COMPUTE_WGSL,
        });
        const renderModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.render.wgsl",
            code: FLOW_FIELD_RENDER_WGSL,
        });

        // The particle storage buffer (seeded once; advected in place by the compute pass).
        const seed = seedParticleBuffer(particleCount);
        const particleBuffer = device.createBuffer({
            label: "[DotFlowField] particles",
            size: particleCount * FLOW_PARTICLE_BYTES,
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

        // Compute bind-group: uniform @0 (visible to compute) + storage @1 (read_write).
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

        // Render bind-group: uniform @0 (vertex+fragment) + storage @1 (read-only vertex).
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
                        // Premultiplied-alpha blend over the (transparent/navy) clear.
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
        const dispatchX = Math.ceil(particleCount / WORKGROUP_SIZE);

        function resize(): void {
            // The flow field is a wash-class field — the aurora sub-2× DPR ceiling fits
            // (a dot cloud reads fine at the wash ceiling; the swap chain auto-resizes).
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
            // Frame dt from the elapsed-second delta (clamped so a long park does not
            // teleport the field). First frame seeds lastTime with no step.
            const dt =
                lastTime < 0 ? 0 : Math.min(Math.max(timeSec - lastTime, 0), 0.05);
            lastTime = timeSec;

            const cssMin = Math.min(
                canvas.clientWidth || 320,
                canvas.clientHeight || 320,
            );
            const aspect =
                (canvas.clientWidth || 320) / Math.max(canvas.clientHeight || 320, 1);

            packFlowComputeUniforms(
                computeScratch,
                config,
                timeSec,
                dt,
                particleCount,
            );
            device.queue.writeBuffer(computeUniform, 0, computeScratch.buffer);

            packFlowRenderUniforms(
                renderScratch,
                config,
                timeSec,
                aspect,
                cssMin,
                getPalette(),
            );
            device.queue.writeBuffer(renderUniform, 0, renderScratch.buffer);

            const encoder = device.createCommandEncoder({
                label: "[DotFlowField] frame",
            });
            // 1. compute pass — advect every particle one Euler step.
            const cpass = encoder.beginComputePass();
            cpass.setPipeline(computePipeline);
            cpass.setBindGroup(0, computeBindGroup);
            cpass.dispatchWorkgroups(dispatchX);
            cpass.end();
            // 2. render pass — instanced billboards over the clear.
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
            rpass.draw(6, particleCount, 0, 0); // 6 verts (quad) × N instances
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
