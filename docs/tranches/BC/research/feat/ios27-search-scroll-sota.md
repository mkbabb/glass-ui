# iOS-26/27 Dynamic Search Bar + Scroll-Collapsing Chrome — Web-SOTA Research (BC, ios27-search-scroll-sota)

> Assignment: web-SOTA on (1) the iOS-26/27 DYNAMIC SEARCH FIELD (expand-on-tap, the spotlight/search-sheet morph, the Dynamic-Island expand-on-interact); (2) the scroll-driven chrome (shrink-on-scroll-down + expand-on-scroll-up/interact, opacity/blur-on-scroll, persistent-vs-minimize — iOS 27 retired the tab-collapse); (3) the trigger-point model (thresholds, velocity, direction). Map the **DOCK as native dynamic-search-bar** + a robust scroll system + the abstraction of virtualized-windowing / ToC-tracking / fuzzy-search to NEW dock/scroll waves. **TRANCHE-DEV ONLY — research + return; ZERO src/ edits.**
>
> Companion docs (do NOT duplicate): `research/apple-ios27.md` (the broad glass/spring/tab model — §2.2 spring family, §3.1 tab-minimize), `research/ios27-tab-switcher.md` (§1.4 the tab-bar scroll-minimize→persistent course-correction, booked opt-in), `research/glass-dock-codebase.md` (the dock engine). This doc is the FOCUSED **search-bar + scroll-collapse SYSTEM** companion: the existing waves cover the tab-BAR minimize at the SegmentedTabs level; the genuinely-NEW scope is the **chrome-BECOMES-a-search-field** register + a **reusable scroll-collapse composable** + the **virtual/ToC/fuzzy abstraction**.

---

## 0 — The binding design fact (grounds the user mandate)

**The user's note "iOS 27 retired the tab-collapse — note for the dock" is correct and is the design north-star for this lane.** The grounded arc:

