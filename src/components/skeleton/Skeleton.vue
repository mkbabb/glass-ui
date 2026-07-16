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
    border-radius: var(--radius-input);
    background: var(--muted);
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
        animation: skeleton-scan var(--duration-shimmer, 2.4s) ease-in-out infinite;
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
