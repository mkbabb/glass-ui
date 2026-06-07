# Code-quality assay (12-agent)

## SYNTHESIS

The claims check out. The `--glass-bg-*` naming collision in deck.css (lines 373-375) is real and the most important de-dup finding — deck redeclares glass-ui's exact token names with hardcoded `hsl()` values. The cartoon-shadow fork (`--shadow-deck-stamp-*` with `7px/5px/4px`) is intentional deck identity per the CLAUDE.md "presets in consumers" precept, so that one is NOT a violation. Let me note that distinction and finalize.

Final synthesis below.

---

# AW/H HYGIENE + STYLING WAVE SEEDS

Scope grounded in 12 briefs + source verification. Mark: **AW** = glass-ui, **H** = slides. All seeds conservative, isomorphic (pure CSS/TS, no new runtime deps), KISS. Briefs graded glass-ui A-/B+ overall — most seeds are refinements, not rescues.

---

## 1. COMPONENT-SPLIT + COLOCATION

The briefs confirm glass-ui has strong split discipline (aurora, configurator, timeline, dock are exemplars). Only one component clearly over threshold; the rest are cohesive-at-boundary and should NOT be split.

### AW-1 · DataTable.vue split (442 → ~370)
- **Scope:** Extract two colocated composables under `src/components/ui/data-table/composables/`:
  - `useDataTableRowIdentity.ts` — `rowEntries` + row-id generation/validation (DataTable.vue:102–175, ~70 lines, pure utility).
  - `useDataTableResponsive.ts` — `isCard`/`headerColumn`/`bodyColumns` (the card-vs-table projection state).
- Orchestrator + template + column helpers (`getCellValue`, `getAlignClass`, `toggleSort`) stay in the SFC.
- **Gate:** `DataTable.vue ≤ 380 lines`; `vue-tsc --noEmit` green; existing data-table units pass. No public API change (composables are internal, not exported).

### AW-2 · DO-NOT-SPLIT ledger (record, no code)
- **Scope:** Document that BouncyToggle.vue (475), GlassDock.vue (421), ContinuousMarkers.vue (432) are **cohesive at boundary** — single concern with already-delegated composables. Splitting fragments narrative/FLIP sequencing. Three briefs independently flagged then cleared these.
- **Gate:** A one-line rationale comment at the top of each file's `<script>` citing the AW wave. No structural change.

### AW-3 · Colocate stray density module
- **Scope:** `src/components/custom/configurator/density.ts` (56 lines) already sits in the component dir — verify it's a sibling, not hoisted. Two briefs flagged it; check confirms it is colocated. **No action unless misplaced.**
- **Gate:** N/A (verification-only; close if already correct).

### H-1 · Slides: large-slide ceiling is acceptable
- **Scope:** Slide08.vue (576), Slide05.vue (484), etc. are single editorial diagrams with >50 reveal tiers. Briefs unanimously: **do NOT split** — extraction fragments reveal order. Record the ceiling: a slide is only extracted when the editorial unit is reusable *across decks* (e.g. PresenterCard, SlideFooter, constellation already are).
- **Gate:** No new `<style>`-only sub-components created. constellation.ts (488) stays one class (5 coupled render passes).

---

## 2. COMPOSABLE / STATE-CONSISTENCY

The DI factory (`createStrictContext`/`createOptionalContext`, AV.W14) is exemplary and consistent across 6 call sites. State reactivity is clean (no circular deps, proper `ref`/`computed`/`shallowRef`/`readonly`). The one real gap is return-type naming inconsistency.

