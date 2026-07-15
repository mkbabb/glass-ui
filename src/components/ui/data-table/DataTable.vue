<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref, useSlots } from "vue";
import { useResizeObserver } from "../../../composables/dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableEmpty,
} from "../table";
import { Skeleton } from "../skeleton";
// BI.W-MENU-TRIGGER — ContextMenu folded onto the Menu family as `trigger="context"`.
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "../dropdown-menu";
import DataTablePagination from "./DataTablePagination.vue";
import type { DataTableColumn, DataTableSort } from "./types";
import { useDataTableRowIdentity } from "./composables/useDataTableRowIdentity";
import { useDataTableResponsive } from "./composables/useDataTableResponsive";
import { cn } from '../../_shared/class-names';

const props = withDefaults(
    defineProps<{
        columns: DataTableColumn<T>[];
        rows: T[];
        total: number;
        pageSize: number;
        isLoading?: boolean;
        rowKey?: string;
        getRowId?: (row: T) => PropertyKey | null | undefined;
        sort?: DataTableSort;
        infinite?: boolean;
        hasMore?: boolean;
        /**
         * When true, the table collapses to a stacked card-per-row
         * projection once its own container measures below
         * `cardBreakpoint`. A dense multi-column table has no responsive
         * story at narrow widths — a horizontal-scroll wrapper leaves
         * half the columns invisible. The card projection keeps every
         * field reachable: the first column becomes the card header
         * (with the row-actions menu docked beside it), every other
         * column renders as a label/value pair below. At/above the
         * breakpoint the unchanged tabular layout renders.
         */
        responsive?: boolean;
        /**
         * Container-width (CSS px) below which `responsive` swaps to the
         * card projection. Container-driven (not viewport-driven) so a
         * table inside a narrow column collapses at any viewport width.
         */
        cardBreakpoint?: number;
        class?: string;
    }>(),
    {
        isLoading: false,
        rowKey: "_id",
        infinite: false,
        hasMore: false,
        responsive: false,
        cardBreakpoint: 640,
    },
);

// Vue 3.5 defineModel — the page model ONLY. `update:sort` stays a plain emit
// below: it carries a `{ key, direction }` payload and is an EVENT, not a
// two-way model.
const page = defineModel<number>("page", { required: true });

const emit = defineEmits<{
    "update:sort": [sort: DataTableSort];
    select: [row: T];
    "load-more": [];
}>();

const slots = useSlots();
const hasRowActions = computed(() => !!slots["row-actions"]);
const hasRowContextMenu = computed(() => !!slots["row-context-menu"]);

// Container-driven card mode — the SFC owns the `useResizeObserver` binding
// (it holds the root element ref); `useDataTableResponsive` owns the
// projection derivation (`isCard` + the card column split). The extraction
// keeps the orchestrator/template here and the two orthogonal concerns
// (row identity ≠ responsive layout) in colocated internal composables (W14).
const rootRef = ref<HTMLElement | null>(null);
const rootWidth = ref(0);
useResizeObserver(rootRef, (rect) => {
    rootWidth.value = rect.width;
});

const { isCard, headerColumn, bodyColumns } = useDataTableResponsive<T>({
    columns: () => props.columns,
    responsive: () => props.responsive,
    cardBreakpoint: () => props.cardBreakpoint,
    containerWidth: rootWidth,
});

// Row identity — stable keying with missing/duplicate validation + a generated
// fallback — lives in `useDataTableRowIdentity`.
const { rowEntries } = useDataTableRowIdentity<T>({
    rows: () => props.rows,
    rowKey: () => props.rowKey,
    getRowId: () => props.getRowId,
});

const skeletonRows = computed(() =>
    Array.from({ length: Math.min(props.pageSize, 5) }, (_, i) => i),
);

// `getNestedValue` stays in the SFC — the template's per-cell `:value` bindings
// read it directly (it is not a row-identity concern).
function getNestedValue(obj: unknown, key: string): unknown {
    return key.split(".").reduce<unknown>((o, k) => {
        if (o == null || typeof o !== "object") return undefined;
        return (o as Record<string, unknown>)[k];
    }, obj);
}

