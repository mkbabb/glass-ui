# BG-WS1 · Shell · Routing · Field — SPEC (pass 3 — CONVERGED; INTEGRATE-then-CAPTURE, the paint is the gate)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large · **C-PAINT** (the close condition — headless-green/visually-broken shipped 3×).
> **Supersedes `SPEC-pass3.md`** (read it; this CONVERGES it by folding the five pass-3 prototype critiques' mustFixes + resolving the four contradictions they surfaced). Grounded against HEAD `tranche/BG` @879c0c41 (4.2.0), every contested source-fact re-verified on disk (see the SOURCE-FACT LEDGER below). The mechanism is converged and prototype-validated in ISOLATION; **the unconverged frontier is the BUILT-TREE PAINT** — Δ0 (nothing is integrated onto `tranche/BG`) and the binding real-paint-π (uncaptured by a non-authoring agent on a real GPU; Safari has ZERO real-demo evidence).

---

## CONVERGENCE STATUS (the honest gate)

All five pass-3 prototypes returned **`refine`** (22% / 40% / 48% / 40% / 33%). Each built a real, mostly-correct mechanism half — and each left the binding "capture the paint on the BUILT tree" at 0%. The headline failure is shared and structural: **the cut is unbuilt (Δ0) and the paint is uncaptured.** This spec folds every mustFix and resolves four contradictions the critiques surfaced; it does NOT — cannot — itself close the workstream. The close condition is the live capture, by a non-authoring agent, on a real GPU, Chrome AND real Safari/WebKit, against the integrated tree.

### The four CONTRADICTIONS the critiques surfaced — RESOLVED

| # | pass-3 spec said | critique correction (verified on disk) | CONVERGED resolution |
|---|---|---|---|
| **R1 — loader** | eager-glob preferred (or async fallback) — a binary | Critique-3: it's a 3-way; HEAD's plain-lazy `() => import()` ties defineAsyncComponent on entry-gz (269.59 vs 269.68 KB-gz) and is the ONLY option whose out-in ENTER animates the REAL page; eager-glob measured **644.54 KB-gz / ~4 chunks** (a first-paint regression). | **FLIP to plain-lazy** (the vue-router idiom; HEAD already ships it — `manifest.ts:120` `() => import()`, `router.ts:31/65`). DROP the eager-glob/async binary ENTIRELY. **KEEP** the `firstResolved` eager-resolve guard (`router.ts:78-90` — it gives the clean cold first paint AND its `typeof==='function'` filter only works under plain-lazy). The KISS concern (the `()=>Promise.resolve(mod.default)` wrapper) is MOOT — plain-lazy keeps the existing loader. |
| **R2 — hero Δ3 collision** | the svh-cap and ≥4-floor COLLIDE on the worst title (svh resolves ~102px BELOW display-4) | Critique-4: FALSE arithmetic. `--type-display-4` = `clamp(3.33rem, 2.5rem+4vw, 5.382rem)` → **max 86.1px@1440**; the svh-term @est5 @820svh = **101.7px**, ABOVE display-4 → `min()` never forces below the rung. A floor-break needs 6-8-line titles that do not exist (longest manifest title `Compositions`=12ch). | **The collision is a PHANTOM — drop it as a "π-forcing function."** Title re-authoring becomes **explicit TASTE polish** (the reference is a bold word/number, not a sentence), not a correctness fix. The dual-bound π STAYS as a REGRESSION GUARD. The width-floor at 375 is genuinely over-constrained for a 12-ch wordmark (display-4@375=55px, width-fit=44.4px wins) → **font≥display-4 binds at ≥768 ONLY; at 375 the π asserts NO hyphenation + NO overflow, not font≥display-4.** |
| **R3 — est-lines measurement** | measure `--story-hero-est-lines` via a `useResizeObserver` cap | Critique-4: titles are 1-2-line wordmarks; the measure→write→re-measure loop on the hero `<h1>` is contrivance (oscillation risk, FOUC, console noise). | **REMOVE the ResizeObserver feedback loop.** Use a **fixed conservative `--story-hero-est-lines: 2`** (a per-title manifest hint ONLY if a title genuinely exceeds 2 lines after re-authoring). The pure-CSS svh term is the KISS, FOUC-safe, zero-measurement path. |
| **R4 — auth-shell** | retire ALL THREE `:hero-title=false` bypasses (hero/intro/auth-shell) | Critique-4: auth-shell is correct on the fit axis (display-1, never viewport-dominating). Forcing it through the chassis path is gratuitous. | **AMEND to `hero.vue` + `intro.vue` ONLY.** auth-shell KEEPS its bespoke title — but STILL receives the M1 #7956 leading-comment strip (`auth-shell.vue:40`) and the height-aware fit-cap is available to it if a future title grows. No unresolved spec/build divergence. |

---

## SOURCE-FACT LEDGER (every contested fact re-verified on disk @879c0c41 — do NOT regress)

1. **`Aurora.vue` `defineExpose` exposes `pause/resume/isArmed`, NO `dispose`.** Free the GL context via `v-if="!routeOwnsFocalSubstrate"` removal → `onBeforeUnmount → useAurora.dispose()` (`useAurora.ts:347-356` → `useWebGLCanvas.ts:220` `WEBGL_lose_context.loseContext()`). The Aurora primitive stays byte-untouched.
2. **`vividnessFloor` re-pigments every pale fragment to C≥0.115** (`aurora.frag.ts:373-385` + WGSL twin `aurora.wgsl.ts:281-286`, `VIVID_TARGET 0.115`, `modeLift 1.18` dark) whenever `uVividness > 0.0001`. `heroAuroraConfig` spreads `...DEFAULT_AURORA_CONFIG` → inherits the HIGH default. **`shellAuroraConfig` MUST set `vividness: 0`** AND a recessive C 0.05-0.09 palette — the falsification lives in the SHADER, not the palette. Stress at the WORST cool-projected hue (motion→85°, data→88°).
3. **`--scroll-build-rise` is a SHARED token** (`scroll-tokens.css:32`), READ by `story-hero-title-rise` (`story-hero.css:549`) AND `story-hero-cluster-rise` (`:579`) — NOT just the `.scroll-build` recipe. **A blanket scroll-tokens.css:32-33 delete breaks the hero keyframes** (Critique-1). The untangle is load-bearing.
4. **HEAD's loader is plain-lazy** — `manifest.ts:118` `import.meta.glob<…>("./*/*.vue")` (NON-eager) → `lazy()` returns `() => import()`; `router.ts:31/65` consume it unwrapped. The `firstResolved` guard (`router.ts:78-90`) filters `typeof==='function'` and eager-resolves only the FIRST route.
5. **`.demo-scroll-progress` is `position: sticky` + a CHILD of `.demo-main-scroller`** (`dock-nav.css:230-232`), NOT `position: fixed`. For a sticky child, `scroll(nearest block)` resolves to that scroller → **M4's decision is correct** (Critique-5; the fixed-bar fixture finding does NOT transfer). HEAD points it at a NAMED timeline `--scroll-progress-scroller: --demo-main-progress` (`:231`) AND rests at `opacity: 0.85` (`:248`) — the bug + the prose-reconcile target.
6. **`--type-display-4` = `clamp(3.33rem, 2.5rem+4vw, 5.382rem)`** (`typography/scale.css:126`) → 86.1px max@1440, 55px@375. The Δ3 phantom math (R2).
7. **`.scroll-progress` HEAD** (`scroll-driven.css`) currently gates `transform`/`scaleX` INSIDE the `@supports`/PRM block — so an invalid/unsupported timeline rests at the default (full-width / `auto`). The unconditional `scaleX(0)` hoist (M4) is the floor.

---

## WHAT PASS 3 CONVERGES (the unconverged frontier — read this first)

Pass 2 converged the MECHANISM. Pass 3 converges the EXPERIMENT — and the EXPERIMENT is NOT YET RUN. Six deltas carry from pass-3, each load-bearing, plus the four resolutions above:

| # | state | the binding correction | consequence |
|---|---|---|---|
| **Δ0** | "capture the paint on the BUILT tree" | **The build is UNBUILT.** Zero `route-liquid`/`routeOwnsFocalSubstrate`/`shellAuroraConfig`/`scroll(nearest block)`/`shell-aurora` in `demo`+`src` (grep-confirmed). The pass-3 prototype worktrees were throwaways (Critique-1: M1 branch `git diff HEAD` is empty; Critique-2: focal gate unregistered; Critique-5: Safari harness ran a SYNTHETIC FIXTURE not the demo). | **STEP 1 is INTEGRATION** of M1+M2+M3+M4+M5+M0 as ONE cut on `tranche/BG @879c0c41`. Until it lands, the paint-π has an unmet precondition and Safari evidence is vacuous. |
| **Δ1** | "out-in over `<component>` is trivially correct" | **Vue core #7956: `<Transition mode="out-in">` over a routed root preceded by a comment/text vnode → "non-element root node that cannot be animated" → potential WHITE SCREEN.** Dev :5199 does NOT strip the comments (prod does — dev-divergent). Critique-1: ~6 of 13+ roots normalized in the prototype; **auth-shell / StoryHeader / StorySectionHeader / CodeBlock / PresetPickerRow / AuroraStage / DemoFrame REMAIN**, plus chain-recursion cases (a single-child-component root recurses into THAT component's root). | The `out-in` floor needs a **complete single-element-root sweep + `proof:route-single-root` that walks the render-root CHAIN and targets the specific `cannot be animated` string** (so `NotFound`'s as-child `<Button>` — a single element — does not false-red). **Verify NECESSITY on the UN-normalized tree first** (the "warning never fired" observation was circular — post-normalization). The burst-π MUST hop a (formerly-)leading-comment root. |
| **Δ2** | "5-nav burst → `survivorArticleCount===1`" | **`articleCount===1` is a FALSE-GREEN** (live-reproduced: a 100%-stale `<main>` with `[bar, stale article, orphan substrate div]` passed `querySelectorAll('article').length===1`). `data/timeline.vue` roots a bare `<div>` (Critique-1) — article-count is necessary-but-grossly-insufficient. | PRIMARY = **`main h1.textContent === destTitle`** (where the page HAS an h1) + **`main.children.length === 2`** (bar + EXACTLY one page root) + **no orphan node with a stale heading** + **monotonic allocated-GL===1**. For h1-less substrate roots, assert page-root identity (the route's expected root signature) instead of h1. |
| **Δ3** | "svh cap vs ≥4 floor COLLIDE" | **PHANTOM (R2).** display-4@1440=86.1px; svh-term@est5=101.7px is ABOVE it. | Drop the forcing-function framing; keep the dual-bound π as a regression guard; bind font≥display-4 at ≥768 only. |
| **Δ4** | "eager-glob (or async)" | **plain-lazy wins (R1).** | DROP the binary; keep HEAD's loader; KEEP `firstResolved`. Add a **TRANSITION-FIDELITY** π assert (the REAL page carries the enter transform mid-frames, never a void — `main.children.length===2` is satisfied by a RouteVoid+bar and masks an un-animated content pop). |
| **Δ5** | "`proof:focal-complete` enumerates → done" | Critique-2: the gate proves **ENUMERATION completeness, NOT the runtime one-GL law.** The async-dispose / WebKit-budget race can leave 2 live contexts while the gate greens (the GL-axis transpose of the demoted Δ2 false-green). | **The close hinges on the LIVE monotonic-GL capture, NEVER on `proof:focal-complete` alone.** Name this insufficiency in the close. + fix the vacuous biteB, close the section-landing hole, harden the brittle parse heuristics (below). |

Plus two hygiene corrections carried from BB-era CLAUDE.md prose:
- **SCRUB "rides W-REFLECT3" from every WS1 wave-π.** There is no W-REFLECT3 in BG; `proof-ba-gestalt.mjs:70` hardcodes the BC roster. WS1's binding gate is the per-wave LIVE burst+Safari capture (C-PAINT), NOT `proof:ba-gestalt`.
- **`proof:ba-gestalt` carries NO WS1 verdict** until WS7's `BG.W-GESTALT-REPOINT` re-points the roster. The gestalt "verdict" lines are cross-WS handoffs, not WS1 close blockers.

---

## GESTALT GOAL

One shell, one route-swap, one persistent field, one fit law. The cure is **subtraction**, sequenced by EVIDENCED causation; the close condition is **PAINT, not build-green**:

1. **ROUTE (M1) — the linchpin.** Collapse the four-mechanism pile to `<Transition name="route-liquid" mode="out-in"><component :is :key="route.path"/></Transition>`, delete the 3-branch `v-if` chain + bloom-find-child + categoryId-VT-watcher in ONE cut, **complete the single-element-root sweep (#7956 floor)**, **keep plain-lazy** (R1). Exactly 1 page root at every settle, at most 1 per-page GL context.
2. **FIELD (M2) — the ★★★ material reversal + one-GL law.** Retire `.paper-field` WHOLE (recipe DELETED, not just un-mounted) for ONE shell `<Aurora v-if="!focal">` with `onBeforeUnmount → dispose()`. Per-route warm hue via a reactive `vividness:0` recessive config. Monotonic exactly-one-GL by construction. `route.meta.focal` per-row, **enumeration AND runtime-paint both verified**.
3. **TOP BAR (M4).** `scroll(nearest block)` on the shell rail (sticky child — verified correct) + hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL so any timeline failure rests INVISIBLE.
4. **HERO (M5).** ONE chassis title path (hero+intro) + `#title-ornament` slot; svh height term as a pure-CSS FOUC backstop with a FIXED est; ≥4 rung floor honored at ≥768; `displayTitle` manifest field for taste-polished wordmarks (nav/breadcrumb/search keep the semantic `title`).
5. **HYGIENE (M0).** `app.config.errorHandler` + `onInitError` on every Aurora mount + the false-docstring correction; delete the REDUNDANT confounders (window scrollBehavior) while KEEPING the load-bearing `firstResolved` first-paint guard.

Every motion leg is compositor-only, carries iOS-27 liquid weight (spring-on-spatial enter-overshoots / bezier-on-effects exit-no-overshoot), PRM keeps-fade/drops-transform, paints in Chrome AND Safari (the `out-in` floor NEVER depends on native VT). The `<Aurora>` primitive and the `--type-display-*` ladder are byte-untouched.

---

## MECHANISM (the converged pass-3 advance — concrete)

### M1 — The route swap + the #7956 single-root floor + plain-lazy (D1/D9, the linchpin)

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism (NO Suspense, NO v-if branch chain, plain-lazy loader) -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
```

**(R1) Loader = PLAIN-LAZY. KEEP HEAD's `() => import()`.** Do NOT flip `manifest.ts:118` to eager (644.54 KB-gz first-paint regression) and do NOT wrap in `defineAsyncComponent` (the vue-router dev-warning + the RouteVoid-bridge fidelity loss + the `firstResolved` `typeof==='function'` no-op). vue-router resolves the loader DURING navigation, so `Component` is ALWAYS a resolved vnode by the time the `out-in` enter fires — the OLD page is HELD throughout the async load (and a burst aborts in-flight navs via `NavigationCancelled`), so the enter animates the REAL page, never a void. **KEEP** the `firstResolved` first-nav eager-resolve guard (`router.ts:78-90`) — it gives the clean cold first paint and only works under plain-lazy's `typeof==='function'` filter. NEVER `<Suspense>` (pass-1 falsified).

**(Δ1) The single-element-root floor is MANDATORY and the sweep is COMPLETE.** Three coordinated mechanisms:

1. **Strip the leading template comment from EVERY routed SFC root** (move the rationale INSIDE the root element, or delete it) — the verified-safe shape is a single element directly after `<template>`, no preceding sibling (`StoryPage.vue:72`, `SectionLanding.vue:85`). **Normalize the FULL offender set, not the prototype's partial ~6:** the 3 bespoke heroes (normalized AS PART of M5), PLUS `auth-shell.vue:40`, `StoryHeader`, `StorySectionHeader`, `CodeBlock`, `PresetPickerRow`, `AuroraStage`, `DemoFrame`, `aurora/VizStudio` — and the chain-recursion cases (a routed SFC whose root is a single-child custom component must recurse to THAT component's root).
2. **`proof:route-single-root` (device-free, NEW):** for every `import.meta.glob` routed module, parse `<template>` and **walk the render-root CHAIN** (recurse through single-root component wrappers); assert each resolves to a single ELEMENT root with no leading comment/text node and no fragment. Target the specific `[Vue warn] … non-element root node that cannot be animated` condition — a single-element `as-child` root (NotFound's `<Button>`) must NOT false-red. Planted bites: a multi-root template, a leading-comment root, a chain-recursion comment root. **Verify NECESSITY on the UN-normalized tree first** (capture the actual warning/white-screen on a leading-comment route at dev :5199 BEFORE normalizing — the "never fired" claim was circular).
3. **The burst-π MUST hop a (formerly-)leading-comment-root page** (`/compositions/hero`, `/substrates/aurora`) and assert NO white-screen (`heading===dest` + page-root present), at dev :5199 (comments NOT stripped there — where it bites).

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → exactly 1 page root at every settle, ≤1 per-page GL context. The leave is a finite fast fade (`--duration-fast`) + Vue's `setTimeout(dur+1)` backstop → `_leaveCb` resolves. **Build-proven by the 5-nav burst, not assumed** (the prototype's `maxChildrenDuringBurst===2` is the validated shape — out-in never co-mounts).
- **`:key="route.path"` EVERYWHERE** — the scroll-reset `watch` moves off `route.fullPath` onto `route.path` (a query/hash-only change must NOT re-mount). ONE axis.
- **NO `v-if`/`v-else-if` branch chain.** DELETE the no-match `<Card>` (dead — `/:pathMatch(.*)*` → `NotFound`) + its `Card` import; DELETE the matched-pending skeleton branch + its `Skeleton` import (plain-lazy + the held-old-page makes the skeleton dead — there is no in-shell async window the skeleton fills).

**`.scroll-build` RETIRES WHOLESALE — but UNTANGLE the shared token FIRST (Critique-1):**
- Remove the class from `StoryPage.vue:72` + `SectionLanding.vue:85` (the ONLY 2 consumers).
- **DO NOT blindly delete `scroll-tokens.css:32-33`** — `--scroll-build-rise` is READ by `story-hero-title-rise` (`story-hero.css:549`) + `story-hero-cluster-rise` (`:579`). **First** give the hero keyframes their own `--story-hero-rise: 1.5rem` token (re-point :549/:579), **THEN** delete the now-orphaned `--scroll-build-rise`/`--scroll-build-step`.
- THEN delete the dead recipe: `scroll-choreography.css:102-160` (`gl-page-build`/`gl-page-build-fade`/`.scroll-build > *`/`.scroll-build-hero`), the `story-hero.css:534-579` hero-coupled `.scroll-build` RULES (keeping the re-pointed keyframes), and the `liquid-enter.css:14` "Bug B" fence (delete the fence, do the real subtraction — never re-fence a 4th time).
- Re-point the showcase (`motion/scroll-choreography.vue:68`, `manifest.ts:1081`) to demonstrate `.scroll-cascade` (the surviving section-cascade register; `route-liquid` now owns the route-enter page-build identity). **KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`.**

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

**Deletions (clean break, `proof:no-dual-path`):** `useBloomUp` IMPORT (`AppShell.vue:30`) + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom `watch` find-child DOM-spelunk (255-303); the categoryId no-op `startViewTransition` watcher + the dead `dataset.categorySwitch` write (211-228 — grep proves 0 readers). **`useBloomUp` the LEAF stays** (library-published, live dock-gallery consumers — only the AppShell route-bloom USAGE dies). **KEEP** `toggleShellMorph`'s `startViewTransition` (131, the functional dock-morph stage — WS2's carve, not a route contrivance). **KEEP** the ONE scroll-reset owner (195, re-axised to `route.path`). **Coordinate the AppShell line deletions with WS2** (the >500-line morph-stage carve edits the same file — the `toggleShellMorph` VT moves WITH the stage).

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

1. **`v-if(!focal)` + `onBeforeUnmount` dispose.** Across non-focal→non-focal navs (the common case) the boolean stays `false→false` → the node PERSISTS (no re-arm churn, no reparent — the WebKit canvas-move-loses-context constraint never bites; the node is mounted/unmounted at the focal boundary, never MOVED). At the focal flip the node unmounts → `useAurora.dispose()` → ZERO shell context under the focal viz. **Monotonic exactly-one-GL by construction.**
2. **Per-route hue WITHOUT re-mount.** `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)`; non-focal navs update the hue reactively (a uniform re-upload via Aurora's deep config watch) on the PERSISTED node.
3. **The field MATERIAL is recessive — `vividness:0` MANDATORY** (the shader-floor mandate; Source-Fact 2). Mint `shellAuroraConfig(hue)` in `aurora-hero.ts` = the calm motion band (`breathPeriod:48`, low `nucleiDrift/paletteDrift`, `saturation:0.95`) + **`vividness: 0`** + an EXPLICIT recessive C 0.05-0.09 palette + the per-route `warmFieldHue`. Result: "sunrise behind frosted glass" (the Siri-island f033 reference), not a foil slab. If a recessive palette reads grey at 85-88° (the sand end), lift chroma ONLY for the high-hue/sand projections, never amber.
4. **`route.meta.focal` is PER-ROW, enumerating ALL live-GL rows (the most-likely one-GL FAIL).** `manifest.ts` has NO `focal` field; `background.kind` ALONE misses content-GL rows. Project `meta.focal = backgroundIsLiveGL(kind) OR row.contentGL` where `contentGL` is an EXPLICIT per-row flag on every substrate-viz row that mounts its OWN GL in its BODY: `{aurora, constellation, fourier-field, liquid-grid}` (StoryBackground kinds) ∪ `{GooBlob, DotFlowField, concentric, dot-matrix, paper-grid, goo-dot-matrix, glass-panel}` (content viz) ∪ `{display/card, display/buttons}` (contained body auroras) ∪ `{dock/overview, dock/layers, dock/morph-showcase, dock/liquid-playground, dock/dock-gallery}` (DockStage/own GL) ∪ `{compositions/empty-states}` (GooBlob mascot) ∪ **section LANDINGS** whose `CATEGORY_HERO bgKind ∈ {aurora, constellation}` (substrates/navigation/motion). Generalize the existing `manifest.ts:153-158` "drop to paper to avoid a 2nd GL" ad-hoc hack into this ONE honest budget knob.

   **`proof:focal-complete` (device-free) + its REQUIRED hardening (Critique-2):**
   - C1: every manifest row whose component import-graph reaches `useGpuSubstrate`/`useWebGLCanvas`/`useAurora`/`useMetaballRenderer` carries `focal:true`.
   - C2: every `focal:true` row HAS a field/contentGL source (no focal-without-GL).
   - **Close the section-landing hole:** the gate parses `s()` rows but `router.ts` threads `meta.focal` onto LANDING routes too — cross-check every `sectionLanding()` focal verdict (`CATEGORY_HERO bgKind ∈ {aurora,constellation}`) against the SAME import-graph truth, or a mis-set landing focal sails past unguarded.
   - **Fix the vacuous biteB:** plant a SYNTHETIC `focal:true`+no-field row through the ACTUAL C2 code path and assert it flags; encode the real falsification (remove a viz's `contentGL` → C1 exit 1) as a COMMITTED subprocess bite, not a manual one-off.
   - **Harden the brittle heuristics:** the import-vs-export edge discriminator false-flags a barrel using `import X; export { X }` (local re-export, no `from`) — make it robust OR assert the no-local-re-export-of-GL-leaf invariant; the `parseRows` window hardcodes the 12-space `\n            s(` indent (brittle to any re-indent/nested `s()`) — bound it structurally, not by literal indent.
   - **NAME the insufficiency in the close:** `proof:focal-complete` proves ENUMERATION, NOT the runtime one-GL law. The async-dispose/WebKit-budget race can leave 2 live contexts while the gate greens. **The close hinges on the LIVE monotonic-GL capture, never on this gate alone.**
5. **The 2nd/3rd field systems RECONCILE onto the shell.** StoryHero retires its per-page full-bleed `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` on NON-focal routes (the shell IS the field); keeps the per-page focal mount ONLY for genuinely-focal viz-demo rows. DockStage folds onto the shell field where covered; keeps its own functional aurora ONLY where it must demonstrate pause/resume (overview). The static `grid`/`paper` page-backgrounds collapse onto the shell aurora; grain demotes to OPT-IN (W-PAPER-GRAIN-OPTIN).
6. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, the live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR cap (so `proof:offscreen-pause` stays GREEN). The CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. The dispose→re-arm on focal-return shows the CSS-gradient fallback for one frame — verify it reads as the warm floor, no jarring flash.

**M2 is a COMPLETE clean break (Critique-2 — currently only un-mounted, the metallic field still SHIPS in CSS = no-legacy violated):**
- **DELETE** the `.paper-field` recipe (`paper.css:129-138` + the `.dark` arm + `field-cel-drift`) and the `field`/`fieldHue`/`fieldIntensity`/`fieldStyle` props from `PaperBackdrop.vue` → pure grain register.
- **`proof:no-paper-field` (SOURCE assert, NEW):** the `.paper-field` recipe ABSENT + the props/`fieldStyle` ABSENT (the tag-presence field gates green over a props+recipe delete; this catches the gate-evasion).
- Re-point any `proof:` reference to `paper-field`/`scroll-progress-scroller` (`proof-ba-animate.mjs`, `gates.mjs`, `ba-animate.spec.ts`). Keep the `data-paper-field` DOM hook on the new Aurora wrapper.

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `warmFieldHue` + the DEAD `warmFieldHueMap`) is a verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + same-named `clampWarm`, same `[25,95]` band). **Fold:** make `warmProjectHue` + a new `sectionHueDeg(idx)` accessor (reading `SECTION_COLOR_OKLCH` via `cssToOklch().h`) the canonical exports on `aurora-hero.ts`; collapse `warm-field.ts` to a ~12-line thin adapter `warmFieldHue(id) = warmProjectHue(sectionHueDeg(categoryHue(id)))`, DELETING the duplicated table+body+dead `warmFieldHueMap`. **PRESERVE all 3 `warmFieldHue` consumers** (`AppShell.vue:237`, `SectionLanding.vue:48`, `SectionPreviewCard.vue:167`). Rewire `useGlassBackdropLuminance` to sample the live SHELL canvas (zero new cost). The hue-coherence refinement (re-hue focal `heroAuroraConfig` off `warmFieldHue` so field+hero agree) lands WITH a paint capture, NEVER a blind `CATEGORY_PALETTE_HUES` delete.

### M4 — The top-bar: `scroll(nearest block)` + the UNCONDITIONAL scaleX(0) floor (D5, BG.W-SCROLL-PROGRESS-RAIL)

```css
.scroll-progress {
    transform-origin: 0 50%;
    transform: scaleX(0);   /* HOISTED outside the gate — the true non-supporting/PRM/invalid-timeline floor (rest is INVISIBLE, not opacity:0.85) */
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

- **The M4 decision is CORRECT — `.demo-scroll-progress` is a `position: sticky` CHILD of `.demo-main-scroller`** (Source-Fact 5), so `scroll(nearest block)` resolves to that scroller. The pass-3-prototype's "fixed-bar fixture → nearest fails" finding does NOT transfer (the fixture was wrong posture — Critique-5). RE-VERIFY against the REAL sticky posture on the integrated build.
- **Hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL.** Rest is `scaleX(0)`, NOT `opacity:0.85` (drop the `opacity:0.85` rest at `dock-nav.css:248`).
- **SHELL bar uses `scroll(nearest block)`.** Drop `--scroll-progress-scroller` (the named-timeline `--demo-main-progress`); `.demo-scroll-progress { --scroll-progress-timeline: scroll(nearest block); }`. Reserve named-timeline + `timeline-scope` for `scroll-vt.vue` (the genuine cross-element case — migrate its `self`-keyword consumer + VERIFY grows-on-scroll both engines).
- **Guard the STRUCTURAL root** (the bug lived only AFTER var-substitution, invisible to a static `scroll(--` scan). Assert `animation-timeline: var(--scroll-progress-timeline, …)` (full-value var) AND NO `scroll(var(` substring AND a GLOBAL `scroll(\s*--` scan over `src`+`demo` (incl. `scroll-vt.vue`, currently unscanned) + a planted-regression bite. **The gate reads the COMPUTED value** (`animationTimeline !== 'auto'`, `animationRange`), never the declared string (the D14 silent-type-mismatch lesson).
- **DE-CONFOUND grows-on-scroll in the π (Critique-5):** `getComputedStyle(transform)` does NOT reliably reflect compositor scroll-linked animations (esp. WebKit) — read **`bar.getAnimations()[0].currentTime`** AND a **screenshot bounding-box width delta** at scroll-top vs scrolled, not `getComputedStyle`. The prototype's "stuck on both engines" reading is probably an oracle artifact — UNPROVEN until de-confounded on the integrated build.
- **Reconcile the stale prose** (`AppShell.vue:385-393`, `dock-nav.css:185-199`/`246-248`, `scroll-driven.css:33-35`) off `--scroll-progress-scroller`+"faint rest" onto `--scroll-progress-timeline`+`scaleX(0)`.
- **(liquid law)** AFTER the scaleX(0)-rest + grows-on-scroll π passes, add a spring-eased trailing-glint on the fill edge (compositor-only) so the rail reads liquid not mechanical — but ONLY after, so the glint never re-introduces a full-width-at-rest regression.

### M5 — The hero fit: ONE chassis path + svh term + the dual-bound regression guard (D10, BG.W-HERO-FIT)

**Root cause:** `story-hero.css:225-229` fit-cap is `min(rung, (100vw-2pad)/7)` — WIDTH-only, no height term; `hero.vue`/`intro.vue` hand-author `<h1 class="text-display-* max-w-5xl">` via `:hero-title="false"` and bypass the chassis cap (`max-w-5xl` MANUFACTURES the wrap). **The Δ3 "collision" is a PHANTOM (R2)** — display-4@1440=86.1px, the svh-term@est5=101.7px sits ABOVE it, so `min()` never forces below the rung.

1. **ONE chassis title path with a `#title-ornament` slot — `hero.vue` + `intro.vue` ONLY (R4).** Retire `:hero-title="false"` + the bare `<h1>` in `hero.vue`/`intro.vue` (clean break); render their `<h1>` through `.story-hero-title[data-hero-scale]` with a `#title-ornament` slot PRESERVING the bespoke eyebrow + ℱ wordmark + blurb. Drop `max-w-5xl`. **auth-shell KEEPS its bespoke title** (display-1, never viewport-dominating — correct on the fit axis) but STILL receives the #7956 leading-comment strip (`auth-shell.vue:40`). This normalization ALSO strips the leading comment on hero/intro → fixes #7956 on those 2 roots (M1/M5 overlap).
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

3. **(R3) `--story-hero-est-lines` is a FIXED conservative `2` — NO ResizeObserver.** Titles are 1-2-line wordmarks (the `displayTitle` re-authoring guarantees it); the measure→write→re-measure loop is contrivance (oscillation/FOUC/console-noise). The pure-CSS svh term is the KISS, FOUC-safe, zero-measurement backstop. A per-title manifest `estLines` hint is available ONLY if a title genuinely exceeds 2 lines after re-authoring. DELETE the dead `max-block-size:calc(0.62*100svh)`. Single-source the line factor (`--story-hero-cpl` and `HERO_CHARS_PER_LINE` → ONE constant).
4. **The ≥4 rung floor is the REGRESSION GUARD, NOT a forcing function (R2).** The dual-bound π asserts BOTH `block ≤ 0.62svh` AND `font-size ≥ computed(display-4)` — at **≥768 only** (at 375 the width-fit term legitimately governs a long wordmark BELOW display-4; the 375 π asserts NO hyphenation + NO horizontal overflow instead). A silent floor-break at ≥768 FAILS the gate. Verify the LONGEST manifest hero title.
5. **`displayTitle` manifest field for taste-polish (R2 — do NOT corrupt `manifest.title`, Critique-4).** Re-authoring the over-length sentence heroes to phrase/wordmark length is EXPLICIT TASTE polish (the reference is a bold word/number). Add an OPTIONAL `displayTitle` field: the chassis `<h1>` renders `displayTitle ?? title`; nav / breadcrumb / search KEEP the semantic `title` (so a short hero wordmark never corrupts the nav label). e.g. `/compositions/hero` keeps `title: "Real scenes, assembled from the parts."` for nav AND gains `displayTitle: "<a short audacious phrase>"` for the hero.

### M0 — Eliminate the Aurora-rejection surface (HYGIENE, folds into W-ROUTE-TRANSITION — NOT the cure)

```ts
// demo/main.ts
app.config.errorHandler = (err, _instance, info) => { console.error("[demo] app error", info, err); };
```

- Thread `onInitError` into EVERY Aurora mount (only `liquid-playground` handles it today): the shell field, `StoryHero.vue:267`, `DockStage.vue:59`, `KonamiAurora.vue:48`, `buttons.vue:76`, `card.vue:147/303`, `glass-panel.vue:60`, `auth-shell.vue:58`, `rail.vue:80`, `overview.vue:626` (11 mounts).
- Correct the false docstring at `useAurora.ts:191` (`app.config.errorHandler` does NOT catch a floating `window.onunhandledrejection`).
- **Delete the REDUNDANT confounders, KEEP the load-bearing guard (R1 reconcile).** DELETE the redundant `window` `scrollBehavior: () => ({ top: 0 })` (`router.ts:69` — the ONE AppShell `route.path` scroll-reset owner is canonical; the window form double-fires). **KEEP** the `firstResolved` first-nav eager-resolve `beforeResolve` (`router.ts:78-90`) — under plain-lazy it gives the clean cold first paint and is NOT a confounder. (Distinguish: the confounder is the redundant scroll path, not the first-paint resolve.)
- Gate: `proof:route-confounder` (device-free + a self-test bite).

---

## FILES TOUCHED

| file | change |
|---|---|
| `demo/layout/AppShell.vue` | M1 cut (out-in keyed swap, 3-branch delete, bloom/categoryId-VT delete, scroll-reset re-axis to `route.path`); M2 shell `<Aurora>` replaces `<PaperBackdrop field>`; M0 onInitError; stale-prose reconcile. **Coordinate with WS2** (morph-stage carve). |
| `demo/main.ts` | M0 `app.config.errorHandler`. |
| `demo/router.ts` | M1 thread `meta.focal`; DELETE redundant window `scrollBehavior`; **KEEP** `firstResolved` first-nav resolve. |
| `demo/stories/manifest.ts` | KEEP plain-lazy (R1 — no eager flip); M2 per-row `focal`/`contentGL` projection; M5 optional `displayTitle`/`estLines`. |
| `src/styles/transitions.css` | M1 mint `.route-liquid-*` (DRY off `.pane-swap-*`). |
| `demo/stories/StoryPage.vue`, `demo/stories/SectionLanding.vue` | M1 drop `.scroll-build` from the article roots. |
| `src/styles/tokens/scroll-tokens.css` | M1 **untangle FIRST** — mint `--story-hero-rise`, re-point hero keyframes, THEN delete orphaned `--scroll-build-rise`/`--scroll-build-step`. |
| `src/styles/scroll-choreography.css`, `demo/stories/story-hero.css` | M1 DELETE the dead `.scroll-build` recipe + hero-coupled rules (after the token untangle). |
| `src/styles/liquid-enter.css` | M1 DELETE the "Bug B" fence (`:14`) — do the subtraction, never re-fence. |
| `demo/stories/motion/scroll-choreography.vue`, `manifest.ts:1081` | M1 re-point the showcase to `.scroll-cascade`. |
| `src/styles/paper.css` | M2 **DELETE** `.paper-field` + dark arm + `field-cel-drift` (129-138/253). |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | M2 **STRIP** `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle` + the field div → pure grain register. |
| `demo/stories/aurora-hero.ts` | M2 mint `shellAuroraConfig(hue)` (vividness:0 + recessive palette); M3 canonical `warmProjectHue` + `sectionHueDeg`. |
| `demo/stories/warm-field.ts` | M3 collapse to thin adapter; DELETE the dup table/body + dead `warmFieldHueMap`. |
| `src/styles/scroll-driven.css`, `demo/layout/dock-nav.css` | M4 unconditional scaleX(0) floor + `scroll(nearest block)` + drop `--scroll-progress-scroller` + drop `opacity:0.85` rest + prose. |
| `demo/stories/motion/scroll-vt.vue` | M4 migrate to named-timeline + `timeline-scope`. |
| `demo/stories/story-hero.css`, `demo/stories/StoryHero.vue` | M5 svh term + FIXED est-lines (no ResizeObserver) + drop dead `max-block-size` + `#title-ornament` slot + `displayTitle` render. |
| `demo/stories/compositions/hero.vue`, `foundations/intro.vue` | M5 retire `:hero-title=false` + bare `<h1>` → chassis path; `displayTitle` taste-polish; strip leading comment (#7956). |
| `demo/stories/compositions/auth-shell.vue` | M5 KEEP bespoke title; ONLY strip leading comment (#7956, `:40`). |
| `demo/stories/{StoryHeader,StorySectionHeader,CodeBlock,aurora/AuroraStage,aurora/PresetPickerRow,_chassis/DemoFrame,aurora/VizStudio}.vue` | M1 strip leading template comments + chain-recursion normalization. |
| `scripts/proof-*.mjs`, `tests-visual/*.spec.ts`, `scripts/gates.mjs`, `package.json` | re-point `paper-field`/`scroll-progress-scroller`; **REGISTER** NEW `proof:route-single-root`, `proof:focal-complete`, `proof:no-paper-field`, `proof:route-confounder` in `gates.mjs` + npm scripts; harden `proof:ba-animate`. |

---

## WAVE BREAKDOWN — each with its VALIDATED mechanism + the BINDING real-paint-π

> **Every π is a FRESH LIVE capture by a NON-AUTHORING agent, Chrome AND real Safari/WebKit, REAL GPU (`max=1` GPU-less does NOT count). "rides W-REFLECT3" is SCRUBBED. `proof:ba-gestalt` carries no WS1 verdict until WS7's `BG.W-GESTALT-REPOINT`. Note: Playwright-1.60 WebKit has NO WebGPU — exercise the WebGPU probe branch on chromium (real WebGPU).**

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
**Validated mechanism (prototype-1, 88% live-Chromium):** out-in keyed swap (`route.path`) + 3-branch `v-if` delete + bloom/categoryId-VT/`dataset.categorySwitch`/no-match-Card/skeleton-import delete; **complete single-element-root sweep (#7956) + chain-recursion gate**; mint `route-liquid` DRY off `.pane-swap-*`; `.scroll-build` retire WHOLESALE (token untangle FIRST); **PLAIN-LAZY (R1, no eager flip)**; KEEP `firstResolved` + `toggleShellMorph` VT + the ONE scroll-reset owner; + M0. **Device-free gates:** `proof:route-confounder` + `proof:route-single-root` (NEW, walks the render-root chain, targets `cannot be animated`, necessity-verified on the un-normalized tree) + `mode="out-in"` present + deleted mechanisms ABSENT + no `.scroll-build` on a routed root + self-test bites. **BINDING π:** the **5-nav-<300ms burst** → at +60/+360/+1260ms: **`main h1.textContent === last-dest title`** (PRIMARY; page-root-identity where h1-less) AND **`main.children.length === 2`** AND **no orphan node with a stale heading** AND **monotonic allocated-GL===1** (sampled at SETTLE, counting live-context canvases) across a content→substrate→content N-nav sweep, no reload; + a **TRANSITION-FIDELITY** assert (the REAL page carries the enter transform/opacity mid-frames, never a void — Critique-3); + a **leading-comment-root hop** (`/compositions/hero`, `/substrates/aurora`) asserting NO white-screen; PRM keeps fade drops transform; Chrome AND Safari/WebKit, real GPU. DELTA vs `category-card-waste.png`/`morph-modal.png`.

### 2. `BG.W-FIELD-AURORA` — lands WITH #1 (★★★ material reversal + the one-GL law)
**Validated mechanism (prototype-2 enumeration 84% + prototype-5 GL-oracle engine-portable):** retire `.paper-field` WHOLE (recipe DELETED + `proof:no-paper-field` source assert); ONE shell `<Aurora v-if="!routeOwnsFocalSubstrate">` + `onBeforeUnmount → useAurora.dispose()`; per-ROW `route.meta.focal`/`contentGL` (+ section-landing cross-check + hardened parse); reconcile StoryHero + DockStage; `shellAuroraConfig(hue)` = calm band + **`vividness:0`** + recessive C 0.05-0.09 + `warmFieldHue`. **Gates:** `proof:offscreen-pause` un-regressed + `proof:no-paper-field` + `proof:focal-complete` (REGISTERED in gates.mjs; biteB fixed; the runtime-insufficiency NAMED) + re-point `proof:` refs. **BINDING π (the LIVE monotonic-GL capture is the close, NOT the device-free gate):** the **getContext-instrumented live-GL oracle** (count canvases with `isContextLost()===false` + `isConnected`, NOT raw `<canvas>` tags; sample at SETTLE — loseContext is async) → **`glContextCount(allocated)===1`** on every non-substrate route AND on a content→substrate→content round-trip + the 5-nav burst (no monotonic leak, no double-allocate on focal); **calm warm aurora — NO conic sheen, NO C>0.10 brown pigment, NO visible speckle** at ≥3 hues incl. the WORST cool-projected (motion 85° / data 88°) BOTH modes; glass clears AA over it at `opacityCeiling 0.5` BOTH modes **on an engine WITHOUT `contrast-color()`** (sample a TEXT-FREE bg patch + the actual painted text color, NOT a whole-card mean — Critique-5); no stale warm wash under a focal substrate. DELTA vs `hero-broken.png`/`category-card-waste.png`.

### 3. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
**Validated mechanism (M4 decision confirmed by Source-Fact 5 — sticky child):** hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL; SHELL bar → `scroll(nearest block)`; reserve named-timeline+`timeline-scope` for `scroll-vt.vue`; drop `--scroll-progress-scroller` + the `opacity:0.85` rest. Gate COMPLETE: full-value-var assert + NO `scroll(var(` substring + GLOBAL `scroll(\s*--` scan + planted bite + re-point `proof:ba-animate`/`ba-animate.spec.ts`; the gate reads COMPUTED `animationTimeline`/`animationRange`; reconcile stale prose. **BINDING π (de-confounded — Critique-5):** `animationTimeline` resolved (NOT `'auto'`) + `scaleX(0)` at scroll-top EVERY route + **GROWS on scroll measured via `getAnimations()[0].currentTime` + a screenshot bbox-width delta** (NOT `getComputedStyle(transform)` — unreliable for compositor scroll-linked anims) + a scroll-timeline-DISABLED engine resting `scaleX(0)`. Chrome AND Safari. DELTA vs `top-bar.png`.

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #2
M3 fold (canonical `warmProjectHue`+`sectionHueDeg`; collapse `warm-field.ts`; PRESERVE 3 consumers; rewire `useGlassBackdropLuminance` to the shell canvas; hue-coherence WITH a paint capture). **Gate:** single-source-of-warm-hue + 3-consumer presence + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #2
Demote universal `.paper-underpaint` 0.22 grain to per-surface opt-in (math-paper/printed specimens); `PaperBackdrop` → pure grain register (field welding dropped); re-tune opt-in opacity sub-JND. **Gate:** no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1 (pages must mount to measure)
**Validated mechanism (prototype-4 dual-bound math sound at 4 breakpoints; collision is a phantom — R2):** ONE chassis title path (hero+intro) + `#title-ornament`; svh term on the fit-cap `min()` (FOUC backstop) + FIXED `--story-hero-est-lines: 2` (no ResizeObserver — R3); delete dead `max-block-size`; ≥4 rung floor as a regression guard at ≥768; `displayTitle` taste-polish (no nav-label corruption); single-source the line factor; drop `max-w-5xl`. NO `--type-display-*` edit. **BINDING π (375/768/1440/1920, BOTH modes, both engines; titles read from `manifest.ts` at capture, never guessed — Critique-5):** rendered `<h1>` BLOCK **≤~0.62×svh** for the LONGEST manifest hero `displayTitle ?? title`; **`font-size ≥ computed(display-4)` at ≥768 ONLY** (at 375: NO hyphenation + NO horizontal overflow); **≥1 preview card above the fold at 1440×820** on `/compositions/hero` + every hero page. DELTA vs `hero-broken.png`.

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
Export `navigate` (SHIPPED at `useViewTransition.ts:205`) on the motion-core barrel; drive `router.push` through it with `types:['forward'|'back']` behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor. NEVER a concurrent default-mode transition, NEVER a second engine. If it lands, set `--vt-direction` to graduate the AX `directional-view-transition` n:2 honest-hold (VERIFY `view-transition.css` carries `--vt-direction` — HEAD ships `--vt-rise` only).

---

## ACCEPTANCE / REAL-PAINT-π BAR (the close condition)

> **C-PAINT (binding):** headless-green/visually-broken shipped 3× (BB/BC/BD). Every WS1 acceptance is a FRESH LIVE capture by an agent who did NOT author the build, Chrome AND a real Safari/WebKit context, REAL GPU. The build agent must NOT capture its own acceptance. **A device-free gate (`proof:focal-complete`, `proof:route-single-root`) proves SHAPE; the live capture proves PAINT — the close hinges on PAINT.**

**Routing (the linchpin):**
- ≥6 cross-category hops: at every settle **`main h1.textContent === destination title`** (PRIMARY; page-root identity where h1-less) AND `main.children.length === 2` AND no orphan stale-heading node.
- **5-nav-<300ms burst** → at +60/+360/+1260ms: `main h1 === LAST-dest` AND `main.children.length === 2` AND **monotonic allocated-GL===1** (live-context canvases, sampled at SETTLE; a transient 2 at +60ms is not a leak) AND the **TRANSITION-FIDELITY** mid-frame transform on the REAL page. No reload. PRM keeps fade, drops transform.
- **A leading-comment-root hop renders (no white-screen)** at dev :5199.
- **Chrome AND Safari/WebKit** (rapid keyed out-in swaps are exactly where WebKit diverges; the floor NEVER depends on native VT).

**Field:**
- Every non-substrate route paints a calm warm AURORA — NO conic sheen, NO C>0.10 brown pigment, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5` ON AN ENGINE WITHOUT `contrast-color()` (text-free-patch contrast sample). Verified at the WORST cool-projected hue (motion 85° / data 88°).
- `glContextCount(allocated)===1` (live-context oracle) on every non-substrate route AND on a content→substrate→content round-trip; a focal route's viz is the sole live context, NO stale shell wash bleeding under it. **Real GPU** (Safari's lower per-window budget bites first).

**Top bar:**
- `animationTimeline` resolved (NOT `'auto'`); `scaleX(0)` at scroll-top EVERY route; **GROWS on scroll (de-confounded — `getAnimations().currentTime` + bbox-width delta)**; a scroll-timeline-DISABLED engine rests `scaleX(0)`. Chrome AND Safari.

**Hero:**
- Rendered `<h1>` BLOCK ≤~0.62×svh at 375/768/1440/1920 BOTH modes (the LONGEST manifest `displayTitle ?? title`); `font-size ≥ computed(display-4)` at ≥768; at 375 NO hyphenation + NO overflow; ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page. NO display-3 downgrade.

**First-paint (R1 — resolved, not deferred):**
- plain-lazy is the LANDED loader (no eager-glob first-paint regression; no async void-bridge). `proof:lighthouse` first-paint un-regressed vs the pinned floor (a confirmatory check, not a decision gate).

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

## OPEN RISKS / RESIDUAL GAPS (the pass-3 unconverged frontier — the NEXT PASS's brief)

1. **(HIGHEST — Δ0) The build is UNBUILT and unpainted.** Pass-3's premise has an unmet precondition. Land M1+M2+M3+M4+M5+M0 as ONE cut on `tranche/BG @879c0c41` (coordinate the AppShell deletions with WS2), REGISTER the four new gates, THEN a NON-AUTHORING agent captures the binding paint on a real GPU, Chrome AND real Safari/WebKit. THIS is the close — and it has NOT happened.
2. **(Δ1) The #7956 sweep is INCOMPLETE.** ~6 of 13+ roots normalized; auth-shell/StoryHeader/StorySectionHeader/CodeBlock/PresetPickerRow/AuroraStage/DemoFrame + chain-recursion cases remain. `proof:route-single-root` (chain-walking, `cannot-be-animated`-targeted, necessity-verified-on-the-un-normalized-tree) is UNBUILT.
3. **(Δ2) Article-count is a confirmed false-green.** `heading===dest` + `children===2` + no-orphan + monotonic-GL is the only catching assert — UNCAPTURED on the built tree.
4. **(Δ5 / runtime one-GL) `proof:focal-complete` proves enumeration, NOT the runtime law.** The async-dispose/WebKit-budget race can leave 2 live contexts while the gate greens. The live monotonic-GL capture is the only proof — UNCAPTURED.
5. **Safari/WebKit has ZERO real-demo evidence.** The prototype-5 harness ran a synthetic fixture; the M4 fixed-bar finding doesn't transfer; grows-on-scroll is un-de-confounded. Four named falsifiers: named-timeline lag (mitigated by `nearest`), per-window GL budget, canvas-move-loses-context (avoided by mount/unmount-never-reparent), premultiply-toward-black (oklch zero-stops).
6. **(R2 width-floor at 375) `font≥display-4` AND single-wordmark-fits-375 are mutually unsatisfiable for a 12-ch title** — the π binds font≥display-4 at ≥768 only; at 375 it asserts no-hyphenation/no-overflow. Verify the longest `displayTitle` does not break at 375 on the built tree.
7. **The `displayTitle` field** must be added without corrupting nav/breadcrumb/search labels — verify all 3 consumers read the semantic `title`.
8. **GL dispose is ASYNC** — sample monotonic-GL at SETTLE (+360/+1260ms), count live-context canvases (`isContextLost()===false` + `isConnected`), not raw tags.

---

## CONVERGENCE LEDGER (pass-3 → pass-3-converged)

| pass-3 disposition | pass-3-converged advance (folded critique) |
|---|---|
| eager-glob (or async) — a binary | **FLIPPED to plain-lazy (R1, Critique-3): the vue-router idiom, ties entry-gz, the only loader whose enter animates the REAL page; KEEP `firstResolved`.** |
| Δ3 svh-vs-≥4 collision forces title re-authoring | **PHANTOM (R2, Critique-4): display-4@1440=86.1px, svh@est5=101.7px above it. Re-authoring is TASTE polish; dual-bound π is a regression guard; font≥display-4 binds ≥768 only.** |
| measured `est-lines` via ResizeObserver | **FIXED `est-lines:2`, NO ResizeObserver (R3, Critique-4): KISS, FOUC-safe.** |
| retire all 3 `:hero-title=false` | **AMENDED to hero+intro ONLY (R4, Critique-4); auth-shell keeps bespoke title + gets the #7956 strip.** |
| `.scroll-build` retire deletes scroll-tokens.css:32 | **UNTANGLE FIRST (Critique-1): `--scroll-build-rise` is read by the hero keyframes; mint `--story-hero-rise`, re-point, THEN delete.** |
| `proof:focal-complete` enumerates → close | **NAMED insufficient (Δ5, Critique-2): proves enumeration NOT the runtime one-GL law; the close hinges on the live monotonic-GL capture; biteB fixed, section-landing hole closed, parse heuristics hardened.** |
| M2 un-mounts `.paper-field` | **COMPLETE clean break (Critique-2): DELETE the recipe + props + `proof:no-paper-field` source assert (the metallic field still SHIPS in CSS otherwise — no-legacy violated).** |
| M4 `scroll(nearest block)` (uncertain) | **CONFIRMED CORRECT (Source-Fact 5, Critique-5): sticky child resolves nearest; grows-on-scroll π de-confounded via `getAnimations().currentTime` + bbox-width delta.** |
| burst π = `survivorArticleCount===1` | **DEMOTED — false-green (Critique-1/Δ2): PRIMARY = `heading===dest` + `children===2` + no-orphan + monotonic-GL + TRANSITION-FIDELITY mid-frame.** |
| Δ0 / Safari | **STILL the binding unconverged frontier — INTEGRATE then CAPTURE; zero real-demo Safari evidence today.** |
