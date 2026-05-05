// Mood-blending composable for the canon Blob primitive.
//
// `useBlobMood` resolves a reactive `BlobMood` name to its 11-field
// `MoodParams` blend. Field values are interpolated via @vueuse/core's
// `useTransition` so changing the input mood produces a continuous
// `--duration-panel` / `--ease-apple-spring` cross-fade between every
// param — there are no invalid halfway states.
//
// SPEC.md §5 owns the canonical parameter table; `BLOB_MOOD_PARAMS` here
// is byte-exact to that table.

import { useTransition } from "@vueuse/core";
import {
    computed,
    readonly,
    ref,
    toRef,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";

import type { BlobMood } from "../types";

/**
 * Eleven-parameter mood blend that overlays `BlobConfig`. Every field is
 * scalar so the entire `MoodParams` value can be interpolated as a numeric
 * tuple by `useTransition`.
 *
 * SPEC.md §5.
 */
export interface MoodParams {
    orbitSpeedScale: number;
    wobbleScale: number;
    pulseFreq: number;
    pulseAmp: number;
    noiseAmp: number;
    hueRange: number;
    satShift: number;
    brightnessShift: number;
    smoothK: number;
    pointerAttraction: number;
    mergeRate: number;
}

/**
 * Canonical five-mood × eleven-parameter table. Matches SPEC.md §5
 * byte-for-byte; do not edit without updating the spec in lockstep.
 */
export const BLOB_MOOD_PARAMS: Record<BlobMood, MoodParams> = {
    idle: {
        orbitSpeedScale: 1.0,
        wobbleScale: 1.0,
        pulseFreq: 0.3,
        pulseAmp: 0.008,
        noiseAmp: 0.025,
        hueRange: 5,
        satShift: 0.0,
        brightnessShift: 0.0,
        smoothK: 0.191,
        pointerAttraction: 0.0,
        mergeRate: 1.0,
    },
    happy: {
        orbitSpeedScale: 1.4,
        wobbleScale: 1.3,
        pulseFreq: 0.45,
        pulseAmp: 0.014,
        noiseAmp: 0.03,
        hueRange: 12,
        satShift: 0.05,
        brightnessShift: 0.04,
        smoothK: 0.2,
        pointerAttraction: 0.4,
        mergeRate: 1.5,
    },
    curious: {
        orbitSpeedScale: 1.1,
        wobbleScale: 1.2,
        pulseFreq: 0.32,
        pulseAmp: 0.01,
        noiseAmp: 0.028,
        hueRange: 8,
        satShift: 0.0,
        brightnessShift: 0.0,
        smoothK: 0.195,
        pointerAttraction: 0.8,
        mergeRate: 1.0,
    },
    sleepy: {
        orbitSpeedScale: 0.5,
        wobbleScale: 0.6,
        pulseFreq: 0.18,
        pulseAmp: 0.005,
        noiseAmp: 0.018,
        hueRange: 3,
        satShift: -0.08,
        brightnessShift: -0.05,
        smoothK: 0.165,
        pointerAttraction: 0.0,
        mergeRate: 0.4,
    },
    excited: {
        orbitSpeedScale: 1.7,
        wobbleScale: 1.5,
        pulseFreq: 0.55,
        pulseAmp: 0.018,
        noiseAmp: 0.038,
        hueRange: 18,
        satShift: 0.1,
        brightnessShift: 0.06,
        smoothK: 0.215,
        pointerAttraction: 0.6,
        mergeRate: 1.8,
    },
};

/**
 * Field order used to flatten/unflatten `MoodParams` into the numeric tuple
 * `useTransition` interpolates. Keep in sync with the interface above.
 */
const PARAM_KEYS = [
    "orbitSpeedScale",
    "wobbleScale",
    "pulseFreq",
    "pulseAmp",
    "noiseAmp",
    "hueRange",
    "satShift",
    "brightnessShift",
    "smoothK",
    "pointerAttraction",
    "mergeRate",
] as const satisfies readonly (keyof MoodParams)[];

type ParamKey = (typeof PARAM_KEYS)[number];

type CubicBezier = [number, number, number, number];

/**
 * Apple-spring fallback when the document is unavailable (SSR) or the CSS
 * custom property fails to parse. Matches the literal value of
 * `--motion-ease-apple-spring` in `src/styles/tokens.css`.
 */
const APPLE_SPRING_FALLBACK: CubicBezier = [0.175, 0.885, 0.32, 1.275];

/**
 * Mood blend duration fallback (ms). The spec calls for `--duration-panel`
 * — read at runtime when possible; literal-fallback only when the document
 * is unavailable.
 */
const DURATION_FALLBACK_MS = 450;

interface ResolvedTokens {
    durationMs: number;
    easing: CubicBezier;
}

let cachedTokens: ResolvedTokens | null = null;

function parseCubicBezier(value: string): CubicBezier | null {
    // Accept `cubic-bezier(a, b, c, d)`; reject named easings (the
    // composable can't blend through `linear(...)` keyframe curves).
    const match = value
        .trim()
        .match(/^cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/);
    if (!match) return null;
    const nums = match.slice(1, 5).map((s) => Number.parseFloat(s));
    if (nums.some((n) => !Number.isFinite(n))) return null;
    return [nums[0]!, nums[1]!, nums[2]!, nums[3]!];
}

function parseDurationMs(value: string): number | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const ms = trimmed.endsWith("ms");
    const s = !ms && trimmed.endsWith("s");
    const num = Number.parseFloat(trimmed);
    if (!Number.isFinite(num)) return null;
    if (ms) return num;
    if (s) return num * 1000;
    return num;
}

