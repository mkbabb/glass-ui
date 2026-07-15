// BC.W-VIZ-CONSTELLATION — the typed-struct SOURCE OF TRUTH for the WebGPU constellation
// storage + uniform buffers.
//
// The WGSL `Node`/`Edge` storage structs + `ConstellationUniforms` uniform struct and the
// JS `ArrayBuffer` write offsets are generated from the SAME layout tables here, so a
// std140-vs-WGSL alignment mismatch (the parity-ΔE-blowout / garbage-read trap) is
// structurally impossible — the field order + the byte offsets are ONE declaration. The
// aurora / goo-blob / dot-flow-field migrations established this pattern; this is its
// constellation twin (the two STORAGE buffers — nodes + edges — written each frame from the
// JS field step + the CPU edge scan, the ONE math source).
//
// Every storage row packs into a 16-byte-aligned lane so the array stride is the natural 16
// bytes (no std140 stride surprise): Node is one vec4 (pos.x, pos.y, radius, dim); Edge is
// two vec4s (a.x, a.y, b.x, b.y) + one vec4 (alpha, accent, focus, _pad) = 48 bytes.

import { E_MAX, MAX_NODES } from "../constants";

// ── Node storage row: vec4f (pos.x, pos.y, radius, dim) — 16 bytes ──────────────
/** Floats per node row (one vec4). */
export const NODE_FLOATS = 4;
/** Bytes per node row. */
export const NODE_BYTES = NODE_FLOATS * 4;
/** The pre-sized node storage buffer byte length. */
export const NODES_BUFFER_BYTES = MAX_NODES * NODE_BYTES;

// ── Edge storage row: vec4f (a.xy, b.xy) + vec4f (alpha, accent, focus, _pad) — 32 bytes
//   Both endpoint pairs ride ONE vec4 (a.x, a.y, b.x, b.y) and the weights ride a second
//   vec4 (alpha, accent, focus, _pad) so the struct is two 16-byte-aligned vec4s with NO
//   std140 vec2-stride surprise (the garbage-read fence).
/** Floats per edge row (2 vec4s). */
export const EDGE_FLOATS = 8;
/** Bytes per edge row. */
export const EDGE_BYTES = EDGE_FLOATS * 4;
/** The pre-sized edge storage buffer byte length. */
export const EDGES_BUFFER_BYTES = E_MAX * EDGE_BYTES;

// ── Constellation uniform layout (the typed-struct source-of-truth — see CONSTELLATION_WGSL)
//   u0      : vec4<f32>  off  0  (resolution.x, resolution.y, dpr, kVis)
//   u1      : vec4<f32>  off 16  (time, lineWidth, opacityCeiling, alpha)
//   uEdge   : vec4<f32>  off 32  (edgeAlpha, edgeFocusAlpha, edgeAccentAlpha, edgeFloor)
//   uNode   : vec4<f32>  off 48  (node.rgb premultiplied-ready, node.a)
//   uNodeDim: vec4<f32>  off 64  (nodeDim.rgb, nodeDim.a)
//   uLine   : vec4<f32>  off 80  (line.rgb, line.a)
//   uAccent : vec4<f32>  off 96  (accent.rgb, accent.a)
//   total   : 112 bytes
export const CONSTELLATION_UNIFORM_BYTES = 112;

const OFF = {
    u0: 0, // resolution.x, resolution.y, dpr, kVis
    u1: 4, // time, lineWidth, opacityCeiling, alpha
    uEdge: 8, // edgeAlpha, edgeFocusAlpha, edgeAccentAlpha, edgeFloor
    uNode: 12, // node rgba
    uNodeDim: 16, // nodeDim rgba
    uLine: 20, // line rgba
    uAccent: 24, // accent rgba
} as const;

export interface ConstellationUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
}

export function createConstellationScratch(): ConstellationUniformScratch {
    const buffer = new ArrayBuffer(CONSTELLATION_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer) };
}

/** The per-frame uniform values the render reads (resolved JS-side). */
export interface ConstellationUniformValues {
    resolutionX: number;
    resolutionY: number;
    dpr: number;
    kVis: number;
    time: number;
    lineWidth: number;
    opacityCeiling: number;
    /** The field-yields-to-type `--constellation-alpha` global dimmer. */
    alpha: number;
    edgeAlpha: number;
    edgeFocusAlpha: number;
    edgeAccentAlpha: number;
    edgeFloor: number;
    /** Premultiplied-ready RGBA (`[0,1]`) — `node`/`nodeDim`/`line`/`accent`. */
    node: [number, number, number, number];
    nodeDim: [number, number, number, number];
    line: [number, number, number, number];
    accent: [number, number, number, number];
}

