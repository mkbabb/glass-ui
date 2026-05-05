import type { Ref } from "vue";

/**
 * Five-mood character expression for the Blob primitive.
 * SPEC.md §1, §5.
 */
export type BlobMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

/**
 * A single metaball source consumed by the renderer.
 * Coordinates are in normalized device coordinates (NDC, -1..1).
 */
export interface MetaballSource {
    x: number;
    y: number;
    radius: number;
    opacity: number;
}

/**
 * HSL decomposition of the blob's accent color, matched to the GLSL `uColor`
 * uniform. All components are normalized 0..1.
 */
export interface BlobColorHsl {
    h: number;
    s: number;
    l: number;
}

/**
 * Blob configuration. Every field is optional at the prop boundary; the
 * renderer consumes `Required<BlobConfig>` resolved against
 * `BLOB_CONFIG_DEFAULTS`.
 *
 * SPEC.md §4 + §11.2 (chromaticAberration).
 */
export interface BlobConfig {
    /** Backing canvas resolution in px. Independent of CSS size. */
    canvasSize?: number;
    /** Body radius in NDC. */
    bodyRadius?: number;
    /** Number of orbital satellites. */
    satelliteCount?: number;
    /** Satellite radius in NDC. */
    satelliteRadius?: number;
    /** Mean orbit radius in NDC. */
    orbitRadius?: number;
    /** Smooth-min union strength. Higher = gooier. */
    smoothK?: number;
    /** Surface-noise displacement amplitude. */
    noiseAmp?: number;
    /** Surface-noise spatial frequency. */
    noiseFreq?: number;
    /** Surface-noise temporal scroll. */
    noiseSpeed?: number;
    /** Body breath frequency in Hz. */
    pulseFreq?: number;
    /** Body breath amplitude. */
    pulseAmp?: number;
    /** Hue perturbation range in degrees. */
    hueRange?: number;
    /** Saturation perturbation (-1..1). */
    satShift?: number;
    /** Lightness perturbation (-1..1). */
    brightnessShift?: number;
    /** Color-noise spatial frequency. */
    colorNoiseFreq?: number;
    /** Color-noise temporal scroll. */
    colorNoiseSpeed?: number;
    /** Pointer-pull strength multiplier. 0 = no attraction. */
    pointerAttraction?: number;
    /** Pointer-attraction maximum displacement. */
    pointerStrength?: number;
    /** Orbit ellipse eccentricity. */
    eccentricity?: number;
    /** Global multiplier for orbital angular velocity. */
    orbitSpeedScale?: number;
    /** Global multiplier for satellite wobble overtones. */
    wobbleScale?: number;
    /** Multiplier for satellite merge-with-body rate. */
    mergeRate?: number;
    /** Merge phase duration in ms. */
    mergeDuration?: number;
    /** Random range for absorbed phase in ms. */
    absorbedDuration?: [number, number];
    /** Emerge phase duration in ms. */
    emergeDuration?: number;
    /** Random range for orbit-period rerolls in ms. */
    orbitDuration?: [number, number];
    /**
     * Chromatic aberration shader uniform fallback (NDC units, 0..0.005).
     * Per SPEC.md §11.2, the renderer prefers the live value of the
     * `--blob-chromatic-aberration` CSS variable; this field is the fallback
     * when the variable resolves empty.
     */
    chromaticAberration?: number;
}

/**
 * Default configuration for a Blob. φ-derived where the spec calls it; tuned
 * by character otherwise.
 *
 * SPEC.md §4.
 */
export const BLOB_CONFIG_DEFAULTS: Required<BlobConfig> = {
    canvasSize: 256,
    bodyRadius: 0.25,
    satelliteCount: 3,
    satelliteRadius: 0.13,
    orbitRadius: 0.35,
    smoothK: 0.191,
    noiseAmp: 0.025,
    noiseFreq: 3.5,
    noiseSpeed: 0.08,
    pulseFreq: 0.3,
    pulseAmp: 0.008,
    hueRange: 5,
    satShift: 0.0,
    brightnessShift: 0.0,
    colorNoiseFreq: 2.0,
    colorNoiseSpeed: 0.05,
    pointerAttraction: 0.0,
    pointerStrength: 0.08,
    eccentricity: 0.25,
    orbitSpeedScale: 1.0,
    wobbleScale: 1.0,
    mergeRate: 1.0,
    mergeDuration: 1800,
    absorbedDuration: [2000, 4000],
    emergeDuration: 2200,
    orbitDuration: [8000, 14000],
    chromaticAberration: 0.002,
};

/**
 * Renderer handle returned by `useMetaballRenderer`. The component or facade
 * owns the rAF subscription that calls `render(time)`; the renderer itself is
 * a pure draw routine plus a disposal contract.
 */
export interface RendererHandle {
    /** Draw a single frame at the supplied time (ms). */
    render(time: number): void;
    /** Tear down GL/Canvas2D resources, observers, and listeners. */
    dispose(): void;
    /** True while the WebGL2 path is active; false when running Canvas2D fallback. */
    isWebGL: Readonly<Ref<boolean>>;
}
