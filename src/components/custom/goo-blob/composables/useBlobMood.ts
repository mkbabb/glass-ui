import { ref, type Ref, readonly } from "vue";
import type { BlobMood, MoodParams } from "../types";
import { easeInOut } from "./easing";

const MOOD_TARGETS: Record<BlobMood, MoodParams> = {
    idle: {
        orbitSpeedScale: 1.0,
        wobbleScale: 1.0,
        pulseFreq: 0.3,
        pulseAmp: 0.015,
        noiseAmp: 0.025,
        hueRange: 5,
        satShift: 0.0,
        brightnessShift: 0.0,
        smoothK: 0.22,
        pointerAttraction: 0.0,
        mergeRate: 1.0,
    },
    happy: {
        orbitSpeedScale: 1.4,
        wobbleScale: 1.3,
        pulseFreq: 0.8,
        pulseAmp: 0.03,
        noiseAmp: 0.035,
        hueRange: 15,
        satShift: 0.05,
        brightnessShift: 0.05,
        smoothK: 0.28,
        pointerAttraction: 0.3,
        mergeRate: 0.6,
    },
    curious: {
        orbitSpeedScale: 0.8,
        wobbleScale: 1.5,
        pulseFreq: 0.5,
        pulseAmp: 0.02,
        noiseAmp: 0.03,
        hueRange: 10,
        satShift: 0.03,
        brightnessShift: 0.02,
        smoothK: 0.25,
        pointerAttraction: 0.6,
        mergeRate: 1.2,
    },
    sleepy: {
        orbitSpeedScale: 0.4,
        wobbleScale: 0.5,
        pulseFreq: 0.15,
        pulseAmp: 0.008,
        noiseAmp: 0.015,
        hueRange: 3,
        satShift: -0.05,
        brightnessShift: -0.03,
        smoothK: 0.16,
        pointerAttraction: -0.2,
        mergeRate: 2.0,
    },
    excited: {
        orbitSpeedScale: 2.2,
        wobbleScale: 2.0,
        pulseFreq: 1.5,
        pulseAmp: 0.05,
        noiseAmp: 0.045,
        hueRange: 25,
        satShift: 0.1,
        brightnessShift: 0.08,
        smoothK: 0.32,
        pointerAttraction: 0.1,
        mergeRate: 0.3,
    },
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
    };
}

/**
 * Animates the blob's mood parameters — a cross-fade between named mood targets
 * driven per frame by `tick(dt)`. `setMood` retargets; `params` is the eased
 * current value the renderer reads.
 */
export function useBlobMood() {
    const currentMood = ref<BlobMood>("idle");
    const params = ref<MoodParams>({ ...MOOD_TARGETS.idle });

    let fromParams: MoodParams = { ...MOOD_TARGETS.idle };
    let toParams: MoodParams = { ...MOOD_TARGETS.idle };
    let transitionElapsed = 0;
    let transitionDuration = 0;
    let transitioning = false;

    function setMood(mood: BlobMood) {
        if (mood === currentMood.value && !transitioning) return;
        currentMood.value = mood;
        fromParams = { ...params.value };
        toParams = MOOD_TARGETS[mood];
        transitionDuration = TRANSITION_MS[mood];
        transitionElapsed = 0;
        transitioning = true;
    }

    function tick(dt: number) {
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
        tick,
    };
}

export type BlobMoodSystem = ReturnType<typeof useBlobMood>;
