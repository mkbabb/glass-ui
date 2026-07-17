/**
 * brush.ts — the flat Brush DATA model (the keystone; SPEC §2). Pure data, 0 deps.
 * ─────────────────────────────────────────────────────────────────────────────
 * A `Brush` is a plain JSON-serialisable record — twelve scalars, four enums, and
 * one optional `stamp` function. Every built-in medium is a frozen literal: a
 * POINT in one continuous parameter space, NOT a class in a taxonomy. The renderer
 * (`ink.ts`) reads fields — it NEVER branches on instrument name (SPEC §12 acc-1).
 * Adding a medium = adding one row here; an in-between medium = a spread/lerp.
 *
 * Field-count discipline (SPEC §2): resist a 13th scalar per new instrument —
 * `blend` earned its place only because highlighter genuinely needed `multiply`.
 *
 * The shipped register: PEN is the default (clean ink, grain:0 ⇒ no filter, the one
 * `ribbon:'stroke'` clean voice). The variable-width VOICES — boil (the pressured
 * pen-line), crayon (the waxy swell), marker (the juicy core), highlighter (the wide
 * slab) — all ENGAGE `ribbon:'hull'`, the vendored perfect-freehand body, sharing the
 * one curvature-coupled pressure profile (ink.ts `addPressure`). pen/pencil/ring stay
 * `ribbon:'stroke'` by intent (pen clean, pencil's dry tooth-grain is its character,
 * ring a thin whisper). The pf body ships whenever any hull brush does.
 */

export type BlendMode = "source-over" | "multiply" | "darken" | "screen";

export interface TaperSpec {
    /** px the width ramps 0→full at the start (lift-on). */
    start: number;
    /** px the width ramps full→0 at the end (lift-off / dry run-out). */
    end: number;
    /** out-cubic = the lazy pencil run-out. */
    ease: "linear" | "out-cubic";
}

export interface Brush {
    // ── 1. WEIGHT (→ perfect-freehand width profile, when ribbon:'hull') ──
    /** base stroke diameter, in viewBox units. */
    weight: number;
    /** 0..1.4 seeded ±width variance along arc-length. */
    weightJitter: number;
    /** -1..1 pressure→width gain (pf `thinning`). */
    thinning: number;
    /** lift-on / lift-off ramp. */
    taper: TaperSpec;
    /** L2 body strategy: plain stroked <path> | pf filled hull. DEFAULT 'stroke'. */
    ribbon: "stroke" | "hull";

    // ── 2. INK (color + alpha + how the body fills) ──
    /** 0..1 base alpha. */
    opacity: number;
    /** 'source-over' ink | 'multiply' highlighter-behind-text. */
    blend: BlendMode;
    /** overdraw count (pen 1 · crayon 2-3). */
    passes: number;
    /** 0..1 per-pass alpha falloff (heavy core, light fringe). */
    passOpacity: number;

    // ── 3. GRAIN (the L3 texture filter — feTurbulence params) ──
    /** 0..1 paper-through depth — THE master pen↔crayon knob. 0 ⇒ NO filter. */
    grain: number;
    /** feTurbulence baseFrequency (high=pencil tooth · low=crayon wax). */
    grainFreq: number;
    /** feDisplacementMap edge-fray scale, px. */
    grainScale: number;
    /** feTurbulence numOctaves (grain richness). */
    octaves: number;

    // ── 4. HAND (centerline wobble — pencil-boil WobbleOptions) ──
    /** macro tremor → wobbleLinePoints({ roughness }). */
    roughness: number;
    /** micro displacement scale (boil amplitude + warp filter). */
    wobble: number;
    /** wobble centerline resolution. */
    segments: number;

    // ── 5. CAP (geometry finish) ──
    cap: "round" | "square" | "butt";

    // ── ESCAPE HATCH (arbitrary brush; SPEC §5) ──
    /** when present, OVERRIDES the built-in ink stage only. */
    stamp?: StampFn;
}

/** SPEC §5 — the arbitrary-brush escape hatch (one optional field, not a framework). */
export type StampFn = (ctx: {
    centerline: [number, number][];
    brush: Brush;
    rng: () => number;
    seed: number;
    length: number;
    color: string;
}) => { paths: InkPath[]; filterId?: string | null; defs?: string[] };

/** One ink path the renderer emits (shared with ink.ts; declared here to avoid a cycle). */
export interface InkPath {
    d: string;
    fill?: string;
    stroke?: string;
    opacity: number;
    blend: BlendMode;
    /** geometry finish — bound to the SVG `stroke-linecap` on the path (d). */
    cap?: "round" | "square" | "butt";
}

