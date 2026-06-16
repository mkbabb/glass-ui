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
        /**
         * Render mode (BA.W-EMISSION / BA-VJS-C2):
         *   `solid` (default) — the filled organic blob (the swatch background IS the
         *                       color; the existing register, unchanged).
         *   `ghost`  — the SAME seeded blob SILHOUETTE rendered as a STROKE: a
         *              `color` border over a low-alpha `color` fill, the irregular-blob
         *              outline (NOT a CSS dashed rectangle). A `ghost` of a given
         *              `color + seed` matches the SAME silhouette the `solid` dot of
         *              that seed renders — both read the same `useWatercolorBlob`
         *              border-radius morph; the stroke is the only delta. The
         *              empty-palette-slot / placeholder affordance.
         */
        variant?: "solid" | "ghost";
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
        variant: "solid",
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
        data-testid="watercolor-swatch"
        :data-variant="variant"
        :style="{
            // The solid register fills with the color; the ghost register reads the
            // color off `--watercolor-color` (the CSS half paints a low-alpha fill +
            // a color stroke). The SILHOUETTE (`borderRadius`) is the SAME seeded
            // blob in both — a ghost of a given seed matches the solid dot's outline.
            backgroundColor: variant === 'ghost' ? undefined : color,
            borderRadius: activeBorderRadius,
            '--watercolor-color': color,
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
                <!--
                  Device-px-resolved wet edge (AZ.W-BLOB-PAGE D1). The prior
                  sRGB / 4-octave / scale-1.5 / non-stitched turbulence flung
                  isolated dark specks into the light margin at high DPR (a coarse
                  low-res-reading contour on the large swatch). The fix keeps the
                  hand-painted wet displacement but renders it crisp:
                  • linearRGB filter math → smoother edge antialiasing (no banded
                    sRGB quantization on the displaced contour),
                  • 6 octaves at a slightly higher base frequency → FINER noise, so
                    the displacement perturbs in small smooth steps rather than a
                    few large flung chunks,
                  • stitchTiles="stitch" → seamless tiled noise (no per-tile
                    discontinuity flecks at the filter-region boundary),
                  • scale 1.3 keeps the wet amplitude (was 1.5) but the finer noise
                    spreads it smoothly.
                  The widened −15%/130% region holds the wet bleed clear of the
                  filter edge. Border-radius seeded-prng identity is untouched.
                -->
                <filter
                    :id="filterId"
                    x="-15%"
                    y="-15%"
                    width="130%"
                    height="130%"
                    color-interpolation-filters="linearRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05"
                        numOctaves="6"
                        seed="2"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="1.3"
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

/* The GHOST register (BA.W-EMISSION / BA-VJS-C2) — the SAME seeded blob silhouette
   (the inline `border-radius` morph from useWatercolorBlob) rendered as a STROKE:
   a `--watercolor-color` border over a low-alpha `--watercolor-color` fill. This is
   NOT a CSS dashed rectangle — the irregular-blob OUTLINE is the seeded silhouette,
   so a ghost of a given `color + seed` matches the solid dot's outline exactly. The
   empty-palette-slot / placeholder affordance. The inset highlight reads off the
   color too so the wet edge filter still reads the stroke. */
.watercolor-swatch[data-variant="ghost"] {
    background-color: color-mix(
        in srgb,
        var(--watercolor-color) 12%,
        transparent
    );
    border: 2px solid
        color-mix(in srgb, var(--watercolor-color) 70%, transparent);
    box-shadow:
        inset 0 0 6px color-mix(in srgb, var(--background) 25%, transparent),
        0 1px 4px color-mix(in srgb, var(--foreground) 6%, transparent);
}

.watercolor-swatch[data-variant="ghost"]:hover {
    background-color: color-mix(
        in srgb,
        var(--watercolor-color) 18%,
        transparent
    );
    border-color: color-mix(in srgb, var(--watercolor-color) 88%, transparent);
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
