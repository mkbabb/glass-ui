// BD.W-CONCENTRIC-RELIEF — the concentric compile-time shape budget + the WARM-DIVERGENT
// hypsometric identity (the single source the SFC, the composables, and the WGSL/GLSL
// shaders all read).
//
// concentric is a living LEVEL-SET hypsometric survey: the iso-contours of a curl-warped
// low-octave topography H(p,t), painted as an OPAQUE warm hypsometric FILL, lifted into
// 2.5-D relief by one analytic hillshade, inked with a two-tier index/minor contour
// hierarchy, the cursor HEAVING the sheet with real weight. NOT lines-over-transparent.
//
// THE WARM-DIVERGENT FENCE (load-bearing). `WARM_IDENTITY_PALETTE` is a true multi-warm
// hypsometric tint (deep plum-rose basin → ember → amber → wheat crest) — hues wrapping
// through red, NEVER teal/navy [180,270], and NEVER a single-bin amber wash. The dark arm
// (`WARM_IDENTITY_PALETTE_DARK`) is a luminous-ember twin. The demo themes the survey
// through a PRESET (presets-in-consumers — never a library token). `proof:concentric`
// clause L5 reds any hue ∈ [180,270] OR a single-bin amber collapse in THIS file.

import type { OklchStop } from "../../../composables/color";

/** Compile-time palette cap — mirrors the WGSL `MAX_RING_STOPS` #define. */
export const MAX_RING_STOPS = 4;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable the demo configurator drives; the SFC resolves it into the uniform table.
 */
