<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SortableListStage from "./sortable-list.stage.vue";

const snippet = `<SortableList
    :items="tasks"
    :get-id="(t) => t.id"
    :get-label="(t) => t.label"
    @reorder="tasks = $event"
>
    <SortableItem v-for="t in tasks" :key="t.id" :id="t.id">
        <SortableHandle />
        {{ t.label }}
    </SortableItem>
</SortableList>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <SortableListStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
