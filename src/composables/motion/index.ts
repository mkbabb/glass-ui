// Sub-tree barrel for the keyframes.js-BEARING motion composables.
//
// AP.W3 R0G-7 — re-pointed to the bearing set only. The six keyframes-FREE
// leaves (useStaggerReveal, useScrollProgress, useRAFLoop, useIntersectionPause,
// useStagger, constants) carved out to the flat `@mkbabb/glass-ui/motion-core`
// sibling subpath (`composables/motion/core/index.ts`); the keyframes-free but
// vueuse-bearing `installDarkModeSync` relocated to `composables/dark/`. This
// barrel ships ONLY the leaves whose module-eval reaches `@mkbabb/keyframes.js`
// (directly or transitively) so a `/motion-core` import stays engine-free.
//
// `constants` stays here too — it is keyframes-free (so it also ships on
// `/motion-core`), but the bearing leaves read DAMPING/SNAP_THRESHOLD from it.
// Duplicate-exporting a pure-data module from two entries is benign (W1.2 §A.2).
//
// NO alias for the relocated free leaves / installDarkModeSync (inv 47);
// consumers rename per call site (see MIGRATION.md / CHANGELOG.md).
export * from "./constants";
export * from "./useSpring";
export * from "./useSpringMount";
export * from "./useSpringPress";
export * from "./useNumericTransition";
export * from "./useAnimatedNumber";
export * from "./useAnimatedNumberMap";
// AV.W3 — the editorial count-up animator. Rides the keyframes LIGHT
// `NumericAnimation` engine (value.js-free callable easing) → keyframes-BEARING,
// so it ships ONLY here (`/motion`), NOT on `/motion-core` and NOT on the root.
export * from "./useCountup";
