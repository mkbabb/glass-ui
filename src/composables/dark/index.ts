// Sub-tree barrel for dark-mode composables.
//
// Direct source for the flat public `@mkbabb/glass-ui/dark` entry and internal
// consumers of the dark-mode family.
//
// `installDarkModeSync` is keyframes-free but vueuse-bearing (via `useGlobalDark`),
// so it homes on the vueuse subpath family rather than the engine-free
// `/motion-core` carve.
// darkModeSyncScript() is the vueuse-FREE FOUC parse-time primitive;
// useGlobalDark gains a one-shot initialValue seed. Both home here
// beside installDarkModeSync (the dark-mode-sync family).
export { useGlobalDark } from "./useGlobalDark";
export type {
    GlobalColorSchema,
    UseGlobalDarkOptions,
    UseGlobalDarkReturn,
    DarkFlipSettledCallback,
} from "./useGlobalDark";
export { installDarkModeSync } from "./installDarkModeSync";
export { darkModeSyncScript, DARK_MODE_STORAGE_KEY } from "./darkModeSyncScript";
export type { DarkModeSyncScriptOptions } from "./darkModeSyncScript";
