// Sub-tree barrel for motion composables backed by @mkbabb/keyframes.js.
//
// Shape harmonised with sibling sub-trees (dark/, keyboard/, reactive/, dom/)
// — every leaf is `export *`-rolled so the barrel is a thin pass-through with
// no curation. Types are co-exported beside their runtime symbols at each leaf.
export * from "./constants";
export * from "./useNumericTransition";
// AL.W9-δ — `useSpringOrchestrator` renamed to `useNumericTransition`; the
// shim below re-exports the old name with `@deprecated` JSDoc for one minor
// version. Retires at v3.0.
export * from "./useSpringOrchestrator";
export * from "./useStaggerReveal";
export * from "./useScrollProgress";
export * from "./useAnimatedNumber";
export * from "./useAnimatedNumberMap";
export * from "./installDarkModeSync";
export * from "./useRAFLoop";
export * from "./useIntersectionPause";
export * from "./useStagger";
