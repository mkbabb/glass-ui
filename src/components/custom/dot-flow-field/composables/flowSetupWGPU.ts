// BG.W-DOTFLOW-REBUILD — the WebGPU STREAMLINE fullscreen-fragment setup (the primary path).
//
// `createFlowWGPUSetup` returns a `setupWGPU(device, context, format)` the picker invokes on the
// WebGPU primary path. It builds ONE render pipeline over the full-screen triangle (the
// aurora.wgsl shape — the pipeline that paints identically on WebKit-WebGPU + Chrome/Metal), a
// single uniform buffer (the `uniformBridgeWGPU` typed-struct source-of-truth), and a fragment
// bind group. Each `frame(t)` records ONE render pass — NO compute pass, NO storage particles,
// NO trail ping-pong (the whole additive-flood pipeline is RETIRED with the mote architecture).

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { FLOW_FIELD_WGSL } from "../shaders/flow-field.wgsl";
import {
    FLOW_WGPU_UNIFORM_BYTES,
    createFlowScratch,
    deriveStreamUniforms,
    packFlowUniforms,
} from "./uniformBridgeWGPU";
import { type FlowSetupDeps, backingAspect } from "./flowSetup";

// WebGPU usage/visibility bitflags (webgpu.idl constants; `lib.dom` declares the TYPES not the
// VALUE namespaces — naming them keeps the call sites readable).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

/**
 * Build the dot-flow-field `setupWGPU(device, context, format)` callback. Closes over the
 * config/palette getters + the renderer's demand gate + the pointer `onFrame`/`getPointer`.
 */
export function createFlowWGPUSetup(
    deps: FlowSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame, getPointer } = deps;

    return function setupWGPU(device, context, format) {
        const module = device.createShaderModule({
            label: "[DotFlowField] flow-field.wgsl",
            code: FLOW_FIELD_WGSL,
        });

        const uniformBuffer = device.createBuffer({
            label: "[DotFlowField] uniforms",
            size: FLOW_WGPU_UNIFORM_BYTES,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bindGroupLayout = device.createBindGroupLayout({
            label: "[DotFlowField] bind-group-0",
            entries: [
                { binding: 0, visibility: SHADER_STAGE_FRAGMENT, buffer: { type: "uniform" } },
            ],
        });

        const pipeline = device.createRenderPipeline({
            label: "[DotFlowField] pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
            vertex: { module, entryPoint: "vs_main" },
            fragment: {
                module,
                entryPoint: "fs_main",
                targets: [
                    {
                        format,
                        // Premultiplied-alpha over the transparent clear — the fragment outputs
                        // opaque (a=1), so this resolves to a straight replace on the swapchain.
                        blend: {
                            color: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
                            alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
                        },
                    },
                ],
            },
            primitive: { topology: "triangle-list" },
        });

        const bindGroup = device.createBindGroup({
            label: "[DotFlowField] bind-group",
            layout: bindGroupLayout,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const scratch = createFlowScratch();

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sized the backing store; the WGPU swap
        // chain auto-resizes to it on the next frame, so the WGSL leg is a no-op.
        function resize(_s?: BackingSize): void {}

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const aspect = backingAspect(canvas);
            const dpr = Math.max(resolveBudgetDpr(), 1);
            const pointer = getPointer?.();
            const u = deriveStreamUniforms(
                config,
                timeSec,
                aspect,
                canvas.height,
                dpr,
                getPalette(),
                pointer,
            );
            packFlowUniforms(scratch, u);
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: "[DotFlowField] frame" });
            const pass = encoder.beginRenderPass({
                colorAttachments: [
                    { view, clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                ],
            });
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
            pass.draw(3, 1, 0, 0);
            pass.end();
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
