// BG.W-GOODOT-SETUP-SPLIT — the goo-dot-matrix per-frame `setupWGPU`/`setupGL` builders, carved
// out of useGooDotMatrix.ts (the F9 setup-split) to hold the 500-line no-god-module bound. The
// composable now owns ONLY the sim systems, the SHARED field-advance `resolveFrame`, the demand
// gate, and the lifecycle handle; it hands these builders a `GooDotFrameContext` (the closed-over
// runtime state the draw reads each frame) so the shared field SoT (packBlobWGPUUniforms /
// uploadBlobUniforms) + the dot-grid extend (packGooDotUniforms) read against ONE explicit
// contract, not N free closure captures. Each builder CALLS the one-time RESOURCE construction
// (the sibling gooDotSetup.ts leaf) ONCE on setup, then packs + draws each frame. The draw is
// byte-faithful — same two-pass shape, same uniform writes — just re-homed off the composable.

import type { BackingSize } from "../../../../composables/glass/webgpu/useGpuSubstrate";
import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { BlobConfig, BlobPointer, BlobSatelliteSystem } from "../../goo-blob";
import { packBlobWGPUUniforms } from "../../goo-blob/composables/uniformBridgeWGPU";
import {
    uploadBlobUniforms,
    type BlobFrameState,
} from "../../goo-blob/composables/uploadBlobUniforms";
import type { GooDotConfig } from "../constants";
import {
    GOO_DOT_LABEL,
    createGooDotWGPUResources,
    createGooDotGLResources,
} from "./gooDotSetup";
import {
    packGooDotUniforms,
    pointerModeSign,
    WELD_LO,
    WELD_HI,
    type GooDotPointerState,
} from "./uniformBridgeWGPU";

/** The closed-over runtime state the per-frame draw reads. The composable owns the sim + the
 * SHARED field-advance; these builders own the resource construction (via gooDotSetup.ts) + the
 * two-pass draw. */
export interface GooDotFrameContext {
    /** The dot-grid config (variant / pixel-size / floors / ground / interactive). */
    readonly config: GooDotConfig;
    /** The live field getter — read `.field` each frame (a preset swap must reach the pack). */
    getField: () => BlobConfig;
    /** The goo-blob pointer system (the field-lean SoT the pack reads). */
    readonly pointer: BlobPointer;
    /** The goo-blob satellite system (the merge/orbit SoT the pack reads). */
    readonly satellites: BlobSatelliteSystem;
    /** The transient dot-cursor push the interactive arm writes (field-uv [-0.5,0.5]). */
    readonly dotPush: GooDotPointerState;
    /** The SHARED field-advance (the goo-blob resolveFrame shape) — one source per frame. */
    resolveFrame: (timeSec: number) => BlobFrameState;
    /** The demand gate — the loop parks when the sim + dot-push are at rest. */
    shouldContinue: () => boolean;
}

/**
 * Build the WGPU `setupWGPU` closure (Register A: the dot-stamp fragment over the spliced field).
 * The one-time pipeline/buffer/bind-group build runs on `setupWGPU`; the per-frame closure packs
 * the field (binding0) + dot-grid (binding1) uniforms off the `ctx` then submits the two-pass draw.
 */
export function buildGooDotWGPUSetup(
    canvas: HTMLCanvasElement,
    ctx: GooDotFrameContext,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    return function setupWGPU(device, context, format) {
        const res = createGooDotWGPUResources(device, format);

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sizer set the backing store
        // (round(gBCR × the call-site dprPolicy); the WGPU swap chain auto-resizes to
        // it and `frame()` reads `canvas.width/height` directly — no-op.
        function resize(_s?: BackingSize): void {}

        function frame(timeSec: number): void {
            const frameState = ctx.resolveFrame(timeSec);
            // Field lanes (binding0) — the goo-blob SoT, REUSED.
            packBlobWGPUUniforms(
                res.fieldScratch,
                canvas,
                ctx.getField(),
                ctx.pointer,
                ctx.satellites,
                frameState,
            );
            device.queue.writeBuffer(res.fieldBuffer, 0, res.fieldScratch.buffer);
            // Dot-grid lanes (binding1) — the extend.
            packGooDotUniforms(
                res.dotScratch,
                ctx.config,
                { w: canvas.width || 1, h: canvas.height || 1 },
                resolveBudgetDpr(),
                ctx.dotPush,
            );
            device.queue.writeBuffer(res.dotBuffer, 0, res.dotScratch.buffer);

            const groundOn = ctx.config.fieldGround === "warm";
            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: `${GOO_DOT_LABEL} frame` });

            // Move 4a — pass 1: the warm ground (loadOp:"clear"), ONLY when fieldGround:"warm".
            // The dot pass then loads OVER it; transparent skips straight to the clear dot pass.
            if (groundOn) {
                res.groundScratch[0] = frameState.simTimeMs / 1000;
                res.groundScratch[1] = (canvas.width || 1) / (canvas.height || 1);
                device.queue.writeBuffer(res.groundBuffer, 0, res.groundScratch.buffer);
                const gPass = encoder.beginRenderPass({
                    colorAttachments: [
                        {
                            view,
                            clearValue: { r: 0, g: 0, b: 0, a: 0 },
                            loadOp: "clear",
                            storeOp: "store",
                        },
                    ],
                });
                gPass.setPipeline(res.groundPipeline);
                gPass.setBindGroup(0, res.groundBindGroup);
                gPass.draw(3, 1, 0, 0);
                gPass.end();
            }

            // Pass 2: the dot stamp. Loads over the ground if present, else clears.
            const pass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view,
                        clearValue: { r: 0, g: 0, b: 0, a: 0 },
                        loadOp: groundOn ? "load" : "clear",
                        storeOp: "store",
                    },
                ],
            });
            pass.setPipeline(res.pipeline);
            pass.setBindGroup(0, res.bindGroup);
            pass.draw(3, 1, 0, 0);
            pass.end();
            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue: ctx.shouldContinue,
            resize,
            teardown: () => {
                res.fieldBuffer.destroy();
                res.dotBuffer.destroy();
                res.groundBuffer.destroy();
            },
        };
    };
}

