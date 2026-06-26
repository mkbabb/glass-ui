# BG-WS1 · Shell · Routing · Field — SPEC (pass 2, the de-confounded one-GL linchpin)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large.
> Advances `SPEC-pass1-converged.md` on the **unconverged frontier**. Grounded against HEAD `tranche/BG` (4.2.0) + a FRESH real-GPU live reproduction. **Pass 2 OVERTURNS pass-1's causal sequencing.** Pass-1 credited **M0 (Aurora unhandled-rejection)** as the freeze linchpin and ordered M0→M2→M1. The risk-scan agent LIVE-FALSIFIED that: the freeze reproduces on a real hardware GPU with **zero Aurora init failures and zero unhandled rejections** — the orphans are Vue `<Transition>` corpses (no leave classes, `animationName:none`, `transitionDuration:0s`), independent of GL. **The freeze ROOT is the default-mode keyed-swap orphan amplified by the 3-branch `v-if` chain. M1 (the transition structure) is the linchpin, not M0.**

---

## CONVERGENCE STATUS (the honest gate — what pass-2 changes)

| pass-1 claim | pass-2 disposition |
|---|---|
| **M0 (errorHandler + onInitError) is the gating freeze fix; sequence M0→M2→M1** | **CORRECTED.** A microtask `Promise.reject` is fire-and-forget; it CANNOT synchronously abort a Vue leave-flush. The freeze reproduced with zero GL failures. M0 is real **hygiene** (a genuine unhandled-rejection surface + a false docstring at `useAurora.ts:191` that claims "Vue installs a global rejection handler" — it does not), but it is NOT the freeze fix and must not be sequence-credited as the linchpin. |
| out-in falsified at 13% → re-diagnosed as the GL confounder | **RE-RE-DIAGNOSED.** out-in scored 13% because it was applied **WITH the 3-branch `v-if` chain still inside the `<Transition>`** (Component / skeleton / no-match-Card) → out-in serializes through a multi-phase leave→skeleton→leave→enter wedge → `articles===0` sticky-blank. The fix is out-in **AND** the branch-chain delete, as ONE cut. |
| M2 (shell aurora) is a primary route-fix cause | **REFRAMED.** out-in **inherently** removes per-route GL co-mounting (it never co-mounts two pages → never two live per-page Auroras). M2 is therefore mandated by the **C-FIELD material reversal** + the **"EXACTLY ONE GL context, shell persists"** convergence bar, NOT by the freeze. It still lands WITH M1 (the metallic field is its own ★★★ directive), but it is not the orphan cure. |
| "one shell aurora persists AND exactly one GL context" | **CONTRADICTION RESOLVED (R5).** Persist the **NODE**, gate the **CONTEXT**: the shell `<Aurora>` node is stable across navs (never reparented — the Safari WebKit canvas-move-loses-context constraint), but its GL context is **disposed** (not merely paused) on a focal substrate route and **re-armed** on return. At every instant exactly one allocated context: shell (non-focal) XOR focal-viz (focal). |
| "two no-op startViewTransition watchers" | **CORRECTED to ONE.** `AppShell.vue:212-228` (categoryId, no-op `dataset.categorySwitch` write) is the delete target. `AppShell.vue:131` (`toggleShellMorph`) is the **FUNCTIONAL** dock-morph-stage VT — it is a WS2 concern, **KEEP it** in the WS1 cut. |

**The pass-2 method:** a **decisive disambiguation experiment** (Prototype 1) runs M1-in-isolation on the CURRENT confounded tree (out-in + branch-delete, per-page Auroras + PaperBackdrop LEFT IN PLACE). If the 5-nav burst clears `survivor===1`, M1 is confirmed the structural linchpin and M0/M2 are independent law. If it strands, the GL confounder is load-bearing and M2-first is required. The build proceeds correctly either way — this is the experiment pass-1 never ran.

---

## GESTALT GOAL

One shell, one route-swap mechanism, one persistent field, one fit law. The cure is **subtraction**, sequenced by the EVIDENCED causation (not the inverted pass-1 chain):

1. **ROUTE (M1) — the linchpin.** Collapse the four-mechanism contrivance pile to the idiomatic Vue-Router-4 form — `<Transition mode="out-in"><component :is="Component" :key="route.path"/></Transition>` — AND delete the 3-branch `v-if` chain, the bloom-find-child DOM-spelunk, and the no-op categoryId VT watcher in the SAME cut. `out-in` serializes leave→enter → exactly 1 `<article>` at every settle, by construction, AND at most 1 per-page GL context co-mounted.
2. **FIELD (M2) — the ★★★ material reversal + the one-GL law.** Retire the "disgusting metallic" `.paper-field` (conic cel-sheen + 4 high-chroma brown radials + 0.22 feTurbulence speckle + 42s churn) WHOLE for ONE shell-persistent `<Aurora>` mounted OUTSIDE the swap unit. Per-route warm hue via a reactive config (no re-mount). The context is **gated** (armed on non-focal, disposed on focal) → monotonic exactly-one-GL.
3. **HYGIENE (M0) — fold in, not the fix.** `app.config.errorHandler` + `onInitError` on every Aurora mount closes the real unhandled-rejection surface (and the false docstring). Cheap, correct, parallel — never credited as the freeze cure.
4. **TOP BAR (M4).** Bind the scroll-progress rail to a BARE named timeline (`--demo-main-progress`, never `scroll(<dashed-ident>)`); hoist `transform-origin:0 50%` + `transform:scaleX(0)` UNCONDITIONAL so a non-supporting/PRM engine rests invisible, not full-width.
5. **HERO (M5).** Route EVERY hero `<h1>` (chassis + the bespoke `:hero-title=false` bypass) through ONE chassis title path; add an svh height term + a ResizeObserver true-upper-bound est-lines so the rendered BLOCK is ≤~0.62×svh; the ≥4 rung floor is HONORED (no display-3 downgrade — re-author over-length sentence titles to audacious phrase length).

