// @mkbabb/glass-ui/composables — internal barrel.
//
// Every composable lives under a domain sub-tree (motion/, reactive/, dom/,
// dark/, keyboard/, glass/, sortable/, sidebar/). The barrel re-exports every
// sub-tree so the root barrel can pick the vueuse-free leaves; dark/ + keyboard/
// (vueuse-bearing) reach consumers via flat `@mkbabb/glass-ui/dark` +
// `@mkbabb/glass-ui/keyboard` subpaths.

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
// The keyframes-free motion leaves live on the flat `/motion-core` subpath.
// Re-export the core barrel here so those leaves stay reachable internally.
// (`installDarkModeSync` auto-flows via the `export * from "./dark"` above.)
export * from "./motion/core";
export * from "./glass";
export * from "./sidebar";

// Co-located domain composable (infinite-scroll lives next to its component).
export * from "../components/infinite-scroll/composables";
