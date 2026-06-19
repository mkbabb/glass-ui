// BC.W-VIZ-DOTFLOW — the dot-flow-field compile-time shape budget + the WARM-IDENTITY
// default config (the single source the SFC, the composables, and the WGSL/GLSL shaders
// all read).
//
// THE RETOPOLOGY (BC.W-VIZ-DOTFLOW). The field is no longer a free-advecting particle
// cloud (the "mess of noise" the user condemned) — it is a CALM ANCHORED DOT-MATRIX a slow
// LARGE wave sweeps through. The count axis (`particleCount`) is gone (a clean break — the
// lattice density is DETERMINISTIC off `gridPitch`); the regime knobs (octaves/λ₀/curl/
// windSpeed) are inverted to the LOW-frequency coherent band (research/viz/dot-flow-field.md
// §1, §2). The free-advection-only fields (`windDirection`/`dotSizeVelocity`) are dropped.
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_FLOW_CONFIG.palette` is the neutral
// warm-cream library identity (resolved via the ColorResolver). The mono-dim-on-near-black
// reference reproduction is a DEMO PRESET in `demo/stories/substrates/presets.ts`
// (presets-in-consumers — it reproduces the Claude co-work reference exactly, but NEVER
// enters a library token). `proof:viz-dotflow` clause F5 reds a teal/navy literal here AND
// asserts the default palette is WARM_IDENTITY_PALETTE. The teal-on-navy is GONE entirely
// (clean break, no alias — BC.W-TEAL-NAVY-PURGE).

import type { WaveComponent } from "./composables/flowField";
import { buildWaveLadder } from "./composables/flowField";
import type { OklchStop } from "../../../composables/color";

/** Compile-time lattice cap — mirrors the WGSL storage-buffer array bound. */
export const MAX_PARTICLES = 16384;

/** Compile-time wave-component cap — mirrors the WGSL `MAX_WAVE_COMPONENTS` #define. */
export const MAX_WAVE_COMPONENTS = 8;

/** Compile-time palette cap — mirrors the WGSL `MAX_FLOW_STOPS` #define. */
export const MAX_FLOW_STOPS = 4;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the SFC resolves it into the uniform table.
 *
 * RETOPOLOGY: the lattice density is derived from `gridPitch` (a clean break from the free
 * `particleCount` — README MIGRATION row `particleCount → gridPitch`). The brightness/scale
 * shape rides `contrast`/`waveBandCenter`/`waveBandWidth`; the sub-cell drift rides
 * `displaceAmp`/`springK`; `coherence` maps the octave count + persistence.
 */
export interface FlowFieldConfig {
    /** The Gerstner sum-of-sines table (1..MAX_WAVE_COMPONENTS) — the LARGE-wave ladder. */
    waveComponents: WaveComponent[];
    /** The dispersion-driven sweep speed (scales ω). LOW = slow sweep (default 0.3). */
    windSpeed: number;
    /** The fbm curl-noise braiding-break weight (0..0.4 — keep low; default 0.12). */
    curlStrength: number;
    /** The lattice spacing in CSS-px (drives N = view/pitch²). ~26px ≈ the reference. */
    gridPitch: number;
    /** The dot billboard base radius in px @ 1×. */
    dotSize: number;
    /** How far a dot drifts from its anchor, in pitch fractions (capped < 0.5 pitch). */
    displaceAmp: number;
    /** The restoring-spring rate (the pull-to-anchor stiffness; higher = stiffer). */
    springK: number;
    /** The sweeping-band center over the normalized height (the iso-band the wave rides). */
    waveBandCenter: number;
    /** The sweeping bright-stripe thickness (`waveBand` width over the normalized height). */
    waveBandWidth: number;
    /** The brightness modulation depth (subtle ↔ bold; 0..1). */
    contrast: number;
    /** The Coherence axis (0..1; high = few coarse octaves coherent, low = many fine). */
    coherence: number;
    /** The soft-disc globe mask (the reference's two-sphere composition); off by default. */
    globeMask: boolean;
    /** The dot-color ramp (the demo themes it mono-white); resolved via the ColorResolver. */
    palette: OklchStop[];
    /** The ground color (the demo sets near-black; default transparent). */
    background: OklchStop | "transparent";
    /** Pointer-warp the lattice (a local displacement ripple about the cursor). */
    interactive: boolean;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT teal). A two-stop warm-amber
 * ramp over the warm-cream foreground family, resolved via the ColorResolver. A consumer
 * (the demo) themes it mono-white-on-near-black through a PRESET, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // a soft warm cream (the dot core, lit by the sweeping band)
    { L: 0.92, C: 0.03, h: 78 },
    // a warm amber (the band-crest edge)
    { L: 0.84, C: 0.07, h: 62 },
];

/**
 * The default LARGE-wave ladder about a 35° diagonal wind — 3 coherent octaves, λ₀ at
 * 2.5× the domain extent (ONE dominant sweeping wave). The §1 regime inversion.
 */
export const DEFAULT_WAVE_COMPONENTS: WaveComponent[] = buildWaveLadder(35, 3, 2.5);

/**
 * The shipped warm-identity default config — the SUBTLE + LARGE regime (the §1/§2
 * topology+regime targets): a calm warm-cream lattice (~26px pitch) a slow LARGE wave
 * sweeps through, the dots only breathing a hair off their anchors. globeMask OFF (the
 * neutral register — the reference's soft-disc is a DEMO preset).
 */
export const DEFAULT_FLOW_CONFIG: FlowFieldConfig = {
    waveComponents: DEFAULT_WAVE_COMPONENTS,
    windSpeed: 0.3, // slow sweep
    curlStrength: 0.12, // a hint of organic break
    gridPitch: 26, // ≈ the reference pitch
    dotSize: 2.0, // base billboard radius
    displaceAmp: 0.18, // sub-cell drift (capped < 0.5 pitch)
    springK: 6.0, // the pull-to-anchor stiffness
    waveBandCenter: 0.0, // the iso-band rides the height zero-crossing ridge
    waveBandWidth: 0.55, // a WIDE sweeping bright-stripe
    contrast: 0.6, // brightness modulation depth
    coherence: 0.8, // few coarse octaves (coherent)
    globeMask: false, // warm-cream default — the disc is the reference DEMO preset
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    interactive: false,
    respectReducedMotion: true,
};
