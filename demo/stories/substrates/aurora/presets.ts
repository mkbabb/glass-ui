// The Aurora page's presets: one authored config per look. Nuclei y runs from the
// top (0) to the bottom (1).
import type { ConfiguratorPreset } from "@glass/components/configurator";
import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "@glass/components/aurora";

function cfg(overrides: Partial<AuroraConfig>): AuroraConfig {
    return {
        ...DEFAULT_AURORA_CONFIG,
        ...overrides,
        interactivity: {
            swirl: true,
            amplitude: 0.45,
            ...overrides.interactivity,
        },
    };
}

const SETTING_SUN = cfg({
    palette: [
        { L: 0.52, C: 0.15,  h: 32  },  // coral-amber base
        { L: 0.66, C: 0.145, h: 12  },  // rose sun-core
        { L: 0.78, C: 0.135, h: 55  },  // warm amber
        { L: 0.87, C: 0.11,  h: 82  },  // warm gold
        { L: 0.93, C: 0.045, h: 78  },  // pale cream apex
    ],
    nuclei: [
        // the horizon band, low and centred
        { x: 0.50, y: 0.82, radius: 0.52, paletteBias: 0.15, valueBias:  0.05, driftRadius: 0.024, driftPhase: 0.2, elongation: 2.0, angle: 0 },
        { x: 0.18, y: 0.72, radius: 0.46, paletteBias: 0.00, valueBias:  0.00, driftRadius: 0.026, driftPhase: 1.6 },
        { x: 0.84, y: 0.68, radius: 0.46, paletteBias: 0.45, valueBias:  0.03, driftRadius: 0.022, driftPhase: 3.0 },
        { x: 0.62, y: 0.48, radius: 0.50, paletteBias: 0.72, valueBias:  0.02, driftRadius: 0.020, driftPhase: 4.3 },
        { x: 0.34, y: 0.20, radius: 0.56, paletteBias: 1.00, valueBias:  0.08, driftRadius: 0.018, driftPhase: 5.5 },
    ],
    softmaxBeta: 3.0,
    valueVariance: 0.09,
    warpAmount: 0.5,
    warpScale: 1.5,
    warpDrift: 0.008,
    noiseOctaves: 4,
    medium: "smooth",
    nucleiDrift: 0.022,
    paletteDrift: 0.016,
    breathDepth: 0.05,
    breathPeriod: 44,
    saturation: 1.02,
});

const DUSK = cfg({
    palette: [
        { L: 0.50, C: 0.17,  h: 28  },  // deep coral
        { L: 0.62, C: 0.165, h: 8   },  // coral-rose
        { L: 0.74, C: 0.14,  h: 50  },  // warm amber
        { L: 0.84, C: 0.10,  h: 78  },  // gold
        { L: 0.91, C: 0.075, h: 320 },  // dusk-lilac whisper (low chroma)
    ],
    nuclei: [
        { x: 0.50, y: 0.84, radius: 0.52, paletteBias: 0.12, valueBias:  0.04, driftRadius: 0.026, driftPhase: 0.3, elongation: 2.1, angle: 0 },
        { x: 0.20, y: 0.70, radius: 0.46, paletteBias: 0.00, valueBias:  0.00, driftRadius: 0.028, driftPhase: 1.8 },
        { x: 0.82, y: 0.66, radius: 0.46, paletteBias: 0.42, valueBias:  0.02, driftRadius: 0.024, driftPhase: 3.2 },
        { x: 0.60, y: 0.46, radius: 0.50, paletteBias: 0.70, valueBias:  0.02, driftRadius: 0.020, driftPhase: 4.4 },
        { x: 0.36, y: 0.18, radius: 0.54, paletteBias: 1.00, valueBias:  0.06, driftRadius: 0.018, driftPhase: 5.6 },
    ],
    softmaxBeta: 3.0,
    valueVariance: 0.10,
    warpAmount: 0.52,
    warpScale: 1.5,
    warpDrift: 0.009,
    noiseOctaves: 4,
    medium: "smooth",
    nucleiDrift: 0.024,
    paletteDrift: 0.018,
    breathDepth: 0.05,
    breathPeriod: 46,
    saturation: 1.04,
});

