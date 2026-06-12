# BA fleet lane — animation-targets

> R8 frontend-design directive (standing #7): "…better suffuse our design language of glass, grid,
> math, large and audacious typography, with colorful audacious pops… and our **animation targets**…
> what glass-ui items might we smoothen, refine, hone, and abstract out… Look for gaps."
> Plus R8-18 folded in: "smooth out the hover animations."

AUDIT-ONLY. Live-probed :5199 in BOTH modes; source root-caused to file:line. Evidence banked
beside this report: `anim-data-metrics-static-mount.png` (the `/data/metrics` page mounts with the
big audacious numbers as dead static text — zero countup, zero reveal, zero running animation).

The headline: **the substrate is world-class, the consumption is a museum.** glass-ui ships a
complete, in-doctrine animation vocabulary — five role-mapped spring registers, native
scroll-driven + view-transition substrates, `vReveal`/`useStaggerReveal`/`useCountup`/
`useAnimatedNumber` engines — and EVERY ONE of them is consumed ONLY inside its own teaching story.
Not one real content, data, hero, or section surface across the storybook weaves them. The motion
that DOES exist is interaction-local (dock morph, tab-indicator squish, hover) and is correct. What
is MISSING is the orchestration layer: page-enter, section/card stagger-reveal, the hero moment,
metric count-up, and a scroll-progress affordance.

---

## Part 1 — what the bar is (the doctrine + the vocabulary, both SOUND)

The §6 easing doctrine is canonical and the spring vocabulary is complete — this is NOT where the
gap lives, and the audit should NOT re-litigate it.

- **§6 easing doctrine** (`src/styles/tokens/scheme-motion.css:160-187`, CLAUDE.md): surface props
  (bg/border/color/box-shadow/opacity) → bezier `--ease-standard`; transform hover/press/active →
  `--spring-smooth`; enter → `--spring-bouncy`/`--spring-snappy`; exit → `--ease-out`/`--ease-standard`
  (no overshoot past gone); position-tracked → `--ease-standard`. Clean, recorded, enforced.
- **The five-register spring vocabulary** (`src/composables/motion/springPresets.ts:34-78`): SETTLE
  (smooth) · CONTROL (snappy) · PLAYFUL (bouncy) · GENTLE (gentle) · DOCK (dock) — each role-mapped,
  each a stable `--spring-*` `linear()` token. This is excellent and complete.
- **The `<Transition>` recipe set** (`src/styles/transitions.css`): fade · fade-slide · dialog-scale ·
  pop · dropdown · tab-fade · pane-swap · metric-swap · dock-in — all PRM-guarded (L211-262). Sound.
- **The native facilities** (Newly-Available, dual-path with JS fallback): scroll-driven
  (`scroll-driven.css` — `.scroll-progress`, `[data-scroll-reveal]`), view-transitions
  (`view-transition.css` — `.gl-list-item` group recipe), all PRM-gated at the outer `@supports`/
  `@media` boundary. Sound.

**Verdict on the substrate: there is nothing to build. Every primitive the moments below need
already exists and is in-doctrine. The wave work is WIRING, not authoring.**

---

## Part 2 — the moments that EXIST (live-verified, and correct)

| moment | where | register | live read |
|---|---|---|---|
| dock collapse/expand morph | `--dock-morph-t` scalar (`dockMorphContext.ts`) | DOCK spring | one scalar, in-doctrine; the AZ no-scale-pop + hysteresis fixes landed |
| dock V↔H morph showcase | `/dock/morph-showcase` (`useDockOrientationMorph`) | DOCK spring | exists, but ONLY on the showcase story (R8-2 — the shell docks owe it in-situ) |
| tab-indicator glide + squish | `useTabIndicator.ts` (reads `--stretch`/`--tab-indicator-max-stretch`) | snappy | shipped; volume-preserving reciprocal stretch, PRM-gated |
| hover register (controls/buttons) | `.dock-icon-button`/`.btn-pill`/`.glass-btn`/`btn-interactive` | bezier surface + smooth scale | §6-disciplined, no desync (confirmed by lane disco-hover; NO `transition: all` anywhere) |
| dialog/sheet/popover/dropdown enter | `transitions.css` `<Transition>` classes | bouncy/snappy enter, ease exit | correct |
| toast entrance | reka `tw-animate-css` data-state | documented §6 exemption | correct, gated |

**Live binding evidence for the hover register being correct:** during a sub-story SWAP at
`/foundations` (story content fully replaced), the global `animationstart`/`transitionstart`
recorder caught exactly 14 transitions — ALL of them `box-shadow`/`color`/`opacity` on
`.dock-icon-button.glass-specular` (the persistent chrome reacting to the route-active change), each
on the §6 bezier legs. The interaction motion is healthy.

---

## Part 3 — the moments that are MISSING (the gap — live-proven)

The same swap recorder proves the negative: **the incoming story content fired ZERO entrance
animation.** Content hard-cuts in. Every facility below exists in source and ships publicly, yet has
ZERO real-surface consumers — each is consumed only inside its own `demo/stories/motion/*.vue`
self-demo (+ the `manifest.ts` registration line):

| facility | engine (ships, in-doctrine) | self-demo (the ONLY consumer) | real-surface consumers |
|---|---|---|---|
| entrance reveal | `vReveal` (`src/composables/motion/vReveal.ts`, root-barrel, dependency-free) | `motion/reveal.vue` | **0** |
| scroll-stagger reveal | `[data-scroll-reveal]` + `useStaggerReveal` | `motion/scroll-vt.vue`, `composables/use-stagger-reveal.vue` | **0** |
| scroll-progress bar | `.scroll-progress` + `useScrollProgress` | `motion/scroll-vt.vue` | **0** (NOT in AppShell/StoryPage) |
| number count-up | `useCountup` (`[data-countup]`) + `useAnimatedNumber` | `motion/countup.vue`, `composables/use-animated-number.vue` | **0** |
| list/route view-transition | `startViewTransition` + `.gl-list-item` group | `motion/scroll-vt.vue`, `dock/morph-showcase.vue` | **0** |

Live readbacks (binding):
- `/` (home): 0 running animations; `data-reveal=0`, `data-scroll-reveal=0`, `scroll-progress=0`,
  `data-countup=0`. The only animation hooks are 2 dormant `view-transition-name` (the dock route
  seam).
- `/data` (27 glass cards): 0 entrance animation, 0 reveal, 0 countup.
- `/data/metrics` (the audacious-number / fast.com-peg surface): the big display numbers render as
  static text — 0 countup, 0 reveal, 0 running animation (see `anim-data-metrics-static-mount.png`).
- `<RouterView>` in `AppShell.vue:129-143` mounts `<component :is="Component">` with **no
  `<Transition>` wrapper** — there is no page-enter orchestration at the route level, by construction.
- `StoryPage.vue` / `StorySection.vue` / `StoryHero.vue` carry **no** `onMounted`/`reveal`/`Transition`/
  `stagger` hook (grep-confirmed empty). The story chassis has zero entrance choreography.

This is the "canon-on-paper / muddy-in-render" pattern the house already named for hierarchy
(AZ.W-HIERARCHY), now seen for MOTION: the engines are built and gated and tested, then never wired
into the surfaces a visitor actually walks. A storybook whose home, data, and hero pages hard-cut in
reads as static and "flat/uninteresting" (the same lens as R8-13) even though the motion library is
state-of-the-art.

---

## Part 4 — R8-18 fold (smooth-hover) — coordinated, not duplicated

R8-18 ("remove the disco everywhere, smooth out the hover") is fully owned by lane **disco-hover**
(`fleet/disco-hover.md`): the `btn-audacious`/`btn-audacious-gold` retirement (Part A) and the
`toggle-chip` `transition-colors duration-150 ease-out` → §6 re-point (Part B1). I confirm its
core finding from this lane's vantage: the CORE hover registers are §6-clean (no `transition: all`,
no fast-snap-then-slow-spring desync). The "un-smooth hover" the user feels on the CTA IS the disco
busy-ness (multi-layer texture+sparkle+shadow swap), not an easing bug — removing the disco collapses
the CTA onto the single coherent §6 glass glide. **The smooth-hover mandate is satisfied by the
disco retirement + the chip re-point; this lane adds no separate hover finding, and the
animation-target map below assumes the de-disco'd glass-hover register as the rest baseline.**

