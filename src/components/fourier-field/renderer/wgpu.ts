// The WebGPU renderer — the ONLY renderer.
//
// Two passes per frame: the compute kernel writes the curve samples and the chain tips
// into storage buffers sized to THIS spectrum, then one render pass issues three instanced
// draws (chain → trail → head) that vertex-pull those buffers. There is no second engine,
// no parity claim to keep, and no ceiling: the buffers are rebuilt when the spectrum
// changes and are exactly as large as the mint's own output.
//
// WHY THERE IS NO WEBGL FALLBACK. A second renderer is a second paint law, and this
// component's whole claim is that what you see is the transform. Where WebGPU is absent
// the field declares the failure and paints nothing — a blank stage a reader can ask
// about, never a silent black rectangle or a lookalike drawn by a different machine.

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../composables/glass/webgpu/useWebGPUCanvas";
import type { WebGLCanvasFrame } from "../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../composables/color";
import { FOURIER_FIELD_COMPUTE_WGSL } from "../shaders/compute.wgsl";
import { FOURIER_FIELD_RENDER_WGSL } from "../shaders/render.wgsl";
import {
    FOURIER_CHAIN_HUE_SWEEP,
    FOURIER_CURVE_SAMPLES,
    FOURIER_DPR_CAP,
    FOURIER_SCAFFOLD_STROKE_FRAC,
    type FourierFieldConfig,
} from "../constants";
import {
    FOURIER_PHASOR_BYTES,
    computeFourierFit,
    createFourierComputeScratch,
    createFourierRenderScratch,
    packFourierComputeUniforms,
    packFourierRenderUniforms,
    packPhasorTable,
    resolveFourierRamp,
    strokeToModel,
    type FourierFit,
    type FourierRamp,
} from "./uniforms";
import type { MintedSpectrum } from "./mint";

const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;
const SHADER_STAGE_COMPUTE = 0x4;

const WORKGROUP_SIZE = 64;
/** The trail's fade shape and its floor — the oldest tail never disappears entirely. */
const TRAIL_FADE_EXP = 1.35;
const TRAIL_FLOOR = 0.34;
/** The paint's peak alpha before the intensity envelope multiplies it. */
const PEAK_ALPHA = 0.92;

/** The three layer ids the pipeline-overridable `LAYER` constant selects. */
const LAYER = { chain: 0, trail: 1, head: 2 } as const;

export interface FourierRendererDeps {
    canvas: HTMLCanvasElement;
    config: FourierFieldConfig;
    /** The minted spectrum — re-read each frame; identity change triggers the re-upload. */
    getSpectrum: () => MintedSpectrum;
    /** The resolved palette stops, re-read each frame so a live edit reaches the ramp. */
    getPalette: () => OklchStop[];
    /** The single loop parameter `head_t ∈ [0,1)`. */
    getHeadT: () => number;
    /** Demand-gate (the renderer's quiescence layer). */
    shouldContinue: () => boolean;
    /** The per-frame hook — the clock advances here, inside the substrate's own frame. */
    onFrame?: (timeSec: number) => void;
}

