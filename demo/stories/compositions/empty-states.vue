<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import EmptyStatesStage, { type EmptyState } from "./empty-states.stage.vue";

const state = ref<EmptyState>("empty");

const STATES: { value: EmptyState; label: string }[] = [
    { value: "empty", label: "Empty" },
    { value: "loading", label: "Loading" },
    { value: "error", label: "Error" },
    { value: "no-results", label: "No results" },
];

const snippet = `<Card>
    <CardContent class="flex flex-col items-center gap-3 text-center">
        <Inbox :size="36" aria-hidden="true" />
        <h2 class="text-heading">No projects yet</h2>
        <p>Projects you create will show up here.</p>
        <Button emphasis="secondary" size="sm">New project</Button>
    </CardContent>
</Card>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <EmptyStatesStage :state="state" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="state" label="State" :options="STATES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
