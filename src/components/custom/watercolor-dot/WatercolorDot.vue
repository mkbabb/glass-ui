<script setup lang="ts">
import { ref, computed, toRef, useId } from "vue";
import { useWatercolorBlob } from "./useWatercolorBlob";
import { hashString } from "./prng";

/**
 * WatercolorDot — an organic pastel blob swatch. A CSS/SVG primitive (NO drawing
 * context — no WebGL/WebGPU/Canvas2D; the deliberate suite counterexample, the mark
 * that documents WHY it is not a GPU context): the blob shape is a deterministic
 * per-vertex `border-radius` morph (seeded by `color + seed`), and the wet, bleeding
 * edge is an SVG turbulence + displacement filter that is INTERNALISED — the component
 * mounts its own namespaced `<filter>` so there is zero consumer plumbing. Mount the
 * dot and the filter just works.
 *
 * Safari-safe by construction (USER-DEFECTS §H): the SVG `<filter>` rasterizes ONCE
 * + caches (the HandMark `texture.ts` idiom) and NEVER re-rasterizes per frame; the
 * `animate` liveness rides a seeded COMPOSITOR `transform` wobble the compositor
 * accelerates without touching the filter graph (a per-frame `border-radius` paint
 * under the filter is the §H Safari flash, retired here). The filter `seed` is
 * per-instance off `hashString(color + seed)` so each dot's wet edge is uniquely
 * displaced (no twelve-clones).
 *
 * Color arrives as a CSS string painted straight onto the swatch background — the
 * dot needs no resolver because it does not feed a shader; the injected-color seam
 * shape is "pass the CSS color in". Warm-cream identity by default (the dot bakes no
 * hue; the demo palette is presets-in-consumers).
 */
