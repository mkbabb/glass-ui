<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue";
import { cn } from "../_shared/class-names";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();

const attrs = useAttrs();
const hostAttrs = computed(() =>
    Object.fromEntries(
        Object.entries(attrs).filter(
            ([name]) => name !== "role" && !name.startsWith("aria-"),
        ),
    ),
);
</script>

<template>
    <div
        v-bind="hostAttrs"
        data-slot="skeleton"
        aria-hidden="true"
        :class="cn('skeleton', props.class)"
    />
</template>

<style scoped>
.skeleton {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background: var(--muted);
}

/* The DEFAULT tile radius lives on @layer components so a caller's public shape
   utility (rounded-full for an avatar specimen, rounded-card for a card specimen —
   merged onto this element by `cn('skeleton', props.class)`) wins from the later
   utilities layer. An unlayered radius here would outrank those utilities and defeat
   the public shape seam. --radius-media is the media/tile default, not a hard owner. */
@layer components {
    .skeleton {
        border-radius: var(--radius-media);
    }
}

.skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        105deg,
        transparent 24%,
        color-mix(in oklab, var(--foreground) 10%, transparent) 48%,
        transparent 72%
    );
}

@media (prefers-reduced-motion: no-preference) {
    .skeleton::after {
        transform: translate3d(-110%, 0, 0);
        /* The looping band-pass scan rides the FAST skeleton rung
           (--duration-shimmer-fast, 3s), NOT the 5s brand-metal one-pass sweep
           clock (--duration-shimmer) — Δ-F24-1. */
        animation: skeleton-scan var(--duration-shimmer-fast) ease-in-out infinite;
        will-change: transform;
    }
}

@keyframes skeleton-scan {
    to {
        transform: translate3d(110%, 0, 0);
    }
}

@media (prefers-reduced-transparency: reduce) {
    .skeleton {
        background: var(--muted);
    }
}

@media (forced-colors: active) {
    .skeleton {
        background: CanvasText;
        opacity: 0.18;
    }

    .skeleton::after {
        display: none;
    }
}
</style>
