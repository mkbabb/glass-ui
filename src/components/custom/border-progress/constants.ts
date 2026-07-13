// BB.W-BORDER-PROGRESS — the border-ring primitive constants.
//
// The colocation-home for the width envelope, the default brand spectrum, the
// coverage union, and the milestone types (the AY.W-COLOCATE convention — a
// complex feature-dir carries its magic numbers in `constants.ts`, not as
// module-scope `const N = <number>` in the composables, so `proof:colocation`
// clause (b) holds). Every visual axis is a CSS custom property a consumer
// retunes (token-first); these are the JS-side DEFAULTS the SFC seeds them with.

/**
 * The coverage axis — `full-ring` sweeps the entire border perimeter,
 * `bottom-edge` paints ONLY the bottom border band (the literal C2 case: "the
 * bottom progressbar should serve as a thicker, dynamic BORDER"), and
 * `inline-end-edge` (BG.W-DOCK-SCROLL-PROGRESS) paints ONLY the inline-end
 * vertical band, filled TOP→BOTTOM linearly by the value — the scroll-position
 * register a vertical dock/rail wears (the scrollbar metaphor; a conic maps a
 * single edge nonlinearly, so the edge coverage swaps the PAINT to a linear
 * gradient while keeping the SAME border-band mask cut-out). All coverages
 * share the ONE mask mechanism (a `coverage`-scoped mask region — NOT a second
 * recipe).
 */
export type BorderProgressCoverage = "full-ring" | "bottom-edge" | "inline-end-edge";

/**
 * The thickness envelope (px). AMENDED 6-8px → 10-14px (speedtest AW v3 relay
 * A1, 2026-06-17): the thin-hairline 6-8px read as a rim, not the "thicker,
 * dynamic BORDER" the ask wants. The gate W4 + the π assert the band sits inside
 * [10, 14].
 */
export const BORDER_PROGRESS_WIDTH_MIN = 10;
export const BORDER_PROGRESS_WIDTH_MAX = 14;
/** The default ring thickness — the centre of the 10-14px envelope. */
export const BORDER_PROGRESS_WIDTH_DEFAULT = 12;

/** The default host border-radius (px) the ring follows when unset by the consumer. */
export const BORDER_PROGRESS_RADIUS_DEFAULT = 16;

/**
 * The number of conic stops the spectrum walk samples between the consumer's
 * anchor stops. A denser sample yields a smoother sweep with no visible banding;
 * the OKLCH/shorter-hue arc keeps every sample saturated (no chroma trough).
 */
export const BORDER_PROGRESS_SPECTRUM_SAMPLES = 24;

/**
 * The LIBRARY-identity default spectrum — the section/viz brand ramp (the
 * `--section-color-*` 13-stop ramp + the `--viz-*` twins). These resolve through
 * the CSS token cascade at paint, so the default carries no baked hue; a consumer
 * that wants its OWN phase palette passes its stops as the `stops` prop
 * (presets-in-consumers — NO speedtest/ppmycota hue enters a library token).
 *
 * The default is a warm→cool brand arc (rose → indigo → violet) sampled off the
 * 13-stop ramp so the resting ring already reads as "a spectrum of our colors".
 */
export const BORDER_PROGRESS_DEFAULT_SPECTRUM: readonly string[] = [
    "var(--section-color-0)", // rose anchor
    "var(--section-color-3)", // teal-green
    "var(--section-color-7)", // legendre violet (--viz-legendre twin)
    "var(--section-color-12)", // indigo close
] as const;

/**
 * A phase-edge milestone descriptor — the consumer declares phase boundaries on
 * the 0..1 (or 0..100) value axis; the ring fires a `milestone` event + (PRM-
 * gated) pulses when the value crosses one. The chassis `--phase-color` cascade
 * is the precedent (the bus carries phase IDENTITY; the milestone is the EVENT
 * seam — the consumer owns the phase colors, presets-in-consumers).
 */
export interface BorderProgressMilestone {
    /** The value-axis boundary (in the same units as `value`). */
    at: number;
    /** An opaque id echoed back on the `milestone` emit. */
    id: string;
    /** An optional label echoed back on the emit (analytics / a11y). */
    label?: string;
}

/** The payload of the `milestone` emit — the crossed edge + the value at crossing. */
export interface BorderProgressMilestoneEvent {
    /** The crossed milestone descriptor. */
    milestone: BorderProgressMilestone;
    /** The value at the moment of crossing (post-update). */
    value: number;
}

/**
 * BI.W-SCROLL-PROGRESS-RIM (atlas C1/#185) — the per-item `[0,1]` STEPPER contract. N
 * items → N band segments; item `i`'s scalar (clamped `[0,1]`) fills its OWN arc, so a
 * consumer (the atlas dock-progress) binds PER-ITEM, not only the aggregate `value`. The
 * successor-contract half of ask #23 — the consume renderer lands on the atlas side.
 */
export type BorderProgressSegments = readonly number[];
