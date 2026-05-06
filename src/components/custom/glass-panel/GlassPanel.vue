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

export interface GlassPanelProps {
    /** Force a specific rendering tier */
    tier?: GlassTier;
    /** Blur radius (default: 16) */
    blur?: number;
    /** Refraction strength 0-1 (default: 0.3) */
    refraction?: number;
    /** Chromatic aberration strength 0-1 (default: 0) */
    chromaticAberration?: boolean;
    /** Glass variant for CSS tier */
    variant?: "default" | "medium" | "elevated";
    /** Additional classes */
    class?: string;
}

const props = withDefaults(defineProps<GlassPanelProps>(), {
    blur: 16,
    refraction: 0.3,
    chromaticAberration: false,
    variant: "default",
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

    // CSS tier
    const variantClass =
        props.variant === "elevated"
            ? "glass-floating"
            : props.variant === "medium"
              ? "glass-resting"
              : "glass-resting";

    return cn("glass-panel", variantClass, props.class);
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
    /* Background tint for SVG filter tier */
    background: color-mix(in srgb, var(--card) 15%, transparent);
}

.glass-panel--fallback {
    background: color-mix(in srgb, var(--card) 92%, transparent);
    border: 1px solid color-mix(in srgb, var(--border) 35%, transparent);
}
</style>
