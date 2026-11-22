<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import CornerControlsStage from "./corner-controls.stage.vue";

const count = ref<"one" | "several">("one");

const snippet = `<GlassDock
    collapse="closed"
    expand-on="press"
    fit-content
    collapsed-label="Page controls"
>
    <template #collapsed><SlidersHorizontal /></template>
    <DockControl aria-label="Shuffle"><Shuffle /></DockControl>
    <DockControl aria-label="Undo"><Undo2 /></DockControl>
    <DockControl aria-label="Share"><Share2 /></DockControl>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <CornerControlsStage :several="count === 'several'" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="count"
                    label="Actions"
                    :options="[
                        { value: 'one', label: 'One action' },
                        { value: 'several', label: 'Several' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
