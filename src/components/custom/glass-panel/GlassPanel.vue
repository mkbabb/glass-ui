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
    // SVG-filter tier: no glass CSS class (filter applied directly via JS)
    if (activeTier.value === "svg-filter") {
        return cn("glass-panel glass-panel--svg", props.class);
    }

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
    <div ref="panelRef" :class="cssClass">
        <slot />
    </div>
</template>

<style scoped>
.glass-panel {
    position: relative;
}

.glass-panel--svg {
    /* SVG-filter substrate: lightest canonical glass tint so the
       displacement map dominates the surface read. */
    background: var(--glass-bg-wash);
}

.glass-panel--fallback {
    /* No-backdrop-filter fallback: the floating tier reads as the
       opaque substrate consumers expect when blur is unavailable. */
    background: var(--glass-bg-floating);
    border: 1px solid var(--glass-border-floating);
}
</style>