/**
 * The named points in the continuum. `pen` is the DEFAULT (clean ink, grain:0,
 * `ribbon:'stroke'`). `boil`/`crayon`/`marker`/`highlighter` engage `ribbon:'hull'`
 * (the curvature-coupled variable-width body); `pencil`/`ring` stay clean stroke.
 */
export const BRUSHES = {
    // ── PEN — the DEFAULT. Clean ink, no grain, smooth. (masthead use) ──
    pen: {
        weight: 6,
        weightJitter: 0.1,
        thinning: 0.15,
        taper: { start: 14, end: 14, ease: "out-cubic" },
        ribbon: "stroke",
        opacity: 1.0,
        blend: "source-over",
        passes: 1,
        passOpacity: 0,
        grain: 0,
        grainFreq: 0.1,
        grainScale: 0,
        octaves: 2,
        roughness: 0.7,
        wobble: 1.2,
        segments: 9,
        cap: "round",
    },
    // ── BOIL — the masthead procedural-underline voice. A clean pen-grade ink
    //    (grain:0 ⇒ no filter) whose UNDERLINE geometry routes through the φ-
    //    incommensurate value-noise morphology (`normalizeProps` auto-engages
    //    `natural` for this brush): scale-relative amplitude, hump-to-hump-irregular
    //    spacing. `ribbon:'hull'` routes it through the perfect-freehand variable-
    //    width body (the highlighter's slab engine) → a TRUE pressured pen-line, not
    //    a constant-width ruler. The curvature-coupled pressure (ink.ts `addPressure`)
    //    presses harder on the straights, lighter through the wobbles — the move that
    //    turns "a wiggly line" into "a pen line". `taper {start:14,end:18}` — the run-
    //    out is longer than the lead by ≈√φ (the §L6 type-ladder ratio). ──
    boil: {
        weight: 7,
        weightJitter: 0.12,
        thinning: 0.55,
        taper: { start: 14, end: 18, ease: "out-cubic" },
        ribbon: "hull",
        opacity: 1.0,
        blend: "source-over",
        passes: 1,
        passOpacity: 0,
        grain: 0,
        grainFreq: 0.1,
        grainScale: 0,
        octaves: 2,
        roughness: 0.9,
        wobble: 1.4,
        segments: 14,
        cap: "round",
    },
    // ── PENCIL — thin tooth, pale, fine HIGH-freq grain, dry run-out. (gold ref) ──
    pencil: {
        weight: 3,
        weightJitter: 0.3,
        thinning: 0.4,
        taper: { start: 8, end: 18, ease: "out-cubic" },
        ribbon: "stroke",
        opacity: 0.6,
        blend: "source-over",
        passes: 1,
        passOpacity: 0,
        grain: 0.5,
        grainFreq: 0.42,
        grainScale: 1.5,
        octaves: 3,
        roughness: 1.0,
        wobble: 1.6,
        segments: 11,
        cap: "round",
    },
    // ── CRAYON — a waxy stick that SWELLS and TAPERS. `ribbon:'hull'` routes the 2
    //    offset passes through the perfect-freehand variable-width body (the shared
    //    hull engine), so the wax core fattens and the ends run out dry — a real
    //    crayon, not a flat constant-width ruler. The seeded static feTurbulence grain
    //    (ds-crayon-handmark) rides on TOP, unchanged. ──
    crayon: {
        weight: 16,
        weightJitter: 1.0,
        thinning: 0.25,
        taper: { start: 6, end: 6, ease: "linear" },
        ribbon: "hull",
        opacity: 0.8,
        blend: "source-over",
        passes: 2,
        passOpacity: 0.18,
        grain: 0.85,
        grainFreq: 0.16,
        grainScale: 2.6,
        octaves: 4,
        roughness: 1.5,
        wobble: 3.0,
        segments: 13,
        cap: "round",
    },
    // ── RING — the editorial RED-PENCIL margin mark: a THIN, single-pass,
    //    lower-alpha crayon for the POSITIONED circle (the hand-circled datum).
    //    The crayon GRAIN/wobble character is kept (it is a hand, not a machine
    //    ellipse — the ellipsePoints overshoot rides on top), but the weight drops
    //    from the underline-tuned 16 to ~5, passes 2→1, opacity 0.8→0.55: a
    //    SUGGESTION pointing at the datum, never a saturated slab competing with it
    //    (E7a — the band reads ≤ a perceptual-floor whisper on every route, AND the
    //    rendered stroke is aspect-stable via the SFC's `vector-effect:non-scaling-
    //    stroke`, so the `preserveAspectRatio:none` stretch scales the PATH, never
    //    the rendered stroke band). ONE brush row re-tones every positioned ring. ──
    ring: {
        weight: 5,
        weightJitter: 0.6,
        thinning: 0.3,
        taper: { start: 8, end: 12, ease: "out-cubic" },
        ribbon: "stroke",
        opacity: 0.55,
        blend: "source-over",
        passes: 1,
        passOpacity: 0,
        grain: 0.7,
        grainFreq: 0.18,
        grainScale: 1.8,
        octaves: 4,
        roughness: 1.4,
        wobble: 2.6,
        segments: 13,
        cap: "round",
    },
    // ── MARKER — fat, juicy, near-solid, with a fat core and frayed-thin ends.
    //    `ribbon:'hull'` routes it through the variable-width body so the juicy core
    //    swells and the ends taper (the lift-on / dry run-out), not a flat ruler. ──
    marker: {
        weight: 12,
        weightJitter: 0.2,
        thinning: 0.1,
        taper: { start: 4, end: 10, ease: "out-cubic" },
        ribbon: "hull",
        opacity: 0.92,
        blend: "source-over",
        passes: 1,
        passOpacity: 0,
        grain: 0.22,
        grainFreq: 0.09,
        grainScale: 1.0,
        octaves: 3,
        roughness: 1.0,
        wobble: 2.2,
        segments: 9,
        cap: "square",
    },
    // ── HIGHLIGHTER — wide flat translucent slab BEHIND text, multiply blend.
    // The five field deltas ENGAGED. `ribbon:'hull'` (b) — the
    //    perfect-freehand variable-width slab (the fork shipped 'stroke', a hard
    //    rectangle); a non-zero `taper` (c) — the marker's lift-on/dry-run-out so
    //    the ends ramp like a real marker (paints once hull engages); `cap:'square'`
    //    (d) — plumbed through ink.ts onto the DOM `stroke-linecap` (the fork dropped
    //    it on the floor AND hardcoded round in the SFC). The LOW-SEAT geometry (a)
    //    + the page-inclusive multiply (e) are the geometry/SFC half. ──
    highlighter: {
        weight: 26,
        weightJitter: 0.05,
        thinning: 0,
        taper: { start: 6, end: 10, ease: "out-cubic" },
        ribbon: "hull",
        opacity: 0.38,
        blend: "multiply",
        passes: 1,
        passOpacity: 0,
        grain: 0.12,
        grainFreq: 0.2,
        grainScale: 1.5,
        octaves: 2,
        roughness: 0.5,
        wobble: 1.4,
        segments: 9,
        cap: "square",
    },
} as const satisfies Record<string, Brush>;

