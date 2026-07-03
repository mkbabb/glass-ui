// src/components/ui/_shared/axes.ts — the ONE grammar home (BH.W-AXIS-GRAMMAR).
//
// Every axis union in the library derives from a tuple here or in
// useSurfaceAxis.ts. A private surface/tier/size/orientation/motion-shaped union
// anywhere else in src/ is forbidden by construction (proof:encapsulation ·
// axis-grammar). `useSurfaceAxis` is the ONE axis done right — a union + a
// resolver + a `[data-surface]` seam — and this file mints the missing three in
// the SAME neighborhood so all four grammar types have ONE import.
//
// THE SUB-RANGE LAW (binding on every component): a component NEVER mints a
// size/orientation/motion/surface string union — it declares a RESTRICTION of the
// one union (`Extract<Size, "sm" | "md" | "lg">`). Adjective rungs (`default`,
// `comfortable`, `spacious`, `audacious`, `mobile`, `compact`) are BANNED in any
// size-shaped union — the `size-grammar` arm greps for them. `xl` is legal only
// where a physical register genuinely exceeds `lg` and maps to a real token rung
// (the dock is the sole HEAD consumer). A SILHOUETTE word (a `cell` tile, an
// `icon`-only button, a `card` shape) NEVER appears in a `size` union — shape is
// its own per-family axis, not a scale rung.
//
// THE MEMBERSHIP FENCE (the anti-grab-bag clause): this file exports ONLY axis
// unions + their frozen tuples + the two re-exported surface types. NO function,
// NO component, NO grab-bag helper — it is the vocabulary, not a toolbox (the
// honest `/api` discovery successor: 4 axis types, not a 203-symbol grab-bag).

export type { Surface, SurfaceTier } from "./useSurfaceAxis"; // KEEP-VERBATIM leaf; re-exported, never moved

/** The scale axis — one honest ordinal; rung names ≡ the `--control-h-*` token cohort. */
export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof SIZES)[number]; // default "md" everywhere (a defaultVariants concern, not a rung name)

/** The layout axis — the inline `"horizontal" | "vertical"` copies factor onto this, zero value change. */
export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number]; // default "horizontal"

/** The motion-weight axis — opt-DOWN, not opt-in (liquid-weight universal). */
export const MOTIONS = ["full", "reduced", "off"] as const;
export type Motion = (typeof MOTIONS)[number]; // default "full"; PRM > prop > default

/** The surface-decoration axis — mirrors `useSurfaceAxis`'s `Surface` (gate-asserted ≡). */
export const SURFACES = ["glass", "veil", "opaque", "clear"] as const;
