# BG-WS1 · Shell · Routing · Field — SPEC (pass 1)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large.
> All claims live-verified against HEAD `tranche/BG @ 1fe44381` (glass-ui 4.2.0) + the running demo. The fleet REPRODUCED every defect live; nothing here is asserted from memory.

---

## GESTALT GOAL

One shell, one route-swap mechanism, one persistent field, one fit law.

The shell today is a **four-mechanism contrivance pile** stacked on a single broken transition: a default-mode `<Transition>` race that lets the leaving `<article>` never unmount, a `.scroll-build` mount-animation that collides with the leave-transition, a `useBloomUp` find-first-child DOM-walk that breaks the moment >1 article coexists, and two no-op `startViewTransition` watchers whose bodies write a dead `dataset` key nobody reads. On top of it sit three field systems (a metallic CSS `.paper-field` mounted unconditionally, per-page StoryHero backgrounds, DockStage aurora), an invalid `scroll(<dashed-ident>)` top-bar that always falls to `auto`, and a width-only hero fit-cap that lets a 5-word sentence wrap to 1.67×svh.

The gestalt cure is **subtraction, not addition**:

- **ROUTE** — collapse the pile to ONE idiomatic mechanism: a `mode="out-in"` `<Transition>` over a `<Suspense>`-resolved `<RouterView>`. `out-in` makes two coexisting `<article>`s *structurally impossible* — the leave fully resolves and the old page unmounts before the new one mounts. `<Suspense>` makes the async-chunk `undefined` window the suspense fallback instead of a third `v-if` branch racing the transition slot. The `.scroll-build` mount-keyframe comes OFF the routed article root so the ONE route transition owns the page entrance (its enter curve carries the iOS-27 spring-in weight — no second competing animation). Delete `useBloomUp` from AppShell, both no-op VT watchers, the skeleton `v-else-if` branch, and the dead `dataset.categorySwitch`.
- **FIELD** — retire the metallic `.paper-field` wholesale (clean break) for ONE shell-persistent offscreen-paused `<Aurora>` mounted at the shell root, its per-route hue driven off the ONE existing `warmFieldHue(category)` source, calm and warm, never re-mounting across navs (one GL context shell-wide). Substrate routes that own their own focal GL suppress it (`pause()` + placeholder) so the one-GL-per-route budget holds. The duplicated `warm-field.ts` registry folds onto `aurora-hero.ts`'s single warm projection.
- **TOP BAR** — bind the scroll-progress rail to a NAMED timeline the correct way (bare `animation-timeline: --demo-main-progress`, never `scroll(<dashed-ident>)`); rest-state is `scaleX(0)` origin-left, invisible at scroll-top on every route.
- **HERO** — add an svh height term to the width-only fit-cap so the rendered title BLOCK is bounded to ≤~0.62×svh (≈1/φ) at every breakpoint, and route every hero `<h1>` through the ONE chassis title path with a content-aware rung-activation rule (sentence → display-1..3; single word/number/wordmark → keeps mega/hero/audacious, the metric-cell/typography home).

Every motion leg is compositor-only (transform/opacity/filter), carries iOS-27 liquid weight (spring-on-spatial / bezier-on-effects, enter-overshoots / exit-no-overshoot), PRM keeps-fade/drops-transform, and paints identically in Chrome AND Safari. The `<Aurora>` primitive and the `--type-display-*` ladder are byte-untouched — the fixes live in the demo shell + the chassis fit-cap (presets-in-consumers).

---

## MECHANISM (the idiomatic approach, concrete)

### M1 — The route swap: `out-in` over `<Suspense>` (D1/D9, the linchpin)

