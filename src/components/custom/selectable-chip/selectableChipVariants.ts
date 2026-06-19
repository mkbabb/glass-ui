import { type VariantProps, cva } from "class-variance-authority";

/**
 * SelectableChip — the public face of the BC.W-ACCENT-TONE tonal register: a
 * reka-`Toggle` selectable chip that READS `.accent-tone` (idle `--accent-fill`
 * floored ≥3:1, active `--accent-band` + `--accent-edge` rim + the contrast-safe
 * `--accent-ink` label). A tag/filter/tool picker is ONE element, golden-by-
 * construction — the tonal channels are owned by the register, not hand-rolled
 * per-state `color-mix(…)`.
 *
 * The recipe is STRUCTURE + the register hook: it applies `.accent-tone` (the
 * channel mint), the idle/active PAINT (off the register channels), and the size
 * axis (the padding/radius/text-size). The tonal COLOUR is the register; this CVA
 * carries no `color-mix(…--primary…)` literal (the N-paste the register collapses).
 *
 * The motion register matches the §6 interactive family (the ToggleChip precedent):
 * the SURFACE legs (bg/border/color) ride `--duration-fast`/`--ease-standard`; the
 * `scale` TRANSFORM leg rides `--spring-smooth`, so the chip lifts on hover + settles
 * on press like every sibling control.
 */
export const selectableChipVariants = cva(
    [
        "accent-tone", // the BC.W-ACCENT-TONE register hook — mints --accent-*
        "focus-ring select-none cursor-pointer outline-none font-sans",
        "inline-flex items-center justify-center gap-1.5",
        "border",
        // idle: the FLOORED faint fill (--accent-fill ≥3:1) + a quiet edge.
        "bg-(--accent-fill)",
        "border-[color-mix(in_oklab,transparent,var(--accent-edge)_35%)]",
        "text-muted-foreground",
        // active (data-[state=on]): the bolder band + the active edge rim + the
        // contrast-safe ink label (--accent-ink, written by useAccentTone).
        "data-[state=on]:bg-(--accent-band)",
        "data-[state=on]:border-(--accent-edge)",
        "data-[state=on]:text-(--accent-ink)",
        "data-[state=on]:font-medium",
        // the §6 lift/settle register (matches the interactive family).
        "scale-100 hover:scale-(--scale-hover-btn) active:scale-(--scale-press-btn) data-[state=on]:scale-(--scale-press-btn)",
        "[transition:scale_var(--spring-smooth-duration)_var(--spring-smooth),background-color_var(--duration-fast)_var(--ease-standard),border-color_var(--duration-fast)_var(--ease-standard),color_var(--duration-fast)_var(--ease-standard)]",
        "disabled:opacity-disabled disabled:pointer-events-none disabled:cursor-not-allowed",
    ].join(" "),
    {
        variants: {
            /**
             * The size axis — the structural padding/radius/text-size rungs. The
             * tonal channels are size-invariant (the register owns colour); `size`
             * scales only the chassis.
             */
            size: {
                sm: "px-2 py-0.5 text-caption rounded-sm",
                md: "px-3 py-1 text-small rounded-md",
                lg: "px-4 py-1.5 text-base rounded-lg",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);

export type SelectableChipVariants = VariantProps<typeof selectableChipVariants>;
