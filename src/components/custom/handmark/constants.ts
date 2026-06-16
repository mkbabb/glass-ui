/**
 * constants.ts — the marking-space geometry constants (the colocation home).
 * ─────────────────────────────────────────────────────────────────────────────
 * The hand-mark family's named geometry constants live here (the AY.W-COLOCATE
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
 * The highlighter LOW-SEAT band (BA.W-HANDMARK C-1(a)). A real highlighter rides
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
 * Natural-underline morphology (BA.W-HANDMARK C-2). The procedural wobble is
 * SCALE-RELATIVE: the amplitude is a fraction of the rendered word width (a long
 * word and a short word wobble in proportion, not the viewBox-stretched-constant
 * the fork's GlassUnderline shipped). The period count is IRREGULAR — a seeded
 * pick in [PERIODS_MIN, PERIODS_MAX] — so two seeds differ in hump count, never
 * identical twins.
 */
export const PERIODS_MIN = 2;
export const PERIODS_MAX = 4;