**Root cause (live-reproduced, NOT CSS):** `demo/layout/AppShell.vue:404-475` is `<RouterView v-slot><Transition name="fade-slide">` with **NO `mode`** (Vue default = leave+enter concurrent) wrapping a 3-branch `v-if`/`v-else-if`/`v-else-if` chain (`<component>` / skeleton / Card) where every route component is `() => import()` lazy. Default-mode + rapid async branch-flips strands Vue's single-slot leave bookkeeping (`_endId` bump → stale `finishLeave()`) → the leaving `<article>` never gets `fade-slide-leave-*` classes, never unmounts. Pages accumulate monotonically (5-nav stress → 3 frozen zombies, 3 GL contexts). The `out-in` avoidance comment ("so the entrance does not race the scroll-to-top reset") is the trap — the scroll reset is a separate route-keyed `watch`, not transition-keyed, so `out-in` cannot race it.

**The fix (KISS, structural):**

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <Suspense :key="route.fullPath" timeout="0">
            <component :is="Component" />
            <template #fallback>
                <RouteBloomSkeleton v-if="route.matched.length > 0" />
            </template>
        </Suspense>
    </Transition>
</RouterView>
```

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → **exactly 1 `<article>` at every settle, by construction**. This is the load-bearing line.
- `<Suspense>` → the async-chunk `undefined` window is the suspense fallback (the skeleton), NOT a third `v-if` branch competing for the transition slot. The skeleton path collapses from a hand-managed branch to router-native pending state.
- `:key="route.fullPath"` on the `<Suspense>` wrapper → an unambiguous swap unit (one key, not per-branch).
- The no-match "Pick a story" `<Card>` moves to a router-level catch-all fallback route (or a thin `v-if` OUTSIDE the transition) so the transition slot only ever holds the page.

**`.scroll-build` decouple:** `.scroll-build` comes OFF the routed `<article>` root (`StoryPage.vue:72`, `SectionLanding.vue:85`). The `gl-page-build` mount-keyframe (`scroll-choreography.css:115`, `animation … both` + staggered delay) ran the SAME opacity/transform legs as the leave-transition on the SAME element — Vue's `getTransitionInfo` mis-detected which `*end` to await. With `out-in` owning the entrance, the page-build *weight* moves INTO the `route-liquid` enter curve (one entrance system). KISS verdict: **retire the article-root mount-stagger**; keep `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` (scroll-driven `view()`/`scroll()` registers — they do NOT collide and stay). If a per-beat interior stagger is still wanted it re-homes onto a NON-transition-root inner wrapper (orchestrator's bar favors retiring).

**The `route-liquid` recipe** (mint in `src/styles/transitions.css`, FOLLOW the shipped `.pane-swap-*` out-in precedent at `transitions.css:109` — do NOT invent a parallel recipe):

```css
/* route-liquid — the ONE route page-swap (out-in). DRY off .pane-swap-*. */
.route-liquid-enter-active { /* SPATIAL spring + EFFECTS bezier (P1) */ }
.route-liquid-enter-from   { opacity: 0; transform: translateY(0.75rem); }
.route-liquid-enter-to     { opacity: 1; transform: none; }   /* enter rides --spring-snappy + --spring-snappy-duration, small settle overshoot */
.route-liquid-leave-active { /* opacity --ease-out, short, NO overshoot past gone (P2) */ }
.route-liquid-leave-to     { opacity: 0; }                    /* leave is fade-only — no transform fight */
@media (prefers-reduced-motion: reduce) {
  .route-liquid-enter-from, .route-liquid-enter-to,
  .route-liquid-leave-to { transform: none !important; }      /* fade-keeps / transform-drops (P6) */
  .route-liquid-enter-active, .route-liquid-leave-active { transition-property: opacity !important; }
}
```

Compositor-only (transform/opacity), PRM-carved, Safari-safe (CSS `<Transition>` — never depends on VT for the swap). Enter spatial leg rides `--spring-snappy` + its matching `--spring-snappy-duration` clock (W-GLASS-CAL per-spring clock); leave is no-overshoot `--ease-out`. The liquid-weight law is honored by the spring enter + the small settle overshoot.

**Deletions (clean break, `proof:no-dual-path`):** `useBloomUp` import + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom `watch(route.fullPath)` (AppShell.vue:255-303) + `bloomRouteContent`; the category-switch `startViewTransition` watcher + `dataset.categorySwitch` (AppShell.vue:205-228, dead consumer — grep proves 0 readers); the skeleton 3rd `<Transition>` branch + `Skeleton` import. `useBloomUp` stays a shipped primitive with other consumers (liquid-playground, dock) — only the AppShell MISUSE is deleted. ONE scroll-reset owner kept (the `mainEl.scrollTo` watcher, AppShell.vue:195); drop the router `scrollBehavior` duplicate if it double-fires.

> **Why not native View Transitions here?** Safari 18.4+ now supports same-document VT (the AppShell "Safari no-VT" premise is stale), so VT is a legitimate *enhancement* — but the floor MUST be the Vue `out-in` `<Transition>` (always-correct, Safari-safe, PRM-instant by the recipe). VT is `BG.W-VT-ROUTE-ENHANCE`, deferred/optional, additive, and must NEVER re-introduce a concurrent default-mode transition. It folds its directional `types:['forward'|'back']` into `navigate(opts)` — NOT a second wave-engine.

### M2 — The field: ONE shell aurora (D2/C-FIELD)

**Root cause:** `AppShell.vue:360` mounts `<PaperBackdrop field>` UNCONDITIONALLY → `.paper-field` (`paper.css:129-263`): conic cel-sheen (`from -45deg at 78% 22%`, L0.96) + 4 high-chroma radials (oklch chroma 0.115–0.155 = brown pigment slab) + a 0.22 feTurbulence grain speckle + a 42s `::before` `field-cel-drift` churn on a `position:fixed will-change:transform` plane. This IS the "disgusting metallic." The `[data-paper-field]` "opt-in" gate (`paper.css:113`) is a **phantom** — referenced as a CSS selector in `liquid-morph.css`/`cards.css` but never SET as a DOM attribute (grep: 0 setters) → the field is universal AND un-suppressible.

**The fix:** retire `.paper-field` wholesale (clean break — delete `paper.css:129-263` the `.paper-field` + `.dark .paper-field` + `field-cel-drift` + the conic/radial stops + `--field-h` clamp; delete the `PaperBackdrop` `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`). Mount ONE shell-persistent `<Aurora>` at the shell root:

```vue
<!-- AppShell.vue — the ONE persistent field -->
<Aurora
    :config="shellAuroraConfig"           <!-- calm warm preset, demo-local -->
    :opacity-ceiling="0.5"                 <!-- text-dense pages clear AA -->
    :paused="routeOwnsFocalSubstrate"      <!-- one-GL-per-route -->
    class="fixed inset-0 -z-10"
    aria-hidden="true"
