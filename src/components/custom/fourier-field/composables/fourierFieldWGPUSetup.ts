// BC.W-VIZ-FOURIER — the WebGPU `setupWGPU` builder (the primary path).
//
// A two-pass shape (compute → fullscreen-fragment render, the FLOW-FIELD precedent): the
// compute kernel writes the comet-curve sample table + the epicycle chain-tip table into
// two storage buffers; the fullscreen-fragment render pass composites the SDF field over
// them. Each `frame(t)` records ONE command encoder: pack uniforms → compute pass → render
// pass → submit. It owns NO scheduling — the canvas lifecycle leaf delivers the frame; the
// `onFrame` hook advances the shared pointer field (the no-own-rAF discipline).

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { OklchStop } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { FOURIER_FIELD_COMPUTE_WGSL } from "../shaders/fourier-field.compute.wgsl";
import { FOURIER_FIELD_RENDER_WGSL } from "../shaders/fourier-field.render.wgsl";
import {
    MAX_PHASORS,
    MAX_CURVE_SAMPLES,
    type FourierFieldConfig,
} from "../constants";
import type { BasisComponent } from "../math";
import {
    FOURIER_PHASOR_BYTES,
    computeFourierFit,
    createFourierComputeScratch,
    createFourierRenderScratch,
    packFourierComputeUniforms,
    packFourierRenderUniforms,
    packPhasorTable,
    trailWidthToModel,
    type FourierFit,
} from "./uniformBridgeWGPU";

const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;
const SHADER_STAGE_COMPUTE = 0x4;

const WORKGROUP_SIZE = 64;
/** Trail PEAK + head-glow + fade shape (the calm fourier register, intensity-scaled in-shader). */
const PEAK_ALPHA = 0.92;
const HEAD_GLOW_ALPHA = 0.95;
const TRAIL_FADE_EXP = 1.35;
const TRAIL_FLOOR = 0.34;

export interface FourierWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    config: FourierFieldConfig;
    /** The CPU-minted spectrum (re-read each frame so a source-swap reaches the buffer). */
    getSpectrum: () => readonly BasisComponent[];
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** The single loop parameter `head_t ∈ [0,1)` (the ONE keyframes.js clock). */
    getHeadT: () => number;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /** The per-frame pointer hook — useFourierField advances the shared pointer field here. */
    onFrame?: (timeSec: number) => void;
    /**
     * BD.W-VIZ-BROKEN-FIX D6b — the 2-D cursor FOLLOW: a small MODEL-space offset added to
     * the view-fit center so the whole reconstruction LEANS toward the cursor (the spatial
     * "follow" beside D6a's velocity scrub). Reuses the EXISTING uFit center uniform (NO new
     * uniform, NO shader/bridge edit — parity-safe by construction, both arms read the same
     * fit). `{x:0,y:0}` (the ambient/PRM register) is byte-identical to today.
     */
    getPointerLean?: () => { x: number; y: number };
}