export type BrushName = keyof typeof BRUSHES;

/**
 * Resolution order (KISS, deterministic): preset → object overrides → extra `o`.
 * A string selects a preset; an object spreads over `pen`. Later wins.
 */
export const resolveBrush = (
    b: BrushName | Partial<Brush>,
    o?: Partial<Brush>,
): Brush => ({
    ...BRUSHES[typeof b === "string" ? b : "pen"],
    ...(typeof b === "object" ? b : {}),
    ...o,
});

/**
 * lerpBrush — the continuum proof (SPEC §12 acc-2). Linearly interpolate the
 * scalar fields of two brushes; enums/taper/ribbon snap from `a` below 0.5, `b`
 * at/above. Yields a sensible in-between ("inky crayon"), no NaN.
 */
export const lerpBrush = (a: Brush, b: Brush, t: number): Brush => {
    const L = (x: number, y: number): number => x + (y - x) * t;
    const pick = <T>(x: T, y: T): T => (t < 0.5 ? x : y);
    return {
        weight: L(a.weight, b.weight),
        weightJitter: L(a.weightJitter, b.weightJitter),
        thinning: L(a.thinning, b.thinning),
        taper: {
            start: L(a.taper.start, b.taper.start),
            end: L(a.taper.end, b.taper.end),
            ease: pick(a.taper.ease, b.taper.ease),
        },
        ribbon: pick(a.ribbon, b.ribbon),
        opacity: L(a.opacity, b.opacity),
        blend: pick(a.blend, b.blend),
        passes: Math.max(1, Math.round(L(a.passes, b.passes))),
        passOpacity: L(a.passOpacity, b.passOpacity),
        grain: L(a.grain, b.grain),
        grainFreq: L(a.grainFreq, b.grainFreq),
        grainScale: L(a.grainScale, b.grainScale),
        octaves: Math.max(1, Math.round(L(a.octaves, b.octaves))),
        roughness: L(a.roughness, b.roughness),
        wobble: L(a.wobble, b.wobble),
        segments: Math.max(2, Math.round(L(a.segments, b.segments))),
        cap: pick(a.cap, b.cap),
    };
};
