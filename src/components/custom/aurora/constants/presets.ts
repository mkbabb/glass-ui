/**
 * Aurora v4.1 — library config shape.
 *
 * Authored presets (Sky, Dawn, Meadow, Deliberative, Day9, Oil Impasto,
 * Oil Gestural, Oil Van Gogh, Crayon Sunset, Crayon Rainbow, Crayon Ocean)
 * live in the consumer — see demo/stories/aurora/presets.ts.
 *
 * Per memory rule "Presets in consumers": named themed presets belong in
 * each consumer project, not in the library. The library exports only the
 * shape + a minimum-viable DEFAULT_AURORA_CONFIG for the component's own
 * type-check ergonomics.
 */

// ── Types ───────────────────────────────────────────────────────────────

// OklchStop is single-sourced in the `/color` leaf (AU.W5 hoist); imported for
// local use here AND re-exported so aurora-domain consumers keep importing it
// from `../constants/presets`.
import type { OklchStop } from "../../../../composables/color";
export type { OklchStop };

// W5 — the hue-arc method for the OKLCh palette interpolation. value.js OWNS color
// (the union color-ownership contract — the same reason the OKLCH matrices are
// locked to value.js's Ottosson constants), so we IMPORT the type, never re-invent
// it. `AuroraHuePath` is a public ALIAS of `HueInterpolationMethod`, not a copy.
import type { HueInterpolationMethod } from "@mkbabb/value.js";
export type AuroraHuePath = HueInterpolationMethod;

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
// AUTHORS its own shader body (AX.W13 — no shared dispatch). van-Gogh/oil-pastel/crayon
// force the structure-tensor orientation (the painterly hug). The `uMedium` ladder
// dispatches crayon==4 / vangogh==5 / oil-pastel==6; the bridge MEDIUM_ID map + the
// aurora.frag dispatch + the uniform uploads all carry the medium.
export type AuroraMedium =
    | "smooth"
    | "pastel"
    | "watercolor"
    | "oil"
    | "crayon"
    | "vangogh"
    | "oil-pastel"
    // BB.W-AUR-KUWAHARA — the anisotropic-Kuwahara painterly finish (uMedium==7), an
    // OPT-IN first-class medium: a single-pass generalized/anisotropic Kuwahara
    // (Kyprianidis 2010 SOFT polynomial-weighted variant) over the procedural color
    // field, the elliptical kernel squeezed along the structure tensor. DEFAULT-OFF
    // (no preset/config carries it unless explicitly selected); the smooth default +
    // the van-Gogh HERO + the oil/oil-pastel mediums are byte-unchanged.
    | "kuwahara";

// AX.W13 — `crayon` is a first-class `AuroraMedium` (uMedium==4), NOT a `strokeMode`.
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
    // AW.W4.1 — the structure-tensor / edge-tangent-flow pattern. The flow
    // direction derives from the color field's OWN minor-eigenvector (the
    // edge-tangent), so brushwork hugs the color zones rather than tracking a
    // hand-authored pattern. The painterly mediums (vangogh, oil-pastel) force it.
    | "tensor";

/**
 * AW.W4.1 — how a stroke's orientation is sourced. `flow` keeps the hand-authored
 * `flowField` pattern + per-cell jitter (the named legacy choice); `tensor`
 * substitutes the structure-tensor minor-eigenvector (the color field's own
 * edge-tangent flow). No default that hides one as a duplicate of the other.
 */
export type StrokeOrient = "flow" | "tensor";

// BB.B1 — `"curl"` is the OPT-IN Bridson curl-noise flow warp (the divergence-free
// curl of an fbm potential). It is never auto-selected by the NOISE atom fan-out
// (warpModeFor stays fbm→hybrid→cellular), so the default config is byte-unchanged;
// a consumer opts in by setting `warpMode: "curl"` explicitly.
export type WarpMode = "fbm" | "cellular" | "hybrid" | "curl";

/**
 * AW.W6/W8 — the interactivity flag SHAPE (declared at W6, default OFF; behavior
 * wired at W8). Each axis opts the aurora into a pointer/scroll response:
 * - `light`  — the cursor drives the impasto `uLightDir` (cursor-as-light + idle orbit).
 * - `flow`   — pointer/scroll VELOCITY injects a transient swirl-burst (velocity-reactive).
 * - `scroll` — palette/breath progress couples to scroll (via `useScrollProgress`).
 * - `wake`   — the WebGPU stateful pointer wake (a ping-pong velocity texture; AW.W8.2).
 * Every axis is suppressed under `prefers-reduced-motion` + the DockBackgroundToggle
 * pause (the master tempo scalar is the single suppression seam). The wispy-sky
 * default carries no `interactivity` (every axis OFF — the default stays static).
 */
