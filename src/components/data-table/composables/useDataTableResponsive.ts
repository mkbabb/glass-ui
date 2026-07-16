// Internal container-driven table/card projection.
import { computed, type ComputedRef, type MaybeRefOrGetter, toValue } from "vue";
import type { DataTableColumn } from "../types";

export interface UseDataTableResponsiveOptions<T> {
    /** The column set being projected. */
    columns: MaybeRefOrGetter<DataTableColumn<T>[]>;
    /** Whether the responsive card projection is enabled. */
    responsive: MaybeRefOrGetter<boolean>;
    /** Container width (CSS px) below which the table collapses to cards. */
    cardBreakpoint: MaybeRefOrGetter<number>;
    /** The measured container width (0 before the first ResizeObserver frame). */
    containerWidth: MaybeRefOrGetter<number>;
}

export interface UseDataTableResponsiveReturn<T> {
    /** True when the table should render the stacked card-per-row projection. */
    isCard: ComputedRef<boolean>;
    /** The first column — the card's header line. */
    headerColumn: ComputedRef<DataTableColumn<T> | undefined>;
    /** Every column after the first — the card body's label/value pairs. */
    bodyColumns: ComputedRef<DataTableColumn<T>[]>;
}

/**
 * Derive the container-driven card-vs-table projection for a DataTable.
 *
 * `isCard` is true only once the container has measured (`width > 0`, guarding
 * the pre-measure frame) AND is narrower than `cardBreakpoint`. The header/body
 * column split is computed once so the template stays flat.
 */
export function useDataTableResponsive<T extends Record<string, any>>(
    options: UseDataTableResponsiveOptions<T>,
): UseDataTableResponsiveReturn<T> {
    const { columns, responsive, cardBreakpoint, containerWidth } = options;

    const isCard = computed(() => {
        const width = toValue(containerWidth);
        return toValue(responsive) && width > 0 && width < toValue(cardBreakpoint);
    });

    const headerColumn = computed<DataTableColumn<T> | undefined>(
        () => toValue(columns)[0],
    );
    const bodyColumns = computed<DataTableColumn<T>[]>(() =>
        toValue(columns).slice(1),
    );

    return { isCard, headerColumn, bodyColumns };
}
