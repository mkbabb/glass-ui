<script setup lang="ts">
import { computed, toRef, useAttrs, useId, type HTMLAttributes } from "vue";
import { useWatercolorBlob } from "./useWatercolorBlob";
import { hashString } from "../../composables/glass/procedural/prng";

defineOptions({ inheritAttrs: false });

/**
 * WatercolorDot — an organic pastel blob swatch. A CSS/SVG primitive (NO drawing
 * context — no WebGL/WebGPU/Canvas2D; the deliberate suite counterexample, the mark
 * that documents WHY it is not a GPU context): the blob shape is a deterministic
 * `border-radius` silhouette (seeded by `color + seed`), and the wet, bleeding
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
         *   `ghost`  — the SAME seeded blob SILHOUETTE traced as a DASHED outline: a
         *              dashed CSS BORDER reading the SAME seeded `border-radius`
         *              silhouette the solid dot fills (`borderRadius`), carrying
         *              the SAME wet `feDisplacementMap` filter so the displacement
         *              wobbles the dashed border INTO the seeded organic outline. A
         *              CSS dashed border hugs its own `border-radius`, so the outline
         *              follows the seeded blob EXACTLY — NOT an ellipse, NOT a circle,
         *              NOT a dashed rectangle. A low-alpha `color` fill is kept behind
         *              the border. A `ghost` of a given `color + seed` traces the SAME
         *              outline the `solid` dot of that seed fills (both read the same
         *              `useWatercolorBlob` silhouette — the ONE shape source). The empty-
         *              palette-slot / placeholder affordance.
         */
        variant?: "solid" | "ghost";
        /** Run the rAF-driven compositor transform wobble (default false → static). */
        animate?: boolean;
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
        cycleDuration: 4000,
        range: () => [20, 80],
        seed: "",
    },
);

// A WatercolorDot is paint, never the seat. Suppress every semantic/action
// fallthrough attribute and forward only the two visual composition channels.
const attrs = useAttrs();
const visualClass = computed(() => attrs.class as HTMLAttributes["class"]);
const visualStyle = computed(() => attrs.style as HTMLAttributes["style"]);

// Per-instance namespaced filter id — internalises the SVG filter with zero global
// state and zero cross-mount coupling. Sanitised for a CSS `url(#…)` reference.
const filterId = `watercolor-filter-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const filterUrl = computed(() => `url(#${filterId})`);

// Per-instance wet-edge seed — derived off the SAME house PRNG hash (src/composables/glass/procedural/prng.ts
// single-source) the shape morph uses. A shared hardcoded `seed` would make
// every dot share ONE wet-edge displacement (twelve clones); deriving it off
// `hashString(color + seed)` gives each dot a unique wet edge coherent with its
// silhouette. % 256 keeps it in the feTurbulence seed's comfortable integer range.
const filterSeed = computed(() => hashString(props.color + props.seed) % 256);

const colorRef = toRef(props, "color");
const { borderRadius, transform } = useWatercolorBlob(colorRef, {
    animate: props.animate,
    cycleDuration: props.cycleDuration,
    range: props.range,
    seed: props.seed,
});
</script>

<template>
    <span
        aria-hidden="true"
        :class="[visualClass, 'watercolor-swatch', animate && 'watercolor-animated']"
        data-testid="watercolor-swatch"
        :data-variant="variant"
        :style="[
            visualStyle,
            {
                // The solid register fills with the color; the ghost register keeps a
                // low-alpha fill (the CSS half) and traces the silhouette as a dashed
                // BORDER reading the SAME seeded `border-radius` silhouette the solid
                // fills. The SILHOUETTE (`borderRadius`) is the SAME seeded blob in both
                // — a ghost of a given seed traces the solid dot's outline (the ONE shape
                // source). The animate wobble rides `--watercolor-wobble` (a compositor
                // transform, NOT a per-frame radius paint under the filter).
                backgroundColor: variant === 'ghost' ? undefined : color,
                borderRadius,
                pointerEvents: 'none',
                '--watercolor-color': color,
                '--watercolor-filter': filterUrl,
                '--watercolor-wobble': transform,
            },
        ]"
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
                  Device-px-resolved wet edge. The displacement
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
          The GHOST register — the seeded
          blob silhouette traced as a DASHED outline that FOLLOWS THE SAME SHAPE the solid
          dot fills. ONE shape source: this dashed BORDER `<span>` reads `borderRadius`
          — the SAME seeded 8-value `border-radius` superellipse the solid box takes from
          `useWatercolorBlob` — and a CSS dashed border hugs its OWN `border-radius` exactly,
          so the outline traces the seeded organic blob BY CONSTRUCTION (never an ellipse,
          never a circle, never a dashed rect — a hardcoded `<ellipse rx=46 ry=46>`
          + random noise is a noise-jittered CIRCLE geometrically disconnected from the
          silhouette). The wet `feDisplacementMap` filter wobbles the dashed border INTO the
          hand-painted organic edge (the design intent). Static → PRM-neutral.
        -->
        <span
            v-if="variant === 'ghost'"
            class="watercolor-ghost-stroke"
            aria-hidden="true"
            :style="{ borderRadius, filter: filterUrl }"
        />
    </span>
