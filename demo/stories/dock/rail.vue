<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import RailStage from "./rail.stage.vue";

const posture = ref<"folds" | "pinned">("folds");

const snippet = `<GlassDock orientation="vertical" collapse="closed" aria-label="Sections">
    <template #persistent><Crest /></template>
    <DockControl
        v-for="s in sections"
        :key="s.id"
        :active="s.id === section"
        :aria-label="s.label"
        @click="section = s.id"
    >
        <component :is="s.icon" />
    </DockControl>
    <template #persistent-end>
        <DarkModeToggle size="dock" />
    </template>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <RailStage :folds="posture === 'folds'" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="posture"
                    label="Posture"
                    :options="[
                        { value: 'folds', label: 'Folds' },
                        { value: 'pinned', label: 'Pinned open' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
