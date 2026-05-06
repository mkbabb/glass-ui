/**
 * Authored Aurora v4.1 presets. Ported verbatim from the Claude Design bundle
 * (`aurora/project/aurora/presets.js`) with TypeScript typing.
 *
 * Nuclei y-coordinates are CSS-top-origin (0 = top, 1 = bottom). The runtime
 * flips Y at the uniform boundary — see runtime.ts AUTHOR_Y_ORIGIN_IS_TOP
 * marks. Do not "fix" the positions to match the shader's bottom-origin.
 *
 * Per memory rule "Presets in consumers": these authored themes live in the
 * demo, not the library. The library exports only the shape + a neutral
 * DEFAULT_AURORA_CONFIG.
 */

import type { AuroraConfig, AuroraMedium } from "@/components/custom/aurora";
import { DEFAULT_AURORA_CONFIG } from "@/components/custom/aurora";

type PresetOverrides = Partial<AuroraConfig>;

function cfg(overrides: PresetOverrides): AuroraConfig {
    return { ...DEFAULT_AURORA_CONFIG, ...overrides };
}

// ── OPENAI_SKY ────────────────────────────────────────────────────────────
// Blue volumetric, GPT-4.5 feel. 4 nuclei with varied depth of blue.
const OPENAI_SKY = cfg({
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

// ── OPENAI_DAWN ───────────────────────────────────────────────────────────
// Pink/orange/lavender/cream diagonal — model-icon palette.
const OPENAI_DAWN = cfg({
    palette: [
        { L: 0.55, C: 0.18, h: 20  },  // deep coral
        { L: 0.68, C: 0.18, h: 355 },  // pink
        { L: 0.78, C: 0.13, h: 50  },  // warm orange
        { L: 0.82, C: 0.06, h: 300 },  // lilac
        { L: 0.90, C: 0.03, h: 320 },  // cream lavender
    ],
    nuclei: [
        { x: 0.22, y: 0.25, radius: 0.50, paletteBias: 0.00, valueBias: -0.05, driftRadius: 0.018, driftPhase: 0.4 },
        { x: 0.50, y: 0.45, radius: 0.55, paletteBias: 0.30, valueBias:  0.00, driftRadius: 0.020, driftPhase: 2.1 },
        { x: 0.80, y: 0.35, radius: 0.45, paletteBias: 0.55, valueBias:  0.05, driftRadius: 0.016, driftPhase: 3.8 },
        { x: 0.30, y: 0.85, radius: 0.55, paletteBias: 1.00, valueBias:  0.08, driftRadius: 0.022, driftPhase: 5.2 },
    ],
    softmaxBeta: 3.2,
    valueVariance: 0.10,
    warpAmount: 0.55,
    warpScale: 1.5,
    warpDrift: 0.009,
    noiseOctaves: 4,
    breathDepth: 0.06,
    breathPeriod: 42,
    saturation: 0.98,
});

// ── OPENAI_MEADOW ─────────────────────────────────────────────────────────
// Yellow-dominant, blue intrusion on right, chunky rectangular feel.
// Uses hybrid warp for block-like territories.
const OPENAI_MEADOW = cfg({
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

// ── DELIBERATIVE ──────────────────────────────────────────────────────────
// Radial pastel flare — red focal lower-left, cream/lavender falloff.
const DELIBERATIVE = cfg({
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

// ── DAY9_YELLOW ───────────────────────────────────────────────────────────
// Yellow-dominant watercolor with teal diagonal intrusion.
const DAY9_YELLOW = cfg({
    palette: [
        { L: 0.90, C: 0.18, h: 95  },  // vivid yellow
        { L: 0.94, C: 0.10, h: 90  },  // pale yellow
        { L: 0.97, C: 0.02, h: 80  },  // cream
        { L: 0.78, C: 0.10, h: 200 },  // teal
        { L: 0.68, C: 0.13, h: 215 },  // deeper teal
    ],
    nuclei: [
        { x: 0.25, y: 0.70, radius: 0.60, paletteBias: 0.00, valueBias:  0.03, driftRadius: 0.010, driftPhase: 0.5 },
        { x: 0.60, y: 0.50, radius: 0.40, paletteBias: 0.35, valueBias:  0.05, driftRadius: 0.012, driftPhase: 2.6 },
        { x: 0.85, y: 0.18, radius: 0.30, paletteBias: 0.95, valueBias: -0.05, driftRadius: 0.014, driftPhase: 4.2 },
    ],
    softmaxBeta: 6.0,
    valueVariance: 0.10,
    warpAmount: 0.30,
    warpScale: 1.8,
    warpDrift: 0.006,
    noiseOctaves: 4,
    medium: "watercolor",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -35, curl: 0.25 },
    strokeAmount: 0.30,
    wetEdge: 0.50,
    granulation: 0.18,
    breathDepth: 0.04,
    breathPeriod: 50,
    saturation: 1.02,
});

// ── OIL_IMPASTO ───────────────────────────────────────────────────────────
// Thick palette-knife impasto. Razor edges, ridge highlights, flat patches.
// Warm autumn palette so ridges catch warm light against cool shadows.
const OIL_IMPASTO = cfg({
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

// ── OIL_GESTURAL ──────────────────────────────────────────────────────────
// Modern abstract — chunky gestural strokes, visible bristle, cross-hatched.
const OIL_GESTURAL = cfg({
    palette: [
        { L: 0.62, C: 0.18, h: 40  },  // amber
        { L: 0.74, C: 0.16, h: 10  },  // warm coral
        { L: 0.56, C: 0.14, h: 280 },  // violet
        { L: 0.48, C: 0.12, h: 235 },  // deep blue
        { L: 0.70, C: 0.14, h: 180 },  // teal
        { L: 0.88, C: 0.05, h: 70  },  // cream
    ],
    nuclei: [
        { x: 0.18, y: 0.28, radius: 0.46, paletteBias: 0.00, valueBias:  0.00, driftRadius: 0.010, driftPhase: 0.3 },
        { x: 0.58, y: 0.30, radius: 0.42, paletteBias: 0.28, valueBias:  0.03, driftRadius: 0.011, driftPhase: 1.5 },
        { x: 0.85, y: 0.55, radius: 0.46, paletteBias: 0.52, valueBias: -0.03, driftRadius: 0.012, driftPhase: 2.9 },
        { x: 0.35, y: 0.75, radius: 0.44, paletteBias: 0.75, valueBias:  0.02, driftRadius: 0.010, driftPhase: 4.2 },
        { x: 0.78, y: 0.88, radius: 0.38, paletteBias: 1.00, valueBias:  0.05, driftRadius: 0.011, driftPhase: 5.7 },
    ],
    softmaxBeta: 4.0,
    valueVariance: 0.10,
    warpAmount: 0.45,
    warpScale: 1.5,
    warpDrift: 0.006,
    noiseOctaves: 4,
    medium: "oil",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -22, curl: 0.18 },
    strokeAmount: 0.80,
    strokeScale: 170,
    strokeAnisotropy: 0.82,
    strokeLayers: 2,
    strokeMode: "chunky",
    impasto: 0.42,
    brokenColor: 0.38,
    canvasGrain: 0.04,
    breathDepth: 0.03,
    breathPeriod: 55,
    saturation: 1.02,
    paperGrain: 0.009,
});

// ── OIL_VANGOGH ───────────────────────────────────────────────────────────
// Swirling short directional strokes — Starry Night dynamics on a warm palette.
const OIL_VANGOGH = cfg({
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
    medium: "oil",
    flow: { pattern: "swirl", focalX: 0.55, focalY: 0.45, angle: 0, curl: 0.55 },
    strokeAmount: 0.85,
    strokeScale: 110,
    strokeAnisotropy: 0.92,
    strokeLayers: 1,
    strokeMode: "oil",
    impasto: 0.48,
    brokenColor: 0.30,
    canvasGrain: 0.03,
    breathDepth: 0.04,
    breathPeriod: 50,
    saturation: 1.06,
    paperGrain: 0.009,
});

// ── CRAYON_SUNSET ─────────────────────────────────────────────────────────
// Oil-pastel feel — creamy, long strokes, rich pigment, warm sunset palette.
const CRAYON_SUNSET = cfg({
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
    medium: "oil",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -15, curl: 0.12 },
    strokeAmount: 0.72,
    strokeScale: 160,
    strokeAnisotropy: 0.90,
    strokeLayers: 1,
    strokeMode: "crayon",
    impasto: 0.0,
    brokenColor: 0.30,
    canvasGrain: 0.05,
    breathDepth: 0.04,
    breathPeriod: 50,
    saturation: 1.10,
    paperGrain: 0.012,
});

// ── CRAYON_RAINBOW ────────────────────────────────────────────────────────
// Creamy oil-pastel rainbow. Wide smooth zones with long directional strokes.
const CRAYON_RAINBOW = cfg({
    palette: [
        { L: 0.70, C: 0.16, h: 28  },  // warm orange
        { L: 0.82, C: 0.16, h: 75  },  // yellow
        { L: 0.74, C: 0.14, h: 140 },  // leaf green
        { L: 0.70, C: 0.13, h: 200 },  // sky
        { L: 0.64, C: 0.15, h: 265 },  // blueberry
        { L: 0.72, C: 0.15, h: 330 },  // magenta
        { L: 0.92, C: 0.04, h: 85  },  // cream paper
    ],
    nuclei: [
        { x: 0.18, y: 0.25, radius: 0.52, paletteBias: 0.00, valueBias:  0.03, driftRadius: 0.014, driftPhase: 0.2 },
        { x: 0.55, y: 0.22, radius: 0.48, paletteBias: 0.18, valueBias:  0.02, driftRadius: 0.013, driftPhase: 1.5 },
        { x: 0.85, y: 0.40, radius: 0.46, paletteBias: 0.36, valueBias:  0.00, driftRadius: 0.015, driftPhase: 2.7 },
        { x: 0.28, y: 0.72, radius: 0.50, paletteBias: 0.56, valueBias:  0.00, driftRadius: 0.014, driftPhase: 3.8 },
        { x: 0.70, y: 0.78, radius: 0.48, paletteBias: 0.80, valueBias:  0.02, driftRadius: 0.013, driftPhase: 5.1 },
    ],
    softmaxBeta: 3.2,
    valueVariance: 0.08,
    warpAmount: 0.52,
    warpScale: 1.7,
    warpDrift: 0.008,
    noiseOctaves: 4,
    medium: "oil",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -20, curl: 0.15 },
    strokeAmount: 0.65,
    strokeScale: 165,
    strokeAnisotropy: 0.88,
    strokeLayers: 1,
    strokeMode: "crayon",
    impasto: 0.0,
    brokenColor: 0.25,
    canvasGrain: 0.05,
    breathDepth: 0.04,
    breathPeriod: 48,
    saturation: 1.08,
    paperGrain: 0.011,
});

// ── SPEEDTEST ─────────────────────────────────────────────────────────────
// Six-hue OKLCH palette mapped to six nuclei. Soft drifting backdrop ported
// verbatim from `../speedtest/src/config/auroraConfig.ts` (the live config
// used by the speedtest dashboard). The reactive light/dark + idle/running
// alpha fork stays in the speedtest repo; this preset ships the static
// `alpha: 0.26` baseline so consumers can see the canvas at the same tone
// the user sees at first paint of the speedtest landing page.
const SPEEDTEST = cfg({
    palette: [
        { L: 0.72, C: 0.22, h: 300 }, // --aurora-1 purple (#c084fc)
        { L: 0.74, C: 0.14, h: 245 }, // --aurora-2 blue (#60a5fa)
        { L: 0.72, C: 0.22, h: 345 }, // --aurora-3 pink (#f472b6)
        { L: 0.78, C: 0.16, h: 160 }, // --aurora-4 emerald (#34d399)
        { L: 0.84, C: 0.18, h: 85 },  // --aurora-5 amber (#fbbf24)
        { L: 0.70, C: 0.18, h: 285 }, // --aurora-6 violet (#a78bfa)
    ],
    nuclei: [
        { x: 0.18, y: 0.22, radius: 0.55, paletteBias: 0.0, valueBias:  0.04, driftRadius: 0.020, driftPhase: 0.3 },
        { x: 0.80, y: 0.30, radius: 0.52, paletteBias: 0.2, valueBias:  0.00, driftRadius: 0.020, driftPhase: 1.7 },
        { x: 0.50, y: 0.18, radius: 0.48, paletteBias: 0.4, valueBias:  0.02, driftRadius: 0.020, driftPhase: 3.4 },
        { x: 0.72, y: 0.78, radius: 0.55, paletteBias: 0.6, valueBias: -0.02, driftRadius: 0.018, driftPhase: 0.9 },
        { x: 0.22, y: 0.82, radius: 0.50, paletteBias: 0.8, valueBias:  0.02, driftRadius: 0.022, driftPhase: 2.1 },
        { x: 0.55, y: 0.58, radius: 0.58, paletteBias: 1.0, valueBias:  0.00, driftRadius: 0.015, driftPhase: 4.6 },
    ],
    softmaxBeta: 3.2,
    valueVariance: 0.08,
    warpAmount: 0.38,
    warpScale: 1.6,
    warpDrift: 0.02,
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
    nucleiDrift: 0.04,
    paletteDrift: 0.02,
    breathDepth: 0.08,
    breathPeriod: 42,
    saturation: 0.85,
    paperGrain: 0,
    alpha: 0.26,
});

// ── CRAYON_OCEAN ──────────────────────────────────────────────────────────
// Oil-pastel cool palette — blues/greens/violets with creamy tooth.
const CRAYON_OCEAN = cfg({
    palette: [
        { L: 0.36, C: 0.12, h: 248 },  // deep ocean
        { L: 0.54, C: 0.14, h: 228 },  // mid blue
        { L: 0.68, C: 0.13, h: 200 },  // cyan
        { L: 0.74, C: 0.12, h: 170 },  // teal
        { L: 0.62, C: 0.12, h: 280 },  // violet-blue
        { L: 0.90, C: 0.04, h: 200 },  // sea foam
    ],
    nuclei: [
        { x: 0.22, y: 0.28, radius: 0.48, paletteBias: 0.00, valueBias: -0.02, driftRadius: 0.012, driftPhase: 0.2 },
        { x: 0.58, y: 0.25, radius: 0.44, paletteBias: 0.25, valueBias:  0.00, driftRadius: 0.013, driftPhase: 1.5 },
        { x: 0.82, y: 0.45, radius: 0.44, paletteBias: 0.50, valueBias:  0.03, driftRadius: 0.012, driftPhase: 2.7 },
        { x: 0.32, y: 0.76, radius: 0.46, paletteBias: 0.75, valueBias:  0.00, driftRadius: 0.014, driftPhase: 3.8 },
        { x: 0.76, y: 0.82, radius: 0.40, paletteBias: 1.00, valueBias:  0.04, driftRadius: 0.013, driftPhase: 5.1 },
    ],
    softmaxBeta: 3.5,
    valueVariance: 0.09,
    warpAmount: 0.48,
    warpScale: 1.6,
    warpDrift: 0.007,
    noiseOctaves: 4,
    medium: "oil",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: 25, curl: 0.18 },
    strokeAmount: 0.70,
    strokeScale: 155,
    strokeAnisotropy: 0.88,
    strokeLayers: 1,
    strokeMode: "crayon",
    impasto: 0.0,
    brokenColor: 0.28,
    canvasGrain: 0.05,
    breathDepth: 0.04,
    breathPeriod: 52,
    saturation: 1.05,
    paperGrain: 0.011,
});

export const PRESETS = {
    OPENAI_SKY,
    OPENAI_DAWN,
    OPENAI_MEADOW,
    DELIBERATIVE,
    DAY9_YELLOW,
    OIL_IMPASTO,
    OIL_GESTURAL,
    OIL_VANGOGH,
    CRAYON_SUNSET,
    CRAYON_RAINBOW,
    CRAYON_OCEAN,
    SPEEDTEST,
} as const;

export type PresetKey = keyof typeof PRESETS;

export interface PresetMeta {
    label: string;
    sub: string;
    medium: AuroraMedium;
}

export const PRESET_META: Record<PresetKey, PresetMeta> = {
    OPENAI_SKY:     { label: "Sky",           sub: "smooth · 4 nuclei",            medium: "smooth" },
    OPENAI_DAWN:    { label: "Dawn",          sub: "smooth · diagonal",            medium: "smooth" },
    OPENAI_MEADOW:  { label: "Meadow",        sub: "watercolor · hybrid warp",     medium: "watercolor" },
    DELIBERATIVE:   { label: "Deliberative",  sub: "pastel · radial flow",         medium: "pastel" },
    DAY9_YELLOW:    { label: "Day 9",         sub: "watercolor · diagonal",        medium: "watercolor" },
    OIL_IMPASTO:    { label: "Oil Impasto",   sub: "palette-knife · ridge edges",  medium: "oil" },
    OIL_GESTURAL:   { label: "Oil Gestural",  sub: "chunky · crosshatch bristle",  medium: "oil" },
    OIL_VANGOGH:    { label: "Oil Swirl",     sub: "swirl flow · directional",     medium: "oil" },
    CRAYON_SUNSET:  { label: "Pastel Sunset", sub: "creamy · warm",                medium: "oil" },
    CRAYON_RAINBOW: { label: "Pastel Rainbow",sub: "creamy · full spectrum",       medium: "oil" },
    CRAYON_OCEAN:   { label: "Pastel Ocean",  sub: "creamy · cool",                medium: "oil" },
    SPEEDTEST:      { label: "Speedtest",     sub: "smooth · 6 nuclei · 6-hue",    medium: "smooth" },
};

export const PRESET_KEYS = Object.keys(PRESETS) as PresetKey[];