/>
```

- **Persistent across navs** — mounted at the shell, OUTSIDE the `<Suspense>`/`<Transition>` swap unit, so it never re-arms per route (one GL context for the whole non-substrate shell, no context churn — which ALSO de-risks the route freeze by removing per-route mount churn, a genuine cross-wave synergy).
- **Per-route hue** — `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)` (the ONE hue source) → a calm warm preset (long `breathPeriod`, low `nucleiDrift`). The `<Aurora>` primitive is byte-untouched (presets-in-consumers — the calm config is a demo preset). The hue updates reactively WITHOUT re-creating the GL context.
- **One-GL-per-route suppression** — `routeOwnsFocalSubstrate` is computed off `route.meta.bgKind ∈ {aurora, constellation, fourier, blob, liquid-grid}` (a new `meta` flag projected from the manifest `CATEGORY_DEFAULT_BG` / per-row `bgKind`). On a substrate route the shell aurora `pause()`s (its CSS-gradient placeholder stays) so the substrate's own viz is the SOLE live context. DockStage folds onto the shell field (one fewer GL).
- **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause` (single owner), the live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR cap, `pause()`/`resume()`. No second pause path.
- **Safari/Chrome** — Aurora is WebGL2 (Safari 15+). The CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms (no scoped `:global`, no `light-dark()` inset trap).

### M3 — The duplicated warm-projection fold (D2 rider, `BG.W-FIELD-ACCENT-RECONCILE`)

