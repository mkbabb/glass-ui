# BG-WS1 · Shell · Routing · Field — SPEC (pass 3 — INTEGRATE-then-CAPTURE; the paint is the gate)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large · **C-PAINT** (the close condition — headless-green/visually-broken shipped 3×).
> Supersedes `SPEC-pass2-converged.md` (read it; this ADVANCES it, does not restart). Grounded against HEAD `tranche/BG` @879c0c41 (4.2.0), live-reproduced on `:5199`. The pass-2 mechanisms are **source-correct and build-validated in isolation** — pass 3 closes the genuinely-unconverged frontier: **(0) the build is NOT integrated onto `tranche/BG` anywhere** (the prototypes never merged); **(1) the binding REAL-PAINT-π is uncaptured on a real GPU by a non-authoring agent, and Safari/WebKit has ZERO evidence**; **(2) three falsifiers the pass-2 π was BLIND to** — the Vue-#7956 leading-comment-root white-screen, the article-count false-green, and the svh-cap-vs-≥4-rung-floor collision.

---

## WHAT PASS 3 ADDS (the unconverged frontier — read this first)

Pass 2 converged the MECHANISM. Pass 3 converges the EXPERIMENT. Five deltas, each load-bearing, each born from a live repro or a HEAD scan:

| # | pass-2 state | pass-3 correction (verified) | consequence |
|---|---|---|---|
| **Δ0** | "capture the paint on the BUILT tree" | **The build is unbuilt.** Zero `route-liquid`/`routeOwnsFocalSubstrate`/`shellAuroraConfig`/`scroll-progress-timeline`/`story-hero-est-lines` in `demo`+`src` (grep-confirmed). The 9 `wf_*` prototype worktrees sit at pre-BG base `998136bb`, never merged. | **STEP 1 is INTEGRATION**, not capture. The non-authoring paint-π has an unmet precondition. |
| **Δ1** | "out-in over `<component :is :key>` is trivially correct" | **Vue core #7956: `<Transition mode="out-in">` over a routed template whose root is preceded by a comment/text node (a dev-mode comment-vnode sibling) → "non-element root node that cannot be animated" → WHITE SCREEN on EVERY such nav.** HEAD scan: ≥8 routed SFCs have a leading `<!-- -->` before their root — incl. ALL THREE bespoke heroes (`compositions/hero.vue:85`, `foundations/intro.vue:55`, `substrates/aurora.vue:104`) + `aurora/AuroraStage.vue`, `_chassis/DemoFrame.vue`, `aurora/PresetPickerRow.vue`, `aurora/VizStudio`. | The `out-in` floor needs a **single-element-root normalization + a device-free gate**, AND the burst-π MUST hop a leading-comment-root page. This is dev-vs-prod-divergent (comments stripped in prod) — the dev :5199 capture is where it bites. |
| **Δ2** | "5-nav burst → `survivorArticleCount===1`" | **`articleCount===1` is a FALSE-GREEN.** Live repro: after a 255ms burst the settled `<main>` held `[.demo-scroll-progress, <stale article h1="…intro">, <orphan substrate div>]` — `querySelectorAll('article').length===1` PASSED on a 100%-stale page (URL changed, content did not). Substrate pages root a full-bleed `<div>`, not always `<article>`. | The PRIMARY assert is **`main h1.textContent === destTitle`** + **`main.children.length === 2`** (the bar + EXACTLY one page root) + **no orphan node with a stale heading**. Article-count is necessary-but-grossly-insufficient. |
| **Δ3** | "svh divisor math validated; honor ≥4 rung" | **The svh cap and the ≥4 floor COLLIDE on the worst title.** Live `/compositions/hero` @1440×820: h1 = 244.8px, 5 lines, BLOCK 1285px = **1.567×svh**. `calc(0.62*100svh / est-lines=5)` ≈ **102px** — BELOW the `display-4` rung floor the spec FORBIDS downgrading. The svh term ALONE silently breaks ≥4. | The ONLY honest resolution is **re-authoring the over-length sentence titles to phrase/wordmark length** (paper-only across 3 files today, ZERO code). The hero-π must assert BOTH `block ≤ 0.62svh` AND `font-size ≥ computed(display-4)`. |
| **Δ4** | "eager-glob preferred (storybook chunks are small)" | **FALSE for viz rows.** 23 of 129 routed SFCs import a GL substrate (aurora chunk ~50KB gz alone). `{eager:true}` pulls ALL onto the first-paint critical path. The async fallback RE-OPENS the window the eager-glob closed → the +60ms burst sample reads `articles===0` on a cold chunk. | **EMPIRICAL either/or, decided IN-BUILD:** measure `proof:lighthouse` first-paint with `{eager:true}`; if it regresses, fall to `defineAsyncComponent`+`loadingComponent` (void-fill INSIDE the async boundary) AND re-prove the cold-chunk burst. Neither is free; NEVER re-introduce `<Suspense>` (pass-1 falsified). |

Plus two hygiene corrections the prose carried in from BB-era CLAUDE.md:
- **SCRUB "rides W-REFLECT3" from every WS1 wave-π.** There is no W-REFLECT3 in BG; `scripts/proof-ba-gestalt.mjs:70` still hardcodes the BC roster. The "rides W-REFLECT3" string re-imports the exact terminal-funnel anti-pattern BC outlawed (defer-all-paint → 0/33 painted). WS1's binding gate is the per-wave LIVE burst+Safari capture (C-PAINT), NOT `proof:ba-gestalt`.
- **`proof:ba-gestalt` cannot carry a WS1 verdict** until WS7's `BG.W-GESTALT-REPOINT` re-points the roster. The gestalt-band "verdict" lines are cross-WS handoffs, not WS1 close blockers. Do not let the close hinge on a stale-pointer gate.

