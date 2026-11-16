<script setup lang="ts">
// DataTable's stage: one sortable, selectable table in one of its four states. Under
// its own card breakpoint the rows become cards, and the box scrolls them.
import { computed, ref } from "vue";
import {
    DataTable,
    type DataTableColumn,
    type DataTableSort,
    type DataTableStatus,
} from "@glass/components/data-table";
import StageSwap from "../../chassis/variants/StageSwap.vue";

type State = "loaded" | "loading" | "empty" | "error";

const props = withDefaults(defineProps<{ state?: State }>(), { state: "loaded" });

interface Book {
    _id: string;
    title: string;
    author: string;
    year: number;
    pages: number;
}

const BOOKS: Book[] = [
    { _id: "1", title: "Middlemarch", author: "George Eliot", year: 1871, pages: 880 },
    { _id: "2", title: "Moby-Dick", author: "Herman Melville", year: 1851, pages: 635 },
    { _id: "3", title: "Mrs Dalloway", author: "Virginia Woolf", year: 1925, pages: 194 },
    { _id: "4", title: "Things Fall Apart", author: "Chinua Achebe", year: 1958, pages: 209 },
    { _id: "5", title: "Beloved", author: "Toni Morrison", year: 1987, pages: 324 },
    { _id: "6", title: "Pale Fire", author: "Vladimir Nabokov", year: 1962, pages: 315 },
];

const columns: DataTableColumn<Book>[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "author", label: "Author", sortable: true },
    { key: "year", label: "Year", sortable: true, align: "right", class: "fira-code" },
    { key: "pages", label: "Pages", sortable: true, align: "right", class: "fira-code" },
];

const sort = ref<DataTableSort | undefined>({ key: "year", direction: "asc" });
const selected = ref<PropertyKey | null>("3");

const sorted = computed(() => {
    const s = sort.value;
    if (!s) return BOOKS;
    const sign = s.direction === "asc" ? 1 : -1;
    return [...BOOKS].sort((a, b) => {
        const x = a[s.key as keyof Book];
        const y = b[s.key as keyof Book];
        return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y))) * sign;
    });
});

const status = computed<DataTableStatus>(() =>
    props.state === "loading" || props.state === "error" ? props.state : "ready",
);
const rows = computed(() => (props.state === "loaded" ? sorted.value : []));
</script>

<template>
    <div class="data-table-stage">
        <StageSwap :swap-key="state" class="data-table-stage-swap">
            <DataTable
                v-model:selected-row-id="selected"
                :columns="columns"
                :rows="rows"
                :sort="sort"
                :status="status"
                row-key="_id"
                aria-label="Books"
                selectable
                responsive
                @update:sort="sort = $event"
            >
                <template #empty>No books yet.</template>
                <template #error>The books could not be loaded.</template>
            </DataTable>
        </StageSwap>
    </div>
</template>

<style scoped>
.data-table-stage {
    display: grid;
    justify-items: center;
    align-content: center;
    block-size: 100%;
    padding: var(--sp-5);
    overflow-y: auto;
}
.data-table-stage-swap {
    inline-size: min(100%, 48rem);
}

/* Narrow: the rows are cards, taller than the stage. The swap box holds the stage's
   height and its pane scrolls, so a switch only cross-fades. */
@container (inline-size < 36rem) {
    .data-table-stage {
        display: block;
        padding: 0;
        overflow: clip;
    }
    .data-table-stage-swap {
        block-size: 100%;
    }
    .data-table-stage-swap :deep(.stage-swap-pane) {
        block-size: 100%;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding: var(--sp-3);
    }
}
</style>

<style>
/* On its card the stage has no height to fill: hold it to the plate's. */
[data-card-specimen] .data-table-stage {
    block-size: 10rem;
}
</style>
