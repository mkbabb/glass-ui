/**
 * selectableChipVariants — the public name for the SelectableChip face of the ONE
 * shared `chipVariants` recipe (BD.W-CHIP-CONGRUENT-GLASS).
 *
 * The chip family collapsed to ONE congruent stadium-pill warm-glass register
 * (`./chipVariants`). SelectableChip reads it through this stable name; the
 * `size` axis (`sm`/`md`/`lg`/`cell`) IS the shared axis. No second recipe, no
 * grab-bag — the tonal channels are the `.accent-tone` register's, the lens is
 * `.glass-chip` over `.glass-capsule`. Clean break: the prior per-state
 * `color-mix(…--primary…)` literals + the `rounded-sm`/`-md`/`-lg` grab-bag are
 * GONE (no alias — the no-legacy law); this file is the public re-point, not a
 * parallel CVA.
 */
export { chipVariants as selectableChipVariants } from "./chipVariants";
export type { ChipVariants as SelectableChipVariants } from "./chipVariants";
