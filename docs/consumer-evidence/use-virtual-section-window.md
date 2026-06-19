# useVirtualSectionWindow (+ useWindowedStore + the virtualSectionLayout pure core)

## Artefact path

`src/composables/virtual/useVirtualSectionWindow.ts`,
`src/composables/virtual/useWindowedStore.ts`,
`src/composables/virtual/virtualSectionLayout.ts`
(published OFF the root barrel via `@mkbabb/glass-ui/virtual`).

## Lineage — the homecoming (v0.9.4 → retired v1.0 → returned BC)

This engine WAS a glass-ui primitive at v0.9.4. It was retired at v1.0
(`MIGRATION.md §3.2-3.4` — "0 production consumers, demo-only at v0.9.x") and
the `/virtual` subpath was removed. The retirement was correct at v1.0 (no
consumer). It is REVERSED at BC: two binary consumers now overturn the
no-consumer verdict, so the windowing engine comes HOME — a re-promotion, not a
fresh mint. The machinery is byte-faithful to the proven words transposed copy
(which carried the lineage docstring "Transposed from @mkbabb/glass-ui v0.9.4
(retired at v1.0)"), save the three recorded refinements: the binary-search
`findSectionOffset`, the house `useResizeObserver` leaf, and the shared
`SectionHierarchy` type-reconcile.

## Current consumer proof (≥ 2 binary consumers)

**Consumer 1 — words `DefinitionContentView` (LIVE).**

- **Project**: `words/frontend`
- **Source path**:
  `../words/frontend/src/components/definition/DefinitionContentView.vue:229`
  (`useVirtualSectionWindow({ overscanBefore: 400, overscanAfter: 800 })` →
  `visibleItems` / `measureSection` / `ensureTargetWindow`;
  `provide(EnsureTargetWindowKey, ensureTargetWindow)` so `ProgressiveSidebar`
  warm-targets a ToC click).
- **Proof**: `rg -n '\buseVirtualSectionWindow\b' ../words/frontend/src/components/definition/DefinitionContentView.vue`
- The companion store consumer:
  `../words/frontend/src/stores/search/modes/wordlist.ts:20,90`
  (`useWindowedStore` for the bounded resident result set — see
  `use-windowed-store.md`).

**Consumer 2 — the dock-search results list (booked, BC.W-DOCK-SEARCH).**

- **Project**: `glass-ui` (Band 13, `BC.W-DOCK-SEARCH`)
- **Use case**: the dock command/search results list composes this SAME
  primitive — a 5000-result fuzzy list renders only the ~20 results near the
  viewport, with `ensureTargetWindow` warming a keyboard-selected far result
  into the window a beat before the scroll lands. The dock-search result
  flattener (the producer) builds `FlatSection`s in the consumer; glass-ui owns
  only the generic windowing contract.

## Off the root barrel (the heavy-DOM-measure-leaf decision, recorded)

The composable is keyframes-FREE + vueuse-FREE, so it is root-barrel-ELIGIBLE
per the `useLiquidFlex` precedent (the SCC-trap does not force it off). It is
DELIBERATELY off the root barrel anyway: it is a heavy DOM-measure leaf with a
module-global `SESSION_HEIGHT_CACHE`, so the subpath-only home is correct (the
spa-view / expandable-container off-root precedent). A consumer that wants it
imports `@mkbabb/glass-ui/virtual`. Recorded in `proof:virtual-window` VW5 + the
CLAUDE leaf line.

## useVirtualGrid stays words-local (the @tanstack fence)

The grid windower (`words/frontend/src/composables/virtual/useVirtualGrid.ts`)
depends on `@tanstack/vue-virtual` + a `WordListItem` consumer type — one
consumer + a hard 3rd-party dep, so the ≥2-consumer bar FAILS for glass-ui.
Re-minting it would drag a tanstack peer onto glass-ui (forbidden). It is NOT
re-minted here; it is the booked sibling IFF a second grid consumer ever lands
(else held — no contrivance). VW5's self-test bite REDs a `@tanstack/vue-virtual`
import anywhere in `src/`.

## Active-section reader reconcile (one reader per concern, recorded)

The windowing's `resolveActiveSection` / `activeId` is the RENDER-window-local
reader (the section at the 20%-viewport mark, labelling the current render
window). It is NOT the ToC's binding active reader: a sidebar/ToC consumer reads
`useScrollTracker.activeId` (the deepest-visible reader, `BC.W-TOC-RECONCILE`)
for the highlight. The two serve distinct concerns and read distinct marks; they
are deliberately NOT one function. The two readers do not silently both drive the
ToC highlight.

## Keep rationale

The primitive has two binary consumers (one LIVE, one booked) and encodes the
proven windowing/warm-target/race-guard behaviour that would be easy to
reimplement inconsistently in product code. The named surface is justified while
both consumers remain active.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for the
`composables/virtual` leaf while the proof commands still find current consumers.
If both grep targets fail, the verdict returns to `library-orphan`.
