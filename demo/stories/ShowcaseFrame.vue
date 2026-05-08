<script setup lang="ts">
// ShowcaseFrame — demo-side showcase host for primitive demos.
//
// Replaces the `rounded-card border border-border bg-card shadow-cartoon`
// idiom across ~25-30 sites (5 verbatim + close-variants once `pad` knob
// lands). Per B4 §2.3 the `pad` knob covers the close-variant tail
// (xs=p-3, sm=p-4, md=p-5, lg=p-6, xl=p-10).
//
// Long-term target: extend `<Card>` to accept `shadow="cartoon"` as a
// literal so every showcase frame is morally `<Card tier="resting"
// shadow="cartoon">`. The Card-extension follow-up rides under v0.8.7+;
// for v0.9.0, this demo-side wrapper is the canonical home.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../src/utils/cn";

interface ShowcaseFrameProps {
    /** Inner padding rung. xs=p-3 / sm=p-4 / md=p-5 (default) / lg=p-6 / xl=p-10. */
    pad?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    /** Surface tier — resting (default) reads bg-card; quiet reads bg-card/40. */
    tier?: "resting" | "quiet";
    /** Layer the paper-grain-overlay utility on top. */
    grain?: boolean;
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ShowcaseFrameProps>(), {
    pad: "md",
    tier: "resting",
    grain: false,
});

const padClass = computed(() => {
    switch (props.pad) {
        case "none":
            return "p-0";
        case "xs":
            return "p-3";
        case "sm":
            return "p-4";
        case "lg":
            return "p-6";
        case "xl":
            return "p-10";
        case "md":
        default:
            return "p-5";
    }
});

const tierClass = computed(() =>
    props.tier === "quiet"
        ? "bg-card/40 border-border/40"
        : "bg-card border-border",
);
</script>

<template>
    <div
        :class="
            cn(
                'rounded-card border shadow-cartoon',
                tierClass,
                padClass,
                grain && 'paper-grain-overlay',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
