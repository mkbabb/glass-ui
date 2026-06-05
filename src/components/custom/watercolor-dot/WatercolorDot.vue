<script setup lang="ts">
import { ref, computed, toRef, useId } from "vue";
import { useWatercolorBlob } from "./useWatercolorBlob";

/**
 * WatercolorDot — an organic pastel blob swatch (AU.W7 lift). A CSS/SVG primitive
 * (no WebGL): the blob shape is a deterministic per-vertex `border-radius` morph
 * (seeded by `color + seed`), and the wet, bleeding edge is an SVG turbulence +
 * displacement filter that is INTERNALISED — the component mounts its own
 * namespaced `<filter>` so there is zero consumer plumbing. Mount the dot and the
 * filter just works.
 *
 * Color arrives as a CSS string painted straight onto the swatch background — the
 * dot needs no resolver because it does not feed a shader; the injected-color seam
 * shape is "pass the CSS color in".
 */
const props = withDefaults(
    defineProps<{
        /** CSS color painted as the swatch background (any CSS color form). */
        color: string;
        /** Run the rAF-driven shape morph (default false → static, hover-morph only). */
        animate?: boolean;
        /** Host tag — `div` (decorative) or `button` (interactive). */
        tag?: "div" | "button";
        /** Base morph cycle duration in ms (default 4000). */
        cycleDuration?: number;
        /** Border-radius range [lo, hi] as percentages (default [20, 80]). */
        range?: [number, number];
        /** Extra seed string mixed into the shape PRNG for reproducible uniqueness. */
        seed?: string;
    }>(),
    {
        animate: false,
        tag: "div",
        cycleDuration: 4000,
        range: () => [20, 80],
        seed: "",
    },
);

// Per-instance namespaced filter id — internalises the SVG filter with zero global
// state and zero cross-mount coupling. Sanitised for a CSS `url(#…)` reference.
const filterId = `watercolor-filter-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const filterUrl = computed(() => `url(#${filterId})`);

const colorRef = toRef(props, "color");
const hovered = ref(false);

const blob = useWatercolorBlob(colorRef, {
    animate: props.animate,
    cycleDuration: props.cycleDuration,
    range: props.range,
    seed: props.seed,
});

function onMouseEnter() {
    hovered.value = true;
    if (props.animate) blob.nudge();
}

// When animating passively, always use the rAF-driven borderRadius. When static,
// morph to hoverBorderRadius on hover (CSS transition handles smoothing).
const activeBorderRadius = computed(() => {
    if (props.animate) return blob.borderRadius.value;
    return hovered.value ? blob.hoverBorderRadius.value : blob.borderRadius.value;
});
</script>

<template>
    <component
        :is="tag"
        :class="['watercolor-swatch', animate && 'watercolor-animated']"
        :style="{
            backgroundColor: color,
            borderRadius: activeBorderRadius,
            '--watercolor-filter': filterUrl,
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="hovered = false"
    >
        <!--
          Internalised watercolor filter — namespaced per instance, auto-mounted,
          zero-wiring. The wet edge is fractal-noise turbulence displacing the
          source graphic. Sits in a zero-size hidden <svg> so it only contributes
          the filter def, never layout.
        -->
        <svg class="watercolor-filter-host" aria-hidden="true" focusable="false">
            <defs>
                <filter
                    :id="filterId"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                    color-interpolation-filters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.04"
                        numOctaves="4"
                        seed="2"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="1.5"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
        <slot />
    </component>
</template>

<style scoped>
/* Watercolor swatch — organic pastel blobs. */
.watercolor-swatch {
    border-radius: 48% 52% 55% 45% / 52% 48% 45% 55%;
    filter: var(--watercolor-filter);
    box-shadow:
        inset 0 0 6px color-mix(in srgb, var(--background) 35%, transparent),
        inset 0 -2px 4px color-mix(in srgb, var(--foreground) 6%, transparent),
        0 2px 6px color-mix(in srgb, var(--foreground) 10%, transparent);
    transition:
        transform var(--duration-fast) var(--ease-standard),
        border-radius 0.6s var(--ease-standard),
        filter var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
    position: relative;
}

/* Animated blobs: disable the border-radius CSS transition so the rAF-driven
   updates render immediately. */
.watercolor-swatch.watercolor-animated {
    transition:
        transform var(--duration-fast) var(--ease-standard),
        filter var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.watercolor-swatch:hover {
    transform: scale(1.06);
    filter: var(--watercolor-filter) brightness(1.05);
    box-shadow:
        inset 0 0 8px color-mix(in srgb, var(--background) 40%, transparent),
        inset 0 -2px 4px color-mix(in srgb, var(--foreground) 6%, transparent),
        0 4px 12px color-mix(in srgb, var(--foreground) 15%, transparent);
}

.watercolor-swatch:active {
    transform: scale(0.97);
}

/* The internalised filter host contributes no layout — it only carries the def. */
.watercolor-filter-host {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
}

/* Remove default button border from watercolor swatches (palette dots). */
button.watercolor-swatch {
    border: none;
    padding: 0;
    outline: none;
}

button.watercolor-swatch:focus-visible {
    outline: none;
    box-shadow:
        inset 0 0 6px color-mix(in srgb, var(--background) 35%, transparent),
        inset 0 -2px 4px color-mix(in srgb, var(--foreground) 6%, transparent),
        0 2px 8px color-mix(in srgb, var(--foreground) 20%, transparent);
}
</style>
