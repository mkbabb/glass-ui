<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ActionRowStage from "./action-row.stage.vue";

const snippet = `<header class="flex items-center justify-between">
    <CardTitle>card.css</CardTitle>
    <GlassDock :collapse="false" fit-content aria-label="Stylesheet actions">
        <DockControl shape="tab" @click="apply">Apply</DockControl>
        <DockControl shape="tab" @click="copy">Copy</DockControl>
        <DockControl shape="tab" @click="format">Format</DockControl>
    </GlassDock>
</header>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <ActionRowStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