export interface ConcentricConfig {
    /** The level-set flow speed (scales the traveling-wave time). */
    speed: number;
    /** The contour stroke half-width (px units; the IQ line thickness). */
    lineWidth: number;
    /** The stroke AA softness (px units; the edge feather). */
    lineSoftness: number;
    /** The contour-level count (the iso-line density; 4..24). */
    contourLevels: number;
    /** The topography cell pitch (domain units per cell — the contour-warp granularity). */
    cellSize: number;
    /** The height-field octaves (LOW → clean nested loops). */
    heightOctaves: number;
    /** The height-field seed (a different topography per seed). */
    heightSeed: number;
    /** The ω=√(g·k) breathing swell depth — basins inflate/deflate (weight). */
    swellAmp: number;
    /** Per-contour wobble depth — the contours wobble independently as the wave flows. */
    perturbAmp: number;
    /** Max per-cell twist angle at the wave crest (rad — the cell-warp the contours ride). */
    twistMax: number;
    /** Max per-cell shear at the crest. */
    shearMax: number;
    /** The traveling-wave front direction (a gentle diagonal). */
    waveDir: [number, number];
    /** The crest-band spatial frequency (LOW — cells per crest). */
    waveK: number;
    /** The front speed (slow — inertia). */
    waveOmega: number;
    /** The crest-band width (a localized front). */
    waveSigma: number;
    /** The cursor Gaussian peak depth — the topography HEAVES toward the pointer. */
    cursorWell: number;
    /** The hypsometric tone gain — `tone = 0.5 + 0.5·tanh(H·toneGain)` (fills the ramp ends). */
    toneGain: number;
    /** The analytic-hillshade relief depth (`fill *= mix(1-shadeAmp, 1+shadeAmp, shade)`). */
    shadeAmp: number;
    /** The fixed cartoon-sun direction (the raking cel light dotted with ∇H). */
    lightDir: [number, number];
    /** Index-contour stride — every Nth level is a bold index line (two-tier hierarchy). */
    indexEvery: number;
    /** The index-line width multiplier (index ~indexMul× the minor half-width). */
    indexMul: number;
    /** The ink darken factor — the contour is a darker ember of its OWN local fill band. */
    inkDarken: number;
    /** Cursor-HEAVE gain — pointer SPEED scales the well depth/radius (JS-side; free). */
    velocityHeave: number;
    /** The field-value color ramp (the demo themes it); resolved via the ColorResolver. */
    palette: OklchStop[];
    /** The opaque warm hypsometric ground (the survey reads standalone; per-mode resolved). */
    background: OklchStop | "transparent";
    /** Pointer HEAVES the topography (gravity over the contour map). */
    interactive: boolean;
    /** ONE static survey frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The WARM-DIVERGENT light identity — a true multi-warm hypsometric tint (NOT a mono-amber
 * wash). Four stops spanning the warm wheel from a deep plum-rose basin through ember and
 * amber to a wheat ridge crest. Every hue wraps through red — none lands in the teal/navy
 * purge band [180,270]. Resolved via the ColorResolver; a consumer (the demo) themes it
 * through a PRESET, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // the basin — a deep warm plum-rose (lowest ground)
    { L: 0.5, C: 0.115, h: 350 },
    // the slope — a warm ember
    { L: 0.66, C: 0.14, h: 38 },
    // the upper slope — a bright amber
    { L: 0.8, C: 0.115, h: 70 },
    // the crest — a warm wheat (highest ground)
    { L: 0.92, C: 0.06, h: 86 },
];

/**
 * The WARM-DIVERGENT dark identity — the survey-at-night twin (plain per-mode arm, NOT a
 * CSS `light-dark()` branch, NOT an in-shader `uMode` seam). A deep ember basin glowing up
 * to a luminous amber ridge ladder. Hues stay warm [330..90] — never teal/navy.
 */
export const WARM_IDENTITY_PALETTE_DARK: OklchStop[] = [
    // the basin — a deep warm-ember
    { L: 0.26, C: 0.09, h: 30 },
    // the slope — a glowing rust
    { L: 0.45, C: 0.15, h: 42 },
    // the upper slope — a luminous amber
    { L: 0.66, C: 0.155, h: 66 },
    // the crest — a bright warm gold
    { L: 0.84, C: 0.13, h: 84 },
];

/** The per-mode warm hypsometric GROUND (the opaque floor; resolved off `useGlobalDark`). */
export const WARM_GROUND_LIGHT: OklchStop = { L: 0.96, C: 0.018, h: 78 };
export const WARM_GROUND_DARK: OklchStop = { L: 0.16, C: 0.035, h: 32 };

/**
 * The shipped warm-identity default config — a living LEVEL-SET hypsometric SURVEY (paper-grid
 * kin): the iso-contours of a low-octave curl-warped height field, painted as an opaque warm
 * hypsometric fill, hillshaded into 2.5-D relief, inked with a two-tier index/minor contour
 * hierarchy, the cursor HEAVING the sheet with velocity-scaled weight. Reads standalone in
 * BOTH modes — it CONTRIBUTES a colorful field rather than revealing a flat plate.
 */
export const DEFAULT_CONCENTRIC_CONFIG: ConcentricConfig = {
    speed: 0.6,
    lineWidth: 1.8, // a present contour stroke (the survey reads clearly)
    lineSoftness: 1.0,
    contourLevels: 13, // the iso-line density (a readable survey — broad bands)
    cellSize: 1.2, // the cursor-well radius granularity
    heightOctaves: 3, // LOW → clean nested loops (not high-freq speckle)
    heightSeed: 7.0,
    swellAmp: 0.22, // the basins inflate/deflate breathing (weight)
    perturbAmp: 0.06, // per-contour wobble
    twistMax: 0.6, // a DRAMATIC contour flow as the wave passes
    shearMax: 0.24,
    waveDir: [0.92, 0.39],
    waveK: 0.42,
    waveOmega: 0.7,
    waveSigma: 0.85, // a BROAD sweeping front
    cursorWell: 0.5, // the cursor gravity peak (the topography HEAVES toward the pointer)
    toneGain: 1.6, // the tanh tone expansion — basins+ridges hit the ramp ENDS
    shadeAmp: 0.18, // the analytic-hillshade relief depth (2.5-D pop)
    lightDir: [-0.6, 0.8], // the fixed cartoon sun (raking cel light)
    indexEvery: 5, // every 5th contour is a bold index line (two-tier hierarchy)
    indexMul: 1.9, // the index line ~1.9× the minor half-width
    inkDarken: 0.45, // the ink is a darker ember of its own local fill band
    velocityHeave: 0.4, // pointer SPEED scales the well depth/radius (the heave weight)
    palette: WARM_IDENTITY_PALETTE,
    background: WARM_GROUND_LIGHT, // the opaque warm floor (per-mode resolved by the SFC)
    interactive: true, // cursor gravity on (paper-grid parity)
    respectReducedMotion: true,
};
