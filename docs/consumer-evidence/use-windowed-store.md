# useWindowedStore

## Artefact path

`src/composables/virtual/useWindowedStore.ts:37`

## Current consumer proof

**Project**: `words/frontend`
**Source path**: `../words/frontend/src/stores/search/modes/wordlist.ts:20`, `../words/frontend/src/stores/search/modes/wordlist.ts:90`
**Use case**: Words uses `useWindowedStore` to keep a bounded resident set for wordlist search results while retaining windowed lookup behavior.
**Proof**: `rg -n '\buseWindowedStore\b' ../words/frontend/src/stores/search/modes/wordlist.ts`

## Keep rationale

The composable has a current external consumer and encodes bounded-residency behavior that would be easy to reimplement inconsistently in product code. The named surface is justified while the words consumer remains active.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useWindowedStore` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
