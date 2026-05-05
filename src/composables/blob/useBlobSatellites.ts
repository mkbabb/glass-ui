// Satellite state machine for the canon Blob primitive.
//
// Per-satellite phases: orbiting → merging → absorbed → emerging →
// orbiting. State is seeded by `mulberry32(seed + i + 1)` so SSR + first
// hydration tick produce matching frames; the body source uses
// `seed + 0`.
//
// SPEC.md §6 ("Satellite state machine").

import { readonly, ref, watchEffect, type Ref } from "vue";

import { mulberry32 } from "../utils/mulberry32";
import type { BlobConfig, MetaballSource } from "./types";
import type { MoodParams } from "./useBlobMood";

type Phase = "orbiting" | "merging" | "absorbed" | "emerging";

interface SatelliteState {
    /** Current phase. Mutates as the satellite cycles. */
    phase: Phase;
    /** Time (ms) the current phase began. */
    phaseStartMs: number;
    /** Per-satellite time offset for the orbital parametric. */
    timeOriginMs: number;
    /** Per-satellite phase offset around the ellipse, in radians. */
    phaseOffset: number;
    /** Wobble overtone amplitude multiplier (PRNG-seeded, 0..1). */
    wobbleAmpN: number;
    /** Surface-perturbation amplitude multiplier (PRNG-seeded, 0..1). */
    pertNAmpN: number;
    /** Orbital coordinate at phase start (NDC). */
    startX: number;
    startY: number;
    /** Orbital coordinate at phase end (NDC). */
    endX: number;
    endY: number;
    /** Active duration of the current phase (ms). */
    phaseDurationMs: number;
    /** Stable PRNG generator owned by this satellite. */
    rng: () => number;
}

const TWO_PI = Math.PI * 2;
/** Cap matches GLSL `uniform vec4 uSources[8]`. */
const MAX_SOURCES = 8;

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function clamp(n: number, lo: number, hi: number): number {
    return Math.max(lo, Math.min(hi, n));
}

function pickFromRange(rng: () => number, range: readonly [number, number]): number {
    return range[0] + (range[1] - range[0]) * rng();
}

function freshOrbitTarget(
    rng: () => number,
    orbitRadius: number,
    eccentricity: number,
): { x: number; y: number } {
    // Drop the satellite somewhere on the orbital ellipse so the emerge
    // lerp lands on a believable orbital frame.
    const angle = rng() * TWO_PI;
    const radius = orbitRadius * (1 - eccentricity * 0.5);
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * (1 - eccentricity),
    };
}

function newSatellite(
    seed: number,
    index: number,
    config: Required<BlobConfig>,
    initialTimeMs: number,
): SatelliteState {
    const rng = mulberry32(seed + index + 1);
    const target = freshOrbitTarget(rng, config.orbitRadius, config.eccentricity);
    return {
        phase: "orbiting",
        phaseStartMs: initialTimeMs,
        timeOriginMs: rng() * 10_000,
        phaseOffset: rng() * TWO_PI,
        wobbleAmpN: rng(),
        pertNAmpN: rng(),
        startX: target.x,
        startY: target.y,
        endX: target.x,
        endY: target.y,
        phaseDurationMs: pickFromRange(rng, config.orbitDuration),
        rng,
    };
}

function orbitalPosition(
    sat: SatelliteState,
    config: Required<BlobConfig>,
    mood: MoodParams,
    pointer: { x: number; y: number },
    timeMs: number,
): { x: number; y: number } {
    const elapsed = (timeMs - sat.timeOriginMs) / 1000;
    const baseAngularVelocity =
        TWO_PI / ((config.orbitDuration[0] + config.orbitDuration[1]) / 2 / 1000);
    const omega = baseAngularVelocity * config.orbitSpeedScale * mood.orbitSpeedScale;
    const angle = sat.phaseOffset + elapsed * omega;

    const a = config.orbitRadius;
    const b = config.orbitRadius * (1 - config.eccentricity);
    let x = Math.cos(angle) * a;
    let y = Math.sin(angle) * b;

    // Wobble overtones — second harmonic at lower amplitude. Mood +
    // per-satellite amplitude both contribute.
    const wobbleAmp = 0.04 * config.wobbleScale * mood.wobbleScale * (0.5 + sat.wobbleAmpN * 0.5);
    x += Math.cos(angle * 2 + sat.phaseOffset) * wobbleAmp;
    y += Math.sin(angle * 2 + sat.phaseOffset) * wobbleAmp;

    // Pointer attraction — pull toward the pointer-NDC by both the
    // config strength and the active mood multiplier.
    const attract = config.pointerAttraction * config.pointerStrength * mood.pointerAttraction;
    x += pointer.x * attract;
    y += pointer.y * attract;

    return { x, y };
}

function transitionPhase(sat: SatelliteState, config: Required<BlobConfig>, timeMs: number): void {
    switch (sat.phase) {
        case "orbiting": {
            // Merge into the body.
            sat.startX = sat.endX;
            sat.startY = sat.endY;
            sat.endX = 0;
            sat.endY = 0;
            sat.phase = "merging";
            sat.phaseDurationMs = config.mergeDuration;
            break;
        }
        case "merging": {
            sat.phase = "absorbed";
            sat.phaseDurationMs = pickFromRange(sat.rng, config.absorbedDuration);
            break;
        }
        case "absorbed": {
            // Emerge to a fresh orbital target.
            const target = freshOrbitTarget(sat.rng, config.orbitRadius, config.eccentricity);
            sat.startX = 0;
            sat.startY = 0;
            sat.endX = target.x;
            sat.endY = target.y;
            sat.phase = "emerging";
            sat.phaseDurationMs = config.emergeDuration;
            break;
        }
        case "emerging": {
            sat.phase = "orbiting";
            sat.phaseDurationMs = pickFromRange(sat.rng, config.orbitDuration);
            break;
        }
    }
    sat.phaseStartMs = timeMs;
}

