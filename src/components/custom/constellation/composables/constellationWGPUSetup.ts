// BC.W-VIZ-CONSTELLATION — the WebGPU `setupWGPU` builder (the primary path).
//
// TWO instanced render passes over the SAME stepped field: the LINES pass (instanced
// segment quads, the `edges` storage buffer) then the POINTS pass (instanced billboard
// quads, the `nodes` storage buffer) — lines under points so a node disc sits over its
// incident hairlines. Each `frame(t)` records ONE command encoder: advance the field (the
// `onFrame` hook — the ONE JS math source + the shared pointer-velocity `tick`), pack the
// node + edge + uniform buffers, `device.queue.writeBuffer` them, then a single render pass
// drawing `6 × edgeCount` line instances + `6 × nodeCount` point instances. It owns NO
// scheduling — the canvas lifecycle leaf delivers the frame.
//
// DPR-aware crispness: the canvas is sized `clientWidth · dpr` (the focal 2× budget cap —
// the wash-class clamp that produced the upscaled blur is GONE for constellation) so the
// SDF circles sample at device resolution.

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { CONSTELLATION_POINTS_WGSL } from "../shaders/constellation-points.wgsl";
import { CONSTELLATION_LINES_WGSL } from "../shaders/constellation-lines.wgsl";
import {
    CONSTELLATION_UNIFORM_BYTES,
    NODES_BUFFER_BYTES,
    EDGES_BUFFER_BYTES,
    createConstellationScratch,
    createNodeScratch,
    createEdgeScratch,
    packConstellationUniforms,
    packNodes,
    packEdges,
    type ConstellationUniformValues,
    type PackedNode,
    type PackedEdge,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; lib.dom declares the TYPES not the
// VALUE namespaces — naming them keeps the call sites readable, mirroring the goo-blob /
// dot-flow-field / concentric wgpuSetup).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;

/** The per-frame render state the renderer resolves (the stepped field → packed rows). */
export interface ConstellationRenderState {
    nodes: PackedNode[];
    edges: PackedEdge[];
    uniforms: ConstellationUniformValues;
}

export interface ConstellationWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    /** Advance the field + the shared pointer field one renderer frame, return the packed render state. */
    resolveFrame: (timeSec: number) => ConstellationRenderState | null;
    /** Size the canvas backing store (returns the resolved backing-store [w,h] in device px). */
    onResize?: (w: number, h: number) => void;
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
}

/** Build the constellation `setupWGPU(device, context, format)` callback. */
export function createConstellationWGPUSetup(
    deps: ConstellationWGPUSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, resolveFrame, onResize, shouldContinue } = deps;

    return function setupWGPU(device, context, format) {
        const pointsModule = device.createShaderModule({
            label: "[Constellation] constellation-points.wgsl",
            code: CONSTELLATION_POINTS_WGSL,
        });
        const linesModule = device.createShaderModule({
            label: "[Constellation] constellation-lines.wgsl",
            code: CONSTELLATION_LINES_WGSL,
        });

        // ── Buffers ──
        const uniformBuffer = device.createBuffer({
            label: "[Constellation] uniforms",
            size: CONSTELLATION_UNIFORM_BYTES,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });
        const nodesBuffer = device.createBuffer({
            label: "[Constellation] nodes",
            size: NODES_BUFFER_BYTES,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
        });
        const edgesBuffer = device.createBuffer({
            label: "[Constellation] edges",
            size: EDGES_BUFFER_BYTES,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
        });

        // ── Bind-group layout (shared uniforms @0 + the pass's storage @1) ──
        const pointsBGL = device.createBindGroupLayout({
            label: "[Constellation] points-bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_VERTEX,
                    buffer: { type: "read-only-storage" },
                },
            ],
        });
        const linesBGL = device.createBindGroupLayout({
            label: "[Constellation] lines-bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_VERTEX,
                    buffer: { type: "read-only-storage" },
                },
            ],
        });

        const blend: GPUBlendState = {
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
        };

        const pointsPipeline = device.createRenderPipeline({
            label: "[Constellation] points-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [pointsBGL] }),
            vertex: { module: pointsModule, entryPoint: "vs_main" },
            fragment: {
                module: pointsModule,
                entryPoint: "fs_main",
                targets: [{ format, blend }],
            },
            primitive: { topology: "triangle-list" },
        });
        const linesPipeline = device.createRenderPipeline({
            label: "[Constellation] lines-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [linesBGL] }),
            vertex: { module: linesModule, entryPoint: "vs_main" },
            fragment: {
                module: linesModule,
                entryPoint: "fs_main",
                targets: [{ format, blend }],
            },
            primitive: { topology: "triangle-list" },
        });

        const pointsBindGroup = device.createBindGroup({
            label: "[Constellation] points-bg",
            layout: pointsBGL,
            entries: [
                { binding: 0, resource: { buffer: uniformBuffer } },
                { binding: 1, resource: { buffer: nodesBuffer } },
            ],
        });
        const linesBindGroup = device.createBindGroup({
            label: "[Constellation] lines-bg",
            layout: linesBGL,
            entries: [
                { binding: 0, resource: { buffer: uniformBuffer } },
                { binding: 1, resource: { buffer: edgesBuffer } },
            ],
        });

        const uniformScratch = createConstellationScratch();
        const nodeScratch = createNodeScratch();
        const edgeScratch = createEdgeScratch();

        function resize(): void {
            // The focal lattice KEEPS the 2× budget cap (sharp discs; the wash-class sub-2×
            // clamp that produced the upscaled blur is GONE). The swap chain auto-resizes to
            // the backing store (no context.configure on resize).
            const dpr = resolveBudgetDpr();
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const w = Math.max(1, Math.round(cssW * dpr));
            const h = Math.max(1, Math.round(cssH * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            onResize?.(canvas.width, canvas.height);
        }

        function frame(timeSec: number): void {
            const state = resolveFrame(timeSec);
            if (!state) return;

            const nodeCount = packNodes(nodeScratch, state.nodes);
            const edgeCount = packEdges(edgeScratch, state.edges);
            packConstellationUniforms(uniformScratch, state.uniforms);

            device.queue.writeBuffer(uniformBuffer, 0, uniformScratch.buffer);
            if (nodeCount > 0)
                device.queue.writeBuffer(
                    nodesBuffer,
                    0,
                    nodeScratch.buffer,
                    nodeScratch.byteOffset,
                    nodeCount * 4 * 4,
                );
            if (edgeCount > 0)
                device.queue.writeBuffer(
                    edgesBuffer,
                    0,
                    edgeScratch.buffer,
                    edgeScratch.byteOffset,
                    edgeCount * 8 * 4,
                );

            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: "[Constellation] frame" });
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
            // Lines under points (a node disc sits over its incident hairlines).
            if (edgeCount > 0) {
                rpass.setPipeline(linesPipeline);
                rpass.setBindGroup(0, linesBindGroup);
                rpass.draw(6, edgeCount, 0, 0);
            }
            if (nodeCount > 0) {
                rpass.setPipeline(pointsPipeline);
                rpass.setBindGroup(0, pointsBindGroup);
                rpass.draw(6, nodeCount, 0, 0);
            }
            rpass.end();
            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                uniformBuffer.destroy();
                nodesBuffer.destroy();
                edgesBuffer.destroy();
            },
        };
    };
}