function getCellValue(row: T, col: DataTableColumn<T>): string {
    const raw = getNestedValue(row, col.key);
    if (col.formatter) return col.formatter(raw, row);
    return raw == null ? "—" : String(raw);
}

function getAlignClass(align?: string): string {
    if (align === "right") return "text-right";
    if (align === "center") return "text-center";
    return "text-left";
}

function toggleSort(col: DataTableColumn<T>) {
    if (!col.sortable) return;
    const current = props.sort;
    if (current?.key === col.key) {
        emit("update:sort", {
            key: col.key,
            direction: current.direction === "asc" ? "desc" : "asc",
        });
    } else {
        emit("update:sort", { key: col.key, direction: "asc" });
    }
}

function sortIndicator(col: DataTableColumn<T>): string {
    if (!col.sortable) return "";
    if (props.sort?.key !== col.key) return " ↕";
    return props.sort.direction === "asc" ? " ↑" : " ↓";
}

</script>

<template>
    <div data-slot="data-table" ref="rootRef" :class="cn('overflow-hidden', props.class)">
        <!-- ── Card projection (responsive, narrow container) ────────── -->
        <template v-if="isCard">
            <!-- Loading skeleton -->
            <div v-if="isLoading && rows.length === 0" class="flex flex-col gap-2">
                <div
                    v-for="i in skeletonRows"
                    :key="'skel-card-' + i"
                    class="rounded-lg border border-border p-3"
                >
                    <Skeleton class="mb-2 h-4 w-1/2" />
                    <Skeleton class="h-3 w-3/4" />
                </div>
            </div>

            <!-- Data cards -->
            <div v-else-if="rows.length > 0" class="flex flex-col gap-2">
                <template v-for="entry in rowEntries" :key="entry.key">
                    <component
                        :is="hasRowContextMenu ? DropdownMenu : 'div'"
                        :trigger="hasRowContextMenu ? 'context' : undefined"
                    >
                        <component
                            :is="hasRowContextMenu ? DropdownMenuTrigger : 'div'"
                            :as-child="hasRowContextMenu ? true : undefined"
                        >
                            <div
                                class="cursor-pointer rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"
                                @click="emit('select', entry.row)"
                            >
                                <!-- Header line — first column + actions -->
                                <div class="flex items-start justify-between gap-2">
                                    <div class="min-w-0 font-medium">
                                        <component
                                            v-if="headerColumn?.component"
                                            :is="headerColumn.component"
                                            :value="getNestedValue(entry.row, headerColumn.key)"
                                            :row="entry.row"
                                        />
                                        <template v-else-if="headerColumn">
                                            {{ getCellValue(entry.row, headerColumn) }}
                                        </template>
                                    </div>
                                    <div
                                        v-if="hasRowActions"
                                        class="shrink-0"
                                        @click.stop
                                    >
                                        <slot name="row-actions" :row="entry.row" />
                                    </div>
                                </div>

                                <!-- Body — every other column as label/value -->
                                <dl
                                    v-if="bodyColumns.length > 0"
                                    class="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1"
                                >
                                    <template
                                        v-for="col in bodyColumns"
                                        :key="col.key"
                                    >
                                        <dt class="text-muted-foreground">
                                            {{ col.label }}
                                        </dt>
                                        <dd
                                            :class="
                                                cn(
                                                    'min-w-0 break-words',
                                                    col.align === 'right' && 'text-right',
                                                    col.class,
                                                )
                                            "
                                        >
                                            <component
                                                v-if="col.component"
                                                :is="col.component"
                                                :value="getNestedValue(entry.row, col.key)"
                                                :row="entry.row"
                                            />
                                            <template v-else>
                                                {{ getCellValue(entry.row, col) }}
                                            </template>
                                        </dd>
                                    </template>
                                </dl>
                            </div>
                        </component>
                        <DropdownMenuContent v-if="hasRowContextMenu">
                            <slot name="row-context-menu" :row="entry.row" />
                        </DropdownMenuContent>
                    </component>
                </template>
            </div>

            <!-- Empty state -->
            <div
                v-else
                class="rounded-lg border border-border p-6 text-center text-muted-foreground"
            >
                <slot name="empty">No results found</slot>
            </div>
        </template>

        <!-- ── Tabular layout (default + wide container) ─────────────── -->
        <Table v-else>
            <TableHeader>
                <TableRow class="text-muted-foreground">
                    <TableHead
                        v-for="col in columns"
                        :key="col.key"
                        :class="
                            cn(
                                getAlignClass(col.align),
                                col.sortable && 'cursor-pointer select-none',
                                col.headerClass,
                            )
                        "
                        @click="toggleSort(col)"
                    >
                        {{ col.label }}{{ sortIndicator(col) }}
                    </TableHead>
                    <!-- Trailing actions column header (auto when row-actions slot is provided) -->
                    <TableHead v-if="hasRowActions" class="w-10" />
                </TableRow>
            </TableHeader>

            <TableBody>
                <!-- Loading skeleton -->
                <template v-if="isLoading && rows.length === 0">
                    <TableRow v-for="i in skeletonRows" :key="'skel-' + i">
                        <TableCell
                            v-for="col in columns"
                            :key="col.key"
                            :class="getAlignClass(col.align)"
                        >
                            <Skeleton class="h-4 w-3/4" />
                        </TableCell>
                        <TableCell v-if="hasRowActions" class="w-10">
                            <Skeleton class="h-4 w-6" />
                        </TableCell>
                    </TableRow>
                </template>

                <!-- Data rows -->
                <template v-else-if="rows.length > 0">
                    <template v-for="entry in rowEntries" :key="entry.key">
                        <!-- Row with right-click context menu -->
                        <DropdownMenu v-if="hasRowContextMenu" trigger="context">
                            <DropdownMenuTrigger as-child>
                                <TableRow
                                    class="cursor-pointer"
                                    @click="emit('select', entry.row)"
                                >
                                    <TableCell
                                        v-for="col in columns"
                                        :key="col.key"
                                        :class="cn(getAlignClass(col.align), col.class)"
                                    >
                                        <component
                                            v-if="col.component"
                                            :is="col.component"
                                            :value="getNestedValue(entry.row, col.key)"
                                            :row="entry.row"
                                        />
                                        <template v-else>
                                            {{ getCellValue(entry.row, col) }}
                                        </template>
                                    </TableCell>
                                    <TableCell v-if="hasRowActions" class="w-10" @click.stop>
                                        <slot name="row-actions" :row="entry.row" />
                                    </TableCell>
                                </TableRow>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <slot name="row-context-menu" :row="entry.row" />
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <!-- Plain row (no context menu) -->
                        <TableRow
                            v-else
                            class="cursor-pointer"
                            @click="emit('select', entry.row)"
                        >
                            <TableCell
                                v-for="col in columns"
                                :key="col.key"
                                :class="cn(getAlignClass(col.align), col.class)"
                            >
                                <component
                                    v-if="col.component"
                                    :is="col.component"
                                    :value="getNestedValue(entry.row, col.key)"
                                    :row="entry.row"
                                />
                                <template v-else>
                                    {{ getCellValue(entry.row, col) }}
                                </template>
                            </TableCell>
                            <TableCell v-if="hasRowActions" class="w-10" @click.stop>
                                <slot name="row-actions" :row="entry.row" />
                            </TableCell>
                        </TableRow>
                    </template>
                </template>

                <!-- Empty state -->
                <TableEmpty v-else :colspan="columns.length + (hasRowActions ? 1 : 0)">
                    <slot name="empty">No results found</slot>
                </TableEmpty>
            </TableBody>
        </Table>

        <!-- Infinite scroll sentinel -->
        <slot v-if="infinite" name="sentinel" />

        <!-- Pagination -->
        <DataTablePagination
            v-if="!infinite && total > 0"
            :page="page"
            :page-size="pageSize"
            :total="total"
            @update:page="page = $event"
        />
    </div>
</template>
