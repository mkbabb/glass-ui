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
