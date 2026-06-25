# BG-WS1 · Shell · Routing · Field — SPEC (pass 1, CONVERGED)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large.
> Grounded against HEAD `tranche/BG` (glass-ui 4.2.0) + the running demo, the 5 pass-1 prototypes, and the 6 pass-1 critiques. **This converge OVERTURNS pass-1's M1**: the `out-in` + `<Suspense>` route mechanism was independently live-falsified (`[reject] 13%`) and is RETIRED. The route freeze is RE-DIAGNOSED here.

---

## CONVERGENCE STATUS (the honest gate)

| Mechanism / prototype | pass-1 verdict | converged disposition |
|---|---|---|
| M1 route swap (`out-in` + `<Suspense>`) | **`reject` 13%** — DEAD as written; `out-in`+Suspense → `articles===0` sticky wedge; default-mode → `articles===2/3` stale | **RE-DIAGNOSED** (M0+M1 below). Root cause is the **Aurora unhandled-rejection confounder + per-page GL mount/teardown churn**, not the transition mode. NOT yet build-proven on the de-confounded tree → the unconverged frontier. |
| M2 shell aurora (P2) | `refine` 44% | idiom VALIDATED; one-GL tension + StoryHero/DockStage reconciliation + real-GPU burst proof folded below. |
| M4 top-bar named-timeline (P3) | `refine` 70% | VALIDATED; PRM/non-supporting `scaleX(0)` floor hoist + Safari verify + gate completion folded. |
| M5 hero fit-cap (P4) | `refine` 50% | kernel VALIDATED; true-upper-bound est-lines + ≥4-mandate reconcile + ornament slot + above-fold bar folded. |
| Clean-break audit (P5) | `refine` 74% | safety verdict VALIDATED; props-only delete keeps the 4 tag-presence gates green. |

**OVERALL: ~38%.** The linchpin (the brief headline — *"the leaving page ALWAYS unmounts"*) is `reject` and its re-diagnosed mechanism is unproven, gating ALL downstream SPA paint-verify. Four of five mechanisms have validated diagnoses but NONE were live-paint-verified in Chrome **and** Safari (the binding C-PAINT bar), and the route mechanism must be build-proven against the 5-nav burst falsifier before WS1 can clear. Pass 2 is the build-prove of M0→M1→M2 on a real GPU in both engines.

---

## GESTALT GOAL