/** Build the fourier-field `setupWGPU(device, context, format)` callback. */
export function createFourierWGPUSetup(
    deps: FourierRendererDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getSpectrum, getPalette, getHeadT, shouldContinue, onFrame } =
        deps;

    return function setupWGPU(device, context, format) {
        const computeModule = device.createShaderModule({
            label: "[FourierField] compute.wgsl",
            code: FOURIER_FIELD_COMPUTE_WGSL,
        });
        const renderModule = device.createShaderModule({
            label: "[FourierField] render.wgsl",
            code: FOURIER_FIELD_RENDER_WGSL,
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
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "read-only-storage" },
                },
                {
                    binding: 2,
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "read-only-storage" },
                },
            ],
        });
        const renderLayout = device.createPipelineLayout({ bindGroupLayouts: [renderBGL] });

        // THE ONE BLEND — premultiplied component-wise MAX, every layer, no exceptions.
        const MAX_BLEND: GPUBlendState = {
            color: { srcFactor: "one", dstFactor: "one", operation: "max" },
            alpha: { srcFactor: "one", dstFactor: "one", operation: "max" },
        };
        const makePipeline = (layer: number): GPURenderPipeline =>
            device.createRenderPipeline({
                label: `[FourierField] pipeline-L${layer}`,
                layout: renderLayout,
                vertex: {
                    module: renderModule,
                    entryPoint: "vs_main",
                    constants: { LAYER: layer },
                },
                fragment: {
                    module: renderModule,
                    entryPoint: "fs_main",
                    constants: { LAYER: layer },
                    targets: [{ format, blend: MAX_BLEND }],
                },
                primitive: { topology: "triangle-list" },
            });
        const pipelines = {
            chain: makePipeline(LAYER.chain),
            trail: makePipeline(LAYER.trail),
            head: makePipeline(LAYER.head),
        };

        const computeScratch = createFourierComputeScratch();
        const renderScratch = createFourierRenderScratch();

        // ── Per-spectrum resources. Sized to the mint's own output, rebuilt on a swap. ──
        let minted: MintedSpectrum | null = null;
        let phasorBuffer: GPUBuffer | null = null;
        let curveBuffer: GPUBuffer | null = null;
        let chainBuffer: GPUBuffer | null = null;
        let computeBindGroup: GPUBindGroup | null = null;
        let renderBindGroup: GPUBindGroup | null = null;
        let fit: FourierFit = { centerX: 0, centerY: 0, scale: 1 };
        let fitMachine = config.showMachine;

        function releaseSpectrumBuffers(): void {
            phasorBuffer?.destroy();
            curveBuffer?.destroy();
            chainBuffer?.destroy();
            phasorBuffer = null;
            curveBuffer = null;
            chainBuffer = null;
        }

        function syncSpectrum(): void {
            const next = getSpectrum();
            const machineChanged = fitMachine !== config.showMachine;
            if (next === minted && !machineChanged) return;
            if (next !== minted) {
                minted = next;
                releaseSpectrumBuffers();
                const termCount = Math.max(next.terms.length, 1);
                phasorBuffer = device.createBuffer({
                    label: "[FourierField] phasors",
                    size: termCount * FOURIER_PHASOR_BYTES,
                    usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
                });
                curveBuffer = device.createBuffer({
                    label: "[FourierField] curve-samples",
                    size: FOURIER_CURVE_SAMPLES * 16,
                    usage: BUFFER_USAGE_STORAGE,
                });
                chainBuffer = device.createBuffer({
                    label: "[FourierField] chain-tips",
                    size: (termCount + 1) * 16,
                    usage: BUFFER_USAGE_STORAGE,
                });
                device.queue.writeBuffer(phasorBuffer, 0, packPhasorTable(next.terms));
                computeBindGroup = device.createBindGroup({
                    label: "[FourierField] compute-bg",
                    layout: computeBGL,
                    entries: [
                        { binding: 0, resource: { buffer: computeUniform } },
                        { binding: 1, resource: { buffer: phasorBuffer } },
                        { binding: 2, resource: { buffer: curveBuffer } },
                        { binding: 3, resource: { buffer: chainBuffer } },
                    ],
                });
                renderBindGroup = device.createBindGroup({
                    label: "[FourierField] render-bg",
                    layout: renderBGL,
                    entries: [
                        { binding: 0, resource: { buffer: renderUniform } },
                        { binding: 1, resource: { buffer: curveBuffer } },
                        { binding: 2, resource: { buffer: chainBuffer } },
                    ],
                });
            }
            fitMachine = config.showMachine;
            fit = computeFourierFit(minted!, fitMachine);
        }

        // ── The ramp, rebuilt only when the palette itself changes. ──
        let ramp: FourierRamp = resolveFourierRamp(getPalette());
        let rampKey = paletteKey(getPalette());
        function syncRamp(): void {
            const palette = getPalette();
            const key = paletteKey(palette);
            if (key === rampKey) return;
            rampKey = key;
            ramp = resolveFourierRamp(palette);
        }

        function resize(_s: BackingSize): void {}

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            syncSpectrum();
            syncRamp();
            if (!minted || !computeBindGroup || !renderBindGroup) return;

            const termCount = minted.terms.length;
            const harmonicN = Math.max(
                1,
                Math.min(Math.round(config.harmonics), termCount),
            );
            const chainCount = config.showMachine ? harmonicN : 0;
            const sampleCount = FOURIER_CURVE_SAMPLES;

            packFourierComputeUniforms(
                computeScratch,
                getHeadT(),
                config.trailArc,
                harmonicN,
                sampleCount,
                termCount,
            );
            device.queue.writeBuffer(computeUniform, 0, computeScratch.buffer);

            // The backing store is the leaf's; the CSS box derives from it and the local
            // DPR cap, never from clientWidth.
            const dpr = Math.min(
                typeof window === "undefined" ? 1 : window.devicePixelRatio || 1,
                FOURIER_DPR_CAP,
            );
            const cssMin = Math.min(canvas.width, canvas.height) / Math.max(dpr, 1);
            const aspect = canvas.width / Math.max(canvas.height, 1);
            const markHalfModel =
                strokeToModel(config.markStroke, fit.scale, cssMin) * 0.5;
            const ringStrokeModel = strokeToModel(config.markStroke, fit.scale, cssMin);
            // The AA feather's slop in MODEL units — a few CSS px so no bbox edge clips it.
            const edgeMargin =
                (6 * 2) / (Math.max(fit.scale, 1e-6) * Math.max(cssMin, 1));

            packFourierRenderUniforms(renderScratch, {
                fit,
                aspect,
                markHalfModel,
                inkOffsetStrokes: config.inkOffset,
                scaffoldFrac: FOURIER_SCAFFOLD_STROKE_FRAC,
                edgeMargin,
                peakAlpha: PEAK_ALPHA * config.intensity,
                glow: config.glow,
                squash: config.squash,
                trailFadeExp: TRAIL_FADE_EXP,
                trailFloor: TRAIL_FLOOR,
                hueSweep: FOURIER_CHAIN_HUE_SWEEP,
                ringStrokeModel,
                showMachine: config.showMachine,
                rainbowChain: config.rainbowChain,
                sampleCount,
                chainCount,
                ramp,
            });
            device.queue.writeBuffer(renderUniform, 0, renderScratch.buffer);

            const encoder = device.createCommandEncoder({ label: "[FourierField] frame" });
            const cpass = encoder.beginComputePass();
            cpass.setPipeline(computePipeline);
            cpass.setBindGroup(0, computeBindGroup);
            cpass.dispatchWorkgroups(Math.ceil(sampleCount / WORKGROUP_SIZE));
            cpass.end();

            const rpass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view: context.getCurrentTexture().createView(),
                        clearValue: { r: 0, g: 0, b: 0, a: 0 },
                        loadOp: "clear",
                        storeOp: "store",
                    },
                ],
            });
            rpass.setBindGroup(0, renderBindGroup);
            if (chainCount > 0) {
                rpass.setPipeline(pipelines.chain);
                rpass.draw(6, chainCount, 0, 0);
            }
            rpass.setPipeline(pipelines.trail);
            rpass.draw(6, sampleCount - 1, 0, 0);
            rpass.setPipeline(pipelines.head);
            rpass.draw(6, 1, 0, 0);
            rpass.end();
            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                releaseSpectrumBuffers();
                computeUniform.destroy();
                renderUniform.destroy();
            },
        };
    };
}

