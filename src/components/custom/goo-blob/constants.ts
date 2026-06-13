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
// W11.c — the mood model is a 2-axis {valence, arousal} circumplex. Each named mood
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
export const MOOD_AVA: Record<BlobMood, AffectPoint> = {
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
        // arousal) crisper; idle sits ≈ 1.0 (arousal 0.35 → ~1.03). The range is the
        // prior absolute 0.16–0.32 lerp re-expressed around 1.0 (~5× down) so the smin
        // band stays inside the contained-droplet seam-pull at BOTH arousal extremes.
        smoothK: lerp(0.85, 1.35, arousal),
        // Pleasant + activated leans IN; unpleasant shies AWAY.
        //
        // AX.W46 D5 — the arousal multiplier is FLATTENED (`0.4 + 0.6·arousal` →
        // `0.7 + 0.15·arousal`). The old multiplier reached 1.0 at full arousal, so a
        // plain hover (which auto-promotes to `curious`, arousal 0.5) scaled the pointer
        // attraction UP and COMPOUNDED with the config `pointerStrength` into the lunge
        // the live π-lane flagged. The flattened band (0.775 at curious, 0.85 at
        // excited) keeps the auto-`curious` hover lean CALM — the mood still warms the
        // attraction with arousal, but it no longer auto-jumps a hover toward the
        // excited-regime lean. The lean magnitude now lives in `config.pointerStrength`
        // (0.18), not a mood-compounded multiplier.
        pointerAttraction: lerp(-0.2, 0.6, valence * 0.5 + 0.5) * (0.7 + 0.15 * arousal),
        // Energized = faster merge cycling (lower stagger scale).
        mergeRate: lerp(2.0, 0.3, arousal),
        // The iridescence/SSS sheen intensity (excited shimmers, sleepy is calm —
        // NOT flat: sleepy stays ALIVE at ~0.55, an `arousal=0` blob reads asleep,
        // not dead). AX.W15: with lit/iridescence/SSS now DEFAULT-ON, this multiplier
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

// BA.W-GOO-REDRESS (root cause 1 / BA-goo-2, direction i — composed with the
// uploadBlobUniforms.ts band widen, direction ii) — the ORBIT ENVELOPE bounds.
// The prior per-satellite orbit random (×0.8..1.2) + wobble amplitudes (≤0.08)
// pushed the worst-case satellite near-edge a GAP beyond the body edge that the
// widened smin band still cannot bridge (the gap reaches ~0.13 UV with wobble at
// the studio orbit 0.30; the band ceiling is ~0.06). Direction ii alone
// over-inflates past the lean ceiling before it can close that gap, so the
// envelope is TIGHTENED here (the spec's compose-(i)+(ii) path): the random
// multiplier is RE-CENTERED on the nominal and CAPPED (×0.85..1.05) and the
// wobble amplitudes are calmed, so the worst-case near-edge stays within the
// widened band's reach across the WHOLE orbit. The orbit→merge→absorb→emerge
// show survives — the satellites still visibly sweep OUT to ~1.05× the nominal
// orbit and back; the envelope is bounded, NOT collapsed (the §Triumvirate
// register-design constraint: tighten without killing the show). ONE source the
// create + re-randomize sites both read (no per-site drift).
export const ORBIT_RANDOM_BASE = 0.85; // the low end of the per-satellite orbit multiplier
export const ORBIT_RANDOM_SPAN = 0.2; // → ×0.85..1.05 (was ×0.8..1.2; capped high end)
export const SAT_WOBBLE1_BASE = 0.015;
export const SAT_WOBBLE1_SPAN = 0.02; // → 0.015..0.035 (was 0.02..0.08)
export const SAT_WOBBLE2_BASE = 0.01;
export const SAT_WOBBLE2_SPAN = 0.015; // → 0.01..0.025 (was 0.015..0.055)

// BA.W-GOO-REDRESS note — the orbiting satellite opacity drives the smin BRIDGE
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
    "uMaxReach",
    "uLit",
    "uRimColor",
    "uLightDir",
    "uSpecStrength",
    "uSpecShininess",
    "uRimPower",
    "uRimStrength",
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
    "uTrailCount",
    "uVelocity",
    "uStretch",
] as const;

export type UniformName = (typeof UNIFORM_NAMES)[number];
