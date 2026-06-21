<script setup lang="ts">
// BE.W-DOCK-FISSION / BE.W-METABALL-BRIDGE2 — the LIBRARY goo `<filter>` mount.
//
// THE PROMOTION (§W2 / §W7). The morph-showcase + liquid-playground mounted the goo
// `<filter>` DEMO-INLINE as a `width=0 height=0` (zero-sized) host with NO
// `color-interpolation-filters` and the default `-10%/120%` objectBoundingBox region —
// the WebKit zero-sized-filter-host no-op class, the linearRGB-threshold wrong-neck
// class, AND the region CLIPS the goo neck + the flying pieces exactly where they
// travel. This component is the ONE library mount the fission bridge consumes
// (`var(--dock-fission-goo-filter)` in fission-bridge.css), promoted to:
//   • a VISUALLY-HIDDEN NON-ZERO-SIZE host (a 1×1 off-screen SVG, the WatercolorDot /
//     AppShell in-document-SVG precedent — never a zero-sized host);
//   • `color-interpolation-filters="sRGB"` (the house idiom — useGlassRenderer.ts:188,
//     handmark/texture.ts:46, WatercolorDot.vue:149 — so WebKit thresholds the alpha in
//     sRGB; the neck reads right on Safari, NOT the linearRGB-wrong waist);
//   • a GENEROUS explicit filter region `x=-50% y=-50% width=200% height=200%` so the
//     necks + the N flying split pieces never clip at the filter edge.
//
// SAFARI-FIRST (§W7). This is the REGULAR `filter: url(#…)` graph (feGaussianBlur +
// feColorMatrix threshold + feComposite — all WebKit-supported), NOT `backdrop-filter:
// url()` (WebKit-unsupported, bug 245510). The fission bridge applies it via the regular
// `filter` property, so the goo neck PAINTS on Safari 26.
//
// MOUNT ONCE at app root (a consumer renders this once near the root, or a `<GlassDock>`
// that fissions mounts it). The filter is a global `<defs>` the bridge references by id;
// mounting it twice would dup the id — render it ONCE.
//
// DETERMINISTIC — the filter is STATIC (no animation, no clock); the plates pass through
// it. Its stdDeviation/threshold are tokenized so a consumer retunes the goo gel without
// re-authoring the graph.

withDefaults(
    defineProps<{
        /**
         * The goo blur radius (feGaussianBlur stdDeviation) — how far the piece + neck
         * alpha bleeds together before the threshold sharpens it back. Default 7 (the
         * morph-bridge register). Tokenized so a consumer retunes the gel.
         */
        blur?: number;
        /**
         * The alpha threshold steepness (feColorMatrix A-channel multiplier). Higher =
         * a crisper metaball edge. Default 20 (the morph-bridge register).
         */
        thresholdSlope?: number;
        /**
         * The alpha threshold offset (feColorMatrix A-channel offset, negative). Default
         * -9 (the morph-bridge register — the alpha-bleed cut point).
         */
        thresholdOffset?: number;
    }>(),
    {
        blur: 7,
        thresholdSlope: 20,
        thresholdOffset: -9,
    },
);
</script>

<template>
    <!-- The visually-hidden NON-ZERO host (a 1×1 off-screen SVG — NOT a zero-sized host;
         the WatercolorDot filter-host precedent). aria-hidden + focusable=false so it is
         inert to AT + the tab order. -->
    <svg
        class="dock-goo-filter-host"
        aria-hidden="true"
        focusable="false"
        width="1"
        height="1"
    >
        <defs>
            <!-- The goo: blur the piece + neck alpha so they bleed together, then
                 threshold the blurred alpha back to a sharp metaball edge. sRGB
                 interpolation (the WebKit-correct path) + a GENEROUS region so the necks +
                 flying pieces never clip. -->
            <filter
                id="dock-fission-goo"
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
   the fission bridge references by id. */
.dock-goo-filter-host {
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