---

## TWO SOURCE-FACT CORRECTIONS (carried from pass-2, re-verified at HEAD — do NOT regress)

1. **`Aurora.vue` `defineExpose` (166-178) exposes `pause/resume/isArmed` but NO `dispose`.** A template-ref `shellAurora.value.dispose()` is `undefined()`. Free the GL context via **`v-if="!routeOwnsFocalSubstrate"` removal → `onBeforeUnmount → useAurora.dispose()`** (`useAurora.ts:347-356`, the composable owns dispose; reaches `gl.getExtension('WEBGL_lose_context').loseContext()` at `useWebGLCanvas.ts:220`). The Aurora primitive stays byte-untouched.
2. **`vividnessFloor` (`constants/shaders/aurora.frag.ts:373-385` + WGSL twin `aurora.wgsl.ts:281-286`, `VIVID_TARGET 0.115`, `modeLift 1.18` dark) RE-PIGMENTS every pale fragment to C≥0.115 whenever `uVividness > 0.0001`.** `heroAuroraConfig` spreads `...DEFAULT_AURORA_CONFIG` → inherits the HIGH default. **`shellAuroraConfig` MUST set `vividness: 0`** (byte-identity floor opt-out, `presets.ts:228-229`) AND the recessive C 0.05-0.09 palette — the falsification lives in the SHADER, not the palette. **Stress this at the WORST cool-projected hue (motion→85°, data→88°, the sand end of `projectWarm`)** — a recessive palette at 85-88° is exactly where the BD warm-floor fights hardest; if it reads grey, lift chroma only for the high-hue/sand projections, never amber.

---

## GESTALT GOAL

One shell, one route-swap, one persistent field, one fit law. The cure is **subtraction**, sequenced by EVIDENCED causation, and the close condition is **PAINT, not build-green**:

