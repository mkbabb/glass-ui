/**
 * Module-scope constant colocated with the FadingScroll family. Promoted out of
 * `composables/useFadingScroll.ts` verbatim.
 */

/**
 * Tolerance (CSS px) absorbing scroll-snap jitter — `snap-mandatory` parks the
 * active card a few px off the true start, so the start edge reads as sharp until
 * the user genuinely scrolls past the first child. Promoted verbatim from the
 * bespoke `PresetPickerRow` SNAP_TOLERANCE.
 */
export const SNAP_TOLERANCE = 12;
