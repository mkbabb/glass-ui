# W-SCROLL-MOTION — DELTA (the SOTA scroll-driven choreography register)

**Freshness headers (AZ-form)**
- Capture date: 2026-06-17 (UTC)
- HEAD sha at authoring: `c426ed0b9bb18d7863be35bde1be25b419f115a9` (branch `tranche/BB`)
- Dev-box: MacBook-Pro (Apple Metal GPU — the real-GPU/CDP dev-box; the AY W-LIVE1 LOCAL-ONLY π half)
- Ground: HEAD's bare `[data-scroll-reveal]` 6px `view()` fade + the lone `.story-hero-title--enter` single title beat (no page-build, no orchestrated cascade, no scroll-pin, no smooth-scroll).

## The charge (the awwwards live-audit's one genuinely-new SOTA element)

glass-ui owned the native scroll-driven SUBSTRATE (`scroll-driven.css` `scroll()`/`view()` + the
`--demo-main-progress` named timeline + the `supportsCssTimeline` harden) but composed NONE of the
CHOREOGRAPHY — the page-load BUILD, the section CASCADE, the scroll-PINNED fixed-stage-advances-time
reveals + the smooth-scroll register. The award-winners hand-roll these on Lenis+GSAP (a 20-40KB JS
dependency); this wave ships the NATIVE register — the platform now ships `scroll()`/`view()`/
`timeline-scope` natively, off the compositor at 60fps (the no-net-dep fence; the 2026
universal-support convergence). NO Lenis/GSAP/Locomotive dependency, ever.

## What landed (the register)

`src/styles/scroll-choreography.css` (`@import`-ed after `scroll-driven.css`), four recipes on the
native substrate, all compositor-only + PRM-carved:

| recipe | mechanism | clock | PRM |
|---|---|---|---|
| `.scroll-build` | the route-enter page-build (chrome→hero→body coordinated beats on `--scroll-build-step` stagger); a `@keyframes`-on-mount entrance (NOT a scroll timeline — fires on mount, no setTimeout, never races the scroll-to-top reset) | the SPATIAL `translateY` leg rides `--spring-snappy` + `--spring-snappy-duration`; the hero beat rides the no-overshoot `--ease-out` (audacious-type-arrives-with-gravity, P1/P3); coupled opacity | explicit `(prefers-reduced-motion: reduce)` carve — fade-keeps (opacity-only), transform-DROPS (no `translateY`), no stagger (P6) |
| `.scroll-cascade` | the orchestrated section cascade — per-child `view()` timeline (the implicit stagger, NO setTimeout), the spring-clocked coupled transform+opacity build; `--scroll-cascade--inline` (horizontal) + `--scroll-cascade--columns` (opt-in grid flourish) variants | `view(block)` progress-bound, the coupled `gl-cascade-build` keyframe | the no-preference + `@supports (view())` outer-gate — terminal sections under reduce/non-support |
| `.scroll-pin` / `.scroll-pin-stage` | the fixed-stage-advances-time scroll-pinned register — a `position: sticky` stage in a tall `--scroll-pin-stage-height` container; the container declares a named `scroll-timeline: --gl-pin` exposed via `timeline-scope`; the stage's internal phases (reveal 0–45%, settle 45–90%) advance against the container scroll | `animation-timeline: --gl-pin`, the `gl-pin-reveal`/`gl-pin-settle` compositor phases (transform/opacity/scale only) | the no-preference + `@supports (animation-timeline: scroll()) and (timeline-scope: --gl-pin)` outer-gate — a correct STATIC non-pinned read on the gap engine (never a broken silent stage) |
| `.smooth-scroll` | the native `scroll-behavior: smooth` opt-in (CSS-first, zero runtime — NOT a rAF momentum loop, which IS Lenis and is the fence) | n/a | PRM-gated (no-preference) — the smooth interpolation drops under reduce, the jump-scroll is correct (vestibular floor) |

Tokens (`src/styles/tokens/scale-paper.css`, beside `--scroll-reveal-*` — read/extend, never re-tuned):
`--scroll-build-rise`/`--scroll-build-step`, `--scroll-cascade-rise`/`--scroll-cascade-range-end`/
`--scroll-cascade-column-stagger`, `--scroll-pin-stage-height`/`--scroll-pin-phase-reveal-end`/
`--scroll-pin-phase-expand-end`/`--scroll-pin-lift`.

## The ≥2-consumer adoption (S6 — met by construction)

- **`.scroll-build`** rides EVERY `<StoryPage>` `<article>` mount (`StoryPage.vue` — the route-enter
  coordinated entrance; `<header>` is beat `--i:0`, `<StoryHero>` is beat `--i:1`); the hero `<h1>`
  `.story-hero-title--enter` FOLDED onto the register (it now reads `--scroll-build-rise` — ONE
  entrance system, the W-HIERARCHY2 reading-ORDER threaded ON it, not co-written).
- **`.scroll-cascade`** rides EVERY `<StoryPage>` section wrap (`StoryPage.vue` — supersedes the bare
  `[data-scroll-reveal]` fade, a clean break, no alias).
- **`.scroll-pin`** rides the canonical motion-band showcase `demo/stories/motion/scroll-choreography.vue`
  (the pinned-stage reveal→settle phase sweep) + the capability badges.
