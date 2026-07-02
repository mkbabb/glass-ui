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
    BackingSize,
} from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import { AURORA_WGSL } from "../constants/shaders/aurora.wgsl";
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
import type { UsePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";

export interface AuroraWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    cursor: CursorState;
    getConfig: () => AuroraConfig;
    getReducedMotion: () => boolean;
    /**
     * BC.W-VIZ-AURORA (T5) — the shared viz-pointer-physics field (BB.B4). FED
     * `tick(deltaMs)` from the WGPU frame callback (the SAME field instance the WebGL2
     * loop feeds — one source, no own rAF); the renderer reads `acceleration` for the
     * iOS-27 gel snap-back.
     */
    pointerField: UsePointerVelocityField;
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
    const { canvas, cursor, getConfig, getReducedMotion, pointerField } = deps;
    // BC.W-VIZ-AURORA (T5) — the per-frame delta the shared field's tick() needs (the
    // first frame seeds prevTime so the opening delta is 0 — no teleport spike).
    let prevTimeSec: number | null = null;

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

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sizer already set the backing
        // store (round(gBCR × resolveAuroraWashDpr), the call-site dprPolicy); the WGPU
        // swap chain auto-resizes to it on the next frame, so the WGSL leg is a no-op.
        function resize(_s?: BackingSize): void {}

        function frame(timeSec: number): void {
            // BC.W-VIZ-AURORA (T5) — FEED the shared pointer field one tick (the one-loop
            // push-step; no own rAF). Under PRM tick(0) freezes the field. Then apply the
            // iOS-27 gel SNAP-BACK: a fast flick that DECELERATES (accel opposes velocity)
            // injects a transient over-warp into the cursor burst the shader already reads.
            const tempo = getReducedMotion() ? 0 : 1;
            const deltaMs =
                prevTimeSec === null
                    ? 0
                    : Math.max(0, (timeSec - prevTimeSec) * 1000);
            prevTimeSec = timeSec;
            pointerField.tick(tempo === 0 ? 0 : deltaMs);
            const accel = pointerField.acceleration.value;
            const vel = pointerField.velocity.value;
            const decel = -(accel.x * vel.x + accel.y * vel.y);
            if (decel > 0 && tempo > 0) {
                cursor.burst = Math.min(1, cursor.burst + decel * 6.0);
            }

            // tempo-scaled cursor advance — the burst/velocity collapse under PRM.
            advanceCursor(cursor, tempo);

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