---

## Part 5 — the proposed ANIMATION-TARGET MAP (which surface gains which moment)

The design principle: **proportion and restraint** (the house's own one-color-event discipline,
applied to motion). ONE deliberate motion event per surface tier, PRM-clean, in-doctrine, wired
through the EXISTING engines (zero new primitives). The map is a consumption plan, not a build plan.

### Tier A — the page-enter orchestration (the headline; the shell-level moment)
- **Surface:** the `<RouterView>` in `AppShell.vue` + the story chassis (`StoryPage`/`StorySection`).
- **Moment:** a single coherent page-enter on route change — a short fade-rise of the page body
  (the `fade-slide`/`fade` recipe already in `transitions.css`) PLUS a one-shot section/card
  stagger-reveal driven by `[data-scroll-reveal]` (CSS-compositor primary) / `vReveal` (the
  dependency-free fallback the story chassis can set on each section).
- **Register:** SETTLE (smooth) for the page body; the per-section stagger via the `view()` timeline
  (implicit cascade — no `setTimeout` chain). Exit on `--ease-out`, no overshoot.
- **Why here:** this is the moment whose ABSENCE the recorder proved (content hard-cuts in). Wiring
  it once in the chassis suffuses every story page at zero per-page cost — the chassis-affordance
  pattern the house already uses for hierarchy and the hero display register.

### Tier B — the scroll-progress affordance (the shell chrome moment)
- **Surface:** the `<main>` scroller in `AppShell.vue` (the route owns scroll).
- **Moment:** a `.scroll-progress` 0..1 bar pinned to the content column edge, driven by the native
  `scroll()` timeline (compositor, off-main-thread; `useScrollProgress` the fallback).
