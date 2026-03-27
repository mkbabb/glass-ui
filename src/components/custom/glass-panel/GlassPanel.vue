<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import {
    useGlassRenderer,
    type GlassTier,
} from "../../../composables/glass/useGlassRenderer";
import { cn } from "../../../utils/cn";

export interface GlassPanelProps {
    /** Force a specific rendering tier */
    tier?: GlassTier;
    /** Blur radius for GPU tiers (default: 20) */
    blur?: number;
    /** Refraction strength 0-1 (default: 0.3) */
    refraction?: number;
    /** Enable animated caustic light patterns */
    caustics?: boolean;
    /** Enable edge chromatic aberration */
    chromaticAberration?: boolean;
    /** Glass variant for CSS tier */
    variant?: "default" | "medium" | "elevated";
    /** Additional classes */
    class?: string;
}

const props = withDefaults(defineProps<GlassPanelProps>(), {
    blur: 20,
    refraction: 0.3,
    caustics: false,
    chromaticAberration: false,
    variant: "default",
});

const panelRef = ref<HTMLElement | null>(null);
const renderer = useGlassRenderer({
    preferredTier: props.tier,
});

const activeTier = computed(() => props.tier ?? renderer.tier.value);

const cssClass = computed(() => {
    if (activeTier.value === "webgl" || activeTier.value === "webgpu") {
        // GPU tier — no glass CSS classes, canvas handles rendering
        return cn("glass-panel glass-panel--gpu", props.class);
    }

    if (activeTier.value === "fallback") {
        return cn("glass-panel glass-panel--fallback", props.class);
    }

    // CSS tier — use existing glass classes
    const variantClass =
        props.variant === "elevated"
            ? "glass-elevated"
            : props.variant === "medium"
              ? "glass-medium"
              : "glass";

    return cn("glass-panel", variantClass, props.class);
});

let instanceId: number | null = null;

onMounted(() => {
    if (panelRef.value && (activeTier.value === "webgl" || activeTier.value === "webgpu")) {
        instanceId = renderer.register(panelRef.value);
    }
});

onBeforeUnmount(() => {
    if (instanceId !== null) {
        renderer.unregister(instanceId);
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

.glass-panel--gpu {
    /* GPU tier: glass canvas renders behind, content sits on top */
    background: transparent;
    isolation: isolate;
}

.glass-panel--fallback {
    /* Solid fallback for browsers without backdrop-filter or GPU */
    background: hsl(var(--card) / 0.92);
    border: 1px solid hsl(var(--border) / 0.35);
    border-radius: inherit;
}
</style>
