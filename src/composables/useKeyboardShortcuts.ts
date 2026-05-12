// Legacy import path — the canonical home for the keyboard-shortcuts
// registry is now `src/composables/keyboard.ts` (the subpath-barrel
// implementation file). This shim keeps internal `./useKeyboardShortcuts`
// and `../useKeyboardShortcuts` imports compiling without churn during
// L.W2's planned composables modularization sweep.
//
// New code should import from the subpath:
// `@mkbabb/glass-ui/composables/keyboard`.
export * from "./keyboard";
