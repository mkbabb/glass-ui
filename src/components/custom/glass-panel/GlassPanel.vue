<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
    useGlassRenderer,
    createGlassFilter,
    destroyGlassFilter,
    type GlassTier,
    type GlassFilterState,
} from "../../../composables/glass/useGlassRenderer";
import { cn } from "../../../utils/cn";

/**
 * Surface-tier vocabulary for the CSS rendering branch. Mirrors the v0.8
 * five-rung ladder declared in `tokens.css §8` and consumed by the
 * `.glass-{wash,quiet,resting,floating,overlay}` utility classes.
 *
 * v0.8.6 — `default | medium | elevated` retired (per audit U.W0.C-b §21).
 */
export type GlassPanelVariant =
    | "wash"
    | "quiet"
    | "resting"
    | "floating"
    | "overlay";

const VARIANT_CLASS: Record<GlassPanelVariant, string> = {
    wash: "glass-wash",
    quiet: "glass-quiet",
    resting: "glass-resting",
    floating: "glass-floating",
    overlay: "glass-overlay",
};

export interface GlassPanelProps {
    /** Force a specific rendering tier */
    tier?: GlassTier;
    /** Blur radius (default: 16) */
    blur?: number;
    /** Refraction strength 0-1 (default: 0.3) */
    refraction?: number;
    /** Chromatic aberration strength 0-1 (default: 0) */
    chromaticAberration?: boolean;
    /** Glass surface tier for the CSS rendering branch (v0.8 5-rung ladder). */
    variant?: GlassPanelVariant;
    /** Additional classes */
    class?: string;
}

const props = withDefaults(defineProps<GlassPanelProps>(), {
    blur: 16,
    refraction: 0.3,
    chromaticAberration: false,
    variant: "resting",
});

const panelRef = ref<HTMLElement | null>(null);
const renderer = useGlassRenderer({ preferredTier: props.tier });
const activeTier = computed(() => props.tier ?? renderer.tier.value);

const cssClass = computed(() => {
    // SVG-filter tier: the JS displacement filter overlays whichever rung the
    // variant selects — the `data-variant` attr (below) drives the per-rung
    // `--glass-bg-{variant}` background in the scoped CSS, so the filter no
    // longer forces the lightest `wash` rung onto every panel.
    if (activeTier.value === "svg-filter") {
        return cn("glass-panel glass-panel--svg", props.class);
    }

    // No-backdrop-filter fallback: same per-rung resolution, keyed off
    // `data-variant` so a 5-rung ladder reads even without the blur.
    if (activeTier.value === "fallback") {
        return cn("glass-panel glass-panel--fallback", props.class);
    }

    // CSS tier — composes the canonical 5-rung surface ladder.
    return cn("glass-panel", VARIANT_CLASS[props.variant], props.class);
});

let filterState: GlassFilterState | null = null;

onMounted(() => {
    if (panelRef.value && activeTier.value === "svg-filter") {
        filterState = createGlassFilter(panelRef.value, {
            blur: props.blur,
            refraction: props.refraction,
            chromaticAberration: props.chromaticAberration ? 0.5 : 0,
        });
    }
});

onBeforeUnmount(() => {
    if (filterState) {
        destroyGlassFilter(filterState);
    }
});
</script>

<template>
    <div ref="panelRef" :class="cssClass" :data-variant="props.variant">
        <slot />
    </div>
</template>

<style scoped>
.glass-panel {
    position: relative;
}

/* SVG-filter substrate — the displacement map overlays whichever rung the
   `variant` selects. Each `data-variant` reads its own `--glass-bg-{variant}`
   so the five-rung ladder reads under the Chromium-default svg-filter tier
   (pre-fix every variant collapsed onto the single lightest `wash` rung). */
.glass-panel--svg[data-variant="wash"] {
    background: var(--glass-bg-wash);
}
.glass-panel--svg[data-variant="quiet"] {
    background: var(--glass-bg-quiet);
}
.glass-panel--svg[data-variant="resting"] {
    background: var(--glass-bg-resting);
}
.glass-panel--svg[data-variant="floating"] {
    background: var(--glass-bg-floating);
}
.glass-panel--svg[data-variant="overlay"] {
    background: var(--glass-bg-overlay);
}

/* No-backdrop-filter fallback — the opaque substrate consumers see when blur
   is unavailable, still resolved per-rung (pre-fix every variant collapsed
   onto the single `floating` rung). The border tracks the rung too. */
.glass-panel--fallback[data-variant="wash"] {
    background: var(--glass-bg-wash);
    border: 1px solid var(--glass-border-wash);
}
.glass-panel--fallback[data-variant="quiet"] {
    background: var(--glass-bg-quiet);
    border: 1px solid var(--glass-border-quiet);
}
.glass-panel--fallback[data-variant="resting"] {
    background: var(--glass-bg-resting);
    border: 1px solid var(--glass-border-resting);
}
.glass-panel--fallback[data-variant="floating"] {
    background: var(--glass-bg-floating);
    border: 1px solid var(--glass-border-floating);
}
.glass-panel--fallback[data-variant="overlay"] {
    background: var(--glass-bg-overlay);
    border: 1px solid var(--glass-border-overlay);
}
</style>
