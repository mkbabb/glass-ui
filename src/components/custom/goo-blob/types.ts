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

/** Externally tunable blob configuration — all fields concrete, defaults applied via `BLOB_CONFIG_DEFAULTS`. */
export interface BlobConfig {
    // Geometry
    canvasSize: number;
    bodyRadius: number;
    satelliteCount: number;
    satelliteRadius: number;
    orbitRadius: number;

    // Render quality (AX.W16) — `full` (default) | `half` (half-res backing store +
    // free bilinear upsample, ~4× fragment savings for weak GPUs). NON-length — does
    // not touch the geometry regime, only the backing-store resolution.
    quality: BlobQuality;

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
    // ── Geometry cohort, re-derived against the CANVAS bound (AX.W15 REDRESS F0) ──
    //
    // THE HARD BOUND IS THE CANVAS, not the wrapper. The coordinate chain: the
    // full-canvas quad makes `uv ∈ [-0.5, 0.5]` across the CANVAS (the canvas-HALF
    // extent is 0.5 uv — the literal painted edge the gate's edge-ring samples). The
    // canvas is CSS-sized 160% of the wrapper (GooBlob.vue), so the wrapper edge sits
    // at `±0.5 × (1/1.6) = ±0.3125` in `uv`. Every length uniform rides
    // `POS_SCALE = 0.625` (useMetaballRenderer.ts), so a raw config radius `r` paints
    // at `r × 0.625` uv.
    //
    // WHY THE FIRST W15 SOLVE MISPREDICTED (the live four-side clip at worst-edge
    // 0.521). The prior budget computed the satellite outer reach as `orbit + sat ≈
    // 0.375` raw and called it 0.75 wrapper-half — but that IGNORED the THREE
    // Y-inflating terms the satellite system actually applies (useBlobSatellites.ts):
    //   1. baseR = orbitRadius × (0.8 … 1.2)         — a random radius up to ×1.2
    //   2. baseRadiusY = baseR × (1 + eccentricity)  — the eccentric LONG axis is Y
    //   3. + wobble (mood-scaled) + pertYAmp (≤0.08) — additive radial swing
    // So the REAL worst-case satellite-CENTRE Y at idle was
    // `0.27×1.2×(1+0.22) + wobble(≈0.12) + 0.08 ≈ 0.59` raw → `×0.625 = 0.371` uv,
    // and the sat radius + smin band carried the painted edge to `≈0.48` uv = 96% of
    // the canvas half — touching top/bottom. Left/right cleared because the orbit
    // ellipse is TALLER than wide (the (1+ecc) Y-long axis vs (1−ecc) X). The body
    // alone was always fine (0.18 uv = 36% canvas-half); the SATELLITES were the clip.
    //
    // THE RE-SOLVE pulls the VERTICAL satellite reach inside the canvas with a real
    // four-side margin by attacking the Y-inflating terms directly — eccentricity DOWN
    // (kills the Y-long axis, the dominant term), orbitRadius DOWN, satelliteRadius
    // DOWN — solved (numerically, against the live orbitPos worst-case, not a
    // raw-sum) so the worst-case satellite painted reach is:
    //   idle (wobble≈1.0)   : ≈0.354 uv = 71% canvas-half — a clear top/bottom frame.
    //   excited (wobble 2.0): ≈0.446 uv = 89% canvas-half — a brief narrow peek, never
    //                         a hard clip (the intentional orbit excursion).
    // The BODY stays 0.22 (36% canvas-half = 58% wrapper-half — a generous contained
    // bead, unchanged: it was never the clip source). This is a SINGLE atomic re-solve
    // of the Y-reach cohort and KEEPS W08's POS_SCALE regime untouched.
    bodyRadius: 0.22,
    satelliteCount: 3,
    satelliteRadius: 0.082,
    orbitRadius: 0.17,

    // AX.W16 — full-resolution by default; weak-GPU consumers opt into `half`.
    quality: "full",

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

