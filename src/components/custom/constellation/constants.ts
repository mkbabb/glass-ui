// AY.W-COLOCATE — the Constellation feature-dir constants home. The package-level
// CONFIG-DEFAULT constants (the reference geometry, the neutral palette, the warp
// spring + gravity-well + wander cadence DEFAULTS the `--constellation-*` tokens
// override) live HERE (the feature-dir `constants.ts` convention) rather than at the
// top of each carved feature module. The algorithm-LOCAL physics tuning (the well
// cool/ramp rates + their interlocking derivations, the dt-clamp, the settle band)
// stays INTERNAL to `constellationInteraction.ts` — it travels with the algorithm,
// not the package config surface.

import type { ConstellationPalette, ConstellationWellConfig } from "./constellationField";

/**
 * The reference layout width (px) the field's node geometry is authored against. A
 * live canvas's `k = width / BASE_WIDTH` scales every base-width length (the well
 * reach/speed, the node spacing) so a 600px and a 1280px canvas read the same shape.
 */
export const BASE_WIDTH = 1280;

/**
 * The neutral palette FALLBACK the draw passes read when the `--constellation-*`
 * color/alpha tokens are absent (SSR / no-token mount). The fallbacks mirror the §5c
 * light-arm token defaults so a no-token mount still reads recessive-but-legible.
 *
 * `accent`/`edgeFloor`/`edgeAccentAlpha` (AZ.W-CON-GEN G3) are the ACCENT-edge skin
 * weights the optional `drawEdges(…, accentIndex)` pass reads — the flagged-node EDGE
 * tint. `accent` mirrors the `--constellation-accent` neutral library default;
 * `edgeFloor: 0` is the byte-identity (no floor by default — a consumer lifts it so a
 * distance-faded hairline clears the perceptual floor on a bright ground);
 * `edgeAccentAlpha: 0.30` is the accent-incident edge multiplier.
 */
export const DEFAULT_PALETTE: ConstellationPalette = {
    node: "#b4afa3",
    nodeDim: "#cdc8bd",
    line: "#1c1714",
    edgeAlpha: 0.22,
    edgeFocusAlpha: 0.34,
    alpha: 0.8,
    accent: "#b35030", // mirrors the --constellation-accent neutral light default
    edgeFloor: 0, // no floor by default → byte-identical drawEdges
    edgeAccentAlpha: 0.3, // the accent-incident edge multiplier
};

/**
 * Warp spring DEFAULTS — `--constellation-warp-*` tokens override these on mount.
 * `WARP_RESPONSE` is the keyframes.js angular PERIOD (s, NOT a settle-duration);
 * `WARP_ZETA = 1.0` is critically damped so a focal mark never rings/overshoots.
 */
export const WARP_RESPONSE = 0.55;
export const WARP_ZETA = 1.0;

/**
 * Gravity-well tuning DEFAULTS (AY.W-CON2). The `--constellation-well-*` tokens
 * override these on mount via `field.well.cfg`; these stay the fallback. SET by the
 * §6 egg-live π readback (the field-perturbs-then-cools capture is the binding
 * truth) — a moderate gain over a generous reach, a brisk ramp, a tight no-slingshot
 * speed cap, and the singularity-soften floor.
 */
export const DEFAULT_WELL_CONFIG: ConstellationWellConfig = {
    gain: 14000, // inverse-square force scale — a clear pull over the reach
    reach: 340, // base-width px — the well's influence radius (k-scaled at step)
    ramp: 4.0, // 1/s — the ARM rate (≈0.25s bloom; release is the fixed brisk WELL_RELEASE_RAMP, F8.2)
    maxSpeed: 4.0, // base-width px/frame cap — the no-slingshot clamp
    soften: 8, // px — the singularity floor (a node AT the cursor → bounded pull)
    holdMs: 140, // ms hold before the well arms
};

/**
 * Auto-DRIFT cadence DEFAULTS (AY.W-CON1 source; tokenised in AY.W-CON2). The
 * `--constellation-wander-idle`/`-wander-jitter` tokens override these on mount; a
 * prop `{ minIdle, jitter }` still wins over the token. The 8s/8s default rhythm
 * re-targets the focal mark every 8–16s (the slides cadence).
 */
export const DEFAULT_WANDER_IDLE = 8000; // ms — min idle between auto re-targets
export const DEFAULT_WANDER_JITTER = 8000; // ms — random extra idle per cadence

/**
 * Autonomous PINNED-ANCHOR drift cadence DEFAULTS (AZ.W-CON-GEN G5). DISTINCT from
 * `wander` (which re-targets the WARP spring among random nodes): this gently eases
 * the PINNED node (`field.pinnedIndex`) around its seeded ANCHOR on a jittered
 * cadence — the flagged point breathes its neighborhood without leaving it. The
 * `--constellation-pinned-drift-*` tokens override these on mount; a prop still wins.
 * `wanderFrac` (±0.14 of the canvas) keeps the pinned node clear of the hero type
 * even as it drifts; `durMs` is the per-leg easeInOutQuad duration; the idle/jitter
 * is the rest between legs (a long, calm rhythm, NOT a metronome).
 */
export const DEFAULT_PINNED_DRIFT_FRAC = 0.14; // ± fraction of the canvas around the anchor
export const DEFAULT_PINNED_DRIFT_DUR = 2600; // ms — per-leg easeInOutQuad duration
export const DEFAULT_PINNED_DRIFT_IDLE = 6000; // ms — min rest between legs
export const DEFAULT_PINNED_DRIFT_JITTER = 8000; // ms — random extra rest per leg

/** R5-8 — the shipped visual-size floor: `kVisOf` === `k` for every canvas
 *  ≥ ~0.72·BASE_WIDTH ≈ 922px (incl. the 1280 export frame — byte-identical
 *  there by construction); below it the marks stop crushing sub-pixel. */
export const DEFAULT_K_FLOOR = 0.72;