/** A cheap identity for a palette so the ramp rebuilds on a real change, not every frame. */
function paletteKey(palette: readonly OklchStop[]): string {
    let key = "";
    for (const s of palette) key += `${s.L.toFixed(4)},${s.C.toFixed(4)},${s.h.toFixed(2)};`;
    return key;
}

/**
 * The message the field declares where WebGPU is absent. It is a sentence, not a code,
 * because it is read by whoever is looking at the blank stage. Module-private: the
 * consumer reads it off `rendererStatus`, never by importing the string.
 */
const FOURIER_UNSUPPORTED_MESSAGE =
    "[FourierField] WebGPU is required. This field paints the transform itself, so it " +
    "ships one renderer and no lookalike — where WebGPU is absent it declares the " +
    "failure and paints nothing.";

/**
 * The WebGL2 seam, declared closed. The substrate picker requires a `setupGL`; this one
 * acquires nothing and draws nothing — it throws the sentence above, which the picker
 * surfaces as a renderer error. The result is exactly what the law asks for: no second
 * renderer, zero canvas pixels, and a status a consumer can read and show.
 */
export function createFourierUnsupportedSetup(): (
    gl: WebGL2RenderingContext,
) => WebGLCanvasFrame {
    return function setupUnsupported(): WebGLCanvasFrame {
        throw new Error(FOURIER_UNSUPPORTED_MESSAGE);
    };
}