Every motion leg is compositor-only (transform/opacity/filter), carries iOS-27 liquid weight (spring-on-spatial / bezier-on-effects, enter-overshoots / exit-no-overshoot), PRM keeps-fade/drops-transform, and paints identically in Chrome AND Safari (the `out-in` floor never depends on native VT). The `<Aurora>` primitive and the `--type-display-*` ladder are byte-untouched (presets-in-consumers).

---

## THE RE-DIAGNOSIS (D1/D9 — why M1 is the linchpin, evidenced)

The freeze was reproduced on a real hardware-WebGL2 GPU (risk-scan R0/R1) at a CALM 450ms cadence — NOT a burst:
- URL advanced correctly through 7 cross-category hops, but `<main> article` count went `2,2,2,3,2,2,2` (never 1) and the measured heading stayed FROZEN at the cold-load title through all 7 hops — **the live C-ROUTE defect** (URL changes, page does not).
- DOM forensics at settle: 2+ `<article>`s, both `opacity:1`, `transition:all/0s`, **NO `*-leave` class**, `animationName:none` — they are ORPHANED CORPSES, not mid-leave. A single `<Transition>` (not `TransitionGroup`) tracks ONE leaving element via `_leaveCb`; a keyed swap arriving before the prior leave's removal-callback fires SUPERSEDES `_leaveCb` and orphans the earlier element **permanently**.
- The reproduction had **zero Aurora init failures, zero unhandled rejections** (only the benign dev warn). The freeze is independent of GL init.
- The reference agent independently captured "canvas count tracks article count exactly" — confirming each orphaned article retains a live GL canvas. This is the CONSEQUENCE of co-mounting (default-mode keeps both pages + both canvases), not the cause of the orphan.

**Mechanism, end to end:** default-mode `<Transition name="fade-slide">` (`AppShell.vue:404-410`, NO `mode`) keeps leaving+entering co-mounted; a fresh nav supersedes `_leaveCb` and orphans the leaver; the 3-branch `v-if` chain (Component / matched-pending skeleton / no-match Card) inside the single `<Transition>` gives Vue heterogeneous roots to mis-track; the `.scroll-build` mount-keyframe on the article root collides with the leave-transition's end-detection (a SECONDARY contributor, self-documented in `liquid-enter.css:14`). **`out-in` + single keyed `<component>` + branch-delete fixes all four at once.**

> **Why pass-1's out-in went to `articles===0`:** it kept the `v-if`/`v-else-if(skeleton)`/`v-else(Card)` chain inside the `<Transition>`. With out-in + async chunks the swap becomes `leave-A → (Component undefined) skeleton-enter → skeleton-leave → enter-B` — a sticky multi-phase wedge that lands on blank. Deleting the chain (the no-match Card is DEAD: `router.ts` already ships `/:pathMatch(.*)*` → `NotFound`) makes the slot hold exactly ONE unit. This is the load-bearing correction.

---

## MECHANISM (hardened, concrete)

### M1 — The route swap: the idiomatic Vue-Router-4 form (D1/D9, the linchpin)

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism (NO Suspense, NO v-if branch chain) -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
```

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → exactly 1 `<article>` at every settle, AND at most 1 per-page GL context live (no co-mounting). The load-bearing line — re-asserted on the de-confounded tree, build-proven by the 5-nav burst (Prototype 1).
- `:key="route.path"` → an unambiguous swap unit per route (`route.path`, not `route.fullPath` — query/hash changes should not force a hero re-mount).
- **NO `<Suspense>`** (pass-1 falsified — sticky wedge). The async-chunk loading state moves OFF the AppShell slot. **KISS-first decision, measure in Prototype 1:**
  - **(preferred) eager glob** (`import.meta.glob(..., { eager: true })`) — the storybook chunks are small; eager removes the async window entirely → no skeleton, no loading state, trivially-correct `out-in`. Measure `proof:lighthouse` first-paint to confirm the bundle bump is acceptable.
  - **(fallback) `defineAsyncComponent`** per lazy route with a `loadingComponent` (the bloom skeleton re-homed INSIDE the async boundary, `delay:120`) — the loading state lives inside the resolved-or-loading unit, so the slot only ever holds ONE element.
- **NO `v-if`/`v-else-if` branch chain.** DELETE the no-match `<Card>` (dead — catch-all → `NotFound`) AND the matched-pending skeleton branch (its driver retires with the bloom).

**`.scroll-build` decouple:** remove `.scroll-build` from the routed article roots (`StoryPage.vue:72`, `SectionLanding.vue:85`). The `gl-page-build` mount-keyframe ran the same opacity/transform legs as the leave-transition on the SAME element. The entrance WEIGHT moves into the `route-liquid` enter curve (one entrance system). KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` (interior `view()` registers — they do not collide).

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

Compositor-only, PRM-carved, Safari-safe (CSS `<Transition>`, never VT for the floor). The leave is a fast fade-only (`--duration-fast`); a finite duration + Vue's `setTimeout(duration+1)` safety net guarantees `_leaveCb` resolves — but this is build-proven, not assumed (Prototype 1, the burst falsifier).

**Deletions (clean break, `proof:no-dual-path`):**
- `useBloomUp` import (`AppShell.vue:30`) + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom `watch(route.fullPath)` find-child DOM-spelunk (`255-303`). `useBloomUp` stays a shipped primitive with other consumers (dock/liquid-playground) — only the AppShell MISUSE is deleted.
- the categoryId no-op `startViewTransition` watcher + the dead `dataset.categorySwitch` write (`212-228`) — grep proves 0 readers of the dataset flag in the non-VT path.
- the skeleton `v-else-if` branch + the no-match `<Card>` branch + the `Skeleton` import.
- **KEEP** `toggleShellMorph`'s `startViewTransition` (`131`, the functional dock-morph stage — WS2). **KEEP** the ONE scroll-reset owner (`mainEl.scrollTo`, `195`); the contrivance rationale ("default-mode so the entrance does not race the scroll-reset") evaporates — with out-in, the reset firing on `route.path` while the leaver fades is harmless (it scrolls the container, not the leaving article).

