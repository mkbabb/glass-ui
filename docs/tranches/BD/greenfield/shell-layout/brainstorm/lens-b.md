# Shell-Layout — GREENFIELD BRAINSTORM (LENS B: cross-engine / perf-first)

> The demo SHELL redesigned from first principles through the Chrome-AND-Safari +
> performance lens. The shell is the FRAME the whole storybook lives inside: the
> `AppShell` composition, the two nav docks, the category/page/meta IA (how a
> category landing, its page list, and the meta-items are presented), the reload
> FOUC, and the dock contextual-switching wiring. The live nav docks are clean and
> stay clean — this lens does NOT re-litigate them; it CONFIRMS clean and fixes the
> four real gaps the painted-pixel read surfaced.

---

## 0 · WHAT THE PAINTED PIXELS SAY (the honest born-RED read)

Captured live on `http://localhost:5173`, both modes, real reload. Artefacts in
`./captures/`.

| # | Surface | Verdict | Evidence |
|---|---------|---------|----------|
| **C1** | LIVE nav docks (sidebar rail + bottom dock) | **CLEAN — CONFIRMED** | `substrates-landing.png`: warm-cream rail plate, one-row bottom dock with horizontally-scrolling story tabs (`Buttons · Card · Badge …`), persistent prev/next + category-jump + morph control; NO broken-rail artefact, NO collision. A1 RESOLVED holds. |
| **C2** | "Pick a story" RELOAD FOUC | **RESOLVED — CONFIRMED** | Instrumented reload of `/display/buttons` with a `MutationObserver`: `pickEverShown:false`, first article at ~282ms, NO empty-Card flash. The root `--background` paints warm-cream (`rgb(251,250,248)`) / dark (`rgb(11,10,9)`) from frame 0 — no gray flash, no wrong-bg flash. The `router.beforeResolve` first-nav eager-resolve + the `route.matched.length===0` gate (AppShell ~:298) work. |
| **C3** | Category HERO hue (substrates, navigation) | **BORN-RED — teal-navy hero, BOTH modes** | `substrates-hero-top.png` + `substrates-hero-dark.png` + `navigation-hero.png`: the SectionLanding hero field paints a full **teal→sky-blue** (light) / **teal→navy** (dark) gradient behind the display title; the IconChip backplates paint `srgb 0.138 0.479 0.583` (a teal-cyan); the eyebrow is teal. This is a **BC.W-TEAL-NAVY-PURGE violation in the hero accents AND the hero field**. |
| **C4** | Dock CONTEXTUAL-SWITCHING wiring | **BORN-RED — half-deleted (resolver runs, paints NOTHING)** | `useContextualDockLayers(route)` resolves a per-route facet set; both docks build `railItems` (the facets) + `railContext` (a writable v-model navigating to a facet's first story). **Neither is rendered.** The `#rail` / `<DockRail>` render target was removed at `BD.W-DOCK-CORE` A1 ("broken facets carousel removed"); `DockSection` only *surfaces* `descriptor.layers` to the consumer "to feed the seam `<DockRail>`" — but no consumer renders one. So `railItems`/`railContext` are **dead computeds** (grep: 0 template refs). The contextual API exists end-to-end at the DATA layer and has **no surface**. |

So the lens splits cleanly: **CONFIRM** C1 + C2 (do not re-touch); **FIX** C3
(teal hero) + C4 (contextual switching has no surface). Plus the IA-standardization
and cross-engine/entrance work below.

---

## 1 · THE CORE IDEA — "the shell is a CONTEXT ENGINE; the docks are its two windows"

The whole shell is governed by ONE thing the route already carries:
`route.meta.categoryId` + `route.meta.storyId`. Today that drives the category
landing, the story tabs, and (deadly) a resolver that paints nothing. The
greenfield gestalt: **make the route-context a single shared, perf-cheap signal
that every shell surface reads** — the category identity (one warm-anchored hue),
the contextual facets, the entrance, the IA. The two docks become the two
ORIENTATIONS of one context window (vertical = category axis, horizontal = story
axis); the contextual facet is the ONE thing they BOTH render, idiomatically, with
a real iOS-27 liquid-weight switch.

Three moves realize it, each a UNION onto shipped machinery, KISS, no fork:

### MOVE A — Re-surface contextual switching as a LIQUID FACET RAIL (fixes C4)

The resolver is correct; it has no surface. Give it the surface the dock-core
WAVE-AMENDMENT and dock-hub already point at — **NOT** a re-mounted in-dock layer
group (that was the W-RAIL3 inflation that broke), but a detached **facet rail** of
glass chips riding the dock's OUTSIDE gutter (the topology dock-nav.css already
reserves), driven by the SHIPPED tab-indicator + the SHIPPED `useDockFission` /
`useTabIndicator` liquid-weight motion.

