<script setup lang="ts">
import { computed, ref } from "vue";
import { Aurora, useCursorInteraction } from "@glass/components/aurora";
import type { AuroraConfig } from "@glass/components/aurora";
import { isAuroraPointerEnabled } from "@glass/components/aurora/composables/runtime";
import NucleiOverlay from "./NucleiOverlay.vue";
import RendererStatusView from "../_frame/RendererStatus.vue";
import {
    pendingRenderer,
    type RendererStatus,
} from "@glass/composables/glass/webgpu/rendererStatus";
import { useReducedMotion } from "@glass/composables/motion/useReducedMotion";

/** Stage shell — canvas, nuclei overlay, and pointer interaction inside the
 * parent-owned VizStudio aperture. Studio state stays with the parent. */
const props = withDefaults(
    defineProps<{
        config: AuroraConfig;
        /**
         * BC.W-VIZ-AURORA (T5) — master switch for configured pointer shaping.
         * The Aurora config still opts each interaction axis in. Pass `false` for a
         * static specimen; the runtime independently gates the cursor path under PRM.
         */
        interactive?: boolean;
    }>(),
    { interactive: true },
);

const stageRef = ref<HTMLDivElement | null>(null);
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);
const rendererStatus = ref<RendererStatus>(pendingRenderer("webgl2"));
const reducedMotion = useReducedMotion();
const pointerAffordanceEnabled = computed(
    () =>
        props.interactive &&
        !reducedMotion.value &&
        rendererStatus.value.phase === "ready" &&
        rendererStatus.value.engine !== "css" &&
        isAuroraPointerEnabled(props.config),
);

useCursorInteraction(stageRef, () => props.config, {
    setCursor: (x, y, strength) => {
        if (!props.interactive) return;
        auroraRef.value?.setCursor(x, y, strength);
    },
    clearCursor: () => auroraRef.value?.clearCursor(),
    // BI.W-FIELD-CORE — a single position write (setCursor); the shared pointer field
    // DERIVES the velocity + flick-burst from the smoothed position deltas in its tick (the
    // ONE smoothing stage — the per-move delta re-feed retired with cursorModel).
});
</script>

<template>
    <!-- BC.W-VIZ-AURORA (T3) — the rounded clip lands on the CANVAS-bearing wrapper
         (`rounded-card overflow-hidden`) so the radius reaches the canvas PIXELS, not
         just the Configurator panel frame; `.aurora-root` keeps its `contain:content`
         so the corners clip the live field, never a square canvas behind a round panel. -->
    <!-- V-A94 — VizStudio/Configurator owns the painted aperture. The field fills that
         definite grid track and may shrink with it; a second child-owned minimum would
         overflow the aperture and clip the bottom interaction cue. -->
    <div
        ref="stageRef"
        class="relative h-full min-h-0 w-full touch-none select-none rounded-card overflow-hidden"
        :class="{ 'cursor-crosshair': pointerAffordanceEnabled }"
    >
        <Aurora
            ref="auroraRef"
            :config="config"
            @renderer-status="rendererStatus = $event"
        />
        <RendererStatusView
            :status="rendererStatus"
            class="pointer-events-none absolute top-3 left-3"
        />
        <NucleiOverlay :nuclei="config.nuclei" :dimmed="config.medium === 'smooth'" />
        <div
            v-if="pointerAffordanceEnabled"
            class="pointer-events-none absolute bottom-3 left-3 text-mono-caption uppercase tracking-widest text-foreground/50 mix-blend-difference"
        >
            move to shape the field
        </div>
    </div>
</template>
