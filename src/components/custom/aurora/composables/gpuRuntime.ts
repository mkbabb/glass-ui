// AW.W7b — the WebGPU aurora setup (the createGPUCanvas `setup` callback).
//
// Builds the WGSL render pipeline + the uniform buffer + the storage `Field` buffer +
// the bind group on a `GPUDevice`, and returns the per-frame hooks that pack +
// writeBuffer the config and draw the SAME single-pass aurora the WebGL2 fragment path
// draws. The WGSL module is `aurora.wgsl.ts` (which splices the shared procedural-color
// WGSL twin — the color math NEVER diverges from the WebGL2/GLSL reference).
//
// AX.W07 — the dynamically-indexed palette/nuclei arrays bind to a SECOND buffer,
// `var<storage, read> F: Field` at @binding(1) (the int-in-float + uniform-dynamic-index
// black-canvas fix; see aurora.wgsl.ts). The frame seam threads `masterTempo()` into
// advanceCursor + carries the `cursor.burst` liveness term, matching the WebGL2
// `frameLoop` demand gate.
//
// AX.W14 — WebGPU is a parity-floor SINGLE-pass opt-in enhancement. The runtime draws
// ONE render pass (the base field), exactly as the WebGL2 single-pass fragment shader
// does. The dead multi-pass painterly scaffold (the structure-tensor + anisotropic
// Kuwahara, the stable-fluids wake) was EXCISED — it shipped as substrate-without-
// consumer (zero importers) and is forbidden by the no-overfitting bar. The Kuwahara
// finish is deferred to a future tranche if a real consumer demands it.

import { AURORA_WGSL } from "../constants/shaders/aurora.wgsl";
import { packGPUUniforms, WGPU_UNIFORM_FLOATS, WGPU_FIELD_FLOATS } from "./uniformBridge";
import type { GPUCanvasFrame, GPUCanvasSetupArgs } from "../../../../composables/glass/createGPUCanvas";
import type { CursorState } from "./cursorModel";
import { advanceCursor, cursorIsLive } from "./cursorModel";
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

        // The uniform + storage buffers (16-byte aligned). Reused; a slider drag refills
        // them. The WebGPU buffer-usage flag namespace is not in every lib.dom revision,
        // so the stable values are inlined: UNIFORM (0x40) | STORAGE (0x80) | COPY_DST
        // (0x8).
        const BUFFER_USAGE_UNIFORM = 0x40;
        const BUFFER_USAGE_STORAGE = 0x80;
        const BUFFER_USAGE_COPY_DST = 0x8;
        const uniformData = new Float32Array(WGPU_UNIFORM_FLOATS);
        const uniformBuffer = device.createBuffer({
            size: uniformData.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });
        // AX.W07 — the storage `Field` buffer carrying the dynamically-indexed palette +
        // nuclei vec4 arrays (a runtime index is only legal from `var<storage,read>`).
        const fieldData = new Float32Array(WGPU_FIELD_FLOATS);
        const fieldBuffer = device.createBuffer({
            size: fieldData.byteLength,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
        });
        const bindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [
                { binding: 0, resource: { buffer: uniformBuffer } },
                { binding: 1, resource: { buffer: fieldBuffer } },
            ],
        });

        // The master-tempo seam — the SAME suppression scalar the WebGL2 frameLoop
        // routes through: 0 under reduced-motion so every interactive axis (velocity,
        // burst) freezes, 1 otherwise. Threaded into advanceCursor (the integration
        // step scales, NEVER the absolute clock).
        function masterTempo(): number {
            return getReducedMotion() ? 0 : 1;
        }

        function resize(): void {
            const dpr = resolveBudgetDpr();
            // Measure the laid-out border-box, not clientWidth/clientHeight: a
            // canvas under a `content-visibility:auto` ancestor reports a zero
            // client size while that ancestor is skipped, which would size the
            // backing texture to a 1px sliver that stretches as a black band. The
            // bounding rect reflects the real box across a skip. (Parity with the
            // WebGL2 frameLoop resize.)
            const rect = canvas.getBoundingClientRect();
            const parentRect = canvas.parentElement?.getBoundingClientRect();
            const cw = rect.width || parentRect?.width || 1;
            const ch = rect.height || parentRect?.height || 1;
            const w = Math.max(1, Math.round(cw * dpr));
            const h = Math.max(1, Math.round(ch * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        }

        function frame(timeSec: number): void {
            // tempo-scaled cursor advance — the burst/velocity collapse under PRM (parity
            // with the WebGL2 frameLoop).
            advanceCursor(cursor, masterTempo());
            const cfg = getConfig();
            packGPUUniforms(cfg, timeSec, uniformData, fieldData);
            device.queue.writeBuffer(uniformBuffer, 0, uniformData);
            device.queue.writeBuffer(fieldBuffer, 0, fieldData);

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

        // Demand-gate parity with the WebGL2 `frameLoop.needsAnimation`: drift-live OR
        // the velocity-burst still decaying OR the cursor still easing → animate;
        // reduced-motion → one static frame then park (the lifecycle core gates it).
        function shouldContinue(): boolean {
            if (getReducedMotion()) return false;
            const cfg = getConfig();
            const driftLive =
                cfg.nucleiDrift !== 0 ||
                cfg.paletteDrift !== 0 ||
                cfg.breathDepth !== 0 ||
                cfg.warpDrift !== 0;
            if (driftLive) return true;
            // AX.W07 — the velocity burst keeps the loop live while it decays out (parity
            // with frameLoop, which carries the same `cursor.burst > 1e-3` term).
            if (cfg.interactivity?.light && cursor.burst > 1e-3) return true;
            return cursorIsLive(cursor);
        }

        return {
            frame,
            shouldContinue,
            resize,
            time: (elapsedSec) => (getReducedMotion() ? frozenOffset : elapsedSec),
            teardown: () => {
                uniformBuffer.destroy();
                fieldBuffer.destroy();
            },
        };
    };
}