export interface AuroraInteractivity {
    light?: boolean;
    flow?: boolean;
    scroll?: boolean;
    wake?: boolean;
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

    // Medium
    medium: AuroraMedium;
    /**
     * W5 — the hue-arc method for the OKLCh palette interpolation. Optional;
     * omitted = `"shorter"` (the OKLab-rectangular ramp — the muddy-midtone-free
     * default). `"increasing"`/`"decreasing"` request the OKLCh hue-arc for a
     * deliberate rainbow sweep across the stops. Aliased on `/api` as `AuroraHuePath`.
     */
    huePath?: AuroraHuePath;
    flow: AuroraFlow;
    /**
     * AW.W4.1 — how the painterly stroke direction is sourced. Optional; omitted =
     * `"flow"` (the hand-authored `flowField` pattern — the pre-W4 path, so an
     * unset config renders identically). `"tensor"` substitutes the structure-tensor
     * minor eigenvector (the color field's own edge-tangent flow); the `vangogh` /
     * `oil-pastel` mediums force it.
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
     * BC.W-VIZ-AURORA (T4) — the anisotropic-Kuwahara painterly-finish knobs (the
     * `medium:"kuwahara"` register; the WGSL primary's keystone). Optional; omitted =
     * the recipe defaults (radius 0.010 procedural-patch units, q 4.0 the SOFT
     * variance-weight exponent). Sectors are fixed at 8 (the soft-blend overlap floor —
     * not an authoring axis). These ride the appended WGSL `kuwahara`/`scalars5` struct
     * lanes; a smooth/non-kuwahara config leaves them at the default (a no-op).
     */
    kuwaharaRadius?: number; // 0.006..0.024 procedural-patch units
    kuwaharaQ?: number; // 1..6 soft-blend variance exponent (4 default)
    /**
     * AW.W4.2 — the impasto relight direction (the movable directional source the
     * accumulated paint-height field catches). Optional; omitted = upper-left
     * (matching the prior fixed-rim default, so the still default reads identically).
     * Unit-ish [x, y, z] in screen space (z toward the viewer). AW.W8 drives this
     * from the cursor (cursor-as-light); the shader re-normalizes it.
     */
    lightDir?: [number, number, number];
    /**
     * AW.W4.2 / AX.W11 — the relight tint (the impasto catch-light). Optional;
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
     * AW.W6/W8 — the pointer/scroll interactivity opt-in (default OFF — the wispy-sky
     * default stays static). W6 declares the SHAPE; W8 wires the cursor-as-light /
     * velocity-reactive flow / scroll-coupling / WebGPU-wake behavior. Omitted = every
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
     * Run the expensive WebGL init — context creation, shader compile + GPU
     * link, first uniform upload, rAF arm. Idempotent. On the `"eager"` /
     * capture `initStrategy` `createAurora` already calls this before
     * returning; on `"deferred"` the consumer (e.g. `useAurora`) invokes it
     * past first paint. Throws on WebGL2/compile/link failure (O invariant
     * 24). A no-op once armed or once `dispose()` has run.
     */
    arm(): void;
    /**
     * BC.W-VIZ-AURORA (T2) — the device-resolved arm PROMISE. On the WebGPU
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
    setReducedMotion(flag: boolean): void;
    dispose(): void;
}

// ── Constants ──────────────────────────────────────────────────────────

export const MAX_NUCLEI = 6;
export const MAX_STOPS = 8;

// ── Minimum-viable default ─────────────────────────────────────────────

/**
 * A neutral starting point for consumers that build their own config from scratch.
 * Not a themed preset — the demo's 11 authored presets override every field.
 */
export const DEFAULT_AURORA_CONFIG: AuroraConfig = {
    palette: [
        { L: 0.72, C: 0.10, h: 220 },
        { L: 0.86, C: 0.06, h: 200 },
        { L: 0.95, C: 0.03, h: 80 },
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
};

/**
 * `PAPER_WASH_GROUND` — the library-canon recessive-ground crayon calibration
 * (BA.W-ATLAS-RECONCILE A-4a; d6 9467bd16 adopt). A pure PRESET PARTIAL (no
 * palette/nuclei/motion) pinning the recessive crayon-ground deposition dials so a
 * data-ground aurora reads as paper-on-tooth without each consumer dial-tuning the
 * same recessive calibration by hand. It carries NO palette/nuclei — the consumer
 * spreads it over its own pole-derived pigment (page-glow IS data-glow):
 * `const cfg = { ...consumerBase, ...PAPER_WASH_GROUND }`.
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
    // Recessive guards: single dry layer, NO impasto / sheen / broken-color flecks
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
