<script setup lang="ts">
// StoryStage: the page's one stage. A box the full width of the article, keyed to its
// own width, holding the live component and nothing the page authored. `field` mounts
// one Aurora inside the box for a glass subject, with the shared backdrop-luminance
// observer so glass over it reads the field it frosts.
import { computed, useTemplateRef } from "vue";
import { Aurora, type AuroraConfig } from "@glass/components/aurora";
import {
    useGlassBackdropLuminance,
    GLASS_BACKDROP_SHARED_ATTR,
} from "@glass/composables/glass/useGlassBackdropLuminance";
import { heroAuroraConfig } from "../hero/aurora-hero";

const props = withDefaults(
    defineProps<{
        size: "tall" | "fit";
        /** Mount one Aurora behind the subject, inside the box. */
        field?: boolean;
        fieldConfig?: AuroraConfig;
    }>(),
    { field: false },
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
            :opacity-ceiling="0.55"
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
