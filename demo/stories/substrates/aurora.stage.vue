<script setup lang="ts">
// One Aurora filling its box. The pointer shapes the field where `interactive` is set.
import { ref, watch } from "vue";
import { Aurora, useCursorInteraction, type AuroraConfig } from "@glass/components/aurora";
import { AURORA_PRESETS } from "./aurora/presets";

const props = withDefaults(
    defineProps<{ config?: AuroraConfig; paused?: boolean; interactive?: boolean }>(),
    { config: () => AURORA_PRESETS[0]!.config, paused: false, interactive: true },
);

const box = ref<HTMLElement | null>(null);
const aurora = ref<InstanceType<typeof Aurora> | null>(null);

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
        <Aurora ref="aurora" :config="config" />
    </div>
</template>
