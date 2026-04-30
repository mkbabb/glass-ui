# isMac

## Artefact path

`src/composables/useKeyboardShortcuts.ts:31`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/useKeyboardShortcuts.ts:70`, `src/composables/useKeyboardShortcuts.ts:71`
**Use case**: The keyboard shortcut matcher uses `isMac` to resolve `Mod` shortcuts to Meta on Apple platforms and Ctrl elsewhere.
**Proof**: `rg -n '\bisMac\b' src/composables/useKeyboardShortcuts.ts`

## Keep rationale

`isMac` is a small exported platform constant, but it is also part of the active shortcut matching implementation. Keeping it avoids duplicating platform detection in consumers that need to display or align with the same `Mod` behavior.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `isMac` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
