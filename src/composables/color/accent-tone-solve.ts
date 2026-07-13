// BI.W-CHIP-FOLD — the value.js-BEARING dynamic leaf of the accent-tone register.
//
// The contrast-safe INK solve (the ONE channel that needs value.js) is quarantined
// HERE, reached ONLY behind a dynamic `import("./accent-tone-solve")` boundary from
// the sync value.js-FREE shell (`useAccentTone.ts`), so the `<Chip>` / `<SelectableChip>`
// eager chunk stays value.js-free on a `var()` / unset tone (the measured 26KB
// quarantine; the /border-progress BC.W-AX-BP-LAZY / spectrum-walk precedent — the
// value.js-bearing math lives in the dynamic leaf, the sync shell carries the
// var()-passthrough fast path).
//
// The math source is value.js: `safeAccentColor` shifts the ink's OKLCh lightness
// AWAY from the band lightness until it clears the AA bar; it re-implements ZERO
// contrast/lightness math (`proof:single-color-core` holds). The band fill is mixed
// `in oklab` numerically from the leaf-parsed tone + surface stops (numeric
// interpolation of value.js-parsed OKLab coordinates, NOT a re-rolled color-space
// matrix — the `useBorderSpectrum` L/C-lerp precedent).

import { OKLCHColor, safeAccentColor, rawOklchToOklab } from "@mkbabb/value.js";
import { cssToOklch, type OklchStop } from "./index";
import type { UseAccentToneOptions } from "./useAccentTone";

/**
 * The canonical resting surface the accent sits ON when the consumer does not name
 * one — the warm-cream `--card` plate (`tokens/color-radius.css`, light
 * `hsl(36 48% 97%)`). DOM-free + deterministic (SSR-safe): the leaf cannot read the
 * live `--card` token without a DOM, so the band-lightness solve defaults to this
 * concrete surface; a consumer painting onto a different surface passes
 * `opts.surface`. The CSS recipe's `var(--surface, var(--card))` is the live-cascade
 * twin (it resolves the REAL token at paint); this default is the JS-side seed.
 */
const DEFAULT_SURFACE = "hsl(36 48% 97%)";

/** AA — the body-text contrast bar the resolved ink clears over the band. */
const AA_CONTRAST = 4.5;

/** The default active band strength (the CSS `--accent-band-strength`), mirrored
 *  here so the JS band-solve composites the SAME band the recipe paints. */
const DEFAULT_BAND_STRENGTH = 0.18;

/**
 * The OKLab lightness of a band fill = `color-mix(in oklab, surface, tone p%)`,
 * mixed numerically from the two leaf-parsed OKLCh stops. Returns the band's OKLab
 * `L` (the contrast solve's `bgLightness`). The mix is a numeric lerp of the
 * value.js-derived OKLab coordinates — no re-rolled color-space matrix.
 */
function bandLightness(surface: OklchStop, tone: OklchStop, p: number): number {
    const [sL] = rawOklchToOklab(surface.L, surface.C, surface.h);
    const [tL] = rawOklchToOklab(tone.L, tone.C, tone.h);
    return sL * (1 - p) + tL * p;
}

/**
 * Resolve the contrast-safe label ink for a CONCRETE tone (the caller — the shell —
 * has already screened out `var(--…)` tones; there is no author-time solve for a
 * cascade var). The ink RESOLVES `safeAccentColor(toneColor, bandLightness, …)`:
 * value.js shifts the tone's OKLCh lightness AWAY from the active-band fill until it
 * clears the AA bar, so the label reads ON the fill in either mode. Returns an
 * `oklch(...)` string, or `""` on an unparseable tone/surface (fail-explicit — the
 * consumer falls back to the CSS default ink, a befitting graceful degrade).
 */
export function solveAccentInk(
    toneCss: string,
    opts: UseAccentToneOptions = {},
): string {
    const bandStrength = opts.bandStrength ?? DEFAULT_BAND_STRENGTH;
    const minContrast = opts.inkContrast ?? AA_CONTRAST;
    const surfaceCss = opts.surface || DEFAULT_SURFACE;

    let toneStop: OklchStop;
    let surfaceStop: OklchStop;
    try {
        toneStop = cssToOklch(toneCss);
        surfaceStop = cssToOklch(surfaceCss);
    } catch {
        return "";
    }

    const bandL = bandLightness(surfaceStop, toneStop, bandStrength);
    // safeAccentColor lifts the ink's OKLCh L away from the band lightness by a
    // lightness distance derived from the AA contrast target. value.js owns the
    // shift; the `* 0.1` maps the WCAG ratio (~4.5) to the OKLCh L-distance value.js's
    // `minContrast` takes (a perceptual L gap; AA ≈ 0.45 L-distance empirically clears
    // 4.5:1 over the warm bands — verified in the unit π).
    const inkColor = safeAccentColor(
        new OKLCHColor(toneStop.L, toneStop.C, toneStop.h),
        bandL,
        minContrast * 0.1,
    );
    return inkColor.toString();
}
