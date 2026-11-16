<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import FigureToolsStage from "./figure-tools.stage.vue";

const face = ref<"handle" | "words">("handle");

const snippet = `<GlassDock
    collapse="closed"
    expand-on="press"
    fit-content
    collapsed-label="Tools for Revenue"
>
    <template #collapsed><MoreHorizontal /></template>
    <DockControl aria-label="Download"><Download /></DockControl>
    <DockControl aria-label="Enlarge"><Maximize2 /></DockControl>
    <template #persistent-end>
        <DockControl aria-label="Table view" :active="table"><Table2 /></DockControl>
    </template>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <FigureToolsStage :face="face" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="face"
                    label="Folded face"
                    :options="[
                        { value: 'handle', label: 'Handle' },
                        { value: 'words', label: 'Words' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
