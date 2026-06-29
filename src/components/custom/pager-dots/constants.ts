// PagerDots — the colocated named-constant home (BH.B2.4a — the colocation drain).
// The worm geometry's magic numbers live here, NOT scattered through the composable.

/** The golden ratio — D = restSize/φ lands the body diameter back on the painted pip. */
export const PHI = 1.618033988749895;
/** Fallback pip diameter (px) when `--pager-dot-size` cannot be read. */
export const DEFAULT_DOT_PX = 13;
/** Fallback root font-size (px) when resolving a rem `--pager-dot-size`. */
export const DEFAULT_ROOT_PX = 16;
/** Fallback `--pager-dot-size` in rem (0.8125rem = 13px base pip). */
export const DEFAULT_DOT_REM = 0.8125;
/** The pager barbell neck-gap param — how near the two pip-bodies draw at mid (a tighter,
 *  gooier waist than the wider carousel; a small dot worm reads decisive at a tight gap). */
export const PAGER_NECK_GAP = 0.7;
/** Fallback worm duration (s) when `--pager-worm-duration` cannot be read. */
export const DEFAULT_WORM_DURATION_S = 1.8;
/** Travel-settle guard pad (ms) past the worm duration before clearing the traveling flag. */
export const TRAVEL_SETTLE_PAD_MS = 120;
