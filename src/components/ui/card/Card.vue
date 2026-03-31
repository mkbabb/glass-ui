<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    /** When true, renders as a plain structural wrapper with no border, shadow, or background.
     *  Used when a Card is nested inside another card or serves as a layout container. */
    plain?: boolean;
    /** 'default' = glass bg + shadow; 'pane' = translucent bg + blur (scrollable content panes) */
    variant?: "default" | "pane";
}>();

const variantClass = computed(() => {
    if (props.plain) return "scrollbar-hidden rounded-xl";
    if (props.variant === "pane")
        // Pane uses glass background + blur without the ::after grain overlay,
        // which conflicts with overflow:auto scroll containers.
        return "scrollbar-hidden rounded-xl text-card-foreground bg-[var(--glass-bg-subtle)] backdrop-blur-[var(--glass-blur-subtle)] border border-[var(--glass-border-subtle)]";
    return "scrollbar-hidden glass-default rounded-xl text-card-foreground shadow-[var(--shadow-card)]";
});
</script>

<template>
    <div :class="cn(variantClass, props.class)">
        <slot />
    </div>
</template>
