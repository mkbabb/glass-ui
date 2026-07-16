/**
 * Aurora library configuration.
 *
 * Authored presets (Sky, Dawn, Meadow, Deliberative, Day9, Oil Impasto,
 * Oil Gestural, Oil Van Gogh, Crayon Sunset, Crayon Rainbow, Crayon Ocean)
 * live in the consumer — see demo/stories/substrates/aurora/presets.ts.
 *
 * Named themed presets belong in each consumer project. The library exports only
 * the shape and a minimum-viable DEFAULT_AURORA_CONFIG for the component's own
 * type-check ergonomics.
 */

// ── Types ───────────────────────────────────────────────────────────────

// OklchStop is defined in the `/color` leaf, imported locally and re-exported so
// Aurora-domain consumers can keep importing it
// from `../constants/presets`.
import type { OklchStop } from "../../../composables/color";
export type { OklchStop };

// value.js owns the OKLCh hue interpolation vocabulary and matrices.
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
export type AuroraHuePath = HueInterpolationMethod;

// The color-source axis. `palette` uses the procedural nuclei-field ramp; `image`
// selects a distinct fragment program at setup, samples a decoded photo through
// the shared texture-upload primitive, and dissolves it into Aurora's drift.
export type AuroraSource = "palette" | "image";

// The photo a `source:"image"` aurora dissolves. Any URL string, `Blob` (decoded through
// the shared `createImageBitmap` normalisation) OR an already-uploadable source. The
// concrete type lives in the shared texture-upload primitive — re-exported here so the
// aurora config surface is self-contained. The macro-flower ARRAY + cross-fade cadence are
// DEMO/consumer assets (presets-in-consumers); the library ships the axis only.
import type { ImageInputSource } from "../../../composables/glass/textureUpload";
export type AuroraImageSource = ImageInputSource;
export type { ImageInputSource };

/** The per-fragment blur-radius band (uv units) the drifting zone lerps between. */
export interface AuroraImageBlur {
    /** Blur radius (uv) at zone 0 — the near-sharp zones. */
    min: number;
    /** Blur radius (uv) at zone 1 — the dramatically-dissolved zones. */
    max: number;
}

export interface AuroraNucleus {
    /** 0..1 in CSS-top-origin space (0 = top, 1 = bottom). Runtime flips Y. */
    x: number;
    y: number;
    /** Radius of Gaussian falloff, in normalized canvas units. 0.15..0.8. */
    radius: number;
    /** 0..1 — which palette stop this nucleus pulls toward. */
    paletteBias: number;
    /** -0.3..0.3 — lightness pull within the nucleus's zone of influence. */
    valueBias: number;
    /** 0..0.08 — orbit amplitude for slow drift (the visible-travel gate). */
    driftRadius: number;
    /** 0..2π — phase seed. */
    driftPhase: number;
    /**
     * Major:minor axis ratio. 1.0 = isotropic (default). Range [1, 3]. The
     * nucleus's Gaussian becomes an ellipse stretched along `angle`.
     */
    elongation?: number;
    /**
     * Major-axis orientation in degrees, CSS-top-origin (matches y-flip).
     * Default 0 (horizontal). Range [-180, 180]. Runtime converts to radians.
     */
    angle?: number;
}

