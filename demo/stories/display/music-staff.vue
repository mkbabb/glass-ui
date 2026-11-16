<script setup lang="ts">
import { ref } from "vue";
import type { MusicStaffMode } from "@glass/components/music-staff";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import MusicStaffStage from "./music-staff.stage.vue";

const mode = ref<MusicStaffMode>("score");

const snippet = `<script setup lang="ts">
import { MusicStaff } from "@mkbabb/glass-ui/music-staff";

const notes = [
    { id: "a", midi: 64, beat: 0, beats: 1 },
    { id: "b", midi: 67, beat: 1, beats: 0.5 },
];
<\/script>

<template>
    <MusicStaff :notes="notes" label="Score" />
    <MusicStaff mode="loading" label="Loading" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <MusicStaffStage :mode="mode" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="mode"
                    label="Mode"
                    :options="[
                        { value: 'score', label: 'Still' },
                        { value: 'loading', label: 'Streaming' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
