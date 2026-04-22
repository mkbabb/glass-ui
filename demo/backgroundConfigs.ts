import type { AuroraConfig } from "@/components/custom/aurora";
import {
    DEFAULT_AURORA_CONFIG,
    OPENAI_DAWN_PRESET,
    OPENAI_SKY_PRESET,
    OPENAI_MEADOW_PRESET,
    PASTEL_STORM_PRESET,
} from "@/components/custom/aurora";

export type ConfigContext = Record<string, unknown>;

export interface ConfigField {
    key: string;
    label: string;
    tooltip: string;
    type: "slider" | "select" | "switch" | "input" | "color" | "oklch" | "array";
    min?: number;
    max?: number;
    step?: number;
    items?: readonly string[];
    descriptions?: Record<string, string>;

    itemFields?: ConfigField[];
    itemLabel?: (i: number, item: Record<string, unknown>) => string;
    itemDefault?: () => Record<string, unknown>;
    minItems?: number;
    maxItems?: number;

    target?: "config" | "context";
    visibleWhen?: (config: Record<string, unknown>, context: ConfigContext) => boolean;
}

export interface ConfigSection {
    title: string;
    fields: ConfigField[];
    visibleWhen?: (config: Record<string, unknown>, context: ConfigContext) => boolean;
}

export interface ConfigPreset {
    label: string;
    apply: (config: Record<string, unknown>, context: ConfigContext) => void;
}

// ── Aurora sections ───────────────────────────────────────────────────────

