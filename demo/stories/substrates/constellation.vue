<script setup lang="ts">
import { useConfiguratorState } from "@glass/components/configurator";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryEditor from "../../chassis/editor/StoryEditor.vue";
import ConstellationStage from "./constellation.stage.vue";
import ConstellationControls from "./constellation/ConstellationControls.vue";
import { CONSTELLATION_PRESETS, type ConstellationStudio } from "./constellation/studio";

const studio = useConfiguratorState<ConstellationStudio>({
    presets: CONSTELLATION_PRESETS,
    initialPreset: CONSTELLATION_PRESETS[0]!.key,
    cloneMode: "per-preset",
});
</script>

<template>
    <StoryPage form="editor">
        <template #stage>
            <StoryEditor
                :presets="CONSTELLATION_PRESETS"
                :active-preset="studio.activePreset.value"
                @select-preset="studio.selectPreset"
                @reset="studio.resetCurrent"
            >
                <template #stage>
                    <ConstellationStage :studio="studio.config" />
                </template>
                <template #controls>
                    <ConstellationControls :config="studio.config" />
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>
