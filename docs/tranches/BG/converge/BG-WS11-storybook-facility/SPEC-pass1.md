# BG-WS11-storybook-facility — SPEC-pass1

Storybook facility: a FUNCTIONING thick glassy scroll-progress bar · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API component family every page composes · consistent per-category suffusal.
Both modes, Chrome AND Safari, real-paint is the gate.

---

## 0. SEQUENCING — WS11 ELEVATES, it does not re-fight (binding)

WS11 is the storybook *apotheosis* layered on top of three landed workstreams.
It ABSORBS their outcomes and HARD-depends on them; it must NOT re-propose, re-fix,
or re-mint what they own.

| Owns | Workstream | The fact WS11 consumes |
|---|---|---|
| Route transition + scroll-progress CORRECTNESS + hero-fit + the field | **WS1** | bare keyed `<component :is :key=route.path class=route-enter>` swap (NO `<Transition>`); `.scroll-build` RETIRED wholesale; `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` KEPT; `.demo-scroll-progress` corrected to `--scroll-progress-timeline: scroll(nearest block)` + UNCONDITIONAL `transform: scaleX(0)` rest; `proof:ba-animate` hardened to read COMPUTED `animation-timeline !== 'auto'`; `scroll-vt.vue` reserved named-timeline + `timeline-scope`; ONE shell `<Aurora>` with per-route `warmFieldHue` + `--field-h` |
| Chassis consolidate + scroll-shrink + D14 | **WS4** | `DemoFrame.vue`/`demo-frame.css`/`StorySectionHeader.vue` DELETED (zero-importer); `ShowcaseFrame` is THE demo-cel chassis; D14 cascade-columns fixed to `%`-off-`--col` (`scroll-choreography.css:236`); `@keyframes title-collapse` shared scale leg; `Code.vue` the surviving code primitive |
| Glass-deep apotheosis | **WS8** | `--glass-blur-deep-*` / `.glass-deep` / `--glass-depth` deep tier + lensing the bar's "glassy" CONSUMES |

**WS11 cannot land before WS1 (#1 route, #2 field, #3 scroll-progress-rail, #6
hero-fit), WS4 (chassis-consolidate, scroll-shrink-unify/D14), and WS8 (glass-deep)
are green.** The sequencing is the backbone — every wave below names its precondition.

---

## 1. GESTALT GOAL

The storybook reads like a single, coherent iOS-27 document system, not a pile of
ad-hoc pages:

