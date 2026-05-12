// @mkbabb/glass-ui/keyboard — vueuse-bearing keyboard-shortcuts registry (v1.0 flat subpath)
//
// L.W1 Lane C — flattens the v0.9.x nested subpath `/composables/keyboard` to
// the v1.0 canonical flat subpath `/keyboard`. Per Rε §B.3.1+3.2: every other
// public subpath is flat; the nested form was the lone W0 Lane III transitional
// shape. L invariant 4 retires the nested form with no legacy alias.
//
// L.W2 — Implementation home is the `src/composables/keyboard/` sub-tree
// (the `useKeyboardShortcuts.ts` leaf re-exported by `keyboard/index.ts`).
// This file is a thin re-export that resolves through the sub-tree index,
// so the public flat subpath stays decoupled from the internal directory
// layout.
export * from "./composables/keyboard";
