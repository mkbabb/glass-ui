import type { InjectionKey } from "vue";

export type BlobMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

/** Smin merge variant — `quadratic` (cheap, creased) | `circular` (rounder menisci). */
export type BlobMerge = "quadratic" | "circular";

/**
 * Render-quality axis: `full` (default) renders the metaball pass at the
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
    /**
     * the per-source SPLIT token (default `false`). When a
     * satellite is mid-`fissioning`, this is `true` and the uniform packers DROP the
     * `orbitWiden` bridge to nominal for it ALONE, so its neck thins past the smin reach
     * and SNAPS into a free bead. Every non-fissioning source keeps the full bridge (the
     *  "instant fully-detached disc" cure). Trail sources never fission (`false`).
     */
    fissioning?: boolean;
}

// the phase machine repurposes `emerging` → `fissioning`
// (at most ONE beat of churn). `fissioning` is the SPLIT beat: the satellite buds OUT
// through a thinning neck whose gap exceeds the smin reach so it SNAPS into a free
// orbiting bead (the mercury pinch), then re-merges next cycle. At most ONE satellite is
// the fissioning satellite per cycle (the single-fissioner + bounded-apex rule — the
// "two unrelated discs" failure is re-prevented WITHOUT the blanket never-leaves-reach
// clamp). The phase token is READ by BOTH uniform packers to PHASE-SCOPE `orbitWiden`:
// full+capped for non-fissioning satellites ( stays cured — the neck stays gooey),
// dropped to nominal ONLY for the fissioning satellite so its neck CAN thin past the
// smin reach and SNAP.
export type SatellitePhase =
    | "orbiting"
    | "merging"
    | "absorbed"
    | "emerging"
    | "fissioning";

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

    // the per-satellite SPLIT state.
    /**
     * The live phase token the uniform packers READ to phase-scope `orbitWiden`. Mirrors
     * `phase`, but exposed on the published `MetaballSource` (below) so the GL leaves can
     * gate the bridge widen per-satellite WITHOUT importing the satellite internals. A
     * fissioning satellite drops to nominal bridge (its neck snaps); every other
     * satellite keeps the full+capped widen ( cured).
     */
    fissioning: boolean;
    /**
     * the phase-local SNAP latch: false at the fission
     * beat start, set true once the neck crosses the snap band (so the body-pulse recoil
     * kick fires EXACTLY ONCE per pinch, not every frame across the snap window).
     */
    snapFired: boolean;
}

// ── BlobConfig atoms ────────────────────────────────────────────────────
//
// The flat ~50-knob surface is collapsed to EIGHT top-level atoms: every tunable
// length/weight/duration lives BEHIND the atom it belongs to, so a consumer reaches for
// ONE cohesive cluster (`geometry`, `surface`,
// `membrane`, …) rather than scanning a flat sibling list of ~50 knobs. The three
// `MoodParams` and `SatelliteInternal` are derived engine state, not part of the
// public atom surface.

/** Body, orbit, and satellite geometry. */
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
    // Two to four in-family CSS color stops distributed across
    // body + satellites. The DEFAULT is a light warm-cream OKLCh ramp so a
    // bare <Blob> paints the cream bead. Derive one from a seed via
    // `deriveBlobPalette` (`/color`).
    paletteStops: string[];
    // OPTIONAL per-satellite explicit shades
    // (index-aligned; derive via `deriveBlobPalette`). UNSET/EMPTY → the derived palette
    // shade; a set entry paints that satellite.
    satelliteColors?: string[];
    hueRange: number;
    satShift: number;
    brightnessShift: number;
    colorNoiseFreq: number;
    colorNoiseSpeed: number;
    /**
     * The OKLab-L floor for the deepest derived palette stop, preventing a
     * seed-derived hero body from collapsing toward an illegible near-black.
     * Palette derivation reads it through `deriveBlobPalette.lightnessFloor`.
     * Bounded to `[0.12, 0.20]` OKLab L by `LIGHTNESS_FLOOR_BRACKET` and
     * `clampLightnessFloor`; default 0.15. This does not affect the pre-baked
     * default `paletteStops`.
     */
    lightnessFloor?: number;
}

