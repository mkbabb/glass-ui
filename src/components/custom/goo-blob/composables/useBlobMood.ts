import { ref, type Ref, readonly } from "vue";
import type { BlobMood, MoodParams } from "../types";
import { easeInOut } from "./easing";

// W11.c — the mood model reframed on a 2-axis {valence, arousal} core (the
// circumplex affect model). Each named mood is a POINT in that space; the
// per-mood MoodParams are DERIVED from valence/arousal by `paramsFor`, so the five
// moods are not hand-tuned in isolation — they read off one principled surface
// (excited = high arousal + high valence, sleepy = low arousal, etc.). `setMood`
// is wired internally from the interaction/idle state by `update` (no dead param).

interface AffectPoint {
    /** Pleasantness, -1 (unpleasant) .. +1 (pleasant). */
    valence: number;
    /** Activation, 0 (calm/sleepy) .. 1 (energized/excited). */
    arousal: number;
}

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
function paramsFor({ valence, arousal }: AffectPoint): MoodParams {
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
        pointerAttraction: lerp(-0.2, 0.6, valence * 0.5 + 0.5) * (0.4 + 0.6 * arousal),
        // Energized = faster merge cycling (lower stagger scale).
        mergeRate: lerp(2.0, 0.3, arousal),
        // The iridescence/SSS sheen intensity (excited shimmers, sleepy is flat).
        iridScale: lerp(0.4, 1.8, arousal),
    };
}

const MOOD_TARGETS: Record<BlobMood, MoodParams> = {
    idle: paramsFor(MOOD_AVA.idle),
    happy: paramsFor(MOOD_AVA.happy),
    curious: paramsFor(MOOD_AVA.curious),
    sleepy: paramsFor(MOOD_AVA.sleepy),
    excited: paramsFor(MOOD_AVA.excited),
};

const TRANSITION_MS: Record<BlobMood, number> = {
    idle: 1500,
    happy: 1200,
    curious: 800,
    sleepy: 2500,
    excited: 600,
};

function lerpParams(a: MoodParams, b: MoodParams, t: number): MoodParams {
    const mix = (x: number, y: number) => x + (y - x) * t;
    return {
        orbitSpeedScale: mix(a.orbitSpeedScale, b.orbitSpeedScale),
        wobbleScale: mix(a.wobbleScale, b.wobbleScale),
        pulseFreq: mix(a.pulseFreq, b.pulseFreq),
        pulseAmp: mix(a.pulseAmp, b.pulseAmp),
        noiseAmp: mix(a.noiseAmp, b.noiseAmp),
        hueRange: mix(a.hueRange, b.hueRange),
        satShift: mix(a.satShift, b.satShift),
        brightnessShift: mix(a.brightnessShift, b.brightnessShift),
        smoothK: mix(a.smoothK, b.smoothK),
        pointerAttraction: mix(a.pointerAttraction, b.pointerAttraction),
        mergeRate: mix(a.mergeRate, b.mergeRate),
        iridScale: mix(a.iridScale, b.iridScale),
    };
}

/** Idle timeout (ms of no pointer) after which the blob drifts to `sleepy`. */
const IDLE_SLEEP_MS = 6000;

/** The interaction signals `update` reads to drive the auto-mood arc. */
export interface MoodInteraction {
    /** The pointer is over the blob (drives `curious`). */
    pointerActive: boolean;
    /** A click landed this frame (drives a one-shot `excited`). */
    clicked: boolean;
    /** ms since the last pointer activity (drives `sleepy` past IDLE_SLEEP_MS). */
    idleMs: number;
}

/**
 * Animates the blob's mood parameters — a cross-fade between named mood targets
 * driven per frame by `tick(dt)`. `setMood` retargets; `update(interaction)` wires
 * `setMood` internally from the AW.W10 pointer/idle state (curious on approach,
 * excited on click, sleepy after inactivity); `params` is the eased current value
 * the renderer reads.
 */
export function useBlobMood() {
    const currentMood = ref<BlobMood>("idle");
    const params = ref<MoodParams>({ ...MOOD_TARGETS.idle });

    let fromParams: MoodParams = { ...MOOD_TARGETS.idle };
    let toParams: MoodParams = { ...MOOD_TARGETS.idle };
    let transitionElapsed = 0;
    let transitionDuration = 0;
    let transitioning = false;
    // A one-shot `excited` latch — a click holds excited briefly before it relaxes.
    let excitedHoldMs = 0;

    function setMood(mood: BlobMood) {
        if (mood === currentMood.value && !transitioning) return;
        currentMood.value = mood;
        fromParams = { ...params.value };
        toParams = MOOD_TARGETS[mood];
        transitionDuration = TRANSITION_MS[mood];
        transitionElapsed = 0;
        transitioning = true;
    }

    /**
     * Wire the mood from the interaction/idle state (W11.c). Priority: a fresh
     * click → `excited` (held briefly); pointer over → `curious`; long idle →
     * `sleepy`; otherwise `idle`. The single internal caller of `setMood`.
     */
    function update(interaction: MoodInteraction) {
        if (interaction.clicked) {
            excitedHoldMs = 900; // hold excited ~0.9s after a click
            setMood("excited");
            return;
        }
        if (excitedHoldMs > 0) return; // stay excited until the latch decays
        if (interaction.pointerActive) {
            setMood("curious");
        } else if (interaction.idleMs > IDLE_SLEEP_MS) {
            setMood("sleepy");
        } else {
            setMood("idle");
        }
    }

    function tick(dt: number) {
        if (excitedHoldMs > 0) excitedHoldMs = Math.max(0, excitedHoldMs - dt);
        if (!transitioning) return;
        transitionElapsed += dt;
        const raw = Math.min(transitionElapsed / transitionDuration, 1);
        const t = easeInOut(raw);
        params.value = lerpParams(fromParams, toParams, t);
        if (raw >= 1) transitioning = false;
    }

    return {
        currentMood: readonly(currentMood) as Readonly<Ref<BlobMood>>,
        params: readonly(params) as Readonly<Ref<MoodParams>>,
        setMood,
        update,
        tick,
    };
}

export type BlobMoodSystem = ReturnType<typeof useBlobMood>;
