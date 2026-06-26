# BG-WS1 · Shell · Routing · Field — SPEC (pass 2, CONVERGED — the de-confounded one-GL linchpin)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large.
> Supersedes `SPEC-pass2.md`. Grounded against HEAD `tranche/BG` (4.2.0). **5 pass-2 prototypes ran (4 build-validated, 1 paper); 5 critiques returned [refine] (30/42/72/38/38%).** This converged spec FOLDS every mustFix, ADOPTS the validated mechanisms, and CORRECTS two load-bearing source-fact errors the critiques exposed against HEAD. **The mechanisms are now build-validated and source-correct; the binding REAL-PAINT-π (the 5-nav burst survivor + monotonic-one-GL + Safari/WebKit on a real GPU by a non-authoring agent) is the uncaptured frontier that gates the close (C-PAINT — headless-green/visually-broken shipped 3×).**

---

## TWO SOURCE-FACT CORRECTIONS (verified against HEAD — the spec was WRONG, now fixed)

| pass-2 spec claim | HEAD reality (verified) | converged mechanism |
|---|---|---|
| **"pause/resume/dispose/isArmed are defineExpose'd METHODS"** → suppress the persistent shell node via a template-ref `dispose()` call (SPEC-pass2.md:108, 123). | **`Aurora.vue` `defineExpose` (166-178) exposes `pause/resume/isArmed` but NO `dispose`.** A template-ref `shellAurora.value.dispose()` is a runtime `undefined` call — the persist-node/template-ref-dispose mechanism CANNOT work as specced. | **`v-if="!routeOwnsFocalSubstrate"` on the shell `<Aurora>` + `onBeforeUnmount → dispose()` inside `useAurora` (347-356, the composable owns dispose).** The validated zero-new-API context-free path (Prototype 2, REAL GPU). The Aurora primitive stays byte-untouched (no new defineExpose entry — the foreign-fence/presets-in-consumers discipline). |
| **`shellAuroraConfig` reaches a recessive field by overriding PALETTE stops to C 0.05–0.09** (SPEC-pass2.md:126). | **`vividnessFloor` (aurora.frag.ts:373-385, `VIVID_TARGET 0.115`, `modeLift 1.18` dark) RE-PIGMENTS every pale fragment to C≥0.115 whenever `uVividness > 0.0001`.** `heroAuroraConfig` spreads `...DEFAULT_AURORA_CONFIG` (214) → inherits `vividness: DEFAULT_VIVIDNESS` (HIGH). A recessive palette alone is overridden by the shader floor → the field paints pigmented anyway. | **`shellAuroraConfig` MUST set `vividness: 0`** (the explicit floor opt-out — byte-identity no-op per presets.ts:229) AND the recessive C 0.05–0.09 palette. `vividness:0` disables the floor so the recessive stops paint TRUE. The falsification lives in the SHADER, not the palette (Prototype 5). |

---

## CONVERGENCE STATUS (the honest gate)

The pass-2 causal re-diagnosis HOLDS and is now build-proven: **M1 (the `out-in` keyed swap + the 3-branch `v-if` chain delete, as ONE cut) is the freeze linchpin; M0 (Aurora rejection) is hygiene, not the cure.** Prototype 1 proved the cut compiles as a clean **−176/+50 subtraction** (`vue-tsc --noEmit` EXIT 0 over src+demo, `npm run build` EXIT 0, 79 subpath dts emitted, zero orphan symbols). Prototype 2 proved the field gate (`shellFieldPresent === !route.meta.focal`) deterministic across every route TYPE on a REAL GPU (ANGLE Metal, M5 Max).

**BUT every prototype critique returned [refine], and the gate is unmet on ONE axis common to all five:** the binding live falsifier — **the 5-nav-<300ms burst → `survivor===1` + monotonic-WebGL-context===1 + `heading===last-dest`, captured FRESH in Chrome AND Safari/WebKit on a REAL GPU by a NON-AUTHORING agent** — was NOT run for any wave. Build-green is not the experiment; the burst is. Safari has ZERO evidence anywhere. This is the C-PAINT cardinal (the headless-single-nav-green / orphan-under-burst trap that shipped 3×). **Until the burst + Safari π land, WS1 does not clear.**

