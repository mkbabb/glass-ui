# BG audit — D: the scroll-shrink titles + the aberrative top bar

Two defects from the live brief:
- **#4** "Titles no longer scroll and shrink" (the ScrollCard / scroll-shrink-header register is dead).
- **#5** "An aberrative bar at the top of every page" (a stray gradient/metallic bar).

All claims verified against HEAD source (`master @ 998136bb`, glass-ui 4.2.0) AND the live demo on
`localhost:5173` via Playwright `getComputedStyle` + `CSS.supports` probes. Default-broken skepticism
applied: I assumed both registers were broken and proved the actual state.

---

## FINDINGS

### A. The aberrative top bar IS the route scroll-progress bar painting full-width (CONFIRMED LIVE)

The bar at the top of every content column is `<div class="demo-scroll-progress scroll-progress">`
(`demo/layout/AppShell.vue:393`). Live readback on EVERY page (`/display/card`, `/foundations/tokens`,
`/display/buttons`):

```
.demo-scroll-progress {
  transform:         "none"            // == scaleX(1) == FULL WIDTH
  animationName:     "gl-scroll-grow"  // the recipe DID bind (engine supports it, PRM no-pref)
  animationTimeline: "auto"            // ← the scroll() drive SILENTLY FAILED to bind
  opacity:           "0.85"
  width:             "1045px"          // full content-column width
  height:            "2px"
  rect:              { top:40, left:123, width:1045, height:2 }
  background: linear-gradient(90deg, oklab(.216 …/.9), rgb(28,25,23))  // light: dark warm ink
}
```

The bar is supposed to be a 0→1 `scaleX` fill driven by the route scroller; instead it paints a
full-width 2px opacity-0.85 hairline at the top of every page, because the `animation-timeline`
resolves to `auto` (no timeline → `gl-scroll-grow`'s `from { scaleX(0) }` never binds → the element
sits at native `transform: none` = `scaleX(1)` = full width).

**Why the timeline fails — the smoking gun (`CSS.supports` proof):**

```
CSS.supports('animation-timeline', 'scroll(--demo-main-progress block)')  → FALSE   (invalid!)
CSS.supports('animation-timeline', '--demo-main-progress')                → TRUE    (the correct form)
CSS.supports('animation-timeline', 'scroll(root block)')                  → TRUE
```

The recipe (`src/styles/scroll-driven.css:45`) hardcodes:
```css
animation-timeline: scroll(var(--scroll-progress-scroller, root) block);
```
The `scroll(<scroller> <axis>)` function accepts ONLY the scroller KEYWORDS `nearest | root | self`
as its scroller — NOT a named `<dashed-ident>` timeline. But the demo bar
(`demo/layout/dock-nav.css:230-231`) overrides:
```css
.demo-scroll-progress { --scroll-progress-scroller: --demo-main-progress; … }
```
so the recipe expands to `scroll(--demo-main-progress block)` — **invalid CSS → the whole
`animation-timeline` declaration is dropped → falls back to `auto`**. Setting the bar's
`animation-timeline` to `--demo-main-progress` (the named-timeline reference form) live IMMEDIATELY
resolved `transform` to `matrix(0,0,0,1,0,0)` = `scaleX(0)` at scroll-top — the bar correctly
collapses to invisible. So the named-timeline binding is the single-line correctness fix.

**The token is two-mode-conflated.** `--scroll-progress-scroller` is documented
(`scroll-driven.css:33-35`) to take `root`/`self` (scroll()-function scroller keywords), and the
OTHER consumer `demo/stories/motion/scroll-vt.vue:88-89` sets `--scroll-progress-scroller: self`
→ `scroll(self block)` → **valid, works**. The `.demo-main-scroller` route case needs a NAMED
timeline (`scroll-timeline-name: --demo-main-progress` on the scroller, `dock-nav.css:201`) because
the bar is NOT a child of the scroller — it is a sticky child of the scroller's content, and a named
timeline is the only way to reach a non-ancestor scroller. The recipe's ONE `scroll(<keyword> block)`
shape cannot express both a keyword scroller and a named-timeline reference — they are syntactically
disjoint. This is an authoring-level architectural conflation, not a token-tuning miss.

**Visual confirmation:** the viewport screenshot of `/display/buttons` shows a faint dark hairline
spanning the full top edge of the content column under the dock rail. In dark mode the gradient ink
is `--primary: oklch(0.739 0.134 318.1)` (the legendre-violet) — a violet full-width bar, the
"metallic/aberrative" read (`src/styles/tokens/dark-arm.css:92`).

