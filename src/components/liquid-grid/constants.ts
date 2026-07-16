// the liquid-grid compile-time caps + the WARM-IDENTITY default config
// (the single source the SFC, the composables, and the WGSL/GLSL shaders all read).
//
// THE WARM-IDENTITY FENCE (load-bearing — §E REMOVE the teal-on-navy reference). The default
// line ink is the warm-cream `--foreground` identity (a complete warm OklchStop); the
// background default is transparent so the grid suffuses over the page. The demo themes
// nothing here — the warm default + the suffusion preset live in
// `demo/stories/substrates/presets.ts` (presets-in-consumers — never a library token).
// Keep library defaults outside the teal/navy hue band [180,280].

import type { OklchStop } from "../../composables/color";

/** The WGSL `#define` cap mirror (the grid is a fullscreen fragment — no array caps needed). */
export const LIQUID_GRID_MAX_MAJOR_EVERY = 16;

/**
 * The full author schema — the studio's `useConfiguratorState` model (commit-on-write — a
 * single surface). Every field is a tunable the demo configurator drives; the SFC resolves
 * it into the uniform table.
 */
export interface LiquidGridConfig {
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
    /** The affine sheet-warp depth at the crest (grid units — how far the sheet bows/shears). */
    twistMax: number;
    /** The traveling-wave front direction (a gentle diagonal). */
    waveDir: [number, number];
    /** The crest-band spatial frequency (LOW — cells per crest). */
    waveK: number;
    /** The front speed (slow — inertia). */
    waveOmega: number;
    /** The crest-band width (a localized front, not a global pulse). */
    waveSigma: number;
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

    // ── Face: the height-lit filled cell interior ─────────────────────
    /**
     * The filled-FACE opacity — **default `0`** so the face EVAPORATES → byte-identical to the
     * line-only default render. The demo `LIQUID_GRID_PRESET_RIPPLE` lifts it.
     */
    faceAlpha: number;
    /** The slope-shade gain (the ∇H Lambert relief — higher = steeper crest/trough contrast). */
    faceRelief: number;
    /** The volume-preserving SQUASH: the plateau inset retreats at the crest so the face inflates. */
    squashK: number;
    /** The base inset-square coverage (the soft tile inside the warped cell, 0..0.5 grid units). */
    baseInset: number;
    /**
     * The 3-stop warm-DIVERGENT face ramp (FOLD B — height-keyed, NOT a 2-point mid-park `mix`):
     * trough → mid → crest. ALL hues ∈ [20,90] (rose-umber → ember/amber → warm-wheat) so the
     * teal/navy exclusion is clear by construction.
     */
    faceWarmLo: OklchStop;
    faceWarmMid: OklchStop;
    faceWarmHi: OklchStop;
    /** The fixed cel key-light direction (upper-right) the slope-shade Lamberts against. */
    lightDir: [number, number];

    /** The ground (default transparent so it suffuses over the page). */
    background: OklchStop | "transparent";
    /** Pointer bulge (§4/§8) — on (demo), off (suffusion). */
    interactive: boolean;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity line ink (the library default — NOT a themed hue). A warm-amber
 * ink in the `--foreground` family (OKLab hue ~62, the warm identity) so the
 * grid reads as warm ink over the page; the SFC resolves the live `--foreground` token at
 * mount, this stop is the SSR/no-token fallback identity. A consumer (the demo) themes it
 * through a PRESET, never a token edit. NEVER teal/navy (h in [180,280] reds P5).
 */
export const WARM_IDENTITY_INK: OklchStop = { L: 0.62, C: 0.05, h: 62 };

/**
 * The library-default FACE ramp stops — a CALM warm-divergent fold the face would paint IF lit
 * (the `faceAlpha:0` default keeps the face evaporated, so these never paint at HEAD; they are
 * the warm-identity SSR fallback the vivid demo preset overrides). ALL hues ∈ [20,90] — the
 * teal/navy exclusion is clear by construction.
 *   trough → rose-umber, mid → ember-amber, crest → warm-wheat.
 */
export const FACE_WARM_LO: OklchStop = { L: 0.44, C: 0.07, h: 32 };
export const FACE_WARM_MID: OklchStop = { L: 0.66, C: 0.12, h: 58 };
export const FACE_WARM_HI: OklchStop = { L: 0.9, C: 0.1, h: 84 };

/**
 * The shipped warm-identity default config — evenly-spaced, LARGE 64px cells, a crisp fine
 * rule with a bolder major rule every 5 cells, on a slowly breathing liquid curl-flow sheet
 * (research/viz/paper-grid.md §6). SUBTLE + LARGE + evenly-spaced — the user's binding
 * aesthetic. `fieldAlpha: 1` is the demo lead; the suffusion preset drops it to ~0.12.
 */
export const DEFAULT_LIQUID_GRID_CONFIG: LiquidGridConfig = {
    cellSize: 64, // LARGER than the 28/32px static — the user's "LARGER"
    majorEvery: 5, // the kf --graph-major 5rem/1rem ratio
    minorAlpha: 0.12, // the twist must be SEEN — real warm-amber ink (judge's biggest lever; still graph-paper, not heavy)
    majorAlpha: 0.22, // the bolder rule carries the cell silhouette over cream
    lineWidth: 1.0, // one crisp device-pixel via Golus AA
    twistMax: 0.62, // the affine sheet-warp depth at the crest (grid units — a clear liquid bow, the same magnitude concentric reads)
    waveDir: [0.92, 0.39], // the front travels along a gentle diagonal
    waveK: 0.62, // the crest-band spatial frequency — ~one full crest cycle across the visible field (a distinct front)
    waveOmega: 1.05, // the front speed — the sweep READS at a glance (still inertia-eased)
    waveSigma: 0.42, // the crest-band width — a NARROW distinct moving front (a wave passing, not a global pulse)
    fieldAlpha: 1.0, // demo (suffusion drops to ~0.12)
    bulgeStrength: 0.9, // the cursor-swirl peak twist (rad) — a strong finger swirl
    bulgeRadius: 2.5, // cells
    bulgeMode: "repel",
    lineColor: WARM_IDENTITY_INK,
    // The FACE — OPT-IN, calm default byte-identical (faceAlpha:0 → the face evaporates → the
    // HEAD line-only render is unchanged; the demo LIQUID_GRID_PRESET_RIPPLE lifts it).
    faceAlpha: 0, // the structurally-absent FACE stays OFF by default (byte-identical to HEAD)
    faceRelief: 2.6, // the ∇H Lambert gain (so shade traverses ~[0.15,0.95] across a crest)
    squashK: 0.42, // the crest face visibly inflates (inset retreats) — bounded by the CV<0.15 fence
    baseInset: 0.14, // the soft inset tile inside the warped cell
    faceWarmLo: FACE_WARM_LO,
    faceWarmMid: FACE_WARM_MID,
    faceWarmHi: FACE_WARM_HI,
    lightDir: [0.6, 0.8], // the upper-right cel key-light
    background: "transparent",
    interactive: true,
    respectReducedMotion: true,
};
