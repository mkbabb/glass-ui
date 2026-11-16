<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import AccordionStage from "./accordion.stage.vue";

type Mode = "single" | "multiple" | "one";

const mode = ref<Mode>("single");

const MODES: { value: Mode; label: string }[] = [
    { value: "single", label: "Single" },
    { value: "multiple", label: "Multiple" },
    { value: "one", label: "One panel" },
];

const snippet = `<Accordion type="single" collapsible default-value="ship">
    <AccordionItem value="ship">
        <AccordionTrigger>When will my order arrive?</AccordionTrigger>
        <AccordionContent>In three to five working days.</AccordionContent>
    </AccordionItem>
</Accordion>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <AccordionStage :mode="mode" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="mode" label="Opens" :options="MODES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
