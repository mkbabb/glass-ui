import type { Component, HTMLAttributes } from "vue";

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

export type DataTableStatus = "ready" | "loading" | "error";

/** Caller-owned bindings for a mounted data row. */
export type DataTableRowAttrs<T> = (
    row: T,
    index: number,
) => HTMLAttributes | undefined;

/** Receives each mounted row element and `null` when that row leaves the DOM. */
export type DataTableRowRef<T> = (
    element: HTMLElement | null,
    row: T,
    index: number,
) => void;

/** One-based absolute row index, including the header row at index 1. */
export type DataTableRowIndex<T> = (row: T, mountedIndex: number) => number;

export interface DataTableProps<T = any> {
    /** Column definitions */
    columns: DataTableColumn<T>[];
    /** Row data to display */
    rows: T[];
    /** Current renderer state. Empty rows remain a distinct derived state. */
    status?: DataTableStatus;
    /** Distinguishes an empty filtered result from an empty data set. */
    filtered?: boolean;
    /** Unique key field on each row (defaults to "_id") */
    rowKey?: string;
    /** Optional resolver for stable unique row identities. Takes precedence over rowKey. */
    getRowId?: (row: T) => PropertyKey | null | undefined;
    /** Opt into grid semantics on the native table projection. */
    role?: "grid";
    /** Accessible name applied to the native table projection. */
    ariaLabel?: string;
    /** Logical column count applied to the native table projection. */
    ariaColCount?: number;
    /** Native-table logical row count, including any header row. */
    ariaRowCount?: number;
    /**
     * Attributes and handlers for each caller-windowed row. `aria-rowindex`
     * applies only to the native-table projection and is omitted from cards.
     */
    getRowAttrs?: DataTableRowAttrs<T>;
    /** Absolute ARIA row index for each caller-windowed row. */
    getRowIndex?: DataTableRowIndex<T>;
    /** Mounted row element callback for measurement or focus. */
    rowRef?: DataTableRowRef<T>;
    /** Stable id of the sole mounted row placed in the tab order. */
    tabbableRowId?: PropertyKey | null;
    /** Current sort state */
    sort?: DataTableSort;
    /** Enables controlled single-row selection and row keyboard activation. */
    selectable?: boolean;
    /** Stable identity of the selected row when selection is enabled. */
    selectedRowId?: PropertyKey | null;
    /**
     * When true, the table collapses to a stacked card-per-row
     * projection once its container measures below `cardBreakpoint` —
     * the responsive story for a dense multi-column table at narrow
     * widths. At/above the breakpoint the tabular layout renders.
     */
    responsive?: boolean;
    /** Container-width (CSS px) below which `responsive` swaps to cards. Defaults to 640. */
    cardBreakpoint?: number;
    class?: HTMLAttributes["class"];
}
