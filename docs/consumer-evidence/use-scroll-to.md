# useScrollTo (the rAF-retry scroll-to-id + treeIndex-aware partial-load)

## Artefact path

`src/composables/sidebar/useScrollTo.ts`
(published via `@mkbabb/glass-ui/sidebar`; option type on `/api`).

## Reconcile lineage (BC.W-TOC-RECONCILE)

One of the three latex-paper-only leaves of the ToC-tracking family that
glass-ui/sidebar LACKED. The 3-way fork (glass-ui canon + the latex-paper older
static-array tracker + the words wordlist-actions consumer) reconciled onto the
ONE canonical home; this leaf is generalized off latex-paper's
`src/vue/tracking/useScrollTo.ts` — GENERIC-count-sourced (`totalCount: number`
+ `visibleCount: Ref<number>` plain params + a `treeIndex: Map<string,
TreeIndexEntry>`), NOT WordList-coupled. See the reconcile-ledger:
`docs/tranches/BC/audit/W-TOC-RECONCILE-ledger.md`.

## Current consumer proof (≥ 2 binary consumers)

**Consumer 1 — words `ProgressiveSidebar` (LIVE, on the `^4.x` bump).**

- **Project**: `words/frontend`
- **Source path**:
  `../words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue`
  already imports `useScrollTracker` + `useSidebarFollow` from
  `@mkbabb/glass-ui/sidebar`; on the `^4.x` bump it adopts `useScrollTo` for the
  ToC-click scroll-to (replacing the latex-paper-fork import), composing
  `ensureTargetWindow` (the warm) before `scrollTo` (the land).
- **Proof**: `rg -n '\buseScrollTo\b' ../words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue`

**Consumer 2 — the dock-search result-select (booked, BC.W-DOCK-SEARCH).**

- The dock-search `onResultSelect` wires `ensureTargetWindow(id)` (warm the
  window) + `useScrollTo.scrollTo(id)` (the rAF-retry scroll-and-land) — the
  words `scrollToSelectedResult` generalized onto the shipped ToC + windowing
  leaves (`BC.W-DOCK-SEARCH.md §54, DS5`).
- **Proof (post-DOCK-SEARCH)**: `rg -n '\buseScrollTo\b' src/components/custom/dock/composables/useDockSearch.ts`

**Consumer 3 — latex-paper reader (on the `^4.x` bump).**

- latex-paper DELETES `src/vue/tracking/` ENTIRELY and re-points the reader's
  ToC-click scroll-to to `@mkbabb/glass-ui/sidebar`'s `useScrollTo` (the
  consume-and-delete cadence; clean break, no alias).

## The virtual-window bridge (one reader per concern, recorded)

`useScrollTo` owns ONLY the `visibleCount` partial-load + the rAF-retry settle.
The windowing warm is the CONSUMER's compose: ToC-click →
`useVirtualSectionWindow.ensureTargetWindow(id)` (warm) → `scrollTo(id)` (land).
The two leaves are file-disjoint, joined at the call site — `useScrollTo` does
NOT import the windowing engine.

## Keep rationale

Two binary consumers (one adopting on the bump, one booked) plus the
demo exerciser. The leaf encodes the proven rAF-retry-settle + treeIndex-aware
partial-load behaviour that product code would re-roll inconsistently. The named
surface is justified while both consumers remain active.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for the
`useScrollTo` leaf while the proof commands find current consumers. If the grep
targets fail, the verdict returns to `library-orphan`.
