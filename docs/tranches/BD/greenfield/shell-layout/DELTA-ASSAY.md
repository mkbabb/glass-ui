# shell-layout · DELTA-ASSAY — GOLDEN vs CURRENT + the UNION path

> The deft integration: how to evolve the CURRENT shell toward the GOLDEN reusing extant
> primitives, KISS, no legacy, no dual-path. Folds the three challenges' hardenings into the
> assay. Live-inspected on `http://localhost:5173` (chrome-devtools-mcp, both modes) +
> source-verified at HEAD. Verdict: **REFINE-dominant** (1 owned NEW gate-cluster, the rest
> AUGMENTs onto already-booked waves). Convergence ~70%.

---

## 0. The survival-of-the-fittest delta (KEEP / REFINE / RE-INVENT)

| Surface | Disposition | Evidence (live + source) |
|---|---|---|
| `AppShell.vue` composition (PaperBackdrop field + sidebar/main/bottom flex frame + DockGooFilter mount + morph stage host + eggs) | **KEEP** | Source-read `AppShell.vue:251–318`. Clean, idiomatic, one field + two dock chrome planes. The shell frame is FIT. |
| `SidebarDock` + `BottomDock` nav docks | **KEEP** (confirmed clean by all 3 lenses + the prior `W-NAV-DOCK-FIX` census) | Warm-cream rails, `--card light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` warm both arms (live). 0 broken-rail artefacts. |
| The "Pick a story" FOUC `<Card>` guard | **KEEP** (do NOT re-fix) | `AppShell.vue:298` `v-else-if="route.matched.length === 0"` + `router.ts` `beforeResolve` one-shot. `pick:false` across the probe. Defect-7 holds. |
| The IA chassis: ONE `CATEGORY_HERO` → `SectionLanding` → `StoryHero(hero)` → `SectionPreviewCard` bento | **KEEP / REFINE** | Source-confirmed `category-hero.ts` is the ONE descriptor map; `SectionPreviewCard.vue` already carries a `#preview` slot seam (`:91 $slots.preview` → bounded `inert` mini-render). The chassis is FIT; the gaps are downstream (hue + bento content). |
| The contextual resolver surface (`railItems`/`railContext` → `<DockSection>`) | **KEEP** (surface EXISTS — the C4 dispute settled) | Source-verified `SidebarDock.vue:101→306`, `BottomDock.vue:85`. NOT dead computeds. The gap is the SWITCH MOTION, not the surface. |
| The per-category `sectionHue` data (teal/ocean/indigo/slate for 4 of 11) | **RE-INVENT the data + FENCE** | Live: `--section-color-3 = light-dark(oklch(.542 .089 222.8), oklch(.767 .091 219.9))` teal both arms; sc11 ocean, sc2 indigo, sc9 slate. `aurora-hero.ts:67` `SECTION_COLOR_OKLCH[3]` teal literal too. THE headline RED. |
| The reload void (blank `<main>` window) | **NEW** (genuinely-missing artefact) | No `<StorySkeleton>`, `skel:0` in DOM. The cold-load void is real (the soft-nav probe can't reproduce the exact window — see R-timing below). |
| The bento `#preview` thumb | **REFINE** (gray → warm + live specimen) — **owned by `category-landing`, NOT this item** | Live thumb `color-mix(in srgb, var(--foreground) 3%, transparent)` near-zero-chroma GRAY (`SectionPreviewCard.vue:140`); most cards render no `#preview` → blurb-only. A `category-landing` ledger item already owns this. |
| The contextual SWITCH motion (facet plate-swap) | **AUGMENT** (wire liquid into the existing `<DockSection>`) | `grep useTabIndicator demo/layout/` = 0. Silent plate-swap. The liquid weight is the gap. |

---

## 1. The GOLDEN's headline move — corrected against source (the 4 challenges fold here)

The GOLDEN's §2 warm-hue fence is the right GESTALT (a warm-distinct 11-category wall, teal
structurally impossible) but its stated MECHANISM is type-incoherent and its DRY self-description
is partly false. All three challenges converge on this; the UNION path corrects it:

