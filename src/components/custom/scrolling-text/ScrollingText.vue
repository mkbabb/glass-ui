<template>
    <span
        ref="containerRef"
        :data-overflows="overflows || null"
        :class="cn('scrolling-text', props.class)"
    >
        <span ref="contentRef" class="scrolling-text__content">
            <slot>{{ text }}</slot>
        </span>
    </span>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, watchEffect, type HTMLAttributes } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver";
import { cn } from "../../../utils/cn";

/**
 * ScrollingText — overflow-detection-driven horizontal marquee for inline text.
 *
 * Measures whether `<contentRef>.scrollWidth` exceeds the host's `clientWidth`
 * and toggles `data-overflows` on the host. When overflowing, the content
 * pans on a CSS-keyframe animation whose distance + duration are written
 * into custom properties (`--scroll-distance`, `--scroll-duration`) so the
 * pace stays around 80 CSS-px / second regardless of overflow amount.
 *
 * Hover pauses the animation. `prefers-reduced-motion: reduce` swaps the
 * marquee for a thin native horizontal scrollbar so the reader can still
 * reach the trailing characters.
 *
 * The component renders an inline-flex span — ideal for IPv6 addresses,
 * long org names, entity IDs, and other monospaced inline strings that
 * occasionally overflow narrow popovers / sidebars / cards.
 */
defineOptions({ name: "ScrollingText" });

const props = defineProps<{
    /** Optional text content. Use the default slot for richer markup. */
    text?: string;
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}>();

const containerRef = useTemplateRef<HTMLElement>("containerRef");
const contentRef = useTemplateRef<HTMLElement>("contentRef");
const overflows = ref(false);
const overflowPx = ref(0);

function measure() {
    const c = containerRef.value;
    const inner = contentRef.value;
    if (!c || !inner) return;
    const delta = inner.scrollWidth - c.clientWidth;
    overflows.value = delta > 1;
    overflowPx.value = Math.max(0, delta);
    c.style.setProperty("--scroll-distance", `${overflowPx.value}px`);
    // Duration scales with distance so long IPs don't whip past faster
    // than the eye can follow. ~80 CSS-px / second is comfortable read-speed.
    c.style.setProperty(
        "--scroll-duration",
        `${Math.max(4, overflowPx.value / 80 + 4)}s`,
    );
}

useResizeObserver(containerRef, measure);
useResizeObserver(contentRef, measure);
watchEffect(() => measure());
</script>

<style scoped>
.scrolling-text {
    display: inline-flex;
    overflow: hidden;
    max-width: 100%;
    vertical-align: bottom;
}

.scrolling-text[data-overflows] {
    /* Fade-out edges so the clip is graceful, not a hard cutoff. */
    -webkit-mask-image: linear-gradient(
        to right,
        transparent 0,
        #000 0.75rem,
        #000 calc(100% - 0.75rem),
        transparent 100%
    );
    mask-image: linear-gradient(
        to right,
        transparent 0,
        #000 0.75rem,
        #000 calc(100% - 0.75rem),
        transparent 100%
    );
}

.scrolling-text__content {
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
}

.scrolling-text[data-overflows] .scrolling-text__content {
    animation: scrolling-text-pan var(--scroll-duration, 8s)
        cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

@keyframes scrolling-text-pan {
    /* Pause at the start so the leading characters are readable, then
     * pan to expose the trailing characters, pause, then return. */
    0%,
    15% {
        transform: translateX(0);
    }
    50%,
    65% {
        transform: translateX(calc(-1 * var(--scroll-distance, 0px)));
    }
    100% {
        transform: translateX(0);
    }
}

/* Hover pauses the animation so a reader can latch on a particular
 * character. */
.scrolling-text[data-overflows]:hover .scrolling-text__content {
    animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
    /* PRM: drop the animation; let the user scroll horizontally if they
     * want to read the rest. */
    .scrolling-text[data-overflows] {
        overflow-x: auto;
        scrollbar-width: thin;
    }
    .scrolling-text[data-overflows] .scrolling-text__content {
        animation: none;
    }
}
</style>
