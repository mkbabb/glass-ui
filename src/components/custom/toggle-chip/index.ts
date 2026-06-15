import { type VariantProps, cva } from "class-variance-authority";

export { default as ToggleChip } from "./ToggleChip.vue";

/**
 * Shared toggleable "chip" / "cell" primitive for selector grids.
 *
 * `chip` — inline horizontal token (e.g. tag pickers, tool-filter rows).
 * `cell` — square card that stacks an icon/preview over a label
 *          (e.g. pose pickers, palette swatches, emotion pickers).
 *
 * The `data-state="on"` attribute is set by the reka-ui Toggle root
 * when pressed, so selected styling hangs off the data attribute and
 * doesn't need a class-binding at the call site.
 */
export const toggleChipVariants = cva(
    [
        "focus-ring select-none cursor-pointer outline-none",
        "font-sans",
        // BA.W-GLASS-CAL (H2a §6) — off the off-doctrine `transition-colors
        // duration-150 ease-out` (a hardcoded 150ms color-only snap with NO lift,
        // faster + jitterier than every sibling control — the "hover far too quick
        // and jittery" read). Now the canonical §6 register, identical to the
        // interactive family: the SURFACE legs (bg/border/box-shadow/color) ride the
        // bezier `--duration-fast`/`--ease-standard`; the `scale` TRANSFORM leg rides
        // `--spring-smooth` (the ONE button scale register), so the chip lifts on
        // hover (`--scale-hover-btn`) + settles on press (`--scale-press-btn`) exactly
        // like its neighbors instead of color-snapping flat.
        "scale-100 hover:scale-(--scale-hover-btn) active:scale-(--scale-press-btn) data-[state=on]:scale-(--scale-press-btn)",
        "[transition:scale_var(--spring-smooth-duration)_var(--spring-smooth),background-color_var(--duration-fast)_var(--ease-standard),border-color_var(--duration-fast)_var(--ease-standard),box-shadow_var(--duration-fast)_var(--ease-standard),color_var(--duration-fast)_var(--ease-standard)]",
        "disabled:opacity-disabled disabled:pointer-events-none disabled:cursor-not-allowed",
    ].join(" "),
    {
        variants: {
            variant: {
                /**
                 * Inline "chip" — thin padding, small radius,
                 * caption-sized label. Best for dense horizontal
                 * rows of single-word selectors (contour / bone /
                 * segment pickers, quick filters).
                 */
                chip: [
                    "inline-flex items-center justify-center",
                    "px-2 py-0.5 text-caption",
                    "rounded-sm border",
                    "border-[color-mix(in_srgb,var(--border)_35%,transparent)]",
                    "bg-[color-mix(in_srgb,var(--background)_60%,transparent)]",
                    "text-muted-foreground",
                    "hover:bg-[color-mix(in_srgb,var(--accent)_40%,transparent)]",
                    "hover:text-foreground",
                    "data-[state=on]:bg-[color-mix(in_srgb,var(--primary)_18%,transparent)]",
                    "data-[state=on]:border-[color-mix(in_srgb,var(--primary)_60%,transparent)]",
                    "data-[state=on]:text-foreground",
                    "data-[state=on]:font-medium",
                ].join(" "),
                /**
                 * "Cell" — square card with room for an image/icon
                 * on top and a caption beneath. Best for pickers
                 * where the visual IS the content (pose previews,
                 * emotion grid, swatch palette).
                 */
                cell: [
                    "flex flex-col items-center justify-center gap-1.5",
                    "px-2 py-2.5 text-micro",
                    "rounded-[0.625rem] border border-transparent",
                    "bg-transparent text-foreground",
                    "hover:bg-[color-mix(in_srgb,var(--accent)_40%,transparent)]",
                    "hover:border-[color-mix(in_srgb,var(--border)_50%,transparent)]",
                    "data-[state=on]:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]",
                    "data-[state=on]:border-primary",
                ].join(" "),
            },
        },
        defaultVariants: {
            variant: "chip",
        },
    },
);

export type ToggleChipVariants = VariantProps<typeof toggleChipVariants>;
