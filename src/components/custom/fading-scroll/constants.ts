import { supportsScrollTimeline } from "../../../composables/motion/supportsCssTimeline";

/**
 * The module-scope constants for the FadingScroll family — the colocation home
 * (`proof:colocation`) the dir owes once it carries a complex composable. Both
 * were promoted out of `composables/useFadingScroll.ts` verbatim.
 */

/**
 * True when the engine genuinely supports a `scroll()` timeline — the CSS recipe
 * in `utilities/base.css` then owns the visual axis on the compositor and the
 * `useFadingScroll` composable becomes the inert (non-attaching) path. Module-level
 * so the feature gate is computed once. (Mirrors `useScrollProgress`'s twin.)
 */
export const NATIVE_SCROLL_TIMELINE = supportsScrollTimeline();

/**
 * Tolerance (CSS px) absorbing scroll-snap jitter — `snap-mandatory` parks the
 * active card a few px off the true start, so the start edge reads as sharp until
 * the user genuinely scrolls past the first child. Promoted verbatim from the
 * bespoke `PresetPickerRow` SNAP_TOLERANCE.
 */
export const SNAP_TOLERANCE = 12;
