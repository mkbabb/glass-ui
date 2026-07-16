// GooBlob WGSL setup seam — the WebGPU twin of the WebGL2 `setup` callback
// (BB.W-VIZ-SUITE / W-GOOBLOB-WGPU).
//
// `createBlobWGPUSetup` returns a `setupWGPU(device, context, format)` callback the
// `createGpuSubstrate` picker invokes on the async arm (AND on every device-restore). It
// builds the render pipeline (the `metaball.wgsl` full-screen-triangle pass), the uniform
// buffer (the `uniformBridgeWGPU` typed-struct source-of-truth), and the bind group, then
// returns the substrate's per-frame hooks (`frame`/`shouldContinue`/`resize`/`teardown`).
//
// The per-frame resolve (advance mood/pointer/satellites, pick the tempo-scaled clock,
// resolve the base color) is OWNED by the renderer's `resolveFrame` closure — the SAME
// closure the WebGL2 `drawFrame` calls — so the simulation is substrate-AGNOSTIC. The
// WGPU setup only swaps the upload+draw leg (the typed-struct buffer write + the
// render-pass) for the GL `uploadBlobUniforms` leg.

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../composables/glass/webgpu/useWebGPUCanvas";
import { METABALL_WGSL } from "../shaders/metaball.wgsl";
import {
    BLOB_WGPU_UNIFORM_BYTES,
    createBlobWGPUUniformScratch,
    packBlobWGPUUniforms,
} from "./uniformBridgeWGPU";
import type { BlobConfig } from "../types";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";
import type { BlobFrameState } from "./uploadBlobUniforms";

// The WebGPU usage/visibility bitflags as their SPEC-defined constants (webgpu.idl —
// stable + immutable). `lib.dom.d.ts` declares the GPU* TYPES but not the runtime
// `GPUBufferUsage`/`GPUShaderStage` VALUE namespaces (those ride `@webgpu/types`, which
// the library does not depend on). Naming them keeps the call sites readable.
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

export interface BlobWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    config: BlobConfig;
    pointer: BlobPointer;
    satellites: BlobSatelliteSystem;
    /** Resolve the per-frame state (advances the sim, returns the settled values). */
    resolveFrame: (timeSec: number) => BlobFrameState | null;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /** Reduced-motion read (the substrate owns the query; the renderer drives tempo). */
    getReducedMotion: () => boolean;
    /** Records the backing geometry already measured by the shared lifecycle. */
    onResize: (size: BackingSize) => void;
    /** Records a frame only after its draw submission succeeds. */
    onDraw: (frame: BlobFrameState) => void;
}

/**
 * Build the goo-blob `setupWGPU(device, context, format)` callback. Closes over the
 * blob-specific state (config/pointer/satellites + the renderer's resolveFrame) — the
 * same closures the WebGL2 `setup` threads.
 */
export function createBlobWGPUSetup(
    deps: BlobWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const {
        canvas,
        config,
        pointer,
        satellites,
        resolveFrame,
        shouldContinue,
        onResize,
        onDraw,
    } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[GooBlob] metaball.wgsl",
            code: METABALL_WGSL,
        });

        const uniformBuffer = device.createBuffer({
            label: "[GooBlob] uniforms",
            size: BLOB_WGPU_UNIFORM_BYTES,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bindGroupLayout = device.createBindGroupLayout({
            label: "[GooBlob] bind-group-0",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
            ],
        });

        const pipeline = device.createRenderPipeline({
            label: "[GooBlob] pipeline",
            layout: device.createPipelineLayout({
                bindGroupLayouts: [bindGroupLayout],
            }),
            vertex: { module, entryPoint: "vs_main" },
            fragment: {
                module,
                entryPoint: "fs_main",
                targets: [
                    {
                        format,
                        // Premultiplied-alpha blend over the transparent clear — matches
                        // the WebGL2 `gl.blendFunc(ONE, ONE_MINUS_SRC_ALPHA)`.
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
            label: "[GooBlob] bind-group",
            layout: bindGroupLayout,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const scratch = createBlobWGPUUniformScratch();

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sizer already set the backing
        // store (round(gBCR × the renderer's `blobDprPolicy`, which folds the `half`
        // quality axis); WGPU's swap chain auto-resizes to the backing on the next
        // `getCurrentTexture`, and `frame()` reads `canvas.width/height` directly, so the
        // WGSL leg has nothing to upload — the closure is an intentional no-op.
        function resize(s?: BackingSize): void {
            if (s) onResize(s);
        }

        function frame(timeSec: number): void {
            const frameState = resolveFrame(timeSec);
            if (!frameState) return;

            packBlobWGPUUniforms(scratch, canvas, config, pointer, satellites, frameState);
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: "[GooBlob] frame" });
            const pass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view,
                        clearValue: { r: 0, g: 0, b: 0, a: 0 },
                        loadOp: "clear",
                        storeOp: "store",
                    },
                ],
            });
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
            pass.draw(3, 1, 0, 0);
            pass.end();
            device.queue.submit([encoder.finish()]);
            onDraw(frameState);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                uniformBuffer.destroy();
            },
        };
    };
}
