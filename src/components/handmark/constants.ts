/**
 * constants.ts — the marking-space geometry constants (the colocation home).
 * ─────────────────────────────────────────────────────────────────────────────
 * The hand-mark family's named geometry constants live here (the
 * convention's `constants.ts` home). geometry.ts + the SFC re-read them by name.
 */

/** Marking-space width (the 0..100 × 0..40 viewBox; `preserveAspectRatio="none"`). */
export const VB_W = 100;
/** Marking-space height. */
export const VB_H = 40;

/**
 * The hairline gap, as a fraction of the `.hm` box, between the MEASURED text
 * baseline and the underline centerline. The underline rides just under the real
 * glyph bottoms — a hand mark sits a few % of cap-height below the baseline, never
 * through it (the E1 occlusion root: a constant `y=32` strikethroughs tight-leading
 * display type because 80% of a `line-height:1.02` box IS the baseline).
 */
export const UNDERLINE_GAP = 0.06;

/**
 * The highlighter LOW-SEAT band ( C-1(a)). A real highlighter rides
 * the low two-thirds of the line — the ink sits on the baseline and rises to
 * ~x-height — NOT the box vertical center the fork shipped. The band centerline
 * seats at `baselineFrac − HIGHLIGHT_RISE` (raised off the baseline by ~half a
 * lowercase x-height) so the wide slab (weight 26) covers x-height down to the
 * baseline. Expressed as a fraction of the `.hm` box, parallel to UNDERLINE_GAP.
 */
export const HIGHLIGHT_RISE = 0.22;
/** Pre-measure fallback for the highlight band's low seat (null baselineFrac). */
export const HIGHLIGHT_FALLBACK_FRAC = 0.66;

/**
 * The boil voice — φ-incommensurate fractal value-noise (the masthead morphology).
 * ─────────────────────────────────────────────────────────────────────────────
 * The boil centerline is a 1-D fractal value-noise displacement off the HOUSE
 * `mulberry32`, NOT a seeded sinusoid. A sinusoid self-correlates
 * into a near-period — it reads as a spell-check squiggle and a clean sine fails any
 * honest non-periodicity discriminator (a sine's extrema are near-uniformly spaced).
 * The value-noise sums octaves at φ-stepped frequencies (mutually irrational → the
 * sum NEVER closes into a period); each octave's amplitude decays by 1/φ. The result
 * is a hump-to-hump-IRREGULAR hand line whose inter-extremum spacing-CV is the honest
 * teeth (measured: ~0.41 at the paint's segment count, ~0.71 resampled at RES=64,
 * over 400 seeds — vs a sinusoid's ~0.14; a clean separation either side of a
 * 0.30 floor). The amplitude is SCALE-RELATIVE (a fraction of the rendered span), so
 * a long word and a short word wobble in proportion. FILTER-FREE — the wander lives
 * in the control points + the hull width, never a feTurbulence.
 *
 * Constants pinned against a 400-seed spacing-CV spike (NOT a seed-overfit autocorr
 * peak — autocorr cannot separate smooth low-frequency value-
 * noise from a sinusoid at any resolution).
 */
/** φ — the per-octave frequency step (mutually irrational → never periodic). */
export const NOISE_PHI = 1.618033988749895;
/** octave count of the fractal value-noise sum. */
export const NOISE_OCTAVES = 4;
/** base octave frequency (humps across the unit span); octave k rides F0·φ^k. */
export const NOISE_F0 = 2.5;
/** displacement amplitude as a fraction of the rendered span (scale-relative). */
export const NOISE_AMP_FRAC = 0.05;
/** endpoint-only cosine taper width (the ends settle to baseline; the BODY stays irregular). */
export const NOISE_EDGE = 0.12;

/**
 * The AMPLITUDE-KNOB reference wobble ( (c)). The natural-underline
 * excursion is `span × NOISE_AMP_FRAC × f(wobble)` where `f(wobble) = wobble, NOISE_WOBBLE_REF`
 * repurposing the existing Brush `wobble` scalar to drive the centerline amplitude,
 * decoupling excursion from stroke `weight` (the published `amplitude` contract, no 13th
 * scalar). Pinned to the shipped `boil` brush's wobble (1.4) so `f(1.4) = 1` ⇒ the default
 * boil render is BYTE-IDENTICAL; a consumer lifts excursion by raising `wobble` (or the
 * explicit `amplitude` prop, which wins). A lower-wobble brush wobbles proportionally less.
 */
export const NOISE_WOBBLE_REF = 1.4;
