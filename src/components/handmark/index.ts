/**
 * HandMark public barrel.
 * ─────────────────────────────────────────────────────────────────────────────
 * `HandMark` is the sole public component name. The pure L1–L3 functions ship
 * too — they are framework-free, directly usable in slides decks, D3 charts
 * (call `shapeGeom`/`ellipsePoints` to ink a path), even canvas.
 *
 * The DEFAULT is `pen` (clean ink, grain:0 ⇒ no filter, zero extra dep). The
 * `@mkbabb/pencil-boil` geometry is an OPTIONAL PEER. The perfect-freehand body
 * is vendored; only `ribbon:'hull'` (the highlighter) touches that core
 * (treeshaken otherwise).
 *
 * The editorial draw-on underline is
 * `<HandMark shape="underline" animation="draw-on">`; the natural pencil-boil
 * morphology is the `boil` brush.
 */
export { default as HandMark } from "./HandMark.vue";

// ── Flat Brush model: pure data and types ─────────────────────────────────
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
    // EXPORTED so the measuring gate samples the REAL φ-incommensurate value-noise
    // point-set (the boil voice) — never a symbol-presence regex.
    naturalUnderlinePoints,
    VB_W,
    VB_H,
    UNDERLINE_GAP,
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
    type BoilClock,
} from "./composables/useHandMark";

// ── the public API surface (SPEC §6) ──
export type {
    HandMarkProps,
    HandShape,
    HandAnimation,
    MarkBox,
} from "./types";
