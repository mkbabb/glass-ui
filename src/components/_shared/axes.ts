// src/components/_shared/axes.ts — the ONE grammar home.
//
// Every axis union in the library derives from a tuple here. A private
// surface/tier/size/orientation/motion-shaped union
// anywhere else in src/ is forbidden by construction (proof:encapsulation ·
// axis-grammar). This file is vocabulary only; the private class resolver and
// `[data-surface]` paint seam consume these tuples without re-minting them.
//
// THE SUB-RANGE LAW (binding on every component): a component NEVER mints a
// size/orientation/motion/surface string union — it declares a RESTRICTION of the
// one union (`Extract<Size, "sm" | "md" | "lg">`). Adjective rungs (`default`,
// `comfortable`, `spacious`, `audacious`, `mobile`, `compact`) are BANNED in any
// size-shaped union — the `size-grammar` arm greps for them. `xl` is legal only
// where a physical register genuinely exceeds `lg` and maps to a real token rung
// (the dock is the sole such consumer). A SILHOUETTE word (a `cell` tile, an
// `icon`-only button, a `card` shape) NEVER appears in a `size` union — shape is
// its own per-family axis, not a scale rung.
//
// THE MEMBERSHIP FENCE: this file exports only axis tuples and their derived unions.

/** The surface-decoration axis. */
export const SURFACES = ["glass", "veil", "opaque"] as const;
export type Surface = (typeof SURFACES)[number];

/** The five-rung glass ladder. */
export const SURFACE_TIERS = ["wash", "quiet", "resting", "floating", "overlay"] as const;
export type SurfaceTier = (typeof SURFACE_TIERS)[number];

/** The scale axis — one honest ordinal; rung names ≡ the `--control-h-*` token cohort. */
export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof SIZES)[number]; // default "md" everywhere (a defaultVariants concern, not a rung name)

/** The layout axis — the inline `"horizontal" | "vertical"` copies factor onto this, zero value change. */
export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number]; // default "horizontal"

/** The motion-weight axis — opt-DOWN, not opt-in (liquid-weight universal). */
export const MOTIONS = ["full", "reduced", "off"] as const;
export type Motion = (typeof MOTIONS)[number]; // default "full"; PRM > prop > default

// ── The three factor-band axes (the axes-ext membership fence).
// TONES / PLACEMENTS / TRIGGERS join the four grammar unions so the Kronecker
// factorization has a HOME for the concepts a `variant` map must NOT smuggle: a tone
// (success/warning/info/destructive — proof:variant-residual moves them off `variant`
// onto `tone`), a surface placement (the anchored-edge axis: `SheetContent side`, and
// any floating surface that sites itself against one),
// and an overlay trigger (HoverPopover/HoverCard/ContextMenu fold onto ONE Popover
// `trigger`). A private tone/placement/trigger-shaped union anywhere else in src/ is
// forbidden by construction — proof:encapsulation's axes-ext arm greps for a re-mint.

/** The tone axis — the semantic status register (`--<tone>` token cohort); NEVER a `variant` member. */
export const TONES = ["neutral", "success", "warning", "info", "destructive"] as const;
export type Tone = (typeof TONES)[number]; // default "neutral"

/** The overlay-placement axis — ONE union for every surface that sites itself against an
 * edge or the centre. `center` is the Dialog's rest and is excluded by the two consumers
 * that only ever anchor: `SidePlacement` (sheet/motion.ts) and `FloatingSide`
 * (_shared/floating.ts). */
export const PLACEMENTS = ["center", "top", "right", "bottom", "left"] as const;
export type Placement = (typeof PLACEMENTS)[number]; // default "center"

/** The overlay-trigger axis — click | hover | context (the sealed Popover Kronecker fold). */
export const TRIGGERS = ["click", "hover", "context"] as const;
export type Trigger = (typeof TRIGGERS)[number]; // default "click"

/** The overlay-backdrop axis — the flat scrim vs the graded box-following halo. */
export const BACKDROPS = ["scrim", "graded"] as const;
export type Backdrop = (typeof BACKDROPS)[number]; // default "scrim" (byte-identical no-op floor)

// THE PAIRED-EDIT META-ARRAYS ARE GONE (BK #19 W-SHIM-PURGE). Three hand-maintained
// `const` manifests of this module's own export names (`AXIS_TUPLES` ·
// `AXIS_TYPE_NAMES` · `ALLOWED_EXPORTS`) were held alive by `void x;` statements —
// a suppression that reads as a use to BOTH the unused check and the bundler's DCE,
// so the dead data shipped as evaluated runtime bytes in `dist/axes.js`. They were
// self-referential derived data with ZERO readers: the gate their comment named
// ("proof:encapsulation reads these") does not exist. The MEMBERSHIP FENCE stated at
// the head of this file is the invariant, and it is asserted against the SOURCE —
// never against a manifest of the source kept by hand beside it.
