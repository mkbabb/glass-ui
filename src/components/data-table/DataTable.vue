<script setup lang="ts" generic="T extends Record<string, any>">
import {
    computed,
    mergeProps,
    nextTick,
    onBeforeUpdate,
    onUpdated,
    ref,
    useSlots,
} from "vue";
import { useResizeObserver } from "../../composables/dom";
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
import type { DataTableColumn, DataTableProps, DataTableSort } from "./types";
import {
    useDataTableRowIdentity,
    type RowEntry,
} from "./composables/useDataTableRowIdentity";
import { useDataTableResponsive } from "./composables/useDataTableResponsive";
import { cn } from "../_shared/class-names";

const props = withDefaults(defineProps<DataTableProps<T>>(), {
    status: "ready",
    filtered: false,
    rowKey: "_id",
    selectable: false,
    responsive: false,
    cardBreakpoint: 640,
});

const emit = defineEmits<{
    "update:sort": [sort: DataTableSort];
    "update:selectedRowId": [id: PropertyKey];
    "update:tabbableRowId": [id: PropertyKey];
    select: [row: T];
}>();

const slots = useSlots();
const hasRowActions = computed(() => !!slots["row-actions"]);
const tableRole = computed(
    () =>
        props.role ??
        (props.selectable || props.tabbableRowId !== undefined ? "grid" : undefined),
);
const logicalColumnCount = computed(
    () => props.ariaColCount ?? props.columns.length + (hasRowActions.value ? 1 : 0),
);
const logicalRowCount = computed(
    () => props.ariaRowCount ?? (tableRole.value ? props.rows.length + 1 : undefined),
);
const renderedState = computed(() => {
    if (props.status === "error") return "error";
    if (props.status === "loading" && props.rows.length === 0) return "loading";
    if (props.rows.length === 0) return props.filtered ? "filtered-empty" : "empty";
    return props.status;
});

// The root owns measurement; the composable derives only the projection.
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

// Stable identity validation stays separate from rendering and interaction.
const { rowEntries } = useDataTableRowIdentity<T>({
    rows: () => props.rows,
    rowKey: () => props.rowKey,
    getRowId: computed(() => props.getRowId),
});

const rowEls = new Map<PropertyKey, HTMLElement>();

function setRowEl(entry: RowEntry<T>, index: number, value: unknown): void {
    const candidate = value as { $el?: unknown } | null;
    const el = value instanceof HTMLElement ? value : candidate?.$el;
    const rowEl = el instanceof HTMLElement ? el : null;
    if (rowEl) rowEls.set(entry.key, rowEl);
    else rowEls.delete(entry.key);
    props.rowRef?.(rowEl, entry.row, index);
}

let focusedRowKey: PropertyKey | null = null;
onBeforeUpdate(() => {
    const focused = Array.from(rowEls).find(([, el]) => el === document.activeElement);
    focusedRowKey = focused?.[0] ?? null;
});
onUpdated(() => {
    if (focusedRowKey !== null) rowEls.get(focusedRowKey)?.focus();
    focusedRowKey = null;
});

const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

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

function ariaSort(
    col: DataTableColumn<T>,
): "none" | "ascending" | "descending" | undefined {
    if (!col.sortable) return undefined;
    if (props.sort?.key !== col.key) return "none";
    return props.sort.direction === "asc" ? "ascending" : "descending";
}

function sortIndicator(col: DataTableColumn<T>): string {
    if (!col.sortable) return "";
    if (props.sort?.key !== col.key) return " ↕";
    return props.sort.direction === "asc" ? " ↑" : " ↓";
}

function isSelected(entry: RowEntry<T>): boolean {
    return Object.is(props.selectedRowId, entry.key);
}

function selectRow(entry: RowEntry<T>): void {
    emit("update:selectedRowId", entry.key);
    emit("update:tabbableRowId", entry.key);
    emit("select", entry.row);
    rowEls.get(entry.key)?.focus({ preventScroll: true });
}

function onRowClick(event: MouseEvent, entry: RowEntry<T>): void {
    if (!(event.target instanceof Element)) return;
    const nestedControl = event.target.closest(
        'button,a[href],input,select,textarea,summary,[contenteditable="true"],[tabindex]:not([tabindex="-1"])',
    );
    if (!nestedControl || nestedControl === event.currentTarget) selectRow(entry);
}

