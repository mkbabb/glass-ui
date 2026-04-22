export interface OklchStop {
    L: number;
    C: number;
    h: number;
}

export type FlowPattern = "radial" | "swirl" | "diagonal" | "linear";

export interface AuroraConfig {
    // Palette — one global multi-stop LUT
    palette: OklchStop[];         // 3..8 stops

    // Flow field
    flowPattern: FlowPattern;
    focalX: number;               // 0..1, for radial/swirl
    focalY: number;
    flowAngle: number;            // degrees, for diagonal/linear
    flowCurl: number;             // 0..1, swirl intensity
    flowStrength: number;         // 0..1, how strongly the flow stretches colors

    // Color field
    colorScale: number;           // 0.4..3.5, size of color regions (lower = larger)
    warpAmount: number;           // 0..0.6, domain-warp amplitude along flow
    warpScale: number;            // 0.5..4, warp noise frequency
    valueVariance: number;        // 0..0.35, within-region value mottling

    // Texture
    brushAmount: number;          // 0..0.5
    brushScale: number;           // 50..400
    brushAnisotropy: number;      // 0..1, along-flow elongation
    paperGrain: number;           // 0..0.04

    // Motion
    flowDrift: number;            // 0.001..0.03, flow rotation speed
    paletteDrift: number;         // 0.001..0.04, color-field drift
    breathDepth: number;          // 0..0.2, global brightness breathing
    breathPeriod: number;         // 15..90 seconds

    // Output
    noiseOctaves: 3 | 4 | 5;
    saturation: number;           // 0.6..1.3, global saturation scale
    softness: number;             // 0.4..1, blur of color boundaries
    alphaLight: number;
    alphaDark: number;
    darkDesaturate: number;
}

export const MAX_PALETTE_STOPS = 8;

function s(L: number, C: number, h: number): OklchStop {
    return { L, C, h };
}

// Pink/magenta/orange/yellow/cream — matches Deliberative alignment & model-icons refs
const OPENAI_DAWN_PALETTE: OklchStop[] = [
    s(0.58, 0.22, 28),   // deep red-orange
    s(0.70, 0.24, 12),   // scarlet
    s(0.78, 0.20, 355),  // hot pink
    s(0.85, 0.14, 340),  // light pink
    s(0.90, 0.14, 68),   // soft orange
    s(0.94, 0.16, 95),   // warm yellow
    s(0.96, 0.06, 88),   // pale yellow
    s(0.97, 0.03, 50),   // cream
];

// Monotone blue with cyan highlights — matches GPT-4.5 ref
const OPENAI_SKY_PALETTE: OklchStop[] = [
    s(0.60, 0.18, 245),  // deep blue
    s(0.72, 0.16, 240),  // blue
    s(0.82, 0.11, 230),  // light blue
    s(0.90, 0.06, 220),  // pale cyan
    s(0.96, 0.02, 200),  // near-white
];

// Yellow / cyan / blue — matches GA Stories ref
const OPENAI_MEADOW_PALETTE: OklchStop[] = [
    s(0.55, 0.20, 245),  // deep blue
    s(0.78, 0.14, 220),  // sky
    s(0.92, 0.08, 180),  // pale cyan
    s(0.95, 0.17, 105),  // soft yellow
    s(0.90, 0.20, 95),   // citrus yellow
];

// Orange / purple / teal — matches 157_edited oil pastel ref
const PASTEL_STORM_PALETTE: OklchStop[] = [
    s(0.68, 0.20, 40),   // orange
    s(0.78, 0.14, 55),   // peach
    s(0.82, 0.13, 320),  // lavender
    s(0.74, 0.16, 290),  // violet
    s(0.80, 0.12, 200),  // teal
    s(0.90, 0.08, 85),   // cream
];

export const DEFAULT_AURORA_CONFIG: AuroraConfig = {
    palette: OPENAI_DAWN_PALETTE,

    flowPattern: "radial",
    focalX: 0.2,
    focalY: 0.85,
    flowAngle: 25,
    flowCurl: 0.25,
    flowStrength: 0.55,

    colorScale: 0.85,
    warpAmount: 0.38,
    warpScale: 1.3,
    valueVariance: 0.14,

    brushAmount: 0.35,
    brushScale: 150,
    brushAnisotropy: 0.8,
    paperGrain: 0.008,

    flowDrift: 0.006,
    paletteDrift: 0.012,
    breathDepth: 0.05,
    breathPeriod: 42,

    noiseOctaves: 4,
    saturation: 1.02,
    softness: 0.7,
    alphaLight: 0.95,
    alphaDark: 0.8,
    darkDesaturate: 0.18,
};

export const OPENAI_DAWN_PRESET: Partial<AuroraConfig> = {
    palette: OPENAI_DAWN_PALETTE,
    flowPattern: "radial",
    focalX: 0.18, focalY: 0.88,
    flowCurl: 0.2, flowStrength: 0.6,
    colorScale: 0.8, warpAmount: 0.42, warpScale: 1.4,
    valueVariance: 0.15,
    brushAmount: 0.45, brushScale: 190, brushAnisotropy: 0.88,
    paperGrain: 0.01,
    flowDrift: 0.005, paletteDrift: 0.011,
    saturation: 1.05, softness: 0.7,
};

export const OPENAI_SKY_PRESET: Partial<AuroraConfig> = {
    palette: OPENAI_SKY_PALETTE,
    flowPattern: "swirl",
    focalX: 0.35, focalY: 0.55,
    flowCurl: 0.6, flowStrength: 0.45,
    colorScale: 0.55, warpAmount: 0.5, warpScale: 1.1,
    valueVariance: 0.1,
    brushAmount: 0.18, brushScale: 130, brushAnisotropy: 0.45,
    paperGrain: 0.005,
    flowDrift: 0.007, paletteDrift: 0.016,
    saturation: 0.95, softness: 0.92,
};

export const OPENAI_MEADOW_PRESET: Partial<AuroraConfig> = {
    palette: OPENAI_MEADOW_PALETTE,
    flowPattern: "diagonal",
    flowAngle: 118,
    flowCurl: 0.28, flowStrength: 0.55,
    colorScale: 0.5, warpAmount: 0.55, warpScale: 1.0,
    valueVariance: 0.1,
    brushAmount: 0.14, brushScale: 100, brushAnisotropy: 0.55,
    paperGrain: 0.004,
    flowDrift: 0.005, paletteDrift: 0.02,
    saturation: 1.0, softness: 0.95,
};

export const PASTEL_STORM_PRESET: Partial<AuroraConfig> = {
    palette: PASTEL_STORM_PALETTE,
    flowPattern: "linear",
    flowAngle: 35,
    flowCurl: 0.4, flowStrength: 0.6,
    colorScale: 1.15, warpAmount: 0.4, warpScale: 1.8,
    valueVariance: 0.22,
    brushAmount: 0.55, brushScale: 230, brushAnisotropy: 0.78,
    paperGrain: 0.018,
    flowDrift: 0.007, paletteDrift: 0.013,
    saturation: 1.06, softness: 0.55,
};
