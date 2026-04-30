<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, useSlots } from "vue";
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
import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from "../context-menu";
import DataTablePagination from "./DataTablePagination.vue";
import type { DataTableColumn, DataTableSort } from "./types";
import { cn } from '@utils';

const props = withDefaults(
    defineProps<{
        columns: DataTableColumn<T>[];
        rows: T[];
        total: number;
        page: number;
        pageSize: number;
        isLoading?: boolean;
        rowKey?: string;
        sort?: DataTableSort;
        infinite?: boolean;
        hasMore?: boolean;
        class?: string;
    }>(),
    {
        isLoading: false,
        rowKey: "_id",
        infinite: false,
        hasMore: false,
    },
);

const emit = defineEmits<{
    "update:page": [page: number];
    "update:sort": [sort: DataTableSort];
    select: [row: T];
    "load-more": [];
}>();

const slots = useSlots();
const hasRowActions = computed(() => !!slots["row-actions"]);
const hasRowContextMenu = computed(() => !!slots["row-context-menu"]);

const skeletonRows = computed(() =>
    Array.from({ length: Math.min(props.pageSize, 5) }, (_, i) => i),
);

function getNestedValue(obj: unknown, key: string): unknown {
    return key.split(".").reduce<unknown>((o, k) => {
        if (o == null || typeof o !== "object") return undefined;
        return (o as Record<string, unknown>)[k];
    }, obj);
}

function getCellValue(row: T, col: DataTableColumn<T>): string {
    const raw = getNestedValue(row, col.key);
    if (col.formatter) return col.formatter(raw, row);
    return raw == null ? "\u2014" : String(raw);
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
    if (props.sort?.key !== col.key) return " \u2195";
    return props.sort.direction === "asc" ? " \u2191" : " \u2193";
}
</script>

<template>
    <div :class="cn('overflow-hidden', props.class)">
        <Table>
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
                    <template v-for="row in rows" :key="(getNestedValue(row, rowKey) as PropertyKey | undefined) ?? undefined">
                        <!-- Row with right-click context menu -->
                        <ContextMenu v-if="hasRowContextMenu">
                            <ContextMenuTrigger as-child>
                                <TableRow
                                    class="cursor-pointer"
                                    @click="emit('select', row)"
                                >
                                    <TableCell
                                        v-for="col in columns"
                                        :key="col.key"
                                        :class="cn(getAlignClass(col.align), col.class)"
                                    >
                                        <component
                                            v-if="col.component"
                                            :is="col.component"
                                            :value="getNestedValue(row, col.key)"
                                            :row="row"
                                        />
                                        <template v-else>
                                            {{ getCellValue(row, col) }}
                                        </template>
                                    </TableCell>
                                    <TableCell v-if="hasRowActions" class="w-10" @click.stop>
                                        <slot name="row-actions" :row="row" />
                                    </TableCell>
                                </TableRow>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <slot name="row-context-menu" :row="row" />
                            </ContextMenuContent>
                        </ContextMenu>

                        <!-- Plain row (no context menu) -->
                        <TableRow
                            v-else
                            class="cursor-pointer"
                            @click="emit('select', row)"
                        >
                            <TableCell
                                v-for="col in columns"
                                :key="col.key"
                                :class="cn(getAlignClass(col.align), col.class)"
                            >
                                <component
                                    v-if="col.component"
                                    :is="col.component"
                                    :value="getNestedValue(row, col.key)"
                                    :row="row"
                                />
                                <template v-else>
                                    {{ getCellValue(row, col) }}
                                </template>
                            </TableCell>
                            <TableCell v-if="hasRowActions" class="w-10" @click.stop>
                                <slot name="row-actions" :row="row" />
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
            @update:page="emit('update:page', $event)"
        />
    </div>
</template>
