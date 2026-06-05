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
// AU.W9.B — darkModeSyncScript() is the vueuse-FREE FOUC parse-time primitive
// (#22); useGlobalDark gains a one-shot initialValue seed (#21). Both home here
// beside installDarkModeSync (the dark-mode-sync family).
export { useGlobalDark } from "./useGlobalDark";
export type { UseGlobalDarkOptions } from "./useGlobalDark";
export { installDarkModeSync } from "./installDarkModeSync";
export { darkModeSyncScript, DARK_MODE_STORAGE_KEY } from "./darkModeSyncScript";
export type { DarkModeSyncScriptOptions } from "./darkModeSyncScript";
