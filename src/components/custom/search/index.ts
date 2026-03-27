export { default as FuzzySearch } from "./FuzzySearch.vue";
export { default as SearchBar } from "./SearchBar.vue";
export { useFuzzySearch } from "./composables/useFuzzySearch";
export type { UseFuzzySearchOptions } from "./composables/useFuzzySearch";
export { buildIndex, searchIndex, fuzzyMatch, clearSearchCache } from "./composables/fuzzySearchIndex";
export type { SearchIndex } from "./composables/fuzzySearchIndex";
export type { SearchableItem, SearchResult, FuzzySearchState } from "./composables/types";