// `vangogh` (first-class atomic comma/crescent dabs), `oil-pastel` (stroke-deposition
// + burnish), and `crayon` (DRY tooth-multiply) are all first-class mediums. Each
// authors its own shader body with no shared dispatch. van-Gogh/oil-pastel/crayon
// force the structure-tensor orientation (the painterly hug). The `uMedium` ladder
// dispatches crayon==4, vangogh==5, oil-pastel==6; the bridge MEDIUM_ID map + the
// aurora.frag dispatch + the uniform uploads all carry the medium.
export type AuroraMedium =
    | "smooth"
    | "pastel"
    | "watercolor"
    | "oil"
    | "crayon"
    | "vangogh"
    | "oil-pastel"
    // the anisotropic-Kuwahara painterly finish (uMedium==7), an
    // OPT-IN first-class medium: a single-pass generalized/anisotropic Kuwahara
    // (Kyprianidis 2010 SOFT polynomial-weighted variant) over the procedural color
    // field, the elliptical kernel squeezed along the structure tensor. DEFAULT-OFF
    // (no preset/config carries it unless explicitly selected); the smooth default +
    // the van-Gogh HERO + the oil/oil-pastel mediums are byte-unchanged.
    | "kuwahara"
    // the two MUTUALLY-EXCLUSIVE metal mediums (uMedium==8/9,
    // NOT a finish axis): `metal` re-lights the field as warm folded metal (the luma
    // height field → an anisotropic two-term BRDF raked by a cursor-synth light, catch
    // = the achromatic-warm anchor); `metal-gradient` is the SAME BRDF over a
    // pre-flattened base + a twinkle-in-place flake sparkle. OPT-IN, default-OFF (no
    // preset selects them unless explicitly set); the smooth default + every existing
    // medium are byte-unchanged. Dual-ported (both WebGL2 + the WGSL primary).
    | "metal"
    | "metal-gradient";

// `crayon` is a first-class `AuroraMedium` (uMedium==4), not a `strokeMode`.
// The legacy `oil` + `strokeMode:"crayon"` peer-route is REMOVED (clean break, no
// alias — MEMORY no-backwards-compat); a crayon surface selects `medium:"crayon"`.
/** Oil-stroke sub-mode. Applied only when `medium === "oil"`. Routes inside the shader. */
export type StrokeMode = "oil" | "knife" | "chunky";

export type FlowPattern =
    | "none"
    | "radial"
    | "swirl"
    | "diagonal"
    | "multi"
    // Structure-tensor, edge-tangent-flow pattern. The flow
    // direction derives from the color field's OWN minor-eigenvector (the
    // edge-tangent), so brushwork hugs the color zones rather than tracking a
    // hand-authored pattern. The painterly mediums (vangogh, oil-pastel) force it.
    | "tensor";

/**
 * How a stroke's orientation is sourced. `flow` keeps the hand-authored
 * `flowField` pattern + per-cell jitter (the named legacy choice); `tensor`
 * substitutes the structure-tensor minor-eigenvector (the color field's own
 * edge-tangent flow). No default that hides one as a duplicate of the other.
 */
export type StrokeOrient = "flow" | "tensor";

// `"curl"` is the opt-in Bridson curl-noise flow warp (the divergence-free
// curl of an fbm potential). It is never auto-selected by the NOISE atom fan-out
// (warpModeFor stays fbm→hybrid→cellular), so the default config is byte-unchanged;
// a consumer opts in by setting `warpMode: "curl"` explicitly.
export type WarpMode = "fbm" | "cellular" | "hybrid" | "curl";

/**
 * Interactivity shape. Each axis opts Aurora into a pointer/scroll response:
 * - `light`  — the cursor drives the impasto `uLightDir` (cursor-as-light + idle orbit).
 * - `scroll` — palette/breath progress couples to scroll (via `useScrollProgress`).
 * - `swirl`  — cursor-local warp and luminance lean on both engines.
 * - `amplitude` — sizes the transient burst folded into cursor strength on the CPU.
 * Every axis is suppressed under `prefers-reduced-motion` + the DockBackgroundToggle
 * pause (the master tempo scalar is the single suppression seam). The wispy-sky
 * default carries no `interactivity` (every axis OFF — the default stays static).
 */
export interface AuroraInteractivity {
    light?: boolean;
    scroll?: boolean;
    /**
     * Cursor-local field warp and luminance lean. The atoms
     * door defaults it ON when interactive, including on the smooth medium.
     */
    swirl?: boolean;
    /**
     * Sized burst amplitude (0..1). The CPU projection folds
     * the pointer-field burst into the shared cursor strength before either engine sees it.
     */
    amplitude?: number;
}

