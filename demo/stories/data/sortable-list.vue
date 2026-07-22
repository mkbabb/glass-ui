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
import { Card, CardContent } from "@glass/components/card";

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
    { id: "k2", title: "Write tags-input story" },
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
            F14 responsive audit (BJ.W-RESPONSIVE-AUDIT): the two single-column
            list demos each wasted the full desktop measure (F13). They are
            parallel specimens, so they pair 2-up at ≥md and stack single-file at
            mobile — the horizontal space is used, the 390px column is preserved.
        -->
        <div class="grid items-start gap-6 md:grid-cols-2">
            <StorySection heading="Single list" blurb="Drag the grip to reorder.">
                <Card size="sm" surface="veil">
                    <CardContent>
                        <SortableList
                            :items="tasks"
                            :get-id="(t) => t.id"
                            :get-label="(t) => t.label"
                            label="Tasks"
                            class="flex flex-col gap-2"
                            @reorder="tasks = $event"
                        >
                            <SortableItem
                                v-for="t in tasks"
                                :key="t.id"
                                :id="t.id"
                                class="flex items-center gap-3 rounded-md border border-border/70 bg-background px-3 py-2.5"
                            >
                                <SortableHandle
                                    class="text-muted-foreground hover:text-foreground"
                                    :aria-label="`Reorder ${t.label}`"
                                >
                                    <span class="fira-code leading-none">⋮⋮</span>
                                </SortableHandle>
                                <span
                                    class="h-2 w-2 rounded-full"
                                    :style="{
                                        background: `var(--section-color-${t.tone})`,
                                    }"
                                />
                                <span class="text-small">{{ t.label }}</span>
                            </SortableItem>
                        </SortableList>
                    </CardContent>
                </Card>
            </StorySection>

            <StorySection
                heading="Handle-only"
                blurb="Only the grip button starts a drag — the row body stays selectable text."
            >
                <Card size="sm" surface="veil">
                    <CardContent>
                        <SortableList
                            :items="handleOnlyTasks"
                            :get-id="(t) => t.id"
                            :get-label="(t) => t.label"
                            label="Handle-only tasks"
                            handle-selector="[data-sortable-handle]"
                            class="flex flex-col gap-2"
                            @reorder="handleOnlyTasks = $event"
                        >
                            <SortableItem
                                v-for="t in handleOnlyTasks"
                                :key="t.id"
                                :id="t.id"
                                :disabled="t.id === 'h3'"
                                class="flex items-center gap-3 rounded-md border border-border/70 bg-background px-3 py-2.5"
                            >
                                <SortableHandle
                                    type="button"
                                    class="rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                                    :aria-label="`Drag ${t.label}`"
                                >
                                    <GripVertical class="size-4" />
                                </SortableHandle>
                                <span
                                    class="h-2 w-2 rounded-full"
                                    :style="{
                                        background: `var(--section-color-${t.tone})`,
                                    }"
                                />
                                <span class="text-small">{{ t.label }}</span>
                            </SortableItem>
                        </SortableList>
                    </CardContent>
                </Card>
            </StorySection>
        </div>

        <StorySection
            heading="Cross-list"
            blurb='Drop between columns — the three lists share group="kanban".'
        >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <!-- Todo -->
                <Card size="sm" surface="veil">
                    <CardContent class="flex flex-col gap-2">
                        <header class="flex items-center justify-between px-1">
                            <span class="text-small">Todo</span>
                            <span class="text-mono-small text-muted-foreground">
                                {{ todo.length }}
                            </span>
                        </header>
                        <SortableList
                            group="kanban"
                            label="Todo"
                            :items="todo"
                            :get-id="(c) => c.id"
                            :get-label="(c) => c.title"
                            class="flex min-h-24 flex-col gap-2"
                            @reorder="todo = $event as KanbanCard[]"
                            @insert="
                                (i, item) =>
                                    (todo = insertAt(todo, i, item as KanbanCard))
                            "
                        >
                            <SortableItem
                                v-for="c in todo"
                                :key="c.id"
                                :id="c.id"
                                class="rounded-md border border-border/70 bg-background p-3 text-small shadow-cartoon-sm"
                            >
                                <SortableHandle class="mr-2 text-muted-foreground"
                                    >⋮⋮</SortableHandle
                                >
                                {{ c.title }}
                            </SortableItem>
                        </SortableList>
                    </CardContent>
                </Card>

                <!-- Doing -->
                <Card size="sm" surface="veil" class="border-section-5/40">
                    <CardContent class="flex flex-col gap-2">
                        <header class="flex items-center justify-between px-1">
                            <span class="text-small text-section-5">Doing</span>
                            <span class="text-mono-small text-muted-foreground">
                                {{ doing.length }}
                            </span>
                        </header>
                        <SortableList
                            group="kanban"
                            label="Doing"
                            :items="doing"
                            :get-id="(c) => c.id"
                            :get-label="(c) => c.title"
                            class="flex min-h-24 flex-col gap-2"
                            @reorder="doing = $event as KanbanCard[]"
                            @insert="
                                (i, item) =>
                                    (doing = insertAt(doing, i, item as KanbanCard))
                            "
                        >
                            <SortableItem
                                v-for="c in doing"
                                :key="c.id"
                                :id="c.id"
                                class="rounded-md border border-border/70 bg-background p-3 text-small shadow-cartoon-sm"
                            >
                                <SortableHandle class="mr-2 text-muted-foreground"
                                    >⋮⋮</SortableHandle
                                >
                                {{ c.title }}
                            </SortableItem>
                        </SortableList>
                    </CardContent>
                </Card>

                <!-- Done -->
                <Card size="sm" surface="veil" class="border-section-4/40">
                    <CardContent class="flex flex-col gap-2">
                        <header class="flex items-center justify-between px-1">
                            <span class="text-small text-section-4">Done</span>
                            <span class="text-mono-small text-muted-foreground">
                                {{ done.length }}
                            </span>
                        </header>
                        <SortableList
                            group="kanban"
                            label="Done"
                            :items="done"
                            :get-id="(c) => c.id"
                            :get-label="(c) => c.title"
                            class="flex min-h-24 flex-col gap-2"
                            @reorder="done = $event as KanbanCard[]"
                            @insert="
                                (i, item) =>
                                    (done = insertAt(done, i, item as KanbanCard))
                            "
                        >
                            <SortableItem
                                v-for="c in done"
                                :key="c.id"
                                :id="c.id"
                                class="rounded-md border border-border/70 bg-background p-3 text-small opacity-70 shadow-cartoon-sm"
                            >
                                <SortableHandle class="mr-2 text-muted-foreground"
                                    >⋮⋮</SortableHandle
                                >
                                <span class="line-through">{{ c.title }}</span>
                            </SortableItem>
                        </SortableList>
                    </CardContent>
                </Card>
            </div>
        </StorySection>
    </StoryPage>
</template>
