# BC FEATURE-BAND research — glass-ui scroll/search/windowing/ToC/dock-morph facility census + the abstraction gap

> Agent: `glassui-facility-census`. TRANCHE-DEV ONLY. All findings grounded file:line / measured. Scope: census glass-ui's CURRENT facilities, map COVERED-vs-LACKS against the user-asked feature set (fuzzy ✓, ToC ✓, scroll-progress ✓, windowing —none, robust-scroll-event-system —partial), output the build-vs-reuse map.

## 0 — Headline verdict (the build-vs-reuse map at a glance)

| User-asked facility | glass-ui status | Source-of-truth | BC disposition |
|---|---|---|---|
| **Fuzzy-search pipeline** | ✓ FULLY COVERED | `src/components/custom/search/` (`/search` + `/api`) | REUSE. Wire it into the dock. |
| **ToC tracking (tree-index + active-section + auto-follow)** | ✓ FULLY COVERED | `src/composables/sidebar/` (`/sidebar` + `/api`); words is live consumer #1 | REUSE. Compose into the dynamic-search-bar dock. |
| **Scroll-progress 0..1** | ✓ COVERED (dual-path native/JS single-writer) | `useScrollProgress.ts` | REUSE as a *leg* of the new scroll-trigger system. |
| **Offscreen-pause / PRM frame-gate** | ✓ COVERED | `useIntersectionPause.ts`, `useRAFLoop.ts` | REUSE. |
| **Edge-fade / marquee / infinite-scroll** | ✓ COVERED | `useFadingScroll`, `ScrollingText.vue`, `useInfiniteScroll` | REUSE. |
| **Dock collapse / morph / V↔H** | ✓ COVERED | `useDockState`, `dockMorphContext`, `useDockOrientationMorph` | REUSE the morph; ADD scroll-reactivity beside it. |
| **Virtualized windowing** | ✗ **LACKS** (pruned at v1.0; words carries a transposed copy) | words `frontend/src/composables/virtual/` (was glass-ui v0.9.4) | **RE-PROMOTE** (live external consumer + user mandate). |
| **Robust dock-scroll system** (shrink/opacity-on-scroll, expand-on-interact, trigger-points) | ✗ **LACKS** (GlassDock has zero scroll listeners) | — | **BUILD** `useScrollTrigger` + the dock scroll-behavior wiring. |
| **Dock-as-dynamic-search-bar** | ✗ NET-NEW composition (parts exist, never composed) | — | **BUILD** the composition (FuzzySearch ⊕ GlassDock ⊕ ToC). |

**No existing BC wave covers this FEATURE-BAND.** Verified: the 74 waves in `docs/tranches/BC/waves/` carry NO virtualized-windowing / dock-as-search-bar / dock-scroll-trigger / fuzzy-abstraction wave. `BC.W-PAGE-CHASSIS` owns the **page-hero** scroll-to-shrink (sticky + `scroll()` compositor, `story-hero.css` `.story-hero-shrink`) — a PAGE concern, NOT the dock. The dock-scroll system is genuinely net-new.

---

## 1 — Fuzzy-search pipeline (✓ COVERED — REUSE)

`src/components/custom/search/` — ships via `@mkbabb/glass-ui/search` (package.json:298) + types on `/api` (api/index.ts:176-186).

