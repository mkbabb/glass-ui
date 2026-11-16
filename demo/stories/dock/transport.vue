<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TransportStage from "./transport.stage.vue";

const snippet = `<GlassDock collapse="closed" fit-content>
    <template #persistent>
        <DockControl :aria-label="playing ? 'Pause' : 'Play'" @click="playing = !playing">
            <Pause v-if="playing" /><Play v-else />
        </DockControl>
    </template>
    <template #collapsed>
        <Progress :model-value="time" :max="length" size="sm" />
    </template>
    <DockControl aria-label="Reset" @click="time = 0"><RotateCcw /></DockControl>
    <span>{{ clock }}</span>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <TransportStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
