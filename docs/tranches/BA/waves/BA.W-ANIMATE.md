# BA.W-ANIMATE — the shipped motion facilities wired onto real surfaces

**Name**: W-ANIMATE - page-enter orchestration, scroll-progress, metric count-up, the hero entrance
**Opens after**: Batch 6 opens (depends on Batch 1 W-DARK-MATERIAL landed; runs ‖ W-STAGE ‖ W-DEMO-AFFORDANCES ‖ W-FOURIER-STUDIO ‖ W-SUFFUSE2 — demo-side, disjoint bounds)
**Agents**: 2 parallel
**Hard gate**: `proof:ba-animate` (born-RED) — four falsifiable source witnesses (AppShell route `<Transition>` + `.scroll-progress` wired; the chassis sets the reveal hooks; the audacious numbers carry `[data-countup]`; the hero `<h1>` is on the SETTLE register, no bounce) + the binding π readback (a live route-change fires ONE page-enter, the count-up runs on scroll-into-view and snaps under PRM, the scroll bar tracks) + the W-REFLECT2 `proof:ba-gestalt` motion verdict.
**Status**: SPEC

## Goal criterion

The storybook STOPS hard-cutting. Every route arrives with ONE coherent page-enter (a fade-rise body + a one-shot section stagger), the shell scroller carries a compositor-driven progress bar, the audacious display numbers count up on first reveal, and the hero `<h1>` arrives with gravity — all through the EXISTING shipped engines (zero new primitives), all PRM-clean by construction, all proportion-fenced to one motion event per surface tier.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave is a WIRING wave, not an authoring wave — the substrate is complete and in-doctrine, and the defect is PURE non-consumption (animation-targets lane verdict: "the substrate is world-class, the consumption is a museum"). Before touching a byte the impl agents re-grep each anchor below at HEAD and confirm the gap still holds (every facility ships, zero real-surface consumers); if a cite has drifted (a facility already wired by a sibling Batch-6 wave) the agent records the drift in PROGRESS and re-locates the consumption point — it does NOT re-diagnose the substrate (BA invariant 3 — re-opened ≠ rebuilt-blind).

Grounding findings (`audit/fleet/animation-targets.md`): **ANIM-1** (Tier A — page-enter orchestration absent: the `<RouterView>` mounts with no `<Transition>` wrapper, the story chassis carries zero entrance choreography), **ANIM-2** (the headline non-consumption: every animation facility is a demo-of-itself with ZERO real-surface consumers), **ANIM-3** (Tier B — no `.scroll-progress` on the shell scroller), **ANIM-4** (Tier C — the audacious display numbers render as dead static text, zero count-up), **ANIM-5** (Tier E — the hero has zero entrance hook). Capture: `docs/tranches/BA/audit/fleet/anim-data-metrics-static-mount.png` (the `/data/metrics` audacious numbers mount as dead static text).

The grounded mechanisms (each re-confirmed at HEAD this authoring):

1. **The route mounts with no page-enter (ANIM-1/2).** `AppShell.vue:129-143` renders `<RouterView v-slot="{ Component }"><component :is="Component" v-if="Component" /></RouterView>` — NO `<Transition>` wrapper, so the route hard-cuts. The swap recorder caught the negative live: incoming story content fired ZERO entrance animation.

2. **The story chassis has zero entrance choreography (ANIM-1).** `StoryPage.vue`, `StorySection.vue`, `StoryHero.vue` carry no `onMounted`/reveal/`Transition`/stagger hook — grep-confirmed empty at HEAD (`grep -n 'data-reveal\|data-scroll-reveal\|data-countup\|scroll-progress\|useCountup\|vReveal\|useStaggerReveal\|startViewTransition'` over the three chassis files + AppShell returns NOTHING). The `[data-scroll-reveal]` section stagger has no host.

