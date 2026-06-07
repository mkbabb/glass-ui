import { computed, ref, type ComputedRef, type Ref } from "vue";
import { useElementSize } from "@vueuse/core";
import type { DataTableColumn } from "../types";

/** Reactive inputs the responsive concern reads off the host props. */
export interface UseDataTableResponsiveOptions<T> {
    columns: () => DataTableColumn<T>[];
    /** Opt-in flag for the narrow-container card projection. */
    responsive: () => boolean;
    /** Container width (CSS px) below which the table swaps to cards. */
    cardBreakpoint: () => number;
}

export interface UseDataTableResponsiveReturn<T> {
    /** Bind to the table root — the measured element driving the card swap. */
    rootRef: Ref<HTMLElement | null>;
    /** True once the container measures below `cardBreakpoint` in responsive mode. */
    isCard: ComputedRef<boolean>;
    /** First column — the card header line. */
    headerColumn: ComputedRef<DataTableColumn<T> | undefined>;
    /** Every other column — the card's label/value body. */
    bodyColumns: ComputedRef<DataTableColumn<T>[]>;
}

/**
 * Owns DataTable's responsive card-vs-table projection. Measures the table's own
 * container (ResizeObserver via `useElementSize` — container-driven, not
 * viewport-driven, so a table inside a narrow column collapses at any viewport
 * width) and splits the columns into the card header (first) + body (rest). The
 * `width > 0` guard suppresses the pre-measure frame so the table never flashes
 * the card layout before its width is known.
 */
export function useDataTableResponsive<T extends Record<string, any>>(
    options: UseDataTableResponsiveOptions<T>,
): UseDataTableResponsiveReturn<T> {
    const rootRef = ref<HTMLElement | null>(null);
    const { width: rootWidth } = useElementSize(rootRef);

    const isCard = computed(
        () =>
            options.responsive() &&
            rootWidth.value > 0 &&
            rootWidth.value < options.cardBreakpoint(),
    );

    // The first column is the card's header line; the rest become the
    // label/value body. Splitting once (computed) keeps the template flat.
    const headerColumn = computed<DataTableColumn<T> | undefined>(
        () => options.columns()[0],
    );
    const bodyColumns = computed<DataTableColumn<T>[]>(() => options.columns().slice(1));

    return { rootRef, isCard, headerColumn, bodyColumns };
}
