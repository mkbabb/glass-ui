<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
import { DataTable } from "@glass/components/ui/data-table";
import type {
    DataTableColumn,
    DataTableSort,
} from "@glass/components/ui/data-table";
import { Input } from "@glass/components/ui/input";
import { IconChip } from "@glass/components/custom/icon-chip";
import { cn } from "@glass/components/_shared/class-names";
import { Sheet as SheetIcon, Database } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the data band's ONE coherent --section-color-9
// identity. PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip>
// double-header shape).
const DATA_STOP = 9;

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
        name: "keyframes.js",
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
const page = ref(1);
const pageSize = 5;
const sort = ref<DataTableSort | undefined>({ key: "stars", direction: "desc" });

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
        class: "text-mono-caption text-muted-foreground",
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

const paged = computed(() => {
    const start = (page.value - 1) * pageSize;
    return sorted.value.slice(start, start + pageSize);
});
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${DATA_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Database" :section="DATA_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Data · Data table
                </span>
                <p class="text-small text-muted-foreground">
                    Column sorting and filtering helpers — the section identity
                    is the ONE color event.
                </p>
            </div>
        </header>

        <div class="flex items-end justify-between gap-4">
            <!-- D1-5 (AZ.W-HIERARCHY): the in-card eyebrow 'Data table' was a DUP of
                 the page-chrome eyebrow ('DATA · DATA TABLE'); dropped. The card
                 heading 'Repositories' is the canonical StorySection heading rung —
                 one clear primary, no two equal-weight titles. -->
            <StorySection heading="Repositories" />
            <Input
                v-model="filter"
                placeholder="Filter by name or language…"
                class="max-w-xs"
            />
        </div>

        <div :class="cn('rounded-card border border-border bg-card shadow-cartoon')">
            <DataTable
                :columns="columns"
                :rows="paged"
                :total="sorted.length"
                :page="page"
                :page-size="pageSize"
                :sort="sort"
                row-key="_id"
                @update:page="page = $event"
                @update:sort="sort = $event"
            />
        </div>
    </StoryPage>
</template>
