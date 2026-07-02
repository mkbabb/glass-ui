// BD.W-DOTFLOW-AURORA-CURRENT — the WebGPU compute+render two-pass primary substrate builder.
//
// `createFlowWGPUSetup` returns a `setupWGPU(device, ctx, format)` the picker invokes on the
// WebGPU primary path. It builds the particle STORAGE buffer (lattice-seeded for `field`,
// scattered+life-staggered for `flow`), the COMPUTE pipeline (mode-branched: anchored-spring
// vs advect+vortex+respawn), the instanced-billboard RENDER pipeline, and — for `flow` — a
// half-res RGBA16F TRAIL ping-pong (decay-blit prev → additive motes → present-composite over
// the warm floor + corner-bloom). Each `frame(t)` records ONE command encoder.
//
// Carved from useFlowParticles.ts at the WGPU/WebGL2 backend seam (no-god-module). The shared
// FlowSetupDeps interface + the px-min/count/floor-ground helpers live in useFlowParticles.ts;
// this leaf owns ONLY the WebGPU path.

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import { oklchToLinear } from "../../../../composables/color";
import { FLOW_FIELD_COMPUTE_WGSL } from "../shaders/flow-field.compute.wgsl";
import {
    FLOW_FIELD_RENDER_WGSL,
    FLOW_FIELD_TRAIL_WGSL,
} from "../shaders/flow-field.render.wgsl";
import { flowTrailDecay } from "../constants";
import {
    FLOW_PARTICLE_BYTES,
    createFlowComputeScratch,
    createFlowRenderScratch,
    flowGridGeometry,
    packFlowComputeUniforms,
    packFlowRenderUniforms,
    seedLatticeBuffer,
    seedFlowBuffer,
} from "./uniformBridgeWGPU";
import {
    type FlowSetupDeps,
    FLOW_FLOOR_OKLCH,
    FLOW_BLOOM_OKLCH,
    cssMin,
    flowCount,
} from "./useFlowParticles";

// WebGPU usage/visibility bitflags (webgpu.idl constants; `lib.dom` declares the TYPES
// not the VALUE namespaces — naming them keeps the call sites readable).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const TEXTURE_USAGE_RENDER_ATTACHMENT = 0x10;
const TEXTURE_USAGE_TEXTURE_BINDING = 0x4;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;
const SHADER_STAGE_COMPUTE = 0x4;

const WORKGROUP_SIZE = 64;

/**
 * Build the dot-flow-field `setupWGPU(device, context, format)` callback. Closes over the
 * config/palette getters + the renderer's demand gate + the pointer `onFrame`/`getPointer`.
 */