function resolveTokens(): ResolvedTokens {
    if (cachedTokens) return cachedTokens;
    if (typeof document === "undefined") {
        cachedTokens = {
            durationMs: DURATION_FALLBACK_MS,
            easing: APPLE_SPRING_FALLBACK,
        };
        return cachedTokens;
    }
    const styles = getComputedStyle(document.documentElement);
    const rawDuration = styles.getPropertyValue("--duration-panel");
    const rawEasing = styles.getPropertyValue("--ease-apple-spring");
    const durationMs = parseDurationMs(rawDuration) ?? DURATION_FALLBACK_MS;
    const easing = parseCubicBezier(rawEasing) ?? APPLE_SPRING_FALLBACK;
    cachedTokens = { durationMs, easing };
    return cachedTokens;
}

function flatten(params: MoodParams): number[] {
    return PARAM_KEYS.map((key) => params[key]);
}

function unflatten(tuple: readonly number[]): MoodParams {
    const out = {} as MoodParams;
    for (let i = 0; i < PARAM_KEYS.length; i++) {
        out[PARAM_KEYS[i] as ParamKey] = tuple[i] ?? 0;
    }
    return out;
}

/**
 * Resolve a reactive blob mood to its blended `MoodParams`. The eleven
 * fields cross-fade together over `--duration-panel` with
 * `--ease-apple-spring`; consumers see one continuous reactive params ref.
 *
 * SPEC.md §5 + §6 ("Mood blending").
 */
export function useBlobMood(
    mood: MaybeRefOrGetter<BlobMood>,
    options?: { params?: Record<BlobMood, MoodParams> },
): Readonly<Ref<MoodParams>> {
    const moodRef = toRef(mood);
    const table = options?.params ?? BLOB_MOOD_PARAMS;

    const target = computed<number[]>(() => flatten(table[moodRef.value]));

    // SSR path: no DOM, no rAF — skip the transition machinery and return
    // the raw target. The first hydration tick on the client will bind to
    // a live transition without a visible jump (initial value matches).
    if (typeof window === "undefined") {
        return readonly(
            computed(() => unflatten(target.value)),
        ) as Readonly<Ref<MoodParams>>;
    }

    const { durationMs, easing } = resolveTokens();

    const sourceRef = ref<number[]>(target.value);
    watch(target, (next) => {
        sourceRef.value = next;
    });

    const transitioned = useTransition(sourceRef, {
        duration: durationMs,
        easing,
    });

    return readonly(
        computed(() => unflatten(transitioned.value)),
    ) as Readonly<Ref<MoodParams>>;
}