    // ── Lit warm-cream bead, the DEFAULT identity (AX.W46 re-tune of AX.W15 F1) ───
    //
    // A greenfield product's canonical look IS the SOTA look — the "zero regression"
    // OFF-by-default flag-gating is DELETED as the legacy/fallback path the §0 mandate
    // forbids. `lit: true` STAYS (the lit-dome identity is right); the AMOUNT was
    // wrong. W15 carried the W9.b-era specular/rim magnitudes UNCHANGED when it flipped
    // `lit: false → true` — they were demo-toggle-only values never re-derived against
    // the energy-conserving Blinn-Phong, so on the now-default-lit body the glint blew
    // a hard white spot and FIVE lighting layers (spec glint + Fresnel rim + iridescence
    // + fast-SSS + Beer-Lambert core-glow) co-added on a ~0.14-uv bead. The live π-lane
    // measured the resting dome-luma-std running HOT (the skeuomorphic wet-plastic tell).
    //
    // THE RE-DERIVATION (D4). The shader's glint is energy-CONSERVING:
    // `spec = pow(N·H, shininess) · specStrength · energyNorm`, `energyNorm =
    // (shininess+2)/8`. At shininess 32 that is `34/8 = 4.25`, so `specStrength: 0.9`
    // gave a `0.9 × 4.25 ≈ 3.83×` over-unity peak — crushed to white by the OETF clamp.
    // `specStrength` is re-derived as a fraction of the NORMALIZED peak (NOT a raw
    // weight): at the softer shininess 20 (`energyNorm = 22/8 = 2.75`) a target linear
    // peak ≈ 0.45 lands `specStrength ≈ 0.45/2.75 ≈ 0.16` — a contained warm gleam, never
    // a blown hotspot (the shader also CLAMPs the linear highlight below unity as a
    // belt-and-braces guard). `specShininess` 32 → 20 broadens the lobe (wet plastic =
    // a tight bright spot; soft glass = a wide gentle gradient, congruent with the
    // Toksvig fwidth-widen the shader already does).
    //
    // ONE perceptual cue, not four. The load-bearing pair is the Fresnel RIM (it reads
    // the silhouette) + a WHISPER of core-glow; `iridescence` and `sssScale` drop to ≈
    // half their W15 floors so the sheen is FELT, not seen. `rimStrength` softens 0.5 →
    // 0.32 (the rim defines the curve without ringing a bright band). The rim already
    // reads `rimColor: "var(--foreground)"` (token-first, untouched). A consumer wanting
    // the glossier look passes a higher `specStrength`/`iridescence` (the config seam).
    iridescence: 0.09,
    iridHue: 85,
    iridSpeed: 0.06,
    sssScale: 0.1,
    sssPower: 2.0,
    coreGlow: 0.06,

    lit: true,
    rimColor: "var(--foreground)",
    lightDir: [0.4, 0.7, 0.6],
    specStrength: 0.16,
    specShininess: 20,
    rimPower: 2.5,
    rimStrength: 0.32,

    // ── Interaction magnitudes, re-tuned DOWN to a CALM lean (AX.W46 D5) ──────────
    //
    // The W15 REDRESS drove `pointerStrength 0.11 → 0.45` + the falloff `0.4 → 0.65`
    // to clear the synthetic `centroidShift ≥ 0.012` floor by ≈9× (a MODELED 0.111
    // shift — "could NOT run a real browser"). That was tuned-to-the-gate, never to the
    // eye: the live π-lane reads it as a LUNGE — the creature lurches a fraction toward
    // a body-width on a plain hover, and the mood machine compounds it (a hover
    // auto-promotes to `curious`, whose arousal multiplier scales `pointerAttraction`
    // UP). The fix is a magnitude reconciliation, NO new interaction code — the wired
    // spring/trail/squash/click MACHINERY is sound.
    //
    //   • `pointerStrength` 0.45 → 0.18 — a gentle "the creature notices you" lean at
    //     ≈ 0.2–0.35× the body radius, not the 0.93–1.70× lurch. The lean lives in the
    //     STRENGTH, not the falloff.
    //   • the falloff radius narrows 0.65 → 0.5 in metaball.frag.ts main() — the lean
    //     stays COHERENT across the whole creature (a narrow falloff is what makes the
    //     body tilt as ONE), but a calm one. (The body at ≈0.2 uv from the pointer is
    //     still well inside the 0.5 cutoff, so the coherence holds.)
    //   • `stretch` 0.5 stays, but the shader SATURATES the squash velocity
    //     (`1 + tanh(speed·k)·stretch` in metaball.frag.ts:206) so the fastest flick is
    //     a lively bounce capped at a tasteful ceiling, NEVER the 2.25× taffy-pull an
    //     unbounded `1 + speed·stretch` reached.
    //   • the `curious`-hover compounding is decoupled in useBlobMood.ts (the arousal
    //     multiplier on `pointerAttraction` is flattened) so an auto-`curious` hover
    //     lean stays calm rather than auto-jumping toward the excited regime.
    // `clickImpulse` a bouncy 0.5 (unchanged — a deliberate click bounce is welcome).
    // The trail pseudopod radius rides `satelliteRadius` (0.082) in the renderer,
    // tapering proportionally with no extra knob.
    pointerAttraction: 0.35,
    pointerStrength: 0.18,
    stretch: 0.5,
    clickImpulse: 0.5,

    // Eccentricity is the DOMINANT Y-inflating term (baseRadiusY = baseR × (1 + ecc)),
    // pulled DOWN 0.22 → 0.05 in the four-side-containment re-solve so the orbit
    // ellipse is near-circular and the vertical satellite reach clears the canvas
    // top/bottom (the prior 0.22 made the orbit ~1.2× taller than wide — the live clip).
    eccentricity: 0.05,
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
