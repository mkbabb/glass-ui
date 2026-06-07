// AW.W7b — the WebGPU aurora setup (the createGPUCanvas `setup` callback).
//
// Builds the WGSL render pipeline + the std140 uniform buffer + the bind group on a
// `GPUDevice`, and returns the per-frame hooks that pack + writeBuffer the config and
// draw the SAME single-pass aurora the WebGL2 fragment path draws. The WGSL module is
// `aurora.wgsl.ts` (which splices the shared procedural-color WGSL twin — the color
// math NEVER diverges from the WebGL2/GLSL reference). The multi-pass painterly half
// (the smoothed tensor + the anisotropic Kuwahara) is `painterly.wgsl.ts` (W7c), wired
// through the generic FBO/storageTexture seam — NOT baked here.
//
// This module BAKES NO pass-count / tensor format / Kuwahara-sector-count (the
// proof:webgpu-substrate-single clause-2 leak): it draws ONE render pass (the base
// field), exactly as the WebGL2 single-pass fragment shader does. The W7c multi-pass
// passes are a GENERIC N-pass declaration the consumer configures.

import { AURORA_WGSL } from "../constants/shaders/aurora.wgsl";
import { packGPUUniforms, WGPU_UNIFORM_FLOATS } from "./uniformBridge";
import type { GPUCanvasFrame, GPUCanvasSetupArgs } from "../../../../composables/glass/createGPUCanvas";
import type { CursorState } from "./cursorModel";
import { advanceCursor } from "./cursorModel";
import { resolveBudgetDpr } from "../constants/budget";
import type { AuroraConfig } from "../constants/presets";

export interface GPUAuroraDeps {
    canvas: HTMLCanvasElement;
    getConfig: () => AuroraConfig;
    cursor: CursorState;
    getReducedMotion: () => boolean;
    /** The frozen frame-time offset under reduced motion (matches the WebGL2 path). */
    frozenOffset: number;
}

/**
 * The `setup` callback for `createGPUCanvas`. Builds the pipeline once on the device,
 * returns the frame hooks. The single render pass draws the WGSL aurora base field.
 */
export function createGPUAuroraSetup(deps: GPUAuroraDeps) {
    const { canvas, getConfig, cursor, getReducedMotion, frozenOffset } = deps;

    return function setup({ device, context, format }: GPUCanvasSetupArgs): GPUCanvasFrame {
        const module = device.createShaderModule({ code: AURORA_WGSL });
        const pipeline = device.createRenderPipeline({
            layout: "auto",
            vertex: { module, entryPoint: "vs_main" },
            fragment: {
                module,
                entryPoint: "fs_main",
                targets: [
                    {
                        format,
                        // Premultiplied-alpha blend (matches the WebGL2 gl.blendFunc
                        // ONE, ONE_MINUS_SRC_ALPHA + the premultiply-after-OETF).
                        blend: {
                            color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                            alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                        },
                    },
                ],
            },
            primitive: { topology: "triangle-list" },
        });

        // The std140 uniform buffer (16-byte aligned). Reused; a slider drag refills it.
        // GPUBufferUsage.UNIFORM (0x40) | COPY_DST (0x8) — the const namespace is not in
        // every lib.dom revision, so the stable WebGPU flag values are inlined.
        const BUFFER_USAGE_UNIFORM = 0x40;
        const BUFFER_USAGE_COPY_DST = 0x8;
        const uniformData = new Float32Array(WGPU_UNIFORM_FLOATS);
        const uniformBuffer = device.createBuffer({
            size: uniformData.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });
        const bindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        function resize(): void {
            const dpr = resolveBudgetDpr();
            const cw = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
            const ch = canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
            canvas.width = Math.max(1, Math.floor(cw * dpr));
            canvas.height = Math.max(1, Math.floor(ch * dpr));
        }

        function frame(timeSec: number): void {
            advanceCursor(cursor);
            const cfg = getConfig();
            packGPUUniforms(cfg, timeSec, uniformData);
            device.queue.writeBuffer(uniformBuffer, 0, uniformData);

            const encoder = device.createCommandEncoder();
            const view = context.getCurrentTexture().createView();
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
            pass.draw(3); // the full-screen triangle (same as the WebGL2 quad).
            pass.end();
            device.queue.submit([encoder.finish()]);
        }

        // Demand-gate parity with the WebGL2 path: drift-live OR cursor-live → animate;
        // reduced-motion → one static frame then park (the lifecycle core gates it).
        function shouldContinue(): boolean {
            if (getReducedMotion()) return false;
            const cfg = getConfig();
            return (
                cfg.nucleiDrift !== 0 ||
                cfg.paletteDrift !== 0 ||
                cfg.breathDepth !== 0 ||
                cfg.warpDrift !== 0
            );
        }

        return {
            frame,
            shouldContinue,
            resize,
            time: (elapsedSec) => (getReducedMotion() ? frozenOffset : elapsedSec),
            teardown: () => {
                uniformBuffer.destroy();
            },
        };
    };
}
