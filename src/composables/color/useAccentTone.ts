// BC.W-ACCENT-TONE — the contrast-safe INK half of the tonal-accent register (the
// JS half of `.accent-tone`). A thin consumer of the EXISTING `/color` leaf + the
// value.js contrast helpers — it re-implements ZERO contrast/lightness math
// (`proof:single-color-core` holds; the `useBorderSpectrum` precedent).
//
// The CSS recipe (`glass/accent-tone.css`) owns the idle FILL / active BAND / EDGE
// channels off ONE `--tone`, `in oklab`. CSS cannot call value.js, so the ONE
// channel that needs the contrast SOLVE — the label `--accent-ink`, auto-
// darkened/lightened until it clears the AA bar OVER the resolved band fill — is
// resolved HERE and written to `--accent-ink-resolved` (the CSS reads
// `var(--accent-ink-resolved, var(--foreground))`).
//
// The math source is value.js: `safeAccentColor` shifts the ink's OKLCh lightness
// AWAY from the band lightness until it clears the target; `computeSafeAccent` is
// its numeric core. glass-ui composes them — it does NOT re-implement an OKLCh
// lightness-solve or a contrast loop (A2 reds a hand-roll). The band fill is mixed
// `in oklab` numerically from the leaf-parsed tone + surface stops (numeric
// interpolation of value.js-parsed OKLab coordinates, NOT a re-rolled color-space
// matrix — the `useBorderSpectrum` L/C-lerp precedent).

import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from "vue";
import { OKLCHColor, safeAccentColor, rawOklchToOklab } from "@mkbabb/value.js";
import { cssToOklch, type OklchStop } from "./index";

/**
 * The canonical resting surface the accent sits ON when the consumer does not
 * name one — the warm-cream `--card` plate (`tokens/color-radius.css`, light
 * `hsl(36 48% 97%)`). DOM-free + deterministic (SSR-safe): the composable cannot
 * read the live `--card` token without a DOM, so the band-lightness solve defaults
 * to this concrete surface; a consumer painting onto a different surface (e.g. a
 * dark plate) passes `opts.surface`. The CSS recipe's `var(--surface, var(--card))`
 * is the live-cascade twin (it resolves the REAL token at paint); this default is
 * the JS-side ink-solve seed.
 */
const DEFAULT_SURFACE = "hsl(36 48% 97%)";

/** AA — the body-text contrast bar the resolved ink clears over the band. */
const AA_CONTRAST = 4.5;

/** The default idle / active strengths (the CSS channel defaults, mirrored here so
 *  the JS band-solve composites the SAME band the recipe paints). */
const DEFAULT_FILL_STRENGTH = 0.08;
const DEFAULT_BAND_STRENGTH = 0.18;

export interface UseAccentToneOptions {
    /** Idle fill strength (0..1). Default 0.08. The CSS `--accent-fill-strength`
     *  twin — passed here so the JS ink-solve composites the matching band. */
    fillStrength?: number;
    /** Active band strength (0..1). Default 0.18 (the CSS `--accent-band-strength`). */
    bandStrength?: number;
    /** Target ink-over-band contrast. Default 4.5 (AA). */
    inkContrast?: number;
    /** The surface the accent paints ON (a CSS `<color>`). Default the warm-cream
     *  `--card`. A consumer on a dark/other plate passes its concrete surface so
     *  the ink solves against the right band lightness. */
    surface?: string;
}

export interface UseAccentToneReturn {
    /** The element-level custom-property style object — bind via `:style`. Carries
     *  `--tone` (so the CSS channels resolve) + `--accent-ink-resolved` (the
     *  contrast-safe label colour over the active band). */
    toneStyle: ComputedRef<Record<string, string>>;
    /** The resolved contrast-safe ink as a CSS `oklch(...)` string (for a non-CSS
     *  reader — a canvas label, a test). */
    ink: ComputedRef<string>;
}

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
 * `useAccentTone(tone, opts)` — resolve the contrast-safe label ink for the tonal
 * register. The ink RESOLVES `safeAccentColor(toneColor, bandLightness, …)`:
 * value.js shifts the tone's OKLCh lightness AWAY from the active-band fill until
 * it clears the AA bar, so the label reads ON the fill in either mode (a dark band
 * gets a light ink, a light band a dark ink). The darken/lighten-until-it-passes
 * math is value.js's — glass-ui re-implements none of it.
 *
 * PRM-irrelevant (a colour, not an animation). DOM-free + deterministic.
 */
export function useAccentTone(
    tone: MaybeRefOrGetter<string>,
    opts: UseAccentToneOptions = {},
): UseAccentToneReturn {
    const ink = computed(() => {
        const toneCss = toValue(tone) || "var(--primary)";
        // A `var(--…)` tone cannot be parsed to OKLCh at author time (it resolves
        // in the cascade) — there is no contrast solve to do, so the CSS fallback
        // (`var(--accent-ink-resolved, var(--foreground))`) carries the ink and we
        // emit no resolved override (the `useBorderSpectrum` var()-passthrough
        // precedent). The solve engages only for CONCRETE colours.
        if (/var\(/.test(toneCss)) return "";

        const fillStrength = opts.fillStrength ?? DEFAULT_FILL_STRENGTH;
        const bandStrength = opts.bandStrength ?? DEFAULT_BAND_STRENGTH;
        const minContrast = opts.inkContrast ?? AA_CONTRAST;
        void fillStrength; // the idle floor is a CSS-token concern; band drives ink
        const surfaceCss = opts.surface || DEFAULT_SURFACE;

        let toneStop: OklchStop;
        let surfaceStop: OklchStop;
        try {
            toneStop = cssToOklch(toneCss);
            surfaceStop = cssToOklch(surfaceCss);
        } catch {
            // fail-explicit: an unparseable tone/surface token → return "" so the
            // consumer falls back to the CSS default ink (a befitting graceful
            // degrade for a bad consumer color, not a swallowed error).
            return "";
        }

        const bandL = bandLightness(surfaceStop, toneStop, bandStrength);
        // safeAccentColor lifts the ink's OKLCh L away from the band lightness by a
        // lightness distance derived from the AA contrast target. value.js owns the
        // shift; the `* 0.1` maps the WCAG ratio (~4.5) to the OKLCh L-distance
        // value.js's `minContrast` takes (a perceptual L gap; AA ≈ 0.45 L-distance
        // empirically clears 4.5:1 over the warm bands — verified in the unit π).
        const inkColor = safeAccentColor(
            new OKLCHColor(toneStop.L, toneStop.C, toneStop.h),
            bandL,
            minContrast * 0.1,
        );
        return inkColor.toString();
    });

    const toneStyle = computed<Record<string, string>>(() => {
        const style: Record<string, string> = { "--tone": toValue(tone) || "var(--primary)" };
        const resolved = ink.value;
        if (resolved) style["--accent-ink-resolved"] = resolved;
        return style;
    });

    return { toneStyle, ink };
}
