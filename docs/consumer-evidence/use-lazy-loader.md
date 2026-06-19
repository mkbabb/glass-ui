# useLazyLoader (the progressive batch-render count)

## Artefact path

`src/composables/sidebar/useLazyLoader.ts`
(published via `@mkbabb/glass-ui/sidebar`; option type on `/api`).

## Reconcile lineage (BC.W-TOC-RECONCILE)

One of the three latex-paper-only leaves of the ToC-tracking family glass-ui
LACKED. Generalized off latex-paper's `src/vue/tracking/useLazyLoader.ts`: an
IntersectionObserver grows a `visibleCount` RENDER-MOUNT count by `batchSize` as
a bottom sentinel enters, plus a rAF-coalesced fast-drag scroll fallback and a
sentinel re-observe on each `visibleCount` change. See the reconcile-ledger:
`docs/tranches/BC/audit/W-TOC-RECONCILE-ledger.md`.

## DISTINCT from useInfiniteScroll (no duplicate — recorded)

- **`useLazyLoader`** (`composables/sidebar/`): grows a RENDER-MOUNT count over
  an ALREADY-loaded list — the render batch.
- **`useInfiniteScroll`** (`components/custom/infinite-scroll/composables/`):
  fires a DATA-FETCH `onLoadMore` trigger to pull MORE records — the fetch
  trigger.

Different concerns, kept disjoint. `proof:toc-reconcile` TR5 reds a lazy-loader
that fires an `onLoadMore`/`fetch` data-trigger. The house `useInfiniteScroll`
engine is UNCHANGED (not collapsed).

## Current consumer proof (≥ 2 binary consumers)

**Consumer 1 — words `ProgressiveSidebar` / definition view (on the `^4.x` bump).**

- **Project**: `words/frontend`
- **Source path**: the progressive-render path adopts `useLazyLoader` for the
  batch-render `visibleCount` (the source `useScrollTo.ensureTargetLoaded`
  jumps), replacing the latex-paper-fork import.
- **Proof**: `rg -n '\buseLazyLoader\b' ../words/frontend/src`

**Consumer 2 — latex-paper reader (on the `^4.x` bump).**

- latex-paper DELETES `src/vue/tracking/` ENTIRELY and re-points the reader's
  progressive batch-render to `@mkbabb/glass-ui/sidebar`'s `useLazyLoader` (the
  consume-and-delete cadence; clean break, no alias).

**Consumer 3 — the toc-tracking demo exerciser.**

- `demo/stories/navigation/toc-tracking.vue` grows the rendered section batch via
  `useLazyLoader` as the document scrolls (the binding-π exerciser, recorded).

## Keep rationale

Two binary consumers (both adopting on the bump) plus the demo exerciser. The
leaf encodes the proven progressive batch + IO + fast-drag-fallback behaviour
that product code would re-roll inconsistently. The `visibleCount` it returns is
the SAME ref `useScrollTo` jumps — they compose. Named surface justified while
both consumers remain active.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for the
`useLazyLoader` leaf while the proof commands find current consumers. If the
grep targets fail, the verdict returns to `library-orphan`.
