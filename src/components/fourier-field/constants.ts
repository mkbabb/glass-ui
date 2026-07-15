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

import type { OklchStop } from "../../composables/color";

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
 * The cursor-velocity → head_t clock-coupling gain (BD.W-VIZ-BROKEN-FIX D6 — the weighted
 * scrub). The cursor MOTION (not its absolute X) nudges the loop clock: a flick fast-
 * forwards, a still cursor lets the field drift at its config speed. Velocity-continuous —
 * the head never teleports (the prior `headT = pointerX` absolute-X scrub read as "not
 * following" a 2-D cursor).
 */
export const SCRUB_GAIN = 0.15;

// BI.W-FIELD-CORE — `FOLLOW_REACH = 0.7` (the centroid-TELEPORT — the figure lunged its
// whole centroid two-thirds of the frame toward the cursor) is RETIRED (clean break, no
// alias). The subtle centroid LEAN + the directional DRAW-BIAS are now the shared PURE
// `fourierLeanMapping` (`composables/motion/pointerFieldMappings.ts`, FOLLOW_LEAN ≈ 0.15,
// engagement-scaled): the curve "gracefully draws TOWARD" the cursor WITHOUT translating the
// figure. The velocity SCRUB (`SCRUB_GAIN`, the WHEN-on-the-curve nudge) is orthogonal + preserved.

// ── BG.W-FOURIER-BEAUTY B1 — the THICK luminous RIBBON stroke register ──────────
/**
 * The comet ribbon's TAIL width as a fraction of the head width (the head→tail taper). At the
 * head (age 1) the stroke is the full `trailWidth`; at the tail (age 0) it is `RIBBON_TAIL_FRAC`
 * of it. The taper is `f(age) = RIBBON_TAIL_FRAC + (1 − RIBBON_TAIL_FRAC)·age` (LINEAR, so the
 * age-0.5 MID-BODY is `RIBBON_TAIL_FRAC + (1 − RIBBON_TAIL_FRAC)·0.5` of the head). Declared
 * ONCE here + MIRRORED verbatim as the `RIBBON_TAIL_FRAC` const in BOTH shaders (the GLSL twin
 * cannot import a TS constant); `proof:viz` FB1 cross-checks the three copies are equal so the
 * mid-body floor below can never drift off the taper.
 */
export const RIBBON_TAIL_FRAC = 0.4;
/** The mid-body taper fraction (age 0.5) — the width the {@link RIBBON_HEAD_FLOOR_PX} floor targets. */
export const RIBBON_MID_TAPER_FRAC = RIBBON_TAIL_FRAC + (1 - RIBBON_TAIL_FRAC) * 0.5; // 0.7
/**
 * The MID-BODY minimum in CSS px (the B1 "≥2.5px CSS mid-body at every DPR, never a 1px
 * hairline polyline" bar). The width is DPR-independent by construction (converted to model
 * via `canvasCssMin` = backing ÷ dpr), so a CSS-px floor holds at every DPR.
 */
export const RIBBON_MID_FLOOR_PX = 2.5;
/**
 * The HEAD-width floor in CSS px (the `trailWidth` clamp in `trailWidthToModel`). Sized so the
 * mid-body (head × {@link RIBBON_MID_TAPER_FRAC}) clears {@link RIBBON_MID_FLOOR_PX} — even a
 * consumer setting `trailWidth: 1` gets a ≥2.5px mid-body. A hair over the exact quotient for
 * float safety.
 */
export const RIBBON_HEAD_FLOOR_PX = RIBBON_MID_FLOOR_PX / RIBBON_MID_TAPER_FRAC + 0.05; // ≈3.62

/**
 * The degenerate-tangent guard (BD.W-FOURIER-LOOM §2b). At a cusp the head's instantaneous
 * speed `s = length(head − headBack)` collapses to ~0 and the unit tangent `T = d/s` blows
 * up; below `FOURIER_TANGENT_EPS` the shaders + the GL CPU bead path all fall back to the
 * LAST stable tangent, so `s→0` resolves IDENTICALLY across both engines (the cross-engine
 * cusp-parity fence — one shared constant, no per-engine drift).
 */
export const FOURIER_TANGENT_EPS = 1e-4;

/**
 * The head squash-and-stretch gain (BD.W-FOURIER-LOOM §2b). The round head bead becomes a
 * volume-preserving anisotropic ellipse: the tangent extent scales `1 + k·ŝ`, the normal
 * extent `1/(1 + k·ŝ)`, where `ŝ` is the normalized head speed. The library identity carries
 * a SMALL non-zero gain (cartoon-weight at rest — the head is never a dead disc); a consumer
 * vivid preset turns it to 11. `0` = the byte-frozen round disc.
 */
export const FOURIER_SQUASH_GAIN = 0.55;

/**
 * The cartoon cel-shadow gain (BD.W-FOURIER-LOOM §3b). Each chain ring/arm/dot + the comet
 * rope paints a second darker copy OFFSET opposite its travel — the 1940s technicolor ink.
 * The library identity carries a SMALL non-zero gain (a quiet weight under the chain); a
 * consumer vivid preset floors it UP. `0` = no cel pass (byte-frozen). The offset rides the
 * head tangent, mirrored on both engines off the SAME `curveSamples` tangent.
 */
export const FOURIER_CEL_GAIN = 0.35;

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
    /**
     * Head squash-and-stretch gain (BD.W-FOURIER-LOOM §2b). The head bead stretches along the
     * curve tangent on straights, squashes across it on corners (volume-preserving). The
     * library identity carries a small non-zero default (cartoon-weight at rest); a vivid
     * consumer preset turns it to 11. 0 = the byte-frozen round disc.
     */
    squashGain: number;
    /**
     * Cartoon cel-shadow gain (BD.W-FOURIER-LOOM §3b). A second darker copy of the chain + rope,
     * offset opposite the head travel (the technicolor ink). The library identity carries a
     * small non-zero default; a vivid consumer preset floors it UP. 0 = no cel pass.
     */
    celGain: number;
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
    // BG.W-FOURIER-BEAUTY B1 — a THICK luminous ribbon head (was 3). The head→tail taper
    // (RIBBON_TAIL_FRAC) + the RIBBON_HEAD_FLOOR_PX floor keep the mid-body ≥2.5px CSS.
    trailWidth: 5,
    intensity: 1,
    harmonicScale: 0.24,
    speed: 1,
    palette: WARM_IDENTITY_PALETTE,
    respectReducedMotion: true,
    interactive: true,
    // The library identity carries cartoon-weight at rest (BD.W-FOURIER-LOOM §2b/§3b — a
    // SMALL non-zero squash + cel; the vivid lift is a consumer preset turning these to 11).
    squashGain: FOURIER_SQUASH_GAIN,
    celGain: FOURIER_CEL_GAIN,
};
