// BB.W-VIZ-SUITE (W-CONCENTRIC) — the concentric compile-time shape budget + the
// WARM-IDENTITY default config (the single source the SFC, the composables, and the
// WGSL/GLSL shaders all read).
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_CONCENTRIC_CONFIG.palette` is the
// neutral warm-cream library identity (resolved via the ColorResolver). The demo themes
// the rings through a PRESET in `demo/stories/substrates/presets.ts`
// (presets-in-consumers — never a library token). `proof:concentric` clause 5 reds a
// teal/navy/ppmycota-violet literal in THIS file.

import type { RingComponent, RingCenter } from "./composables/ringField";
import { buildRingLadder } from "./composables/ringField";
import type { OklchStop } from "../../../composables/color";

/** Compile-time ring-component cap — mirrors the WGSL `MAX_RINGS` #define. */
export const MAX_RINGS = 8;

/** Compile-time center cap — mirrors the WGSL `MAX_CENTERS` #define. */
export const MAX_CENTERS = 4;

/** Compile-time palette cap — mirrors the WGSL `MAX_RING_STOPS` #define. */
export const MAX_RING_STOPS = 4;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the SFC resolves it into the uniform table.
 */
export interface ConcentricConfig {
    /** The ring origins (1..MAX_CENTERS) — a multi-center sum produces ring interference. */
    centers: RingCenter[];
    /** The radial sum-of-sines table (1..MAX_RINGS). */
    ringComponents: RingComponent[];
    /** The ellipsoidal-norm axis ratio (a, b) — the 3D-tilt depth implication. */
    axisRatio: [number, number];
    /** The ring-travel speed (scales ω). */
    speed: number;
    /** The field-value color ramp (the demo themes it); resolved via the ColorResolver. */
    palette: OklchStop[];
    /** The ground color (default transparent so it reads over the page; demo sets it). */
    background: OklchStop | "transparent";
    /** Pointer adds a transient ring center (a local perturbation about the cursor). */
    interactive: boolean;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT a themed hue). A three-stop
 * warm ramp over the warm-cream foreground family, resolved via the ColorResolver: a soft
 * cream trough, a warm amber mid, a deeper ember crest — so the ring field reads as warm
 * light interference. A consumer (the demo) themes it through a PRESET, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // the trough — a soft warm cream
    { L: 0.94, C: 0.025, h: 80 },
    // the mid — a warm amber
    { L: 0.82, C: 0.075, h: 62 },
    // the crest — a deeper ember
    { L: 0.66, C: 0.105, h: 44 },
];

/** The default 5-octave Phillips radial ring ladder. */
export const DEFAULT_RING_COMPONENTS: RingComponent[] = buildRingLadder(5);

/** Two ring families offset on the diagonal — the default interference (a moiré beat). */
export const DEFAULT_CENTERS: RingCenter[] = [
    { x: -0.22, y: -0.14, weight: 1.0 },
    { x: 0.28, y: 0.2, weight: 0.7 },
];

/** The shipped warm-identity default config. */
export const DEFAULT_CONCENTRIC_CONFIG: ConcentricConfig = {
    centers: DEFAULT_CENTERS,
    ringComponents: DEFAULT_RING_COMPONENTS,
    axisRatio: [1, 0.62],
    speed: 0.5,
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    interactive: false,
    respectReducedMotion: true,
};
