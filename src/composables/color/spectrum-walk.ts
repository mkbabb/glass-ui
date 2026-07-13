// BI.W-SCROLL-PROGRESS-RIM (R5-C-03) — the value.js-bearing OKLCH/shorter walk, PROMOTED
// to the shared `/color` leaf (its natural home beside `cssToOklch`). Moved from
// `border-progress/composables/spectrum-walk.ts` (BC.W-AX-BP-LAZY) so the dock rim consumes
// `/color` directly AND border-progress stays a consumer of the moved leaf (BOTH green until
// the retire wave); border-progress keeps 0 binary consumers so its retire wave stands.
//
// It is still reached ONLY behind a dynamic `import()` boundary (BorderProgress's
// value.js-free sync shell + any /color-direct consumer), so a consumer's first-paint
// critical path stays value.js-free on the `var(--…)` brand-ramp fast path. This is the
// ONLY module in the leaf with a RAW value.js channel read (`mixColors`/`sampleColorRamp`
// on `OKLCHColor` channels, bypassing `parseCSSColor`/`toString`) — the SINGULAR raw-read
// site (u-formation §1). It re-implements ZERO color math (`proof:single-color-core` holds:
// the math source IS value.js).
//
// ─────────────────────────────────────────────────────────────────────────────
// U-F30 COUPLING (the convention attestation — moves WITH the code so the U-F77 co-land
// re-enumeration finds it). This module reads RAW `OKLCHColor` channels: `L∈[0,1]`,
// `C∈physical`, `h∈TURNS` (value.js's color machinery carries hue in normalized turns
// `h/360`; `oklchToStop` un-normalizes `*360`). It is tuned to value.js's CURRENT
// normalized-in / hue-in-turns convention — a convention change would silently shift the
// spectrum with zero born-RED. HOLD posture (2026-07-13, composite Locus-P): value.js chose
// the invariant-preserving toString-only fix (`valuejs-inbox-2026-07-13-u-w-lib-invariant.md`
// §A: "spectrum-walk PRESERVED — byte-identical, NO co-migration"), so NO action lands here.
// IF a convention change ships instead, this walk CO-MIGRATES in the SAME window (U-F77
// ordering). The trigger row is `asks-and-consumes §U-F30 watch`.
// ─────────────────────────────────────────────────────────────────────────────
//
// The spectrum is OKLCH/shorter-hue: value.js's `sampleColorRamp(from, to, n,
// { space: "oklch", hueMethod: "shorter" })` walks the SHORTER hue arc so a warm→cool
// anchor pair stays saturated — the OKLab-trough (grey midpoint) the linear-OKLab lerp
// produces is avoided. L and C interpolate in OKLCh space; the helper IS value.js, so the
// "single color core" stays the value.js Ottosson path, not a re-rolled matrix.

import { mixColors, OKLCHColor, sampleColorRamp } from "@mkbabb/value.js";
import { cssToOklch, oklchStopToHex, type OklchStop } from "./index";

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/**
 * Build a value.js `OKLCHColor` from an `OklchStop`. value.js's color machinery carries
 * the hue channel in normalized TURNS (`h/360`), so the OKLCh anchor's degree hue is
 * normalized in; the read-back (`oklchToStop`) un-normalizes it. (U-F30 coupling — the raw
 * channel scale + the hue-in-turns convention; see the module-head attestation.)
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
 * OKLCh/shorter-hue perceptual mix at the in-segment fraction (the single-point twin of
 * `sampleColorRamp`; ONE color source — value.js). L/C lerp in OKLCh and the hue walks the
 * SHORTER arc, so the warm→cool midpoint keeps its chroma.
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
 * (OKLCH/shorter-hue) cold path. The caller has already screened out `var(--…)` ramps, so
 * every stop here is a CONCRETE CSS color the leaf's `cssToOklch` parses to OKLCh; the walk
 * carries no chroma trough.
 *
 * Each adjacent anchor pair is one `sampleColorRamp` segment (the value.js grid sampler
 * walked SHORTER-hue in OKLCh); the per-segment grids concatenate (shared boundary deduped)
 * into one continuous `count`-stop ramp. The endpoints anchor the input exactly; the hue
 * walks the shorter arc end-to-end, so no segment greys out.
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
