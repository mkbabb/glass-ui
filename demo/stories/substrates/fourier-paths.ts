// The curated shape-trace path library for the foreground Fourier studio
// (BA.W-FOURIER-STUDIO scope 5). Each entry is a closed point set in a centered
// unit box (x,y ∈ roughly [-0.5, 0.5]; y grows DOWNWARD, screen convention) fed
// through `dftFromPoints` — the forward DFT — to produce the SAME-engine spectrum
// that `partialSumAt` / `positionsAt` reconstruct. This is `dftFromPoints`'s
// STUDIO consumer face (BA-FOUR-4): the exported-but-consumerless forward
// transform gains a rendered consumer beyond its E1 easter-egg use, and the ℱ
// wordmark is literally drawn by its own Fourier epicycles (the brand tie-in).
//
// The ℱ wordmark reuses the hand-traced glyph the redraw egg already ships
// (./fGlyphPoints.ts — colocated with this, its ONE consumer, at the eggs delete) — one source of truth for the brand outline. The
// heart + star are authored here as their own closed parametric curves.

import {
    dftFromPoints,
    type BasisComponent,
} from "@glass/components/custom/fourier-field";
import { fGlyphPoints } from "./fGlyphPoints";

/** A curated trace source: a label + the closed point set + its DFT spectrum. */
export interface FourierShape {
    /** Stable key (the configurator select value). */
    readonly key: string;
    /** Human label for the configurator row. */
    readonly label: string;
    /** The closed outline, centered unit box, resampled uniformly by arc length. */
    readonly points: readonly [number, number][];
    /**
     * The forward-DFT spectrum the SAME engine (`partialSumAt`/`positionsAt`)
     * reconstructs. Frequencies are already in epicycle order (0, +1, -1, +2, …);
     * the DC (index 0) term is the centroid (≈0 since the outlines are centered).
     */
    readonly spectrum: BasisComponent[];
}

/** Recenter a polyline to a centered unit box (max-dimension normalized to 1). */
function recenterUnit(pts: [number, number][]): [number, number][] {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of pts) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    const w = maxX - minX || 1;
    const h = maxY - minY || 1;
    const s = 1 / Math.max(w, h);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    return pts.map(([x, y]) => [(x - cx) * s, (y - cy) * s]);
}

/** Sample a closed parametric curve `f(u)` over u ∈ [0,1) at `n` points. */
function sampleClosed(
    f: (u: number) => [number, number],
    n: number,
): [number, number][] {
    const out: [number, number][] = [];
    for (let k = 0; k < n; k++) out.push(f(k / n));
    return recenterUnit(out);
}

// ── The heart — a classic closed cardioid-ish parametric heart curve. ─────────
// x = 16 sin³θ ; y = 13 cosθ − 5 cos2θ − 2 cos3θ − cos4θ (the canonical "heart
// curve"), negated on y so the lobes sit UP in screen convention.
function heartPoints(samples = 256): [number, number][] {
    return sampleClosed((u) => {
        const th = u * 2 * Math.PI;
        const x = 16 * Math.sin(th) ** 3;
        const y = -(
            13 * Math.cos(th) -
            5 * Math.cos(2 * th) -
            2 * Math.cos(3 * th) -
            Math.cos(4 * th)
        );
        return [x, y];
    }, samples);
}

// ── The star — a 5-point star traced as a closed polyline through the alternating
// outer/inner vertices (sampled on the segments so the DFT sees a smooth signal).
function starPoints(points = 5, samples = 256): [number, number][] {
    const verts: [number, number][] = [];
    const outer = 0.5;
    const inner = 0.21;
    // Build the 2*points alternating vertices, then sample uniformly around the
    // closed polyline.
    const n = points * 2;
    for (let i = 0; i < n; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = (i / n) * 2 * Math.PI - Math.PI / 2; // point-up
        verts.push([r * Math.cos(a), r * Math.sin(a)]);
    }
    verts.push(verts[0]); // close
    // Cumulative arc length, then walk it.
    const seg: number[] = [];
    let total = 0;
    for (let i = 0; i < verts.length - 1; i++) {
        const len = Math.hypot(verts[i + 1][0] - verts[i][0], verts[i + 1][1] - verts[i][1]);
        seg.push(len);
        total += len;
    }
    const out: [number, number][] = [];
    for (let k = 0; k < samples; k++) {
        const target = (k / samples) * total;
        let acc = 0;
        let i = 0;
        while (i < seg.length && acc + seg[i] < target) {
            acc += seg[i];
            i++;
        }
        if (i >= seg.length) {
            out.push([verts[verts.length - 1][0], verts[verts.length - 1][1]]);
            continue;
        }
        const f = seg[i] > 0 ? (target - acc) / seg[i] : 0;
        out.push([
            verts[i][0] + (verts[i + 1][0] - verts[i][0]) * f,
            verts[i][1] + (verts[i + 1][1] - verts[i][1]) * f,
        ]);
    }
    return recenterUnit(out);
}

/**
 * Build a {@link FourierShape} from a label + closed point set — the SINGLE place
 * the forward DFT is invoked (the W4 consumer call site). Memoized at module load.
 */
function makeShape(key: string, label: string, points: [number, number][]): FourierShape {
    return { key, label, points, spectrum: dftFromPoints(points) };
}

/**
 * The curated trace library — the ℱ wordmark (the brand mark, reused from the
 * redraw egg), a heart, and a 5-point star. Each carries its forward-DFT spectrum
 * ready for the studio's `partialSumAt`/`positionsAt` reconstruction.
 */
export const FOURIER_SHAPES: readonly FourierShape[] = [
    makeShape("f-mark", "ℱ wordmark", fGlyphPoints(160)),
    makeShape("heart", "Heart", heartPoints(256)),
    makeShape("star", "Star", starPoints(5, 256)),
];

/** Look up a curated shape by key, or the first (the ℱ wordmark) as a fallback. */
export function getFourierShape(key: string): FourierShape {
    return FOURIER_SHAPES.find((s) => s.key === key) ?? FOURIER_SHAPES[0];
}
