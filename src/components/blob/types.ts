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
    /**
     * BD.W-GOOBLOB-MERCURY-COLONY — the per-source SPLIT token (default `false`). When a
     * satellite is mid-`fissioning`, this is `true` and the uniform packers DROP the
     * `orbitWiden` bridge to nominal for it ALONE, so its neck thins past the smin reach
     * and SNAPS into a free bead. Every non-fissioning source keeps the full bridge (the
     * R8-07 "instant fully-detached disc" cure). Trail sources never fission (`false`).
     */
    fissioning?: boolean;
}

// BD.W-GOOBLOB-MERCURY-COLONY — the phase machine repurposes `emerging` → `fissioning`
// (at most ONE beat of churn). `fissioning` is the SPLIT beat: the satellite buds OUT
// through a thinning neck whose gap exceeds the smin reach so it SNAPS into a free
// orbiting bead (the mercury pinch), then re-merges next cycle. At most ONE satellite is
// the fissioning satellite per cycle (the single-fissioner + bounded-apex rule — the
// "two unrelated discs" failure is re-prevented WITHOUT the blanket never-leaves-reach
// clamp). The phase token is READ by BOTH uniform packers to PHASE-SCOPE `orbitWiden`:
// full+capped for non-fissioning satellites (R8-07 stays cured — the neck stays gooey),
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

    // BD.W-GOOBLOB-MERCURY-COLONY — the per-satellite SPLIT state.
    /**
     * The live phase token the uniform packers READ to phase-scope `orbitWiden`. Mirrors
     * `phase`, but exposed on the published `MetaballSource` (below) so the GL leaves can
     * gate the bridge widen per-satellite WITHOUT importing the satellite internals. A
     * fissioning satellite drops to nominal bridge (its neck snaps); every other
     * satellite keeps the full+capped widen (R8-07 cured).
     */
    fissioning: boolean;
    /**
     * BD.W-GOOBLOB-MERCURY-COLONY — the phase-local SNAP latch: false at the fission
     * beat start, set true once the neck crosses the snap band (so the body-pulse recoil
     * kick fires EXACTLY ONCE per pinch, not every frame across the snap window).
     */
    snapFired: boolean;
}

// ── The BlobConfig ATOM set (AY.W-BLOB2 — the "simplify the options set to atoms"
//    discipline, mirroring the aurora seed/harmony/mood/medium/zones/motion door).
//
// The flat ~50-knob surface is collapsed to EIGHT top-level atoms: every tunable
// length/weight/duration lives BEHIND the atom it belongs to, so a consumer reaches for
// ONE cohesive cluster (`geometry`, `surface`,
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
    // bare <Blob> paints the cream bead. Derive one from a seed via
    // `deriveBlobPalette` (`/color`).
    paletteStops: string[];
    // F9.R1 (BG.W-BLOB-SATELLITE-SHADE) — OPTIONAL per-satellite explicit shades
    // (index-aligned; derive via `deriveBlobPalette`). UNSET/EMPTY → the derived palette
    // shade (byte-identical to HEAD, the GL seam OFF); a set entry paints that satellite.
    satelliteColors?: string[];
    hueRange: number;
    satShift: number;
    brightnessShift: number;
    colorNoiseFreq: number;
    colorNoiseSpeed: number;
    /**
     * BI.W-BLOB-SEAMS (GAP-L5 / value.js D8) — the OKLab-L ink FLOOR the derived
     * palette's deepest (body) stop is clamped to, so a seed-derived hero body never
     * collapses toward an illegible near-black. A CONFIG atom (the consumer/HERO sets
     * it; the palette derivation reads it via `deriveBlobPalette`'s `lightnessFloor`
     * param). Bracket-bounded `[0.12, 0.20]` OKLab L — see `LIGHTNESS_FLOOR_BRACKET` /
     * `clampLightnessFloor` (`./presets`); default 0.15. This does NOT affect the bare
     * default paint (its `paletteStops` are pre-baked CSS strings) — it is the floor a
     * consumer DERIVING a palette off `config.color.lightnessFloor` applies.
     */
    lightnessFloor?: number;
}

/** The lit-glass surface — Blinn-Phong glint + Fresnel rim + iridescence/SSS/core-glow. */
export interface BlobSurface {
    // Lit glass surface (W9.b) — Blinn-Phong glint + Fresnel rim. `lit` gates the
    // whole block (default ON).
    lit: boolean;
    /**
     * The procedural 2D SDF soft-shadow march (BC.W-GOOBLOB-MEATBALL T2). A soft contact
     * shadow FOLLOWING the irregular silhouette (NOT a hard disc/box shadow), gated behind
     * the shader `uShadow` flag. Default ON (the `meatball` register); the `blob` STAGE-1
     * floor ships shadowless via the `uStage` gate.
     */
    shadow: boolean;
    /**
     * Soft-shadow penumbra hardness (BC.W-GOOBLOB-MEATBALL T2) — the inverse light-source
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

    /**
     * BD.W-GOOBLOB-MERCURY-COLONY — the MERCURY-COLONY split register (the OPT-IN scalar,
     * 0..1, default the calm floor `0`). At `0` a flat-surface configuration stays
     * calm + gate-faithful: a permanently-bonded merge/un-merge breath, NO pinch (so
     * `proof:blob-render`/`-studio`/`-page` are UNMOVED — `orbitRadius 0.17` is NOT
     * re-based). Lifting it toward `1` arms the `fissioning` beat: the colony breathes a
     * satellite OUT through a thinning neck whose gap exceeds the smin reach so it SNAPS
     * into a free orbiting bead (the mercury pinch), then re-merges next cycle. This is a
     * DERIVED bundling over the EXISTING `surface` atom — NOT
     * a 9th geometry atom; the split rides MOTION (the satellite moves) on the EXISTING
     * phase machine, NOT a global smin-band re-base (which would lean-regress per
     * AZ.W-BLOB-STUDIO D2). Mood-coupled: `excited` splits more, `sleepy` barely. The
     * `colony`/`mercury` register a consumer/studio opts into.
     */
    fissionAmp: number;
}

