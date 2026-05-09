// @mkbabb/glass-ui/composables/keyboard — vueuse-bearing keyboard registry
//
// `useKeyboardShortcuts` builds on `createGlobalState` + `useEventListener`
// from `@vueuse/core`. Subpath isolates the registry from the root barrel
// so consumers that don't reach for it don't drag vueuse into the entry
// chunk via the SCC trap (see `docs/tranches/K/waves/W-S.md`).
//
// Root-barrel re-export stays in place during Phase 1 (v0.9.3 additive).
export * from "./useKeyboardShortcuts";
