<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useDotMatrix } from "./composables/useDotMatrix";
import type { DotMatrixConfig } from "./constants";
import { DEFAULT_DOT_MATRIX_CONFIG } from "./constants";
import type { OklchStop } from "../../../composables/color";

/**
 * DotMatrix — a globe of fine warm-cream dots on a sphere SURFACE (BC.W-VIZ-DOTMATRIX —
 * the Claude co-work "fine-dot spheres on dark" reference).
 *
 * The dots are laid via the Fibonacci phyllotaxis spiral (even-by-area, no pole-pinching)
 * and depth-shaded so the globe reads as a translucent dot-SHELL — the near hemisphere
 * brighter + larger, the rim/far side fading toward near-invisible (the shape is painted
 * by BRIGHTNESS + DEPTH, not motion; stop the spin and it STILL reads as a sphere). It
 * spins slowly on a gently tilted axis. WebGPU-FIRST: the render pass draws instanced
 * billboard quads + the crisp `fwidth` SDF fragment; a WebGL2 instanced-billboard fallback
 * draws the SAME dots where WebGPU is absent (born-GPU — no Canvas2D). It composes
 * `useDotMatrix` → the `createGpuSubstrate` picker over the ONE canvas lifecycle leaf
 * (offscreen-pause, live-PRM freeze, the shared pointer field) — it never bootstraps its
 * own context.
 *
 * The DEFAULT palette is the warm-cream library identity over a transparent ground (the
 * glass card shows through); the mono-warm-white-on-near-black reference + the two-globe
 * composition are DEMO presets (presets-in-consumers — never a library token). The
 * teal-on-navy is GONE entirely.
 */
const {
    config = DEFAULT_DOT_MATRIX_CONFIG,
    paused = false,
} = defineProps<{
    /** The full author schema (the studio's `useConfiguratorState` model). */
    config?: DotMatrixConfig;
    /**
     * The declarative WCAG-2.2.2 pause seam. `v-model:paused` parks the render loop
     * (the substrate's `manual` suspend) when `true`. Wire `<DockBackgroundToggle>`'s
     * `@update:paused` to this `v-model`.
     */
    paused?: boolean;
}>();

defineEmits<{ "update:paused": [value: boolean] }>();

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// The palette getter re-reads the live config each frame so a studio edit reaches the
// uniform buffer (the same live-config discipline GooBlob / DotFlowField use).
const getPalette = (): OklchStop[] => config.palette;

const renderer = useDotMatrix(canvasRef, {
    config,
    getPalette,
});

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
        class="dot-matrix-wrapper"
        :style="bgStyle ? { background: bgStyle } : undefined"
    >
        <canvas
            ref="canvasRef"
            class="dot-matrix-canvas"
            aria-hidden="true"
            data-testid="dot-matrix-canvas"
        />
    </div>
</template>

<style scoped>
.dot-matrix-wrapper {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    /* AV.W7 F1 — content-visibility lets the browser content-skip the globe when it
       scrolls offscreen; the substrate's contentvisibilityautostatechange listener then
       parks the rAF. contain isolates it as a layout/paint root. */
    contain: content;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.dot-matrix-canvas {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    pointer-events: none;
}
</style>
