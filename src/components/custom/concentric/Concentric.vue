<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useConcentric } from "./composables/useConcentric";
import type { ConcentricConfig } from "./constants";
import { DEFAULT_CONCENTRIC_CONFIG } from "./constants";
import type { OklchStop } from "../../../composables/color";

/**
 * Concentric — a radial Fourier ring-interference field.
 *
 * Concentric ellipsoid rings whose interference is a sum of radial harmonics about
 * one-or-more centers (the cited radial-Fourier math — `composables/ringField.ts`): the
 * same Fourier-series vocabulary the dot-flow-field's wave potential uses, so the suite
 * speaks ONE math language. WebGPU-FIRST: a pure fullscreen fragment pass (the aurora
 * shape-class) evaluates `f(p,t) = Σ_j Σ_i A_i·sin(k_i·‖p−c_j‖_e − ω_i·t + φ_i)` per
 * pixel, with a clean WebGL2 GLSL fallback where WebGPU is absent. It composes
 * `useConcentric` → the `createGpuSubstrate` picker over the ONE canvas lifecycle leaf
 * (offscreen-pause, live-PRM freeze, consumer-owned DPR) — it never bootstraps its own
 * context.
 *
 * The DEFAULT palette is the warm-cream library identity; the demo themes the rings
 * through a PRESET (presets-in-consumers — never a library token).
 */
const {
    config = DEFAULT_CONCENTRIC_CONFIG,
    paused = false,
} = defineProps<{
    /** The full author schema (the studio's `useConfiguratorState` model). */
    config?: ConcentricConfig;
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
// uniform buffer (the same live-config discipline the flow field / blob use).
const getPalette = (): OklchStop[] => config.palette;

const renderer = useConcentric(canvasRef, {
    config,
    getPalette,
});

// Drive the substrate pause/resume from the declarative `paused` prop.
watch(
    () => paused,
    (p) => (p ? renderer.pause() : renderer.resume()),
    { immediate: true },
);

// The CSS background (the demo themes the ground; default transparent so it reads over
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
        class="concentric-wrapper"
        :style="bgStyle ? { background: bgStyle } : undefined"
    >
        <canvas
            ref="canvasRef"
            class="concentric-canvas"
            aria-hidden="true"
            data-testid="concentric-canvas"
        />
    </div>
</template>

<style scoped>
.concentric-wrapper {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    /* AV.W7 F1 — content-visibility lets the browser content-skip the field when it
       scrolls offscreen; the substrate's contentvisibilityautostatechange listener then
       parks the rAF. contain isolates it as a layout/paint root. */
    contain: content;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.concentric-canvas {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    pointer-events: none;
}
</style>
