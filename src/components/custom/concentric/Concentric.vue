<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useConcentric } from "./composables/useConcentric";
import type { ConcentricConfig } from "./constants";
import {
    DEFAULT_CONCENTRIC_CONFIG,
    WARM_IDENTITY_PALETTE,
    WARM_IDENTITY_PALETTE_DARK,
    WARM_GROUND_LIGHT,
    WARM_GROUND_DARK,
} from "./constants";
import type { OklchStop } from "../../../composables/color";
import { useGlobalDark } from "../../../composables/dark/useGlobalDark";

/**
 * Concentric — a living LEVEL-SET hypsometric SURVEY (liquid-grid kin, BD.W-CONCENTRIC-RELIEF).
 *
 * The iso-contours of a LOW-octave curl-warped height field H(p,t) — the SAME traveling-wave
 * CELL-WARP that twists the liquid-grid cells is applied to the SAMPLING coordinate, so the
 * contours twist + flow as a wave passes OVER and THROUGH the topography; the ω=√(g·k) swell
 * breathes the basins; the cursor HEAVES the topography toward the pointer (velocity-scaled
 * gravity). The fragment paints an OPAQUE warm hypsometric FILL, lifts it into 2.5-D relief
 * with one analytic hillshade, and inks it with a two-tier index/minor contour hierarchy via
 * the KEPT IQ gradient-free `contourInk` (perfect GPU AA — density tracks 1/|∇H|). WebGPU-FIRST:
 * a pure fullscreen fragment pass over the shared `waveField` leaf, with a clean WebGL2 GLSL
 * fallback. It composes `useConcentric` → the `createGpuSubstrate` picker over the ONE canvas
 * lifecycle leaf (offscreen-pause, live-PRM freeze, consumer-owned DPR).
 *
 * The DEFAULT identity is the warm-DIVERGENT hypsometric tint (deep plum-rose basin → ember →
 * amber → wheat crest), resolved per-mode by plain arms (NOT CSS `light-dark()`, NOT an
 * in-shader `uMode` seam): the dark twin glows on a deep-ember ground. A consumer (the demo)
 * themes it through a PRESET (presets-in-consumers — never a library token).
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

// The per-mode arm (plain, NOT CSS light-dark() — the inset-shadow trap; NOT an in-shader
// uMode seam — no second color path). When the config carries the LIBRARY-DEFAULT warm
// identity, the dark mode swaps to the luminous-ember twin + the deep-ember ground. A
// consumer-themed config (its own palette) is respected verbatim in both modes.
const { isDark } = useGlobalDark();
const isLibraryDefaultPalette = computed(
    () => config.palette === WARM_IDENTITY_PALETTE,
);

// The palette getter re-reads the live config each frame so a studio edit reaches the
// uniform buffer (the same live-config discipline the flow field / blob use).
const getPalette = (): OklchStop[] => {
    if (isLibraryDefaultPalette.value && isDark.value) return WARM_IDENTITY_PALETTE_DARK;
    return config.palette;
};

// The opaque warm ground, resolved per-mode for the library default (the survey reads
// standalone in both modes — it CONTRIBUTES a field, never reveals a flat plate).
const resolvedBackground = computed<OklchStop | "transparent">(() => {
    if (isLibraryDefaultPalette.value) {
        // the default flips to the per-mode warm floor regardless of the literal default token
        return isDark.value ? WARM_GROUND_DARK : WARM_GROUND_LIGHT;
    }
    return config.background;
});

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

// The CSS wrapper ground — the per-mode warm floor under the opaque survey (covers the
// pre-paint frame; the shader itself is now opaque so the page never bleeds through).
const bgStyle = computed(() => {
    const bg = resolvedBackground.value;
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