**CORRECTION-1 (challenge-1 R1, the landing refutation): `sectionHue` is a ramp INDEX, not a hue
angle.** `category-hero.ts:81/88/102/109` documents `sectionHue` as *"a `--section-color-N` ramp
INDEX"*; the live values are `3/2/9/11`. The GOLDEN's leg-(a) table "re-points to ~20°/340°/50°/95°"
— those are hue ANGLES with no realizable ramp slot. The de-risk spike (`warm-fence-spike2.mjs`)
computed its 10.4° gap on FREE angles the implementation cannot realize.
→ **UNION:** mint 4 deliberate, named WARM rows on the ONE `--section-color-N` ramp (the §2-sanctioned
"add deliberate warm rows" clause, the additive-not-fork path), re-point the 4 cool indices to them.
NOT a parallel hue table — the ramp stays the ONE identity source.

**CORRECTION-2 (challenge-1 R2): the two §2 rules ("pick existing warm slots OR add deliberate warm
rows") are not co-satisfiable** — the 7 KEEP-warm categories already occupy the 8 truly-warm slots;
reuse forces collisions (substrates→dock's 30.4, navigation→display's 69.6). → **UNION:** DELETE the
"pick existing warm slots OR" clause; mandate the additive path unambiguously.

**CORRECTION-3 (challenge-1 R3 + challenge-2 R5): the fence's `COOL_LO=180` leaks the green-cyan
forest (`sc4 = oklch(.551 .088 171.1)`, compositions).** 171° is the cool-green neighbour of teal,
NOT in the rose→amber→violet warm arc §7 demands; the census `!(h∈(180,270))` FALSE-PASSES it.
→ **UNION:** drop `COOL_LO` to ~165 so the 150–180 green-cyan band also folds; re-index compositions
off forest-171.1 to a deliberate warm-green (or olive sc10 128.8). Tighten the census predicate to
the actual warm arc, not just the [180,270] hole.

**CORRECTION-4 (challenge-3 R1, the DRY truth): there are FOUR hue stores, not "ONE source."**
Live + source confirm the section ramp lives in `color-radius.css:253–262` (light) +
`dark-arm.css:107–116` (dark) + `light-dark.css:131–140` (the combined arm) PLUS the JS mirror
`SECTION_COLOR_OKLCH` in `aurora-hero.ts:63`. The chip reads the CSS var; the hero FIELD reads the JS
array. The GOLDEN's "re-index the index, one source, fixes every consumer at once" is wrong on the
blast radius. → **UNION:** the data fix edits the section-ramp ROW VALUES in all three CSS arms AND
the `SECTION_COLOR_OKLCH` literals (the index stays `3/2/9/11`; the COLOR at that index becomes warm).
The gate must scan ALL FOUR stores. (A genuine de-dup — making `SECTION_COLOR_OKLCH` read the CSS ramp
at build — is a worthy follow-on but OUT of this item's KISS scope; flagged, not undertaken here.)

**CORRECTION-5 (challenge-3 R2): the eyebrow does NOT auto-track the hue** — substrates eyebrow is
`text-muted-foreground` → `rgb(124,102,80)` warm-decoupled (live). → **UNION:** drop the eyebrow from
the "auto-track" claim. The chip (`--section-color-N`) + the hero field (the JS-mirror palette) +
the facet-rail accent (`dock-layer-contexts.ts accent: var(--section-color-N)`) DO track; the eyebrow
is already warm.

**CORRECTION-6 (challenge-3 R5 + R6): the gate clause numbering + the fence dead-code.**
`proof-teal-navy-purge.mjs` ALREADY HAS a T5 (the live-paint local arm, line 297) and T1 explicitly
fences *library viz-substrate constants* and scopes OUT `demo/stories/`. A new clause must be **T6**
(not T5), with a NEW source predicate covering `demo/stories/{category-hero.ts,aurora-hero.ts}` +
`SECTION_COLOR_OKLCH` + the referenced `--section-color-N` CSS rows — born-RED on today's
`222.8/265.5/239.6/208.0`. And the leg-(b) `warmHeroHue()` clamp is justified ONLY if T6's `--selftest`
feeds a synthetic cool hue through it and asserts the fold (otherwise it is ornamental dead code).

---

## 2. The reload void — corrected scope (challenge-2 R2, challenge-1 R5)

The GOLDEN's §0-defect-2 "8 empty frames t=18→128, content t≈199" is **timing-fragile and
mis-modelled**:

- **The void is a PRE-MOUNT void in dev (`<main>` ABSENT), not "chrome-painted-around-empty-main."**
  In dev (Vite unbundled), the whole Vue app is still parsing; `<main>` is not in the DOM. A
  `<StorySkeleton>` 3rd-`<Transition>`-branch is DOWNSTREAM of the same JS bundle whose parse causes
  the void — it cannot paint frame 0 pre-mount. → **UNION:** split the void in two — **V-a**
  (pre-shell-mount, owned by build/chunk strategy or a static `index.html` skeleton stub the SPA
  hydrates over) and **V-b** (shell-mounted, route-chunk-pending, the genuine `<StorySkeleton>`
  window). M2 owns **V-b**. V-a is OUT of this item's scope (a build/index.html concern) — FLAG it,
  do not over-promise "zero void from frame 0."
- **The gate must assert the INVARIANT, not timestamps** (challenge-1 R5: my soft-nav probe shows
  `mainLen:5937, skel:0` across 6 frames — a true cold reload was not reproducible inline; the exact
  18→128ms window is machine/cache dependent). → **UNION:** the π asserts "there exists ≥1 painted
  frame where `<main>` is present, the route chunk is still pending, and the SKELETON occupies the
  rect; AND no frame has `<main>` present-and-empty (len<50, no skeleton) between chrome-paint and
  content." Run against `vite build` output (prod chunking) for V-b. Drop the literal `t=18→128`.
- **DRY: a shipped `Skeleton.vue` already exists** (`src/components/ui/skeleton/Skeleton.vue`,
  challenge-2 R3). Minting a 2nd skeleton ENGINE is the fork the binding law forbids. → **UNION:** the
  NEW artefact is a demo-local `SectionLandingSkeleton` LAYOUT (eyebrow bar + √φ title block + bento
  shimmer grid) that COMPOSES the shipped `Skeleton` primitive + `.glass-reveal`. Compose, don't fork.

The bloom-through (`useBloomUp` swap, `Component` resolves → squish-grow out of the skeleton rect) is
a sound union onto a shipped primitive (verified present). The shared `view-transition-name`
title-solidify is a Chrome-ONLY enhancement (challenge-1 R6) — reword §6 from "render identically" to
"render EQUIVALENTLY (Chrome adds the VT morph; Safari the opacity-equivalent; no broken/empty frame
in either)."

---

## 3. The contextual SWITCH — corrected ownership (challenge-3 R3 + R4)

The GOLDEN says "bring the SHIPPED `useTabIndicator` INTO `<DockSection>`, NO fork." Two source facts
break the literal mechanism:

- **`useTabIndicator` is a TABS-INTERNAL composable** (`src/components/custom/tabs/composables/
  useTabIndicator.ts`), NOT exported from any barrel, taking an 11-field SegmentedTabs-coupled harness
  (`containerRef, indicatorRef, buttonRefs, model, anchorSupported, jsSliderActive, …`). Reconstructing
  that harness inside the dock IS a parallel reproduction. AND it collides with the GOLDEN's own scope
  fence (§0 reserves "the `useTabIndicator` glide/squish" to dock-core).
- **`BD.W-DOCK-TAB-INDICATOR` is UNBOOKED** — grep of `docs/tranches/BD` finds no `*TAB-INDICATOR*`
  wave. The §9 "AUGMENT of the BOOKED wave" is false; the GOLDEN's own §9 even says "(propose)".

→ **UNION (the deft path, reusing what IS booked):** the tranche ALREADY ships the liquid-tab indicator
seam — `BD.W-TABS-LIQUID` (the 5-phase grow→overshoot→travel→settle→shrink envelope on
`useTabIndicator`'s `--stretch` + the new `--tab-blob`) + `BD.W-TAB-IOS-CAPSULE` (the shared
`.glass-tab-capsule` recessed-accent recipe, factored ONCE, consumed by BOTH SegmentedTabs AND the
**dock-tab register** `DockTabButton`/`dock-controls/tab-button.css`). The dock-tab capsule is the
seam. The shell facet switch is its CONSUMER: the `<DockSection>` facet row's selected chip reads the
SHARED `.glass-tab-capsule` accent (post-fence WARM `--section-color-N`) and its travel rides the
`--stretch`/`--tab-blob` envelope. NO new `<DockFacetRail>`, NO tabs-composable import into the dock —
the AUGMENT lands on `W-NAV-DOCK-FIX` (the shell-wiring wave) to wire the existing capsule seam into
the `<DockSection>` facet plate, and on `BD.W-TAB-IOS-CAPSULE` to confirm the dock-tab consumer arm
covers the facet chip. The category-change swap rides the already-imported `startViewTransition`
(`AppShell.vue:29`) with the `@supports`/`.fade-slide` Safari fallback.

---

## 4. The UNION path — precise, extant-primitive-reusing, no dual-path

| Move | What ships | Reuses (extant) | New |
|---|---|---|---|
| **Warm-hue data + fence** | 4 deliberate warm rows added to the section ramp (all 3 CSS arms + the `SECTION_COLOR_OKLCH` mirror); the 4 cool indices re-pointed; compositions off forest-171.1; the `overlays-scrims.vue:114` stray purged; `warmHeroHue()` clamp + the T6 census | `cssToOklch` (no re-rolled math); the ONE `--section-color-N` ramp; `proof-teal-navy-purge.mjs` (a new T6 clause + `--selftest`) | the 4 warm rows, `warmHeroHue`, T6 |
| **Route-bloom skeleton (V-b)** | a 3rd `<Transition>` branch keyed `route.matched.length>0 && !Component`; `<SectionLandingSkeleton>` LAYOUT; the `useBloomUp` swap | the shipped `Skeleton.vue` + `.glass-reveal` + `useBloomUp` + the existing `<RouterView>`/`<Transition>` (the FOUC `<Card>` guard untouched) | the `SectionLandingSkeleton` LAYOUT + the V-b invariant π |
| **Contextual switch liquid** | the `<DockSection>` facet chip reads `.glass-tab-capsule` + rides `--stretch`/`--tab-blob`; category-change via `startViewTransition`/`.fade-slide` | `BD.W-TABS-LIQUID` + `BD.W-TAB-IOS-CAPSULE` (the dock-tab capsule consumer) + `startViewTransition` (already imported) | the shell-consumer wiring (AUGMENT on `W-NAV-DOCK-FIX`) |
| **Warm-glass shell + defined-edge hero field** | the hero field gets a concentric-radius card edge (a bounded, rimmed surface) | `BD.W-PAGE-BACKGROUND` (the contained-live-field staging seam) + the BD concentric token | the hero-field rim π (a named owner) |
| **Bento gray→warm + live specimen** | warm-glass thumb (no-gray) + wire the `#preview` slot per `previewKind` | the EXISTING `$slots.preview` seam in `SectionPreviewCard.vue` + shipped `<Button>`/`<Card>`/`<Metric>` (single-paint) | **OWNED BY `category-landing` ledger item — NOT re-specced here** |

**No dual-path / no legacy:** the data fix REPLACES the cool ramp values (clean break, the index stays);
the skeleton is a 3rd branch on the EXISTING transition (no parallel router); the switch wires an
EXISTING capsule seam (no 2nd indicator engine). The bento specimen is explicitly DEFERRED to the
`category-landing` item to avoid the duplication the prompt forbids.

**Cross-engine (challenge-2 R1):** the shell introduces NO NEW `backdrop-filter:url`. The `.glass-lens`
refraction the shell COMPOSES is a pre-existing WebKit-degraded glass-core primitive with its own
`@supports` blur floor — OUT of shell scope. The gate's url() scan must be a DIFF grep over the
shell-layout file set, NOT a tree-wide grep (or it mis-fires on shipped primitives).

**Perf (challenge-2 R4):** the bento perf budget is the BACKDROP-FILTER layer count, not the GL context
— but since the bento is owned by `category-landing`, that budget travels with it; this item's only
perf surface is the skeleton (compositor-only opacity/transform) and the switch (compositor-only
`scale`), both layer-cheap.
