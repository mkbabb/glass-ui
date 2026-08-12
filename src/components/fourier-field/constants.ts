// The fourier-field register: the author schema plus the constants the paint law is
// written in. Every number here is used by something that paints; nothing is a ceiling.
//
// THE FOUR LAWS this module serves:
//   1. Motion is a theorem   — the paint is the truncated inverse DFT of a fixed spectrum.
//   2. Touch means TIME      — the pointer scrubs and flicks the one clock, never the space.
//   3. One axis, no ceiling  — N truncates a paint-floored array; there is no MAX.
//   4. The ink is the palette's own law — warm paper, opaque mark, light-led pen.

import type { OklchStop } from "../../composables/color";
import type { FOURIER_FIGURES } from "./math";

/** The palette-stop ceiling — the WGSL `MAX_FOURIER_STOPS` binding size. */
export const MAX_FOURIER_STOPS = 4;

/**
 * The CPU-resolved OKLab ramp resolution. The palette is sampled into this many entries
 * once per palette change and uploaded as a table, so the shader never runs an OKLab
 * conversion per fragment and the ink, the mark and the head all read ONE ramp.
 */
export const FOURIER_LUT_SIZE = 16;

/**
 * The tail chroma floor. A ramp that lets chroma fall to zero paints a grey smear at the
 * trail's end — the blob disease. Every LUT entry is floored here.
 */
export const FOURIER_TAIL_CHROMA_FLOOR = 0.1;

/**
 * THE INK STEP. The ink is the mark's own ramp head taken one step DOWN in lightness and
 * then gamut-mapped at fixed L and hue, so it is a real pigment rather than a wash. This
 * is the module's own ramp step, and it is what solves mark:ink into the [1.5, 3.0]:1
 * band in BOTH schemes at once.
 */
export const FOURIER_INK_DELTA_L = 0.22;

/**
 * THE HEAD LIFT. The comet head's core is the ramp head lifted by half the ink step, with
 * chroma preserved. The head is light-led and stays in the palette family — it is never a
 * white specular, which reads as trite and shiny and belongs to no rung.
 */
export const FOURIER_HEAD_DELTA_L = 0.11;

/**
 * The chain's hue sweep, in radians, ridden symmetrically about the palette hue. Measured
 * swept range 10.3°–50.5° off a warm anchor, which is why the chain cannot reach
 * chartreuse by construction rather than by a clamp.
 */
export const FOURIER_CHAIN_HUE_SWEEP = 0.35;

/** The scaffold stroke as a fraction of the mark stroke — the chain is a rung below the curve. */
export const FOURIER_SCAFFOLD_STROKE_FRAC = 0.4;

/** The three mark-stroke rungs in CSS px. Three rungs, three visibly distinct pictures. */
export const FOURIER_STROKE_RUNGS = [4, 8, 12] as const;

/**
 * The flick's advance cap in turns. A full flick advances the clock by at most half a
 * figure (`|∫flick| = v/ω² ≤ FOURIER_FLICK_TURNS`), so the machine stays checkable: the
 * reader can always see where the head went.
 */
export const FOURIER_FLICK_TURNS = 0.5;

/** The cursor-velocity → clock-rate scrub gain (turns per second per unit pointer velocity). */
export const FOURIER_SCRUB_GAIN = 0.15;

/** Base forward period for one full traversal at 1× speed, in seconds. */
export const FOURIER_PERIOD_S = 16;

/** The keyboard scrub quanta in turns: fine (←/→) and coarse (↑/↓). */
export const FOURIER_QUANTUM_FINE = 1 / 64;
export const FOURIER_QUANTUM_COARSE = 1 / 8;

/**
 * The device-pixel-ratio cap. Consumed locally: the curve is a thin stroke over mostly
 * empty stage, so it is worth resolving sharply, and 2× is where the sharpness stops
 * being visible and starts being fill rate.
 */
export const FOURIER_DPR_CAP = 2;

/** The number of curve samples the comet body is built from. */
export const FOURIER_CURVE_SAMPLES = 384;

/**
 * The degenerate-tangent guard. At a cusp the head's instantaneous speed collapses and
 * the unit tangent blows up; below this the shader falls back to the last stable tangent.
 */
export const FOURIER_TANGENT_EPS = 1e-4;

/** The spectrum source: the seeded generator, or a curated closed figure by key. */
export type FourierSource = "elliptic" | keyof typeof FOURIER_FIGURES;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a
 * tunable a control drives, and every one of them changes the picture.
 */
export interface FourierFieldConfig {
    /** The spectrum source. An unknown key throws at config time rather than painting a default. */
    source: FourierSource;
    /**
     * The partial-sum term count N. Its live domain is `[1, spectrum.length]`, where the
     * length is what the mint emitted — there is no constant maximum anywhere.
     */
    harmonics: number;
    /** Draw the machine: the rings, the arms and the joint dots. */
    showMachine: boolean;
    /** Sweep the chain's hue about the palette anchor rather than painting one hue. */
    rainbowChain: boolean;
    /** Comet-body length as a fraction of the period (0.15..1). */
    trailArc: number;
    /** The mark stroke in CSS px — one of {@link FOURIER_STROKE_RUNGS}. */
    markStroke: number;
    /**
     * The ink's offset from its mark, in stroke widths, taken along this segment's own
     * tangent and opposite the travel. Below ½ the ink hides under its mark; above 1 it
     * detaches and reads as a second line.
     */
    inkOffset: number;
    /** The head's squash-and-stretch gain (0..1). 0 is a dead round disc. */
    squash: number;
    /** The head halo's strength (0..0.3). */
    glow: number;
    /** Outer loudness envelope (0..2). Above 1 the pack clamps, and the row says so. */
    intensity: number;
    /** Character of the GENERATED spectrum (0..1). Inert for a curated source. */
    richness: number;
    /** Clock speed multiplier. */
    speed: number;
    /** The curve-color ramp. */
    palette: OklchStop[];
    /** One static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity ramp — the pre-mount placeholder only. The shipped default
 * resolves `--viz-fourier` through the cascade at mount and on every dark flip; this pair
 * exists so the first frame is not colourless while that resolve is pending.
 */
const PLACEHOLDER_PALETTE: OklchStop[] = [
    { L: 0.62, C: 0.19, h: 34 },
    { L: 0.86, C: 0.06, h: 70 },
];

/** The shipped default config. */
export const DEFAULT_FOURIER_CONFIG: FourierFieldConfig = {
    source: "elliptic",
    harmonics: 6,
    showMachine: true,
    rainbowChain: true,
    trailArc: 0.43,
    markStroke: 8,
    inkOffset: 0.7,
    squash: 0.55,
    glow: 0.14,
    intensity: 1,
    richness: 0.5,
    speed: 1,
    palette: PLACEHOLDER_PALETTE,
    respectReducedMotion: true,
};
