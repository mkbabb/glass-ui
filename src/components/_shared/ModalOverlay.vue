<script setup lang="ts">
import { computed, type CSSProperties, type HTMLAttributes } from "vue";
import { DialogOverlay } from "reka-ui";
import { cn } from "./class-names";

/** Canonical Dialog scrim with one enter/exit recipe and a real intensity axis. */

interface ModalOverlayProps {
    class?: HTMLAttributes["class"];
    /**
     * Scrim intensity. `glass` reads `--overlay-scrim`; `clear` reads
     * `--overlay-scrim-subtle`; `dim` reads `--overlay-scrim-strong`.
     */
    scrim?: "glass" | "clear" | "dim";
    /**
     * Optional CSS `animation` shorthand applied to the portaled overlay
     * via the `--scrim-animation` typed cascade variable. Pairs with the
     * `[data-scrim-animation] { animation: var(--scrim-animation, none) }`
     * rule in `animations.css` so consumers can drive a long-running
     * scrim-breath without owning the portal traversal. Composes with the
     * `.sheet-animate` data-state enter/exit (the fade rides
     * `tw-animate-css` keyframes on `data-[state]`; the scrim-breath
     * rides the typed variable on `data-scrim-animation` — distinct
     * selectors, no cascade fight).
     *
     * Example: `scrimAnimation="scrim-breath 6s ease-in-out infinite"`
     * — pairs with a `@keyframes scrim-breath` declared at the consumer
     * (or in `animations.css` if the rhythm is canonical).
     *
     * AJ-W4-δ.
     */
    scrimAnimation?: string;
}

const props = withDefaults(defineProps<ModalOverlayProps>(), {
    scrim: "glass",
});

const scrimClass = {
    glass: "bg-overlay-scrim",
    clear: "bg-overlay-scrim-subtle",
    dim: "bg-overlay-scrim-strong",
} as const;

/**
 * AJ-W4-δ — inject the typed `--scrim-animation` cascade variable so the
 * canonical animations.css rule can consume it. We bypass the broken
 * portal cascade by writing the variable directly to the overlay's inline
 * style; the `data-scrim-animation` attribute keys the consuming rule so
 * the variable does nothing unless the consumer opts in (no surprise
 * animations on the default scrim).
 */
const scrimStyle = computed<CSSProperties | undefined>(() => {
    if (!props.scrimAnimation) return undefined;
    return { "--scrim-animation": props.scrimAnimation } as CSSProperties;
});
</script>

<template>
    <DialogOverlay
        :class="
            cn(
                'fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]',
                scrimClass[props.scrim],
                'sheet-animate',
                props.class,
            )
        "
        :style="scrimStyle"
        :data-scrim-animation="props.scrimAnimation ? '' : undefined"
    >
        <slot />
    </DialogOverlay>
</template>
