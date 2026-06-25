# BG audit — D-routing: the route-transition layer (the linchpin)

**Auditor scope:** deepen + SPEC the gestalt first-principles rewrite of the route-transition
layer. The orchestrator confirmed nav changes the URL but the leaving page never unmounts
(`childCount 2→3`, stale heading). This file proves the mechanism against live HEAD (demo on
`localhost:5173`, 4.2.0) and specs the minimal idiomatic replacement.

---

## FINDINGS (verified against HEAD + live reproduction)

### F1 — the defect reproduces deterministically-broken, non-deterministically-which-wins

Live, from `/foundations/intro` clicking `/substrates`:

```
rest : childCount 2, articles 1, headings ["Glass, paper, and the golden ratio."]
t+60 : childCount 3, articles 2, headings ["Glass, paper…", "Substrates"], enterActive true, leaveActive FALSE
… stays 3 / 2 articles for the entire 1.2s window …
settled: childCount 2, articles 1 — and the SURVIVOR is the STALE "Glass, paper…" article (url is /substrates)
```

Repeated `/foundations/intro → /data`: `childCount` stuck at **3**, two `<article>` coexisting
("Glass, paper…" + "Data") past t=1600ms. The leaving page **never unmounts**. Which vnode
survives is timing-dependent (sometimes the new page wins, sometimes the stale one) — the
signature of a **concurrent (default-mode) `<Transition>` race**, not a deterministic CSS bug.

Critically: `leaveActive` was `false` across every 60ms sample — the leaving `<article>` either
never received `fade-slide-leave-active`, or the leave `resolve()` went **stale** before it could
fire `finishLeave` (which is what strips the leaving vnode). Vue's `whenTransitionEnds` guards on
`id === el._endId`; a re-trigger bumps `_endId` and the prior leave's `resolve()` becomes a no-op,
orphaning the leaving DOM. (`@vue/runtime-dom` `whenTransitionEnds`, L286-313 of
`runtime-dom.esm-bundler.js`.)

### F2 — the single route transition is DEFAULT-MODE (no `out-in`)

`demo/layout/AppShell.vue:404-476`:

```html
<RouterView v-slot="{ Component }">
  <Transition name="fade-slide">          <!-- NO mode="out-in" -->
    <component :is="Component" v-if="Component" :key="route.fullPath" />
    <div v-else-if="route.matched.length > 0" ref="skeletonEl" class="section-landing-skeleton" …/>
    <Card v-else-if="route.matched.length === 0">Pick a story</Card>
  </Transition>
</RouterView>
```

Default mode runs leave + enter **concurrently**. Vue-router navigation is async (lazy
`component: () => import(...)`), so the OLD page's leave and the NEW page's enter overlap, and a
rapid second nav (or the bloom/scroll watchers re-rendering the leaving subtree) re-triggers the
transition mid-leave → stale `resolve()` → orphan. `mode="out-in"` is the idiomatic serialization
that structurally forbids the overlap; the repo already uses it (`data/timeline-continuous.vue:20,156`).

### F3 — the `.scroll-build` mount `@keyframes` rides ON the routed page roots, inside the `<Transition>`

Both routed roots carry `.scroll-build` directly:
- `demo/stories/StoryPage.vue:72` — `<article class="scroll-build story-page-article …">`
- `demo/stories/SectionLanding.vue:85` — `<article class="scroll-build mx-auto w-full max-w-6xl">`

`.scroll-build > *` (`src/styles/scroll-choreography.css:115-127`) applies
`animation: gl-page-build var(--spring-snappy-duration) var(--spring-snappy) both` to **every direct
child** with `animation-fill-mode: both` + a staggered `animation-delay`. Live-confirmed: the
article's own `animationName` is `none`, but its **first child** carries `gl-page-build 0.4s` with
`fill-mode: both`.

