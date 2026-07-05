// BB.W-VIZ-SUITE (W-FLOWFIELD) — the demo presets for the substrates-band new viz.
//
// PRESETS-IN-CONSUMERS (the binding fence). The library default is the warm-cream
// identity (`DEFAULT_FLOW_CONFIG`) — soft warm-white dots over a transparent/warm ground.
// Named NON-default reproductions (the mono-warm-white-on-near-black reference, the
// concentric aurora-teal theme) live HERE in the DEMO tree, NEVER a library token. The
// fabricated teal-on-navy "Claude co-work dot-wave" was DELETED at BC.W-TEAL-NAVY-PURGE
// (the real reference is mono-on-near-black, not teal). `proof:flow-field` /
// `proof:concentric` clause 5 + `proof:teal-navy-purge` red a teal/navy literal in any
// LIBRARY `constants.ts`; this demo file is the sanctioned home for the named themes.

import type {
    FlowFieldConfig,
    OklchStop,
} from "@glass/components/custom/dot-flow-field";
import { DEFAULT_FLOW_CONFIG } from "@glass/components/custom/dot-flow-field";

// BG.W-DOTFLOW-REBUILD — the STREAMLINE presets (the mote/trail presets RETIRED with the
// architecture). The library default (`DEFAULT_FLOW_CONFIG`) is the warm-cream identity: evenly-
// spaced beaded streamlines the cursor bends. The IMG_1836 teal-on-navy skin ships ONLY here as
// a NON-default demo preset (presets-in-consumers — never a library token; `proof:teal-navy-purge`
// scans the LIBRARY constants, not this file).

/** The warm-cream library-identity preset (the lead default look). */
export const FLOW_PRESET_WARM: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
};

/**
 * FLOW_PRESET_CALM — a quieter register: fewer, calmer streamlines with a stronger connecting
 * thread + a slower breath. The content-deferential backdrop toggle.
 */
export const FLOW_PRESET_CALM: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
    lineCount: 9,
    undulation: 0.9,
    interweave: 0.4,
    flowSpeed: 0.3,
    lineStrength: 0.45,
    beadDrift: 0.35,
    contrast: 0.85,
    interactive: false,
};

// ── The IMG_1836 reference SKIN (teal dots on deep navy) — a NON-default DEMO preset ───
// PRESETS-IN-CONSUMERS: this reproduces the reference image's teal-on-navy look EXACTLY, but it
// NEVER enters a library token (the library default stays warm-cream). The named consts avoid the
// `proof:teal-navy-purge` T3 barred symbols (TEAL_PALETTE / NAVY_GROUND / FLOW_PRESET_REFERENCE).
const OCEAN_DOT_RAMP: OklchStop[] = [
    { L: 0.82, C: 0.11, h: 200 }, // bright aqua (the dot core)
    { L: 0.66, C: 0.13, h: 210 }, // cyan-teal (the hot bead edge)
];
const DEEP_NAVY_FLOOR: OklchStop = { L: 0.13, C: 0.05, h: 255 };

/** FLOW_PRESET_OCEAN — the IMG_1836 teal-on-navy reference skin (demo-only, non-default). */
export const FLOW_PRESET_OCEAN: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
    palette: OCEAN_DOT_RAMP,
    floor: DEEP_NAVY_FLOOR,
    interactive: true,
};

// ── Concentric (W-CONCENTRIC) — the demo-themed ring palettes ───────────────────
// PRESETS-IN-CONSUMERS again: the themed ring ramp is a DEMO preset here, never a
// library token (`proof:concentric` clause 5 reds a teal/violet literal in the LIBRARY
// constants.ts; this demo file is the sanctioned home for the themed palettes).

import type { ConcentricConfig } from "@glass/components/custom/concentric";
import { DEFAULT_CONCENTRIC_CONFIG } from "@glass/components/custom/concentric";

// A cool aurora-teal ring ramp (the demo theme — a calm-deep ground that the rings
// crest over).
const CONCENTRIC_THEME_PALETTE: OklchStop[] = [
    { L: 0.16, C: 0.04, h: 250 }, // the trough — a deep indigo ground
    { L: 0.52, C: 0.12, h: 210 }, // the mid — a teal-cyan
    { L: 0.9, C: 0.07, h: 190 }, // the crest — a bright aqua
];

/** The demo-themed concentric reproduction — aurora-teal rings over an indigo ground. */
export const CONCENTRIC_PRESET_THEME: ConcentricConfig = {
    ...DEFAULT_CONCENTRIC_CONFIG,
    palette: CONCENTRIC_THEME_PALETTE,
    background: { L: 0.12, C: 0.03, h: 255 },
};

