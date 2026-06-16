import { mulberry32, hashString } from "../../../../utils/prng";
import {
    BASE_OPACITY,
    MERGE_STAGGER_MS,
    ORBIT_BLEND_MS,
    ORBIT_RANDOM_BASE,
    ORBIT_RANDOM_SPAN,
    SAT_WOBBLE1_BASE,
    SAT_WOBBLE1_SPAN,
    SAT_WOBBLE2_BASE,
    SAT_WOBBLE2_SPAN,
} from "../constants";
import { easeIn, easeOut } from "./easing";
import type {
    BlobConfig,
    MetaballSource,
    MoodParams,
    SatelliteInternal,
    SatellitePhase,
} from "../types";

function randRange(rng: () => number, lo: number, hi: number): number {
    return lo + rng() * (hi - lo);
}

function clamp01(t: number): number {
    return t < 0 ? 0 : t > 1 ? 1 : t;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

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
    };
}

function setPhase(
    s: SatelliteInternal,
    phase: SatellitePhase,
    now: number,
    duration: number,
) {
    s.phase = phase;
    s.phaseStart = now;
    s.phaseDuration = duration;
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

/**
 * The satellite system — a small pool of orbiting metaball sources that
 * periodically merge into the body, get absorbed, then re-emerge on a fresh
 * orbit. Deterministic given `initialColor` (seeds the PRNG); `reseed` rekeys it.
 */
export function useBlobSatellites(config: BlobConfig, initialColor: string) {
    let rng = mulberry32(hashString(initialColor + "goo"));
    const internals: SatelliteInternal[] = [];
    const sources: MetaballSource[] = [];

    // Per-satellite: the position where orbit began, for blending
    const orbitBlendOrigins: { x: number; y: number; start: number }[] = [];

    let lastMergeTime = -Infinity;
    let lastOrbitRadius = config.geometry.orbitRadius;

    function syncOrbitRadius() {
        const cur = config.geometry.orbitRadius;
        if (cur !== lastOrbitRadius && lastOrbitRadius > 0) {
            const scale = cur / lastOrbitRadius;
            for (const s of internals) {
                s.baseRadiusX *= scale;
                s.baseRadiusY *= scale;
            }
            lastOrbitRadius = cur;
        }
    }

    function syncCount(now: number) {
        const count = config.geometry.satelliteCount;
        while (internals.length < count) {
            internals.push(
                createSatellite(
                    rng,
                    internals.length,
                    config.geometry.orbitRadius,
                    config.geometry.eccentricity,
                    now,
                ),
            );
            sources.push({ x: 0, y: 0, radius: config.geometry.satelliteRadius, opacity: 0 });
            orbitBlendOrigins.push({ x: 0, y: 0, start: 0 });
        }
        if (internals.length > count) {
            internals.length = count;
            sources.length = count;
            orbitBlendOrigins.length = count;
        }
    }

    // The satellites are seeded on the FIRST tick (which carries the canonical
    // tempo clock), NOT at construction — so their phase clocks share the renderer's
    // tempo-integrated `now` base rather than `performance.now()` (W11.c).

    function tick(now: number, mood: MoodParams) {
        syncCount(now);
        syncOrbitRadius();

        const count = internals.length;
        const mergeRateScale = mood.mergeRate;
        const satelliteRadius = config.geometry.satelliteRadius;
        const mergeDuration = config.satellites.mergeDuration;
        const emergeDuration = config.satellites.emergeDuration;
        const orbitDuration = config.satellites.orbitDuration;
        const absorbedDuration = config.satellites.absorbedDuration;

        for (let i = 0; i < count; i++) {
            const s = internals[i]!;
            const elapsed = now - s.phaseStart;
            const t = clamp01(s.phaseDuration > 0 ? elapsed / s.phaseDuration : 1);

            switch (s.phase) {
                case "orbiting": {
                    if (t >= 1) {
                        if (now - lastMergeTime < MERGE_STAGGER_MS * mergeRateScale) {
                            s.phaseStart = now;
                            s.phaseDuration = randRange(rng, orbitDuration[0], orbitDuration[1]);
                        } else {
                            const pos = orbitPos(s, now, mood.orbitSpeedScale, mood.wobbleScale);
                            s.startX = pos.x;
                            s.startY = pos.y;
                            const dist = Math.hypot(pos.x, pos.y);
                            const sc = dist > 0.01 ? 0.08 / dist : 0;
                            s.endX = pos.x * sc;
                            s.endY = pos.y * sc;
                            setPhase(s, "merging", now, mergeDuration);
                            lastMergeTime = now;
                        }
                    }
                    break;
                }
                case "merging": {
                    if (t >= 1) {
                        setPhase(
                            s,
                            "absorbed",
                            now,
                            randRange(rng, absorbedDuration[0], absorbedDuration[1]),
                        );
                    }
                    break;
                }
                case "absorbed": {
                    if (t >= 1) {
                        // New orbit — emerge toward a point on it
                        randomizeOrbit(s, rng, config.geometry.orbitRadius, config.geometry.eccentricity, now);
                        const futurePos = orbitPos(s, now + 3000, mood.orbitSpeedScale, mood.wobbleScale);
                        s.endX = futurePos.x;
                        s.endY = futurePos.y;
                        const dist = Math.hypot(futurePos.x, futurePos.y);
                        const sc = dist > 0.01 ? 0.08 / dist : 0;
                        s.startX = futurePos.x * sc;
                        s.startY = futurePos.y * sc;
                        setPhase(s, "emerging", now, emergeDuration);
                    }
                    break;
                }
                case "emerging": {
                    if (t >= 1) {
                        // Begin orbit — store emerge endpoint for blending
                        const blend = orbitBlendOrigins[i]!;
                        blend.x = s.endX;
                        blend.y = s.endY;
                        blend.start = now;
                        // Set timeOrigin so orbit starts from now
                        s.timeOrigin = now;
                        // Compute phaseOffset so the orbit direction roughly matches
                        s.phaseOffset = Math.atan2(s.endY, s.endX);
                        setPhase(
                            s,
                            "orbiting",
                            now,
                            randRange(rng, orbitDuration[0], orbitDuration[1]),
                        );
                    }
                    break;
                }
            }

            // Compute output position and opacity
            let x: number, y: number, opacity: number, scale: number;

            switch (s.phase) {
                case "orbiting": {
                    const pos = orbitPos(s, now, mood.orbitSpeedScale, mood.wobbleScale);
                    // Smooth blend from emerge endpoint into orbit over ORBIT_BLEND_MS
                    const blend = orbitBlendOrigins[i]!;
                    const blendElapsed = now - blend.start;
                    if (blend.start > 0 && blendElapsed < ORBIT_BLEND_MS) {
                        const bt = clamp01(blendElapsed / ORBIT_BLEND_MS);
                        const ease = bt * bt * (3 - 2 * bt); // smoothstep
                        x = lerp(blend.x, pos.x, ease);
                        y = lerp(blend.y, pos.y, ease);
                    } else {
                        x = pos.x;
                        y = pos.y;
                    }
                    opacity = BASE_OPACITY;
                    scale = 1;
                    break;
                }
                case "merging": {
                    const ease = easeIn(clamp01((now - s.phaseStart) / s.phaseDuration));
                    x = lerp(s.startX, s.endX, ease);
                    y = lerp(s.startY, s.endY, ease);
                    const mt = clamp01((now - s.phaseStart) / s.phaseDuration);
                    opacity = mt > 0.85 ? lerp(BASE_OPACITY, 0, (mt - 0.85) / 0.15) : BASE_OPACITY;
                    scale = lerp(1, 0.65, ease);
                    break;
                }
                case "absorbed": {
                    x = 0;
                    y = 0;
                    opacity = 0;
                    scale = 0.5;
                    break;
                }
                case "emerging": {
                    const ease = easeOut(clamp01((now - s.phaseStart) / s.phaseDuration));
                    x = lerp(s.startX, s.endX, ease);
                    y = lerp(s.startY, s.endY, ease);
                    const et = clamp01((now - s.phaseStart) / s.phaseDuration);
                    opacity = et < 0.1 ? lerp(0, BASE_OPACITY, et / 0.1) : BASE_OPACITY;
                    scale = lerp(0.65, 1, ease);
                    break;
                }
            }

            const src = sources[i]!;
            src.x = x;
            src.y = y;
            src.radius = satelliteRadius * scale;
            src.opacity = opacity;
        }
    }

    function nudge() {
        for (const s of internals) {
            s.phaseOffset += (rng() - 0.5) * 0.6;
            s.pertXPhase += rng() * Math.PI;
            s.pertYPhase += rng() * Math.PI;
        }
    }

    function reseed(color: string) {
        rng = mulberry32(hashString(color + "goo"));
    }

    /**
     * AX.W16 (arm 2) — the satellite system is QUIESCENT (the quiescence loop may park)
     * when NO satellite is mid-TRANSITION — i.e. none is `merging`, `absorbed`, or
     * `emerging`. Those phases are the per-frame morph events (the gooey merge in, the
     * re-emergence) that demand continuous render; a steady `orbiting` satellite is the
     * slow ambient sweep the loop parks between, re-arming at the next phase boundary
     * via `nextEventMs`. (The spec's at-rest condition: "no satellite is mid-merge".)
     */
    function isQuiescent(): boolean {
        for (const s of internals) {
            if (s.phase !== "orbiting") return false;
        }
        return true;
    }

    /**
     * AX.W16 (arm 2) — the soonest upcoming phase-boundary across all satellites, in
     * the SAME tempo-integrated clock `tick` is driven by. The renderer's wake
     * scheduler re-arms the parked loop at this horizon so the next orbit→merge
     * transition animates on time (the demand-loop wake, not a poll). Returns the min
     * `phaseStart + phaseDuration` over the pool; `now + a long idle ceiling` when the
     * pool is empty (a satellite-less blob has no phase events).
     */
    function nextEventMs(now: number): number {
        let soonest = Infinity;
        for (const s of internals) {
            const end = s.phaseStart + s.phaseDuration;
            if (end < soonest) soonest = end;
        }
        return soonest === Infinity ? now + 30_000 : soonest;
    }

    return { sources, tick, nudge, reseed, isQuiescent, nextEventMs };
}

export type BlobSatelliteSystem = ReturnType<typeof useBlobSatellites>;
