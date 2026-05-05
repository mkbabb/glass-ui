// Reactive watercolor border-radius oscillator for `<Swatch variant="watercolor">`.
//
// Generates two deterministic sets of 8 border-radius corner values via
// `mulberry32(seed)` in the 30%..70% band, then drives a smoothstep-eased
// boil between them at `boilHz` cadence. The `useRAFLoop` driver
// honors `prefers-reduced-motion: reduce` — under PRM the callback fires
// once with `time=0, deltaMs=0` and the loop halts; the static set-A
// specimen persists in `borderRadius.value` (write at `time=0` is a no-op
// since the eased lerp lands back on set-A modulo phase noise).
//
// SPEC.md §1 ("watercolor specimen") + §3 (`<Swatch variant="watercolor">`).

import { readonly, ref, type Ref } from "vue";

import { useRAFLoop, type RAFLoopTiming } from "../motion";
import { mulberry32 } from "../utils/mulberry32";

export interface UseWatercolorBlobOptions {
    /** PRNG seed for deterministic shapes; default 1618. */
    seed?: number;
    /** Amplitude of border-radius variation, 0..1; default 1. */
    intensity?: number;
    /** Boil cadence in Hz; default `1 / phi^2 ≈ 0.382` (φ-derived breath). */
    boilHz?: number;
}

const PHI_SQUARED = ((1 + Math.sqrt(5)) / 2) ** 2;
const DEFAULT_BOIL_HZ = 1 / PHI_SQUARED;

const RADIUS_MIN_PCT = 30;
const RADIUS_MAX_PCT = 70;
const RADIUS_CENTER_PCT = (RADIUS_MIN_PCT + RADIUS_MAX_PCT) / 2;

function randomRadiusSet(rng: () => number): number[] {
    const out: number[] = [];
    for (let i = 0; i < 8; i++) {
        out.push(RADIUS_MIN_PCT + rng() * (RADIUS_MAX_PCT - RADIUS_MIN_PCT));
    }
    return out;
}

function applyIntensity(set: number[], intensity: number): number[] {
    if (intensity === 1) return set;
    const k = Math.max(0, Math.min(1, intensity));
    return set.map((v) => RADIUS_CENTER_PCT + (v - RADIUS_CENTER_PCT) * k);
}

function formatRadii(values: readonly number[]): string {
    const fmt = (i: number) => `${values[i]!.toFixed(2)}%`;
    return `${fmt(0)} ${fmt(1)} ${fmt(2)} ${fmt(3)} / ${fmt(4)} ${fmt(5)} ${fmt(6)} ${fmt(7)}`;
}

/**
 * Smoothstep `3t² - 2t³` — the canonical cubic ease used as a cubic-bezier-ish
 * stand-in (CSS `cubic-bezier(0.5, 0, 0.5, 1)` is visually equivalent and
 * cheaper than evaluating a Bézier per frame).
 */
function smoothstep(t: number): number {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
}

/**
 * Oscillating `border-radius` value for the watercolor specimen. Returns a
 * `Readonly<Ref<string>>` formatted as `<h1> <h2> <h3> <h4> / <v1> <v2> <v3>
 * <v4>` (each component a percentage). PRM-gated: under reduced-motion the
 * value is the deterministic set-1 specimen and never advances.
 */
export function useWatercolorBlob(
    options?: UseWatercolorBlobOptions,
): Readonly<Ref<string>> {
    const seed = options?.seed ?? 1618;
    const intensity = options?.intensity ?? 1;
    const boilHz = options?.boilHz ?? DEFAULT_BOIL_HZ;

    const rng = mulberry32(seed);
    const setA = applyIntensity(randomRadiusSet(rng), intensity);
    const setB = applyIntensity(randomRadiusSet(rng), intensity);

    const borderRadius = ref(formatRadii(setA));

    const periodMs = 1000 / Math.max(1e-6, boilHz);
    const current = new Array<number>(8);

    // `useRAFLoop` with `respectReducedMotion: true` (default) pauses the
    // loop entirely under `prefers-reduced-motion: reduce` — the static
    // set-A specimen persists in `borderRadius.value`, no rAF traffic.
    useRAFLoop(
        (timing: RAFLoopTiming) => {
            const phase = (Date.now() / periodMs) % 1;
            // Triangle wave so we boil A→B→A continuously without a snap.
            const folded = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
            const eased = smoothstep(folded);
            for (let i = 0; i < 8; i++) {
                current[i] = setA[i]! + (setB[i]! - setA[i]!) * eased;
            }
            // Suppress unused warning while keeping the signature explicit.
            void timing;
            borderRadius.value = formatRadii(current);
        },
        { immediate: true },
    );

    return readonly(borderRadius) as Readonly<Ref<string>>;
}