export interface AuroraFlow {
    pattern: FlowPattern;
    /** 0..1 CSS-top-origin. Runtime flips Y. */
    focalX: number;
    focalY: number;
    /** Degrees. Only used for "diagonal". */
    angle: number;
    /** 0..1 curl intensity (attenuated per-pattern inside the shader). */
    curl: number;
}

export interface AuroraConfig {
    // Composition
    palette: OklchStop[]; // 2..MAX_STOPS
    nuclei: AuroraNucleus[]; // 1..MAX_NUCLEI
    softmaxBeta: number; // 3..10
    valueVariance: number; // 0..0.3

    // Warp (organic boundaries)
    warpAmount: number; // 0..0.6
    warpScale: number; // 0.5..3
    warpDrift: number; // 0..0.015
    warpMode: WarpMode;
    noiseOctaves: 3 | 4 | 5;

    // the color SOURCE axis (default `"palette"` — the procedural
    // field, byte-identical to every pre-image config). `"image"` selects the separate
    // compiled image program that dissolves `src` into the field's drift. Optional; omitted
    // = `"palette"` (the palette-default byte-identity floor). Aliased on `/api`.
    source?: AuroraSource;
    /**
     * the photo the `source:"image"` program dissolves. A URL
     * string, `Blob` (decoded through the shared normalisation) OR an already-uploadable
     * source (`ImageBitmap`/`HTMLImageElement`/…). Ignored when `source !== "image"`.
     */
    src?: AuroraImageSource;
    /**
     * the per-fragment blur-radius band (uv units) the drifting
     * zone lerps between (`radius = mix(min, max, zone)`). Optional; omitted = the
     * `IMAGE_BLUR_MIN_DEFAULT`/`IMAGE_BLUR_MAX_DEFAULT` band (near-sharp → heavy-bokeh
     * dissolve). Only read on the `source:"image"` program.
     */
    imageBlur?: AuroraImageBlur;

    // Medium
    medium: AuroraMedium;
    /**
     * Hue-arc method for OKLCh palette interpolation. Optional;
     * omitted = `"shorter"` (the OKLab-rectangular ramp — the muddy-midtone-free
     * default). `"increasing"`/`"decreasing"` request the OKLCh hue-arc for a
     * deliberate rainbow sweep across the stops.
     */
    huePath?: AuroraHuePath;
    flow: AuroraFlow;
    /**
     * How the painterly stroke direction is sourced. Optional; omitted =
     * `"flow"`, the hand-authored `flowField` pattern. `"tensor"` substitutes the
     * structure-tensor minor eigenvector, the color field's edge-tangent flow;
     * the `vangogh` and `oil-pastel` mediums force it.
     */
    strokeOrient?: StrokeOrient;
    strokeAmount: number; // 0..1
    strokeScale: number; // 40..320
    strokeAnisotropy: number; // 0..1
    strokeLayers: 1 | 2;
    strokeMode: StrokeMode;
    wetEdge: number; // 0..1
    granulation: number; // 0..1
    impasto: number; // 0..1 (scales internal amp)
    brokenColor: number; // 0..1
    canvasGrain: number; // 0..0.1
    /**
     * Anisotropic-Kuwahara painterly-finish knobs (the
     * `medium:"kuwahara"` register; the WGSL primary's keystone). Optional; omitted =
     * the recipe defaults (radius 0.010 procedural-patch units, q 4.0 the SOFT
     * variance-weight exponent). Sectors are fixed at 8 (the soft-blend overlap floor —
     * not an authoring axis). These ride the appended WGSL `kuwahara`/`scalars5` struct
     * lanes; a smooth/non-kuwahara config leaves them at the default (a no-op).
     */
    kuwaharaRadius?: number; // 0.006..0.024 procedural-patch units
    kuwaharaQ?: number; // 1..6 soft-blend variance exponent (4 default)
    /**
     * Metal-medium knobs for `medium:"metal"` and `"metal-gradient"` (uMedium==8/9).
     * Optional; omitted = the recipe
     * defaults (`METAL_POLISH_DEFAULT` catch intensity, `METAL_HEIGHT_SCALE_DEFAULT`
     * relief tilt). `metalPolish` scales the specular catch; `metalHeightScale` scales
     * the luma-relief → normal tilt (a higher value reads as sharper folds). On the WGSL
     * primary these ride the free cursor.z/.w pad lanes; the.frag carries them as its
     * own uniforms. A non-metal config never reads them (no-op).
     */
    metalPolish?: number; // 0..4 specular catch intensity (1 default)
    metalHeightScale?: number; // 0.5..3 relief tilt (1 default)
    /**
     * Impasto relight direction (the movable directional source the
     * accumulated paint-height field catches). Optional; omitted = upper-left
     * Unit-ish [x, y, z] in screen space (z toward the viewer). The shader
     * re-normalizes it.
     */
    lightDir?: [number, number, number];
    /**
     * Relight tint for the impasto catch-light. Optional;
     * omitted = the canonical warm-white the shared `warmCatchLight` OKLCh helper
     * derives (the `(0.985, 0.0125, 77.5°)` anchor — perceptually the prior eyeballed
     * warm-white, now on the OKLCh core). Author it either as a raw LINEAR-light
     * `[r,g,b]` triple OR as an `{L,C,h}` OKLCh anchor (the bridge derives the linear
     * triple via `warmCatchLight`). The diffuse + Blinn-specular terms modulate by it.
     */
    lightColor?: [number, number, number] | OklchStop;