/** The lit-glass surface — Blinn-Phong glint + Fresnel rim + iridescence/SSS/core-glow. */
export interface BlobSurface {
    // Blinn-Phong glint and Fresnel rim. `lit` gates the whole block; default on.
    lit: boolean;
    /**
     * Procedural 2D SDF soft-shadow march. The contact shadow follows the irregular
     * silhouette rather than a disc or box, gated by `uShadow`. Default on; the
     * flat `blob` stage is shadowless through `uStage`.
     */
    shadow: boolean;
    /**
     * Soft-shadow penumbra hardness: the inverse light-source
     * size fed to the IQ rmshadows march `w` term (a higher value = a harder penumbra).
     * Range 4–48, default 16.
     */
    shadowSoftness: number;
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
    // Iridescence and approximate subsurface scattering; low defaults preserve restraint.
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

    /**
     * the MERCURY-COLONY split register (the OPT-IN scalar,
     * 0..1, default the calm floor `0`). At `0` a flat-surface configuration stays
     * calm: a permanently bonded merge/unmerge breath with no pinch, so the existing
     * studio and page presets remain unchanged and `orbitRadius 0.17` is not
     * re-based). Lifting it toward `1` arms the `fissioning` beat: the colony breathes a
     * satellite OUT through a thinning neck whose gap exceeds the smin reach so it SNAPS
     * into a free orbiting bead (the mercury pinch), then re-merges next cycle. This is a
     * DERIVED bundling over the EXISTING `surface` atom — NOT
     * a 9th geometry atom; the split rides MOTION (the satellite moves) on the EXISTING
     * phase machine, NOT a global smin-band re-base (which would lean-regress per
     *  D2). Mood-coupled: `excited` splits more, `sleepy` barely. The
     * `colony`/`mercury` register a consumer/studio opts into.
     */
    fissionAmp: number;
}

/** Pointer interaction — lean, squash-stretch, click-impulse. */
export interface BlobInteraction {
    pointerAttraction: number;
    pointerStrength: number;
    /**
     * Velocity-driven volume-preserving squash-and-stretch magnitude (0 = off).
     *
     *  D3 — a SWAMPED fine-detail axis. The squash rides the smoothed
     * spring velocity (`useBlobPointer`'s critically-damped `response: 0.18` follow),
     * which is heavily damped and down-scaled into body space — so the tanh-saturated
     * elongation reads at the noise floor (a live readback measured 0% body-aspect change
     * between `stretch=0` and `stretch=1.5`). It is NOT a primary axis: it adds a subtle
     * elongation on a FAST flick over the much louder lean/follow/pseudopod channel that
     * dominates the deformation. Kept (the volume-preserving map is correct and lands a
     * whisper on the fastest flicks) but DEMOTED — the demo no longer surfaces it as a
     * top-level slider (the flick blurb is honest-down to match). A consumer that wants a
     * pronounced taffy-pull raises this AND uncouples the velocity from the spring smooth.
     */
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

    /**
     * The sole flat↔dressed surface axis. Values are clamped to `[0, 1]`: `0` is the
     * flat warm-cream blob, `1` is the fully dressed lit meatball, and intermediate
     * values smoothly interpolate the surface over the shared smin geometry.
     */
    morphT: number;

    // Render quality: `full` (default) or `half` (half-resolution backing store
    // with bilinear upsampling, reducing fragment work by roughly 4×).
    quality: BlobQuality;

    // Master tempo multiplies every integrated time step (mood tick, spring step,
    // orbit/phase advance, and noise scroll). `tempo=0` freezes the simulation;
    // the default is 1 for real time.
    tempo: number;
}