/** Pack the constellation uniforms in place. */
export function packConstellationUniforms(
    scratch: ConstellationUniformScratch,
    v: ConstellationUniformValues,
): ConstellationUniformScratch {
    const { f32 } = scratch;
    f32[OFF.u0 + 0] = v.resolutionX;
    f32[OFF.u0 + 1] = v.resolutionY;
    f32[OFF.u0 + 2] = v.dpr;
    f32[OFF.u0 + 3] = v.kVis;

    f32[OFF.u1 + 0] = v.time;
    f32[OFF.u1 + 1] = v.lineWidth;
    f32[OFF.u1 + 2] = v.opacityCeiling;
    f32[OFF.u1 + 3] = v.alpha;

    f32[OFF.uEdge + 0] = v.edgeAlpha;
    f32[OFF.uEdge + 1] = v.edgeFocusAlpha;
    f32[OFF.uEdge + 2] = v.edgeAccentAlpha;
    f32[OFF.uEdge + 3] = v.edgeFloor;

    writeColor(f32, OFF.uNode, v.node);
    writeColor(f32, OFF.uNodeDim, v.nodeDim);
    writeColor(f32, OFF.uLine, v.line);
    writeColor(f32, OFF.uAccent, v.accent);
    return scratch;
}

function writeColor(
    f32: Float32Array,
    base: number,
    c: [number, number, number, number],
): void {
    f32[base + 0] = c[0];
    f32[base + 1] = c[1];
    f32[base + 2] = c[2];
    f32[base + 3] = c[3];
}

// ── The node + edge storage WRITE seam ──────────────────────────────────────────
// The render loop steps the field (the ONE JS math source), maps each node through the
// parallax offset, and packs the result into these scratch typed arrays each frame; the
// substrate uploads them to the storage buffers via `device.queue.writeBuffer`. The same
// packed Float32Arrays feed the WebGL2 instanced-arrays twin (one pack, two backends).

/** A pre-sized node scratch (`MAX_NODES` rows × NODE_FLOATS). */
export function createNodeScratch(): Float32Array {
    return new Float32Array(MAX_NODES * NODE_FLOATS);
}

/** A pre-sized edge scratch (`E_MAX` rows × EDGE_FLOATS). */
export function createEdgeScratch(): Float32Array {
    return new Float32Array(E_MAX * EDGE_FLOATS);
}

/** A packed node row in screen-px: `(x, y, radius, dim)`. */
export interface PackedNode {
    x: number;
    y: number;
    r: number;
    dim: number;
}

/** Pack `count` node rows into the scratch (clamped to MAX_NODES). Returns the count packed. */
export function packNodes(scratch: Float32Array, nodes: readonly PackedNode[]): number {
    const n = Math.min(nodes.length, MAX_NODES);
    for (let i = 0; i < n; i++) {
        const o = i * NODE_FLOATS;
        const p = nodes[i];
        scratch[o + 0] = p.x;
        scratch[o + 1] = p.y;
        scratch[o + 2] = p.r;
        scratch[o + 3] = p.dim;
    }
    return n;
}

/** A packed edge row: `(ax, ay, bx, by, alpha, accent, focus)`. */
export interface PackedEdge {
    ax: number;
    ay: number;
    bx: number;
    by: number;
    alpha: number;
    accent: number;
    focus: number;
}

/** Pack `count` edge rows into the scratch (clamped to E_MAX). Returns the count packed. */
export function packEdges(scratch: Float32Array, edges: readonly PackedEdge[]): number {
    const n = Math.min(edges.length, E_MAX);
    for (let i = 0; i < n; i++) {
        const o = i * EDGE_FLOATS;
        const e = edges[i];
        // vec4 0: (a.x, a.y, b.x, b.y)
        scratch[o + 0] = e.ax;
        scratch[o + 1] = e.ay;
        scratch[o + 2] = e.bx;
        scratch[o + 3] = e.by;
        // vec4 1: (alpha, accent, focus, _pad)
        scratch[o + 4] = e.alpha;
        scratch[o + 5] = e.accent;
        scratch[o + 6] = e.focus;
        scratch[o + 7] = 0;
    }
    return n;
}