- **Register:** linear scroll-bound (not a spring — it tracks position). PRM-safe (the bar is
  position-bound, not auto-running; the `@supports`/PRM gate already handles it).
- **Why here:** long story pages (the data/foundations runs) give zero scroll feedback; this is the
  single most idiomatic glass-ui scroll-driven win and it exercises the unused `.scroll-progress`
  facility on a real surface.

### Tier C — the metric count-up moment (the audacious-number surfaces)
- **Surface:** `MetricCell`/`MetricStack` values + the `text-display-mega`/`text-display-audacious`
  numbers on `/data/metrics` and the suffuse-activated fast.com-peg surfaces.
- **Moment:** count-up on first scroll-into-view via `useCountup` (`[data-countup]`) /
  `useAnimatedNumber`, gated by `useIntersectionPause` so it fires on reveal, not on mount-offscreen.
- **Register:** SETTLE (smooth) — patient, no overshoot on a number (a bounced number reads wrong).
- **Why here:** the suffuse wave already made these numbers audacious; a static audacious number is
  a missed moment. The engine ships and is unused. ONE motion event on the value, the unit/label stay
  still (mirrors the one-color-event restraint on the value glyph).

### Tier D — the list/grid re-order + route-geometry view-transition (the data surfaces)
- **Surface:** sortable lists, data-table sort/filter re-rank, the dock layer-context switch, and the
  per-route geometry morph (the `view-transition-name` seam on the dock root, currently dormant).
- **Moment:** `startViewTransition(() => mutate())` wrapping the DOM re-order, with the
  `.gl-list-item` group recipe (cross-fade for moved members, slide for added/removed).
- **Register:** the VT default (`--vt-ease` → bouncy for the group; the recipe is already authored).
  PRM → `animation: none` on the pseudos (already gated).
- **Why here:** sort/filter/re-rank currently hard-jump; the VT substrate is built and group-tested
  and consumed nowhere real. This is the "smoothen + abstract out" the directive asks for.

### Tier E — the hero moment (the landing + StoryHero entrances)
- **Surface:** the front-door hero cards + `StoryHero` (`variant="hero"`), the home `/` landing.
- **Moment:** a single deliberate hero entrance — the display `<h1>` fade-rise + an optional
  one-shot reveal of the hero's supporting chips/CTA on `vReveal`/`fade-slide`, the live background
  (aurora/blob/constellation/fourier) carrying its own ambient motion underneath (already in-budget).
- **Register:** SETTLE for the title (patient, audacious type should arrive with gravity, not bounce);
  the supporting row may use a restrained PLAYFUL one-shot. PRM → static terminal state.
- **Why here:** `StoryHero.vue` has zero entrance hook; the hero is the one surface where an
  audacious one-shot is proportionate. This is the "hero moment" the directive names.

### The negative fence (proportion — what does NOT gain a moment)
- Body copy, the curve-gallery TABLE, the icon grid, the Section type-ladder — the legitimately-flat
  surfaces stay flat (adding motion violates restraint, the motion twin of the one-color-event rule).
- No surface gains TWO competing motion events (a card that count-ups does not ALSO bounce-in; pick
  the load-bearing one).
- Every moment is PRM-clean by routing through the existing gated facilities — the wave must NOT
  hand-roll a single rAF/keyframe that the substrate doesn't already PRM-guard.

---

## Part 6 — the abstraction the directive asks for ("abstract out")

The map above is achievable with ZERO new primitives — but there IS one idiomatic abstraction the
gap reveals: a **page-enter chassis seam**. Right now each of the ~90 stories would have to opt into
reveal individually. The gestalt remedy is to put the page-enter + section-stagger ONCE in the story
chassis (`StoryPage`/`StorySection` setting the `[data-scroll-reveal]`/`vReveal` hooks on their
slots), so a story gains the moment by composing the chassis it already composes — the same
"mint-once-in-the-primitive, every consumer inherits" pattern as AZ.W-HIERARCHY. This is demo-private
(the chassis lives in `demo/stories/`), so it is not a library-surface change; the LIBRARY engines it
drives are already public and shipped.

---

## Summary for synthesis

The animation **substrate is complete and in-doctrine** — five role-mapped spring registers, the §6
easing doctrine, the native scroll-driven + view-transition facilities, and the reveal/stagger/countup
engines all ship and are PRM-gated. The defect is **pure non-consumption**: every facility is a
demo-of-itself with ZERO real-surface consumers, and the page-enter / scroll-progress / count-up /
list-VT / hero moments are entirely absent (live-proven — content hard-cuts in on every route). The
wave is a WIRING wave, not an authoring wave: a page-enter chassis seam (Tier A), a shell
scroll-progress bar (Tier B), metric count-up on the audacious numbers (Tier C), list/route VT on the
data surfaces (Tier D), and a hero one-shot (Tier E) — all through the existing engines, all
PRM-clean, all proportion-fenced (one motion event per surface), with the de-disco'd glass-hover
register (lane disco-hover) as the rest baseline.
