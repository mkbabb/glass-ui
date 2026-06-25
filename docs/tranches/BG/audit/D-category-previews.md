# BG audit D — "Category cards waste enormous space; show LIVE previews of REAL components, not icons"

**Directive (defect #11).** Each category/story card is "a tiny icon + a huge empty
(metallic) thumbnail + description." User mandate: render a **live, real, miniature
instance of a representative component** from that category/story — a true bento of live
specimens, NOT screenshots/icons. Reconcile with the one-GL budget, lazy-mount/offscreen-pause,
KISS (a declarative preview registry), aristotelian √φ proportion + cartoon-punch.

---

## FINDINGS (what is actually true at HEAD)

### F1 — A live-specimen system EXISTS, but ONLY on the deep `/<category>` landings

`demo/stories/SectionLanding.vue` (the per-category `/<id>` D1 hero, routed at
`demo/router.ts:31` with `meta.landing`) DOES dispatch a live specimen per card via a
`v-if`/`v-else-if` chain over `specimen.kind` (SectionLanding.vue:124-198):

- `control` → a real `<Button variant="glass">` + `<Slider>` + `<Switch>` stack (L143-155)
- `surface` → a real `<Card tier="quiet">` (L158-166)
- `metric` → a real `<MetricBadge>` (L169-184)
- `field` → a **frozen** `auroraFallbackGround` raster `<div>` (L130-137) — NOT live GL
- `glyph` → an `<IconChip>` POP (L187-197) — the last-resort floor

The specimen kind comes from `categorySpecimen(id)` → `categoryHero(id)?.previewKind`
(`category-hero.ts:204-219`). So the live-specimen machinery is genuinely shipped and the
one-GL budget is genuinely honored (the `field` kind is a device-free `data:`-URI still,
SectionLanding.vue:66-76 + 130-137; the `previewKind === "field"` cards mount **zero**
canvases — see F5). **This part is sound.**

### F2 — The FRONT DOOR (the very first page) bypasses the system entirely → raw 34px glyph in a 7rem void

`demo/stories/foundations/intro.vue` is the storybook homepage (the category index, 11
cards). Its `#preview` slot renders a hand-rolled glyph, NOT a specimen:

```vue
<!-- intro.vue:104-112 -->
<template #preview>
    <div class="intro-cat-thumb">
        <component :is="cat.icon" :size="34" :stroke-width="1.5" />
    </div>
</template>
```
```css
/* intro.vue:122-127 */
.intro-cat-thumb { display: grid; place-items: center; block-size: 7rem;
    color: color-mix(in oklab, var(--foreground), transparent 55%); }
```

This is **the defect verbatim**: a 34px lucide icon centered in a 7rem empty box, dimmed to
45% opacity. 11 identical empty-void cards on the page the user lands on first. It imports
`categoryHero` (intro.vue:6) for the icon/hue but NEVER calls `categorySpecimen`.

`demo/stories/compositions/hero.vue` (the `/compositions/hero` scene grid) has the **same
fork** (hero.vue:130-138 `.composition-scene-thumb`, 7rem glyph void, hero.vue:149-154). Note
defect #10 ("/compositions/hero broken, headers way too large") is on this same page — both
audits touch it.

So: the two **front-of-house** surfaces (homepage index + compositions hero) both
hand-roll a dead-glyph preview and never reach the live-specimen dispatch that
SectionLanding already ships. The system was built but never wired to the doors.

### F3 — The specimen is keyed PER-CATEGORY, not per-STORY → every card in a section is identical

`previewKind` lives on `CATEGORY_HERO[id]` (`category-hero.ts:85-163`) — ONE kind per
category. SectionLanding renders the SAME `specimen` for every story card in the loop
(SectionLanding.vue:103-114 binds `:section`/`:icon`/specimen off the category, not the
per-story row; the `v-for` is over `category.stories` but the specimen is category-constant).

The consequence is the antithesis of "the REAL representative component":

- **forms** (`previewKind: "control"`, 12 stories: inputs, textarea, checks, slider,
  number-field, select, combobox, multi-select, toggle, toggle-chip, selectable-chip, label
  — manifest.ts:716-744) → **all 12 cards show the identical Button+Slider+Switch stack.**
  The `select` card shows a slider. The `combobox` card shows a slider. The `label` card
  shows a slider. The `multi-select` card shows a slider.
- **display** (`previewKind: "surface"`) → every card (buttons, badge, separator, metric-pill,
  status-dot, pulse, dark-mode-toggle…) shows the SAME fake card silhouette.
- **data** (`previewKind: "metric"`) → tables, trees, tags, avatars, timelines all show the
  identical `99.95%` MetricBadge.
- **containers** (`previewKind: "surface"`) → dialog/sheet/popover/menu/tooltip all show the
  same silhouette card.

Each story HAS a precise component identity already (the per-route `SUBPATHS` map,
manifest.ts:204-336 — `forms/select` → `@mkbabb/glass-ui/select`, `forms/label` →
`@mkbabb/glass-ui/label`, etc.), so a true per-story representative IS knowable. The system
throws that knowledge away and collapses to one stand-in per category.

### F4 — The `surface` and `metric` specimens are abstractions, not real components

- `surface` (SectionLanding.vue:158-166): a real `<Card>` but FILLED with three fake
  `<span class="specimen-surface-bar">` rule bars (L259-273) — a *silhouette of a card*,
  not a composed `<CardHeader>`/`<CardTitle>`/`<CardContent>`. It SHOWS the chrome but no
  real content; reads as a wireframe placeholder, not a live specimen.
- `field` (the still): device-free and budget-correct, but it is a frozen aurora raster
  shared across ALL `field` cards (substrates × 11, motion × 9) — every substrates card
  shows the identical orange smear. It does not say "this card is GooBlob / this is
  Constellation / this is the Fourier field"; it is a generic warm wash.
- `glyph` (foundations): the honest last-resort, fine for abstract token pages.

Only `control` and `metric` mount genuinely real reka/library primitives — and even those
are category-constant frozen props (`categorySpecimen` returns `sliderValue: [62]` /
`metricValue: "99.95"`, category-hero.ts:206-218).

### F5 — The one-GL budget reconcile is ALREADY correct (do not regress it)

`StoryHero.vue` paints exactly ONE live GL field per route (`<Aurora>`/`<Constellation>`/
`<FourierField>`, mutually exclusive on `background.kind` — StoryHero.vue:17-19, 263-290).
The SectionLanding `field` specimen is a frozen `auroraFallbackGround` `data:`-URI still
(SectionLanding.vue:66-76) — **zero canvas, zero `getContext`**, with a thorough rationale
recorded inline (SectionLanding.vue:52-65: "a `/substrates` landing with 11 `field` cards
would mount 11 GL-capable canvases" → the still cure). The budget invariant is intact and
must stay intact: the gestalt fix CANNOT mount N live `<Aurora>`/`<GooBlob>` canvases in a
bento. The lazy/offscreen-pause discipline is irrelevant to a CSS-DOM specimen (no rAF), and
the live viz specimens must remain frozen stills.

### F6 — `aspect-ratio: var(--phi)` + `max-block-size: calc(7rem * var(--phi))` already φ-bounds the window

The preview window (`.section-preview-card-preview`, SectionPreviewCard.vue:174-213) is
already √φ-proportioned with `container-type: size` and a `≥45%-occupancy` intent
(SectionPreviewCard.vue:219-221 comment). The **proportion chassis is good**; the failure is
the CONTENT it frames (F2/F3/F4), plus the front-door fork ignores this chassis and uses a
flat 7rem glyph box instead.

---

## ROOT CAUSES (gestalt, first-principles)

**RC1 — The preview's identity axis is at the wrong altitude (CATEGORY, must be STORY).**
A bento of "live previews of REAL components" is a per-CARD truth: each card → its own
component. The system put `previewKind` on the 11-row `CATEGORY_HERO` map instead of the
~80-row `Story`. This is a single-source-of-truth misplacement: the category map answers
"what color is this section," not "what does this card show." The DRY argument that drove it
("read the kind off the category, no second source" — category-hero.ts:179-183) optimized the
WRONG invariant: it deduplicated at the cost of making every card lie about its content.

**RC2 — The system was built but never wired to the front doors.** SectionLanding got the
dispatch; intro.vue + hero.vue each kept a private `.intro-cat-thumb`/`.composition-scene-thumb`
glyph fork (F2). Two parallel preview implementations, the good one un-reached on the pages
users actually see first. This is a classic no-DRY/fork: the `#preview` slot contract exists,
but two consumers hand-roll their own slot body instead of a shared specimen dispatcher.

**RC3 — "Real component" was approximated by "category archetype + silhouette."** `surface`
draws fake bars; `field` paints a generic smear; `control` shows one stack for 12 unrelated
controls (F3/F4). The honest gestalt is: a card for `/forms/select` renders a real
`<Select>` with a real option; a card for `/display/badge` renders a real `<Badge>`; a card
for `/feedback/progress` renders a real `<Progress>`. The library SHIPS all of these as
cheap CSS-DOM primitives — there is no reason to substitute an archetype.

**RC4 — No shared, declarative specimen registry.** The `s()` factory (manifest.ts:366-395)
has no preview field, so there's nowhere to declare "this story's marquee specimen" once.
The KISS answer the directive asks for is exactly this: ONE registry mapping a story's
identity → a small render descriptor, consumed by ONE `<StorySpecimen>` dispatcher that
EVERY card slot (landing + intro + hero) uses.

---

## PROPOSED WAVES

### BG.W-SPECIMEN-PER-STORY (the headline)
**Intent.** Each bento card renders a LIVE miniature of its OWN story's real marquee
component — story-keyed, not category-keyed; the antithesis-fix for F3.

**Approach (idiomatic gestalt).** Mint ONE demo-private registry +
dispatcher and DELETE the per-category `previewKind`/`categorySpecimen` machinery (clean
break, no legacy):
- `demo/stories/specimen-registry.ts` — a `Record<string /* "cat/id" */, SpecimenSpec>`
  keyed by the SAME `cat/id` key the `SUBPATHS` map uses (DRY with the route identity, RC1).
  Each spec is a tiny declarative descriptor: `{ kind, props? }` where `kind` names a real
  shipped primitive (`button | slider | select | switch | badge | progress | toast | card |
  metric | tabs | dock | timeline | …`) and `props` carries the frozen demo props. A story
  with no entry FALLS BACK to a per-category default (so the registry is incremental, not
  80 mandatory rows — KISS).
- `demo/stories/StorySpecimen.vue` — ONE dispatcher `<component>`/`v-if` chain composing the
  SHIPPED library components inert (`inert` + `pointer-events:none` + `tabindex=-1`,
  `cqmin`-scaled to ≥45% occupancy — reuse SectionPreviewCard.vue's existing window
  chassis). It consumes the registry by `cat/id`. This is the SINGLE preview body every
  consumer slots (closes RC2/RC4).
- SectionLanding.vue's inline `v-if` chain (L124-198) DELETES → `<StorySpecimen :story="…">`.
- `category-hero.ts` loses `PreviewKind`/`previewKind`/`SpecimenSpec`/`categorySpecimen`
  (clean break) — it keeps ONLY `{icon, sectionHue, heroPalette, bgKind}` (the color event).

**Files.** `demo/stories/specimen-registry.ts` (new), `demo/stories/StorySpecimen.vue`
(new), `SectionLanding.vue`, `category-hero.ts`, `manifest.ts` (no `s()` change needed —
registry keys off `cat/id`).

**Budget reconcile.** The dispatcher renders CSS-DOM primitives only; a story whose marquee
is a viz (`substrates/aurora`, `motion/*`) resolves to the FROZEN `auroraFallbackGround`
still (F5) — keep that exact device-free path, now per-viz-flavored (RC3 polish below). NO
live GL canvas in any card.

**π / acceptance.** A `proof:bento-specimen` device-free gate: (a) every front-door + landing
`#preview` routes through `<StorySpecimen>` (no surviving `.intro-cat-thumb`/`.composition-
scene-thumb`/inline `v-if specimen.kind`); (b) the registry key set ⊆ the route set; (c) ≥2
distinct specimen KINDS render within any single multi-story category (the "12 identical
sliders" regression bite — a category whose cards all resolve the same kind REDs);
(d) zero `<canvas>`/`getContext` in the bento subtree. The binding π
`tests-visual/bento-specimen.spec.ts`: the `/forms` landing shows a real Select on the
select card + a real Slider on the slider card (distinct), both modes; ≥45% occupancy; the
budget-count = 1 live GL context on the route.

### BG.W-BENTO-FRONTDOOR-UNFORK
**Intent.** Wire the front door + compositions hero onto the shared dispatcher; kill the
two raw-glyph forks (F2/RC2).

**Approach.** `foundations/intro.vue` + `compositions/hero.vue` replace their inline
`#preview` body with `<StorySpecimen>`. The homepage's 11 category cards each show their
category's MARQUEE story specimen (a real Button for display, a real Slider for forms, the
GlassDock silhouette for dock, the aurora still for substrates) — so the FIRST page reads as
a live bento, not 11 dimmed glyphs. Delete `.intro-cat-thumb` + `.composition-scene-thumb`.

**Files.** `demo/stories/foundations/intro.vue`, `demo/stories/compositions/hero.vue`.

**π.** Folded into `proof:bento-specimen` clause (a). The homepage capture shows distinct
live specimens per category, zero 7rem glyph voids. (Coordinate with the #10
`/compositions/hero` header-clamp fix — same SFC, different concern.)

### BG.W-SPECIMEN-VIZ-FLAVORED (folds the generic-smear residual, F4)
**Intent.** A viz-story `field` still is FLAVORED per viz (GooBlob ≠ Constellation ≠
Aurora), not one shared orange smear.

**Approach.** The `field` kind already paints `auroraFallbackGround(config)` from a
per-story palette/config; extend the registry to carry the per-viz frozen config (the
GooBlob metaball still via its existing device-free fallback path; the constellation
lattice still; the Fourier-field still) so each substrates card SHOWS its own viz signature.
Still zero live GL — these are the shipped device-free fallback rasters (the same family as
`auroraFallbackGround`). KISS: reuse each viz's existing CSS/2D-fallback ground; no new math.

**Files.** `demo/stories/specimen-registry.ts`, `StorySpecimen.vue` (+ read each viz's
shipped fallback-ground helper — `src/components/custom/{goo-blob,constellation,
fourier-field}/` — no `src/` behavior edit, demo-only consume).

**π.** The `/substrates` landing shows ≥3 visually-distinct viz stills across its cards
(orientation/luminance distinguishable), both modes; budget = 1 live context.

### BG.W-SPECIMEN-REAL-CONTENT (folds the silhouette residual, F4)
**Intent.** The `surface` specimen is a REAL composed card (CardHeader + CardTitle +
CardContent + a real small control), not three fake `<span>` rule bars.

**Approach.** Replace the `.specimen-surface-bar` silhouette (SectionPreviewCard.vue:259-273
+ SectionLanding.vue:163-165) with a real micro-composition per story (a real `<Card>` with
a real `<CardTitle>` + a real `<Badge>`/`<Switch>` inside, cqmin-scaled). Folds into the
per-story registry — the `surface`/`card` kind carries real slotted content from the spec.

**Files.** `demo/stories/specimen-registry.ts`, `StorySpecimen.vue`,
`SectionPreviewCard.vue` (drop the dead silhouette CSS).

**π.** Folded into `proof:bento-specimen`: no `specimen-surface-bar` survives; the surface
card resolves a real `[data-slot="card-title"]` descendant.

---

## Chronic / deferred folds

- The `previewKind`/`categorySpecimen` per-category indirection (`category-hero.ts:48,
  179-219`) is RETIRED wholesale by BG.W-SPECIMEN-PER-STORY (clean break — the "DRY off the
  category" rationale was the RC1 mistake; the new DRY is the per-route registry key).
- The two front-door preview forks (`.intro-cat-thumb`, `.composition-scene-thumb`) are the
  recurring "system built, doors un-wired" class — closed by BG.W-BENTO-FRONTDOOR-UNFORK +
  the gate clause (a) that bars any future inline `#preview` body off the shared dispatcher.
- The √φ window chassis (SectionPreviewCard.vue:174-213) + the warm-field floor + the
  `--shadow-cartoon` hover lift (SectionPreviewCard.vue:114-141) are CORRECT (aristotelian
  proportion + cartoon-punch already met) — KEEP; the waves change only the CONTENT framed.
