// BD.W-CONCENTRIC-RELIEF — the WebGPU `setupWGPU` builder (the primary path).
//
// A pure fullscreen fragment pass (the aurora shape-class — no compute, no particles):
// the full-screen-triangle `vs_main` + the `fs_main` level-set hypsometric-survey evaluator.
// Each `frame(t)` records ONE command encoder: pack the uniform buffer (the typed-struct SoT),
// begin a render pass against the swap-chain view, draw 3 vertices, submit. It owns NO
// scheduling — the canvas lifecycle leaf delivers the frame.

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { OklchStop } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { CONCENTRIC_WGSL } from "../shaders/concentric.wgsl";
import type { ConcentricConfig } from "../constants";
import type { Vec2 } from "./levelField";
import {
    createConcentricScratch,
    packConcentricUniforms,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; lib.dom declares the TYPES not
// the VALUE namespaces — naming them keeps the call sites readable, mirroring the
// dot-flow-field / goo-blob wgpuSetup).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

export interface ConcentricWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    config: ConcentricConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** The pointer in DOMAIN space (the cursor gravity well) — re-read each frame. */
    getCursor: () => Vec2;
    /** The spring-eased traveling-wave envelope amplitude (0..1; PRM → 0). */
    getAmp: () => number;
    /** The velocity-HEAVE multiplier on the cursor well (1.0 at rest → grows with speed). */
    getWellScale: () => number;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useConcentric advances the shared `usePointerVelocityField`
     * here (the no-own-rAF discipline: the renderer's frame loop FEEDS `tick(delta)`) and
     * derives the cursor in domain space. ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
}

/** Build the concentric `setupWGPU(device, context, format)` callback. */
export function createConcentricWGPUSetup(
    deps: ConcentricWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, getCursor, getAmp, getWellScale, shouldContinue, onFrame } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[Concentric] concentric.wgsl",
            code: CONCENTRIC_WGSL,
        });

        const scratch = createConcentricScratch();
        const uniformBuffer = device.createBuffer({
            label: "[Concentric] uniforms",
            size: scratch.buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bgl = device.createBindGroupLayout({
            label: "[Concentric] bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
            ],
        });
        const pipeline = device.createRenderPipeline({
            label: "[Concentric] pipeline",
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
            label: "[Concentric] bg",
            layout: bgl,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        function resize(): void {
            // A wash-class field — the aurora sub-2× DPR ceiling fits (the swap chain
            // auto-resizes to the backing store).
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
            // Advance the shared pointer field + inject the transient cursor center (the
            // no-own-rAF discipline — the renderer's loop feeds the push-API).
            onFrame?.(timeSec);
            const aspect =
                (canvas.clientWidth || 320) / Math.max(canvas.clientHeight || 320, 1);
            packConcentricUniforms(
                scratch,
                config,
                timeSec,
                aspect,
                getPalette(),
                getCursor(),
                getAmp(),
                getWellScale(),
            );
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const encoder = device.createCommandEncoder({ label: "[Concentric] frame" });
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
