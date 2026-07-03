<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useDotFlowField } from "./composables/useDotFlowField";
import type { FlowFieldConfig } from "./constants";
import { DEFAULT_FLOW_CONFIG } from "./constants";
import type { OklchStop } from "../../../composables/color";

/**
 * DotFlowField — TWO registers, ONE component (BG.W-DOTFLOW-REBUILD, over the
 * BD.W-DOTFLOW-AURORA-CURRENT source). The DEFAULT `mode:"flow"` is the AURORA CURRENT: a
 * dense population ADVECTED along the divergence-free curl current, each mote trailing a
 * fading ribbon of warm-fire light (the ribbon hue mapped to the mote SPEED), the cursor a
 * live VORTEX, over a deep warm-near-black floor + a warm rose corner-bloom (NO cyan/teal).
 * The calm `mode:"field"` register is the kept anchored dot-matrix a slow LARGE wave sweeps
 * through — no advection, no re-seed, a broad bright iso-band lighting the dots it passes.
 *
 * The current undulates as the low-frequency Gerstner/Tessendorf sum-of-sines curl-noise
 * field (`composables/flowField.ts` — the SINGLE math source both backends transcribe).
 * WebGPU-FIRST: the compute pass advects the storage buffer (the sole earner) into a half-res
 * RGBA16F trail; the WebGL2 channel (the live path on most hosts) runs a state-texture GPGPU
 * ping-pong + a two-FBO feedback-fade trail — the SAME advected-population gestalt on both
 * engines (no Canvas2D — the §E "no canvas" mandate). It composes `useDotFlowField` → the
 * `createGpuSubstrate` picker over the ONE canvas lifecycle leaf (offscreen-pause, live-PRM
 * freeze, the shared pointer field) — it never bootstraps its own context.
 *
 * The DEFAULT palette is the warm-cream library identity; the warm-fire velocity ramp, the
 * mono-dim-on-near-black reference + the globe mask are DEMO presets (presets-in-consumers —
 * never a library token). The teal-on-navy is GONE entirely (clean break).
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

// The CSS background (the demo's dark navy ground; default transparent so it reads over
// the page).
const bgStyle = computed(() => {
    const bg = config.background;
    if (bg === "transparent") return undefined;
    // OKLCh → a CSS oklch() ground (the browser resolves it; no library token).
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
