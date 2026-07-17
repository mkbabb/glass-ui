// The WebGPU `setupWGPU` builder (the primary path).
//
// A pure fullscreen fragment pass (the aurora/concentric shape-class — no compute, no
// particles): the full-screen-triangle `vs_main` + the `fs_main` liquid-grid evaluator. Each
// `frame(t)` records ONE command encoder: pack the uniform buffer (the typed-struct SoT),
// begin a render pass against the swap-chain view, draw 3 vertices, submit. It owns NO
// scheduling — the canvas lifecycle leaf delivers the frame.

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../composables/glass/webgpu/useWebGPUCanvas";
import { LIQUID_GRID_WGSL } from "../shaders/liquid-grid.wgsl";
import type { LiquidGridConfig } from "../constants";
import type { Vec2 } from "./liquidGrid";
import { createLiquidGridScratch, packLiquidGridUniforms } from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; lib.dom declares the TYPES not the
// VALUE namespaces — naming them keeps the call sites readable, mirroring concentric).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

export interface LiquidGridWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    config: LiquidGridConfig;
    /** The transient pointer cursor in GRID space — re-read each frame (the cursor swirl). */
    getCursor: () => Vec2;
    /** The spring-eased traveling-wave envelope amplitude (0..1; PRM → 0). */
    getAmp: () => number;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useLiquidGrid advances the shared `usePointerVelocityField`
     * here (the no-own-rAF discipline: the renderer's frame loop FEEDS `tick(delta)`) and
     * derives the transient cursor. ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
}

/** Build the liquid-grid `setupWGPU(device, context, format)` callback. */
export function createLiquidGridWGPUSetup(
    deps: LiquidGridWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getCursor, getAmp, shouldContinue, onFrame } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[LiquidGrid] liquid-grid.wgsl",
            code: LIQUID_GRID_WGSL,
        });

        const scratch = createLiquidGridScratch();
        const uniformBuffer = device.createBuffer({
            label: "[LiquidGrid] uniforms",
            size: scratch.buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bgl = device.createBindGroupLayout({
            label: "[LiquidGrid] bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
            ],
        });
        const pipeline = device.createRenderPipeline({
            label: "[LiquidGrid] pipeline",
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
            label: "[LiquidGrid] bg",
            layout: bgl,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        // Upload-only. The LEAF sized the backing store (the Golus
        // AA reads the ACTUAL backing pixel; the capped DPR rides the call-site dprPolicy);
        // the WGPU swap chain auto-resizes to it — no-op.
        function resize(_s?: BackingSize): void {}

        function frame(timeSec: number): void {
            // Advance the shared pointer field + derive the transient cursor (the no-own-rAF
            // discipline — the renderer's loop feeds the push-API).
            onFrame?.(timeSec);
            const aspect = canvas.width / Math.max(canvas.height, 1);
            // The grid scale derives from the backing-store extent so the cell pitch is honest
            // in device px (the Golus derivative reads the actual pixel).
            const viewExtentPx = canvas.height || 1;
            packLiquidGridUniforms(scratch, config, timeSec, aspect, viewExtentPx, getCursor(), getAmp());
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const encoder = device.createCommandEncoder({ label: "[LiquidGrid] frame" });
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
            rpass.setPipeline(pipeline);
            rpass.setBindGroup(0, bindGroup);
            rpass.draw(3, 1, 0, 0); // full-screen triangle
            rpass.end();
            device.queue.submit([encoder.finish()]);
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
