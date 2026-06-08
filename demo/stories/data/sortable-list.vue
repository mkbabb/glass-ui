<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { computed, defineComponent, h, inject, ref } from "vue";
import { GripVertical } from "@lucide/vue";
import {
    SortableList,
    SortableItem,
    SortableHandle,
    SORTABLE_CONTEXT,
} from "../../../src/components/custom/sortable-list";
import { cn } from "../../../src/utils/cn";

interface Task {
    id: string;
    label: string;
    tone: string; // section-N
}

// Single-list source
const tasks = ref<Task[]>([
    { id: "t1", label: "Draft spec",            tone: "0" },
    { id: "t2", label: "Review pull requests",  tone: "2" },
    { id: "t3", label: "Pair on dock layer FLIP", tone: "4" },
    { id: "t4", label: "Tune cartoon shadows",  tone: "5" },
    { id: "t5", label: "Write changelog",       tone: "7" },
]);

const handleOnlyTasks = ref<Task[]>([
    { id: "h1", label: "Pin keyboard affordance", tone: "1" },
    { id: "h2", label: "Check drag ghost offset", tone: "3" },
    { id: "h3", label: "Verify handle selector",  tone: "5" },
    { id: "h4", label: "Record context readout",  tone: "8" },
]);

// Story-local consumer proving SORTABLE_CONTEXT can be read by descendants.
const SortableContextReadout = defineComponent({
    name: "SortableContextReadout",
    setup() {
        const sortable = inject(SORTABLE_CONTEXT);
        const readout = computed(() => {
            if (!sortable) return "missing";
            return [
                `isDragging=${sortable.isDragging.value}`,
                `dragId=${sortable.dragId.value ?? "none"}`,
                `dropIndex=${sortable.dropIndex.value ?? "none"}`,
            ].join(" | ");
        });

        return () =>
            h(
                "div",
                {
                    class: "flex flex-wrap items-center gap-2 rounded-md border border-border/70 bg-muted/40 px-3 py-2 text-mono-caption text-muted-foreground",
                    "data-sortable-context-readout": "",
                },
                [
                    h("span", { class: "text-foreground" }, "SORTABLE_CONTEXT"),
                    h("span", readout.value),
                ],
            );
    },
});

// Cross-list: Todo / Doing / Done — share the same `group="kanban"`.
interface Card {
    id: string;
    title: string;
}

