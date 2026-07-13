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
consumer). It was REVERSED at BC on the strength of a live external consumer
(words `DefinitionContentView`) plus a booked internal one (the dock-search
results list). The machinery is byte-faithful to the proven words transposed
copy, save the three recorded refinements: the binary-search
`findSectionOffset`, the house `useResizeObserver` leaf, and the shared
`SectionHierarchy` type-reconcile.

## Current consumer state (honest count: 1 internal live consumer)

**The BC-era ≥2-consumer justification NO LONGER HOLDS.** The external binary
consumer the BC re-promotion rested on has FORKED away, so the honest count at
HEAD is ONE internal live consumer (the glass-ui dock-search results list). This
doc records the honest state; the KEEP-vs-FOLD execution is a B8 disposition (see
below), NOT this wave.

**Consumer 1 — words `DefinitionContentView` — FORKED AWAY (no longer external).**

- **Project**: `words/frontend`
- **Reality at HEAD**:
  `../words/frontend/src/components/custom/definition/components/content/DefinitionContentView.vue:162`
  now imports `useVirtualSectionWindow` from `@/composables/virtual` — a
  words-LOCAL fork (`../words/frontend/src/composables/virtual/useVirtualSectionWindow.ts`
  exists), NOT from `@mkbabb/glass-ui/virtual`. words ships its own copy.
- **Why the old "proof" was misleading**: the recorded grep
  `rg -n '\buseVirtualSectionWindow\b' ../words/.../DefinitionContentView.vue`
  DOES find the symbol — but it resolves the words-local fork, not the glass-ui
  subpath. The grep proved words uses *a* `useVirtualSectionWindow`, never that
  it consumes `@mkbabb/glass-ui/virtual`. words is therefore NOT an external
  binary consumer of this subpath.

**Consumer 2 — the glass-ui dock-search results list (LIVE, INTERNAL).**

- **Project**: `glass-ui` (Band 13, `BC.W-DOCK-SEARCH`)
- **Source**: `src/components/custom/dock/composables/useDockSearch.ts:23,94`
  composes `useVirtualSectionWindow` — a 5000-result fuzzy list renders only the
  ~20 results near the viewport, with `ensureTargetWindow` warming a
  keyboard-selected far result into the window a beat before the scroll lands.
- **Proof**: `rg -n 'useVirtualSectionWindow' src/components/custom/dock/composables/useDockSearch.ts`
- This is a LIVE consumer, but an INTERNAL glass-ui one — not an external binary
  consumer in a second repo.

So the honest tally is: ONE live internal consumer (dock-search), ZERO external
binary consumers (words forked to a local copy). The BC "≥2 binary consumers"
framing is corrected here.

## Off the root barrel (the heavy-DOM-measure-leaf decision, recorded)

The composable is keyframes-FREE + vueuse-FREE, so it is root-barrel-ELIGIBLE
per the `useLiquidFlex` precedent (the SCC-trap does not force it off). It is
DELIBERATELY off the root barrel anyway: it is a heavy DOM-measure leaf with a
module-global `SESSION_HEIGHT_CACHE`, so the subpath-only home is correct (the
spa-view / expandable-container off-root precedent). A consumer that wants it
imports `@mkbabb/glass-ui/virtual`. Recorded in `proof:virtual-window` VW5.

## useVirtualGrid stays words-local (the @tanstack fence)

The grid windower (`words/frontend/src/composables/virtual/useVirtualGrid.ts`)
depends on `@tanstack/vue-virtual` + a `WordListItem` consumer type — one
consumer + a hard 3rd-party dep, so the ≥2-consumer bar FAILS for glass-ui.
Re-minting it would drag a tanstack peer onto glass-ui (forbidden). It is NOT
re-minted here. `proof:virtual-window` VW5's self-test bite REDs a
`@tanstack/vue-virtual` import anywhere in `src/`.

## Active-section reader reconcile (one reader per concern, recorded)

The windowing's `resolveActiveSection` / `activeId` is the RENDER-window-local
reader (the section at the 20%-viewport mark, labelling the current render
window). It is NOT the ToC's binding active reader: a sidebar/ToC consumer reads
`useScrollTracker.activeId` (the deepest-visible reader, `BC.W-TOC-RECONCILE`)
for the highlight. The two serve distinct concerns and read distinct marks.

## Disposition — KEEP-vs-FOLD (deferred to B8)

Under the mechanism-distinctness law, `/virtual` owns a distinct windowing
mechanism (bounded render window + warm-target race-guard + session height
cache) with ONE live internal consumer (dock-search). This wave records the
honest single-internal-consumer count; it does NOT execute a fold. The
KEEP-with-single-consumer-note vs FOLD-onto-internal decision, and the
reconcile of `proof:virtual-window` VW5 (whose framing still asserts a
two-binary-consumer premise that this correction supersedes), are the
`W-ORPHAN-BINARY-SPLIT` / consumer-truth band (B8) — recorded, not re-booked.

## Re-audit proof

The honest greps: words imports the LOCAL fork
(`rg -n "from '@/composables/virtual'" ../words/frontend/src/components/custom/definition/components/content/DefinitionContentView.vue`),
and the sole live consumer is internal
(`rg -n 'useVirtualSectionWindow' src/components/custom/dock/composables/useDockSearch.ts`).
If the dock-search consumer is ever removed, the verdict returns to
`library-orphan` and the subpath folds.