One shell, one route-swap mechanism, one persistent field, one fit law. The cure is **subtraction**, sequenced by the evidence (the spec's old chain was INVERTED — FIELD does not depend on ROUTE; FIELD is a PRIMARY CAUSE of the route break):

1. **CONFOUNDER FIRST (M0)** — every Aurora mount (`useAurora`/`<Aurora>`) is armed deferred with NO `onInitError` handler. Its init promise can reject (`"deferred init armed with no onInitError handler"`) as an UNHANDLED rejection that aborts Vue's leave-flush mid-transition — the article ORPHANS (no leave classes, `animationName:none`, `transitionDuration:0s`, never unmounts). Install `app.config.errorHandler` + thread `onInitError` into EVERY Aurora consumer (shell field + StoryHero + DockStage + KonamiAurora) before any route work. This rules out the confounder so the route fix is even measurable.
2. **FIELD WITH/BEFORE ROUTE (M2)** — retire the per-page hero `<Aurora>`/`<Constellation>`/`<FourierField>` mount on every NON-focal route for ONE shell-persistent `<Aurora>` mounted OUTSIDE the route swap unit. This removes the per-route GL mount/teardown churn that is the PRIMARY orphan cause (the corpse is the HERO/intro article, each holding a LIVE Aurora canvas). The metallic `.paper-field` retires in the same cut.
3. **ROUTE (M1)** — with the confounder gone and the GL churn removed, collapse the 4-mechanism pile to the idiomatic Vue-Router-4 form: `<Transition mode="out-in"><component :is="Component" :key="route.path"/></Transition>`, NO `<Suspense>`, NO `v-if`/`v-else-if` branch chain (the async-loading state moves INTO the route component's own async boundary; the no-match case is ALREADY the router catch-all). Build-prove the 5-nav burst.
4. **TOP BAR (M4)** — bind the scroll-progress rail to a NAMED timeline (bare `--demo-main-progress`, never `scroll(<dashed-ident>)`); the `scaleX(0)` origin-left rest is the UNCONDITIONAL floor (outside the `@media`/`@supports` gate) so a non-supporting/PRM engine paints nothing at scroll-top.
5. **HERO (M5)** — add an svh height term to the width-only fit-cap so the rendered title BLOCK is ≤~0.62×svh; the est-lines divisor is a TRUE upper bound (measured, not estimated); route every hero `<h1>` through the ONE chassis title path with a `#title-ornament` slot; the ≥4 rung floor is HONORED (no display-3 downgrade).

Every motion leg is compositor-only (transform/opacity/filter), carries iOS-27 liquid weight (spring-on-spatial / bezier-on-effects, enter-overshoots / exit-no-overshoot), PRM keeps-fade/drops-transform, and paints identically in Chrome AND Safari (the `out-in` floor never depends on native VT). The `<Aurora>` primitive and the `--type-display-*` ladder are byte-untouched (presets-in-consumers).

---

## THE RE-DIAGNOSIS (D1/D9 — why pass-1 M1 was wrong)

Pass-1 diagnosed the freeze as a `<Transition>`-mode problem (default-mode race + `.scroll-build` collision) and prescribed `out-in`+`<Suspense>`. The critique LIVE-FALSIFIED that:

- **`out-in` + `<Suspense>`** → `articles===0`, a STICKY permanent wedge; the page goes blank and never recovers. `<RouterView>` directly inside `<Transition>` is forbidden by Vue Router 4, and `<Suspense>`'s async-fallback window creates a coexistence/wedge the `:key`'d form does not survive.
- **default-mode + `:duration`** → `intro→content` stays `articles===2` stale; `content→content` stays `articles===2`; the burst → `articles===3`. Does not clear the bar.
- **The zombies show `animationName:none`, `transitionDuration:0s`, NO leave classes applied** — Vue ORPHANS the article (it does NOT "wait forever on a scroll-cascade `view()` timeline"; pass-1's claim #3 is mechanistically wrong — the article root has `animDur:0s` and Vue's `timeout+1` safety net fires). The corpse is specifically the HERO/intro article, **each holding a LIVE Aurora canvas (3 observed)**.

**The corrected root cause (two compounding faults, both at the FIELD layer):**

1. **The unhandled-rejection confounder.** `Aurora.vue` arms deferred; init failures "surface by default ... on the microtask queue on the deferred path" UNLESS `onInitError` is passed. AppShell's per-page hero Auroras (StoryHero) and DockStage pass NO `onInitError`. A rejected init on the microtask queue during a route leave aborts Vue's leave-flush → the orphan. **Fix: M0 — `app.config.errorHandler` + `onInitError` on every Aurora mount.**
2. **Per-route GL mount/teardown churn.** Each hero route mounts its own full-bleed `<Aurora position:fixed inset:0>`; navigating mounts/unmounts a GL context per route. The teardown races the leave-flush. **Fix: M2 — ONE shell-persistent Aurora outside the swap unit; the per-route hero substrate retires.**

Once M0+M2 land, the transition mode is RE-MEASURED on the clean tree. The candidate is the documented Vue-Router-4 idiom (`<Transition mode="out-in"><component :is :key>`, no Suspense, no branch chain). The binding bar is the 5-nav burst → `survivorArticleCount===1` — pass-1 NEVER measured a transition mode on a de-confounded tree, so this is the unconverged frontier (Open Risk 1).

---

## MECHANISM (hardened, concrete)

### M0 — Eliminate the Aurora-rejection confounder (NEW — the gating pre-step, BG.W-ROUTE-TRANSITION)

```ts
// demo/main.ts — the global error trap (rules out an unhandled rejection
// aborting Vue's leave-flush; also a real bug surfacer, not a swallow).
app.config.errorHandler = (err, _instance, info) => {
    console.error("[demo] app error", info, err);
};
```

Thread `onInitError` into EVERY Aurora mount so a deferred-init failure is a HANDLED fallback, never an unhandled rejection:
- the shell field `<Aurora>` (M2),
- `StoryHero.vue`'s `<Aurora v-if="kind==='aurora'">` (the focal-route mount that survives M2),
- `DockStage.vue`'s `<Aurora>`,
- `KonamiAurora` / any egg Aurora.

The handler logs + leaves the placeholder (Aurora's documented "canonical opt-in path back to silent fallback"). **No swallow** (the C-PAINT / no-silent-handling law) — it logs, the build agent reads the console. Gate: `proof:route-confounder` (a NEW device-free arm — every `<Aurora`/`useAurora(` mount in `demo/` has an `onInitError` in scope, + `app.config.errorHandler` present, + a self-test bite that reds a synthetic un-handled mount).

### M1 — The route swap: the idiomatic Vue-Router-4 form (D1/D9, the linchpin)

The clean mechanism on the de-confounded, one-GL tree:

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism (NO Suspense, NO v-if branch chain) -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
```

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → exactly 1 `<article>` at every settle, by construction. This is the load-bearing line — **but it is the line pass-1 falsified WHILE THE CONFOUNDER WAS PRESENT.** It is re-asserted here ONLY because M0+M2 remove the orphan cause; it is NOT converged until the burst π proves it (Open Risk 1).
- **NO `<Suspense>`.** The async-chunk loading state moves OFF the AppShell transition slot. Two candidate placements (pick by pass-2 build-prove, KISS-first):
  - **(preferred) `defineAsyncComponent`** per lazy route: `defineAsyncComponent({ loader: () => import(...), loadingComponent: RouteBloomSkeleton, delay: 120 })` — the loading skeleton lives INSIDE the async component, so the AppShell transition slot only ever holds ONE unit (the resolved-or-loading component), never a branch race. The skeleton shows only if the chunk is slow (`delay`).
  - **(fallback) eager glob** (`import.meta.glob(..., { eager: true })`) — the storybook chunks are small; eager-loading removes the async window entirely (no skeleton, no Suspense, trivially correct `out-in`). Trade-off: larger initial bundle. Measure `proof:lighthouse` first-paint before committing.
- `:key="route.path"` on `<component>` → an unambiguous swap unit per route.
- **NO `v-if`/`v-else-if` branch chain.** The "Pick a story" no-match `<Card>` is DEAD CODE — `demo/router.ts` ALREADY ships a catch-all `/:pathMatch(.*)*` → `NotFound.vue`, so `route.matched.length === 0` is unreachable inside the slot; delete the AppShell Card branch clean. The skeleton `v-else-if` retires with the bloom (M0/M2 remove its driver).

**`.scroll-build` decouple:** remove `.scroll-build` from the routed article roots (`StoryPage.vue`, `SectionLanding.vue`). The `gl-page-build` mount-keyframe ran the SAME opacity/transform legs as the leave-transition on the SAME element (a `getTransitionInfo` mis-detect — a SECONDARY contributor, not the primary cause, but still removed for cleanliness). The entrance WEIGHT moves into the `route-liquid` enter curve (one entrance system). KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` (scroll-driven `view()`/`scroll()` registers — they do not collide).

**The `route-liquid` recipe** (mint in `src/styles/transitions.css`, DRY off the shipped `.pane-swap-*` out-in precedent at `transitions.css:109`):

```css
/* route-liquid — the ONE route page-swap (out-in). DRY off .pane-swap-*. */
.route-liquid-enter-active {
    transition:
        opacity var(--duration-normal) var(--ease-out),
        transform var(--spring-snappy-duration) var(--spring-snappy);  /* SPATIAL spring (P1), small settle overshoot */
}
.route-liquid-leave-active { transition: opacity var(--duration-fast) var(--ease-out); }  /* fade-only, NO overshoot past gone (P2) */
.route-liquid-enter-from   { opacity: 0; transform: translateY(0.75rem); }
.route-liquid-enter-to     { opacity: 1; transform: none; }
.route-liquid-leave-to     { opacity: 0; }  /* leave never animates transform (no fight) */
@media (prefers-reduced-motion: reduce) {
    .route-liquid-enter-from, .route-liquid-enter-to, .route-liquid-leave-to { transform: none !important; }  /* P6 */
    .route-liquid-enter-active, .route-liquid-leave-active { transition-property: opacity !important; }
}
```

Compositor-only, PRM-carved, Safari-safe (CSS `<Transition>` — never depends on VT for the swap).

**Deletions (clean break, `proof:no-dual-path`):** `useBloomUp` import + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom `watch(route.fullPath)` (AppShell.vue:255-303); the category-switch `startViewTransition` watcher + `dataset.categorySwitch` (AppShell.vue:202-228 — dead consumer, grep proves 0 readers); the skeleton `v-else-if` branch + the no-match `<Card>` branch + the `Skeleton`/`useBloomUp` imports. `useBloomUp` stays a shipped primitive with other consumers (liquid-playground, dock) — only the AppShell MISUSE is deleted. KEEP the ONE scroll-reset owner (`mainEl.scrollTo` watcher, AppShell.vue:195); the router `scrollBehavior: () => ({top:0})` targets the WINDOW (not `<main>`) so it is harmless, not a double-fire (recorded, not deleted).

> **Why not native View Transitions for the swap?** Safari 18.4+ supports same-document VT, so VT is a legitimate ENHANCEMENT — but the floor MUST be the Vue `out-in` `<Transition>` (always-correct, Safari-safe on older WebKit, PRM-instant by the recipe). VT is `BG.W-VT-ROUTE-ENHANCE`, deferred/optional, additive, and MUST NEVER re-introduce a concurrent default-mode transition (the unmount π stays green). It folds its directional `types:['forward'|'back']` into a single `navigate(opts)` path — not a second engine.

### M2 — The field: ONE shell aurora + the genuinely-ONE-field reconciliation (D2/C-FIELD)

**Root cause:** `AppShell.vue:360` mounts `<PaperBackdrop field>` UNCONDITIONALLY → `.paper-field` (`paper.css:129-269`): conic cel-sheen + 4 high-chroma radials (oklch C 0.115–0.155 brown pigment) + a `::before` 42s `field-cel-drift` churn on a `position:fixed will-change:transform` plane. This IS the "disgusting metallic." `[data-paper-field]` is a PHANTOM gate (paper.css:113 documents it; 0 DOM setters). AND `StoryHero.vue` mounts a SECOND field system (per-page `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` full-bleed `position:fixed inset:0`), AND `DockStage.vue` a THIRD. The brief's "ONE shell aurora replaces" was never reconciled with the 2nd/3rd systems.

**The fix — genuinely ONE field, three reconciliations:**

```vue
<!-- AppShell.vue — the ONE persistent field. Aurora has NO :paused prop
     (pass-1 fiction — verified: props are config/runtimeOptions/onInitError/
     renderMode/opacityCeiling; pause/resume/isArmed are defineExpose'd METHODS).
     Suppression is via a template-ref method call + gating the deferred arm. -->
<Aurora
    ref="shellAurora"
    :config="shellAuroraConfig"
    :opacity-ceiling="0.5"
    :on-init-error="onShellAuroraError"
    class="fixed inset-0 -z-10"
    :class="{ 'shell-aurora--suppressed': routeOwnsFocalSubstrate }"
    aria-hidden="true"
/>
```

1. **Persistent across navs** — mounted at the shell root, OUTSIDE the `<Transition>` swap unit, so it never re-arms per route. P2 PROVED node identity stable across 8 cross-category navs (`auroraIdStableAll:true`, `auroraInsideMain:false`). One GL context for the whole non-substrate shell — which is the synergy that de-risks the route freeze (removes per-route GL churn).
2. **Per-route hue WITHOUT a re-mount** — `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)` → a calm warm preset. The hue updates reactively (a uniform re-upload via Aurora's deep config watch), never a canvas re-mount. **REUSE `heroAuroraConfig(paletteKey)`** (the calm pastel band — `breathPeriod:48`, `nucleiDrift/paletteDrift:0.012`, `saturation:0.95`) keyed off the category's `CATEGORY_PALETTE_HUES` index, NOT a third re-hue-only factory inheriting `DEFAULT_AURORA_CONFIG`'s vivid L/C (the P2 mustfix — DRY off the existing calm config).
3. **The one-GL resolution — gate the deferred ARM, do not just pause** (the P2 mustfix; `pause()` parks the rAF but VRAM/context PERSIST). On a focal-substrate route the shell aurora **must never create its context**: gate the deferred `arm()` scheduling on `!routeOwnsFocalSubstrate` (and `dispose()` if already armed, re-arm on return). `routeOwnsFocalSubstrate` is computed off a NEW per-ROW `route.meta.focal` flag (see below). The suppression also hides the shell PAINT under a focal route (`.shell-aurora--suppressed { opacity: 0 }` or `display:none`) so a paused last-frame / CSS placeholder never bleeds under the focal substrate (the P2 "suppress the paint, not just the rAF" mustfix). Verify `glContextCount` on a REAL GPU for the content→substrate direction (the `max=1` claim was a GPU-less artifact).
4. **The 2nd/3rd field systems RECONCILE onto the shell (the P2 mustfix — genuinely ONE field):**
   - **StoryHero** retires its per-page `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` mount for NON-focal routes — the shell aurora IS the field. It KEEPS the per-page focal substrate mount ONLY for genuinely-focal substrate DEMO rows (the viz is the literal subject). On a focal row the shell suppresses and the focal viz is the sole context.
   - **DockStage** folds onto the shell field (one fewer GL) where the shell covers it; it keeps its own functional aurora ONLY where it must demonstrate pause/resume on a real renderer.
   - The static `grid`/`paper` per-page page-backgrounds also collapse onto the shell aurora (the brief: every NON-substrate route paints a calm warm AURORA). The blueprint-grid + paper grain demote to OPT-IN SPECIMEN decorations (BG.W-PAPER-GRAIN-OPTIN), not universal page fields.
5. **The focal determination is PER-ROW, not per-category** (the P2 mustfix — `FOCAL_SUBSTRATE_KINDS` over a whole category forces per-route GL churn on navigation/motion content that should USE the shell). Project `route.meta.focal: boolean` from the manifest where a row's background is a genuinely-focal viz demo (the `/substrates/*` viz rows + the specific viz-demo rows), reading the EXISTING per-row `background`/`bgKind` scoping — do NOT re-mint a parallel `routeFocalSubstrate` projection. A content row that decoratively defaults to `aurora`/`constellation`/`grid` is NOT focal → it uses the shell aurora, no per-route GL.
6. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, the live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR cap. **Safari/Chrome:** the CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. Live-verify on a real GPU that the field stays CALM warm AND glass clears AA over it at `opacityCeiling 0.5` in BOTH modes (the P2 mustfix).

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`demo/stories/warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `WARM_HUE_LO/HI` + `warmFieldHue`) is a VERIFIED-verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + a same-named `clampWarm` + the SAME `[25,95]` band). **Fold:** `aurora-hero.ts`'s `warmProjectHue` is canonical; re-derive `warmFieldHue` from it (delete the duplicated body in `warm-field.ts`, keep `warmFieldHue` as a thin re-export/adapter). **PRESERVE all 3 `warmFieldHue` consumers** (the P2 mustfix — verified): `AppShell.vue:237` (`fieldHue`), `SectionLanding.vue:48` (`cardFieldH`), `SectionPreviewCard.vue:167` (`--card-field-h`). ONE warm-hue source feeds the shell field AND the hero palette AND the bento card hues. Also rewire `useGlassBackdropLuminance` (built for dock-over-live-aurora) to sample the live SHELL canvas (zero new cost — already a `drawImage + getImageData` sampler).

### M4 — The top-bar: named-timeline bind (D5, BG.W-SCROLL-PROGRESS-RAIL)

**Root cause (P3 VALIDATED):** `scroll-driven.css:45` hardcodes `animation-timeline: scroll(var(--scroll-progress-scroller, root) block)`; `dock-nav.css:231` overrides `--scroll-progress-scroller: --demo-main-progress` → `scroll(--demo-main-progress block)`. `scroll()` accepts ONLY scroller KEYWORDS (`root`/`nearest`/`self`), never a `<dashed-ident>` → invalid → computed `auto` → the `from{scaleX(0)}` never binds → the bar paints `scaleX(1)` full-width at `--primary` ink. It is ALSO `opacity:0.85` at rest (a full-width hairline showing at scroll-top). `CSS.supports` confirms: `scroll(--demo-main-progress block)`=FALSE, `--demo-main-progress`=TRUE.

**The fix (P3 VALIDATED + the critique mustfixes folded):**

```css
/* scroll-driven.css — the UNCONDITIONAL floor + the gated animation. */
.scroll-progress {
    transform-origin: 0 50%;
    transform: scaleX(0);   /* the true non-supporting/PRM floor — HOISTED outside the gate (P3 mustfix) */
}
@media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: scroll()) {
        @keyframes gl-scroll-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .scroll-progress {
            animation: gl-scroll-grow auto linear;
            animation-timeline: var(--scroll-progress-timeline, scroll(root block));  /* full-value var; a named scroller passes the BARE ident */
        }
    }
}
```

- **Hoist `transform-origin: 0 50%` + `transform: scaleX(0)` to the UNCONDITIONAL rule** (P3 mustfix) so a non-supporting/PRM engine rests at `scaleX(0)`, NOT `scaleX(1)` full-width — VERIFY with scroll-timeline disabled (Firefox-no-flag / DevTools emulate-unsupported), the Chrome-at-scroll-top capture cannot prove it.
- The consumer passes the BARE ident: `.demo-scroll-progress { --scroll-progress-timeline: --demo-main-progress; }` (drop the dead `--scroll-progress-scroller`). **Rest is `scaleX(0)`, NOT `opacity:0.85`** — re-express the affordance as faint-but-SHRUNK so a non-supporting engine renders nothing at the top.
- **Migrate the `scroll-vt.vue` `self`-keyword consumer** onto its OWN named timeline (`scroll-timeline-name` + `timeline-scope: --sp` preceding-sibling reference) and VERIFY the story bar GROWS 0→1 on panel scroll in BOTH engines after the clean break (the recipe break breaks the old `self` usage — prove the coupled consumer, don't assume).
- **Land the gate COMPLETE in the SAME wave** (P3 mustfix, no-legacy clean break): re-point `proof:ba-animate` W2's predicates (`scrollerOverride`, `scrollerNotRoot`) to `--scroll-progress-timeline`; add a global `scroll(\s*--` dashed-ident scan across `src`+`demo` (the PRECISE invalid pattern, NOT all `scroll()`) + a self-test bite; update the `gates.mjs` note + the proof/spec/AppShell comments. **Tighten the override gate regex** to reject only `scroll(\s*--` (dashed-ident arg), not the over-broad `!/\bscroll\s*\(/` that would reject a legitimate `scroll(nearest block)`.
- Keep the `@supports` + PRM gates (Safari ≤17 degrades to the `scaleX(0)` terminal). **Live-paint-verify in a real WebKit/Safari context** (C-PAINT): `animationTimeline === '--demo-main-progress'` + `scaleX(0)` rest + grows on scroll.

### M5 — The hero fit (D10, BG.W-HERO-FIT)

**Root cause (P4 VALIDATED):** `story-hero.css:227-230` fit-cap is `min(rung, (100vw - 2*pad)/7)` — WIDTH-only, NO svh/height term. A multi-word title wraps to N lines; each line at the width-budget font stacks past the viewport (live `/compositions/hero`: 287px font → 6-line wrap → 1809px block = 1.675×svh). Two title paths exist — the chassis `.story-hero-title[data-hero-scale]` (fit-capped) and a hand-authored `:hero-title="false"` + bare `<h1 class="text-display-*">` lane (ZERO protection — `hero.vue`/`intro.vue`/`auth-shell.vue` live here).

**The fix (P4 kernel VALIDATED + the critique mustfixes folded):**

1. **Height-aware fit-cap** — add an svh term to the `min()` (the kernel; `font-size` is a static resolution, not a layout-animated property; the `--type-display-*` ladder is byte-untouched, the cap is the only edit at `[data-hero-scale]`, specificity 0,2,0):

```css
.story-hero-title[data-hero-scale] {
    font-size: min(
        var(--story-hero-title-rung, var(--type-display-4)),
        var(--story-hero-title-fit, calc((100vw - 2 * var(--story-hero-pad, 2rem)) / var(--story-hero-cpl, 7))),
        var(--story-hero-title-svh, calc(0.62 * 100svh / var(--story-hero-est-lines, 2)))  /* HEIGHT budget (svh for address-bar safety) */
    );
}
```

2. **`--story-hero-est-lines` is a TRUE upper bound, MEASURED not estimated** (the P4 mustfix — `ceil(chars/18)` under-counts word-wrap/long-word/balance). A small `useResizeObserver`-driven cap in `StoryHero.vue` measures the ACTUAL rendered line count (`round(scrollHeight / lineHeight)`) and writes the real value back into `--story-hero-est-lines` so the cap SELF-CORRECTS to the true wrap (compositor-safe — it sets a custom property the font-size `min()` reads; one re-cap on resize, not per-frame). The seed estimate is the worst-case content class; the ResizeObserver guarantees the bound holds at every breakpoint. **DELETE the dead `max-block-size: calc(0.62*100svh)` backstop** (it does nothing with `overflow:visible`, clips with `overflow:hidden` — it is not a font-size cap).
3. **ONE chassis title path with a `#title-ornament` slot** (the P4 mustfix — leg-1, the load-bearing half) — retire `:hero-title="false"` + the bare `<h1 class="text-display-*">` in `hero.vue`/`intro.vue`/`auth-shell.vue` (clean break); render every hero `<h1>` through `.story-hero-title[data-hero-scale]`, with a `#title-ornament` slot that PRESERVES the bespoke eyebrow + ℱ wordmark ornament + blurb (do NOT regress their identity by replacing with the generic manifest header). Drop `max-w-5xl` (it manufactures the wrap) → the chassis `~18ch` measure.
4. **The ≥4 rung floor is HONORED — no display-3 downgrade** (the critique mustfix — `display-3` is the RETIRED ≥4 user-mandate floor; `HeroScale` does not include `'3'`). The svh cap does the height-bounding WITHOUT a rung change, so the audacious tier survives where it fits and the cap shrinks it where it does not. Where a sentence-length headline STILL reads too large even svh-capped, the gestalt-not-patch resolution is to **re-author that title to wordmark/phrase length** (the `/compositions/hero` "mega audacious-type showcase" intent is preserved by keeping it a SHORT audacious phrase), NOT to floor it at a retired rung. Surface any genuine title→rung conflict explicitly in the wave (do not silently downgrade).
5. **Single-source the line factor** — `--story-hero-cpl` (chars-per-line) and the JS `HERO_CHARS_PER_LINE` read ONE constant (the P4 mustfix — the `18`/`7` literals cannot desync).

---

## SEQUENCING (the HARD dependency chain — RE-ORDERED from pass-1)

Pass-1's chain (FIELD depends on ROUTE) is INVERTED on the evidence. The converged order:

1. **M0 — confounder elimination** (`app.config.errorHandler` + `onInitError` everywhere). Gating; rules out the unhandled-rejection abort so the route fix is measurable.
2. **M2 — the ONE shell aurora + per-page-substrate retire** (lands WITH or just before M1). Removes the per-route GL churn that is the PRIMARY orphan cause. The `.paper-field` retires here.
3. **M1 — the route swap** (`out-in` `<component :is :key>`, no Suspense, no branch chain). Build-prove the 5-nav burst on the de-confounded one-GL tree. **Blocks all downstream SPA paint-verify.**
4. **M4 — top-bar named-timeline** — INDEPENDENT, can land in parallel with M0-M2 (de-risks the named-timeline binding).
5. **M3 — warm-field fold** — after M2 (the shell field is the canonical hue consumer).
6. **Grain opt-in** (BG.W-PAPER-GRAIN-OPTIN) — after M2.
7. **M5 — hero fit** — after M1 (pages must mount to measure).
8. **BG.W-VT-ROUTE-ENHANCE** — DEFERRED/optional, gated on M1 green.

---

## WAVE BREAKDOWN

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
M0 (the confounder kill — `app.config.errorHandler` + `onInitError` on every Aurora mount) + M1 (`<Transition mode="out-in"><component :is :key>`, NO Suspense, NO `v-if` branch chain; the no-match Card deleted as dead-since-the-catch-all; the skeleton+bloom+2-VT-watchers+`dataset.categorySwitch` deleted; mint `route-liquid` DRY off `.pane-swap-*`; `.scroll-build` off both article roots; KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` + the ONE scroll-reset owner). Async-loading via `defineAsyncComponent` loadingComponent (or eager glob — measure first-paint). Device-free gate: `mode="out-in"` present, the 4 deleted mechanisms ABSENT, no `scroll-build` on a routed article root, every Aurora mount handled + `app.config.errorHandler` present, + a self-test bite. **Binding π: the 5-nav-<300ms burst → `survivorArticleCount===1` + `articles===1` at every settle + monotonic-WebGL-context assert across N navs, in Chrome AND Safari.**

### 2. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
M4: hoist the `scaleX(0)` floor unconditional; named-timeline `var(--scroll-progress-timeline, scroll(root block))`; drop the conflated `--scroll-progress-scroller`; migrate the `scroll-vt.vue` `self` consumer to a named timeline + `timeline-scope`; rest `scaleX(0)` not `opacity:0.85`. Gate COMPLETE: no recipe emits `scroll(<dashed-ident>)` anywhere (precise scan) + re-point `proof:ba-animate` W2 predicates + tighten the override regex + self-test bite. **π: `animationTimeline==='--demo-main-progress'` + `scaleX(0)` rest + grows on scroll, Chrome AND Safari + a scroll-timeline-DISABLED engine resting `scaleX(0)`.**

### 3. `BG.W-FIELD-AURORA` — lands WITH #1 (M2 is a primary route-fix cause, not a follow)
Retire `.paper-field` (clean break — `paper.css:129-269` + the `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`); mount ONE shell-persistent `<Aurora>` (template-ref + `pause`/`resume`/arm-gate, NOT a fictional `:paused` prop); per-ROW `route.meta.focal` suppression that GATES the deferred arm (never creates the context on a focal route) + hides the shell paint under a focal substrate; reconcile StoryHero + DockStage onto the shell field (per-page substrate mount kept ONLY on genuinely-focal rows); reuse `heroAuroraConfig` for the calm config. Gate: `proof:offscreen-pause` un-regressed + a `no-paper-field` source assert + a per-row-focal assert. **Binding π (REAL GPU): `glContextCount===1` on every non-substrate route AND on a content→substrate→content round-trip (no monotonic leak); calm warm aurora, NO conic/brown/speckle; glass clears AA over it at `opacityCeiling 0.5` BOTH modes; no stale warm wash bleeds under a focal substrate.**

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #3
M3: delete the duplicated body in `warm-field.ts`; canonical `warmProjectHue` on `aurora-hero.ts`; PRESERVE all 3 `warmFieldHue` consumers; rewire `useGlassBackdropLuminance` to the shell canvas. Gate: single-source-of-warm-hue assert + the 3-consumer presence assert + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #3
Demote the universal `.paper-underpaint` 0.22 grain to per-surface opt-in (math-paper/printed specimens); `PaperBackdrop` returns to a pure grain register (drop the field welding). KEEP grain tokens + blend law; re-tune opacity for the opt-in case. Gate: no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1 (pages must mount to measure)
M5: svh height term on the fit-cap; `--story-hero-est-lines` MEASURED via `useResizeObserver` (true upper bound); delete the dead `max-block-size` backstop; ONE chassis title path + `#title-ornament` slot (retire bare `<h1>` in the 3 pages); ≥4 rung floor HONORED (re-author offending sentence titles, no display-3); single-source the line factor. NO `--type-display-*` token edit. **π (Chrome AND Safari, 375/768/1440/1920, both modes): rendered `<h1>` BLOCK ≤~0.62×svh for the LONGEST manifest hero title; ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page (the COUPLED cluster height, not just h1).**

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
Export `navigate` on the motion-core barrel; drive `router.push` through it with directional `types:['forward'|'back']` (router depth) behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor. MUST NEVER re-introduce a concurrent default-mode transition (the unmount π stays green). One code path, folded into W-ROUTE-TRANSITION's nav handlers — NOT a parallel helper.

---

## FILES TOUCHED

| File | Change | Wave |
|---|---|---|
| `demo/main.ts` | ADD `app.config.errorHandler` (the confounder trap) | W-ROUTE-TRANSITION |
| `demo/layout/AppShell.vue` | `out-in` `<Transition>` over `<component :is :key>` (NO Suspense, NO branch chain); DELETE useBloomUp/skeleton/bloom-watch/2 VT watchers/`dataset.categorySwitch`/no-match Card; replace `<PaperBackdrop field>` with persistent `<Aurora ref :on-init-error>` + arm-gate suppression | W-ROUTE-TRANSITION, W-FIELD-AURORA |
| `src/styles/transitions.css` | MINT `route-liquid` (DRY off `.pane-swap-*`); PRM carve | W-ROUTE-TRANSITION |
| `demo/router.ts` | thread per-row `meta.focal`; (optional) `defineAsyncComponent` loadingComponent wrapper if not eager-glob | W-ROUTE-TRANSITION, W-FIELD-AURORA |
| `demo/stories/StoryPage.vue`, `SectionLanding.vue` | REMOVE `.scroll-build` from the article root | W-ROUTE-TRANSITION |
| `src/styles/scroll-choreography.css` | (optional) retire the article-root `gl-page-build` stagger | W-ROUTE-TRANSITION |
| `demo/stories/StoryHero.vue` | retire per-page substrate mount on NON-focal routes (shell aurora is the field); KEEP focal-row mount + thread `onInitError`; `#title-ornament` slot; `useResizeObserver` est-lines re-cap | W-FIELD-AURORA, W-HERO-FIT |
| `demo/stories/dock/DockStage.vue` | fold onto the shell field where covered; thread `onInitError` | W-FIELD-AURORA |
| `src/styles/paper.css` | DELETE `.paper-field` + `.dark .paper-field` + `field-cel-drift` + conic/radials + `--field-h` (~135 lines) | W-FIELD-AURORA |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | DELETE `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`; pure grain register | W-PAPER-GRAIN-OPTIN |
| `demo/stories/warm-field.ts` | DELETE the duplicated body; `warmFieldHue` re-derives from `aurora-hero.ts` (preserve the 3 consumers) | W-FIELD-ACCENT-RECONCILE |
| `demo/stories/aurora-hero.ts` | export the canonical `warmProjectHue`-derived `warmFieldHue` + the shell calm config helper | W-FIELD-ACCENT-RECONCILE |
| `demo/stories/manifest.ts` | project per-row `focal` → `route.meta`; single-source the hero line factor | W-FIELD-AURORA, W-HERO-FIT |
| `src/styles/scroll-driven.css` | hoist the `scaleX(0)` floor unconditional; named-timeline `var(--scroll-progress-timeline, scroll(root block))`; drop the conflated path | W-SCROLL-PROGRESS-RAIL |
| `demo/layout/dock-nav.css` | `.demo-scroll-progress { --scroll-progress-timeline: --demo-main-progress }`; rest `scaleX(0)` not `opacity:0.85` | W-SCROLL-PROGRESS-RAIL |
| `demo/stories/.../scroll-vt.vue` | migrate `self`-keyword consumer → named timeline + `timeline-scope` | W-SCROLL-PROGRESS-RAIL |
| `demo/stories/story-hero.css` | svh height term on the fit-cap `min()`; delete the dead `max-block-size` backstop; drop `max-w-5xl` welding | W-HERO-FIT |
| `demo/stories/hero.vue`, `intro.vue`, `auth-shell.vue` | retire `:hero-title="false"` + bare `<h1>`; route through chassis `#title-ornament`; re-author over-length sentence titles | W-HERO-FIT |
| `src/composables/glass/useGlassBackdropLuminance` (rewire site) | sample the live shell canvas | W-FIELD-ACCENT-RECONCILE |
| gates (`scripts/proof-*.mjs`) | `proof:route-confounder` (new), `proof:ba-animate` re-point + `scroll(\s*--` scan, per-row-focal assert, 3-consumer assert | per wave |

> **Fence:** ALL edits are glass-ui/demo-local (foreign-tree fence absolute). The `<Aurora>` primitive + `--type-display-*` ladder are byte-untouched (presets-in-consumers). No `src/styles` token VALUE edit in W-HERO-FIT.

---

## ACCEPTANCE / REAL-PAINT-π BAR

> **C-PAINT (binding):** the headless-green/visually-broken disease shipped 3× (BB/BC/BD). **Every WS1 acceptance is a FRESH LIVE CAPTURE by an agent who did NOT author the build, in Chrome AND a Safari/WebKit context, on a REAL GPU.** Device-free gates prove SOURCE shape; the live π proves PAINT. NONE of pass-1 verified Safari/WebKit — the bar is unmet until it does.

**Routing (the convergence bar — the linchpin, Open Risk 1):**
- ≥6 cross-category hops: at every settle `main.querySelectorAll('article').length === 1` AND `main h1.textContent === destination title`.
- **5-nav-in-<300ms stress → `survivorArticleCount === 1` AND the survivor heading === the LAST destination**, sampled at +60/+360/+1260ms. (The single-nav/8-hop result does NOT falsify — the burst on a REAL GPU is the only trustworthy bar.)
- A binding **`articles===1` at every settle** assert AND a **monotonic-WebGL-context-growth** assert across N navs (the headless-single-nav-green/orphan-compounds-under-rapid-nav trap).
- No reload required (URL change == DOM change). PRM keeps fade, drops transform.

**Field:**
- Every non-substrate route paints a calm warm AURORA — NO conic sheen, NO brown slab, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5`.
- `glContextCount === 1` on every non-substrate route AND on a content→substrate→content round-trip (no monotonic leak); a focal substrate route's viz is the sole live context with NO stale shell wash bleeding under it. **Re-verified on a real GPU** (the `max=1` GPU-less claim does not count).

**Top bar:**
- `getComputedStyle('.demo-scroll-progress').animationTimeline === '--demo-main-progress'` (NOT `'auto'`); `scaleX(0)` at scroll-top on EVERY route; grows on scroll; a scroll-timeline-DISABLED engine rests `scaleX(0)` (not `scaleX(1)`).

**Hero:**
- Rendered `<h1>` BLOCK height ≤~0.62×svh at 375/768/1440/1920, BOTH modes (the LONGEST manifest hero title, not one example); ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page (the coupled cluster height).

**Cross-browser:** all of the above in Chrome AND Safari/WebKit; the `out-in` floor must unmount-then-mount regardless of native-VT support.

Capture DELTAs (screenshot + paired-π), never a commit-message claim.

---

## FOLDED DEFERRED / CROSS-WS HANDOFFS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement tier; deferred/optional, gated on #1 green, additive, never a concurrent transition; folds directional `types` into ONE `navigate(opts)` path.
- **`useGlassBackdropLuminance` rewire** to the live shell canvas — lands in W-FIELD-ACCENT-RECONCILE (zero new cost).
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, no carrier; a CONSUMER-ASSET arm (DEFER-with-trigger), not a library wave. Foreign-tree fence holds.
- **`BG.W-SCROLL-SHRINK-UNIFY`** (the 3-fork DRY collapse: card-scroll + story-hero-shrink + story-hero-scroll-away → one keyframe family) → **WS4**; HARD-DEPENDS on W-ROUTE-TRANSITION. Sequence after WS1.
- **Morph-engine consolidation** (`useLiquidMorph` DELETE — 462 LOC / 0 consumers; the FLIP trio `useLiquidReveal`/`useBloomUp`/`useDockCtaReceive` → one `useFlip`) → **WS2/WS4**.
- **`BG.W-CARTOON-INK-WARM`** (D3 red/maroon cast) → **WS3**; **`BG.W-DOCK-MORPH-INPLACE`** (D13) → **WS2**.
- **`W-PAINT-IS-THE-GATE`** → **WS7**, but BINDS every WS1 wave's π (PRM, one-GL-per-route, Safari-as-floor-not-VT, CLS≈0, warm-not-red).

---

## OPEN RISKS / RESIDUAL GAPS (the unconverged frontier)

1. **(HIGHEST — the gate) The route mechanism is unproven on the de-confounded tree.** `out-in` was falsified WHILE the confounder was present; it is re-asserted only because M0+M2 remove the orphan cause. Pass 2 MUST build-prove the 5-nav burst → `survivor===1` + `glContext===1` + `heading===dest` at every settle, in Chrome AND Safari, on a real GPU. If `out-in` still strands post-de-confounding, fall to the `defineAsyncComponent`-loadingComponent variant or the eager-glob variant and re-measure. **Until this proves, WS1 does not clear.**
2. **The async-loading placement.** `defineAsyncComponent` loadingComponent vs eager glob — decided by pass-2 build-prove (first-paint via `proof:lighthouse` vs the swap cleanliness). Do NOT re-introduce `<Suspense>` (falsified — sticky wedge).
3. **One-GL on a real GPU.** `pause()` does not release the context; the arm-gate must NEVER create the shell context on a focal route. Re-verify `glContextCount` on a real GPU for content→substrate→content.
4. **`scroll-build` removal entrance feel.** The weight moves into the `route-liquid` enter spring; if it reads flat, re-home a single interior beat onto a non-transition-root wrapper (P1 visual capture judges it).
5. **The svh fit-cap est-lines bound.** The ResizeObserver re-cap is the true-upper-bound mechanism; verify on the LONGEST manifest title at all 4 breakpoints both modes (a borderline title that wraps one line more than the seed must self-correct, not overflow).
6. **`proof:*` gates locking field assertions.** P5 verified the 4 tag-presence gates match the component TAG (`<Aurora|<PaperBackdrop`), so a props-only `.paper-field` delete keeps them green — but re-audit any `proof:` reference to `paper-field`/the field before the break (`proof:no-dual-path` forbids the superseded mechanism surviving).
7. **Safari same-document VT in the deferred enhancement** — feature-detect (`supportsRouteTransitions()`); a Safari gap falls to the `out-in` floor cleanly.

---

## CONVERGENCE LEDGER (per-prototype, folded)

| pass-1 item | verdict | converged mechanism | residual |
|---|---|---|---|
| P1 route (`out-in`+Suspense) | reject 13% | M0 confounder-kill + M2 one-GL-shell + M1 idiomatic `out-in`/`<component :is :key>` (no Suspense, no branch chain) | the 5-nav burst build-prove on the de-confounded tree (Open Risk 1) |
| P2 shell aurora | refine 44% | M2: template-ref pause + arm-gate (not `:paused`); per-ROW focal suppression; StoryHero/DockStage reconcile; reuse `heroAuroraConfig`; `onInitError` | real-GPU one-GL + burst + AA-over-field both modes |
| P3 top-bar | refine 70% | M4: unconditional `scaleX(0)` floor + named-timeline + gate-complete + regex tighten | Safari paint-verify + scroll-timeline-disabled rest verify |
| P4 hero-fit | refine 50% | M5: svh leg + measured est-lines + `#title-ornament` + ≥4 floor honored | land + live-verify both engines; above-fold cluster bar |
| P5 clean-break | refine 74% | props-only `.paper-field` delete; `warm-field.ts` fold | re-audit `proof:` field refs in lockstep |
