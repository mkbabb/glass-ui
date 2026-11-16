<script setup lang="ts">
import { ref } from "vue";
import { useConfiguratorState } from "@glass/components/configurator";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryEditor from "../../chassis/editor/StoryEditor.vue";
import FourierStage from "./fourier-field.stage.vue";
import FourierControls from "./fourier-field/FourierControls.vue";
import PauseControl from "./shared/PauseControl.vue";
import { FOURIER_PRESETS, type FourierStudio } from "./fourier-field/studio";

const studio = useConfiguratorState<FourierStudio>({
    presets: FOURIER_PRESETS,
    initialPreset: FOURIER_PRESETS[0]!.key,
    cloneMode: "per-preset",
});
const paused = ref(false);
</script>

<template>
    <StoryPage form="editor">
        <template #stage>
            <StoryEditor
                :presets="FOURIER_PRESETS"
                :active-preset="studio.activePreset.value"
                @select-preset="studio.selectPreset"
                @reset="studio.resetCurrent"
            >
                <template #stage>
                    <FourierStage :studio="studio.config" :paused="paused" />
                    <PauseControl v-model:paused="paused" />
                </template>
                <template #controls>
                    <FourierControls :config="studio.config" />
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>
