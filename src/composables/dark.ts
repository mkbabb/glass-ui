// @mkbabb/glass-ui/composables/dark — vueuse-bearing dark-mode composable
//
// `useGlobalDark` wraps `createGlobalState` + `useDark` + `useToggle` from
// `@vueuse/core`. Pulled out as its own subpath so consumers that want to
// apply a vueuse manualChunk can do so without the root barrel forcing
// vueuse into the eager critical path.
//
// Root-barrel re-export stays in place during Phase 1 (v0.9.3 additive).
export { useGlobalDark } from "./useGlobalDark";