const SKY = cfg({
    palette: [
        { L: 0.55, C: 0.12, h: 240 },  // mid cerulean
        { L: 0.72, C: 0.10, h: 235 },  // lighter blue
        { L: 0.88, C: 0.05, h: 225 },  // near-white sky
        { L: 0.46, C: 0.14, h: 248 },  // deeper blue
    ],
    nuclei: [
        { x: 0.15, y: 0.70, radius: 0.55, paletteBias: 0.00, valueBias:  0.00, driftRadius: 0.015, driftPhase: 0.0 },
        { x: 0.75, y: 0.25, radius: 0.60, paletteBias: 0.35, valueBias:  0.05, driftRadius: 0.020, driftPhase: 1.7 },
        { x: 0.90, y: 0.85, radius: 0.45, paletteBias: 0.75, valueBias:  0.10, driftRadius: 0.018, driftPhase: 3.1 },
        { x: 0.30, y: 0.40, radius: 0.50, paletteBias: 1.00, valueBias: -0.05, driftRadius: 0.022, driftPhase: 4.9 },
    ],
    softmaxBeta: 3.2,
    valueVariance: 0.08,
    warpAmount: 0.5,
    warpScale: 1.4,
    warpDrift: 0.010,
    noiseOctaves: 4,
    breathDepth: 0.05,
    breathPeriod: 40,
    saturation: 0.95,
});

const MEADOW = cfg({
    palette: [
        { L: 0.90, C: 0.17, h: 100 },  // lemon yellow
        { L: 0.92, C: 0.08, h: 95  },  // pale yellow-green
        { L: 0.95, C: 0.02, h: 80  },  // cream
        { L: 0.72, C: 0.14, h: 220 },  // mid cyan-blue
        { L: 0.55, C: 0.16, h: 240 },  // deep blue
    ],
    nuclei: [
        { x: 0.18, y: 0.55, radius: 0.55, paletteBias: 0.00, valueBias:  0.03, driftRadius: 0.012, driftPhase: 0.3 },
        { x: 0.48, y: 0.50, radius: 0.42, paletteBias: 0.50, valueBias:  0.08, driftRadius: 0.010, driftPhase: 2.2 },
        { x: 0.90, y: 0.30, radius: 0.40, paletteBias: 1.00, valueBias: -0.05, driftRadius: 0.014, driftPhase: 4.0 },
    ],
    softmaxBeta: 4.0,
    valueVariance: 0.10,
    warpAmount: 0.55,
    warpScale: 2.0,
    warpDrift: 0.007,
    warpMode: "hybrid",
    noiseOctaves: 4,
    medium: "watercolor",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -25, curl: 0.2 },
    strokeAmount: 0.15,
    wetEdge: 0.45,
    granulation: 0.15,
    breathDepth: 0.04,
    breathPeriod: 50,
    saturation: 1.0,
});

