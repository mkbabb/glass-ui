# BC words-subsume — research corpus (the dock-as-dynamic-search-bar + the three abstractions)

**Scope:** deep-read `/Users/mkbabb/Programming/words/frontend` to ground (a) the dock-as-native-dynamic-search-bar subsume, and (b) the three abstractions — virtualized-windowing, ToC-tracking, fuzzy-pipeline. Every facility classified GENERIC-abstractable vs words-specific, with the dedup verdict against the EXISTING glass-ui `search/`+`sidebar/`+`motion/`+`dock/`.

---

## 0 — Headline findings (the dedup verdicts)

| Facility | Lives in words at | glass-ui status | Verdict |
|---|---|---|---|
| **Virtualized-windowing** (`useVirtualSectionWindow` + `virtualSectionLayout` + `useWindowedStore`) | `src/composables/virtual/*` (verbatim copy) + `latex-paper/src/vue/composables/*` (2nd fork) | **ABSENT** — existed at v0.9.4, **RETIRED at v1.0** | **RE-MINT** into glass-ui (reverse the retirement) |
| **ToC-tracking** (`useScrollTracker`/`useTreeIndex`/`useSidebarFollow`) | `latex-paper/src/vue/tracking/*` (older fork) + words already imports glass-ui's | **PRESENT + canonical** in `composables/sidebar/` (the most-evolved) | **RECONCILE the 3-way fork** onto glass-ui; add the 3 missing leaves; NO re-mint |
| **Fuzzy pipeline** (matcher + composable) | words has NONE client-side — its fuzzy is **backend** (`api/search.ts mode=fuzzy`) | **PRESENT + complete** in `search/` (`fuzzySearchIndex` + `useFuzzySearch`) | glass-ui is already canonical CLIENT pipeline; **HARDEN + dock-wire**; one-directional (words keeps network) |
| **Dynamic-search-bar behaviors** (shrink-on-scroll, autocomplete, result-nav, abort) | `src/components/custom/search/composables/*` (~7) | dock state machine exists; **no search/shrink** | **NEW dock-search seam** subsuming the expressive behaviors |

The **virtualized-windowing primitive literally USED TO BE a glass-ui primitive** — `words/frontend/src/composables/virtual/useVirtualSectionWindow.ts:23-26` carries the docstring: *"Transposed from @mkbabb/glass-ui v0.9.4 (retired at v1.0; see MIGRATION.md §3.2). Verbatim copy — no glass-ui private dependencies."* The same note is on `virtualSectionLayout.ts:7-9` (§3.4) and `useWindowedStore.ts:3-5` (§3.3). This is a **retirement to reverse** — the cleanest possible abstraction case (it was ours, the consumers are real, the code is proven).

---

## 1 — Virtualized-windowing (the RE-MINT — `BC.W-VIRTUAL-WINDOW`)

### 1a. `virtualSectionLayout.ts` (the pure layout engine — `words .../virtual/virtualSectionLayout.ts:1-217`)
Stateless pure functions, **no Vue, no DOM** (`:5-10`). The abstractable core:
- `FlatSection` (`:12-21`): `{id, index, depth, parentId, rootId, rootIndex, estimatedHeight}` — the generic windowing input.
- `buildSectionLayout(items, getHeight)` (`:57-78`): sequential `top`/`bottom` offsets, `Math.max(1, round(h))`.
- `findStartIndex`/`findEndIndex` (`:84-122`): **binary search**, O(log n) — the perf core.
- `resolveSectionWindow(layout, scrollTop, vpH, overscanBefore, overscanAfter, forcedRange?)` (`:131-174`): the windowed range + `topSpacerPx`/`bottomSpacerPx`; `forcedRange` is the warm-target injection.
- `resolveActiveSection(layout, offset)` (`:182-200`): the "active at offset" lookup (for ToC highlight).
- `findSectionOffset(layout, id)` (`:206-216`): pixel offset by id (for scroll-to).

**GENERIC** — fully abstractable. Zero words types.