**Not the bar but adjacent:** `.story-page-article > header > .story-hero-cluster::after`
(`demo/stories/story-hero.css:281`) is a legitimate 1px chrome divider UNDER the masthead (φ gap
below the cluster, its own `chrome-rule-strike` animation) — it is NOT the top-edge defect.

### B. The scroll-shrink title register WORKS when the page renders — the defect is mostly upstream + architectural fragility

There are THREE distinct scroll-shrink mechanisms at HEAD. I probed each live.

**B1 — Page-title scroll-shrink (`.story-hero-shrink` / `.story-hero-scroll-away`) WORKS on a
rendered content page.** On `/display/buttons` (a `variant="page"` StoryPage, hard-loaded to bypass
the routing freeze):
```
.story-hero-shrink: position:sticky top:0, animationName:"story-hero-shrink", animationTimeline:"scroll()", range:"0px 160px"
  atTop      → transform: scale(1)
  atScroll300 → transform: scale(0.82) translateY(-3.28px)   ✓ the title shrinks correctly
```
The content-page register (`StoryPage.vue:121-145`, `v-if="variant === 'page'"`) and the hero-page
`.story-hero-scroll-away` register (`StoryHero.vue:355,413`) are wired and functional. Both bind the
IMPLICIT `animation-timeline: scroll()` (nearest-ancestor scroller = `<main>` `.demo-main-scroller`),
gated under `@supports (animation-timeline: scroll()) and prefers-reduced-motion: no-preference`
(`story-hero.css:456-531`).

