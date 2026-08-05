import type { BlobMood, MoodParams } from "./types";

// The GooBlob compile-time shape budget — the SINGLE source for the array caps the
// JS uploader (`uploadBlobUniforms`), the program builder (`buildMetaballProgram`),
// the pointer trail ring-buffer (`useBlobPointer`), AND the GLSL shader
// (`metaball.frag.ts` / `metaball-uniforms.glsl.ts`) all read. These caps are a
// CONTRACT: a JS const must equal the shader `#define` / fixed-size uniform array
// length or the upload writes off the end of the program. Co-located here (the
// feature-dir `constants.ts` convention) so the contract lives in ONE place rather
// than being re-declared at the top of each composable.

/** Compile-time satellite cap — mirrors `uSat*[N]` in metaball.frag.ts. */
export const MAX_SATS = 4;

/** Compile-time trail length — mirrors the `uTrail*[N]` arrays in metaball.frag.ts. */
export const TRAIL_N = 15;

/** Compile-time palette cap — mirrors `#define MAX_BLOB_STOPS` in metaball-uniforms.glsl.ts. */
export const MAX_BLOB_STOPS = 4;

/**
 * Canvas is CSS-sized 1.6x its layout wrapper (see GooBlob.vue). Positions are in
 * [-0.5, 0.5] normalized space mapped to canvas UVs. To make the layout footprint
 * represent the "visible blob region" and have the extra 60% of canvas serve as
 * overflow margin for satellite orbits, scale all length-like uniforms by
 * 1/1.6 = 0.625.
 */
export const POS_SCALE = 1 / 1.6;

/** The full ordered scalar/vector uniform-name list the program builder caches a location per. */
// ── mood model constants (consumed by composables/useBlobMood.ts) ─────────────
// The mood model is a 2-axis {valence, arousal} circumplex. Each named mood
// is a POINT in that space (`MOOD_AVA`); the per-mood `MoodParams` are DERIVED from
// valence/arousal by `paramsFor`, so the five moods read off ONE principled surface
// rather than being hand-tuned in isolation. The derivation + the resolved target
// table live here (the feature-dir constants home) so the composable imports the
// tables rather than declaring them at module scope.

/** A point in the 2-axis circumplex affect space. */
export interface AffectPoint {
    /** Pleasantness, -1 (unpleasant) .. +1 (pleasant). */
    valence: number;
    /** Activation, 0 (calm/sleepy) .. 1 (energized/excited). */
    arousal: number;
}

