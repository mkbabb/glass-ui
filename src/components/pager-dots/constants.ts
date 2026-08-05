// PagerDots geometry constants. The lead/trail worm reads all numeric defaults here.

/** Fallback pip diameter (px) when `--pager-dot-size` cannot be read (the worm body D). */
export const DEFAULT_DOT_PX = 13;
/** Fallback root font-size (px) when resolving a rem `--pager-dot-size`. */
export const DEFAULT_ROOT_PX = 16;
/** Fallback `--pager-dot-size` in rem (0.8125rem = 13px base pip). */
export const DEFAULT_DOT_REM = 0.8125;
/** Fallback max worm elongation (px) when `--pager-dot-elongated` cannot be read —
 *  the clamp on the lead↔trail gap so a multi-hop worm travels bounded, never taffy. */
export const DEFAULT_ELONGATED_PX = 36;
/** Fallback max-stretch cap (`--pager-worm-max-stretch`) for the 1.08–1.2 band. */
export const DEFAULT_MAX_STRETCH = 1.2;
/** The metaball NECK girth (the dumbbell-shoulder bridge height between the two
 *  pip-bodies, ~0.7·D) — a tighter, gooier waist than the wider carousel. */
export const PAGER_NECK_GIRTH = 0.7;

/* ── The worm's per-primitive spring register ────────────────────────────────
   A NAMED, documented per-primitive default (JS-only, no `--spring-*` token) —
   the seam `springPresets.ts` sanctions for a primitive whose feel is its own,
   NOT a second register table. The lead is a hand-rolled damped spring, so the
   pair is stated here rather than anonymously inside the integrator. Whether the
   lead re-points to the table's coordinated-travel row is a question for the
   pager's own design cut, decided at a paired capture — never blind. */

/** The worm lead's spring response (2π/response = the natural frequency). */
export const WORM_LEAD_RESPONSE = 0.68;
/** The worm lead's damping ratio ζ. */
export const WORM_LEAD_DAMPING = 0.64;
/** The trailing follower's time constant in seconds — the LAG that mints the elongation. */
export const WORM_TRAIL_TAU_S = 0.27;