### `composables/fuzzySearchIndex.ts` — the pure scorer + index (no Vue)
- `fuzzyMatch(pattern, text)` (`:39-89`) — VSCode-style subsequence scorer. Bonuses (`:32-37` doc): +8 start-of-string, +7 after word-separator (` -_./\\:()`), +6 camelCase boundary, +5 consecutive run, +3 prefix-alignment, +1 base, −0.1/excess-char. Returns `{score, matches:number[]}` (matched char indices — these double as the highlight spans).
- `buildIndex(items)` (`:153-162`) — pre-lowercases label/text/type once per item → `SearchIndex<T>` (opaque `IndexEntry<T>[]`).
- `searchIndex(index, query, maxResults=30)` (`:185-233`) — multi-token AND-logic (`:102-118`), field-weighted (`label:12, type:10, text:3`, `:131-135`), **prefix-narrowing cache** (`:205-220` — narrows from the previous query's results via a `WeakMap<index, Map<q, results>>` cache, capped 200 entries). O(n·tokens) per uncached query.
- `clearSearchCache(index?)` (`:236-243`).

### `composables/useFuzzySearch.ts` — the reactive state machine
- `useFuzzySearch({items, debounceMs=120, maxResults=30, onSelect})` → `FuzzySearchState` (`:20-149`). Owns: `query`/`debouncedQuery` (120ms debounce, `:44-60`), `isOpen`/`isExpanded` (popover↔dialog), `selectedIndex` (resets on results change `:74-76`), `results` computed off `searchIndex` (`:70-72`), `onKeydown` (ArrowUp/Down/Enter/Escape `:101-130`), `selectResult`/`close`/`open`/`toggleExpanded`. `onScopeDispose` clears debounce + cache (`:132-135`).
- Types (`composables/types.ts`): `SearchableItem {id,label,text,type?}`, `SearchResult {item,score,matchIndices}`, `FuzzySearchState<T>`.

### `FuzzySearch.vue` — the UI
- Two surfaces: inline `Popover` (`:109-144`, width = trigger width, max-h 50vh) + expand `Dialog` (`:146-176`, `surface="opaque"` ← NOTE: it forces opaque, a glassify candidate). Match emphasis via `useTextHighlight("glass-search-mark")` → CSS Custom Highlight API `::highlight()` (no `<mark>` mutation, `:71-104`). `variant: "sidebar"|"floating"` (`:16`). `defineExpose({focus})`.
- `SearchBar.vue` — a thin `input-bar` wrapper (icon + native input + slot, `:1-44`), `v-model:modelValue`. The bare composeable shell.

**Consumers:** demo `data/search.vue` only (no live src consumer). The words app has its OWN pinia search-bar (`stores/search/search-bar.ts`, 559 LoC) — a multi-mode (lookup/wordlist/word-of-the-day/stage) backend-API-driven machine, NOT the fuzzy-index in-memory pipeline. The two are **distinct registers** — words' is server-search + mode-switching + persistence; glass-ui's is client-side fuzzy-index. The user's "abstracting out the fuzzy-search pipeline" maps to glass-ui's existing in-memory pipeline (REUSE/HARDEN), NOT a fold of the words pinia store (words-specific, not abstractable — presets-in-consumers).

**Gap within search:** `FuzzySearch.vue:147` forces `surface="opaque"` on the expand dialog (a glassify candidate for the iOS-27 mandate). No glass-tier on the inline popover beyond the default Popover surface.

---

## 2 — ToC tracking (✓ FULLY COVERED — REUSE; live external consumer)

`src/composables/sidebar/` — ships via `@mkbabb/glass-ui/sidebar` (package.json:302) + `SidebarState`/`TreeNode`/`ScrollTrackerOptions` on `/api` (api/index.ts:160-173). **THE WORDS APP IS LIVE CONSUMER #1** (`words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue:60-99` imports `useScrollTracker`+`useSidebarFollow`; `navigation/composables/useSidebarState.ts:6` imports `useTreeIndex`).

- `useTreeIndex<T>(roots, {getChildren?})` (`useTreeIndex.ts:21-91`) — builds a flat `Map<id, TreeIndexEntry>` with depth/rootId/parentId/rootIndex; `isActive`/`isInActiveChain`/`isDescendant` helpers. Generic over child-property (the `getChildren` callback — words uses it for non-`children` trees). Pure-fn variants too (`:101-153`).
- `useScrollTracker<T>(roots, index, {rootMargin="-20% 0px -60% 0px", threshold, getChildren?, scrollContainer?})` (`useScrollTracker.ts:17-246`) — **the active-section reader**: an IntersectionObserver (`:152-164`) with a `scroll`-event fallback for fast scrollbar drags (`:87-129`), deepest-visible-node-wins (`:49-59`). Returns `{activeId, activeRootId, forceRecalculate, lockTracking, unlockTracking}`. `lockTracking`/`unlockTracking` (`:37-42`) suppress IO updates during programmatic scroll.
- `useSidebarFollow({sidebarEl, activeId, activeRootId?, scrollSource?, damping=0.22})` (`useSidebarFollow.ts:25-247`) — damped rAF auto-scroll keeping the active item in view, with deadzone (`:64-74`), manual-override suspend (`:35-46`), programmatic-scroll depth-guard (`:76-85`).
- `useSidebarState<T>` (`useSidebarState.ts`) — expand/collapse with user-override sets; composes `useTreeIndex`. `SidebarState` return canon.

**This IS the ToC system the user asked to "ABSTRACT OUT" — already abstracted, already consumed externally.** The BC work is to COMPOSE it into the dynamic-search-bar dock (the dock surfaces the ToC; clicking a result/section navigates + the scroll-tracker highlights). No re-author.

---

## 3 — Scroll-progress + frame-gating (✓ COVERED — REUSE as legs)

- `useScrollProgress({target, offset, trackExit})` (`useScrollProgress.ts:42-111`) — maps a target's viewport position to `Ref<number>` 0..1. **Dual-path single-writer:** `NATIVE_SCROLL_TIMELINE = supportsScrollTimeline()` (`:28`) — on a supporting engine the `.scroll-progress` CSS recipe owns the compositor axis and the composable attaches NOTHING (`:80` early-return, 0 scroll/resize listeners, 0 ResizeObservers); off it, the JS path is the sole writer (`:81-99`). One correct `computeProgress()` on mount in both paths. Ships `/motion-core` + root.
- `useIntersectionPause(target, runtime, {root, rootMargin, threshold, pauseWhenHidden})` (`useIntersectionPause.ts:49-153`) — pauses a `{pause,resume}` runtime while target is offscreen OR document hidden. Returns `{isIntersecting, isDocumentVisible, isPaused, refresh, dispose}`.
- `useRAFLoop(callback, {immediate, pauseWhenHidden, respectReducedMotion})` (`useRAFLoop.ts:97-290`) — scope-aware rAF with document-visibility + live PRM gates + `yieldToMain` INP lever. The substrate every viz frame-loop rides.
- `supportsScrollTimeline()` / `supportsViewTimeline()` (`supportsCssTimeline.ts:38-49`) — hardened against always-true happy-dom/jsdom shims via a negative garbage-value probe (`:27-35`).

These are the **legs** the new dock-scroll-trigger system composes (§7). They are NOT a trigger-point/event system on their own — `useScrollProgress` yields a continuous 0..1 ref, not a `onCross(threshold, dir)` callback.

---

## 4 — Edge-fade / marquee / infinite-scroll (✓ COVERED — REUSE)

- `useFadingScroll(target, {axis="x", fadeStart, fadeEnd})` (`fading-scroll/composables/useFadingScroll.ts:55-132`) — dual-path single-writer (same discipline as useScrollProgress, `:60-63`): writes `--fade-start`/`--fade-end` mask-width customs off live scroll state; native `scroll()` CSS owns it on a supporting engine. PRM is NOT a gate (legibility cue, `:13-17`). `FadingScroll.vue` is the thin scroll-port wrapper. Ships `/fading-scroll`.
- `ScrollingText.vue` (`scrolling-text/`) — overflow-detection marquee; `data-overflows` + `--scroll-distance`/`--scroll-duration` (~80px/s, `:49-63`); hover-pause; PRM → native h-scroll. Ships `/scrolling-text`.
- `useInfiniteScroll({scrollContainer, threshold=200, hasMore, isLoading, onLoadMore})` (`infinite-scroll/composables/useInfiniteScroll.ts:11-73`) — IO sentinel at bottom; re-checks on `isLoading` falling edge (`:56-64`). `InfiniteScroll.vue` is the host. **Forward-only** (no backward/prepend — the windowing primitive in §6 carries that). Ships `/infinite-scroll`.

---

## 5 — Dock collapse / morph (✓ COVERED — REUSE the morph, ADD scroll beside)

- `useDockState({collapseDelay=2500, rootEl, alwaysExpanded, ...})` (`useDockState.ts:77-450`) — 3-state machine `collapsed|hover|pinned`. **Triggers are hover/focus/timer/click ONLY** — `onMouseEnter` with a 60ms `HOVER_INTENT_MS` dwell (`:246-268`), `onMouseLeave` with a `getBoundingClientRect` morphing-edge-sweep recheck (`:142-162`, `EDGE_BAND_PX=24`), `onClickCollapsed→pinned`, click-away→collapse, `keepOpen`/`release` ref-counted holds. **NO scroll input** (decisive for §7).
- `useDockMorphWindow(dockEl, isTransitioning)` (`useDockMorphWindow.ts:67-118`) — owns the `isTransitioning` morph-window lifecycle (generation-guarded settle timer + `transitionend` resolver, the A→B→A no-skip invariant).
- `dockMorphContext.ts` `useDockMorphOrchestrator` (`:141-487`) — ONE `SpringProgress` (DOCK_SPRING `{response:0.32, ζ:0.7}`, constants.ts:69) writing the inheriting `--dock-morph-t` scalar; drives outer collapse↔expand + every nested `<DockLayerGroup>` pane-swap off the one clock; interruptible velocity re-base; PRM synchronous seat (`:361-364`). Reserved-footprint measure helpers carved to `dockMorphMeasure.ts`.
- `useDockOrientationMorph({rootEl, verticalSize, horizontalSize})` (`useDockOrientationMorph.ts:82-255`) — V↔H morph on the same scalar; two-real-DOM-docks + crossfade (topology-jump occluded at t≈0.5); `pin(value)` deterministic capture seam; consumer #1 of `useLiquidFlex`.

**REUSE all of it.** The dock-as-search-bar + dock-scroll system layer BESIDE this machinery (the W-DOCKMORPH-CTA / `useDragMorph` precedent of a CONSUMING seam that never edits `dockMorphContext`/`DOCK_SPRING` — the byte-fence). Confirmed: `grep -nE "addEventListener|scrollY|onScroll|@scroll" GlassDock.vue` → **zero hits**.

---

## 6 — VIRTUALIZED WINDOWING (✗ LACKS — RE-PROMOTE; the smoking-gun gap)

glass-ui has NO windowing primitive at HEAD. **It WAS in glass-ui v0.9.4 and was PRUNED at v1.0** — `MIGRATION.md:320-322`: *"RETIRED composables: useOffsetPagination, useVirtualSectionWindow, useWindowedStore, virtualSectionLayout helpers. /pagination + /virtual subpaths gone."* The words app now carries a **VERBATIM transposed copy**, each file headed *"Transposed from @mkbabb/glass-ui v0.9.4 (retired at v1.0)... Verbatim copy — no glass-ui private dependencies"*:

- `words/.../virtual/useVirtualSectionWindow.ts` (343 LoC, header `:24-26`) — scroll-based section windowing: renders only items near viewport with spacer divs; `measureSection(id,el)` (real-height cache + a module-level `SESSION_HEIGHT_CACHE`, `:54`), `ensureTargetWindow(id)` (warm-target a section into the window 320ms before scroll-to, `:215-226`), `activeId`/`activeRootId` (at 20% viewport mark, `:328-330`), `contentEl` offset (excludes non-virtualized headers, `:108-118`). rAF-coalesced scroll + ResizeObserver. **Live consumer:** `words/.../definition/components/content/DefinitionContentView.vue:229` (`overscanBefore:400/after:800`, provides `ensureTargetWindow` to the sidebar via inject `:251`).
- `words/.../virtual/useWindowedStore.ts` (91 LoC, header `:4-6`) — sliding-window store for paginated/infinite data; forward `set(append)` + backward `prepend` + `maxResident=200` eviction + **generation counter** to reject stale appends after a backward reset (`:67-71`). The backward-scroll half `useInfiniteScroll` lacks.
- `words/.../virtual/virtualSectionLayout.ts` (217 LoC, header `:7-10`) — PURE fns (no Vue, no DOM): `buildSectionLayout` (sequential top/bottom offsets), `resolveSectionWindow` (binary-search start/end + overscan + forced-warm-range), `resolveActiveSection` (binary search), `findSectionOffset` (**linear scan `:206-216` — a DRY/perf nit; binary-searchable**). `FlatSection {id,index,depth,parentId,rootId,rootIndex,estimatedHeight}`.
- `words/.../virtual/useVirtualGrid.ts` (115 LoC) — `@tanstack/vue-virtual` `useWindowVirtualizer` over a column-chunked grid; forward `onLoadMore` + backward `onLoadBefore`. **NOTE: this one is `@tanstack`-bearing + WordListItem-typed = words-SPECIFIC, NOT a glass-ui re-promote candidate** (it would drag a tanstack peer onto glass-ui). Only the section-window trio is the re-promotion set.

### Re-promotion analysis (DRY/KISS)
- **Re-promote** `useVirtualSectionWindow` + `useWindowedStore` + `virtualSectionLayout` to glass-ui (a new `/virtual` subpath or a section under `/motion-core`/`composables/`). The header says "no glass-ui private dependencies" — clean lift, then `words` deletes its copy + imports from glass-ui (consume-and-delete cadence; foreign-tree fence — that edit is words' repo). ≥2-consumer bar: words `DefinitionContentView` is binary consumer #1; the glass-ui demo (a virtualized list/section story) is the exerciser, and any new dock-ToC-windowing consumer is #2.
- **RECONCILE the duplicated active-tracking.** `virtualSectionLayout.resolveActiveSection` (at 20% mark) DUPLICATES `useScrollTracker.findDeepestVisible`/`activeId`. The re-promoted windowing should DEFER active-tracking to `useScrollTracker` (the single source) OR the two should be explicitly factored (windowing owns RENDER-window, sidebar owns ACTIVE-id) — do NOT ship two active-section readers. The `FlatSection` shape ⊇ `TreeIndexEntry` fields (id/depth/parentId/rootId/rootIndex) — they should share a type.
- **Fold the height-cache trap.** `SESSION_HEIGHT_CACHE` is a module-level `Map` (`useVirtualSectionWindow.ts:54`) — fine for one app, but a library leaf should scope it per-instance OR document the session-global as deliberate (a memory note).

---

## 7 — ROBUST DOCK-SCROLL SYSTEM (✗ LACKS — BUILD `useScrollTrigger`)

The user mandate: *"a robust scroll system (expand-on-click, shrink-on-scroll, opacity-on-scroll, trigger-points) leveraging latex-paper primitives."* The GlassDock has **zero scroll-reactivity** (§5 — collapse is hover/timer/click only). The pieces to compose:

### What EXISTS (reuse as legs)
- `useScrollProgress` — continuous 0..1, dual-path. Good for the opacity-on-scroll/shrink ramp.
- `useScrollTracker`'s scroll-handler idiom (`useScrollTracker.ts:87-129`) — rAF-coalesced scroll read + threshold-distance comparison. The trigger-point logic is HERE but locked to the active-section concern.
- The page-hero `.story-hero-shrink` (`BC.W-PAGE-CHASSIS`, `story-hero.css`) — sticky + `animation-timeline: scroll()` + `@keyframes` compositor scale, `@supports`/PRM-gated. The CSS-NATIVE shrink pattern to mirror for the dock (but the dock is NOT sticky-in-flow; it floats, so it needs a JS-or-`scroll()` reader that writes a `--dock-scroll-t`).

### What to BUILD (the genuine gap)
- **`useScrollTrigger(target/scrollSource, { triggers: TriggerPoint[] })`** — a generalization that emits discrete crossing events (`onEnter`/`onLeave`/`onCross(threshold, direction)`) AND a continuous `progress` ref, off the SAME rAF-coalesced reader `useScrollProgress`/`useScrollTracker` already speak. A `TriggerPoint = {at: px|percent, dir?: "down"|"up", onCross}`. This is the missing "trigger-points" register. Native-first: where `scroll()`/`view()` timelines suffice (the shrink/opacity ramp), write the `--scroll-t` custom on the compositor; the discrete `onCross` callbacks are the JS leg (no native equivalent). DUAL-PATH single-writer discipline (the house pattern).
- **Dock scroll-behaviors** — `<GlassDock :scrollBehavior="{ shrinkOn: 'down', opacityOn: 'down', expandOn: 'interact', threshold: 120 }">` wiring `useScrollTrigger` into `useDockState` (a scroll-down past threshold → `collapse()`; scroll-up → `expand()`; opacity/scale ramp off the continuous `progress` → `--dock-scroll-shrink-t`/`--dock-scroll-opacity` customs read by `dock/morph.css`). Compositor-only (`proof:no-layout-animation` floor), PRM → discrete snap (no ramp). This is the iOS-style "search bar shrinks/hides as the list scrolls, expands on tap" behavior the dynamic-search-bar needs.
- **DRY:** `useScrollTrigger` should be the ONE scroll-event reader; `useScrollProgress` becomes a thin `progress`-only view of it OR they share the rAF-coalesce core (the `useScrollTracker.ts:87` `onScroll`+rafId idiom factored once). Do NOT ship a third scroll listener.

---

## 8 — Dock-as-dynamic-search-bar (✗ NET-NEW composition)

FuzzySearch (§1) ✓ + GlassDock (§5) ✓ + ToC (§2) ✓ all exist but are **NEVER composed** — no dock consumes search (grep: zero `FuzzySearch`/`SearchBar` references under `dock/`). The composition (the user's "DOCK as native dynamic-search-bar, subsuming the words app search bar") is net-new:
- A dock variant/mode that hosts a `SearchBar`/`FuzzySearch` input in the collapsed pill (the macOS Spotlight / iOS-27 dynamic-search-bar register), expanding to results + ToC on focus, shrinking/hiding on scroll (§7).
- It composes the EXISTING parts; it does NOT re-author search or the dock morph. The words pinia search-bar (`stores/search/search-bar.ts`) is words-SPECIFIC (backend modes/persistence) and is NOT abstractable into glass-ui (presets-in-consumers — words wires its own modes onto the glass-ui dock-search chassis).

---

## 9 — Latex-paper primitives note

The user mandate cites "latex-paper primitives" for the scroll system. `words/frontend/latex-paper/` is a separate published package (`@mkbabb/latex-paper`) — NOT yet read in depth here (out of this agent's assigned src/ scope), but its `src/` exists and is the paper-rendering substrate the words ToC/windowing renders into. A sibling research agent (or a follow-up) should census `latex-paper/src/` for the paper-section/ToC-node shape the windowing keys off (the `FlatSection.estimatedHeight`/`id` contract). Flagging for the orchestrator: the windowing re-promotion's `FlatSection` type must stay generic (not latex-paper-coupled) so glass-ui's leaf is consumer-agnostic.

---

## 10 — Fences + DRY/KISS discipline for the PLAN phase
- **Byte-fence the dock morph.** Any dock-scroll/dock-search wave is a CONSUMING seam beside `dockMorphContext`/`DOCK_SPRING`/`useDockState` — never edits them (the W-DOCKMORPH-CTA / useDragMorph precedent).
- **Re-promote only the consumer-bearing trio.** `useVirtualSectionWindow`+`useWindowedStore`+`virtualSectionLayout` (≥2 consumers via words + a glass-ui demo/dock-ToC). NOT `useVirtualGrid` (tanstack-bearing, WordListItem-typed, words-specific).
- **ONE scroll-event reader.** `useScrollTrigger` is the single trigger/event source; `useScrollProgress`/`useScrollTracker`/the dock-scroll-behaviors all read it — no fourth scroll listener.
- **ONE active-section source.** Reconcile windowing's `resolveActiveSection` onto `useScrollTracker.activeId` (do not ship two).
- **Glassify the search surfaces.** `FuzzySearch.vue:147` forces `surface="opaque"` — re-point to the glass register for the iOS-27 mandate.
- **No words-pinia fold.** The words search-bar store stays in words (presets-in-consumers); glass-ui ships the dock-search CHASSIS + the fuzzy pipeline, words wires its modes onto it.