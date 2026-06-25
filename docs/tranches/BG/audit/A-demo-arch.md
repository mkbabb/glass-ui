# BG audit — A-demo-arch: the demo storybook KISS/DRY/encapsulation forensic

Scope: `demo/` (194 files, ~36.8k LOC). The manifest registry, the routing shell,
the chassis primitives, the >400-line stories, story encapsulation + grouping, and
whether the demo DOGFOODS the library. Verified against HEAD source.

---

## FINDINGS (what is actually true at HEAD)

### F1 — The routing freeze is a chassis-CSS / Transition collision (linchpin, confirmed at the source)

The routed page root carries BOTH a CSS `animation` and a Vue `<Transition>`:

- `demo/stories/StoryPage.vue:72` — `<article class="scroll-build story-page-article …">`
- `demo/stories/SectionLanding.vue:85` — `<article class="scroll-build …">`
- These articles are the direct child of `AppShell.vue:405` `<Transition name="fade-slide">`.
- `.scroll-build > *` applies `animation: gl-page-build …` (`src/styles/scroll-choreography.css:124`)
  and `.fade-slide-enter-active`/`-leave-active` apply a `transition` (`src/styles/transitions.css:23-28`).

Vue's `<Transition>` auto-detects its type by sniffing `animationDuration`/`transitionDuration`
on the transitioning element (`getTransitionInfo`). When an `animation` is present that is NOT
the transition's own (here the child `.scroll-build` build animation read through the article),
the leave's `done` callback can wait on an `animationend`/`transitionend` that never fires →
**the leave hook never resolves → old + new page coexist** (the orchestrator's observed
`<main>` childCount 2→3). This is defect #1 + #9 at the root: the page-build entrance system
and the route transition are two motion layers fighting over the same element.

Compounded in `AppShell.vue` by THREE contrivances stacked on the same seam:
- The `useBloomUp` "find first non-skeleton child" hack (`AppShell.vue:279-303`): a `watch` on
  `route.fullPath` walks `mainEl.children`, picks the element that is NOT the leaving skeleton,
  and manually fires a bloom — a JS reach into the DOM to compensate for the transition layer
  not handing it the entering element cleanly.
- TWO no-op `startViewTransition` watchers: the category-switch crossfade
  (`AppShell.vue:212-228`, body is an explicitly "intentional no-op write") and the morph
  (`AppShell.vue:127-136`). Each wraps a reactive DOM mutation Vue already drives.
- A 3-branch `<Transition>` (`AppShell.vue:404-475`): resolved Component, a matched-but-pending
  `section-landing-skeleton`, and a no-match `<Card>`. Three branches inside one `<Transition>`
  multiply the transition-type ambiguity.

### F2 — `DemoFrame.vue` + its CSS half are DEAD SUBSTRATE (the "box-model inversion" was specced, never wired)

`demo/stories/_chassis/DemoFrame.vue` (114 lines) + `demo/stories/_chassis/demo-frame.css` describe
an elaborate "ONE demo sub-type chassis, FIVE variants (stage/specimen/interaction/matrix/
composition), CONFORMITY BY CONSTRUCTION" architecture. **It has ZERO importers** — verified:
`grep -rn "import.*DemoFrame"` across all `.vue`/`.ts` returns nothing; the only `<DemoFrame`
matches are inside `StoryPage.vue` *comments* (L102, L149) and `DemoFrame.vue`'s own header.

