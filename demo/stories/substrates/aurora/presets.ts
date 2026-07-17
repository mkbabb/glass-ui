/**
 * Authored Aurora presets, typed for TypeScript.
 *
 * Nuclei y-coordinates are CSS-top-origin (0 = top, 1 = bottom). The runtime
 * flips Y at the uniform boundary — see runtime.ts AUTHOR_Y_ORIGIN_IS_TOP
 * marks. Do not "fix" the positions to match the shader's bottom-origin.
 *
 * Per memory rule "Presets in consumers": these authored themes live in the
 * demo, not the library. The library exports only the shape + a neutral
 * DEFAULT_AURORA_CONFIG.
 */

import type { AuroraConfig, AuroraMedium } from "@glass/components/aurora";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora";
import { mediumOptions } from "./config/options";

type PresetOverrides = Partial<AuroraConfig>;

function cfg(overrides: PresetOverrides): AuroraConfig {
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

// One-source the medium display name off the canonical mediumOptions map (the
// medium→label single-source already carrying "Van Gogh"/"Oil Pastel"/"Crayon").
// Each PRESET_META.sub derives its medium segment from here so a medium repoint
// cannot leave the label stale.
const MEDIUM_LABEL = Object.fromEntries(
    mediumOptions.map((o) => [o.value, o.label]),
) as Record<AuroraMedium, string>;

function mediumLabel(value: AuroraMedium): string {
    return MEDIUM_LABEL[value];
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

// ── VANGOGH ───────────────────────────────────────────────────────────────
// The van-Gogh medium hero — atomic comma/crescent dabs queued into Starry
// Night swirl rows on the iconic indigo/cobalt/sky/yellow ramp.
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

// ── OILPASTEL_SUNSET ──────────────────────────────────────────────────────
// Oil-pastel — creamy, long strokes, rich pigment, warm sunset palette.
const OILPASTEL_SUNSET = cfg({
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

// ── OILPASTEL_RAINBOW ─────────────────────────────────────────────────────
// Creamy oil-pastel rainbow. Wide smooth zones with long directional strokes.
const OILPASTEL_RAINBOW = cfg({
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
    medium: "oil-pastel",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: -20, curl: 0.15 },
    strokeAmount: 0.65,
    strokeScale: 165,
    strokeAnisotropy: 0.88,
    strokeLayers: 1,
    strokeOrient: "tensor",
    impasto: 0.0,
    brokenColor: 0.25,
    canvasGrain: 0.05,
    breathDepth: 0.04,
    breathPeriod: 48,
    saturation: 1.08,
    paperGrain: 0.011,
});

// ── SPEEDTEST ─────────────────────────────────────────────────────────────
// Six-hue OKLCH palette mapped to six nuclei. Soft drifting backdrop — the
// static baseline of a dashboard ambient config (the live config
// used by a consumer dashboard). The reactive light/dark + idle/running
// alpha fork stays in the consumer repo; this preset ships the static
// `alpha: 0.26` baseline so consumers can see the canvas at the same tone
// the user sees at first paint of a consumer landing page.
const SPEEDTEST = cfg({
    palette: [
        { L: 0.72, C: 0.22, h: 300 }, // --aurora-1 purple (#c084fc)
        { L: 0.74, C: 0.14, h: 245 }, // --aurora-2 blue (#60a5fa)
        { L: 0.72, C: 0.22, h: 345 }, // --aurora-3 pink (#f472b6)
        { L: 0.78, C: 0.16, h: 160 }, // --aurora-4 emerald (#34d399)
        { L: 0.84, C: 0.18, h: 85 },  // --aurora-5 amber (#fbbf24)
        { L: 0.70, C: 0.18, h: 285 }, // --aurora-6 violet (#a78bfa)
    ],
    // B21 — broader cloud orbits: the driftRadius is bumped so each mass
    // visibly MIGRATES over the cycle (the "actually change over time" read),
    // riding the elevated nucleiDrift speed below.
    nuclei: [
        { x: 0.18, y: 0.22, radius: 0.55, paletteBias: 0.0, valueBias:  0.04, driftRadius: 0.038, driftPhase: 0.3 },
        { x: 0.80, y: 0.30, radius: 0.52, paletteBias: 0.2, valueBias:  0.00, driftRadius: 0.034, driftPhase: 1.7 },
        { x: 0.50, y: 0.18, radius: 0.48, paletteBias: 0.4, valueBias:  0.02, driftRadius: 0.040, driftPhase: 3.4 },
        { x: 0.72, y: 0.78, radius: 0.55, paletteBias: 0.6, valueBias: -0.02, driftRadius: 0.032, driftPhase: 0.9 },
        { x: 0.22, y: 0.82, radius: 0.50, paletteBias: 0.8, valueBias:  0.02, driftRadius: 0.042, driftPhase: 2.1 },
        { x: 0.55, y: 0.58, radius: 0.58, paletteBias: 1.0, valueBias:  0.00, driftRadius: 0.030, driftPhase: 4.6 },
    ],
    // B21 — a consumer "more cloud-like + actually change over time". CLOUDIER:
    // a softer nucleus blend (lower softmaxBeta — masses merge like cumulus,
    // not hard cells), MORE billowy organic warp (warpAmount up, warpScale down
    // for broader puffs, +1 noise octave for wispy edge detail). EVOLVING: the
    // whole field SLOWLY drifts — nucleiDrift/paletteDrift/warpDrift all up so
    // the clouds visibly migrate + recolor over ~tens of seconds, and a deeper,
    // slower breath (depth up, period up) gives the gentle billow-and-settle.
    softmaxBeta: 2.4,
    valueVariance: 0.10,
    warpAmount: 0.52,
    warpScale: 1.25,
    warpDrift: 0.03,
    warpMode: "fbm",
    noiseOctaves: 5,
    medium: "smooth",
    flow: { pattern: "none", focalX: 0.5, focalY: 0.5, angle: 0, curl: 0 },
    strokeAmount: 0,
    strokeScale: 140,
    strokeAnisotropy: 0.7,
    strokeLayers: 1,
    wetEdge: 0,
    granulation: 0,
    impasto: 0,
    brokenColor: 0,
    canvasGrain: 0,
    nucleiDrift: 0.055,
    paletteDrift: 0.035,
    breathDepth: 0.11,
    breathPeriod: 58,
    saturation: 0.82,
    paperGrain: 0,
    alpha: 0.26,
});

// ── OILPASTEL_OCEAN ───────────────────────────────────────────────────────
// Oil-pastel cool palette — blues/greens/violets with creamy tooth.
const OILPASTEL_OCEAN = cfg({
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
    medium: "oil-pastel",
    flow: { pattern: "diagonal", focalX: 0.5, focalY: 0.5, angle: 25, curl: 0.18 },
    strokeAmount: 0.70,
    strokeScale: 155,
    strokeAnisotropy: 0.88,
    strokeLayers: 1,
    strokeOrient: "tensor",
    impasto: 0.0,
    brokenColor: 0.28,
    canvasGrain: 0.05,
    breathDepth: 0.04,
    breathPeriod: 52,
    saturation: 1.05,
    paperGrain: 0.011,
});

// ── CRAYON ────────────────────────────────────────────────────────────────
// The crayon medium hero — DRY tooth-multiply, no sheen. Matte waxy deposition
// on a high-tooth paper: bold primary-box-of-crayons palette, modest grain for
// the paper bite, zero impasto/sheen so it reads dry, not creamy.
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
    // B21 — crayon "a bit too oily": dry it out. A lighter waxy STAMP (lower
    // strokeAmount), no sheen (impasto 0 + wetEdge 0), MORE dry paper tooth
    // (canvasGrain + paperGrain up), less creamy color-mixing (brokenColor
    // down), and a MATTE saturation (dialed down) so it reads dry-tooth
    // crayon, not a creamy oil-pastel.
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

// ── METAL ─────────────────────────────────────────────────────────────────
// the warm folded-metal hero (the medium-forcing preset,
// mirroring VANGOGH). The metal medium re-lights the field's luma as a HEIGHT
// field, so a warm gold/bronze/copper ramp with a strong luma range gives the
// folds real relief to catch the cursor-synth light. `metalPolish` lifts the
// specular catch; `metalHeightScale` deepens the relief tilt. This preset is the
// deterministic named baseline the studio picker + the capture path render.
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

// ── SETTING_SUN (candidate A — the default lead, safest) ────────────────────
// "a few more notes of pink — like the setting sun."
// The warm horizon band: a rose sun-core (THE pink note, h:12) low over a coral→amber→
// gold sweep, a pale cream apex up top. Warm nuclei biased LOW (y 0.6–0.9), the sun-core
// horizontally ELONGATED (a sun-BAND, not a blob); the pale stop rides high (y≈0.2).
// DEMO-LOCAL (presets-in-consumers) — the pink note is a consumer theme, never a library
// token. hues 12–82, all warm.
const SETTING_SUN = cfg({
    palette: [
        { L: 0.52, C: 0.15,  h: 32  },  // coral-amber base
        { L: 0.66, C: 0.145, h: 12  },  // rose sun-core — THE pink note
        { L: 0.78, C: 0.135, h: 55  },  // warm amber
        { L: 0.87, C: 0.11,  h: 82  },  // warm gold
        { L: 0.93, C: 0.045, h: 78  },  // pale cream apex
    ],
    nuclei: [
        // The horizon sun-BAND (elongated) — the rose/coral mass low + centred.
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

// ── DUSK (candidate B) ──────────────────────────────────────────────────────
// A stronger coral-rose warm mass with ONE low-chroma dusk-lilac top stop (a whisper
// twilight, C:0.075 h:320 — the warm mass dominates, the lilac is a note not a field).
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

// ── VIVID_SETTING_SUN (candidate C) ─────────────────────────────────────────
// The "slightly MORE vibrant" delivery — two pink/coral notes, chroma up to 0.175,
// still all-warm (no teal/navy). The louder read for a consumer who wants the pink to sing.
const VIVID_SETTING_SUN = cfg({
    palette: [
        { L: 0.50, C: 0.175, h: 30  },  // vivid coral
        { L: 0.62, C: 0.17,  h: 14  },  // rose (pink note 1)
        { L: 0.72, C: 0.165, h: 352 },  // hot rose (pink note 2)
        { L: 0.82, C: 0.14,  h: 60  },  // warm amber
        { L: 0.90, C: 0.09,  h: 80  },  // warm gold apex
    ],
    nuclei: [
        { x: 0.50, y: 0.82, radius: 0.52, paletteBias: 0.18, valueBias:  0.05, driftRadius: 0.026, driftPhase: 0.2, elongation: 2.0, angle: 0 },
        { x: 0.18, y: 0.74, radius: 0.46, paletteBias: 0.00, valueBias:  0.02, driftRadius: 0.028, driftPhase: 1.6 },
        { x: 0.84, y: 0.66, radius: 0.46, paletteBias: 0.50, valueBias:  0.03, driftRadius: 0.024, driftPhase: 3.0 },
        { x: 0.62, y: 0.46, radius: 0.50, paletteBias: 0.74, valueBias:  0.02, driftRadius: 0.020, driftPhase: 4.3 },
        { x: 0.34, y: 0.20, radius: 0.56, paletteBias: 1.00, valueBias:  0.07, driftRadius: 0.018, driftPhase: 5.5 },
    ],
    softmaxBeta: 3.0,
    valueVariance: 0.11,
    warpAmount: 0.5,
    warpScale: 1.45,
    warpDrift: 0.009,
    noiseOctaves: 4,
    medium: "smooth",
    nucleiDrift: 0.024,
    paletteDrift: 0.018,
    breathDepth: 0.06,
    breathPeriod: 44,
    saturation: 1.08,
});

export const PRESETS = {
    SETTING_SUN,
    DUSK,
    VIVID_SETTING_SUN,
    OPENAI_SKY,
    OPENAI_DAWN,
    OPENAI_MEADOW,
    DELIBERATIVE,
    DAY9_YELLOW,
    OIL_IMPASTO,
    OIL_GESTURAL,
    VANGOGH,
    OILPASTEL_SUNSET,
    OILPASTEL_RAINBOW,
    OILPASTEL_OCEAN,
    CRAYON,
    METAL,
    SPEEDTEST,
} as const;

export type PresetKey = keyof typeof PRESETS;

export interface PresetMeta {
    label: string;
    sub: string;
    medium: AuroraMedium;
}

// The `sub` medium-segment derives from mediumLabel(medium) (the single source);
// the trailing prose is the per-preset flavour. So a medium repoint re-derives
// the label and cannot drift.
function meta(label: string, medium: AuroraMedium, tail: string): PresetMeta {
    return { label, sub: `${mediumLabel(medium)} · ${tail}`, medium };
}

export const PRESET_META: Record<PresetKey, PresetMeta> = {
    SETTING_SUN:       meta("Setting Sun",  "smooth",     "warm horizon · rose sun-core"),
    DUSK:              meta("Dusk",          "smooth",     "coral-rose · dusk-lilac whisper"),
    VIVID_SETTING_SUN: meta("Vivid Setting Sun", "smooth", "two pink notes · vivid warm"),
    OPENAI_SKY:        meta("Sky",          "smooth",     "4 nuclei"),
    OPENAI_DAWN:       meta("Dawn",         "smooth",     "diagonal"),
    OPENAI_MEADOW:     meta("Meadow",       "watercolor", "hybrid warp"),
    DELIBERATIVE:      meta("Deliberative", "pastel",     "radial flow"),
    DAY9_YELLOW:       meta("Day 9",        "watercolor", "diagonal"),
    OIL_IMPASTO:       meta("Oil Impasto",  "oil",        "palette-knife · ridge edges"),
    OIL_GESTURAL:      meta("Oil Gestural", "oil",        "chunky · crosshatch bristle"),
    VANGOGH:           meta("Van Gogh",     "vangogh",    "swirl-row atomic dabs"),
    OILPASTEL_SUNSET:  meta("Oil Pastel Sunset", "oil-pastel", "creamy · warm"),
    OILPASTEL_RAINBOW: meta("Oil Pastel Rainbow", "oil-pastel", "creamy · full spectrum"),
    OILPASTEL_OCEAN:   meta("Oil Pastel Ocean", "oil-pastel", "creamy · cool"),
    CRAYON:            meta("Crayon",       "crayon",     "dry tooth · no sheen"),
    METAL:             meta("Metal",        "metal",      "warm folded · cursor-raked catch"),
    SPEEDTEST:         meta("Speedtest",    "smooth",     "6 nuclei · 6-hue"),
};

export const PRESET_KEYS = Object.keys(PRESETS) as PresetKey[];
