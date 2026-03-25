<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    /** When true, renders as a plain structural wrapper with no border, shadow, or background.
     *  Used when a Card is nested inside another card or serves as a layout container. */
    plain?: boolean;
    /** 'default' = glass bg + shadow; 'pane' = translucent bg + blur (scrollable content panes) */
    variant?: "default" | "pane";
}>();

const variantClass = (() => {
    if (props.plain) return "scrollbar-hidden rounded-xl";
    if (props.variant === "pane")
        return "scrollbar-hidden rounded-xl text-card-foreground bg-card/75 backdrop-blur-[var(--glass-blur-light)]";
    return "scrollbar-hidden glass rounded-xl text-card-foreground shadow-[var(--shadow-card)]";
})();
</script>

<template>
    <div :class="cn(variantClass, props.class)">
        <slot />
    </div>
</template>
