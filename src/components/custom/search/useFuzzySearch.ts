/**
 * Vue composable for fuzzy search — manages reactive state, debouncing,
 * keyboard navigation, modal expand, and result selection.
 */
import { ref, watch, computed } from "vue";
import type { SearchableItem, SearchResult, FuzzySearchState } from "./types";
import { buildIndex, searchIndex, clearSearchCache } from "./fuzzySearchIndex";

export interface UseFuzzySearchOptions<T extends SearchableItem = SearchableItem> {
    /** Reactive or static list of searchable items. */
    items: T[] | (() => T[]);
    /** Debounce delay in ms (default: 120). */
    debounceMs?: number;
    /** Maximum results to return (default: 30). */
    maxResults?: number;
    /** Callback when a result is selected (Enter or click). */
    onSelect?: (result: SearchResult<T>) => void;
}

export function useFuzzySearch<T extends SearchableItem = SearchableItem>(
    options: UseFuzzySearchOptions<T>,
): FuzzySearchState<T> {
    const getItems = typeof options.items === "function" ? options.items : () => options.items as T[];
    const debounceMs = options.debounceMs ?? 120;
    const maxResults = options.maxResults ?? 30;

    const query = ref("");
    const isOpen = ref(false);
    const isExpanded = ref(false);
    const selectedIndex = ref(0);
    const debouncedQuery = ref("");

    // Inline debounce
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    watch(query, (val) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            debouncedQuery.value = val;
        }, debounceMs);
    });

    const results = computed(() => {
        const index = buildIndex(getItems());
        return searchIndex<T>(index, debouncedQuery.value, maxResults);
    });

    watch(results, () => {
        selectedIndex.value = 0;
    });

    function selectResult(r: SearchResult<T>) {
        options.onSelect?.(r);
        close();
    }

    function close() {
        isOpen.value = false;
        isExpanded.value = false;
        query.value = "";
        selectedIndex.value = 0;
        clearSearchCache();
    }

    function open() {
        isOpen.value = true;
    }

    function toggleExpanded() {
        isExpanded.value = !isExpanded.value;
    }

    function onKeydown(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (selectedIndex.value < results.value.length - 1) {
                    selectedIndex.value++;
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                if (selectedIndex.value > 0) {
                    selectedIndex.value--;
                }
                break;
            case "Enter":
                e.preventDefault();
                if (results.value[selectedIndex.value]) {
                    selectResult(results.value[selectedIndex.value]);
                }
                break;
            case "Escape":
                e.preventDefault();
                if (isExpanded.value) {
                    isExpanded.value = false;
                } else {
                    close();
                }
                break;
        }
    }

    return {
        query,
        results,
        isOpen,
        isExpanded,
        selectedIndex,
        selectResult,
        close,
        open,
        toggleExpanded,
        onKeydown,
    } as FuzzySearchState<T>;
}
