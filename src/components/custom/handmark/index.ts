/**
 * handmark — the ./handmark barrel (SPEC §11).
 * ─────────────────────────────────────────────────────────────────────────────
 * `HandMark` is the generic export; `InkMark` is the prose alias the atlas/slides
 * import so call sites read as prose (one implementation, zero divergence). The
 * pure L1–L3 functions ship too — they are framework-free, directly usable in
 * slides decks, D3 charts (call `shapeGeom`/`ellipsePoints` to ink a path), even
 * canvas.
 *
 * The DEFAULT is `pen` (clean ink, grain:0 ⇒ no filter, zero extra dep). The
 * `@mkbabb/pencil-boil` geometry + `perfect-freehand` body are OPTIONAL PEERS;
 * only `ribbon:'hull'` touches the vendored pf core (treeshaken otherwise).
 */
export { default as HandMark, default as InkMark } from "./HandMark.vue";

// ── the flat Brush model (pure data + types; SPEC §2) ──
export {
    BRUSHES,
    resolveBrush,
    lerpBrush,
    type Brush,
    type BrushName,
    type BlendMode,
    type TaperSpec,
    type StampFn,
    type InkPath,
} from "./brush";

// ── the shape mappers (pure; SPEC §3) ──
export {
    shapeGeom,
    serialize,
    boilLines,
    VB_W,
    VB_H,
    type ShapeGeom,
} from "./geometry";

// ── the ink + grain stages (pure; SPEC §4) ──
export { ink, type SVGFragment } from "./ink";
export { grainFilter, hasGrain } from "./texture";

// ── the vendored variable-width body (opt-in; SPEC §1.1) ──
export {
    getStroke,
    getStrokePoints,
    getSvgPathFromStroke,
    type StrokeOptions,
    type InputPoint,
} from "./freehand";

// ── the headless reactive core (SPEC §9) ──
export {
    useHandMark,
    normalizeProps,
    type UseHandMarkInput,
    type HandMarkCore,
} from "./useHandMark";

// ── the public API surface (SPEC §6) ──
export type {
    HandMarkProps,
    HandShape,
    HandAnimation,
    MarkBox,
} from "./types";