### 1b. `useVirtualSectionWindow.ts` (the reactive composable — `words .../virtual/useVirtualSectionWindow.ts:1-343`)
- Config (`:28-51`): `items` (MaybeRefOrGetter), `scrollContainer`, `contentEl` (excludes non-virtualized headers above), `overscanBefore/After` (default vpH / 2×vpH), `warmTargetBefore/After` (2/3).
- `SESSION_HEIGHT_CACHE` (`:54`): module-level shared height cache across instances — survives remounts.
- `measureSection(id, el)` (`:191-209`): template-ref callback `:ref="(el)=>measureSection(item.id, el)"`, swaps estimated→measured height.
- `ensureTargetWindow(id)` (`:215-226`): forces an item into the window + a **320ms auto-release** (`:166-172`) — the scroll-to prerequisite.
- `activeId`/`activeRootId` (`:328-330`): the section at the **20%-viewport mark** (`:146-149`) — drives ToC.
- rAF-coalesced scroll (`:243-249`) + ResizeObserver on container AND contentEl (`:233-241`, `:288-302`).
- Returns `visibleItems`/`topSpacerPx`/`bottomSpacerPx`/`measureSection`/`ensureTargetWindow`/`getOffsetFor`/`activeId`/`activeRootId`/`recalculate` (`:332-342`).

**GENERIC** — abstractable. The only types are `FlatSection`-derived.

### 1c. `useWindowedStore.ts` (the sliding-window store — `words .../virtual/useWindowedStore.ts:1-91`)
- `set(items, replace)` (`:50-65`): replace resets window+bumps generation; append evicts from front past `maxResident` (default 200).
- `prepend(items, newWindowStart)` (`:73-82`): backward load, evicts from end.
- `appendIfCurrent(items, expectedGeneration)` (`:67-71`): **generation-counter race-guard** — rejects a stale append after a reset. This is the load-bearing concurrency primitive.

**GENERIC** — abstractable.

### 1d. `useVirtualGrid.ts` — STAYS WORDS-LOCAL
`words .../virtual/useVirtualGrid.ts:1-115` depends on `@tanstack/vue-virtual` (`:2`) + `WordListItem` (`:3`). It is a column-grid windowing over a 3rd-party virtualizer for the wordlist view. **WORDS-SPECIFIC** — the ≥2-consumer bar fails for glass-ui (one consumer, a hard 3rd-party dep). Do NOT abstract; `words/frontend/src/composables/virtual/index.ts:2-5` already labels it *"Project-specific virtual scrolling (not in glass-ui)."*

### 1e. The ≥2-consumer evidence (the windowing IS used + wired to ToC)
- `DefinitionContentView.vue:162,224-244`: `useVirtualSectionWindow({...})` → `visibleItems`/`measureSection`/`ensureTargetWindow`, and **`provide(EnsureTargetWindowKey, ensureTargetWindow)` (`:244`)** so the sidebar can warm-target.
- `ProgressiveSidebar.vue` (the ToC) injects it to scroll-to-section.
- The wordlist view consumes `useWindowedStore` + `useVirtualGrid`.

→ Two real binary consumers in words (+ the slides/sci-report potential). **Re-mint is justified.**

### 1f. Re-mint dedup against glass-ui
glass-ui's existing scroll primitives are NOT windowing: `useScrollProgress` (0..1 element progress, native scroll-timeline dual-path), `useIntersectionPause`, `useInfiniteScroll` (load-more sentinel, NOT virtualization), `FadingScroll` (edge fade). **None overlap** with section-windowing. Confirmed by `grep -rl "useVirtualSectionWindow|useWindowedStore|buildSectionLayout|virtualizer" src/` → **ZERO hits**. Re-mint is net-new (a restoration).

---

## 2 — ToC-tracking (the RECONCILE — `BC.W-TOC-RECONCILE`)

This is a **3-way fork**, NOT a re-mint:

| Copy | Path | Signature drift |
|---|---|---|
| **A (canon)** | glass-ui `src/composables/sidebar/useScrollTracker.ts` | `roots: MaybeRefOrGetter<T[]>` (reactive), `mounted` guard, re-observe on `visibleCount` |
| **B (older fork + extra leaves)** | `latex-paper/src/vue/tracking/*` | `roots: T[]` (static array), no mounted-guard; BUT carries `useScrollTo`/`useClickDelegate`/`useLazyLoader` that **glass-ui LACKS** |
| **C (consumer)** | words `src/components/custom/sidebar/composables/useSidebarWordlistActions.ts` | thin |

### 2a. The PROOF glass-ui is already the canonical home
`words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue:60-61` imports **`useScrollTracker` + `useSidebarFollow` FROM `@mkbabb/glass-ui/sidebar`** already (`:92` `useScrollTracker(...)`, `:99` `useSidebarFollow(...)`, `:107` syncs `activeId`). So the ToC primitives are CONSUMED from glass-ui today — the fork is the drift, not a missing home.