1. **ROUTE (M1) — the linchpin.** Collapse the four-mechanism pile to `<Transition name="route-liquid" mode="out-in"><component :is :key="route.path"/></Transition>`, delete the 3-branch `v-if` chain + bloom-find-child + categoryId-VT-watcher in ONE cut, **normalize every routed SFC to a single element root (the #7956 floor)**, eager-glob (or async, decided empirically). Exactly 1 page root at every settle, at most 1 per-page GL context.
2. **FIELD (M2) — the ★★★ material reversal + one-GL law.** Retire `.paper-field` WHOLE for ONE shell `<Aurora v-if="!focal">` with `onBeforeUnmount → dispose()`. Per-route warm hue via a reactive `vividness:0` recessive config. Monotonic exactly-one-GL by construction. `route.meta.focal` per-row, paint-verified each.
3. **TOP BAR (M4).** `scroll(nearest block)` on the shell rail + hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL so any timeline failure rests INVISIBLE. Guard the post-substitution `scroll(var(` form.
4. **HERO (M5).** ONE chassis title path + `#title-ornament` slot (retire the 3 `:hero-title=false` bypasses); svh height term as the FOUC backstop + a measured `est-lines`; **re-author over-length sentence titles to phrase length** so the ≥4 rung floor holds AND the block fits.
5. **HYGIENE (M0).** `app.config.errorHandler` + `onInitError` on every Aurora mount + the false-docstring correction. Cheap, parallel, never the cure.

Every motion leg is compositor-only, carries iOS-27 liquid weight (spring-on-spatial enter-overshoots / bezier-on-effects exit-no-overshoot), PRM keeps-fade/drops-transform, paints in Chrome AND Safari (the `out-in` floor NEVER depends on native VT). The `<Aurora>` primitive and the `--type-display-*` ladder are byte-untouched.

---

## MECHANISM (the pass-3 advance — concrete)

### M1 — The route swap + the #7956 single-root floor (D1/D9, the linchpin)

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism (NO Suspense, NO v-if branch chain) -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
```

**(NEW — Δ1) The single-element-root floor is MANDATORY.** `<Transition mode="out-in">` over a routed component that resolves to anything but a single element vnode (a fragment, a multi-root template, OR a root preceded by a dev-mode comment/text vnode) emits `[Vue warn] Component inside <Transition> renders non-element root node that cannot be animated` and CAN white-screen the swap (Vue core #7956). HEAD has ≥8 routed SFCs with a leading `<!-- -->` before their root (verified). Two coordinated mechanisms:

1. **Strip the leading template comments from the routed SFC roots** (move the rationale comment INSIDE the root element, or delete it). The verified-safe shape is a single element directly after `<template>` with no preceding sibling — `StoryPage.vue:72` (single `<article>`), `SectionLanding.vue:85` (single `<article>`). Normalize the ≥8 offenders to it (the 3 bespoke heroes get normalized AS PART of M5's chassis-path rewrite anyway).
2. **`proof:route-single-root` (device-free, NEW):** parse every `import.meta.glob` routed module's `<template>`; assert each compiles to a single ELEMENT root (no leading comment/text node, no fragment). A planted multi-root + a planted leading-comment bite. This is the structural guard so a future SFC with a multi-root template cannot silently white-screen under `out-in`.
3. **The burst-π MUST hop a (formerly-)leading-comment-root page** (`/compositions/hero`, `/substrates/aurora`) and assert NO white-screen (`articles===1` + `heading===dest`) — the device-free gate proves shape, the live hop proves paint (dev :5199, where comments are NOT stripped).

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → exactly 1 page root at every settle, ≤1 per-page GL context. The leave is a finite fast fade (`--duration-fast`) + Vue's `setTimeout(dur+1)` backstop → `_leaveCb` resolves. **Build-proven by the 5-nav burst, not assumed.**
- **`:key="route.path"` EVERYWHERE** — the scroll-reset `watch` moves off `route.fullPath` onto `route.path` (a query/hash-only change must NOT re-mount + re-run scroll-reset). ONE axis.
- **Async-loading: decided EMPIRICALLY (Δ4).** Flip `manifest.ts:118` to `import.meta.glob(..., { eager: true })` → no async window → trivially-correct `out-in`, no skeleton. **Measure `proof:lighthouse` first-paint** (23 viz SFCs ~hundreds-KB risk). If it regresses the floor, fall to `defineAsyncComponent`+`loadingComponent` (void-fill INSIDE the async boundary, `delay:120`, so the slot only ever holds ONE element) AND re-run the burst on COLD chunks (hard-reload between hops) to prove the +60ms sample never reads `articles===0`. NEVER `<Suspense>`.
- **NO `v-if`/`v-else-if` branch chain.** DELETE the no-match `<Card>` (dead — `router.ts` ships `/:pathMatch(.*)*` → `NotFound`) + its `Card` import; DELETE the matched-pending skeleton branch + its `Skeleton` import (eager-glob removes the async window that justified it).

**`.scroll-build` RETIRES WHOLESALE (NEW — the no-legacy-complete decouple, not just "remove from roots"):** remove the class from `StoryPage.vue:72` + `SectionLanding.vue:85` (the ONLY 2 consumers), THEN DELETE the now-dead recipe — `scroll-choreography.css:102-160` (`gl-page-build`/`gl-page-build-fade`/`.scroll-build > *`/`.scroll-build-hero`), `scroll-tokens.css:32-33` (`--scroll-build-rise`/`--scroll-build-step`), `story-hero.css:534-579` (the hero-coupled `.scroll-build` rules) — and re-point the one showcase (`motion/scroll-choreography.vue:68`, `manifest.ts:1081`) to demonstrate `.scroll-cascade` (the surviving section-cascade register, whose `route-enter page-build` identity `route-liquid` now owns). `.scroll-build` was minted (BB.W-SCROLL-MOTION) to ride the route transition; `liquid-enter.css:14` fenced its "Bug B" collision instead of fixing it — do the real subtraction, delete the fence, don't re-fence a 4th time. **KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`.**

**The `route-liquid` recipe** (mint in `transitions.css`, DRY off the shipped `.pane-swap-*` out-in precedent — iOS NavStack push, weight in the ENTER curve):

```css
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

**Deletions (clean break, `proof:no-dual-path`):** `useBloomUp` IMPORT (`AppShell.vue:30`) + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom `watch` find-child DOM-spelunk (255-303); the categoryId no-op `startViewTransition` watcher + the dead `dataset.categorySwitch` write (211-228 — grep proves 0 readers, verified). **`useBloomUp` the LEAF stays** (library-published, 8+ live dock-gallery consumers — only the AppShell route-bloom USAGE dies). **KEEP** `toggleShellMorph`'s `startViewTransition` (131, the functional dock-morph stage — WS2's carve, not a route contrivance). **KEEP** the ONE scroll-reset owner (195, re-axised to `route.path`). **Coordinate the AppShell line deletions with WS2** (the >500-line morph-stage carve edits the same file).

### M2 — The field: ONE shell aurora, v-if-gate / dispose-context (D2/C-FIELD + one-GL law)

```vue
<Aurora
    v-if="!routeOwnsFocalSubstrate"
    :config="shellAuroraConfig"
    :opacity-ceiling="0.5"
    :on-init-error="onShellAuroraError"
    class="fixed inset-0 -z-10 shell-aurora"
    data-paper-field
    aria-hidden="true"
/>
```

1. **`v-if(!focal)` + `onBeforeUnmount` dispose.** Across non-focal→non-focal navs (the common case) the boolean stays `false→false` → the node PERSISTS (no re-arm churn, no reparent — the WebKit canvas-move-loses-context constraint never bites; the node is mounted/unmounted at the focal boundary, never MOVED). At the focal flip the node unmounts → `useAurora.dispose()` → ZERO shell context under the focal viz. **Monotonic exactly-one-GL by construction:** shell context (non-focal) XOR focal-viz context (focal).
2. **Per-route hue WITHOUT re-mount.** `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)`; non-focal navs update the hue reactively (a uniform re-upload via Aurora's deep config watch) on the PERSISTED node.
3. **The field MATERIAL is recessive — `vividness:0` MANDATORY** (the shader-floor mandate; Δ-correction 2). Mint `shellAuroraConfig(hue)` in `aurora-hero.ts` = the calm motion band (`breathPeriod:48`, low `nucleiDrift/paletteDrift`, `saturation:0.95`) + **`vividness: 0`** + an EXPLICIT recessive C 0.05-0.09 palette + the per-route `warmFieldHue`. Result: "sunrise behind frosted glass" (the Siri-island f033 reference), not a foil slab.
4. **`route.meta.focal` is PER-ROW, enumerating ALL live-GL rows (NET-NEW — Δ, the most-likely one-GL FAIL).** `manifest.ts` has NO `focal` field; `background.kind` ALONE misses content-GL rows. Project `meta.focal = backgroundIsLiveGL(kind) OR row.contentGL` where `contentGL` is an EXPLICIT per-row flag on every substrate-viz row that mounts its OWN GL in its BODY: `{aurora, constellation, fourier-field, liquid-grid}` (StoryBackground kinds) ∪ `{GooBlob, DotFlowField, concentric, dot-matrix, paper-grid, goo-dot-matrix, glass-panel}` (content viz) ∪ `{display/card, display/buttons}` (contained body auroras) ∪ `{dock/overview, dock/layers, dock/morph-showcase, dock/liquid-playground, dock/dock-gallery}` (DockStage/own GL) ∪ `{compositions/empty-states}` (GooBlob mascot) ∪ section landings whose `CATEGORY_HERO bgKind ∈ {aurora, constellation}` (substrates/navigation/motion). **An incomplete set double-allocates (shell+content) or loses a hero's field — `proof:focal-complete` (device-free) cross-checks every manifest row whose component imports `useGpuSubstrate`/`useWebGLCanvas`/`useAurora`/`useMetaballRenderer` carries `focal:true`, AND the live π verifies each row's `glContextCount===1`.** (Generalize the existing `manifest.ts:153-158` "drop to paper to avoid a 2nd GL" ad-hoc hack into this ONE honest budget knob.)
5. **The 2nd/3rd field systems RECONCILE onto the shell.** StoryHero retires its per-page full-bleed `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` on NON-focal routes (the shell IS the field); keeps the per-page focal mount ONLY for genuinely-focal viz-demo rows. DockStage folds onto the shell field where covered; keeps its own functional aurora ONLY where it must demonstrate pause/resume (overview). The static `grid`/`paper` page-backgrounds collapse onto the shell aurora; grain demotes to OPT-IN (W-PAPER-GRAIN-OPTIN).
6. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, the live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR cap (so `proof:offscreen-pause` stays GREEN by construction). The CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. The dispose→re-arm on focal-return shows the CSS-gradient fallback for one frame — verify it reads as the warm floor, no jarring flash.

**Gate-evasion re-audit (BEFORE the break):** the 4 `proof:` field gates match the component TAG, so a props+recipe `.paper-field` delete keeps them green. Add a `proof:no-paper-field` SOURCE assert (the `.paper-field` recipe + the `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle` ABSENT); re-point any `proof:` reference to `paper-field`/`scroll-progress-scroller` (`proof-ba-animate.mjs`, `gates.mjs`, `ba-animate.spec.ts`). Keep the `data-paper-field` DOM hook on the new Aurora wrapper.

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `warmFieldHue` + the DEAD `warmFieldHueMap`) is a verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + same-named `clampWarm`, same `[25,95]` band). **Fold:** make `warmProjectHue` + a new `sectionHueDeg(idx)` accessor (reading `SECTION_COLOR_OKLCH` via `cssToOklch().h`) the canonical exports on `aurora-hero.ts`; collapse `warm-field.ts` to a ~12-line thin adapter `warmFieldHue(id) = warmProjectHue(sectionHueDeg(categoryHue(id)))`, DELETING the duplicated table+body+dead `warmFieldHueMap`. **PRESERVE all 3 `warmFieldHue` consumers** (`AppShell.vue:237`, `SectionLanding.vue:48`, `SectionPreviewCard.vue:167`). Rewire `useGlassBackdropLuminance` to sample the live SHELL canvas (zero new cost). The hue-coherence refinement (re-hue focal `heroAuroraConfig` off `warmFieldHue` so field+hero agree) lands WITH a paint capture, NEVER a blind `CATEGORY_PALETTE_HUES` delete.

### M4 — The top-bar: `scroll(nearest block)` + the UNCONDITIONAL scaleX(0) floor (D5, BG.W-SCROLL-PROGRESS-RAIL)

```css
.scroll-progress {
    transform-origin: 0 50%;
    transform: scaleX(0);   /* HOISTED outside the gate — the true non-supporting/PRM/invalid-timeline floor */
}
@media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: scroll()) {
        @keyframes gl-scroll-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .scroll-progress {
            animation: gl-scroll-grow auto linear;
            animation-timeline: var(--scroll-progress-timeline, scroll(nearest block));  /* full-value var; NEVER scroll(var(...)) */
        }
    }
}
```

- **Hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL.** Rest is `scaleX(0)`, NOT `opacity:0.85`.
- **SHELL bar uses `scroll(nearest block)`** (the bar is a `<main class="demo-main-scroller">` child → `nearest` resolves with no named-timeline name-resolution fragility, the robust Safari path). Drop `--scroll-progress-scroller`; `.demo-scroll-progress { --scroll-progress-timeline: scroll(nearest block); }`. Reserve named-timeline + `timeline-scope` for `scroll-vt.vue` (the genuine cross-element case — migrate its `self`-keyword consumer + VERIFY grows-on-scroll both engines).
- **Guard the STRUCTURAL root (the bug lived only AFTER var-substitution, invisible to a static `scroll(--` scan).** Assert `animation-timeline: var(--scroll-progress-timeline, …)` (full-value var) AND NO `scroll(var(` substring AND a GLOBAL `scroll(\s*--` scan over `src`+`demo` (incl. `scroll-vt.vue`, currently unscanned) + a planted-regression bite. **The gate reads the COMPUTED value** (`animationTimeline !== 'auto'`, `animationRange`), never the declared string (the D14 silent-type-mismatch lesson).
- **Reconcile the stale prose** (`AppShell.vue:385-393`, `dock-nav.css:185-199`/`246-248`, `scroll-driven.css:33-35`) off `--scroll-progress-scroller`+"faint rest" onto `--scroll-progress-timeline`+`scaleX(0)`.
- **(liquid law)** AFTER the scaleX(0)-rest + grows-on-scroll π passes, add a spring-eased trailing-glint on the fill edge (compositor-only) so the rail reads liquid not mechanical — but ONLY after, so the glint never re-introduces a full-width-at-rest regression.

### M5 — The hero fit: ONE chassis path + svh term + the ≥4-vs-svh resolution (D10, BG.W-HERO-FIT)

**Root cause:** `story-hero.css:225-229` fit-cap is `min(rung, (100vw-2pad)/7)` — WIDTH-only, no height term; the 3 bespoke heroes (`hero.vue:98`, `intro.vue:72`, `auth-shell.vue:81`) hand-author `<h1 class="text-display-* max-w-5xl">` via `:hero-title="false"` and bypass the chassis cap entirely (`max-w-5xl` MANUFACTURES the wrap).

1. **ONE chassis title path with a `#title-ornament` slot (the load-bearing half, paper-only today).** Retire `:hero-title="false"` + the bare `<h1>` in `hero.vue`/`intro.vue`/`auth-shell.vue` (clean break); render every hero `<h1>` through `.story-hero-title[data-hero-scale]`, with a `#title-ornament` slot PRESERVING the bespoke eyebrow + ℱ wordmark + blurb. Drop `max-w-5xl`. **This normalization ALSO strips the leading template comment** → fixes the #7956 risk on these 3 roots (M1/M5 overlap).
2. **Height-aware fit-cap with an svh term** (`font-size` is a static `min()` resolution, not a layout-animated step — `proof:no-layout-animation` SAFE; the `--type-display-*` ladder byte-untouched):

```css
.story-hero-title[data-hero-scale] {
    font-size: min(
        var(--story-hero-title-rung, var(--type-display-4)),
        var(--story-hero-title-fit, calc((100vw - 2 * var(--story-hero-pad, 2rem)) / var(--story-hero-cpl, 7))),
        var(--story-hero-title-svh, calc(0.62 * 100svh / var(--story-hero-est-lines, 2)))  /* svh, NOT dvh — dvh jumps on scroll */
    );
}
```

3. **`--story-hero-est-lines` is a TRUE upper bound, MEASURED** via a `useResizeObserver` cap in `StoryHero.vue` (`round(scrollHeight / lineHeight)`) so the cap self-corrects; the instant CSS svh term is the FOUC backstop. DELETE the dead `max-block-size:calc(0.62*100svh)`. Single-source the line factor (`--story-hero-cpl` and `HERO_CHARS_PER_LINE` → ONE constant).
4. **The ≥4 rung floor is HONORED — NO display-3 downgrade (Δ3, the forbidden shortcut the live tree took).** The svh cap at `est-lines=5` resolves ~102px — BELOW `display-4`. The svh term ALONE cannot both bound the block AND keep ≥4. **The ONLY honest resolution: re-author the over-length SENTENCE titles to phrase/wordmark length** (the reference is a single bold word/number, not a sentence — e.g. `/compositions/hero` "Real scenes, assembled from the parts." → a short audacious phrase that survives at `display-4` in ≤2 lines). The hero-π asserts BOTH `block ≤ 0.62svh` AND `font-size ≥ computed(display-4)` — so a silent floor-break (svh winning below the rung) FAILS the gate. Verify the LONGEST manifest hero title, not the demo default.

### M0 — Eliminate the Aurora-rejection surface (HYGIENE, folds into W-ROUTE-TRANSITION — NOT the cure)

```ts
// demo/main.ts
app.config.errorHandler = (err, _instance, info) => { console.error("[demo] app error", info, err); };
```

Thread `onInitError` into EVERY Aurora mount (only `liquid-playground` handles it today): the shell field, `StoryHero.vue:267`, `DockStage.vue:59`, `KonamiAurora.vue:48`, `buttons.vue:76`, `card.vue:147/303`, `glass-panel.vue:60`, `auth-shell.vue:58`, `rail.vue:80`, `overview.vue:626`. Correct the false docstring at `useAurora.ts:191` (`app.config.errorHandler` does NOT catch a floating `window.onunhandledrejection`). Gate: `proof:route-confounder` (device-free + a self-test bite).

---

## FILES TOUCHED

| file | change |
|---|---|
| `demo/layout/AppShell.vue` | M1 cut (out-in keyed swap, 3-branch delete, bloom/categoryId-VT delete, scroll-reset re-axis); M2 shell `<Aurora>` replaces `<PaperBackdrop field>`; M0 onInitError; stale-prose reconcile. **Coordinate with WS2.** |
| `demo/main.ts` | M0 `app.config.errorHandler`. |
| `src/styles/transitions.css` | M1 mint `.route-liquid-*` (DRY off `.pane-swap-*`). |
| `demo/stories/StoryPage.vue`, `demo/stories/SectionLanding.vue` | M1 drop `.scroll-build` from the article roots. |
| `src/styles/scroll-choreography.css`, `src/styles/tokens/scroll-tokens.css`, `demo/stories/story-hero.css` | M1 DELETE the dead `.scroll-build` recipe + tokens + hero-coupled rules (after decouple). |
| `demo/stories/motion/scroll-choreography.vue`, `demo/stories/manifest.ts` | M1 re-point the showcase to `.scroll-cascade`. |
| `demo/stories/manifest.ts` | M1 eager-glob (or async); M2 per-row `focal`/`contentGL` projection. |
| `demo/router.ts` | M1 thread `meta.focal`; delete redundant first-nav `beforeResolve` + window scrollBehavior. |
| `src/styles/paper.css` | M2 DELETE `.paper-field` + dark arm + `field-cel-drift` (129-253). |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | M2 strip `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle` + the field div → pure grain register. |
| `demo/stories/aurora-hero.ts` | M2 mint `shellAuroraConfig(hue)` (vividness:0 + recessive palette); M3 canonical `warmProjectHue` + `sectionHueDeg`. |
| `demo/stories/warm-field.ts` | M3 collapse to thin adapter; DELETE the dup table/body + dead `warmFieldHueMap`. |
| `src/styles/scroll-driven.css`, `demo/layout/dock-nav.css` | M4 unconditional scaleX(0) floor + `scroll(nearest block)` + drop `--scroll-progress-scroller` + prose. |
| `demo/stories/motion/scroll-vt.vue` | M4 migrate to named-timeline + `timeline-scope`. |
| `demo/stories/story-hero.css`, `demo/stories/StoryHero.vue` | M5 svh term + measured `est-lines` + drop dead `max-block-size` + `#title-ornament` slot. |
| `demo/stories/compositions/hero.vue`, `foundations/intro.vue`, `compositions/auth-shell.vue` | M5 retire `:hero-title=false` + bare `<h1>` → chassis path; **re-author over-length titles to phrase length**; strip leading comment (#7956). |
| `demo/stories/{aurora/AuroraStage,_chassis/DemoFrame,aurora/PresetPickerRow,…}.vue` | M1 strip leading template comments (single-root normalization). |
| `scripts/proof-*.mjs`, `tests-visual/*.spec.ts` | re-point `paper-field`/`scroll-progress-scroller`; NEW `proof:route-single-root`, `proof:focal-complete`, `proof:no-paper-field`; harden `proof:ba-animate`. |

---

## WAVE BREAKDOWN — each with its mechanism + the BINDING real-paint-π

> **Every π is a FRESH LIVE capture by a NON-AUTHORING agent, Chrome AND real Safari/WebKit, REAL GPU. "rides W-REFLECT3" is SCRUBBED — the per-wave live capture IS the gate (C-PAINT). `proof:ba-gestalt` carries no WS1 verdict until WS7's `BG.W-GESTALT-REPOINT`.**

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
**Mechanism:** out-in keyed swap (`route.path`) + 3-branch `v-if` delete + bloom/categoryId-VT/`dataset.categorySwitch`/no-match-Card/skeleton/Skeleton-import delete; **single-element-root normalization (#7956)**; mint `route-liquid` DRY off `.pane-swap-*`; `.scroll-build` retire WHOLESALE; eager-glob (or async, empirical); KEEP `toggleShellMorph` VT + the ONE scroll-reset owner; + M0. **Device-free gates:** `proof:route-confounder` + `proof:route-single-root` (NEW) + `mode="out-in"` present + deleted mechanisms ABSENT + no `.scroll-build` on a routed root + self-test bites. **BINDING π:** the **5-nav-<300ms burst** → at +60/+360/+1260ms: **`main h1.textContent === last-dest title`** (PRIMARY) AND **`main.children.length === 2`** (bar + exactly one page root) AND **no orphan node with a stale heading** AND **monotonic allocated-GL===1** (sampled at SETTLE points, counting canvases-with-a-live-context) across a content→substrate→content N-nav sweep, no reload; **+ a leading-comment-root hop (`/compositions/hero`, `/substrates/aurora`) asserting NO white-screen**; Chrome AND Safari/WebKit, real GPU. Paired-π DELTA vs `category-card-waste.png`/`morph-modal.png`.

### 2. `BG.W-FIELD-AURORA` — lands WITH #1 (★★★ material reversal + the one-GL law)
**Mechanism:** retire `.paper-field` WHOLE; ONE shell `<Aurora v-if="!routeOwnsFocalSubstrate">` + `onBeforeUnmount → useAurora.dispose()`; per-ROW `route.meta.focal`/`contentGL`; reconcile StoryHero + DockStage; `shellAuroraConfig(hue)` = calm band + **`vividness:0`** + recessive C 0.05-0.09 + `warmFieldHue`. **Gates:** `proof:offscreen-pause` un-regressed + `proof:no-paper-field` source assert + `proof:focal-complete` (every GL-importing manifest row carries `focal:true`) + re-point `proof:` refs to `paper-field`. **BINDING π:** **`glContextCount(allocated)===1`** on every non-substrate route AND on a content→substrate→content round-trip + the 5-nav burst (no monotonic leak, no double-allocate on focal); **calm warm aurora — NO conic sheen, NO C>0.10 brown pigment, NO visible speckle** at ≥3 hues incl. the WORST cool-projected (motion 85° / data 88°) BOTH modes; glass clears AA over it at `opacityCeiling 0.5` BOTH modes **on an engine WITHOUT `contrast-color()`**; no stale warm wash under a focal substrate. DELTA vs `hero-broken.png`/`category-card-waste.png`.

### 3. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
**Mechanism:** hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL; SHELL bar → `scroll(nearest block)`; reserve named-timeline+`timeline-scope` for `scroll-vt.vue`; drop `--scroll-progress-scroller`; rest `scaleX(0)`. Gate COMPLETE: full-value-var assert + NO `scroll(var(` substring + GLOBAL `scroll(\s*--` scan + planted bite + re-point `proof:ba-animate`/`ba-animate.spec.ts`; the gate reads COMPUTED `animationTimeline`/`animationRange`; reconcile stale prose. **BINDING π:** `animationTimeline` resolved (NOT `'auto'`) + `scaleX(0)` at scroll-top EVERY route + GROWS on scroll (the dead-but-safe trap: scaleX(0)-at-rest passes yet grows-on-scroll fails on WebKit named-timeline) + a scroll-timeline-DISABLED engine resting `scaleX(0)`. Chrome AND Safari. DELTA vs `top-bar.png`.

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #2
M3 fold (canonical `warmProjectHue`+`sectionHueDeg`; collapse `warm-field.ts`; PRESERVE 3 consumers; rewire `useGlassBackdropLuminance` to the shell canvas; hue-coherence WITH a paint capture). **Gate:** single-source-of-warm-hue + 3-consumer presence + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #2
Demote universal `.paper-underpaint` 0.22 grain to per-surface opt-in (math-paper/printed specimens); `PaperBackdrop` → pure grain register (field welding dropped); re-tune opt-in opacity sub-JND. **Gate:** no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1 (pages must mount to measure)
**Mechanism:** ONE chassis title path + `#title-ornament`; svh term on the fit-cap `min()` (FOUC backstop) + measured `--story-hero-est-lines`; delete dead `max-block-size`; ≥4 rung floor HONORED (re-author offending sentence titles, NO display-3); single-source the line factor; drop `max-w-5xl`. NO `--type-display-*` edit. **BINDING π (375/768/1440/1920, BOTH modes, both engines):** rendered `<h1>` BLOCK **≤~0.62×svh** for the LONGEST manifest hero title **AND `font-size ≥ computed(display-4)`** (the dual bound — a silent floor-break FAILS); **≥1 preview card above the fold at 1440×820** on `/compositions/hero` + every hero page. DELTA vs `hero-broken.png`.

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
Export `navigate` (SHIPPED at `useViewTransition.ts:205`) on the motion-core barrel; drive `router.push` through it with `types:['forward'|'back']` behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor. NEVER a concurrent default-mode transition, NEVER a second engine. If it lands, set `--vt-direction` to graduate the AX `directional-view-transition` n:2 honest-hold (VERIFY `view-transition.css` carries `--vt-direction` — HEAD ships `--vt-rise` only).

---

## ACCEPTANCE / REAL-PAINT-π BAR (the close condition)

> **C-PAINT (binding):** headless-green/visually-broken shipped 3× (BB/BC/BD). Every WS1 acceptance is a FRESH LIVE capture by an agent who did NOT author the build, Chrome AND a real Safari/WebKit context, REAL GPU (`max=1` GPU-less does NOT count). The build agent must NOT capture its own acceptance (the verification/release-axis decoupling cure).

**Routing (the linchpin):**
- ≥6 cross-category hops: at every settle **`main h1.textContent === destination title`** (PRIMARY) AND `main.children.length === 2` AND no orphan stale-heading node.
- **5-nav-<300ms burst** → at +60/+360/+1260ms: `main h1 === LAST-dest` AND `main.children.length === 2` AND **monotonic allocated-GL===1** (sampled at SETTLE points, counting live-context canvases — NOT raw `<canvas>` tags; loseContext is async, a transient 2 at +60ms is not a leak). No reload. PRM keeps fade, drops transform.
- **A leading-comment-root hop (`/compositions/hero`, `/substrates/aurora`) renders (no white-screen).**
- **Chrome AND Safari/WebKit** (rapid keyed out-in swaps are exactly where WebKit diverges).

**Field:**
- Every non-substrate route paints a calm warm AURORA — NO conic sheen, NO C>0.10 brown pigment, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5` ON AN ENGINE WITHOUT `contrast-color()`. Verified at the WORST cool-projected hue (motion 85° / data 88°).
- `glContextCount(allocated)===1` on every non-substrate route AND on a content→substrate→content round-trip; a focal route's viz is the sole live context, NO stale shell wash bleeding under it. **Real GPU** (Safari's lower per-window budget bites first).

**Top bar:**
- `animationTimeline` resolved (NOT `'auto'`); `scaleX(0)` at scroll-top EVERY route; GROWS on scroll; a scroll-timeline-DISABLED engine rests `scaleX(0)`. Chrome AND Safari.

**Hero:**
- Rendered `<h1>` BLOCK ≤~0.62×svh AND `font-size ≥ computed(display-4)` at 375/768/1440/1920 BOTH modes (the LONGEST manifest hero title); ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page. NO display-3 downgrade.

**First-paint (the eager-glob decision):**
- `proof:lighthouse` first-paint ≥ the pinned floor with `{eager:true}`; if regressed, the async fallback + a COLD-CHUNK burst proving the +60ms sample never reads `articles===0`.

Capture DELTAs (screenshot + paired-π) against the four evidence PNGs (`hero-broken.png`, `top-bar.png`, `category-card-waste.png`, `morph-modal.png`) — never a commit-message claim.

---

## FOLDED DEFERRED / CROSS-WS HANDOFFS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement tier; deferred/optional, gated on #1 green, additive, never concurrent; wires the SHIPPED `navigate()`.
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, no carrier; a CONSUMER-ASSET arm (DEFER-with-trigger), not a library wave.
- **`BG.W-SCROLL-SHRINK-UNIFY`** (the 3-fork DRY collapse: `--card-scroll` + `story-hero-shrink` + `story-hero-scroll-away` → one keyframe family) → **WS4**; HARD-DEPENDS on W-ROUTE-TRANSITION. WS1 must not destabilize it.
- **AppShell >500-line carve** — extract the in-situ dock-morph demo into `demo/layout/ShellDockMorphStage.vue` → **WS2** (coordinate the AppShell line deletions; `toggleShellMorph`'s `startViewTransition:131` is KEPT, moves WITH the stage).
- **`useGlassBackdropLuminance` rewire** to the live shell canvas → W-FIELD-ACCENT-RECONCILE.
- **`BG.W-GESTALT-REPOINT`** (re-point `proof:ba-gestalt` off the hardcoded BC roster + a BG roster row per WS1 surface) → **WS7**, but no WS1 wave waits on it; the live burst+Safari capture IS the WS1 gate.
- **`W-PAINT-IS-THE-GATE` / CONSTRAINTS.md** → **WS7**, binds every WS1 π.

---

## OPEN RISKS / RESIDUAL GAPS (the pass-3 unconverged frontier)

1. **(HIGHEST — Δ0) The build is UNBUILT.** Pass-3's premise has an unmet precondition. Land M1+M2+M0 as ONE cut on `tranche/BG` before any capture.
2. **(Δ1) The #7956 leading-comment-root white-screen.** ≥8 routed SFCs have a leading comment; dev :5199 does NOT strip it. Normalize the roots + add `proof:route-single-root` + hop a comment-root page in the burst — UNPROVEN on the built tree.
3. **(Δ2) Article-count is a false-green.** `heading===dest` + `main.children.length===2` is the only assert that catches the live-reproduced stale-survivor. A π that checks article-count greens a broken state (the 3×-shipped trap).
4. **(Δ4) eager-glob first-paint vs cold-chunk burst.** An UNRESOLVED either/or — measure `proof:lighthouse` empirically; if eager regresses AND async strands the burst, the GL confounder is load-bearing → fall to M2-first and re-measure. NEVER `<Suspense>`.
5. **`route.meta.focal` completeness.** NET-NEW per-row enumeration; an incomplete set double-allocates OR loses a hero's field. `proof:focal-complete` + per-route paint-verify each.
6. **(Δ3) The svh-cap-vs-≥4-floor collision.** The svh term alone breaks the floor at `est-lines≥3`; the title re-authoring (sentence→phrase across 3 bespoke files) is load-bearing and paper-only. The π asserts BOTH bounds.
7. **Safari/WebKit ZERO evidence.** Four concrete falsifiers: named-timeline lag (mitigated by `nearest`), per-window GL budget, canvas-move-loses-context (avoided by mount/unmount-never-reparent), premultiply-toward-black (oklch zero-stops). The `out-in` floor must NEVER depend on native VT.
8. **GL dispose is ASYNC.** Sample monotonic-GL at SETTLE (+360/+1260ms), count live-context canvases, not raw tags.
9. **`proof:*` tag-presence gates** keep green over a props+recipe `.paper-field` delete — re-audit + add the source assert before the break.

---

## CONVERGENCE LEDGER (pass-2 → pass-3)

| pass-2 disposition | pass-3 advance |
|---|---|
| M1 = out-in linchpin, build-proven in isolation | **+ #7956 single-root floor + normalization + `proof:route-single-root`** (the dev-tree white-screen the isolation build never hit). |
| burst π = `survivorArticleCount===1` | **DEMOTED — false-green (live-reproduced). PRIMARY = `heading===dest` + `main.children.length===2` + no orphan.** |
| M2 = `v-if(!focal)` + dispose; `vividness:0` | **+ `route.meta.focal` per-row enumeration as `proof:focal-complete` + paint-verify each + sample-at-settle + worst-hue stress.** |
| M4 = `scroll(nearest block)` + scaleX(0) floor | **+ COMPUTED-value gate (not declared-string) + GLOBAL `scroll(\s*--` scan.** Carried. |
| M5 = svh math validated | **+ the ≥4-vs-svh COLLISION (Δ3): re-author titles, dual-bound π (block≤0.62svh AND font≥display-4).** |
| eager-glob preferred | **EMPIRICAL either/or — measure first-paint; cold-chunk burst if async.** |
| "rides W-REFLECT3" | **SCRUBBED — terminal-funnel anti-pattern; per-wave live capture IS the gate; `proof:ba-gestalt` blind until WS7.** |
| Safari unproven | **Still ZERO evidence — the binding capture, four named WebKit falsifiers.** |
