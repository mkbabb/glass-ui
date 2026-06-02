# WC — BBNF Playground: Motion & Micro-interactions Refinement Spec

LENS: Motion & micro-interactions. SPEC ONLY — no app edits, no builds, no git.
TARGET: `/Users/mkbabb/Programming/bbnf-lang/playground`
glass-ui: `^3.0.0`.

---

## AESTHETIC DIRECTION

The playground already owns a confident, non-generic identity: **Instrument Serif**
display (`preset-bbnf.css:7`) over **Fira Code** mono, a pastel-token accent set
(`--pastel-green/blue/pink/amber/cyan`), tapered hairline rules, and a genuinely
memorable hero — the scroll-driven typewriter→logo morph (`useScrollMorph.ts`,
`useHeroSequence.ts`). That morph is the signature moment; keep it.

The motion *engineering* is where the app drifts from the glass-ui ideal. Every
entrance is a **hand-rolled main-thread rAF loop** (`useScrollTimeline.ts`) that
writes `el.style.transform`/`opacity` each frame, with **no native scroll-timeline
detection** and — across the entire `src/` tree — **zero `prefers-reduced-motion`
guards**. glass-ui ships exactly the compositor-driven, PRM-correct substrate this
app reinvents: `scroll-driven.css` (`[data-scroll-reveal]` + `.scroll-progress`,
both wrapped in `@media (prefers-reduced-motion: no-preference)` and driven by
native `view()`/`scroll()` timelines OFF the main thread) and the motion
composables `useStaggerReveal` / `useScrollProgress` / `useViewTransition` /
`useSpringMount`, each of which feature-detects the native path and degrades
cleanly under PRM.

Direction: **same look, off-thread.** Move the scattered per-section rAF reveals
onto one orchestrated, compositor-driven reveal grammar; honor PRM everywhere by
construction; spend the freed main thread on the one thing that earns it — the hero
morph and the result-pane swap.

---

## TOP REFINEMENTS (surface → glass-ui lever)

### 1. Replace the hand-rolled `useScrollTimeline` with the compositor `[data-scroll-reveal]` recipe — *the headline*
`LandingPage.vue:13-15` runs **three** `useScrollTimeline()` instances, each its
own `IntersectionObserver` + per-frame `requestAnimationFrame(update)` writing
inline `style.transform`/`opacity` (`useScrollTimeline.ts:37-48`) on the main
thread, with no native-timeline detection and no PRM branch.

→ glass-ui lever: glass-ui's **`scroll-driven.css`** ships `[data-scroll-reveal]`
— a fade+lift entrance with **one `view()` timeline per child**, running on the
compositor, gated by `@media (prefers-reduced-motion: no-preference)` so PRM users
get the terminal state with no motion (`scroll-driven.css:11,55,63`). Drop the
three composable calls; wrap the `FeatureCards`/`LivePreviewStrip`/`DemoCards`
group (`LandingPage.vue:22-32`) in a single `[data-scroll-reveal]` scroller, or
bind glass-ui's **`useStaggerReveal()`** (the feature-detected JS fallback — it
constructs *no* `IntersectionObserver` and *no* timers when native `view()` is
present, and reveals immediately so the CSS owns the entry). One reveal grammar,
off-thread, PRM-correct, instead of three bespoke rAF loops. Delete
`useScrollTimeline.ts`.

### 2. Stagger the FeatureCards grid — turn four static cards into one orchestrated reveal
`FeatureCards.vue:57-64` renders the 4-card grid with `transition-all
duration-300` on **hover only**; the cards have no entrance choreography — they
pop in with their section's single rAF fade. This is the canonical "one
orchestrated staggered page-load > scattered micro-interactions" win sitting
unused.

→ glass-ui lever: bind **`useStaggerReveal({ staggerMs: 70 })`**; register each
card el, bind the returned `revealed[i]` to `opacity-100 translate-y-0` vs
`opacity-0 translate-y-4`. The four pastel cards cascade in sequence as the grid
crosses threshold — and under native `view()` timelines the stagger is implicit
per-child on the compositor (the composable goes inert). Mirror the same lever on
the `CodeCardFan` reveal (`CodeCardFan.vue:51` already hand-codes
`transitionDelay: i*60ms` inline — replace with the composable's index so one
stagger source of truth governs both fan and grid).

### 3. Route-change View Transition — make playground↔landing↔docs a continuous morph, not an opacity blink
`App.vue:24-28` wraps `<router-view>` in a bare `page-fade` (`main.css:83-85`:
opacity-only, 0.2s/0.15s). Crossing between landing, `/playground`, and `/docs` is
a flat dissolve — the most-traversed transition in the app, and the least
considered.

→ glass-ui lever: **`useViewTransition()`** + glass-ui's **`view-transition.css`**
(`.gl-list-item` group recipe, PRM-gated at `view-transition.css:27-31`). Wrap the
router navigation in `startViewTransition(() => push(...))`; tag the NavBar logo
and the hero logo-morph target with a shared `view-transition-name` so the
**already-built morph element flies across the route boundary** instead of
cross-fading — the same signature gesture, now spanning navigation. Native VT with
a ≤20-LOC instant fallback; PRM users get an instant swap. Route focus via the
returned `finished` promise (the composable's documented a11y contract).

### 4. Spring-mount the ErrorDialog and result-pane swaps — replace ad-hoc CSS scale transitions
`main.css:91-99` defines `.hover-card-enter`/`leave` as a fixed-duration
`scale(0.92) translateY(6px)` cubic transition; the mobile pane swap
(`PlaygroundPage.vue:159`, `main.css:385-395`) is a 200ms `translateX` ease. These
are timing-curve guesses where a spring would read as physical.

→ glass-ui lever: **`useSpringMount()`** (PRM-aware per the motion-core PRM set) for
the ErrorDialog entrance and the AST/Format result swap — a spring settle keyed to
glass-ui's `--ease-spring` token reads as weight, not a clock. The result pane is
the app's highest-frequency interaction surface; a spring there is felt on every
parse.

### 5. PRM honored by construction — the missing global guard
`grep prefers-reduced-motion src/` returns **nothing**. The hero morph, the three
scroll timelines, the shimmer CTAs (`HeroSection.vue:112,120`,
`animate-[shimmer_3s_linear_infinite]`), and the typewriter all run unconditionally
for vestibular-sensitive users.

→ glass-ui lever: adopting levers 1–4 makes PRM correct *for free* — every glass-ui
motion substrate (`scroll-driven.css`, `view-transition.css`, the motion-core
composables) is already PRM-gated. For the bespoke survivors — the
`useHeroSequence`/`useScrollMorph` morph and the shimmer keyframes — add a single
`@media (prefers-reduced-motion: reduce)` block that pins the morph to its terminal
logo state and sets `animation: none` on the shimmer sweeps, matching glass-ui's
own PRM convention.

---

## FILE WRITTEN

`/Users/mkbabb/Programming/glass-ui/docs/constellation/next/design/bbnf/WC-design-motion.md`
