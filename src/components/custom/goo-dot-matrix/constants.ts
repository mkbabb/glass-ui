// BC.W-VIZ-HYBRID — the goo-dot-matrix compile-time shape budget + the WARM-IDENTITY
// default config (the single source the SFC, the composable, the uniform bridge, and the
// WGSL/GLSL dot-stamp shaders all read).
//
// THE HYBRID (BC.W-VIZ-HYBRID). The metaball SDF FIELD (the goo-blob `sceneDistG` half,
// byte-untouched) rendered as a DOT MATRIX — a grid of small warm-cream dots whose size +
// brightness are driven by the field value at each cell, so the dots are dense+big+bright
// INSIDE the merged metaball and sparse+small+dim outside (tixy.land applied to an SDF:
// `v = thickness(sceneDistG(cellCenter))` drives the dot grid). It re-uses two SOTA
// primitives the codebase already owns — the goo-blob field + the dot-matrix render —
// joined by ONE new idea: the dot-grid OUTPUT stage. Four render registers, ONE field.
//
// THE WARM-IDENTITY FENCE (load-bearing). `DEFAULT_GOO_DOT_CONFIG` resolves the warm-cream
// library identity (the goo-blob cream palette via BLOB_CONFIG_DEFAULTS, NO teal/navy
// literal). The near-dark + reference reproductions are DEMO PRESETS in
// `demo/stories/substrates/presets.ts` (presets-in-consumers). `proof:viz-hybrid` clause 5
// reds a teal/navy literal here. The teal-on-navy is GONE entirely (clean break, no alias —
// BC.W-TEAL-NAVY-PURGE).

import type { OklchStop } from "../../../composables/color";
import { BLOB_CONFIG_DEFAULTS, type BlobConfig } from "../goo-blob";

/** The four render registers — the §T4 `variant` axis (default `dot-field`). */
export type GooDotVariant = "dot-field" | "dot-dither" | "dot-lattice" | "dot-sphere";

/** Pointer interaction mode — repel pushes dots off the field, attract pulls them in. */
export type GooDotPointerMode = "repel" | "attract";

/**
 * Compile-time dot-stamp cell cap (px) — the device-px cell SIZE the fragment quantizes the
 * grid to; mirrors the §T1 `uDotPixelSize` band (a floor so a tiny cell never hangs the
 * fragment over a huge grid). Register-A only.
 */
export const MIN_DOT_PIXEL_SIZE = 4;

/** Compile-time lattice column cap — mirrors the Register-B `uCols` instance fan-out. */
export const MAX_LATTICE_COLS = 96;

/**
 * The full author schema — the studio's `useConfiguratorState` model. The FIELD atoms are
 * REUSED from the goo-blob `BlobConfig` (the metaball field is the byte-untouched goo half),
 * and the DOT-RENDER atoms are ADDED (the §T1/§T2/§T3 dot-grid output). A NEW schema (no
 * prior `goo-dot-matrix`, no MIGRATION row).
 */
export interface GooDotConfig {
    /** Which render register — `dot-field` (default) | `dot-dither` | `dot-lattice` | `dot-sphere`. */
    variant: GooDotVariant;

    /**
     * The metaball FIELD config — the byte-untouched goo-blob field atoms (geometry, the
     * smin membrane, the satellites, the warm-cream palette). The hybrid READS the field
     * `sceneDistG`/`thickness` off this; it does not rebuild the math.
     */
    field: BlobConfig;

    /**
     * The dot-grid CELL size in device px (Register A — §T1 `uDotPixelSize`). Larger cells →
     * coarser dots. Floored at `MIN_DOT_PIXEL_SIZE` so the fragment never over-grids.
     */
    dotPixelSize: number;
    /** Dot radius MIN (the rim/outside dot, fraction of the cell, §T1 `uDotMin`). */
    dotMin: number;
    /** Dot radius MAX (the core dot, fraction of the cell, §T1 `uDotMax`). */
    dotMax: number;
    /** The field floor below which no dot paints (§T1 `uFieldFloor`). */
    fieldFloor: number;
    /** The dim-outside brightness floor (the dots dim at the rim, §T1 `uDotBrightFloor`). */
    dotBrightFloor: number;

    /**
     * Register-B lattice column count (§T3 `uCols`). The instanced grid is `cols × rows`
     * fit to the aspect; capped at `MAX_LATTICE_COLS`.
     */
    cols: number;
    /** Register-B flow displacement toward the merging core (§T3 `uFlowAmt`; capped < 0.5 pitch). */
    flowAmt: number;

    /** The dot-color ramp (resolved via the ColorResolver; default warm-cream). */
    palette: OklchStop[];
    /** The ground color (default transparent so the glass card shows through). */
    background: OklchStop | "transparent";

    /** Pointer parallax + repel + accel-burst (the §T7 dot-cursor influence). */
    interactive: boolean;
    /** repel ↔ attract (the dot-influence direction). */
    pointerMode: GooDotPointerMode;
    /** The pointer influence radius (NDC; the §T7 `pointerRadius`). */
    pointerRadius: number;

    /** ONE static frame then park under `prefers-reduced-motion: reduce`. */
    respectReducedMotion: boolean;
}

/**
 * The warm-cream identity palette (the library default — NOT teal). The dot core is the soft
 * warm cream of the goo-blob bead; the rim fades to warm amber. Mirrors the dot-matrix /
 * dot-flow `WARM_IDENTITY_PALETTE` family — a consumer themes it mono-warm-white-on-near-black
 * through a PRESET, never a token edit.
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // a soft warm cream (the dense+bright dot core, where the field is deep)
    { L: 0.92, C: 0.03, h: 78 },
    // a warm amber (the sparse+dim dot at the rim)
    { L: 0.84, C: 0.07, h: 62 },
];

/**
 * The shipped warm-identity default — the §T6 default table: the Register-A field-driven dot
 * stamp over the byte-untouched goo-blob field (the cream metaball), warm-cream dots over a
 * transparent ground (the glass card shows through). The near-dark + reference reproductions
 * are DEMO presets (presets-in-consumers).
 */
export const DEFAULT_GOO_DOT_CONFIG: GooDotConfig = {
    variant: "dot-field", // the §T4 default — the smooth field-driven dot
    // The byte-untouched goo-blob field — the warm-cream cream-bead metaball with its
    // satellites + smin membrane. The hybrid READS its thickness; the `blob` STAGE-1
    // register keeps the field cheap (the dots are the surface, not the lit dressing).
    field: { ...BLOB_CONFIG_DEFAULTS, variant: "blob" },
    dotPixelSize: 10, // the §T2 PIXEL_SIZE 8-10 band
    dotMin: 0.18, // the small rim dot (fraction of the cell)
    dotMax: 0.42, // the big core dot (fraction of the cell)
    fieldFloor: 0.06, // no dot below this field value
    dotBrightFloor: 0.35, // the dim-outside floor
    cols: 56, // Register-B lattice width
    flowAmt: 0.35, // Register-B flow toward the core (capped < 0.5 pitch)
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    interactive: false,
    pointerMode: "repel",
    pointerRadius: 0.35,
    respectReducedMotion: true,
};
