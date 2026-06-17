/**
 * Aurora WGSL setup seam — the WebGPU twin of `glSetup` + `frameLoop`.
 *
 * `createAuroraWGPUSetup` returns a `setupWGPU(device, context, format)` callback the
 * `useGpuSubstrate` picker invokes on the async arm (AND on every device-restore). It
 * builds the render pipeline (the `aurora.wgsl` full-screen-triangle pass), the uniform
 * buffer (the `uniformBridgeWGPU` typed-struct source-of-truth), and the bind group, then
 * returns the substrate's per-frame hooks (`frame`/`shouldContinue`/`resize`/`time`/
 * `teardown`).
 *
 * The render-demand gate + the cursor-advance + the DPR resize mirror the WebGL2
 * `frameLoop`/`runtime.resize` exactly — the loop is substrate-AGNOSTIC, so the same
 * `getConfig`/`getReducedMotion`/`cursor` closures drive both backends.
 */

import type {
    WebGPUCanvasFrame,
} from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import { AURORA_WGSL } from "../constants/shaders/aurora.wgsl";
import { resolveAuroraWashDpr } from "../constants/budget";
import {
    advanceCursor,
    cursorIsLive,
    type CursorState,
} from "./cursorModel";
import {
    AURORA_WGPU_UNIFORM_BYTES,
    createAuroraWGPUUniformScratch,
    packAuroraWGPUUniforms,
} from "./uniformBridgeWGPU";
import type { AuroraConfig } from "../constants/presets";

export interface AuroraWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    cursor: CursorState;
    getConfig: () => AuroraConfig;
    getReducedMotion: () => boolean;
}

// The WebGPU usage/visibility bitflags as their SPEC-defined constants. `lib.dom.d.ts`
// declares the GPU* interface TYPES but NOT the runtime `GPUBufferUsage`/`GPUShaderStage`
// VALUE namespaces (those ride `@webgpu/types`, which the library does not depend on —
// the substrate uses GPU types only). The spec values are stable + immutable
// (webgpu.idl): GPUBufferUsage.UNIFORM = 0x40, COPY_DST = 0x8; GPUShaderStage.FRAGMENT
// = 0x2. Naming them here keeps the call sites readable without the extra type dep.
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

/**
 * Build the aurora `setupWGPU(device, context, format)` callback. Closes over the
 * aurora-specific state (cursor/config/reduced-motion) the runtime owns — identical to
 * the closures the WebGL2 `setup` threads.
 */
export function createAuroraWGPUSetup(
    deps: AuroraWGPUSetupDeps,
): (device: GPUDevice, context: GPUCanvasContext, format: GPUTextureFormat) => WebGPUCanvasFrame {
    const { canvas, cursor, getConfig, getReducedMotion } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[Aurora] aurora.wgsl",
            code: AURORA_WGSL,
        });

        const uniformBuffer = device.createBuffer({
            label: "[Aurora] uniforms",
            size: AURORA_WGPU_UNIFORM_BYTES,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bindGroupLayout = device.createBindGroupLayout({
            label: "[Aurora] bind-group-0",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
            ],
        });

        const pipeline = device.createRenderPipeline({
            label: "[Aurora] pipeline",
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
            label: "[Aurora] bind-group",
            layout: bindGroupLayout,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const scratch = createAuroraWGPUUniformScratch();

        function resize(): void {
            // BB.W-PERF-PRODUCER A′-5 mirror — the aurora wash backs at the SUB-2×
            // ceiling (the consumer owns its DPR policy; the leaf does not bake it).
            const dpr = resolveAuroraWashDpr();
            const rect = canvas.getBoundingClientRect();
            const parentRect = canvas.parentElement?.getBoundingClientRect();
            const cw = rect.width || parentRect?.width || 1;
            const ch = rect.height || parentRect?.height || 1;
            const w = Math.max(1, Math.round(cw * dpr));
            const h = Math.max(1, Math.round(ch * dpr));
            // The swap chain auto-resizes to the backing store; only the canvas
            // dimension changes (no context.configure on resize).
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        }

        function frame(timeSec: number): void {
            // tempo-scaled cursor advance — the burst/velocity collapse under PRM.
            advanceCursor(cursor, getReducedMotion() ? 0 : 1);

            // Pack + upload the uniforms (slider drag refills the scratch in place).
            packAuroraWGPUUniforms(scratch, getConfig(), cursor, timeSec);
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: "[Aurora] frame" });
            const pass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view,
                        // clear to transparent — premultiplied-alpha over the page.
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
        }

        function shouldContinue(): boolean {
            if (getReducedMotion()) return false;
            const config = getConfig();
            const driftLive =
                config.nucleiDrift !== 0 ||
                config.paletteDrift !== 0 ||
                config.breathDepth !== 0 ||
                config.warpDrift !== 0;
            if (driftLive) return true;
            if (config.interactivity?.light && cursor.burst > 1e-3) return true;
            return cursorIsLive(cursor);
        }

        return {
            frame,
            shouldContinue,
            resize,
            // reduced-motion freezes time at the authored offset (matches the WebGL2
            // runtime's `frozenOffset` of 3.7); otherwise pass elapsed seconds through.
            time: (elapsedSec) => (getReducedMotion() ? 3.7 : elapsedSec),
            teardown: () => {
                uniformBuffer.destroy();
            },
        };
    };
}
