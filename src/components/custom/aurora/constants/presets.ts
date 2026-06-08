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

// AW.W4.3/W4.4 — `vangogh` (first-class energy-graded atomic-stroke medium) and
// `oil-pastel` (the reworked deposition+scumble+waxy medium) join the union
// additively. Both force the structure-tensor orientation (the painterly hug). The
// `uMedium` ladder dispatches vangogh==5 / oil-pastel==6; the bridge MEDIUM_ID map
// + the aurora.frag dispatch + the uniform uploads all move in the W4 lane.
export type AuroraMedium =
    | "smooth"
    | "pastel"
    | "watercolor"
    | "oil"
    | "vangogh"
    | "oil-pastel";

/** Applied only when `medium === "oil"`. Routes inside the shader. */
export type StrokeMode = "oil" | "knife" | "crayon" | "chunky";

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

export type WarpMode = "fbm" | "cellular" | "hybrid";

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
