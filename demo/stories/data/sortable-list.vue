<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { GripVertical } from "@lucide/vue";
import {
    SortableList,
    SortableItem,
    SortableHandle,
} from "@glass/components/sortable-list";

interface Task {
    id: string;
    label: string;
    tone: string; // section-N
}

// Single-list source
const tasks = ref<Task[]>([
    { id: "t1", label: "Draft spec", tone: "0" },
    { id: "t2", label: "Review pull requests", tone: "2" },
    { id: "t3", label: "Pair on dock layer FLIP", tone: "4" },
    { id: "t4", label: "Tune cartoon shadows", tone: "5" },
    { id: "t5", label: "Write changelog", tone: "7" },
]);

const handleOnlyTasks = ref<Task[]>([
    { id: "h1", label: "Pin keyboard affordance", tone: "1" },
    { id: "h2", label: "Check drag ghost offset", tone: "3" },
    { id: "h3", label: "Verify handle selector", tone: "5" },
    { id: "h4", label: "Confirm keyboard reorder", tone: "8" },
]);

// Cross-list: Todo / Doing / Done — share the same `group="kanban"`.
interface KanbanCard {
    id: string;
    title: string;
}

const todo = ref<KanbanCard[]>([
    { id: "k1", title: "Audit token cascade" },
    { id: "k2", title: "Write sortable-list story" },
    { id: "k3", title: "Port math-paper hero" },
]);
const doing = ref<KanbanCard[]>([{ id: "k4", title: "Configurator reset" }]);
const done = ref<KanbanCard[]>([
    { id: "k5", title: "Data-table filter" },
    { id: "k6", title: "Avatar fallbacks" },
]);

function insertAt<T>(list: T[], index: number, item: T): T[] {
    const next = [...list];
    next.splice(index, 0, item);
    return next;
}
</script>

<template>
    <StoryPage>
        <!--
            THE ROW IS THE COMPONENT'S NOW, not the story's. Six call sites used to
            invent four row treatments, four grips, three radii and three paddings
            between them, because `SortableItem` shipped a `user-select` rule and
            nothing else. Every one of those inventions is deleted here: the story
            supplies CONTENT and the library supplies the surface.

            F13's receipt is the two-pole row — a trailing element in the default slot
            makes the row span its measure instead of hugging a label at the left edge,
            which is what left 74.9% of the box empty at 1440 and 81.2% at 1920. The
            The 2-up page wrapper is ABSORBED: the two parallel single-list sections
            are cel-field items now, so they pack 2-up exactly when two cels fit and
            fall to one file when they do not — the same arrangement, without a `md:`
            breakpoint asking the viewport about a column it never measured.
        -->
        <StorySection heading="Single list" blurb="Drag the grip to reorder.">
            <SortableList
                :items="tasks"
                :get-id="(t) => t.id"
                :get-label="(t) => t.label"
                label="Tasks"
                @reorder="tasks = $event"
            >
                <SortableItem v-for="t in tasks" :key="t.id" :id="t.id">
                    <SortableHandle>
                        <GripVertical :size="16" />
                    </SortableHandle>
                    <span>{{ t.label }}</span>
                    <span
                        class="size-2 rounded-full"
                        :style="{ background: `var(--section-color-${t.tone})` }"
                    />
                </SortableItem>
            </SortableList>
        </StorySection>

        <StorySection
            heading="Handle-only"
            blurb="Only the grip button starts a drag — the row body stays selectable text."
        >
            <SortableList
                :items="handleOnlyTasks"
                :get-id="(t) => t.id"
                :get-label="(t) => t.label"
                label="Handle-only tasks"
                handle-selector="[data-sortable-handle]"
                @reorder="handleOnlyTasks = $event"
            >
                <SortableItem
                    v-for="t in handleOnlyTasks"
                    :key="t.id"
                    :id="t.id"
                    :disabled="t.id === 'h3'"
                >
                    <SortableHandle>
                        <GripVertical :size="16" />
                    </SortableHandle>
                    <span>{{ t.label }}</span>
                    <span
                        class="size-2 rounded-full"
                        :style="{ background: `var(--section-color-${t.tone})` }"
                    />
                </SortableItem>
            </SortableList>
        </StorySection>

        <!-- `span="full"` because the kanban pins its OWN field: three drop columns
             that must read as one board. A section carrying its own multi-column
             arrangement is not a cel — it is the row. -->
        <StorySection
            span="full"
            heading="Cross-list"
            blurb='Drop between columns — the three lists share group="kanban". An empty
                column grows to the size of what it is about to receive.'
        >
            <div class="story-field">
                <div v-for="column in [
                    { name: 'Todo', tone: '2', list: todo, set: (v: KanbanCard[]) => (todo = v) },
                    { name: 'Doing', tone: '5', list: doing, set: (v: KanbanCard[]) => (doing = v) },
                    { name: 'Done', tone: '4', list: done, set: (v: KanbanCard[]) => (done = v) },
                ]" :key="column.name" class="flex flex-col gap-2">
                    <header class="flex items-center justify-between px-1">
                        <span :class="`text-small text-section-${column.tone}`">
                            {{ column.name }}
                        </span>
                        <span class="text-mono-small text-muted-foreground">
                            {{ column.list.length }}
                        </span>
                    </header>
                    <SortableList
                        group="kanban"
                        :label="column.name"
                        :items="column.list"
                        :get-id="(c) => c.id"
                        :get-label="(c) => c.title"
                        @reorder="column.set($event as KanbanCard[])"
                        @insert="
                            (i, item) =>
                                column.set(
                                    insertAt(column.list, i, item as KanbanCard),
                                )
                        "
                    >
                        <SortableItem
                            v-for="c in column.list"
                            :key="c.id"
                            :id="c.id"
                        >
                            <SortableHandle>
                                <GripVertical :size="16" />
                            </SortableHandle>
                            <span>{{ c.title }}</span>
                        </SortableItem>
                    </SortableList>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
