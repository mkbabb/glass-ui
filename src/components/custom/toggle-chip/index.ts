import { type VariantProps, cva } from "class-variance-authority";
import { chipVariants } from "../selectable-chip/chipVariants";

export { default as ToggleChip } from "./ToggleChip.vue";

/**
 * Shared toggleable "chip" / "cell" primitive for selector grids
 * (BD.W-CHIP-CONGRUENT-GLASS).
 *
 * `chip` — inline horizontal token (e.g. tag pickers, tool-filter rows).
 * `cell` — square card that stacks an icon/preview over a label
 *          (e.g. pose pickers, palette swatches, emotion pickers).
 *
 * Survival of the fittest: the chip family collapsed to ONE congruent recipe
 * (`../selectable-chip/chipVariants`). ToggleChip keeps its `variant` ergonomics
 * (`chip` inline pill / `cell` square card) but RE-POINTS onto the shared
 * `chipVariants` `size` axis — `chip` → the `md` stadium rung, `cell` → the
 * `cell` card exception. Clean break (no alias): the prior 4px `rounded-sm`
 * grab-bag + the `rounded-[0.625rem]→0px` cell + the per-state
 * `color-mix(…--primary…)` literals are GONE; the recipe is now the shared
 * `.glass-chip .glass-capsule .glass-capsule-hover .accent-tone` lens — the SAME
 * register SelectableChip + the toggle-group render. ONE family, no fork.
 *
 * The `data-state="on"` attribute is set by the reka-ui Toggle root when pressed,
 * so the selected colour-flood + the punch hang off the data attribute (in
 * `glass/glass-chip.css`) — no class-binding at the call site.
 */
export const toggleChipVariants = cva("", {
    variants: {
        variant: {
            /** Inline "chip" — the stadium pill at the `md` rung. */
            chip: chipVariants({ size: "md" }),
            /** "Cell" — the square icon+label card (the `--radius-card` exception). */
            cell: chipVariants({ size: "cell" }),
        },
    },
    defaultVariants: {
        variant: "chip",
    },
});

export type ToggleChipVariants = VariantProps<typeof toggleChipVariants>;