- **Surface:** a thin `<DockFacetRail>` (demo-local composition, NOT a new library
  primitive) bound to `railItems` + `v-model:active="railContext"`. It renders ONLY
  when `contextLayers.length > 1` (the existing guard) — single-facet categories
  show no clutter. Vertical dock → the rail is a vertical chip column seated in the
  rail's lower gutter (clears `<main>` by topology at every y — dock-nav.css already
  guarantees this). Horizontal dock → the rail is a chip strip on the hairline above
  the bottom dock.
- **Liquid switch (the iOS-27 T4 signature):** the active facet carries a **gliding
  liquid indicator** — port the SHIPPED `useTabIndicator` (SegmentedTabs' glide +
  squish, `--spring-snappy`, volume-preserving cap ≤1.08) onto the chip rail so the
  indicator TRAVELS between facets on a route change with weight + a hair of squish,
  not a hard plate-swap. Per-facet glyph scale-pop (≈1.15× overshoot) on the
  `data-active` flip composes the IconChip reveal. This is exactly the proposed
  `BD.W-DOCK-TAB-INDICATOR` wave — the facet rail is its CONSUMER, closing the
  "0 `useTabIndicator` refs in the nav dock" gap the IOS27-REFERENCE flags.
- **Animated CATEGORY change (the contextual recompose):** when the category itself
  changes (vertical-dock click), the facet rail's whole content swaps. Wrap the swap
  in the shipped `startViewTransition` (already imported in AppShell) so the
  compositor cross-fades the before/after facet set — one budget-clearing VT, no
  per-chip stagger race. The active category's rail-item set is keyed on
  `categoryId`, so the `<Transition>`/VT fires once per category.
- **Why this is the RIGHT surface, not the broken one:** the resolver, the
  `railContext` writable (with its user-activation short-circuit — already correct),
  the per-facet `accent` hue, and the dock-nav.css gutter topology ALL already exist.
  We are wiring an EXISTING data layer to an EXISTING gutter with an EXISTING
  indicator engine. Zero new state, zero new clock, zero box inflation (box
  INVIOLATE — the rail is OUTSIDE the dock body).

### MOVE B — WARM-ANCHOR the category hero palette (fixes C3, the teal-navy purge)

Root cause (traced in source, not guessed): `aurora-hero.ts`
`sectionColorToHeroPalette(n)` builds a 3-stop ramp where **stops 0 and 1 carry the
raw section hue** (and a +18° neighbour) and only the TAIL is warm-cream. For the
five COOL sectionHues — substrates=3 (teal h222.8), forms=2 (indigo h265.5),
containers=9 (slate-blue h239.6), navigation=11 (ocean h208), motion=12 (periwinkle
h291.9) — the dominant 2/3 of the field lands in the cool band [180,270], so the
hero FIELD paints teal/navy. The `HERO_WASH_C_CAP` lowers chroma but never shifts
hue out of the cool band. This is the literal disease `proof-teal-navy-purge.mjs`
exists to kill — the gate fences the library viz constants + the demo substrate
DEFAULTS, but does NOT reach the SectionLanding hero `background`, so the violation
slipped in through the category-hero palette path.

The greenfield rule (KISS, identity-true): **the section hue is the ONE COLOR EVENT
on the CHIP + EYEBROW ONLY (already the documented restraint) — the hero FIELD is
warm-cream, period.** Two surgical changes, no new machinery:

