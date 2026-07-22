<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref, watch } from "vue";
import { DataTable } from "@glass/components/data-table";
import type {
    DataTableColumn,
    DataTableSort,
    DataTableStatus,
} from "@glass/components/data-table";
import { Input } from "@glass/components/input";
import { Button } from "@glass/components/button";

interface Repo {
    _id: string;
    name: string;
    language: string;
    stars: number;
    issues: number;
    updated: string;
}

const rows: Repo[] = [
    {
        _id: "1",
        name: "glass-ui",
        language: "Vue",
        stars: 1284,
        issues: 12,
        updated: "2026-04-20",
    },
    {
        _id: "2",
        name: "Motion engine",
        language: "TypeScript",
        stars: 842,
        issues: 4,
        updated: "2026-04-18",
    },
    {
        _id: "3",
        name: "fourier-analysis",
        language: "Vue",
        stars: 2103,
        issues: 34,
        updated: "2026-04-22",
    },
    {
        _id: "4",
        name: "bbnf-lang",
        language: "Rust",
        stars: 517,
        issues: 8,
        updated: "2026-04-15",
    },
    {
        _id: "5",
        name: "paper-grain",
        language: "CSS",
        stars: 94,
        issues: 1,
        updated: "2026-04-10",
    },
    {
        _id: "6",
        name: "cm-fonts",
        language: "TypeScript",
        stars: 312,
        issues: 3,
        updated: "2026-04-19",
    },
    {
        _id: "7",
        name: "reka-helpers",
        language: "TypeScript",
        stars: 221,
        issues: 5,
        updated: "2026-04-12",
    },
    {
        _id: "8",
        name: "aurora-shader",
        language: "GLSL",
        stars: 638,
        issues: 2,
        updated: "2026-04-21",
    },
];

const filter = ref("");
const sort = ref<DataTableSort | undefined>({ key: "stars", direction: "desc" });
const selectedRowId = ref<PropertyKey | null>("3");
const tabbableRowId = ref<PropertyKey | null>("3");
const inspectedRepoName = ref<string | null>(null);
const scenario = ref<"data" | "virtual" | "loading" | "empty" | "error">("data");
const projection = ref<"wide" | "narrow">("wide");
const scenarioOptions = ["data", "virtual", "loading", "empty", "error"] as const;
const projectionOptions = ["wide", "narrow"] as const;
const selectedRepo = computed(() =>
    rows.find((row) => row._id === selectedRowId.value),
);

const columns: DataTableColumn<Repo>[] = [
    { key: "name", label: "Repository", sortable: true, class: "font-medium" },
    {
        key: "language",
        label: "Language",
        sortable: true,
        class: "text-muted-foreground",
    },
    {
        key: "stars",
        label: "Stars",
        sortable: true,
        align: "right",
        class: "fira-code",
    },
    {
        key: "issues",
        label: "Issues",
        sortable: true,
        align: "right",
        class: "fira-code",
    },
    {
        key: "updated",
        label: "Updated",
        sortable: true,
        align: "right",
        class: "text-mono-small text-muted-foreground",
    },
];

const filtered = computed(() => {
    const q = filter.value.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
        (r) => r.name.toLowerCase().includes(q) || r.language.toLowerCase().includes(q),
    );
});

const sorted = computed(() => {
    if (!sort.value) return filtered.value;
    const { key, direction } = sort.value;
    const mul = direction === "asc" ? 1 : -1;
    return [...filtered.value].sort((a, b) => {
        const av = (a as any)[key];
        const bv = (b as any)[key];
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * mul;
        return String(av).localeCompare(String(bv)) * mul;
    });
});

const status = computed<DataTableStatus>(() =>
    scenario.value === "loading" || scenario.value === "error"
        ? scenario.value
        : "ready",
);
const visibleRows = computed(() => {
    if (["loading", "empty", "error"].includes(scenario.value)) return [];
    return scenario.value === "virtual" ? sorted.value.slice(2, 5) : sorted.value;
});
const filteredState = computed(() => scenario.value === "data" && filter.value.trim() !== "");

function absoluteRowIndex(row: Repo): number {
    return sorted.value.findIndex(({ _id }) => _id === row._id) + 2;
}

function setScenario(next: typeof scenario.value): void {
    scenario.value = next;
    tabbableRowId.value = (next === "virtual" ? sorted.value[2] : sorted.value[0])?._id ?? null;
}

function resetDemo(): void {
    filter.value = "";
    sort.value = { key: "stars", direction: "desc" };
    selectedRowId.value = "3";
    tabbableRowId.value = "3";
    inspectedRepoName.value = null;
    scenario.value = "data";
    projection.value = "wide";
}

watch(filter, () => {
    tabbableRowId.value = filtered.value[0]?._id ?? null;
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="Data table"
            heading="Repository catalogue"
            blurb="Sort, select, reflow, and inspect caller-windowed rows through one controlled shell."
        >
            <div class="flex flex-wrap items-center justify-between gap-3">
                <Input
                    v-model="filter"
                    placeholder="Filter name or language…"
                    class="max-w-xs"
                    :disabled="scenario !== 'data'"
                />
                <div role="group" aria-label="Table state" class="flex flex-wrap gap-1">
                    <Button
                        v-for="option in scenarioOptions"
                        :key="option"
                        size="sm"
                        :emphasis="scenario === option ? 'primary' : 'quiet'"
                        @click="setScenario(option)"
                    >
                        {{ option }}
                    </Button>
                </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 text-small">
                <p aria-live="polite">
                    Selected: <strong>{{ selectedRepo?.name ?? "None" }}</strong>
                    <span class="text-muted-foreground"> · Arrow keys move; Enter or Space selects.</span>
                </p>
                <p class="text-mono-small text-muted-foreground" aria-live="polite">
                    Inspected: {{ inspectedRepoName ?? "None" }}
                </p>
                <div class="flex flex-wrap gap-2">
                    <div role="group" aria-label="Projection" class="flex gap-1">
                        <Button
                            v-for="option in projectionOptions"
                            :key="option"
                            size="sm"
                            :emphasis="projection === option ? 'primary' : 'quiet'"
                            @click="projection = option"
                        >
                            {{ option }}
                        </Button>
                    </div>
                    <Button size="sm" emphasis="quiet" @click="resetDemo">Reset</Button>
                </div>
            </div>

            <div
                :class="[
                    'rounded-card border border-border bg-card shadow-cartoon transition-[max-width] duration-normal',
                    projection === 'narrow' && 'max-w-sm',
                ]"
            >
                <DataTable
                    :columns="columns"
                    :rows="visibleRows"
                    :sort="sort"
                    :status="status"
                    :filtered="filteredState"
                    :aria-row-count="sorted.length + 1"
                    :get-row-index="absoluteRowIndex"
                    v-model:selected-row-id="selectedRowId"
                    v-model:tabbable-row-id="tabbableRowId"
                    row-key="_id"
                    aria-label="Repository catalogue"
                    selectable
                    responsive
                    @update:sort="sort = $event"
                >
                    <template #error>Repository data could not be loaded.</template>
                    <template #empty>No repositories yet.</template>
                    <template #filtered-empty>No repositories match this filter.</template>
                    <template #row-actions="{ row }">
                        <Button
                            size="sm"
                            emphasis="quiet"
                            :aria-label="`Inspect ${row.name}`"
                            @click="inspectedRepoName = row.name"
                        >
                            Inspect
                        </Button>
                    </template>
                </DataTable>
            </div>
        </StorySection>
    </StoryPage>
</template>
