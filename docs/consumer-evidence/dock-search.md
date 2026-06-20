# useDockSearch — the dock-as-native-dynamic-search-bar seam

## Artefact path

`src/components/custom/dock/composables/useDockSearch.ts` (re-exported on
`@mkbabb/glass-ui/dock` beside `GlassDock`/`useDockState`/`DockIconButton`, and the
`UseDockSearchOptions`/`UseDockSearchReturn` types on `@mkbabb/glass-ui/api`). The
dock-search seam: `<GlassDock search>` morphs the collapsed pill into a fuzzy
command/search field via the dock's OWN `--dock-morph-t` glide + the byte-untouched
`morph-bridge.css` metaball, composing the SHIPPED `/search` fuzzy pipeline
(`useFuzzySearch`, the VSCode subsequence scorer — NO re-fork) + the optional
`useScrollChrome` shrink + the `useVirtualSectionWindow`/`useScrollTo` results-window/ToC
subsume.

## Verdict

`keep-current` — **user-mandate (d) "the dock IS a search input" (BC.W-DOCK-SEARCH), the
iOS-26/27 `.search`-role tab→search-field metaball morph, with a named cross-repo consumer
(the words `SearchBar` retirement).** The library had every part — the dock state machine,
the metaball bridge, the fuzzy pipeline, the windowing, the ToC scroll-to — but none was
composed into the dock-as-search-bar register the mandate names. `useDockSearch` is the
consuming seam BESIDE the morph engine (the W-DOCKMORPH-CTA precedent — it does NOT edit
`dockMorphContext`/`DOCK_SPRING`, the box-inviolate fence). It re-mints NOTHING: ONE
matcher (`useFuzzySearch`), ONE windowing (`useVirtualSectionWindow`), ONE scroll reader
(`useScrollChrome` → `useScrollTrigger`), ONE morph (the dock's own `--dock-morph-t`).

## Consumer proof (re-runnable)

**Internal consumers — 1 (real).** The dock-search story exercises `<GlassDock search>`
bound to `useDockSearch` over a `<DockStage>` live backdrop — the pill morphing into a
search field, the fuzzy dropdown over a 32-section item set, the autocomplete ghost-text,
the result-select scroll-to-and-warm, the optional collapse-on-scroll:

```bash
grep -rln 'useDockSearch' demo/ src/ \
  | grep -v '/composables/useDockSearch.ts' \
  | grep -v 'src/components/custom/dock/index.ts' \
  | grep -v 'src/components/custom/dock/composables/index.ts' \
  | grep -v 'src/api/index.ts'
#   → demo/stories/dock/dock-search.vue
```

**External consumers — 0 at HEAD (the booked cross-repo consume).** The words app's
`SearchBar.vue` + its ~7 search composables (`useSearchBarScroll`, `useAutocomplete`,
`useSearchBarNavigation`, `useLookupSearch`, …) RETIRE onto `<GlassDock search>` on its
`^4.x` `@mkbabb/glass-ui` bump (the words-subsume). The network orchestration
(`useLookupSearch` abort/generation) stays words-LOCAL, plugged via the pluggable async
`onSearch(query, signal)` data source — the consumer owns the abort/network race-guard,
the dock owns the gesture/shrink/dropdown. The foreign-tree fence (inv-26) holds — this
wave edits ZERO words tree; the retirement is THEIR clean break.

## The named ≥2-consumer TRIGGER

The ≥2-binary bar is MET by construction: #1 the demo dock-search story (in-repo, live at
`/dock/dock-search`), #2 the words `SearchBar` retirement (the named cross-repo consume on
the `^4.x` bump). The async `onSearch` source is the words network case's plug; the
generic generation-counter helper (`useAsyncSearch`) is BOOKED to `BC.W-FUZZY-HARDEN` and
minted ONLY if its OWN ≥2-bar holds (the client fuzzy needs no abort — no contrivance).
