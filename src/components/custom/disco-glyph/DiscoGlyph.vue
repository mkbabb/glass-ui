<script setup lang="ts">
import { computed, useId } from "vue";

/**
 * <DiscoGlyph> — faceted SVG glyph primitive.
 *
 * Three layers paint over a single `silhouette` path:
 *   1. base — the silhouette filled `currentColor` so consumers retain the
 *      lucide cascade (Vignelli-clean colour register at idle).
 *   2. facet — an 8-stop linear gradient that simulates ~6 facets cutting
 *      across the glyph face. `phaseColor` (default `currentColor`) drives
 *      the hue; in active states a phase var (`--phase-color` or similar)
 *      reads through.
 *   3. cap — a 165° specular catch-light gradient. White at the upper-left,
 *      transparent past 40%; the polished-metal hot-spot a real disco
 *      glyph would carry under club lighting.
 *
 * `useId()` scopes the gradient ids so multiple glyphs on one page do not
 * collide post-SSR/hydration. The id format mirrors the existing speedtest
 * conventions (`disco-facet-<id>` / `disco-cap-<id>`).
 *
 * Lands as part of P.W3 sub-B; the speedtest disco icons (PlayDisco /
 * RotateCcwDisco / ArrowRightDisco / CheckDisco) refactor to thin
 * wrappers that pass only the silhouette path.
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
    }>(),
    { viewBox: "0 0 24 24", active: false, phaseColor: "currentColor" },
);

const uid = useId();
const facetId = computed(() => `disco-facet-${uid}`);
const capId = computed(() => `disco-cap-${uid}`);
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
            <linearGradient :id="facetId" x1="0" y1="0" x2="1" y2="1">
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