| pass-2 axis | converged disposition |
|---|---|
| M1 = `out-in` + branch-delete linchpin | **CONFIRMED + BUILD-PROVEN** (clean subtraction). Residual: the 5-nav burst + Safari π (the experiment, not the build). |
| M0 = hygiene, not the cure | **CONFIRMED.** Folds into W-ROUTE-TRANSITION. The false `useAurora.ts:191` docstring is corrected here. |
| M2 = persist-node / gate-context via template-ref dispose | **CORRECTED → `v-if(!focal)` + `onBeforeUnmount` dispose** (dispose is not exposed). The node persists across all non-focal navs (the common case, boolean stays false→false); it churns ONLY at the focal boundary — exactly where the context must be freed. Monotonic one-GL by construction. |
| shellAuroraConfig recessive via palette | **CORRECTED → `vividness:0` + recessive palette** (the shader floor mandate). |
| M4 top-bar bare named timeline | **REFINED → `scroll(nearest block)` for the convergence-critical SHELL bar** (the critique's robust path — the bar IS a child of `<main>`, no name-resolution fragility on the path that gates ALL downstream paint-verify); named-timeline + `timeline-scope` reserved for `scroll-vt.vue` (the genuine cross-element case). Unconditional `scaleX(0)` floor + structural-root guard. Residual: Safari capture (grows-on-scroll, not just rest). |
| M5 hero svh-term | **svh DIVISOR MATH VALIDATED** (every heroScale rung resolves `line-height:1.05`, the divisor cancels the block leading — Prototype 4). Residual: the LOAD-BEARING half (bespoke-bypass closure: ONE chassis path + `#title-ornament`) is paper-only — ZERO code in tree; it must actually LAND + wire + Safari/4-breakpoint/both-mode/above-fold-cluster π. |
| swap axis | **RECONCILED → `route.path` EVERYWHERE** (the scroll-reset watch moves off `route.fullPath`; a query-only change must not re-run scroll-reset without re-mounting). |
| async-blank-window | **RESOLVED IN THIS CUT → eager glob preferred** (deleting the skeleton without it flashes `articles===0` on cold-chunk navs → the +60ms burst sample reads 0 → falsifier fails). Measure `proof:lighthouse` first-paint; fall to `defineAsyncComponent` + `loadingComponent` (void-fill INSIDE the async boundary) only if the eager bundle bump is unacceptable. |

---

## GESTALT GOAL

One shell, one route-swap mechanism, one persistent field, one fit law. The cure is **subtraction**, sequenced by the EVIDENCED causation:

1. **ROUTE (M1) — the linchpin.** Collapse the four-mechanism contrivance pile to `<Transition name="route-liquid" mode="out-in"><component :is="Component" :key="route.path"/></Transition>` AND delete the 3-branch `v-if` chain, the bloom-find-child DOM-spelunk, and the no-op categoryId VT watcher in the SAME cut. Eager-glob the routed chunks (no async window). `out-in` serializes leave→enter → exactly 1 `<article>` at every settle, AND at most 1 per-page GL context co-mounted.
2. **FIELD (M2) — the ★★★ material reversal + the one-GL law.** Retire the "disgusting metallic" `.paper-field` WHOLE for ONE shell `<Aurora>` mounted OUTSIDE the swap unit, `v-if`'d on `!routeOwnsFocalSubstrate` with `onBeforeUnmount → dispose()` to free the context on focal routes. Per-route warm hue via a reactive `vividness:0` recessive config. Monotonic exactly-one-GL by construction.
3. **HYGIENE (M0) — fold in, not the fix.** `app.config.errorHandler` + `onInitError` on every Aurora mount + the false-docstring correction. Cheap, correct, parallel — never credited as the freeze cure.
4. **TOP BAR (M4).** `scroll(nearest block)` on the shell rail + hoist `transform-origin:0 50%` + `transform:scaleX(0)` UNCONDITIONAL so a non-supporting/PRM/invalid-timeline engine rests invisible, not full-width.
5. **HERO (M5).** Route EVERY hero `<h1>` (chassis + the bespoke `:hero-title=false` bypass) through ONE chassis title path with a `#title-ornament` slot; add an svh height term + a ResizeObserver true-upper-bound est-lines so the rendered BLOCK is ≤~0.62×svh; the ≥4 rung floor is HONORED (no display-3 downgrade — re-author over-length sentence titles to phrase length).

Every motion leg is compositor-only (transform/opacity/filter), carries iOS-27 liquid weight (spring-on-spatial / bezier-on-effects, enter-overshoots / exit-no-overshoot), PRM keeps-fade/drops-transform, and paints identically in Chrome AND Safari (the `out-in` floor never depends on native VT). The `<Aurora>` primitive and the `--type-display-*` ladder are byte-untouched.

---

## MECHANISM (hardened, concrete, build-validated)

### M1 — The route swap: the idiomatic Vue-Router-4 form (D1/D9, the linchpin)

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism (NO Suspense, NO v-if branch chain) -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
```

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → exactly 1 `<article>` at every settle, AND at most 1 per-page GL context live. **BUILD-PROVEN** (Prototype 1: clean compile, no orphan symbols). The 5-nav burst is the binding falsifier, not the build.
- `:key="route.path"` → one unambiguous swap unit per route. **Reconcile the swap axis: `route.path` EVERYWHERE** — the scroll-reset `watch` moves off `route.fullPath` onto `route.path` (a query/hash-only change must NOT re-run scroll-reset without re-mounting; pick ONE axis). [folded — M1 critique #6]
- **Async-loading: EAGER GLOB (preferred) — resolved IN this cut.** `manifest.ts` is lazy `import.meta.glob` with NO eager (verified). Deleting the skeleton without eager-glob OR a `defineAsyncComponent` `loadingComponent` makes cold-chunk navs flash `articles===0` → the +60ms burst sample reads 0 → the falsifier fails. Switch the manifest glob to `{ eager: true }` (the storybook chunks are small) → no async window → trivially-correct `out-in`, no skeleton, no loading state. **Measure `proof:lighthouse` first-paint to confirm the bundle bump is acceptable;** fall to `defineAsyncComponent` + `loadingComponent` (the void-fill re-homed INSIDE the async boundary, `delay:120`, so the slot only ever holds ONE element) ONLY if eager regresses first-paint. [folded — M1 critique #2]
- **NO `<Suspense>`** (pass-1 falsified — sticky wedge). **NO `v-if`/`v-else-if` branch chain** — DELETE the no-match `<Card>` (dead: `router.ts` ships `/:pathMatch(.*)*` → `NotFound`, verified) AND the matched-pending skeleton branch.

**`.scroll-build` decouple (MANDATORY, NOT cosmetic) [folded — M1 critique #3]:** remove `.scroll-build` from the routed article roots (`StoryPage.vue:72`, `SectionLanding.vue:85`). `route-liquid` on the root + `gl-page-build` on the children is a **compounded double-entrance**, not the one-entrance-system gestalt. The `gl-page-build` mount-keyframe ran the same opacity/transform legs as the leave-transition on the SAME element (a SECONDARY orphan contributor, self-documented `liquid-enter.css:14`). Move the entrance WEIGHT into the `route-liquid` enter curve. **KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`** (interior `view()` registers — they do not collide).

**The `route-liquid` recipe** (mint in `src/styles/transitions.css`, DRY off the shipped `.pane-swap-*` out-in precedent):

```css
/* route-liquid — the ONE route page-swap (out-in). DRY off .pane-swap-*. iOS NavStack push. */
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
    .route-liquid-enter-from, .route-liquid-enter-to, .route-liquid-leave-to { transform: none !important; }  /* P6 fade-keeps/transform-drops */
    .route-liquid-enter-active, .route-liquid-leave-active { transition-property: opacity !important; }
}
```

Compositor-only, PRM-carved, Safari-safe (CSS `<Transition>`, never VT for the floor). The leave is a finite fast fade (`--duration-fast`); a finite duration + Vue's `setTimeout(duration+1)` safety net guarantees `_leaveCb` resolves — **build-proven by the 5-nav burst, not assumed.** Do NOT re-introduce `<Suspense>`.

**Deletions (clean break, `proof:no-dual-path`):** `useBloomUp` import (`AppShell.vue:30`) + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom `watch` find-child DOM-spelunk (255-303); the categoryId no-op `startViewTransition` watcher + the dead `dataset.categorySwitch` write (212-228, grep proves 0 readers); the skeleton `v-else-if` + the no-match `<Card>` + the `Skeleton` import. **KEEP** `toggleShellMorph`'s `startViewTransition` (131, the functional dock-morph stage — WS2). **KEEP** the ONE scroll-reset owner (`mainEl.scrollTo`, 195, re-axised to `route.path`).

> **Native VT for the swap?** Safari 18.4+ supports same-document VT, but the FLOOR is the Vue `out-in` `<Transition>` (always-correct, Safari-safe on older WebKit, PRM-instant by recipe). VT is `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/optional, gated on M1 green, MUST NEVER re-introduce a concurrent default-mode transition.

### M2 — The field: ONE shell aurora, v-if-gate / dispose-context (D2/C-FIELD + the one-GL law)

**Root cause:** `AppShell.vue:360` mounts `<PaperBackdrop field :field-hue>` UNCONDITIONALLY → `.paper-field` (`paper.css:129-218`): a conic cel-sheen (`from -45deg at 78% 22%` — the angular "metallic" highlight Liquid-Glass never has; it uses RADIAL specular) + 4 high-chroma radials (oklch C 0.115–0.155 = brown PIGMENT) + a `::before` 42s `field-cel-drift` churn + the 0.22 feTurbulence `.paper-underpaint` speckle. **The defect is the MATERIAL, not the HUE** (already warm amber-66): retire conic + high-C radials + grain + churn TOGETHER; the warm hue is preserved by `warmFieldHue`.

```vue
<!-- AppShell.vue — the ONE field. v-if'd on !focal; dispose frees the context on focal.
     Aurora exposes pause/resume/isArmed but NO dispose — the composable owns dispose
     (useAurora.ts:347-356), reached via onBeforeUnmount when v-if removes the node. -->
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

1. **`v-if(!focal)` + `onBeforeUnmount` dispose — the validated zero-new-API context-free path** (Prototype 2, REAL GPU; CORRECTS the spec's false template-ref dispose). The node is PRESENT iff non-focal. Across all non-focal→non-focal navs (the common case) the boolean stays `false→false` → the node PERSISTS (no re-arm churn, no reparent — the WebKit canvas-move-loses-context constraint never bites because the node is never MOVED, only mounted/unmounted at the focal boundary). At the non-focal→focal flip the node unmounts → `onBeforeUnmount → useAurora.dispose()` frees the GL context → ZERO shell context under the focal viz. focal→non-focal remounts fresh → ONE context. **Monotonic exactly-one-GL by construction:** shell context (non-focal) XOR focal-viz context (focal).
2. **Per-route hue WITHOUT re-mount.** `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)`. Across non-focal navs the hue updates reactively (a uniform re-upload via Aurora's deep config watch) on the PERSISTED node — never a canvas re-mount.
3. **The field MATERIAL is recessive — `vividness:0` is MANDATORY** [folded — Prototype 5 + field-material critique]. Mint `shellAuroraConfig(hue)` in `aurora-hero.ts` = `heroAuroraConfig`'s calm motion band (`breathPeriod:48`, `nucleiDrift/paletteDrift:0.012`, `saturation:0.95`) + **`vividness: 0`** (disables `vividnessFloor` — byte-identity no-op per presets.ts:229, so the recessive stops paint TRUE; WITHOUT this the shader re-pigments every pale stop to C≥0.115 and the field reads pigmented anyway) + an EXPLICIT recessive-chroma palette (stops **C ≈ 0.05–0.09**) + the per-route `warmFieldHue`. NOT a "third re-hue factory inheriting DEFAULT vivid" (the pass-1 mustfix) — it targets the recessive floor explicitly AND kills the shader floor. Result: "sunrise behind frosted glass" (the Siri-island reference), not a foil slab.
4. **`route.meta.focal` is PER-ROW and enumerates ALL live-GL routes** [folded — R5 mustfix]. Not just `StoryBackground` kinds {aurora,constellation,fourier,liquid-grid} but ALSO substrate-category viz rows whose CONTENT mounts its own GL: GooBlob/DotFlowField/concentric/dot-matrix/paper-grid. Project an explicit per-row `focal: true` in `manifest.ts` for every GL-bearing row → `route.meta.focal`. A content row that decoratively defaults to `aurora`/`grid` is NOT focal → it uses the shell field, no per-route GL. **An incomplete enumeration double-allocates (focal viz + shell) OR loses a hero's field — enumerate explicitly, verify each.**
5. **The 2nd/3rd field systems RECONCILE onto the shell.** StoryHero retires its per-page `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` full-bleed mount on NON-focal routes (the shell IS the field), keeping the per-page focal mount ONLY for genuinely-focal viz-demo rows. DockStage folds onto the shell field where covered; keeps its own functional aurora ONLY where it must demonstrate pause/resume. The static `grid`/`paper` page-backgrounds collapse onto the shell aurora; blueprint-grid + paper grain demote to OPT-IN specimen decorations (W-PAPER-GRAIN-OPTIN).
6. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, the live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR cap. The CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. The dispose→re-arm on return shows the CSS-gradient fallback for a frame — acceptable (warm floor); verify no jarring flash. Live-verify the field stays CALM warm AND glass clears AA over it at `opacityCeiling 0.5` in BOTH modes.

### M0 — Eliminate the Aurora-rejection surface (HYGIENE, folds into W-ROUTE-TRANSITION — NOT the freeze fix)

```ts
// demo/main.ts — the global error trap. A real surfacer (no swallow), not the freeze cure.
app.config.errorHandler = (err, _instance, info) => {
    console.error("[demo] app error", info, err);
};
```

Thread `onInitError` into EVERY Aurora mount (grep-confirmed UNHANDLED today — only `liquid-playground` handles it): the shell field, `StoryHero.vue:267`, `DockStage.vue:59`, `KonamiAurora.vue:48`, and the per-page contained mounts (`buttons.vue:76`, `card.vue:147/303`, `glass-panel.vue:60`, `auth-shell.vue:58`, `rail.vue:80`, `overview.vue:626`). The handler logs + leaves the placeholder. **Correct the false docstring** at `useAurora.ts:191` ("Vue installs a global rejection handler via app.config.errorHandler" — it does NOT catch a floating `window.onunhandledrejection`). Gate: `proof:route-confounder` (device-free — every `<Aurora`/`useAurora(` mount in `demo/` has an `onInitError` in scope + `app.config.errorHandler` present + a self-test bite).

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`demo/stories/warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `warmFieldHue` + the DEAD `warmFieldHueMap`) is a verified-verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + a same-named `clampWarm` + the same `[25,95]` band). **Fold:** `aurora-hero.ts`'s `warmProjectHue` is canonical; re-derive `warmFieldHue` from it (delete the duplicated body + the dead `warmFieldHueMap`; keep `warmFieldHue` as a thin re-export). **PRESERVE all 3 `warmFieldHue` consumers** (verified): `AppShell.vue:237`, `SectionLanding.vue:48`, `SectionPreviewCard.vue:167`. ONE warm-hue source.

> **Hue-coherence refinement (the deeper DRY win, scoped within the wave — do not silently force):** `warmFieldHue` and `heroAuroraConfig` (via `CATEGORY_PALETTE_HUES`) currently give DIFFERENT hues per category. The coherent fix re-hues the focal `heroAuroraConfig` off the SAME `warmFieldHue` source so field and hero agree — but that touches the focal-hero hue identity, so it lands inside W-FIELD-ACCENT-RECONCILE WITH a paint capture, NEVER a blind `CATEGORY_PALETTE_HUES` delete. The SHELL field fix (M2/M3) is independent.

Also rewire `useGlassBackdropLuminance` (built for dock-over-live-aurora) to sample the live SHELL canvas (zero new cost — already a `drawImage + getImageData` sampler).

### M4 — The top-bar: `scroll(nearest block)` shell bind + the UNCONDITIONAL scaleX(0) floor (D5, BG.W-SCROLL-PROGRESS-RAIL)

**Root cause (confirmed live):** `scroll-driven.css:46` `animation-timeline: scroll(var(--scroll-progress-scroller, root) block)` + `dock-nav.css:231` `--scroll-progress-scroller: --demo-main-progress` → `scroll(--demo-main-progress block)`. `scroll()` accepts ONLY scroller KEYWORDS (`root`/`nearest`/`self`), never a `<dashed-ident>` → invalid → computed `auto` → plays time-based once → ends at `to{scaleX(1)}` full-width. **Critically `transform-origin:0 50%` is INSIDE the `@supports`+PRM gate and there is NO unconditional `transform:scaleX(0)`** — so a non-supporting/PRM engine ALSO rests full-width.

```css
/* scroll-driven.css — the UNCONDITIONAL floor + the gated animation. */
.scroll-progress {
    transform-origin: 0 50%;
    transform: scaleX(0);   /* the true non-supporting/PRM/invalid-timeline floor — HOISTED outside the gate */
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

- **Hoist `transform-origin:0 50%` + `transform:scaleX(0)` UNCONDITIONAL** so any timeline-resolution failure yields an EMPTY bar (the safe failure mode). **Rest is `scaleX(0)`, NOT `opacity:0.85`** — re-express the affordance as faint-but-SHRUNK.
- **The convergence-critical SHELL bar uses `scroll(nearest block)`, NOT a bare named ident** [folded — M4 critique #2]. The bar is a direct child of `<main class="demo-main-scroller overflow-y-auto">`, so `nearest` resolves to `<main>` via the anonymous-`scroll()` baseline WebKit shipped FIRST — eliminating named-timeline name-resolution fragility on the path that gates ALL downstream SPA paint-verify. (Prototype 3 proved the BARE NAMED ident also resolves on Chromium — `animationTimeline==='--demo-main-progress'`, tracks 60%→scaleX 0.5999 — but Safari named-scroll-timeline lagged anonymous `scroll()`; `nearest` is the robust path for the linchpin-gating bar.) The consumer drops `--scroll-progress-scroller`; `.demo-scroll-progress { --scroll-progress-timeline: scroll(nearest block); }`.
- **Reserve the named-timeline + `timeline-scope` machinery for `scroll-vt.vue`** (the genuine preceding-sibling cross-element case): migrate its `self`-keyword consumer onto its own named timeline + `timeline-scope` and VERIFY the story bar grows 0→1 on panel scroll in BOTH engines.
- **Harden the anti-regression guard to the STRUCTURAL root cause** [folded — M4 critique #3]: the bug lived only AFTER CSS-var substitution, invisible to a static `scroll(--` scan. Add an assert that `scroll-driven.css` binds `animation-timeline: var(--scroll-progress-timeline, …)` (the full-value var form) AND contains NO `scroll(var(` substring (the scroller-arg-from-a-var form that re-admits an invalid dashed-ident).
- **Land the gate COMPLETE in the SAME wave** [folded — M4 critique #4]: (a) add a discrete PLANTED-REGRESSION self-test bite; (b) make the `scroll(\s*--` scan GLOBAL over `src`+`demo` (NOT the current 4-file set — `scroll-vt.vue` in `demo/stories/motion/` is not read; a re-introduced `scroll(--foo)` there slips); (c) re-point `proof:ba-animate` W2 (`scrollerOverride`, `scrollerNotRoot`) to `--scroll-progress-timeline` AND re-point `ba-animate.spec.ts:120` off `--scroll-progress-scroller`; tighten the override regex to reject only `scroll(\s*--`, not a legitimate `scroll(nearest block)`.
- **Reconcile the stale prose** (clean-break/no-dead-orphan discipline) [folded — M4 critique #5]: `AppShell.vue:385-393` comment, `dock-nav.css:185-199` + `246-248`, and `scroll-driven.css:33-35` header all still say `--scroll-progress-scroller` + "a faint rest state"; update to `--scroll-progress-timeline` + the `scaleX(0)` rest so docs do not contradict code.

### M5 — The hero fit: ONE chassis path + svh height term (D10, BG.W-HERO-FIT)

**Root cause (confirmed live):** `story-hero.css:225-229` fit-cap is `min(rung, (100vw - 2*pad)/7)` — WIDTH-only, NO svh/height term. A multi-word title wraps to N lines past the viewport (`/compositions/hero` "Real scenes, assembled from the parts.": 1440 → 1134px = **1.4×svh**, 0 preview cards above fold). TWO faults: **(a)** the cap is the wrong AXIS (width cannot bound a wrapping title's HEIGHT); **(b)** the bespoke heroes (`hero.vue`/`intro.vue`/`auth-shell.vue`) hand-author `<h1 class="text-display-hero max-w-5xl">` via `:hero-title="false"` — they **bypass the chassis cap entirely**.

**The svh DIVISOR math is VALIDATED** (Prototype 4): every heroScale rung (audacious/mega/hero/5/4) resolves `line-height: var(--type-leading-display) = 1.05` (semantic.css), so the leading divisor cancels the block's real leading — the `calc(0.62 * 100svh / est-lines)` term bounds the rendered BLOCK correctly. **The LOAD-BEARING half is the bespoke-bypass CLOSURE — and it is paper-only (ZERO code in tree). It must actually land.**

1. **ONE chassis title path with a `#title-ornament` slot** (the load-bearing half) — retire `:hero-title="false"` + the bare `<h1 class="text-display-*">` in `hero.vue`/`intro.vue`/`auth-shell.vue` (clean break); render every hero `<h1>` through `.story-hero-title[data-hero-scale]`, with a `#title-ornament` slot that PRESERVES the bespoke eyebrow + ℱ wordmark + blurb. Drop `max-w-5xl` (it manufactures the wrap) → the chassis `~18ch` measure.
2. **Height-aware fit-cap with an svh term** (`font-size` is a static resolution, not a layout-animated property; the `--type-display-*` ladder is byte-untouched):

```css
.story-hero-title[data-hero-scale] {
    font-size: min(
        var(--story-hero-title-rung, var(--type-display-4)),
        var(--story-hero-title-fit, calc((100vw - 2 * var(--story-hero-pad, 2rem)) / var(--story-hero-cpl, 7))),
        var(--story-hero-title-svh, calc(0.62 * 100svh / var(--story-hero-est-lines, 2)))  /* HEIGHT budget, svh for address-bar safety */
    );
}
```

3. **`--story-hero-est-lines` is a TRUE upper bound, MEASURED.** A small `useResizeObserver` cap in `StoryHero.vue` measures the ACTUAL rendered line count (`round(scrollHeight / lineHeight)`) and writes it back into `--story-hero-est-lines` so the cap self-corrects. **The instant CSS svh term is the FOUC backstop** — it bounds the BLOCK before the ResizeObserver fires, so a giant title never flashes for one frame. DELETE the dead `max-block-size:calc(0.62*100svh)` backstop (no-op with `overflow:visible`).
4. **The ≥4 rung floor is HONORED — NO display-3 downgrade** (the live tree took this FORBIDDEN shortcut). The svh cap does the height-bounding WITHOUT a rung change. Where a sentence-length headline reads too large even svh-capped, **re-author it to wordmark/phrase length** (e.g. "Real scenes, assembled from the parts." → a short audacious phrase that survives at ≥4), NOT floor it at display-3. Surface any genuine title→rung conflict explicitly.
5. **Single-source the line factor** — `--story-hero-cpl` and the JS `HERO_CHARS_PER_LINE` read ONE constant.

---

## SEQUENCING (the build order — driven by the decisive experiment)

1. **M1 — the route swap** (full cut: out-in + branch-delete + bloom/categoryId-watcher delete + `route-liquid` mint + `.scroll-build` decouple + eager-glob + swap-axis=route.path + M0 hygiene). **Build-prove the 5-nav burst on the de-confounded tree, Chrome AND Safari, by a non-authoring agent. Blocks all downstream SPA paint-verify.**
2. **M2 — the ONE shell aurora** (`v-if(!focal)` + dispose + per-page-substrate retire + `vividness:0` recessive config). Lands WITH M1 (the ★★★ material directive AND the monotonic-one-GL bar). `.paper-field` retires here.
3. **M0 — confounder hygiene** folds into the M1 wave (parallel, cheap).
4. **M4 — top-bar** — INDEPENDENT, parallel with M1-M2.
5. **M3 — warm-field fold** — after M2.
6. **Grain opt-in** — after M2.
7. **M5 — hero fit** — after M1 (pages must mount to measure).
8. **BG.W-VT-ROUTE-ENHANCE** — DEFERRED/optional, gated on M1 green.

---

## WAVE BREAKDOWN — each with its validated mechanism + real-paint-π bar

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
**Validated:** `<Transition mode="out-in"><component :is :key="route.path">` compiles clean (−176/+50 subtraction, Prototype 1). **Mechanism:** out-in keyed swap + 3-branch `v-if` delete + bloom/categoryId-VT-watcher/`dataset.categorySwitch`/no-match-Card/skeleton/`Skeleton`-import delete; mint `route-liquid` DRY off `.pane-swap-*`; `.scroll-build` off both article roots; eager-glob the manifest; swap-axis=`route.path` everywhere; KEEP `toggleShellMorph` VT + the ONE scroll-reset owner; + M0 (`app.config.errorHandler` + `onInitError` on every Aurora mount + the docstring correction). **Device-free gates:** `proof:route-confounder` (new) + `mode="out-in"` present + the deleted mechanisms ABSENT + no `.scroll-build` on a routed article root + self-test bites. **BINDING π (the gate): the 5-nav-<300ms burst → `survivorArticleCount===1` AND `articles===1` at +60/+360/+1260ms AND `heading===last-dest` AND monotonic-WebGL-context===1 across N navs, in Chrome AND Safari/WebKit on a REAL GPU by a NON-AUTHORING agent.** Capture a paired-π DELTA, not a reasoning paragraph.

### 2. `BG.W-FIELD-AURORA` — lands WITH #1 (★★★ material reversal + the one-GL law)
**Validated:** field gate `shellFieldPresent === !route.meta.focal` deterministic on REAL GPU (Prototype 2); the shader-floor falsification (Prototype 5). **Mechanism:** retire `.paper-field` WHOLE (`paper.css:129-218` + dark arm + `field-cel-drift` + `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`); mount ONE shell `<Aurora v-if="!routeOwnsFocalSubstrate">` with `onBeforeUnmount → useAurora.dispose()` (NOT a fictional template-ref `dispose` — Aurora exposes only pause/resume/isArmed); per-ROW `route.meta.focal` enumerating ALL live-GL rows incl. substrate viz CONTENT; reconcile StoryHero + DockStage; mint `shellAuroraConfig(hue)` = calm motion band + **`vividness:0`** + recessive C 0.05–0.09 + `warmFieldHue`. Keep the `data-paper-field` DOM hook on the new Aurora wrapper. **Gate:** `proof:offscreen-pause` un-regressed + a `no-paper-field` source assert + a per-row-focal assert + re-audit any `proof:` ref to `paper-field`. **BINDING π (REAL GPU, Chrome AND Safari): `glContextCount(allocated)===1` on every non-substrate route AND on a content→substrate→content round-trip + 5-nav burst (no monotonic leak, no double-allocate on focal); calm warm aurora, NO conic/brown/speckle at ≥3 category hues (incl. the WORST cool-projected hue: motion/data) both modes; glass clears AA over it at `opacityCeiling 0.5` BOTH modes; no stale warm wash under a focal substrate.**

### 3. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
**Validated:** unconditional `scaleX(0)` + named/nearest timeline resolve on Chromium 149 real GPU (Prototype 3, est 90%). **Mechanism:** hoist `transform-origin:0 50%` + `transform:scaleX(0)` UNCONDITIONAL; SHELL bar → `--scroll-progress-timeline: scroll(nearest block)` (robust, the bar is a `<main>` child); reserve named-timeline + `timeline-scope` for `scroll-vt.vue`; drop `--scroll-progress-scroller`; rest `scaleX(0)` not `opacity:0.85`. Gate COMPLETE: full-value-var-form assert + NO `scroll(var(` substring + GLOBAL `scroll(\s*--` scan over src+demo + a planted-regression self-test bite + re-point `proof:ba-animate` W2 + `ba-animate.spec.ts:120`; reconcile the stale `--scroll-progress-scroller` prose (AppShell:385-393, dock-nav.css:185-199/246-248, scroll-driven.css:33-35). **BINDING π (Chrome AND Safari, REAL GPU, non-authoring agent): `animationTimeline` resolved (NOT `'auto'`) + `scaleX(0)` rest at scroll-top every route + GROWS on scroll (the dead-but-safe Safari trap: scaleX(0)-at-rest passes yet grows-on-scroll fails) + a scroll-timeline-DISABLED engine resting `scaleX(0)`.**

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #2
M3: delete the duplicated body + dead `warmFieldHueMap` in `warm-field.ts`; canonical `warmProjectHue` on `aurora-hero.ts`; PRESERVE all 3 `warmFieldHue` consumers; the hue-coherence refinement (re-hue focal `heroAuroraConfig` off `warmFieldHue`) WITH a paint capture (never a blind `CATEGORY_PALETTE_HUES` delete); rewire `useGlassBackdropLuminance` to the shell canvas. **Gate:** single-source-of-warm-hue assert + the 3-consumer presence assert + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #2
Demote the universal `.paper-underpaint` 0.22 grain to per-surface opt-in (math-paper/printed specimens); `PaperBackdrop` returns to a pure grain register (drop the field welding — `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`); re-tune the opt-in opacity sub-JND. **Gate:** no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1 (pages must mount to measure)
**Validated:** the svh divisor math (line-height 1.05 cancels, Prototype 4). **Residual load-bearing:** the bespoke-bypass closure is paper-only — it must LAND. **Mechanism:** ONE chassis title path + `#title-ornament` slot (retire bare `<h1>` + `:hero-title=false` in `hero`/`intro`/`auth-shell`); svh height term on the fit-cap `min()` (the FOUC-safe instant floor); `--story-hero-est-lines` MEASURED via `useResizeObserver`; delete the dead `max-block-size`; ≥4 rung floor HONORED (re-author offending sentence titles, NO display-3); single-source the line factor; drop `max-w-5xl`. NO `--type-display-*` token edit. **BINDING π (Chrome AND Safari, 375/768/1440/1920, BOTH modes, non-authoring agent): rendered `<h1>` BLOCK ≤~0.62×svh for the LONGEST manifest hero title; ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page (the COUPLED cluster height).**

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
Export `navigate` on the motion-core barrel; drive `router.push` through it with directional `types:['forward'|'back']` behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor. MUST NEVER re-introduce a concurrent default-mode transition. WIRE the SHIPPED `navigate()` (AZ.W-ATLAS-RECONCILE), do NOT mint a second engine; graduates the AX honest-hold `directional-view-transition`. One code path folded into W-ROUTE-TRANSITION's nav handlers.

---

## ACCEPTANCE / REAL-PAINT-π BAR

> **C-PAINT (binding):** the headless-green/visually-broken disease shipped 3× (BB/BC/BD). **Every WS1 acceptance is a FRESH LIVE CAPTURE by an agent who did NOT author the build, in Chrome AND a Safari/WebKit context, on a REAL GPU.** Device-free gates prove SOURCE shape; the live π proves PAINT. Build-green is NOT the experiment — the 5-nav burst is.

**Routing (the convergence bar — the linchpin):**
- ≥6 cross-category hops: at every settle `main.querySelectorAll('article').length === 1` AND `main h1.textContent === destination title`.
- **5-nav-in-<300ms stress → `survivorArticleCount === 1` AND the survivor heading === the LAST destination**, sampled at +60/+360/+1260ms.
- A binding **monotonic-WebGL-context (allocated) === 1** assert across an N-nav content→substrate→content sweep. No reload required. PRM keeps fade, drops transform. **Chrome AND Safari** (the out-in floor must never depend on native VT; per-engine survivor count under rapid keyed swaps is exactly where WebKit can diverge).

**Field:**
- Every non-substrate route paints a calm warm AURORA — NO conic sheen, NO brown slab, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5`. Verified at the WORST hue (a cool-category warm-projected hue: motion/data).
- `glContextCount(allocated) === 1` on every non-substrate route AND on a content→substrate→content round-trip; a focal route's viz is the sole live context with NO stale shell wash bleeding under it. **Real GPU** (the `max=1` GPU-less claim does not count).

**Top bar:**
- `animationTimeline` resolved (NOT `'auto'`); `scaleX(0)` at scroll-top on EVERY route; GROWS on scroll; a scroll-timeline-DISABLED engine rests `scaleX(0)` (not `scaleX(1)`). Chrome AND Safari.

**Hero:**
- Rendered `<h1>` BLOCK height ≤~0.62×svh at 375/768/1440/1920, BOTH modes (the LONGEST manifest hero title); ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page. NO display-3 downgrade (the ≥4 rung floor honored).

Capture DELTAs (screenshot + paired-π) against the four evidence PNGs (`hero-broken.png`, `top-bar.png`, `category-card-waste.png`, `morph-modal.png`) as the binding reference anchors — never a commit-message claim.

---

## FOLDED DEFERRED / CROSS-WS HANDOFFS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement tier; deferred/optional, gated on #1 green, additive, never a concurrent transition; wires the SHIPPED `navigate()`.
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, no carrier; a CONSUMER-ASSET arm (DEFER-with-trigger), not a library wave.
- **`BG.W-SCROLL-SHRINK-UNIFY`** (the 3-fork DRY collapse: `--card-scroll` + `story-hero-shrink` + `story-hero-scroll-away` → one keyframe family) → **WS4**; HARD-DEPENDS on W-ROUTE-TRANSITION.
- **AppShell >500-line carve** — extract the in-situ dock-morph demo into a colocated `demo/layout/ShellDockMorphStage.vue` → **WS2** (coordinate the AppShell file deletions so the WS1 route cut + the WS2 morph wave do not collide; the morph-stage `startViewTransition:131` is KEPT, NOT a route contrivance).
- **`useGlassBackdropLuminance` rewire** to the live shell canvas → W-FIELD-ACCENT-RECONCILE (zero new cost).
- **`W-PAINT-IS-THE-GATE`** → **WS7**, but BINDS every WS1 wave's π.

---

## OPEN RISKS / RESIDUAL GAPS (the unconverged frontier)

1. **(HIGHEST — the gate) The binding live falsifier is UNCAPTURED.** The 5-nav burst (survivor===1 + monotonic-GL + heading===last-dest) + the field one-GL monotonic + the top-bar grows-on-scroll + the hero block-fit — NONE captured on a REAL GPU by a non-authoring agent, and **Safari/WebKit has ZERO evidence across the workstream.** The mechanisms are build-validated and source-correct, but the PAINT bar (the actual convergence bar) is unproven. C-PAINT caps the close.
2. **out-in residual wedge to BLANK.** out-in wedges to `articles===0` if any leave's end-callback never fires. Eager-glob removes the async window (the primary risk); the leave is a finite fast fade + Vue's `setTimeout(dur+1)` backstop. The 5-nav burst must EMPIRICALLY prove it. Do NOT re-introduce `<Suspense>`.
3. **The one-GL contradiction on a real GPU.** `v-if(!focal)` + `onBeforeUnmount` dispose frees the context at the focal boundary; the v-if must NEVER create the shell context on a focal route. Re-verify allocated `glContextCount` on a real GPU (Safari's lower budget bites first). The dispose→re-arm on return shows the CSS-gradient fallback for a frame — verify no jarring flash.
4. **`route.meta.focal` completeness.** It must enumerate ALL live-GL rows (StoryBackground kinds + substrate-category viz CONTENT: GooBlob/DotFlowField/concentric/dot-matrix/paper-grid). An incomplete enumeration double-allocates OR loses a hero's field. Enumerate explicitly, verify each.
5. **The eager-glob first-paint cost.** Eager glob is the preferred trivially-correct out-in path; measure `proof:lighthouse` first-paint. Fall to `defineAsyncComponent` + `loadingComponent` only if the bundle bump regresses.
6. **M5 bespoke-bypass closure is paper-only.** The svh math is validated but the load-bearing one-chassis-path + `#title-ornament` rewrite has ZERO code in tree. It must land + wire + prove the longest-title block-fit at 4 breakpoints both modes both engines + the above-fold cluster.
7. **The field hue-coherence refinement.** Re-hueing focal `heroAuroraConfig` off `warmFieldHue` touches the focal-hero identity — land it inside W-FIELD-ACCENT-RECONCILE with a paint capture, never a blind delete.
8. **`proof:*` gates locking field assertions.** The 4 tag-presence gates match the component TAG, so a props+recipe `.paper-field` delete keeps them green — re-audit any `proof:` reference to `paper-field` before the break (`proof:no-dual-path`).

---

## CONVERGENCE LEDGER (pass-2 prototype → converged)

| prototype | critique verdict | converged disposition | residual |
|---|---|---|---|
| M1-in-isolation (out-in + branch-delete) | refine 30% | build-validated clean subtraction; eager-glob + swap-axis=path + .scroll-build decouple FOLDED | the 5-nav burst + Safari π (the experiment, not the build) |
| One-GL persist-node/gate-context | refine 42% | **CORRECTED: `v-if(!focal)` + `onBeforeUnmount` dispose** (dispose NOT exposed); field gate proven on real GPU | monotonic-GL under burst + Safari |
| Top-bar named-timeline + scaleX(0) | refine 72% | **REFINED to `scroll(nearest block)` shell bar** + structural-root guard + stale-prose reconcile | Safari grows-on-scroll capture |
| Hero svh fit + chassis path | refine 38% | svh math validated; **bespoke-bypass closure must LAND** (paper-only) | the actual rewrite + 4-breakpoint both-engine π |
| Field material recessive-chroma | refine 38% | **CORRECTED: `shellAuroraConfig` MUST set `vividness:0`** (the shader floor mandate) | calm-warm-at-worst-hue both modes π |
