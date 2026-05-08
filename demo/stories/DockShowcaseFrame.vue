<script setup lang="ts">
// DockShowcaseFrame — chassis-aware showcase host for dock-tier demos.
//
// Distinct from `<ShowcaseFrame>` on tier (`bg-card/40` half-opacity vs
// full `bg-card`) and on layout (justify-center for dock chrome). Adopts
// across 13 sites (B4 §2.3 verified count): navigation/{tabs, bouncy-tabs,
// dock, dock-layers, sidebar}, plus the math-paper composition.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../src/utils/cn";

interface DockShowcaseFrameProps {
    /** Inner padding rung — sm=p-3 / md=p-4 / lg=p-8. */
    pad?: "sm" | "md" | "lg";
    /** Layout direction. horizontal (default): justify-center; vertical: column with items-center. */
    direction?: "horizontal" | "vertical";
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DockShowcaseFrameProps>(), {
    pad: "md",
    direction: "horizontal",
});

const padClass = computed(() => {
    switch (props.pad) {
        case "sm":
            return "p-3";
        case "lg":
            return "p-8";
        case "md":
        default:
            return "p-4";
    }
});

const layoutClass = computed(() =>
    props.direction === "vertical"
        ? "flex flex-col items-center gap-3"
        : "flex justify-center",
);
</script>

<template>
    <div
        :class="
            cn(
                'rounded-[var(--radius-card)] border border-border/40 bg-card/40',
                layoutClass,
                padClass,
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