The article *itself* is what `<Transition>` animates and what Vue runs `getTransitionInfo(el)`
against. With `expectedType === undefined`, `getTransitionInfo` (L334-336) takes:
`type = timeout>0 ? (transitionTimeout > animationTimeout ? TRANSITION : ANIMATION) : null`.
The article carries the `fade-slide-leave-active` **transition** (`opacity/transform`
`--duration-fast`), and the scroll-driven/sticky descendants + the `both`-fill child animations
muddy the picture. The leaf authors KNEW this: `src/styles/glass/liquid-enter.css:14-16` documents
it verbatim — *"this file does NOT touch them (Bug B: a 2nd `animation:` shorthand on
`.scroll-build > *` clobbers `gl-page-build`)"*. The architecture is already fighting its own
collision; it has been patched-around, never resolved.

The decisive isolation test (live): forcing the leave to a clean `opacity 0.12s linear !important`
AND killing `.scroll-build > * { animation: none }` on the leaving article **did NOT** fix the
unmount — childCount still stuck at 3. So the CSS transition-type detection is a *contributor*, but
the **load-bearing root is the default-mode concurrent race + the stale-leave orphan** (F1/F2),
amplified by the JS watchers (F4).

### F4 — the contrivance stack: a bloom-find-child hack + two no-op VT watchers, all racing the same elements

`AppShell.vue` carries FOUR over-contrived mechanisms layered onto the one `<Transition>`:

1. **The bloom-find-first-non-skeleton-child hack (L279-303).** A `watch(() => route.fullPath)`
   that, after `nextTick`, walks `mainEl.value.children` and grabs *"the first non-skeleton
   element"* as the entering content, then calls `useBloomUp(skeletonEl, routeContentEl).bloom()`
   on it — writing inline `transform/opacity/filter` onto whichever `<article>` it grabs. This is a
   DOM-spelunking guess (`[...main.children].find(c => !c.classList.contains('section-landing-skeleton'))`,
   L290-294) that *assumes* exactly one non-skeleton child — but during the broken concurrent
   transition there are TWO articles, so it can grab and bloom-mutate the **wrong** (leaving) one.
   It only fires `if (skeletonWasShowing.value)` (L282), which is rarely true (F5), so it is mostly
   dead weight that, when it does fire, fights the transition.

2. **The category-switch `startViewTransition` watcher (L211-228).** A `watch(route.meta.categoryId)`
   wrapping a **no-op body** (`document.documentElement.dataset.categorySwitch = categoryId`) in
   `startViewTransition`. The comment (L222-224) admits *"The body is intentionally a no-op write."*
   A VT with a no-op mutation snapshots the page, runs the default cross-fade pseudo-animation over
   the WHOLE document, and (on a route change) races the Vue `<Transition>` that is ALSO animating
   the same `<main>` subtree — two transition engines over one DOM region. It is a no-op in intent
   and a hazard in effect.

3. **The morph-stage `startViewTransition` (L127-136, the `toggleShellMorph` path).** A *second*
   `startViewTransition` for the dock V↔H demo (separate concern, but the same double-engine smell;
   see D-dock audit for the morph-as-button rework — defect 13).

4. **The skeleton 3rd `<Transition>` branch (L423-457) + `useBloomUp` priming (L255-303).** The
   skeleton branch + `skeletonWasShowing` flag + the `useBloomUp(skeletonEl, routeContentEl)`
   instance exist to bloom the page out of a placeholder rect — but they hang off the same single
   `<Transition>` v-slot, so the skeleton and the real page are sibling branches that Vue must
   cross-fade between, compounding the branch-count the default-mode transition juggles.

### F5 — the skeleton almost never shows (the bloom path is mostly dead), the eager-resolve makes it worse

`demo/router.ts:81-92` — `beforeResolve` eager-resolves the FIRST navigation's lazy chunk
(`firstResolved` one-shot). `scrollBehavior: () => ({ top: 0 })` (L74) is also overridden by the
AppShell `mainEl.scrollTo` watcher (L195-200) because `<main>` owns scroll, not `window` — two
scroll-reset mechanisms. After the first nav, chunks are import-cached, so the matched-but-pending
window (`route.matched.length > 0 && !Component`) is sub-frame and the skeleton branch (and thus the
bloom) rarely activates. The bloom-find-child hack (F4.1) is gated on `skeletonWasShowing`, so it
mostly no-ops — pure complexity with near-zero live benefit, plus a live hazard when it does fire.

