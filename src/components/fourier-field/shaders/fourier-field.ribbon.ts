// BI.W-FOURIER-RIBBON — the shared instanced-ribbon GEOMETRY leaf (the O(covered_pixels) fix).
//
// The fullscreen per-pixel SDF (`fs_main`/`FOURIER_FIELD_FRAG_GLSL` looping over ALL ≤384
// segments at EVERY pixel — O(pixels×segments) for a curve covering <5% of the canvas, the
// "god awful" architecture) RETIRED onto instanced geometry: the ribbon paints one small
// CAPSULE QUAD per segment, each covering ONLY its own `glowHalf`-padded bounding box and
// running the EXACT `segDist` under-glow+core over-composite the fullscreen loop ran. The
// result is pixel-identical BY over-composite ASSOCIATIVITY — each segment over-composited
// separately with its own per-segment age in the loop == each segment's premultiplied
// contribution blended `over` the framebuffer in draw order — at O(covered_pixels).
//
// This leaf is the ONE geometry plan BOTH backends read: the unit-quad corners (the WebGL2
// instanced-strip geometry; the WGPU render pass builds the SAME quad in-shader off
// `vertex_index` and vertex-PULLS the per-instance endpoints from the byte-identical
// compute-filled `curveSamples`/`chainTips` storage buffers) + the ordered per-frame LAYER
// PLAN (cel → epicycle → trail → head — the fullscreen loop's draw order preserved) that
// both setups iterate to issue their instanced draws.
//
// THE RIBBON-TAIL MIRROR (proof:viz FB1 / proof:viz-fourier-ribbon FB3). The `RIBBON_TAIL_FRAC`
// taper + the `RIBBON_UNDERGLOW_*` under-glow stay MIRRORED verbatim in BOTH shader strings
// (a GLSL/WGSL twin cannot import a TS const); the gate cross-checks the three copies are equal
// so the mid-body floor can never drift off the taper through the rewrite.

/**
 * The ordered ribbon LAYER kinds — the fullscreen loop's draw order, one instanced draw each:
 *   cel-rope → cel-arm  (the technicolor ink shadow, painted FIRST, UNDER the lit chain)
 *   epicycle            (the orbit rings + arms + joint dots — the scaffold under the curve)
 *   trail               (the tapered luminous ribbon over its own under-glow)
 *   head                (the squash-and-stretch comet head — halo + core + specular)
 */
export type RibbonLayerKind = "cel-rope" | "cel-arm" | "epicycle" | "trail" | "head";

/**
 * The blend mode a layer draws with. `over` is the premultiplied source-over
 * (`ONE, ONE_MINUS_SRC_ALPHA`) every layer but the epicycle uses. `max` (per-channel
 * `blendEquation MAX`) is the FB5 fix for the epicycle-join over-composite SEAM: adjacent
 * arms' rings/dots overlap, and over-compositing them separately double-darkened the joins
 * (the named 9× residual); MAX makes the epicycle group a per-channel UNION so overlapping
 * arms take the brighter contribution instead of stacking.
 */
export type RibbonBlend = "over" | "max";

/** The shader LAYER selector (WGSL override `LAYER` / GLSL `uLayer`) per kind. */
export const RIBBON_LAYER_ID: Readonly<Record<RibbonLayerKind, number>> = {
    trail: 0,
    epicycle: 1,
    head: 2,
    "cel-rope": 3,
    "cel-arm": 4,
} as const;

export interface RibbonLayer {
    readonly kind: RibbonLayerKind;
    /** The instance count for this layer's single `drawInstanced` (0 layers are omitted). */
    readonly instanceCount: number;
    readonly blend: RibbonBlend;
}

export interface RibbonPlanInput {
    /** The comet-curve sample count — the trail draws `sampleCount − 1` capsule instances. */
    readonly sampleCount: number;
    /** The epicycle arm count (0 / `showEpicycles: false` → no epicycle + no cel-arm layer). */
    readonly armCount: number;
    readonly showEpicycles: boolean;
    /** The cel-shadow gain — `0` omits the cel-rope + cel-arm layers (byte-frozen). */
    readonly celGain: number;
}

/**
 * The per-frame ribbon DRAW PLAN both backends iterate — the ordered list of instanced draws
 * that reproduces the fullscreen loop's paint (cel first/under, head last/over). An empty
 * layer (no arms, no cel) is omitted, never a zero-instance draw.
 */
export function planRibbonLayers(input: RibbonPlanInput): RibbonLayer[] {
    const segInstances = Math.max(0, Math.floor(input.sampleCount) - 1);
    const armInstances =
        input.showEpicycles ? Math.max(0, Math.floor(input.armCount)) : 0;
    const cel = input.celGain > 0.001;
    const layers: RibbonLayer[] = [];
    if (cel && segInstances > 0)
        layers.push({ kind: "cel-rope", instanceCount: segInstances, blend: "over" });
    if (cel && armInstances > 0)
        layers.push({ kind: "cel-arm", instanceCount: armInstances, blend: "over" });
    if (armInstances > 0)
        layers.push({ kind: "epicycle", instanceCount: armInstances, blend: "max" });
    if (segInstances > 0)
        layers.push({ kind: "trail", instanceCount: segInstances, blend: "over" });
    layers.push({ kind: "head", instanceCount: 1, blend: "over" });
    return layers;
}

/**
 * The unit quad as a 4-vertex TRIANGLE_STRIP for the WebGL2 instanced draw — corners
 * (0,0)(1,0)(0,1)(1,1) in `[0,1]²`; the instanced vertex expands each corner to the
 * per-instance capsule (a→b padded) or AABB (ring / head halo) bbox. The WGPU render pass
 * builds the SAME quad from `vertex_index` in-shader (a 6-vertex two-triangle list), so it
 * consumes only {@link planRibbonLayers}, never this buffer.
 */
export const RIBBON_QUAD_STRIP = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
export const RIBBON_QUAD_STRIP_VERTS = 4;

/** Floats per ribbon instance in the WebGL2 attribute buffer: `aSeg`(vec4) + `aData`(vec4). */
export const RIBBON_INSTANCE_FLOATS = 8;
