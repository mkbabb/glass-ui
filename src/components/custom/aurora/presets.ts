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

export interface OklchStop {
    L: number; // 0..1
    C: number; // 0..0.4 typical
    h: number; // 0..360
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
    /** 0..0.03 — orbit amplitude for slow drift. */
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

export type AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil";

/** Applied only when `medium === "oil"`. Routes inside the shader. */
export type StrokeMode = "oil" | "knife" | "crayon" | "chunky";

export type FlowPattern = "none" | "radial" | "swirl" | "diagonal" | "multi";

export type WarpMode = "fbm" | "cellular" | "hybrid";

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
    flow: AuroraFlow;
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

    // Motion
    nucleiDrift: number; // 0..0.05
    paletteDrift: number; // 0..0.04
    breathDepth: number; // 0..0.15
    breathPeriod: number; // 10..90

    // Output
    saturation: number; // 0.6..1.3
    paperGrain: number; // 0..0.02
    alpha: number; // 0..1
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
        { x: 0.3, y: 0.3, radius: 0.5, paletteBias: 0.0, valueBias: 0, driftRadius: 0.015, driftPhase: 0.0 },
        { x: 0.7, y: 0.65, radius: 0.5, paletteBias: 1.0, valueBias: 0.05, driftRadius: 0.015, driftPhase: 2.4 },
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
    nucleiDrift: 0.01,
    paletteDrift: 0.008,
    breathDepth: 0.05,
    breathPeriod: 40,
    saturation: 1.0,
    paperGrain: 0.008,
    alpha: 1.0,
};
