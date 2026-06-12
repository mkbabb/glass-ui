# BA fleet — lane r10-carousel-pager — the carousel pager RING (R10-1)

The user (R10-1, `USER-AUDIT-2026-06-12-R10.md:10`): "The carousel dots should be
encapsulated in a ring like the other." GROUND `ground/R10-01-carousel-dots-no-ring.png`
— the `1 / 5` counter sits in a dark pill RING with ‹ › chevrons; the dot row floats
BARE. Live-probed `/navigation/carousel` on :5210 both modes; captures banked at
`fleet/r10-carousel-pager-{light,dark}.png`. AUDIT-ONLY — file:line for every claim.

---

## 1 — THE PAGER ANATOMY at HEAD (the encapsulation asymmetry, source-confirmed)

The demo route `/navigation/carousel` (`demo/stories/navigation/carousel.vue`)
composes the BARE primitives — `<CarouselPager>` (`CarouselPager.vue`) + `<CarouselDots>`
(`CarouselDots.vue`), NOT `<GlassCarouselPager>`. The asymmetry is a TWO-COMPONENT split:

- **The counter — IN A RING.** `CarouselPager.vue:75-81` paints the counter `<span>`
  as `rounded-pill border border-border bg-card px-3 py-1 text-mono-caption tabular-nums`
  — an OPAQUE plate ring (`bg-card`). Live computed (`r10-carousel-pager-light.png` /
  probe): light = `bg rgb(251,250,249)` + `border rgb(184,182,173)` + `radius 9999px` +
  `pad 4px 12px`, NO box-shadow; dark = `bg rgb(28,25,23)` (the near-black slab the
  ground capture shows) + `border rgb(91,86,82)` + `color rgb(232,231,227)`. The chevrons
  are `<Button variant="ghost" size="icon">` (`CarouselPager.vue:64-73,83-92`) —
  unringed ghost buttons flanking the pill. The `GlassCarouselPager.vue:113-119` twin
  uses the SAME `rounded-pill border-border bg-card …` recipe + `shadow-cartoon-sm` and
  `variant="outline"` chevrons — a parallel ring recipe, same opaque-plate register.
- **The dots — BARE.** `CarouselDots.vue:39-65` is a `role="tablist"` flex row
  (`inline-flex items-center justify-center gap-1.5`); NO background, NO border, NO
  shadow, NO radius (live: `dotsWrap.background rgba(0,0,0,0)`, `box-shadow none`,
  `padding 0px`, `gap 6px`). Each dot is a 24px hit-box with a `::before` pip
  (`CarouselDots.vue:96-138`): inactive = `color-mix(in srgb, var(--foreground) 52%,
  transparent)` 6px circle; active = `var(--foreground)` ELONGATED to 24px pill on
  `--spring-dock`; hover = 72%. The dots are token-correct + dark/light-safe BY
  CONSTRUCTION (`--foreground` flips: dark active live = `rgb(232,231,227)`, inactive =
  52% light — confirmed; the mid-reflow `rgb(28,25,23)` artifact was stale). The defect
  is PURELY the missing encapsulating surface — the dots own no plate, the counter does.

The live demo layout (`carousel.vue:69-72`) is dots-LEFT / pager-RIGHT in a
`justify-between` row; the ground capture is a centered dots-UNDER-counter composition
(a different host arrangement — slides deck or stacked). The register defect is identical
across both arrangements: one paints a ring, one does not. The second `/navigation/carousel`
section (`carousel.vue:113-115`) shows `<CarouselPager>` with bare `‹ › « »` chevrons and
NO counter/ring at all — a third inconsistent pager silhouette on the same page.

## 2 — THE REGISTER QUESTION (the counter ring is the WRONG model; the house owns the right one)

The counter ring is an **opaque `bg-card` plate** — a flat solid that in DARK collapses to
the near-black `rgb(28,25,23)` slab the user flagged (the R9/W-DARK-MATERIAL gray-slab class:
a flat opaque card on a dark page reads as a charcoal blob, no glass identity). **The dots
should NOT inherit THIS ring** — encapsulating them in a second `bg-card` slab doubles the
flat-opaque defect. The house already owns the CORRECT "controls in a glass pill" register,
proven on two existing surfaces:

- **The DockRail chip pill** (`dock/rail-extend.css:223-299`) — the canonical floating
  control-pill: `background var(--glass-bg-floating)` + `backdrop-filter
  var(--glass-blur-floating)` + `box-shadow: var(--glass-edge-light), var(--glass-specular),
  0 2px 6px …` + `border-radius var(--radius-pill)`, with a `.dark` box-shadow arm
  (`:256-261`) and the "selected reads as glass" active tier `--dock-control-active-bg`
  (`:284`). This is a TRANSLUCENT glass pill that reads the substrate THROUGH it — exactly
  the iOS pager-pill register, NO gray slab.
- **The dock collapsed-pill** (`dock/morph.css:281,299`) — `var(--glass-bg-floating, …)`
  the same floating-glass tier.
- **The `.glass-pill`/`.glass-card` shorthands** (`glass/surfaces.css:12-33`) — `.glass-card`
  = `color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) …)` +
  `--glass-blur-quiet` + `--glass-material-rim`; the glass tier that self-tints + carries
  the rim/specular.

