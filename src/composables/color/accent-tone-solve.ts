// BI.W-CHIP-FOLD — the value.js-BEARING dynamic leaf of the accent-tone register.
//
// The contrast-safe INK solve (the ONE channel that needs value.js) is quarantined
// HERE, reached ONLY behind a dynamic `import("./accent-tone-solve")` boundary from
// the sync value.js-FREE shell (`useAccentTone.ts`), so the `<Chip>`
// eager chunk stays value.js-free on a `var()` / unset tone (the measured 26KB
// quarantine; the value.js-bearing math lives in the dynamic leaf, the sync shell carries the
// var()-passthrough fast path).
//
// Value owns the complete solve: CSS parsing, the actual `oklab` painted-band mix,
// contrast, gamut mapping, and CSS serialization.

import { mixColors, safeAccentColor } from "@mkbabb/value.js/color";
import { serializeCssColor } from "@mkbabb/value.js/css";
import { colorValue, opaqueCssColor } from "./value";
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
 * Resolve the contrast-safe label ink for a CONCRETE tone (the caller — the shell —
 * has already screened out `var(--…)` tones; there is no author-time solve for a
 * cascade var). Invalid CSS and unreachable contrast throw `GlassColorError`; this
 * boundary never substitutes a default ink.
 */
export function solveAccentInk(
    toneCss: string,
    opts: UseAccentToneOptions = {},
): string {
    const bandStrength = opts.bandStrength ?? DEFAULT_BAND_STRENGTH;
    const minContrast = opts.inkContrast ?? AA_CONTRAST;
    const surfaceCss = opts.surface || DEFAULT_SURFACE;

    const tone = opaqueCssColor(toneCss, "solveAccentInk:tone");
    const surface = opaqueCssColor(surfaceCss, "solveAccentInk:surface");
    const band = colorValue(
        "solveAccentInk:band",
        mixColors(surface, tone, bandStrength, { space: "oklab" }),
    );
    const ink = colorValue(
        "solveAccentInk:contrast",
        safeAccentColor(tone, band, {
            minimumRatio: minContrast,
            gamut: "srgb",
        }),
    );
    return colorValue("solveAccentInk:serialize", serializeCssColor(ink));
}
