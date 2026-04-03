export interface ConfigField {
    key: string;
    label: string;
    tooltip: string;
    type: "slider" | "select" | "switch" | "input";
    min?: number;
    max?: number;
    step?: number;
    items?: readonly string[];
    descriptions?: Record<string, string>;
}

export interface ConfigSection {
    title: string;
    fields: ConfigField[];
}

// ── Aurora (explicit color mode) ──

export const AURORA_SECTIONS: ConfigSection[] = [
    {
        title: "Geometry",
        fields: [
            { key: "blobCount", label: "Blob count", tooltip: "Number of gradient blobs", type: "slider", min: 1, max: 20, step: 1 },
            { key: "baseRadius", label: "Base radius", tooltip: "Blob radius as fraction of viewport", type: "slider", min: 0.02, max: 0.6, step: 0.01 },
            { key: "radiusVariance", label: "Radius variance", tooltip: "Random spread around base radius", type: "slider", min: 0, max: 0.2, step: 0.005 },
            { key: "viewportAnchorRatio", label: "Viewport anchor", tooltip: "1 = blobs anchored to viewport, 0 = anchored to page", type: "slider", min: 0, max: 1, step: 0.05 },
        ],
    },
    {
        title: "Motion",
        fields: [
            { key: "speed", label: "Speed", tooltip: "Animation speed multiplier", type: "slider", min: 0, max: 2, step: 0.01 },
            { key: "orbitAmplitude", label: "Orbit amplitude", tooltip: "How far blobs wander from anchor", type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
    {
        title: "Rendering",
        fields: [
            { key: "blur", label: "Blur", tooltip: "Canvas filter blur in px", type: "slider", min: 0, max: 200, step: 1 },
            { key: "blendMode", label: "Blend mode", tooltip: "Canvas globalCompositeOperation", type: "select", items: ["source-over", "screen", "multiply", "overlay", "lighten", "color-dodge"] as const },
            { key: "alphaLight", label: "Alpha (light)", tooltip: "Blob opacity in light mode", type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "alphaDark", label: "Alpha (dark)", tooltip: "Blob opacity in dark mode", type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
    {
        title: "Gradient",
        fields: [
            { key: "gradStop2", label: "Stop 2", tooltip: "Second gradient stop position", type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "gradStop3", label: "Stop 3", tooltip: "Third gradient stop position", type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "gradStop4", label: "Stop 4", tooltip: "Fourth gradient stop position", type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
    {
        title: "Surface",
        fields: [
            { key: "surfaceMode", label: "Surface mode", tooltip: "Background fill behind blobs", type: "select", items: ["none", "theme", "color"] as const },
            { key: "surfaceAlpha", label: "Surface alpha", tooltip: "Opacity of surface fill", type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
];

// ── Aurora (derived / atmosphere mode) — same as above plus OKLCH fields ──

export const ATMOSPHERE_SECTIONS: ConfigSection[] = [
    {
        title: "OKLCH Derivation",
        fields: [
            { key: "lShiftLarge", label: "L shift (large)", tooltip: "Lightness shift for large blobs", type: "slider", min: 0, max: 0.5, step: 0.01 },
            { key: "lShiftSmall", label: "L shift (small)", tooltip: "Lightness shift for small blobs", type: "slider", min: 0, max: 0.5, step: 0.01 },
            { key: "hueShiftLarge", label: "Hue shift (large)", tooltip: "Hue rotation for large blobs (degrees)", type: "slider", min: 0, max: 180, step: 1 },
            { key: "hueShiftSmall", label: "Hue shift (small)", tooltip: "Hue rotation for small blobs (degrees)", type: "slider", min: 0, max: 180, step: 1 },
        ],
    },
    ...AURORA_SECTIONS,
];

// ── Metaballs ──

export const METABALL_SECTIONS: ConfigSection[] = [
    {
        title: "Geometry",
        fields: [
            { key: "blobCount", label: "Blob count", tooltip: "Number of metaballs", type: "slider", min: 1, max: 20, step: 1 },
            { key: "baseRadius", label: "Base radius", tooltip: "Metaball radius as fraction of viewport", type: "slider", min: 0.02, max: 0.5, step: 0.01 },
            { key: "orbitAmplitude", label: "Orbit amplitude", tooltip: "How far blobs wander", type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
    {
        title: "Rendering",
        fields: [
            { key: "speed", label: "Speed", tooltip: "Animation speed", type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "threshold", label: "Threshold", tooltip: "Isosurface threshold", type: "slider", min: 0.1, max: 3, step: 0.05 },
            { key: "edgeSoftness", label: "Edge softness", tooltip: "Softness of metaball edges", type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "bgAlpha", label: "Background alpha", tooltip: "Background opacity", type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
];
