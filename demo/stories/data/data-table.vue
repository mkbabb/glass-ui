<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import DataTableStage from "./data-table.stage.vue";

type State = "loaded" | "loading" | "empty" | "error";

const state = ref<State>("loaded");

const STATES: { value: State; label: string }[] = [
    { value: "loaded", label: "Loaded" },
    { value: "loading", label: "Loading" },
    { value: "empty", label: "Empty" },
    { value: "error", label: "Error" },
];

const snippet = `<DataTable
    v-model:selected-row-id="selected"
    :columns="[
        { key: 'title', label: 'Title', sortable: true },
        { key: 'year', label: 'Year', sortable: true, align: 'right' },
    ]"
    :rows="books"
    :sort="sort"
    :status="loading ? 'loading' : 'ready'"
    selectable
    @update:sort="sort = $event"
>
</DataTable>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <DataTableStage :state="state" />
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
