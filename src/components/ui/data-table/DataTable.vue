<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from "vue";
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
import DataTablePagination from "./DataTablePagination.vue";
import type { DataTableColumn, DataTableSort } from "./types";
import { cn } from "../../../utils";

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

const skeletonRows = computed(() =>
    Array.from({ length: Math.min(props.pageSize, 5) }, (_, i) => i),
);

function getNestedValue(obj: any, key: string): any {
    return key.split(".").reduce((o, k) => o?.[k], obj);
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
                    </TableRow>
                </template>

                <!-- Data rows -->
                <template v-else-if="rows.length > 0">
                    <TableRow
                        v-for="row in rows"
                        :key="getNestedValue(row, rowKey) ?? undefined"
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
                    </TableRow>
                </template>

                <!-- Empty state -->
                <TableEmpty v-else :colspan="columns.length">
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
