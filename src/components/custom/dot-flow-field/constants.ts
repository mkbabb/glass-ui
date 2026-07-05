// BG.W-DOTFLOW-REBUILD — the dot-flow-field author schema + the WARM-IDENTITY default config.
//
// THE STREAMLINE REBUILD (USER 07-05 — "a TOTAL MESS, completely unusable"). The free-advecting
// mote-cloud + additive-trail schema (`mode`/`particleCount`/`trailHalfLife`/`vortex*`/…) is
// RETIRED WHOLE (W-PRUNE-CONSOLIDATE — no dual path). The config is now the STREAMLINE register:
// evenly-spaced iso-contours of a curl-warped stream field, beaded with dots that drift along
// their own line (the IMG_1836 reference gestalt). The knobs are the streamline COUNT + the
// undulation/interweave/curl-warp of the lines + the bead density/drift + the warm palette/floor.
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_FLOW_CONFIG.palette` is the neutral warm-cream
// library identity + `DEFAULT_FLOW_CONFIG.floor` is a deep WARM-near-black (hue ~50, NOT navy).
// The IMG_1836 teal-on-navy skin is a DEMO PRESET in `demo/stories/substrates/presets.ts`
// (presets-in-consumers — never a library token). `proof:viz-dotflow` / `proof:teal-navy-purge`
// red a teal/navy literal here.

import type { OklchStop } from "../../../composables/color";

/** Compile-time palette cap — mirrors the WGSL/GLSL `MAX_FLOW_STOPS`. */
export const MAX_FLOW_STOPS = 4;

/**
 * The full author schema — the studio's `useConfiguratorState` model. Every field is a tunable
 * the demo configurator drives; the SFC resolves it into the streamline uniform table.
 */
export interface FlowFieldConfig {
    // ── the streamlines (evenly-spaced iso-contours of the curl-warped stream field) ──
    /** Approx # of streamlines across the view (drives the stream-ramp slope). */
    lineCount: number;
    /** How wavy each streamline is (the primary x-traveling undulation amplitude, 0..~2). */
    undulation: number;
    /** The 2nd-direction interweave amplitude (0..~1.2; kept < the ramp so lines never cross). */
    interweave: number;
    /** The Bridson curl-noise domain-warp amount (organic braiding; 0..~0.4). */
    curlWarp: number;
    /** How fast the whole field breathes/undulates (the temporal drift multiplier). */
    flowSpeed: number;
    /** The faint connecting-thread width in px @1× (0 = pure dots; the streamline read aid). */
    lineWidth: number;
    /** The connecting-thread brightness (0..1; the dots dominate). */
    lineStrength: number;

    // ── the beads (dots strung along the streamlines) ──
    /** Beads per streamline across the view (drives the transverse bead spacing). */
    beadDensity: number;
    /** How fast the beads flow ALONG their own streamline (the drift speed). */
    beadDrift: number;
    /** The bead dot radius in px @1×. */
    dotSize: number;

    // ── the look ──
    /** The dot brightness depth (subtle ↔ bold; 0..~1.4). */
    contrast: number;
    /** The warm-cream dot ramp (the demo re-tints it); resolved via the ColorResolver. */
    palette: OklchStop[];
    /** The deep warm-near-black ground the streamlines sit over (never transparent). */
    floor: OklchStop;

    // ── interaction ──
    /** How hard the cursor bends the streamlines (the gaussian domain-push gain). */
    pointerStrength: number;
    /** The cursor-push fall-off radius (domain units). */
    pointerRadius: number;
    /** Bend the streamlines toward the cursor (the interactive arm). */
    interactive: boolean;
    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT teal). A two-stop warm-amber ramp
 * over the warm-cream foreground family: the dot core (warm cream) → a warm amber edge. A
 * consumer (the demo) re-tints it through a PRESET, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    { L: 0.94, C: 0.03, h: 82 }, // warm cream (the dot core)
    { L: 0.84, C: 0.08, h: 62 }, // warm amber (the hot bead edge)
];

/** The deep warm-near-black ground (hue ~50, low C — warm, NOT navy). */
export const WARM_NEAR_BLACK_FLOOR: OklchStop = { L: 0.12, C: 0.014, h: 50 };

/**
 * The shipped warm-identity default config — the SUBTLE STREAMLINE regime (the IMG_1836 target):
 * ~11 evenly-spaced streamlines, gently undulating + interweaving + curl-warped, each beaded
 * with warm-cream dots that drift slowly along their own line, over the deep warm floor. The
 * cursor bends the lines when interactive.
 */
export const DEFAULT_FLOW_CONFIG: FlowFieldConfig = {
    lineCount: 11, // ≥8 traceable streamlines
    undulation: 1.3, // a visible wave in each line (x-traveling → never folds the ramp)
    interweave: 0.7, // the 2nd-direction interweave (bounded < the ramp)
    curlWarp: 0.16, // the organic Bridson curl-noise braiding
    flowSpeed: 0.5, // a slow, calm breath (the "subtle larger sweeping waves")
    lineWidth: 0.9, // a whisper-thin connecting thread @1× (~0.9px)
    lineStrength: 0.32, // the thread is faint; the dots dominate
    beadDensity: 22, // beads per streamline across the wide axis
    beadDrift: 0.55, // a slow march along the line
    dotSize: 3.2, // resolvable warm-cream dots
    contrast: 1.05, // bold-enough dots over the deep floor (p99 below white-out)
    palette: WARM_IDENTITY_PALETTE,
    floor: WARM_NEAR_BLACK_FLOOR,
    pointerStrength: 0.16, // a gentle streamline bend (no snap, no vortex chaos)
    pointerRadius: 0.5,
    interactive: true,
    respectReducedMotion: true,
};
