# BG-WS4 — Components · Demo · Encapsulation — SPEC (pass 1)

Branch `tranche/BG` @ `e78b63c6`. All claims source-verified at HEAD. This workstream runs AFTER WS1 (routing/Transition), WS3 (unified blur), WS2 (dock-IA), WS5 (viz), WS6 (Siri) per the convergence order — so it ASSUMES routing, the dock gear-reach, and the viz studios are converged upstream, and the scroll-shrink/configurator/preview acceptance bars are paint-verifiable on a mounted, non-frozen shell.

---

## 1 · GESTALT GOAL

ONE sentence: **the non-dock surface stops shipping mechanism-without-gestalt** — every register that was minted-and-orphaned (scroll-shrink, the configurator drawer, live previews, the liquid-enter mount recipe, the FLIP runner) gets WIRED to the axis the user actually reads, the ~4000-LOC motion zoo collapses onto its genuine atoms, and the encapsulation gate stops binding by a README marker and starts binding by structure.

The through-line root cause (named by every audit): **build-then-orphan**. The BD greenfield minted "the ONE engine" as prose-as-code, wired the simpler concrete leaf, and never deleted the abstraction — and no gate caught it because gates assert source-presence + barrel-export, not "in the live import graph / reads the right axis / paints the right gestalt." WS4 is the cure: cut the dead, wire the live, re-scope the gates onto structure and paint.

Four user-visible registers must read CORRECTLY on a fresh live capture (Chrome AND Safari 26), not gate-green:

1. **D4/C-SCROLLSHRINK** — a content-page title scales `1 → ~0.82` across the first `~160px` of `<main>` scroll, condensing-and-sticking (the iOS Large-Title collapse), driven by ONE shared `@keyframes` definition that card + page + hero all consume.
2. **D6/D7** — the configurator gear opens a working panel ON-screen: the Sheet top resolves to `0` (full-height, inset-floating), the gear hit-tests to itself, the dark toggle flips global mode.
3. **D11** — `/forms` shows a REAL `<Select>` on the select card and a REAL `<Slider>` on the slider card (per-STORY specimens), ≥45% cell occupancy, ZERO `<canvas>` in the bento.
4. **C-LIQUID** — every restored register carries liquid-weight/inertia/bounce (the 12 laws), and the universal liquid-enter mount recipe is wired (not orphaned).

Plus the structural close: `proof:colocation` binds by STRUCTURE (the 3 root-composable violations fixed); every >500-line split lands its colocated leaves with gates following the composition; the dead headline engines are DEFINITION-ABSENT; ONE FLIP runner (`flipShared` consumed, ~700 LOC removed); the spring table ≤6 rows; no `selectableChipVariants` alias; ONE demo framing chassis; the de-shadcn FORM band gate-locked.

---

## 2 · MECHANISM (the idiomatic, concrete approach)

### 2.1 — Scroll-shrink: ONE `@keyframes` DEFINITION, per-surface timeline binding

The convergence bar's literal phrasing ("ONE keyframe family card+page+hero share") was FALSIFIED by the risk scan: the card register binds a NAMED `scroll-timeline: --card-scroll` on its own bounded scroll-port (`CardHeader.vue`, `base-misc.css:210`), while hero/page bind the ANONYMOUS `scroll()` over the `<main>` scroller. They cannot share one *timeline* — but they CAN, and must, share one `@keyframes` DEFINITION.

The idiom:
- Mint ONE compositor-only `@keyframes title-collapse` (the `1 → 0.82` `scale` + coupled `translateY` lift toward a pinned slim bar + coupled `opacity` settle — NEVER `font-size`/`padding`/layout; the text lays out ONCE and is composited, the BB.W-CARD-COMPOSITE discipline that already holds in `CardHeader`). Liquid-weighted ease, not linear (the spatial leg on a `--spring-*` register, the EFFECTS leg on `--ease-out`).
- Three surfaces consume the ONE definition, each binding its OWN timeline + `animation-range: 0 160px`:
  - **card** → `--card-scroll` (its bounded port; KEEP for genuinely-bounded scroll-cards),
  - **page / hero** → the EXISTING `--demo-main-progress` named timeline (`dock-nav.css:201` on `.demo-main-scroller`), reached from page content via `timeline-scope: --demo-main-progress` on a shared ancestor.
- Re-point `--card-title-shrink-ratio` and the page register onto the same end-scalar (`~0.82`); retire the disjoint duplicate keyframes (`card-title-shrink` 0.695 / `story-hero-shrink` 0.82 → ONE).

