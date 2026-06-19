// BC.W-VIZ-PAPERGRID — the paper-grid compile-time caps + the WARM-IDENTITY default config
// (the single source the SFC, the composables, and the WGSL/GLSL shaders all read).
//
// THE WARM-IDENTITY FENCE (load-bearing — §E REMOVE the teal-on-navy reference). The default
// line ink is the warm-cream `--foreground` identity (a complete warm OklchStop); the
// background default is transparent so the grid suffuses over the page. The demo themes
// nothing here — the warm default + the suffusion preset live in
// `demo/stories/substrates/presets.ts` (presets-in-consumers — never a library token).
// `proof:viz-papergrid` clause P5 reds a teal/navy literal (h in [180,280]) in THIS file.

import type { OklchStop } from "../../../composables/color";

/** The WGSL `#define` cap mirror (the grid is a fullscreen fragment — no array caps needed). */
export const PAPER_GRID_MAX_MAJOR_EVERY = 16;

/**
 * The full author schema — the studio's `useConfiguratorState` model (commit-on-write — a
 * single surface). Every field is a tunable the demo configurator drives; the SFC resolves
 * it into the uniform table.
 */
export interface PaperGridConfig {
    /** The grid cell pitch in CSS px — LARGER = bigger cells (the user's "LARGER"). */
    cellSize: number;
    /** How many minor cells per major rule (the kf `--graph-major` 5rem/1rem ratio). */
    majorEvery: number;
    /** Minor line alpha — the calm hairline (≈ kf 3%). */
    minorAlpha: number;
    /** Major rule alpha — the bolder tier (kf 11%, above the 10% floor). */
    majorAlpha: number;
    /** Line width in device-px — one crisp pixel via Golus AA. */
    lineWidth: number;
    /** Wave amplitude in CELL units — how far the lines bow (the liquid; subtle = "felt, not loud"). */
    waveAmplitude: number;
    /** Wave spatial frequency (λ multiple) — LOW = the whole sheet bows together (coherent, not noise). */
    waveScale: number;
    /** The slow warp drift (ω-scale). */
    waveSpeed: number;
    /** The GLOBAL subtlety knob — 1 demo, ~0.12 suffusion (the site-wide background). */
    fieldAlpha: number;
    /** How far the cursor pushes the grid (the local bulge). */
    bulgeStrength: number;
    /** The Gaussian falloff radius in CELL units. */
    bulgeRadius: number;
    /** Push grid away (repel) or toward (attract) the cursor. */
    bulgeMode: "repel" | "attract";
    /** The line ink (the warm `--foreground` identity by default — NEVER teal-on-navy). */
    lineColor: OklchStop;
    /** The ground (default transparent so it suffuses over the page). */
    background: OklchStop | "transparent";
    /** Pointer bulge (§4/§8) — on (demo) / off (suffusion). */
    interactive: boolean;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity line ink (the library default — NOT a themed hue). A warm-amber
 * ink in the `--foreground` family (OKLab hue ~62, the BA.W-NO-GRAY warm identity) so the
 * grid reads as warm ink over the page; the SFC resolves the live `--foreground` token at
 * mount, this stop is the SSR/no-token fallback identity. A consumer (the demo) themes it
 * through a PRESET, never a token edit. NEVER teal/navy (h in [180,280] reds P5).
 */
export const WARM_IDENTITY_INK: OklchStop = { L: 0.62, C: 0.05, h: 62 };

/**
 * The shipped warm-identity default config — evenly-spaced, LARGE 64px cells, a crisp fine
 * rule with a bolder major rule every 5 cells, on a slowly breathing liquid curl-flow sheet
 * (research/viz/paper-grid.md §6). SUBTLE + LARGE + evenly-spaced — the user's binding
 * aesthetic. `fieldAlpha: 1` is the demo lead; the suffusion preset drops it to ~0.12.
 */
export const DEFAULT_PAPER_GRID_CONFIG: PaperGridConfig = {
    cellSize: 64, // LARGER than the 28/32px static — the user's "LARGER"
    majorEvery: 5, // the kf --graph-major 5rem/1rem ratio
    minorAlpha: 0.04, // ≈ kf 3%
    majorAlpha: 0.11, // kf 11%, above the 10% floor
    lineWidth: 1.0, // one crisp device-pixel via Golus AA
    waveAmplitude: 0.1, // subtle — "felt, not loud"
    waveScale: 0.5, // LOW freq → the whole sheet bows together (the inverse-coherence target)
    waveSpeed: 0.15, // the slow breath
    fieldAlpha: 1.0, // demo (suffusion drops to ~0.12)
    bulgeStrength: 0.12,
    bulgeRadius: 3, // cells
    bulgeMode: "repel",
    lineColor: WARM_IDENTITY_INK,
    background: "transparent",
    interactive: true,
    respectReducedMotion: true,
};
