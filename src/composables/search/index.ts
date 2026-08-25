// The client fuzzy-search ENGINE — the library's ONE subsequence matcher.
//
// [2026-08-25 · BK #42 W-SEARCH] This barrel is INTERNAL, and the classification is
// mechanical rather than editorial: `COMPOSABLE_CLASS.search = "INTERNAL"`
// (`scripts/lib/subpath-policy.mjs`), so the fail-closed generator emits NO `./search`
// export key for it. TR:192 ⊕⁵ SE-4 ruled the surface shape ENGINE-INTERNAL — the
// engine has exactly one caller shape (a component that owns a field and wants ranked
// rows), the dock is it, and a published matcher with no published chrome to drive it
// is a door onto a room nobody can enter from outside.
//
// It reached here from `src/components/search/composables/` in the same act that
// DELETED `SearchBar` with its relay: the engine was never the component's, it was
// parked under it. `fuzzySearchIndex.ts` lands as `match.ts` — the name stripped of the
// component it no longer belongs to.
export { useFuzzySearch } from "./useFuzzySearch";
export type { UseFuzzySearchOptions } from "./useFuzzySearch";
export { buildIndex, searchIndex, fuzzyMatch, clearSearchCache } from "./match";
export type { SearchIndex } from "./match";
export type { SearchableItem, SearchResult, FuzzySearchState } from "./types";
