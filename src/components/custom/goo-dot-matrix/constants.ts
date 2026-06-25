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

/** The warm ground modes — `"warm"` paints a living warm-amber gradient pass-1 BEHIND the
 * dots in the SAME GL context (the §3 colourful ground, an opaque field to read over);
 * `"transparent"` skips the ground pass (the library composable default — the dots ride the
 * consumer's own host, e.g. the global `[data-paper-field]` backdrop). */
export type GooDotFieldGround = "warm" | "transparent";

/**
 * Compile-time dot-stamp cell cap (px) — the device-px cell SIZE the fragment quantizes the
 * grid to; mirrors the §T1 `uDotPixelSize` band (a floor so a tiny cell never hangs the
 * fragment over a huge grid). Register-A only.
 */
export const MIN_DOT_PIXEL_SIZE = 4;

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
    /** The field floor at which the meniscus rise begins (§T1 `uFieldFloor`). */
    fieldFloor: number;
    /** The dim-outside brightness floor (the dots dim at the rim, §T1 `uDotBrightFloor`). */
    dotBrightFloor: number;

    /**
     * The φ-banded PRESENCE FLOOR (BD.W-GOODOT-LIQUID-FIELD Move 1, `uPresenceFloor`). The
     * base-lattice opacity the field NEVER drops below — the dot is always present and the
     * metaball MODULATES it (it never gates it). At `0` the read is byte-identical to the old
     * `step()` discard (the calm escape hatch); the default fills the card corner-to-corner.
     */
    presenceFloor: number;
    /**
     * The NECK-RIDGE swell (Move 2, `uWeldSwell`). At a weld (the shallow-gradient membrane
     * where two bodies meet) the dot radius swells by `1 + weldSwell·weld`. Pinned so the
     * swelled rim dot stays a sub-cell ROUND circle (`dotMax·(1+weldSwell) < 1`), never a
     * clipped square (the √φ cell-clip ceiling).
     */
    weldSwell: number;
    /**
     * The NECK-RIDGE specular (Move 2, `uWeldSpecular`). A MULTIPLICATIVE HDR brightness pop on
     * the weld dots (`bright *= 1 + weldSpecular·weld`) — it can exceed the core ceiling so the
     * waist is the BRIGHTEST band in the field a beat before the bodies fuse.
     */
    weldSpecular: number;
    /**
     * The liquid-lattice flow (Move 4b, `uFlowAmt`). The cell sample advects down the field
     * gradient toward the forming core (`sampleUv -= normalize(scene.yz)·flowAmt·core`) so the
     * lattice migrates INTO the goo rather than sitting screen-locked. A real net-new lane.
     */
    flowAmt: number;

    /** The dot-color ramp (resolved via the ColorResolver; default warm technicolor). */
    palette: OklchStop[];
    /** The ground color (default transparent so the glass card / paper-field shows through). */
    background: OklchStop | "transparent";
    /**
     * The §3 warm GROUND pass (Move 4a, `fieldGround`). `"warm"` draws a living warm-amber
     * gradient pass-1 behind the dots in the SAME context (an opaque field to read over, the
     * cartoon shadow's casting surface); `"transparent"` skips it (the library composable
     * default — the dots ride the consumer's own host).
     */
    fieldGround: GooDotFieldGround;

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
 * The warm TECHNICOLOR identity palette (the library default — warm-fire/amber/gold, NEVER
 * teal/cyan). A 3-stop liquid ramp the read maps CORE→NECK→RIM (the `tone = 1 - fCell` sample,
 * so stop[0] is the deep CORE, stop[2] the base-lattice RIM):
 *
 *   CORE — hot butter-gold (`fCell→1`, the bright cream membrane at the body core),
 *   NECK — molten coral (the weld climax, the fattest+brightest dots at the merge waist),
 *   RIM  — deep amber (`fCell≈floor`, the resting base lattice — it carries chroma, never gray).
 *
 * BD.W-GOODOT-LIQUID-FIELD Move 3 — the near-mono cream-on-cream identity (ΔL 0.08 ΔC 0.04,
 * invisible separation) re-graded to real chroma (C_core ≥ 0.13, the no-gray warm floor cleared
 * with room). A consumer themes it mono-warm-white-on-near-black through a PRESET, never a token
 * edit (presets-in-consumers — the library identity sharpens as a token evolution).
 */
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
    // CORE — hot butter-gold (fCell→1, the bright cream membrane deep in the body)
    { L: 0.96, C: 0.13, h: 85 },
    // NECK — molten coral (the weld climax, the merge-waist ridge)
    { L: 0.82, C: 0.18, h: 45 },
    // RIM — deep amber (fCell≈floor, the resting base lattice — chroma, not gray)
    { L: 0.72, C: 0.15, h: 62 },
];

/**
 * The shipped warm-identity default — the §T6 default table: the Register-A field-driven dot
 * stamp over the byte-untouched goo-blob field (the cream metaball), warm technicolor dots that
 * FILL the card corner-to-corner (the presence floor), the weld a ridge of the fattest+brightest
 * coral dots, over a transparent ground (the composable default — the dots ride the consumer's
 * own host). The demo turns the warm ground ON; the near-dark reference is a DEMO preset
 * (presets-in-consumers).
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
    fieldFloor: 0.06, // the meniscus rise begins here
    dotBrightFloor: 0.35, // the dim-outside floor
    presenceFloor: 0.2, // Move 1 — the base-lattice fills the card (raised per the ghost-lattice fold)
    weldSwell: 0.5, // Move 2 — the neck-ridge swell (pinned: dotMax·1.5 = 0.63 < 1, sub-cell round)
    weldSpecular: 0.25, // Move 2 — the multiplicative HDR weld pop
    flowAmt: 0.35, // Move 4b — the liquid-lattice advection toward the forming core
    palette: WARM_IDENTITY_PALETTE,
    background: "transparent",
    fieldGround: "transparent", // the library composable default (the demo turns "warm" on)
    interactive: false,
    pointerMode: "repel",
    pointerRadius: 0.35,
    respectReducedMotion: true,
};
