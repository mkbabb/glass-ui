<script setup lang="ts">
// One Aurora filling its box. The pointer shapes the field where `interactive` is set.
// The renderer it armed and that renderer's phase sit on its own element as
// `data-renderer` and `data-state`, with no visible text.
import { ref, watch } from "vue";
import { Aurora, useCursorInteraction, type AuroraConfig } from "@glass/components/aurora";
import type { RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";
import { AURORA_PRESETS } from "./aurora/presets";

const props = withDefaults(
    defineProps<{ config?: AuroraConfig; paused?: boolean; interactive?: boolean }>(),
    { config: () => AURORA_PRESETS[0]!.config, paused: false, interactive: true },
);

const box = ref<HTMLElement | null>(null);
const aurora = ref<InstanceType<typeof Aurora> | null>(null);
const renderer = ref<RendererStatus | null>(null);

useCursorInteraction(box, () => props.config, {
    setCursor: (x, y, strength) => {
        if (props.interactive) aurora.value?.setCursor(x, y, strength);
    },
    clearCursor: () => aurora.value?.clearCursor(),
});

watch(
    () => props.paused,
    (p) => (p ? aurora.value?.pause() : aurora.value?.resume()),
);
</script>

<template>
    <div ref="box" class="absolute inset-0 touch-none select-none">
        <Aurora
            ref="aurora"
            :config="config"
            :data-renderer="renderer?.engine"
            :data-state="renderer?.phase"
            @renderer-status="renderer = $event"
        />
    </div>
</template>