`demo/stories/warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `WARM_HUE_LO/HI` + `warmFieldHue`) is a LITERAL parallel copy of the section-ramp warm projection ALREADY in `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + a SAME-NAMED `clampWarm` + the SAME [25,95] band). Its own header even claims "does NOT mint a third registry" while doing exactly that. **Fold:** pick `aurora-hero.ts`'s projection as canonical, derive `warmFieldHue` from it (or delete `warm-field.ts` wholesale and call the canonical projection). ONE hue source feeds BOTH the shell aurora field hue AND the hero palette — the brief's "per-route hue, no third registry." Also rewire `useGlassBackdropLuminance` (built for dock-over-live-aurora) to sample the live shell canvas (zero new cost — it was already a `drawImage + getImageData` sampler).

### M4 — The top bar: named-timeline bind (D5)

**Root cause:** `scroll-driven.css:45` hardcodes `animation-timeline: scroll(var(--scroll-progress-scroller, root) block)`; `dock-nav.css:231` overrides `--scroll-progress-scroller: --demo-main-progress`. The substitution yields `scroll(--demo-main-progress block)` — but `scroll()` accepts ONLY scroller KEYWORDS (`root`/`nearest`/`self`), NEVER a `<dashed-ident>`. A NAMED timeline (correctly declared `scroll-timeline-name: --demo-main-progress` on `.demo-main-scroller`, `dock-nav.css:201`) must be referenced BARE: `animation-timeline: --demo-main-progress`. Live `CSS.supports`: `scroll(--demo-main-progress block)` = FALSE, `--demo-main-progress` = TRUE. Invalid → computed `auto` → the `from{scaleX(0)}` never binds → the bar paints `scaleX(1)` full-width at `--primary` ink (the violet/metallic bar). It is ALSO `opacity:0.85` at rest (a full-width hairline showing even at scroll-top).

**The fix (clean split, no dual-conflated token):** the `--scroll-progress-scroller` token two-mode-conflates "scroll() keyword" and "named ident" — syntactically disjoint, one recipe cannot express both. Split the recipe:

```css
/* scroll-driven.css — the ONE binding strategy: a named-timeline reference. */
.scroll-progress {
    transform-origin: 0 50%;
    animation: gl-scroll-grow auto linear;
    animation-timeline: var(--scroll-progress-timeline, scroll(root block));
}
```

A consumer that owns a named scroller passes the bare ident: `.demo-scroll-progress { --scroll-progress-timeline: --demo-main-progress; }` (drop the dead `--scroll-progress-scroller`). The `scroll-vt.vue` `self`-keyword consumer migrates onto its OWN named timeline (ONE binding strategy, retire the `scroll(<keyword>)` branch — clean break). **Rest-state is `scaleX(0)` origin-left (invisible at scroll-top), NOT `opacity:0.85` full-width** — re-express the affordance as a faint-but-SHRUNK rail so a non-supporting engine renders nothing visible at the top. Optional: a compositor-only spring-eased trailing glint for liquid weight. Keep the `@supports (animation-timeline)` + PRM gates (Safari ≤17 degrades to the `scaleX(0)` terminal).

### M5 — The hero fit (D10)

**Root cause:** `story-hero.css:226-228` fit-cap is `min(rung, (100vw - 2*pad)/7)` — WIDTH-only, NO svh/height term (grep `vh|dvh|svh` in the title path = nothing). `max-inline-size: 18ch` FORCES a multi-word title to wrap to N lines; each line at the width-budget font-size stacks past the viewport (live `/compositions/hero`: 287px font → 6-line wrap → 1809px block = 1.675×svh, ~2.7× over the ≤0.62 bar). A pure rung-downgrade CANNOT fix it (the next-shorter rung still multi-line-wraps). There are TWO title paths — the chassis `.story-hero-title[data-hero-scale]` (fit-capped, manifest-driven) and a hand-authored `:hero-title="false"` + bare `<h1 class="text-display-*">` lane (ZERO protection — `hero.vue`/`intro.vue`/`auth-shell.vue` all live here; manifest `heroScale` is dead config there).