**THE GESTALT DIRECTION [S2]:** mint ONE pager-CHASSIS ring register — a `--radius-pill`
glass-floating pill (the DockRail-chip recipe: `--glass-bg-floating` +
`--glass-blur-floating` + `--glass-edge-light`/`--glass-specular` + the `.dark` arm) — and
encapsulate BOTH the counter AND the dots in it (and reconcile the counter OFF the opaque
`bg-card` onto the same glass ring, killing the dark slab). The user's "like the other" =
the counter's ring should become the glass pager-pill, and the dots gain the same. NOT a
second opaque plate — the glass-floating register is the house "controls in a pill" idiom,
already dark/light-safe, already specular-rimmed, already ≥2-consumer-proven. This converges
with R10-5 ("No gray") + the R9 W-DARK-MATERIAL seam: the opaque `bg-card` counter is itself
a gray-slab offender that this ring re-register fixes.

## 3 — THE DECK-DOTS CONVERGENCE (the dots ARE already one register; the RING is the new shared axis)

The carousel dots and the slides deck dots are **ALREADY the same register, by deliberate
construction**. `CarouselDots.vue:68-94` header: "Re-authored from first principles against
the slides `DeckPager` oracle (`~/Programming/slides/src/deck/DeckPager.vue`)." Both share:
24px hit-box + 6px base pip + `color-mix(… --foreground 52%, transparent)` inactive +
`--foreground`/`--ncsu-red` active + golden-ratio elongation + the WCAG 1.4.11 contrast
proof (`CarouselDots.vue:96-138` vs `DeckPager.vue:115-138`). `DeckPager.vue:14-15` already
names the convergence target: "the eventual `@mkbabb/glass-ui/deck` `<DeckPager>`
generalizes this." The ONLY divergences: DeckPager owns a `--deck-pager-fit` windowing
ladder (`DeckPager.vue:97-110`) for the dock-gutter overflow + `is-edge` clipped-window
cues (`:136-137`); CarouselDots is unwindowed.

The RETIRED `/deck-progress` (`CHANGELOG.md:34`, `MIGRATION.md:44`) is a DIFFERENT thing —
a thin progress TRACK/rail (`<DeckProgress>` over `<Progress>`, the `.glass-progress-rail`
recipe), NOT paging dots. Do not conflate: the dots-ring future is orthogonal to that
retired rail.

**THE UNIFIED PRIMITIVE [S2] — `<PagerDots>` (a generalized dot-rail) wrapped by an
optional `ring`:** props `count`, `active`, `orientation?: "horizontal"|"vertical"`,
`windowFit?: number` (the DeckPager `--deck-pager-fit` windowing, off by default),
`ring?: boolean` (default the chassis-ring glass-floating pill). ≥2-consumer evidence BY
CONSTRUCTION: (1) `CarouselDots` (the carousel), (2) slides `DeckPager` (the deck) — the
two are the SAME recipe TODAY, so the generalization is a HARVEST not a new substrate; the
≥2 bar (J inv-10 / L inv-8) is met the moment slides re-adopts. This is the R10-3 deck-dots
fold ("first class side deck dots … the carousel-dots ring register and deck dots are
plausibly ONE register — the ≥2-consumer bar met by construction",
`USER-AUDIT-…-R10.md:12`). COORDINATE with lane r10-deck-boundary: this lane proposes the
SHARED dot-rail + ring primitive lives library-side (`@mkbabb/glass-ui/...`); the
DeckPager's `--deck-pager-fit` viewport-windowing + the `--ncsu-red` active tint stay
slides-local presets-in-consumers (the windowing is dock-gutter-specific, the red is the
Wolfpack brand — NEITHER belongs in library tokens).

## 4 — LIVE-PROBE both modes (the asymmetry + the dark slab confirmed; the dots are token-correct)

`fleet/r10-carousel-pager-light.png` + `-dark.png` (:5210, `/navigation/carousel`):

- **LIGHT** — counter pill = cream `bg rgb(251,250,249)` + warm-gray border, reads as a
  clean ring; dots float bare to its left; the asymmetry is plain.
- **DARK** — counter pill collapses to the `rgb(28,25,23)` near-black slab (the ground
  capture's dark pill — confirmed R9/W-DARK-MATERIAL gray-slab compounding: the opaque
  `bg-card` ring goes charcoal-on-charcoal over the aurora). The dots stay token-correct
  (active `rgb(232,231,227)` light pill, inactive 52% light, dark/light-safe by the
  `--foreground` flip — NO dark bug in the dots themselves) but read as a bare floating
  run with no surface. The bottom-section pager (`carousel.vue:113`) shows a THIRD
  silhouette: bare `‹ › « »` chevrons, no counter, no ring — three inconsistent pager
  shapes on one page.

**Dark-register note [S2]:** encapsulating the dots in the CURRENT opaque `bg-card` ring
would IMPORT the dark slab onto the dots — the fix MUST be the glass-floating ring (§2),
which reads the substrate through it and dodges the slab. The counter ring re-register OFF
`bg-card` onto the glass pill is the same edit — one chassis-ring register, both consumers.

---

## VERDICT

The counter-vs-dots ring asymmetry is real and source-confirmed (`CarouselPager.vue:75-81`
opaque-plate ring vs `CarouselDots.vue:39-65` bare row). The user's "ring like the other"
should NOT replicate the counter's opaque `bg-card` plate (itself a R9/R10-5 gray-slab
offender) — mint ONE pager-CHASSIS glass-floating ring (the DockRail-chip recipe,
`dock/rail-extend.css:234-249`) encapsulating BOTH the counter and the dots, killing the
dark slab in the same move. The carousel dots + slides DeckPager are ALREADY one register
(`CarouselDots.vue:68` oracle header); generalize to a shared `<PagerDots ring>` primitive
— ≥2-consumer met by construction (carousel + deck), the R10-3 deck-dots fold. Slides keeps
its `--deck-pager-fit` windowing + `--ncsu-red` as presets-in-consumers.