const PASTEL = cfg({
    palette: [
        { L: 0.58, C: 0.22, h: 25  },  // vermilion
        { L: 0.70, C: 0.20, h: 10  },  // coral red
        { L: 0.78, C: 0.15, h: 355 },  // hot pink
        { L: 0.86, C: 0.10, h: 75  },  // butter yellow
        { L: 0.90, C: 0.05, h: 310 },  // lilac
        { L: 0.94, C: 0.02, h: 280 },  // soft lavender
    ],
    nuclei: [
        { x: 0.10, y: 0.90, radius: 0.38, paletteBias: 0.00, valueBias: -0.08, driftRadius: 0.010, driftPhase: 0.2 },
        { x: 0.35, y: 0.60, radius: 0.42, paletteBias: 0.30, valueBias:  0.00, driftRadius: 0.012, driftPhase: 1.8 },
        { x: 0.70, y: 0.35, radius: 0.45, paletteBias: 0.60, valueBias:  0.06, driftRadius: 0.014, driftPhase: 3.3 },
        { x: 0.90, y: 0.85, radius: 0.45, paletteBias: 1.00, valueBias:  0.08, driftRadius: 0.016, driftPhase: 5.0 },
    ],
    softmaxBeta: 5.0,
    valueVariance: 0.08,
    warpAmount: 0.35,
    warpScale: 1.3,
    warpDrift: 0.008,
    noiseOctaves: 4,
    medium: "pastel",
    flow: { pattern: "radial", focalX: 0.10, focalY: 0.90, angle: 0, curl: 0.15 },
    strokeAmount: 0.55,
    strokeScale: 180,
    strokeAnisotropy: 0.85,
    breathDepth: 0.05,
    breathPeriod: 45,
    saturation: 1.05,
    paperGrain: 0.012,
});

const OIL = cfg({
    palette: [
        { L: 0.52, C: 0.19, h: 30  },  // burnt sienna
        { L: 0.68, C: 0.17, h: 20  },  // warm coral
        { L: 0.80, C: 0.11, h: 65  },  // ochre
        { L: 0.60, C: 0.13, h: 280 },  // muted violet
        { L: 0.48, C: 0.10, h: 230 },  // slate blue
        { L: 0.90, C: 0.04, h: 80  },  // cream highlight
    ],
    nuclei: [
        { x: 0.22, y: 0.30, radius: 0.42, paletteBias: 0.00, valueBias:  0.02, driftRadius: 0.008, driftPhase: 0.1 },
        { x: 0.60, y: 0.20, radius: 0.38, paletteBias: 0.25, valueBias: -0.02, driftRadius: 0.009, driftPhase: 1.3 },
        { x: 0.82, y: 0.55, radius: 0.44, paletteBias: 0.55, valueBias:  0.03, driftRadius: 0.010, driftPhase: 2.7 },
        { x: 0.30, y: 0.78, radius: 0.40, paletteBias: 0.80, valueBias:  0.00, driftRadius: 0.008, driftPhase: 4.1 },
        { x: 0.75, y: 0.85, radius: 0.36, paletteBias: 1.00, valueBias:  0.05, driftRadius: 0.009, driftPhase: 5.6 },
    ],
    softmaxBeta: 4.5,
    valueVariance: 0.10,
    warpAmount: 0.38,
    warpScale: 1.4,
    warpDrift: 0.005,
    noiseOctaves: 4,
    medium: "oil",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -18, curl: 0.08 },
    strokeAmount: 0.85,
    strokeScale: 150,
    strokeAnisotropy: 0.78,
    strokeLayers: 1,
    strokeMode: "knife",
    impasto: 0.65,
    brokenColor: 0.25,
    canvasGrain: 0.04,
    breathDepth: 0.03,
    breathPeriod: 60,
    saturation: 1.05,
    paperGrain: 0.008,
});

