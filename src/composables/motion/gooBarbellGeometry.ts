// BG.W-GOO-BARBELL-CSS — the goo-morph BARBELL geometry leaf (carved out of
// useGooMorph.ts — the colocation/DRY drain; the engine keeps the stateful
// rAF/transition/DOM-write orchestration + the token reads, this leaf owns the
// PURE barbell-projection GEOMETRY: the bell() well shape, the body-center
// separation, the neck girth/span, the volume-preserving squash, the
// overlapping-action arc, and the compositor transform-string composers).
//
// A metaball merge is, definitionally, TWO round bodies + the concave neck that
// wells between them. This leaf projects the barbell for a normalized progress
// `p` ∈ [0,1] over the whole from→to travel — the bodies bud apart-then-together
// (`sep`), the neck wells then pinches (`neckGirth`) — and composes the exact
// `transform` strings the engine writes onto the three silhouette elements.
//
// STATELESS BY CONSTRUCTION: pure functions only — no Vue reactivity, no rAF, no
// DOM read/write, no `SpringProgress`/keyframes fork, no rng ownership, no
// module-level mutable state. The engine owns the physics (the `--goo-t`
// transition + the rAF sampler); this leaf owns the geometry beside it. Every
// emitted string is byte-preserved from the pre-carve engine (paint-class P —
// the carve changes ZERO pixels).

/** The golden ratio — the barbell body diameter is the golden-minor of the slot pitch. */
export const PHI = 1.618033988749895;

/** sin(π·p)^k — 0 at the ends, peak at the midpoint. The well shape. */
export function bell(p: number, k: number): number {
    const s = Math.sin(Math.PI * Math.min(1, Math.max(0, p)));
    return Math.pow(s, k);
}

/**
 * The barbell body diameter `D = step/φ` (a round BLOB, not a plate — the
 * golden-minor of the slot pitch). Floors the step at 1 so a zero pitch never
 * collapses D to 0.
 */
export function bodyDiameter(step: number): number {
    return Math.max(1, step) / PHI;
}

/** The inputs to a single barbell projection frame — all numeric, all pure. */
export interface BarbellSpan {
    /** The trailing slot center (px on the travel axis). */
    A: number;
    /** The leading slot center (px on the travel axis). */
    B: number;
    /** The `from` slot index. */
    fromIdx: number;
    /** The `to` slot index. */
    toIdx: number;
    /** The live interpolated `--goo-t` scalar (∈ [fromIdx, toIdx] in flight). */
    gooT: number;
    /** The resting slot pitch (px) — `D = step/φ` lands the body diameter. */
    step: number;
    /** The neck-gap fraction: how near the two bodies draw at the midpoint. */
    neckGap: number;
    /** The cartoon-weight lever (0..1; clamped here — 0 under PRM/auto). */
    weight: number;
}

/** The projected barbell geometry the engine writes onto the three elements. */
export interface BarbellGeometry {
    /** The body diameter `D = step/φ`. */
    D: number;
    /** The trailing body center (bodyA). */
    cA: number;
    /** The leading body center (bodyB). */
    cB: number;
    /** The neck center (the midpoint of the two bodies). */
    mid: number;
    /** The on-axis neck span scale `gap/D` (spans the live centre-to-centre gap). */
    neckSpanScale: number;
    /** The cross-axis neck girth (wells → pinches, ~0 at the ends). */
    neckGirth: number;
    /** The on-axis body squash (the necking-taffy stretch). */
    stretchOn: number;
    /** The cross-axis body stretch (volume-preserving reciprocal). */
    stretchCross: number;
    /** The cross-axis lob arc (overlapping action — the merge LOBS, not slides). */
    arc: number;
}

/**
 * Project the BARBELL for the in-flight scalar `gooT`. `p` is the NORMALIZED
 * progress over the WHOLE from→to travel (a multi-gap morph spans p∈[0,1] over
 * the full span, so the barbell necks across the BIG gap on the SAME slow flow
 * curve). Pure — no closure, no DOM, no state.
 *   sep(p)      = 1 − bell(p,1)·(1 − neckGap)   // 1 at the slots → neckGap at mid
 *   mid         = (A + B) / 2 ; half = (B − A)/2 · sep(p)
 *   cA = mid − half ; cB = mid + half           // bodies travel apart-then-together
 *   neckGirth(p)= bell(p,1.5)                     // wells, peaks mid, ~0 at the ends
 */
