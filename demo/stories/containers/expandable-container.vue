<script setup lang="ts">
import { computed, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ExpandableStage from "./expandable-container.stage.vue";

const open = ref(false);
const place = computed({
    get: () => (open.value ? "full" : "inline"),
    set: (v: "inline" | "full") => (open.value = v === "full"),
});

const PLACES: { value: "inline" | "full"; label: string }[] = [
    { value: "inline", label: "In place" },
    { value: "full", label: "Full screen" },
];

const snippet = `<ExpandableContainer v-model:open="open">
    <Surface tier="floating">
        <Table>…</Table>
    </Surface>
</ExpandableContainer>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <ExpandableStage v-model:open="open" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="place" label="Shown" :options="PLACES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
