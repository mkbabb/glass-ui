# W-TOC-RECONCILE — the reconcile-ledger (the diff-and-superset record + the no-third-fork fence)

The 3-way ToC-tracking fork reconciled onto the ONE canonical home:
glass-ui/sidebar. This ledger records the diff (glass-ui canon ⊇ latex-paper),
the three leaves added, and the no-third-fork decision. Machine-asserted by
`proof:toc-reconcile` TR6.

## The 3-way fork (the starting state)

- **(A) glass-ui/sidebar — the canonical, MOST-EVOLVED home.**
  `src/composables/sidebar/`, published via `@mkbabb/glass-ui/sidebar`.
  `useScrollTracker<T>(roots: MaybeRefOrGetter<T[]>, index, options?)` — the
  REACTIVE-roots signature (`toValue(roots)`), a `mounted` guard, re-observe on
  the `watch(() => toValue(roots))` change, IntersectionObserver + the
  rAF-coalesced scroll fallback, `forceRecalculate` / `lockTracking` /
  `unlockTracking`. `useSidebarFollow` carries the damped `data-toc-id` auto-
  scroll (the manual-override / deadzone / `damping=0.22` / `programmaticScrollDepth`
  guard). `useTreeIndex` carries the O(1) flat index + the pure-fn
  `buildTreeIndex` / `isActive` / `isInActiveChain` variants. `useSidebarState`.
- **(B) latex-paper/src/vue/tracking/ — the OLDER static-array fork + the three
  extra leaves.** `useScrollTracker<T>(roots: T[], index, visibleCount, options?)`
  — STATIC roots, NO mounted-guard, a `visibleCount` param + a `sidebarEl` option
  that does an INLINE `data-toc-id` `scrollIntoView`. PLUS three leaves glass-ui
  LACKED: `useScrollTo` / `useClickDelegate` / `useLazyLoader`.
- **(C) words wordlist-actions consumer**
  (`useSidebarWordlistActions.ts`) — a thin wordlist-actions consumer, NOT a
  tracker fork. words has NO own `src/composables/sidebar/` dir.

The PROOF glass-ui is already the canonical home AND already consumed:
`words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue:60-61,92,99`
imports `useScrollTracker` + `useSidebarFollow` FROM `@mkbabb/glass-ui/sidebar`
and passes the REACTIVE-roots getter form. So the fork is the DRIFT (the
latex-paper older copy + the three missing leaves), not a missing home.

## The diff — glass-ui canon ⊇ latex-paper (expected ∅ folds)

| concern | glass-ui canon | latex-paper fork | verdict |
|---|---|---|---|
| `useScrollTracker` roots | `MaybeRefOrGetter<T[]>` (`toValue`) | `T[]` static | canon STAYS; static fork retires |
| `mounted` guard | present (`:35,178,187,196`) | absent | canon STAYS (superset) |
| re-observe on roots change | `watch(() => toValue(roots))` | n/a (static) | canon STAYS (superset) |
| `forceRecalculate` | present | present | both; canon kept |
| `lock/unlockTracking` | present | present | both; canon kept |
| scroll fallback (closest-to-active-zone) | present | present (identical) | both; canon kept |
| `data-toc-id` auto-scroll | in `useSidebarFollow` (damped, deadzone, manual-override) | INLINE in tracker (`scrollIntoView`) | canon's home is RICHER; the inline copy is a DUPLICATE of `useSidebarFollow`'s concern — NOT re-folded into the tracker |
| `visibleCount` re-observe | belongs to `useLazyLoader`'s concern | inline in the static tracker | factored to `useLazyLoader` (§4); NOT a tracker concern |
| `useSidebarFollow` follow-machinery | manual-override + deadzone + `programmaticScrollDepth` + `damping=0.22` | n/a (no follow leaf) | canon ⊇ latex-paper; ∅ folds |
| `useTreeIndex` | + pure-fn `buildTreeIndex`/`isActive`/`isInActiveChain` | bare composable | canon ⊇ latex-paper; ∅ folds |