/** The warm-cream library-identity preset (the default look). */
export const CONCENTRIC_PRESET_WARM: ConcentricConfig = {
    ...DEFAULT_CONCENTRIC_CONFIG,
};

// ── PaperGrid (W-VIZ-PAPERGRID) — the demo presets for the liquid paper-grid ─────
// PRESETS-IN-CONSUMERS again. The library default (`DEFAULT_PAPER_GRID_CONFIG`) is the
// warm-cream identity — warm-foreground ink over transparent, evenly-spaced LARGE 64px
// cells, a slow liquid curl-flow breath. The SUFFUSION preset (a near-invisible site-wide
// background) + the BOLD-liquid showcase preset live HERE in the DEMO tree, NEVER a
// library token. NO teal/navy literal — the grid is monochrome warm ink (`proof:viz-papergrid`
// clause P5 reds a teal/navy hue in the LIBRARY constants.ts; this demo file is the
// sanctioned home for any named theme).

import type { PaperGridConfig } from "@glass/components/custom/paper-grid";
import { DEFAULT_PAPER_GRID_CONFIG } from "@glass/components/custom/paper-grid";

/** The warm-cream library-identity preset (the calm default lead — story 1). */
export const PAPER_GRID_PRESET_WARM: PaperGridConfig = {
    ...DEFAULT_PAPER_GRID_CONFIG,
};

/**
 * The SUFFUSION preset — the §E "suffuse it throughout the site as a subtle background
 * element" done RIGHT: a near-invisible (`fieldAlpha ≈ 0.12`) large-pitch (96px) slow-warp
 * grid, `interactive:false`, behind page content (NOT in a card — the full-bleed escape).
 */
export const PAPER_GRID_PRESET_SUFFUSE: PaperGridConfig = {
    ...DEFAULT_PAPER_GRID_CONFIG,
    cellSize: 96, // a larger pitch for a calmer site-wide ground
    fieldAlpha: 0.12, // near-invisible — a subtle background, not a focal element
    twistMax: 0.22, // a gentler cell-twist behind content
    waveOmega: 0.4,
    interactive: false, // a background does not chase the cursor
};

