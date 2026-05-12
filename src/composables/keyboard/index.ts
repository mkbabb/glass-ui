// Sub-tree barrel for keyboard-shortcuts registry.
//
// Resolved by both:
//   - The flat public subpath `@mkbabb/glass-ui/keyboard` (`src/keyboard.ts`
//     re-exports `./composables/keyboard`, which lands here).
//   - Internal consumers that import the registrar / formatter helpers from
//     `.../composables/keyboard`.
export * from "./useKeyboardShortcuts";