/**
 * Build the GL `setupGL` closure (Register A: the dot-stamp fragment; the WebGL2 fallback).
 * The one-time program/VAO/uniform-location wiring runs on `setupGL`; the per-frame closure sets
 * the dot uniforms off the `ctx` then calls the REUSED goo-blob `uploadBlobUniforms` (field + draw).
 */
export function buildGooDotGLSetup(
    canvas: HTMLCanvasElement,
    ctx: GooDotFrameContext,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    return function setupGL(gl) {
        const res = createGooDotGLResources(gl);
        const { prog, vao, locs, dU } = res;

        // BG.W-VIZ-RESIZE-ADOPT — upload-only (the leaf sized the backing store).
        function resize(s?: BackingSize): void {
            gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
        }

        function frame(timeSec: number): void {
            const frameState = ctx.resolveFrame(timeSec);
            const groundOn = ctx.config.fieldGround === "warm";

            // Move 4a — pass 1: the warm ground (the WebGL2 tail). Clear, blend OFF, draw the
            // opaque gradient quad; the dot pass then blends over it.
            if (groundOn) {
                gl.disable(gl.BLEND);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.useProgram(res.ground.prog);
                gl.bindVertexArray(res.ground.vao);
                gl.uniform1f(res.ground.uTime, frameState.simTimeMs / 1000);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                gl.bindVertexArray(null);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            }

            // Pass 2: the dot stamp.
            gl.useProgram(prog);
            // The dot-grid uniforms (set BEFORE the field upload — which issues the draw).
            const dpr = resolveBudgetDpr();
            gl.uniform1f(dU.mode, ctx.config.variant === "dot-dither" ? 1 : 0);
            gl.uniform1f(dU.pix, Math.max(ctx.config.dotPixelSize * dpr, 4));
            gl.uniform1f(dU.floor, ctx.config.fieldFloor);
            gl.uniform1f(dU.bright, ctx.config.dotBrightFloor);
            gl.uniform1f(dU.min, ctx.config.dotMin);
            gl.uniform1f(dU.max, ctx.config.dotMax);
            gl.uniform1f(dU.pr, ctx.config.pointerRadius);
            gl.uniform1f(dU.pm, pointerModeSign(ctx.config.pointerMode));
            gl.uniform1f(dU.pa, ctx.config.interactive ? ctx.dotPush.active : 0);
            gl.uniform2f(dU.cursor, ctx.dotPush.x, ctx.dotPush.y);
            gl.uniform1f(dU.bloom, ctx.dotPush.bloom);
            // The liquid-field lanes (Move 1/2/4b — the N named scalars).
            gl.uniform1f(dU.shadowGate, groundOn ? 1 : 0);
            gl.uniform1f(dU.presenceFloor, ctx.config.presenceFloor);
            gl.uniform1f(dU.weldLo, WELD_LO);
            gl.uniform1f(dU.weldHi, WELD_HI);
            gl.uniform1f(dU.time, ctx.dotPush.timeSec);
            gl.uniform1f(dU.weldSwell, ctx.config.weldSwell);
            gl.uniform1f(dU.weldSpecular, ctx.config.weldSpecular);
            gl.uniform1f(dU.flowAmt, ctx.config.flowAmt);
            gl.uniform1f(dU.latticeSquash, ctx.dotPush.latticeSquash);
            // The field uniforms + the draw (the REUSED goo-blob upload path).
            uploadBlobUniforms(
                gl,
                prog,
                vao,
                locs,
                canvas,
                ctx.getField(),
                ctx.pointer,
                ctx.satellites,
                frameState,
            );
        }

        return {
            frame,
            shouldContinue: ctx.shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(res.prog);
                gl.deleteShader(res.vs);
                gl.deleteShader(res.fs);
                gl.deleteBuffer(res.buf);
                gl.deleteVertexArray(res.vao);
                gl.deleteProgram(res.ground.prog);
                gl.deleteShader(res.ground.vs);
                gl.deleteShader(res.ground.fs);
                gl.deleteBuffer(res.ground.buf);
                gl.deleteVertexArray(res.ground.vao);
            },
        };
    };
}