/** The five named moods as POINTS in the {valence, arousal} circumplex. */
const MOOD_AVA: Record<BlobMood, AffectPoint> = {
    idle: { valence: 0.0, arousal: 0.35 },
    happy: { valence: 0.8, arousal: 0.6 },
    curious: { valence: 0.3, arousal: 0.5 },
    sleepy: { valence: -0.1, arousal: 0.1 },
    excited: { valence: 0.7, arousal: 1.0 },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Derive the full MoodParams from a {valence, arousal} point. Arousal drives the
 * motion energy (orbit speed, wobble, pulse rate/amp, noise, the iridescence/SSS
 * sheen); valence warms the palette (hue range, chroma, brightness) and the
 * pointer lean. ONE principled surface — the five named moods are samples of it.
 */
export function paramsFor({ valence, arousal }: AffectPoint): MoodParams {
    return {
        orbitSpeedScale: lerp(0.4, 2.2, arousal),
        wobbleScale: lerp(0.5, 2.0, arousal),
        pulseFreq: lerp(0.15, 1.5, arousal),
        pulseAmp: lerp(0.008, 0.05, arousal),
        noiseAmp: lerp(0.015, 0.045, arousal),
        hueRange: lerp(3, 25, arousal * 0.6 + (valence * 0.5 + 0.5) * 0.4),
        satShift: lerp(-0.05, 0.1, valence * 0.5 + 0.5),
        brightnessShift: lerp(-0.03, 0.08, valence * 0.5 + 0.5),
        // `smoothK` is a unitless, 1.0-CENTRED MULTIPLIER on the config's absolute
        // smin band (NOT an absolute distance) — the config holds the one length
        // authority (`BLOB_CONFIG_DEFAULTS.smoothK`, POS_SCALE'd in the renderer),
        // mood only scales it. Excited (high arousal) merges gooier, sleepy (low
        // arousal) crisper; idle sits ≈ 1.0 (arousal 0.35 → ~1.03). The range centers on
        // ~1.0 so the smin band stays inside the contained-droplet seam-pull at BOTH
        // arousal extremes.
        smoothK: lerp(0.85, 1.35, arousal),
        // Pleasant + activated leans IN; unpleasant shies AWAY.
        //
        // The arousal multiplier is FLATTENED to
        // `0.7 + 0.15·arousal`. A multiplier reaching 1.0 at full arousal makes a
        // plain hover (which auto-promotes to `curious`, arousal 0.5) scale the pointer
        // attraction UP and COMPOUND with the config `pointerStrength` into a lunge.
        // The flattened band (0.775 at curious, 0.85 at
        // excited) keeps the auto-`curious` hover lean CALM — the mood still warms the
        // attraction with arousal, but it does not auto-jump a hover toward the
        // excited-regime lean. The lean magnitude lives in `config.pointerStrength`
        // (0.18), not a mood-compounded multiplier.
        pointerAttraction: lerp(-0.2, 0.6, valence * 0.5 + 0.5) * (0.7 + 0.15 * arousal),
        // Energized = faster merge cycling (lower stagger scale).
        mergeRate: lerp(2.0, 0.3, arousal),
        // The iridescence/SSS sheen intensity (excited shimmers, sleepy is calm —
        // NOT flat: sleepy stays ALIVE at ~0.55, an `arousal=0` blob reads asleep,
        // not dead). : with lit/iridescence/SSS now DEFAULT-ON, this multiplier
        // is load-bearing for the FIRST time — the excited CEILING drops 1.8 → 1.35
        // so the excited extreme stays a WARM wet bead, never an over-saturated neon
        // thin-film on the now-default-lit warm body.
        iridScale: lerp(0.55, 1.35, arousal),
    };
}

/** The resolved per-mood target params (samples of the `paramsFor` surface). */
export const MOOD_TARGETS: Record<BlobMood, MoodParams> = {
    idle: paramsFor(MOOD_AVA.idle),
    happy: paramsFor(MOOD_AVA.happy),
    curious: paramsFor(MOOD_AVA.curious),
    sleepy: paramsFor(MOOD_AVA.sleepy),
    excited: paramsFor(MOOD_AVA.excited),
};

/** The per-mood cross-fade duration (ms). */
export const TRANSITION_MS: Record<BlobMood, number> = {
    idle: 1500,
    happy: 1200,
    curious: 800,
    sleepy: 2500,
    excited: 600,
};

/** Idle timeout (ms of no pointer) after which the blob drifts to `sleepy`. */
export const IDLE_SLEEP_MS = 6000;

// ── pointer click-impulse spring (consumed by composables/useBlobPointer.ts) ──
// The one-shot UNDERDAMPED harmonic oscillator a click kicks: omega sets the ring
// frequency, zeta < 1 the bounce. Integrated semi-implicit (symplectic) Euler.

/** Click-impulse spring ring frequency (rad/s). */
export const PULSE_OMEGA = 18;

/** Click-impulse spring damping (< 1 = underdamped, overshoot-then-settle). */
export const PULSE_ZETA = 0.35;

/** The at-rest epsilon — velocity/position below this is "settled" (the park gate). */
export const REST_EPS = 1e-3;

// ── satellite system (consumed by composables/useBlobSatellites.ts) ───────────

// The ORBIT ENVELOPE bounds — composed with the
// uploadBlobUniforms.ts band widen.
// A per-satellite orbit random (×0.8..1.2) + wobble amplitudes (≤0.08)
// push the worst-case satellite near-edge a GAP beyond the body edge that the
// widened smin band cannot bridge (the gap reaches ~0.13 UV with wobble at
// the studio orbit 0.30; the band ceiling is ~0.06). The band widen alone
// over-inflates past the lean ceiling before it can close that gap, so the
// envelope is TIGHTENED here: the random
// multiplier is RE-CENTERED on the nominal and CAPPED (×0.85..1.05) and the
// wobble amplitudes are calmed, so the worst-case near-edge stays within the
// widened band's reach across the WHOLE orbit. The orbit→merge→absorb→emerge
// show survives — the satellites still visibly sweep OUT to ~1.05× the nominal
// orbit and back; the envelope is bounded, NOT collapsed (the
// register-design constraint: tighten without killing the show). ONE source the
// create + re-randomize sites both read (no per-site drift).
export const ORBIT_RANDOM_BASE = 0.85; // the low end of the per-satellite orbit multiplier
export const ORBIT_RANDOM_SPAN = 0.2; // → ×0.85..1.05 (capped high end)
export const SAT_WOBBLE1_BASE = 0.015;
export const SAT_WOBBLE1_SPAN = 0.02; // → 0.015..0.035
export const SAT_WOBBLE2_BASE = 0.01;
export const SAT_WOBBLE2_SPAN = 0.015; // → 0.01..0.025

// note — the orbiting satellite opacity drives the smin BRIDGE
// through the shader's opacity→distance inflation: metaball.frag.ts inflates a
// satellite's SDF by `(1 - uSatOpacity) * 0.3`, so a lower-opacity satellite reads
// as FURTHER for the merge. The bridge-hold is carried by the capped orbit
// envelope (useBlobSatellites.ts) + the worst-case band widen
// (uploadBlobUniforms.ts), so BASE_OPACITY stays at the calibrated 0.75 — lifting
// it (e.g. 0.95) over-inflated the merged footprint past the four-side containment
// ceiling proof:blob-page bounds (the creature clipped every canvas edge).
export const BASE_OPACITY = 0.75;

/** Duration (ms) to blend from emerge endpoint into live orbit — eliminates snap. */
export const ORBIT_BLEND_MS = 2000;

/** Minimum spacing (ms) between satellite merge events. */
export const MERGE_STAGGER_MS = 3000;

// ── The SPLIT (fission) engine constants ─────────────
//
// The MERCURY-COLONY split is an OPT-IN register (config.surface.fissionAmp, default 0).
// When armed, AT MOST ONE satellite per cycle is the `fissioning` satellite: it buds OUT
// through a thinning neck whose gap exceeds the smin reach so it SNAPS into a free
// orbiting bead (the mercury pinch), then re-merges next cycle. The split rides MOTION
// (the satellite radius rises along the `fissionSnap` curve), NOT a global smin-band
// re-base — sidestepping the lean-regression. The bounded apex
// `FISSION_REACH_MAX` is TUNED against the proof:blob-render calm-lean ceiling (0.10): at
// orbit 0.30, apex 0.40 paints at 0.40·POS_SCALE = 0.25 uv (clears the canvas edge) — the
// spike (golden/fission-topology-spike.mjs) sweeps this and reports the worst-case lean.

/**
 * The bounded fission APEX (config-UV) — the orbit radius the fissioning satellite
 * breathes OUT to at its excursion peak. Beyond the body skin (0.22) by a clean gap that
 * exceeds the smin reach so the neck SNAPS; bounded so the single fissioner + apex rule
 * re-prevents the "two unrelated discs" failure WITHOUT the blanket never-leaves-reach
 * clamp. Paints at `FISSION_REACH_MAX · POS_SCALE` uv.
 */
export const FISSION_REACH_MAX = 0.4;

/** The fission PERIAPSIS (config-UV) — the merged-in radius the satellite gathers to before the snap (well inside the body skin, fully bonded). */
export const FISSION_REACH_MIN = 0.18;

/**
 * The full fission BEAT duration (ms) — the SLOW gather + FAST snap + re-merge window the
 * `fissioning` phase runs for. Long enough that the colony reads as a steady-state
 * merge↔split breath (perpetually mid-merge on one satellite while mid-split on another),
 * NOT a rare twitch. The `fissionSnap` curve maps the beat's `t in [0,1]` to the reach.
 */
export const FISSION_BEAT_MS = 5200;

/**
 * The fission INTENSITY → cadence map. `fissionAmp` (0..1, config × mood) scales how
 * OFTEN a satellite enters the fissioning beat vs the calm bonded breath: at amp 0 the
 * fission probability is 0 (the calm default never splits); at amp 1 a satellite reaching
 * its orbit-phase boundary enters `fissioning` with this probability instead of a plain
 * merge. Mood-coupled (excited raises the effective amp, sleepy lowers it).
 */
export const FISSION_PROB_AT_FULL = 0.75;

export const UNIFORM_NAMES = [
    "uResolution",
    "uTime",
    "uBaseColor",
    "uPointer",
    "uPointerActive",
    "uPointerAttraction",
    "uPointerStrength",
    "uBodyRadius",
    "uPulsePhase",
    "uPulseAmp",
    "uNoiseAmp",
    "uNoiseFreq",
    "uNoiseSpeed",
    "uWarpAmp",
    "uSmoothK",
    "uMerge",
    "uStage",
    "uMorphT",
    "uMaxReach",
    "uLit",
    "uRimColor",
    "uLightDir",
    "uSpecStrength",
    "uSpecShininess",
    "uRimPower",
    "uRimStrength",
    // The procedural soft-shadow march (T2).
    "uShadow",
    "uShadowSoftness",
    "uIridescence",
    "uIridHue",
    "uIridSpeed",
    "uSssScale",
    "uSssPower",
    "uCoreGlow",
    "uHueRange",
    "uSatShift",
    "uBrightnessShift",
    "uColorNoiseFreq",
    "uColorNoiseSpeed",
    "uStopCount",
    "uSatCount",
    // The per-satellite explicit-shade active flag
    // (the uSatColor[]/uSatColorAmt[] arrays cache their locations in buildMetaballProgram).
    "uSatColorActive",
    "uTrailCount",
    "uVelocity",
    "uStretch",
] as const;

export type UniformName = (typeof UNIFORM_NAMES)[number];
