<script setup lang="ts">
import { ref } from "vue";
import { useConfiguratorState } from "@glass/components/configurator";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryEditor from "../../chassis/editor/StoryEditor.vue";
import BlobStage from "./blob.stage.vue";
import BlobControls from "./blob/BlobControls.vue";
import PauseControl from "./shared/PauseControl.vue";
import { BLOB_PRESETS, type BlobStudio } from "./blob/studio";

const studio = useConfiguratorState<BlobStudio>({
    presets: BLOB_PRESETS,
    initialPreset: BLOB_PRESETS[0]!.key,
    cloneMode: "per-preset",
});
const paused = ref(false);
</script>

<template>
    <StoryPage form="editor">
        <template #stage>
            <StoryEditor
                :presets="BLOB_PRESETS"
                :active-preset="studio.activePreset.value"
                @select-preset="studio.selectPreset"
                @reset="studio.resetCurrent"
            >
                <template #stage>
                    <BlobStage v-model:paused="paused" :studio="studio.config" />
                    <PauseControl v-model:paused="paused" />
                </template>
                <template #controls>
                    <BlobControls :config="studio.config" />
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>
