// ── Atmosphere canvas configuration ──

export interface AtmosphereConfig {
    /** Background opacity (0–1) */
    bgAlpha: number;
    /** Blur radius in px */
    blur: number;
    /** Animation speed multiplier */
    speed: number;
    /** Number of blobs to render */
    blobCount: number;
    /** Base radius as fraction of max(w,h) */
    blobBaseRadius: number;
    /** Radius increment per blob index */
    blobRadiusStep: number;
    /** Small blob radius multiplier (vs large) */
    smallRadiusScale: number;
    /** Peak alpha for large blobs */
    peakAlphaLarge: number;
    /** Peak alpha for small blobs */
    peakAlphaSmall: number;
    /** L shift magnitude for large blobs */
    lShiftLarge: number;
    /** L shift magnitude for small blobs */
    lShiftSmall: number;
    /** Hue shift for large blobs (degrees) */
    hueShiftLarge: number;
    /** Hue shift for small blobs (degrees) */
    hueShiftSmall: number;
    /** Orbit X amplitude as fraction of width */
    orbitX: number;
    /** Orbit Y amplitude as fraction of height */
    orbitY: number;
    /** Gradient stop 2 position (0–1) */
    gradStop2: number;
    /** Gradient stop 3 position (0–1) */
    gradStop3: number;
    /** Gradient stop 4 (fade-out) position (0–1) */
    gradStop4: number;
    /** Canvas composite operation for blob rendering */
    blendMode: GlobalCompositeOperation;
}

export const DEFAULT_ATMOSPHERE_CONFIG: AtmosphereConfig = {
    bgAlpha: 0.97,
    blur: 8,
    speed: 0.10,
    blobCount: 10,
    blobBaseRadius: 0.10,
    blobRadiusStep: 0.015,
    smallRadiusScale: 0.50,
    peakAlphaLarge: 0.15,
    peakAlphaSmall: 0.08,
    lShiftLarge: 0.15,
    lShiftSmall: 0.10,
    hueShiftLarge: 25,
    hueShiftSmall: 55,
    orbitX: 0.45,
    orbitY: 0.55,
    gradStop2: 0.30,
    gradStop3: 0.60,
    gradStop4: 1.00,
    blendMode: "source-over" as GlobalCompositeOperation,
};

/** Resolve any CSS color string → [r, g, b] via a 1×1 canvas. */
export function cssToRgb(css: string): [number, number, number] {
    if (!cssToRgb._ctx) {
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        cssToRgb._ctx = c.getContext("2d", { willReadFrequently: true })!;
    }
    const ctx = cssToRgb._ctx;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#808080";
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0]!, d[1]!, d[2]!];
}
cssToRgb._ctx = null as CanvasRenderingContext2D | null;

// ── Param metadata (for UI controls) ──

export interface AtmosphereParam {
    key: keyof AtmosphereConfig;
    label: string;
    desc: string;
    min: number;
    max: number;
    step: number;
}

export interface AtmosphereSection {
    title: string;
    desc: string;
    params: AtmosphereParam[];
}

export const ATMOSPHERE_SECTIONS: AtmosphereSection[] = [
    {
        title: "Surface",
        desc: "The base layer beneath the blobs.",
        params: [
            { key: "bgAlpha", label: "Opacity", desc: "How opaque the base fill is", min: 0, max: 1, step: 0.05 },
            { key: "blur", label: "Blur", desc: "Gaussian blur on every blob", min: 0, max: 100, step: 1 },
            { key: "speed", label: "Speed", desc: "Animation tempo multiplier", min: 0, max: 2, step: 0.05 },
        ],
    },
    {
        title: "Geometry",
        desc: "Size, count, and orbit paths.",
        params: [
            { key: "blobCount", label: "Count", desc: "Total number of blobs", min: 1, max: 20, step: 1 },
            { key: "blobBaseRadius", label: "Base radius", desc: "Starting size as % of viewport", min: 0.02, max: 0.5, step: 0.01 },
            { key: "blobRadiusStep", label: "Radius step", desc: "Each subsequent blob grows by", min: 0, max: 0.1, step: 0.005 },
            { key: "smallRadiusScale", label: "Small scale", desc: "Size ratio for the small blobs", min: 0.1, max: 1, step: 0.05 },
            { key: "orbitX", label: "Orbit X", desc: "Horizontal drift amplitude", min: 0, max: 0.5, step: 0.01 },
            { key: "orbitY", label: "Orbit Y", desc: "Vertical drift amplitude", min: 0, max: 0.5, step: 0.01 },
        ],
    },
    {
        title: "Color",
        desc: "OKLCH lightness and hue offsets.",
        params: [
            { key: "peakAlphaLarge", label: "Alpha (large)", desc: "Opacity at blob center", min: 0, max: 1, step: 0.05 },
            { key: "peakAlphaSmall", label: "Alpha (small)", desc: "Opacity of smaller blobs", min: 0, max: 1, step: 0.05 },
            { key: "lShiftLarge", label: "L shift (large)", desc: "Lightness variation for big blobs", min: 0, max: 0.5, step: 0.01 },
            { key: "lShiftSmall", label: "L shift (small)", desc: "Lightness variation for small", min: 0, max: 0.5, step: 0.01 },
            { key: "hueShiftLarge", label: "Hue (large)", desc: "Degrees of hue rotation", min: 0, max: 180, step: 1 },
            { key: "hueShiftSmall", label: "Hue (small)", desc: "More rotation for small blobs", min: 0, max: 180, step: 1 },
        ],
    },
    {
        title: "Falloff",
        desc: "Radial gradient shape per blob.",
        params: [
            { key: "gradStop2", label: "Mid", desc: "Where gradient hits 60% fade", min: 0.05, max: 0.8, step: 0.01 },
            { key: "gradStop3", label: "Fade", desc: "Where gradient hits 20% fade", min: 0.1, max: 0.95, step: 0.01 },
            { key: "gradStop4", label: "End", desc: "Radius at full transparency", min: 0.2, max: 1, step: 0.01 },
        ],
    },
];