function onRowKeydown(event: KeyboardEvent, entry: RowEntry<T>): void {
    if (event.target !== event.currentTarget) return;
    if (["Enter", " "].includes(event.key)) {
        if (!props.selectable) return;
        event.preventDefault();
        selectRow(entry);
        return;
    }
    const edge =
        event.key === "Home"
            ? 0
            : event.key === "End"
              ? rowEntries.value.length - 1
              : -1;
    const delta = event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0;
    if (edge < 0 && delta === 0) return;
    const current = rowEntries.value.findIndex(({ key }) => Object.is(key, entry.key));
    const nextIndex = Math.max(
        0,
        Math.min(rowEntries.value.length - 1, edge >= 0 ? edge : current + delta),
    );
    const next = rowEntries.value[nextIndex];
    if (!next) return;
    event.preventDefault();
    emit("update:tabbableRowId", next.key);
    void nextTick(() => rowEls.get(next.key)?.focus({ preventScroll: true }));
}

const tabbableKey = computed<PropertyKey | null>(() => {
    if (props.tabbableRowId !== undefined) {
        return rowEntries.value.some(({ key }) => Object.is(key, props.tabbableRowId))
            ? props.tabbableRowId
            : null;
    }
    if (!props.selectable) return null;
    const selected = rowEntries.value.find(({ key }) =>
        Object.is(key, props.selectedRowId),
    );
    return selected?.key ?? rowEntries.value[0]?.key ?? null;
});

function rowInteraction(entry: RowEntry<T>, card = false): Record<string, unknown> {
    if (!props.selectable) return {};
    const selected = isSelected(entry);
    return {
        class: "data-table-row-interactive",
        role: card ? "option" : undefined,
        "aria-selected": selected,
        "data-state": selected ? "selected" : undefined,
        onClick: (event: MouseEvent) => onRowClick(event, entry),
    };
}

function rowBindings(
    entry: RowEntry<T>,
    index: number,
    card = false,
): Record<string, unknown> {
    const attrs = {
        ...props.getRowAttrs?.(entry.row, index),
    } as Record<string, unknown>;
    if (card) delete attrs["aria-rowindex"];
    else if (props.getRowIndex)
        attrs["aria-rowindex"] = props.getRowIndex(entry.row, index);
    const focusable = props.selectable || props.tabbableRowId !== undefined;
    const roving = focusable
        ? {
              class: "focus-ring",
              tabindex: Object.is(tabbableKey.value, entry.key) ? 0 : -1,
              onFocus: () => emit("update:tabbableRowId", entry.key),
              onKeydown: (event: KeyboardEvent) => onRowKeydown(event, entry),
          }
        : {};
    return mergeProps(attrs, rowInteraction(entry, card), roving);
}
</script>

