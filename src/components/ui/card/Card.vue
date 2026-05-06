<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "@utils";

/**
 * The five-tier glass surface ladder. Maps 1:1 to `.glass-{tier}` in glass.css
 * after the v0.8.0 R3-spec rename:
 *
 *   wash     — lightest (~0.30α)        : inline workspace chrome, scroll-pane host
 *   quiet    — light    (~0.50α)        : ambient panels, secondary surfaces
 *   resting  — canonical (~0.65α)       : the protagonist plate (default)
 *   floating — heavy   (~0.80α)         : popover-class, login surfaces
 *   overlay  — heaviest (~0.95α + blur) : modal-on-modal, dialog over content
 */
export type CardTier = "wash" | "quiet" | "resting" | "floating" | "overlay";

interface Props extends PrimitiveProps {
    /** Surface tier; selects one rung of the glass ladder. Default `resting`. */
    tier?: CardTier;
    /** Surface drop shadow via `--shadow-card`. Off for cards nested inside cards. */
    shadow?: boolean;
    /** `::after` paper-grain overlay. Off for scroll panes (the grain conflicts
     *  with overflow:auto repaints). */
    grain?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tier: "resting",
    shadow: true,
    grain: true,
    as: "div",
});
</script>

<template>
    <Primitive
        data-slot="card"
        :data-tier="tier"
        :data-grain="grain"
        :as="as"
        :as-child="asChild"
        :class="
            cn(
                'rounded-xl text-card-foreground scrollbar-hidden',
                `glass-${tier}`,
                shadow && 'shadow-[var(--shadow-card)]',
                !grain && '[&::after]:hidden',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