> **Native View Transitions for the swap?** Safari 18.4+ supports same-document VT, but the FLOOR must be the Vue `out-in` `<Transition>` (always-correct, Safari-safe on older WebKit, PRM-instant by recipe). VT is `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/optional, additive, gated on M1 green, and MUST NEVER re-introduce a concurrent default-mode transition.

### M2 — The field: ONE shell aurora, persist-node / gate-context (D2/C-FIELD + the one-GL law)

**Root cause:** `AppShell.vue:360` mounts `<PaperBackdrop field :field-hue>` UNCONDITIONALLY → `.paper-field` (`paper.css:129-218`): a conic cel-sheen (`from -45deg at 78% 22%`, the angular "metallic" highlight Liquid-Glass never has — it uses RADIAL specular) + 4 high-chroma radials (oklch C 0.115–0.155 = brown PIGMENT, not luminance-led) + a `::before` 42s `field-cel-drift` churn on a `position:fixed will-change:transform` plane + the 0.22 feTurbulence `.paper-underpaint` speckle. **The defect is the MATERIAL, not the HUE** (the field is already warm amber-66): retire the conic + high-C radials + grain + churn TOGETHER; the warm hue is preserved by `warmFieldHue`. `[data-paper-field]` is a PHANTOM gate (0 DOM setters).

```vue
<!-- AppShell.vue — the ONE persistent field. Aurora has NO :paused prop (props are
     config/runtimeOptions/onInitError/renderMode/opacityCeiling; pause/resume/dispose/
     isArmed are defineExpose'd METHODS). Suppression = template-ref method + arm-gate. -->
<Aurora
    ref="shellAurora"
    :config="shellAuroraConfig"
    :opacity-ceiling="0.5"
    :on-init-error="onShellAuroraError"
    class="fixed inset-0 -z-10 shell-aurora"
    :class="{ 'shell-aurora--suppressed': routeOwnsFocalSubstrate }"
    data-paper-field
    aria-hidden="true"
/>
```

1. **Persist the NODE.** Mounted at the shell root, OUTSIDE the `<Transition>` swap unit — never re-armed per route, never reparented (the WebKit canvas-move-loses-context constraint). One stable canvas node for the whole non-focal shell.
2. **Per-route hue WITHOUT re-mount.** `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)`. The hue updates reactively (a uniform re-upload via Aurora's deep config watch), never a canvas re-mount.
3. **Gate the CONTEXT (the R5 contradiction resolution — persist node ≠ persist context).** On a focal-substrate route the shell must hold ZERO context: gate the deferred `arm()` on `!routeOwnsFocalSubstrate`, and `dispose()` (not just `pause()` — `pause()` parks the rAF but VRAM/context PERSIST against the budget, which bites Safari's lower ceiling first) if already armed; re-`arm()` on return. `.shell-aurora--suppressed { opacity: 0 }` hides any last-frame so no stale warm wash bleeds under the focal viz. At every instant: shell context (non-focal) XOR focal viz context (focal) = exactly one allocated.
4. **`route.meta.focal` is PER-ROW and enumerates ALL live-GL routes** (R5 mustfix — not just `StoryBackground` kinds {aurora,constellation,fourier,liquid-grid} but ALSO substrate-category viz rows whose CONTENT mounts its own GL: GooBlob/DotFlowField/concentric/dot-matrix/paper-grid). Project an explicit per-row `focal: true` in `manifest.ts` for every GL-bearing row → `route.meta.focal`. A content row that decoratively defaults to `aurora`/`grid` is NOT focal → it uses the shell field, no per-route GL.
5. **The 2nd/3rd field systems RECONCILE onto the shell.** StoryHero retires its per-page `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` full-bleed mount on NON-focal routes (the shell IS the field), keeping the per-page focal mount ONLY for genuinely-focal viz-demo rows. DockStage folds onto the shell field where covered; keeps its own functional aurora ONLY where it must demonstrate pause/resume. The static `grid`/`paper` per-page page-backgrounds collapse onto the shell aurora (the brief: every non-substrate route paints a calm warm AURORA); the blueprint-grid + paper grain demote to OPT-IN specimen decorations (M-grain).
6. **The field MATERIAL is recessive luminance-led pastel, not vivid focal aurora** (reference mustfix). `DEFAULT_AURORA_CONFIG` is C 0.16/0.13/0.095 (authored-VIVID, a FOCAL-hero chroma); even `heroAuroraConfig`'s calm MOTION band inherits the vivid palette stops. A C-0.16 palette at full plate-coverage `opacityCeiling:0.5` reads pigmented even receded. Mint `shellAuroraConfig(hue)` in `aurora-hero.ts` = `heroAuroraConfig`'s calm motion band (`breathPeriod:48`, `nucleiDrift/paletteDrift:0.012`, `saturation:0.95`) + an EXPLICIT recessive-chroma override (palette stops **C ≈ 0.05–0.09**, closer to the conic's own live C-0.05) + the per-route `warmFieldHue`. This is NOT a "third re-hue factory inheriting DEFAULT vivid" (the pass-1 mustfix) — it targets the recessive floor chroma explicitly. The result is "sunrise behind frosted glass" (the Siri-island reference), not a foil slab.
7. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, the live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR cap. The CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. Live-verify the field stays CALM warm AND glass clears AA over it at `opacityCeiling 0.5` in BOTH modes.

### M0 — Eliminate the Aurora-rejection surface (HYGIENE, folds into W-ROUTE-TRANSITION — NOT the freeze fix)

```ts
// demo/main.ts — the global error trap. A real surfacer (no swallow), not the freeze cure.
app.config.errorHandler = (err, _instance, info) => {
    console.error("[demo] app error", info, err);
};
```

Thread `onInitError` into EVERY Aurora mount (grep-confirmed UNHANDLED today — only `liquid-playground` handles it): the shell field, `StoryHero.vue:267`, `DockStage.vue:59`, `KonamiAurora.vue:48`, and the per-page contained mounts (`buttons.vue:76`, `card.vue:147/303`, `glass-panel.vue:60`, `auth-shell.vue:58`, `rail.vue:80`, `overview.vue:626`). The handler logs + leaves the placeholder (Aurora's documented opt-in fallback). **Correct the false docstring** at `useAurora.ts:191` ("Vue installs a global rejection handler via app.config.errorHandler" — it does NOT catch a floating `window.onunhandledrejection`). Gate: `proof:route-confounder` (device-free — every `<Aurora`/`useAurora(` mount in `demo/` has an `onInitError` in scope + `app.config.errorHandler` present + a self-test bite).

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`demo/stories/warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `warmFieldHue` + the DEAD `warmFieldHueMap`) is a verified-verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + a same-named `clampWarm` + the same `[25,95]` band). **Fold:** `aurora-hero.ts`'s `warmProjectHue` is canonical; re-derive `warmFieldHue` from it (delete the duplicated body + the dead `warmFieldHueMap`; keep `warmFieldHue` as a thin re-export). **PRESERVE all 3 `warmFieldHue` consumers** (verified): `AppShell.vue:237` (`fieldHue`/shell config), `SectionLanding.vue:48` (`cardFieldH`), `SectionPreviewCard.vue:167` (`--card-field-h`). ONE warm-hue source.