    // Motion
    nucleiDrift: number; // 0..0.05
    paletteDrift: number; // 0..0.04
    breathDepth: number; // 0..0.15
    breathPeriod: number; // 10..90

    // Output
    saturation: number; // 0.6..1.3
    paperGrain: number; // 0..0.02
    alpha: number; // 0..1

    /**
     * the §3 chroma FLOOR (the warm-field vividness contract).
     * Optional; omitted = `DEFAULT_VIVIDNESS` (1 — high, the library's vivid identity).
     * A shader-resident OKLab chroma-floor lifts any pale zone toward `VIVID_TARGET`
     * (mode-scaled in the shader) so the field never resolves toward gray BEHIND glass
     * the literal fix for the "missing colorful field → gray glass" defect. The lift
     * is HUE-PRESERVING (scales chroma along the zone's existing OKLab direction); below
     * `VIVID_EPS` the hue is precision noise, so the floor synthesizes along the WARM
     * anchor (`VIVID_WARM_ANCHOR`) — NEVER teal/navy, the warm-floor guarantee. A
     * deliberately-pale hero surface opts OUT with `vividness: 0` (the new lanes write 0,
     * so a `vividness:0` config is byte-identical to the pre-floor render — the gated
     * identity move). Range 0..1.
     */
    vividness?: number;

    /**
     * Pointer/scroll interactivity opt-in (default OFF — the wispy-sky
     * default stays static). Omitted = every
     * axis off. Aliased on `/api` as part of the `AuroraConfig` surface.
     */
    interactivity?: AuroraInteractivity;
}

/**
 * Pointer-cursor API exposed by `createAurora`. Values in 0..1 (CSS-top-origin).
 * Runtime flips Y and eases internally.
 */
export interface AuroraCursorApi {
    setCursor(x: number, y: number, strength?: number): void;
    clearCursor(): void;
    setCursorRadius(r: number): void;
}

export interface AuroraInstance extends AuroraCursorApi {
    /**
     * Start GPU initialization. Idempotent. With the `"eager"` capture
     * `initStrategy`, `createAurora` calls this before
     * returning; on `"deferred"` the consumer (e.g. `useAurora`) invokes it
     * past first paint. A no-op once armed or once `dispose()` has run.
     */
    arm(): void;
    /**
     * Device-resolved arm promise. On the WebGPU
     * backend `renderAt`/`arm` are no-ops until this resolves the async
     * adapter→device→configure→setup prelude. A CAPTURE consumer (thumbnail bake)
     * MUST `await armAsync()` before the first `renderAt` or the frame is BLANK
     * (the dead-preview defect). The WebGL2 fallback resolves immediately.
     */
    armAsync(): Promise<void>;
    update(cfg: AuroraConfig): void;
    /** Render a single deterministic frame at time `t` (seconds). Used for thumbnail bakes. */
    renderAt(timeSec: number): void;
    pause(): void;
    resume(): void;
    dispose(): void;
}

