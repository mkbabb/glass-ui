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
} from "../../../src/components/custom/dot-flow-field";
import {
    DEFAULT_FLOW_CONFIG,
    DEFAULT_WAVE_COMPONENTS,
} from "../../../src/components/custom/dot-flow-field";

// BC.W-TEAL-NAVY-PURGE — the fabricated teal-on-navy "Claude co-work dot-wave"
// reproduction is DELETED (clean break, no alias). The ACTUAL reference the user
// named (Screenshot_2026-06-17_at_14.45.25) is SUBTLE mono-warm-white dots on a
// near-black ground — NOT teal. It survives only as a NON-default named demo
// preset; the warm-cream identity (`DEFAULT_FLOW_CONFIG`) is the lead default.

// The mono-warm-white dot core (the real reference — warm-white, hue ~70 cream,
// NOT teal). A single near-neutral warm stop so the dots read as warm-white.
const MONO_WARM_PALETTE: OklchStop[] = [
    { L: 0.95, C: 0.012, h: 70 }, // warm-white (the dot core)
    { L: 0.86, C: 0.02, h: 64 }, // a whisper-warmer edge
];

// The reference near-black ground (a warm near-black, NOT navy — hue ~50, low C).
const NEAR_BLACK_GROUND: OklchStop = { L: 0.1, C: 0.008, h: 50 };

/**
 * The ACTUAL reference reproduction — the SUBTLE mono-warm-white dot-matrix on
 * near-black, the slow LARGE wave sweeping through it, with the soft-disc globe mask
 * (the reference's two-sphere composition). Re-tinted off the warm-cream default; only
 * the COLOR + the globe mask differ from the library identity (the retopology is the
 * library default — the reference just dims the palette + grounds it).
 */
export const FLOW_PRESET_MONO_REFERENCE: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
    waveComponents: DEFAULT_WAVE_COMPONENTS,
    palette: MONO_WARM_PALETTE,
    background: NEAR_BLACK_GROUND,
    globeMask: true,
};

/** The warm-cream library-identity preset (the default look). */
export const FLOW_PRESET_WARM: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
};

// ── Concentric (W-CONCENTRIC) — the demo-themed ring palettes ───────────────────
// PRESETS-IN-CONSUMERS again: the themed ring ramp is a DEMO preset here, never a
// library token (`proof:concentric` clause 5 reds a teal/violet literal in the LIBRARY
// constants.ts; this demo file is the sanctioned home for the themed palettes).

import type { ConcentricConfig } from "../../../src/components/custom/concentric";
import { DEFAULT_CONCENTRIC_CONFIG } from "../../../src/components/custom/concentric";

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

import type { PaperGridConfig } from "../../../src/components/custom/paper-grid";
import { DEFAULT_PAPER_GRID_CONFIG } from "../../../src/components/custom/paper-grid";

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
    waveAmplitude: 0.08, // an even gentler breath behind content
    waveSpeed: 0.1,
    interactive: false, // a background does not chase the cursor
};

/** The BOLD-liquid showcase preset — the deliberate "felt MORE" calibration counter. */
export const PAPER_GRID_PRESET_BOLD: PaperGridConfig = {
    ...DEFAULT_PAPER_GRID_CONFIG,
    waveAmplitude: 0.3, // a bolder bow (still coherent — the whole sheet flows together)
    majorAlpha: 0.16,
    bulgeStrength: 0.2,
};

// ── DotMatrix (BC.W-VIZ-DOTMATRIX) — the demo presets for the dot-sphere globe ────
// PRESETS-IN-CONSUMERS again. The library default (`DEFAULT_DOT_MATRIX_CONFIG`) is the
// warm-cream identity — ONE calm warm-cream globe of fine dots over a transparent ground
// (the glass card shows through). The mono-warm-white-on-near-black REFERENCE reproduction
// (the Claude co-work two-globe composition) lives HERE in the DEMO tree, NEVER a library
// token. NO teal/navy literal — the reference is mono-warm-white (`proof:dot-matrix`
// clause 5 reds a teal/navy stop in the LIBRARY constants.ts; this demo file is the
// sanctioned home for the named themes).

import type { DotMatrixConfig } from "../../../src/components/custom/dot-matrix";
import { DEFAULT_DOT_MATRIX_CONFIG } from "../../../src/components/custom/dot-matrix";

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
    palette: DOT_MONO_WARM_PALETTE,
    background: DOT_NEAR_BLACK_GROUND,
    spheres: 2, // the reference's two-globe composition
    breathing: 0.02, // the sub-perceptual radius pulse (the calmest non-dead register)
};

// ── BC.W-VIZ-HYBRID — the goo-dot-matrix presets ────────────────────────────────────────
// PRESETS-IN-CONSUMERS again. The library default (`DEFAULT_GOO_DOT_CONFIG`) is the warm-cream
// identity — the metaball field stamped as warm-cream dots over a transparent ground (the
// glass card shows through). The mono-warm-white-on-near-black register (the dotted-tone
// "the goo blob drawn as a dot matrix") lives HERE in the DEMO tree, NEVER a library token.
// NO teal/navy literal — `proof:viz-hybrid` clause 5 reds a teal/navy stop in the LIBRARY
// constants.ts; this demo file is the sanctioned home for the named themes.

import type { GooDotConfig } from "../../../src/components/custom/goo-dot-matrix";
import { DEFAULT_GOO_DOT_CONFIG } from "../../../src/components/custom/goo-dot-matrix";

/** The warm-cream library-identity preset (the calm default lead, the field-driven dot). */
export const GOO_DOT_PRESET_WARM: GooDotConfig = {
    ...DEFAULT_GOO_DOT_CONFIG,
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