/** Pointer interaction — lean / squash-stretch / click-impulse. */
export interface BlobInteraction {
    pointerAttraction: number;
    pointerStrength: number;
    /**
     * Velocity-driven volume-preserving squash-and-stretch magnitude (0 = off).
     *
     * AY.W-BLOB-CONFIG D3 — a SWAMPED fine-detail axis. The squash rides the smoothed
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
        // — a wet, rounded meniscus.
        //
        // AZ.W-BLOB-STUDIO D2 — the MERGE-BRIDGE re-base (the C6-6 seam-crease fix). The
        // prior `quadratic` smin CREASED at the body→satellite seam (the polynomial smin's
        // sharper fillet shows the meniscus crease the moment a metaballing-in satellite
        // touches the body skin, so the merge read as a hard POP, not a gooey neck). The
        // LIBRARY-DEFAULT re-base is the MERGE VARIANT: `quadratic` → `circular` (IQ's
        // circular smin lays a true quarter-circle fillet at the seam where the quadratic
        // creased — rounder menisci, the C6-6 named defect). The `smoothK` blend-band
        // stays at the CALIBRATED 0.05 on the LIBRARY default — DELIBERATELY, the
        // IDENTITY-PRESERVED guard: a LOUDER smoothK on the default bead inflates the
        // whole-canvas lean centroid past the existing proof:blob-render calm-lean ceiling
        // (0.10) when an orbiting satellite necks in on the leaned side (the wider band
        // pulls more satellite mass to the body — measured 0.103 at smoothK 0.09 vs 0.10
        // ceiling), and the contained-droplet seam-pull is calibrated against this band.
        // The LOUDER bridge is therefore a STUDIO axis, NOT a library re-base: the studio
        // seeds its preset baseline at a louder smoothK (blob.vue STUDIO_GEO_BASE, a
        // page-local override like W-BLOB-PAGE's geometry override) AND surfaces smoothK as
        // a LIVE knob (the Geometry/Satellites layer, 0.02–0.16) so a tuning session WATCHES
        // the bridge widen into a gooey neck. The circular merge alone is lean-safe
        // (measured PASS at the 0.05 band) — so the SHIPPED default gets the rounder
        // menisci (C6-6) WITHOUT the lean regression, and the studio reaches the louder
        // neck. The W-BLOB-PAGE page-default reads the same rounder circular menisci.
        smoothK: 0.05,
        merge: "circular",
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
        // A bare <Blob :config="BLOB_CONFIG_DEFAULTS"> (no `color` override) now paints
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
        // BI.W-BLOB-SEAMS — the derived-palette ink floor (mid-bracket [0.12,0.20]). The
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
        // normalized peak (`specStrength ≈ 0.45 / energyNorm`) so it lands a contained
        // warm gleam, never a blown hotspot. ONE perceptual cue (the Fresnel rim defines
        // the silhouette) + a WHISPER of core-glow; iridescence/SSS sit at ≈half their
        // floors so the sheen is FELT, not seen.
        lit: true,
        // BC.W-GOOBLOB-MEATBALL — the procedural soft contact shadow ON by default (the
        // `meatball` register); softness 16 (mid-penumbra). The `blob` STAGE-1 floor ships
        // shadowless via the `uStage` gate regardless of this flag.
        shadow: true,
        shadowSoftness: 16,
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
        // BD.W-GOOBLOB-MERCURY-COLONY — the CALM FLOOR (the OPT-IN register defaults OFF).
        // The shipped default creature stays the permanently-bonded breath the gates
        // record (born-RED for `proof:goo-mercury-colony` because the register is dormant,
        // NOT because the default mutated). A consumer/studio raises this toward 1 for the
        // mercury colony that SPLITS.
        fissionAmp: 0,
    },

    interaction: {
        // ── Interaction magnitudes, a CALM lean (AX.W46 D5; AY.W-BLOB-CONFIG D2) ───────
        // A gentle "the creature notices you" lean, the velocity squash SATURATED
        // in-shader (a lively flick capped at a tasteful ceiling), and a bouncy click
        // impulse. AY.W-BLOB-CONFIG D2 — the shader's lean SIGN was inverted at HEAD, so
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

    // AX.W16 — full-resolution by default; weak-GPU consumers opt into `half`.
    quality: "full",
    tempo: 1.0,
};

// di-default: external-provide key — consumers `provide(BLOB_CONFIG_KEY, cfg)`
// and `<Blob>` reads it via a bare `inject(KEY, null)` fallthrough (the
// `config` prop wins; the loud-throw on neither is DEC-AT-2). NOT a
// strict-or-optional triplet, so it is not minted by the DI factory (KISS).
export const BLOB_CONFIG_KEY: InjectionKey<BlobConfig> = Symbol("blobConfig");