**Result: glass-ui canon ⊇ latex-paper on every shared concern. ∅ follow/tracker
refinements fold in** — the canon is already the superset. The only latex-paper
content glass-ui LACKED is the three leaves (added below), and the inline
`data-toc-id` auto-scroll (deliberately NOT re-folded — it lives ONCE in
`useSidebarFollow`; re-folding would re-fork the factored concern).

## The three leaves added (the latex-paper-only family members)

- **`useScrollTo`** — the rAF-retry scroll-to-id + treeIndex-aware
  `ensureTargetLoaded` (loads `Math.min(entry.rootIndex + 2, totalCount)` — the
  partial-load — given a `treeIndex`; falls back to `totalCount` otherwise).
  GENERALIZED off latex-paper's WordList-coupled copy: takes `totalCount: number`
  + `visibleCount: Ref<number>` as plain params + a `treeIndex: Map<string,
  TreeIndexEntry>` — NO consumer-type coupling. The `BC.W-VIRTUAL-WINDOW` bridge
  is the consumer's compose: ToC-click → `useVirtualSectionWindow.ensureTargetWindow(id)`
  (warm) → `useScrollTo.scrollTo(id)` (the two leaves file-disjoint, joined at
  the call site).
- **`useClickDelegate`** — the ONE delegated `[data-scroll-target]` click→scroll
  handler for an entire ToC (`closest(selector)` → read `attribute` → `resolve`
  → `scrollTo`). Composes `useScrollTo`'s `scrollTo` (the consumer passes it in).
- **`useLazyLoader`** — the progressive batch-render count: an
  IntersectionObserver grows `visibleCount` by `batchSize` as a bottom sentinel
  enters + a rAF-coalesced fast-drag scroll fallback + a sentinel re-observe on
  `visibleCount` change.

### Recorded refinement (off the byte-faithful latex-paper copy)

- **`useScrollTo.tryScroll` rAF cap.** latex-paper's settle branch re-queued
  `requestAnimationFrame(tryScroll)` with NO `maxAttempts` cap on the
  non-settled path (a potential unbounded rAF loop if the target never settles).
  glass-ui's leaf caps it: `if (attempts < maxAttempts) requestAnimationFrame(tryScroll)`
  on every re-queue. A genuine glass-ui improvement, not a regression.

## `useLazyLoader` vs `useInfiniteScroll` — DISTINCT, not a duplicate

- **`useLazyLoader`** (this wave, `composables/sidebar/`): grows a RENDER-MOUNT
  count (`visibleCount`) over an ALREADY-loaded list — the render batch.
- **`useInfiniteScroll`** (`components/custom/infinite-scroll/composables/`):
  fires a DATA-FETCH `onLoadMore` trigger to pull MORE records — the fetch
  trigger.

Different concerns, kept disjoint. The house `useInfiniteScroll` engine is
UNCHANGED (not collapsed). `proof:toc-reconcile` TR5 reds a lazy-loader that
fires an `onLoadMore`/`fetch` data-trigger.

## The no-third-fork fence (the no-second-engine discipline)

glass-ui/sidebar is the ONE home — the reconcile ADDS the three leaves +
asserts the canon superset; it does NOT re-author the existing four and does NOT
mint a parallel tracker. The `proof:webgl-substrate-single` /
`dockMorphContext`-byte-fence precedent applied to the ToC tracker:

- NO second `useScrollTracker` / `useScrollTo` / `useTreeIndex` **function
  definition** anywhere in `src/` (TR6's `src/`-wide single-definition assert).
- The reactive-roots signature is the only `useScrollTracker` shape — glass-ui
  ships NO static-array shim (clean break, no alias — MEMORY).

## The foreign-tree cut (THEIR repo edit, on the `^4.x` bump)

This wave touches glass-ui's tree ONLY. On the consumer bump:
- **words** — `ProgressiveSidebar` is ALREADY on the getter form; no signature
  change owed. The wordlist-actions consumer re-points any tracking imports to
  `@mkbabb/glass-ui/sidebar`.
- **latex-paper** — DELETES `src/vue/tracking/` ENTIRELY (the static-array
  tracker + the three leaves) and re-points all imports to
  `@mkbabb/glass-ui/sidebar`. Clean break, no alias (MEMORY).
