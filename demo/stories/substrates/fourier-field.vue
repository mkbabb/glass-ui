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
// Where the field cannot draw, nothing runs, so there is nothing to pause.
const unavailable = ref(false);
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
                    <FourierStage
                        v-model:unavailable="unavailable"
                        :studio="studio.config"
                        :paused="paused"
                    />
                    <Transition name="fourier-pause">
                        <PauseControl v-if="!unavailable" v-model:paused="paused" />
                    </Transition>
                </template>
                <template #controls>
                    <FourierControls :config="studio.config" />
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>

<style scoped>
.fourier-pause-leave-active {
    transition: opacity var(--duration-normal) var(--ease-out);
}

.fourier-pause-leave-to {
    opacity: 0;
}
</style>
