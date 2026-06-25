<script setup lang="ts">
// BD.W-GOO-CAROUSEL-DECK — the LIBRARY goo `<filter>` mount for the carousel/deck
// slide-PLATE metaball morph (the plate-scale twin of the dot-scale `#pager-goo` and the
// dock-scale `#dock-fission-goo`). The slide bridge references `filter: url(#glass-goo)`.
//
// SAFARI-FIRST (the binding bar — the user: "Does NOT work at all on SAFARI"). This is
// the REGULAR `filter: url(#…)` graph (feGaussianBlur + feColorMatrix threshold +
// feComposite — all WebKit-supported), NOT `backdrop-filter: url()` (WebKit-unsupported,
// bug 245510). It carries every WebKit-correctness fact the DockGooFilter mount proved:
//   • `color-interpolation-filters="sRGB"` (WebKit linearRGB-lighten bug 136418 — the
//     neck reads right on Safari, NOT the linearRGB-wrong waist);
//   • an explicit GENEROUS region `x=-50% y=-50% width=200% height=200%` so the metaball
//     NECK + the travelling plate never clip at the filter edge;
//   • a visually-hidden NON-ZERO (1×1) host (the WebKit zero-sized-filter no-op avoided);
//   • STATIC `stdDeviation`/`feColorMatrix` LITERALS — the ONLY per-frame write is the
//     `transform`/`opacity` on the plates passing through it (the `var()`-driven
//     `feGaussianBlur stdDeviation` / per-frame re-blur "slow"/broken WebKit class — bug
//     283156 — is structurally absent: the consumer animates transforms, never the filter).
//
// MOUNT ONCE per route (a `<Carousel>`/deck stage mounts it near its root; the filter is
// a global `<defs>` referenced by id — mounting twice dups the id). The
// stdDeviation/threshold are tokenized (BARBELL plate-scale defaults: blur 10 / slope 15 /
// offset −7 — the gooey-shoulder band re-solved against the rendered concave throat) so a
// consumer retunes the gel without re-authoring the graph.

withDefaults(
    defineProps<{
        /**
         * The goo blur radius (feGaussianBlur stdDeviation) — how far the bodies + neck
         * alpha bleed together before the threshold sharpens it back. Default 10 (the
         * BARBELL plate-scale register: a wider alpha skirt so the two bodies feel each
         * other from further → the concave neck wells earlier + gooier). BOUNDED so it does
         * NOT fill the thin throat (a 10px blur over the ~scaled neck reads a waist, not a
         * filled tray — measured against the rendered throat, not asserted). The dot-scale
         * `#pager-goo` runs 8, distinct. Tokenized (carousel ~10-13, deck ~8-10, pager ~8). */
        blur?: number;
        /**
         * The alpha threshold steepness (feColorMatrix A-channel multiplier). Default 15 —
         * the SVG-metaball SWEET SPOT: a gooey soft SHOULDER (surface tension), NOT the
         * slope-24 mercury-hard razor that sharpened the bleed before it could become a
         * neck. A wider transition band → the fused region holds a gooey shoulder. */
        thresholdSlope?: number;
        /**
         * The alpha threshold offset (feColorMatrix A-channel offset, negative). Default
         * -7 — re-solved FOR slope 15 against the rendered rest edge: crisp at REST while
         * the fused throat region holds the gooey shoulder. (slope·a + offset = 0 at the
         * cut alpha a≈0.47 → −7.) */
        thresholdOffset?: number;
        /**
         * The filter id. Default `"glass-goo"` (the library plate-scale id). A consumer
         * mounting a second tuned instance passes a distinct id + references it.
         */
        filterId?: string;
    }>(),
    {
        blur: 10,
        thresholdSlope: 15,
        thresholdOffset: -7,
        filterId: "glass-goo",
    },
);
</script>

<template>
    <!-- The visually-hidden NON-ZERO host (a 1×1 off-screen SVG — NOT a zero-sized host;
         the WatercolorDot / DockGooFilter precedent). aria-hidden + focusable=false so it
         is inert to AT + the tab order. -->
    <svg
        class="glass-goo-filter-host"
        aria-hidden="true"
        focusable="false"
        width="1"
        height="1"
    >
        <defs>
            <!-- The goo: blur the plate + neck alpha so they bleed together, then
                 threshold the blurred alpha back to a sharp metaball edge. sRGB
                 interpolation (the WebKit-correct path) + a GENEROUS region so the neck +
                 travelling plate never clip. STATIC literals. -->
            <filter
                :id="filterId"
                color-interpolation-filters="sRGB"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
            >
                <feGaussianBlur
                    in="SourceGraphic"
                    :stdDeviation="blur"
                    result="blur"
                />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    :values="`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${thresholdSlope} ${thresholdOffset}`"
                    result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
/* The visually-hidden host — off-screen, non-interactive, non-zero-size (a zero-sized
   filter host is a WebKit no-op). It paints nothing; it only carries the <defs> filter
   the slide bridge references by id. */
.glass-goo-filter-host {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    /* Off-screen but NON-ZERO so WebKit instantiates the filter graph. */
    inset-inline-start: -9999px;
    inset-block-start: -9999px;
    pointer-events: none;
}
</style>