// ── Constants ──────────────────────────────────────────────────────────

export const MAX_NUCLEI = 8;
export const MAX_STOPS = 8;

// ── Chroma-floor constants ────────────────────────────────
/**
 * The default `vividness` for a bare `<Aurora>` — HIGH (the library's vivid identity).
 * This INVERTS the pre-floor status quo: vivid is the default, pale is the explicit
 * `vividness: 0` opt-out. The literal §3 fix — a warm glass plate over the default field
 * now reads transmissive-not-gray because the field carries chroma.
 */
export const DEFAULT_VIVIDNESS = 1.0;
/**
 * The per-fragment OKLab chroma the floor lifts a pale zone TOWARD at `vividness:1`
 * (the shader scales this by a mode factor — a dim/dark field needs more chroma to read
 * vivid through glass). Tuned so the lifted DEFAULT field clears the §3 transmissive
 * floor (mean OKLab chroma ≥ 0.045) with headroom; a vivid zone above this is untouched.
 * Mirrored as `VIVID_TARGET` in the GLSL + WGSL twins.
 */
export const VIVID_TARGET = 0.115;

// ── Metal-medium defaults ──────────────────────────────
/**
 * The default `metalPolish` (specular catch intensity) for a `medium:"metal"` or
 * `"metal-gradient"` config when omitted. The metal light rakes at unit intensity.
 */
export const METAL_POLISH_DEFAULT = 1.0;
/**
 * The default `metalHeightScale` (luma-relief → normal tilt) when omitted. A higher
 * value reads as sharper metal folds; 1 is the calibrated warm-folded-metal default.
 */
export const METAL_HEIGHT_SCALE_DEFAULT = 1.0;

// ── Image zone-blur defaults ────────────────────────────
/**
 * The default near-sharp blur radius (uv units) at zone 0 for a `source:"image"` aurora
 * a whisper so the recognizable zones read crisp against the dissolved ones.
 */
export const IMAGE_BLUR_MIN_DEFAULT = 0.004;
/**
 * The default dissolved blur radius (uv units) at zone 1 — a heavy bokeh over the fixed
 * 24-tap kernel reads as a "dramatically dissolved" abstract wash at field scale (the
 * kuwahara-budget precedent: the RADIUS carries the dissolve, never the tap count).
 */
export const IMAGE_BLUR_MAX_DEFAULT = 0.06;

// ── Minimum-viable default ─────────────────────────────────────────────

/**
 * A neutral starting point for consumers that build their own config from scratch.
 * Not a themed preset — the demo's 11 authored presets override every field.
 */
