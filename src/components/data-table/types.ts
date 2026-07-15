import type { Component } from "vue";

export interface DataTableColumn<T = any> {
    /** Unique key matching a property on the row object */
    key: string;
    /** Display label for the column header */
    label: string;
    /** Optional formatter for cell values */
    formatter?: (value: any, row: T) => string;
    /** Optional custom component to render in the cell. Receives `value` and `row` props. */
    component?: Component;
    /** Whether this column is sortable */
    sortable?: boolean;
    /** Text alignment */
    align?: "left" | "center" | "right";
    /** Additional CSS classes for the column cells */
    class?: string;
    /** Additional CSS classes for the header cell */
    headerClass?: string;
}

export interface DataTableSort {
    key: string;
    direction: "asc" | "desc";
}

export interface DataTableProps<T = any> {
    /** Column definitions */
    columns: DataTableColumn<T>[];
    /** Row data to display */
    rows: T[];
    /** Total number of rows across all pages (for pagination display) */
    total: number;
    /** Current page number (1-indexed) */
    page: number;
    /** Number of rows per page */
    pageSize: number;
    /** Whether data is currently loading */
    isLoading?: boolean;
    /** Unique key field on each row (defaults to "_id") */
    rowKey?: string;
    /** Optional resolver for stable unique row identities. Takes precedence over rowKey. */
    getRowId?: (row: T) => PropertyKey | null | undefined;
    /** Current sort state */
    sort?: DataTableSort;
    /** Enables controlled single-row selection and row keyboard activation. */
    selectable?: boolean;
    /** Stable identity of the selected row when selection is enabled. */
    selectedRowId?: PropertyKey | null;
    /** When true, hides pagination and shows infinite scroll sentinel */
    infinite?: boolean;
    /** Whether more data is available (for infinite scroll mode) */
    hasMore?: boolean;
    /**
     * When true, the table collapses to a stacked card-per-row
     * projection once its container measures below `cardBreakpoint` —
     * the responsive story for a dense multi-column table at narrow
     * widths. At/above the breakpoint the tabular layout renders.
     */
    responsive?: boolean;
    /** Container-width (CSS px) below which `responsive` swaps to cards. Defaults to 640. */
    cardBreakpoint?: number;
}
