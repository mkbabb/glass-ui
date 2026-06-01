// Sub-tree barrel for dark-mode composables.
//
// Resolved by both:
//   - The flat public subpath `@mkbabb/glass-ui/dark` (`src/dark.ts` re-exports
//     `./composables/dark`, which lands here).
//   - Internal consumers that `import { useGlobalDark } from ".../composables/dark"`.
//
// AP.W3 R0G-7 — `installDarkModeSync` relocated here from `composables/motion/`.
// It is keyframes-free but vueuse-bearing (via `useGlobalDark`), so it homes on
// the vueuse subpath family rather than the engine-free `/motion-core` carve.
export { useGlobalDark } from "./useGlobalDark";
export { installDarkModeSync } from "./installDarkModeSync";
