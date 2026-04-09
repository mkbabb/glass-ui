<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    /** When true, renders as a plain structural wrapper with no border, shadow, or background.
     *  Used when a Card is nested inside another card or serves as a layout container. */
    plain?: boolean;
    /**
     * 'default' = glass bg + grain overlay + shadow
     * 'pane'    = translucent bg + blur, no grain (for scroll panes)
     * 'cartoon' = translucent bg + heavier blur + drop shadow, no grain.
     *             Tokens (`--glass-*-cartoon`, `--shadow-cartoon`) fall back
     *             to the default glass tokens, so consumers opting into the
     *             variant without defining tokens get the default look.
     */
    variant?: "default" | "pane" | "cartoon";
}>();

const variantClass = computed(() => {
    if (props.plain) return "scrollbar-hidden rounded-xl";
    if (props.variant === "pane")
        // Pane uses glass background + blur without the ::after grain overlay,
        // which conflicts with overflow:auto scroll containers.
        return "scrollbar-hidden rounded-xl text-card-foreground bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)] border border-[var(--glass-border-subtle)] shadow-[var(--shadow-card)] transition-shadow";
    if (props.variant === "cartoon")
        // Cartoon resolves through `.glass-cartoon` in glass.css — no
        // Tailwind arbitrary-value gymnastics, no comma-in-var parsing
        // traps. Consumers override the cartoon tokens at :root to
        // reskin every cartoon surface at once.
        return "scrollbar-hidden glass-cartoon rounded-xl text-card-foreground transition-shadow";
    return "scrollbar-hidden glass-default rounded-xl text-card-foreground shadow-[var(--shadow-card)]";
});
</script>

<template>
    <div :class="cn(variantClass, props.class)">
        <slot />
    </div>
</template>
