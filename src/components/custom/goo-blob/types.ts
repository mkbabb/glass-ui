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
    // ── Geometry cohort, re-derived as ONE footprint budget (AX.W15 F0) ──────────
    //
    // The wrapper footprint is the HARD visual bound. The coordinate chain: the
    // full-canvas quad makes `uv ∈ [-0.5, 0.5]` across the CANVAS; the canvas is
    // CSS-sized 160% of the wrapper (GooBlob.vue), so the wrapper edge sits at
    // `±0.5 × (1/1.6) = ±0.3125` in `uv` — the wrapper HALF-EXTENT is 0.3125 uv.
    // Every length uniform rides `POS_SCALE = 0.625` (useMetaballRenderer.ts), so a
    // raw config radius `r` paints at `r × 0.625` uv and reads as
    // `r × 0.625 / 0.3125 = r × 2.0` of the wrapper half.
    //
    // The budget (the SOTA-deepening [25] atomic sum): solve
    // `body + orbit + satellite + smin_band` TOGETHER so the merged field fits
    // ~70-80% of the wrapper, with the orbit EXCURSION the only intentional overflow.
    // The smin band is INVISIBLE to a raw-radius budget — IQ's kernel expands the
    // isosurface OUTWARD of the union by ~k, so it MUST be counted. At idle the band
    // is `smoothK × moodMult(≈1.03) ≈ 0.0515` raw. The W08 over-merge was tuned
    // against the OLD flooded field; this is the contained re-solve:
    //   body  0.22 → 0.54 wrapper-half (radius) — a generous, fully-contained bead.
    //   orbit 0.27 + sat 0.105 = 0.375 outer reach → 0.75 wrapper-half at rest; the
    //         wobble/eccentricity carries the widest excursion to ~0.86 (the
    //         intended orbit overflow, which the 160% canvas margin absorbs).
    //   body + smin (0.22 + 0.0515) → 0.54 wrapper-half — the bead clears the rim
    //         with a transparent margin on ALL FOUR sides (W08 left top/bottom
    //         touching; this is the four-side containment).
    // This is a SINGLE atomic re-derivation of the length cohort DOWN against the
    // footprint, not a per-constant nudge, and it KEEPS W08's POS_SCALE regime
    // untouched (the ratified disposition — §4 note 13).
    bodyRadius: 0.22,
    satelliteCount: 3,
    satelliteRadius: 0.105,
    orbitRadius: 0.27,

    tempo: 1.0,

    // `smoothK` is the smin blend-band in the shader's UV space (half-extent 0.5).
    // The smin is IQ-normalized (`k *= 4.0`) so the seam dip at a==b is EXACTLY the
    // uploaded k. The renderer composes the upload as `smoothK × moodMult × POS_SCALE`
    // (POS_SCALE = 1/1.6 = 0.625 — the smin band rides the same inner-region
    // compression as every other length-like uniform). At idle (moodMult ≈ 1.0) that
    // is 0.05 × 1.0 × 0.625 ≈ 0.031 of seam-pull — a tight, wet, rounded meniscus
    // (matching the pre-AW oracle's 0.034). Higher floods (smaller is crisper): the
    // 0.864-effective slab the un-normalized 0.12 produced after the `k *= 4.0`
    // regime change is the AW.W9 over-merge this default re-solves.
    smoothK: 0.05,
    merge: "quadratic",

    // ── Living-but-calm membrane (AX.W15 F3) ─────────────────────────────────────
    //
    // Once the body is CONTAINED, the warped-FBM watercolor edge resurfaces. The
    // displacement is tied to the new (smaller) body so the wobble stays
    // PROPORTIONAL: at idle the shader paints `±0.5 × noiseAmp × (moodNoise/0.025) ×
    // POS_SCALE ≈ ±0.011 uv` on a `0.1375 uv` body radius — an ~8% organic wobble, a
    // calm living membrane rather than the dead geometric arc (`warpAmp:0.0` shipped
    // a clean circle). `warpAmp` turns ON at a calm 0.35 floor so the domain-warped
    // marbling reads (the FBM lacunarity/persistence is tuned toward the LIQUID band
    // in watercolor-edges.glsl.ts — ~1.8 / ~0.42, not terrain-grade). `noiseFreq`
    // stays 3.5 (proportional to the body scale).
    noiseAmp: 0.038,
    noiseFreq: 3.5,
    noiseSpeed: 0.08,
    warpAmp: 0.35,

    pulseFreq: 0.3,
    pulseAmp: 0.008,

    hueRange: 5,
    satShift: 0.0,
    brightnessShift: 0.0,
    colorNoiseFreq: 2.0,
    colorNoiseSpeed: 0.05,
    paletteStops: [],

    // ── Lit warm-glass droplet, the DEFAULT identity (AX.W15 F1) ─────────────────
    //
    // A greenfield product's canonical look IS the SOTA look — the "zero regression"
    // OFF-by-default flag-gating is DELETED as the legacy/fallback path the §0 mandate
    // forbids. The lit dome (curved-rim Fresnel + Blinn-Phong glint), warm-pearl
    // iridescence, a fast-SSS floor and a low core-glow ALL execute correctly and were
    // swamped only by the over-sized field — containment (F0) resurfaces them. The
    // floors are LOW and TASTEFUL (a wet warm-cream bead, not a garish neon thin-film):
    // a warm-pearl sheen, a thin translucent rim, a faint inner luminosity.
    iridescence: 0.18,
    iridHue: 85,
    iridSpeed: 0.06,
    sssScale: 0.2,
    sssPower: 2.0,
    coreGlow: 0.1,

    lit: true,
    rimColor: "var(--foreground)",
    lightDir: [0.4, 0.7, 0.6],
    specStrength: 0.9,
    specShininess: 32,
    rimPower: 2.5,
    rimStrength: 0.5,

    // ── Interaction magnitudes, re-balanced against the contained body (AX.W15 F2) ─
    //
    // NO new interaction code — containment alone makes the EXISTING wired
    // spring/trail/squash/click legible (the W10/W11 work was swamped by the
    // over-sized field). The magnitudes were tuned against the OVERSIZED body; the
    // new bead is smaller, so the lean now READS — `pointerStrength` lifts to 0.11
    // for a clearly-felt lean toward the cursor WITHIN the footprint, `stretch` to
    // 0.5 so a flick squashes visibly, and `clickImpulse` stays a bouncy 0.5. The
    // trail pseudopod radius is driven off `satelliteRadius` (now 0.105) in the
    // renderer, so it tapers proportionally to the smaller body with no extra knob.
    pointerAttraction: 0.35,
    pointerStrength: 0.11,
    stretch: 0.5,
    clickImpulse: 0.5,

    eccentricity: 0.22,
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
