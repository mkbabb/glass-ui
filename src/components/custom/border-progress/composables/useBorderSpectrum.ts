// BB.W-BORDER-PROGRESS / BC.W-AX-BP-LAZY — the brand-spectrum walk (the sync shell).
//
// `spectrumStops` is the SYNCHRONOUS public surface — the SFC calls it inside a
// `computed` and a consumer may call it synchronously, so it MUST stay sync (an
// `async` export breaks the synchronous render). This module is value.js-FREE: it
// carries NO top-level `@mkbabb/value.js` / `/color` import. The OKLCH/shorter-hue
// perceptual walk (the only value.js consumer in the leaf) moved to the
// dynamically-imported `./spectrum-walk` module (BC.W-AX-BP-LAZY — the eager-graph
// payload move), so `dist/border-progress.js`'s first-paint reach is value.js-free.
//
// Two paths, split by RAMP KIND:
//   - The `var()` / default ramp (the HOT path) — fully synchronous, value.js-FREE.
//     A ramp containing any `var(` (the library default + every brand-ramp consumer)
//     returns `[...stops]` synchronously and NEVER fires the dynamic import. This is
//     the common case (presets-in-consumers — most consumers ride the brand ramp).
//   - The CONCRETE-anchor walk (the COLD path) — the dynamic boundary. When a
//     consumer passes `#hex`/`oklch(…)` anchors, `spectrumStops` returns the
//     SYNCHRONOUS interim (the raw stops as evenly-spaced gradient stops — a correct,
//     if un-perceptual, banded ramp) AND kicks off `import("./spectrum-walk")`. When
//     the dynamic chunk resolves it re-computes the perceptual OKLCH walk and calls
//     `onUpgrade` so the reactive output swaps to the no-trough ramp the next tick.
//     The one-tick upgrade is imperceptible on a determinate progress surface.

import { BORDER_PROGRESS_SPECTRUM_SAMPLES } from "../constants";

/** A consumer-supplied callback the COLD path calls once the perceptual walk resolves. */
export type SpectrumUpgrade = (stops: string[]) => void;

const containsVar = (stops: readonly string[]) => stops.some((s) => /var\(/.test(s));

// The load-once cache for the dynamic perceptual walk: a concrete-anchor ramp is
// walked ONCE; a repeated call with the SAME anchors+samples reads the cached output
// (no re-import, no re-walk). The key is the concrete stop list + the sample count.
const walkCache = new Map<string, string[]>();
const cacheKey = (stops: readonly string[], count: number) =>
    `${count}|${stops.join("|")}`;

/**
 * Produce `count` evenly-spaced gradient stops — the SYNCHRONOUS interim for the
 * cold path: the consumer's raw anchors passed through unchanged (a correct banded
 * ramp the conic gradient reads while the perceptual chunk loads). The perceptual
 * walk upgrades it on the next tick.
 */
function interimStops(stops: readonly string[]): string[] {
    return [...stops];
}

/**
 * Produce `samples` evenly-spaced HEX/CSS stops across the anchor ramp — the conic
 * gradient's color stops. CSS `var(--…)` tokens (the LIBRARY-default brand ramp) are
 * passed through UNTOUCHED (they resolve in the cascade at paint — the value.js-free
 * fast path). CONCRETE color anchors return the synchronous interim immediately AND,
 * when `onUpgrade` is supplied, load `./spectrum-walk` and upgrade to the OKLCH/
 * shorter-hue perceptual walk once the dynamic chunk resolves.
 *
 * `spectrumStops` is SYNCHRONOUS (the SFC's `computed` cannot await). The dynamic
 * boundary lives INSIDE it (the value.js branch fires `import()` and returns the
 * synchronous interim), never on the export signature.
 *
 * @returns one stop per sample — `var()` strings for a token ramp, the raw anchors
 *   for the concrete-anchor synchronous interim (upgraded to HEX via `onUpgrade`).
 */
export function spectrumStops(
    stops: readonly string[],
    samples: number = BORDER_PROGRESS_SPECTRUM_SAMPLES,
    onUpgrade?: SpectrumUpgrade,
): string[] {
    const count = Math.max(2, Math.round(samples));

    // HOT path — the `var()` / default brand ramp. Pass through synchronously; the
    // conic gradient reads the live token values. NEVER fire the dynamic import (the
    // value.js-free fast path — BP4).
    if (containsVar(stops)) {
        return [...stops];
    }

    // COLD path — CONCRETE `#hex`/`oklch(…)` anchors. If the perceptual walk is
    // already cached (a repeated call), return it synchronously. Otherwise return
    // the synchronous interim now and kick off the dynamic import to upgrade.
    const key = cacheKey(stops, count);
    const cached = walkCache.get(key);
    if (cached) return cached;

    if (onUpgrade) {
        // BC.W-AX-BP-LAZY — the value.js-bearing perceptual walk is a dynamic chunk reached
        // ONLY for concrete #hex/oklch() anchors, so the default brand-ramp /border-progress
        // chunk stays value.js-free on its first-paint critical path.
        void import("./spectrum-walk").then(({ walkConcreteSpectrum }) => { // lazy-boundary: BC.W-AX-BP-LAZY value.js-free fast path; perceptual walk only for concrete anchors
            const walked = walkConcreteSpectrum(stops, count);
            walkCache.set(key, walked);
            onUpgrade(walked);
        });
    }
    return interimStops(stops);
}