3. **No scroll-progress on the shell scroller (ANIM-3).** `AppShell.vue:125-128`'s `<main ref="mainEl" class="… overflow-y-auto …">` owns route scroll (the shell is a fixed viewport frame, `:51-59` resets it on nav) but carries no `.scroll-progress` affordance. The shipped `.scroll-progress` recipe (`src/styles/scroll-driven.css:42-47`, native `scroll()` timeline) and its `useScrollProgress` fallback (`src/composables/motion/useScrollProgress.ts`) have ZERO real consumers.

4. **The audacious numbers are dead static text (ANIM-4).** `demo/stories/data/metric-cell.vue:91-97,113-118` paints `912`/`14` as literal `<p class="text-display-mega …">912<span …>Mbps</span></p>` spans — no `[data-countup]`, no engine. `useCountup` (`src/composables/motion/useCountup.ts`, the `[data-countup]` DOM-walking SETTLE tweener with PRM-snap built in at `:108-111`) is consumed only by its own `motion/countup.vue` self-demo.

5. **The hero has no entrance (ANIM-5).** `StoryHero.vue:228,251` renders the display `<h1 class="story-hero-title text-display-3">` with no entrance hook; `vReveal` (`src/composables/motion/vReveal.ts`, root-barrel, dependency-free) is consumed only by `motion/reveal.vue`.

RE-GROUND command set (run all; confirm the gap holds):