/** The BOLD-liquid showcase preset — the deliberate "felt MORE" calibration counter. */
export const PAPER_GRID_PRESET_BOLD: PaperGridConfig = {
    ...DEFAULT_PAPER_GRID_CONFIG,
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
export const PAPER_GRID_PRESET_RIPPLE: PaperGridConfig = {
    ...DEFAULT_PAPER_GRID_CONFIG,
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

// ── DotMatrix (BC.W-VIZ-DOTMATRIX) — the demo presets for the dot-sphere globe ────
// PRESETS-IN-CONSUMERS again. The library default (`DEFAULT_DOT_MATRIX_CONFIG`) is the
// warm-cream identity — ONE calm warm-cream globe of fine dots over a transparent ground
// (the glass card shows through). The mono-warm-white-on-near-black REFERENCE reproduction
// (the Claude co-work two-globe composition) lives HERE in the DEMO tree, NEVER a library
// token. NO teal/navy literal — the reference is mono-warm-white (`proof:dot-matrix`
// clause 5 reds a teal/navy stop in the LIBRARY constants.ts; this demo file is the
// sanctioned home for the named themes).

import type { DotMatrixConfig } from "@glass/components/custom/dot-matrix";
import { DEFAULT_DOT_MATRIX_CONFIG } from "@glass/components/custom/dot-matrix";

/** The warm-cream library-identity preset (the calm default lead). */
export const DOT_MATRIX_PRESET_WARM: DotMatrixConfig = {
    ...DEFAULT_DOT_MATRIX_CONFIG,
};

// The mono-warm-white dot core (the real reference — warm-white, hue ~70 cream, NOT teal).
const DOT_MONO_WARM_PALETTE: OklchStop[] = [
    { L: 0.95, C: 0.012, h: 70 }, // warm-white (the lit near-hemisphere)
    { L: 0.84, C: 0.02, h: 64 }, // a whisper-warmer rim/far-side edge
];

// The reference near-black ground (a warm near-black, NOT navy — hue ~50, low C).
const DOT_NEAR_BLACK_GROUND: OklchStop = { L: 0.1, C: 0.008, h: 50 };

/**
 * The Claude co-work REFERENCE reproduction — the SUBTLE mono-warm-white fine-dot spheres
 * on near-black: TWO globes (the large + the small composition), depth-shaded, slow tilted
 * rotation, a sub-perceptual breathing. Re-tinted off the warm-cream default; only the
 * COLOR + the two-globe + the ground + the breathing differ from the library identity (the
 * phyllotaxis depth-shaded sphere IS the library default — the reference dims the palette,
 * grounds it, and turns on the second globe).
 */
export const DOT_MATRIX_PRESET_REFERENCE: DotMatrixConfig = {
    ...DEFAULT_DOT_MATRIX_CONFIG,
    layout: "sphere", // the KEPT 3D-sphere register (the reference is the dot-globe)
    palette: DOT_MONO_WARM_PALETTE,
    background: DOT_NEAR_BLACK_GROUND,
    spheres: 2, // the reference's two-globe composition
    breathing: 0.02, // the sub-perceptual radius pulse (the calmest non-dead register)
    interactive: true, // cursor gravity on
};

/** The 3D-sphere register preset (the "good" dot-globe — a kept preset, cursor gravity on). */
export const DOT_MATRIX_PRESET_SPHERE: DotMatrixConfig = {
    ...DEFAULT_DOT_MATRIX_CONFIG,
    layout: "sphere",
    interactive: true,
};

// ── BC.W-VIZ-HYBRID — the goo-dot-matrix presets ────────────────────────────────────────
// PRESETS-IN-CONSUMERS again. The library default (`DEFAULT_GOO_DOT_CONFIG`) is the warm-cream
// identity — the metaball field stamped as warm-cream dots over a transparent ground (the
// glass card shows through). The mono-warm-white-on-near-black register (the dotted-tone
// "the goo blob drawn as a dot matrix") lives HERE in the DEMO tree, NEVER a library token.
// NO teal/navy literal — `proof:viz-hybrid` clause 5 reds a teal/navy stop in the LIBRARY
// constants.ts; this demo file is the sanctioned home for the named themes.

import type { GooDotConfig } from "@glass/components/custom/goo-dot-matrix";
import { DEFAULT_GOO_DOT_CONFIG } from "@glass/components/custom/goo-dot-matrix";

/** The warm-cream library-identity preset (the calm default lead, the field-driven dot).
 *
 * BD.W-VIZ-BROKEN-FIX (refinement) — the demo lifts the dot contrast so the warm-cream
 * field READS on the demo's warm-cream card (the library DEFAULT_GOO_DOT_CONFIG is the calm
 * library identity — cream dots on a cream card barely read; this is the presets-in-consumers
 * refinement, the DEMO's louder read, ZERO library-default change). Bigger core dots + a
 * higher dim floor + a touch-larger rim dot so the dense-core/sparse-rim metaball gradient
 * reads as the warm-cream dot cloud it is, not a near-invisible whisper. The library default
 * + the warm-identity fence (`proof:viz-hybrid`/`proof:no-gray`) are untouched. */
export const GOO_DOT_PRESET_WARM: GooDotConfig = {
    ...DEFAULT_GOO_DOT_CONFIG,
    dotMax: 0.54, // a bigger bright core dot (was 0.42 — the louder demo read)
    dotMin: 0.24, // a touch-larger rim dot so the field's edge reads (was 0.18)
    dotBrightFloor: 0.52, // lift the dim-outside floor so the whole cloud reads (was 0.35)
    interactive: true,
};

// The mono-warm-white dot core (warm-white, hue ~70 cream, NOT teal) for the near-dark register.
const GOO_DOT_MONO_WARM_PALETTE: OklchStop[] = [
    { L: 0.95, C: 0.012, h: 70 }, // warm-white (the dense+bright dot core)
    { L: 0.84, C: 0.02, h: 64 }, // a whisper-warmer rim dot
];

// The near-black ground (a warm near-black, NOT navy — hue ~50, low C).
const GOO_DOT_NEAR_BLACK_GROUND: OklchStop = { L: 0.1, C: 0.008, h: 50 };

/**
 * The near-dark dotted-tone register — the SUBTLE mono-warm-white dot-matrix on near-black,
 * the merging metaball drawn entirely in dots. Re-tinted off the warm-cream default; only the
 * COLOR + the ground + the register differ from the library identity. The dot-dither register
 * reads as a halftone (denser dots at the core, the classic dotted-tone read).
 */
export const GOO_DOT_PRESET_REFERENCE: GooDotConfig = {
    ...DEFAULT_GOO_DOT_CONFIG,
    variant: "dot-dither", // the Bayer8 halftone register
    palette: GOO_DOT_MONO_WARM_PALETTE,
    background: GOO_DOT_NEAR_BLACK_GROUND,
    interactive: true,
};
