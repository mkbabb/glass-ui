export { default as FuzzySearch } from "./FuzzySearch.vue";
export { useFuzzySearch } from "./useFuzzySearch";
export type { UseFuzzySearchOptions } from "./useFuzzySearch";
export { buildIndex, searchIndex, fuzzyMatch, clearSearchCache } from "./fuzzySearchIndex";
export type { SearchIndex } from "./fuzzySearchIndex";
export type { SearchableItem, SearchResult, FuzzySearchState } from "./types";
