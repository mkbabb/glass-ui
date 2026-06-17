// BB.W-BORDER-PROGRESS — the brand-spectrum walk (the CONSUME, glass-ui-local
// interim). A thin consumer of the EXISTING `/color` leaf — it re-implements ZERO
// color math (`proof:single-color-core` holds: the math source stays value.js).
//
// CONSUME(value.js 0.13.0 oklchSpectrum): when value.js 0.13.0 ships the named
// `oklchSpectrum`/`sampleColorRamp` helper, this interim re-points onto it (the
// consume-and-delete; the peer spine widens to admit `^0.13.0` in
// W-PEER-SPINE / W-ADOPT-RECONCILE). The interim is founded on the leaf's existing
// `cssToOklch`/`oklchStopToHex` + value.js's `interpolateHue("shorter")`, so the
// re-point is a thin swap, not a re-author.
//
// The spectrum is OKLCH/shorter-hue: the hue channel walks the SHORTER arc (value.js
// `interpolateHue(..., "shorter")`) so a warm→cool anchor pair stays saturated — the
// OKLab-trough (grey midpoint) the linear-OKLab lerp produces is avoided. L and C are
// linear lerps of the already-resolved OKLCh coordinates (numeric interpolation of
// leaf-parsed stops, NOT a color-space matrix — no re-implemented OKLab→sRGB).

import { interpolateHue } from "@mkbabb/value.js";
import { cssToOklch, oklchStopToHex, type OklchStop } from "../../../../composables/color";
import { BORDER_PROGRESS_SPECTRUM_SAMPLES } from "../constants";

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** Linear lerp of two scalars (numeric, not color math). */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Walk the anchor ramp to the single OKLCh stop at parameter `t` (0..1) via the
 * shorter-hue arc. The segment is located, then L/C lerp linearly and the hue
 * walks value.js's `interpolateHue` in the normalized-turns domain (`/360` in,
 * `*360` out — value.js takes turns, the `.5` short-arc threshold is a half-turn;
 * the `deriveHue` leaf convention).
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
    const a = stops[i];
    const b = stops[i + 1];
    const h =
        ((interpolateHue(
            (((a.h % 360) + 360) % 360) / 360,
            (((b.h % 360) + 360) % 360) / 360,
            f,
            "shorter",
        ) *
            360) %
            360 +
            360) %
        360;
    return { L: lerp(a.L, b.L, f), C: lerp(a.C, b.C, f), h };
}

/**
 * Produce `samples` evenly-spaced HEX stops across the anchor ramp — the conic
 * gradient's color stops, carrying no chroma trough across the sweep. The anchor
 * stops are CSS color strings parsed via the leaf's `cssToOklch`; CSS `var(--…)`
 * tokens (the LIBRARY-default brand ramp) are passed through UNTOUCHED (they
 * resolve in the cascade at paint — the helper only walks CONCRETE color anchors).
 *
 * @returns one HEX (`#rrggbb`) per sample, or the raw `var()` strings when the
 *   anchors are CSS custom-property references (the token-cascade default).
 */
export function spectrumStops(
    stops: readonly string[],
    samples: number = BORDER_PROGRESS_SPECTRUM_SAMPLES,
): string[] {
    const count = Math.max(2, Math.round(samples));
    // The LIBRARY default ramp is CSS `var(--section-color-*)` tokens — they cannot
    // be parsed to OKLCh at author time (they resolve in the cascade). Pass them
    // through so the conic gradient reads the live token values; the OKLCH walk
    // engages only for CONCRETE color anchors (a consumer's `#hex`/`oklch(…)` set).
    if (stops.some((s) => /var\(/.test(s))) {
        return [...stops];
    }
    const anchors: OklchStop[] = stops.map((s) => cssToOklch(s));
    const out: string[] = [];
    for (let k = 0; k < count; k++) {
        const t = count === 1 ? 0 : k / (count - 1);
        out.push(oklchStopToHex(spectrumAt(anchors, t)));
    }
    return out;
}
