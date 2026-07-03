import { type VariantProps, cva } from "class-variance-authority";

/**
 * chipVariants — the ONE congruent chip recipe (BD.W-CHIP-CONGRUENT-GLASS).
 *
 * The chip family (ToggleChip · SelectableChip + the toggle-group children)
 * collapses to ONE `chipVariants({ size })`: a stadium-pill warm-glass LENS that
 * PUNCHES when you pick it. Survival of the fittest — the SelectableChip size axis
 * (`sm`/`md`/`lg`) + the `ToggleChip` `chip`/`cell` axis collapse here (clean
 * break, no alias — the no-legacy law; the `selectableChipVariants`/
 * `SelectableChipVariants` re-point shim was SWEPT at BG.W-DEAD-SWEEP, every
 * consumer reads `chipVariants`/`ChipVariants` directly). The three SFCs stay
 * DISTINCT (bool toggle vs tonal picker vs glyph tile) but render the SAME register.
 *
 * The recipe is STRUCTURE + the shared-register hooks: it COMPOSES the read-only
 * shared registers, never re-forks a parallel glass/cartoon/motion system —
 *   · `.glass-chip`         — the chip-family material/motion layer (the warm idle
 *                             floor + the `--glass-fill-tint` plate tint + the ONE
 *                             scale write + the `::after` colour-flood punch).
 *   · `.glass-capsule`      — the warm-transmissive lozenge BODY (fill + rim +
 *                             shadow + blur, on `--radius-pill` → the stadium
 *                             end-cap at every rung). Radius is INVARIANT — the
 *                             capsule re-rounds itself at every height; no
 *                             `rounded-*` rung (retires the 4/6/10px grab-bag).
 *   · `.glass-capsule-hover`— the SHARED specular-lift + press-snap on hover.
 *   · `.accent-tone`        — the contrast-floored tonal channels (idle fill /
 *                             active band / active edge / contrast-safe ink).
 *
 * The geometry: radius invariant (the capsule's `--radius-pill`); only padding/
 * text vary, on a √φ ladder (φ≈1.618). The `cell` is the ONE documented exception
 * (`.glass-chip--cell` → `--radius-card`): a 72px icon+label tile is a CARD, not a
 * pill — a DELIBERATE 2-silhouette family, composing the SAME material + motion.
 *
 * NO scale CVA — the ONE `scale` write lives on `.glass-chip` (hover/press/punch
 * folded into a single source of truth; a CVA `hover:scale-*` would collide).
 * The CVA carries no `color-mix(…--primary…)` literal — the tonal COLOUR is the
 * `.accent-tone` register's.
 */
export const chipVariants = cva(
    [
        // the shared registers (read-only, composed — never re-forked)
        "glass-chip glass-capsule glass-capsule-hover accent-tone",
        "focus-ring select-none cursor-pointer outline-none font-sans",
        // idle ink (the band swaps to --accent-ink on data-state=on, in glass-chip.css)
        "text-muted-foreground",
        "disabled:opacity-disabled disabled:pointer-events-none disabled:cursor-not-allowed",
    ].join(" "),
    {
        variants: {
            /**
             * The size axis — the STRUCTURAL padding/text rungs only. Radius is
             * size-INVARIANT (the stadium re-rounds at every height — the capsule
             * owns it). The pad-x derives from height × ~1/φ (the golden inset, the
             * iOS-27 chip's pad-x ≈ 0.6× its height); the family shares ONE rhythm.
             */
            size: {
                sm: "inline-flex items-center justify-center gap-1 px-2.5 py-1 text-caption",
                md: "inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-small",
                lg: "inline-flex items-center justify-center gap-2 px-5 py-2 text-base",
            },
            /**
             * The SHAPE axis (BH.W-SIZE-UNIFY) — a silhouette word is NEVER a scale
             * rung (the axes.ts sub-range law). `pill` (default) is the stadium
             * capsule; `cell` is the square icon+label TILE (a card, not a pill):
             * `.glass-chip--cell` re-points the silhouette to `--radius-card`, the
             * material + motion stay the shared register. Composed WITH `size`; the
             * cell geometry overrides the inline-flex pill padding at the element.
             */
            shape: {
                pill: "",
                cell: "glass-chip--cell flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 text-micro",
            },
        },
        defaultVariants: {
            size: "md",
            shape: "pill",
        },
    },
);

export type ChipVariants = VariantProps<typeof chipVariants>;
