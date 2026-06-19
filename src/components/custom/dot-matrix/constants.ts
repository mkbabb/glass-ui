// BC.W-VIZ-DOTMATRIX — the dot-matrix compile-time shape budget + the WARM-IDENTITY
// default config (the single source the SFC, the composables, and the WGSL/GLSL shaders
// all read).
//
// THE VIZ (BC.W-VIZ-DOTMATRIX). A globe of N fine dots laid on a sphere SURFACE via the
// Fibonacci phyllotaxis spiral (the Claude co-work "fine-dot spheres on dark" reference —
// USER-DEFECTS §E). Depth-shaded so the globe reads as a translucent dot-SHELL, slowly
// rotating on a tilted axis, pointer-aware. The math is the §T1 area-centered golden-angle
// lattice; the render is instanced billboard quads + the crisp `fwidth` SDF fragment.
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_DOT_MATRIX_CONFIG.palette` is the
// neutral warm-cream library identity (mirrors the dot-flow `WARM_IDENTITY_PALETTE`
// `{ L:0.92, C:0.03, h:78 }` — NO teal/navy literal). The mono-warm-white-on-near-black
// reference reproduction + the two-globe composition are DEMO PRESETS in
// `demo/stories/substrates/presets.ts` (presets-in-consumers). `proof:dot-matrix` clause 5
// reds a teal/navy literal here AND asserts the default palette is WARM_IDENTITY_PALETTE.
// The teal-on-navy is GONE entirely (clean break, no alias — BC.W-TEAL-NAVY-PURGE).

import type { OklchStop } from "../../../composables/color";

/** Compile-time dot cap — mirrors the WGSL/GLSL instance-buffer array bound. */
export const MAX_DOTS = 4000;

/** Compile-time palette cap — mirrors the WGSL `MAX_DOT_STOPS` #define. */
export const MAX_DOT_STOPS = 4;

/** Pointer interaction mode — a repel pushes dots off the surface, attract pulls them in. */
export type DotPointerMode = "repel" | "attract";

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the composable resolves it into the uniform table.
 * A NEW schema (no prior `dot-matrix`, no MIGRATION row).
 */
export interface DotMatrixConfig {
    /** Dot count on the sphere surface (500–MAX_DOTS; the reference's fine field). */
    dotCount: number;
    /** Sphere radius as a fraction of the view min-dimension (0.2–0.9). */
    radius: number;
    /** Base dot billboard radius in px @ 1× (DPR-aware → crisp). */
    dotSize: number;
    /** The subtle resting opacity (0–1). */
    baseOpacity: number;
    /** Depth-fade strength (0–1; high = strong translucent-shell read). */
    depthFade: number;
    /** The slow dignified Y-spin in rad/s (0–0.3). */
    rotationSpeed: number;
    /** The rotation-axis tilt in degrees (a tilted globe reads more alive; ~23°). */
    axisTilt: number;
    /** The globe count (1 default; the reference two-globe composition is 2). */
    spheres: 1 | 2;
    /** The sub-perceptual breathing radius-pulse depth (0 default; demo 0.02). */
    breathing: number;
    /** The dot-color ramp (the demo themes it mono-white); resolved via the ColorResolver. */
    palette: OklchStop[];
    /** The ground color (the demo sets near-black; default transparent). */
    background: OklchStop | "transparent";
    /** Pointer parallax + repel + accel-burst (the §T7 interaction). */
    interactive: boolean;
    /** repel ↔ attract (the dimple direction). */
    pointerMode: DotPointerMode;
    /** The pointer-parallax depth (0–0.3; the screen-center tracks the cursor). */
    parallax: number;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT teal). A two-stop warm-amber
 * ramp over the warm-cream foreground family, mirroring the dot-flow `WARM_IDENTITY_PALETTE`.
 * A consumer (the demo) themes it mono-warm-white-on-near-black through a PRESET, never a
 * token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // a soft warm cream (the lit near-hemisphere dot core)
    { L: 0.92, C: 0.03, h: 78 },
    // a warm amber (the rim/far-side fade edge)
    { L: 0.84, C: 0.07, h: 62 },
];

/**
 * The shipped warm-identity default config — the §T5 SUBTLE + CALM register: ONE calm
 * warm-cream globe of fine dots on a transparent ground (the glass card shows through),
 * slowly rotating on a tilted axis. The depth-fade carries the sphere read; the second
 * sphere + the breathing + the near-black ground are DEMO presets (presets-in-consumers).
 */
export const DEFAULT_DOT_MATRIX_CONFIG: DotMatrixConfig = {
    dotCount: 2400, // the reference's fine field
    radius: 0.42, // the globe size in the card
    dotSize: 1.8, // crisp base billboard radius @1×
    baseOpacity: 0.5, // subtle resting opacity
    depthFade: 0.85, // strong shell read
    rotationSpeed: 0.07, // the slow dignified Y-spin
    axisTilt: 23, // a tilted globe reads more alive
    spheres: 1, // ONE globe (the reference two-globe is a demo preset)
    breathing: 0.0, // sub-perceptual pulse OFF by default
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    interactive: false,
    pointerMode: "repel",
    parallax: 0.08, // pointer-parallax depth
    respectReducedMotion: true,
};