**So why does the user see "titles no longer scroll and shrink"?** Three compounding causes:
1. **The routing freeze (defect #1) starves rendering.** Navigating in-app lands on a stale page
   (`/foundations/intro → /substrates`, the leaving page never unmounts). A page that never mounts
   has NO title cluster — `which:"NONE"` on `/foundations/intro` and `/foundations/tokens` (the
   latter `mainOverflows:false`, no `<h1>`, `mainChildCount:2`). The shrink is "dead" because the
   page is dead.
2. **Landing routes have no shrink register by design.** Category landings (SectionLanding) are not
   StoryPages — they carry no `.story-hero-shrink`. A user clicking through the nav sees landings +
   broken pages, never the working content-page shrink.
3. **The register is architecturally fragile.** The cluster (`.story-header-cluster
   .story-hero-cluster .story-hero-shrink`) stacks THREE concerns on ONE wrapper and pairs
   animations POSITIONALLY by comma index across the entrance + scroll timelines. Live the eyebrow
   child runs `animation-name: "story-hero-cluster-rise, story-hero-subordinate-fade"` with
   `animation-timeline: "auto, scroll()"` — two animations comma-paired so the document-timeline
   entrance and the scroll-timeline fade do not clobber each other. This works today but is exactly
   the brittle multi-timeline-on-one-element seam the CONTEXT brief flags as the route-transition
   contrivance (`.scroll-build` mount animation vs `<Transition>` collision). Any future
   animation-shorthand edit silently de-pairs the timelines.

**B2 — The `<ScrollCard>` / `<ScrollCardHeader>` card-local scroll-shrink WORKS in isolation.** On
`/display/card` the `<ScrollCard>` (`src/components/ui/card/ScrollCard.vue`) hosts an internal
288px-bounded scroll-port (`overflow-y:auto`, `max-block-size:18rem`) emitting `--card-scroll`
(`.card-scroll-host`, `src/styles/utilities/base-misc.css:210-213`). Live:
```
[data-slot=scroll-card]: scrollTimelineName:"--card-scroll", overflows: 1284 > 286
header: animationName:"card-header-shrink-547f2311", animationTimeline:"--card-scroll"
title:  animationName:"card-title-shrink-…",         fontSize:"38.4px" (display-1 hero rung)
  scrollTo(200) → title transform scale(0.695), desc opacity 0   ✓ shrinks + retires
  scrollTo(600) → holds scale(0.695)                              ✓
```
The CardHeader 4-lane choreography (`CardHeader.vue:214-293` — compositor-safe translateY/scale/
opacity/`::before` bg-lift, BB.W-CARD-COMPOSITE) fires correctly. **BUT this is a card-local scroll
port** — you scroll WITHIN a 288px card, not the page. It is the WRONG model for the user's "page
titles shrink as the page scrolls" expectation. It is a niche demo on `/display/card`, not the
page-title register the user means.

**The register fragmentation is the real architectural smell.** There are now THREE scroll-shrink
systems with THREE separate keyframe families + THREE timelines:
- `--card-scroll` (card-local port) → `card-header-shrink` / `card-title-shrink` / `card-desc-shrink`
  / `card-header-bg-lift` (`CardHeader.vue`).
- `scroll()` implicit (`<main>` route) → `story-hero-shrink` (content page, `story-hero.css:493`).
- `scroll()` implicit (`<main>` route) → `story-hero-scroll-leave` (hero page, `story-hero.css:465`).
Plus `story-hero-subordinate-fade` + `chrome-rule-strike` + the `.scroll-build` page-build entrance
+ the broken `.scroll-progress` bar. Each re-derives the same iOS-27 "large-title collapses as you
scroll" idiom with its own keyframes, its own range tokens, its own timeline-binding strategy. This
is a DRY violation and the surface where the routing-transition layer destabilizes the whole thing.

---

## ROOT CAUSES

**RC-1 (the top bar) — a syntactically invalid `animation-timeline` from a two-mode-conflated
token.** `scroll-driven.css:45` wraps `--scroll-progress-scroller` in `scroll(… block)`, but a named
timeline (`--demo-main-progress`) is NOT a legal `scroll()` scroller — it must be referenced directly
as `animation-timeline: --demo-main-progress`. The token overloads "scroll() scroller keyword"
(`root`/`self`) and "named timeline ident" into one var that the recipe can only express the first
way. The invalid value → `auto` → the scaleX(0) `from` never binds → the bar paints full-width
`scaleX(1)` at the route-scroller's primary ink color (dark-warm in light, legendre-violet in dark).
A headless gate never caught it because the recipe is syntactically present and the keyword form
(`scroll-vt.vue`) works — only the live named-timeline route reveals the `auto` fallback (the classic
headless-green / visually-broken gap).

**RC-2 (the titles) — the register is correct but (a) starved by the routing freeze, (b)
fragmented across three parallel scroll-shrink systems, and (c) brittle via positional multi-timeline
comma-pairing on shared wrappers.** The mechanism is not "dead"; it cannot reliably PAINT because the
pages do not render (defect #1) and because the page-title collapse, the card collapse, and the
hero scroll-away each re-implement the same idiom independently. The user's "no longer scroll and
shrink" is the gestalt verdict over a fleet of pages that mostly don't mount + a register no single
artifact owns.

---

## PROPOSED WAVES

### `BG.W-SCROLL-PROGRESS-RAIL` — kill the full-width bar; ONE correct named-timeline progress rail

- **Intent:** the route scroll-progress bar reads as a 0→1 compositor fill that is INVISIBLE at
  scroll-top and grows with the page — never a full-width hairline at rest.
- **Approach (idiomatic, first-principles):** split the conflated token into the TWO genuine modes
  the platform exposes, OR collapse to the one mode the route actually needs. The clean break:
  re-author `.scroll-progress` (`src/styles/scroll-driven.css`) to bind `animation-timeline:
  var(--scroll-progress-timeline)` as a NAMED-TIMELINE reference (the form `CSS.supports` proves
  valid), and have consumers name a `scroll-timeline-name` on their scroller (the
  `.demo-main-scroller` already declares `--demo-main-progress`). The self/root keyword cases
  (`scroll-vt.vue`) move to their own thin recipe arm or a `scroll-timeline: <name> block` on the
  inner scroller (it already does `style="scroll-timeline: --sp block"` — so it can name + reference
  the same way, retiring the `scroll(<keyword>)` branch entirely → ONE binding strategy, no two-mode
  token). Drop the dead `--scroll-progress-scroller` token + its `scroll(… block)` wrapper (clean
  break, no alias — no-legacy). Keep the rest-state guard honest: the bar's terminal-rest must be
  `scaleX(0)` (the recipe's `from`), not a painted `opacity:0.85` full-width hairline — and the
  `opacity:0.85` "affordance even before scroll" intent (`dock-nav.css:237`) is re-expressed as a
  faint-but-SHRUNK rail (scaleX origin-left fill from 0) so a non-supporting engine renders nothing
  (correct fallback), not a full bar. Carry weight: a tiny spring-eased trailing glint on the fill
  edge (compositor-only) so the rail reads liquid, not mechanical.
- **Files:** `src/styles/scroll-driven.css` (recipe), `demo/layout/dock-nav.css` (`.demo-scroll-
  progress` consumer + the `--demo-main-progress` naming), `demo/stories/motion/scroll-vt.vue` (the
  `self` consumer re-points to its own named timeline), `demo/layout/AppShell.vue` (the div comment).
- **π / acceptance bar:** live `getComputedStyle(bar).animationTimeline` resolves to a real timeline
  (NOT `auto`) on EVERY route; at `scrollTop:0` the bar's `transform` is `scaleX(0)` (invisible);
  at 50% scroll the fill is ~50% width; `CSS.supports` of the emitted `animation-timeline` value is
  `true`; both modes. A device-free gate asserts no `.scroll-progress` recipe emits
  `scroll(<dashed-ident>)` (the invalid form) anywhere in the corpus + a self-test bite.
- **Folds:** the chronic two-mode `--scroll-progress-scroller` conflation; the headless-green miss
  class for invalid-CSS-falls-to-auto.

### `BG.W-SCROLL-SHRINK-UNIFY` — ONE owned page-title collapse register; retire the three forks

- **Intent:** the iOS-27 large-title-collapse is ONE first-class, library-owned register every page
  and the ScrollCard share — the title shrinks-in-place as its scroller advances, with weight,
  exactly once-defined.
- **Approach (gestalt, KISS+DRY):** factor the collapse into ONE source of truth — a single keyframe
  family (`translateY` + `scale` + coupled `opacity`, compositor-only) parameterized by range tokens,
  bound via ONE timeline-reference strategy (named timeline on the scroller, referenced by the
  collapsing element — the same binding `BG.W-SCROLL-PROGRESS-RAIL` lands). The three current forks
  collapse onto it: (1) `.story-hero-shrink` (content page) + (2) `.story-hero-scroll-away` (hero
  page) become two RANGE/direction presets of the ONE register (shrink-and-stick vs feather-away),
  not two keyframe families; (3) the `<CardHeader shrink>` lanes (`card-*-shrink`) READ the same
  collapse primitive scoped to `--card-scroll` instead of re-minting `card-header-shrink` /
  `card-title-shrink` — the card port and the page scroller drive the SAME choreography on different
  timelines. Eliminate the positional multi-timeline comma-pairing brittleness: the entrance (the
  `.scroll-build` / `story-hero-cluster-rise` page-build, owned by the route-transition wave) and the
  scroll-collapse must NOT share an element's `animation` shorthand — separate the entrance onto the
  child cluster and the collapse onto a dedicated wrapper, so neither can de-pair the other. This
  wave DEPENDS on defect-#1's route-transition rework (the pages must mount before the shrink can
  paint) — sequence it AFTER the routing/transition wave.
- **Files:** `demo/stories/story-hero.css` (the two hero registers → presets of the unified family),
  `src/components/ui/card/CardHeader.vue` + `ScrollCardHeader.vue` (read the shared collapse
  primitive), a new collapse-register home in `src/styles/scroll-choreography.css` (the library owns
  the idiom; the demo presets ride it — presets-in-consumers), `demo/stories/StoryPage.vue` /
  `StoryHero.vue` (class wiring), `src/styles/utilities/base-misc.css` (`--card-scroll` host kept).
- **π / acceptance bar:** ONE keyframe family drives all three surfaces (a gate asserts the card +
  page collapse share the same `@keyframes` source, no parallel `card-title-shrink` /
  `story-hero-shrink` duplicates); live: on a content page the title scale goes 1→~0.82 across the
  first ~160px of `<main>` scroll; on a hero page the title feathers opacity 1→0 + lifts; on a
  ScrollCard the title scale goes 1→0.695 across the card port; the entrance + collapse never share
  an element's animation shorthand (no positional comma-pairing); compositor-only (`proof:no-layout-
  animation` stays green); PRM → static terminal; both modes; both Chrome + Safari (named-timeline
  reference is Baseline). DEFERS on `BG.W-ROUTE-TRANSITION` (defect #1) landing first.
- **Folds:** the three-scroll-shrink-system DRY chronic; the `.story-hero-shrink` vs
  `.story-hero-scroll-away` split; the brittle multi-timeline-on-one-wrapper seam the brief flags.

---

## Cross-references / dependencies

- **Hard dependency on defect #1 (routing freeze).** `BG.W-SCROLL-SHRINK-UNIFY` cannot be
  acceptance-verified until pages mount reliably — the shrink is downstream of the route-transition
  rework. Sequence: route-transition wave → scroll-shrink-unify.
- **`BG.W-SCROLL-PROGRESS-RAIL` is independent** and can land first (a self-contained CSS-binding
  fix); it also de-risks the timeline-binding strategy that `BG.W-SCROLL-SHRINK-UNIFY` adopts.
- The `--primary` ink the bar paints is the legendre-violet in dark mode (`dark-arm.css:92`) — if
  the brand-metal / red-cast wave (defect #3) re-tunes ink, the rail's gradient re-resolves through
  it for free (the rail reads `--primary`, no hardcode).
