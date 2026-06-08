<script setup lang="ts">
import { ref } from "vue";
import { Aurora, useCursorInteraction } from "../../../src/components/custom/aurora";
import type { AuroraConfig } from "../../../src/components/custom/aurora";
import NucleiOverlay from "./NucleiOverlay.vue";

/**
 * Stage shell — canvas + nuclei overlay + cursor interaction. Lives inside
 * `ExpandableContainer`'s slot so the inline and fullscreen modes each get a
 * fresh WebGL context and fresh pointer listeners (the slot remounts on
 * toggle). Studio state stays at the parent so preset selection and config
 * edits survive the remount.
 */
const props = defineProps<{
    config: AuroraConfig;
}>();

const stageRef = ref<HTMLDivElement | null>(null);
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);

useCursorInteraction(stageRef, () => props.config, {
    setCursor: (x, y, strength) => auroraRef.value?.setCursor(x, y, strength),
    clearCursor: () => auroraRef.value?.clearCursor(),
    // Feed the per-move delta into the velocity-reactive flow (a fast flick →
    // a transient swirl-burst). The runtime PRM-gates the write-path.
    injectVelocity: (dx, dy) => auroraRef.value?.injectCursorVelocity(dx, dy),
});
</script>

<template>
    <div
        ref="stageRef"
        class="relative h-full w-full cursor-crosshair touch-none select-none"
    >
        <Aurora ref="auroraRef" :config="config" />
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
