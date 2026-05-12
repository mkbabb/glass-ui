// Legacy import path — the canonical home for `useGlobalDark` is now
// `src/composables/dark.ts` (the subpath-barrel implementation file).
// This shim keeps internal `./useGlobalDark` and `../useGlobalDark`
// imports compiling without churn during L.W2's planned composables
// modularization sweep.
//
// New code should import from the subpath: `@mkbabb/glass-ui/composables/dark`.
export { useGlobalDark } from "./dark";
