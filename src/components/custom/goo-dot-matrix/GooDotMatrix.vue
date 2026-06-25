<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useGooDotMatrix } from "./composables/useGooDotMatrix";
import type { GooDotConfig } from "./constants";
import { DEFAULT_GOO_DOT_CONFIG } from "./constants";

/**
 * GooDotMatrix — the metaball SDF FIELD rendered as a DOT MATRIX (BC.W-VIZ-HYBRID — the
 * hybrid of the goo blob and the dot matrix).
 *
 * The merging metaball reads as a FIELD OF DOTS that flow and merge: a regular grid of small
 * warm-cream dots fills the card, and where the gooey blob is — its core, its satellites, the
 * liquid neck stretching between them — the dots are DENSE, BIG, and BRIGHT; out at the rim
 * and beyond they thin to small and dim, then vanish. As a satellite orbits in and meatballs
 * into the body, the band of dots between them THICKENS into a connected bridge, then snaps
 * back when it absorbs — the gooey form drawn entirely in dots.
 *
 * It re-uses two SOTA primitives the codebase already owns — the goo-blob SDF FIELD
 * (byte-untouched `sceneDistG`) + the dot-matrix RENDER — joined by ONE new idea: the
 * dot-grid OUTPUT stage (`v = thickness(sceneDistG(cellCenter))` drives the dot size +
 * brightness, tixy.land applied to an SDF). Four registers, ONE field: `dot-field` (the
 * §T4 default — the smooth field-driven dot), `dot-dither` (the Bayer8 halftone),
 * `dot-lattice` / `dot-sphere` (the opt-in instanced flow/depth look).
 *
 * WebGPU-FIRST: the dot-stamp fragment over the spliced field; a WebGL2 dot-stamp fallback
 * runs the SAME field + dot grid where WebGPU is absent (born-GPU — no Canvas2D). It composes
 * `useGooDotMatrix` → the `createGpuSubstrate` picker over the ONE canvas lifecycle leaf
 * (offscreen-pause, live-PRM freeze, the shared pointer field) — it never bootstraps its own
 * context. The DEFAULT palette is the warm-cream library identity over a transparent ground;
 * the near-dark + reference reproductions are DEMO presets (presets-in-consumers). The
 * teal-on-navy is GONE entirely.
 */
const {
    config = DEFAULT_GOO_DOT_CONFIG,
    paused = false,
} = defineProps<{
    /** The full author schema (the studio's `useConfiguratorState` model). */
    config?: GooDotConfig;
    /**
     * The declarative WCAG-2.2.2 pause seam. `v-model:paused` parks the render loop (the
     * substrate's `manual` suspend) when `true`. Wire `<DockBackgroundToggle>`'s
     * `@update:paused` to this `v-model`.
     */
    paused?: boolean;
}>();

defineEmits<{ "update:paused": [value: boolean] }>();

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// BD.W-VIZ-BROKEN-FIX D2 — forward a LIVE config Proxy (the GooBlob `renderConfig` idiom).
// The renderer captures `config` BY REFERENCE and reads `config.variant`/`.dotPixelSize`/
// `.field.*` per-frame; the prior bare `{ config }` pass-through handed it the destructured
// prop, but the story minted a FRESH `{ ...config }` object each compute, so the captured
// reference was forever stale (the "totally broken" dead-config defect). The Proxy forwards
// every reflection to the live `config` prop, so a variant/interactive toggle reaches the
// loop with NO re-feed. `config` is the destructured prop (DEFAULT_GOO_DOT_CONFIG default).
const renderConfig = new Proxy({} as GooDotConfig, {
    get: (_t, key) => Reflect.get(config, key),
    has: (_t, key) => Reflect.has(config, key),
    ownKeys: () => Reflect.ownKeys(config),
    getOwnPropertyDescriptor: (_t, key) =>
        Reflect.getOwnPropertyDescriptor(config, key),
});
const renderer = useGooDotMatrix(canvasRef, { config: renderConfig });

// Wake a parked loop on a config edit (the blob paletteStops-watcher precedent).
watch(() => config, () => renderer.wake(), { deep: true });

// Drive the substrate pause/resume from the declarative `paused` prop.
watch(
    () => paused,
    (p) => (p ? renderer.pause() : renderer.resume()),
    { immediate: true },
);

// The CSS background (the demo's near-black ground; default transparent so it reads over
// the page).
const bgStyle = computed(() => {
    const bg = config.background;
    if (bg === "transparent") return undefined;
    return `oklch(${bg.L} ${bg.C} ${bg.h})`;
});

defineExpose({
    pause: renderer.pause,
    resume: renderer.resume,
    wake: renderer.wake,
    renderAt: renderer.renderAt,
});
</script>

<template>
    <div
        class="goo-dot-matrix-wrapper"
        :style="bgStyle ? { background: bgStyle } : undefined"
    >
        <canvas
            ref="canvasRef"
            class="goo-dot-matrix-canvas"
            aria-hidden="true"
            data-testid="goo-dot-matrix-canvas"
        />
    </div>
</template>

<style scoped>
.goo-dot-matrix-wrapper {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    /* content-visibility lets the browser content-skip the field when it scrolls offscreen;
       the substrate's contentvisibilityautostatechange listener then parks the rAF. */
    contain: content;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.goo-dot-matrix-canvas {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    pointer-events: none;
}
</style>
