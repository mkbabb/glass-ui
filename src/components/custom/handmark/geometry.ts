/**
 * geometry.ts — SEMANTIC shape → pencil-boil centerlines (L1, pure; SPEC §3).
 * ─────────────────────────────────────────────────────────────────────────────
 * A shape is a pure mapper: (semantic target) → L1 geometry. The renderer never
 * knows what it drew — it sees only `Point[]`. Adding a shape = adding one switch
 * arm; nothing downstream changes (texture + animation are shape-blind). This is
 * the generality lever (Brush ⟂ Path).
 *
 * The marking coordinate space is 0..100 × 0..40, with `preserveAspectRatio="none"`
 * so the <svg> stretches to the slotted word box (the SPEC §6.2 width-invariance
 * contract). Two usage modes:
 *   - text mode (box == null): use the full viewBox (single-line underline/strike)
 *   - positioned mode (box = {x,y,w,h}): map an explicit rect (circle a datum)
 *
 * The circle arm rides pencil-boil 0.4.x's `ellipsePoints` (the hand-circle
 * overshoot ring — the sole upstream geometry delta this component required).
 *
 * THE SEED RECONCILE (BA.W-HANDMARK [S2]): the wobble centerlines are seeded from
 * the HOUSE prng leaf (`src/utils/prng.ts` mulberry32 + hashString — the AV.W14
 * single-source). The family FEEDS pencil-boil a house-derived integer seed; glass-
 * ui code imports ZERO `mulberry32` from pencil-boil (its internal mulberry32 stays
 * inside its OWN perturb math). ONE seed leaf, the house identity.
 */
import {
    catmullRomToBezier,
    ellipsePoints,
    perturbPoints,
    perturbPointsClosed,
    pointsToLinear,
    wobbleLinePoints,
    type WobbleOptions,
} from "@mkbabb/pencil-boil";
import { mulberry32 } from "../../../utils/prng";
import {
    HIGHLIGHT_FALLBACK_FRAC,
    HIGHLIGHT_RISE,
    PERIODS_MAX,
    PERIODS_MIN,
    UNDERLINE_GAP,
    VB_H,
    VB_W,
} from "./constants";
import type { HandShape, MarkBox } from "./types";

export { VB_W, VB_H, UNDERLINE_GAP };

/** A shape maps to one or more centerlines (open polylines) or one closed ring. */
export interface ShapeGeom {
    lines: [number, number][][];
    closed: boolean;
}

/**
 * The natural-underline morphology (BA.W-HANDMARK C-2). The procedural wobble line
 * the editorial underline lacked — scale-relative amplitude, an IRREGULAR seeded
 * period count, a pressure-taper-friendly point stream, off the HOUSE prng leaf
 * feeding pencil-boil. The four atlas axes:
 *   - amplitude SCALES with the rendered span (`(x2−x1) × NATURAL_AMP_FRAC`), not a
 *     viewBox-stretched constant (a long word and a short word wobble in proportion);
 *   - the period count is IRREGULAR — a seeded pick in [PERIODS_MIN, PERIODS_MAX];
 *   - the seeded sine sum + per-vertex jitter gives a non-uniform body the pf hull
 *     reads as pressure taper;
 *   - the seed is the HOUSE mulberry32 (determinism + per-seed variation).
 * FILTER-FREE: the wobble is in the control points, not a feTurbulence.
 */
const NATURAL_AMP_FRAC = 0.022; // amplitude as a fraction of the span (scale-relative)

function naturalUnderlinePoints(
    x1: number,
    y: number,
    x2: number,
    seed: number,
    segments: number,
): [number, number][] {
    const span = x2 - x1;
    if (span <= 0) return [[x1, y], [x2, y]];
    const rng = mulberry32(seed >>> 0);
    // IRREGULAR period count — a seeded pick in [PERIODS_MIN, PERIODS_MAX].
    const periods =
        PERIODS_MIN + Math.floor(rng() * (PERIODS_MAX - PERIODS_MIN + 1));
    const amp = span * NATURAL_AMP_FRAC; // SCALE-relative amplitude
    // a seeded phase + two seeded harmonic weights so two seeds read distinct.
    const phase = rng() * Math.PI * 2;
    const w1 = 0.65 + rng() * 0.35;
    const w2 = 0.2 + rng() * 0.3;
    const n = Math.max(6, segments);
    const pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = x1 + span * t;
        // a primary period sum + a second harmonic + a small per-vertex jitter.
        const base =
            w1 * Math.sin(phase + t * Math.PI * 2 * periods) +
            w2 * Math.sin(phase * 1.7 + t * Math.PI * 2 * (periods + 1));
        // taper the ends to zero so the endpoints stay anchored (no draw-on pop).
        const envelope = Math.sin(Math.PI * t);
        const jitter = (rng() - 0.5) * 0.4;
        pts.push([x, y + amp * (base + jitter) * envelope]);
    }
    return pts;
}

