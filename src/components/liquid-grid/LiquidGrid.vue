<script setup lang="ts">
import { computed, onMounted, reactive, useTemplateRef, watch } from "vue";
import { useLiquidGrid } from "./composables/useLiquidGrid";
import type { LiquidGridConfig } from "./constants";
import { DEFAULT_LIQUID_GRID_CONFIG } from "./constants";
import { cssToOklch } from "../../composables/color";

/**
 * LiquidGrid — a liquid AA-grid: evenly-spaced LARGER lines on a slowly breathing
 * curl-flow sheet.
 *
 * A calm engineering-graph-liquid grid (evenly-spaced, LARGE cells, a crisp fine rule with
 * a bolder major rule every 5 cells) drawn on a slowly breathing liquid sheet — adjacent
 * lines bow and flow TOGETHER as if the grid is ruled on a gently rippling pond, never a
 * per-line jitter. WebGPU-FIRST: a pure fullscreen fragment pass (the aurora/concentric
 * shape-class) computes the grid at a curl-warped coordinate per pixel via the Ben Golus
 * derivative-AA distance function (constant device-pixel-crisp lines, the CSS-blur kill),
 * the Iñigo Quílez domain warp (the "liquid"), and the Bridson divergence-free curl flow
 * (WHY it's liquid not noise). It composes `useLiquidGrid` → the `createGpuSubstrate` picker
 * over the ONE canvas lifecycle leaf (offscreen-pause, live-PRM freeze, consumer-owned DPR)
 * — it never bootstraps its own context.
 *
 * The DEFAULT line ink is the warm-cream `--foreground` library identity (resolved live at
 * mount); the demo themes it through a PRESET (presets-in-consumers — never a library
 * token). The grid suffuses over the page (transparent ground) — teal-on-navy is gone.
 */
const {
    config = DEFAULT_LIQUID_GRID_CONFIG,
    paused = false,
} = defineProps<{
    /** The full author schema (the studio's `useConfiguratorState` model). */
    config?: LiquidGridConfig;
    /**
     * The declarative WCAG-2.2.2 pause seam. `v-model:paused` parks the render loop
     * (the substrate's `manual` suspend) when `true`. Wire `<DockBackgroundToggle>`'s
     * `@update:paused` to this `v-model`.
     */
    paused?: boolean;
}>();

defineEmits<{ "update:paused": [value: boolean] }>();

const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// The effective config the renderer reads each frame — a reactive clone whose `lineColor`
// resolves the LIVE `--foreground` warm-cream token at mount (so the library default tracks
// the consumer's warm identity); the WARM_IDENTITY_INK in `config` is the SSR/no-token
// fallback. A consumer passing an explicit non-default `lineColor` wins.
const effective = reactive<LiquidGridConfig>({ ...config });
watch(
    () => config,
    (c) => Object.assign(effective, c),
    { deep: true },
);

onMounted(() => {
    // Resolve the live --foreground ink ONLY when the consumer left lineColor at the warm
    // default (an explicit override wins). The warm-cream identity tracks the page foreground.
    if (config.lineColor === DEFAULT_LIQUID_GRID_CONFIG.lineColor) {
        const host = wrapperRef.value;
        if (host) {
            const fg = getComputedStyle(host).getPropertyValue("--foreground").trim();
            if (fg) {
                try {
                    effective.lineColor = cssToOklch(fg);
                } catch {
                    // fail-explicit: a consumer --foreground that value.js cannot
                    // parse falls back to the WARM_IDENTITY_INK default ink (the grid
                    // must still paint — a befitting graceful degrade, not a swallow).
                }
            }
        }
    }
});

const renderer = useLiquidGrid(canvasRef, { config: effective });

// Drive the substrate pause/resume from the declarative `paused` prop.
watch(
    () => paused,
    (p) => (p ? renderer.pause() : renderer.resume()),
    { immediate: true },
);

// The CSS background (the demo themes the ground; default transparent so it suffuses).
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
        ref="wrapperRef"
        class="liquid-grid-wrapper"
        :style="bgStyle ? { background: bgStyle } : undefined"
    >
        <canvas
            ref="canvasRef"
            class="liquid-grid-canvas"
            aria-hidden="true"
            data-testid="liquid-grid-canvas"
        />
    </div>
</template>

<style scoped>
.liquid-grid-wrapper {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    /* AV.W7 F1 — content-visibility lets the browser content-skip the field when it scrolls
       offscreen; the substrate's contentvisibilityautostatechange listener then parks the
       rAF. contain isolates it as a layout/paint root. */
    contain: content;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.liquid-grid-canvas {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    pointer-events: none;
}
</style>