export const AURORA_SECTIONS: ConfigSection[] = [
    {
        title: "Flow",
        fields: [
            { key: "flowPattern",   label: "Pattern",    tooltip: "Shape of the vector field driving color stretch and brush direction", type: "select", items: ["radial", "swirl", "diagonal", "linear"] as const },
            { key: "focalX",        label: "Focal X",    tooltip: "Horizontal focal point (for radial/swirl)",             type: "slider", min: 0, max: 1, step: 0.01, visibleWhen: (c) => c.flowPattern === "radial" || c.flowPattern === "swirl" },
            { key: "focalY",        label: "Focal Y",    tooltip: "Vertical focal point (for radial/swirl)",               type: "slider", min: 0, max: 1, step: 0.01, visibleWhen: (c) => c.flowPattern === "radial" || c.flowPattern === "swirl" },
            { key: "flowAngle",     label: "Angle",      tooltip: "Flow direction in degrees (for diagonal/linear)",       type: "slider", min: 0, max: 360, step: 1, visibleWhen: (c) => c.flowPattern === "diagonal" || c.flowPattern === "linear" },
            { key: "flowCurl",      label: "Curl",       tooltip: "Rotational swirl intensity",                             type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "flowStrength",  label: "Strength",   tooltip: "How strongly the flow stretches color regions",         type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
    {
        title: "Color field",
        fields: [
            { key: "colorScale",    label: "Region size",   tooltip: "Lower = larger color regions", type: "slider", min: 0.3, max: 3.5, step: 0.05 },
            { key: "warpAmount",    label: "Warp amount",   tooltip: "Domain-warp amplitude",        type: "slider", min: 0, max: 0.6, step: 0.01 },
            { key: "warpScale",     label: "Warp scale",    tooltip: "Warp noise frequency",         type: "slider", min: 0.5, max: 4, step: 0.05 },
            { key: "valueVariance", label: "Value variance",tooltip: "Wet/dry mottling within regions", type: "slider", min: 0, max: 0.4, step: 0.01 },
            { key: "softness",      label: "Softness",      tooltip: "Softness of color-region boundaries", type: "slider", min: 0.3, max: 1, step: 0.01 },
            { key: "saturation",    label: "Saturation",    tooltip: "Global saturation scale",      type: "slider", min: 0.5, max: 1.4, step: 0.01 },
        ],
    },
    {
        title: "Texture",
        fields: [
            { key: "brushAmount",     label: "Brush amount",    tooltip: "Pastel brush mottling strength",    type: "slider", min: 0, max: 0.5, step: 0.01 },
            { key: "brushScale",      label: "Brush scale",     tooltip: "Brush stroke frequency",            type: "slider", min: 50, max: 400, step: 2 },
            { key: "brushAnisotropy", label: "Brush anisotropy",tooltip: "Elongation along flow direction",   type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "paperGrain",      label: "Paper grain",     tooltip: "Fine paper-tooth grain (very subtle)", type: "slider", min: 0, max: 0.04, step: 0.001 },
        ],
    },
    {
        title: "Motion",
        fields: [
            { key: "flowDrift",    label: "Flow drift",    tooltip: "Speed of flow rotation (slow)",     type: "slider", min: 0, max: 0.05, step: 0.001 },
            { key: "paletteDrift", label: "Palette drift", tooltip: "Speed of color-field drift",        type: "slider", min: 0, max: 0.05, step: 0.001 },
            { key: "breathDepth",  label: "Breath depth",  tooltip: "Amplitude of global brightness breathing", type: "slider", min: 0, max: 0.2, step: 0.005 },
            { key: "breathPeriod", label: "Breath period", tooltip: "Seconds per brightness cycle",      type: "slider", min: 10, max: 90, step: 1 },
        ],
    },
    {
        title: "Rendering",
        fields: [
            { key: "noiseOctaves", label: "Noise octaves", tooltip: "fBm detail (more = finer, slower)", type: "select", items: ["3", "4", "5"] as const },
            { key: "alphaLight",     label: "Alpha (light)",   tooltip: "Overall opacity in light mode",    type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "alphaDark",      label: "Alpha (dark)",    tooltip: "Overall opacity in dark mode",     type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "darkDesaturate", label: "Dark desaturate", tooltip: "Extra desaturation in dark mode",  type: "slider", min: 0, max: 1, step: 0.01 },
        ],
    },
    {
        title: "Palette",
        fields: [
            {
                key: "palette",
                label: "Stops",
                tooltip: "Multi-stop OKLCh palette LUT. Order defines the gradient; first stop is 'inside' regions, last is 'outside'.",
                type: "array",
                minItems: 2,
                maxItems: 8,
                itemLabel: (i) => `Stop ${i + 1}`,
                itemDefault: () => ({ L: 0.8, C: 0.1, h: 40 }),
                itemFields: [
                    { key: "L", label: "L (lightness)", tooltip: "OKLCh lightness 0..1",  type: "slider", min: 0, max: 1, step: 0.01 },
                    { key: "C", label: "C (chroma)",    tooltip: "OKLCh chroma 0..0.4",    type: "slider", min: 0, max: 0.4, step: 0.005 },
                    { key: "h", label: "h (hue)",       tooltip: "OKLCh hue 0..360°",      type: "slider", min: 0, max: 360, step: 1 },
                ],
            },
        ],
    },
];

// ── Aurora presets (header row) ───────────────────────────────────────────

function applyAuroraPreset(
    config: Record<string, unknown>,
    preset: Partial<AuroraConfig>,
): void {
    const clonedPalette = preset.palette
        ? preset.palette.map((s) => ({ ...s }))
        : DEFAULT_AURORA_CONFIG.palette.map((s) => ({ ...s }));
    Object.assign(config, {
        ...DEFAULT_AURORA_CONFIG,
        ...preset,
        palette: clonedPalette,
    });
}

export const AURORA_PRESETS: ConfigPreset[] = [
    { label: "OpenAI Dawn",    apply: (c) => applyAuroraPreset(c, OPENAI_DAWN_PRESET)    },
    { label: "OpenAI Sky",     apply: (c) => applyAuroraPreset(c, OPENAI_SKY_PRESET)     },
    { label: "OpenAI Meadow",  apply: (c) => applyAuroraPreset(c, OPENAI_MEADOW_PRESET)  },
    { label: "Pastel Storm",   apply: (c) => applyAuroraPreset(c, PASTEL_STORM_PRESET)   },
];

// ── Metaballs (unchanged) ─────────────────────────────────────────────────

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