/**
 * Semantic shape → { lines, closed } in the marking space (or a positioned box).
 *
 * The text-mode underline anchors to a MEASURED baseline: `baselineFrac` is the
 * slotted word's alphabetic baseline as a fraction of the `.hm` box height (the SFC
 * measures it via ResizeObserver + `document.fonts.ready`). The underline y is then
 * `VB_H × (baselineFrac + UNDERLINE_GAP)` — never the old hardcoded `32` (80% of the
 * box), which struck through tight-leading headings. `null` ⇒ not yet measured: fall
 * back to the legacy `VB_H − 8` constant so first paint (and jsdom/SSR) still renders
 * a line, replaced the instant the measure lands.
 *
 * `natural` (BA.W-HANDMARK C-2) routes the underline through the procedural
 * `naturalUnderlinePoints` morphology instead of pencil-boil's `wobbleLinePoints`
 * (the masthead `boil` voice); the default underline keeps the pencil-boil line.
 */
export function shapeGeom(
    shape: HandShape,
    opts: WobbleOptions,
    box: MarkBox | null = null,
    baselineFrac: number | null = null,
    natural = false,
): ShapeGeom {
    const pad = 4;
    const x1 = box ? box.x : pad;
    const x2 = box ? box.x + box.w : VB_W - pad;
    const cy = box ? box.y + box.h / 2 : VB_H / 2;
    // text-mode underline y: the MEASURED baseline + a hairline gap (the E1 root fix).
    // box-mode keeps its hand character (0.92 of the datum box). The legacy `VB_H − 8`
    // constant is the pre-measure fallback ONLY (null baselineFrac).
    const yBase = box
        ? box.y + box.h * 0.92
        : baselineFrac != null
          ? VB_H * (baselineFrac + UNDERLINE_GAP)
          : VB_H - 8;
    const seed = opts.seed ?? 1;
    const segments = opts.segments ?? 9;

    const L = (a: number, b: number, c: number, d: number, ds = 0): [number, number][] =>
        wobbleLinePoints(a, b, c, d, { ...opts, seed: seed + ds });

    switch (shape) {
        case "underline":
            return {
                lines: [
                    natural
                        ? naturalUnderlinePoints(x1, yBase, x2, seed, segments)
                        : L(x1, yBase, x2, yBase),
                ],
                closed: false,
            };
        case "strikethrough":
            return { lines: [L(x1, cy, x2, cy)], closed: false };
        case "highlight": {
            // BA.W-HANDMARK C-1(a) — the band seats LOW on the x-height/baseline band
            // (a real highlighter rides the low two-thirds of the line, the ink on the
            // baseline rising to ~x-height), NOT the box vertical center the fork
            // shipped. Derive a band centerline from the MEASURED baseline, raised by
            // ~half a lowercase x-height (HIGHLIGHT_RISE) so the wide slab (weight 26)
            // covers x-height down to the baseline. Pre-measure falls back to a low
            // fixed band (HIGHLIGHT_FALLBACK_FRAC), parallel to the underline fallback.
            const frac = baselineFrac != null ? baselineFrac : HIGHLIGHT_FALLBACK_FRAC;
            const yBand = box ? cy : VB_H * (frac - HIGHLIGHT_RISE);
            return { lines: [L(x1, yBand, x2, yBand)], closed: false };
        }
        case "box": {
            const y1 = box ? box.y : pad;
            const y2 = box ? box.y + box.h : VB_H - pad;
            return {
                lines: [
                    L(x1, y1, x2, y1, 0),
                    L(x2, y1, x2, y2, 1),
                    L(x2, y2, x1, y2, 2),
                    L(x1, y2, x1, y1, 3),
                ],
                closed: false,
            };
        }
        case "bracket": {
            const y1 = box ? box.y : pad;
            const y2 = box ? box.y + box.h : VB_H - pad;
            const ext = (x2 - x1) * 0.22;
            return {
                lines: [
                    L(x1 + ext, y1, x1, y1, 0),
                    L(x1, y1, x1, y2, 1),
                    L(x1, y2, x1 + ext, y2, 2),
                ],
                closed: false,
            };
        }
        case "circle": {
            const cx = box ? box.x + box.w / 2 : VB_W / 2;
            const ccy = box ? box.y + box.h / 2 : VB_H / 2;
            const rx = (box ? box.w / 2 : VB_W / 2) - 3;
            const ry = (box ? box.h / 2 : VB_H / 2) - 3;
            return { lines: [ellipsePoints(cx, ccy, rx, ry, opts)], closed: true };
        }
        case "path":
            // caller supplies props.path — the renderer short-circuits to it.
            return { lines: [], closed: false };
        default:
            return { lines: [L(x1, yBase, x2, yBase)], closed: false };
    }
}

/** Boil one geometry: re-perturb the CACHED centerlines (anchored → no draw-on pop). */
export function boilLines(
    { lines, closed }: ShapeGeom,
    amount: number,
    seed: number,
): [number, number][][] {
    return lines.map((pts, i) => {
        if (closed) return perturbPointsClosed(pts, amount, seed + i);
        const a = pts[0];
        const z = pts[pts.length - 1];
        return perturbPoints(pts, a[0], a[1], z[0], z[1], amount, seed + i);
    });
}

/** Serialize centerlines → one SVG `d` (multi-line shapes concat with a space). */
export function serialize(lines: [number, number][][], jagged = false): string {
    return lines
        .map((pts) => (jagged ? pointsToLinear(pts) : catmullRomToBezier(pts)))
        .join(" ");
}