**Resolve the contradictory-directive history explicitly.** The user previously complained "hero text should NOT scroll like this on every page" and the prior fix made the content-page `<h1>` the calm `story-chrome-title` rung (38.4px → a 0.82 shrink is imperceptible) and made hero titles SCROLL-AWAY (`story-hero-scroll-away`). The resolution is the iOS distinction: content pages get **scroll-SHRINK-and-STICK** (sticky, scale `1→0.82`, condenses into a pinned slim header, NEVER translates off), starting from a meaningfully-large rung (the heading/display-1 rung, large enough that 0.82 reads — NOT the audacious mega that re-triggers the "giant on every page" defect, NOT the calm 38px rung where it's invisible). The hero scroll-away register stays for the front-door hero pages. The spec must NAME the start rung and verify on a real scrolled screenshot (smooth-scroll defeats sync `scrollTop` probes).

**Cross-engine + a11y fences:** behind `@supports (animation-timeline: scroll())` (Chrome 115+ ✅, Safari 26+ ✅, Firefox ❌ → graceful static-large fallback); the `useScrollProgress`/`scrollReader.ts` dual-path JS single-writer is the residual feature-detect-gated fallback; PRM keeps the terminal opacity, drops the transform (the universal a11y carve auto-strips `scale`/`translate` — the recipe MUST seat at endpoint). The idiom is NOT homed in `design-idioms.md` (grep returns nothing) — the unify wave homes it.

### 2.2 — Configurator drawer: ship overlay-positioning geometry as REAL CSS (the BA.W-EMISSION fence, extended)

The wiring is 100% SOUND (the `useConfiguratorOpen` singleton + `glass-ui-demo:toggle-configurator` event + Sheet `v-model:open` + the canonical `<DarkModeToggle>` on `useGlobalDark` — DO NOT touch). The defect is a positioning bug with a systemic root:

`sheetVariants` (`sheet/index.ts:33`) carries the side-keyed geometry as a Tailwind utility STRING (`inset-y-0 right-0 h-full w-3/4 border-l`). Live: the rendered element CARRIES the classes but the RULES do not exist in the loaded stylesheet (`inset-y-0:false` probed across all sheets) → `position:fixed` falls to `top:806px` (= viewport height, static body-flow) → off-fold. Root: the demo `@source` set (`demo.css:95-97`) covers `src/components/**/*.vue` + `ui/_shared/*.ts` + `custom/**/*Variants.ts` but NOT `src/components/ui/**/index.ts` — the CVA home for every ui-family. So sheet's positioning utilities never emit in the demo. (`dist/styles/components.css` DOES self-emit them via P9, but the demo dogfoods `src/styles/index.css`.) Source gates see the correct CVA string + the rendered class → GREEN; only live paint catches the off-screen drawer — the canonical headless-green archetype.

The idiomatic gestalt fix is NOT a demo `@source` patch (that fixes only the demo; a real consumer scanning only their own `src/` hits the same class). Per BA.W-EMISSION ("structural arbitrary utilities NEVER silently die — ship the geometry as real CSS, not a content-scan-reachable utility string"), the overlay-positioning band (sheet/dialog/drawer/popover side-keyed `inset`/`size`) moves into a SHIPPED `@layer components` recipe keyed `[data-slot]` + `data-side`:

```css
/* src/styles/sheet.css — @layer components, in /styles cascade */
[data-slot="sheet-content"][data-side="right"]  { inset-block: 0; inset-inline-end: 0; block-size: 100%; inline-size: 75%; max-inline-size: 24rem; }
[data-slot="sheet-content"][data-side="left"]   { inset-block: 0; inset-inline-start: 0; block-size: 100%; inline-size: 75%; max-inline-size: 24rem; }
[data-slot="sheet-content"][data-side="top"]    { inset-inline: 0; inset-block-start: 0; }
[data-slot="sheet-content"][data-side="bottom"] { inset-inline: 0; inset-block-end: 0; }
```

`SheetContent.vue` binds `:data-side` + `data-slot`; the `inset-y-0`/`right-0`/`h-full`/`w-3/4` literals are DELETED from the CVA (clean break — the CVA keeps only the side-keyed `border-*` + slide-direction animation utilities, which DO emit). The audit mirrors onto `DialogContent` centering. This ships in `/styles` → fixes the demo AND every consumer in one move. The HIG nuance: at the partial detent the sheet floats inset with concentric corners; only the full detent attaches `top:0` opaque — for the configurator inspector the right-edge full-height panel resolves `inset-block: 0` (the convergence bar's "Sheet top resolves to 0"). Thread `surface="glass|veil|opaque"` + the W55 tint — never a per-instance `bg` fork (HIG: don't customize the sheet background).

**The gear hit-test half is WS2** (SidebarDock parks the gear in an inert/`pointer-events:none` layer until ~400ms hover-dwell AND over-fills its capped `contain` box so `elementFromPoint` returns the `<aside>`). WS4 owns the Sheet inset-root; WS2's dock-IA delivers the gear-reach. The "gear hit-tests to itself" acceptance predicate requires WS2 landed — co-land, flagged.

Extend `proof:emission` with an overlay-band clause: NO overlay-band on-screen positioning (`inset-*`/`top`/`right`/`bottom`/`left`/`h-full`/`w-*`) may live in a content-scan-reachable CVA utility string for `ui/{sheet,dialog,drawer,popover}`. Born-RED on HEAD (`inset-y-0` in the sheet CVA).

### 2.3 — Live previews: per-STORY specimen registry + ONE dispatcher

The live-specimen system EXISTS (`SectionLanding.vue:124-198` dispatches a real `<Button>`/`<Slider>`/`<Switch>`/`<MetricBadge>`/field-still per card) but is keyed at the WRONG ALTITUDE: `categorySpecimen(category.id)` reads ONE `previewKind` per CATEGORY (`category-hero.ts`), so all 12 `/forms` cards show the IDENTICAL `control` stack (the select card shows a slider, the label card shows a slider). Each story already knows its identity (the `SUBPATHS` map, `manifest.ts:204`).

The idiom:
- Mint `demo/stories/specimen-registry.ts` keyed by the SAME `cat/id` the `SUBPATHS` map uses (`forms/select → <Select>`, `forms/slider → <Slider>`, `forms/switch → <Switch>`, …), with a per-category fallback for un-registered stories (incremental, never a regression).
- Mint ONE `demo/stories/StorySpecimen.vue` dispatcher composing the REAL shipped primitive, bounded + `inert` + `pointer-events:none` + cqmin-scaled (the existing `SectionPreviewCard` `pointer-events:none + inert + scale-clamp` discipline, KEEP).
- Clean-break DELETE `previewKind` / `categorySpecimen` / `SpecimenSpec` from `category-hero.ts` (keep only `{icon, sectionHue, heroPalette, bgKind}`).
- Wire the TWO front-door forks onto the dispatcher: `intro.vue:105 .intro-cat-thumb` (a 34px glyph in a 7rem void) + `compositions/hero.vue .composition-scene-thumb` — DELETE both glyph forks.

**The budget definition (the load-bearing tension):** "real component per card × 49 cards × no canvas" is contradictory for heavy categories. The specimen is the REAL interactive control for CHEAP categories (forms/display — a `<Select>` portal, a `<Slider>` are cheap); for HEAVY categories (substrates/dock/motion/viz) it is a STATIC poster/frozen-still (the existing device-free `auroraFallbackGround` data-URI). ZERO `<canvas>` in the bento is ABSOLUTE — the one-GL-context-per-route budget means a live-GL target's preview is a single-paint still, and the landing mounts ≤1 live context. Keep the `SectionPreviewCard` √φ window chassis (`aspect-ratio: var(--phi)`, `container-type: size`, ≥45% occupancy — aristotelian proportion already met). New gate `proof:bento-specimen`: ≥2 DISTINCT kinds per multi-story category (the "12 identical sliders" bite), the specimen key-set ⊆ the route-set, no surviving inline `#preview` body, zero `<canvas>` in the landing DOM.

### 2.4 — The motion-layer collapse (~4000 LOC → atoms)

The genuine atoms already exist and stay: `useLiquidFlex` (≥6 consumers — the real shared squish), the `MORPH_SIGNATURES` weld DATA table, `scrollReader.ts` (the shared scroll-read core), `useGooMorph` (live: Carousel/Pager/deck). The dead + duplicated:

**Dead → DEFINITION-ABSENT (clean break, no alias, no deprecation):**
- `useLiquidMorph.ts` (462L) — only ref is prose in `manifest.ts:883`.
- `useVizChoreography.ts` (424L) — ZERO refs anywhere.
- `useDockContextSilhouette.ts` (551L) — verified: AppSwitcher.vue actually composes `useBloomUp` (the silhouette is a comment only); only consumer is its own test. **No re-home needed.** (Dock-dir file → COORDINATE with WS2; WS4's gate verifies absence, the deletion lands in whichever WS reaches it first.)
- `morph-field.css` (229L, orphaned weld CSS) — verify no live `.morph-*` consumer, then DELETE + its `@import`.

**`useMorphField` — gut the function, keep the data:** the `useMorphField()` FUNCTION (468L file, body L272-468) has ZERO call sites but is EXPORTED on the ROOT barrel (`src/index.ts:241`) AND its `MORPH_SIGNATURES` const is consumed by `useGooMorph.ts:43` + `useDockFission.ts:61`. Carve `MORPH_SIGNATURES` + the `Morph*` types into `src/composables/motion/morphSignatures.ts` (a pure data/types leaf); delete the dead runner; re-point the two consumers + `core/index.ts`; remove `useMorphField` (the function) from the root barrel — a clean-break public-surface removal (record the MIGRATION row). KEEP `MORPH_SIGNATURES` on the public surface (live consumers).

**BG.W-FLIP-ONE — ONE FLIP runner over the ignored `flipShared`:** `useLiquidReveal` (285L, 1× `new ElementMorph`), `useBloomUp` (507L, 2×), `useDockCtaReceive` (349L, 1×) each hand-roll the IDENTICAL `ElementMorph` + `springTimingFunction` rAF play-loop + PRM-snap + 3-channel (scale/opacity/blur) write — differing ONLY in direction (`1→0` reveal / `0→1` receive / `1→0` bloom) + `useBloomUp`'s 4th color channel + `useDockCtaReceive`'s `onReceived` handoff. The published kf `flipShared` is imported (`suite.ts:42`) but NEVER called. Mint ONE `useFlip(source, dest, { direction, channels, onSettle })` that owns the rAF loop + spring sample + coupled channels (incl. optional 4th color + the handoff callback); the three become thin direction/channel presets (or the two near-demo-only ones — reveal/cta — become direct `useFlip` calls). ~700 LOC removed, `flipShared` finally CONSUMED. **Fence:** `useDragMorph` is NOT in this trio (it's the Draggable+`decayRest` gesture path, LIVE via `useTabDragMorph`/dock-shell — out of scope). The dock-weld morph-engine re-point (`BG.W-MORPH-ENGINE-ONE` proper) is WS2's box-INVIOLATE scope — NOT WS4.

**BG.W-PRESS-MOUNT-RECONCILE:** `useLiquidPress` has 1 real consumer (Card.vue — fails ≥2); `useSpringMount` (DialogContent/SheetContent) overlaps `useLiquidReveal`'s bloom enter (Dialog has TWO enter mechanisms: `.glass-reveal` CSS + `useSpringMount` JS). Retire the bloom-enter onto the shared `useFlip` runner so Dialog/Sheet have ONE enter (keep `useSpringMount`'s drag-dismiss); land `useLiquidPress`'s 2nd binary consumer or fold it onto `useSpringPress` directly.

**BG.W-SPRING-REGISTER-TIDY (9 → ≤6):** `SPRING_PRESETS` has 9 rows; the 3 `timeline-{head,fill,press}` rows serve ONE consumer (`ScrubberTimeline.vue`) and mint 3 dead `--spring-timeline-*` CSS twins read by nothing. Drain them via the canon's OWN `motion-canon.md` P7 `SPRING_DEFAULTS_ALLOWLIST` (per-component register — do NOT invent a mechanism): re-point to `snappy`/`press` where within tolerance, else move to ScrubberTimeline-local constants. Regen tokens (`regen-spring-tokens.mjs` + `proof:spring-tokens-synced` stay green — the `(response,ζ)` table is the single source for both `--spring-*` and `--spring-*-duration`). KEEP `gentle` ζ=1.0 byte-frozen (`--ease-convergence` depends on overshoot==0). Fix the 3 stale `(response,ζ)` doc comments (`scheme-spring.css:26-31`, `useSpringPress.ts:489`, `useDragMorph.ts:345` — they recite pre-BD values; live: smooth 0.58/0.8, snappy 0.48/0.74, dock 0.68/0.64, press 0.2/0.8).

**BG.W-SCROLL-READER-UNIFY:** fold the lone outlier `useScrollProgress` (hand-rolls its own rAF + scroll-listener + RO) onto the shared `scrollReader.ts` core.

**BG.W-LIQUID-ENTRANCE-GENERAL — WIRE the dead recipe (OVERRIDE A-deadcode's delete):** `liquid-enter.css` (252L, @imported by `glass.css`) is zero-wired but well-built; its own header names the mount surfaces it's FOR (cards/rows/controls/dock-modules/demo sub-sections). The C-LIQUID chronic (★★★★ "liquid weight universal, remember this always") + the candidate-wave name point to WIRE, not delete. Wire `.liquid-enter` onto its named mount surfaces on the `--i` `1/φ` stagger clock, completing the universal-entrance family. **Binding fence:** this recipe must NOT add a 2nd `animation:` shorthand to `.scroll-build > *` (it would clobber `gl-page-build` — the routing-freeze seam); PRM-carved (fade-keeps/transform-drops); `linear()` spring curves get the `@supports not(animation-timing-function: linear(0,1))` fallback (pre-Safari 17.2). The entrance system is ONE fragmented family across THREE registers — MOUNT (`.liquid-enter`) / SCROLL (`.scroll-build`+`.scroll-cascade`) / TRIGGER (`useFlip`) — that BG.W-LIQUID-ENTRANCE-GENERAL + BG.W-SCROLL-SHRINK-UNIFY + BG.W-FLIP-ONE collectively unify.

### 2.5 — Encapsulation: bind colocation by STRUCTURE; carve the >500 leaves

`proof-colocation.mjs:62` enrolls dirs by `existsSync(README.md)` — the README-as-enrollment-MARKER. Its own §0 records this was a DELIBERATE choice to avoid over-pulling `infinite-scroll`/`search`/`typewriter` (composables/-bearing, README-absent). But that's exactly backwards for the brief: those ARE complex dirs owed the contract, and the README-marker also lets 3 ROOT-COMPOSABLE violations escape entirely.

Re-derive `TARGET_DIRS` by STRUCTURE: a `custom/` dir is complex iff it has a `composables/` subdir OR ≥1 root-level composable/context module OR ≥N source files — KEEPING README as a clause-(d) REQUIREMENT (a flagged dir must ADD a README), not the enrollment key. This (a) forces `infinite-scroll`/`search`/`typewriter` to adopt the convention (add README + constants.ts — the right outcome), and (b) catches the 3 verified root-composable violations: `configurator/{useConfiguratorState.ts, density.ts}`, `watercolor-dot/useWatercolorBlob.ts`, `sortable-list/context.ts`. Move each under `composables/` + re-point the package `index.ts` imports (clean break). **Subpath fence:** moving `useConfiguratorState.ts` does NOT break the published `@mkbabb/glass-ui/configurator` surface IF the package barrel re-exports it (the symbol is unchanged, only the internal import path moves) — but run `verify-export-types` after. **Regex edge:** `density.ts`/`context.ts` are lowercase and evade `isComposable` (`/^use[A-Z]|Context\.ts$/`) — widen the structural predicate to detect root DI/context modules (or rename to a `*Context.ts` form). Self-test bite: a synthetic complex dir with a root composable + no README must RED. Widen the scan to REACH the shared `src/composables/{motion,glass,...}` subtrees where the dead-engine zoo lives (currently wholly outside the gate's walk).

**The >500-line carves (WS4-owned subset — colocated leaves, gates FOLLOW the composition into the leaf, the `proof:webgl-substrate-single` precedent):**
- **createCanvasLifecycle.ts (695)** → 3 self-contained seams: `sizeBacking` (L37-123), the context-loss circuit-breaker, the IO/CV park observers. (`proof:offscreen-pause`/`proof:webgl-substrate-single` follow.)
- **useWebGPUCanvas.ts (606)** → the async device-acquisition / `device.lost` self-heal / configure leaves.
- **useGlassBackdropLuminance.ts (542)** → `ambientHueHistogram.ts` + `wcagLuminance.ts` (BG.W-AMBIENT-HISTOGRAM-LEAF).
- **SegmentedTabs.vue (512)** → `composables/useTabRovingFocus.ts` (the roving-tabindex keyboard machine, L289-432) + `composables/useTabResponsive.ts` (the siblings of the 2 existing tab composables; BG.W-TABS-KEYBOARD-LEAF). The roving-tabindex contract is NOT gated on `:draggable` (every strip) — `proof:control-tokens`/`proof:aria-orientation` follow.
- **CarouselContent.vue (577) ≡ PagerDots.vue (509)** — byte-congruent goo-barbell scoped CSS (218 ≡ 193 lines). Externalize to `src/styles/motion/goo-barbell.css` (the `segmented-tabs.css` externalization precedent never back-applied) — both SFCs drop <400 (BG.W-GOO-BARBELL-CSS).
- **timeline/ dir** (9 flat files, ~1300L inline CSS, NO composables/, NO constants.ts, NO README) → carve into the colocated sub-dir contract (composables/ + constants.ts + README + `src/styles/timeline.css` shared rail/marker/segment partial; BG.W-TIMELINE-ENCAPSULATE). `ContinuousMarkers.vue` (444) + `ScrubberTimeline.vue` (405) are the heavy SFCs.
- **Slider.vue** + other heavy-inline-CSS SFCs → externalize the recessed-track recipe to `styles/slider.css` (BG.W-SFC-CSS-PARTIAL-SWEEP); KEEP `[data-size]` arbitrary-bracket geometry inline (the BA.W-EMISSION structural-precompile rule).

**NO-SPLIT floor (recorded — do not contrive a split):** `useBloomUp.ts` (507, cohesive single FLIP composable — header-trim only, folds further via BG.W-FLIP-ONE), `api/index.ts` (505, barrel by public width). **GL byte-fence (ABSOLUTE no-split):** `metaball.wgsl.ts` (529), `metaball.frag.ts` (510), `flow-field.glsl.ts` (517), `mediums.glsl.ts` (495). **Out of WS4 scope:** `GlassDock.vue` (711), `useDockFission.ts` (604) → WS2; `useBlobSatellites.ts` (533), `useGooDotMatrix.ts` (508) → WS5.

### 2.6 — No-legacy sweep + demo-shell DRY

- **BG.W-CHIP-ALIAS-KILL:** `selectableChipVariants.ts` is a pure `export { chipVariants as selectableChipVariants }` alias (the renaming shim the no-legacy law forbids). Delete the alias file; export `chipVariants`/`ChipVariants` under ONE canonical name from `selectable-chip/index.ts`; re-point `SelectableChip.vue:28` + `toggle-chip/index.ts:3`. **API break:** the type `SelectableChipVariants` is PUBLISHED on `@mkbabb/glass-ui/api:242` — bundle the api re-point (`ChipVariants`) + a MIGRATION row + re-run `verify-export-types`/`subpath-enumeration`.
- **BG.W-DEAD-TOKEN-SWEEP (careful — the gate IS the legacy):** `--corner-k-soft`/`--corner-k-sharp` (`theme/radius.css:91-92`) are unread superellipse k-rungs pinned ALIVE ONLY by `proof:squircle-language`'s mint-assert; `--corner-shape-card`/`--corner-shape-pill` resolve `round` (no-ops). Cut all four; drop the mint-assert clauses that pin them; RE-EXPRESS the load-bearing "cards stay round" policy via the gate's EXISTING negative guard (`glass.css` carries no `corner-shape` on `.glass-card`/`.glass-btn`) so the policy is PRESERVED, not weakened. KEEP the big-dock squircle `@supports`-gated policy intact. (`--panel-padding-roomy`/`--mask-fade-width`/`--card-spacing` already deleted — comments only.)
- **BG.W-DEMO-CHASSIS-CONSOLIDATE:** DELETE `DemoFrame.vue` + `demo-frame.css` (zero importers — only `StoryPage.vue` comments) + `StorySectionHeader.vue` (zero importers). Collapse to ONE framing chassis (`ShowcaseFrame`, 79 uses); fold the ~28-44 raw `rounded-card border bg-card shadow-cartoon` triplet sites onto it; strip the dead DemoFrame/story-cel narrative comments from `StoryPage`. Move `liquid-morph.css` (850, demo-only) out of `src/styles/` to `demo/` (the placement violation).
- **BG.W-MANIFEST-COLOCATE:** fold `manifest.ts`'s 4 parallel string-keyed maps (`CATEGORY_DEFAULT_BG:181`, `SUBPATHS:204`, `LANDING_SUBPATHS:337`, `LANDING_BLURBS:352`) onto the `s()` row (a row = a page); de-duplicate `StoryHero.vue`'s twice-rendered cluster block (fullBleed L350-372 ≡ Card L408-430) via a normalized mode. (`manifest.ts` itself stays — a row-per-page is defensible; only the parallel-map sprawl folds.)

### 2.7 — De-shadcn FORM gate (the WS4/WS10 boundary)

**Correct the brief's archaeology error:** `proof:no-shadcn-default` (BC.W-DESHADCN) EXISTS, is registered, and is FULLY GREEN at HEAD (233 ui/ files, zero residual neutral tokens, the 42-dir census closed). The TOKEN/vocabulary axis is DONE — DO NOT re-mint it. The genuinely-unbuilt arm is a DECIDABLE PER-CONTROL FORM gate (`proof:de-shadcn`) that goes beyond the token census.

`proof:de-shadcn` (WS4-owned, the gate-lock the convergence bar names): a DECIDABLE predicate over the FORM family (Input/Textarea/Select/Checkbox/Switch/Slider/RadioGroup/NumberField/Combobox/TagsInput) asserting each control derives ALL six states (rest/hover/focus/active/invalid/disabled) from glass-ui tokens (`--control-surface-*`, `--glass-*`, `--focus-ring-shadow`, `--invalid-ring`) with a NAMED DENYLIST of shadcn-default recipes/classes — NOT "abrogate all" (the `data-[state]`/`slide-in-from`/`animate-in` grammar is glass-ui-INTENTIONAL liquid-reveal, fenced OUT). Clear the residual-token survivors named by the forensics. reka-ui stays the headless LOGIC substrate (ARIA/keyboard/focus); glass-ui owns 100% of the paint. Verify reka bindings survive (stale `:pressed`/`v-model:search-term` silently no-op — paint/e2e catch them, vue-tsc misses them).

**WS10 boundary (task #48 "De-shadcn / idiomatic Tailwind v4" is a dedicated workstream):** WS4 builds the GATE + sweeps residuals onto the glass/control-surface register. WS10 owns the DEEP from-first-principles control MATERIAL re-authoring (the continuous-cylinder slider — already done; the capsule switch; the grouped-inset-list Select with checkmark gutter; iOS-26 `controlSize` tiers + vibrant-text-on-glass + `.interactive` press). The orchestrator MUST assign ownership so the work isn't double-built — flagged as the #1 cross-WS coordination item. (If WS10 is sequenced AFTER WS4's close, WS4's gate is born-RED-with-allowlist and WS10 turns it fully green.)

---

## 3 · FILES TOUCHED (by cluster)

**Cluster 1 — restore the dead registers:**
- `src/styles/sheet.css` (NEW), `src/components/ui/sheet/index.ts`, `SheetContent.vue`, `src/components/ui/dialog/DialogContent.vue` (mirror), `scripts/proof-emission.mjs` (overlay-band clause).
- `src/styles/scroll-choreography.css` / `demo/stories/story-hero.css` / `src/components/ui/card/CardHeader.vue` (ONE `@keyframes title-collapse`), `demo/layout/AppShell.vue` (`timeline-scope`), `StoryPage.vue`, `docs/precepts/design-idioms.md` (home the idiom).
- `demo/stories/specimen-registry.ts` (NEW), `demo/stories/StorySpecimen.vue` (NEW), `SectionLanding.vue`, `demo/stories/category-hero.ts` (cut previewKind/categorySpecimen), `foundations/intro.vue`, `compositions/hero.vue`, `scripts/proof-bento-specimen.mjs` (NEW gate).

**Cluster 2 — motion collapse:**
- DELETE `useLiquidMorph.ts`, `useVizChoreography.ts`, `useDockContextSilhouette.ts` (+ its test, WS2-coord), `morph-field.css`.
- `morphSignatures.ts` (NEW data leaf), `useMorphField.ts` (delete function), `useGooMorph.ts`, `useDockFission.ts`, `core/index.ts`, `src/index.ts` (barrel re-point + remove `useMorphField`).
- `useFlip.ts` (NEW over `flipShared`), `useLiquidReveal.ts`, `useBloomUp.ts`, `useDockCtaReceive.ts`, `suite.ts`.
- `useSpringMount`/`useLiquidPress` reconcile; `springPresets.ts`, `scheme-spring.css`, `regen-spring-tokens.mjs`, `ScrubberTimeline.vue`; `useScrollProgress.ts` → `scrollReader.ts`.
- `src/styles/glass/liquid-enter.css` (WIRE) + its mount-surface SFCs.

**Cluster 3 — encapsulation:**
- `scripts/proof-colocation.mjs` (structural derive); move `configurator/{useConfiguratorState,density}.ts`, `watercolor-dot/useWatercolorBlob.ts`, `sortable-list/context.ts` → `composables/` + index re-points + 5 new READMEs.
- carve leaves: `createCanvasLifecycle.ts`, `useWebGPUCanvas.ts`, `useGlassBackdropLuminance.ts`, `SegmentedTabs.vue`; `src/styles/motion/goo-barbell.css` (NEW, Carousel+Pager), `src/styles/timeline.css` (NEW) + timeline/ colocation, `src/styles/slider.css` (NEW).

**Cluster 4-6 — no-legacy / demo / de-shadcn:**
- DELETE `selectableChipVariants.ts`, `DemoFrame.vue`+`demo-frame.css`, `StorySectionHeader.vue`; `src/api/index.ts` (ChipVariants re-point), `MIGRATION.md`.
- `radius.css` (dead-token cut), `proof-squircle-language.mjs` (re-point clauses).
- `manifest.ts` (map fold), `StoryHero.vue` (de-dup).
- `scripts/proof-de-shadcn.mjs` (NEW) + form-control residual clears.

---

## 4 · BG.W-* WAVE BREAKDOWN

**Restore (D4/D6/D7/D11):**
- **BG.W-SCROLL-SHRINK-UNIFY** — ONE `@keyframes title-collapse` definition, card/page/hero each bind own timeline; content-page title scroll-shrink-and-stick (start rung named, hero scroll-away kept). HARD-dep WS1. Homes the idiom in design-idioms.md.
- **BG.W-SHEET-INSET-ROOT** — overlay-positioning geometry → shipped `[data-slot]+data-side` `@layer components` recipe; delete `inset-y-0` from CVA; extend `proof:emission`. Mirror DialogContent. (Co-land WS2 gear-reach for the full "drawer works" bar.)
- **BG.W-SPECIMEN-PER-STORY** — per-story registry + `<StorySpecimen>` dispatcher; real Select/Slider per card; heavy=frozen still; `proof:bento-specimen`.
- **BG.W-BENTO-FRONTDOOR-UNFORK** — wire intro.vue + compositions/hero.vue onto the dispatcher; delete the 2 glyph forks.

**Motion collapse:**
- **BG.W-DEAD-COMPOSABLE-CUT** — useLiquidMorph + useVizChoreography (+ useDockContextSilhouette, WS2-coord) DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts`; delete `morph-field.css`; barrel re-point.
- **BG.W-FLIP-ONE** — ONE `useFlip` over `flipShared`; collapse the reveal/bloom/cta trio (~700 LOC).
- **BG.W-PRESS-MOUNT-RECONCILE** — useSpringMount bloom-enter onto the shared runner (ONE Dialog/Sheet enter); useLiquidPress 2nd-consumer-or-fold.
- **BG.W-SPRING-REGISTER-TIDY** — 9→≤6 via motion-canon P7; fix 3 stale doc comments; drop dead `--spring-timeline-*` twins.
- **BG.W-SCROLL-READER-UNIFY** — fold useScrollProgress onto scrollReader.ts.
- **BG.W-LIQUID-ENTRANCE-GENERAL** — WIRE liquid-enter.css onto its named mount surfaces (the universal-laws fulfillment; OVERRIDE A-deadcode's delete).

**Encapsulation:**
- **BG.W-COLOCATION-GATE-STRUCTURAL** — bind by structure + reach root subtrees; fix the 3 root-composable violations + self-test bite.
- **BG.W-CANVAS-LIFECYCLE-LEAVES** — carve createCanvasLifecycle + useWebGPUCanvas.
- **BG.W-AMBIENT-HISTOGRAM-LEAF** — carve useGlassBackdropLuminance → ambientHueHistogram + wcagLuminance.
- **BG.W-TABS-KEYBOARD-LEAF** — carve SegmentedTabs → useTabRovingFocus + useTabResponsive.
- **BG.W-GOO-BARBELL-CSS** — styles/motion/goo-barbell.css shared by Carousel≡Pager.
- **BG.W-TIMELINE-ENCAPSULATE** — timeline/ into the colocation contract + styles/timeline.css.
- **BG.W-SFC-CSS-PARTIAL-SWEEP** — Slider recessed-track + heavy-CSS SFC partials.

**No-legacy + demo:**
- **BG.W-CHIP-ALIAS-KILL** — delete the alias + api re-point + MIGRATION.
- **BG.W-DEAD-TOKEN-SWEEP** — cut --corner-k-*/--corner-shape-card/-pill; re-point proof:squircle-language onto the negative guard.
- **BG.W-DEMO-CHASSIS-CONSOLIDATE** — delete DemoFrame/StorySectionHeader; fold raw triplets onto ShowcaseFrame; move liquid-morph.css to demo/.
- **BG.W-MANIFEST-COLOCATE** — fold the 4 string-keyed maps onto the s() row; de-dup StoryHero cluster.

**De-shadcn:**
- **BG.W-DESHADCN-SWEEP** — `proof:de-shadcn` decidable per-control FORM gate + residual clear (WS10 boundary flagged).

**Cross-cutting law (binds every wave above, not its own wave):** BG.W-12-LAWS-UNIVERSAL — liquid-weight/inertia/bounce on ALL restored motion (the spatial leg on a `--spring-*` register, enter-bouncy/exit-no-overshoot, arcs/overlap/follow-through where the gesture warrants); iOS-27 clean-glass register (kill the brown/metallic wash + red-maroon cast on the restored surfaces — coordinate WS3); cartoon-technicolor punch; √φ proportion (already met by SectionPreviewCard — keep).

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR

Every visual wave closes against the `proof:ba-gestalt` VERDICT (capture-paths-resolve-on-disk floor) on a FRESH live capture by a reproduction the building agent did NOT author — NOT the per-mechanism source-green (the headless-green/visually-broken trap shipped 3×; live-π is `[local]` and does NOT block the tag — that's the structural root). Chrome AND Safari 26.

- **Scroll-shrink:** on a content page, scroll `<main>` ~160px → the title's computed `transform` resolves `scale(~0.82)` + a translateY toward a pinned slim bar (read on a REAL scrolled screenshot, not a sync `scrollTop` probe — smooth-scroll defeats it); CLS≈0 (`proof:no-layout-animation` green, static frame-0 reserve); ONE `@keyframes` definition shared (gate-asserted); PRM keeps terminal opacity / drops transform; Firefox static fallback paints.
- **Configurator drawer:** dispatch `glass-ui-demo:toggle-configurator` → SheetContent computed `top === 0` + `onScreen === true` (LIVE rect read, NOT a CVA source check); `elementFromPoint(gear-center) === gear` (requires WS2 landed); `<DarkModeToggle>` click flips `useGlobalDark` (whole-app). Born-RED on HEAD (panel at top:806px).
- **Live previews:** `/forms` landing → a real `<Select>` on the select card + a real `<Slider>` on the slider card (DISTINCT specimens), ≥2 distinct kinds across the category, ≥45% cell occupancy, `canvasCount === 0` in the landing DOM, GL-context-count ≤ budget, FCP within the lighthouse floor.
- **Motion collapse:** `useLiquidMorph`/`useVizChoreography`/`useDockContextSilhouette` DEFINITION-ABSENT (grep + barrel-absent); `flipShared` CONSUMED (`useFlip` imports + calls it); ~700 LOC removed (line-delta recorded); `tests-visual/liquid-reveal.spec.ts` + `dockmorph-cta.spec.ts` stay green over `useFlip`; spring table ≤6 rows + `proof:spring-tokens-synced` green; liquid-enter wired (a mount surface resolves the `--i` stagger, paint-captured).
- **Encapsulation:** `proof:colocation` binds by structure, REDs a synthetic root-composable+no-README dir, GREENs after the 3 moves; `verify-export-types`/`subpath-enumeration` green post-move; every carved leaf <500L with the reader gates (`proof:webgl-substrate-single`/`offscreen-pause`/`control-tokens`) following the composition; goo-barbell/timeline/slider CSS externalized + both SFCs <500.
- **No-legacy + demo:** `selectableChipVariants` DEFINITION-ABSENT + api re-pointed; dead corner tokens gone + the round-policy preserved via the negative guard; `DemoFrame`/`StorySectionHeader` DEFINITION-ABSENT; ONE framing chassis.
- **De-shadcn:** `proof:de-shadcn` exists + the FORM family passes the per-control six-state-from-tokens predicate + the residual survivors cleared; the liquid-reveal grammar fenced OUT (not a false positive).

---

## 6 · FOLDED / DEFERRED ITEMS

- **useDockContextSilhouette deletion** — dock-dir; OWNED by WS2 (A-dock-arch). WS4 verifies absence; if WS2 doesn't reach it, BG.W-DEAD-COMPOSABLE-CUT absorbs it (no re-home needed — AppSwitcher already uses useBloomUp).
- **BG.W-MORPH-ENGINE-ONE (dock-weld re-point)** — re-pointing the box-INVIOLATE dock V↔H morph onto the weld's arcs/overlap is WS2's scope. WS4 only carves the `MORPH_SIGNATURES` data leaf the dock consumes.
- **BG.W-VIZ-STUDIO-ADOPT** — re-homing blob.vue (870)/constellation.vue (759)/fourier-field.vue (490) onto VizStudio is WS5's viz scope; WS4's demo-chassis work is the framing-chassis + manifest + dead-DemoFrame cut only.
- **BG.W-UNIFORM-LAYOUT-BUILDER** — the 9× `uniformBridgeWGPU` std140 packing → `defineUniformLayout(fields)` is a real DRY win but edits 9 viz dirs WS5 is actively converging; DEFER to a coordinated WS4/WS5 follow, not a WS4 close bar.
- **WS4-owned >500 carves NOT in scope:** GlassDock.vue/useDockFission.ts → WS2; useBlobSatellites.ts/useGooDotMatrix.ts → WS5.
- **The deep de-shadcn control MATERIAL rebuild** (capsule switch / grouped-inset Select / controlSize tiers) → WS10. WS4 ships the GATE + residual clear only.
- **Top-bar scroll-progress rail** (`scroll(--demo-main-progress block)` invalid-CSS → full-width bar) → WS1's BG.W-SCROLL-PROGRESS-RAIL; WS4's scroll-shrink ADOPTS the same named-timeline binding strategy.

---

## 7 · OPEN RISKS

1. **Scroll-shrink is the deepest design call.** "ONE keyframe family" is timeline-falsified (card named vs page anonymous) → re-scoped to ONE `@keyframes` DEFINITION + per-surface timeline. The contradictory-directive history (giant-on-every-page vs invisible-calm-rung) forces an explicit START-RUNG decision (shrink-and-stick from the heading rung, NOT mega, NOT 38px). Falsifiable only on a real scrolled screenshot — and HARD-depends on WS1 routing landing first (a frozen page never settles the timeline). → PROTOTYPE (spec/design-prove the resolution).
2. **The configurator drawer is the canonical headless-green archetype.** Source gates see the right CVA string; only live paint catches top:806px. The shipped-CSS-recipe fix must be LIVE-verified (computed top===0). → PROTOTYPE (implement, build-and-paint-prove).
3. **FLIP-ONE's ~700-LOC bar is unproven.** `flipShared` subsuming reveal (blur-settle 1→0) + cta-receive (opacity-congest 0→1 + onReceived handoff) is asserted, not shown. If flipShared can't carry the handoff/color channels, the wave re-scopes to deduping shared ElementMorph/SpringProgress plumbing only. → PROTOTYPE (implement, prove the fold).
4. **The colocation structural predicate over/under-pulls.** A naive "has composables/" enrolls infinite-scroll/search/typewriter (RED on the constants/README clauses); lowercase density.ts/context.ts evade the regex; moving useConfiguratorState.ts touches the /configurator subpath. → PROTOTYPE (implement, prove the predicate + the 3 fixes + the self-test bite + export-types).
5. **Specimen-per-story budget tension.** Real components × N cards × zero-canvas is contradictory for heavy categories — the spec splits cheap=real / heavy=frozen-still, but the forms-real-component path must be measured (portal count, FCP, GL contexts). → PROTOTYPE (implement, forms landing real Select+Slider + budget read).
6. **De-shadcn is unbounded without a decidable predicate.** "Abrogate all" is unfalsifiable, and the data-[state] grammar is glass-ui-intentional (abrogating it breaks liquid-reveal). The gate needs a NAMED denylist + per-control state-from-tokens assert, and the WS4/WS10 ownership split must be explicit. → PROTOTYPE (spec/design-prove the predicate + the boundary).
7. **Safari second-engine.** All live verification here is Chrome; scroll-driven/`mask-composite`/`backdrop-filter:url()` are the Chrome-green/Safari-broken seam. Every visual wave needs a Safari 26 capture or it re-enters the trap on a second engine — surface to the orchestrator if no Safari is available to the build loop.
8. **Spring/chip/dead-token churn:** `gentle` ζ=1.0 byte-frozen; `selectableChipVariants` is a public /api type break (bundle the re-point); cutting `--corner-shape-card/-pill` must preserve the round-policy via the negative guard, not weaken it.
