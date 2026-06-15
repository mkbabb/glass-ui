// AY.W-COLOCATE — the SegmentedTabs feature-dir constants home. The elastic-
// indicator travel-squish magic numbers live HERE (the feature-dir `constants.ts`
// convention) rather than inline in `composables/useTabIndicator.ts`.

/**
 * Fallback for `--tab-indicator-max-stretch` when the cascade leaves it unset — the
 * default ≈+8% travel-squish cap (AX.W53). `--stretch = 1 + frac · (cap − 1)`, so a
 * full-width jump reaches the cap and a tiny hop stays near 1. The token is the
 * authority; this is the no-token floor.
 */
export const DEFAULT_INDICATOR_MAX_STRETCH = 1.08;

/**
 * The travel-progress fraction at which the squish RELEASES — the Material
 * "grow then shrink" close, keyed to ARRIVAL (BA.W-TABS). The squish opens with
 * the glide and releases when the indicator is within this fraction of its target
 * (release-at-arrival), retiring the fixed mid-glide `INDICATOR_RELEASE_MS` timer
 * (which fired at 60ms — BEFORE the ~100ms 90%-travel point, mid-glide). The
 * release schedules off the calibrated clock (`--spring-snappy-duration`) scaled
 * by this fraction, so the stretch peaks during travel and shrinks to fit AT
 * arrival, never before.
 */
export const INDICATOR_RELEASE_AT_ARRIVAL = 0.82;
