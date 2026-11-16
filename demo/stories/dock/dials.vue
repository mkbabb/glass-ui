<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import DialsStage from "./dials.stage.vue";

const snippet = `<GlassDock :collapse="false" fit-content aria-label="Filters">
    <span>Range</span>
    <SegmentedTabs v-model="range" :options="ranges" aria-label="Range" />
    <DockSeparator />
    <span>Scale</span>
    <SegmentedTabs v-model="scale" :options="scales" aria-label="Scale" />
    <DockSeparator />
    <DockControl aria-label="Previous year" @click="year--"><ChevronLeft /></DockControl>
    <span>{{ year }}</span>
    <DockControl aria-label="Next year" @click="year++"><ChevronRight /></DockControl>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <DialsStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
