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
// BH.W-AXIS-GRAMMAR — the tier/variant HOMONYM killed. GlassPanel's visual-rung
// prop is `tier: SurfaceTier` (the ONE surface-rung word, ≡ the deleted
// GlassPanelVariant); the renderer-backend preference is `renderTier: GlassTier`.
// `surface` stays the SHARED {glass·veil·opaque·clear} decoration axis, ORTHOGONAL
// to `tier` (the 5-rung CSS-tier selector) and `renderTier` (the renderer
// preference), exactly as on Card. The `:data-surface` binding drives the CSS seam.
import { surfaceClass } from "../../ui/_shared/useSurfaceAxis";
// The grammar TYPES come from the ONE axis home (`_shared/axes.ts`); the
// `surfaceClass` VALUE resolver stays on the leaf (axes.ts is types-only — the
// membership fence). `Surface`/`SurfaceTier` re-export through axes.ts unchanged.
import type { Surface, SurfaceTier } from "../../ui/_shared/axes";

const TIER_CLASS: Record<SurfaceTier, string> = {
    wash: "glass-wash",
    quiet: "glass-quiet",
    resting: "glass-resting",
    floating: "glass-floating",
    overlay: "glass-overlay",
};

export interface GlassPanelProps {
    /** Force a specific renderer BACKEND (svg-filter | css | fallback tier). */
    renderTier?: GlassTier;
    /** Blur radius (default: 16) */
    blur?: number;
    /** Refraction strength 0-1 (default: 0.3) */
    refraction?: number;
    /** Chromatic aberration strength 0-1 (default: 0) */
    chromaticAberration?: boolean;
    /** Glass surface tier for the CSS rendering branch (the 5-rung ladder). */
    tier?: SurfaceTier;
    /** Surface decoration register (BA.W-SURFACE-AXIS) — the SHARED
     *  {glass·veil·opaque·clear} axis. `glass` (default) renders the tier's plain
     *  glass rung; `veil` overlays the borderless/rimless text-legibility plate;
     *  `opaque` sets `--glass-level:0` (the solid-card escape); `clear` the
     *  maximally-translucent scrim-coupled register. Orthogonal to
     *  `tier`/`renderTier`, exactly as `surface` is on `<Card>`. */
    surface?: Surface;
    /** Additional classes */
    class?: string;
}

const props = withDefaults(defineProps<GlassPanelProps>(), {
    blur: 16,
    refraction: 0.3,
    chromaticAberration: false,
    tier: "resting",
    surface: "glass",
});

const panelRef = ref<HTMLElement | null>(null);
const renderer = useGlassRenderer({ preferredTier: props.renderTier });
const activeTier = computed(() => props.renderTier ?? renderer.tier.value);

// BA.W-SURFACE-AXIS — the shared surface decoration class for the active tier.
// `surfaceClass` returns `glass-${tier} <decoration>`; GlassPanel composes its
// own base (the VARIANT_CLASS / svg / fallback branch), so strip the resolver's
// base-tier prefix and keep only the veil/opaque decoration. The `:data-surface`
// attr (template) drives the CSS seam in lockstep.
const surfaceDecoration = computed(() =>
    surfaceClass(props.surface).replace(/^glass-\w+\s*/, ""),
);

const cssClass = computed(() => {
    // SVG-filter tier: the JS displacement filter overlays whichever rung the
    // tier selects — the `data-tier` attr (below) drives the per-rung
    // `--glass-bg-{tier}` background in the scoped CSS, so the filter no
    // longer forces the lightest `wash` rung onto every panel.
    if (activeTier.value === "svg-filter") {
        return cn(
            "glass-panel glass-panel--svg",
            surfaceDecoration.value,
            props.class,
        );
    }

    // No-backdrop-filter fallback: same per-rung resolution, keyed off
    // `data-tier` so a 5-rung ladder reads even without the blur.
    if (activeTier.value === "fallback") {
        return cn(
            "glass-panel glass-panel--fallback",
            surfaceDecoration.value,
            props.class,
        );
    }

    // CSS tier — composes the canonical 5-rung surface ladder + the shared
    // surface decoration (veil/opaque) on top.
    return cn(
        "glass-panel",
        TIER_CLASS[props.tier],
        surfaceDecoration.value,
        props.class,
    );
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
    <div
        ref="panelRef"
        :class="cssClass"
        :data-tier="props.tier"
        :data-surface="props.surface"
    >
        <slot />
    </div>
</template>

<style scoped>
.glass-panel {
    position: relative;
}

/* SVG-filter substrate — the displacement map overlays whichever rung the
   `tier` selects. Each `data-tier` reads its own `--glass-bg-{tier}`
   so the five-rung ladder reads under the Chromium-default svg-filter tier
   (pre-fix every tier collapsed onto the single lightest `wash` rung). */
.glass-panel--svg[data-tier="wash"] {
    background: var(--glass-bg-wash);
}
.glass-panel--svg[data-tier="quiet"] {
    background: var(--glass-bg-quiet);
}
.glass-panel--svg[data-tier="resting"] {
    background: var(--glass-bg-resting);
}
.glass-panel--svg[data-tier="floating"] {
    background: var(--glass-bg-floating);
}
.glass-panel--svg[data-tier="overlay"] {
    background: var(--glass-bg-overlay);
}

/* No-backdrop-filter fallback — the opaque substrate consumers see when blur
   is unavailable, still resolved per-rung (pre-fix every tier collapsed
   onto the single `floating` rung). The border tracks the rung too. */
.glass-panel--fallback[data-tier="wash"] {
    background: var(--glass-bg-wash);
    border: 1px solid var(--glass-border-wash);
}
.glass-panel--fallback[data-tier="quiet"] {
    background: var(--glass-bg-quiet);
    border: 1px solid var(--glass-border-quiet);
}
.glass-panel--fallback[data-tier="resting"] {
    background: var(--glass-bg-resting);
    border: 1px solid var(--glass-border-resting);
}
.glass-panel--fallback[data-tier="floating"] {
    background: var(--glass-bg-floating);
    border: 1px solid var(--glass-border-floating);
}
.glass-panel--fallback[data-tier="overlay"] {
    background: var(--glass-bg-overlay);
    border: 1px solid var(--glass-border-overlay);
}
</style>
