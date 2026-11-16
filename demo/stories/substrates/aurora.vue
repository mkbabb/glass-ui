<script setup lang="ts">
import { ref } from "vue";
import { useConfiguratorState } from "@glass/components/configurator";
import type { AuroraConfig } from "@glass/components/aurora";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryEditor from "../../chassis/editor/StoryEditor.vue";
import AuroraStage from "./aurora.stage.vue";
import AuroraControls from "./aurora/AuroraControls.vue";
import PauseControl from "./shared/PauseControl.vue";
import { AURORA_PRESETS } from "./aurora/presets";

const studio = useConfiguratorState<AuroraConfig>({
    presets: AURORA_PRESETS,
    initialPreset: AURORA_PRESETS[0]!.key,
    cloneMode: "per-preset",
});
const paused = ref(false);
</script>

<template>
    <StoryPage form="editor">
        <template #stage>
            <StoryEditor
                :presets="AURORA_PRESETS"
                :active-preset="studio.activePreset.value"
                @select-preset="studio.selectPreset"
                @reset="studio.resetCurrent"
            >
                <template #stage>
                    <AuroraStage :config="studio.config" :paused="paused" />
                    <PauseControl v-model:paused="paused" />
                </template>
                <template #controls>
                    <AuroraControls
                        :config="studio.config"
                        :preset-key="studio.activePreset.value"
                    />
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>
