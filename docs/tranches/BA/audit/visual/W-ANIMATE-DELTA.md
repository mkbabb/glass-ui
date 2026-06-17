# BA.W-ANIMATE — DELTA (the shipped motion facilities wired onto real demo surfaces)

**Wave**: BA.W-ANIMATE — the WIRING wave (ANIM-1..ANIM-5): every motion engine
(`scroll-driven.css`/`transitions.css`/`useCountup`/`vReveal`/`useScrollProgress`/
`useStaggerReveal`/`useIntersectionPause`) ships complete + PRM-gated + tested but was a
demo-of-itself with ZERO real-surface consumers; this wave consumes them on real
surfaces. The substrate is fence-locked, never edited.
**Branch**: tranche/BA (Batch 6) · commit `111a5208`
**Status**: live-verified — source `proof:ba-animate` W1-W4 GREEN + the BINDING π
`tests-visual/ba-animate.spec.ts` (both modes), all via shipped engines, PRM-clean.
**Gate**: `proof:ba-animate` (registered, `["local","ci"]`) — the device-free SOURCE arm;
the binding painted truth is the π arm + the `proof:ba-gestalt` motion-surface whole-page
verdict (BA inv-4).

> This DELTA documents captures that genuinely landed (the π spec writes them into this
> dir) but were never referenced in a DELTA doc — the reference is reconciled here
> (BB.W-LEDGER-REPAIR scope 5(a), the silent-no-op surfaced it).

## Captures (this dir)

The π `tests-visual/ba-animate.spec.ts` writes its readback frames to
`docs/tranches/BA/audit/visual/` directly (the `VISUAL_DIR` target at spec lines 274/283):

- `W-ANIMATE-hero-enter-light.png` — the route page-enter `<Transition name="fade-slide">`
  on the AppShell `<RouterView v-slot>` mount; ONE coherent page-enter, light mode.
- `W-ANIMATE-hero-enter-dark.png` — same, dark mode.
- `W-ANIMATE-metric-countup-light.png` — the metric-cell audacious display figures
  (`text-display-mega`/`-audacious`) carrying `[data-countup]` wired through `useCountup` on
  the SETTLE register (`easeOutCubic`, no overshoot), gated by `useIntersectionPause` so the
  tween fires on scroll-into-view; light mode.
- `W-ANIMATE-metric-countup-dark.png` — same, dark mode.

## The four clauses (the source arm, GREEN)

- **W1 — the route page-enter.** AppShell's `<RouterView v-slot>` mount is wrapped in
  `<Transition name="fade-slide">` (a `transitions.css` recipe, SCOPED to the v-slot block so
  the morph-stage/dialog `<Transition>`s don't false-green). A route change fires ONE coherent
  page-enter, not a hard-cut nor a per-element cascade.
- **W2 — the scroll-progress bar.** A `.scroll-progress` element in the `<main>` region with
  `--scroll-progress-scroller` bound to a named scroll-timeline on `<main>` (NOT the default
  root — the route owns scroll), driven by the native `scroll()` timeline on the compositor.
- **W3 — the metric count-up.** The audacious display figures carry `[data-countup]` wired
  through `useCountup` on the SETTLE register, gated by `useIntersectionPause` (the half-wire —
  `[data-countup]` with no engine, or an ungated engine — fails).
- **W4 — the negative fence (proportion + register).** The hero `<h1>` entrance is on a
  SETTLE/smooth register never naming `--spring-bouncy`/`--spring-snappy` (the §6 "audacious
  type arrives with gravity not bounce" doctrine); no wired surface declares `transition:all`
  or hand-rolls an `@keyframes`/`requestAnimationFrame` outside the named recipes.

## Verdict

**PASS.** The shipped motion facilities are consumed on real surfaces (the page-enter, the
scroll-progress bar, the count-up) — the "museum" non-consumption defect (ANIM-1..ANIM-5) is
closed, all via the fence-locked engines, PRM-clean. `proof:ba-gestalt` owns the motion-surface
whole-page gestalt verdict (the `motion+fourier` roster row).
