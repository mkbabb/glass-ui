import type { InjectionKey } from "vue";

export type BlobMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

/** Smin merge variant — `quadratic` (cheap, creased) | `circular` (rounder menisci). */
export type BlobMerge = "quadratic" | "circular";

/**
 * Render-quality axis (AX.W16) — `full` (default) renders the metaball pass at the
 * clamped DPR; `half` renders the backing store at HALF resolution and lets the
 * browser bilinear-upsample on composite (~4× fragment savings for weak GPUs — the
 * blob is the ideal candidate: the soft FBM/AA edge hides the interpolation).
 */
export type BlobQuality = "full" | "half";

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

// ── The BlobConfig ATOM set (AY.W-BLOB2 — the "simplify the options set to atoms"
//    discipline, mirroring the aurora seed/harmony/mood/medium/zones/motion door).
//
// The flat ~50-knob surface is collapsed to EIGHT top-level atoms: every tunable
// length/weight/duration lives BEHIND the atom it belongs to (J §6.3 "the variant IS
// the bundle"), so a consumer reaches for ONE cohesive cluster (`geometry`, `surface`,
// `membrane`, …) rather than scanning a flat sibling list of ~50 knobs. The three
// derived-but-unread fields the AX synthesis flagged (`orbitSpeedScale`, `wobbleScale`,
// `mergeRate`) are DELETED — they were config-level identity no-ops (read only off the
// mood `MoodParams`, never off the config), so the prune is a clean deletion-proof. The
// MoodParams interface above and the SatelliteInternal per-satellite state below are
// INTERNAL derived state, NOT the public atom surface.

/** Body / orbit / satellite geometry — the contained-droplet length cohort (W15). */
export interface BlobGeometry {
    canvasSize: number;
    bodyRadius: number;
    satelliteCount: number;
    satelliteRadius: number;
    orbitRadius: number;
    eccentricity: number;
}

/** Satellite merge/absorb/emerge/orbit lifecycle DURATIONS (ms). */
export interface BlobSatelliteTiming {
    mergeDuration: number;
    absorbedDuration: [number, number];
    emergeDuration: number;
    orbitDuration: [number, number];
}

/** The living membrane — smin merge + surface noise/warp + pulsation. */
export interface BlobMembrane {
    smoothK: number;
    /** Smin merge variant — `quadratic` (default) | `circular` (rounder menisci). */
    merge: BlobMerge;
    noiseAmp: number;
    noiseFreq: number;
    noiseSpeed: number;
    /**
     * Domain-warp strength on the FBM edge displacement (0 = plain fbm, the
     * pre-warp look; ~0.6 = a marbled organic membrane). Taste-first low default.
     */
    warpAmp: number;
    pulseFreq: number;
    pulseAmp: number;
}

/** Palette + OKLCh color-perturbation atom. */
export interface BlobColor {
    // Multi-stop palette (W11.b) — 2-4 in-family CSS color stops distributed across
    // body + satellites. The DEFAULT is a light warm-cream OKLCh ramp (AY.W-BLOB2) so a
    // bare <GooBlob> paints the cream bead. Derive one from a seed via
    // `deriveBlobPalette` (`/color`).
    paletteStops: string[];
    hueRange: number;
    satShift: number;
    brightnessShift: number;
    colorNoiseFreq: number;
    colorNoiseSpeed: number;
}

/** The lit-glass surface — Blinn-Phong glint + Fresnel rim + iridescence/SSS/core-glow. */
export interface BlobSurface {
    // Lit glass surface (W9.b) — Blinn-Phong glint + Fresnel rim. `lit` gates the
    // whole block (default ON).
    lit: boolean;
    /** CSS color for the Fresnel rim tint (resolved through the `/color` leaf). */
    rimColor: string;
    /** Light direction [x, y, z] (normalized in-shader). */
    lightDir: [number, number, number];
    specStrength: number;
    /** Specular exponent (16-64 — a tight glint). */
    specShininess: number;
    /** Fresnel/Schlick exponent (~2-3). */
    rimPower: number;
    rimStrength: number;
    // Iridescence + fake-SSS (W11.a) — translucent-gel read. Taste-first low defaults.
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
}

/** Pointer interaction — lean / squash-stretch / click-impulse. */
export interface BlobInteraction {
    pointerAttraction: number;
    pointerStrength: number;
    /** Velocity-driven volume-preserving squash-and-stretch magnitude (0 = off). */
    stretch: number;
    /** Click spring-impulse amplitude (a one-shot bouncy pulse on the body radius). */
    clickImpulse: number;
}