### 2b. The mechanism (both forks agree)
`latex-paper/src/vue/tracking/useScrollTracker.ts:1-257`: IntersectionObserver (`rootMargin "-20% 0px -60% 0px"`, `:24`) + a **scroll-event fallback for fast scrollbar drags** (`:89-138` rAF-throttled closest-to-active-zone) + **deepest-visible-wins** (`:46-56`), `forceRecalculate` synchronous (`:212-254`), `lockTracking`/`unlockTracking`, and **auto-scroll the sidebar to the active TOC item** via `[data-toc-id="${id}"]` querySelector (`:192-205`). glass-ui's copy (`useScrollTracker.ts:1-50+`) is the same shape but reactive-roots.

`useTreeIndex.ts` (`latex-paper .../useTreeIndex.ts:1-66`): O(1) flat index + `isActive`/`isInActiveChain`/`isDescendant`. glass-ui has the same (`composables/sidebar/types.ts:11-19` `TreeIndexEntry`, barrel exports `buildTreeIndex/isActive/isInActiveChain`).

`useSidebarFollow.ts` (`latex-paper .../composables/useSidebarFollow.ts:1-235`): the damped sidebar-follow with **manual-override suspension** (wheel/touch/pointer/keydown/scroll → `suspendForManualInteraction`, `:22-33`), `programmaticScrollDepth` guard (`:63-72`), deadzone (`:56`), damping 0.22 (`:13`). glass-ui has its own copy (`composables/sidebar/useSidebarFollow.ts:8454B`).