const VANGOGH = cfg({
    palette: [
        { L: 0.35, C: 0.15, h: 245 },  // deep indigo
        { L: 0.55, C: 0.18, h: 235 },  // cobalt
        { L: 0.72, C: 0.15, h: 220 },  // sky
        { L: 0.85, C: 0.14, h: 80  },  // yellow
        { L: 0.78, C: 0.16, h: 60  },  // orange
        { L: 0.92, C: 0.06, h: 85  },  // cream
    ],
    nuclei: [
        { x: 0.20, y: 0.28, radius: 0.42, paletteBias: 0.00, valueBias: -0.02, driftRadius: 0.012, driftPhase: 0.2 },
        { x: 0.58, y: 0.24, radius: 0.38, paletteBias: 0.25, valueBias:  0.02, driftRadius: 0.013, driftPhase: 1.4 },
        { x: 0.82, y: 0.42, radius: 0.38, paletteBias: 0.55, valueBias:  0.05, driftRadius: 0.012, driftPhase: 2.8 },
        { x: 0.30, y: 0.76, radius: 0.42, paletteBias: 0.78, valueBias:  0.00, driftRadius: 0.013, driftPhase: 4.0 },
        { x: 0.72, y: 0.82, radius: 0.40, paletteBias: 1.00, valueBias:  0.03, driftRadius: 0.012, driftPhase: 5.3 },
    ],
    softmaxBeta: 4.0,
    valueVariance: 0.12,
    warpAmount: 0.50,
    warpScale: 1.6,
    warpDrift: 0.008,
    noiseOctaves: 4,
    medium: "vangogh",
    flow: { pattern: "swirl", focalX: 0.55, focalY: 0.45, angle: 0, curl: 0.55 },
    strokeAmount: 0.85,
    strokeScale: 110,
    strokeAnisotropy: 0.92,
    strokeLayers: 1,
    // The painterly mediums force the structure-tensor orientation regardless of
    // this field; declared so the config reads true to the engine's behaviour.
    strokeOrient: "tensor",
    impasto: 0.48,
    brokenColor: 0.30,
    canvasGrain: 0.03,
    breathDepth: 0.04,
    breathPeriod: 50,
    saturation: 1.06,
    paperGrain: 0.009,
});

const OIL_PASTEL = cfg({
    palette: [
        { L: 0.56, C: 0.20, h: 22  },  // deep vermillion
        { L: 0.70, C: 0.20, h: 40  },  // tangerine
        { L: 0.82, C: 0.16, h: 75  },  // warm yellow
        { L: 0.64, C: 0.15, h: 340 },  // hot pink
        { L: 0.58, C: 0.15, h: 295 },  // magenta-violet
        { L: 0.92, C: 0.05, h: 65  },  // cream
    ],
    nuclei: [
        { x: 0.15, y: 0.30, radius: 0.48, paletteBias: 0.00, valueBias: -0.03, driftRadius: 0.012, driftPhase: 0.2 },
        { x: 0.50, y: 0.25, radius: 0.42, paletteBias: 0.28, valueBias:  0.00, driftRadius: 0.013, driftPhase: 1.4 },
        { x: 0.82, y: 0.40, radius: 0.46, paletteBias: 0.52, valueBias:  0.05, driftRadius: 0.012, driftPhase: 2.8 },
        { x: 0.32, y: 0.78, radius: 0.44, paletteBias: 0.78, valueBias:  0.02, driftRadius: 0.011, driftPhase: 4.0 },
        { x: 0.76, y: 0.82, radius: 0.42, paletteBias: 1.00, valueBias:  0.04, driftRadius: 0.012, driftPhase: 5.3 },
    ],
    softmaxBeta: 3.5,
    valueVariance: 0.08,
    warpAmount: 0.50,
    warpScale: 1.6,
    warpDrift: 0.007,
    noiseOctaves: 4,
    medium: "oil-pastel",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -15, curl: 0.12 },
    strokeAmount: 0.72,
    strokeScale: 160,
    strokeAnisotropy: 0.90,
    strokeLayers: 1,
    strokeOrient: "tensor",
    impasto: 0.0,
    brokenColor: 0.30,
    canvasGrain: 0.05,
    breathDepth: 0.04,
    breathPeriod: 50,
    saturation: 1.10,
    paperGrain: 0.012,
});