**The fix (two legs):**

1. **ONE chassis title path** — retire `:hero-title="false"` + the hand-authored bare `<h1 class="text-display-*">` in `hero.vue`/`intro.vue`/`auth-shell.vue` (clean break); render every hero `<h1>` through `.story-hero-title[data-hero-scale]` with a `#title-ornament` slot for the wordmark/ℱ. Drop `max-w-5xl` (it manufactures the wrap) → the chassis `~18ch` measure.

2. **Height-aware fit-cap** — add an svh term to the `min()` so the resolved font-size also caps total BLOCK height (compositor-safe — `font-size` is not a layout-animated property, this is a static resolution; the `--type-display-*` ladder is byte-untouched, the cap is the only edit at the `[data-hero-scale]` selector, specificity 0,2,0):

```css
.story-hero-title[data-hero-scale] {
    font-size: min(
        var(--story-hero-title-rung, var(--type-display-4)),          /* the √φ rung */
        var(--story-hero-title-fit, calc((100vw - 2*var(--story-hero-pad,2rem)) / 7)),  /* width budget */
        var(--story-hero-title-svh, calc(0.62 * 100svh / var(--story-hero-est-lines, 2)))  /* HEIGHT budget */
    );
}
```

   The svh term divides the 0.62×svh budget by an estimated line-count factor (`--story-hero-est-lines`, defaulted per the title's word-count class — see leg 3) since CSS cannot count lines. `svh` (not `vh`) for address-bar safety.

3. **Content-aware rung activation** (the load-bearing insight) — codify the rule in `assignDepths`/a `titleKind` manifest field: a multi-word SENTENCE headline floors at `≤ display-3` (≤68px) and sets a higher `--story-hero-est-lines`; a single word / number / wordmark KEEPS mega/hero/audacious (177–352px, the metric-cell/metric-stack/typography specimens are the CORRECT home, UNCHANGED) at `--story-hero-est-lines: 1`. So `'Real scenes, assembled from the parts.'` resolves ~display-2/3, not hero-245px.

---

## FILES TOUCHED

| File | Change | Wave |
|---|---|---|
| `demo/layout/AppShell.vue` | `out-in` `<Transition>` + `<Suspense>`; DELETE useBloomUp/skeleton/bloom-watch/2 VT watchers/dataset.categorySwitch; replace `<PaperBackdrop field>` with persistent `<Aurora :paused>` | W-ROUTE-TRANSITION, W-FIELD-AURORA |
| `src/styles/transitions.css` | MINT `route-liquid` recipe (DRY off `.pane-swap-*`); keep PRM carve | W-ROUTE-TRANSITION |
| `demo/stories/StoryPage.vue` | REMOVE `.scroll-build` from the article root | W-ROUTE-TRANSITION |
| `demo/stories/SectionLanding.vue` | REMOVE `.scroll-build` from the article root | W-ROUTE-TRANSITION |
| `src/styles/scroll-choreography.css` | (optional) retire the article-root `gl-page-build` stagger if no inner re-home | W-ROUTE-TRANSITION |
| `src/styles/paper.css` | DELETE `.paper-field` + `.dark .paper-field` + `field-cel-drift` + conic/radials + `--field-h` (~135 lines) | W-FIELD-AURORA |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | DELETE `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`; pure grain register | W-PAPER-GRAIN-OPTIN |
| `demo/stories/warm-field.ts` | DELETE (fold onto `aurora-hero.ts`) | W-FIELD-ACCENT-RECONCILE |
| `demo/stories/aurora-hero.ts` | export the canonical warm-projection `warmFieldHue` derivation | W-FIELD-ACCENT-RECONCILE |
| `demo/stories/manifest.ts` | project `bgKind`/`background` → `route.meta` for the suppression flag | W-FIELD-AURORA |
| `demo/router.ts` | thread `meta.bgKind`; (optional) catch-all no-match route; drop dup `scrollBehavior` if double-firing | W-ROUTE-TRANSITION, W-FIELD-AURORA |
| `src/styles/scroll-driven.css` | named-timeline bind (`var(--scroll-progress-timeline, scroll(root block))`); drop the conflated path | W-SCROLL-PROGRESS-RAIL |
| `demo/layout/dock-nav.css` | `.demo-scroll-progress { --scroll-progress-timeline: --demo-main-progress }`; rest `scaleX(0)` not `opacity:0.85` | W-SCROLL-PROGRESS-RAIL |
| `demo/stories/story-hero.css` | svh height term on the fit-cap `min()`; drop `max-w-5xl` welding | W-HERO-FIT |
| `demo/stories/hero.vue`, `intro.vue`, `auth-shell.vue` | retire `:hero-title="false"` + bare `<h1>`; route through chassis `#title-ornament` | W-HERO-FIT |
| `demo/stories/StoryHero.vue` (+ `assignDepths`/manifest) | content-aware rung activation + `--story-hero-est-lines` | W-HERO-FIT |
| `src/motion-core.ts` (barrel) | export `navigate` (currently unexported — wiring gap) | W-VT-ROUTE-ENHANCE (deferred) |
| gates (`scripts/proof-*.mjs`) | device-free arms (see acceptance) | per wave |

> **Fence:** ALL edits are glass-ui/demo-local (foreign-tree fence absolute). The `<Aurora>` primitive + `--type-display-*` ladder are byte-untouched (presets-in-consumers). No `src/styles` token VALUE edit in W-HERO-FIT (the clamp ladder is the fence).

---

## WAVE BREAKDOWN

Sequence is a HARD dependency chain — D1 MUST land + live-paint-verify FIRST (every other bar is unmeasurable while pages accumulate and GL contexts leak).

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
Add `mode="out-in"` + `<Suspense>` to the RouterView transition; mint `route-liquid` (DRY off `.pane-swap-*`); remove `.scroll-build` from both article roots; DELETE the 4-mechanism pile (useBloomUp misuse, both no-op VT watchers + dead dataset key, skeleton branch). KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` + ONE scroll-reset owner. Device-free gate: `mode="out-in"` present + the 3 deleted mechanisms ABSENT + no `scroll-build` on a routed article root + a self-test bite.

### 2. `BG.W-SCROLL-PROGRESS-RAIL` — independent (de-risks named-timeline binding; can land in parallel with #1)
Re-author `.scroll-progress` → named-timeline reference; drop the conflated `--scroll-progress-scroller` token + the `scroll(…block)` wrapper; migrate the `self`-keyword consumer to a named timeline; rest-state `scaleX(0)`. Device-free gate: **no recipe emits `scroll(<dashed-ident>)` anywhere** + self-test bite (closes the invalid-CSS→auto headless-green class).

### 3. `BG.W-FIELD-AURORA` — depends on #1 (needs unmount to measure one-GL)
Retire `.paper-field` (clean break); mount ONE shell-persistent `<Aurora :paused="routeOwnsFocalSubstrate">` driven by `warmFieldHue(category)`; thread `route.meta.bgKind` suppression; fold DockStage onto the shell field. Absorbs the `data-route-owns-gl` suppression contract. Gate: `proof:offscreen-pause` un-regressed + a `no-paper-field` source assert + the one-GL live π.

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #3
DELETE `warm-field.ts`; canonical warm-projection on `aurora-hero.ts`; collapse `CATEGORY_DEFAULT_BG` substrate-KIND switch toward a hue/intensity map over the ONE aurora; rewire `useGlassBackdropLuminance` to the shell canvas. Gate: single-source-of-warm-hue assert + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #3
Demote the global `.paper-underpaint` 0.22 grain to per-surface opt-in (math-paper/printed specimens); PaperBackdrop returns to a pure grain register (drop the field welding). KEEP grain tokens + blend law; re-tune opacity for the opt-in case. Gate: no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1 (pages must mount to measure)
ONE chassis title path (`#title-ornament` slot; retire bare `<h1>`); svh height term on the fit-cap; content-aware rung activation. NO `--type-display-*` token edit. Gate: source asserts the svh leg present + `:hero-title="false"` absent in the three pages; the binding bar is the live π.

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
Export `navigate` on the motion-core barrel; drive `router.push` through it with directional `types:['forward'|'back']` (router depth) behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor. MUST NEVER re-introduce a concurrent default-mode transition — the unmount π stays green (VT additive). One code path, not a parallel helper.

---

## ACCEPTANCE / REAL-PAINT-π BAR

> **C-PAINT (binding):** the headless-green/visually-broken disease shipped 3× (BB/BC/BD) — a headless single-nav test PASSES while the orphan strands only under rapid/overlapping navs, and the invalid `scroll(--ident)` was syntactically present. **Every WS1 acceptance is a FRESH LIVE CAPTURE by an agent who did NOT author the build, in Chrome AND a Safari/WebKit context.** Device-free gates prove SOURCE shape; the live π proves PAINT. Never trust a device-free gate alone.

The single automated probe (build-cheap, ran live in <10 evaluate calls), run after EVERY wave:

**Routing (the convergence bar):**
- ≥6 cross-category hops (`/foundations/intro → /display/buttons → /containers/dialog → /data/table → /feedback/alert → /navigation/tabs → /forms/inputs`): at every settle `main.querySelectorAll('article').length === 1` AND `main h1.textContent === destination title`.
- 5-nav-in-<300ms stress → `survivorArticleCount === 1` AND the survivor's heading === the LAST destination.
- No reload required (URL change == DOM change).
- Sample at +60/+360/+1260ms — the leaving article is GONE before the entering enter-active clears (out-in serialization).
- PRM: keeps fade, drops transform (no `translateY` frames under reduce).

**Field:**
- Every non-substrate route paints a calm warm AURORA — NO conic sheen, NO brown slab, NO visible speckle; per-route hue; glass clears AA both modes.
- `glContextCount === 1` on every route (shell aurora persists across non-substrate navs; substrate routes suppress it and their viz is the sole context). Re-run the `glCount` probe — must be 1, not the current 2/4 (the count is inflated by the D1 leak until #1 lands; it is a free-rider fix).

**Top bar:**
- `getComputedStyle('.demo-scroll-progress').animationTimeline === '--demo-main-progress'` (NOT `'auto'`).
- `scaleX(0)` at scroll-top on EVERY route; grows on scroll.

**Hero:**
- Rendered `<h1>` BLOCK height ≤ ~0.62×svh at 375/768/1440/1920, BOTH modes (measure block height, not font-size) — survey the LONGEST hero title in the manifest, not one example.
- ≥1 preview card (SectionLanding bento) above the fold at 1440×820 on `/compositions/hero` + every hero page.

**Cross-browser:** all of the above in Chrome AND Safari/WebKit (Safari 18.4+ supports same-document VT — TEST it, do not assume degrade; the `out-in` floor must unmount-then-mount regardless).

Capture DELTAs (screenshot + paired-π readback), never a commit-message claim.

---

## FOLDED DEFERRED ITEMS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement tier; deferred/optional, gated on #1 green, additive, never a concurrent transition. Folds directional `types` into `navigate(opts)`. **Do NOT split into a wave that re-mints a parallel route helper** — the shipped `navigate()` exists to prevent exactly that; the enhancement folds INTO W-ROUTE-TRANSITION's nav handlers if simpler.
- **`BG.W-FIELD-ACCENT-RECONCILE`** + **`BG.W-PAPER-GRAIN-OPTIN`** — covered above as waves 4 & 5 (depend on #3).
- **`useGlassBackdropLuminance` rewire** to the live shell canvas — lands in W-FIELD-ACCENT-RECONCILE (zero new cost).
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, NO carrier; these are a CONSUMER-ASSET arm (DEFER-with-trigger), NOT a library wave. The foreign-tree fence holds.

### Cross-WS handoffs (route them, don't double-build or drop):
- **`BG.W-SCROLL-SHRINK-UNIFY`** (the 3-fork DRY collapse: card-scroll + story-hero-shrink + story-hero-scroll-away → one keyframe family) → **WS4** carry; HARD-DEPENDS on W-ROUTE-TRANSITION (pages must mount). Sequence after WS1.
- **Morph-engine consolidation** (`useLiquidMorph` DELETE — 462 LOC / 0 consumers verified dead; the FLIP trio `useLiquidReveal`/`useBloomUp`/`useDockCtaReceive` → one `useFlip` over kf `flipShared`; V↔H-in-dock) → **WS2/WS4**.
- **`BG.W-CARTOON-INK-WARM`** (D3 red/maroon cast) → **WS3**; **`BG.W-DOCK-MORPH-INPLACE`** (D13) → **WS2**.
- **`BG.W-CONSTRAINT-MANIFEST` / `W-PAINT-IS-THE-GATE`** (the cross-cutting constraint doc + paint-is-the-release-gate) → **WS7**, but BINDS every WS1 wave's π (PRM, one-GL-per-route, Safari-no-VT-as-route-mechanism, CLS≈0, warm-not-red).

---

## OPEN RISKS

1. **(Highest) `out-in` does not actually serialize under the 5-nav stress.** The fleet PROVED `out-in` is the cure on a single nav by isolation, but the 5-nav-<300ms burst over async chunks is the falsifier — Vue must fully resolve each leave before the next enter even when navs overlap. **Prototype P1 must build-prove the burst → survivor===1 + glContext===1 + heading===dest at every settle**, or the whole mechanism is dead. (The headless single-nav test passes even when broken — the stress is the only trustworthy bar.)
2. **`<Suspense>` + the async-chunk fallback re-introduces a branch race.** `<Suspense>` is the idiomatic fix but must be verified to NOT itself create a coexistence window (the fallback and the resolved component must not both occupy `<main>` at settle). Falsifier: childCount at settle. P1 covers it.
3. **The persistent shell aurora hue swap re-creates the GL context.** A per-route hue change must mutate uniforms only, never re-mount the canvas (a re-mount churns GL contexts and re-arms — the very churn that de-risks the freeze would be undone). **Prototype P2 must prove a nav changes the field hue WITHOUT a canvas re-mount** (assert the same WebGL context object survives the nav) AND substrate-route suppression yields exactly one live context.
4. **`scroll-build` removal breaks the page entrance feel.** Retiring the article-root mount-stagger moves the entrance weight into the `route-liquid` enter curve — if that reads flat (no per-beat assembly), the liquid-weight law is unmet. Mitigation: the `route-liquid` enter is a spring with a small settle overshoot; if insufficient, re-home a single interior beat onto a non-transition-root wrapper. P1's visual capture judges it.
5. **The svh fit-cap with a fixed line-count factor mis-estimates a borderline title.** CSS cannot count lines; `--story-hero-est-lines` is a content-class estimate. A title that wraps to one more line than estimated overflows the 0.62 bound. Mitigation: the content-aware activation floors sentences at display-3 so the worst case is bounded; **prototype P4 must measure the LONGEST manifest hero title at all 4 breakpoints** (not one example) to confirm the factor holds, or fall back to a `max-block-size` clamp + `text-wrap: balance`.
6. **`proof:*` gates lock `paper-field`/aurora-always-composites assertions.** `Aurora.vue:54` documents "Aurora is NEVER retired — the warm wash ALWAYS composites." A clean `.paper-field` delete + a shell aurora must not red an existing gate that asserts the metallic field exists. Audit `proof:` references to `paper-field`/the field before the break; re-point or retire them in lockstep (`proof:no-dual-path` forbids the superseded mechanism surviving).
7. **Safari same-document VT regression in the deferred enhancement.** W-VT-ROUTE-ENHANCE must be feature-detected (`supportsRouteTransitions()`) — a Safari version gap must fall to the `out-in` floor cleanly. Deferred, but flagged so the enhancement never re-breaks the linchpin.
