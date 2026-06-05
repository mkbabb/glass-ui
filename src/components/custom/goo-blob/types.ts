import type { InjectionKey } from "vue";

export type BlobMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

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

export interface MetaballSource {
    x: number;
    y: number;
    radius: number;
    opacity: number;
}

export type SatellitePhase = "orbiting" | "merging" | "absorbed" | "emerging";

export interface SatelliteInternal {
    phase: SatellitePhase;
    phaseStart: number;
    phaseDuration: number;

    timeOrigin: number;
    angularSpeed: number;
    phaseOffset: number;
    baseRadiusX: number;
    baseRadiusY: number;

    wobbleAmp1: number;
    wobbleFreq1: number;
    wobbleAmp2: number;
    wobbleFreq2: number;

    pertXAmp: number;
    pertXFreq: number;
    pertXPhase: number;
    pertYAmp: number;
    pertYFreq: number;
    pertYPhase: number;

    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

/** Externally tunable blob configuration — all fields concrete, defaults applied via `BLOB_CONFIG_DEFAULTS`. */
export interface BlobConfig {
    // Geometry
    canvasSize: number;
    bodyRadius: number;
    satelliteCount: number;
    satelliteRadius: number;
    orbitRadius: number;

    // Gooey
    smoothK: number;

    // Surface noise
    noiseAmp: number;
    noiseFreq: number;
    noiseSpeed: number;

    // Pulsation
    pulseFreq: number;
    pulseAmp: number;

    // Color perturbation
    hueRange: number;
    satShift: number;
    brightnessShift: number;
    colorNoiseFreq: number;
    colorNoiseSpeed: number;

    // Pointer
    pointerAttraction: number;
    pointerStrength: number;

    // Satellites
    eccentricity: number;
    orbitSpeedScale: number;
    wobbleScale: number;
    mergeRate: number;
    mergeDuration: number;
    absorbedDuration: [number, number];
    emergeDuration: number;
    orbitDuration: [number, number];
}

export const BLOB_CONFIG_DEFAULTS: BlobConfig = {
    canvasSize: 200,
    bodyRadius: 0.25,
    satelliteCount: 3,
    satelliteRadius: 0.13,
    orbitRadius: 0.35,

    smoothK: 0.22,

    noiseAmp: 0.025,
    noiseFreq: 3.5,
    noiseSpeed: 0.08,

    pulseFreq: 0.3,
    pulseAmp: 0.008,

    hueRange: 5,
    satShift: 0.0,
    brightnessShift: 0.0,
    colorNoiseFreq: 2.0,
    colorNoiseSpeed: 0.05,

    pointerAttraction: 0.0,
    pointerStrength: 0.08,

    eccentricity: 0.25,
    orbitSpeedScale: 1.0,
    wobbleScale: 1.0,
    mergeRate: 1.0,
    mergeDuration: 1800,
    absorbedDuration: [2000, 4000],
    emergeDuration: 2200,
    orbitDuration: [8000, 14000],
};

export const BLOB_CONFIG_KEY: InjectionKey<BlobConfig> = Symbol("blobConfig");
