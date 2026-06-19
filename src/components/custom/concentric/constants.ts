// BC.W-VIZ-CONCENTRIC — the concentric compile-time shape budget + the WARM-IDENTITY
// default config (the single source the SFC, the composables, and the WGSL/GLSL shaders all
// read).
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_CONCENTRIC_CONFIG.palette` is the
// neutral warm-cream library identity (resolved via the ColorResolver). The demo themes the
// rings through a PRESET in `demo/stories/substrates/presets.ts` (presets-in-consumers —
// never a library token). `proof:concentric` clause 5 reds a teal/navy/ppmycota-violet
// literal in THIS file.
//
// THE LINE IS THE POINT (BC.W-VIZ-CONCENTRIC). The default config is TWO clean ring families
// at a small beat detune — thin bright ellipsoid LINES that beat into distinct waves (NOT
// the retired 5-octave Phillips turbulence ladder, which read as a smooth color blur).

import type { RingComponent, RingCenter } from "./composables/ringField";
import { buildRingFamily } from "./composables/ringField";
import type { OklchStop } from "../../../composables/color";

/** Compile-time ring-component cap — mirrors the WGSL `MAX_RINGS` #define. */
export const MAX_RINGS = 8;

/** Compile-time center cap — mirrors the WGSL `MAX_CENTERS` #define. */
export const MAX_CENTERS = 4;

/** Compile-time palette cap — mirrors the WGSL `MAX_RING_STOPS` #define. */
export const MAX_RING_STOPS = 4;

/** The render mode — traveling crest-lines, static elevation-contour, or both. */
export type ConcentricRenderMode = "traveling-rings" | "static-contour" | "both";

/** Map a render mode to the shader int (the uniform `ints.w` lane). */
export function renderModeToInt(mode: ConcentricRenderMode): number {
    return mode === "static-contour" ? 1 : mode === "both" ? 2 : 0;
}

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the SFC resolves it into the uniform table.
 */
export interface ConcentricConfig {
    /** The ring origins (1..MAX_CENTERS) — a multi-center sum produces ring interference. */
    centers: RingCenter[];
    /** The clean radial sum-of-sines table (1..2 frequencies — NOT a turbulence ladder). */
    ringComponents: RingComponent[];
    /** The ellipsoidal-norm axis ratio (a, b) — the tilted-disc depth implication. */
    axisRatio: [number, number];
    /** The ring-travel speed (scales ω). */
    speed: number;
    /** The stroke half-width (field-distance units; the IQ line thickness). */
    lineWidth: number;
    /** The stroke AA softness (field-distance units; the edge feather). */
    lineSoftness: number;
    /** The render mode — traveling crest-lines · static elevation-contour · both. */
    renderMode: ConcentricRenderMode;
    /** The contour-level count for the static-contour mode (4..24). */
    contourLevels: number;
    /** The beat detune — the second ring's wavelength offset that makes the families BEAT. */
    beatDetune: number;
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
 * cream trough, a warm amber mid, a deeper ember crest — so the ring LINES read as warm
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

/**
 * Build the default clean beating ring table — one base ring + a slightly-detuned twin so
 * the field BEATS into a low-frequency moiré envelope (the "distinct waves"). NOT the
 * retired 5-octave Phillips turbulence ladder.
 */
export function buildDefaultRingComponents(
    baseWavelength = 0.24,
    beatDetune = 0.04,
): RingComponent[] {
    const a = buildRingFamily(baseWavelength, 1, 0)[0];
    const b = buildRingFamily(baseWavelength * (1 + beatDetune), 1, 1.7)[0];
    return [a, b];
}

/** The default clean beating ring table (2 detuned low-frequency rings). */
export const DEFAULT_RING_COMPONENTS: RingComponent[] = buildDefaultRingComponents();

/**
 * Two ring FAMILIES offset on the diagonal at different tilts — the default interference: a
 * moiré BEAT where the two tilted-ellipsoid families cross (the literal "ellipsoid lines
 * forming distinct waves").
 */
export const DEFAULT_CENTERS: RingCenter[] = [
    { x: -0.28, y: -0.18, weight: 1.0, rotAlpha: 0.35 },
    { x: 0.3, y: 0.22, weight: 0.85, rotAlpha: -0.55 },
];

/** The shipped warm-identity default config — thin bright LINES that beat into waves. */
export const DEFAULT_CONCENTRIC_CONFIG: ConcentricConfig = {
    centers: DEFAULT_CENTERS,
    ringComponents: DEFAULT_RING_COMPONENTS,
    axisRatio: [1, 0.62],
    speed: 0.5,
    lineWidth: 1.4,
    lineSoftness: 1.0,
    renderMode: "traveling-rings",
    contourLevels: 12,
    beatDetune: 0.04,
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    interactive: false,
    respectReducedMotion: true,
};