export function createFlowWGPUSetup(
    deps: FlowSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame, getPointer } = deps;

    return function setupWGPU(device, context, format) {
        const isFlow = config.mode === "flow";
        let geometry = flowGridGeometry(config.gridPitch, cssMin(canvas));

        // The particle count + seed: scattered motes (flow) or the anchored lattice (field).
        const count = isFlow ? flowCount(config) : geometry.count;
        const seed = isFlow
            ? seedFlowBuffer(count, config.lifetimeSec)
            : seedLatticeBuffer(geometry);

        const computeModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.compute.wgsl",
            code: FLOW_FIELD_COMPUTE_WGSL,
        });
        const renderModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.render.wgsl",
            code: FLOW_FIELD_RENDER_WGSL,
        });

        const particleBuffer = device.createBuffer({
            label: "[DotFlowField] particles",
            size: (seed.length / 4) * FLOW_PARTICLE_BYTES,
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
                { binding: 0, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "uniform" } },
                { binding: 1, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "storage" } },
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

        // ── The flow TRAIL ping-pong (half-res RGBA16F) + the decay/present pipelines ──
        // `field` renders straight to the swapchain (no trail); `flow` accumulates ribbons.
        const trailFormat: GPUTextureFormat = "rgba16float";
        const additive = {
            color: {
                srcFactor: "one" as const,
                dstFactor: "one" as const,
                operation: "add" as const,
            },
            alpha: {
                srcFactor: "one" as const,
                dstFactor: "one" as const,
                operation: "add" as const,
            },
        };
        const overBlend = {
            color: {
                srcFactor: "one" as const,
                dstFactor: "one-minus-src-alpha" as const,
                operation: "add" as const,
            },
            alpha: {
                srcFactor: "one" as const,
                dstFactor: "one-minus-src-alpha" as const,
                operation: "add" as const,
            },
        };

        // The mote render pipeline writes additively into the trail (flow) or over the
        // swapchain (field — premultiplied over the clear).
        const renderPipeline = device.createRenderPipeline({
            label: "[DotFlowField] render-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [renderBGL] }),
            vertex: { module: renderModule, entryPoint: "vs_main" },
            fragment: {
                module: renderModule,
                entryPoint: "fs_main",
                targets: [{ format: isFlow ? trailFormat : format, blend: isFlow ? additive : overBlend }],
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

        // The trail decay + present pipelines (flow only).
        const trailModule = isFlow
            ? device.createShaderModule({
                  label: "[DotFlowField] flow-field.trail.wgsl",
                  code: FLOW_FIELD_TRAIL_WGSL,
              })
            : null;
        const trailUniform = isFlow
            ? device.createBuffer({
                  label: "[DotFlowField] trail-uniforms",
                  size: 48, // 3 × vec4
                  usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
              })
            : null;
        const trailSampler = isFlow
            ? device.createSampler({ magFilter: "linear", minFilter: "linear" })
            : null;
        const trailBGL =
            isFlow && trailModule
                ? device.createBindGroupLayout({
                      label: "[DotFlowField] trail-bgl",
                      entries: [
                          { binding: 0, visibility: SHADER_STAGE_FRAGMENT, buffer: { type: "uniform" } },
                          { binding: 1, visibility: SHADER_STAGE_FRAGMENT, sampler: { type: "filtering" } },
                          { binding: 2, visibility: SHADER_STAGE_FRAGMENT, texture: { sampleType: "float" } },
                      ],
                  })
                : null;
        const decayPipeline =
            isFlow && trailModule && trailBGL
                ? device.createRenderPipeline({
                      label: "[DotFlowField] trail-decay-pipeline",
                      layout: device.createPipelineLayout({ bindGroupLayouts: [trailBGL] }),
                      vertex: { module: trailModule, entryPoint: "vs_fsq" },
                      fragment: { module: trailModule, entryPoint: "fs_decay", targets: [{ format: trailFormat }] },
                      primitive: { topology: "triangle-list" },
                  })
                : null;
        const presentPipeline =
            isFlow && trailModule && trailBGL
                ? device.createRenderPipeline({
                      label: "[DotFlowField] trail-present-pipeline",
                      layout: device.createPipelineLayout({ bindGroupLayouts: [trailBGL] }),
                      vertex: { module: trailModule, entryPoint: "vs_fsq" },
                      fragment: { module: trailModule, entryPoint: "fs_present", targets: [{ format }] },
                      primitive: { topology: "triangle-list" },
                  })
                : null;

        // The trail ping-pong textures (rebuilt on resize).
        let trailTex: [GPUTexture, GPUTexture] | null = null;
        let trailView: [GPUTextureView, GPUTextureView] | null = null;
        let decayBG: [GPUBindGroup, GPUBindGroup] | null = null;
        let presentBG: [GPUBindGroup, GPUBindGroup] | null = null;
        let pingIndex = 0;

        function rebuildTrail(): void {
            if (!isFlow || !trailBGL || !trailUniform || !trailSampler) return;
            const scale = Math.min(Math.max(config.trailScale, 0.25), 1);
            const tw = Math.max(2, Math.round(canvas.width * scale));
            const th = Math.max(2, Math.round(canvas.height * scale));
            trailTex?.forEach((t) => t.destroy());
            const mk = (): GPUTexture =>
                device.createTexture({
                    label: "[DotFlowField] trail",
                    size: { width: tw, height: th },
                    format: trailFormat,
                    usage: TEXTURE_USAGE_RENDER_ATTACHMENT | TEXTURE_USAGE_TEXTURE_BINDING,
                });
            const a = mk();
            const b = mk();
            trailTex = [a, b];
            trailView = [a.createView(), b.createView()];
            const mkBG = (texView: GPUTextureView): GPUBindGroup =>
                device.createBindGroup({
                    layout: trailBGL,
                    entries: [
                        { binding: 0, resource: { buffer: trailUniform } },
                        { binding: 1, resource: trailSampler },
                        { binding: 2, resource: texView },
                    ],
                });
            // decayBG[cur] reads trailView[prev] (the prev accumulated trail to fade).
            decayBG = [mkBG(trailView[1]), mkBG(trailView[0])];
            // presentBG[cur] reads trailView[cur] (the JUST-written composite).
            presentBG = [mkBG(trailView[0]), mkBG(trailView[1])];
        }

        const computeScratch = createFlowComputeScratch();
        const renderScratch = createFlowRenderScratch();
        const trailScratch = new Float32Array(12);
        let lastTime = -1;

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sized the backing store; the
        // closure recomputes the grid geometry + rebuilds the trail FBOs off the leaf-set
        // `canvas.width/height` (WGPU's swap chain auto-resizes to the backing).
        function resize(_s?: BackingSize): void {
            if (!isFlow) {
                const g = flowGridGeometry(config.gridPitch, cssMin(canvas));
                geometry = { ...g, count: Math.min(g.count, seed.length / 4) };
            }
            rebuildTrail();
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const dt = lastTime < 0 ? 0 : Math.min(Math.max(timeSec - lastTime, 0), 0.05);
            lastTime = timeSec;

            const aspect = canvas.width / Math.max(canvas.height, 1);
            const drawCount = isFlow ? count : geometry.count;
            const pointer = getPointer?.();

            packFlowComputeUniforms(computeScratch, config, timeSec, dt, geometry, drawCount, pointer);
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

            const encoder = device.createCommandEncoder({ label: "[DotFlowField] frame" });

            // 1. compute (advect/respawn for flow, anchored-spring for field).
            const cpass = encoder.beginComputePass();
            cpass.setPipeline(computePipeline);
            cpass.setBindGroup(0, computeBindGroup);
            cpass.dispatchWorkgroups(Math.ceil(drawCount / WORKGROUP_SIZE));
            cpass.end();

            if (
                isFlow &&
                trailView &&
                decayBG &&
                presentBG &&
                decayPipeline &&
                presentPipeline &&
                trailUniform
            ) {
                const cur = pingIndex;
                const prev = 1 - pingIndex;

                // trail uniforms: derived decay α + the floor/bloom ground.
                const decay = flowTrailDecay(config.trailHalfLife);
                const hasGround = config.background === "transparent" ? 0 : 1;
                const floorLin = oklchToLinear(
                    config.background === "transparent" ? FLOW_FLOOR_OKLCH : config.background,
                );
                const bloomLin = oklchToLinear(FLOW_BLOOM_OKLCH);
                trailScratch[0] = decay;
                trailScratch[1] = hasGround;
                trailScratch[2] = timeSec;
                trailScratch[4] = floorLin[0];
                trailScratch[5] = floorLin[1];
                trailScratch[6] = floorLin[2];
                trailScratch[8] = bloomLin[0];
                trailScratch[9] = bloomLin[1];
                trailScratch[10] = bloomLin[2];
                device.queue.writeBuffer(trailUniform, 0, trailScratch.buffer);

                // 2. decay-blit prev → cur (fade the ribbons toward black).
                const dpass = encoder.beginRenderPass({
                    colorAttachments: [
                        { view: trailView[cur], clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                    ],
                });
                dpass.setPipeline(decayPipeline);
                dpass.setBindGroup(0, decayBG[cur]); // decayBG[cur] reads trailView[prev]
                dpass.draw(3, 1, 0, 0);
                dpass.end();

                // 3. motes additive over the decayed trail.
                const mpass = encoder.beginRenderPass({
                    colorAttachments: [{ view: trailView[cur], loadOp: "load", storeOp: "store" }],
                });
                mpass.setPipeline(renderPipeline);
                mpass.setBindGroup(0, renderBindGroup);
                mpass.draw(6, drawCount, 0, 0);
                mpass.end();

                // 4. present composite (trail over the warm floor + corner-bloom) → swapchain.
                const view = context.getCurrentTexture().createView();
                const ppass = encoder.beginRenderPass({
                    colorAttachments: [
                        { view, clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                    ],
                });
                ppass.setPipeline(presentPipeline);
                ppass.setBindGroup(0, presentBG[cur]); // reads trailView[cur] just written
                ppass.draw(3, 1, 0, 0);
                ppass.end();

                pingIndex = prev; // swap
            } else {
                // field: render motes straight to the swapchain over the clear.
                const view = context.getCurrentTexture().createView();
                const rpass = encoder.beginRenderPass({
                    colorAttachments: [
                        { view, clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                    ],
                });
                rpass.setPipeline(renderPipeline);
                rpass.setBindGroup(0, renderBindGroup);
                rpass.draw(6, drawCount, 0, 0);
                rpass.end();
            }

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
                trailUniform?.destroy();
                trailTex?.forEach((t) => t.destroy());
            },
        };
    };
}