const props = withDefaults(
    defineProps<{
        /** CSS color painted as the swatch background (any CSS color form). */
        color: string;
        /**
         * Render mode:
         *   `solid` (default) — the filled organic blob (the swatch background IS the
         *                       color; the existing register, unchanged).
         *   `ghost`  — the SAME seeded blob SILHOUETTE traced as a DASHED outline: an
         *              SVG <ellipse> `stroke-dasharray` carrying the SAME wet
         *              `feDisplacementMap` filter, so the displacement wobbles the
         *              dashed ellipse INTO the seeded organic outline (a dashed
         *              OUTLINE following the silhouette — NOT a solid ring, NOT a CSS
         *              dashed rectangle). A low-alpha `color` fill is kept behind the
         *              stroke. A `ghost` of a given `color + seed` carries the SAME
         *              seeded `border-radius` silhouette the `solid` dot of that seed
         *              renders (both read the same `useWatercolorBlob` morph). The
         *              empty-palette-slot / placeholder affordance.
         */
        variant?: "solid" | "ghost";
        /** Run the rAF-driven compositor transform wobble (default false → static). */
        animate?: boolean;
        /** Host tag — `div` (decorative) or `button` (interactive). */
        tag?: "div" | "button";
        /** Base morph cycle duration in ms (default 4000). */
        cycleDuration?: number;
        /** Border-radius range [lo, hi] as percentages (default [20, 80]). */
        range?: [number, number];
        /** Extra seed string mixed into the shape + wet-edge PRNG for uniqueness. */
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

// Per-instance wet-edge seed — derived off the SAME house PRNG hash (src/utils/prng.ts
// single-source, AV.W14) the shape morph uses. The prior hardcoded `seed="2"` made
// every dot share ONE wet-edge displacement (twelve clones); deriving it off
// `hashString(color + seed)` gives each dot a unique wet edge coherent with its
// silhouette. % 256 keeps it in the feTurbulence seed's comfortable integer range.
const filterSeed = computed(() => hashString(props.color + props.seed) % 256);

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

// The seeded `border-radius` silhouette is STATIC under animate (the box never repaints
// its radius per frame — the §H fix). On hover (static mode) it morphs to the hover
// shape; the CSS transition smooths it. Both modes keep the seeded silhouette identity.
const activeBorderRadius = computed(() => {
    if (props.animate) return blob.borderRadius.value;
    return hovered.value ? blob.hoverBorderRadius.value : blob.borderRadius.value;
});

// The animate-mode liveness is a seeded COMPOSITOR transform wobble (identity when
// static) — the compositor accelerates it without re-rastering the cached filter.
const activeTransform = computed(() =>
    props.animate ? blob.transform.value : "none",
);
</script>

<template>
    <component
        :is="tag"
        :class="['watercolor-swatch', animate && 'watercolor-animated']"
        data-testid="watercolor-swatch"
        :data-variant="variant"
        :style="{
            // The solid register fills with the color; the ghost register keeps a
            // low-alpha fill (the CSS half) and traces the silhouette as a dashed SVG
            // stroke. The SILHOUETTE (`borderRadius`) is the SAME seeded blob in both
            // — a ghost of a given seed carries the solid dot's outline. The animate
            // wobble rides `--watercolor-wobble` (a compositor transform, NOT a
            // per-frame radius paint under the filter).
            backgroundColor: variant === 'ghost' ? undefined : color,
            borderRadius: activeBorderRadius,
            '--watercolor-color': color,
            '--watercolor-filter': filterUrl,
            '--watercolor-wobble': activeTransform,
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="hovered = false"
    >
        <!--
          Internalised watercolor filter — namespaced per instance, auto-mounted,
          zero-wiring. The wet edge is fractal-noise turbulence displacing the
          source graphic. STATIC + cached: it rasterizes once per (mount, resize,
          scheme-flip) and NEVER re-rasterizes per frame (the §H Safari fix — the
          liveness is the compositor transform wobble, never a per-frame paint under
          this filter). Sits in a zero-size hidden <svg> so it only contributes the
          filter def, never layout.
        -->
        <svg class="watercolor-filter-host" aria-hidden="true" focusable="false">
            <defs>
                <!--
                  Device-px-resolved wet edge (AZ.W-BLOB-PAGE D1). The displacement
                  keeps the hand-painted wet bleed crisp:
                  • linearRGB filter math → smoother edge antialiasing on Chrome/FF.
                    CAVEAT (WebKit): Safari renders SVG filters in sRGB regardless of
                    `color-interpolation-filters` (a known WebKit limitation), so the
                    smooth-AA edge is a Chrome/FF nicety only — never trust it on
                    Safari. The finer-noise + small scale=1.3 keep the sRGB edge
                    acceptable for a soft decorative mark.
                  • 5 octaves at a slightly higher base frequency → FINER noise, so
                    the displacement perturbs in small smooth steps. Octave 6 is
                    practically imperceptible (Codrops) + pure Safari raster cost.
                  • stitchTiles="stitch" → seamless tiled noise (no per-tile
                    discontinuity flecks at the filter-region boundary).
                  • scale 1.3 keeps the wet amplitude; the finer noise spreads it
                    smoothly.
                  • seed is PER-INSTANCE (off hashString(color+seed)) so each dot's
                    wet edge is uniquely displaced (no twelve-clones).
                  The widened −15%/130% region holds the wet bleed clear of the
                  filter edge (the cross-Safari tiling-seam mitigation, the pre-26.4
                  feDisplacementMap reference-filter tiling-gap bug). Border-radius
                  seeded-prng identity is untouched.
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
                        numOctaves="5"
                        :seed="filterSeed"
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
        <!--
          The GHOST register (BC.W-VIZ-WATERCOLOR) — the seeded blob silhouette traced
          as a DASHED outline: an SVG <ellipse> `stroke-dasharray` carrying the SAME
          wet `feDisplacementMap` filter, so the displacement wobbles the dashed ellipse
          INTO the seeded organic outline. The dashes are arc-length-uniform along the
          stroked path (no dashed-rounded-rect bunching) — a dashed OUTLINE following
          the silhouette, NOT a solid ring and NOT a dashed rectangle. The dash pattern
          is the `--watercolor-dash` / `--watercolor-gap` ghost-only axis (default 8px
          dash / 5px gap, the hand-drawn-placeholder register). Static (no animation) →
          PRM-neutral; the dashed outline reads either way.
        -->
        <svg
            v-if="variant === 'ghost'"
            class="watercolor-ghost-overlay"
            aria-hidden="true"
            focusable="false"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
        >
            <ellipse
                class="watercolor-ghost-stroke"
                cx="50"
                cy="50"
                rx="46"
                ry="46"
                fill="none"
                :stroke="`var(--watercolor-color)`"
                stroke-width="2"
                vector-effect="non-scaling-stroke"
                :style="{ filter: filterUrl }"
            />
        </svg>
        <slot />
    </component>
</template>

<style scoped>
/* Watercolor swatch — organic pastel blobs. */
.watercolor-swatch {
    border-radius: 48% 52% 55% 45% / 52% 48% 45% 55%;
    filter: var(--watercolor-filter);
    /* The animate-mode liveness — a seeded COMPOSITOR transform wobble (identity when
       static). It is GPU-accelerated and never re-rasters the cached filter graph;
       the per-frame `border-radius` paint under the filter (the §H Safari flash) is
       retired in favour of this. */
    transform: var(--watercolor-wobble, none);
    /* Walls the residual Safari `border-radius`+transform flicker into the swatch's
       own stacking context (Apple Dev Forums 705172). Safe here — no `multiply`
       blend to wall (unlike HandMark's highlighter). */
    isolation: isolate;
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
    /* The ghost dashed-outline axis (NEW, ghost-only): the hand-drawn-placeholder dash
       pattern, tunable per consumer. */
    --watercolor-dash: 8px;
    --watercolor-gap: 5px;
}

/* The GHOST register (BC.W-VIZ-WATERCOLOR) — the box keeps the SAME seeded
   `border-radius` silhouette the solid dot of that seed renders (set inline by
   useWatercolorBlob), plus a low-alpha `--watercolor-color` fill BEHIND the dashed
   stroke overlay. NO solid box border, NO dashed box border — the silhouette is
   traced by the `.watercolor-ghost-stroke` SVG <ellipse> `stroke-dasharray` overlay
   (a dashed OUTLINE following the silhouette). */
.watercolor-swatch[data-variant="ghost"] {
    background-color: color-mix(
        in srgb,
        var(--watercolor-color) 12%,
        transparent
    );
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
}

/* The dashed silhouette overlay — fills the swatch box, traces the silhouette as an
   arc-length-uniform dashed stroke, displaced by the SAME wet filter so the dashed
   ellipse wobbles into the organic outline. preserveAspectRatio="none" stretches the
   100×100 viewBox to the box so the ellipse fills it; non-scaling-stroke keeps the
   2px dash crisp at any size. */
.watercolor-ghost-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}

.watercolor-ghost-stroke {
    /* Arc-length-uniform dashes along the stroked path (the dashed-rounded-rect
       bunching `border-style: dashed` on a `border-radius` box would produce is
       avoided by stroking a path, not a box). */
    stroke-dasharray: var(--watercolor-dash) var(--watercolor-gap);
}

/* Under prefers-reduced-transparency the low-alpha ghost fill firms up so the dashed
   outline still reads (mirrors the glass legibility brackets). */
@media (prefers-reduced-transparency: reduce) {
    .watercolor-swatch[data-variant="ghost"] {
        background-color: color-mix(
            in srgb,
            var(--watercolor-color) 24%,
            transparent
        );
    }
}

/* Animated blobs: the seeded silhouette is STATIC; the liveness is the compositor
   `--watercolor-wobble` transform. Disable the border-radius CSS transition (the
   radius does not change per frame) — the transform legs stay on the smooth clock. */
.watercolor-swatch.watercolor-animated {
    transition:
        transform var(--duration-fast) var(--ease-standard),
        filter var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

/* Under reduced motion the wobble drops to a single static frame; the filter is
   static either way. */
@media (prefers-reduced-motion: reduce) {
    .watercolor-swatch.watercolor-animated {
        transform: none;
    }
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
