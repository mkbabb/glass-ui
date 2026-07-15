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
 * the HOUSE prng leaf (`src/composables/glass/procedural/prng.ts` mulberry32 + hashString — the AV.W14
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
import {
    HIGHLIGHT_FALLBACK_FRAC,
    HIGHLIGHT_RISE,
    UNDERLINE_GAP,
    VB_H,
    VB_W,
} from "./constants";
import { naturalUnderlinePoints } from "./noise";
import type { HandShape, MarkBox } from "./types";

// The φ-incommensurate boil voice (`naturalUnderlinePoints`) lives in the pencil-boil-
// FREE ./noise leaf so proof:handmark-audit can strip-import + sample the REAL emitted
// point-set (node cannot type-strip a TS module under node_modules — geometry.ts's
// top-level pencil-boil import would block that). Re-exported so the /handmark barrel
// surface + the measuring gate read the SAME symbol (never a symbol-presence regex —
// the W-GATE-TRUTH-AUDIT discipline).
export { naturalUnderlinePoints } from "./noise";
export { VB_W, VB_H, UNDERLINE_GAP };

/** A shape maps to one or more centerlines (open polylines) or one closed ring. */
export interface ShapeGeom {
    lines: [number, number][][];
    closed: boolean;
}

/**
 * Semantic shape → { lines, closed } in the marking space (or a positioned box).
 *
 * The text-mode underline anchors to a MEASURED baseline: `baselineFrac` is the
 * slotted word's alphabetic baseline as a fraction of the `.hm` box height (the SFC
 * measures it via ResizeObserver + `document.fonts.ready`). The underline y is then
 * `H × (baselineFrac + UNDERLINE_GAP)` — never the old hardcoded `32` (80% of the
 * box), which struck through tight-leading headings. `null` ⇒ not yet measured: fall
 * back to the legacy `H − 8` constant so first paint (and jsdom/SSR) still renders a
 * line, replaced the instant the measure lands.
 *
 * `natural` routes the underline through the φ-incommensurate value-noise
 * `naturalUnderlinePoints` morphology instead of pencil-boil's `wobbleLinePoints`
 * (the masthead `boil` voice); the default underline keeps the pencil-boil line.
 *
 * BG.W-HANDMARK-PERFECT (a) THE ASPECT-CORRECT viewBox — `vbH` is the SFC-measured
 * marking-space HEIGHT (`VB_W / boxAspect`) for the TEXT-MODE underline/strikethrough/
 * highlight, so `preserveAspectRatio="none"` scales the wobble SHAPE uniformly (the x
 * and y scales EQUAL → the humps stop being x-stretched flat). It defaults to `VB_H`,
 * and is used ONLY for the measured text-mode y — the positioned/box/circle/bracket
 * path keeps `VB_H` byte-for-byte (it DEPENDS on the none-stretch to fill the datum
 * rect; the text-mode fix must not touch it).
 *
 * BG.W-HANDMARK-PERFECT (c) THE AMPLITUDE KNOB — `ampScale` multiplies the natural-
 * underline excursion (default 1 ⇒ byte-identical; the SFC derives it from the brush
 * `wobble` scalar, decoupling excursion from stroke `weight`).
 */
export function shapeGeom(
    shape: HandShape,
    opts: WobbleOptions,
    box: MarkBox | null = null,
    baselineFrac: number | null = null,
    natural = false,
    vbH: number = VB_H,
    ampScale = 1,
): ShapeGeom {
    const pad = 4;
    // The measured text-mode marking-space height (aspect-correct). ONLY the underline/
    // strikethrough/highlight text-mode marks ride `vbH`; every other path keeps VB_H so
    // the datum-stretch is byte-for-byte unchanged.
    const isMeasuredText =
        box == null &&
        (shape === "underline" || shape === "strikethrough" || shape === "highlight");
    const H = isMeasuredText ? vbH : VB_H;
    const x1 = box ? box.x : pad;
    const x2 = box ? box.x + box.w : VB_W - pad;
    const cy = box ? box.y + box.h / 2 : H / 2;
    // text-mode underline y: the MEASURED baseline + a hairline gap (the E1 root fix).
    // box-mode keeps its hand character (0.92 of the datum box). The legacy `H − 8`
    // constant is the pre-measure fallback ONLY (null baselineFrac).
    const yBase = box
        ? box.y + box.h * 0.92
        : baselineFrac != null
          ? H * (baselineFrac + UNDERLINE_GAP)
          : H - 8;
    const seed = opts.seed ?? 1;
    const segments = opts.segments ?? 9;

    const L = (a: number, b: number, c: number, d: number, ds = 0): [number, number][] =>
        wobbleLinePoints(a, b, c, d, { ...opts, seed: seed + ds });

    switch (shape) {
        case "underline":
            return {
                lines: [
                    natural
                        ? naturalUnderlinePoints(x1, yBase, x2, seed, segments, ampScale)
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
            const yBand = box ? cy : H * (frac - HIGHLIGHT_RISE);
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
