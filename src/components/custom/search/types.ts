import type { Ref, ComputedRef } from "vue";

/** A searchable item — the generic unit of the fuzzy search index. */
export interface SearchableItem {
    id: string;
    /** Primary display label (title, heading, name). */
    label: string;
    /** Full-text content to search against. */
    text: string;
    /** Optional type tag for badge display (e.g. "section", "code"). */
    type?: string;
}

/** A single fuzzy match result with score and highlight positions. */
export interface SearchResult<T extends SearchableItem = SearchableItem> {
    item: T;
    score: number;
    /** Character positions in `item.label` that matched the query. */
    matchIndices: number[];
}

/** Reactive state returned by `useFuzzySearch`. */
export interface FuzzySearchState<T extends SearchableItem = SearchableItem> {
    query: Ref<string>;
    results: ComputedRef<SearchResult<T>[]>;
    selectedIndex: Ref<number>;
    isOpen: Ref<boolean>;
    isExpanded: Ref<boolean>;
    onKeydown(e: KeyboardEvent): void;
    selectResult(result: SearchResult<T>): void;
    toggleExpanded(): void;
    close(): void;
    open(): void;
}
