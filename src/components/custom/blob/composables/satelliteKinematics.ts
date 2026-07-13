import {
    ORBIT_RANDOM_BASE,
    ORBIT_RANDOM_SPAN,
    SAT_WOBBLE1_BASE,
    SAT_WOBBLE1_SPAN,
    SAT_WOBBLE2_BASE,
    SAT_WOBBLE2_SPAN,
} from "../constants";
import type { SatelliteInternal } from "../types";

/**
 * The stateless satellite KINEMATICS leaf (BG.W-BLOB-KINEMATICS-LEAF) — the
 * orbit / eccentricity / wobble math carved out of `useBlobSatellites.ts`.
 *
 * Every function here is PURE: it takes the PRNG, the geometry, and the tempo
 * clock as EXPLICIT parameters and owns NO closure state, NO `SpringProgress`,
 * NO Vue reactivity, and NO module-level mutable state. The satellite pool +
 * the phase state-machine live in the driver (`useBlobSatellites.ts`), which
 * COMPOSES these — one writer of the satellite state (the driver), and the
 * kinematics math beside it (this leaf). The `rng` is passed IN, never owned:
 * the seed / reseed discipline stays with the stateful driver.
 */

function createSatellite(
    rng: () => number,
    index: number,
    orbitRadius: number,
    eccentricity: number,
    now: number,
): SatelliteInternal {
    // `now` is the canonical tempo-integrated clock (W11.c) — the satellite phase
    // timing rides the SAME clock the renderer scales by tempo, so pausing the
    // tempo freezes the satellites with no discontinuity.
    // Spread starts widely — full circle with large random offset
    const baseAngle = (index / 4) * Math.PI * 2 + (rng() - 0.5) * Math.PI;

    // BA.W-GOO-REDRESS (direction i) — the orbit envelope is RE-CENTERED + CAPPED
    // (×0.85..1.05, was ×0.8..1.2) so the worst-case satellite near-edge stays
    // within the widened smin band's reach (uploadBlobUniforms.ts) — the satellite
    // bridges across the WHOLE orbit, never floats as an unrelated disc.
    const baseR = orbitRadius * (ORBIT_RANDOM_BASE + rng() * ORBIT_RANDOM_SPAN);
    const ecc = eccentricity * (0.3 + rng() * 0.7);

    return {
        phase: "orbiting",
        phaseStart: now,
        phaseDuration: 6000 + rng() * 10000,

        timeOrigin: now,
        angularSpeed: 0.08 + rng() * 0.16,
        phaseOffset: baseAngle,
        baseRadiusX: baseR * (1 - ecc),
        baseRadiusY: baseR * (1 + ecc),

        wobbleAmp1: SAT_WOBBLE1_BASE + rng() * SAT_WOBBLE1_SPAN,
        wobbleFreq1: 0.08 + rng() * 0.22,
        wobbleAmp2: SAT_WOBBLE2_BASE + rng() * SAT_WOBBLE2_SPAN,
        wobbleFreq2: 0.18 + rng() * 0.32,

        pertXAmp: 0.03 + rng() * 0.05,
        pertXFreq: 0.06 + rng() * 0.18,
        pertXPhase: rng() * Math.PI * 2,
        pertYAmp: 0.03 + rng() * 0.05,
        pertYFreq: 0.07 + rng() * 0.17,
        pertYPhase: rng() * Math.PI * 2,

        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,

        // BD.W-GOOBLOB-MERCURY-COLONY — born NOT fissioning (the calm bonded breath).
        fissioning: false,
        snapFired: false,
    };
}

function orbitPos(
    s: SatelliteInternal,
    now: number,
    orbitSpeedScale: number,
    wobbleScale: number,
): { x: number; y: number } {
    const t = (now - s.timeOrigin) / 1000;
    // Mood drives the orbit (W11.c): orbitSpeedScale speeds/slows the orbital
    // sweep; wobbleScale fattens/calms the radial wobble. excited = faster + more
    // wobble, sleepy = slow + calm.
    const angle = s.angularSpeed * orbitSpeedScale * t + s.phaseOffset;
    const wobble =
        wobbleScale *
        (s.wobbleAmp1 * Math.sin(s.wobbleFreq1 * t) +
            s.wobbleAmp2 * Math.sin(s.wobbleFreq2 * t + 1.3));
    return {
        x:
            (s.baseRadiusX + wobble) * Math.cos(angle) +
            s.pertXAmp * Math.sin(s.pertXFreq * t + s.pertXPhase),
        y:
            (s.baseRadiusY + wobble) * Math.sin(angle) +
            s.pertYAmp * Math.cos(s.pertYFreq * t + s.pertYPhase),
    };
}

function randomizeOrbit(
    s: SatelliteInternal,
    rng: () => number,
    orbitRadius: number,
    eccentricity: number,
    now: number,
) {
    s.timeOrigin = now;
    s.angularSpeed = 0.08 + rng() * 0.16;
    s.phaseOffset = rng() * Math.PI * 2;
    // BA.W-GOO-REDRESS (direction i) — the SAME capped orbit envelope on the orbit
    // re-randomize (the create + re-randomize sites read ONE source so a fresh
    // orbit never re-inflates past the band reach).
    const baseR = orbitRadius * (ORBIT_RANDOM_BASE + rng() * ORBIT_RANDOM_SPAN);
    const ecc = eccentricity * (0.3 + rng() * 0.7);
    s.baseRadiusX = baseR * (1 - ecc);
    s.baseRadiusY = baseR * (1 + ecc);
    s.wobbleAmp1 = SAT_WOBBLE1_BASE + rng() * SAT_WOBBLE1_SPAN;
    s.wobbleFreq1 = 0.08 + rng() * 0.22;
    s.wobbleAmp2 = SAT_WOBBLE2_BASE + rng() * SAT_WOBBLE2_SPAN;
    s.wobbleFreq2 = 0.18 + rng() * 0.32;
    s.pertXAmp = 0.03 + rng() * 0.05;
    s.pertXFreq = 0.06 + rng() * 0.18;
    s.pertXPhase = rng() * Math.PI * 2;
    s.pertYAmp = 0.03 + rng() * 0.05;
    s.pertYFreq = 0.07 + rng() * 0.17;
    s.pertYPhase = rng() * Math.PI * 2;
}

export { createSatellite, orbitPos, randomizeOrbit };
