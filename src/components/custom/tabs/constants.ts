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
 * ms after the stretch opens before it releases back to fit (`--stretch → 1`) — the
 * Material "grow then shrink" close. Rides the same snappy glide clock as the travel.
 */
export const INDICATOR_RELEASE_MS = 60;