### 2c. The leaves glass-ui MISSES (add on reconcile)
- `useScrollTo` (`latex-paper .../tracking/useScrollTo.ts:1-66`): scroll-to-id with rAF-retry (max 60) + **treeIndex-aware partial-load** (`ensureTargetLoaded` loads up to target's `rootIndex+2`, `:15-30`) — the exact ToC-click→virtual-window-warm→scroll bridge. **Generalize** off WordList `totalCount`/`visibleCount` to a generic count source.
- `useClickDelegate`, `useLazyLoader` — generic tracking leaves.

### 2d. Verdict
**Extend glass-ui/sidebar in place** (the no-second-engine + the box-inviolate-for-sidebar fences): adopt the reactive-roots canon, ADD `useScrollTo`/`useClickDelegate`/`useLazyLoader`, fold the `data-toc-id` auto-scroll + `forceRecalculate`. words + latex-paper retire their forks on the `^bump` (THEIR edit — foreign-tree fence). **No re-mint.** This wave wires onto `BC.W-VIRTUAL-WINDOW` (ToC click → `ensureTargetWindow` → `useScrollTo`).

---

## 3 — Fuzzy pipeline (HARDEN + dock-wire — `BC.W-FUZZY-HARDEN`)

### 3a. glass-ui ALREADY ships the canonical CLIENT fuzzy pipeline — NOTHING to abstract from words
- `glass-ui src/components/custom/search/composables/fuzzySearchIndex.ts:1-244`:
  - `fuzzyMatch(pattern, text)` (`:39-89`): **VSCode-style subsequence scorer** — start `+8`, after-word-sep `+7`, camelCase-boundary `+6`, consecutive-run `+5`, prefix-align `+3`, base `+1`, excess `-0.1` (`:56-86`).
  - `multiTokenFuzzy` (`:102-118`): whitespace tokens, **AND-logic** (every token must match).
  - `scoreEntry` (`:124-148`): weighted fields — `label×12`, `type×10`, `text×3`.
  - `searchIndex` (`:185-233`): **prefix-narrowing WeakMap cache** (`:204-219` narrows from the `q.slice(0,-1)` result set), `maxResults` default 30, cache-clear at 200.
  - `SearchableItem = {label, text, type?}` — generic.
- `useFuzzySearch.ts:1-149`: debounce (default 120ms, `:23`), `query`/`results`/`isOpen`/`isExpanded`/`selectedIndex`/`debouncedQuery`, keyboard nav (`onKeydown` Arrow/Enter/Escape, `:101-130`), modal-expand (`toggleExpanded`), `onSelect`, `onScopeDispose` cleanup (`:132-135`). Plus the SFCs `SearchBar.vue` + `FuzzySearch.vue` (`search/index.ts:1-9`).

### 3b. words' fuzzy is BACKEND — one-directional fence
- `words api/search.ts:10-43`: `GET /search?q=&mode=` where mode ∈ `smart|exact|fuzzy|semantic` — the matching is server-side (Python `SearchParams`, `:8`). 429-drops + AbortSignal (`:33-39`).
- `words lookup.ts:18`: `SearchMethod = 'smart'|'exact'|'fuzzy'|'semantic'` — backend modes, not a client matcher.
- The only words-side fuzzy-PIPELINE contribution is the **NETWORK orchestration race-guard** (`lookup.ts:254-289`): `prepareSearch()` → `{controller, generation}`, `isCurrentGeneration(gen)`, `finalizeSearch(gen)`, `cancelSearch()` (bumps `searchGeneration` + aborts). Mirrored in `useLookupSearch.ts:36-110` (stale-generation + query-changed + mode-switch guards). This is a **generic async-search race-guard** — abstractable IFF ≥2 consumers (the dock async mode + a network consumer); else BOOK (no contrivance).

### 3c. Verdict
glass-ui/search is the canonical CLIENT fuzzy home — **no edit to the scorer** (it is SOTA-correct). HARDEN the dock-ready surface. The abstraction is **one-directional**: glass-ui owns the client matcher; words keeps its network orchestration (it is the dock's pluggable data source, not a fold). Optionally mint `useAsyncSearch` (the generation-counter race-guard) ONLY if a 2nd consumer is real.

---

## 4 — The dynamic-search-bar behaviors (the DOCK subsume — `BC.W-DOCK-SEARCH`)

The words `SearchBar.vue` composes ~7 behaviors (`SearchBar.vue:18-26` imports `useSearchBarUI/Bindings/Navigation/useFocusManagement/useModalManagement/useSearchBarScroll/useAutocomplete`). These are the EXPRESSIVE behaviors the dock must subsume.

### 4a. Shrink + opacity on scroll (the staple ask) — `useSearchBarScroll.ts:1-112` + `utils/scroll.ts:1-176`
- **transform-only** scale `1→0.85` + opacity `1→0.65` keyed off `scrollProgress` (`useSearchBarScroll.ts:84-97`); maxWidth held CONSTANT to avoid reflow (`:69-72` — the proof:no-layout-animation discipline, already correct).
- **interactive hysteresis**: expand immediately on focus/hover/dropdown, shrink with 150ms delay (`:41-60`).
- `utils/scroll.ts`: `calculateScrollProgress(scrollY, docH)` (`:29-42`), `calculateIconOpacity` (cubic-ease fade `0.4→0.85` of the inflection point, `:53-90`), `calculateContainerStyle` (continuous scale/opacity/width, `:101-149`). The **`scrollInflectionPoint` is the trigger-point** the user names.

**glass-ui dedup:** glass-ui ships `useScrollProgress` (`composables/motion/useScrollProgress.ts:42+`) — the **native scroll-timeline dual-path** (the CSS `.scroll-progress` recipe owns the compositor when supported, the composable is the fallback writer). This is STRICTLY BETTER than words' hand-rolled scroll listener. → The dock-search shrink should drive off `useScrollProgress`, NOT re-fork words' listener.

### 4b. Autocomplete ghost-text — `useAutocomplete.ts:1-153`
Top-match prefix completion (`updateAutocomplete:25-53` — `result[0]` if `startsWith(query)`), filled by Space/Tab/ArrowRight (`handleSpaceKey/handleArrowKey:78-116`). **GENERIC** — generalize off the fuzzy `results[0]`.

### 4c. Keyboard result-nav — `useSearchBarNavigation.ts:79-125`
`navigateResults(dir)` + `scrollToSelectedResult` (`:96-125` scrolls the selected into the dropdown viewport). Mode-handlers route on Enter (`:130-236`). **glass-ui dedup:** `useFuzzySearch.onKeydown` (`useFuzzySearch.ts:101-130`) ALREADY does Arrow/Enter/Escape. The dock-search composes that; the scroll-into-view is a thin add.

### 4d. The dock state machine (the EXISTING substrate to compose)
`useDockState.ts`: `collapsed|hover|pinned` (`:91`), ref-counted `keepOpen/release` holds (the search-gesture hold), `HOVER_INTENT_MS` hysteresis, `onClickCollapsed→pinned` (expand-on-click). `useDockHold`, `useDockMorphWindow`, `useDockOrientationMorph`, `dockMorphContext` (the box morph — **byte-untouched**, the box-inviolate fence). The dock-search seam is a NEW mode BESIDE these, NOT a `dockMorphContext` edit.

### 4e. Verdict
A NEW dock-search seam composes: `useDockState` (expand/hold) + the hardened `useFuzzySearch` (dropdown + autocomplete + keyboard) + glass-ui's `useScrollProgress` (shrink/opacity on scroll, native dual-path) + tunable trigger-point tokens (`--dock-search-shrink-start/end`) + a result-select that wires `BC.W-VIRTUAL-WINDOW.ensureTargetWindow` + `BC.W-TOC-RECONCILE.useScrollTo`. words' `SearchBar.vue` + its 7 composables RETIRE onto `<GlassDock search>` (their repo edit, foreign-tree fence). The network data source plugs via an `onSearch` prop (the consumer owns `useLookupSearch`'s abort/network — the dock owns the gesture/shrink/dropdown). **No second scroll engine, no dockMorphContext edit, no client-fuzzy in words.**

---

## 5 — latex-paper primitive set (context — the windowing INPUT producer)

`latex-paper/src/index.ts` + `vue/index.ts`: the package is a LaTeX/BibTeX parser + a Vue render layer. The "latex-paper primitives" relevant to BC are:
- `flattenPaperSections(sections)` → `FlatPaperSection[]` (`latex-paper/src/paper/flattenPaperSections.ts:91-133`) — walks the section tree to the flat `{id,index,depth,parentId,rootId,rootIndex,estimatedHeight}` list, with `estimatePaperSectionHeight` (`:73-89`, heading+content+callout heuristics). **This is the INPUT to `useVirtualSectionWindow`** — the bridge between paper content and windowing. WORDS/PAPER-SPECIFIC (LaTeX AST), but the OUTPUT shape (`FlatPaperSection extends FlatSection`) is exactly the generic windowing contract → the abstraction boundary is clean: glass-ui owns `FlatSection` + the windowing; latex-paper owns `flattenPaperSections` (the producer).
- `vue/tracking/*` — the ToC primitives (§2, reconcile onto glass-ui).
- `vue/composables/{useKatex,usePaperReader,useVirtualSectionWindow,useSidebarFollow}` — `usePaperReader`/`useKatex` are paper-specific; the windowing+follow are the forks (§1, §2).

**The clean abstraction boundary:** glass-ui = generic windowing (`FlatSection`) + ToC-tracking + fuzzy + dock-search; latex-paper/words = the domain producers (`flattenPaperSections`, the wordlist grid, the network search).

---

## 6 — DRY/KISS fences (what NOT to abstract)
- **NOT** `useVirtualGrid` (3rd-party `@tanstack/vue-virtual` dep + `WordListItem`, single consumer — words-local).
- **NOT** the words network search (`api/search.ts`, `useLookupSearch.ts`) — backend-coupled; the consumer plugs it via `onSearch`.
- **NOT** a 3rd ToC fork — reconcile onto the existing glass-ui/sidebar.
- **NOT** a hand-rolled dock scroll listener — compose `useScrollProgress`.
- **NOT** `useAsyncSearch` unless ≥2 real consumers (book it; the client fuzzy needs no abort).
- The mode-multiplexing (`search-bar.ts` lookup/wordlist/wotd/stage, `:79-84`) is words-app domain state — NOT abstracted; the dock-search is mode-agnostic (one input, one result source).

---

## 7 — Wave dependency notes (for PLAN)
- `BC.W-VIRTUAL-WINDOW` and `BC.W-TOC-RECONCILE` are independent re-mint/reconcile; `BC.W-DOCK-SEARCH` consumes BOTH + `BC.W-FUZZY-HARDEN`.
- `BC.W-FUZZY-HARDEN` is near-zero (the pipeline exists) — mostly a surface-confirm + the optional `useAsyncSearch` decision.
- `BC.W-DOCK-SEARCH` is the largest — it is the user's "DOCK as native dynamic-search-bar" headline. It must NOT touch `dockMorphContext`/`DOCK_SPRING` (box-inviolate) and must use `useScrollProgress` (no second scroll engine).
- All three abstraction waves reverse a real fragmentation (the v0.9.4 retirement + the 3-way ToC fork) — the consumers (words) are real and will delete their forks on the `^bump`, which is THEIR repo edit (the foreign-tree fence; this tranche edits ZERO sibling tree).