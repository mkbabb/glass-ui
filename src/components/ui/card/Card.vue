<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from '@utils';

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
    /**
     * Drop the surface shadow without otherwise changing the variant —
     * for cards that read as inline workspace chrome rather than
     * floating panels (e.g. an editor pane that lives inside another
     * cartoon card and would otherwise stack a second drop shadow on
     * the parent's). Applies to `default` and `pane`; the `cartoon`
     * variant resolves its shadow via `.glass-cartoon` in glass.css
     * and is unaffected.
     */
    flush?: boolean;
}>();

const variantClass = computed(() => {
    if (props.plain) return "scrollbar-hidden rounded-xl";
    if (props.variant === "pane")
        // Pane uses glass background + blur without the ::after grain overlay,
        // which conflicts with overflow:auto scroll containers. The shadow
        // class is dropped when `flush` is set so the consumer doesn't need
        // an `!important` override to remove it.
        return [
            "scrollbar-hidden rounded-xl text-card-foreground",
            "bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)]",
            "border border-[var(--glass-border-subtle)]",
            props.flush ? "" : "shadow-[var(--shadow-card)]",
            "transition-shadow",
        ].join(" ");
    if (props.variant === "cartoon")
        // Cartoon resolves through `.glass-cartoon` in glass.css — no
        // Tailwind arbitrary-value gymnastics, no comma-in-var parsing
        // traps. Consumers override the cartoon tokens at :root to
        // reskin every cartoon surface at once.
        return "scrollbar-hidden glass-cartoon rounded-xl text-card-foreground transition-shadow";
    return [
        "scrollbar-hidden glass-default rounded-xl text-card-foreground",
        props.flush ? "" : "shadow-[var(--shadow-card)]",
    ].join(" ");
});
</script>

<template>
    <div :class="cn(variantClass, props.class)">
        <slot />
    </div>
</template>