```
sed -n '125,144p' demo/layout/AppShell.vue                                   # the <main> scroller + <RouterView> no-Transition
grep -n 'data-reveal\|data-scroll-reveal\|data-countup\|scroll-progress\|useCountup\|vReveal\|useStaggerReveal\|startViewTransition' \
     demo/layout/AppShell.vue demo/stories/StoryPage.vue demo/stories/StorySection.vue demo/stories/StoryHero.vue   # MUST be empty (the gap)
sed -n '42,72p' src/styles/scroll-driven.css                                 # the shipped .scroll-progress + [data-scroll-reveal] recipes (PRM-gated)
sed -n '88,121p' demo/stories/data/metric-cell.vue                           # the dead-static audacious numbers (912 / 14)
sed -n '108,111p' src/composables/motion/useCountup.ts                       # the built-in PRM-snap
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | ANIM-1/2 page-enter absent | `demo/layout/AppShell.vue:129-143` (`<RouterView>` no `<Transition>`); `StoryPage.vue`, `StorySection.vue`, `StoryHero.vue` (grep-empty for any reveal hook) | route + chassis hard-cut; the `fade`/`fade-slide` recipes + `[data-scroll-reveal]` host are unconsumed |
| 2 | ANIM-3 no scroll-progress | `demo/layout/AppShell.vue:125-128` (the `<main>` scroller); `src/styles/scroll-driven.css:42-47` (the shipped recipe) | the route-owning scroller has no `.scroll-progress` bar; the native `scroll()`-timeline facility is consumerless |
| 3 | ANIM-4 dead-static numbers | `demo/stories/data/metric-cell.vue:91-97,113-118` (the `912`/`14` literal spans); `src/composables/motion/useCountup.ts:74-176` | the audacious display numbers carry no `[data-countup]`; `useCountup` (SETTLE, PRM-snap) is a demo-of-itself |
| 4 | ANIM-5 no hero entrance | `demo/stories/StoryHero.vue:228,251` (the `text-display-3` `<h1>`); `src/composables/motion/vReveal.ts` | the hero `<h1>` arrives with no entrance; `vReveal`/`fade-slide` unconsumed on the front-door |

## Scope

1. **AppShell route page-enter (Tier A — owned HERE).** Wrap the `<RouterView>` mount (`AppShell.vue:129-143`) in a `<Transition>` keyed on the route so a route change fires ONE coherent page-enter — the `fade-slide`/`fade` recipe already in `transitions.css`, on the SETTLE (smooth) register for the body, exit on `--ease-out` (no overshoot past gone). The `mainEl.scrollTo({top:0})` reset (`:54-59`) stays — the page-enter composes WITH the scroll reset, it does not replace it. ONE event per route, not a per-element bounce cascade.
2. **The shell scroll-progress bar (Tier B — owned HERE).** Add a `.scroll-progress` element pinned to the content-column edge inside `AppShell.vue`'s `<main>` region, driven by the native `scroll()` timeline (compositor, off-main-thread) with `--scroll-progress-scroller` pointed at the `<main>` scroller (the route owns scroll, not `root`). The `useScrollProgress` fallback is the feature-detected JS path the recipe already gates; no double-write (the dual-path-single-writer rule in `scroll-driven.css:16-21`). The bar is position-bound, not auto-running — PRM-safe by construction.
3. **The chassis reveal hooks (Tier A section stagger — DECLARED as literal diff blocks for W-STAGE).** The page-enter section stagger lands on the story chassis: `StoryPage`/`StorySection` set the `[data-scroll-reveal]` host attribute on the content section (the CSS-compositor primary, `scroll-driven.css:55-72`) so each section fades + lifts on entry via its own `view()` timeline — the implicit stagger, NO `setTimeout` cascade. Because the chassis files have ONE writer (W-STAGE, per EXECUTION-DAG §6), this wave does NOT edit them — it AUTHORS the exact `[data-scroll-reveal]` / `vReveal` diff blocks as literal markdown in §Agent Units and W-STAGE applies them on this wave's behalf (the AZ literal-markdown-block triumvirate idiom, used proactively). This wave OWNS the data-attribute wiring decision + the gate that proves it landed.
4. **Metric count-up (Tier C — owned HERE).** The audacious display numbers gain `[data-countup]`: `metric-cell.vue:91-97,113-118`'s static `912`/`14` figures become `[data-countup]` figures, wired through `useCountup` on the SETTLE register (smooth — patient, NO overshoot on a number; a bounced number reads wrong) gated by `useIntersectionPause`/intersection so the tween fires on scroll-into-view, not on mount-offscreen. ONE motion event on the VALUE glyph; the unit/label stay still (the motion twin of the one-color-event restraint). `MetricCell` value figures gain the same hook where the value is numeric. The `useCountup` PRM-snap (`:108-111`) handles reduce by construction.
5. **The hero entrance (Tier E — DECLARED as a literal diff block for W-STAGE, wired HERE).** The display `<h1>` (`StoryHero.vue:228,251`) arrives with a single deliberate fade-rise on the SETTLE register (audacious type arrives with GRAVITY, not bounce). The hero supporting row (chips/CTA) MAY use a restrained one-shot `vReveal`/`fade-slide`. Because `StoryHero.vue` is W-STAGE's file, this wave authors the literal entrance diff block; W-STAGE applies it. PRM → static terminal state (the recipe's outer `@media` gate).
6. **The negative fence (proportion — enforced by the gate, not aspirational).** Body copy, the curve-gallery TABLE, the icon grid, the Section type-ladder stay FLAT (the motion one-event rule). No surface gains TWO competing motion events (a counting number does NOT also bounce-in). No hand-rolled rAF/keyframe that the substrate doesn't already PRM-guard — every moment routes through an existing gated facility. The gate's negative-predicate arm asserts no `transition: all`, no hand-set keyframe outside the named recipes, and the hero on SETTLE (never `--spring-bouncy`).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the page-enter `<Transition>` on the `<RouterView>` cannot be done without re-architecting the shell scroll-reset or the route-key seam (`AppShell.vue:51-59`) — i.e. the page-enter and the scroll-to-top fight and the fix reaches beyond AppShell — that is a scope-reveal; triumvirate (research the `<Transition>`+scroll-reset interaction + plan-augment the bound), do NOT widen into the router config unilaterally.
- **Hard-gate failures not local-edit-recoverable**: if the π readback shows the page-enter double-fires or the count-up runs on mount-offscreen (the intersection gate misfires) after the wiring, OR the scroll bar reads `scaleX` against the wrong scroller (`root` instead of `<main>`) and a token re-point doesn't fix it, that is a wiring-architecture miss — triumvirate, do not loop on attribute values.
- **Diagnostic loop halt**: if the count-up still hard-snaps (no tween) on a non-PRM engine after three iterations and which gate (intersection vs PRM vs the engine's rAF) is suppressing it has not been isolated, halt and triumvirate.
- **Cross-wave coordination conflict**: if W-STAGE's chassis rewrite (its own bound) changes `StoryHero`/`StoryPage`/`StorySection` shape such that this wave's literal diff blocks no longer apply cleanly, that is a coordination reveal — the orchestrator reconciles the two waves' chassis needs (the literal-block idiom is exactly the reconciliation seam), it is NOT a license for this wave to fork a parallel chassis edit.

## File Bounds

| File | Access |
|---|---|
| `demo/layout/AppShell.vue` | modify (the route `<Transition>` wrapper + the `.scroll-progress` bar + `--scroll-progress-scroller` wiring) |
| `demo/stories/data/metric-cell.vue` | modify (the audacious-number `[data-countup]` wiring + the `useCountup`/intersection host) |
| `demo/layout/dock-nav.css` | modify-carve (only if the `.scroll-progress` bar needs a demo-scoped position/color rule that has no token home — prefer a token; carve a single `.demo-scroll-progress` rule if unavoidable) |
| `scripts/proof-ba-animate.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:ba-animate` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `tests-visual/ba-animate.spec.ts` | create (the π readback — page-enter fires, count-up on reveal + PRM-snap, scroll bar tracks) |
| `CLAUDE.md` | modify (record the demo motion-consumption map in the demo storybook chassis section) |

**Literal diff blocks authored here, applied by W-STAGE (chassis files — NOT this wave's bound):**

| File | Owner | this wave's role |
|---|---|---|
| `demo/stories/StoryPage.vue` | W-STAGE | authors the `[data-scroll-reveal]` content-section host diff block |
| `demo/stories/StorySection.vue` | W-STAGE | authors the section reveal-hook diff block (if the host is per-section, not per-page) |
| `demo/stories/StoryHero.vue` | W-STAGE | authors the hero `<h1>` SETTLE fade-rise + supporting-row `vReveal` diff block |

Do NOT touch:
- The chassis SFCs `StoryHero.vue` / `StoryPage.vue` / `StorySection.vue` (W-STAGE's bound per EXECUTION-DAG §6 — this wave declares literal diff blocks, W-STAGE applies them; a direct edit is a cross-wave write conflict).
- `demo/stories/manifest.ts` + `ShowcaseFrame.vue` + the token-tour stories + `story-hero.css` + the dock-stage chassis (W-STAGE's bound).
- `demo/stories/motion/curve-gallery.vue` + `demo/stories/feedback/toaster.vue` + the curve-picker + the play-control register (W-DEMO-AFFORDANCES's bound).
- `demo/stories/substrates/fourier-field.vue` + `src/components/custom/fourier-field/*` + the steps sub-editor (W-FOURIER-STUDIO's bound).
- The category eyebrow/accent stories + the suffuse pop map (W-SUFFUSE2's bound).
- The LIBRARY motion engines — `src/composables/motion/*` (useCountup/vReveal/useScrollProgress/useStaggerReveal/useIntersectionPause) and `src/styles/scroll-driven.css` / `transitions.css` are CONSUMED, never edited (they ship complete and in-doctrine; this is a wiring wave, the substrate is fence-locked).
- The shell docks `BottomDock.vue` / `SidebarDock.vue` (W-DOCK-GEOMETRY/W-DOCK-SECTIONS own them; the `railContext` guard is W-SHELL-HOLD's).
- Standing fences: GL shader internals (aurora.frag / metaball.frag), ppmycota purple (never enters library tokens — irrelevant here, no library token edit), the slides `docs/tranches/M/` docs.

### Disjointness

Two agent units, disjoint modify paths: **W-ANIMATE.1** writes `demo/layout/AppShell.vue` + `demo/layout/dock-nav.css` (the shell page-enter + scroll-progress); **W-ANIMATE.2** writes `demo/stories/data/metric-cell.vue` (the count-up) + the gate/test/CLAUDE.md surfaces. No intra-wave path is shared. Across Batch 6: the chassis files have ONE writer (W-STAGE); this wave's literal diff blocks are NOT a write (they are spec text W-STAGE applies). The five Batch-6 waves' primary bounds are demo-family-disjoint by EXECUTION-DAG §6's table — W-ANIMATE owns AppShell + the data-attribute wiring, nothing another Batch-6 wave writes.

## Agent Units

### BA.W-ANIMATE.1 the shell page-enter + scroll-progress

- Goal: a route change fires ONE coherent page-enter (fade-rise body, SETTLE) and the `<main>` scroller carries a compositor-driven `.scroll-progress` bar, both PRM-clean.
- Mechanism: wrap `AppShell.vue:129-143`'s `<RouterView>` mount in `<Transition>` (keyed on `route.fullPath`/`Component`) bound to the `fade-slide` recipe already in `transitions.css` (mode out-in or default per the no-double-mount read — the impl agent picks the mode that does not race the scroll reset); add a `.scroll-progress` element inside the `<main>` region with `--scroll-progress-scroller` pointed at the `<main>` block scroller (a custom-property override or a scoped selector — the route owns scroll, not `root`). The `useScrollProgress` fallback is the recipe's own feature-detected path — no JS attach when the native timeline is present (`useScrollProgress.ts:78-88`). No hand-rolled rAF; the recipe's outer `@media (prefers-reduced-motion: no-preference)` is the PRM gate.
- Files: `demo/layout/AppShell.vue`, `demo/layout/dock-nav.css` (modify-carve, only if the bar needs a demo-scoped rule with no token home).
- Sub-gate: the gate's W1 + W2 witnesses — W1: `AppShell.vue`'s `<RouterView>` mount is wrapped in a `<Transition>` referencing a `transitions.css` recipe class (source assert) AND the π readback shows a route change fires exactly ONE page-enter transition (not zero hard-cut, not a per-element cascade); W2: a `.scroll-progress` element exists in the `<main>` region with the scroller pointed at `<main>` (source assert) AND the π readback measures the bar's `scaleX` advancing as the `<main>` scroller scrolls.

### BA.W-ANIMATE.2 the metric count-up + the wave gate

- Goal: the audacious display numbers count up on first scroll-into-view on the SETTLE register (no overshoot), snap under PRM, and the wave's born-RED gate + π readback close the wave.
- Mechanism: re-point `metric-cell.vue:91-97,113-118`'s static `912`/`14` figures to `[data-countup]` figures (the value figure carries `data-countup="912"`/`"14"`, the `<span>` unit stays static text outside the countup hook) driven by `useCountup` with a SETTLE callable `easeFn` (smooth, no overshoot), gated by `useIntersectionPause`/an IntersectionObserver so `runActive`/the per-figure tween fires on reveal not on mount-offscreen; the unit/label do not animate. The PRM-snap is the engine's (`useCountup.ts:108-111`). This unit ALSO owns `scripts/proof-ba-animate.mjs` (the four-witness born-RED gate), its `package.json`/`gates.mjs` registration, `tests-visual/ba-animate.spec.ts` (the π readback), and the CLAUDE.md motion-consumption-map record.
- Files: `demo/stories/data/metric-cell.vue`, `scripts/proof-ba-animate.mjs` (create), `package.json`, `scripts/gates.mjs`, `tests-visual/ba-animate.spec.ts` (create), `CLAUDE.md`.
- Sub-gate: the gate's W3 + W4 witnesses — W3: the audacious display numbers carry `[data-countup]` wired through `useCountup` with an intersection gate (source assert) AND the π readback shows the figure tweens from 0 → target on scroll-into-view and snaps to target under PRM; W4: the negative fence holds (the hero `<h1>` is on SETTLE not `--spring-bouncy`, no `transition: all`, no hand-rolled keyframe outside the named recipes).

## Hard Gate

`proof:ba-animate` (born-RED at HEAD, driven GREEN by the wave) — four falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-animation-coherence.mjs` / `proof-suffuse.mjs`), each RED at HEAD pre-wave:

1. **W1 — the route page-enter is wired.** `AppShell.vue`'s `<RouterView>` mount is wrapped in a `<Transition>` whose bound transition references a `transitions.css` recipe class (`fade`/`fade-slide`) — the source half asserts the `<Transition>` wraps the `<component :is>` mount, NOT merely that the word `Transition` appears (a `<Transition>` elsewhere in the file, e.g. a dialog, must not green it — the assert is scoped to the `<RouterView v-slot>` block). RED at HEAD: `AppShell.vue:129-143` is a bare `<component :is="Component">` with no wrapper.
2. **W2 — the scroll-progress bar is on the route scroller.** A `.scroll-progress` element exists inside the `<main>` region AND its `--scroll-progress-scroller` resolves to the `<main>` block scroller (not the default `root`) — the source half asserts the class + the scroller binding (a `.scroll-progress` with no scroller override would track the wrong element, a faint pass over R8). RED at HEAD: no `.scroll-progress` in `AppShell.vue`.
3. **W3 — the audacious numbers count up, gated.** The metric-cell audacious display figures (`text-display-mega`/`text-display-audacious`) carry `[data-countup]` wired through `useCountup` with an intersection gate — the source half asserts BOTH the `[data-countup]` attribute on the display figure AND the `useCountup` + intersection import/wiring (a `[data-countup]` with no engine, or an ungated engine that runs on mount-offscreen, is the half-wire that fails). RED at HEAD: `metric-cell.vue:91-97,113-118` are literal static spans, no `[data-countup]`, `grep useCountup demo/stories/data/metric-cell.vue` returns 0.
4. **W4 — the negative fence (proportion + register).** The wired surfaces carry exactly ONE motion event each (no count-up figure ALSO bounces-in), the hero `<h1>` entrance is on a SETTLE/smooth register and NEVER names `--spring-bouncy`/`--spring-snappy` (the §6 "audacious type arrives with gravity not bounce" doctrine, the same `proof:animation-coherence` register-assignment shape), and no wired surface introduces a `transition: all` or a hand-rolled `@keyframes`/rAF outside the named `scroll-driven.css`/`transitions.css` recipes. RED-able: a bounce on the hero or a `transition: all` smuggled in fails the arm.

**The π binding readback** (the cardinal-lesson DELTA, captured own-surface — `tests-visual/ba-animate.spec.ts`): live `/`, `/data/metric-cell`, and a representative content route at `:5199` with paired π readbacks proving (a) a route change fires exactly ONE page-enter transition (the swap recorder catches the entrance the HEAD swap proved ABSENT — not zero, not a cascade), (b) the `.scroll-progress` bar's resolved `scaleX` advances monotonically as the `<main>` scroller scrolls, (c) the audacious figure's `textContent` tweens 0 → target on scroll-into-view and the same figure snaps to target under an emulated `prefers-reduced-motion: reduce` (the SETTLE no-overshoot + PRM-snap proven on the real surface), and (d) the hero `<h1>` fade-rises on entrance with no overshoot past its terminal `transform`. Captured to `docs/tranches/BA/audit/visual/W-ANIMATE-DELTA.md` with before/after frames against the `anim-data-metrics-static-mount.png` baseline.

**The gestalt bar (BA invariant 4 — binding, per-mechanism greens do NOT close).** W1-W4 are the device-free CI half; the π readback is the per-mechanism visual truth; NEITHER alone closes the wave. The owning surfaces (the home/landing hero, a data route, a content route) are captured WHOLE-PAGE in BOTH modes over their real backdrop and judged as a gestalt via `proof:ba-gestalt` (minted by W-GESTALT-GATE, binding at W-REFLECT2): "does the page READ as a designed, alive whole — does the motion suffuse without busy-ness, in proportion?" A page whose mechanisms green but whose motion reads janky, over-staged, or still-flat as a gestalt does NOT close (the AZ P-1 close-class — mechanisms green, page wrong — may not recur). This wave's gestalt verdict is recorded at W-REFLECT2 under the motion+fourier surface.

## Format And Lint Cadence

`npm run typecheck` after the AppShell `<Transition>` + the metric-cell `useCountup` wiring; `npm run build` to confirm the demo compiles; `node scripts/proof-ba-animate.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at close; `npm run proof:gate-script-parity` after the `package.json`/`scripts/gates.mjs` registration; `git diff --check` before close. Docs-only the chassis literal-diff-block authoring (no chassis byte written here).

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-ANIMATE-DELTA.md` — before/after frames (`/`, `/data/metric-cell`, a content route) + the paired π readback (the one-fire page-enter, the scroll-bar `scaleX` track, the count-up tween + PRM-snap, the hero fade-rise no-overshoot).
- The `proof:ba-animate` JSON artefact (born-RED log + GREEN-at-close log).
- The gate-script-parity output post-registration.
- The literal chassis diff blocks (in §Agent Units) handed to W-STAGE; the applied-by-W-STAGE confirmation cross-referenced at integration.

## Commit Plan

- impl commit (unit 1): `feat(demo): shell page-enter + scroll-progress bar wired (BA.W-ANIMATE)` — names the `<RouterView>` `<Transition>` + the `.scroll-progress` route-scroller binding in the body.
- impl commit (unit 2): `feat(demo): audacious-number count-up on the SETTLE register, intersection-gated (BA.W-ANIMATE)`.
- gate commit: `test(demo): proof:ba-animate born-RED→GREEN + parity registration + π readback`.
- doc/status commit: the CLAUDE.md motion-consumption-map record + the DELTA doc + PROGRESS row + the W-STAGE-applied chassis literal-block cross-reference.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1) landed — the captures are taken over the real dark register (BA invariant 5; staging/capture over a broken dark register is wasted work). The chassis reveal-hook + hero-entrance diff blocks depend on W-STAGE applying them (EXECUTION-DAG §6 — chassis files have ONE writer; this wave authors the literal blocks, W-STAGE applies). W-DEMO-AFFORDANCES's play register is NOT a dependency of this wave (the transport-clock consumption is W-FOURIER-STUDIO's).
- **Blocks**: W-REFLECT2 (Batch 7) — the motion+fourier gestalt verdict checks this wave's moments landed live in BOTH modes. W-CLOSE re-stamps no animation BOOK (this wave consumes shipped facilities, mints no deferrable substrate).

## Archaeology

No prior attempt — the animation substrate has shipped complete since the AQ/AV/AZ motion waves (scroll-driven + view-transitions + reveal/stagger/countup engines, all PRM-gated and tested), but was NEVER wired into a real surface. The animation-targets lane named this the "canon-on-paper / muddy-in-render" pattern the house already saw for hierarchy (AZ.W-HIERARCHY) — the engines built, gated, tested, then never consumed. The guardrail this wave mints: `proof:ba-animate` asserts the CONSUMPTION (the route fires a page-enter, the audacious number counts up, the scroll bar tracks) on the real surfaces with a π readback, so a future close cannot re-claim "the motion library is state-of-the-art" while every facility is a demo-of-itself.