- **A FUNCTIONING glass progress rail** at the top of every route — a thick
  (~8-12px) frosted RECESSED CHANNEL with a luminous warm→route-hue fill that
  tracks scroll LIVE (the iOS-27 Control-Center-slider gestalt, `cc_tiles_detail.png`),
  with a springing leading glint. The D5 "aberrative full-width slab" is dead by
  WS1; WS11 makes the corrected bar *beautiful and integrated*. Depth + separation
  read it as floating glass above content (Apple's iOS-27 "diffuse + more
  separation" tuning), NOT a 2px hairline.
- **Sections that TYPEWRITER and FADE UP on scroll-entry**, with liquid weight —
  section headings reveal per-glyph (a calm typewriter-wipe) as they cross into
  view; bodies lift+fade on their own `view()` timeline. On the spring clocks
  (`--spring-smooth`/`--spring-snappy` + the matching `-duration`), never linear.
  PRM-safe by construction (text never vanishes); CLS≈0 (no per-glyph reflow).
- **ONE standardized page-API family** — `StoryPage`/`CategoryPage`/`ComponentPage`/`SubPage`
  over a shared `StoryPageShell` core, mapped onto the EXISTING `StoryDepth`
  D0-D3 ladder (depth IS size, the √φ display ladder). Supersedes the ad-hoc
  `StoryPage`-variant-branching + the parallel `SectionLanding` one-off. Clean
  break, no legacy alias.
- **Consistent suffusal** — ONE `--field-h` route hue threaded through every
  member: the field bg, the progress-bar fill, the section eyebrow/rail/IconChip
  POP all read the SAME category color event (the one-color-event rule). No page
  reads gray/flat; warm-cream identity, body ink untinted; both modes.

The four arms are ONE system: the page-API family is the chassis the bar and the
entrances and the suffusal all hang off.

---

## 2. MECHANISM (concrete, idiomatic)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

**Why a thickened scaleX bar is a LIE and is forbidden.** Three falsifiers (risk
agent, confirmed): (a) `scaleX(0→1)` on a thick pill squashes its end-caps to
ellipses and at `scaleX(0)` there is no visible TRACK (the channel a glassy bar
needs); (b) `backdrop-filter` on a 2-10px strip blurs a negligible backdrop area
→ "glassy" reads invisible — a thin bar's glass is RIM + TINT + SPECULAR, not
blur, so WS8's 16px deep-blur is wasted on a strip; (c) `proof:no-layout-animation`
forbids animating `width`/`height`, so a track/fill cannot GROW by box dimension.

**The honest architecture — TRACK + clip-revealed FILL, a clean break from the
library `.scroll-progress` scaleX recipe.** The demo bar STOPS composing the
library `.scroll-progress` class (which scales the whole element) and becomes a
self-contained thick glass structure in `demo/layout/dock-nav.css`:

```
.demo-scroll-progress {                       /* the TRACK — always visible */
    position: sticky; inset-block-start: 0; z-index: 1; pointer-events: none;
    block-size: var(--scroll-rail-thickness, 0.625rem);   /* √φ-proportioned, ~10px */
    margin-block-end: calc(-1 * var(--scroll-rail-thickness));  /* reserve, no CLS push */
    border-radius: var(--radius-pill);
    overflow: clip;                            /* the caps belong to the TRACK clip */
    /* recessed frosted GLASS channel — consume the WS8 tier tokens, NOT backdrop:url() */
    background: var(--glass-bg-quiet);
    backdrop-filter: blur(var(--glass-blur-quiet)) saturate(1.1);
    box-shadow:                                /* inner-shadow GROOVE + separation lift */
        inset 0 1px 2px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 1px 3px color-mix(in srgb, var(--shadow-color) 24%, transparent);
}
.demo-scroll-progress__fill {                  /* the FILL — clip-revealed, undistorted caps */
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
        oklch(from var(--card) l c h) 0%,                  /* warm-cream start */
        oklch(0.78 0.13 var(--field-h, 60)) 100%);         /* → route hue (suffusion) */
    /* the FILL is revealed left→right; the gradient is painted at full width so the
       hue maps to POSITION (no scaleX stretch). clip-path is compositor-safe
       (proof:no-layout-animation ALLOWS it). */
    clip-path: inset(0 calc(100% - var(--scroll-fill, 0%)) 0 0 round var(--radius-pill));
    /* top specular catch-light */
    border-block-start: 1px solid color-mix(in srgb, white 28%, transparent);
}
```

**The drive — `@property --scroll-fill: <percentage>` on the native scroll()
timeline.** Register `@property --scroll-fill { syntax: "<percentage>";
inherits: false; initial-value: 0%; }` in demo CSS (demo-private; not a library
token). The fill animates 0%→100% on `scroll(nearest block)` — the SAME timeline
seam WS1 corrected:

```
@supports (animation-timeline: scroll()) {
    @keyframes gl-scroll-fill { from { --scroll-fill: 0%; } to { --scroll-fill: 100%; } }
    .demo-scroll-progress__fill {
        animation: gl-scroll-fill auto linear;
        animation-timeline: var(--scroll-progress-timeline, scroll(nearest block));
    }
}
```

**THE PRM/Safari RESOLUTION (the D5 root-class fix).** The fill is an
INFORMATIONAL position cue (the FadingScroll "discrete-survives" precedent), NOT
vestibular motion — so it MUST track under PRM and on Safari<26. Therefore the
fill drive sits under `@supports` ONLY, NOT under `@media (prefers-reduced-motion:
no-preference)` (that no-preference-only gating is the exact D5 "dead/empty bar
under PRM" root cause). The JS fallback (`useScrollProgress` over the ONE
`createScrollReader`, rAF-coalesced, unmount-cleaned) writes `--scroll-fill`
directly when `supportsScrollTimeline()` is false — dual-path single-writer, no
double-write. It also runs under PRM. The ONLY thing PRM drops is the springing
GLINT (the vestibular liquid extra):

```
.demo-scroll-progress__glint {                 /* leading-edge springing cap glow */
    /* a small radial glow pinned at the fill's leading edge; springs on
       --spring-snappy as the fill catches up. THIS is where the liquid-weight
       law lives — the FILL stays 1:1 truthful (off-main-thread on Safari 26.4's
       threaded scroll() compositor), the GLINT carries the inertia. */
}
@media (prefers-reduced-motion: reduce) { .demo-scroll-progress__glint { display: none; } }
```

**The liquid-weight TENSION, resolved explicitly (record in the wave):** a
progress FILL that lags/overshoots is a LIE about scroll position AND would force
the bar off Safari-26.4's threaded compositor onto a JS spring. So the FILL is
1:1 truthful; the liquid weight lives in (a) the springing leading glint, (b)
WS1's `.smooth-scroll` momentum, (c) the section entrances. The bar's GLASS reads
liquid; its POSITION reads true.

**Dark arm:** the track edge + transmission carry the silhouette (W-DARK-MATERIAL);
plain per-mode token pairs only — NO `light-dark()` inset-shadow fragment (the
trap computes the whole `box-shadow` to `none`).

### 2B. Section typewriter + fade-up entrances (BG.W-SECTION-TYPEWRITER-FADEUP)

**The category-mismatch DEFT decision (the falsifier the spec must resolve).**
`useTypewriter` (a 413-line stochastic async sleep-loop with typo simulation)
autostarts `onMounted`, NOT IntersectionObserver-gated → N below-fold sections
type INVISIBLY at load and are finished before the user arrives. It also grows
the heading width per char (real per-char reflow → CLS). It is the WRONG tool for
section headings. The CSS `.char-stagger` recipe is ALSO mount-triggered (document
timeline) → same below-fold invisibility. And a native `view()` timeline CANNOT
express a per-glyph stagger (each glyph needs its own entry range). Resolution:

- **Section HEADINGS → `<SplitChars>` + a shared IntersectionObserver gate** (the
  calm typewriter-WIPE). `SplitChars` (engine-free, root-safe, a11y: `aria-label`
  = full text, glyphs `aria-hidden`) mints `.char` spans + `--char-index`/`--char-total`.
  The per-glyph reveal is a `[data-revealed]`-gated CSS animation so it fires on
  the section's CROSSING, not at mount. The text is STRUCTURAL (always present,
  laid out once) → never vanishes (PRM-safe), no per-char reflow (CLS≈0):

  ```
  .story-section__heading .char { opacity: 0; transform: translateY(0.4em); }
  @media (prefers-reduced-motion: no-preference) {
      [data-revealed] .story-section__heading .char {
          animation: gl-char-rise var(--spring-smooth-duration) var(--spring-smooth) both;
          animation-delay: calc(var(--char-index) * var(--char-stagger-step, 24ms));
      }
  }
  @keyframes gl-char-rise { from { opacity:0; transform:translateY(0.4em);} to {opacity:1; transform:none;} }
  /* PRM: no animation binds → the .char rests... so the PRM REST must be visible: */
  @media (prefers-reduced-motion: reduce) {
      .story-section__heading .char { opacity: 1; transform: none; }   /* terminal, text shown */
  }
  ```

