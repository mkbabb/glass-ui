// LiquidGrid (W-VIZ-PAPERGRID) — the demo presets for the liquid liquid-grid.
//
// PRESETS-IN-CONSUMERS (the binding fence). The library default
// (`DEFAULT_LIQUID_GRID_CONFIG`) is the warm-cream identity — warm-foreground ink over
// transparent, evenly-spaced LARGE 64px cells, a slow liquid curl-flow breath. The
// SUFFUSION preset (a near-invisible site-wide background) + the BOLD-liquid showcase
// preset + the RIPPLE lit-face preset live HERE in the DEMO tree, NEVER a library token.
// NO teal/navy literal — the grid is monochrome warm ink (`proof:viz-papergrid` clause P5
// reds a teal/navy hue in the LIBRARY constants.ts; this demo file is the sanctioned home
// for any named theme).

import type { LiquidGridConfig } from "@glass/components/liquid-grid";
import { DEFAULT_LIQUID_GRID_CONFIG } from "@glass/components/liquid-grid";

/** The warm-cream library-identity preset (the calm default lead — story 1). */
export const LIQUID_GRID_PRESET_WARM: LiquidGridConfig = {
    ...DEFAULT_LIQUID_GRID_CONFIG,
};

/**
 * The SUFFUSION preset — the §E "suffuse it throughout the site as a subtle background
 * element" done RIGHT: a near-invisible (`fieldAlpha ≈ 0.12`) large-pitch (96px) slow-warp
 * grid, `interactive:false`, behind page content (NOT in a card — the full-bleed escape).
 */
export const LIQUID_GRID_PRESET_SUFFUSE: LiquidGridConfig = {
    ...DEFAULT_LIQUID_GRID_CONFIG,
    cellSize: 96, // a larger pitch for a calmer site-wide ground
    fieldAlpha: 0.12, // near-invisible — a subtle background, not a focal element
    twistMax: 0.22, // a gentler cell-twist behind content
    waveOmega: 0.4,
    interactive: false, // a background does not chase the cursor
};

/** The BOLD-liquid showcase preset — the deliberate "felt MORE" calibration counter. */
export const LIQUID_GRID_PRESET_BOLD: LiquidGridConfig = {
    ...DEFAULT_LIQUID_GRID_CONFIG,
    twistMax: 0.7, // a DRAMATIC cell-twist (the boxes windmill as the crest passes)
    majorAlpha: 0.16,
    bulgeStrength: 1.1,
};

/**
 * The RIPPLE preset (BD.W-PAPERGRID-FACE — the LIT RIPPLING PAPER SHEET, demo-only). The library
 * default keeps `faceAlpha:0` (the line-only identity byte-frozen); THIS consumer preset lifts the
 * structurally-absent FACE: each cell becomes a filled warm-paper face, lit by the slope of the
 * SAME traveling-wave height the twist rides, squashed so the crest face inflates. The warm-
 * DIVERGENT ramp (rose-umber trough → ember-amber → warm-wheat crest, ALL hues ∈ [20,90] — NO
 * teal/navy) carries the 1940s-technicolor punch. Presets-in-consumers; the vivid register lives
 * HERE, never a library token.
 */
export const LIQUID_GRID_PRESET_RIPPLE: LiquidGridConfig = {
    ...DEFAULT_LIQUID_GRID_CONFIG,
    faceAlpha: 0.62, // the face PAINTS (lifts the structurally-absent fill)
    faceRelief: 2.6, // the ∇H Lambert gain — shade traverses ~[0.15,0.95] across a crest
    squashK: 0.42, // the crest face visibly inflates (bounded by the CV<0.15 legibility fence)
    baseInset: 0.14, // the soft inset tile inside the warped cell
    // The warm-divergent ramp (hue ∈ [20,90] — the teal-navy purge clear by construction).
    faceWarmLo: { L: 0.42, C: 0.08, h: 30 }, // rose-umber trough (self-shadow)
    faceWarmMid: { L: 0.66, C: 0.14, h: 56 }, // ember-amber mid
    faceWarmHi: { L: 0.92, C: 0.11, h: 86 }, // warm-wheat crest
    lightDir: [0.6, 0.8], // the upper-right cel key-light
    minorAlpha: 0.16, // the creases read as fold-lines over the lit face
    majorAlpha: 0.26,
};