> **Hue-coherence flag (the deeper DRY win, scoped within the wave — do not silently force):** `warmFieldHue` (via `categoryHue`/`SECTION_HUE_DEG`) and `heroAuroraConfig` (via `CATEGORY_PALETTE_HUES`) currently give DIFFERENT hues per category (e.g. foundations: field amber-5 vs hero-aurora violet-7). The shell field and any focal hero paint different hues per route. The coherent fix is to re-hue the focal `heroAuroraConfig` off the SAME `warmFieldHue` source so field and hero agree — but that touches the focal-hero hue identity, so it lands inside W-FIELD-ACCENT-RECONCILE with a paint capture, not as a blind delete of `CATEGORY_PALETTE_HUES`. The SHELL field self-contained fix (steps M2/M3) is independent of this refinement.

Also rewire `useGlassBackdropLuminance` (built for dock-over-live-aurora) to sample the live SHELL canvas (zero new cost — already a `drawImage + getImageData` sampler).

### M4 — The top-bar: named-timeline bind + the UNCONDITIONAL scaleX(0) floor (D5, BG.W-SCROLL-PROGRESS-RAIL)

**Root cause (confirmed live):** `scroll-driven.css:46` `animation-timeline: scroll(var(--scroll-progress-scroller, root) block)` + `dock-nav.css:231` `--scroll-progress-scroller: --demo-main-progress` → `scroll(--demo-main-progress block)`. `scroll()` accepts ONLY scroller KEYWORDS (`root`/`nearest`/`self`), never a `<dashed-ident>` → invalid → computed `auto`. The animation plays time-based once, ends at `to{scaleX(1)}` reverting to base (no `scaleX(0)` rest, no fill) → the bar paints `scaleX(1)` full-width 2px at `--primary` ink, `opacity:0.85`. `CSS.supports`: `scroll(--demo-main-progress block)`=FALSE, `--demo-main-progress`=TRUE. **Critically: `transform-origin:0 50%` is INSIDE the `@supports`+PRM gate and there is NO unconditional `transform:scaleX(0)`** — so a non-supporting/PRM engine ALSO rests full-width.

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
            animation-timeline: var(--scroll-progress-timeline, scroll(root block));  /* full-value var; a named scroller passes the BARE ident */
        }
    }
}
```

- **Hoist `transform-origin:0 50%` + `transform:scaleX(0)` to the UNCONDITIONAL rule** so a non-supporting/PRM/invalid-timeline engine rests at `scaleX(0)`, NOT full-width — any timeline-resolution failure yields an EMPTY bar (the safe failure mode). **Rest is `scaleX(0)`, NOT `opacity:0.85`** — re-express the affordance as faint-but-SHRUNK.
- The consumer passes the BARE ident: `.demo-scroll-progress { --scroll-progress-timeline: --demo-main-progress; }` (drop the dead `--scroll-progress-scroller`). The named timeline is declared on `.demo-main-scroller` (`scroll-timeline-name:--demo-main-progress`, `dock-nav.css:201`); the bar is a sticky child of `<main>`, so a `timeline-scope:--demo-main-progress` on the common ancestor (or the parent/sibling relationship already satisfies the named-timeline lookup — verify) exposes it. The KISS alternative — `--scroll-progress-timeline: scroll(nearest block)` since the bar IS a child of the scroller — is acceptable IF it resolves to `<main>` cross-engine; prefer the bare named timeline for explicitness, fall to `scroll(nearest block)` if Safari named-timeline support lags (Safari named-scroll-timeline lagged anonymous `scroll()`).
- **Migrate the `scroll-vt.vue` `self`-keyword consumer** onto its own named timeline + `timeline-scope` and VERIFY the story bar grows 0→1 on panel scroll in BOTH engines (the clean break breaks the old `self` usage — prove the coupled consumer).
- **Land the gate COMPLETE in the SAME wave:** re-point `proof:ba-animate` W2 predicates (`scrollerOverride`, `scrollerNotRoot`) to `--scroll-progress-timeline`; add a global `scroll(\s*--` dashed-ident scan across `src`+`demo` (the PRECISE invalid pattern, NOT all `scroll()`) + a self-test bite; tighten the override gate to reject only `scroll(\s*--`, not a legitimate `scroll(nearest block)`.

### M5 — The hero fit: ONE chassis path + svh height term (D10, BG.W-HERO-FIT)

**Root cause (confirmed live):** `story-hero.css:225-229` fit-cap is `min(rung, (100vw - 2*pad)/7)` — WIDTH-only, NO svh/height term. A multi-word title wraps to N lines; each line at the width-budget font stacks past the viewport (`/compositions/hero` "Real scenes, assembled from the parts.": 1440 → 1134px = **1.4×svh**, 0 preview cards above fold). TWO faults: **(a)** the cap is the wrong AXIS (width cannot bound a wrapping title's HEIGHT); **(b)** the bespoke heroes (`hero.vue`/`intro.vue`/`auth-shell.vue`) hand-author `<h1 class="text-display-hero max-w-5xl">` via `:hero-title="false"` — they **bypass the chassis cap entirely**, so a ResizeObserver bound to `.story-hero-title` MISSES them.

1. **ONE chassis title path with a `#title-ornament` slot** (the load-bearing half) — retire `:hero-title="false"` + the bare `<h1 class="text-display-*">` in `hero.vue`/`intro.vue`/`auth-shell.vue` (clean break); render every hero `<h1>` through `.story-hero-title[data-hero-scale]`, with a `#title-ornament` slot that PRESERVES the bespoke eyebrow + ℱ wordmark ornament + blurb. Drop `max-w-5xl` (it manufactures the wrap) → the chassis `~18ch` measure.
2. **Height-aware fit-cap with an svh term** (the kernel — `font-size` is a static resolution, not a layout-animated property; the `--type-display-*` ladder is byte-untouched):

```css
.story-hero-title[data-hero-scale] {
    font-size: min(
        var(--story-hero-title-rung, var(--type-display-4)),
        var(--story-hero-title-fit, calc((100vw - 2 * var(--story-hero-pad, 2rem)) / var(--story-hero-cpl, 7))),
        var(--story-hero-title-svh, calc(0.62 * 100svh / var(--story-hero-est-lines, 2)))  /* HEIGHT budget, svh for address-bar safety */
    );
}
```

3. **`--story-hero-est-lines` is a TRUE upper bound, MEASURED** (not `ceil(chars/18)` which under-counts word-wrap). A small `useResizeObserver` cap in `StoryHero.vue` measures the ACTUAL rendered line count (`round(scrollHeight / lineHeight)`) and writes the real value back into `--story-hero-est-lines` so the cap self-corrects (compositor-safe — one re-cap on resize). **The instant CSS svh term is the FOUC backstop** — it bounds the BLOCK before the ResizeObserver fires, so a giant title never flashes for one frame; the measured est-lines is the refinement. DELETE the dead `max-block-size:calc(0.62*100svh)` backstop (no-op with `overflow:visible`).
4. **The ≥4 rung floor is HONORED — NO display-3 downgrade** (the live tree took this FORBIDDEN shortcut — reference mustfix). The svh cap does the height-bounding WITHOUT a rung change. Where a sentence-length headline reads too large even svh-capped, the gestalt-not-patch resolution is to **re-author it to wordmark/phrase length** (e.g. "Real scenes, assembled from the parts." → a short audacious phrase that survives at ≥4 under the cap), NOT to floor it at the retired display-3. Surface any genuine title→rung conflict explicitly in the wave.
5. **Single-source the line factor** — `--story-hero-cpl` and the JS `HERO_CHARS_PER_LINE` read ONE constant.

---

## SEQUENCING (the build order — driven by the decisive experiment)

1. **Prototype 1 — M1-in-isolation decisive experiment** (out-in + branch-delete on the CURRENT confounded tree). Disambiguates causation. **This is the pass-2 gate.**
2. **M1 — the route swap** (full cut: out-in + branch-delete + bloom/categoryId-watcher delete + `route-liquid` mint + `.scroll-build` decouple). Build-prove the 5-nav burst on the de-confounded tree. **Blocks all downstream SPA paint-verify.**
3. **M2 — the ONE shell aurora + per-page-substrate retire + arm-gate** (lands WITH M1 — the metallic field is its own ★★★ directive AND it delivers the monotonic-one-GL bar). `.paper-field` retires here.
4. **M0 — confounder hygiene** folds into the M1 wave (parallel, cheap).
5. **M4 — top-bar named-timeline** — INDEPENDENT, parallel with M1-M2.
6. **M3 — warm-field fold** — after M2.
7. **Grain opt-in** — after M2.
8. **M5 — hero fit** — after M1 (pages must mount to measure).
9. **BG.W-VT-ROUTE-ENHANCE** — DEFERRED/optional, gated on M1 green.

---

## WAVE BREAKDOWN

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
M1 (`<Transition mode="out-in"><component :is :key="route.path">`, NO Suspense, NO `v-if` branch chain; no-match Card deleted dead-since-catch-all; skeleton+bloom-find-child+categoryId-no-op-VT-watcher+`dataset.categorySwitch` deleted; KEEP `toggleShellMorph` VT + the ONE scroll-reset owner; mint `route-liquid` DRY off `.pane-swap-*`; `.scroll-build` off both article roots; KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`) + M0 (confounder hygiene — `app.config.errorHandler` + `onInitError` on every Aurora mount + the docstring correction). Async-loading via eager glob (preferred) or `defineAsyncComponent` loadingComponent (measure first-paint). Device-free gates: `proof:route-confounder` (new) + `mode="out-in"` present + the deleted mechanisms ABSENT + no `.scroll-build` on a routed article root + self-test bites. **Binding π: the 5-nav-<300ms burst → `survivorArticleCount===1` + `articles===1` at every settle + `heading===last-dest` + monotonic-WebGL-context across N navs, in Chrome AND Safari on a REAL GPU by a non-authoring agent.**

### 2. `BG.W-FIELD-AURORA` — lands WITH #1 (★★★ material reversal + the one-GL law)
Retire `.paper-field` WHOLE (`paper.css:129-218` + the dark arm + `field-cel-drift` + the `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`); mount ONE shell-persistent `<Aurora>` (template-ref pause/resume/**dispose**, NOT a fictional `:paused` prop); per-ROW `route.meta.focal` (enumerating ALL live-GL rows incl. substrate viz CONTENT) that GATES the deferred arm + disposes on focal + hides the paint; reconcile StoryHero + DockStage onto the shell field; mint `shellAuroraConfig(hue)` (calm motion band + recessive C 0.05–0.09 + `warmFieldHue`). Keep the `data-paper-field` DOM hook on the new Aurora wrapper so `liquid-morph.css`/`cards.css`/`SelectContent.vue`/`GlassTimeline.vue` stay live (a hook, not a token alias). Gate: `proof:offscreen-pause` un-regressed + a `no-paper-field` source assert + a per-row-focal assert + re-audit any `proof:` ref to `paper-field` (the 4 tag-presence gates match the component TAG, so a props+recipe delete keeps them green — verify). **Binding π (REAL GPU, Chrome AND Safari): `glContextCount===1` on every non-substrate route AND on a content→substrate→content round-trip + 5-nav burst (no monotonic leak, no double-allocate on focal); calm warm aurora, NO conic/brown/speckle at ≥3 category hues both modes; glass clears AA over it at `opacityCeiling 0.5` BOTH modes; no stale warm wash under a focal substrate.**

### 3. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
M4: hoist `transform-origin:0 50%` + `transform:scaleX(0)` UNCONDITIONAL; named-timeline `var(--scroll-progress-timeline, scroll(root block))`; drop the conflated `--scroll-progress-scroller`; migrate the `scroll-vt.vue` `self` consumer to a named timeline + `timeline-scope`; rest `scaleX(0)` not `opacity:0.85`. Gate COMPLETE: no recipe emits `scroll(<dashed-ident>)` (precise `scroll(\s*--` scan) + re-point `proof:ba-animate` W2 + tighten the override regex + self-test bite. **π: `animationTimeline==='--demo-main-progress'` (NOT `'auto'`) + `scaleX(0)` rest at scroll-top every route + grows on scroll + a scroll-timeline-DISABLED engine resting `scaleX(0)`, Chrome AND Safari.**

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #2
M3: delete the duplicated body + dead `warmFieldHueMap` in `warm-field.ts`; canonical `warmProjectHue` on `aurora-hero.ts`; PRESERVE all 3 `warmFieldHue` consumers; the hue-coherence refinement (re-hue focal `heroAuroraConfig` off `warmFieldHue`) WITH a paint capture; rewire `useGlassBackdropLuminance` to the shell canvas. Gate: single-source-of-warm-hue assert + the 3-consumer presence assert + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #2
Demote the universal `.paper-underpaint` 0.22 grain to per-surface opt-in (math-paper/printed specimens); `PaperBackdrop` returns to a pure grain register (drop the field welding); re-tune the opt-in opacity sub-JND. Gate: no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1 (pages must mount to measure)
M5: ONE chassis title path + `#title-ornament` slot (retire bare `<h1>` + `:hero-title=false` in the 3 pages); svh height term on the fit-cap `min()` (the FOUC-safe instant floor); `--story-hero-est-lines` MEASURED via `useResizeObserver` (true upper bound); delete the dead `max-block-size`; ≥4 rung floor HONORED (re-author offending sentence titles, NO display-3); single-source the line factor; drop `max-w-5xl`. NO `--type-display-*` token edit. **π (Chrome AND Safari, 375/768/1440/1920, both modes): rendered `<h1>` BLOCK ≤~0.62×svh for the LONGEST manifest hero title; ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page (the COUPLED cluster height).**

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
Export `navigate` on the motion-core barrel; drive `router.push` through it with directional `types:['forward'|'back']` behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor. MUST NEVER re-introduce a concurrent default-mode transition. WIRE the SHIPPED `navigate()` (AZ.W-ATLAS-RECONCILE — `instantUnderReducedMotion` + `types` + `supportsRouteTransitions`), do NOT mint a second engine; graduates the AX honest-hold `directional-view-transition`. One code path folded into W-ROUTE-TRANSITION's nav handlers.

---

## FILES TOUCHED

| File | Change | Wave |
|---|---|---|
| `demo/layout/AppShell.vue` | `out-in` `<Transition>` over `<component :is :key="route.path">` (NO Suspense, NO branch chain); DELETE useBloomUp wire/skeleton/bloom-watch/categoryId-VT-watcher/`dataset.categorySwitch`/no-match Card/Skeleton import; KEEP `toggleShellMorph` VT + scroll-reset; replace `<PaperBackdrop field>` with persistent `<Aurora ref :on-init-error data-paper-field>` + arm-gate/dispose suppression | W-ROUTE-TRANSITION, W-FIELD-AURORA |
| `demo/main.ts` | ADD `app.config.errorHandler` | W-ROUTE-TRANSITION |
| `src/styles/transitions.css` | MINT `route-liquid` (DRY off `.pane-swap-*`); PRM carve | W-ROUTE-TRANSITION |
| `demo/router.ts` | thread per-row `meta.focal`; (optional) `defineAsyncComponent` loadingComponent OR eager glob | W-ROUTE-TRANSITION, W-FIELD-AURORA |
| `demo/stories/manifest.ts` | project per-row `focal:true` for ALL live-GL rows; single-source the hero line factor | W-FIELD-AURORA, W-HERO-FIT |
| `demo/stories/StoryPage.vue`, `SectionLanding.vue` | REMOVE `.scroll-build` from the article root | W-ROUTE-TRANSITION |
| `src/components/custom/aurora/composables/useAurora.ts` | CORRECT the false `:191` docstring (Vue does not catch unhandled rejections) | W-ROUTE-TRANSITION |
| `demo/stories/StoryHero.vue` | retire per-page substrate on NON-focal routes; KEEP focal-row mount + `onInitError`; `#title-ornament` slot; `useResizeObserver` est-lines re-cap | W-FIELD-AURORA, W-HERO-FIT |
| `demo/stories/dock/DockStage.vue` | fold onto the shell field where covered; `onInitError` | W-FIELD-AURORA |
| per-page Aurora mounts (`buttons`/`card`/`glass-panel`/`auth-shell`/`rail`/`overview`/`KonamiAurora`) | thread `onInitError` | W-ROUTE-TRANSITION |
| `src/styles/paper.css` | DELETE `.paper-field` + `.dark .paper-field` + `field-cel-drift` + conic/radials + `--field-h` (~135 lines) | W-FIELD-AURORA |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | DELETE `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle`; pure grain register | W-PAPER-GRAIN-OPTIN |
| `demo/stories/warm-field.ts` | DELETE the duplicated body + dead `warmFieldHueMap`; `warmFieldHue` re-derives from `aurora-hero.ts` (preserve the 3 consumers) | W-FIELD-ACCENT-RECONCILE |
| `demo/stories/aurora-hero.ts` | export canonical `warmProjectHue`-derived `warmFieldHue` + mint `shellAuroraConfig(hue)` (recessive chroma) | W-FIELD-ACCENT-RECONCILE, W-FIELD-AURORA |
| `src/styles/scroll-driven.css` | hoist `scaleX(0)` floor unconditional; named-timeline `var(--scroll-progress-timeline, scroll(root block))` | W-SCROLL-PROGRESS-RAIL |
| `demo/layout/dock-nav.css` | `.demo-scroll-progress { --scroll-progress-timeline: --demo-main-progress }`; rest `scaleX(0)` not `opacity:0.85`; drop `--scroll-progress-scroller` | W-SCROLL-PROGRESS-RAIL |
| `demo/stories/.../scroll-vt.vue` | migrate `self`-keyword consumer → named timeline + `timeline-scope` | W-SCROLL-PROGRESS-RAIL |
| `demo/stories/story-hero.css` | svh height term on the fit-cap `min()`; delete dead `max-block-size`; drop `max-w-5xl` welding | W-HERO-FIT |
| `demo/stories/hero.vue`, `intro.vue`, `auth-shell.vue` | retire `:hero-title="false"` + bare `<h1>`; route through chassis `#title-ornament`; re-author over-length sentence titles | W-HERO-FIT |
| `src/composables/glass/useGlassBackdropLuminance` (rewire site) | sample the live shell canvas | W-FIELD-ACCENT-RECONCILE |
| gates (`scripts/proof-*.mjs`) | `proof:route-confounder` (new); `proof:ba-animate` re-point + `scroll(\s*--` scan; per-row-focal assert; 3-consumer assert | per wave |

> **Fence:** ALL edits are glass-ui/demo-local (foreign-tree fence absolute). The `<Aurora>` primitive + `--type-display-*` ladder are byte-untouched (presets-in-consumers). No `src/styles` token VALUE edit in W-HERO-FIT. The in-situ dock-morph stage (`AppShell.vue:80-186/490-720`) is a WS2 concern — coordinate the AppShell deletions so the WS1 route cut and the WS2 morph wave do not collide; the morph-stage `startViewTransition` (`131`) is NOT a route contrivance, KEEP it.

---

## ACCEPTANCE / REAL-PAINT-π BAR

> **C-PAINT (binding):** the headless-green/visually-broken disease shipped 3× (BB/BC/BD). **Every WS1 acceptance is a FRESH LIVE CAPTURE by an agent who did NOT author the build, in Chrome AND a Safari/WebKit context, on a REAL GPU.** Device-free gates prove SOURCE shape; the live π proves PAINT.

**Routing (the convergence bar — the linchpin):**
- ≥6 cross-category hops: at every settle `main.querySelectorAll('article').length === 1` AND `main h1.textContent === destination title`.
- **5-nav-in-<300ms stress → `survivorArticleCount === 1` AND the survivor heading === the LAST destination**, sampled at +60/+360/+1260ms.
- A binding **monotonic-WebGL-context (allocated) === 1** assert across an N-nav content→substrate→content sweep (the single-nav-green/orphan-under-burst trap). No reload required. PRM keeps fade, drops transform.

**Field:**
- Every non-substrate route paints a calm warm AURORA — NO conic sheen, NO brown slab, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5`. Verified at the WORST hue (a cool-category warm-projected hue: motion/data).
- `glContextCount === 1` (allocated) on every non-substrate route AND on a content→substrate→content round-trip; a focal route's viz is the sole live context with NO stale shell wash bleeding under it. **Real GPU** (the `max=1` GPU-less claim does not count).

**Top bar:**
- `getComputedStyle('.demo-scroll-progress').animationTimeline === '--demo-main-progress'` (NOT `'auto'`); `scaleX(0)` at scroll-top on EVERY route; grows on scroll; a scroll-timeline-DISABLED engine rests `scaleX(0)` (not `scaleX(1)`). Chrome AND Safari.

**Hero:**
- Rendered `<h1>` BLOCK height ≤~0.62×svh at 375/768/1440/1920, BOTH modes (the LONGEST manifest hero title); ≥1 preview card above the fold at 1440×820 on `/compositions/hero` + every hero page (the COUPLED cluster height). NO display-3 downgrade (the ≥4 rung floor honored).

Capture DELTAs (screenshot + paired-π) against the four evidence PNGs (`hero-broken.png`, `top-bar.png`, `category-card-waste.png`, `morph-modal.png`) as the binding reference anchors — never a commit-message claim.

---

## FOLDED DEFERRED / CROSS-WS HANDOFFS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement tier; deferred/optional, gated on #1 green, additive, never a concurrent transition; wires the SHIPPED `navigate()`.
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, no carrier; a CONSUMER-ASSET arm (DEFER-with-trigger), not a library wave. A distinct future field variant beside the calm aurora floor.
- **`BG.W-SCROLL-SHRINK-UNIFY`** (the 3-fork DRY collapse: `--card-scroll` + `story-hero-shrink` + `story-hero-scroll-away` → one keyframe family, the `liquid-enter.css` Bug-B class) → **WS4**; HARD-DEPENDS on W-ROUTE-TRANSITION (pages must mount to measure). Recorded so it cannot compound a 4th tranche.
- **AppShell >500-line carve** — extract the in-situ dock-morph demo into a colocated `demo/layout/ShellDockMorphStage.vue` (drops AppShell under the 500 bound, de-confounds route/field shell from the morph showcase) → **WS2** (coordinate the AppShell file deletions).
- **`useGlassBackdropLuminance` rewire** to the live shell canvas → W-FIELD-ACCENT-RECONCILE (zero new cost).
- **`W-PAINT-IS-THE-GATE`** → **WS7**, but BINDS every WS1 wave's π (PRM, one-GL-per-route, Safari-as-floor-not-VT, CLS≈0, warm-not-red).

---

## OPEN RISKS / RESIDUAL GAPS (the unconverged frontier)

1. **(HIGHEST — the gate) The causation disambiguation.** Prototype 1 (M1-in-isolation on the confounded tree) is the decisive experiment. If out-in + branch-delete clears `survivor===1` → M1 is the linchpin, M0/M2 are independent law. If it strands → the GL confounder is load-bearing, fall to M2-first. The risk-scan agent's real-GPU repro PREDICTS M1 alone clears it (out-in inherently removes co-mounting), but this is BUILD-PROVEN, not assumed. **Until Prototype 1 proves, WS1 does not clear.**
2. **out-in residual wedge to BLANK.** out-in wedges to `articles===0` if any leave's end-callback never fires. The leave is a finite fast fade + Vue's `setTimeout(dur+1)` backstop, so it SHOULD resolve — but the 5-nav burst must EMPIRICALLY prove it (the headless-single-nav-green trap). Do NOT re-introduce `<Suspense>`.
3. **The one-GL contradiction on a real GPU.** "Persist node, gate context" requires `dispose()` (not `pause()`) on focal routes; the arm-gate must NEVER create the shell context on a focal route. Re-verify allocated `glContextCount` on a real GPU (Safari's lower budget bites first). The dispose→re-arm on return to non-focal shows the CSS-gradient fallback for a frame — acceptable (warm floor), verify no jarring flash.
4. **`route.meta.focal` completeness.** It must enumerate ALL live-GL rows — not just `StoryBackground` kinds but substrate-category viz CONTENT (GooBlob/DotFlowField/concentric/dot-matrix/paper-grid). An incomplete enumeration → a substrate route double-allocates OR a hero route loses its field. Enumerate explicitly in the manifest, verify each.
5. **The async-loading placement.** Eager glob (preferred, trivially-correct out-in) vs `defineAsyncComponent` loadingComponent — decided by Prototype 1's first-paint measure (`proof:lighthouse`).
6. **The svh fit-cap est-lines bound + FOUC.** The instant CSS svh term is the FOUC backstop; the ResizeObserver est-lines is the true-upper-bound refinement. Verify on the LONGEST manifest title at all 4 breakpoints both modes that no giant title flashes pre-measure and the bound holds.
7. **The field hue-coherence refinement.** Re-hueing focal `heroAuroraConfig` off `warmFieldHue` is the deeper coherence win but touches the focal-hero hue identity — land it inside W-FIELD-ACCENT-RECONCILE with a paint capture, never a blind `CATEGORY_PALETTE_HUES` delete.
8. **`proof:*` gates locking field assertions.** The 4 tag-presence gates match the component TAG (`<Aurora|<PaperBackdrop`), so a props+recipe `.paper-field` delete keeps them green — but re-audit any `proof:` reference to `paper-field`/the field before the break (`proof:no-dual-path`).

---

## CONVERGENCE LEDGER (pass-1 → pass-2)

| pass-1 item | pass-1 verdict | pass-2 disposition | residual |
|---|---|---|---|
| P1 route (out-in + Suspense) | reject 13% | **M1 = out-in + branch-delete is the LINCHPIN** (not M0/M2); out-in inherently de-co-mounts the GL | Prototype 1 decisive experiment + the 5-nav burst |
| M0 (errorHandler) as the freeze fix | (pass-1 credited) | **DEMOTED to hygiene** — live-falsified; folds into W-ROUTE-TRANSITION, not the cure | the false docstring corrected |
| P2 shell aurora | refine 44% | M2: persist NODE / gate CONTEXT (dispose-on-focal); per-ROW focal enumerating ALL GL rows; recessive-chroma `shellAuroraConfig` | real-GPU monotonic one-GL + AA both modes |
| P3 top-bar | refine 70% | M4: unconditional `scaleX(0)` floor + bare named-timeline + gate-complete | Safari named-timeline + scroll-timeline-disabled rest |
| P4 hero-fit | refine 50% | M5: ONE chassis path (bespoke bypass closed) + svh FOUC-safe floor + measured est-lines + ≥4 honored | longest-title both engines + above-fold cluster |
| P5 clean-break | refine 74% | props+recipe `.paper-field` delete; `warm-field.ts` fold; `data-paper-field` hook re-homed | re-audit `proof:` field refs |
| "two no-op VT watchers" | (pass-1 stated) | **CORRECTED to ONE** (categoryId:212-228 deleted; toggleShellMorph:131 KEPT) | — |
