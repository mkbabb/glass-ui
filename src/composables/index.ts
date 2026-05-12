// @mkbabb/glass-ui/composables — internal barrel.
//
// L.W2 — Composables tree restructured into coherent sub-trees per
// Rε §B.1.1: every composable lives under a domain sub-tree (motion/,
// reactive/, dom/, dark/, keyboard/, glass/, sortable/, sidebar/). Top-level
// flat files were absorbed into these sub-trees; the legacy `useGlobalDark.ts`
// + `useKeyboardShortcuts.ts` shims + their `dark.ts` / `keyboard.ts` impl
// files retired in favour of the `dark/` + `keyboard/` sub-trees.
//
// This barrel re-exports every sub-tree's public surface so the root barrel
// (`src/index.ts`) can pick the vueuse-free leaves it wants. The barrel
// itself walks dark/ + keyboard/ (vueuse-bearing) too — root barrel filters
// those out by referencing only the vueuse-free leaves.

// vueuse-bearing (re-exported here for internal use; root barrel does NOT
// pick these up — consumers reach `useGlobalDark` and the keyboard registry
// via the flat `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`
// subpaths).
export * from "./dark";
export * from "./keyboard";

// vueuse-free sub-trees.
export * from "./reactive";
export * from "./dom";
export * from "./motion";
export * from "./glass";
export * from "./sortable";
export * from "./sidebar";

// Co-located domain composable (infinite-scroll lives next to its component).
export * from "../components/custom/infinite-scroll/composables";