export function projectBarbell(span: BarbellSpan): BarbellGeometry {
    const { A, B, fromIdx, toIdx, gooT, step, neckGap, weight } = span;

    const D = bodyDiameter(step); // the body diameter — the golden-minor of the slot pitch
    const spanPx = B - A;

    const idxSpan = toIdx - fromIdx;
    const p =
        idxSpan === 0
            ? 1
            : Math.min(1, Math.max(0, (gooT - fromIdx) / idxSpan));

    const sep = 1 - bell(p, 1) * (1 - neckGap); // 1 at slots → neckGap at mid
    const mid = (A + B) / 2;
    const half = (spanPx / 2) * sep;
    const cA = mid - half; // bodyA travels toward mid then on
    const cB = mid + half;

    const neckGirth = bell(p, 1.5); // wells → pinches, ~0 at the ends
    const gap = Math.abs(cB - cA); // the live centre-to-centre gap

    const w = Math.min(1, Math.max(0, weight));

    // the on-axis squash-&-stretch toward the neck (the bodies elongate on-axis as
    // they neck — necking taffy), volume-preserving on the cross axis.
    const stretchOn = 1 + bell(p, 1) * 0.12 * w;
    const stretchCross = 1 / stretchOn;

    // the arc (overlapping action) — the body centres lob a subtle cross-axis parabola
    // so the merge LOBS, not a flat slide. ±D·0.06·sin(πp), weight-scaled, PRM→0.
    const arc = -D * 0.06 * bell(p, 1) * w;

    // scaleX(gap/D) on-axis so the neck spans the live gap.
    const neckSpanScale = D > 0 ? gap / D : 1;

    return { D, cA, cB, mid, neckSpanScale, neckGirth, stretchOn, stretchCross, arc };
}

/**
 * Compose a BODY transform on the travel axis: translate(center) → -50% → scale +
 * the on-axis squash-&-stretch reciprocal (volume-preserving). `el` is sized to the
 * body diameter D, so no scale-to-fit is needed; the squash is the `--stretch` taffy.
 * The `arc` lobs the body centre on the CROSS axis (overlapping action). Pure string.
 */
export function composeBodyTransform(
    center: number,
    arc: number,
    stretchOn: number,
    stretchCross: number,
    vertical: boolean,
): string {
    if (vertical) {
        return (
            `translateY(${center.toFixed(2)}px) translateX(${arc.toFixed(2)}px) ` +
            `translateY(-50%) translateX(-50%) ` +
            `scaleY(${stretchOn.toFixed(4)}) scaleX(${stretchCross.toFixed(4)})`
        );
    }
    return (
        `translateX(${center.toFixed(2)}px) translateY(${arc.toFixed(2)}px) ` +
        `translateX(-50%) translateY(-50%) ` +
        `scaleX(${stretchOn.toFixed(4)}) scaleY(${stretchCross.toFixed(4)})`
    );
}

/**
 * Compose the NECK transform: translate(mid) on-axis, scaleX(gap/D) on-axis so it
 * spans the live gap, scaleY(neckGirth) cross-axis so it WELLS then PINCHES (~0 at
 * the ends → the neck vanishes at rest, no ghost throat). Pure string.
 */
export function composeNeckTransform(
    mid: number,
    neckSpanScale: number,
    neckGirth: number,
    vertical: boolean,
): string {
    if (vertical) {
        return (
            `translateY(${mid.toFixed(2)}px) translateY(-50%) ` +
            `scaleY(${neckSpanScale.toFixed(4)}) scaleX(${neckGirth.toFixed(4)})`
        );
    }
    return (
        `translateX(${mid.toFixed(2)}px) translateX(-50%) ` +
        `scaleX(${neckSpanScale.toFixed(4)}) scaleY(${neckGirth.toFixed(4)})`
    );
}

/**
 * Compose the RESTING NECK transform — the neck pinched to ~0 at the coalesced
 * center (no ghost throat at rest). Pure string.
 */
export function composeRestNeckTransform(center: number, vertical: boolean): string {
    if (vertical) {
        return `translateY(${center.toFixed(2)}px) translateY(-50%) scaleY(0.0001) scaleX(0)`;
    }
    return `translateX(${center.toFixed(2)}px) translateX(-50%) scaleX(0.0001) scaleY(0)`;
}