export const DEFAULT_AURORA_CONFIG: AuroraConfig = {
    // The warm-cream library identity. NOT teal/navy — a
    // soft warm-amber-to-cream ramp (hue 45..70, the warm-amber family)
    // so a bare `<Aurora>` reads warm-cream at rest. The prior blue/teal default
    // (h:220/200) was the teal-on-navy disease in the library identity. Named
    // themed presets (Sky, Ocean, …) live in the consumer (presets-in-consumers).
    // Authored vivid identity (the
    // floor is the runtime guarantee; this is the authored chroma). The pre-BI ramp's pale
    // apex (C:0.095) dragged the mean OKLab chroma BELOW the 0.13 warm-vivid floor and the
    // hues sat in a near-monochrome 45–68 cluster (a flat amber ramp). BI lifts every stop
    // into the 0.13–0.17 warm-vivid band AND spreads the hue into a real SUNSET sweep —
    // a warm coral-amber base (h:30), an amber body (h:55), a warm-gold apex (h:82): a
    // SECOND warm accent hue per the DAWN-lilac, SUNSET-rose model (a monochrome ramp
    // reads flat), all warm (NO teal/navy — the warm-floor law; NO pink — that setting-sun
    // note is a demo-local preset, presets-in-consumers). Mean OKLab C ≈ 0.15. A bare
    // `<Aurora>` reads warm-VIVID + interesting at rest, not warm-pale. Both, not either.
    palette: [
        { L: 0.64, C: 0.17, h: 30 },
        { L: 0.76, C: 0.15, h: 55 },
        { L: 0.87, C: 0.13, h: 82 },
    ],
    nuclei: [
        { x: 0.3, y: 0.3, radius: 0.5, paletteBias: 0.0, valueBias: 0, driftRadius: 0.045, driftPhase: 0.0 },
        { x: 0.7, y: 0.65, radius: 0.5, paletteBias: 1.0, valueBias: 0.05, driftRadius: 0.045, driftPhase: 2.4 },
    ],
    softmaxBeta: 3.0,
    valueVariance: 0.08,
    warpAmount: 0.5,
    warpScale: 1.6,
    warpDrift: 0.008,
    warpMode: "fbm",
    noiseOctaves: 4,
    medium: "smooth",
    flow: { pattern: "none", focalX: 0.5, focalY: 0.5, angle: 0, curl: 0 },
    strokeAmount: 0,
    strokeScale: 140,
    strokeAnisotropy: 0.7,
    strokeLayers: 1,
    strokeMode: "oil",
    wetEdge: 0,
    granulation: 0,
    impasto: 0,
    brokenColor: 0,
    canvasGrain: 0,
    nucleiDrift: 0.015,
    paletteDrift: 0.015,
    breathDepth: 0.05,
    breathPeriod: 40,
    saturation: 1.0,
    paperGrain: 0.008,
    alpha: 1.0,
    // the §3 floor ON by default (the vivid identity). A pale hero
    // surface opts out with `vividness: 0`.
    vividness: DEFAULT_VIVIDNESS,
};

/**
 * `PAPER_WASH_GROUND` — the library-canon recessive-ground crayon calibration
 * ( A-4a; d6 9467bd16 adopt). A pure PRESET PARTIAL (no
 * palette/nuclei/motion) pinning the recessive crayon-ground deposition dials so a
 * data-ground aurora reads as paper-on-tooth without each consumer dial-tuning the
 * same recessive calibration by hand. It carries NO palette/nuclei — the consumer
 * spreads it over its own pole-derived pigment (page-glow IS data-glow):
 * `const cfg = {...consumerBase,...PAPER_WASH_GROUND }`.
 *
 * House-rule clean (presets-in-consumers): this is the LIBRARY's own recessive-ground
 * IDENTITY, not a consumer theme — admissible at the root. `satisfies
 * Partial<AuroraConfig>` holds (every key is a first-class `AuroraConfig` field at
 * HEAD; the `crayon` medium is `uMedium==4`).
 */
export const PAPER_WASH_GROUND = {
    medium: "crayon",
    // The structure-tensor edge-tangent deposition (crayon forces tensor in the
    // bridge anyway); named so the recessive flow is explicit, not lucky.
    strokeOrient: "tensor",
    // The deft tooth dials — the named stopping rules (d-paper-aurora M1).
    granulation: 0.3,
    canvasGrain: 0.5,
    strokeAmount: 0.35,
    strokeAnisotropy: 0.5,
    // Recessive guards: single dry layer, NO impasto, sheen, broken-color flecks
    // loud enough to name. The tooth is paper, never a picture.
    strokeLayers: 1,
    impasto: 0,
    brokenColor: 0,
    wetEdge: 0,
    // The ground spends NO chroma budget — pull saturation BELOW unity so the
    // pigment is a whisper of the data hue on tooth, not a colored field.
    saturation: 0.92,
    // A felt paper-tooth floor that co-tunes with the page's bare-paper grain.
    paperGrain: 0.008,
} as const satisfies Partial<AuroraConfig>;