- **Section BODIES → the existing `.scroll-cascade`** (per-child `view()` timeline,
  the WS4-D14-FIXED cascade, the `--ease-scroll-spring` liquid-weight twin). NO new
  keyframe set. On Safari<26 (no `view()` timeline) the body rests terminal
  (visible); the same shared IO supplies the fade-up class as the universal
  fallback where `view()` is absent.

- **Metric/number values → `useCountup`** (imported from `@mkbabb/glass-ui/motion`,
  keyframes-bearing — NEVER the root barrel; the SCC-trap fence). Wire on metric
  surfaces only.

**The ONE shared scroll-reveal orchestration (single-reader, DRY, no Lenis/GSAP).**
ONE IntersectionObserver composable (reuse the shipped IO-gated `useStaggerReveal`
or `vReveal`; do NOT mint a 4th `addEventListener("scroll")`) toggles `[data-revealed]`
on a section when it crosses ~15% into view. It drives BOTH the heading per-glyph
reveal AND the body fade-up fallback on non-`view()` engines. ONE observer batches
all sections.

**The entrance-register saturation discipline (the animation-shorthand double-bind
trap).** An element carries ONE `animation` shorthand; the page already stacks 8+
registers and `story-hero.css` already comma-stacks two with fragile positional
timeline pairing. So: the section ROOT binds `.scroll-cascade` (body fade-up via
`view()`); the heading is a DESCENDANT whose `.char` spans carry their OWN
`gl-char-rise` animation. **No node double-binds** — the cascade is on the section,
the per-glyph is on the `.char` descendants (the disjoint-wrapper/children precedent
from `story-hero.css`). The IO sets `[data-revealed]` on the section; nothing on a
single node binds two competing `animation`s.

