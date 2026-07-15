// PagerDots — the colocated named-constant home (BH.B2.4a colocation drain;
// BI.W-PAGER-WORM re-based onto the two-edge lead/trail worm). The worm geometry's
// magic numbers live here, NOT scattered through the composable.

/** Fallback pip diameter (px) when `--pager-dot-size` cannot be read (the worm body D). */
export const DEFAULT_DOT_PX = 13;
/** Fallback root font-size (px) when resolving a rem `--pager-dot-size`. */
export const DEFAULT_ROOT_PX = 16;
/** Fallback `--pager-dot-size` in rem (0.8125rem = 13px base pip). */
export const DEFAULT_DOT_REM = 0.8125;
/** Fallback max worm elongation (px) when `--pager-dot-elongated` cannot be read —
 *  the clamp on the lead↔trail gap so a multi-hop worm travels bounded, never taffy. */
export const DEFAULT_ELONGATED_PX = 36;
/** Fallback max-stretch cap (`--pager-worm-max-stretch`) — the LOW velocity-swell
 *  band (BI.W-PAGER-WORM R10; 1.08–1.2), the 1.45 taffy value retired. */
export const DEFAULT_MAX_STRETCH = 1.2;
/** The metaball NECK girth (the dumbbell-shoulder bridge height between the two
 *  pip-bodies, ~0.7·D) — a tighter, gooier waist than the wider carousel. */
export const PAGER_NECK_GIRTH = 0.7;
