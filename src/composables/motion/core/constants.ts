/**
 * Shared damping factors for live numeric motion.
 *
 * These values are the app-level tuning glass-ui owns for the generic motion
 * contract.
 */
export const DAMPING = {
    canvasNeedle: 0.08,
    domHero: 0.12,
    domPill: 0.14,
    domProgress: 0.18,
} as const;

/** Shared absolute snap thresholds for live numeric motion. */
export const SNAP_THRESHOLD = {
    canvas: 0.002,
    dom: 0.05,
    domProgress: 0.5,
} as const;

/**
 * One frame at 60fps, in milliseconds. The display's own beat, which is why it is
 * shared rather than derived twice: an integrator's first-frame `dt` (before there is
 * a previous timestamp to difference) and a "this outlives that by N frames" floor are
 * the same number for the same reason. Anything that means "one frame" reads this.
 */
export const FRAME_MS = 1000 / 60;
