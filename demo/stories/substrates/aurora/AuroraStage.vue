<script setup lang="ts">
import { ref } from "vue";
import { Aurora, useCursorInteraction } from "@glass/components/aurora";
import type { AuroraConfig } from "@glass/components/aurora";
import NucleiOverlay from "./NucleiOverlay.vue";
import RendererStatusView from "../_frame/RendererStatus.vue";
import { pendingRenderer, type RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";

/**
 * Stage shell — canvas + nuclei overlay + cursor interaction. Lives inside
 * `ExpandableContainer`'s slot so the inline and fullscreen modes each get a
 * fresh WebGL context and fresh pointer listeners (the slot remounts on
 * toggle). Studio state stays at the parent so preset selection and config
 * edits survive the remount.
 */
const props = withDefaults(
    defineProps<{
        config: AuroraConfig;
        /**
         * BC.W-VIZ-AURORA (T5) — enable the live pointer interaction (drag-swirl +
         * flick-burst + the accel gel snap-back). Default `true` — the studio stage is
         * interactive; pass `false` for a static specimen. The cursor write-path is
         * PRM-gated in the runtime regardless.
         */
        interactive?: boolean;
    }>(),
    { interactive: true },
);

const stageRef = ref<HTMLDivElement | null>(null);
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);
const rendererStatus = ref<RendererStatus>(pendingRenderer("webgl2"));

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
    <!-- BI.W-AURORA-VIBRANCY (UF-E4) — the `min-h-[30rem]` floor grows the "core chosen
         aurora space" (the studio canvas larger); the stage still flexes `h-full` up to the
         bumped VizStudio height envelope, but never collapses below a generous minimum. -->
    <div
        ref="stageRef"
        class="relative h-full w-full min-h-[30rem] cursor-crosshair touch-none select-none rounded-card overflow-hidden"
    >
        <Aurora ref="auroraRef" :config="config" @renderer-status="rendererStatus = $event" />
        <RendererStatusView :status="rendererStatus" class="pointer-events-none absolute top-3 left-3" />
        <NucleiOverlay
            :nuclei="config.nuclei"
            :dimmed="config.medium === 'smooth'"
        />
        <div
            class="pointer-events-none absolute bottom-3 left-3 text-mono-caption uppercase tracking-widest text-foreground/50 mix-blend-difference"
        >
            drag to swirl
        </div>
    </div>
</template>