<template>
    <div
        data-slot="data-table"
        ref="rootRef"
        :class="cn('data-table', props.class)"
        :data-state="renderedState"
        :aria-busy="status === 'loading' || undefined"
    >
        <!-- ── Card projection (responsive, narrow container) ────────── -->
        <template v-if="isCard">
            <!-- Loading skeleton -->
            <div
                v-if="status === 'error'"
                class="data-table-state glass-quiet"
                role="alert"
            >
                <slot name="error">Unable to load data</slot>
            </div>

            <div
                v-else-if="status === 'loading' && rows.length === 0"
                class="data-table-cards"
            >
                <div
                    v-for="i in skeletonRows"
                    :key="'skel-card-' + i"
                    class="data-table-card glass-quiet"
                >
                    <Skeleton class="data-table-card-skeleton-title" />
                    <Skeleton class="h-3 w-3/4" />
                </div>
            </div>

            <!-- Data cards -->
            <div
                v-else-if="rows.length > 0"
                class="data-table-cards"
                :role="selectable ? 'listbox' : undefined"
                :aria-label="selectable ? (ariaLabel ?? 'Rows') : undefined"
            >
                <div
                    v-for="(entry, index) in rowEntries"
                    :key="entry.key"
                    :ref="(el) => setRowEl(entry, index, el)"
                    v-bind="rowBindings(entry, index, true)"
                    class="data-table-card glass-quiet"
                >
                    <div class="data-table-card-header">
                        <div class="data-table-card-title">
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
                            class="data-table-actions"
                            @click.stop
                        >
                            <slot name="row-actions" :row="entry.row" />
                        </div>
                    </div>

                    <dl v-if="bodyColumns.length > 0" class="data-table-card-fields">
                        <template v-for="col in bodyColumns" :key="col.key">
                            <dt class="data-table-card-label">{{ col.label }}</dt>
                            <dd
                                :class="cn('data-table-card-value', col.class)"
                                :data-align="col.align ?? 'left'"
                            >
                                <component
                                    v-if="col.component"
                                    :is="col.component"
                                    :value="getNestedValue(entry.row, col.key)"
                                    :row="entry.row"
                                />
                                <template v-else>{{
                                    getCellValue(entry.row, col)
                                }}</template>
                            </dd>
                        </template>
                    </dl>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else class="data-table-state glass-quiet">
                <slot v-if="filtered" name="filtered-empty">No matching rows</slot>
                <slot v-else name="empty">No rows yet</slot>
            </div>
        </template>

        <!-- ── Tabular layout (default + wide container) ─────────────── -->
        <Table
            v-else
            :role="tableRole"
            :aria-label="ariaLabel"
            :aria-col-count="logicalColumnCount"
            :aria-row-count="logicalRowCount"
        >
            <TableHeader>
                <TableRow
                    class="data-table-header-row"
                    :aria-rowindex="tableRole === 'grid' ? 1 : undefined"
                >
                    <TableHead
                        v-for="col in columns"
                        :key="col.key"
                        :class="col.headerClass"
                        :data-align="col.align ?? 'left'"
                        :aria-sort="ariaSort(col)"
                    >
                        <button
                            v-if="col.sortable"
                            type="button"
                            class="data-table-sort focus-ring"
                            :data-align="col.align ?? 'left'"
                            @click="toggleSort(col)"
                        >
                            <span>{{ col.label }}</span>
                            <span aria-hidden="true">{{ sortIndicator(col) }}</span>
                        </button>
                        <template v-else>{{ col.label }}</template>
                    </TableHead>
                    <!-- Trailing actions column header (auto when row-actions slot is provided) -->
                    <TableHead v-if="hasRowActions" class="data-table-actions-cell" />
                </TableRow>
            </TableHeader>

            <TableBody>
                <!-- Loading skeleton -->
                <TableEmpty
                    v-if="status === 'error'"
                    :colspan="columns.length + (hasRowActions ? 1 : 0)"
                    :role="tableRole === 'grid' ? 'presentation' : undefined"
                >
                    <span role="alert"
                        ><slot name="error">Unable to load data</slot></span
                    >
                </TableEmpty>

                <template v-else-if="status === 'loading' && rows.length === 0">
                    <TableRow v-for="i in skeletonRows" :key="'skel-' + i">
                        <TableCell
                            v-for="col in columns"
                            :key="col.key"
                            :data-align="col.align ?? 'left'"
                        >
                            <Skeleton class="data-table-cell-skeleton" />
                        </TableCell>
                        <TableCell v-if="hasRowActions" class="data-table-actions-cell">
                            <Skeleton class="data-table-action-skeleton" />
                        </TableCell>
                    </TableRow>
                </template>

                <!-- Data rows -->
                <template v-else-if="rows.length > 0">
                    <TableRow
                        v-for="(entry, index) in rowEntries"
                        :key="entry.key"
                        :ref="(el) => setRowEl(entry, index, el)"
                        v-bind="rowBindings(entry, index)"
                    >
                        <TableCell
                            v-for="col in columns"
                            :key="col.key"
                            :class="col.class"
                            :data-align="col.align ?? 'left'"
                        >
                            <component
                                v-if="col.component"
                                :is="col.component"
                                :value="getNestedValue(entry.row, col.key)"
                                :row="entry.row"
                            />
                            <template v-else>{{
                                getCellValue(entry.row, col)
                            }}</template>
                        </TableCell>
                        <TableCell
                            v-if="hasRowActions"
                            class="data-table-actions-cell"
                            @click.stop
                        >
                            <slot name="row-actions" :row="entry.row" />
                        </TableCell>
                    </TableRow>
                </template>

                <!-- Empty state -->
                <TableEmpty
                    v-else
                    :colspan="columns.length + (hasRowActions ? 1 : 0)"
                    :role="tableRole === 'grid' ? 'presentation' : undefined"
                >
                    <slot v-if="filtered" name="filtered-empty">No matching rows</slot>
                    <slot v-else name="empty">No rows yet</slot>
                </TableEmpty>
            </TableBody>
        </Table>

        <slot name="sentinel" />
    </div>
</template>

<style src="./styles.css"></style>
