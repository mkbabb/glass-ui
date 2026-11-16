<script setup lang="ts">
import { ref } from "vue";
import { ConfiguratorLayer, useConfiguratorState } from "@glass/components/configurator";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryEditor from "../../chassis/editor/StoryEditor.vue";
import SpringsStage from "./springs.stage.vue";
import SliderRow from "./springs/SliderRow.vue";
import { curvePresets, type CurveConfig, type CurveKind } from "./springs/curve";

const presets = curvePresets();
const studio = useConfiguratorState<CurveConfig>({
    presets,
    initialPreset: "panel",
});

// The open layer is the curve being played: Spring or Easing.
const open = ref<CurveKind | null>(studio.config.kind);
const version = ref(0);

function setOpen(kind: CurveKind, v: boolean): void {
    open.value = v ? kind : null;
    if (v && studio.config.kind !== kind) {
        studio.config.kind = kind;
        version.value++;
    }
}

function selectPreset(key: string): void {
    studio.selectPreset(key);
    open.value = studio.config.kind;
    version.value++;
}

function reset(): void {
    studio.resetCurrent();
    open.value = studio.config.kind;
    version.value++;
}
</script>

<template>
    <StoryPage form="editor">
        <template #stage>
            <StoryEditor
                :presets="presets"
                :active-preset="studio.activePreset.value"
                @select-preset="selectPreset"
                @reset="reset"
            >
                <template #stage>
                    <SpringsStage :config="studio.config" :version="version" />
                </template>
                <template #controls>
                    <ConfiguratorLayer
                        label="Spring"
                        :open="open === 'spring'"
                        @update:open="setOpen('spring', !!$event)"
                    >
                        <SliderRow v-model="studio.config.response" label="Response" :min="0.1" :max="1.2" :step="0.01" />
                        <SliderRow v-model="studio.config.damping" label="Damping" :min="0.2" :max="1.5" :step="0.01" />
                    </ConfiguratorLayer>
                    <ConfiguratorLayer
                        label="Easing"
                        :open="open === 'ease'"
                        @update:open="setOpen('ease', !!$event)"
                    >
                        <SliderRow v-model="studio.config.x1" label="Start x" :min="0" :max="1" :step="0.01" />
                        <SliderRow v-model="studio.config.y1" label="Start y" :min="-0.5" :max="1.5" :step="0.01" />
                        <SliderRow v-model="studio.config.x2" label="End x" :min="0" :max="1" :step="0.01" />
                        <SliderRow v-model="studio.config.y2" label="End y" :min="-0.5" :max="1.5" :step="0.01" />
                        <SliderRow v-model="studio.config.duration" label="Duration" :min="100" :max="1500" :step="10" />
                    </ConfiguratorLayer>
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>
