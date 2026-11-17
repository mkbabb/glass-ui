<script setup lang="ts">
// MEASURE-8: m6/comp/StoryStage.vue (the demo's StoryStage, read-only copy) with one prop more, `ceiling`, the Aurora's
// opacity ceiling (the demo's 0.55 by default; daraksha's ground passes its own, RU-85).
import { computed, useTemplateRef } from "vue";
import { Aurora, type AuroraConfig } from "@glass/components/aurora";
import {
    useGlassBackdropLuminance,
    GLASS_BACKDROP_SHARED_ATTR,
} from "@glass/composables/glass/useGlassBackdropLuminance";
import { heroAuroraConfig } from "../../../chassis/hero/aurora-hero";

const props = withDefaults(
    defineProps<{
        size: "tall" | "fit";
        field?: boolean;
        fieldConfig?: AuroraConfig;
        ceiling?: number;
    }>(),
    { field: false, ceiling: 0.55 },
);

const auroraRef = useTemplateRef<{ canvasRef: HTMLCanvasElement | null }>("auroraRef");
const backgroundCanvas = computed(() => auroraRef.value?.canvasRef ?? null);
const config = computed(() => props.fieldConfig ?? heroAuroraConfig("cat-dock"));

const stageEl = useTemplateRef<HTMLElement>("stageEl");
if (props.field) {
    useGlassBackdropLuminance(stageEl, {
        backgroundCanvas: () => backgroundCanvas.value,
        shared: true,
    });
}
</script>

<template>
    <div
        ref="stageEl"
        class="story-stage-box"
        :data-story-stage="size"
        v-bind="field ? { [GLASS_BACKDROP_SHARED_ATTR]: '' } : {}"
    >
        <Aurora
            v-if="field"
            ref="auroraRef"
            :config="config"
            :opacity-ceiling="ceiling"
            :runtime-options="{ preserveDrawingBuffer: true }"
            data-glass-field-canvas
            class="story-stage-field"
            aria-hidden="true"
        />
        <slot :background-canvas="backgroundCanvas" />
    </div>
</template>

<style scoped>
.story-stage-box {
    isolation: isolate;
}
.story-stage-field {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
}
</style>
