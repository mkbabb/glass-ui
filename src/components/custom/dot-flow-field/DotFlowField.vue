<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useDotFlowField } from "./composables/useDotFlowField";
import type { FlowFieldConfig } from "./constants";
import { DEFAULT_FLOW_CONFIG } from "./constants";
import type { OklchStop } from "../../../composables/color";

/**
 * DotFlowField — the STREAMLINE field (BG.W-DOTFLOW-REBUILD). Discrete warm-cream dots strung
 * along EVENLY-SPACED SMOOTH STREAMLINES of a curl-warped stream function ψ — undulating +
 * interweaving like the level curves of a procedural function, the dots drifting slowly ALONG
 * their own line, over a deep warm-near-black floor. The cursor bends the streamlines (a smooth
 * gaussian domain-push — no snap, no vortex chaos). The reference is IMG_1836.
 *
 * ONE fullscreen-fragment pass evaluating `composables/flowField.ts sampleStreamField` (the
 * SINGLE math source both backends transcribe): the streamlines are the iso-contours of ψ
 * (Bridson 2007 — v = ∇⊥ψ; Jobard–Lefer 1997 even spacing = even Δ level step), beaded at the
 * crossings with a drifting transverse bead-line. WebGPU-FIRST via `createGpuSubstrate` with a
 * byte-identical WebGL2 fragment fallback — NO compute particles, NO additive-trail flood, NO
 * white-out possible (the free-advected-mote + trail-ping-pong architecture is RETIRED). It
 * composes `useDotFlowField` over the ONE canvas lifecycle leaf (offscreen-pause, live-PRM
 * freeze, the shared pointer field) — it never bootstraps its own context.
 *
 * The DEFAULT palette + floor are the warm-cream library identity; the IMG_1836 teal-on-navy
 * skin is a DEMO preset (presets-in-consumers — never a library token).
 */
const {
    config = DEFAULT_FLOW_CONFIG,
    paused = false,
} = defineProps<{
    /** The full author schema (the studio's `useConfiguratorState` model). */
    config?: FlowFieldConfig;
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
// uniform buffer (the same live-config discipline GooBlob uses).
const getPalette = (): OklchStop[] => config.palette;

const renderer = useDotFlowField(canvasRef, {
    config,
    getPalette,
});

// Drive the substrate pause/resume from the declarative `paused` prop.
watch(
    () => paused,
    (p) => (p ? renderer.pause() : renderer.resume()),
    { immediate: true },
);

// The CSS ground mirrors the shader's warm-near-black floor — a first-paint fallback so the
// wrapper shows the deep floor before the canvas arms (the shader paints the same floor opaque).
const bgStyle = computed(() => {
    const f = config.floor;
    // OKLCh → a CSS oklch() ground (the browser resolves it; no library token).
    return `oklch(${f.L} ${f.C} ${f.h})`;
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
        class="dot-flow-field-wrapper"
        :style="bgStyle ? { background: bgStyle } : undefined"
    >
        <canvas
            ref="canvasRef"
            class="dot-flow-field-canvas"
            aria-hidden="true"
            data-testid="dot-flow-field-canvas"
        />
    </div>
</template>

<style scoped>
.dot-flow-field-wrapper {
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

.dot-flow-field-canvas {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    pointer-events: none;
}
</style>
