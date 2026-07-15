<script setup lang="ts">
import { computed } from "vue";
// BD.W-MORPH-FIELD-WELD — GooFilter: the ONE library metaball `<filter>` mount.
//
// THE UNIFICATION (4a — the DRY win). `GlassGooFilter.vue` (#glass-goo) +
// `DockGooFilter.vue` (#dock-fission-goo) + the showcase's inline #dock-morph-goo were
// byte-near-identical SVG metaball graphs at four scales, mounted at four sites (and
// #dock-fission-goo double-mounted live on liquid-playground). This SFC is the ONE
// parameterized graph, mounted ONCE at shell root, exposing EVERY id from a single
// <defs>. The graph is BYTE-IDENTICAL to the prior mounts (blur → feColorMatrix alpha
// threshold → feComposite atop). A Safari regression can now happen in only ONE place; a
// fix lands once. GlassGooFilter / DockGooFilter re-export the ids off this mount (no
// alias, no legacy). The dot-pip PLATE `#pager-goo` RETIRED at BI.W-PAGER-RETIRES (the
// pager's liquid dot-morph worm paints the worm-scale `#pager-worm-goo`, not a plate goo;
// the plate id had no surviving consumer — the G8 live-plate fence).
//
// SAFARI-FIRST (§L7, the binding cross-engine contract — every fact from the prior
// mounts, now in ONE place):
//   • REGULAR `filter: url(#…)` graph (feGaussianBlur + feColorMatrix + feComposite —
//     all WebKit-supported), NOT `backdrop-filter: url()` (WebKit-rejects, bug 245510);
//   • `color-interpolation-filters="sRGB"` (WebKit forces sRGB regardless — bug 136418;
//     Chrome MATCHES it so the waist thresholds IDENTICALLY on both engines);
//   • STATIC `stdDeviation`/`feColorMatrix` LITERALS per id (no `var()` per-frame re-blur
//     — bug 283156; the ONLY per-frame write is the transform/opacity on the masses);
//   • a GENEROUS region `x=-50% y=-50% width=200% height=200%` so the neck + travelling
//     masses never clip at the filter edge;
//   • a visually-hidden NON-ZERO (1×1) host (the WebKit zero-sized-filter no-op avoided).
//
// THE ID REGISTER — the per-scale tuned instances (blur/slope/offset), DATA. The carousel
// plate, the dock fission, the dot pip, the V↔H teardrop each reach their own tuned
// `<filter id>` off the SAME graph. A consumer needing a bespoke instance passes `extra`.
//
// MOUNT ONCE at the app/shell root (AppShell mounts it; a standalone consumer mounts it
// near its own root). The filter is a global <defs> referenced by id — mounting twice
// dups every id, so render it ONCE.

interface GooSpec {
    /** The filter id consumers reference (`url(#<id>)`). */
    id: string;
    /** feGaussianBlur stdDeviation — the alpha-bleed radius (per-scale). */
    blur: number;
    /** feColorMatrix A-channel slope — the threshold steepness (the gooey shoulder). */
    slope: number;
    /** feColorMatrix A-channel offset (negative) — the alpha cut point. */
    offset: number;
}

// The LIBRARY id register (DATA). Byte-identical graph per id; only the three numeric
// knobs differ by scale. These are the exact tunings the prior mounts shipped:
//   glass-goo       — the carousel/deck PLATE scale (GlassGooFilter defaults)
//   dock-fission-goo— the dock fission scale (DockGooFilter defaults)
//   pager-worm-goo  — the dot-WORM scale (the PagerDots liquid dot-morph worm, BI.W-PAGER-WORM):
//     σ4 / slope 18 / offset −6 → threshold 6/18 = 0.333; a lone body's blurred peak
//     (σ4 over a 13px pip) is ~0.72 > 0.333, so it survives the threshold + the two
//     bodies fuse across the neck at a true smooth throat (the σ8 whole-layer graph
//     over-blurred a small pip below its own threshold — the empty-pill annihilation).
//   dock-morph-goo  — the V↔H teardrop scale (the morph-showcase inline mount, promoted)
//   morph-goo       — the generic useMorphField default
// (The dot-pip PLATE `#pager-goo` (σ8/18/−7) RETIRED at BI.W-PAGER-RETIRES — no surviving
//  consumer once the pager's worm paints `#pager-worm-goo`; the G8 live-plate fence.)
const LIBRARY_IDS: readonly GooSpec[] = [
    { id: "glass-goo", blur: 10, slope: 15, offset: -7 },
    { id: "dock-fission-goo", blur: 7, slope: 20, offset: -9 },
    { id: "pager-worm-goo", blur: 4, slope: 18, offset: -6 },
    { id: "dock-morph-goo", blur: 16, slope: 14, offset: -7 },
    { id: "morph-goo", blur: 10, slope: 18, offset: -7 },
];

const props = withDefaults(
    defineProps<{
        /**
         * Extra bespoke `<filter>` instances beyond the library register (a consumer
         * tuning a one-off scale). Each is the SAME graph at its own knobs.
         */
        extra?: GooSpec[];
    }>(),
    { extra: () => [] },
);

const filters = computed(() => [...LIBRARY_IDS, ...props.extra]);
</script>

<template>
    <!-- The visually-hidden NON-ZERO host (a 1×1 off-screen SVG — NOT a zero-sized host;
         the WebKit zero-sized-filter no-op avoided). aria-hidden + focusable=false so it
         is inert to AT + the tab order. ONE host, every library <filter> id. -->
    <svg
        class="goo-filter-host"
        aria-hidden="true"
        focusable="false"
        width="1"
        height="1"
    >
        <defs>
            <!-- The goo: blur the masses + neck alpha so they bleed together, then
                 threshold the blurred alpha back to a sharp metaball edge, composited atop
                 the source. sRGB interpolation (WebKit-correct) + a GENEROUS region so the
                 neck + travelling masses never clip. STATIC literals per id. -->
            <filter
                v-for="f in filters"
                :key="f.id"
                :id="f.id"
                color-interpolation-filters="sRGB"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
            >
                <feGaussianBlur
                    in="SourceGraphic"
                    :stdDeviation="f.blur"
                    result="blur"
                />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    :values="`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${f.slope} ${f.offset}`"
                    result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
/* The visually-hidden host — off-screen, non-interactive, NON-ZERO-size (a zero-sized
   filter host is a WebKit no-op). It paints nothing; it carries the <defs> the library's
   metaball consumers reference by id. */
.goo-filter-host {
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