export const BLOB_CONFIG_DEFAULTS: BlobConfig = {
    geometry: {
        canvasSize: 200,
        // The canvas, not the wrapper, is the geometry bound. The full-canvas quad makes
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
        // `smoothK` is the smin blend band in the shader's half-extent-0.5 UV space.
        // IQ normalization (`k *= 4`) makes the seam dip at `a == b` equal the
        // uploaded value. Circular smin gives the merge a round quarter-circle
        // meniscus; the calibrated 0.05 band keeps the calm-lean centroid at or
        // below 0.10. Studio controls may deliberately choose a wider local band.
        smoothK: 0.05,
        merge: "circular",
        // Living-but-calm membrane.
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
        // Light warm-cream default palette.
        //
        // A bare <Blob:config="BLOB_CONFIG_DEFAULTS"> (no `color` override) now paints
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
        //   ).map(oklchStopToHex)                        // base body light stops
        //
        // → ["#b5947f", "#d4b27d", "#dad6b1"], the resolved CSS-color form so
        // BLOB_CONFIG_DEFAULTS stays a plain serializable const (no live producer call
        // baked in). The ramp mean is OKLCh L≈0.78; the cream body reads at least
        // 0.62 in both schemes (about 0.87 in light and 0.83 in dark). The anchor
        // keeps the body distinct from the light cream backdrop while satisfying
        // the center-to-corner gradient floor. A
        // consumer passes `color="var(--primary)"` for the explicit dark per-instance
        // OPT-IN (the colored showcase variants stay as they are).
        paletteStops: ["#b5947f", "#d4b27d", "#dad6b1"],
        hueRange: 5,
        satShift: 0.0,
        brightnessShift: 0.0,
        colorNoiseFreq: 2.0,
        colorNoiseSpeed: 0.05,
        // the derived-palette ink floor (mid-bracket [0.12,0.20]). The
        // pre-baked default `paletteStops` above are unaffected; this is the floor a
        // consumer deriving off this config applies (byte-identical default paint).
        lightnessFloor: 0.15,
    },

    surface: {
        // ── Lit warm-cream bead, the thin edge catch-light over the cream base ──────────
        //
        // With the cream BASE now carrying the body read (the color atom above), the lit
        // terms are the thin edge catch-light ON TOP — NOT the whole show. The
        // energy-conserving Blinn-Phong glint is re-derived as a fraction of the
        // normalized peak (`specStrength ≈ 0.45, energyNorm`) so it lands a contained
        // warm gleam, never a blown hotspot. ONE perceptual cue (the Fresnel rim defines
        // the silhouette) + a WHISPER of core-glow; iridescence/SSS sit at ≈half their
        // floors so the sheen is FELT, not seen.
        lit: true,
        // the procedural soft contact shadow ON by default (the
        // `meatball` register); softness 16 (mid-penumbra). The `blob` STAGE-1 floor ships
        // shadowless via the `uStage` gate regardless of this flag.
        shadow: true,
        shadowSoftness: 16,
        // ── The rim re-anchored for the LIGHT cream body ──────────────────
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
        // the CALM FLOOR (the OPT-IN register defaults OFF).
        // The default creature stays the permanently bonded breath. A consumer or studio
        // raises this toward 1 for the
        // mercury colony that SPLITS.
        fissionAmp: 0,
    },

    interaction: {
        // ── Interaction magnitudes: a calm lean ──────────────────
        // A gentle "the creature notices you" lean, the velocity squash SATURATED
        // in-shader (a lively flick capped at a tasteful ceiling), and a bouncy click
        // impulse.  D2 — the shader's lean SIGN was inverted at HEAD, so
        // the prior `pointerStrength` 0.18 was calibrated against a body-lean that
        // SUBTRACTED from the trail baseline (the net read calm only by cancellation).
        // With the sign corrected the body lean now ADDS to the trail-pseudopod reach
        // (the dominant lean channel) instead of subtracting from it, so the strength
        // drops 0.18 → 0.10 to keep the default a CALM coherent lean while the negative
        // half now genuinely shies away (the body shifts away AND the pseudopod
        // retracts, reachFactor 0).
        pointerAttraction: 0.35,
        pointerStrength: 0.1,
        stretch: 0.5,
        clickImpulse: 0.5,
    },

    // The fully dressed endpoint; consumers set `morphT: 0` for the flat floor.
    morphT: 1,

    // Full-resolution by default; weak-GPU consumers opt into `half`.
    quality: "full",
    tempo: 1.0,
};

// External provide key. The `config` prop wins over injected configuration;
// Blob throws when neither exists. This plain optional injection does not need
// the stricter DI helper contract.
export const BLOB_CONFIG_KEY: InjectionKey<BlobConfig> = Symbol("blobConfig");