</template>

<style scoped>
/* Watercolor swatch — organic pastel blobs. */
.watercolor-swatch {
    display: inline-block;
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
    /* The ghost dashed-outline axis (ghost-only): the hand-drawn-placeholder dash
       pattern, tunable per consumer. The CSS dashed border's pitch is UA-derived, so
       these document the dash register + carry the OPTION-B path-stroke escape; the
       border WEIGHT is the load-bearing knob. */
    --watercolor-dash: 8px;
    --watercolor-gap: 5px;
    --watercolor-ghost-weight: 2px;
}

/* The GHOST register — the box keeps the SAME seeded
   `border-radius` silhouette the solid dot of that seed renders (set inline by
   useWatercolorBlob), plus a low-alpha `--watercolor-color` fill BEHIND the dashed
   stroke overlay. NO solid box border, NO dashed box border — the silhouette is
   traced by the `.watercolor-ghost-stroke` SVG <ellipse> `stroke-dasharray` overlay
   (a dashed OUTLINE following the silhouette). */
.watercolor-swatch[data-variant="ghost"] {
    background-color: color-mix(in srgb, var(--watercolor-color) 12%, transparent);
    box-shadow:
        inset 0 0 6px color-mix(in srgb, var(--background) 25%, transparent),
        0 1px 4px color-mix(in srgb, var(--foreground) 6%, transparent);
    /* X6 (value.js P5 rider) — make the ghost swatch a size-query container so the
       ring can firm to SOLID at the small sizes these dots live at. `inline-size`
       containment only (the swatch is consumer-sized + carries no in-flow content,
       so no intrinsic collapse) — the filter/isolation stacking context is
       untouched. */
    container-type: inline-size;
}

/* X6 — the ring register is SOLID at ≤48px: a dashed hairline at swatch sizes
   degrades to 3-4 sparse ticks that read as noise, not a traced silhouette (their
   sizing law — a solid ring is the floor). Above 48px the dash pattern has room to
   read as the hand-drawn placeholder, so it keeps the dashed register there. */
@container (max-width: 48px) {
    .watercolor-ghost-stroke {
        border-style: solid;
    }
}

/* The GHOST dashed outline — a span clipped to the SAME seeded
   `border-radius` silhouette the solid dot fills (the ONE shape source: it reads
   `borderRadius` inline, the SAME value the solid box takes). A dashed
   CSS border hugs its own border-radius, so the outline traces the seeded organic blob
   EXACTLY — never an ellipse, never a circle, never a dashed rectangle. The wet
   `feDisplacementMap` filter (set inline) wobbles the dashed border into the hand-painted
   organic edge. Static → PRM-neutral. */
.watercolor-ghost-stroke {
    position: absolute;
    inset: 0;
    border: var(--watercolor-ghost-weight, 2px) dashed var(--watercolor-color);
    /* border-radius is the same seeded silhouette as the solid face. */
    pointer-events: none;
}

/* Under prefers-reduced-transparency the low-alpha ghost fill firms up so the dashed
   outline still reads (mirrors the glass legibility brackets). */
@media (prefers-reduced-transparency: reduce) {
    .watercolor-swatch[data-variant="ghost"] {
        background-color: color-mix(in srgb, var(--watercolor-color) 24%, transparent);
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

/* The internalised filter host contributes no layout — it only carries the def. */
.watercolor-filter-host {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
}
</style>
