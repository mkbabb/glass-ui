// BC.W-AX-BP-LAZY — the value.js-bearing dynamic leaf (the cold path).
//
// The OKLCH/shorter-hue spectrum walk lives HERE, behind a dynamic `import()`
// boundary `useBorderSpectrum.ts` reaches ONLY for CONCRETE color anchors (a
// consumer's `#hex`/`oklch(…)` set). The DEFAULT `var(--…)` brand ramp + every
// brand-ramp consumer ride the value.js-FREE fast path in `useBorderSpectrum.ts`
// and never load this module — so `dist/border-progress.js` carries ZERO value.js
// weight on its first-paint critical path (the speedtest results-card consume).
//
// This is the ONLY module in the leaf with a value.js / `/color` edge. It is a thin
// consumer of value.js + the EXISTING `/color` leaf — it re-implements ZERO color
// math (`proof:single-color-core` holds: the math source IS value.js). The move is
// byte-faithful: the perceptual walk produces the SAME output the static path did.
//
// The spectrum is OKLCH/shorter-hue: value.js's `sampleColorRamp(from, to, n,
// { space: "oklch", hueMethod: "shorter" })` walks the SHORTER hue arc so a
// warm→cool anchor pair stays saturated — the OKLab-trough (grey midpoint) the
// linear-OKLab lerp produces is avoided. L and C interpolate in OKLCh space (the
// same linear walk the prior interim ran by hand); the helper IS value.js, so the
// "single color core" stays the value.js Ottosson path, not a re-rolled matrix.

import { mixColors, OKLCHColor, sampleColorRamp } from "@mkbabb/value.js";
import { cssToOklch, oklchStopToHex, type OklchStop } from "../../../../composables/color";

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/**
 * Build a value.js `OKLCHColor` from an `OklchStop`. value.js's color machinery
 * carries the hue channel in normalized TURNS (`h/360`), so the OKLCh anchor's
 * degree hue is normalized in; the read-back (`oklchToStop`) un-normalizes it.
 */
const stopToColor = (s: OklchStop): OKLCHColor =>
    new OKLCHColor(s.L, s.C, s.h / 360);

/** Read a value.js `OKLCHColor` (turns-normalized hue) back to an `OklchStop` (degrees). */
const oklchToStop = (c: OKLCHColor): OklchStop => ({
    L: Number(c.l),
    C: Number(c.c),
    h: (((Number(c.h) * 360) % 360) + 360) % 360,
});

/**
 * Walk the anchor ramp to the single OKLCh stop at parameter `t` (0..1) via the
 * shorter-hue arc — the segment is located, then value.js's `mixColors` runs the
 * OKLCh/shorter-hue perceptual mix at the in-segment fraction (the single-point
 * twin of `sampleColorRamp`; ONE color source — value.js). L/C lerp in OKLCh and
 * the hue walks the SHORTER arc, so the warm→cool midpoint keeps its chroma.
 *
 * Deterministic + DOM-free (SSR-safe; mirrors `deriveBlobPalette`).
 */
export function spectrumAt(stops: readonly OklchStop[], t: number): OklchStop {
    const n = stops.length;
    if (n === 0) return { L: 0.7, C: 0, h: 0 };
    if (n === 1) return stops[0];
    const tt = clamp01(t) * (n - 1);
    const i = Math.min(n - 2, Math.floor(tt));
    const f = tt - i;
    const mixed = mixColors(
        stopToColor(stops[i]),
        stopToColor(stops[i + 1]),
        1 - f,
        f,
        "oklch",
        "shorter",
    ) as OKLCHColor;
    return oklchToStop(mixed);
}

/**
 * Walk a CONCRETE-anchor ramp to `count` evenly-spaced HEX stops — the perceptual
 * (OKLCH/shorter-hue) cold path. The caller (`spectrumStops` in the sync shell) has
 * already screened out `var(--…)` ramps, so every stop here is a CONCRETE CSS color
 * the leaf's `cssToOklch` parses to OKLCh; the walk carries no chroma trough.
 *
 * Each adjacent anchor pair is one `sampleColorRamp` segment (the value.js grid
 * sampler walked SHORTER-hue in OKLCh); the per-segment grids concatenate (shared
 * boundary deduped) into one continuous `count`-stop ramp. The endpoints anchor the
 * input exactly; the hue walks the shorter arc end-to-end, so no segment greys out.
 *
 * @returns one HEX (`#rrggbb`) per stop.
 */
export function walkConcreteSpectrum(stops: readonly string[], count: number): string[] {
    const anchors: OklchStop[] = stops.map((s) => cssToOklch(s));
    const n = anchors.length;
    if (count < 2) return [oklchStopToHex(anchors[0] ?? { L: 0.7, C: 0, h: 0 })];
    if (n === 0) return Array.from({ length: count }, () => oklchStopToHex({ L: 0.7, C: 0, h: 0 }));
    if (n === 1) return Array.from({ length: count }, () => oklchStopToHex(anchors[0]));

    const sampleSegment = (a: OklchStop, b: OklchStop, segCount: number): string[] =>
        sampleColorRamp(stopToColor(a), stopToColor(b), segCount, {
            space: "oklch",
            hueMethod: "shorter",
        }).map((c) => oklchStopToHex(oklchToStop(c as OKLCHColor)));

    const segments = n - 1;
    const out: string[] = [];
    for (let s = 0; s < segments; s++) {
        // Distribute the `count` evenly-spaced stops across the `segments` segments,
        // sharing boundary anchors (so the concatenated ramp is exactly `count` long).
        const startIdx = Math.round((s * (count - 1)) / segments);
        const endIdx = Math.round(((s + 1) * (count - 1)) / segments);
        const segStops = sampleSegment(anchors[s], anchors[s + 1], endIdx - startIdx + 1);
        // Drop the shared boundary stop on every segment after the first.
        out.push(...(s > 0 ? segStops.slice(1) : segStops));
    }
    return out;
}
