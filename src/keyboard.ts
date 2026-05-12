// @mkbabb/glass-ui/keyboard — vueuse-bearing keyboard-shortcuts registry (v1.0 flat subpath)
//
// L.W1 Lane C — flattens the v0.9.x nested subpath `/composables/keyboard` to
// the v1.0 canonical flat subpath `/keyboard`. Per Rε §B.3.1+3.2: every other
// public subpath is flat; the nested form was the lone W0 Lane III transitional
// shape. L invariant 4 retires the nested form with no legacy alias.
//
// Implementation home remains `src/composables/keyboard.ts` (per W0 Lane III
// lift); this file is a thin re-export so the file structure stays coherent
// and W2's modularization sweep has a known re-organization target.
export * from "./composables/keyboard";