const todo = ref<Card[]>([
    { id: "k1", title: "Audit token cascade" },
    { id: "k2", title: "Write tags-input story" },
    { id: "k3", title: "Port math-paper hero" },
]);
const doing = ref<Card[]>([
    { id: "k4", title: "Configurator reset" },
]);
const done = ref<Card[]>([
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
        <!-- SINGLE LIST -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Single list · drag the grip to reorder
            </p>
            <SortableList
                :items="tasks"
                :get-id="(t) => t.id"
                class="flex flex-col gap-2 rounded-card border border-border bg-card p-3 shadow-cartoon"
                @reorder="tasks = $event"
            >
                <SortableItem
                    v-for="t in tasks"
                    :key="t.id"
                    :id="t.id"
                    class="flex items-center gap-3 rounded-md border border-border/70 bg-background px-3 py-2.5"
                >
                    <!-- Default span grip: role="button" + tabindex auto-emitted;
                         bind the reorder context via aria-label. -->
                    <SortableHandle
                        class="text-muted-foreground hover:text-foreground"
                        :aria-label="`Reorder ${t.label}`"
                    >
                        <span class="fira-code leading-none">⋮⋮</span>
                    </SortableHandle>
                    <span
                        class="h-2 w-2 rounded-full"
                        :style="{ background: `var(--section-color-${t.tone})` }"
                    />
                    <span class="text-small">{{ t.label }}</span>
                </SortableItem>
            </SortableList>
        </div>

        <!-- HANDLE-ONLY + CONTEXT CONSUMER -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Handle-only · context readout is injected inside the list
            </p>
            <SortableList
                :items="handleOnlyTasks"
                :get-id="(t) => t.id"
                handle-selector="[data-sortable-handle]"
                class="flex flex-col gap-2 rounded-card border border-border bg-card p-3 shadow-cartoon"
                @reorder="handleOnlyTasks = $event"
            >
                <SortableContextReadout />
                <SortableItem
                    v-for="t in handleOnlyTasks"
                    :key="t.id"
                    :id="t.id"
                    class="flex items-center gap-3 rounded-md border border-border/70 bg-background px-3 py-2.5"
                >
                    <SortableHandle
                        as="button"
                        type="button"
                        class="rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        :aria-label="`Drag ${t.label}`"
                    >
                        <GripVertical class="size-4" />
                    </SortableHandle>
                    <span
                        class="h-2 w-2 rounded-full"
                        :style="{ background: `var(--section-color-${t.tone})` }"
                    />
                    <span class="text-small">{{ t.label }}</span>
                </SortableItem>
            </SortableList>
        </div>

        <!-- CROSS-LIST -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Cross-list · drop between columns (group="kanban")
            </p>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <!-- Todo -->
                <div :class="cn('flex flex-col gap-2 rounded-card border border-border bg-card p-3 shadow-cartoon')">
                    <header class="flex items-center justify-between px-1">
                        <span class="text-admin-label">Todo</span>
                        <span class="text-mono-caption text-muted-foreground">
                            {{ todo.length }}
                        </span>
                    </header>
                    <SortableList
                        group="kanban"
                        :items="todo"
                        :get-id="(c) => c.id"
                        class="flex min-h-24 flex-col gap-2"
                        @reorder="todo = $event as Card[]"
                        @insert="(i, item) => (todo = insertAt(todo, i, item as Card))"
                    >
                        <SortableItem
                            v-for="c in todo"
                            :key="c.id"
                            :id="c.id"
                            class="rounded-md border border-border/70 bg-background p-3 text-small shadow-cartoon-sm"
                        >
                            <SortableHandle class="mr-2 text-muted-foreground">⋮⋮</SortableHandle>
                            {{ c.title }}
                        </SortableItem>
                    </SortableList>
                </div>

                <!-- Doing -->
                <div :class="cn('flex flex-col gap-2 rounded-card border border-section-5/40 bg-section-5/5 p-3 shadow-cartoon')">
                    <header class="flex items-center justify-between px-1">
                        <span class="text-admin-label text-section-5">Doing</span>
                        <span class="text-mono-caption text-muted-foreground">
                            {{ doing.length }}
                        </span>
                    </header>
                    <SortableList
                        group="kanban"
                        :items="doing"
                        :get-id="(c) => c.id"
                        class="flex min-h-24 flex-col gap-2"
                        @reorder="doing = $event as Card[]"
                        @insert="(i, item) => (doing = insertAt(doing, i, item as Card))"
                    >
                        <SortableItem
                            v-for="c in doing"
                            :key="c.id"
                            :id="c.id"
                            class="rounded-md border border-border/70 bg-background p-3 text-small shadow-cartoon-sm"
                        >
                            <SortableHandle class="mr-2 text-muted-foreground">⋮⋮</SortableHandle>
                            {{ c.title }}
                        </SortableItem>
                    </SortableList>
                </div>

                <!-- Done -->
                <div :class="cn('flex flex-col gap-2 rounded-card border border-section-4/40 bg-section-4/5 p-3 shadow-cartoon')">
                    <header class="flex items-center justify-between px-1">
                        <span class="text-admin-label text-section-4">Done</span>
                        <span class="text-mono-caption text-muted-foreground">
                            {{ done.length }}
                        </span>
                    </header>
                    <SortableList
                        group="kanban"
                        :items="done"
                        :get-id="(c) => c.id"
                        class="flex min-h-24 flex-col gap-2"
                        @reorder="done = $event as Card[]"
                        @insert="(i, item) => (done = insertAt(done, i, item as Card))"
                    >
                        <SortableItem
                            v-for="c in done"
                            :key="c.id"
                            :id="c.id"
                            class="rounded-md border border-border/70 bg-background p-3 text-small opacity-70 shadow-cartoon-sm"
                        >
                            <SortableHandle class="mr-2 text-muted-foreground">⋮⋮</SortableHandle>
                            <span class="line-through">{{ c.title }}</span>
                        </SortableItem>
                    </SortableList>
                </div>
            </div>
        </div>
    </StoryPage>
</template>
