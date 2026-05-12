// Sub-tree barrel for dark-mode composables.
//
// Resolved by both:
//   - The flat public subpath `@mkbabb/glass-ui/dark` (`src/dark.ts` re-exports
//     `./composables/dark`, which lands here).
//   - Internal consumers that `import { useGlobalDark } from ".../composables/dark"`.
export { useGlobalDark } from "./useGlobalDark";