const CRAYON = cfg({
    palette: [
        { L: 0.58, C: 0.20, h: 28  },  // burnt orange
        { L: 0.72, C: 0.19, h: 60  },  // marigold
        { L: 0.66, C: 0.17, h: 145 },  // grass green
        { L: 0.58, C: 0.16, h: 235 },  // crayon blue
        { L: 0.60, C: 0.17, h: 320 },  // magenta
        { L: 0.90, C: 0.03, h: 80  },  // manila paper
    ],
    nuclei: [
        { x: 0.20, y: 0.30, radius: 0.46, paletteBias: 0.00, valueBias:  0.00, driftRadius: 0.008, driftPhase: 0.2 },
        { x: 0.56, y: 0.26, radius: 0.42, paletteBias: 0.25, valueBias:  0.02, driftRadius: 0.009, driftPhase: 1.5 },
        { x: 0.84, y: 0.44, radius: 0.42, paletteBias: 0.50, valueBias: -0.02, driftRadius: 0.008, driftPhase: 2.8 },
        { x: 0.30, y: 0.78, radius: 0.44, paletteBias: 0.78, valueBias:  0.00, driftRadius: 0.009, driftPhase: 4.0 },
        { x: 0.74, y: 0.82, radius: 0.40, paletteBias: 1.00, valueBias:  0.03, driftRadius: 0.008, driftPhase: 5.3 },
    ],
    softmaxBeta: 4.2,
    valueVariance: 0.10,
    warpAmount: 0.42,
    warpScale: 1.5,
    warpDrift: 0.006,
    noiseOctaves: 4,
    medium: "crayon",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -18, curl: 0.14 },
    strokeAmount: 0.48,
    strokeScale: 132,
    strokeAnisotropy: 0.78,
    strokeLayers: 2,
    strokeOrient: "tensor",
    impasto: 0.0,
    wetEdge: 0,
    brokenColor: 0.28,
    canvasGrain: 0.09,
    breathDepth: 0.03,
    breathPeriod: 56,
    saturation: 0.97,
    paperGrain: 0.024,
});

const METAL = cfg({
    palette: [
        { L: 0.40, C: 0.09, h: 52  },  // deep bronze shadow
        { L: 0.58, C: 0.13, h: 60  },  // copper
        { L: 0.73, C: 0.15, h: 78  },  // brass / gold
        { L: 0.86, C: 0.10, h: 88  },  // warm gold highlight
        { L: 0.95, C: 0.03, h: 84  },  // near-white catch
    ],
    nuclei: [
        { x: 0.20, y: 0.28, radius: 0.46, paletteBias: 0.00, valueBias:  0.02, driftRadius: 0.010, driftPhase: 0.2 },
        { x: 0.58, y: 0.22, radius: 0.42, paletteBias: 0.30, valueBias:  0.05, driftRadius: 0.011, driftPhase: 1.5 },
        { x: 0.84, y: 0.46, radius: 0.44, paletteBias: 0.58, valueBias: -0.03, driftRadius: 0.010, driftPhase: 2.8 },
        { x: 0.30, y: 0.78, radius: 0.44, paletteBias: 0.82, valueBias:  0.00, driftRadius: 0.011, driftPhase: 4.0 },
        { x: 0.74, y: 0.82, radius: 0.40, paletteBias: 1.00, valueBias:  0.06, driftRadius: 0.010, driftPhase: 5.3 },
    ],
    softmaxBeta: 3.6,
    valueVariance: 0.13,
    warpAmount: 0.50,
    warpScale: 1.5,
    warpDrift: 0.008,
    noiseOctaves: 4,
    medium: "metal",
    metalPolish: 1.6,
    metalHeightScale: 1.3,
    breathDepth: 0.05,
    breathPeriod: 46,
    saturation: 1.02,
});

export const AURORA_PRESETS: readonly ConfiguratorPreset<AuroraConfig>[] = [
    { key: "setting-sun", label: "Setting sun", config: SETTING_SUN },
    { key: "dusk", label: "Dusk", config: DUSK },
    { key: "sky", label: "Sky", config: SKY },
    { key: "meadow", label: "Meadow", config: MEADOW },
    { key: "pastel", label: "Pastel", config: PASTEL },
    { key: "oil", label: "Oil", config: OIL },
    { key: "vangogh", label: "Van Gogh", config: VANGOGH },
    { key: "oil-pastel", label: "Oil pastel", config: OIL_PASTEL },
    { key: "crayon", label: "Crayon", config: CRAYON },
    { key: "metal", label: "Metal", config: METAL },
];
