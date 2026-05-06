import { type VariantProps, cva } from "class-variance-authority";

export { default as Card } from "./Card.vue";
export { default as CardHeader } from "./CardHeader.vue";
export { default as CardTitle } from "./CardTitle.vue";
export { default as CardDescription } from "./CardDescription.vue";
export { default as CardContent } from "./CardContent.vue";
export { default as CardFooter } from "./CardFooter.vue";

/**
 * cardVariants — variant-class map for `<Card>`. Names the surface tier
 * each variant resolves to. `default`, `pane`, `subtle` honor the
 * `flush` prop (drops the surface shadow); `cartoon` resolves its
 * shadow inside `.glass-cartoon`. `paper` resolves inside `.paper-card`
 * from paper.css — it ships its own shadow + padding + border.
 *
 * The cream tier is owned by `<CreamSurface>` (the canonical primitive
 * per DESIGN.md ## Substrate Hierarchy). Consumers compose
 * `<Card><CreamSurface>…</CreamSurface></Card>` for card semantics over
 * the warm-cream substrate, or use `<CreamSurface>` standalone for
 * full-bleed substrate regions.
 */
export const cardVariants = cva("scrollbar-hidden text-card-foreground", {
    variants: {
        variant: {
            default: "glass-default rounded-xl",
            pane:
                "rounded-xl bg-[var(--glass-bg-subtle)] " +
                "[backdrop-filter:var(--glass-blur-subtle)] " +
                "border border-[var(--glass-border-subtle)] transition-shadow",
            cartoon: "glass-cartoon rounded-xl transition-shadow",
            paper: "paper-card",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export type CardVariants = VariantProps<typeof cardVariants>;

export type CardVariant = NonNullable<CardVariants["variant"]>;

export interface CardProps {
    class?: string;
    /** Renders as a plain structural wrapper with no border, shadow, or background. */
    plain?: boolean;
    /** Surface tier. */
    variant?: CardVariant;
    /** Drop the surface shadow without otherwise changing the variant. */
    flush?: boolean;
}
