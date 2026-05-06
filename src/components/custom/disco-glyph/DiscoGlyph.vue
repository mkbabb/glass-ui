<script setup lang="ts">
import { computed, inject, useId, watch } from "vue";
import { GlyphFaceSilhouetteKey } from "../glyph-face/keys";

/**
 * <DiscoGlyph> — faceted SVG glyph primitive.
 *
 * Three layers paint over a single `silhouette` path:
 *   1. base — the silhouette filled `currentColor` so consumers retain the
 *      lucide cascade (Vignelli-clean colour register at idle).
 *   2. facet — an 8-stop linear gradient that simulates ~6 facets cutting
 *      across the glyph face. `phaseColor` (default `currentColor`) drives
 *      the hue; in active states a phase var (`--phase-color` or similar)
 *      reads through. Q.W3.A.3: gradient axis adapts to silhouette via
 *      `facetAxis` so each consumer picks the axis that cuts *across* its
 *      dominant stroke direction (CheckDisco's V-shape calls for vertical;
 *      ArrowRightDisco's horizontal shaft also vertical; PlayDisco's
 *      triangle works on the diagonal).
 *   3. cap — a 165° specular catch-light gradient. White at the upper-left,
 *      transparent past 40%; the polished-metal hot-spot a real disco
 *      glyph would carry under club lighting.
 *
 * Q.W3.A.1 silhouette hand-off: when wrapped in a `<GlyphFace>`, this
 * primitive publishes its `silhouette` prop upward via the
 * `GlyphFaceSilhouetteKey` injection slot, so the GlyphFace cap clips
 * to the disco silhouette without the wrapping consumer (PrimaryAction)
 * needing to mirror the path on every glyph swap. The provide/inject
 * path is reactive — GlyphFace re-reads when the descendant's
 * `silhouette` prop changes (e.g. PrimaryAction's `glyphFor(state)`
 * branches across Play / Check / ArrowRight / RotateCcw).
 *
 * `useId()` scopes the gradient ids so multiple glyphs on one page do not
 * collide post-SSR/hydration. The id format mirrors the existing speedtest
 * conventions (`disco-facet-<id>` / `disco-cap-<id>`).
 */

const props = withDefaults(
    defineProps<{
        /** SVG path d-attribute describing the glyph silhouette. */
        silhouette: string;
        /** SVG viewBox. Defaults `0 0 24 24`. */
        viewBox?: string;
        /** Phase-tinted state — wired through CSS class consumers may hook. */
        active?: boolean;
        /** Stop-color for the facet gradient. Defaults `currentColor`. */
        phaseColor?: string;
        /**
         * Axis along which the facet gradient runs. The 8 stops cut
         * perpendicular to this axis, so a diagonal axis gives diagonal
         * facets, vertical gives horizontal facets across the glyph,
         * etc. Q.W3.A.3 default stays diagonal; consumers picking an
         * axis that cuts across the silhouette's dominant stroke
         * sharpen the facet read at small render sizes.
         */
        facetAxis?: "diagonal" | "horizontal" | "vertical";
    }>(),
    {
        viewBox: "0 0 24 24",
        active: false,
        phaseColor: "currentColor",
        facetAxis: "diagonal",
    },
);

const uid = useId();
const facetId = computed(() => `disco-facet-${uid}`);
const capId = computed(() => `disco-cap-${uid}`);

const facetAxisCoords = computed(() => {
    switch (props.facetAxis) {
        case "horizontal":
            return { x1: "0", y1: "0.5", x2: "1", y2: "0.5" };
        case "vertical":
            return { x1: "0.5", y1: "0", x2: "0.5", y2: "1" };
        case "diagonal":
        default:
            return { x1: "0", y1: "0", x2: "1", y2: "1" };
    }
});

/** Hand silhouette upward to a wrapping <GlyphFace>, if any. */
const slot = inject(GlyphFaceSilhouetteKey, null);
if (slot) {
    watch(
        () => props.silhouette,
        (next) => {
            slot.value = next;
        },
        { immediate: true },
    );
}
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        fill="none"
        class="disco-glyph"
        :class="{ 'disco-glyph--phase-tinted': active }"
        aria-hidden="true"
    >
        <defs>
            <linearGradient
                :id="facetId"
                :x1="facetAxisCoords.x1"
                :y1="facetAxisCoords.y1"
                :x2="facetAxisCoords.x2"
                :y2="facetAxisCoords.y2"
            >
                <stop offset="0%" :stop-color="phaseColor" stop-opacity="0.85" />
                <stop offset="14%" :stop-color="phaseColor" stop-opacity="1" />
                <stop offset="28%" :stop-color="phaseColor" stop-opacity="0.7" />
                <stop offset="42%" :stop-color="phaseColor" stop-opacity="0.95" />
                <stop offset="56%" :stop-color="phaseColor" stop-opacity="0.6" />
                <stop offset="70%" :stop-color="phaseColor" stop-opacity="0.85" />
                <stop offset="84%" :stop-color="phaseColor" stop-opacity="0.5" />
                <stop offset="100%" :stop-color="phaseColor" stop-opacity="0.75" />
            </linearGradient>
            <linearGradient :id="capId" x1="0" y1="0" x2="0.5" y2="0.5">
                <stop offset="0%" stop-color="white" stop-opacity="0.55" />
                <stop offset="40%" stop-color="white" stop-opacity="0" />
            </linearGradient>
        </defs>
        <!-- Silhouette base — currentColor (Vignelli-clean cascade). -->
        <path :d="silhouette" fill="currentColor" />
        <!-- Facet gradient overlay. -->
        <path :d="silhouette" :fill="`url(#${facetId})`" />
        <!-- Specular catch-light cap. -->
        <path :d="silhouette" :fill="`url(#${capId})`" />
    </svg>
</template>
