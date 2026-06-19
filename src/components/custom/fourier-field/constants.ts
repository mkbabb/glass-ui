// FourierField module constants (BC.W-VIZ-FOURIER — the WGSL-primary migration off
// Canvas2D onto the GPU substrate, the §E "WebGPU everywhere" mandate). The single
// source the SFC, the composables, and the WGSL/GLSL shaders all read.
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_FOURIER_CONFIG.palette` is the
// neutral warm-cream library identity (the `--viz-fourier` warm-amber family, resolved
// via the ColorResolver). A demo-local Teal / cool preset lives in
// `demo/stories/substrates/presets.ts` (presets-in-consumers — it never enters a
// library token). `proof:fourier-field` clause U5 reds a teal `oklch(... 195)` literal
// in THIS file or the merged demo view's defaults.

import type { OklchStop } from "../../../composables/color";

/**
 * Curve-sampling resolution for the stable view-fit bbox pass — the renderer samples the
 * epicycle curve this many times once at mount to size it to the canvas with a fixed
 * margin (so the curve never clips and the scale is constant across the run). 720 = one
 * sample per half-degree of the unit period.
 */
export const FOURIER_FIT_SAMPLES = 720;

/**
 * The phasor-table uniform ceiling — the WGSL `MAX_PHASORS` #define. The configurator's
 * harmonic count maxes here; a >64-term custom trace books a storage-buffer widen (cheap —
 * the flow-field already uses a storage buffer). The curated ℱ/heart/star set + the
 * generated elliptic spectrum all sit under it.
 */
export const MAX_PHASORS = 64;

/**
 * The comet-curve sample ceiling — the storage-buffer array bound. The compute pass
 * writes the partial-sum curve point at `M` samples back along the period from the head;
 * the render pass reads them as the comet polyline. 384 gives a smooth bold stroke.
 */
export const MAX_CURVE_SAMPLES = 384;

/** The palette-stop ceiling — the WGSL `MAX_FOURIER_STOPS` #define. */
export const MAX_FOURIER_STOPS = 4;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the composable resolves it into the uniform table.
 */
export interface FourierFieldConfig {
    /** The active phasor spectrum source key — `"elliptic"` (generated) or a curated shape key. */
    source: string;
    /** TRUNCATE the partial sum — the harmonic count N (1..min(spectrum.length, MAX_PHASORS)). */
    harmonics: number;
    /** Draw the rotating epicycle chain (orthogonal to N). */
    showEpicycles: boolean;
    /** How many chain arms to draw (1..N; ≤ the harmonic count). */
    epicycleArms: number;
    /** Paint the chain as a warm-anchored hue sweep vs one analogous hue. */
    rainbowChain: boolean;
    /** Comet-body length as a fraction of the period (0.15..1.0). */
    trailArc: number;
    /** Comet stroke weight in CSS px (1..6). */
    trailWidth: number;
    /** Outer loudness envelope (per-layer alpha multiply, 0..2). */
    intensity: number;
    /** Character of the generated elliptic spectrum (0.05..0.4 — smooth ellipse → crinkled). */
    harmonicScale: number;
    /** Clock speed multiplier (0.25/0.5/1/2). */
    speed: number;
    /** The curve-color ramp (the library viz palette; warm default). Resolved via the ColorResolver. */
    palette: OklchStop[];
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
    /** Pointer scrubs `head_t` + a flick injects clock momentum (the W-VIZ-INTERACTION consume). */
    interactive: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT teal). A two-stop warm-amber
 * ramp over the warm-cream foreground family, resolved via the ColorResolver. The chain's
 * rainbow sweep is warm-anchored over THIS base; a consumer (the demo) themes it through a
 * preset, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // a warm amber comet core (the --viz-fourier family)
    { L: 0.62, C: 0.19, h: 34 },
    // a soft warm cream at the trail tail
    { L: 0.86, C: 0.06, h: 70 },
];

/** The shipped warm-identity default config. */
export const DEFAULT_FOURIER_CONFIG: FourierFieldConfig = {
    source: "elliptic",
    harmonics: 6,
    showEpicycles: true,
    epicycleArms: 6,
    rainbowChain: true,
    trailArc: 0.43,
    trailWidth: 3,
    intensity: 1,
    harmonicScale: 0.24,
    speed: 1,
    palette: WARM_IDENTITY_PALETTE,
    respectReducedMotion: true,
    interactive: true,
};
