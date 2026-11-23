<script setup lang="ts">
// One Blob, centred and as large as the box allows while staying square. It leans
// toward the pointer and pulses on a press. The renderer it armed and that renderer's
// phase sit on its own element as `data-renderer` and `data-state`, with no visible text.
import { onMounted, reactive, ref, watch } from "vue";
import { Blob } from "@glass/components/blob";
import type { RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";
import { BLOB_PRESETS, applyBlobStudio, toBlobConfig, type BlobStudio } from "./blob/studio";

const props = withDefaults(
    defineProps<{ studio?: BlobStudio; pressable?: boolean }>(),
    { studio: () => BLOB_PRESETS[0]!.config, pressable: true },
);
const paused = defineModel<boolean>("paused", { default: false });

const config = reactive(toBlobConfig(props.studio));
watch(
    () => props.studio,
    (s) => applyBlobStudio(config, s),
    { deep: true },
);

const blob = ref<InstanceType<typeof Blob> | null>(null);
const renderer = ref<RendererStatus | null>(null);
onMounted(() => blob.value?.setMood(props.studio.mood));
watch(
    () => props.studio.mood,
    (m) => blob.value?.setMood(m),
);
</script>

<template>
    <div class="blob-stage">
        <div class="blob-stage-box">
            <Blob
                ref="blob"
                v-model:paused="paused"
                color="var(--card)"
                :config="config"
                seed="studio"
                :press-label="pressable ? 'Pulse the blob' : undefined"
                :data-renderer="renderer?.engine"
                :data-state="renderer?.phase"
                @renderer-status="renderer = $event"
            />
        </div>
    </div>
</template>

<style scoped>
.blob-stage {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    container-type: size;
}

/* The largest square inside both axes, with room for the satellites' orbit. */
.blob-stage-box {
    position: relative;
    aspect-ratio: 1;
    inline-size: min(78cqi, 78cqb, 36rem);
}
</style>
