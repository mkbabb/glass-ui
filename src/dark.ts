// @mkbabb/glass-ui/dark — vueuse-bearing dark-mode composable (v1.0 flat subpath)
//
// L.W1 Lane C — flattens the v0.9.x nested subpath `/composables/dark` to the
// v1.0 canonical flat subpath `/dark`. Per Rε §B.3.1+3.2: every other public
// subpath in the library is flat (`/forms`, `/dock`, `/configurator`); the
// nested form was the lone exception introduced as a W0 Lane III transitional
// shape. L invariant 4 retires the nested form with no legacy alias.
//
// L.W2 — Implementation home is the `src/composables/dark/` sub-tree (the
// `useGlobalDark.ts` leaf re-exported by `dark/index.ts`). This file is a
// thin re-export that resolves through the sub-tree index, so the public
// flat subpath stays decoupled from the internal directory layout.
// AP.W3 R0G-7 — installDarkModeSync (keyframes-free, vueuse-bearing via
// useGlobalDark) relocated here from /motion; /dark is its vueuse home.
// AU.W9.B — darkModeSyncScript (vueuse-FREE FOUC parse-time primitive, #22) +
// the useGlobalDark one-shot initialValue seed (#21) home on /dark too.
export {
    useGlobalDark,
    installDarkModeSync,
    darkModeSyncScript,
    DARK_MODE_STORAGE_KEY,
} from "./composables/dark";
export type { UseGlobalDarkOptions, DarkModeSyncScriptOptions } from "./composables/dark";
