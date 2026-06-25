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
    NOISE_AMP_FRAC,
    NOISE_EDGE,
    NOISE_F0,
    NOISE_OCTAVES,
    NOISE_PHI,
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

/** smootherstep (6t⁵−15t⁴+10t³) — the C² fairing for the value-noise lerp. */
function smootherstep(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * The boil voice — φ-incommensurate fractal value-noise (RE-INVENT; the masthead
 * morphology). A 1-D fractal value-noise DISPLACEMENT off the HOUSE `mulberry32`,
 * NOT a seeded sinusoid (the prior body self-correlated into a near-period — a spell-
 * check squiggle):
 *
 *   disp(t) = Σ_{k=0..OCT-1} aₖ · vnoiseₖ(t·fₖ + φₖ)   normalised by Σaₖ
 *     fₖ = NOISE_F0 · φ^k   (φ mutually-irrational steps → the sum NEVER closes
 *                            into a period — the non-periodicity mechanism)
 *     aₖ = (1/φ)^k          (per-octave decay)
 *     φₖ = seeded per-octave phase (house mulberry32)
 *     vnoiseₖ = seeded lattice value-noise, smootherstep-faired
 *
 * The four atlas axes:
 *   - amplitude SCALES with the rendered span (`(x2−x1) × NOISE_AMP_FRAC`), not a
 *     viewBox-stretched constant (a long word and a short word wobble in proportion);
 *   - the hump-to-hump spacing is IRREGULAR (the φ-incommensurate octave sum — the
 *     honest non-periodicity teeth, spacing-CV ~0.41 at the paint count vs the prior
 *     sinusoid's ~0.14, over 400 seeds);
 *   - the non-uniform body gives the pf hull a pressure-taper-friendly point stream;
 *   - the seed is the HOUSE mulberry32 (determinism + per-seed variation), ZERO
 *     pencil-boil `mulberry32` import.
 *
 * ENDPOINT anchor (NOT a body-wide envelope): a narrow cosine taper at the very ends
 * only (`NOISE_EDGE`), so the ends settle to baseline (no draw-on pop) while the BODY
 * amplitude stays irregular hump-to-hump (the prior `sin(π·t)` envelope made the body
 * amplitude smooth-and-uniform — the clean-envelope tell). FILTER-FREE: the wander is
 * in the control points + the hull width, never a feTurbulence.
 *
 * EXPORTED so the measuring gate samples the REAL emitted point-set (never a symbol-
 * presence regex — the W-GATE-TRUTH-AUDIT discipline).
 */
export function naturalUnderlinePoints(
    x1: number,
    y: number,
    x2: number,
    seed: number,
    segments: number,
): [number, number][] {
    const span = x2 - x1;
    if (span <= 0) return [[x1, y], [x2, y]];
    const s = seed >>> 0;
    const amp = span * NOISE_AMP_FRAC; // SCALE-relative amplitude

    // Per-octave seeded phase (one rng stream, order-fixed for determinism) + a
    // per-octave seeded value-noise lattice (a sub-stream so octaves are independent).
    const phaseRng = mulberry32(s);
    let ampSum = 0;
    const octaves = Array.from({ length: NOISE_OCTAVES }, (_, k) => {
        const phase = phaseRng() * 10;
        const freq = NOISE_F0 * Math.pow(NOISE_PHI, k);
        const weight = Math.pow(1 / NOISE_PHI, k);
        ampSum += weight;
        const subRng = mulberry32((s ^ Math.imul(0x9e3779b9, k + 1)) >>> 0);
        const lattice = new Map<number, number>();
        const node = (idx: number): number => {
            let v = lattice.get(idx);
            if (v === undefined) {
                v = subRng();
                lattice.set(idx, v);
            }
            return v;
        };
        const vnoise = (x: number): number => {
            const i0 = Math.floor(x);
            const f = x - i0;
            const a = node(i0);
            const b = node(i0 + 1);
            return a + (b - a) * smootherstep(f); // [0,1)
        };
        return { phase, freq, weight, vnoise };
    });

    const n = Math.max(6, segments);
    const pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = x1 + span * t;
        let disp = 0;
        for (const o of octaves) {
            // centre the [0,1) lattice value to [-1,1] so the body straddles baseline.
            disp += o.weight * (o.vnoise(t * o.freq + o.phase) * 2 - 1);
        }
        disp /= ampSum;
        // endpoint-only cosine taper — the ends settle to baseline; the BODY is irregular.
        let edge = 1;
        if (t < NOISE_EDGE) {
            edge = 0.5 - 0.5 * Math.cos((t / NOISE_EDGE) * Math.PI);
        } else if (t > 1 - NOISE_EDGE) {
            edge = 0.5 - 0.5 * Math.cos(((1 - t) / NOISE_EDGE) * Math.PI);
        }
        pts.push([x, y + amp * disp * edge]);
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
 * `natural` routes the underline through the φ-incommensurate value-noise
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
