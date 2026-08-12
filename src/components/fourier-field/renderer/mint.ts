// THE MINT — the one pipeline every spectrum enters and the one place a term count is
// decided. Run ONCE per source/seed, never per frame and never on an N edit.
//
//   points → dftFromPoints → hoist DC (the fit anchor) → sort by |c| descending
//     → paint-floor: keep a term iff it MOVES THE CURVE by at least half a device pixel
//       at the reference stage
//     → emit; the loop bound is the emitted array's length
//
// There is NO ceiling. `N` truncates a fixed, amplitude-ordered, paint-floored array, so
// the slider's maximum IS `spectrum.length` and the badge's denominator is the number of
// terms the frame actually summed. Amplitude order is what makes the assembly claim true:
// each N step adds the LARGEST remaining correction.
//
// THE REFERENCE STAGE, derived not minted. The article column caps at `--article-max`
// 1536 px and the stage block at `--stage-block: min(62svh, 44rem)` = 704 px; the fit
// paints the curve into a 605 px extent inside that, whose diagonal is 605·√2 ≈ 856 px.
// A term is kept iff its peak-to-peak excursion `2·|c_k|`, mapped through the fit at that
// diagonal, is at least `FOURIER_PAINT_FLOOR_PX` device pixels — i.e. iff a reader could
// see it. The floor keys to PAINT, never to the largest coefficient.

import { comp, partialSumAt, type BasisComponent } from "../math";

/**
 * The reference stage diagonal in device px — the derivation is on the line above. Every
 * axis maximum in the tree is this number's consequence, so it is declared once.
 */
export const FOURIER_REFERENCE_DIAGONAL_PX = 856;

/** A term survives the mint iff it moves the curve at least this far at the reference stage. */
export const FOURIER_PAINT_FLOOR_PX = 0.5;

/** The number of `t` samples the fit bbox pass walks. */
const FIT_SAMPLES = 720;

/**
 * A minted spectrum: the DC anchor, the amplitude-ordered surviving terms, and the model
 * geometry the fit and the ring law both read. Immutable and reference-stable — the
 * renderer's re-upload guard is an identity check against this object.
 */
export interface MintedSpectrum {
    /** The amplitude-ordered, paint-floored terms. `length` IS the N axis maximum. */
    readonly terms: readonly BasisComponent[];
    /** The hoisted DC term (the curve's centroid) — the anchor the scene is centred on. */
    readonly dc: readonly [number, number];
    /** The full reconstruction's bbox half-extents in model units (DC removed). */
    readonly halfSpanX: number;
    readonly halfSpanY: number;
    /** The bbox centre in model units (DC removed) — the fit's centre. */
    readonly centerX: number;
    readonly centerY: number;
    /** The bbox diagonal in model units — the reference-stage mapping's denominator. */
    readonly diagonal: number;
    /** `Σ|c_k|` over the terms — the chain's maximum reach from the centre. */
    readonly chainReach: number;
}

/** Walk the full reconstruction once and bound it. Uses the point evaluator, not the chain. */
function boundCurve(terms: readonly BasisComponent[]): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
} {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < FIT_SAMPLES; i++) {
        const [x, y] = partialSumAt(terms, i / FIT_SAMPLES);
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    if (!isFinite(minX)) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    return { minX, minY, maxX, maxY };
}

/**
 * Mint a raw spectrum into the shipped one. The input is anything `dftFromPoints`,
 * `makeHarmonicFigure` or `makeEllipticSpectrum` produced; the output is what the GPU
 * ever sees.
 *
 * Deterministic: the same input array yields the same output, term for term. An empty or
 * all-sub-floor input still emits its single largest term — a spectrum that draws nothing
 * is not a fallback, it is a blank stage, and the machine must always have one ring.
 */
export function mintSpectrum(raw: readonly BasisComponent[]): MintedSpectrum {
    const dcTerm = raw.find((c) => c.index === 0);
    const dc: readonly [number, number] = dcTerm
        ? [dcTerm.coefficient[0], dcTerm.coefficient[1]]
        : [0, 0];

    // Amplitude order — the assembly claim's whole basis.
    const ordered = raw
        .filter((c) => c.index !== 0)
        .slice()
        .sort((a, b) => b.amplitude - a.amplitude);

    if (ordered.length === 0) {
        const only = comp(1, 0.5, 0);
        return finalize([only], dc);
    }

    // The floor needs the geometry, and the geometry needs the terms: bound the FULL
    // reconstruction first, then decide who survives against that one mapping.
    const full = boundCurve(ordered);
    const spanX = Math.max(full.maxX - full.minX, 1e-6);
    const spanY = Math.max(full.maxY - full.minY, 1e-6);
    const modelDiagonal = Math.hypot(spanX, spanY);
    const devicePxPerModel = FOURIER_REFERENCE_DIAGONAL_PX / modelDiagonal;

    const kept = ordered.filter(
        (c) => 2 * c.amplitude * devicePxPerModel >= FOURIER_PAINT_FLOOR_PX,
    );
    return finalize(kept.length > 0 ? kept : [ordered[0]], dc);
}

function finalize(
    terms: readonly BasisComponent[],
    dc: readonly [number, number],
): MintedSpectrum {
    const b = boundCurve(terms);
    const spanX = Math.max(b.maxX - b.minX, 1e-6);
    const spanY = Math.max(b.maxY - b.minY, 1e-6);
    let chainReach = 0;
    for (const c of terms) chainReach += c.amplitude;
    return {
        terms,
        dc,
        halfSpanX: spanX / 2,
        halfSpanY: spanY / 2,
        centerX: (b.minX + b.maxX) / 2,
        centerY: (b.minY + b.maxY) / 2,
        diagonal: Math.hypot(spanX, spanY),
        chainReach,
    };
}

/**
 * THE RING LAW. A ring is DRAWN iff its own diameter reaches the mark's stroke at the
 * LIVE stage: `2·|c_k| ≥ markStroke`, both sides in device pixels. Below that rung the
 * term is still SUMMED and still CHAINED — the scaffold arm and the joint dot stay — only
 * the circle outline elides, because a circle narrower than the line drawing it is a blob,
 * not a circle.
 *
 * This is why the machine reads at every size with ZERO media queries: the question is
 * asked of the stage the component is actually in.
 */
export function ringsAt(
    minted: MintedSpectrum,
    stageDiagonalDevicePx: number,
    markStrokeDevicePx: number,
): number {
    const devicePxPerModel = stageDiagonalDevicePx / Math.max(minted.diagonal, 1e-6);
    let n = 0;
    for (const c of minted.terms) {
        if (2 * c.amplitude * devicePxPerModel >= markStrokeDevicePx) n++;
    }
    return n;
}