### F6 — the routed roots already paid a tax for being inside this `<Transition>`

`StoryPage.vue:64-70` + `SectionLanding.vue:80-84` both document the `<TooltipProvider>`-must-be-
inside-`<article>` workaround ("renders non-element root node" Vue warning). The page roots are
already contorted to be single-element to satisfy this transition. This is fine and stays — but it
confirms the `<Transition>` is the architectural center the pages bend around.

---

## ROOT CAUSES (gestalt, first-principles)

**RC1 — DEFAULT-MODE concurrent transition over async-resolved route components is structurally
race-prone.** Leave + enter overlap; a second nav (or a watcher-driven re-render of the leaving
subtree) bumps `_endId` and the prior leave's `resolve()` → `finishLeave()` goes stale, orphaning
the leaving DOM. The page that "wins" is a timing accident. **The fix is `mode="out-in"`**: leave
fully resolves (old page unmounts) BEFORE enter begins. One mounted page at a time, always. This
alone kills the "reload required" + "page doesn't change" defects.

**RC2 — TWO entrance engines fight over the same page root.** The `<Transition name="fade-slide">`
(a CSS *transition* on the article) and `.scroll-build` (a CSS *@keyframes animation* on the
article's children, `fill-mode: both`) both try to author the page-enter. Vue's
`getTransitionInfo` reads `transition*` + `animation*` off the transitioning element to pick which
`*end` event to await; the mixed signal is the documented "Bug B" the codebase already fenced
around. **The fix is ONE engine for the page-enter.** Since `mode="out-in"` makes the page-enter a
clean single-element mount with no leaving sibling, the `<Transition>`'s `enter-active` CSS becomes
the sole, sufficient, idiomatic page-enter — and `.scroll-build` must come OFF the routed
`<article>` root (it can stay as an *interior* beat-stagger on a wrapper that is NOT the transition
root, OR be retired entirely in favor of the transition's enter — see W-ROUTE-TRANSITION).

**RC3 — the JS bloom/VT scaffolding is over-engineered substrate with near-zero live payoff and
live hazard.** The bloom-find-child hack (F4.1), the no-op category-switch VT (F4.2), the rarely-
seen skeleton+bloom (F4.4/F5) are three independent half-mechanisms bolted onto one transition.
Per KISS/DRY + no-legacy: **delete all three.** The idiomatic iOS-27 liquid page-transition is
expressible as ONE coherent CSS enter/leave recipe on the `<Transition>` (weight/inertia via the
house `--spring-*` + the no-overshoot exit) — no JS rect-spelunking, no second VT engine, no
skeleton bloom. The skeleton-as-placeholder is a legitimate idea but belongs as vue-router's own
`<RouterView>` Suspense/pending state, NOT as a sibling `<Transition>` branch the page must
cross-fade against.

**RC4 — the "liquid page transition" target feel must be authored where it cannot break unmount.**
The iOS-27 weight/inertia is a property of the enter/leave CURVE (spring-in, no-overshoot-out,
coupled fade+transform), not of a JS FLIP. A pure CSS `<Transition>` in `out-in` mode delivers the
felt weight AND guarantees the unmount. Native View-Transitions are the *enhancement* tier (a real
keyed cross-fade), but only if done correctly — and `out-in` Vue `<Transition>` is the simpler,
Safari-safe, always-correct floor that must ship first.

---

## PROPOSED WAVES

### BG.W-ROUTE-TRANSITION — one coherent, always-unmounting route transition

**Intent.** Replace the racy default-mode `<Transition>` + the bloom/VT scaffolding with ONE
idiomatic `mode="out-in"` route transition that ALWAYS unmounts the leaving page and carries the
iOS-27 liquid weight as its enter/leave curve.

**Idiomatic gestalt approach.**
1. **`<Transition name="route-liquid" mode="out-in">`** on the `<RouterView>` (AppShell L405). The
   `out-in` mode serializes leave→enter, structurally killing the concurrent race (RC1) and the
   stale-orphan (the leaving page unmounts before the new one mounts — `childCount` can never reach
   2 articles).
2. **Mint the `route-liquid` recipe in `src/styles/transitions.css`** (a new `@layer components`
   class-set, replacing the demo's reuse of the generic `fade-slide`). The enter is the
   liquid-weight register: `opacity` on `--ease-out` + `transform: translateY()` (+ a sub-perceptual
   `scale`) on `--spring-snappy` / `--spring-snappy-duration` (the SPATIAL-rides-spring, EFFECTS-
   rides-bezier canon, motion-canon P1-P4); the leave is the no-overshoot exit (`--ease-in`/
   `--ease-out`, short, NO overshoot past gone, P2). Compositor-only (`transform`/`opacity` only,
   `proof:no-layout-animation` floor). PRM arm: keep the fade, drop the transform (P6). This IS the
   iOS-27 page-build weight, authored as the transition curve — no JS.
3. **Take `.scroll-build` OFF the routed `<article>` root** in `StoryPage.vue:72` +
   `SectionLanding.vue:85` (RC2 — the `<Transition>` enter is now the sole page-enter engine; one
   engine, no `getTransitionInfo` mixed signal). The interior reading-order stagger (chrome→hero→
   body) is preserved by moving the `--i`-staggered `.scroll-build` beat-rule onto an INTERIOR
   wrapper that is NOT the transition root (e.g. the `<TooltipProvider>`'s child group or a
   dedicated `.page-beats` div), so it threads the stagger WITHOUT being the element Vue measures —
   OR retire the page-build stagger entirely in favor of the single transition enter (decide in the
   wave: the simpler the better; the orchestrator's KISS bar favors retiring it).
4. **Delete the bloom-find-child hack** (`AppShell.vue:255-303` — the `useBloomUp` instance,
   `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs, the `watch(route.fullPath)` DOM-walk,
   the `useBloomUp` import L30). The page-enter is the `out-in` transition; no JS rect bloom.
5. **Delete the no-op category-switch VT watcher** (`AppShell.vue:202-228`, the `lastCategoryId`
   ref + the `startViewTransition` with the intentionally-no-op body). One transition engine over
   `<main>`, not two.
6. **Re-home the matched-but-pending skeleton** off the sibling `<Transition>` branch onto
   vue-router's own pending state (`<RouterView>` + `<Suspense>` `#fallback`, OR a `loading` route
   guard), so it is a router-native placeholder, not a third transition branch the page cross-fades
   against. The "Pick a story" no-match `<Card>` (L463-474) stays (it is a real empty state),
   reached via the `not-found`/no-match path. Keep the skeleton VISUAL (it is good UX); change only
   its HOST.
7. **Keep** the `mainEl.scrollTo({top:0})` reset (L195-200) — with `out-in` it now fires cleanly
   after the old page leaves and before the new mounts, never racing a concurrent enter. Drop the
   redundant router `scrollBehavior` (router.ts:74) OR keep it as the window-level no-op; pick one
   owner (the `<main>` watcher is the real one).

**Files touched.** `demo/layout/AppShell.vue` (transition mode + recipe name; delete F4.1/F4.2
scaffolding + the `useBloomUp` import + the skeleton-branch re-home), `src/styles/transitions.css`
(mint `route-liquid` enter/leave + PRM arm), `demo/stories/StoryPage.vue` +
`demo/stories/SectionLanding.vue` (drop `.scroll-build` off the `<article>` root; re-home or retire
the interior beat-stagger), `demo/router.ts` (single scroll-reset owner), possibly
`src/styles/scroll-choreography.css` (if `.scroll-build` is retired wholesale, remove the route-
enter `@keyframes` and keep only `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` which are
scroll-driven, not route-enter).

**Acceptance / π bar.**
- **The binding unmount π** (`tests-visual/route-transition.spec.ts`, LOCAL): navigate
  A→B→C via real SPA links; at every settle assert `main.querySelectorAll('article').length === 1`
  and the heading === the destination's title (the stale-survivor case reds). A frame-series during
  the swap asserts AT MOST one `article` carries `route-liquid-leave-active` at a time and the
  leaving article is GONE before the entering article's `enter-active` clears (out-in serialization
  proven on the compositor).
- **Rapid-nav stress:** fire 5 navs in <300ms; assert exactly one article survives and it is the
  LAST destination (no orphan, no stale winner).
- **Reload-not-required:** assert the rendered heading tracks `route.fullPath` with NO reload.
- **Liquid feel:** the enter resolves the spring transform + coupled fade on the
  `--spring-snappy-duration` clock; PRM drops the transform, keeps the fade (the motion-canon P6
  readback). `proof:no-layout-animation` stays GREEN (compositor-only enter/leave).
- Device-free source gate (`proof:route-transition` or fold into an existing AppShell gate):
  asserts `mode="out-in"` present, the no-op VT watcher ABSENT, the bloom-find-child watcher
  ABSENT, `.scroll-build` ABSENT on the routed `<article>` roots.

**Chronic/deferred folded.** Kills confirmed defects **#1 (routing freeze)** and **#9 (page
transitions broken)** at the root. Folds the "reload required" class. Removes the `liquid-enter.css`
"Bug B" fence (RC2) — once `.scroll-build` is off the route root and there is one enter engine, the
documented clobber is structurally gone, not fenced.

---

### BG.W-VT-ROUTE-ENHANCE — the native View-Transitions enter as the *enhancement* tier (deferred, optional)

**Intent.** ONLY after W-ROUTE-TRANSITION ships green, optionally add a real keyed
`startViewTransition` route morph as a progressive-enhancement tier (Chrome/Safari VT) — a genuine
shared-element/cross-fade keyed on the route, replacing the no-op category VT with a REAL one.

**Idiomatic gestalt approach.** Drive navigation through the shipped `navigate()` helper
(`src/composables/motion/useViewTransition.ts:205` — already async-aware + `instantUnderReducedMotion`).
The VT wraps the ACTUAL `router.push` (the real DOM delta IS the page swap), with
`view-transition-name` on the route root for a real cross-fade. Gate behind
`supportsRouteTransitions()`; the `out-in` Vue `<Transition>` from W-ROUTE-TRANSITION is the
floor for non-VT engines and under PRM (the `navigate` helper already takes the instant path under
reduce). **One code path, per-engine degrade** — the no-op `dataset` write is replaced by the real
push, so the VT finally captures a meaningful before/after.

**Files touched.** `demo/layout/AppShell.vue` (route push through `navigate()`),
`demo/layout/dock-nav.css` or a route VT recipe (the `view-transition-name` on the page root +
`::view-transition-*` curves). NO new component, NO second engine.

**Acceptance / π bar.** With VT available, the swap is a single keyed cross-fade (no double-engine
over `<main>`); with VT absent, byte-identical to W-ROUTE-TRANSITION's `out-in`. PRM → instant.
The unmount π from W-ROUTE-TRANSITION stays GREEN (VT is additive, never re-introduces the orphan).
**This wave is deferred / optional — it must NOT block W-ROUTE-TRANSITION, and must never bring back
a concurrent default-mode transition.**

---

## The minimal idiomatic mechanism (named)

**`<Transition name="route-liquid" mode="out-in">` over `<RouterView>`, with a single CSS
enter/leave recipe carrying the iOS-27 spring weight — and the `.scroll-build` page-build, the
bloom-find-child hack, and the no-op `startViewTransition` watchers all deleted.** `out-in` is the
one-line structural cure for the unmount race; the liquid feel lives in the transition curve, not
in JS. Native View-Transitions are a later, optional enhancement layered on the same always-correct
floor.
