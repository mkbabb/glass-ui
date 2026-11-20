<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TimelineStage from "./timeline.stage.vue";

type Mode = "running" | "indeterminate";

const mode = ref<Mode>("running");

const MODES: { value: Mode; label: string }[] = [
    { value: "running", label: "Running" },
    { value: "indeterminate", label: "Indeterminate" },
];

const snippet = `<Timeline
    label="Release"
    current="build"
    :segments="[
        { key: 'design', label: 'Design', at: 0.4, state: 'completed' },
        { key: 'build', label: 'Build', at: 0.7, state: 'active', progress: 0.45 },
        { key: 'launch', label: 'Launch', at: 1 },
    ]"
/>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <TimelineStage :mode="mode" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="mode" label="Progress" :options="MODES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
