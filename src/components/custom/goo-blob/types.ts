import type { InjectionKey } from "vue";

export type BlobMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

/** Smin merge variant — `quadratic` (cheap, creased) | `circular` (rounder menisci). */
export type BlobMerge = "quadratic" | "circular";

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
    /** Mood-driven iridescence/SSS intensity multiplier (excited > 1, sleepy < 1). */
    iridScale: number;
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

    // Master tempo (W11.c) — ONE scalar multiplying every INTEGRATED dt
    // (mood.tick, the spring step, orbit/phase advance, noise scroll). `tempo=0`
    // freezes (the dock pause / PRM set it). Default 1.0 (real-time).
    tempo: number;

    // Gooey
    smoothK: number;
    /** Smin merge variant — `quadratic` (default) | `circular` (rounder menisci). */
    merge: BlobMerge;

    // Surface noise
    noiseAmp: number;
    noiseFreq: number;
    noiseSpeed: number;
    /**
     * Domain-warp strength on the FBM edge displacement (0 = plain fbm, the
     * pre-warp look; ~0.6 = a marbled organic membrane). Taste-first low default.
     */
    warpAmp: number;

    // Pulsation
    pulseFreq: number;
    pulseAmp: number;

    // Color perturbation
    hueRange: number;
    satShift: number;
    brightnessShift: number;
    colorNoiseFreq: number;
    colorNoiseSpeed: number;

    // Multi-stop palette (W11.b) — 2-4 in-family CSS color stops distributed across
    // body + satellites. EMPTY (default) falls back to the single `color` base (zero
    // regression). Derive one from a seed via `deriveBlobPalette` (`/color`).
    paletteStops: string[];

    // Iridescence + fake-SSS (W11.a) — translucent-gel read. Taste-first low
    // defaults (warm-pearl sheen, not garish thin-film).
    /** Warm-pearl rim sheen weight (0 = off). */
    iridescence: number;
    /** Base hue (degrees) the warm-biased cosine palette centres on. */
    iridHue: number;
    /** Animated-thickness scroll speed for the iridescent shimmer. */
    iridSpeed: number;
    /** Fast-SSS back-light weight. */
    sssScale: number;
    /** Fast-SSS exponent. */
    sssPower: number;
    /** Thickness-driven inner-luminosity (core glow) lift. */
    coreGlow: number;

    // Lit glass surface (W9.b) — Blinn-Phong glint + Fresnel rim. `lit` gates the
    // whole block (default OFF = flat fill, zero regression for existing consumers).
    lit: boolean;
    /** CSS color for the Fresnel rim tint (resolved through the ColorResolver). */
    rimColor: string;
    /** Light direction [x, y, z] (normalized in-shader). */
    lightDir: [number, number, number];
    specStrength: number;
    /** Specular exponent (16-64 — a tight glint). */
    specShininess: number;
    /** Fresnel/Schlick exponent (~2-3). */
    rimPower: number;
    rimStrength: number;

    // Pointer
    pointerAttraction: number;
    pointerStrength: number;
    /** Velocity-driven volume-preserving squash-and-stretch magnitude (0 = off). */
    stretch: number;
    /** Click spring-impulse amplitude (a one-shot bouncy pulse on the body radius). */
    clickImpulse: number;

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

    tempo: 1.0,

    // `smoothK` is now a TRUE blend-band in the shader's UV space (the smin is
    // IQ-normalized — `k *= 4.0` — so the band == k; the old `/0.22` normalizer is
    // gone). ~0.12 reads as a wet, rounded meniscus at the body/satellite seam.
    smoothK: 0.12,
    merge: "quadratic",

    noiseAmp: 0.025,
    noiseFreq: 3.5,
    noiseSpeed: 0.08,
    warpAmp: 0.0,

    pulseFreq: 0.3,
    pulseAmp: 0.008,

    hueRange: 5,
    satShift: 0.0,
    brightnessShift: 0.0,
    colorNoiseFreq: 2.0,
    colorNoiseSpeed: 0.05,
    paletteStops: [],

    iridescence: 0.0,
    iridHue: 85,
    iridSpeed: 0.06,
    sssScale: 0.0,
    sssPower: 2.0,
    coreGlow: 0.0,

    lit: false,
    rimColor: "var(--foreground)",
    lightDir: [0.4, 0.7, 0.6],
    specStrength: 0.9,
    specShininess: 32,
    rimPower: 2.5,
    rimStrength: 0.5,

    // Non-zero so hover is felt out of the box (W10): a small lean-IN toward the
    // cursor. Negative shies away; the shader honors the sign.
    pointerAttraction: 0.35,
    pointerStrength: 0.08,
    stretch: 0.4,
    clickImpulse: 0.5,

    eccentricity: 0.25,
    orbitSpeedScale: 1.0,
    wobbleScale: 1.0,
    mergeRate: 1.0,
    mergeDuration: 1800,
    absorbedDuration: [2000, 4000],
    emergeDuration: 2200,
    orbitDuration: [8000, 14000],
};

// di-default: external-provide key — consumers `provide(BLOB_CONFIG_KEY, cfg)`
// and `<GooBlob>` reads it via a bare `inject(KEY, null)` fallthrough (the
// `config` prop wins; the loud-throw on neither is DEC-AT-2). NOT a
// strict-or-optional triplet, so it is not minted by the DI factory (KISS).
export const BLOB_CONFIG_KEY: InjectionKey<BlobConfig> = Symbol("blobConfig");
