<script setup lang="ts">
// SortableList's stage: one list of five tasks, reordered by the grip or the keyboard.
import { ref } from "vue";
import { GripVertical } from "@lucide/vue";
import { SortableHandle, SortableItem, SortableList } from "@glass/components/sortable-list";

interface Task {
    id: string;
    label: string;
}

const tasks = ref<Task[]>([
    { id: "spec", label: "Draft the spec" },
    { id: "review", label: "Review the open changes" },
    { id: "pair", label: "Pair on the release notes" },
    { id: "test", label: "Run the test plan" },
    { id: "ship", label: "Send the newsletter" },
]);
</script>

<template>
    <div class="sortable-list-stage">
        <SortableList
            class="sortable-list-stage-list"
            :items="tasks"
            :get-id="(t) => t.id"
            :get-label="(t) => t.label"
            label="Tasks"
            @reorder="tasks = $event"
        >
            <SortableItem v-for="t in tasks" :key="t.id" :id="t.id">
                <SortableHandle>
                    <GripVertical :size="16" aria-hidden="true" />
                </SortableHandle>
                <span>{{ t.label }}</span>
            </SortableItem>
        </SortableList>
    </div>
</template>

<style scoped>
.sortable-list-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-5);
}
.sortable-list-stage-list {
    inline-size: min(100%, 30rem);
}
</style>
