// BC.W-VIZ-PAPERGRID — the WebGPU `setupWGPU` builder (the primary path).
//
// A pure fullscreen fragment pass (the aurora/concentric shape-class — no compute, no
// particles): the full-screen-triangle `vs_main` + the `fs_main` liquid-grid evaluator. Each
// `frame(t)` records ONE command encoder: pack the uniform buffer (the typed-struct SoT),
// begin a render pass against the swap-chain view, draw 3 vertices, submit. It owns NO
// scheduling — the canvas lifecycle leaf delivers the frame.

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { PAPER_GRID_WGSL } from "../shaders/paper-grid.wgsl";
import type { PaperGridConfig } from "../constants";
import type { Vec2 } from "./paperGrid";
import { createPaperGridScratch, packPaperGridUniforms } from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; lib.dom declares the TYPES not the
// VALUE namespaces — naming them keeps the call sites readable, mirroring concentric).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

export interface PaperGridWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    config: PaperGridConfig;
    /** The transient pointer cursor in GRID space — re-read each frame (the pointer bulge). */
    getCursor: () => Vec2;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — usePaperGrid advances the shared `usePointerVelocityField`
     * here (the no-own-rAF discipline: the renderer's frame loop FEEDS `tick(delta)`) and
     * derives the transient cursor. ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
}

/** Build the paper-grid `setupWGPU(device, context, format)` callback. */
export function createPaperGridWGPUSetup(
    deps: PaperGridWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getCursor, shouldContinue, onFrame } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[PaperGrid] paper-grid.wgsl",
            code: PAPER_GRID_WGSL,
        });

        const scratch = createPaperGridScratch();
        const uniformBuffer = device.createBuffer({
            label: "[PaperGrid] uniforms",
            size: scratch.buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bgl = device.createBindGroupLayout({
            label: "[PaperGrid] bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
            ],
        });
        const pipeline = device.createRenderPipeline({
            label: "[PaperGrid] pipeline",
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
            label: "[PaperGrid] bg",
            layout: bgl,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        function resize(): void {
            // A wash-class field — the aurora sub-2× DPR ceiling fits; the Golus AA reads the
            // ACTUAL backing-store pixel, so a capped DPR keeps the lines crisp.
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
            // Advance the shared pointer field + derive the transient cursor (the no-own-rAF
            // discipline — the renderer's loop feeds the push-API).
            onFrame?.(timeSec);
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const aspect = cssW / Math.max(cssH, 1);
            // The grid scale derives from the backing-store extent so the cell pitch is honest
            // in device px (the Golus derivative reads the actual pixel).
            const viewExtentPx = canvas.height || Math.round(cssH * resolveBudgetDpr());
            packPaperGridUniforms(scratch, config, timeSec, aspect, viewExtentPx, getCursor());
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const encoder = device.createCommandEncoder({ label: "[PaperGrid] frame" });
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