### AW-4 · Return-type interface standardization
- **Scope:** ~9 composables lack a `Use<Name>Return` interface (callers fall back to `ReturnType<typeof x>`). Add named interfaces, keep current names as aliases (no break):
  - `useCountup` → `UseCountupReturn` (alias `Countup`)
  - `useAnimatedNumber` → `UseAnimatedNumberReturn` (alias `AnimatedNumber`)
  - `useNumericTransition`, `useGlobalDark`, `useGlassRenderer` → add explicit Return interfaces
  - `useScrollProgress` → leave as `Ref<number>` (idiomatic primitive; wrapping is over-engineering — reject the brief's suggestion).
- The `dom/*Controls` suffix (`UseResizeObserverControls` etc.) is **intentional** ("Controls" = imperative handles vs "Return" = state). Document the convention; do NOT rename.
- **Gate:** `vue-tsc --noEmit` green; every public composable exports a named return type OR returns a primitive; aliases preserve existing import sites. Overfitting-audit clause holds (each interface has its consumer).

### AW-5 · useTokenColor reference-hygiene (DI closure)
- **Scope:** `useTokenColor.ts:69` reads `document.documentElement` directly with no injection seam. Add an optional `resolver?: (prop, el?) => string` param (default = current behavior) so SSR/test can mock. Non-breaking — optional last arg.
- **Gate:** Existing units pass with no call-site change; one new unit proves the injected resolver overrides the default.

### AW-6 · Context-factory test matrix
- **Scope:** Only `dockLayerContext.readonly.test-d.ts` covers the factory. Add a type+runtime suite across all 6 call sites (sortable, toggle-group, dock, dock-layer-group, configurator-density, glyph-face) proving strict throws-on-missing and optional returns-null. Mirrors into `tests/` (no test under `src/`).
- **Gate:** `vitest run tests/composables/context/` green; `proof:no-test-in-src` clean.

### H-2 · Slides deck composable boundaries (verify, hold)
- **Scope:** Briefs confirm the 2-tier `DeckCore`/`DeckNav` model is clean, lifecycle discipline correct, no circular deps. The `/deck`-subpath LIFT (useDeck, deckKeys, pagerWindow, slideContext) is a **separate future tranche, not this hygiene wave.** This wave only records lift-readiness; no code moves.
- **Gate:** No structural change. DeckView.vue refactor (321 → 3 modules) deferred to the lift tranche, not AW/H hygiene.

---

## 3. STYLING (Tailwind lifts · monolith→colocated · brittle-CSS · idiom localization)

glass-ui is graded A+/A on Tailwind v4 idiom (zero arbitrary-value sprawl, complete `@theme` bridge). Fixes are narrow. Slides is over-inlined (scalar `calc()` density) and carries magic numbers.

### AW-7 · Brittle-CSS fixes (glass-ui, 3 narrow items)
- **Scope:**
  - `dock.css:60` — `--dock-viewport-inline-gutter` default `1rem` → `1.5rem` (absorbs scrollbar width at the `100vw` boundary; prevents horizontal overflow). One token tweak.
  - `tokens.css` z-index block — add a doc comment that `position: sticky` elements pick a rung explicitly (no new rung needed; rarely exercised). Documentation only.
  - Sparkle/slide animation offsets (`animations.css` 6px/16px/translate %) — **leave hardcoded.** They are cadence choices, not responsive scaling. Tokenizing is over-engineering (rejected). Record the decision.
- **Gate:** Build green; visual no-regression on dock at narrow viewport; no new tokens added beyond the gutter default change.

### AW-8 · Monolith → colocated (CSS), surgical only
- **Scope:** The big files (tokens 1693, utilities 1095, dock 979) are *intentionally cohesive*, not accidental bloat — most briefs cleared them. Two low-risk, high-clarity extractions only:
  - `utilities.css` → split by domain into `utilities-animation.css` (popover/sheet/slide/scale @utilities), `utilities-components.css` (@layer components recipes), keep color/focus in `utilities.css`. Cascade order preserved via `index.css` import sequence.
  - Extract `@utility twin-line-divider` (the catch-light-top + under-shadow-bottom idiom duplicated in `instrument-chassis.css` + `instrument-rail.css`) into utilities. Real DRY violation, two sites.
- **Do NOT** split dock.css, move floating-panel/hover-popover/drawer to SFC (78–216 lines, low ROI — briefs converged on "keep global, public-class contract"), or fold density out of dock.css (shared `:where()` groups are load-bearing).
- **Gate:** `npm run build` emits identical `/styles` bundle (byte-diff only from reordering); `index.css` cascade order documented; twin-line-divider has ≥2 consumers.

### H-3 · Slides Tailwind lifts + magic-number fixes
- **Scope:**
  - Tokenize radius literals: `4px`/`3px`/`2px` (Slide04:222, Slide08:311, PresenterCard:50) → `--radius-xs`/`--radius-2xs` in `deck.css §1`.
  - Parameterize the `700px` container breakpoint → `--container-narrow: 700px` in deck.css; reference in slides' `@container` rules.
  - Remove the one `!important` (Slide08:473 `.trap-row__close`) — replace with a descendant selector `.trap-row__txt .trap-row__close`.
  - SVG label `font-size: 9px` (literal px breaks export parity) → `clamp()` or `calc(N*var(--cqx))`.
  - Move inline `stroke="var(...)"` on SVG paths to scoped classes (Slide04/08/09) so theming + light-dark() reach them.
- **Leave:** the `calc(N*var(--cqx))` scalar density — it's the deck's deliberate 1280cqi pixel-faithful idiom; bulk-extracting to mixins is over-engineering. Only collapse a bundle when a rule repeats >3× identically.
- **Gate:** Export-mode (1280×720) renders pixel-faithful; zero `!important` in slide scoped blocks; portrait reflow unchanged; no literal px on viewport-responsive scales.

### H-4 · Design-idiom localization (slides, mostly clean)
- **Scope:** Briefs grade slides A on cohesion — it reads glass-ui tokens directly, no fork on the critical path. Optional future-proofing only: a brief comment pointing `--portal-*` tokens to their sole consumer (SlideXray.vue); promote nutrition-label class structure to `_nutrition-label.css` *only if* a 2nd slide adopts it.
- **Gate:** No change required now; record as "monitor on growth."

---

## 4. BRITTLE-SELECTOR / REACTIVITY

Both repos lean clean — watchers are flat, no deep computed chains, no `/deep/` or `>>>`. The one real coupling liability is `:deep()` across the library/consumer boundary.

### AW-9 · GlassCarousel `:deep()` contract
- **Scope:** Four `:deep(.glass-carousel-item)` rules (GlassCarousel.vue:267,271,281,285) couple the parent to an unnamed child-class contract — consumers MUST name items `.glass-carousel-item` or sizing silently breaks. Replace with CSS custom properties the item reads (`--carousel-item-basis` etc.) set on the content wrapper, so the parent stops piercing scope.
- **Gate:** Carousel expanded/collapsed × vertical/horizontal sizing visually unchanged; zero `:deep()` in GlassCarousel.vue; an item without the magic class still sizes correctly.

### H-5 · DeckGate `:deep(input[aria-invalid])`
- **Scope:** `DeckGate.vue:118` pierces glass-ui Input's scoped boundary, coupling to the inner `<input>` being a direct child. Two options: (a) style from the Input's own `aria-invalid` data attribute if glass-ui exposes a root-level invalid hook, or (b) accept it as a documented consumer-side reach if no hook exists. Prefer (a) if a glass-ui Input root invalid-class lands as part of AW.
- **Gate:** Invalid-state styling on the gate input renders unchanged; if `:deep()` retained, it carries a comment citing the upstream limitation.

### AW/H-6 · Reactivity: no action
- **Scope:** Briefs confirm `useSpring`, `useSidebarFollow`, `useTokenColor`, `useScrollTracker` watchers are flat and purposeful; DeckPager computed chain (`win`→`shown`/`clipped`) is shallow and correct. **No changes** — recorded so a later pass doesn't re-litigate.
- **Gate:** N/A.

---

## 5. CROSS-REPO DE-DUPLICATION — ONE shared source

The headline finding. Glass-ui is the single source of truth; slides must *read or override named knobs*, never redeclare glass-ui token NAMES with forked values. AI-Nutrition-Label is isolated (no glass-ui consumer) — out of scope. Note: the cartoon/deck-stamp shadow fork (`--shadow-deck-stamp-*` 7px/5px/4px) is **intentional deck identity** per the "presets in consumers" precept — NOT a violation, do not consolidate.

### H-7 · Glass-bg naming-collision fix (CRITICAL)
- **Scope:** `deck.css:373–375` redeclares glass-ui's exact token names (`--glass-bg-wash/quiet/resting`) with hardcoded `color-mix(in srgb, hsl(30 14% 22%) 40%, transparent)` — silently shadowing glass-ui's parameterized recipe. Fix: deck's `.dark`/`.slide--dark` arm overrides the *inputs* glass-ui's recipe reads (`--card` + `--glass-opacity-*`), NOT the `--glass-bg-*` output names. Removes the hardcoded `hsl()` and restores inheritance.
- **Gate:** `grep -c 'glass-bg-wash\|glass-bg-quiet\|glass-bg-resting' deck.css == 0`; dark-arm glass surfaces render at parity (visual diff); glass-ui remains the only definer of `--glass-bg-*`.

### H-8 · Tint-ladder: consume glass-ui's, drop hardcoded hex
- **Scope:** deck's `--color-red-wash/-tint-15/-tint-30` (9%/15%/30% over literal `#cc0000`) reimplement glass-ui's `--surface-tint-*` ladder pattern. Keep the deck-red *color* as one named source (`--deck-red-source: #cc0000`) and express the rungs via the same `color-mix` ladder, OR map onto glass-ui's `--surface-tint-*` opacities. One source for the opacity rungs; the brand color is the only deck-local input.
- **Gate:** No bare `#cc0000` repeated across `>1` tint declaration; tinted surfaces render at parity.

### H-9 · Hairline alias
- **Scope:** deck's `--hairline` (12%) and glass-ui's `--border-soft` (45%) both express soft-alpha borders. Alias deck's to the shared source and tune locally: `--deck-hairline: var(--border-soft)` if 45% works, else keep the 12% but source the *recipe* from glass-ui. Retire the independent idiom.
- **Gate:** Hairline borders render at parity; `--hairline` either aliases or carries a one-line "deck-local opacity, recipe from glass-ui" note.

### AW-10 · Typography fork is intentional — record, no change
- **Scope:** Display shares Fraunces; serif diverges (glass-ui Fraunces vs deck Newsreader) — this is deliberate deck identity per "presets in consumers." NOT a de-dup target.
- **Gate:** N/A.

### Cross-repo gate (the binding one)
- **Scope:** A `proof:no-token-name-fork` check (slides repo): assert that slides CSS never *redeclares* a glass-ui-owned token name (`--glass-bg-*`, `--surface-tint-*`, `--border-*`, `--shadow-cartoon-*`) with a literal value — overrides must target inputs (`--card`, `--glass-opacity-*`, `--foreground`) on the cascade, never the output name. This codifies the "override on the cascade, never re-declare a dead local" precept cross-repo.
- **Gate:** The check passes (zero forked output-names); deck-stamp/Newsreader/red-source remain as legitimate deck-local *identity* inputs.

---

## HEADLINE

**glass-ui is sound — AW is refinement, not rescue: split only DataTable, name the composable returns, lift two CSS idioms, de-pierce the carousel. Slides is over-inlined and forks glass-ui's token NAMES — H tokenizes its magic numbers, kills the one `!important`, and (the load-bearing fix) stops redeclaring `--glass-bg-*`/tint/hairline with hardcoded values, overriding glass-ui's inputs on the cascade instead. One source of truth: glass-ui owns the token names; slides reads or overrides knobs, never re-declares. Deck-stamp shadows, Newsreader, and the red brand color stay deck-local by design.**

---

## Lane briefs

### Lane 1

Perfect. Let me create a concise markdown summary to return as the final output:

---

## GLASS-UI CODE QUALITY ASSAY — AW/H TRANCHE

**Lane:** gu-large-components | **Mode:** READ-ONLY | **Scope:** Large component identification & separation-of-concerns audit

### EXECUTIVE SUMMARY

glass-ui demonstrates **strong architectural discipline**. Of 19 large components examined (>300 lines), only **DataTable.vue** (442 lines) clearly exceeds god-module thresholds. BouncyToggle.vue sits at the 475-line boundary but remains cohesive (single toggle concern with delegated slider logic). Exemplar patterns (aurora, configurator, timeline, dock) show consistent, well-modeled splits.

---

## GOD-MODULES & SPLIT CANDIDATES

**DataTable.vue (442 lines)** — `/Users/mkbabb/Programming/glass-ui/src/components/ui/data-table/DataTable.vue`
- Row identity validation (:102–175): ~70 lines of getRowId, getExplicitRowId, getGeneratedRowId, identity validation
- Responsive card-vs-table projection (:85–87, :211–318): branch-heavy template logic
- **Verdict:** SPLIT to `composables/useDataTableRowIdentity.ts` + `composables/useDataTableResponsive.ts` → reduces to ~370 lines, clarifies concerns

**BouncyToggle.vue (475 lines)** — `/Users/mkbabb/Programming/glass-ui/src/components/custom/tabs/BouncyToggle.vue`
- Single-concern toggle + slider positioning; variants (grid/scroll/pill) are layout-only
- Uses colocated `./composables/useBouncySlider` for JS slider path
- **Verdict:** COHESIVE at boundary; no split needed

---

## WARN THRESHOLD (300–500 lines): ALL EXEMPLARY

| File | Lines | Location | Status | Rationale |
|------|-------|----------|--------|-----------|
| **ContinuousMarkers.vue** | 432 | timeline/ | ✓ EXEMPLAR | Split from orchestrator; pure overlay + colocated CSS |
| **GlassDock.vue** | 421 | dock/ | ✓ ACCEPTABLE | State/lifecycle delegated to 3 composables; monitor if grows |
| **ContinuousTimeline.vue** | 351 | timeline/ | ✓ EXEMPLAR | Option C structural split (siblings not nesting) for a11y fix |
| **GlassCarousel.vue** | 300 | glass-carousel/ | ✓ COHESIVE | Slim wrapper around ScrollAreaRoot + 1 composable |
| **MetricRow.vue** | 298 | metric-stack/ | ✓ ASSUMED COHESIVE | Responsive row; colocated with MetricStack orchestrator |

---

## EXEMPLAR PATTERNS (MODELS FOR FUTURE COMPONENTS)

**Pattern A: Aurora (GL + Composables + Constants)**
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/`
- Structure: Aurora.vue (222 lines) → composables/ (11 exports) → constants/ (shaders + presets)
- Zero god-module bloat; clear colocated boundaries

**Pattern B: Configurator (Multi-File Orchestrator)**
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/configurator/`
- Structure: Configurator.vue (277) → ConfiguratorLayer (159) → ConfiguratorRow (192) → useConfiguratorState.ts (254)
- Exemplar of state-machine + multi-level composition

**Pattern C: Timeline (Structural Option C Split)**
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/timeline/`
- Structure: Dispatcher (129) → Orchestrator (351) → Rail (217) + Markers (432) as SIBLINGS
- Excellent a11y fix via architecture; geometry.ts (11KB) colocated

**Pattern D: Dock (Delegated Composable Suite)**
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/`
- Structure: GlassDock (421) → composables (useDockState, useLayerTransition, contexts)
- State/animation logic cleanly separated

---

## QUALITY OBSERVATIONS

✓ **NO DUPLICATION:** Shared utilities colocated (geometry.ts, types.ts)  
✓ **ISOMORPHIC:** SSR guards consistent (window/document checks)  
✓ **DESIGN COHESION:** Tailwind v4 idiomatic; --glass-*, --timeline-* tokens well-bridged  
✓ **NO LEGACY:** Modern Vue 3.5+ (defineModel, computed, templates)  
✓ **CONSERVATIVE BOUNDARIES:** Typed provide/inject (dock, timeline, configurator)

---

## WAVE-SEED (AW/H) — PROPOSALS

### TIER 1: IMMEDIATE (HIGH CONFIDENCE)

1. **[DataTable] Extract row-identity logic** → `composables/useDataTableRowIdentity.ts`
   - Lines: DataTable.vue:102–175
   - Reduction: 442 → ~370 lines
   - Rationale: Pure utility; enables reuse in future variants

2. **[DataTable] Extract card/table projection** → `composables/useDataTableResponsive.ts`
   - Lines: DataTable.vue:85–87, :211–214 (isCard computed, headerColumn, bodyColumns)
   - Reduction: ~20 lines; cleaner template
   - Rationale: Decouples responsive state from rendering

### TIER 2: MONITOR (REFACTOR CANDIDACY)

3. **[GlassDock] Extract morph-generation tracking** → `composables/useMorphGeneration.ts` (defer)
   - Lines: GlassDock.vue:146–154, :264–288
   - Reduction: ~40 lines
   - Confidence: MEDIUM
   - Rationale: Isolates A→B→A no-skip/no-queue invariant; reusable if FLIP patterns spread

4. **[Slider] Extract dock-keep-open logic** → `composables/useSliderDockKeepOpen.ts` (conditional)
   - Lines: Slider.vue:44–67, :128–134
   - Defer if only Slider uses; promote if pattern spreads to ProgressSectioned, ProgressGradient

### TIER 3: DOCUMENTATION (NO CODE)

5. **[Aurora] Exemplar documentation** — Link aurora/ structure in DESIGN.md or README
6. **[Timeline] Exemplar documentation** — Document ContinuousTimeline Option C split rationale

---

## REMAINING AFTER SPLITS

**DataTable.vue** (442 → ~370 lines):
- Orchestrator + template rendering (card/table branching delegated to composable computed)
- Column helpers (getCellValue, getAlignClass, toggleSort, sortIndicator)
- RowEntry type + slots orchestration

**Composables extracted:**
- `useDataTableRowIdentity.ts` — rowEntries computed, row-id generation + validation
- `useDataTableResponsive.ts` — isCard, headerColumn, bodyColumns computed state

**Result:** Clear separation—row management orthogonal to responsive layout logic; both reusable.

---

## KEY FINDINGS

| Finding | Impact | Evidence |
|---------|--------|----------|
| **Few god-modules** | ✓ HEALTHY | Only DataTable clearly over; BouncyToggle cohesive |
| **Exemplar patterns present** | ✓ STRONG | Aurora, configurator, timeline, dock all model-worthy |
| **Colocated composables** | ✓ CONSISTENT | dock/, timeline/, tabs/, aurora/ all have composables/ subdirs |
| **Service boundaries typed** | ✓ GOOD | Dock/timeline/configurator contexts are typed, not string-keyed |
| **Zero brittle CSS** | ✓ IDIOMATIC | Tailwind v4 consistent; no deprecated patterns detected |

---

## RECOMMENDATIONS

1. **Execute Tier 1** (DataTable splits) for clarity and reusability
2. **Monitor Tier 2** (GlassDock, Slider) on next refactor; presently acceptable
3. **Document Tier 3** exemplars (aurora, timeline) in DESIGN.md for future component design
4. **Adopt patterns:** Use aurora, configurator, timeline, dock as models for new complex components
5. **KISS principle maintained:** No over-engineering detected; all splits serve real concerns (row identity ≠ responsive layout)

---

**Status:** READ-ONLY analysis complete. No implementation attempted. Wave-seed ready for AW tranche.

---

### Lane 2

Now I have enough information to compile my findings. Let me create the final report:

---

## CODE-QUALITY ASSAY: glass-ui Composables — Colocation & Naming Consistency

**Lane:** gu-composable-colocation  
**Scope:** `/Users/mkbabb/Programming/glass-ui/src/composables` + component-colocated composables under `/src/components/custom/*/composables`

---

### FINDINGS

#### 1. **Colocation — STRONG PATTERN, WELL-APPLIED**

Component-scoped composables are properly colocated under `composables/` subdirectories within their component roots. This is exemplary:

- **Aurora** (`/aurora/composables/`): `useAurora.ts`, `useCursorInteraction.ts` + infrastructure (`runtime.ts`, `uniformBridge.ts`, `glSetup.ts`, `cursorModel.ts`, `frameLoop.ts`, `color.ts`) — 339/15K LOC orchestration well-decomposed (/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/useAurora.ts:23-61 exemplary Return interface).
- **GooBlob** (`/goo-blob/composables/`): `useBlobMood.ts`, `useBlobPointer.ts`, `useBlobSatellites.ts`, `useMetaballRenderer.ts` (370 LOC) + `easing.ts` — mood/pointer/satellite state cleanly separated (/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts:55-70 textbook DI shape).
- **Dock** (`/dock/composables/`): `useDockState.ts` (29-61 Return interface precedent), `useLayerTransition.ts`, context providers (`dockContext.ts`, `dockLayerContext.ts`), guard (`isTeleportedTarget.ts`) — cohesive ownership (/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useDockState.ts:29-40 sets Return-interface canonical).
- **Infinite-Scroll**: `useInfiniteScroll.ts` returns `InfiniteScrollReturn` (not `UseInfiniteScrollReturn`, but consistent internal naming; `/Users/mkbabb/Programming/glass-ui/src/components/custom/infinite-scroll/composables/types.ts`).
- **Search**: `useFuzzySearch.ts` returns `FuzzySearchState<T>` (non-standard `Use*Return` but idiomatic for state-bearing composables).
- **Typewriter**: Single `useTypewriter.ts` — narrow, correct.
- **Tabs**: `useBouncySlider.ts` (Return interface, proper).

**Verdict:** Colocation discipline is consistently applied; components own their composables. No orphans found. ✓

---

#### 2. **Naming Consistency — MIXED, GAPS IDENTIFIED**

**Return-type interface naming varies across three patterns:**

| Pattern | Count | Examples | Assessment |
|---------|-------|----------|------------|
| `Use<Noun>Return` | 8 | `UseClipboardReturn`, `UseDockStateReturn`, `UseAuroraReturn`, `UseBouncySliderReturn`, `UseLayerTransitionReturn`, `UseUserInvalidAriaReturn`, `UseDocumentVisibilityReturn` | Standard, discoverable. ✓ |
| `Use<Noun>Controls` | 5 | `UseResizeObserverControls`, `UseTokenColorControls`, `UseIntervalControls`, `UseTimerControls`, `UseTextHighlightControls` | Semantically distinct ("controls" for imperative handles). Acceptable but divergent from Return naming. △ |
| Non-standard | 12+ | `Countup` (`useCountup` ret), `AnimatedNumber` (motion), `FuzzySearchState` (search), `InfiniteScrollReturn` (not `UseInfinite…`), `Ref<number>` (useScrollProgress), `ComputedRef<RegisteredShortcut[]>` (useRegisteredShortcuts) | Inline returns or domain-specific names (state vs controls); inconsistent naming gate. ✗ |

**Critical gap — No explicit Return interfaces for:**
- `/composables/motion/useCountup.ts` → returns `Countup` (non-prefixed; /Users/mkbabb/Programming/glass-ui/src/composables/motion/useCountup.ts:8-13)
- `/composables/motion/useAnimatedNumber.ts` → returns `AnimatedNumber` (non-prefixed)
- `/composables/motion/useNumericTransition.ts` → returns inline object (no interface, /Users/mkbabb/Programming/glass-ui/src/composables/motion/useNumericTransition.ts inferred)
- `/composables/motion/useScrollProgress.ts` → returns `Ref<number>` (primitive, no wrapped Return interface)
- `/composables/dark/useGlobalDark.ts` → returns inline object (no `UseGlobalDarkReturn` interface)
- `/composables/keyboard/useKeyboardShortcuts.ts` → returns cleanup function + `useRegisteredShortcuts` returns `ComputedRef` (no Return interface)
- `/composables/glass/useGlassRenderer.ts` → inferred return shape
- `/composables/sidebar/useSidebarState.ts` → `GenericSidebarState<T>` + `SidebarState` (generic overload, non-prefixed)
- `/composables/sortable/useSortable.ts` → `UseSortableReturn` ✓ (one bright spot)

**Sub-finding — Inconsistent suffix choice:**
- "Controls" (dom observables: ResizeObserver, TokenColor, TextHighlight, Clipboard-adjacent) suggests imperative action handles.
- "Return" (dock/aurora/blob composables) is standard Vue convention.
- No documented rationale; appears to be call-site driven, not system-level.

**Verdict:** Missing Return-type interfaces break discoverability; **≥5 major composables lack canonical surfaces**. Caller must use `ReturnType<typeof useX>` or inline types. Non-standard returns (`Countup`, `AnimatedNumber`) are domain-justified but reduce consistency. △ (Fixable via wave-seed.)

---

#### 3. **File Size & Cohesion — WELL-STRUCTURED, ONE EXPANSION CANDIDATE**

| Path | LOC | Status |
|------|-----|--------|
| `/motion/useRAFLoop.ts` | 290 | Tight; RAF scheduling + timing isolation; self-contained. ✓ |
| `/keyboard/useKeyboardShortcuts.ts` | 267 | Tight; registry + shortcut entry mgmt cohere. ✓ |
| `/sidebar/useSidebarFollow.ts` | 247 | Tight; scroll tracking + auto-expand decision logic. ✓ |
| `/sidebar/useScrollTracker.ts` | 246 | Tight; intersection-driven scroll ancestry tracking. ✓ |
| `/glass/useGlassRenderer.ts` | 246 | Tight; shared WebGL canvas setup + observer wiring. ✓ |
| `/aurora/useAurora.ts` | 339 | **~EXPAND**: Orchestrates `createAurora`, scheduler, intersection-pause, deferred arm. Core wrapper is ~100 LOC; scheduling + lifecycle could extract to `scheduleAuroraArm.ts` helper (lines 74–126). NOT urgent; waits on AW.W7-W12 aurora research. △ |
| `/goo-blob/useMetaballRenderer.ts` | 370 | **~EXPAND**: Owns metaball-specific uniform names, shader binding, per-frame uniform upload. Layout scaling logic (POS_SCALE, UNIFORM_NAMES) could live in `metaballConfig.ts`. NOT blocking; awaits AW.W13-W15 blob research. △ |
| `/motion/useSpringMount.ts` | 207 | Compact; mount-specific spring behavior (intro tween on element enter). ✓ |
| `/dom/useTextHighlight.ts` | 205 | Tight; CSS Highlight API + lifecycle. ✓ |
| `/dom/useTouchGate.ts` | 202 | Tight; tap-to-activate guard; scoped. ✓ |
| `/dom/useClipboard.ts` | 201 | Tight; copy + auto-reset. ✓ |

**No file >500 LOC; all readable**. Precept conforms. ✓

---

#### 4. **Domain Grouping — LOGICAL, ENFORCED VIA BARREL EXPORTS**

Composables organized under clear domain buckets:
- `/motion/` — keyframes-bearing spring, mount, press, numeric + core-engine-free (constants, stagger, scroll, RAF, yield, priority).
- `/dom/` — observers + cascade bridges (resize, clipboard, highlight, token-color, touch-gate, aria-bridges).
- `/keyboard/` — shortcut registry.
- `/dark/` — global dark mode (vueuse-bearing; subpath-isolated).
- `/sidebar/` — tree navigation + sidebar state (scroll tracker, follow, tree index).
- `/sortable/` — drag-drop (controller, drop resolver, ghost, timing, touch-gate re-export).
- `/glass/` — WebGL substrate (canvas setup, render).
- `/context/` — Vue context helper.
- `/color/` — color-resolver bridge (tiny, domain-neutral).
- `/reactive/` — timers/intervals (interval, timer).

**Barrel re-exports enforce scope:**
- `/composables/index.ts` (lines 1–32): re-exports vueuse-bearing (dark, keyboard) to internal consumers; root barrel excludes them. ✓
- `/motion/index.ts` (lines 17–27): keyframes-bearing only; core-free leaves on `/motion-core` subpath. ✓
- `/motion/core/index.ts`: engine-free leaves (constants, stagger, scroll, RAF, yield, priority, view-transition, vReveal). ✓
- Component composables NOT re-exported from root (infinite-scroll is the ONLY exception, line 31 of `/composables/index.ts`); colocated composables stay local. ✓

**Verdict:** Domain boundaries well-enforced; no logical grouping drift. ✓

---

#### 5. **DI & Service Boundaries — EXEMPLARY IN COMPLEX DOMAINS; REFERENCE ISSUES**

**Strong DI (Dock, Aurora, GooBlob):**
- `/dock/composables/useDockState.ts` (lines 5–18): Options object clearly declares **all** external dependencies (`rootEl`, `alwaysExpanded`, `isTransitioning`, `dockId`, `onStateChange`). ✓
- `/goo-blob/composables/useMetaballRenderer.ts` (lines 55–70): Canvas ref + color resolver + mood/pointer/satellite systems cleanly injected. ✓
- Aurora's `runtime.ts` (lines 63–70): Clear `AuroraRuntimeOptions` shape; no hidden globals. ✓

**Issue — useTokenColor (reference hygiene):**
- `/dom/useTokenColor.ts` (line 69): Implicitly reads `document.documentElement` when no element passed; **no injection point for SSR-alternate roots or testing**. Comment lines 4–17 acknowledge `useGlobalDark` coupling (watching class changes) but the design is **"reference by side-effect"** rather than dependency-injected. Works in practice but breaks DI closure.
- **Wave-seed note:** AW.W21 "real-public vs reference split" flags this explicitly (RECAP :27, :79).

**Verdict:** Complex composables exemplary; one reference-hygiene outlier (`useTokenColor`). ✓△

---

#### 6. **Deprecated/Legacy Code — NONE FOUND**

No `_v2`, `deprecated`, `legacy`, or `@deprecated` tags. No disabled conditionals. ✓

---

#### 7. **Return-Type Naming Ledger (Wave-Seed)**

**AW.W21 — Component-Colocation + Composable Assay (return-type naming phase):**

Standardize all composable return-type interfaces to `Use<ComposableName>Return` pattern. Current non-conformers:

| File | Current | Target | Priority |
|------|---------|--------|----------|
| `/motion/useCountup.ts` | `Countup` | `UseCountupReturn` | HIGH (exported name) |
| `/motion/useAnimatedNumber.ts` | `AnimatedNumber` | `UseAnimatedNumberReturn` | HIGH |
| `/motion/useNumericTransition.ts` | inline object | `UseNumericTransitionReturn` | HIGH |
| `/motion/useScrollProgress.ts` | `Ref<number>` | wrap in `UseScrollProgressReturn { value: Readonly<Ref<number>> }` | MEDIUM (simpler; current is idiomatic but undiscoverable) |
| `/dark/useGlobalDark.ts` | inline object | `UseGlobalDarkReturn` | MEDIUM |
| `/keyboard/useKeyboardShortcuts.ts` | cleanup fn + `useRegisteredShortcuts() => ComputedRef` | `UseRegisteredShortcutsReturn`, wrap cleanup as `UseShortcutRegistryReturn { register: () => void }` | MEDIUM (already subpaths; less critical) |
| `/glass/useGlassRenderer.ts` | inline object | `UseGlassRendererReturn` | MEDIUM |
| `/sidebar/useSidebarState.ts` | `GenericSidebarState<T>` + `SidebarState` | Rename `GenericSidebarState<T>` → `UseSidebarStateReturn<T>`; alias `SidebarState = UseSidebarStateReturn<SidebarSection>` for backward compat | LOW (generics; overloads work) |
| `dom/*Controls` (5 composables) | `UseXControls` | Consider uniform suffix or document "Controls = imperative handles" rationale | LOW (consistent within dom domain; document in STYLE.md) |

---

#### 8. **Isomorphism — CORRECT**

- `/motion/core` leaves verified vueuse-free + dependency-free (native scheduler.yield, native Animations API, etc.). ✓
- DOM observers correctly restricted to browser (`typeof document` checks; /composables/dom/useTokenColor.ts:66, /composables/dom/useClipboard.ts SSR-safe). ✓
- No non-browser imports in core leaves. ✓

**Verdict:** Isomorphic discipline upheld. ✓

---

#### 9. **Design Cohesion & Tailwind v4 Idiomatic CSS**

Composables are **pure logic/state** (no CSS in `.ts` files). Colocated CSS belongs in component `.vue` files. No composable carries CSS rules; no design-token hardcoding in logic except for constants (e.g., `DAMPING`, `SNAP_THRESHOLD` in motion/constants.ts — appropriate). ✓

---

### WAVE-SEED (AW/H)

**AW.W21 — Component-Colocation + Composable Assay:**

1. **Return-type interface standardization** (breaking; semver): Rename `Countup` → `UseCountupReturn`, `AnimatedNumber` → `UseAnimatedNumberReturn`, etc. (9 composables). Wrap primitive returns (`Ref<number>` → `UseScrollProgressReturn { value: ... }`) for discoverability.
   - **File bounds:** `/composables/motion/*.ts`, `/composables/dark/*.ts`, `/composables/keyboard/*.ts`, `/composables/glass/*.ts`.
   - **Backward compat:** Export aliases for major re-exports (e.g., `export { UseCountupReturn as Countup }`).

2. **useTokenColor reference-hygiene fix** (DI closure): Add optional `resolver?: (prop: string, el?: HTMLElement) => string` injection point so SSR/test mocking works. Document side-effect on `useGlobalDark` coupling.
   - **File:** `/composables/dom/useTokenColor.ts`.
   - **Impact:** Non-breaking (optional param).

3. **Controls-vs-Return suffix rationalization** (documentation): Document the "Controls = imperative handles" convention (5 dom composables use Controls; clarify whether this pattern is systemic or incidental). Update STYLE.md.
   - **File:** `/docs/precepts/STYLE.md` (or new style guide lane).

4. **Audit: Hidden dependencies** (AW.W21 prerequisite): Run spot-verify on metric-cell, metric-stack, instrument-chassis, glyph-face for actual re-export + consumer chains (RECAP :20, :27, :79). Surface any missing deps before AW.W19–W20 retire waves.
   - **Tools:** `rg` consumer count, `ls` re-export alias audit.

---

### SUMMARY

**Colocation:** Exemplary; component composables properly nested, barrel-exported per scope. ✓

**Naming consistency:** Mixed; ≥9 composables lack `Use*Return` interface naming gate. Fixable via semver-major wave. △

**File sizes:** All ≤370 LOC; two candidates for sub-module extraction on next research cycle (Aurora scheduler, GooBlob uniform config). ✓

**Domain grouping:** Logical, enforced via barrel re-export. ✓

**DI + service boundaries:** Strong in complex domains; one reference-hygiene outlier (useTokenColor) flagged for AW.W21. ✓△

**Legacy:** None found. ✓

**Isomorphism:** Correct; engine-free leaves verified. ✓

---

**Ready for AW.W21 wave dispatch.**

---

### Lane 3

Perfect. Now let me generate the final comprehensive report:

## AW/H State Management & DI Pattern Assay

### Summary

The glass-ui state/store management exhibits **strong architectural discipline** with a canonical DI factory pattern (AV.W14) that eliminates redundancy and enforces type safety across all provide/inject call sites. State consistency is well-maintained through reactive patterns and proper encapsulation boundaries. The design is **conservative, idiomatic, and adheres closely to modern Vue composition practices**.

---

### Core DI Pattern Excellence

**Context Factory Pattern** (`/src/composables/context/createContext.ts:55–85`)

The `createStrictContext<T>` / `createOptionalContext<T>` factories are a **single source of truth** that collapse what would otherwise be hand-rolled provide/inject boilerplate into typed, reusable blocks. Every context in the codebase now uses this pair:

- **Strict contexts** (`createStrictContext`): `/src/components/custom/sortable-list/context.ts:28–40` (SortableList), `/src/components/custom/dock/composables/dockContext.ts:42–45` (GlassDock), `/src/components/custom/dock/composables/dockLayerContext.ts:37–40` (DockLayerGroup)
- **Optional contexts** (`createOptionalContext`): `/src/components/ui/toggle-group/toggleGroupContext.ts:23` (ToggleGroup), `/src/components/custom/configurator/density.ts:38–40` (ConfiguratorDensity), `/src/components/custom/glyph-face/keys.ts:32–34` (GlyphFaceSilhouette)

**Enforcement Mechanisms**:
- All contexts are typed via a single `InjectionKey<T>` symbol (no raw strings).
- The factory exposes paired helpers (`provide`, `use`, `useOptional`) so consumers never call `inject()`/`provide()` directly.
- Type-only test at `/tests/components/custom/dock/dockLayerContext.readonly.test-d.ts` proves `Readonly<Ref<…>>` encapsulation is enforced at compile time.

**Call site consistency**:
- `/src/components/custom/sortable-list/SortableList.vue` → `provideSortableContext()`; `/src/components/custom/sortable-list/SortableItem.vue` → `useSortableContext()`.
- `/src/components/ui/slider/Slider.vue:7,55` → `useOptionalDockContext()` for optional dock-aware behavior (befitting-silent default when rendered outside a dock).
- `/src/components/custom/dock/GlassDock.vue` → `provideDockContext()` with strict enforcement.

---

### State Consistency & Reactivity Patterns

**Well-Managed Reactive State**:

1. **Dock State Machine** (`/src/components/custom/dock/composables/useDockState.ts:76–249`)
   - Three-state machine (`collapsed | hover | pinned`) with ref-counted `keepOpen()`/`release()` holds.
   - Derived refs (`expanded`, `isPinned`) stay in sync via `syncDerived()` (lines 99–109).
   - No circular dependencies; single `state` ref with computed views.

2. **Configurator State** (`/src/components/custom/configurator/useConfiguratorState.ts:119–244`)
   - **Resolved a known issue** (lines 139–147 reference K.W7): `activeKey` is now a `ref` (not a plain `let` wrapped in computed) so downstream consumers see fresh reads on preset changes.
   - Dual clone modes (`"commit-on-write"` vs `"per-preset"`) with explicit state transitions in `selectPreset()`/`resetCurrent()`.
   - `isDirty` computed correctly derives from `config` and preset baseline (line 164–170).

3. **Sidebar State** (`/src/composables/sidebar/useSidebarState.ts:70–86`)
   - User overrides tracked via reactive `Set<string>` (userExpanded, userCollapsed).
   - `isExpanded()` correctly layers intent: user override > active root > default (lines 73–77).

4. **RAF Loop** (`/src/composables/motion/useRAFLoop.ts:97–120`)
   - Composed pause state via multiple fine-grained refs (`isRequested`, `isManuallyPaused`, `isDocumentHidden`, `isReducedMotion`).
   - `isPaused` computed correctly derives from all gates (lines 114–120).

5. **Spring Physics** (`/src/composables/motion/useSpring.ts:94–114`)
   - Uses `shallowRef` for the SpringProgress engine (avoids deep reactivity overhead on a stateful object).
   - `readonly()` on return shape prevents accidental external mutation (lines 62–67).

**No Over-Clever Reactivity**: All computed views and watchers follow idiomatic patterns; no unnecessary deep watches; no cyclic dependency traps (the configurator recursion regression at `/tests/configurator-recursion.spec.ts` was _caught and fixed_).

---

### Encapsulation & Service Boundaries

**Clean Separation of Concerns**:

- **External DI Pattern** (goo-blob): `/src/components/custom/goo-blob/GooBlob.vue:47–50` uses a bare `inject(BLOB_CONFIG_KEY, null)` fallthrough, not the factory. This is intentional—the BLOB_CONFIG_KEY is exported as a bare symbol for external providers to target, proving the factory's `KEY` export works as a public API.
- **Colocation**: Composables live next to their consumer components when befitting (e.g., `infinite-scroll/composables` is co-located; motion/dom/sidebar are domain-organized).
- **No Leaky Abstractions**: All context types are exported from their context modules; no internal-only secrets.

**Size & Modularity**:
- Largest composable: `useWebGLCanvas.ts` (331 lines) — a cohesive WebGL substrate.
- Largest component: `BouncyToggle.vue` (475 lines) — animation-heavy, not state-heavy.
- No components exceed 500 lines; all stay focused.

---

### Design Consistency & Idioms

**Tailwind v4 + Localized Scoped Styles**:
- Proper `@layer components` usage in global CSS (`/src/styles/dock.css`, etc.).
- Scoped `<style scoped>` blocks reserved for component-local animation/interaction (e.g., `Slider.vue`, `BouncyToggle.vue`).
- No deprecated patterns (no `v-deep`, no `@apply` escape hatches).

**TypeScript Rigor**:
- No `any` type escapes in context factory.
- Proper use of `Readonly<Ref<T>>` for encapsulated state (e.g., DockLayerGroupContext refs at `/src/components/custom/dock/composables/dockLayerContext.ts:31`).
- Generic overloads properly constrain (e.g., `useSidebarState<T extends TreeNode>` at `/src/composables/sidebar/useSidebarState.ts:56–59`).

**Documentation & Naming**:
- All context keys follow UPPER_SNAKE_CASE convention (DOCK_CONTEXT_KEY, TOGGLE_GROUP_KEY, etc.).
- Paired helpers are consistently named (provide*, use*, useOptional*).
- Comments cite invariant/tranche references (e.g., "AV.W14 Lane A", "K.W7") for audit trails.

---

### Findings: Wave-Seeds (AW/H)

**No Critical Issues**. The codebase is **production-ready** with **zero** design regressions. The following are conservative improvement vectors if pursued:

1. **Test Coverage Extension** (low priority)
   - Only `/tests/components/custom/dock/dockLayerContext.readonly.test-d.ts` exists for context patterns.
   - **Consider**: Add a suite covering the factory's strict-vs-optional matrix across all 6 context call sites (sortable, toggle-group, dock, dock-layer-group, configurator-density, glyph-face-silhouette).
   - **Rationale**: Proves no optional call site throws; no strict call site silently returns null. Zero risk; high confidence gain.

2. **DockState Refactor** (medium, cosmetic)
   - `/src/components/custom/dock/composables/useDockState.ts` at 353 lines is just under the 350-line cohesion boundary.
   - **Consider**: Extract the click-away teleport logic (`isTeleportedTarget`, `dismissOpenOverlays`, `installClickAwayFrame`) into a sub-composable `useClickAwayDismissal()`.
   - **Rationale**: Lightens the main state machine; the click-away seam is orthogonal to the three-state logic. Not urgent; keeps the file at ~300 lines instead of 353.

3. **Configurator Density Colocate** (low, organizational)
   - `/src/components/custom/configurator/density.ts` is a tiny module (56 lines) living outside its component folder.
   - **Consider**: Move into `/src/components/custom/configurator/` as a sibling (e.g., `ConfiguratorDensity.ts` or fold into `Configurator.vue` if truly one-use).
   - **Rationale**: Already imported by Configurator.vue and ConfiguratorRow.vue; colocation improves discoverability. Not a bug; purely organizational.

4. **Spring Substitution Patterns** (low, observational)
   - `useSpring()` and `useAnimatedNumber()` are sibling motion composables with different physical models (second-order vs first-order).
   - **Consider**: Document the decision matrix (when to use each) in the composables' JSDoc or a DESIGN.md note.
   - **Rationale**: Consumers reading `useSpring` might not know whether to reach for it or `useAnimatedNumber`. Clarity without code change.

---

### Ledger Entry: State Consistency (AW)

| Aspect | Status | Citation |
|--------|--------|----------|
| DI Pattern Canonicalization | ✓ Excellent | createContext.ts:55–85; 6 call sites consistent |
| Reactive Ref Hygiene | ✓ Excellent | useRAFLoop, useSpring, useDockState all use proper ref/computed shapes |
| Readonly Encapsulation | ✓ Proven | dockLayerContext.readonly.test-d.ts type guards |
| State Mutation Safety | ✓ Good | configuratorState writeIntoConfig, dockState syncDerived isolation |
| No Circular Dependencies | ✓ Good | Sidebar, dock, configurator all DAG-structured |
| Tailwind v4 Compliance | ✓ Clean | @layer components, no v-deep, no @apply leaks |
| Size Discipline | ✓ Good | Max 475 lines (animation-heavy), no state gigantism |
| Type Safety | ✓ Excellent | InjectionKey<T>, generics with constraints, no any escapes |

---

**Recommendation**: Ship as-is. The state management layer is **production-grade**. The wave-seeds are polish vectors, not blockers. The factory pattern is exemplary; other projects could adopt it wholesale.

---

### Lane 4

Perfect. Now let me generate a comprehensive findings report:

---

## Code-Quality Assay: slides (AW/H Tranche)

### Structure Overview
The slides codebase is a **Vue 3.5 modular presentation system** with 26 `.vue` components and 23 TypeScript files. The deck engine is cohesive; slides are organized by deck (til-briefing, feedback-coder, _fixture). **7 components exceed 500 lines**, all slides. Colocation is **disciplined**: each deck folder is self-contained with local theme, components, and slide metadata.

---

### Large Components (>500 lines)

| File | Lines | Assessment |
|------|-------|-----------|
| **Slide08.vue** (til-briefing) | 576 | Operating loop diagram + evidence row. Heavy SVG markup (7-node flow, feedback arc). **Candidate for sub-component break**: the evidence row (corner-case trap + PACE credential) is a discrete unit; the loop diagram (SVG + grid flow) is another. Layout logic is clean (grid + absolute overlays), CSS is well-scoped. No breaking enclosure. |
| **Slide05.vue** (feedback-coder) | 484 | Hybrid workflow + takeaway tiles. Three-beat structure (loop, "where AI/human excels" plates, 4x memorial tiles). **Good colocation**: the loop, beats, and tiles are thematically bound; splitting would fragment narrative cohesion. Scoped CSS is idiomatic (grid, flex, container queries). |
| **Slide04.vue** (feedback-coder) | 417 | Problem statement with billing-drift hero (dark-by-composition card). Left frame (thesis + receipt) + right hero (dark background gradient + delta visualization). **Well-factored**: the receipt is a distinct visual unit; no extraction needed (the 200-line receipt is nested but compact and visual). |
| **Slide02.vue** (feedback-coder) | 417 | Teaching slide: Schwartz coding scheme (domain/stance/force tree). Three-column layout (lede + two-job cards, centered tree graphic, three worked paths). Markup is dense but coherent per column. CSS is idiomatic. |
| **Slide03.vue** (feedback-coder) | 400 | System architecture + flowchart. Two columns (frame + diagram). Diagram is drawn as inline SVG paths. **Observation**: markup is verbose but intentional (each node/edge named for editorial clarity). No extraction candidate. |
| **Slide01.vue** (feedback-coder) | 342 | Cover slide with drifting Memphis shapes + headline. Form animation (CSS keyframes for horizontal meander). Tightly bound presentation logic. OK as-is. |
| **SlideNutrition.vue** (til-briefing) | 351 | "Nutrition label" infographic. Single self-contained card with 3x2 grid of metrics. Factoring would be over-engineering. |

**Verdict**: No slide requires extraction. All 7 are cohesive editorial units. The largest (Slide08, 576) is a single diagram with tight visual intent; splitting it would fragment the reveal sequencing and the CSS grid/absolute-overlay dance. **Wave-seed (AW)**: document the 576-line ceiling as acceptable for single-slide diagrams with >50 reveal tiers; consider a sibling sub-component only if the editorial unit itself is reusable *across decks*.

---

### Deck Engine Colocation & Structure

**Engine files** (/Users/mkbabb/Programming/slides/src/deck):
- 11 `.vue` components: DeckView, DeckSlide, DeckPager, DeckSettings (chrome)
- 12 `.ts` utilities: useDeck, useDeckNav, deckSpring, reveal directive, slideContext injection, etc.

**Colocation Ledger**:
- ✓ **DeckView.vue** (321 lines): wires nav, dock, chrome, edge-zones. Imports 4 sibling composables (useDeckNav, useEdgeZones, useDeck via nav, useDeckUnlock). Composed cleanly; the settings-open dock-hold logic is a 4-line hook, not extracted.
- ✓ **reveal.ts** (inline directive): single concern, tied to the slide render pipeline.
- ✓ **slideContext.ts**: provide/inject pair for active-slide broadcast. Clean coupling.
- ✓ **useDeckNav.ts** (122 lines): composes 4 utilities (useDeck, deckKeys, installDeckSpring, useCountup). Single export; dependencies are clear.
- ✓ **constellation.ts** (488 lines, til-briefing/): self-contained canvas animation engine. 5 private render passes (edges, nodes, anomaly, pointer web, ripples). Stateful Constellation class with public API (setPointer, ripple, drift, destroy). **No extraction**: the 5 passes are tightly coupled by shared canvas context & node list. The class factoring is correct.

**No colocation issues detected**. The deck engine respects service boundaries:
- Chrome (dock, pager, edge-zones) vs. slide rendering (reveal, context).
- Navigation state (useDeckNav) vs. render state (slideContext).
- Reusable animation (constellation) vs. slide-specific layouts.

---

### Design Idioms & Consistency

**Tailwind v4 + Localized Design** (/Users/mkbabb/Programming/slides/src/styles/deck.css, ~40KB):
- ✓ **Single source of truth**: deck-theme.css (tokens, surfaces, type ladder) + deck.css (layout primitives). All slides compose this; no duplication.
- ✓ **Custom-properties spine**: slides author in `cqi` (container query inches) for 1280px reference; viewport scaling is fluid, exports are faithful. Token palette (--ncsu-red, --ai-blue-*, --glass-*, --shadow-*) is comprehensive. Light-dark() lifts colors for dark mode.
- ✓ **No brittle/deprecated CSS**: all `<style scoped>` blocks use modern tooling (color-mix, container queries, clamp, css nesting via Tailwind v4). No old float/clearfix patterns; flexbox/grid throughout.
- ✓ **Design cohesion**: 
  - Radius scale (--radius, --radius-lg, --radius-xl, --radius-2xl, --radius-pill) is consistent.
  - Shadow hierarchy (--shadow-soft, --shadow-deck-stamp-*, --shadow-xl) is tier-based.
  - Type scale (Fraunces display, Fira Sans body, Fira Code mono) is uniform.
  - Red discipline (the hero --ncsu-red reserved for focal UI; text accents use --red-text; component fills use tinted overlays like --red-tint-30).
  - Cartoon offset shadows are frame-consistent (offset 5/5px, soft blur).

**Scoped vs. Global Splits**:
- ✓ Slides use `<style scoped>` for all layout + decoration. Global rules live in deck.css only for chrome (dock, progress bar, edge-zone buttons). No creeping scope violations.

**Idiomatic Modern Patterns**:
- ✓ Container queries for responsive reflow (@container width < 700px) instead of media queries; allows per-slide adaptation without layout shifts.
- ✓ CSS custom properties for theme switching (light-dark, color-scheme: dark on dark panels).
- ✓ Clamp() for fluid typography (no breakpoint jumps).
- ✓ SVG paths + CSS stroke/fill for icons + diagrams (no image sprites or brittle icon fonts).

---

### DRY & Code Reuse

**No duplication detected**:
- Footer component (SlideFooter.vue, 23 lines) is imported by 6 slides; consistent.
- PresenterCard.vue (99 lines, til-briefing) is a reusable testimonial; collocated in the deck's components folder.
- Constellation animation (488 lines) is deck-specific; imported once in til-briefing/deck.ts.
- Type definitions (types.ts) are centralized; all composables + slides import from @/deck/types.

**Token reuse**: The --socket-* token palette (40+ custom properties) is referenced by every scoped slide stylesheet. No hard-coded colors.

---

### Service Boundaries & DI

**Deck Composition Chain**:
```
DeckView.vue (main orchestrator)
  → useDeckNav (input + nav state)
    → useDeck (core slide indexing)
    → deckKeys (keyboard handler)
    → installDeckSpring (reveal spring animation)
  → useEdgeZones (edge-hover detection)
  → useDeckUnlock (soft-gate state)
  → useSlideContext (provide active-slide broadcast)
  → DeckSlide (slide layout wrapper)
    → SlideXXX (component from deck.ts manifest)
```

**Boundaries are clean**:
- ✓ Nav state (index, progress) flows down via computed refs, not DOM reads.
- ✓ Active-slide context is injected, not queried.
- ✓ Slide visibility is declarative ([data-state]); no imperative .show/.hide.
- ✓ Canvas effects (constellation) own their lifecycle via onMount cleanup.
- ✓ Deck manifests (registry.ts, deck.ts per-deck) decouple slide discovery from mounting.

**Inversion of Control**: The deck.ts manifest is the single source of order, dark flags, and aria labels. DeckView has zero hardcoded slide knowledge. Lazy imports via import.meta.glob keep cold bundles small.

---

### Critical Observations

1. **Large slides (>500 lines) are justified**: Each is a single editorial diagram with >50 reveal tiers. The v-for + reveal sequencing is tight; extraction would fragment narrative intent.

2. **Constellation is a model class, not a utility**: It's stateful (nodes, canvas context, RAF loop). Keeping it as a single class with 5 private render passes is cleaner than 5 separate functions. The export interface is minimal (destroy); callers never touch internals.

3. **CSS scoping is disciplined**: No cascade leaks. Slides author scoped <style> with no color.css or reset.css clutter; all decisions live in deck.css or inline.

4. **Theme coupling is deck-local, not global**: feedback-coder imports ./theme.css (Memphis carnival palette); til-briefing uses the default deck tokens. No global theme toggle; each deck is self-contained.

5. **No redundant sub-components**: PresenterCard, SlideFooter, and constellation are the only extracted units. The evidence row in Slide08 (trap + PACE) is tied to the loop diagram's reveal order; splitting it would create a maintenance burden.

---

### Wave-Seed (AW/H)

1. **Document the 576-line slide ceiling** as acceptable for single-diagram editorial units with tight reveal sequencing. Extraction is only justified if the unit (a diagram + evidence row, a tree + paths, a loop + beats) is reusable *across multiple decks*.

2. **Conserve constellation as a single class**. It's a coherent state machine; the 5 render passes are tightly coupled by canvas context and node list. Splitting into functions would increase entropy.

3. **Maintain deck-local theme coupling**. feedback-coder::theme.css is elegant; do not hoist it to a global theme system unless a third deck requires different tokens. KISS.

4. **Colocation is correct**: each deck (folder) owns its slides, components, and metadata. registry.ts is the right discovery layer. No changes needed.

5. **DI is sound**: all composables flow through useDeckNav entry point. Add no additional injection keys unless a future sub-system (e.g., speaker notes, timing) requires peer-level state.

6. **No CSS debt**: all slides author in cqi + light-dark. The token palette is comprehensive. No dark/light inconsistencies detected.

---

**Files Referenced**:
- /Users/mkbabb/Programming/slides/src/deck/DeckView.vue:321 (orchestrator, clean entry point)
- /Users/mkbabb/Programming/slides/src/deck/useDeckNav.ts:122 (nav composition)
- /Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts:488 (state machine, 5 private passes)
- /Users/mkbabb/Programming/slides/src/decks/til-briefing/slides/Slide08.vue:576 (operating loop, justified large)
- /Users/mkbabb/Programming/slides/src/decks/feedback-coder/slides/Slide05.vue:484 (hybrid workflow, thematically bound)
- /Users/mkbabb/Programming/slides/src/styles/deck.css:40KB (single source of design truth)
- /Users/mkbabb/Programming/slides/src/decks/registry.ts:47 (lazy deck discovery, manifest pattern)

---

### Lane 5

Excellent. Now let me finalize my analysis with a comprehensive understanding:

---

## AW/H Code-Quality Assay: `slides/src/deck` composables + state

**Lane:** `sl-composables-state` | **Scope:** useDeck, useDeckNav, useDeckUnlock, useCountup, reveal (5/5 requested + siblings)

### Findings

#### Architecture & Encapsulation (Strong)

**State model:** Clean 2-tier decomposition (`/Users/mkbabb/Programming/slides/src/deck/useDeck.ts:1-47`):
- **DeckCore** (headless, pure): index/total/progress refs, clamped navigation (go/next/prev/first/last). No DOM, no side effects. Fully re-usable.
- **DeckNav** (input glue): wraps DeckCore, layers keyboard + touch + spring. Exposes printMode/exportMode flags.
- **Separation principle held:** DeckNav never forces DeckCore to grow; callbacks (onChange) keep them decoupled. ✓

**Composable boundaries (correct):**
- `useDeck`: 47 lines, logic-only (`useDeck.ts:21-47`) — moves inlined, no reach.
- `useDeckNav`: 122 lines (`useDeckNav.ts`). Orchestrates three concerns: DeckCore composition, keyboard input (`deckKeys.handleDeckKey`), countup tween replay.
  - *Observation:* Input glue + countup sequencing tightly wound here; countup itself extracted to `useCountup` (right call), but the sequencing logic (nextTick + conditional run) sits in useDeckNav. Acceptable — the orchestration is navigation-specific, not library-worthy alone.
- `useCountup`: 70 lines (`useCountup.ts:24-70`). Pure DOM-reach pattern: querySelector + rAF loop + easing. Correctly isolated.
- `useEdgeZones`: 37 lines (`useEdgeZones.ts`). Pointer-move listener, clean setup/teardown. ✓
- `useSlideContext` / `provideSlideContext`: 24 lines (`slideContext.ts`). Injection key + fallback. Idiomatic. ✓
- `useDeckUnlock`: 42 lines (`/Users/mkbabb/Programming/slides/src/views/useDeckUnlock.ts`). localStorage memo + vueuse-bearing. **Correctly placed in views/, not deck/** — it's orchestration (soft-gate UI decision), not engine. ✓

#### Colocation & DX

**File organization:** 15 files totaling **1165 lines** (`/Users/mkbabb/Programming/slides/src/deck`):
- Composables + components colocated by responsibility: useDeck + useDeckNav + DeckView (the consumer) in one dir. ✓
- Utility/pure modules (deckKeys, deckSpring, captureMode, pagerWindow, slideContext) live alongside consumers, not siloed. ✓
- No orphaned utility modules; every file has clear ownership.
- **CSS colocation:** Global non-scoped styles (deck.css §1-9: ~722 lines; deck-theme.css ~233 lines) live in `/src/styles/`, not scattered. Deliberate: DeckView + DeckPager + DeckSettings teleport glass-ui subpaths, so CSS must be global to reach them. Documented in component footer comments (`DeckView.vue:178-181`, `DeckSettings.vue:85-87`). ✓

#### Consistency

**State reactivity:** All composables read/write via Vue 3 Composition API (ref/computed/inject/provide). No manual observer patterns. ✓

**Lifecycle discipline:**
- `useDeckNav` (`useDeckNav.ts:72-110`): onMounted sets listeners, onBeforeUnmount cleans up. Touch + keyboard + spring engine setup in one lifecycle block — OK because useDeckNav is a single consumer point in the app.
- `useEdgeZones` (`useEdgeZones.ts:25-34`): Same pattern. ✓
- `useCountup`: No lifecycle (pure render-side function); settle() called explicitly by useDeckNav.

**Input guarding:** `deckKeys.handleDeckKey` (`deckKeys.ts:35-75`) correctly focus-guards Space + digit keys (checks `isControl` before intercepting). Comment at line 8 reflects Tranche-A close-review lesson. ✓

**Flags + capture modes:** Three flags live in one module (`captureMode.ts:13-17`): printMode, exportMode, freezeMode. Each gate is checked at the call site (useDeckNav, DeckView, DeckPage). No duplication of spelling. ✓

#### Library-Worthiness (AW Lift Preconditions)

**Candidates for `/deck` subpath:**

1. **useDeck** (47 lines, `/Users/mkbabb/Programming/slides/src/deck/useDeck.ts`):
   - Pure, DOM-free, Vue-agnostic (core API: ref/computed only).
   - **Move-ready:** No slides-editorial coupling. ✓
   - Lift criterion: **Yes** — this is the headless engine.

2. **DeckCore + DeckNav interfaces** (`types.ts:8-27, useDeck.ts:9-19, useDeckNav.ts:8-27`):
   - Core types export cleanly. No internal-only shapes.
   - **Move-ready:** ✓
   - Lift criterion: **Yes** — surface contract only.

3. **deckKeys.handleDeckKey** (75 lines, `deckKeys.ts:35-75`):
   - Pure function, no Vue dependencies, pure JS (KeyboardEvent → moves).
   - Comment at line 1-9 explicitly says it's designed to lift.
   - **Move-ready:** ✓
   - Lift criterion: **Yes** — keyboard contract is stable.

4. **pagerWindow** (25 lines, `pagerWindow.ts:15-25`):
   - Pure algorithm, zero dependencies.
   - **Move-ready:** ✓
   - Lift criterion: **Yes** — windowing math is reusable.

5. **useCountup** (70 lines, `useCountup.ts`):
   - Editorial (count-up animation is deck-specific). The comment at line 3-12 explicitly says "must NOT ride upstream … it's slides-editorial, not engine."
   - **Do not lift:** ✗
   - Keep local.

6. **useEdgeZones** (37 lines, `useEdgeZones.ts`):
   - Pointer-position listener, generic. No deck coupling.
   - **Move-ready:** ✓
   - Lift criterion: **Borderline**. Useful, but small and context-specific (fine pointers, edge-zone 12% threshold). Could live in glass-ui/composables if a second consumer exists. Per useDeck comment (line 3-8), "Kept LOCAL to the slides repo until a second real consumer exists."
   - **Recommendation:** Keep local pending second use-case.

7. **reveal directive** (15 lines, `reveal.ts`):
   - Decorative, entrance animation metadata. Owned locally (comment line 3: "Registered globally in main.ts").
   - **Do not lift:** ✗
   - Keep local.

8. **slideContext** (24 lines, `slideContext.ts`):
   - Per-slide injection (index/total/active). Part of the deck runtime.
   - **Move-ready:** ✓
   - Lift criterion: **Yes** — enables slides to self-query their position.

9. **deckSpring** (61 lines, `deckSpring.ts`):
   - Motion curve + lazy engine load. Dogfooded from keyframes.js (external dep).
   - **Move-ready:** Mostly ✓, but ties to @mkbabb/keyframes.js. glass-ui already ships motion tokens; this is deck-specific easing. Could export the easing definition + the lazy-load wrapper.
   - Lift criterion: **Partial** — the preset (DECK_SPRING) and install pattern are reusable; the countup caller (useCountup) reads deckEase.fn. Export the preset + deckEase shape separately.

#### Issues & Opportunities

**Inconsistencies/Gaps:**

1. **DeckView.vue (321 lines) — large, multi-concern:** Composable layer (useDeckNav setup), component (template + lifecycle), AND styling (dock positioning, edge zone CSS). Breaking recommendation below.

2. **useDeckNav (122 lines) — touching three concerns:**
   - Input glue (keyboard + touch)
   - Spring install + countup orchestration
   - Mode flag exposure
   - No split, but acceptable given single consumer (DeckView).

3. **Captive cycle: DeckView ← useDeckNav ← useCountup ← deckEase.fn:** The spring lives in deckSpring; easeFn is passed down through useDeckNav → useCountup. Works, but tighter coupling than strictly necessary. Minor.

4. **CSS tokens in deck.css (`--deck-dock-gutter`, `--deck-pager-fit`):** These drive JS reads (DeckPager reads `--deck-pager-fit`, DeckView reads gutter in CSS). Fragile if CSS and JS drift. Acceptable given small surface area + comments documenting the contract (DeckPager.vue:32-39, deck.css:33-39).

5. **No barrel/index file:** `/deck/` has no `index.ts` exporting the public surface. When lifted to glass-ui, a subpath + barrel will be needed.

#### Design Coherence

**Tailwind v4 + design idioms:**
- No bespoke CSS in composables — pure JS.
- Component styling uses class-variance-authority (button, controls) via glass-ui re-exports.
- deck.css + deck-theme.css are authored in raw CSS (not Tailwind @apply). Reason: teleported glass-ui subpaths + global selector reach for the dock + edge zones. Correct trade-off for Chrome composability. ✓
- Color-mix (no opacity vars; SRGB mixes) — modern. WCAG contrast checks documented (DeckPager.vue:112-123). ✓

**No brittle/deprecated patterns:**
- No direct DOM mutation (textContent in useCountup is intentional animation, not a hack).
- No hardcoded pixel assumptions (uses cqi, dvw, clamp where befitting).
- No legacy Vue 2 patterns.

#### Isomorphism

**Print/Export/Freeze modes (`captureMode.ts`):** Query flags (?print, ?export, ?freeze) gate behavior:
- printMode: settle count-ups, skip spring.
- exportMode: 1280x720 full-bleed still. Settle + snap.
- freezeMode: live responsive size, but settled (no spring).

Each mode checked at the right layer: useDeckNav (spring install), useCountup (settle vs. animate), DeckView (hiding chrome). ✓

**No unhydrated surprises:** DeckCore is pure; useDeckNav inits on mount (no SSR mismatch).

---

### Wave-Seeds (AW/H)

**LIFT to @mkbabb/glass-ui/deck (AW — library-tier):**
1. **useDeck** → `composables/deck/useDeck.ts` — headless core, no editorial coupling.
2. **DeckCore/DeckNav types** → `composables/deck/types.ts` — public contracts.
3. **deckKeys.handleDeckKey** → `composables/deck/keyboard.ts` — focus-guarded input handler.
4. **pagerWindow** → `composables/deck/pagerWindow.ts` — windowing algorithm.
5. **slideContext (inject/provide)** → `composables/deck/slideContext.ts` — per-slide injection.
6. **deckSpring preset** → `tokens.ts` (export DECK_SPRING constant) or `motion.ts` — easing definition.

**COMPONENTS to extract (AW):**
7. **DeckSlide component** → `components/ui/deck-slide/` — simple host, [data-state] contract.
8. **DeckPager** → `components/ui/deck-pager/` — windowed dot rung, @media CSS bridge.

**KEEP LOCAL (H — slides editorial):**
- useCountup — explicitly slides-editorial.
- DeckView (extract to smaller cohesive modules first; see below).
- DeckSettings — deck-specific gear menu.
- reveal directive — entrance choreography.

**REFACTOR (before AW lift):**
- **DeckView.vue (321 lines) → break into 3 modules:**
  - DeckViewRoot.vue (layout + dock wrapper, ~160 lines)
  - DeckViewChromeEdges.vue (edge arrows + progress bar, ~60 lines)
  - DeckViewLogic.ts (composable: nav + edges + unlock, ~50 lines)
  - *Benefit:* Separates presentation (which slides to lift) from orchestration (which stays local).

- **useDeckNav (122 lines) → optional split (acceptable if single consumer holds):**
  - If a second consumer appears that wants input without countup, extract `useInputGlue` (keyboard + touch, ~50 lines).

---

### File-by-File Ledger → H

| File | Lines | Assessment | Notes |
|------|-------|-----------|-------|
| useDeck.ts | 47 | ✓ Library-ready | Core engine, no editorial coupling. |
| useDeckNav.ts | 122 | ✓ Acceptable | Input glue; countup orchestration acceptable for single consumer. |
| useCountup.ts | 70 | ✗ Keep local | Editorial animation (explicitly scoped). |
| useEdgeZones.ts | 37 | ◐ Pending | Generic pointer listener; lift if 2nd consumer. |
| slideContext.ts | 24 | ✓ Library-ready | Injection pattern, reusable. |
| deckKeys.ts | 75 | ✓ Library-ready | Keyboard handler, focus-guarded, explicit lift-design. |
| deckSpring.ts | 61 | ◐ Partial | Export DECK_SPRING preset + shape; codify @mkbabb/keyframes.js integration. |
| reveal.ts | 15 | ✗ Keep local | Entrance choreography, slides-specific. |
| captureMode.ts | 17 | ✓ Shareable | Mode flags (but editorial use-case; OK to share if hunt/render needs). |
| pagerWindow.ts | 25 | ✓ Library-ready | Pure windowing algorithm. |
| DeckView.vue | 321 | ⚠ Refactor first | Large; mix of chrome (liftable) + orchestration (local). |
| DeckSlide.vue | 35 | ✓ Library-ready | [data-state] host, trivial. |
| DeckPager.vue | 139 | ✓ Library-ready | Windowed dot rung; @media CSS bridge elegant. |
| DeckSettings.vue | 116 | ✗ Keep local | Deck-specific gear (theme + PPTX + lock). |
| types.ts | 61 | ✓ Library-ready | Contracts (DeckMeta, DeckContent, SlideEntry, etc.). |

---

### Summary

**Consistency:** High. Clear 2-tier state model (headless DeckCore + input DeckNav), clean composable boundaries, correct lifecycle discipline, no duplication. Vue 3 idioms throughout.

**Colocation:** Excellent. Composables + components + CSS grouped by responsibility, not by kind. Global CSS justified by teleport patterns.

**Library-Worthiness:** 5–6 modules ready to lift as-is; 2–3 need refactor (DeckView size, deckSpring codification); 3 stay local (countup, reveal, settings). Headless core (useDeck) is the true prize — fully re-usable, zero editorial coupling.

**Path to AW:** Break DeckView into cohesive sub-modules; codify deckSpring easing + install pattern; export useDeck, deckKeys, slideContext, pagerWindow, and types as a @mkbabb/glass-ui/deck subpath. Second consumer of useEdgeZones would justify lifting.

---

### Lane 6

Based on my analysis of both repositories, here's the findings report:

---

## Brittle Selectors & Reactivity Assay — AW/H Lane

### FINDINGS

**glass-ui/src:**

1. **:deep() Chains (4 instances)** — GlassCarousel.vue has brittle carousel-item selectors
   - `/Users/mkbabb/Programming/glass-ui/src/components/custom/glass-carousel/GlassCarousel.vue:267-287` — Four :deep() rules targeting `.glass-carousel-item` across expanded/collapsed states
     - `.glass-carousel--expanded .glass-carousel__content--vertical > :deep(.glass-carousel-item)` (line 267)
     - `.glass-carousel--collapsed .glass-carousel__content--vertical > :deep(.glass-carousel-item)` (line 281)
     - Horizontal variants at lines 271, 285
   - **Issue**: :deep() penetration couples parent carousel component to unnamed child class contract; consumers must name their items `.glass-carousel-item` or selector breaks. No guarantee children export this class.

2. **DeckGate.vue :deep() for Input field** — `/Users/mkbabb/Programming/slides/src/views/DeckGate.vue:118`
   - `.deck-gate :deep(input[aria-invalid="true"])` 
   - **Issue**: Pierces glass-ui Input component's scoped boundary; couples to input element being a direct child with no wrapper. Fragile if Input structure changes.

3. **Computed Chains (Moderate patterns)**
   - `/Users/mkbabb/Programming/glass-ui/src/composables/sidebar/useScrollTracker.ts:44-46` — `activeRootId` computed derives from `activeId` + map lookup (2-level)
   - `/Users/mkbabb/Programming/glass-ui/src/components/custom/tabs/BouncyToggle.vue:99-101` — `jsSingleSlider` and `jsSliderActive` chain from `multiSelect` and `ANCHOR_SUPPORTED`
   - `/Users/mkbabb/Programming/slides/src/deck/DeckPager.vue:49-52` — `shown`, `clippedStart`, `clippedEnd` all computed from `win` (which itself is computed)

4. **Large Components (>400 lines)**
   - `/Users/mkbabb/Programming/glass-ui/src/components/custom/tabs/BouncyToggle.vue:475 lines` — Single-select + multi-select dual paths, JS slider vs anchor-positioned CSS, ResizeObserver tracking. **Refactoring candidate**: split anchor/JS paths into isolated composables.
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/data-table/DataTable.vue:442 lines` — Generics, row identity management, responsive card-vs-table breakpoint, pagination. **Refactoring candidate**: extract card-mode logic + pagination into sub-composables.
   - `/Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts:488 lines` — Class-based canvas constellation engine. Monolithic but intentional (game loop, state machine). **Assessment**: cohesive; split only if drift/ripple logic grows.

5. **Watcher Patterns (Well-scoped, no deep reactive chains)**
   - `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useSpring.ts:138-145` — Single watch on target MaybeRefOrGetter; no nested watchers. **Clean.**
   - `/Users/mkbabb/Programming/glass-ui/src/composables/sidebar/useSidebarFollow.ts:210-232` — Three independent watches (activeId, sidebarEl, scrollSource). Each has purpose; no circular dependency risk. **Clean.**
   - `/Users/mkbabb/Programming/glass-ui/src/composables/dom/useTokenColor.ts:109-120` — Two sequential watches on token name + optional element ref. Triggers `refresh()` helper. **Clean.**

6. **No Deprecated Patterns**
   - No `/deep/` or `>>>` combinator (Vue 2 era)
   - No computed-of-computed-of-computed chains
   - No visibilitychange listeners hand-rolled (now centralized in `useDocumentVisibility`)

7. **Encapsulation & Service Boundaries**
   - Token-color resolution vueuse-free design (`/Users/mkbabb/Programming/glass-ui/src/composables/dom/useTokenColor.ts`) — good juncture discipline to avoid SCC.
   - Sidebar follow composable externalizes RAF/RAF cancellation state clearly — manual override + scroll-source binding isolated.

---

### WAVE-SEED (AW/H)

1. **Refactor BouncyToggle.vue** — Split anchor-positioned CSS path from JS single-slider path into separate composables (`useAnchorSlider`, `useJSSlider`). Threshold: 475 → 250–300 each.
   
2. **Extract DataTable card-mode** — Move responsive-card layout + breakpoint logic into `useDataTableCard` composable. Pagination deserves `DataTablePagination` scope already exists (expand it).

3. **Hoist :deep() to slot boundaries** — GlassCarousel.vue: expose a slot wrapper class contract explicitly (e.g., `class="carousel-item"` on the slot, not on consumer). OR: use CSS custom properties for flex/size styling so no :deep() penetration needed.

4. **Guard Input field scope in DeckGate** — Offer a scoped Input prop variant that exports a `.invalid` class on the root wrapper (not the inner `<input>`), so DeckGate can style from the scoped boundary without :deep().

5. **Assess Constellation monolith** — Draw a line at 500 lines. If drift/ripple features grow, extract into `ConstellationDrift` + `ConstellationRipple` classes or pure functions.

---

**Conservative Assessment**: Both repos lean toward clean reactivity (no deep chains, watchers are flat). The :deep() usage is justified by library-consumer boundaries but represents a coupling liability. Large files (475–576 lines) are intentional but at the extraction threshold; extract on next feature touch, not immediately.

---

### Lane 7

Perfect! Now I have enough data for a comprehensive assay. Let me create the report:

---

## Code Quality Assay — glass-ui AW/H Tranche (Tailwind v4 Idiom)

### Executive Summary
glass-ui demonstrates **exemplary modern Tailwind v4 + CSS cohesion**. The AV.W16 idiom migration is complete. The codebase is remarkably clean: token-first architecture, zero arbitrary-value sprawl, proper @layer stratification, and production-grade encapsulation. Issues identified are **conservative refinements only** — no critical patterns found.

---

### FINDINGS

#### 1. **Non-Idiomatic Tailwind Usage** ✓ MINIMAL
**Status:** Excellent. No arbitrary values (`[var(...)]`) in component Tailwind classes.

- `/Users/mkbabb/Programming/glass-ui/src/components/ui/tabs/TabsTrigger.vue:1` uses `text-[var(--active-tab-color)]` — isolated incident, token-bridged via `--active-tab-color`  
- `/Users/mkbabb/Programming/glass-ui/src/components/ui/progress/ProgressGradient.vue` + `/src/components/ui/progress/ProgressSectioned.vue` — arbitrary `h-[var(...)]` heights are load-bearing (per-instance sizing). **Acceptable:** these are token-authored, not magic numbers.
- `/Users/mkbabb/Programming/glass-ui/src/components/ui/carousel/CarouselDots.vue` uses `scale-[var(--scale-hover)]` — token-bridged, correct idiom.

**No scattered utilities, no bespoke inline styles.** The @theme block (theme.css:52-362) bridges every token comprehensively.

---

#### 2. **Monolithic Stylesheet Patterns** ⚠ WELL-MITIGATED
**Status:** Good with conscious trade-offs documented.

Large files are **intentionally cohesive, not fragmented**:

| File | Lines | Role | Assessment |
|------|-------|------|------------|
| tokens.css | 1,693 | Token registry (design authority) | ✓ Correct home. Single source. |
| utilities.css | 1,095 | Shared recipe utilities | ✓ Proper layer. Cross-component reuse. |
| dock.css | 979 | Dock family styles + shared contract | ✓ AU.W8b.3 rationale documented. Single owner discipline. |
| theme.css | 416 | Tailwind @theme bridge | ✓ Machine-generated from tokens. Intentional. |

**Carving:** dock-controls.css (486 lines) extracted from dock.css at AU.W8b.3 *per design rationale* (shared `:where()` groups must stay in dock.css; per-control families carved into controls file). The split is **load-bearing** (cascade order). No unjustified fragmentation.

---

#### 3. **Deprecated/Archaic CSS** ✓ CLEAN

**Checked patterns:**
- ✓ No `-webkit-` duplication except **two justified cases:**
  - `/Users/mkbabb/Programming/glass-ui/src/components/custom/timeline/ContinuousRail.vue` line 5: `-webkit-backdrop-filter` — fallback for older Safari (not authoring both; delegating to build). **Correct.**
  - `/src/components/custom/sortable-list/` × 2: `-webkit-user-select: none;` — legacy vendor prefix for compatibility. **Acceptable.**

- ✓ No deprecated `transform: translateX()` shorthand abuse. Uses idiomatic transform functions.
- ✓ No old `box-sizing` tricks, no float-based layouts.
- ✓ Properly leverages modern CSS: `color-mix()`, `light-dark()`, `clamp()`, `container`, `@supports`, `@starting-style`.

---

#### 4. **Fragile Rules & Magic Numbers** ⚠ DETECTED (3 items)

##### a. **Hardcoded translateY/X offsets in animations** (animations.css:15-163)
**Lines:**
- `translateY(6px)` (line 56) — floating-panel entrance
- `translateY(16px)` (line 80) — slide-up
- `translate(-30%, -30%)` / `translate(180%, 180%)` (lines 153, 160) — sparkle-sweep

**Issue:** Pixel-magic offsets bypass token system. If `--icon-md` changes, the sparkle trajectory does NOT follow.

**Mitigation:** These are *deliberate visual moments*, not responsive scaling. The 6px/16px are cadence choices, not bound to grid. **Low risk** if locked by design review.

**Recommendation (Wave AW/H):** Consider `--animation-rise` (6px default), `--animation-slide-height` (16px), `--sparkle-start-translate` as tokens IF these animations become configurable per theme.

---

##### b. **Viewport-unit trap: 100vw gutter** (dock.css:60)
```css
--dock-wrap-max-width: calc(100vw - var(--dock-viewport-inline-gutter, 1rem));
```

**Issue:** `100vw` includes the scrollbar width (typically 15px), creating unwanted overflow on most viewports.

**Current:** Gutter variable (`--dock-viewport-inline-gutter`, 1rem default) is **too small** to absorb the scrollbar (should be ~1.5rem).

**Recommendation (Wave AW/H):** Change default to `--dock-viewport-inline-gutter: 1.5rem` OR reframe as `--dock-max-width: min(100%, calc(100vw - var(--dock-gutter, 1.5rem)))` to pin the viewport bound.

---

##### c. **Z-index ladder coupling** (tokens.css §3)
13-stop z-index ladder is **well-documented** and semantically named (`--z-bar`, `--z-dock`, `--z-modal`, etc.). No magic. However:

- **No `--z-sticky` rung** — elements using `position: sticky` + `z-index` must pick from the fixed-position ladder. Can cause buried sticky sidebars if a higher rung intervenes.

**Recommendation (Wave AW/H):** Add `--z-sticky: var(--z-background) + 1` rung for clarity, though this is rarely exercised in glass-ui's current codebase.

---

#### 5. **calc()/min()/max() Chains** ✓ IDIOMATIC
**Checked:** 36 `calc()` patterns found. All are **load-bearing**, not brittle**:

- `calc(var(--dock-separator-height) * 0.5)` — proportional rhythm, correct
- `calc(100% - var(--mask-fade-width))` — gradient stops, intentional asymmetry
- `calc(var(--ripple-radius, 0px) * 0.55)` — typed property interpolation, correct
- `calc(var(--radius-card) - 0.5px)` — corner softening, precise
- `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` — fluid typography, golden ratio, documented

**No fragile breakage patterns.** Cascading vars ensure fallbacks resolve.

---

#### 6. **Design Coherence & Component Encapsulation** ✓ EXCELLENT

**Scoped styles:** 40 SFCs use `<style scoped>`. Token cascade bridges globals cleanly (no CSS Wars).

**Examples of smart colocalization:**
- `/src/components/custom/timeline/ContinuousTimeline.vue` — portaled HoverPopover styles live in the SFC (non-scoped) because portal escapes scoped boundary. **Documented at line 35-39.** Correct discipline.
- `/src/components/custom/dock/GlassDock.vue` — shell + controls coexist; per-control families carved to dock-controls.css per AU.W8b rationale. **Load-bearing split.**

**No duplication.** Recipes are promoted to utilities.css once used at 2+ sites (metric-badge, tap-squish, etc.). DRY enforced.

---

#### 7. **Tailwind v4 Lightning CSS Pipeline** ✓ NATIVE
- Single-source `-webkit-` authorship (utilities.css:268 documents the discipline).
- Lightning CSS auto-prefixes per browserslist — no manual duplication.
- `@supports` gates used properly (overlay, animation-timeline, scrollbar-color).

**Vite config** (vite.config.ts) uses `@tailwindcss/vite` — modern integration, no old postcss pipeline.

---

### MINOR CLEANUPS (Wave Seeds AW/H)

#### Wave Seed AW/H-1: Viewport-gutter default
**File:** `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:60`  
**Change:** `--dock-viewport-inline-gutter: 1rem` → `1.5rem` to absorb scrollbar width on most browsers.  
**Rationale:** Prevents unintended horizontal overflow at the 100vw boundary.  
**Complexity:** Trivial (one token tweak).

#### Wave Seed AW/H-2: Sparkle animation offset tokens (optional, design-gated)
**Files:** `/Users/mkbabb/Programming/glass-ui/src/styles/animations.css:56, 80, 153, 160`  
**Option 1 (no-op):** Remain as-is (hardcoded offsets, locked by design).  
**Option 2:** Promote to tokens if animations become theme-configurable:
```css
/* tokens.css */
--animation-rise: 6px;
--animation-slide-distance: 16px;
--sparkle-entry-translate-x: -30%;
--sparkle-entry-translate-y: -30%;
--sparkle-exit-translate-x: 180%;
--sparkle-exit-translate-y: 180%;
```
**Rationale:** Enables animation theming without CSS edits.  
**Complexity:** Moderate (requires composable template in animations.css).

#### Wave Seed AW/H-3: Z-index documentation clarification
**File:** `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:400+` (z-index comment block)  
**Add:** Clarify that `position: sticky` elements should use `--z-background + N` or a dedicated rung.  
**Rationale:** Preempts future sticky-element layering bugs.  
**Complexity:** Documentation only (1 comment block).

---

### ASSESSMENT SUMMARY

| Axis | Rating | Notes |
|------|--------|-------|
| **Tailwind v4 Idiom** | ✓ A+ | Zero arbitrary sprawl. Token-first. @theme complete. |
| **Stylesheet Organization** | ✓ A | Monolithic by design, not accident. Carving rationale documented. |
| **CSS Modernity** | ✓ A+ | `color-mix`, `light-dark()`, `@supports`, `@starting-style`. No legacy. |
| **Encapsulation** | ✓ A+ | Scoped SFC + global recipe layer. DRY enforced. Portal discipline documented. |
| **Fragile Rules** | ⚠ B+ | 3 low-risk items (offsets, 100vw gutter, z-rung clarity). All mitigatable. |
| **Deprecation** | ✓ A+ | Vendor prefixes are justified (Safari fallback). No archaic patterns. |

**Overall: Production-ready, idiomatic Tailwind v4 + CSS. AV.W16 migration complete. Conservative refinements only.**

---

### WAVE SEEDS (AW/H)

1. **Viewport-gutter default:** Increase from 1rem → 1.5rem (dock.css:60)
2. **Animation offset tokens (optional):** Promote sparkle/slide offsets to tokens if theming required
3. **Z-index sticky documentation:** Clarify sticky-element rung usage in tokens.css comment block

**Priority:** LOW-MEDIUM. No blocking issues. Enhancements for edge cases + future extensibility.

---

### Lane 8

Excellent. Now I have all the information I need. Let me compile the assay report:

---

## Design-Idiom Localization Assay: glass-ui

### FINDING: Excellent Centralization with Emergent Scattering

Glass-ui **successfully localizes the majority of design idioms** in `/Users/mkbabb/Programming/glass-ui/src/styles/` with a principled cascade order (index.css:43–111), BUT exhibits **three coherence gaps** where idioms leak into component-scoped CSS and large monolithic files breach the 500-line threshold.

#### Localization Structure (Strength)

The **canonical design-idiom ledger** is centralized and well-organized:

1. **tokens.css** (1693 lines) — single source of truth for ALL @theme values: color rungs (13-stop palette, viz-basis: Fourier/Chebyshev/Legendre), glass tiers (wash/quiet/resting/floating/overlay), easing springs (iOS-canonical smooth/snappy/bouncy/gentle/dock via linear()), motion durations, radius primitives. `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:13–350` establishes the warm-cream + muted-black aesthetic + iOS-26 spring curves.

2. **theme.css** (416 lines) — Tailwind v4 @theme bridge. Plain @theme blocks for radius semantics (cards/panels/dialogs collapsing to `--radius-2xl` via alias without value duplication; line:28–50). Inline @theme for token var() references (line:52+). Semantic aliases (surface-tint-quiet/floating/modal → color rungs; glass-tier bridges; z-index ladder) colocate the Tailwind contract with the token canon.

3. **glass.css** (432 lines) — Five-tier surface ladder + composite classes. `.glass-{wash,quiet,resting,floating,overlay}` with iOS under-shadow + rim/catch-light idioms (line:48–106). Content-aware modifiers (`.glass-over-text` / `[data-over-content="solid"]`) add contextual depth control (line:108–142). Convenience shorthands (`.glass-card` / `.glass-btn` / `.glass-pill`) compose idioms without duplication (line:175+). Grain overlay unified (line:144–168).

4. **Typography.css** (493 lines) — Golden-ratio scale (√φ) + semantic type classes. `@utility text-{display,title,heading,prose,body,small,caption,micro}` idioms extracted into named recipes to avoid inline literal spread (line:43+).

5. **dock.css** (979 lines) — **BREACH**: Single file owns dock shell, density rules, grain/layer-crossfade, AND all four dock-control families. Spilled into dock-controls.css but still monolithic. Container queries (dock / inline-size) + shared four-state comma-group contract colocated (line:9–50).

6. **utilities.css** (1095 lines) — **BREACH**: Mixes @utility definitions (`popover-animate`, `slide-in-from-side`, `scale-on-hover`, `btn-audacious`, `btn-interactive`, `rainbow-vivid`) + @layer components recipes (popover-content, labeled-field, focus-ring). Scales across multiple idiom families without grouping sub-modules.

#### Scattered Idioms (Weaknesses)

1. **Component-level CSS**: 56 Vue SFCs contain `<style scoped>` with glass-related declarations. Examples: Aurora.vue, GlassDialogNative.vue, InstrumentChassis.vue, GlassPanel.vue, GlassCarousel.vue (`/Users/mkbabb/Programming/glass-ui/src/components/custom/*/`). While component-owned motion + layout is appropriate (colocation), brand idioms (glass tiers, focus rings, transitions, color tokens) should source from the centralized registry, not re-derive.

2. **instrument-chassis.css** (347 lines) — Defines `.instrument-chassis` (line:23–79) with inline glass + phase-tint composition. The chassis glass wiring is component-specific (correct), but the twin-line divider idiom (line:9 comment "signature of the system") is re-encoded in chassis.css + instrument-rail.css rather than extracted to a `@utility twin-line-divider` in the styles registry. **DRY violation**: line:9–10 documents the idiom; no shared utility exists.

3. **dock-controls.css** carved out of dock.css (line:index.css:67–74) — five control families (icon-button, tab-button, select-trigger, dropdown-trigger, touch floor) own their focus-ring + disabled paint per control (line:dock-controls.css:36–50). The comma-group contract in dock.css (line:9–27) is the single source, but per-control selectors redundantly nest focus-visible / disabled. **Opportunity**: extract `@utility dock-control-states` to avoid per-family duplication.

#### Design Cohesion (Warm-Cream-Glass + iOS-26 Aesthetic)

**Coherent**: The five glass tiers read as iOS Liquid Glass (backdrop-filter + under-shadow hairline + rim catch-light). Glass-bg + glass-blur + glass-border + glass-shadow tokens chain correctly via tokens.css → theme.css → glass.css (cascade order load-bearing per index.css:39–50). iOS spring curves (smooth 0.5% overshoot, snappy ~6.8% overshoot, bouncy ~20.5%) are canonical in tokens.css:159–163, consumed by ease-* utilities. Warm-cream default identity (--color-primary + --section-* palette) is neutral-forward; consumers override at `:root` or `.dark` without rebuild.

**Color-scheme discipline**: light-dark() + native color-scheme support (tokens.css:32, theme.css accent-color bridge) keeps native controls + custom surfaces in sync without @property registration pitfalls.

**Grain + paper**: Glass grain overlay (glass.css:144–168) + paper.css texture compose without brittle SVG paths — variables control opacity + blend mode per light/dark.

#### File Size Analysis

- tokens.css (1693 lines) — **Monolithic but necessary** (single source of truth; no sub-module without fragmentation).
- utilities.css (1095 lines) — **Should split**: @utility definitions vs. @layer components recipes into separate files (utilities-animation.css / utilities-components.css).
- dock.css (979 lines) — **Should split**: dock shell + density + grain in one file; dock-controls carved out but still tied to parent. Extract density rules + grain to a sub-module.
- dock-controls.css (486 lines) — **OK**: Five control families, shared contract, manageable size.

---

## Wave Seed (AW/H) — Design-Idiom Refactoring

### HIGH PRIORITY (Design Cohesion & DRY)

1. **Extract `@utility twin-line-divider`** from instrument-chassis.css:9–10 + instrument-rail.css into utilities.css or a new utilities-dividers.css. Standardize the "top catch-light + bottom under-shadow" idiom as a reusable recipe. **File:line**: instrument-chassis.css:9 / instrument-rail.css (shared divider rule).

2. **Break utilities.css into three sub-modules**:
   - `utilities-animation.css`: @utility popover-animate, slide-in-from-side, sheet-animate, scale-on-hover, transition-control, transition-collapse (state-machine animations).
   - `utilities-components.css`: @layer components (section-description, labeled-field, popover-content, focus-ring, btn-audacious recipes).
   - `utilities-color.css`: rainbow-vivid, rainbow-pastel, table-cell/head (color + semantic utilities).
   - **File:line**: utilities.css:1–1095 (split by semantic domain).

3. **Extract `@utility dock-control-states`** (focus-visible + disabled paint shared across five controls) from dock.css:9–50 and dock-controls.css:36–50 into a single canonical definition. Re-compose each control's selector to `@apply dock-control-states` + per-control specifics. **File:line**: dock.css:9–50 / dock-controls.css:36–50.

### MEDIUM PRIORITY (Encapsulation & Colocation)

4. **Audit component-level glass CSS**: 56 Vue SFCs with `<style scoped>`. Identify brand idioms (glass tier composition, focus rings, color-scheme cascades) that duplicate centralized registry entries. Move pure brand idioms to utilities.css; leave component-specific layout/motion in SFC scopes. **File:line**: src/components/custom/{aurora,dialog-native,glass-carousel,dock,glass-panel,hover-popover,instrument-chassis,paper-backdrop}/*/vue (56 files).

5. **Colocate dock density rules** (container queries, label/glyph reflow at breakpoints) into a sub-module or alongside dock-controls.css if they're control-specific. If shell-wide, keep in dock.css but document the boundary (shell vs. control vs. density vs. grain). **File:line**: dock.css:52–979.

6. **Establish a "design-idioms" region in index.css** that explicitly lists what lives CENTRALIZED (tokens, theme, glass, typography, animations, transitions) vs. COMPONENT-SCOPED (per-SFC layout/motion) vs. UTILITY-LAYER (reusable recipes). Document the boundary so new contributors collocate idioms correctly. **File:line**: index.css:1–50 (add section map).

### LOW PRIORITY (Polish & Consistency)

7. **Promote `--glass-spine-border` and `--glass-curvature-overlay` to tokens.css** if they're used across multiple components (instrument-chassis.css:52, line:38). Else document them as chassis-local. **File:line**: instrument-chassis.css:52 / tokens.css (color/shadow rungs).

8. **Validate Tailwind v4 inline @theme @property guardrail** (theme.css:22 comment about light-dark()). No `@property` registration on color tokens; document in CLAUDE.md. **File:line**: theme.css:1–25.

---

## Summary

**Localization: B+ (85%)** — Centralized cascade + semantic aliases are strong; idiom semantics (glass tiers, spring curves, radius, color-scheme) are single-sourced in tokens.css → theme.css → component CSS. **Encapsulation: C+ (72%)** — utilities.css and dock.css exceed 500 lines; component-scoped CSS bleeds brand idioms; the twin-line divider idiom lives in two places. **Coherence: A (95%)** — warm-cream + iOS-26 aesthetic is consistent across all tiers; glass-on-glass discipline is enforced; grain + shadow + specular are unified. **Modern Tailwind v4: A (95%)** — @theme plain/inline split for radius + color bridges is idiomatic; no deprecated CSS; v4 @utility recipes extracted cleanly.

**Recommendation**: Slice utilities.css + dock.css by semantic domain; extract the twin-line + dock-control-states idioms to named utilities; audit component CSS for brand idiom leakage. After refactoring, the design system will be A-grade encapsulation + cohesion.

---

### Lane 9

Perfect! Now I have a comprehensive picture. Let me compile my analysis:

## CSS Colocation Assessment — glass-ui (AW/H Tranche)

**Status**: Glass-ui demonstrates **exceptionally mature colocation discipline** overall, with highly intentional separation of shared cascade (tokens, glass tiers, motion) from component-scoped styles. The structure is fundamentally sound but shows some **strategic monolithic patterns** that could benefit from refinement.

---

## Analysis: Global vs. Component-Scoped

### WELL-ARCHITECTED (Genuine Shared Cascade)

**Tokens + Infrastructure (2.1KB deployed)**
- `/tokens.css` (1693 lines) — Design system primitives: CSS custom properties (colors, easing, shadows, glass opacity/blur, z-index, typography bridges). **Correctly global**; single source-of-truth for every consumer override.
- `/theme.css` (416 lines) — Tailwind v4 `@theme` block mapping tokens to utilities. **Correctly global**; enables runtime token mutation across light/dark without rebuild.
- `/typography.css` (493 lines) — Golden-ratio type scale, font-family fallback stacks, `@utility` declarations. **Correctly global**; pure value layer, no consumption of component classes.
- `/glass.css` (432 lines) — Five-tier glass surface ladder (wash/quiet/resting/floating/overlay) + `.glass-btn`/`.glass-card` utilities. **Correctly global**; architectural standard for the whole library, consumed by dozens of components.
- `/glass-specular-track.css` (154 lines) — Pointer-tracked liquid-glass specular (AV.W15). **Correctly global**; a decorator applied to `.glass-*` surfaces.
- `/animations.css` (375 lines) — Pure `@keyframes` library (fade-in, slide-up, shimmer, shake, etc.). **Correctly global**; animation registry shared across projects.
- `/transitions.css` (245 lines) — Vue `<Transition>` class recipes (fade-slide, dialog-scale, pop, dropdown, tab-fade, etc.). **Correctly global**; motion vocabulary transcends any single component.

**Motion Tokens & Easing (embedded in tokens.css)**
- `--duration-*`, `--spring-*`, `--ease-*` families: Unified motion canon. **Correctly global** per the spring-curve analysis (tokens.css §2: "DO NOT hand-edit; source-of-truth ties each (response, ζ) pair via `springLinearStops()`").

---

### INTENTIONALLY MONOLITHIC (Legitimate Component-Scoped Elevation)

These files are **component-centric but architecturally justified** to live globally because:
1. They define widely-consumed `.class-*` utilities exported from the public CSS entry point.
2. They share cross-control contracts (focus rings, disabled opacity, motion tokens).
3. They couple to cascade order (glass.css → dock.css → dock-controls.css is load-bearing).

**A. Dock Ecosystem (1.465KB)**
- `/dock.css` (979 lines): Base `.glass-dock` shell, density presets, layer-transition, cross-control motion/focus contract.
  - **Candidate for split**: The 12+ density state blocks (compact/comfortable/spacious/audacious + their triggers) could be a separate `dock-density.css`. Density concerns are orthogonal to shell.
  - **Candidate for split**: Layer-transition + expand/collapse morphing logic could move to SFC scoped styles on `GlassDock.vue` (currently live here; the JS state machine already exists).
  - **Why kept global**: Shared `:where()` motion/focus groups (AU.W8b.3) that dock-controls.css patches into. Inlining would duplicate.

- `/dock-controls.css` (486 lines): Five control families (icon-button, dark-mode-toggle, tab-button, select/dropdown-trigger). 
  - **Well-scoped**: Each control is a re-usable primitive. The family shares the `--dock-press-spring` binding (AU.W8b.4), which is correctly placed here.
  - **Candidate for extraction**: Per-control rules could live in per-component SFC files (DockIconButton.vue, DockTabButton.vue, etc.) IF the shared `:focus-visible`/`:disabled` groups moved to an `@layer` in GlassDock.vue. Today the groups live in dock.css line 36–50 and are referenced. Duplication risk is real.

**B. Instrument Ecosystem (567 lines)**
- `/instrument-chassis.css` (347 lines): `.instrument-chassis` surface + three-region dividers + `--phase-color` cascade.
  - **Well-globalized**: It's a single, large atomic surface that is rarely customized. Lives here to keep it in the cascade order (after utilities.css so component-local overrides win). `InstrumentChassis.vue` has zero scoped CSS.

- `/instrument-rail.css` (128 lines): Vertical icon rail with flex-basis φ² binding + bezel hairlines + sibling divider rules.
  - **Lean and justified**: ~65 lines of core rule; the rest is documentation. No candidate for split.

- `/glyph-face.css` (92 lines): Three-layer composition for `<GlyphFace>` (cap + backplate + layered fills).
  - **Correct scope**: The CSS entirely defines one component's surface. Could move to `GlyphFace.vue` scoped block but is here for: (a) single public `.glyph-face` class, (b) no competing JS concerns, (c) live in cascade order.

- `/disco-glyph.css` (26 lines): Host-rule wrapper for `<DiscoGlyph>`. 
  - **Trivial and justified**: Only 26 lines. Stays global to keep the component family (glyph-face + disco-glyph) adjacent in the cascade.

**C. Sheet Primitives (212 lines)**
- `/drawer.css` (138 lines): `.glass-drawer` + handle + snap-stop-rule. Token-driven; vaul-vue owns the motion.
  - **Decision point**: This could move to `DrawerContent.vue` scoped block. No shared controls. Kept global because: (a) it's the public `.glass-drawer` class contract, (b) flat rule count (single `.glass-drawer` + modifiers), (c) lives in cascade order (before consumers).

- `/floating-panel.css` (34 lines): `.floating-panel` + animation grammar routing.
  - **Candidate for SFC relocation**: Only 34 lines. Could move to a `FloatingPanel.vue` scoped block. Kept global because the `.floating-panel` is a low-level utility consumed by action menus + swatch popovers (multiple SFCs).

- `/hover-popover.css` (44 lines): `.hover-popover-panel` + `.hover-popover-label`. 
  - **Candidate for SFC relocation**: Only 44 lines. Could move to `HoverPopover.vue` scoped block. Kept global because the panel is the public contract; richer slot content is consumed without props.

---

### SHARED UTILITIES (True Cross-Cutting Concerns)

**`/utilities.css` (1095 lines)** — The heavy hitter.
- `.section-description`, `.labeled-field-label`, `.labeled-field` error/valid states
- `.popover-content`, `.scrollbar-hidden`, `.scrollbar-thin`
- `.focus-ring`, `.hairline-accent`
- `.btn-audacious`, `.btn-interactive`, `.metric-badge` variants
- `.rainbow-*` palette
- **Assessment**: This is **legitimately monolithic** — it collects utilities consumed by 20+ components (LabeledField, Section, Popover/DropdownMenu, every button, MetricBadge, etc.). NOT a candidate for colocation; splitting would fragment the contract.

---

## Wave-Seed (AW/H) Findings

### 1. **MONOLITHIC-GLOBAL CANDIDATES FOR COLOCATION** (Conservative Priority)

| File | Lines | Scope | Recommendation |
|------|-------|-------|-----------------|
| `dock.css` density blocks | ~400 | Orthogonal to shell | **Extract to `dock-density.css`** — 12+ density state selectors repeat the pattern. SFC-scoped would couple density tuning to GlassDock.vue. Separate file keeps density independent. |
| `dock.css` layer-transition | ~180 | Animation, spatial morph | **Marginal**: Keep global (references shared motion tokens in top of file); value of extraction unclear (GlassDock.vue already owns the logic; CSS is the visual substrate). **Leave as-is**. |
| `dock-controls.css` per-control rules | ~350 | Icon, tab, select, dropdown | **No extraction yet**: The shared `:focus-visible` / `:disabled` groups + `--dock-press-spring` binding (lines 37–44) couple controls to dock.css. Extraction would require a new `@layer` anchor. **Feasible future work**: Promote shared groups to GlassDock.vue `@layer` block, then move per-control rules to SFC scoped CSS. **Moderate priority**: Reduces global footprint but adds SFC size. |
| `floating-panel.css` | 34 | Single surface | **Extract to `FloatingPanel.vue` scoped block** — No shared controls, single consumer site. **Low priority**: 34 lines is negligible. |
| `hover-popover.css` | 44 | Single surface + label | **Extract to `HoverPopover.vue` scoped block** — No shared controls. **Low priority**: 44 lines is negligible. |
| `drawer.css` | 138 | Single surface + handle | **Keep global**: vaul-vue owns the interaction layer; glass-ui owns the look (glass tier + handle). Extraction couples drawer look to DrawerContent.vue. **Leave as-is**. |

---

### 2. **WELL-ENCAPSULATED GLOBAL CSS** (No Change Needed)

- **tokens.css, theme.css, typography.css, glass.css, animations.css, transitions.css**: Pure design infrastructure. **Correct scope**. No colocation candidate.
- **instrument-chassis.css, instrument-rail.css, glyph-face.css, disco-glyph.css**: Single surfaces, cascade-order critical. **Correct scope**. SFC colocation would break cascade.
- **utilities.css**: Cross-cutting concerns (20+ component dependents). **Correct scope**. Fragmentation risk too high.

---

### 3. **SCOPED-CSS COMPONENT PATTERN** (Current Practice)

**BouncyToggle.vue**: 195 lines of scoped CSS (grid, slider JS-anchor path, responsive padding, color transitions).
- **Assessment**: **Correctly colocated**. The slider anchor-positioning + JS measure fallback are SFC-specific concerns.

**GlassCarousel.vue**: 140+ lines of scoped CSS (@property typed lengths, scroll-state container queries, flex states).
- **Assessment**: **Correctly colocated**. The carousel is self-contained; no shared surface contract.

**GlassCarouselItem.vue, HoverPopover.vue, DockTabButton.vue**: Mix of template classes + scoped styles.
- **Assessment**: **Pattern is sound**. Scoped styles handle layout/animation specifics; global utilities (`.glass-*`, `.text-*`, motion tokens) handle semantics.

---

### 4. **DESIGN COHESION CONCERNS** (No Breaking Patterns Found)

✓ **Idiomatic modern Tailwind v4**: Token-first authorship; `@theme` bridges; `@layer components` discipline.
✓ **No duplication (DRY)**: Shared curves (spring tokens), shared surfaces (glass tiers), shared utilities (focus rings, scrollbars).
✓ **Conservative + judicious changes**: Careful versioning (v0.8.0 R3-spec glass rename, AU.W8b carves, AL-W10 SLIM retention). Comments cite tranche/lane/section for every non-obvious choice.
✓ **No brittle/deprecated/bespoke CSS**: All vendor-prefixed forms handled by Lightning CSS; `@supports` fallbacks for backdrop-filter, `:has()`, anchor positioning.
✓ **Consistent service boundaries**: Glass tiers are singular; tokens are singular; motion is singular. No duplicate definitions.

---

### 5. **OPPORTUNITIES FOR ENCAPSULATION IMPROVEMENT** (Future)

1. **Dock-density split** (LOW-EFFORT, MEDIUM-VALUE)
   - Extract `dock-density.css` with 12+ density blocks.
   - Keep `dock.css` for shell + layer-transition + cross-control groups.
   - Reduces conceptual coupling (density is a preset, not core shell).

2. **Dock-controls → SFC scoped** (MEDIUM-EFFORT, LOW-VALUE)
   - Requires promoting shared `:focus-visible`/`:disabled` groups to `GlassDock.vue` `@layer` block.
   - Value: ~480 lines back into component layer.
   - Risk: Couple dock-control look to dock SFC; breaks the "any dock variant can compose any control" pattern.
   - **Verdict**: Not recommended unless SFC-by-control isolation becomes a requirement.

3. **Floating-panel + hover-popover → SFC scoped** (TRIVIAL-EFFORT, TRIVIAL-VALUE)
   - 78 lines total. Value is symbolic (fewer global files).
   - **Verdict**: Do if pursuing maximum colocation; skip if seeking practical ROI.

---

## Brief Summary (AW Ledger)

**Current State**: Glass-ui CSS colocation is **exceptionally disciplined**. The 2.3KB of component-scoped global CSS (dock, instruments, sheets) is **legitimate and well-justified** — each item is either a cross-control contract (dock), a large atomic surface (chassis), or a re-usable primitive (floating-panel, drawer).

**No critical issues found**. The global stylesheet is not monolithic-bloated; it's **strategically scoped**. 

**Marginal improvements** are available (dock-density split, floating-panel/hover-popover extraction) but yield **low practical ROI** — the three files (floating-panel, hover-popover, drawer) total 216 lines, and extracting them would fragment the public CSS entry point without reducing the library's overall footprint or improving runtime performance.

**Recommendation**: **Keep the current structure**. Invest effort in:
1. **Documenting the intentional cascade order** (index.css already does this excellently).
2. **Maintaining the token-first discipline** (no arbitrary RGB/HSL literals; route through custom properties).
3. **Preserving the SFC-scoped pattern** for component-specific layout/animation (BouncyToggle, GlassCarousel already exemplify this).

---

### Lane 10

Perfect. Now I have comprehensive understanding. Let me create the final report:

## Code-Quality Assay: Slides Styling (AW/H Lane: sl-tailwind-css)

### Summary
The slides codebase demonstrates strong architectural discipline across the Tailwind/CSS foundation but exhibits several brittle patterns and inconsistencies that degrade encapsulation and maintainability. The primary issues center on **hard-coded viewport magic numbers**, **bespoke radius/sizing fallbacks**, **scoped style bloat**, and **redundant calc() chains** that diminish container-query idiomatic clarity.

---

### Findings & File:Line Citations

#### 1. **Brittle Radius Magic Numbers (Non-Tokenized)**
- **Issue**: Three distinct pixel-literal border-radius values scattered across scopes, bypassing the deck's `--radius-*` token ladder.
  - `/Users/mkbabb/Programming/slides/src/decks/til-briefing/slides/Slide04.vue:222` — `.receipt` uses `border-radius: 4px` (should use `--radius-sm` ≈ 0.375rem)
  - `/Users/mkbabb/Programming/slides/src/decks/til-briefing/slides/Slide08.vue:311` — `.lanes::after` uses `border-radius: 2px` (hardcoded, non-standard)
  - `/Users/mkbabb/Programming/slides/src/decks/til-briefing/components/PresenterCard.vue:50` — uses `border-radius: 3px` (isolated, breaks token consistency)

**Impact**: Radius values cannot scale cohesively; export/print mode breaks predictability.

---

#### 2. **Redundant calc() Chains — Over-Scalarization**
- **Issue**: Excessive calc(N*var(--cqx)) inlining creates maintenance friction. While philosophically sound (1px=1px at 1280cqi), the density masks intent and defeats DRY.
  - Slide04.vue: 42 instances of `calc(*var(--cqx))` across 31 selectors (line 140–416)
  - Slide08.vue: 61 instances across similar scope span
  - Slide09.vue: 45+ instances in the monitor/waveform component

**Example** (Slide04.vue:180):
```css
.key { margin-top: calc(16*var(--cqx)); display: flex; gap: calc(11.2*var(--cqx)); ... }
```
Could cohere as a discrete *spacing mixin* (not in Tailwind @utility layer, but a naming pattern):
```css
@utility key { /* single-purpose, named bundle */ }
```

**Impact**: Scoped style blocks exceed 400 lines (Slide04: 417 lines); cognitive load, merge conflicts, redundant specifications.

---

#### 3. **Non-Idiomatic Tailwind — !important Specificity Trap**
- **Issue**: Single `!important` escape-hatch in Slide08.vue:473 signals a cascade loss.
  - `/Users/mkbabb/Programming/slides/src/decks/til-briefing/slides/Slide08.vue:473`:
    ```css
    .trap-row__close { color: var(--red-text) !important; }
    ```
  This modifies a child `<b>` inside `.trap-row__txt` where the parent color was already set. The !important reveals a scoping boundary issue—child-specific recoloring should be inherited or use a sibling selector, not forced.

**Impact**: Teaches brittle specificity escalation; future edits will likely propagate !important creep.

---

#### 4. **Container-Query Viewport Trap — Hard-Coded 700px Breakpoint**
- **Issue**: All slides use `@container (width < 700px)` as a magic number, never parameterized or justified in deck.css.
  - Slide04.vue:377, Slide08.vue:~550+, Slide09.vue:290, SlideNutrition.vue, etc.
  - No corresponding `--container-breakpoint: 700px` token to define the portable reflow threshold.

**Pattern violation**: Container queries should be named breakpoints (e.g., `--cq-narrow`) sourced from the deck spine, not scattered magic constants.

**Impact**: Portrait reflow unpredictability; a single deck.css token change breaks every slide's @container rule.

---

#### 5. **Scoped Style File Bloat — No Composable Granule Layer**
- **Issue**: Large slide components hoist all styling into a single `<style scoped>` block instead of delegating pattern-repetitive rules to composable sub-components or a component-local utility layer.
  - **Slide08.vue: 576 lines** (template + script + styles combined; ~250 CSS lines alone)
  - **Slide04.vue: 417 lines** (dark-hero + receipt + delta chart bundle; ~250 CSS lines)
  - **Slide09.vue: 309 lines** (waveform + scope + caps; ~180 CSS lines)

**Examples of bundling opportunities**:
- Slide04: `.delta` chart (lines 319–341, 11 rules) + `.delta__svg` (lines 330–341) are self-contained but internal
- Slide08: `.node--ai` (lines 356–362, 4 rules) + `.node--human` (lines 366–372, 4 rules) are nearly identical except color assignments—could extract to a mixin
- Slide09: `.cap` card hover (lines 258–264) duplicates a glass-ui `.card:hover` pattern

**Recommendation**: Break nodes/cards/grids into granular SFCs where sizing/color encapsulate once, or defer repeating color/shadow tokens to named @utility recipes in deck-theme.css.

---

#### 6. **Brittle CQX Geometry — Implicit Coupling**
- **Issue**: Padding, gap, and sizing are tightly coupled to the 1280cqi authoring frame via calc() without fallback or override tokens for exceptional cases.
  - Slide04.vue:140 — `.slide { padding: calc(52*var(--cqx)) calc(72*var(--cqx)); }`
  - If deck.css ever changes `--cqx` (e.g., for an aspect-ratio recompute), every calc() silently recomputes—no compile-time guarantee.

**Missing guard**: No token-level **spatial scale** (e.g., `--spatial-base: calc(1cqi / 12.8)`, then `padding: calc(52 * var(--spatial-base))`). The multiplication factor is implicit in the constant 12.8, which is documented but not named.

---

#### 7. **SVG Inline Styling — Stroke/Fill Not Unified**
- **Issue**: SVG `<path>` and `<circle>` elements mix inline styling with CSS class selectors, creating brittle dual-mode fills/strokes.
  - Slide04.vue:120-125 — inline `stroke="var(--ncsu-red-bright)"` alongside scoped `.ic`, `.ic-fill` classes
  - Slide08.vue:121 — inline `stroke="var(--ncsu-red)"` in feedback SVG path
  - Slide09.vue:47-66 — inline `overflow:visible` style attribute on SVG instead of CSS class

**Impact**: Inline styles bypass the scoped hash and don't benefit from light-dark() token migrations; maintenance risk if theming changes.

---

#### 8. **Portrait Reflow Duplication — @container Rules Scattered**
- **Issue**: Each slide re-declares the same @container media query block with near-identical patterns (grid reflows, font sizing adjustments, space tokens), with no shared mixin or partial.
  - Slide04.vue:377–416 (portrait reflow, 40 lines)
  - Slide08.vue:~500+ (portrait, 50+ lines)
  - Slide09.vue:290–308 (portrait, 18 lines)

**DRY violation**: Portrait grid collapse (`grid-template-columns: 1fr`) and space reassignments (`margin-top: var(--space-N)`) repeat across every slide. A cascade-level @container mixin in deck.css would collapse repetition.

---

### Design Cohesion Issues

1. **Font-Size Hardcoding in SVG Text**: Slide04.vue:337 uses `font-family: var(--font-mono); font-size: 9px` (literal px, not cqi-scaled). This defeats export parity: at 1280cqi, 9px != the authoring size.

2. **Dark Hero Isolation**: Slide04.vue:266–289 re-declares a complete dark color scheme inside `.hero` as scoped CSS variables. This is cohesive but **not re-exported** to a theme token, so other dark panels (e.g., Slide09 waveform, Slide08 nodes) cannot reuse it. Each forced-dark context carries its own shadow +10% custom-property re-pin.

3. **Z-Index Coupling**: Slide08.vue lines 307–312 declare `.lanes::after` with no z-index comment; it implicitly sorts below `.seam { z-index: 4 }` (line 397), which sorts below `.feedback { z-index: 0 }` (line 413). The three are not stacked in the deck.css registry (§Z-INDEX REGISTRY, deck.css:161–181), creating a maintenance trap.

---

### Wave-Seeds (AW/H)

1. **Tokenize border-radius magic numbers**: Introduce `--radius-xs: 2px` (for thin strokes) and `--radius-xs-wide: 3px` in deck.css §1 or deck-theme.css @theme, replace literals in Slide04.vue:222, Slide08.vue:311, PresenterCard.vue:50.

2. **Extract spacing/sizing @utility recipes**: Create a `@utility spacing-key`, `@utility node-base`, `@utility card-shadow-ai` layer in deck-theme.css to collapse duplicate calc() patterns across Slide04/08/09, reducing scoped block line counts below 200 lines per slide.

3. **Parameterize @container breakpoint**: Move `700px` to `--container-narrow: 700px` in deck.css §1, re-reference as `@container (width < var(--container-narrow))` in all slides. OR use a CSS media-query alias (e.g., `@supports selector(:has(*))` blocks for future query-eval).

4. **Unify dark-ground color scheme**: Extract Slide04 `.hero` dark-variable re-pins (color-scheme, --foreground, --card, etc.) into a reusable `@utility dark-ground` or `.slide--dark-hero` class in deck-theme.css, re-export to Slide08/09/Xray.

5. **Consolidate SVG stroke/fill**: Move all inline `stroke="var(--ncsu-red-bright)"` to scoped CSS classes (`.ic--red-bright`, `.ic-fill--red-bright`). Ensure @media (prefers-color-scheme) flips are honored.

6. **DRY portal @container rules**: Hoist common portrait reflow patterns (grid-to-block, space reassigns, font-size clamps) into a shared partial or Tailwind @utility block rather than repeating in every slide's `@container (width < 700px)` block.

7. **Audit z-index against deck registry**: Cross-check all `.feedback`, `.seam`, `.lanes::after` stacking against deck.css §Z-INDEX REGISTRY (tiers 0–50); document any slide-local overrides (e.g., Slide08 `.head { z-index: 2 }` for parallax) with explicit tier rationale.

8. **Retire hard-coded SVG font-size**: Replace `font-size: 9px` in SVG text (Slide04:337, Slide08:424, Slide09:246) with `clamp(8px, 0.9cqi, 12px)` or a named token (`--type-svg-label: clamp(8px, 0.9cqi, 12px)`), ensuring export parity.

9. **Extract !important usage**: Refactor Slide08:473 `.trap-row__close { color: var(--red-text) !important; }` to use a sibling or child selector without force (e.g., `.trap-row__txt .trap-row__close { ... }` or `.trap-row__txt > b.close { ... }`), removing the specificity escalation signal.

10. **Minimize calc() scalar density**: Where `calc(N*var(--cqx))` repeats >3× per rule bundle, introduce a named @utility or component-local **spacing scale** (e.g., `--gap-md: calc(14*var(--cqx))`) to reduce visual noise and enable rapid edits without re-multiplying.

---

### Structural Assessment

**Strengths**:
- Consistent use of cqi/cqx idiom across the deck spine; no ad-hoc px-only sizing on viewport-responsive scales.
- Glass-ui composition is idiomatic; no competing token systems.
- Port-reflow (@container) discipline is present and intentional.
- Color tokens (--red-text, --ncsu-red, --ai-blue-*) exhibit light-dark() discipline.

**Weaknesses**:
- File size & scoped complexity (Slide08: 576 lines) exceeds cohesion threshold.
- Border-radius and SVG magic constants bypass tokenization.
- !important emergence and z-index opacity signal cascade fragility.
- Redundant @container blocks across 15+ slides violate DRY.

**Overall**: The styling ledger leans **isomorphic + idiomatic** but **over-inlined**. Refactor to devolve scoped rules onto a shared @utility layer and eliminate scalar repetition.

---

### Lane 11

Perfect. Now I have all the information I need to generate the comprehensive findings report.

---

## Design-Idiom Cohesion Assay: Slides × Glass-UI

### Executive Summary

The slides styling (/Users/mkbabb/Programming/slides/src/styles) is **highly cohesive** with glass-ui's design language and exhibits **no token duplication** on the critical path. The deck implements a disciplined "consumer-of-glass-ui" pattern: it inherits glass-ui's foundational tokens (neutrals, glass surfaces, motion easings) and layers a purpose-built localized idiom for its specific narrative needs (AI-lane accent, NCSU branding, cartoon depth, nutrition-label semantics).

---

### Strengths

#### 1. Clean Service Boundaries & Encapsulation
- **deck.css** (722 lines) owns the slide-canvas system exclusively: geometry, stage layout, print/export, @media breakpoints, z-index stacking.
- **deck-theme.css** (233 lines) owns identity-only: @theme token registers + @utility recipes (typography ladder, card surfaces, chip components).
- **index.css** (31 lines) orchestrates the import cascade cleanly: Tailwind → glass-ui → deck-theme → deck.
- Single-source-of-truth per concern; zero cross-cutting mixins or scattered layout rules. **Ideal colocation** of identity registers with their consumer utilities.

#### 2. Design Language Localization (No Fork)
The deck **does not fork** glass-ui's tokens. It:
- **Reads glass-ui's imported registers directly**: `var(--foreground)`, `var(--background)`, `var(--muted-foreground)`, `var(--glass-bg-resting)`, `var(--glass-blur-resting)`, `var(--shadow-lg)`, `var(--spring-smooth)`, `var(--ease-out-expo)`, `var(--ease-standard)`.
- **Declares only deck-specific identity** (deck.css:22–157): NCSU red register (primary accent), AI-lane blue register (cool counterpart), portal window colors (single-consumer, Slide 11), cartoon offset-shadow register (depth language), the nutrition-label idiom (FDA food-label parody, Slide 10). None exist in glass-ui's register.
- **No byte-identical redeclarations** of glass-ui tokens into --* properties (the prior deck-local forks of `--ease-out`/`--ease-standard`/`--spring-deck` were audited and deleted; consumers now read glass-ui's curves directly).

#### 3. Idiomatic Modern CSS + Tailwind v4
- **@theme + @utility** architecture (deck-theme.css:35–233) follows Tailwind v4 idioms exactly. Registers (bg-ncsu-red, text-ai-blue-text, shadow-deck-stamp) become first-class utilities composable alongside glass-ui's.
- **No brittle CSS**: 29 uses of `color-mix()`, 0 legacy prefixes, 0 bespoke calc() geometries outside the documented --cqx anchor. Media queries use `@container` (portrait reflow) + `@media` (accessibility: prefers-reduced-motion, prefers-reduced-transparency). No deprecated `backdrop-filter` layering or `-webkit-` manual cruft.
- **Localized design idioms with colocation**: .nutrition-label (deck.css §11) composes ONLY from existing glass-ui tokens (--hairline, --radius-lg, --card, --shadow-lg, --glass-highlight, --foreground); the DOM-scoped <style> blocks in SlideXray.vue (Slide 6) and Slide08.vue own their own grid/flex geometry without leaking to deck.css. **Zero contrivance.**

#### 4. No DRY Violations—Design Cohesion
- **AI-lane accent** (deck-theme.css:48–56, deck.css:42–50): 6-color register (--ai-blue, --ai-blue-text, --ai-blue-surface, --ai-blue-border, --ai-blue-arrow, --ai-blue-shadow) used exclusively in Slide08's hybrid AI/human loop visualization. Light-dark() handled correctly; dark arm lifts on ink. No glass-ui duplicate.
- **Nutrition-label idiom** (deck.css:684–722): New LAYOUT, zero new tokens—uses glass-ui's --card, --foreground, --hairline, --radius-lg, --shadow-lg, --glass-highlight. Interior atomics (delta bar, pulse dot, node glyphs) are restyled in scoped SFC blocks (Slide10 pattern). **No cross-slide leakage.**
- **Portal window tokens** (deck.css:59–64): Scoped --portal-* (window-bg, dot-red/amber/green, status-live) are **single-consumer** (Slide 11 / SlideXray.vue). Not speculative globals. Correctly isolated.

#### 5. Cascade & Layering Discipline
- **section-label precedence** (deck.css:399–408, deck-theme.css:157–164): Glass-ui ships `.section-label` in @layer components (typography.css:460–466). The deck's `.section-label` is **unlayered** (deck.css, not @utility), so it wins the cascade outright. Comment documents why—correct cascade intuition, not accidental clobber. **Intentional, well-documented override**.
- **!important on reduce-motion** (deck.css:539–543, body.export-mode, print) is justified: state-reset for deterministic captures where JS timers and animation-delay stagger would cause flakiness. Scoped to capture modes; production interaction stays clean.
- **@utility on dark arm** (deck.css:366–387, .slide--dark): Forces ink context regardless of global mode. Re-pins color-scheme:dark, overrides --foreground/--card/glass-* tokens. Correct model.

#### 6. Responsive & Container-Query Native
- **cqi geometry anchor** (deck.css:204–227): Every per-slide measure authored as `calc(N*var(--cqx))` where --cqx resolves to 1px at 1280cqi export frame. Forced-1280 export stays pixel-faithful; live stage scales fluidly. **Zero hardcoded breakpoints on the critical path.**
- **Portrait reflow** (deck.css:313–336 + @container rules per-slide): Slides shift from flex-column (landscape, letterboxed 16:9) to block-flow scroll region (portrait). Clearance below last child keeps dock-hidden content visible. Slick. Slides own their own @container (width < 700px) rules; deck.css does not scatter them.

---

### Observations & Micro-Findings

| Finding | File:Line | Grade | Note |
|---------|-----------|-------|------|
| **Easing fork audit** | deck.css:139–157 | A+ | Prior --ease-out/--ease-standard were byte-identical to glass-ui. Deleted; consumers now read --ease-out-expo/--ease-standard directly. One canonical source. |
| **!important scope** | deck.css:539–542 | A | Confined to @media (prefers-reduced-motion: reduce) state reset. Acceptable for accessibility; not overriding style composition in render path. |
| **Portal tokens** | deck.css:59–64 | A+ | Scoped --portal-* (single-consumer, Slide 11). Not speculative. Idiom is **complete in one place**: SlideXray.vue scoped <style> + deck.css token bucket. No leakage. |
| **Nutrition-label zero-fork** | deck.css:684–722 | A+ | New layout idiom (FDA food-label grammar), zero new tokens. Composes ONLY glass-ui atoms. Interior atoms (delta bar, pulse, node glyphs) live in SFC scoped blocks. **Correct encapsulation.** |
| **AI-lane blue register** | deck-theme.css:48–56 | A+ | Purpose-built for Slide08 hybrid loop. 6-color surface/border/text/icon/shadow register. light-dark() handled correctly. Used only in Slide08 scoped block (no deck-wide leakage). |
| **Section-label cascade** | deck.css:399–408, deck-theme.css:157–164 | A+ | Unlayered override of glass-ui's @layer components version. Correct cascade strategy; well-documented rationale in code. |
| **Color-mix atoms** | deck.css throughout | A | 29 uses of color-mix(in srgb, ...). All idiomatic, no brittle `rgba()` literals. Harmonizes with glass-ui's own color-mix register (surface-tint-*). |
| **Dark-mode arm consistency** | deck.css:366–387, :root.dark overrides | A | Re-pins color-scheme:dark, --foreground, --card, glass-* tiers, --constellation-alpha/--constellation-accent. Correct light-dark() lift on --red-text/--ai-blue. No partial coverage. |
| **File size (deck.css)** | 722 lines | A– | Just above 500-line guideline, but well-sectioned (§1–§11, each with role clarity). Geometry § + tokens § + typography § + glass § + components § + chrome § + animation § + print § + color-mode § + idiom § separate cleanly. Could split as tokens.css + geometry.css if deck expands; not urgent. |
| **File size (deck-theme.css)** | 233 lines | A+ | Tight @theme (§1) + @utility bundles (§2–4). Focused. |

---

### Minor Recommendations (Wave-Seed AW/H)

1. **deck.css § organization clarity**
   - deck.css is well-structured internally (§1–§11 with clear demarcation), but at 722 lines sits just above the 500-line break-even. If the deck expands (new slides, new idioms), consider **splitting into** `tokens.css` (§1 + §Z + .slide--dark color mode) + `geometry.css` (§2–§9, stage/layout/chrome/animation/print) + `idioms.css` (§10–§11, color-mode + nutrition-label). Not urgent; current organization is readable and the sections are cohesive. Document the rationale if split.

2. **Portal-tokens discovrability**
   - --portal-* tokens (deck.css:59–64) live near the top of the token bucket but their **sole consumer is SlideXray.vue** (Slide 11). Consider a brief inline comment pointing to SlideXray's scoped <style>:123. Not critical (the code is discoverable via grep), but improves future maintainability.

3. **AI-blue register expansion guard**
   - The AI-lane blue register (deck-theme.css:48–56) is **single-purpose** (Slide08's hybrid loop). Document in a comment if new blue-tinted surfaces are drafted for other slides: the current register is optimized for Slide08's node/border/text/icon/arrow/shadow hierarchy. If Slide12 or later introduces unrelated blue UI, consider whether it should compose from a glass-ui accent or stay isolated in that slide's scoped block.

4. **Nutrition-label atom re-use potential**
   - The nutrition-label idiom (deck.css:684–722) re-styles existing atoms (delta bar, pulse dot, node glyphs) into rows via scoped SFC blocks. If future slides re-use the nutrition-label layout for different data (e.g., a "model card" on Slide13), consider promoting the .nutrition-label / .nl-row / .nl-row--dv / .nl-foot class structure to a small `_nutrition-label.css` module, imported by both slides. **Current state is fine**; flag only if usage grows beyond one slide.

5. **@container rule consolidation (minor)**
   - Portrait media queries are per-slide (each slide owns @container (width < 700px) { ... }). This is **correct colocation** and avoids deck.css becoming a centralized @media hoagie. Maintain. No action.

6. **Reduced-motion audit**
   - @media (prefers-reduced-motion: reduce) at deck.css:538–544 is scoped and correct (kills transition + animation, zeroes parallax). No stray animations escape the gate. **Compliant with WCAG 2.1 § 2.3.3.** No change.

---

### Conclusion

**The slides styling exhibits high design cohesion with glass-ui.**

- **No token duplication** on the critical path (shadow, blur, color-mode, easing, radius, spacing). All reads are direct glass-ui references or deck-local idioms.
- **Disciplined consumer pattern**: Inherits glass-ui's foundational register, layers purpose-built deck identity (NCSU red, AI-lane blue, cartoon depth, nutrition-label layout).
- **Idiomatic Tailwind v4 + modern CSS**: @theme/@utility, color-mix(), light-dark(), @container, no deprecated patterns.
- **Tight service boundaries**: deck.css (geometry/stage), deck-theme.css (identity/utilities), SFC scoped blocks (per-slide) have zero cross-cutting rules.
- **DRY fully observed**: nutrition-label (zero new tokens), portal window (single-consumer), AI-lane blue (Slide08-only), section-label (intentional cascade override).

**No redesign needed.** The AW/H wave can proceed with high confidence. Recommendations above are future-proofing only, not blockers.

---

### Lane 12

Based on my earlier read, the AI-Nutrition-Label tokens are minimal and non-overlapping. Let me now create the final findings summary.

---

## CODE QUALITY ASSAY: STYLING DRY VIOLATIONS (AW/H TRANCHE)

### Finding: 4 Critical DRY Violations + 2 Secondary Concerns

The three repos exhibit systematic token/idiom duplication without shared encapsulation. No brittle code, but the design-token architecture lacks proper abstraction boundaries.

### FINDINGS

**1. CARTOON OFFSET-SHADOW IDIOM (DUPLICATED)**
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:476`
- `/Users/mkbabb/Programming/slides/src/styles/deck.css:127,128`
- `/Users/mkbabb/Programming/slides/src/styles/deck-theme.css:66,67,71`

The `color-mix(in srgb, var(--foreground) N%, transparent)` + offset-shadow recipe appears 5 times across repos. Glass-ui defines canonical sizes (3px/4px @ 8%/10%); deck forks with 7px/5px/4px variants. Idiom is identical; values diverge. **One shared shadow-recipe system needed.**

**2. COLOR-TINT LADDER (INCOMPLETELY ABSTRACTED)**
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:395-410` (12 rungs: 4%–70%)
- `/Users/mkbabb/Programming/slides/src/styles/deck-theme.css:44-46` (3 ad-hoc rungs: 9%, 15%, 30%)

Glass-ui exports `--surface-tint-4` through `--surface-tint-70`; deck hardcodes `--color-red-wash` (9%), `--color-red-tint-15` (15%), `--color-red-tint-30` (30%) with literal `#cc0000`. Deck should reach to glass-ui's ladder or name-map the opacities. **Forked opacity percentages; no cross-repo reuse.**

**3. GLASS-BG SURFACE TIER (NAMING COLLISION)**
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:645-651` (5 tiers: parameterized `--glass-opacity-*`)
- `/Users/mkbabb/Programming/slides/src/styles/deck.css:373-375` (3 tiers: hardcoded `hsl(30 14% 22%)` @ 40%)

Both declare `--glass-bg-wash`, `--glass-bg-quiet`, `--glass-bg-resting` but with incompatible recipes:
- Glass-ui: `color-mix(in srgb, var(--card) calc(var(--glass-opacity-quiet) * 100%), transparent)`
- Deck: `color-mix(in srgb, hsl(30 14% 22%) 55%, transparent)` (hardcoded dark hsl, no var linkage)

Token names collide; values are independent. Deck overrides glass-ui's parameterized recipe without inheritance. **Silent value fork; same name masks incompatibility.**

**4. HAIRLINE BORDER (DUAL NAMING)**
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:378` (`--border-soft: 45%`)
- `/Users/mkbabb/Programming/slides/src/styles/deck.css:67` (`--hairline: 12%`)

Glass-ui ships `--border-soft` (45% opacity); deck names its own `--hairline` (12%). Both express soft-alpha borders; different opacity + names. No shared ladder. **Idiom duplicated, naming forked.**

**5. TYPOGRAPHY STACK (PARTIAL FORK)**
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:43-51` (Fraunces serif + display)
- `/Users/mkbabb/Programming/slides/src/styles/deck.css:86-88` (Fraunces display + Newsreader serif)

Display shares `"Fraunces"`; serif diverges (glass-ui: Fraunces; deck: Newsreader). Mono diverges (glass-ui: Fira Code; deck: Fira Code + SF Mono). **Intentional design divergence; minor concern** (design identity justifies fork).

**6. @UTILITY RECIPE DUPLICATION**
- `/Users/mkbabb/Programming/slides/src/styles/deck-theme.css:175-197`

Card + card-cartoon both declare `backdrop-filter: var(--glass-blur-resting); box-shadow: var(...), var(--glass-highlight)`. Backdrop filter is redundant in the cartoon variant (box-shadow override should suffice). **Low-impact; decorator pattern issue.**

---

### WAVE-SEED (AW/H): CONSOLIDATION TARGETS

1. **EXTRACT: Cartoon Shadow Ladder** → Shared `--shadow-offset-*` token system
   - Unify `color-mix(in srgb, <source-color> N%, transparent)` + `XpxYpx 0 0` recipe
   - Expose deck-variant sizes (4px, 5px, 7px) as parameterized tiers
   - Single source: glass-ui tokens.css § shadows

2. **EXTRACT: Tint Opacity Rung Registry** → Unified opacity palette
   - Move glass-ui's `--surface-tint-*` + deck's red-tint ad-hoc % to ONE canonical ladder
   - Document per-consumer override (deck red via `--tint-source-color: #cc0000`)
   - Retire hardcoded `#cc0000` from deck-theme.css; consume ladder

3. **RESOLVE: Glass-BG Naming Collision** → Parameterized tier overrides
   - Glass-ui's `--glass-bg-*` stay the canonical recipe (parameterized)
   - Deck `.dark` hook: override `--card` + `--glass-opacity-*` (not `--glass-bg-*`)
   - Remove deck's hardcoded `hsl(30 14% 22%)` redefines of glass-ui names

4. **CONSOLIDATE: Hairline Border Opacity** → Single `--border-soft` alias
   - Glass-ui: `--border-soft` (45%, consumed by glass-ui comps)
   - Deck: alias or override as `--deck-hairline: var(--border-soft)` + tune opacity locally
   - Retire separate `--hairline` token; use shared rung

5. **COLLOCATE: Tint Opacity Tiers + Shadow Opacity Tiers** → One alpha-rung system
   - Glass-ui tokens.css already publishes `--glass-opacity-*` (0.30, 0.50, 0.65, 0.80, 0.95)
   - Extend to include shadow alphas (8%, 10%, 12%, 14%, 22%, 28%)
   - Slides/AI-Nutrition-Label read from this ONE opaque ladder

6. **REFACTOR: Deck @utility card/-cartoon** → Remove redundant backdrop-filter
   - `card-cartoon` inherits `backdrop-filter` from `card`; explicitly override box-shadow only
   - Reduce CSS bytes; clarify override intent (shadow change, not blur change)

---

### PRECEPTS APPLIED

- **DRY**: Forked tokens (cartoon shadow, tint-ladder, hairline) eliminate via single shared registry
- **Logical Grouping**: Opacity rungs + shadow opacities → One `--alpha-*` tier system in tokens.css
- **Conservative**: No syntax breakage; all renaming via aliases (backwards-compat)
- **Encapsulation**: Glass-ui tokens.css is single source; deck/.dark inherits + overrides named knobs only
- **Isomorphic**: No JS; pure CSS var() resolution (light-dark() + calc() where needed)

---

### AI-NUTRITION-LABEL (Minimal Overlap)

`/Users/mkbabb/Programming/AI-Nutrition-Label/frontend/src/styles/tokens.css` is isolated (no glass-ui consumer). Defines own `[data-theme]` + Tailwind color scale. **No cross-repo duplication risk; no AW/H consolidation required.**