/** Build the fourier-field `setupWGPU(device, context, format)` callback. */
export function createFourierWGPUSetup(
    deps: FourierWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getSpectrum, getPalette, getHeadT, shouldContinue, onFrame } =
        deps;
    const getPointerLean = deps.getPointerLean;

    return function setupWGPU(device, context, format) {
        const computeModule = device.createShaderModule({
            label: "[FourierField] fourier-field.compute.wgsl",
            code: FOURIER_FIELD_COMPUTE_WGSL,
        });
        const renderModule = device.createShaderModule({
            label: "[FourierField] fourier-field.render.wgsl",
            code: FOURIER_FIELD_RENDER_WGSL,
        });

        // The phasor storage buffer (re-uploaded on a source-swap).
        const phasorBuffer = device.createBuffer({
            label: "[FourierField] phasors",
            size: MAX_PHASORS * FOURIER_PHASOR_BYTES,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
        });
        // The compute-output storage buffers (curve samples + chain tips).
        const curveBuffer = device.createBuffer({
            label: "[FourierField] curve-samples",
            size: MAX_CURVE_SAMPLES * 16,
            usage: BUFFER_USAGE_STORAGE,
        });
        const chainBuffer = device.createBuffer({
            label: "[FourierField] chain-tips",
            size: (MAX_PHASORS + 1) * 16,
            usage: BUFFER_USAGE_STORAGE,
        });

        const computeUniform = device.createBuffer({
            label: "[FourierField] compute-uniforms",
            size: createFourierComputeScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });
        const renderUniform = device.createBuffer({
            label: "[FourierField] render-uniforms",
            size: createFourierRenderScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const computeBGL = device.createBindGroupLayout({
            label: "[FourierField] compute-bgl",
            entries: [
                { binding: 0, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "uniform" } },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_COMPUTE,
                    buffer: { type: "read-only-storage" },
                },
                { binding: 2, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "storage" } },
                { binding: 3, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "storage" } },
            ],
        });
        const computePipeline = device.createComputePipeline({
            label: "[FourierField] compute-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [computeBGL] }),
            compute: { module: computeModule, entryPoint: "cs_main" },
        });
        const computeBindGroup = device.createBindGroup({
            label: "[FourierField] compute-bg",
            layout: computeBGL,
            entries: [
                { binding: 0, resource: { buffer: computeUniform } },
                { binding: 1, resource: { buffer: phasorBuffer } },
                { binding: 2, resource: { buffer: curveBuffer } },
                { binding: 3, resource: { buffer: chainBuffer } },
            ],
        });

        const renderBGL = device.createBindGroupLayout({
            label: "[FourierField] render-bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "read-only-storage" },
                },
                {
                    binding: 2,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "read-only-storage" },
                },
            ],
        });
        const renderPipeline = device.createRenderPipeline({
            label: "[FourierField] render-pipeline",
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
            label: "[FourierField] render-bg",
            layout: renderBGL,
            entries: [
                { binding: 0, resource: { buffer: renderUniform } },
                { binding: 1, resource: { buffer: curveBuffer } },
                { binding: 2, resource: { buffer: chainBuffer } },
            ],
        });

        const computeScratch = createFourierComputeScratch();
        const renderScratch = createFourierRenderScratch();

        // Track the active spectrum identity so the phasor table + fit only re-upload on a swap.
        let activeSpectrum: readonly BasisComponent[] | null = null;
        let fit: FourierFit = { centerX: 0, centerY: 0, scale: 1 };
        let phasorCount = 0;

        function syncSpectrum(): void {
            const spectrum = getSpectrum();
            if (spectrum === activeSpectrum) return;
            activeSpectrum = spectrum;
            phasorCount = Math.min(spectrum.length, MAX_PHASORS);
            fit = computeFourierFit(spectrum);
            device.queue.writeBuffer(phasorBuffer, 0, packPhasorTable(spectrum));
        }

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sized the backing store; the WGPU
        // swap chain auto-resizes to it — no-op.
        function resize(_s?: BackingSize): void {}

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            syncSpectrum();

            const headT = getHeadT();
            const harmonicN = Math.max(
                1,
                Math.min(Math.round(config.harmonics), phasorCount),
            );
            const armN = config.showEpicycles
                ? Math.max(1, Math.min(Math.round(config.epicycleArms), harmonicN))
                : 0;
            const sampleCount = MAX_CURVE_SAMPLES;

            packFourierComputeUniforms(
                computeScratch,
                headT,
                config.trailArc,
                harmonicN,
                armN,
                sampleCount,
                phasorCount,
            );
            device.queue.writeBuffer(computeUniform, 0, computeScratch.buffer);

            // BG.W-VIZ-RESIZE-ADOPT — the box in CSS px derives from the LEAF-sized backing
            // store (round(gBCR × dpr) ÷ dpr), never clientWidth.
            const cssMin =
                Math.min(canvas.width, canvas.height) / Math.max(resolveBudgetDpr(), 1);
            const aspect = canvas.width / Math.max(canvas.height, 1);
            const trailModel = trailWidthToModel(config.trailWidth, fit.scale, cssMin);

            // D6b — lean the view-fit CENTER toward the cursor (the 2-D follow). The render
            // maps clip→model as p = center + vClip*aspect/scale, so SUBTRACTING the cursor's
            // model offset from the center pans the content TOWARD the cursor on screen. The
            // offset is small + bounded (the lean register sets it; ambient/PRM is {0,0} → the
            // byte-identical fit). The ONE uFit uniform carries it — no new uniform.
            const lean = getPointerLean?.() ?? { x: 0, y: 0 };
            const leanedFit: FourierFit =
                lean.x !== 0 || lean.y !== 0
                    ? { ...fit, centerX: fit.centerX - lean.x, centerY: fit.centerY - lean.y }
                    : fit;

            packFourierRenderUniforms(
                renderScratch,
                leanedFit,
                aspect,
                trailModel,
                PEAK_ALPHA,
                HEAD_GLOW_ALPHA,
                TRAIL_FADE_EXP,
                TRAIL_FLOOR,
                config.intensity,
                config.showEpicycles,
                config.rainbowChain,
                config.squashGain,
                config.celGain,
                sampleCount,
                armN,
                getPalette(),
            );
            device.queue.writeBuffer(renderUniform, 0, renderScratch.buffer);

            const encoder = device.createCommandEncoder({ label: "[FourierField] frame" });
            // 1. compute pass — write the curve samples + chain tips.
            const cpass = encoder.beginComputePass();
            cpass.setPipeline(computePipeline);
            cpass.setBindGroup(0, computeBindGroup);
            cpass.dispatchWorkgroups(Math.ceil(MAX_CURVE_SAMPLES / WORKGROUP_SIZE));
            cpass.end();
            // 2. render pass — fullscreen SDF over the clear.
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
            rpass.draw(3, 1, 0, 0); // fullscreen triangle
            rpass.end();
            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                phasorBuffer.destroy();
                curveBuffer.destroy();
                chainBuffer.destroy();
                computeUniform.destroy();
                renderUniform.destroy();
            },
        };
    };
}
