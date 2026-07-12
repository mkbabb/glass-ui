# BI.W-CAROUSEL-REBUILD — crisp weighty embla content + the rebuilt carousel page

Band B4 (pager greenfield). The content barbell DELETED; the carousel is crisp weighty embla scroll with
the worm focal; the `/navigation/carousel` page rebuilt with several workflows.

## §Mandate

Discharges (registry rows this wave OWNS):
- **D-PAGER PASS-1 §0 Defect 2** — the carousel CONTENT barbell is a category error (`useCarouselWorm.ts` /
  `.carousel-goo-layer`: a 265.75px body flying 559px OUTSIDE the 414px card, sweeping the description text
  every 3.8s). Unanimous across families: RETIRE wholesale.
- **D-PAGER §1 P3 / §2.8** — the carousel page rebuild (several workflows: hero · peek · hero-scale worm ·
  vertical · windowed-12), single pager per exhibit, `v-model:active`.
- **The carousel-rebuild half of UF-I1** (owned by W-PAGER-WORM; this wave discharges the §page-rebuild +
  Defect-2 barbell — it does not re-own the row).

## §Design

Decided mechanism — D-PAGER PASS-1 §2 (items 7–8) + PASS-4B: the calm-overdamped content-snap law
(momentum yes, bounce no — SUFFUSION-MAP T13). NO re-litigating the barbell retire (unanimous).

- **Content = crisp weighty embla scroll.** `CarouselContent.vue` becomes a clean viewport + track; the
  content barbell is STRUCTURALLY GONE (the 559px-escape class unreproducible — zero filter dependency on
  content). A heavier embla `duration` gives programmatic/dot scrolls inertia (drag already has momentum);
  OPTIONAL compositor-only arrival (`scale(0.965→1)` + opacity off `scrollProgress`, CLIPPED inside the
  viewport, no filter). Peek/multi-item scrollers compose `<FadingScroll>` at the edges.
- **Embla is the ONE authority.** `v-model:active` (or emit-only) replaces the one-way `:active` binding;
  `selectedScrollSnap()` stays the authority via the existing `previousScrollSnap` delta guard — no
  double-write, no dropped morph on rapid-click + Next-hammering (G7).
- **Drag-scrub wires the worm** (the edict's finger-follow core): embla `scrollProgress() × lastIndex`
  drives `useLeadTrail.drive(fractionalIndex)` (W-PAGER-WORM's driver) continuously during pointer drag;
  the windowed rail re-seats on window recompute (nextTick on the repainted active center — G4).
- **The page rebuild** (`demo/stories/navigation/carousel.vue`): §hero single-card glass scroller over a
  real substrate (`<ShowcaseFrame tier="field">` — the `.glass-pager-ring` reads over content, not a flat
  page) with the worm focal; §peek multi-item + FadingScroll edges; a HERO-SCALE worm exhibit (larger
  dots/wider pitch where the metaball waist unambiguously reads — the barbell's true home if the 13px dot
  ships the capsule per ruling 13); a VERTICAL-orientation exhibit; a WINDOWED exhibit (12+ slides,
  `windowFit=7`) proving `pagerWindow` + worm re-seat across a clipped edge. ONE pager per exhibit — the
  absolute `-bottom-6` overlapping second pager + the competing side-by-side pager/counter are GONE.

## §Work

- `src/components/ui/carousel/CarouselContent.vue` — strip the `.carousel-goo-layer` +
  `.carousel-goo-body/-neck` + `#carousel-neck-throat` clip + the `.carousel-content-root::before`
  cartoon-cast + the carousel's `#glass-goo` reference (the token/composable side is W-PAGER-RETIRES);
  clean viewport + track; the weighty embla `duration`; the optional clipped compositor arrival.
- `demo/stories/navigation/carousel.vue` — the 5-exhibit rebuild; `v-model:active`; one pager per exhibit;
  `<ShowcaseFrame tier="field">`; `<FadingScroll>` on the peek scroller.
- `src/components/ui/carousel/Carousel.vue` / `useCarousel.ts` — the `v-model:active` seam + the weighty
  `duration` default (the picked number frozen by G7 capture).

## §Acceptance

Gate: **`proof:carousel-rebuild`** (NEW; source arm `["local","ci"]`, live paint LOCAL).
Born-RED at HEAD: the content barbell is present (`useCarouselWorm` imported in `CarouselContent.vue`) and
the page paints outside the card. GREEN here.
- W1 — `.carousel-goo-layer` + the content-barbell references DEFINITION-ABSENT in `CarouselContent.vue`
  (no half-delete — a broken reference REDs the same as a stub).
- W2 — embla is the single authority: `v-model:active` + the `previousScrollSnap` delta guard; no shadow
  active ref.
- W3 — the drag-scrub wires `useLeadTrail.drive(...)` (the worm follows the finger); no filter on content.
- W4 — the page has ONE pager per exhibit (the overlapping `-bottom-6` second pager + the side-by-side
  counter GONE); the 5 exhibits present.
- Self-test bite: a planted content-barbell (a `.carousel-goo-layer`) REDs; a planted second pager per
  exhibit REDs; a planted content `filter:url()` REDs.

## §π/DELTA

`tests-visual/carousel-rebuild.spec.ts` (NEW; LOCAL):
- The full-page screenshot proving ZERO paint outside the card (the 559px-escape regression test), both
  modes, Chrome + real WebKit.
- The drag-scrub multi-gap frame series (worm follows 1:1, no stutter at integer-slot crossings; windowed
  re-seat mid-drag).
- The rapid-click + Next-hammer authority test (worm always lands on `selectedScrollSnap()`); the calm
  content-snap read (momentum, no bounce).
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE navigation verdict.

## §Obligations

- **Device run (SAF-1):** the ZERO-outside-card capture + the content-snap feel on real WebKit (UF-C3 class —
  liquid-playground/carousel Safari attribution). Shared with W-PAGER-WORM's decider run where possible.
- No cross-repo ask (demo + library visual clean break; embla authority unchanged for consumers binding
  `useCarousel`).

## §Dispositions

- **`useCarouselWorm.ts` + the `--carousel-goo-*` tokens** → DELETED by W-PAGER-RETIRES (this wave removes
  the CONSUMER; the retire wave executes the token/composable cut). No re-book.
- **G11 content-morph expectation check** — the "morph blob and meatball" feedback is discharged as
  indicator-goo + crisp content (Defect 2). IF the user genuinely wants card-melt at the return, it becomes
  a SCOPED, viewport-CLIPPED, opt-in successor — NEVER the page-bleeding default. Recorded, no re-book.
