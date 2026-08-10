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
import { useReducedMotion } from "@glass/composables/motion/core/useReducedMotion";

/** Stage shell — canvas, nuclei overlay, and pointer interaction inside the
 * parent-owned VizStudio aperture. Studio state stays with the parent. */
const props = withDefaults(
    defineProps<{
        config: AuroraConfig;
        /**
         * Master switch for configured pointer shaping.
         * The Aurora config still opts each interaction axis in. Pass `false` for a
         * static specimen; the runtime independently disables cursor motion for reduced motion.
         */
        interactive?: boolean;
        /**
         * PROBE MODE (`?probe=1`). Clears every chrome layer painted OVER the stage —
         * the nucleus rings, the renderer badge, the pointer cue — so a capture of this
         * region is the field and nothing else. It removes OBSERVERS, never the subject:
         * the canvas, its config and its engine are untouched, which is the whole point
         * (a probe that changes the picture cannot certify the picture).
         *
         * The controls column beside the stage stays mounted — it is not painted over
         * the field, and the harness reads the medium combobox out of it to prove the
         * forced medium reached the door as well as the shader.
         */
        probe?: boolean;
        /**
         * Pin the render backend (`?engine=webgl2`). Forces the real in-app WebGL2 arm
         * by withholding the WGSL setup from the substrate picker — the GL arm has to be
         * archived from a live page before it can be deleted, and no browser flag
         * reaches it.
         */
        engine?: "webgl2";
    }>(),
    { interactive: true, probe: false },
);

const runtimeOptions = computed(() =>
    props.engine === "webgl2" ? { forceBackend: "webgl2" as const } : undefined,
);

const stageRef = ref<HTMLDivElement | null>(null);
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);
const rendererStatus = ref<RendererStatus>(pendingRenderer("webgl2"));
const reducedMotion = useReducedMotion();
const pointerAffordanceEnabled = computed(
    () =>
        props.interactive &&
        !props.probe &&
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
    // a single position write (setCursor); the shared pointer field
    // DERIVES the velocity + flick-burst from the smoothed position deltas in its tick (the
    // ONE smoothing stage — the per-move delta re-feed retired with cursorModel).
});
</script>

<template>
    <!-- The rounded clip lands on the canvas-bearing wrapper
         (`rounded-card overflow-hidden`) so the radius reaches the canvas PIXELS, not
         just the Configurator panel frame; `.aurora-root` keeps its `contain:content`
         so the corners clip the live field, never a square canvas behind a round panel. -->
    <!-- VizStudio and Configurator own the painted aperture. The field fills that
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
            :runtime-options="runtimeOptions"
            @renderer-status="rendererStatus = $event"
        />
        <!-- Everything below paints OVER the field; `?probe=1` clears all of it. -->
        <RendererStatusView
            v-if="!probe"
            :status="rendererStatus"
            class="pointer-events-none absolute top-3 left-3"
        />
        <NucleiOverlay v-if="!probe" :nuclei="config.nuclei" />
        <div
            v-if="pointerAffordanceEnabled"
            class="pointer-events-none absolute bottom-3 left-3 text-caption text-foreground/50 mix-blend-difference"
        >
            move to shape the field
        </div>
    </div>
</template>