interface ResolvedSatellite {
    x: number;
    y: number;
    radius: number;
    opacity: number;
}

function resolveSatellite(
    sat: SatelliteState,
    config: Required<BlobConfig>,
    mood: MoodParams,
    pointer: { x: number; y: number },
    timeMs: number,
): ResolvedSatellite {
    const phaseElapsed = timeMs - sat.phaseStartMs;
    const phaseProgress = clamp(phaseElapsed / Math.max(1, sat.phaseDurationMs), 0, 1);

    switch (sat.phase) {
        case "orbiting": {
            const pos = orbitalPosition(sat, config, mood, pointer, timeMs);
            // Snapshot for the next merge.
            sat.endX = pos.x;
            sat.endY = pos.y;
            return {
                x: pos.x,
                y: pos.y,
                radius: config.satelliteRadius,
                opacity: 1,
            };
        }
        case "merging": {
            return {
                x: lerp(sat.startX, 0, phaseProgress),
                y: lerp(sat.startY, 0, phaseProgress),
                radius: config.satelliteRadius * (1 - phaseProgress * 0.4),
                opacity: 1,
            };
        }
        case "absorbed": {
            return {
                x: 0,
                y: 0,
                radius: 0,
                opacity: 0,
            };
        }
        case "emerging": {
            return {
                x: lerp(0, sat.endX, phaseProgress),
                y: lerp(0, sat.endY, phaseProgress),
                radius: config.satelliteRadius * (0.6 + phaseProgress * 0.4),
                opacity: 1,
            };
        }
    }
}

/**
 * Reactive list of `MetaballSource`s for the renderer: index 0 is the
 * pulsing body, indices 1..N are satellites with the four-phase state
 * machine. Output capped at 8 sources to match the GLSL uniform array.
 *
 * `currentTime` is the time driver — the consumer (typically the `useBlob`
 * facade) advances it inside its rAF loop. The composable does not own
 * its own rAF.
 *
 * SPEC.md §6 ("Satellite state machine").
 */
export function useBlobSatellites(
    config: Ref<Required<BlobConfig>>,
    mood: Ref<MoodParams>,
    pointerForce: Ref<{ x: number; y: number }>,
    seed: number,
    currentTime: Ref<number>,
): Readonly<Ref<MetaballSource[]>> {
    const initialTime = currentTime.value;

    // Body PRNG (seed + 0). Reserved for future body-specific perturbation;
    // currently the body uses deterministic golden-ratio constants.
    void mulberry32(seed);

    // Per-satellite mutable state — recomputed when the satellite count
    // changes, otherwise persistent across frames so phase progression is
    // continuous.
    let states: SatelliteState[] = [];
    let lastCount = -1;
    let lastSeed = seed;

    function rebuildIfNeeded(): void {
        const desired = clamp(config.value.satelliteCount, 0, MAX_SOURCES - 1);
        if (desired === lastCount && lastSeed === seed) return;
        states = Array.from({ length: desired }, (_, i) =>
            newSatellite(seed, i, config.value, initialTime),
        );
        lastCount = desired;
        lastSeed = seed;
    }

    rebuildIfNeeded();

    const sources = ref<MetaballSource[]>([]);

    function recompute(): void {
        const cfg = config.value;
        const m = mood.value;
        const pointer = pointerForce.value;
        const t = currentTime.value;

        const desired = clamp(cfg.satelliteCount, 0, MAX_SOURCES - 1);
        if (desired !== lastCount) {
            rebuildIfNeeded();
        }

        // Body — pulse modulated by mood frequency + amplitude.
        const pulseT = (TWO_PI * m.pulseFreq * t) / 1000;
        const bodyRadius = cfg.bodyRadius * (1 + m.pulseAmp * Math.sin(pulseT));
        const result: MetaballSource[] = [
            { x: 0, y: 0, radius: bodyRadius, opacity: 1 },
        ];

        // Satellites — advance phases, then resolve positions.
        for (const sat of states) {
            // Honor mood.mergeRate by scaling effective elapsed time
            // against the orbiting phase only. Other phases are not
            // accelerated to avoid breaking the merge/emerge animations.
            const effectiveDuration =
                sat.phase === "orbiting"
                    ? sat.phaseDurationMs / Math.max(0.01, cfg.mergeRate * m.mergeRate)
                    : sat.phaseDurationMs;
            if (t - sat.phaseStartMs >= effectiveDuration) {
                transitionPhase(sat, cfg, t);
            }
            const resolved = resolveSatellite(sat, cfg, m, pointer, t);
            if (resolved.opacity > 0 && result.length < MAX_SOURCES) {
                result.push(resolved);
            }
        }

        sources.value = result;
    }

    // Recompute on any reactive dependency change. `currentTime` is the
    // primary driver; config/mood/pointer changes also invalidate the
    // last computed snapshot. The initial run paints `t = currentTime
    // .value` so SSR-equivalent first frames are deterministic before
    // any rAF tick.
    watchEffect(() => {
        recompute();
    });

    return readonly(sources) as Readonly<Ref<MetaballSource[]>>;
}