- **iOS 26 introduced** the scroll-collapse (`.tabBarMinimizeBehavior(.onScrollDown)` — the tab bar "shrinks into a single floating icon when users scroll") AND split Search into a standalone circular `.search`-role tab that morphs into a bottom search field. ([aprenderhub](https://www.aprenderhub.com/2026/05/ios-27-tab-bar-fix-liquid-glass.html), [Donny Wals](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/))
- **It was widely criticized.** NN/g: Liquid Glass "makes UI elements translucent and bubbly. The result is light, airy — and often invisible"; "controls appearing and disappearing based on context force users to constantly re-scan for navigation"; the bottom search "fades into the background, making it easy to miss." ([NN/g](https://www.nngroup.com/articles/liquid-glass/))
- **iOS 27 REMOVED the collapse.** It "removes the collapsing behavior introduced in iOS 26, making the full navigation bar persistent and restoring one-tap access" and reintegrates Search into the main bar (Music, Podcasts, News, Apple TV). The design principle, verbatim: **"two taps is always worse than one, no matter how elegant the animation between them."** It is "a system-wide policy change… the collapsing behavior is being phased out entirely." ([aprenderhub](https://www.aprenderhub.com/2026/05/ios-27-tab-bar-fix-liquid-glass.html), [Ryan Ashcraft](https://ryanashcraft.com/ios-26-tab-bar-beef/))

**Three binding consequences for the BC dock/scroll waves:**
1. **PERSISTENT is the default.** The dock-as-search-bar and any scroll-collapsing chrome must default to ALWAYS-VISIBLE; scroll-collapse is a deliberate, user-honest OPT-IN (`<GlassDock :collapse-on-scroll>`), never the bare default. This matches glass-ui's existing `alwaysExpanded` default-false-but-shell-docks-pin discipline and the `:responsive` collapse-to-Select being an explicit opt-in (`ios27-tab-switcher.md §1.4`).
2. **More glass AND more legible, together.** Apple WWDC §219 verbatim: "The amount of tint and the dynamic range shift to always ensure buttons remain legible, while letting as much of the content through as possible." The search field morph must read clearly forward (active plate ≥4.5:1 over the composited backdrop) — the W55 adaptive-tint seam (`glass/ladder.css`, the bright-bucket darken) + the on-glass-fg register (`--on-glass-muted`) already provide this. The morph must NOT produce the pale-fade-into-content trap NN/g flagged.
3. **The morph is the reward, not the obstruction.** The dock pill → search field morph is the iOS-27-retained delight (the morph stayed; the auto-collapse went). The lesson: the morph fires on USER INTENT (tap/focus), never as a passive scroll side-effect that costs a tap.

---

## 1 — The iOS dynamic search FIELD (the chrome-becomes-search-field morph)

### 1.1 The `.search`-role tab → search-field morph (grounded API model)

- A `Tab` with `role: .search` is **visually separated** from the other tabs and rendered **circular**. On selection it **morphs into a search field**, "and the other tabs collapse down into a single button." ([Donny Wals](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/), [createwithswift](https://www.createwithswift.com/adapting-search-to-the-liquid-glass-design-system/))
- The search field is in a **Liquid-Glass container**, positioned **at the bottom of the screen on iPhone (for one-handed reach)** and **top-trailing on iPad**. Override via `searchable(placement:)` / `.sidebar`. ([nilcoalescing](https://nilcoalescing.com/blog/SwiftUISearchEnhancementsIniOSAndiPadOS26/))
- Supporting APIs: `searchToolbarBehavior()` (minimizes the search field "into a toolbar button" when search isn't primary), `DefaultToolbarItem(kind: .search, placement: .bottomBar)`, `ToolbarSpacer`. ([nilcoalescing](https://nilcoalescing.com/blog/SwiftUISearchEnhancementsIniOSAndiPadOS26/))

**The morph mechanism is METABALL** — "objects start to stretch towards each other as objects get closer… the bubble animates from the pill with fluid animation using a metaball approach." This is the SAME Dynamic-Island morph technique. ([Dynamic Island search digest](https://www.sinasamaki.com/dynamic-island/), [smoothui](https://smoothui.dev/docs/components/dynamic-island)). **glass-ui ALREADY HAS the metaball**: `goo-blob/` (the WebGL2/WebGPU SDF metaball) + `src/styles/dock/morph-bridge.css` (the CSS SVG-goo `feGaussianBlur` + `feColorMatrix` threshold bridge, the AZ.W-MORPH-SHOWCASE deterministic `f(--dock-morph-t)` bridge). The dock→search morph reuses the morph-bridge, NOT a new engine.

### 1.2 The glass-ui-side consumer ALREADY half-exists

`src/components/custom/search/FuzzySearch.vue:1-40` already implements the **spotlight/search-sheet morph**: an inline `<Popover>` results list that **expands into a fullscreen `<Dialog>`** via `Maximize2`/`Minimize2` and `state.isExpanded`. It composes `useTextHighlight` and the fuzzy index. This is the inline↔expanded morph the iOS model needs — the gap is (a) it is NOT wired to the dock (it is a standalone sidebar/floating widget), and (b) the morph is a hard Popover↔Dialog swap, not the continuous metaball morph. The dock-search wave upgrades the morph CONTINUITY and wires it to the dock register.

### 1.3 The springs — already documented, no new clock

The morph rides the Apple spring family already grounded in `apple-ios27.md §2.2` and present in glass-ui's `SPRING_PRESETS` (`src/composables/motion/springPresets.ts:50-77`):

| morph leg | spring | (response, ζ) | source |
|---|---|---|---|
| dock pill ↔ search field size/shape morph | `dock` | 0.32 / 0.7 (overshoot ~+4.6%) | springPresets.ts:74 |
| search-field expand-on-focus (the spotlight bloom) | `snappy` | 0.35 / 0.65 | springPresets.ts:56 |
| the content cross-fade (EFFECTS leg) | `--ease-out` no-overshoot | cubic-bezier(0,0,0.2,1) | W-MOTION-CANON P2/P3 |
| press/drag the field | `interactive` (Apple `interactiveSpring`) | 0.15 / 0.86 | apple-ios27.md §2.2 |

`ζ = 1 − bounce` (Apple's official formula, apple-ios27.md §2.2). **No new spring is minted** — the dock-search morph CONSUMES `--spring-dock` (the W-SPRING-EASE-owned, value.js/kf-fenced row). The SPATIAL legs (size/shape/translate) ride `--spring-dock`/`--spring-dock-duration`; the EFFECTS legs (opacity/blur-settle) ride `--ease-out` (the SPATIAL/EFFECTS split, W-MOTION-CANON P1).

---

## 2 — The scroll-driven chrome model (the trigger-point system)

### 2.1 The direction + threshold + velocity + snap model (grounded)

The SOTA scroll-collapse (from the RN collapsible-header reference + the web pattern SOTA) is a four-part model:

1. **Direction detection** — track `contentOffset.y` delta frame-over-frame, clamped to the collapse range (`diffClamp(scrollY, 0, headerHeight)`; in the cited example headerHeight = 58×2 = **116px**, the collapse maps `inputRange [0, 116] → outputRange [0, -58]` translate). Scroll-DOWN past the range collapses; scroll-UP expands. ([citymall RN reference](https://citymall.engineering/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3))
2. **A flip-delta threshold** (debounce) — "Sophisticated implementations consider scroll direction, velocity, AND distance." A small minimum delta (~6-10px) before a direction flip commits, so a 1px jitter does not toggle the chrome (the same anti-thrash discipline as the dock's `HOVER_INTENT_MS = 60ms` hysteresis at `constants.ts:93`). ([uncodemy](https://uncodemy.com/blog/comprehensive-guide-to-creating-fixed-headers-that-shrink-on-scroll), [w3schools](https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp))
3. **An optional velocity gate** — a fast flick can collapse/expand immediately; a slow drag respects the threshold (the iOS-feel — mirrors glass-ui's `useDockState` velocity-decision shape and `useDragMorph`'s velocity-windowed fling).
4. **Snap-to-nearest-state on scroll-stop** — "once scrolling is stopped, the header snaps to the closest state (either half-hidden or fully revealed), removing intermediate states." On `onMomentumScrollEnd`, if the collapse-fraction `t` is past the **midpoint (50%)** it commits to the nearer endpoint. This is the load-bearing UX refinement — no half-collapsed chrome at rest. ([citymall](https://citymall.engineering/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3), [geeksforgeeks](https://www.geeksforgeeks.org/how-to-create-shrink-header-on-scroll-using-html-css-and-javascript/))

### 2.2 The compositor + dual-path discipline (binding to the glass-ui fence)

- **Compositor-only**: animate `transform: scale/translateY` + `opacity` (+ a `filter: blur` opacity cross-fade) — NEVER `height`/`padding`/`width` per-scroll-frame (the per-frame reflow storm). "Transform scale instead of width/height ensures smooth animations" ([uncodemy](https://uncodemy.com/blog/comprehensive-guide-to-creating-fixed-headers-that-shrink-on-scroll)). This is glass-ui's `proof:no-layout-animation` floor + the W-CARD-COMPOSITE precedent (padding→translateY, font-size→scale).
- **The dual-path single-writer**: the NATIVE path is `animation-timeline: scroll(self)` / `view()` driving a registered `@property` `--chrome-collapse-t` (zero JS — the glass-ui `scroll-choreography.css` + `useScrollProgress.ts:28` `NATIVE_SCROLL_TIMELINE` discipline); the JS fallback is a rAF-coalesced scroll listener writing the SAME custom (the `useFadingScroll`/`useScrollProgress` feature-detect-gated dual-path, `useScrollProgress.ts:75-100`). The two NEVER both write.
- **PRM**: unlike a motion flourish, a collapse is partly a legibility/space cue, so the discrete collapsed/expanded STATE stays correct under `prefers-reduced-motion: reduce` (the `t` snaps, the interpolation drops) — the `useFadingScroll` PRM model ("the fade does not vanish under reduce, it stops interpolating").

### 2.3 Opacity/blur-on-scroll (the chrome quieting)

iOS 27 "refines… shadows, opacity, and transparency" on scroll (aprenderhub). The web pattern: as content scrolls under the chrome, the chrome's **shadow/separation increases** (Apple: "as text scrolls underneath, shadows become more prominent to create additional separation" — apple-ios27.md §1.1). The glass-ui mapping: a `--chrome-collapse-t`-driven `box-shadow`/tint lift (the adaptive-shadow over-text behavior) + the dock blur staying CRISP when collapsed (the W-DOCK-SHRINK-BLUR fence — "the shrunken dock is not a blurry mess"). The collapse REDUCES the chrome footprint but does NOT muddy the glass.

---

## 3 — glass-ui INVENTORY (what exists, what is missing)

### 3.1 ALREADY HAS (the building blocks — reuse, do not re-fork)

| primitive | file:line | role for this lane |
|---|---|---|
| `FuzzySearch.vue` + inline↔Dialog morph | `search/FuzzySearch.vue:1-40` | the spotlight/search-sheet morph (half-built; `Maximize2/Minimize2`, `state.isExpanded`) |
| `useFuzzySearch` + `fuzzySearchIndex` | `search/composables/useFuzzySearch.ts`, `fuzzySearchIndex.ts` | the fuzzy-match pipeline (the `fuzzyMatch` core) |
| `SearchBar.vue` | `search/SearchBar.vue:1-44` | the thin `.input-bar` text-field primitive (the field the morph reveals) |
| `useScrollTracker` (ToC) | `sidebar/useScrollTracker.ts:1-246` | the ToC active-section tracker (IO + scroll-fallback, deepest-visible-wins) — the ToC abstraction ALREADY EXISTS |
| `useScrollProgress` | `motion/useScrollProgress.ts:1-111` | 0..1 viewport mapping, dual-path single-writer (native-timeline-gated) |
| `useSidebarFollow` / `useTreeIndex` | `sidebar/` | the ToC follow + tree-flatten |
| `FadingScroll` + `useFadingScroll` | `fading-scroll/` | the scroll-state edge-fade dual-path (the single-writer reference) |
| `InfiniteScroll` + composable | `infinite-scroll/` | the load-more-on-scroll seam |
| dock state machine | `dock/composables/useDockState.ts:77-` | 3-state `collapsed/hover/pinned` + `keepOpen` ref-count + `HOVER_INTENT_MS=60ms` hysteresis (the anti-thrash precedent) |
| dock morph engine | `dockMorphContext.ts`, `useDockMorphWindow.ts`, `--dock-morph-t`/`DOCK_SPRING {0.32,0.7}` (`constants.ts:69`) | the one-clock `SpringProgress` morph — the dock pill↔search-field morph rides it |
| metaball bridge | `goo-blob/`, `dock/morph-bridge.css` | the Dynamic-Island/iOS metaball merge (`f(--dock-morph-t)`, deterministic) |
| `useDragMorph` | `motion/` (BB.W-DRAG-MORPH) | velocity-windowed fling (the scroll-velocity-gate physics precedent) |
| scroll-choreography | `styles/scroll-choreography.css` | `.scroll-build`/`.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` on the native `scroll()`/`view()` substrate (no Lenis/GSAP fence) |

### 3.2 LACKS (the four genuine gaps → the four new waves)

1. **No scroll-collapsing-chrome composable.** There is `useScrollProgress` (0..1 viewport map) and the scroll-choreography CSS (entrance recipes), but NO direction+velocity+threshold+snap collapse-state machine. This is the reusable `useScrollChrome` primitive.
2. **No dock-as-search-bar register.** `GlassDock` is nav/feature chrome; `FuzzySearch` is a standalone widget. There is no `<GlassDock searchable>` / `DockSearchField` that morphs the dock pill into a search field (the iOS-27 retained delight). This subsumes the words app's bespoke search bar.
3. **No virtualized-windowing primitive.** `useVirtualSectionWindow` LIVED in glass-ui v0.9.4, was retired at v1.0, and was transposed VERBATIM into `words/frontend/src/composables/virtual/useVirtualSectionWindow.ts` (its own header says: "Transposed from @mkbabb/glass-ui v0.9.4… Verbatim copy — no glass-ui private dependencies"). The re-home is a HOMECOMING — strong ground, a primitive that was glass-ui's own.
4. **No cohesive search/scroll STORY.** The pieces (fuzzy + ToC + virtual + infinite-scroll) exist but are not composed into one documented pipeline the words `search-bar.ts` store (558 LoC) can map onto.

---

## 4 — The words app (the consumer-truth + the abstraction source)

`/Users/mkbabb/Programming/words/frontend`:
- `src/composables/virtual/useVirtualSectionWindow.ts` (343 LoC) — the verbatim glass-ui v0.9.4 transposition (the re-home source); `useWindowedStore.ts` (91), `useVirtualGrid.ts` (115), `virtualSectionLayout.ts` (216). These are the virtualized-windowing primitives to ABSTRACT BACK.
- `src/stores/search/search-bar.ts` (558 LoC) — the Pinia search store: `searchMode`/`searchSubMode`/`savedQueries`/`searchQuery` + `isFocused`/`isHovered`/`showSearchControls`/`autocompleteText`/`modeSwitchAnimation`. This is the BESPOKE search-bar the user mandate wants the DOCK to subsume — the dock-as-search-bar should host this state shape (or the store maps onto the dock-search register).
- `src/api/search.ts` (149 LoC) — the async fuzzy-search API (the pipeline the abstraction must accommodate via an async-source adapter; `useFuzzySearch` is currently sync-index-only).
- `latex-paper/` package — the LaTeX-paper primitives the user mandate names ("leveraging latex-paper primitives" for the scroll system). The dock-search + scroll-collapse should compose the paper register (the `.paper-ink-mark` / paper-grain idiom) for the words-app surface.
- **Fence (inv-26, foreign-tree):** glass-ui reads words as consumer-truth + version authority but EDITS ZERO words tree; the words adopt is THEIR edit on the `^4.x` bump. The abstraction lands in glass-ui; words deletes its local copy on consume (consume-and-delete cadence).

---

## 5 — The proposed NEW waves (extend the 74-wave set, do not duplicate)

These are NEW Band-2 (dock) + a thin new scroll/abstraction cluster. None overlaps the existing `BC.W-DOCK-*` (engine/arbitrary/vertical/collapsed/stack-rail/shrink-blur) or `BC.W-PAGE-CHASSIS` (the page-hero scroll-to-shrink, a DISTINCT surface). The `ios27-tab-switcher.md §1.4` tab-bar scroll-minimize stays a SegmentedTabs booked opt-in (untouched).

### W1 — `BC.W-SCROLL-CHROME` (the reusable scroll-collapse primitive)
`useScrollChrome(scrollContainerRef, opts)` → a `--chrome-collapse-t` 0..1 + `collapsed` ref + `direction` ref. Direction-detection on `contentOffset.y` delta with a flip-delta threshold (~8px, the anti-thrash, mirroring `HOVER_INTENT_MS`), an optional velocity gate, snap-to-nearest at the 50% midpoint on scroll-stop. Dual-path single-writer (native `scroll(self)` timeline → the `useScrollProgress`/`useFadingScroll` precedent; JS rAF fallback). Compositor-only (transform/opacity, `proof:no-layout-animation`), PRM-snap (state stays correct, interpolation drops). **DEFAULT-OFF / persistent-by-default** (the iOS-27 lesson). ≥2 consumers: the dock-search collapse + a page-header collapse (the `BC.W-PAGE-CHASSIS` hero could consume it — but that wave is already converged; the consumer #2 is a demo header + the words paper-header).

### W2 — `BC.W-DOCK-SEARCH` (the dock as native dynamic-search-bar)
`<GlassDock searchable>` / a `DockSearchField` register: the dock pill MORPHS into a search field on tap/focus (the metaball bridge `morph-bridge.css` + `--dock-morph-t`, the iOS-27 retained delight), revealing `SearchBar`/`FuzzySearch` inside the dock, results in a `useVirtualSectionWindow`-backed list. Subsumes the words app search bar (the `search-bar.ts` state maps onto the dock-search register; the words bespoke bar retires on consume). PERSISTENT default; the morph fires on user intent, never a passive scroll side-effect. Consumes `useScrollChrome` for the optional collapse-on-scroll opt-in. The active field reads ≥4.5:1 (W55 tint seam) — no pale-fade trap.

### W3 — `BC.W-VIRTUAL-WINDOW` (the v0.9.4 homecoming)
Re-home `useVirtualSectionWindow` (+ `virtualSectionLayout` + `useWindowedStore`) from words into glass-ui `/virtual` (the subpath; OFF the root barrel — heavy DOM-measure leaf). It LIVED here at v0.9.4 (the words copy's own header proves it). ≥2 consumers: words (consume-and-delete) + the dock-search results list (W2). The section-layout/height-cache/overscan machinery is byte-faithful; the abstraction is the re-publication + a generic `FlatSection` contract.

### W4 — `BC.W-SEARCH-PIPELINE` (the cohesive search/scroll story)
Compose the existing pieces into ONE documented pipeline: `useFuzzySearch` (+ an async-source adapter for `words/api/search.ts`'s remote search — the sync-index is consumer #1, the async-source consumer #2), `useScrollTracker` (the ToC, already there — the abstraction is the doc + the binary-consumer record), `useVirtualSectionWindow` (W3), `InfiniteScroll`. The deliverable is the design-idiom home + the gate asserting the ToC/fuzzy/virtual triad is single-sourced (no second fuzzy matcher, no second ToC tracker, no second windowing). The words `search-bar.ts` store is the named binary consumer the pipeline targets.

**Sequencing:** W3 (virtual homecoming, no deps) → W1 (scroll-chrome, no deps) → W2 (dock-search, consumes W1+W3, sequences AFTER `BC.W-DOCK-ENGINE` settles the morph) → W4 (pipeline, consumes W1+W3 + the existing fuzzy/ToC). All Band-2/abstraction; all extend, none re-litigate the converged 74.

---

## 6 — The concrete TARGET params (the bake table)

| axis | TARGET | source |
|---|---|---|
| dock pill↔search-field morph spring | `--spring-dock` (0.32 / 0.7), the metaball bridge on `--dock-morph-t` | springPresets.ts:74, morph-bridge.css |
| search-field expand-on-focus (spotlight bloom) | `snappy` 0.35 / 0.65 | springPresets.ts:56 |
| content cross-fade (EFFECTS leg) | `--ease-out` no-overshoot (coupled to the SPATIAL morph, P3) | W-MOTION-CANON |
| press/drag the field | `interactive` 0.15 / 0.86 (`ζ=1−bounce`) | apple-ios27.md §2.2 |
| scroll-collapse flip-delta threshold | ~8px (anti-thrash; mirror `HOVER_INTENT_MS=60ms`) | RN reference + constants.ts:93 |
| scroll-collapse snap midpoint | 50% of the collapse range, on scroll-stop | citymall RN reference |
| collapse range (chrome height) | the chrome's own settled height (e.g. the dock-pill ↔ collapsed-summary delta), driven as a `transform: scale/translateY`, never animated `height` | proof:no-layout-animation / W-CARD-COMPOSITE |
| native-scroll-timeline path | `animation-timeline: scroll(self)`, `@property --chrome-collapse-t` | scroll-choreography.css / useScrollProgress.ts:28 |
| JS fallback path | rAF-coalesced scroll listener, feature-detect-gated (single-writer) | useScrollProgress.ts:75-100 |
| PRM | discrete state correct, interpolation drops (legibility cue, not pure flourish) | useFadingScroll PRM model |
| persistent default | collapse-on-scroll is OPT-IN, never the bare default | iOS-27 course-correction (NN/g + aprenderhub) |
| search-field legibility | active field ≥4.5:1 over composited backdrop (no pale-fade) | WWDC §219 + W55 tint seam |
| search position (consumer choice) | bottom-reach on narrow viewport, the dock's natural seat | nilcoalescing (iPhone bottom) |

---

## 7 — Fences / invariants (must NOT regress)

- **No new spring/clock** — the morph CONSUMES `--spring-dock` (W-SPRING-EASE-owned, value.js/kf-fenced); the per-spring-clock fence holds.
- **No JS scroll lib** — no Lenis/GSAP/Locomotive; the native `scroll()`/`view()` substrate + the rAF dual-path fallback (the W-SCROLL-MOTION fence).
- **Compositor-only** — transform/opacity/filter; never per-scroll-frame `height`/`padding` (`proof:no-layout-animation`).
- **PERSISTENT default** — the iOS-27 lesson; collapse is opt-in.
- **Foreign-tree fence (inv-26)** — glass-ui abstracts the words primitives INTO glass-ui; words deletes its local copy on its own `^4.x` consume (consume-and-delete); zero words edits here.
- **Metaball reuse** — the dock-search morph reuses `morph-bridge.css`/goo-blob; no second goo engine.
- **Single-source the triad** — one fuzzy matcher (`fuzzyMatch`), one ToC tracker (`useScrollTracker`), one windowing primitive (`useVirtualSectionWindow`); the pipeline gate forbids a second of each.
- **Live-verify = captured delta** — the morph + the scroll-collapse frame-series + the snap-to-state captured via the dev-tools MCP, both modes + WebKit (the metaball SVG-goo is cross-engine; the search-field glass is cross-engine; only the `backdrop-filter: url()` lens is Chrome-only and `@supports`-gated).

---

## Sources
- [Donny Wals — Exploring tab bars on iOS 26 with Liquid Glass](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/)
- [nilcoalescing — SwiftUI Search Enhancements in iOS and iPadOS 26](https://nilcoalescing.com/blog/SwiftUISearchEnhancementsIniOSAndiPadOS26/)
- [createwithswift — Adapting Search to the Liquid Glass Design System](https://www.createwithswift.com/adapting-search-to-the-liquid-glass-design-system/)
- [createwithswift — Making the tab bar collapse while scrolling](https://www.createwithswift.com/making-the-tab-bar-collapse-while-scrolling/)
- [Apple Developer — TabBarMinimizeBehavior](https://developer.apple.com/documentation/swiftui/tabbarminimizebehavior)
- [aprenderhub — iOS 27 Tab Bar Fix: Apple's Liquid Glass Course Correction](https://www.aprenderhub.com/2026/05/ios-27-tab-bar-fix-liquid-glass.html)
- [Ryan Ashcraft — My Beef with the iOS 26 Tab Bar](https://ryanashcraft.com/ios-26-tab-bar-beef/)
- [NN/g — Liquid Glass Is Cracked, and Usability Suffers in iOS 26](https://www.nngroup.com/articles/liquid-glass/)
- [citymall.engineering — Making a Collapsible Sticky Header (React Native)](https://citymall.engineering/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3)
- [uncodemy — Guide to Fixed Headers that Shrink on Scroll](https://uncodemy.com/blog/comprehensive-guide-to-creating-fixed-headers-that-shrink-on-scroll)
- [css-tricks — How to Create a Shrinking Header on Scroll Without JavaScript](https://css-tricks.com/how-to-create-a-shrinking-header-on-scroll-without-javascript/)
- [sinasamaki — Made in Compose: Dynamic Island](https://www.sinasamaki.com/dynamic-island/)
- [smoothui — Dynamic Island](https://smoothui.dev/docs/components/dynamic-island)