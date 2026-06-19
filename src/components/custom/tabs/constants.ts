// AY.W-COLOCATE — the SegmentedTabs feature-dir constants home. The elastic-
// indicator travel-squish magic numbers live HERE (the feature-dir `constants.ts`
// convention) rather than inline in `composables/useTabIndicator.ts`.

/**
 * Fallback for `--tab-indicator-max-stretch` when the cascade leaves it unset — the
 * default ≈+15% travel-squish cap. `--stretch = 1 + frac · (cap − 1)`, so a
 * full-width jump reaches the cap and a tiny hop stays near 1. The token is the
 * authority; this is the no-token floor.
 *
 * BC.W-LIQUID-TAB — lifted 1.08 → 1.15 so a FAST liquid-tab pull visibly swells the
 * pill (the gel-squish READS as liquid, glass-dock-codebase.md §3.4) — still capped
 * LOW (≤1.2, the anti-taffy-pull bar). The cap is shared by the click travel-squish
 * AND the drag pull-morph (the SOLE cap source — the constant + the token in
 * lockstep, never a fork); the volume-preserving reciprocal pairing
 * (`scale: var(--stretch) calc(1/var(--stretch))`) is unchanged — only the magnitude
 * lifts.
 */
export const DEFAULT_INDICATOR_MAX_STRETCH = 1.15;

/**
 * The travel-progress fraction at which the squish RELEASES — the Material
 * "grow then shrink" close, keyed to ARRIVAL (BA.W-TABS). The squish opens with
 * the glide and releases when the indicator is within this fraction of its target
 * (release-at-arrival), retiring the fixed mid-glide `INDICATOR_RELEASE_MS` timer
 * (which fired at 60ms — BEFORE the ~100ms 90%-travel point, mid-glide). The
 * release schedules off the calibrated clock (`--spring-snappy-duration`) scaled
 * by this fraction, so the stretch peaks during travel and shrinks to fit AT
 * arrival, never before.
 *
 * BC.W-UNDERLINE-TUNE — VERIFIED against the eased `snappy` (response 0.42 / ζ 0.78,
 * the BC.W-SPRING-EASE re-derive). On that curve the position arrives (≥99% travel)
 * at ~74% of the `--spring-snappy-duration` clock and the 90%-travel point lands at
 * ~57% (mid-clock — the front-load gone). 0.82 releases the squish at ~279ms (= 0.82
 * × 340ms), i.e. AT arrival (just past the ~74% arrival), so the stretch peaks DURING
 * travel and shrinks to fit AT arrival — never before (0.82 ≥ the 0.74 arrival point).
 * The position + squish now read ONE matched window: the desync (HEAD position-at-16%
 * vs squish-at-82%) collapsed because the eased curve actually travels across the clock.
 * KEPT at 0.82 — the eased arrival sits inside the release fraction; no nudge needed.
 */
export const INDICATOR_RELEASE_AT_ARRIVAL = 0.82;