**`useTypewriter` is reserved for the front-door HERO ONLY** (the D0 `StoryPage`
hero, a single above-the-fold heading that can afford the stochastic engine). It
is NEVER applied to a section heading (overfit hero engine; the wrong tool for N
below-fold sections). `proof:demo-design` D4 anti-fork bite stands — no demo-local
re-fork of the matcher or the stagger.

### 2C. The standardized page-API family (BG.W-STORY-PAGE-API)

**ONE shared core + thin named members over the EXISTING depth ladder.** The
`StoryDepth` D0/D1/D2/D3 ladder + `assignDepths()` + the √φ `HeroScale` ladder
ALREADY exist (`manifest.ts:41-44,434`); the family FORMALIZES them into a named
component-set — it does NOT re-invent the depth model.

```
StoryPageShell.vue   ← the shared CORE. Owns the SINGLE <article class="route-enter">
                       root, the colocated <StoryHeroBackdrop> (carved from StoryHero's
                       6-way substrate switch), the gravity header cluster (LIFTS WS1's
                       de-duped StoryHeader: eyebrow → Fira-Code subpath chip → audacious
                       √φ title → blurb), the .scroll-cascade body wiring, the section
                       system (StorySection + the 2B reveal), the --field-h suffuse thread,
                       and the progress-rail integration. Props: depth, heroScale, background,
                       + the body-layout slot.
  ├─ StoryPage.vue      (D0) — front-door hero. heroScale "mega"/"audacious". Full-bleed live
  │                            backdrop. The lone front door (foundations/intro). May host the
  │                            front-door useTypewriter hero title.
  ├─ CategoryPage.vue   (D1) — category landing/index. The SectionPreviewCard BENTO grid
  │                            (FOLDS SectionLanding.vue, deleted). heroScale "mega". One-GL
  │                            budget: FROZEN preview stills, never N live canvases.
  ├─ ComponentPage.vue  (D2) — single-component doc. Hero card + sections + demo cels
  │                            (ShowcaseFrame) + the optional #source code slot. heroScale "5".
  └─ SubPage.vue        (D3) — nested sub-variant. Smaller hero (heroScale "4"). The "depth IS
                               size" smallest rung; sections + cels, no bento.
```

