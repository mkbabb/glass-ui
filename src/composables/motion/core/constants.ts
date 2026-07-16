/**
 * Shared damping factors for live numeric motion.
 *
 * These values preserve the app-level tuning that used to live in
 * speedtest's local animation utility while making glass-ui the owner of the
 * generic motion contract.
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
