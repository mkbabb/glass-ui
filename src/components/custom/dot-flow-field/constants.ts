// BB.W-VIZ-SUITE (W-FLOWFIELD) — the dot-flow-field compile-time shape budget + the
// WARM-IDENTITY default config (the single source the SFC, the composables, and the
// WGSL/GLSL shaders all read).
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_FLOW_CONFIG.palette` is the neutral
// warm-cream library identity (resolved via the ColorResolver). The reference image's
// teal-on-navy reproduction is a DEMO PRESET in `demo/stories/substrates/presets.ts`
// (presets-in-consumers — it reproduces the reference exactly, but NEVER enters a
// library token). `proof:flow-field` clause 5 reds a teal/navy literal in THIS file.

import type { WaveComponent } from "./composables/flowField";
import { buildWaveLadder } from "./composables/flowField";
import type { OklchStop } from "../../../composables/color";

/** Compile-time particle cap — mirrors the WGSL storage-buffer array bound. */
export const MAX_PARTICLES = 16384;

/** Compile-time wave-component cap — mirrors the WGSL `MAX_WAVE_COMPONENTS` #define. */
export const MAX_WAVE_COMPONENTS = 8;

/** Compile-time palette cap — mirrors the WGSL `MAX_FLOW_STOPS` #define. */
export const MAX_FLOW_STOPS = 4;

/** The default advected-dot count (coarse-pointer/mobile clamps lower). */
export const DEFAULT_PARTICLE_COUNT = 4000;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the SFC resolves it into the uniform table.
 */
export interface FlowFieldConfig {
    /** The advected-dot count (500..MAX_PARTICLES). */
    particleCount: number;
    /** The Gerstner sum-of-sines table (1..MAX_WAVE_COMPONENTS). */
    waveComponents: WaveComponent[];
    /** The dominant wave-travel direction in degrees (the field's overall lean). */
    windDirection: number;
    /** The dispersion-driven travel speed (scales ω). */
    windSpeed: number;
    /** The fbm curl-noise braiding term weight over the pure Gerstner field (0..1). */
    curlStrength: number;
    /** The billboard base radius in px @ 1×. */
    dotSize: number;
    /** How much |v| thins the dot (denser-where-calm — the reference's varying size). */
    dotSizeVelocity: number;
    /** The dot-color ramp (the demo themes it teal); resolved via the ColorResolver. */
    palette: OklchStop[];
    /** The ground color (the demo sets dark navy; default transparent). */
    background: OklchStop | "transparent";
    /** Pointer-warp the field (a local velocity perturbation about the cursor). */
    interactive: boolean;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT teal). A two-stop
 * warm-amber ramp over the warm-cream foreground family, resolved via the ColorResolver.
 * A consumer (the demo) themes it teal-on-navy through a PRESET, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // a soft warm cream (the dot core)
    { L: 0.92, C: 0.03, h: 78 },
    // a warm amber (the velocity-tinted edge)
    { L: 0.84, C: 0.07, h: 62 },
];

/** The default 6-octave Phillips wave ladder about a 35° diagonal wind. */
export const DEFAULT_WAVE_COMPONENTS: WaveComponent[] = buildWaveLadder(35, 6);

/** The shipped warm-identity default config. */
export const DEFAULT_FLOW_CONFIG: FlowFieldConfig = {
    particleCount: DEFAULT_PARTICLE_COUNT,
    waveComponents: DEFAULT_WAVE_COMPONENTS,
    windDirection: 35,
    windSpeed: 1.0,
    curlStrength: 0.6,
    dotSize: 2.4,
    dotSizeVelocity: 0.5,
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    interactive: false,
    respectReducedMotion: true,
};