The reality: `StoryPage.vue`'s content body (L166-173) is a bare `<section class="story-cels">
<slot/></section>`. The "stack of FREE glassy cels" the comments narrate **does not exist** —
the `story-cel`/`story-cels`/`demo-frame` CSS is referenced only by StoryPage and the dead
DemoFrame. The pages still use `ShowcaseFrame` (31 importers) for their framing.

### F3 — `StorySectionHeader.vue` (105 lines) is a complete ORPHAN

`grep -rn "StorySectionHeader"` across the entire demo returns only its own file. Zero importers.
Dead file.

### F4 — Two competing demo-frame chassis (ShowcaseFrame 31 uses vs DemoFrame 0), plus a third raw idiom

- `ShowcaseFrame.vue` — 31 importers; the real workhorse (`rounded-card border bg-card shadow-cartoon`
  wrapper + `pad`/`tier`/`caption` knobs).
- `DemoFrame.vue` — 0 importers (F2).
- The raw `rounded-card border … bg-card` idiom still appears **44 times** in story templates
  (`grep -c` over `stories/**`), the very pattern ShowcaseFrame was minted to collapse.
- Both ShowcaseFrame and DemoFrame independently define a `--showcase-caption-gap` caption band
  (ShowcaseFrame L131-150; DemoFrame L107-112) — duplicated rhythm.

So there are THREE framing registers (ShowcaseFrame, dead DemoFrame, raw class triplet) where
ONE is wanted. 27 story files import BOTH `StoryPage` AND `ShowcaseFrame` (the normal page shape).

### F5 — The chassis is comment-bloated and the cluster logic is duplicated

- `StoryHero.vue` (432 lines): 88 comment-ish lines; the StoryHeader cluster block is rendered
  TWICE near-verbatim — once in the `fullBleed` branch (L350-372) and once in the `Card` branch
  (L408-430) — with identical `<StoryHeader>`+`<h1>` markup. The script carries a tangle of
  overlapping computed flags: `isHero`, `liveBackdrop`, `fullBleed`, `staticBackdrop`,
  `bgFullBleed`, `cardTier`, `opacityCeiling`, `showCluster`, `showHeroTitle` — a derivation
  thicket where a single normalized `mode` would do.
- `StoryPage.vue` (235 lines): the comments dwarf the code (L82-228 are mostly multi-paragraph
  rationale citing retired waves). It renders TWO header paths (chrome `<header>` for variant=page,
  StoryHero cluster for variant=hero) plus the dead DemoFrame narrative.
- `demo/stories/story-hero.css` is **717 lines** — the chassis CSS is itself a monolith.

The chassis primitive set (`stories/*.vue` + `_chassis/`) is 13 files; of these StoryPage,
StoryHero, StoryHeader, StorySection, ShowcaseFrame, SectionLanding, SectionPreviewCard are live,
and DemoFrame + StorySectionHeader are dead.

### F6 — VizStudio is the right shared chassis but only aurora adopts it (substrate-page DRY hole → defect #6)

`demo/stories/substrates/VizStudio.vue` (162 lines) is the mandated "ONE card with the
aurora/procedural animation, configurator-RIGHT" chassis (its own header documents the exact
USER-DEFECT it answers). **Only `substrates/aurora.vue` composes it.** The other studio pages
hand-roll their own studio shell:
- `substrates/blob.vue` — **870 lines** (≈400 script + ≈430 template + own `<style>`), uses
  `ShowcaseFrame`, NOT VizStudio.
- `substrates/constellation.vue` — **759 lines**, own shell, NOT VizStudio.
- `substrates/fourier-field.vue` — 490 lines.

aurora itself is the encapsulation EXEMPLAR (sub-dirs `aurora/sections/`, `aurora/config/`,
`aurora/usePresetThumbnails.ts`, `AuroraStage.vue`, `NucleiOverlay.vue`). blob/constellation
prove the studios are NOT uniform — exactly the "wildly uneven studios" defect VizStudio was
built to kill. This is the structural root of defect #6 (substrate previews broken/uneven): the
fix exists, it just was not adopted.

### F7 — `liquid-playground.vue` (930) is a monolith; `dock-gallery.vue` (78) is the modular exemplar

`dock/dock-gallery.vue` (78 lines) composes 7 well-encapsulated example components from
`dock/examples/` (AppleMusic 306, DynamicIslandCall 234, Spotlight 259, AppSwitcher 214, TabBar
199, Notification 206, VolumeHUD 181). This is the correct pattern.

`dock/liquid-playground.vue` (930 lines) inlines THREE distinct dock-morph modes
(expand/island/player) + a facet rail + an orientation toggle in ONE SFC, composing none of
`dock/examples/`. `dock/overview.vue` (680) is similarly monolithic. The dock band has both the
right idiom (gallery→examples/) and its violation (playground inline) side by side.

### F8 — The shell docks carry the to-be-removed ℱ brand section (defect #8) + duplicated rail logic

- `SidebarDock.vue:269-313` and `BottomDock.vue:210` both place the ℱ wordmark in the
  `#persistent` slot with an attendant `<DockSeparator :anchor>` and a long comment history
  ("ℱ IS the single Foundations affordance", "the five-attempt whack-a-mole"). This is the
  "persistent ℱ brand section atop BOTH docks → REMOVE" defect (#8).
- SidebarDock (498) + BottomDock (482) duplicate near-identical `railItems`/`railContext`/
  facet-keydown/`useContextualDockLayers`/morph-event wiring (SidebarDock L107-235, BottomDock
  L91-168) — the same contextual-facet-rail engine pasted into both shell docks rather than a
  shared `useDockShellRail()` composable.
- Both reference a removed `mode="facets"` carousel (`SidebarDock.vue:492`, `BottomDock.vue:450`)
  — clean-break debris-comments that should be gone (NO legacy).

### F9 — The manifest (1236) is a LARGE but DEFENSIBLE declarative registry, not a god-module

`manifest.ts` is one data table: the `Story`/`Category` types, four side maps
(`CATEGORY_DEFAULT_BG`, `SUBPATHS` ~130 rows, `LANDING_SUBPATHS`, `LANDING_BLURBS`), the `s()`
row factory, `sectionLanding()`, `assignDepths()`, and the `CATEGORItES` tree. It is well-shaped
(a row = a page; add a story = add a row), NOT spaghetti. The bulk is the `SUBPATHS` enumeration
(L204-334) and the `CATEGORIES` literal with inline blurbs (L462-1209). The legitimate KISS issue
is that the per-route metadata (subpath, background, heroScale) is split across FOUR parallel
maps keyed by `"category/id"` strings rather than colocated per row — a row's full descriptor
requires cross-referencing 4 dictionaries. The `import.meta.glob` lazy + `lazy()` missing-story
fallback are idiomatic and good.

### F10 — Things that ARE right (dogfooding holds in the parts that work)

- The router (`router.ts`, 93 lines) is clean: manifest-derived, one landing + N story routes
  per category, a 404 egg, a one-shot first-resolve guard.
- `SectionLanding.vue` + `SectionPreviewCard.vue` are well-built and DIRECTLY answer defect #11
  ("live previews of REAL components, not icons"): they compose shipped `<Button>`/`<Slider>`/
  `<Switch>`/`<MetricBadge>`/`<Card>`/`<IconChip>` specimens, with `auroraFallbackGround` frozen
  stills for the GL-budget-safe field previews. The bento is the correct shape; it is the
  *category cards* the user wanted fixed and these are the fix — they likely just need wiring/
  polish, not a rebuild.
- `StorySection.vue` (89), the configurator composables (`preset-editor/*.ts`), and `dock-gallery`
  are clean, dogfooded, idiomatic.

---

## ROOT CAUSES (gestalt, first-principles)

1. **TWO motion layers own the same element (the freeze).** The page-build entrance
   (`.scroll-build` animation) and the route transition (`<Transition name="fade-slide">`) are
   independent systems applied to the SAME `<article>` root. The platform cannot disambiguate.
   The fix is ONE coherent route-transition system — the entrance IS the transition, not a
   second animation read through it. This dissolves F1 AND the three AppShell contrivances (the
   bloom-find-child hack, both no-op VT watchers, the 3-branch Transition) at once, because they
   were all band-aids for the transition layer not handing pages off cleanly.

2. **Spec-ahead-of-wire: chassis were designed but never adopted (the dead substrate).** DemoFrame
   (F2), StorySectionHeader (F3), and VizStudio-for-blob/constellation (F6) are all
   "designed-the-right-thing, never finished the wiring." The BD greenfield introduced new chassis
   (DemoFrame's box-model inversion, VizStudio) as the target shape but left the prior shape
   (ShowcaseFrame, hand-rolled studios) live alongside — a half-migration that violates KISS (two
   shapes), DRY (duplicated caption bands, duplicated studio shells), and NO-legacy (the dead
   files + clean-break-debris comments).

3. **Encapsulation is inconsistent across bands.** The aurora studio and dock-gallery prove the
   demo KNOWS how to encapsulate (sub-component dirs, `examples/`). blob/constellation/
   liquid-playground/overview prove the discipline was not applied uniformly — the >700-line
   monoliths are where a sub-component split (or VizStudio/examples adoption) was skipped.

4. **Per-route metadata is scattered across parallel maps.** The manifest keeps a row's
   descriptor in 4 string-keyed dictionaries instead of on the row — a mild DRY/locality smell
   that makes the file feel like a god-module when it is really just verbose.

5. **Comment archaeology.** The chassis SFCs carry paragraphs of retired-wave rationale
   (StoryHero 88 comment-lines, StoryPage L82-228) and clean-break debris ("the five-attempt
   whack-a-mole", removed `mode="facets"`). NO-legacy means these go.

---

## PROPOSED WAVES

### BG.W-ROUTE-TRANSITION-UNIFY — one coherent route transition; kill the collision + the AppShell contrivances
- **Intent:** Defect #1/#9. ONE idiomatic route transition; the page-build entrance and the
  `<Transition>` stop fighting over the article root.
- **Approach:** Make the entrance the transition. Either (a) drop `.scroll-build` off the routed
  `<article>` root entirely and let `<Transition name="fade-slide">` own the page-enter (move any
  per-section build to a child that is NOT the transition target), OR (b) drop the Vue
  `<Transition>` and drive the page-enter purely from `.scroll-build` keyed on `route.fullPath`.
  Pick (a) — Vue `<Transition>` is the idiomatic Vue route-transition primitive; `.scroll-build`
  becomes a child-only cascade. DELETE the `useBloomUp` find-first-non-skeleton-child watcher
  (AppShell L279-303), BOTH no-op `startViewTransition` watchers (L127-136 morph, L212-228
  category), and collapse the 3-branch Transition to {Component, no-match Card} (move the
  matched-but-pending skeleton into the router's `beforeResolve` so it is not a Transition branch).
- **Files:** `demo/layout/AppShell.vue`, `demo/stories/StoryPage.vue`, `demo/stories/SectionLanding.vue`,
  `src/styles/scroll-choreography.css` (the `.scroll-build` host contract), `src/styles/transitions.css`.
- **π bar:** click a nav link → URL changes AND `<main>` swaps to the new page in ONE tick
  (childCount stays at 1 mounted page, never 2→3); both Chrome + Safari; no stale heading.

### BG.W-DEMO-CHASSIS-CONSOLIDATE — ONE framing chassis, delete the dead substrate
- **Intent:** F2/F3/F4. Collapse three framing registers (ShowcaseFrame, dead DemoFrame, raw
  class triplet) to ONE; delete the orphans.
- **Approach:** DELETE `_chassis/DemoFrame.vue` + `_chassis/demo-frame.css` + `StorySectionHeader.vue`
  (zero importers, NO-legacy). Keep `ShowcaseFrame` as THE demo frame; fold the 44 raw
  `rounded-card border bg-card` triplets onto it. Strip the dead `story-cel(s)`/`demo-frame`
  narrative + the `<DemoFrame variant>` comments from StoryPage. Single-source the caption band
  (one `--showcase-caption-gap` owner).
- **Files:** delete the two orphan SFCs + their CSS; `demo/stories/StoryPage.vue`,
  `demo/stories/ShowcaseFrame.vue`, the 44 raw-idiom story files (mechanical re-point).
- **π bar:** `grep DemoFrame|StorySectionHeader` returns 0 across demo; one framing component;
  no visual regression on the converted pages (both modes).

### BG.W-VIZ-STUDIO-ADOPT — every substrate studio on VizStudio (fixes defect #6 + the >700-line monoliths)
- **Intent:** Defect #6 + F6. Make all viz studios uniform on the ONE mandated chassis; break the
  blob/constellation monoliths.
- **Approach:** Re-home `substrates/blob.vue` (870), `substrates/constellation.vue` (759),
  `substrates/fourier-field.vue` (490) onto `<VizStudio>` (configurator-RIGHT, one rounded card),
  following the aurora exemplar: extract per-viz config rows into a colocated `<viz>/config/`
  sub-dir + a `use<Viz>Studio` composable so each studio SFC drops under ~250 lines. No demo-local
  fork of the configurator — compose the shipped `<Configurator>`/`<ConfiguratorLayer>`.
- **Files:** `demo/stories/substrates/{blob,constellation,fourier-field}.vue` + new
  `substrates/{blob,constellation}/` sub-dirs; `substrates/VizStudio.vue` (only if a slot gap
  surfaces).
- **π bar:** all substrate studios render the same gestalt (controls-right, one rounded live card,
  hero subpath on top not in card), each studio SFC < ~250 lines, previews live in both modes.

### BG.W-DOCK-STORY-MODULARIZE — split liquid-playground/overview into composed examples
- **Intent:** F7. Apply the dock-gallery→`examples/` pattern to the monolith dock stories.
- **Approach:** Split `liquid-playground.vue` (930) into per-mode example SFCs (a
  `MapsSearchSheet`, `DynamicIslandSplit`, `AppleMusicPlayer`) under `dock/examples/` (or a
  `dock/playground/` sub-dir), each composing the shipped engines (`useBloomUp`, `useDockFission`,
  `<DockStack>`); the playground SFC becomes a thin host + mode switch (~150 lines, the gallery
  shape). Same for `overview.vue` (680) where a section is a clean unit.
- **Files:** `demo/stories/dock/liquid-playground.vue`, `demo/stories/dock/overview.vue`, new
  `dock/examples/` (or `dock/playground/`) SFCs.
- **π bar:** each dock story SFC < ~250 lines; the morph/split/player demos still work; no
  demo-local re-fork of the dock engines.

### BG.W-SHELL-DOCK-DRY — remove the ℱ brand section, single-source the shell rail
- **Intent:** Defect #8 + F8. Remove the persistent ℱ; DRY the two shell docks; purge clean-break debris.
- **Approach:** DELETE the ℱ wordmark `#persistent` block + its `<DockSeparator :anchor>` from
  both SidebarDock + BottomDock (defect #8). Extract the duplicated rail engine
  (railItems/railContext/facet-keydown/contextual-layers/morph-event) into ONE
  `useDockShellRail()` composable both docks consume. Delete the removed-`mode="facets"`
  debris-comments (NO-legacy). Keep the home-nav reachable via the existing category nav / `/`
  redirect (the ℱ was a redundant Foundations affordance per its own comments).
- **Files:** `demo/layout/SidebarDock.vue`, `demo/layout/BottomDock.vue`, new
  `demo/composables/useDockShellRail.ts`, `demo/eggs/{useLongPress,fGlyphPoints}.ts` +
  `FRedrawOverlay.vue` (the ℱ-redraw egg retires with the wordmark, or re-homes to a deliberate
  egg trigger).
- **π bar:** no ℱ atop either dock; one rail composable, zero duplicated rail logic; the
  `mode="facets"` debris-comments gone; home nav still reachable.

### BG.W-MANIFEST-COLOCATE — fold the 4 parallel route maps onto the row + trim chassis comments
- **Intent:** F9 + F4/F5 (the god-module perception + comment archaeology). Co-locate per-route
  metadata; strip retired-wave comment bloat.
- **Approach:** Move `subpath`/`background`/`heroScale`/`landing*` out of the 4 string-keyed side
  maps INTO the `s()` row options (or a single per-route descriptor object), so a row carries its
  full descriptor in one place (the SUBPATHS dictionary collapses into the row literal). Optionally
  split the per-category `CATEGORIES` blocks into per-category files re-exported by manifest.ts if
  the file still reads heavy after colocation. Trim StoryHero/StoryPage/StoryHeader comments to the
  load-bearing minimum (delete retired-wave rationale); de-duplicate the StoryHero cluster block
  (render the `<StoryHeader>`+`<h1>` ONCE via a normalized `mode`, not twice across fullBleed/Card
  branches).
- **Files:** `demo/stories/manifest.ts`, `demo/stories/StoryHero.vue`, `demo/stories/StoryPage.vue`,
  `demo/stories/StoryHeader.vue`.
- **π bar:** a route's full descriptor reads from ONE location; manifest.ts no longer carries 4
  parallel keyed dictionaries; StoryHero renders the cluster once; no behavior change.

---

## Cross-refs
- **D-category-previews (the landing):** F10 — `SectionLanding`/`SectionPreviewCard` ARE the
  "live previews of REAL components" answer (defect #11); they compose shipped primitives +
  `auroraFallbackGround` stills and need wiring/polish, not a rebuild. The bento grouping is the
  right grouping.
- **D-dock-morph (the shell):** F1/F8 — the in-situ V↔H morph stage lives in `AppShell.vue:490-720`
  as a modal overlay (defect #13: "modal demo, esc doesn't work"). BG.W-ROUTE-TRANSITION-UNIFY
  removes its two no-op VT watchers; the morph-as-a-button-in-the-dock-in-place re-think is the
  dock-morph audit's scope — this audit hands it the contrivance inventory (the synthetic two-dock
  stage, the VT-vs-liquid dual path, the window-event open machinery).

## Chronic/deferred folded
- The BD "box-model inversion" (DemoFrame) chassis — DECIDED-RETIRE (dead substrate, never wired);
  folded into BG.W-DEMO-CHASSIS-CONSOLIDATE.
- The VizStudio adoption (specced at BC.W-VIZ-CONFIGURATOR-SUITE, only aurora adopted) — folded
  into BG.W-VIZ-STUDIO-ADOPT.