1. **`sectionColorToHeroPalette` → warm-anchored.** Make the warm-cream the DOMINANT
   stops and the section hue a SINGLE accent stop, AND clamp any cool hue toward the
   warm identity. Concretely: invert the ramp to `[warm-cream lead · warm-cream mid ·
   section-hue accent tail]` and pass the section hue through a `warmAnchorHue()`
   that, for hues in the cool band, pulls them toward the nearest warm anchor (amber
   ~70 / rose ~20) at a bounded strength — so even the single accent stop never lands
   teal/navy. The warm-cream identity reads at rest in EVERY category; the section
   distinctness survives as a faint warm-shifted accent + the chip.
2. **The IconChip backplate** (the `srgb 0.138 0.479 0.583` teal we measured) is the
   `--section-color-3` ramp value tinting the chip. Keep the chip as the ONE color
   event BUT route it through the same `warmAnchorHue()` (or accept the chip as the
   single sanctioned cool accent if the gate allows a low-area chip) — the binding
   call is the `proof-teal-navy-purge` extension below. The hero FIELD must be warm;
   the chip is the negotiable single-event.

This is the `BD.W-HERO-WARM-ANCHOR` amendment: AUGMENT `aurora-hero.ts`'s palette
derivation + EXTEND `proof-teal-navy-purge.mjs` with a T6 clause (the SectionLanding
hero field's dominant painted hue ∈ warm band, born-RED on the current teal capture),
both modes. No new component, no token mint — a palette-math correction + a gate.

### MOVE C — STANDARDIZE the IA as ONE descriptor-driven landing chassis

The IA is *already* mostly standardized (the strength to keep): every category
resolves a `CategoryHero` descriptor (icon, sectionHue, heroPalette, bgKind,
previewKind) from ONE `CATEGORY_HERO` map; `SectionLanding` renders ONE `StoryHero`
at `heroScale:"hero"` + a bento `SectionPreviewCard` grid; the page list is the
bottom dock's scrolling tabs; the meta-items (subpath chip, blurb) are uniform. KEEP
all of this. The greenfield REFINEMENT is to close the three IA seams the audit
surfaced:

- **The preview is a glyph-over-tint placeholder, not a live mini-preview.** The
  `previewKind` descriptor (`field`/`control`/`surface`/`metric`) is declared but
  `SectionLanding` renders the SAME glyph thumbnail for every card (the one-GL
  budget). REFINE: render the declared `previewKind` as a budget-safe STATIC
  specimen per kind (a `field` → a static density-dot/aurora still; `control` → a
  static glass control; `metric` → a static metric pill) — one inert single-paint
  per card, honoring the one-GL-per-route budget, so the IA's `previewKind` is real
  not decorative. (This is the BC.W-HERO-AUDACIOUS Part C/E follow-through.)
- **The category landing and the in-dock contextual facets are the SAME taxonomy
  shown twice with no visual rhyme.** Standardize: the SectionLanding bento groups
  its cards by the SAME facet set the `useContextualDockLayers` resolver returns
  (substrates → Fields / Creatures, forms → Text / Selection / Toggles). The landing
  becomes the EXPANDED view of the dock facet rail — one taxonomy, two scales (the
  landing is the map, the rail is the compass). This makes the contextual switch
  legible: clicking a facet chip scrolls/filters the bento to that group.
- **Meta presentation is uniform but the section-hue color event is applied
  inconsistently** (the chip is teal in the hero but the rail chips carry per-facet
  `accent`). Standardize the ONE-color-event through `warmAnchorHue()` everywhere so
  the chip, the eyebrow, the rail-active indicator, and the bento group headers all
  read the SAME warm-anchored section accent.

---

## 2 · THE BOLDEST MOVE

**Collapse the category landing and the dock facet rail into ONE shared
context-taxonomy surface, and animate the route-context change as a single
liquid-glass facet switch that the docks AND the landing both reflect.**

Today the storybook shows its taxonomy three disconnected times: the vertical dock
(categories), the bottom dock (pages), and the SectionLanding bento (per-category
cards) — plus a dead resolver that was supposed to show facets and shows nothing.
The bold unification: **the facet is the atomic IA unit, surfaced once as a live
liquid rail on whichever dock orientation is active, and once as the bento grouping
on the landing — both driven by the ONE `useContextualDockLayers` resolver, both
switched by the ONE shipped tab-indicator + View-Transition.** A route change does
not just swap a page; it flows the facet indicator across the rail (weight + squish)
AND cross-fades the bento group — the storybook navigates like the iOS-27 dock
recomposes per context (T3), not like a static sidebar. This resurrects the
half-deleted contextual API as the SPINE of the IA instead of a vestigial computed,
and it does it with zero new engines: the resolver, the indicator, the
View-Transition, the gutter topology, and the warm-cream identity are all shipped —
the boldness is in WIRING them into one coherent context engine rather than three
parallel half-built ones.

---

## 3 · CROSS-ENGINE (Chrome + Safari) + PERFORMANCE — the lens's binding law

The shell's motion budget is dominated by the facet switch + the entrance, plus the
ever-present PaperBackdrop + any hero field. Every mechanism below is chosen as the
SIMPLEST that hits the iOS-27 bar AND is WebKit-safe.

- **Facet indicator glide (MOVE A):** compositor-only `transform` (translate +
  scale) on the SHIPPED `useTabIndicator` `linear()` spring — no layout, no paint,
  no `backdrop-filter` animation. Safari-safe by construction (the SegmentedTabs
  indicator already ships and is WebKit-verified). The squish is X/Y volume-preserved
  (cap ≤1.08) — real weight, no jelly.
- **Category-change cross-fade (MOVE A):** `startViewTransition` with a
  `@supports (view-transition-name: x)` floor — Chrome gets the native VT crossfade;
  **Safari (no VT API) falls back to a `.fade-slide` opacity transition** (the same
  recipe AppShell already uses for the RouterView page-enter). One code path, graceful
  per-engine degrade. NO `backdrop-filter:url()`, NO SVG-goo on the facet swap (the
  facet rail is chips, not metaballs — goo is reserved for the morph stage).
- **Hero field (MOVE B):** the warm-anchored aurora is the SAME `<Aurora>`/static
  mesh already budgeted one-per-route; warm-anchoring is a palette-data change, ZERO
  perf delta. Where the budget says static (the dense bands), the warm-cream mesh is a
  compositor-only CSS conic/radial wash (no GL) — the `auroraFallbackGround` already
  exists.
- **Entrance (the shell + page):** KEEP the shipped `.fade-slide` RouterView enter
  (opacity on `--ease-out` + transform on `--spring-smooth`, PRM drops the transform
  leg). For the iOS-27 liquid-entrance GRACE, enroll the bento cards + the facet rail
  in the proposed `.liquid-enter` (`.glass-reveal` + `useLiquidFlex` ≈0.88
  vol-preserving squish + snappy overshoot) — compositor `transform`/`opacity` +
  the surface's OWN `filter` blur-settle (NOT `backdrop-filter` — the WebKit-fragile
  leg), so it is Safari-safe. PRM → opacity-only.