**The distinguishing axis is concrete (closes the "ComponentPage vs SubPage
under-specified" trap):** depth → `heroScale` (the √φ size rung) + the BODY layout
(D0 = pure hero / D1 = bento grid / D2 = sections+cels+source / D3 = nested
sections). The shared CORE handles the 90%; each member picks its depth + body
layout. The members are genuinely thin (configuration over the shell), so this is
DRY (one core, no duplicated layout), not a fork.

**The single-route-root invariant (the route-wedge falsifier).** The bare-swap
route transition (WS1) requires each routed root present EXACTLY ONE element. The
shared `StoryPageShell` renders the single `<article class="route-enter">`; every
member delegates to it, so the route stays single-root by construction (no
fragment, no `TooltipProvider`-as-root — the prior `StoryPage.vue:64` bug stays
fixed). `proof:route-single-root` (WS1, re-scoped hygiene) stays green.

**Depth→member selection.** Depth is catalog-position-derived (`assignDepths()`),
so the manifest/router owns the member choice. The router (`demo/router.ts`)
resolves the manifest depth and mounts the depth-correct member, passing the
story body as a slot/component. The 124 `<StoryPage>` compositions migrate in ONE
clean break (manifest-driven, mechanical; no alias). `proof:story-page-api`
asserts every routed page composes exactly one named member (no raw chassis
triplet survives).

**Colocation + the 500-line law.** `StoryHero.vue` (432L, monolith) collapses into
`StoryPageShell` + the colocated `StoryHeroBackdrop.vue` (the 6-way backdrop switch).
`story-hero.css` (717L, over the bound) splits into colocated partials AND drains
its bespoke entrance keyframes (`story-hero-title-rise`/`cluster-rise`/`subordinate-fade`)
by wiring the hero entrance onto the shared 2B primitives (SplitChars for the
title, the gravity cluster on the spring clocks). DRY win + the monolith drops.

### 2D. Storybook suffusal consistency (BG.W-STORYBOOK-SUFFUSE)

The smallest, most-integrated arm — a consistency LAYER, not new machinery. WS1
owns the FIELD (one shell aurora + `warmFieldHue` + the `--field-h` register).
WS11 READS the field hue and threads it CONSISTENTLY through the page-API chrome:

- the progress-bar fill reads `--field-h` (§2A);
- each section's eyebrow/rail/IconChip POP reads the per-category
  `--section-label-accent` (the `.section-label--tinted` register), threaded by
  `StoryPageShell` so a category reads ONE coherent color event across all its
  pages (no per-page bespoke);
- `StorySection` gains a default-on section accent so headings aren't un-suffused;
- fix the WS4-flagged warm-not-gray seam (`SectionPreviewCard --card-field-h`
  reads desaturated-gray) by re-pointing onto `--field-h`.

**Fences (preserved):** ONE color event per surface (`proof:suffuse` d1 body-ink-
untinted, d2 chip≤glyph, d3 ≤1 tinted-event-family/surface); the bar-as-page-chrome
is EXEMPT from the one-color-event content-surface count (state it, don't assume);
warm-cream identity; `--motion-accent` purple demo-local (presets-in-consumers,
never a library token); both modes, dark-recalibrated washes (BA.W-STAGE). The
binding bar is a fresh per-page gestalt capture (no gray/flat pages), not a
source-green claim.

---

## 3. FILES TOUCHED

### BG.W-SCROLL-PROGRESS-GLASSY (⇐ WS1 #3 green + WS8 glass-deep)
- `demo/layout/dock-nav.css` — rebuild `.demo-scroll-progress` as the thick glass
  TRACK + `__fill` (clip-revealed, `--scroll-fill` on `scroll(nearest block)`) +
  `__glint` (springing, PRM-dropped). Drop the library `.scroll-progress` class
  from the bar element. Register `@property --scroll-fill` (demo-private). Consume
  `--glass-bg-quiet`/`--glass-blur-quiet`/WS8 deep tokens + `--field-h`.
- `demo/layout/AppShell.vue` — wire `useScrollProgress` (the shipped JS fallback)
  to write `--scroll-fill` on the bar when `supportsScrollTimeline()` is false
  (dual-path single-writer, unmount-cleaned).
- `scripts/proof-ba-animate.mjs` (or `proof-scroll-motion.mjs`) — EXTEND with the
  thickness + glass-token-consumption asserts + the bar paint-π (fill 0% at
  scroll-top, grows on scroll via `getAnimations()[0].currentTime` + bbox/clip
  delta). (The COMPUTED `animation-timeline !== 'auto'` teeth are WS1's; WS11
  extends, does not re-author.)

### BG.W-SECTION-TYPEWRITER-FADEUP (⇐ WS1 `.scroll-cascade` kept + WS4 D14 fix)
- `demo/stories/StorySection.vue` — add the default-on `revealHeading` behavior:
  wrap the `<h2>` heading in `<SplitChars>` + bind the shared IO `[data-revealed]`
  gate; the `label`/`heading`/`blurb` API stays.
- `demo/stories/section-entrance.css` (NEW, colocated) — the `[data-revealed] .char`
  reveal recipe (spring-clocked, PRM-carve to terminal-visible) + the body fallback
  fade-up class for non-`view()` engines. Drains the bespoke `story-hero.css`
  keyframes.
- `demo/stories/composables/useSectionReveal.ts` (NEW, OR reuse `useStaggerReveal`/
  `vReveal`) — the ONE shared IntersectionObserver; no 4th scroll listener.
- Metric surfaces — wire `useCountup` (import from `/motion`).

### BG.W-STORY-PAGE-API (⇐ WS1 route-enter/hero-fit/cluster-de-dup + WS4 chassis-consolidate/scroll-shrink)
- `demo/stories/StoryPageShell.vue` (NEW) — the shared core, single `<article>` root.
- `demo/stories/StoryHeroBackdrop.vue` (NEW, colocated carve from StoryHero).
- `demo/stories/StoryPage.vue` (rebuilt D0), `CategoryPage.vue` (NEW D1, folds
  `SectionLanding.vue` → DELETED), `ComponentPage.vue` (NEW D2 + `#source` slot),
  `SubPage.vue` (NEW D3).
- `demo/stories/StoryHero.vue` — collapsed into the shell + backdrop (DELETED or
  reduced to a thin re-export, clean break).
- `demo/stories/story-hero.css` — split into colocated partials; bespoke entrance
  keyframes drained onto 2B.
- `demo/router.ts` — depth→member mapping; the 124 `<StoryPage>` compositions
  migrated (mechanical clean break).
- `scripts/proof-story-page-api.mjs` (NEW) — every routed page composes exactly
  one named member; no raw chassis triplet survives; `proof:page-hierarchy`
  PH1-PH4 + `proof:hierarchy` H2-ORDER/GRAVITY/CENSUS stay green.

### BG.W-STORYBOOK-SUFFUSE (⇐ WS1 field + WS8 glass)
- `demo/stories/StoryPageShell.vue` — thread `--field-h` + `--section-label-accent`
  through the cluster + sections + bar.
- `demo/stories/StorySection.vue` — default-on section accent.
- `demo/stories/SectionPreviewCard.vue` — `--card-field-h` re-point off the
  desaturated-gray seam onto `--field-h`.
- `scripts/proof-suffuse.mjs` — per-page ledger rows for the page-API members
  (the bar-as-chrome exemption recorded).

---

## 4. WAVE BREAKDOWN (the BG.W-* set)

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** ⇐ WS1#3 + WS8. RE-ARCHITECT the demo bar to
   the thick glass TRACK + clip-revealed FILL + springing glint (NOT a thickened
   scaleX). Survives PRM + Safari<26 (informational cue, dual-path single-writer).
   Liquid weight on the glint, truth on the fill. Gate extends with thickness +
   glass-consumption + the live-scroll paint-π.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** ⇐ WS1 (`.scroll-cascade` kept) + WS4 (D14).
   Section headings per-glyph reveal via `<SplitChars>` + ONE shared IO gate (fires
   on CROSSING, not mount); bodies fade-up on the D14-fixed `.scroll-cascade`;
   metrics via `useCountup`. PRM terminal-visible, CLS≈0, no animation double-bind,
   `useTypewriter` reserved for the front-door hero only.
3. **`BG.W-STORY-PAGE-API`** ⇐ WS1 (route-enter/hero-fit/cluster-de-dup) + WS4
   (chassis-consolidate/scroll-shrink). ONE `StoryPageShell` core + 4 thin named
   members on the depth ladder; `StoryHeroBackdrop` colocation carve; `SectionLanding`
   folded into `CategoryPage`; `StoryHero`/`story-hero.css` collapsed; single
   route root preserved; `proof:story-page-api` minted. THE capstone the others
   feed into.
4. **`BG.W-STORYBOOK-SUFFUSE`** ⇐ WS1 (field) + WS8 (glass). Thread ONE `--field-h`
   route hue through every member (bar fill + section eyebrow/rail/IconChip);
   default-on section accent; fix the SectionPreviewCard warm-not-gray seam.
   One-color-event fences preserved; both modes.

**Intra-WS sequence:** 1 and 2 are independent (parallel). 3 (the page-API) lands
AFTER 1 + 2 (it composes the bar + the entrances into the shell). 4 lands LAST (it
threads the hue through the landed family). All four HARD-gate on WS1/WS4/WS8 (§0).

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

PAINT IS THE GATE. The headless-green/visually-broken trap shipped the hairline
3×; every WS11 acceptance is a FRESH LIVE capture by a NON-authoring agent on a
real GPU, Chrome AND real Safari/WebKit, `:5199`, both modes.

**Bar (BG.W-SCROLL-PROGRESS-GLASSY):**
- COMPUTED `animation-timeline !== 'auto'` on `__fill` on EVERY route (the D5
  silent-fallback class).
- fill 0% at scroll-top on every route; GROWS monotonically via
  `getAnimations()[0].currentTime` + bbox/clip-width delta (NOT `getComputedStyle`
  — unreliable for compositor scroll-linked anims on WebKit).
- the TRACK is visible at scroll-top (not a zero-width sliver); the fill caps are
  UNDISTORTED across 0→100%; the bar reads thick (≥8px) + glassy (the frost
  diffuses content behind it) + has depth (groove inset + separation lift).
- AA both modes (the fill as graphic ≥3:1).
- Safari<26 / `supportsScrollTimeline()===false`: the JS fallback writes
  `--scroll-fill` → the bar tracks (no dead/static bar).
- PRM: the fill TRACKS (informational survival); only the glint drops.
- CLS≈0 (the bar reserves its strip; never shoves content down).

**Entrances (BG.W-SECTION-TYPEWRITER-FADEUP):**
- a BELOW-THE-FOLD section's heading reveals per-glyph on CROSSING (a fresh
  scroll-through capture), NOT at load; the body lifts+fades on the same crossing.
- PRM: heading text terminal-visible (no transform, never vanishes); body terminal.
- CLS≈0 (no per-glyph width growth/reflow).
- `animation-range !== 'normal'` on `.scroll-cascade--columns > *` (the D14 fix is
  consumed, not regressed).
- a11y: the heading's accessible name is the FULL text (`aria-label`), glyphs
  `aria-hidden`; no char-by-char announcement.

**Page-API (BG.W-STORY-PAGE-API):**
- every routed page composes exactly ONE named member (`proof:story-page-api`).
- each member presents exactly ONE element route root; the bare-swap does not
  wedge (5-nav burst: `main.children.length===2`, `h1===last-dest`).
- depth→heroScale renders the √φ ladder (D0>D1>D2>D3); `proof:page-hierarchy`
  PH1-PH4 + `proof:hierarchy` H2-ORDER/GRAVITY/CENSUS green.
- one-GL-per-route preserved (category/component pages use frozen stills).

**Suffuse (BG.W-STORYBOOK-SUFFUSE):**
- a per-page gestalt capture across categories: NO gray/flat page; the bar fill +
  section eyebrow/rail read the SAME category `--field-h`; body ink untinted;
  `proof:suffuse` d1-d3 green; both modes.

**The capstone:** the `proof:ba-gestalt` BG roster verdict for the storybook
surfaces (scroll-rail · section-entrance · page-API · suffuse), re-earned on fresh
captures, Chrome AND Safari.

---

## 6. FOLDED / DEFERRED ITEMS

- **The KISS 2-component collapse** — if convergence/prototype finds ComponentPage
  (D2) ≡ SubPage (D3) with no surviving layout distinction (only heroScale differs),
  collapse them into the shell's depth-parameterization and ship `StoryPage`(D0/D2/D3)
  + `CategoryPage`(D1) — the kiss-dry 2-component reality. The shared CORE is
  invariant either way (the DRY win survives the collapse). Recorded as the open
  risk, not pre-decided.
- **The dynamic OKLCH spectrum fill** (`useBorderSpectrum`/`spectrum-walk.ts`) for
  the bar — DEFERRED. The demo bar uses a static CSS gradient (KISS, demo chrome);
  the dynamic no-trough spectrum is the BorderProgress COMPONENT's, not the bar's.
- **The `#source` code slot** (ComponentPage composing the surviving `Code` primitive)
  — SECONDARY deliverable; a DRY win (clears the code primitive's ≥2-consumer bar)
  but not load-bearing for convergence.
- **`scroll-vt.vue` bar + the legacy `[data-scroll-reveal]` migration** — WS1 owns
  it (named-timeline + `timeline-scope` reserved there). WS11 does not touch it.
- **`DemoFrame`/`StorySectionHeader` delete** — WS4 owns it. WS11 builds on the
  post-WS4 surface (ShowcaseFrame is the cel, StorySection the section).
- **`useTypewriter` on section headings** — REJECTED (category mismatch: mount-not-IO,
  per-char CLS, below-fold invisibility). Reserved for the front-door hero only.

---

## 7. OPEN RISKS

1. **2-vs-4 page-API members (KISS tension).** The kiss-dry agent argues forcefully
   for 2 components (StoryPage depth-parameterized + CategoryPage); the user asked
   for 4 by name. Spec ships 4 thin members; convergence may collapse to 2. The
   prototype must prove the shell+members render single-root + the depth ladder;
   the 2-vs-4 call is a convergence decision. **Falsifier:** if ComponentPage/SubPage
   prove byte-identical bar a heroScale, the 4-member API is a fork → collapse.
2. **The clip-path/@property fill must track on `scroll()` AND not distort caps AND
   read glassy** (prototype #1). **Falsifier:** caps distort / no visible track /
   blur reads invisible / `@property` percentage doesn't animate on the scroll
   timeline / stuck.
3. **Below-fold reveal must fire on CROSSING, not mount** (prototype #2).
   **Falsifier:** mount-triggered reveal invisible below the fold / typewriter types
   invisible text during fade / per-char reflow CLS / a node double-binds two
   `animation`s.
4. **PRM + Safari<26 dual-path survival of the bar** (prototype #4). **Falsifier:**
   the fill inherits the no-preference-only gating → dead under PRM; or the JS
   fallback double-writes with the native path; or `supportsScrollTimeline()`
   false-positives in SSR/jsdom and gates off the fallback.
5. **The 125-file page-API migration churn** — a large clean break (no alias). The
   manifest-driven mechanical rewrite must not re-introduce a fragment route root
   (the route-wedge class).
6. **Sequencing fragility** — WS11 HARD-depends on WS1 + WS4 + WS8 landing first.
   If WS1's bare-swap or scroll-progress-rail regresses, WS11's bar + entrances +
   page-API all starve. The handoff (§0) is binding; WS11 must not re-fix the bar
   timeline, re-delete DemoFrame, or re-mint glass.
7. **Entrance-register saturation** — the page already stacks 8+ animation
   registers; the disjoint-node discipline (cascade on the section root, char-rise
   on `.char` descendants) must hold or a node double-binds `animation`. Prototype #2
   verifies no double-bind.