/** Externally tunable blob configuration — EIGHT cohesive atoms, defaults via `BLOB_CONFIG_DEFAULTS`. */
export interface BlobConfig {
    geometry: BlobGeometry;
    satellites: BlobSatelliteTiming;
    membrane: BlobMembrane;
    color: BlobColor;
    surface: BlobSurface;
    interaction: BlobInteraction;

    // Render quality (AX.W16) — `full` (default) | `half` (half-res backing store +
    // free bilinear upsample, ~4× fragment savings for weak GPUs). NON-length.
    quality: BlobQuality;

    // Master tempo (W11.c) — ONE scalar multiplying every INTEGRATED dt (mood.tick, the
    // spring step, orbit/phase advance, noise scroll). `tempo=0` freezes (the dock pause
    // / PRM set it). Default 1.0 (real-time).
    tempo: number;
}

export const BLOB_CONFIG_DEFAULTS: BlobConfig = {
    geometry: {
        canvasSize: 200,
        // ── Geometry cohort, re-derived against the CANVAS bound (AX.W15 REDRESS F0) ──
        //
        // THE HARD BOUND IS THE CANVAS, not the wrapper. The full-canvas quad makes
        // `uv ∈ [-0.5, 0.5]` across the CANVAS. The canvas is CSS-sized 160% of the
        // wrapper, so the wrapper edge sits at `±0.5 × (1/1.6) = ±0.3125` in `uv`. Every
        // length uniform rides `POS_SCALE = 0.625` (useMetaballRenderer.ts), so a raw
        // config radius `r` paints at `r × 0.625` uv. The Y-reach cohort
        // (eccentricity/orbitRadius/satelliteRadius) is solved against the live
        // orbitPos worst-case so the painted satellite reach clears the canvas
        // top/bottom with a real four-side margin; the BODY (0.22) was never the clip.
        bodyRadius: 0.22,
        satelliteCount: 3,
        satelliteRadius: 0.082,
        orbitRadius: 0.17,
        // Eccentricity is the DOMINANT Y-inflating term (baseRadiusY = baseR × (1 + ecc)),
        // pulled DOWN in the four-side-containment re-solve so the orbit ellipse is
        // near-circular and the vertical satellite reach clears the canvas top/bottom.
        eccentricity: 0.05,
    },

    satellites: {
        mergeDuration: 1800,
        absorbedDuration: [2000, 4000],
        emergeDuration: 2200,
        orbitDuration: [8000, 14000],
    },

    membrane: {
        // `smoothK` is the smin blend-band in the shader's UV space (half-extent 0.5).
        // The smin is IQ-normalized (`k *= 4.0`) so the seam dip at a==b is EXACTLY the
        // uploaded k. The renderer composes the upload as `smoothK × moodMult × POS_SCALE`
        // — a tight, wet, rounded meniscus.
        smoothK: 0.05,
        merge: "quadratic",
        // ── Living-but-calm membrane (AX.W15 F3) ──────────────────────────────────
        // The warped-FBM watercolor edge: at idle the shader paints an ~8% organic
        // wobble — a calm living membrane rather than a dead geometric arc. `warpAmp`
        // turns ON at a calm 0.35 floor so the domain-warped marbling reads.
        noiseAmp: 0.038,
        noiseFreq: 3.5,
        noiseSpeed: 0.08,
        warpAmp: 0.35,
        pulseFreq: 0.3,
        pulseAmp: 0.008,
    },

    color: {
        // ── The light warm-cream DEFAULT palette (AY.W-BLOB2 — the headline) ──────────
        //
        // A bare <GooBlob :config="BLOB_CONFIG_DEFAULTS"> (no `color` override) now paints
        // the warm-cream living bead the docs have always promised — because the body
        // reads the deepest stop of a LIGHT cream ramp, NOT the empty-palette fallback to
        // a near-black `color`. The ramp is DERIVED ONCE via the shared `/color` producer
        // (inv J-10, no parallel ramp):
        //
        //   deriveBlobPalette(
        //     { L: 0.78, C: 0.05, h: 78 },               // a light warm-cream OKLCh anchor
        //     { stopCount: 3, harmony: "analogous",      //   (the cream/honey arc, same
        //       lightnessSpread: 0.18, hueSpread: 24,    //    family as the shader's
        //       chromaBump: 0.03 },                      //    warmCream L0.97 sheen, but
        //   ).map(oklchStopToHex)                        //    as a BASE body light stop)
        //
        // → ["#b5947f", "#d4b27d", "#dad6b1"], the resolved CSS-color form so
        // BLOB_CONFIG_DEFAULTS stays a plain serializable const (no live producer call
        // baked in). The ramp mean is OKLCh L≈0.78, the cream body the
        // proof:blob-warm-default gate reads at ≥ 0.62 in BOTH light+dark (it measured
        // ≈0.53 charcoal at the old `[]` default; the live readback now reads ~0.87 light
        // / ~0.83 dark). The anchor was tuned DOWN from 0.86 to keep the cream body a real
        // FIELD against the light cream backdrop (the blob-render.spec.ts centre-vs-corner
        // gradient floor — a too-light body reads as a flat slab against the cream field;
        // the FLOOR stays 0.62, the body is what moved per the named-successor clause). A
        // consumer passes `color="var(--primary)"` for the explicit dark per-instance
        // OPT-IN (the colored showcase variants stay as they are).
        paletteStops: ["#b5947f", "#d4b27d", "#dad6b1"],
        hueRange: 5,
        satShift: 0.0,
        brightnessShift: 0.0,
        colorNoiseFreq: 2.0,
        colorNoiseSpeed: 0.05,
    },

    surface: {
        // ── Lit warm-cream bead, the thin edge catch-light over the cream base ──────────
        //
        // With the cream BASE now carrying the body read (the color atom above), the lit
        // terms are the thin edge catch-light ON TOP — NOT the whole show. The
        // energy-conserving Blinn-Phong glint is re-derived as a fraction of the
        // normalized peak (`specStrength ≈ 0.45 / energyNorm`) so it lands a contained
        // warm gleam, never a blown hotspot. ONE perceptual cue (the Fresnel rim defines
        // the silhouette) + a WHISPER of core-glow; iridescence/SSS sit at ≈half their
        // floors so the sheen is FELT, not seen.
        lit: true,
        // ── The rim re-anchored for the LIGHT cream body (AY.W-BLOB2) ──────────────────
        // `var(--foreground)` (near-black) over the OLD dark default read as the rim; over
        // the new LIGHT cream body it would ring a hard near-black band (the
        // body↔foreground L gap ≈0.66 sits OUTSIDE the shader's 0.22 min-contrast guard,
        // so the guard would NOT soften it). The rim is re-anchored to a warm MID-TONE
        // OKLCh stop — `#8c694e` = oklch(0.55 0.06 60), a warm amber. On the cream body
        // (L≈0.86) the rim L=0.55 sits 0.31 away (> the 0.22 guard band), so it stays a
        // contrasting curve-DEFINER that draws the silhouette curve WITHOUT ringing a dark
        // band (measured: the rim reads as a soft warm edge, not a hard ring). The
        // dark-mode min-contrast guard still fires for a `var(--primary)`-OPT-IN dark body.
        rimColor: "#8c694e",
        lightDir: [0.4, 0.7, 0.6],
        specStrength: 0.16,
        specShininess: 20,
        rimPower: 2.5,
        rimStrength: 0.32,
        iridescence: 0.09,
        iridHue: 85,
        iridSpeed: 0.06,
        sssScale: 0.1,
        sssPower: 2.0,
        coreGlow: 0.06,
    },

    interaction: {
        // ── Interaction magnitudes, a CALM lean (AX.W46 D5) ───────────────────────────
        // A gentle "the creature notices you" lean (`pointerStrength` 0.18), the velocity
        // squash SATURATED in-shader (a lively flick capped at a tasteful ceiling), and a
        // bouncy click impulse.
        pointerAttraction: 0.35,
        pointerStrength: 0.18,
        stretch: 0.5,
        clickImpulse: 0.5,
    },

    // AX.W16 — full-resolution by default; weak-GPU consumers opt into `half`.
    quality: "full",
    tempo: 1.0,
};

// di-default: external-provide key — consumers `provide(BLOB_CONFIG_KEY, cfg)`
// and `<GooBlob>` reads it via a bare `inject(KEY, null)` fallthrough (the
// `config` prop wins; the loud-throw on neither is DEC-AT-2). NOT a
// strict-or-optional triplet, so it is not minted by the DI factory (KISS).
export const BLOB_CONFIG_KEY: InjectionKey<BlobConfig> = Symbol("blobConfig");