- **Meatball/goo:** the ONLY goo on the shell is the in-situ morph stage's
  `#shell-dock-morph-goo` (already a static SVG `filter:url()`, sRGB
  `color-interpolation-filters`, gated to the occluded midpoint t∈(0.18,0.82) — a
  pure `f(--dock-morph-t)`, no clock). CONFIRMED Safari-pattern-correct: static filter
  mount, no `backdrop-filter:url()`, no per-frame re-filter. KEEP verbatim. The facet
  rail does NOT use goo (chips don't merge — a metaball facet rail would be naive
  ellipsoid noise; the liquid quality comes from the indicator glide + squish).
- **Offscreen-pause:** the PaperBackdrop + any hero field inherit the suite's
  parked-when-hidden + PRM-freeze. The facet indicator's spring clock is one-shot per
  switch (settles to rest), never a steady-state loop. No idle GPU.

---

## 4 · A11Y / PRM CARVE

- The facet rail is a `role="tablist"` of `role="tab"` chips (the contextual facets
  ARE tabs into the category's sub-pages); `aria-selected` tracks `railContext`;
  arrow-key roving within the rail. The category nav stays `aria-current="page"`. The
  bottom-dock story tabs already carry `aria-current` — no change.
- PRM: the facet indicator glide → instant snap (no transform animation, opacity-only
  active-state); the category-change VT/fade → instant swap; the `.liquid-enter`
  squish → opacity-only. All inherit the global motion gate + each recipe's
  `@media (prefers-reduced-motion: reduce)` block.
- The reload FOUC (C2) is RESOLVED and its a11y is sound (the `route.matched===0`
  empty-state composes the shipped `<Card>` with real copy, reachable only for a true
  no-match — never flashed for a matched async route). KEEP verbatim.
- Tap targets: the facet chips ≥44px; the rail seats in the gutter clear of `<main>`
  at every y (dock-nav.css topology) so no overlap-occlusion of content controls.

---

## 5 · THE DELTA-ASSAY → wave amendment (reconciled vs the 116-wave set, no dup vs dock-core/dock-hub)

This lens's deltas, reconciled so NOTHING duplicates the dock-core, dock-hub, or
shipped shell waves:

| Δ | Wave | Disposition vs existing set |
|---|------|-----------------------------|
| **C1 confirm** | — | NO WAVE. Live docks clean; assert as a GOLDEN screenshot baseline only. |
| **C2 confirm** | — | NO WAVE. FOUC resolved (router eager-resolve + matched-gate). Bank `captures/` + the `MutationObserver` `pickEverShown:false` as the regression π. Do NOT re-fork. |
| **C3 teal hero** | **NEW `BD.W-HERO-WARM-ANCHOR`** | AUGMENT `aurora-hero.ts::sectionColorToHeroPalette` (warm-anchor the ramp + `warmAnchorHue()` clamp) + the IconChip section-event; EXTEND `scripts/proof-teal-navy-purge.mjs` with a **T6** clause (SectionLanding hero dominant painted-hue ∈ warm band, born-RED on the captured teal, BOTH modes). Distinct from the substrate-viz T1/T2/T5 (different surface — the hero field, not the viz constants). NO dup. |
| **C4 contextual surface** | **AUGMENT `BD.W-DOCK-TAB-INDICATOR`** (the proposed wave) + **NEW `BD.W-DOCK-FACET-RAIL`** (demo composition) | The indicator-port wave is already proposed in IOS27-REFERENCE T4. ADD: the `<DockFacetRail>` demo composition that CONSUMES `railItems`/`railContext` + the ported indicator, restoring the contextual surface the W-RAIL3/A1 deletion removed — WITHOUT the inflation (rides the OUTSIDE gutter, box INVIOLATE). Reuses the docks' EXISTING `railContext` writable + `router.push` (shipped, user-activation short-circuit) for the facet→route navigation; once `BD.W-DOCK-LINK-API` lands its BOOKED `useDockLink` verb facade (wave-specced, NOT yet sourced) it routes through that — no second nav path either way. Distinct from dock-core (which is the morph/punch correctness) and dock-hub (which is `<DockExpand>` envelop). NO dup. |
| **IA standardize** | **AUGMENT `BC.W-HERO-AUDACIOUS` Part C/E** | Render the declared `previewKind` as a real budget-safe static specimen (not the uniform glyph) + group the bento by the resolver's facet set so the landing rhymes with the dock rail. Composition follow-through, no new component. |
| **Entrance grace** | **RIDES `W-LIQUID-ENTRANCE-GENERAL`** | Enroll the bento cards + facet rail in `.liquid-enter`. No new wave — the general entrance wave already books the recipe; the shell is a consumer. |

**The single highest-value shell move:** `BD.W-DOCK-FACET-RAIL` — it resurrects the
dead contextual resolver as the IA spine, the one defect that makes the docks feel
static rather than context-aware. **The single most identity-critical:**
`BD.W-HERO-WARM-ANCHOR` — the teal-navy hero is a live, both-mode violation of the
warm-cream identity the whole tranche is built to defend.

**Gestalt bar:** a coherent descriptor-driven IA (one taxonomy, two scales) + clean
nav docks (CONFIRMED) + LIVE contextual switching with iOS-27 liquid-weight (the
ported indicator + VT/fade) + no reload FOUC (CONFIRMED) + a warm-cream hero in
EVERY category, BOTH modes (the teal purged at the source palette math) — every
mechanism a UNION onto shipped machinery, Safari-safe by construction, KISS.
