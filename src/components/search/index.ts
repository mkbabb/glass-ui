export { default as FuzzySearch } from "./FuzzySearch.vue";
export { default as SearchBar } from "./SearchBar.vue";
// The field-chrome variant CVA + its `/api` type surface (the
// SFCs cannot re-export a type, so the CVA home is the type source). The size axis
// rides the shared `controlSizeClass` (re-exported through searchVariants).
export { searchFieldVariants } from "./searchVariants";
export type { SearchVariant, SearchVariants } from "./searchVariants";
export { useFuzzySearch } from "./composables/useFuzzySearch";
export type { UseFuzzySearchOptions } from "./composables/useFuzzySearch";
export { buildIndex, searchIndex, fuzzyMatch, clearSearchCache } from "./composables/fuzzySearchIndex";
export type { SearchIndex } from "./composables/fuzzySearchIndex";
export type { SearchableItem, SearchResult, FuzzySearchState } from "./composables/types";
