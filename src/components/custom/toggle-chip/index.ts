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
                    // BC.W-ACCENT-TONE — the tonal arm RE-POINTS onto the
                    // `.accent-tone` register (one --tone → idle/active/edge/ink).
                    // The per-state `color-mix(…--primary…)` literals are DELETED
                    // (clean break, no alias); the structural padding/radius/text-
                    // size stay, the tonal channels are the register's.
                    "accent-tone",
                    "inline-flex items-center justify-center",
                    "px-2 py-0.5 text-caption",
                    "rounded-sm border",
                    // idle: the FLOORED faint fill (--accent-fill ≥3:1) + a quiet edge.
                    "bg-(--accent-fill)",
                    "border-[color-mix(in_oklab,transparent,var(--accent-edge)_35%)]",
                    "text-muted-foreground",
                    "hover:text-foreground",
                    // active: the bolder band + the active edge rim + the
                    // contrast-safe ink (--accent-ink; the warm-ink CSS fallback
                    // until a consumer threads useAccentTone).
                    "data-[state=on]:bg-(--accent-band)",
                    "data-[state=on]:border-(--accent-edge)",
                    "data-[state=on]:text-(--accent-ink)",
                    "data-[state=on]:font-medium",
                ].join(" "),
                /**
                 * "Cell" — square card with room for an image/icon
                 * on top and a caption beneath. Best for pickers
                 * where the visual IS the content (pose previews,
                 * emotion grid, swatch palette).
                 */
                cell: [
                    // BC.W-ACCENT-TONE — the cell tonal arm RE-POINTS onto the
                    // `.accent-tone` register too (clean break — the per-state
                    // `--primary` color-mix literals DELETED). The cell idle is
                    // transparent (the visual IS the content); active reads the band.
                    "accent-tone",
                    "flex flex-col items-center justify-center gap-1.5",
                    "px-2 py-2.5 text-micro",
                    "rounded-[0.625rem] border border-transparent",
                    "bg-transparent text-foreground",
                    "data-[state=on]:bg-(--accent-band)",
                    "data-[state=on]:border-(--accent-edge)",
                    "data-[state=on]:text-(--accent-ink)",
                ].join(" "),
            },
        },
        defaultVariants: {
            variant: "chip",
        },
    },
);

export type ToggleChipVariants = VariantProps<typeof toggleChipVariants>;