- **`.smooth-scroll`** rides the AppShell `<main class="demo-main-scroller smooth-scroll …">` route-scroller.

`proof:scroll-motion` S6 found 4 live consumer surfaces (StoryPage.vue, scroll-choreography.vue,
story-hero.css, manifest.ts).

## The π readback (the BINDING truth — `tests-visual/scroll-motion.spec.ts`, LOCAL-ONLY, rides W-REFLECT3)

The spec asserts (and captures) the four binding arms; the LIVE GPU/CDP capture rides the
W-REFLECT3 reflection close (the AY W-LIVE1 split — the device-free `proof:scroll-motion` S1-S6 is
the CI half; this π is the binding paint, backstopped on CI by `proof:live-verified-ledger`):

- **(a) the PAGE-BUILD frame-series** — on route-enter the `.scroll-build` beats resolve DISTINCT
  `animation-delay` values (chrome 0, hero/body staggered by `--scroll-build-step`) + a non-`none`
  `animation-name` on a `--spring-*` clock — the coordinated coupled-fade build, NOT a flat fade.
- **(b) the SECTION-CASCADE scroll-through** — the `.scroll-cascade` children resolve an
  `animation-timeline: view(...)` + the coupled `gl-cascade-build` recipe (the implicit stagger,
  no setTimeout), captured over the live backdrop, both modes.
- **(c) the SCROLL-PINNED phase sweep** — the `.scroll-pin-stage` resolves `position: sticky` + the
  named `--gl-pin` timeline link; scrolling the container advances the stage phase's computed
  transform (the fixed-stage-advances-time read).
- **(d) the PRM static-layout** — under emulated `prefers-reduced-motion: reduce` the page-build
  `animation-name` resolves to a fade-only terminal entrance (no `translateY` frames), the cascade
  shows the static terminal sections (no scroll-driven build), the scroll-pin shows its terminal phase
  (no sweep) — the binding PRM before/after against the bare-fade ground.

Captures land at `docs/tranches/BB/audit/visual/W-SCROLL-MOTION-{light,dark}-{mobile,desktop}-{build,scroll}.png`.

## proof:ba-gestalt verdict (clause 8 — the GESTALT BAR, BB inv-4)

**Verdict slot: PENDING — operative at W-REFLECT3 (Batch 7).** Per-mechanism S1-S6 greens do NOT close
this visual wave alone. The motion-band showcase (`/motion/scroll-choreography`) + a representative
StoryPage are to be captured whole-page on route-enter + scroll-through, BOTH modes, and judged as a
designed gestalt: "does the PAGE build in + cascade + pin as ONE coherent scroll-choreography — the SOTA
page-assembles-itself read, spring-clocked + compositor-smooth — as a page?" A gestalt FAIL deploys the
research→wave-spec→redress triumvirate (W-REFLECT3); it does NOT close `complete`.

## Architectural-floor coordination

- `proof:scroll-motion`: born-RED 0/9 at HEAD → 9/9 GREEN at close.
- `proof:animation-coherence`: GREEN (the build/cascade/pin transform legs on the spring, the opacity
  legs on the bezier — no orphan raw timing, no register fork).
- `proof:no-layout-animation`: MY recipes CLEAR the MC1 keyframe arm (zero `gl-page-build`/`gl-cascade`/
  `gl-pin` reflow hits — all compositor channels). The gate's MC3-transition-arm is FAILING on 15
  SIBLING-owned files (dock/layer-group.css, drawer.css, segmented-tabs.css, HeaderRibbon.vue,
  PagerDots.vue, the timeline family) — that arm is W-MOTION-CANON's in-flight extension + its own
  fix-scope (this wave's recipes are SUBJECT to the gate and clear it; the sibling transition fixes are
  W-MOTION-CANON's, the shared architectural floor BOTH clear).

## Drift recorded (RE-GROUND at HEAD)

- The `--scroll-reveal-*` tokens moved `scale-paper.css:347-349 → :426-428` (cite drift; relocated, the
  new `--scroll-*` knobs land beside them).
- The named timeline moved `dock-nav.css:155-160 → :257-262` (the `--demo-main-progress` declaration is
  intact, read-only).
- W-MOTION-CANON's `--ease-expo-out` token has NOT landed at this HEAD; the house already ships
  `--ease-out` (`cubic-bezier(0,0,0.2,1)`) + `--ease-out-expo` (`cubic-bezier(0.16,1,0.3,1)`). The
  recipes use the established `--ease-out` for the no-overshoot fade leg (the gate accepts
  `--ease-out|--ease-expo-out`).
- The JS fallback leaf (`useScrollChoreography.ts`) was NOT minted: `timeline-scope` ships alongside
  `scroll()`/`view()` in 2026 (the universal-support convergence), so the CSS-only `.scroll-pin` under
  the `@supports (timeline-scope: --gl-pin)` gate with a correct static-layout fallback is the floor.
  The JS fallback leaf is BOOKED only on a material engine-gap reveal (the §Triumvirate support-matrix
  trigger) — never a JS scroll lib (the no-net-dep fence is binding either way). Consequence: no
  `api/index.ts` delta, no `core/index.ts` edit.
