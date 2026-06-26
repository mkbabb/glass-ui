# BG-WS1 · Shell · Routing · Field — SPEC (pass 4 — INTEGRATE-then-CAPTURE; the paint is the only gate)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large · **C-PAINT** (the close — headless-green/visually-broken shipped 3×).
> **Advances `SPEC-pass3-converged.md`** (read it; this does NOT restart — it folds the pass-4 research fleet onto the converged spec). The MECHANISM is converged. Pass 4 lands ONE decision-inverting simplification (the #7956 sweep is a build-proven **PHANTOM** → M1 shrinks) plus six hardening deltas, then closes on the **BUILT-TREE PAINT** (Δ0: nothing is integrated; the binding real-paint-π is uncaptured by a non-authoring agent on a real GPU; Safari has ZERO real-demo evidence). Grounded against HEAD `tranche/BG @879c0c41` (4.2.0), every pass-4-contested fact re-verified on disk.

---

## STATUS — what pass 4 changes vs pass 3 (the honest delta)

Pass 3 converged the mechanism and resolved four contradictions (R1 plain-lazy / R2 hero-collision-phantom / R3 fixed-est-lines / R4 auth-shell-keeps-title). **All four hold — do NOT re-litigate.** Pass 4 adds:

| # | pass-3 said | pass-4 build-proven correction | consequence |
|---|---|---|---|
| **P4-A (HEADLINE)** | "the #7956 single-root sweep is MANDATORY; strip the leading comment from 13+ roots + chain-recursion + necessity-verify" | **PHANTOM, build-proven 3 ways.** (1) AST scan of all 129 routed SFCs → **ZERO** genuine multi-root / text / teleport roots. (2) Vue 3.5.34 `filterSingleRoot` (`runtime-core.cjs:4674`) **SKIPS comment nodes** (`child.type !== Comment`); a compiled `<!-- c --><article>` carries root patchFlag **2112 = DEV_ROOT_FRAGMENT\|64** → Vue extracts the single element → `isElementRoot` true → the `non-element root node that cannot be animated` warn (`:4638`) **never fires**. (3) LIVE :5199: the current default-mode tree (StoryPage/hero/intro all leading-comment, all under `<Transition>`) shows **ZERO #7956 warnings** — only the Aurora-handler warn. The warn is in `renderComponentRoot`, NOT mode-gated → `out-in` introduces no new warn for these roots. | **DROP the 13-file comment-strip + chain-recursion dance.** It is busywork against a non-bug that **deletes the load-bearing W-CUT P10c rationale comments** (verified on disk at `StoryPage.vue:64` / `SectionLanding.vue:80` — comments AUTHORED to protect the single-element-root requirement; self-documenting). **KEEP the comments.** Re-scope `proof:route-single-root` to the GENUINE #7956: assert no routed SFC `<template>` has **2+ top-level sibling ELEMENTS** (AST-verified empty today; `NotFound`'s as-child `<Button>` is ONE element → no false-red by construction). **GATED on Prototype-1** (build-proof on the un-normalized tree). |
| **P4-B (focal: DRY)** | "`route.meta.focal` per-row hand-list enumerating ~26 manifest rows + `proof:focal-complete` C1 scans the import-graph to CHECK them" | Hand-list + check is a **DRY violation** — the import-graph IS the natural source (the same scan C1 runs). The ~26-row hand-list is the drift surface; 23 story SFCs reach a GL leaf transitively. | **DERIVE `meta.focal` from the import-graph at build** (the same `useGpuSubstrate`/`useWebGLCanvas`/`useAurora`/`useMetaballRenderer` reach C1 already walks), NOT a hand-list. `proof:focal-complete` becomes a CONSISTENCY check (the derived set == the import-graph truth), with the section-landing arm cross-checked the same way. ONE source of truth. |
| **P4-C (hero: displayTitle is load-bearing)** | "`displayTitle` is EXPLICIT TASTE polish; the dual-bound π is a regression guard" | `displayTitle` is **MANDATORY for hero+intro**, not taste. The 375 no-hyphenation π **FAILS** on `/compositions/hero`'s 38-char sentence (wraps 3 lines + `hyphens:auto` at `story-hero.css:215`). The svh est-lines:2 backstop is **near-INERT** for normal viewports (0.62·100svh/2 = 0.31svh = 254px@820 ≫ display-4 86px@1440 → the svh leg never binds). What actually caps the hero is **routing through the chassis at all** (display-4 rung + drop `max-w-5xl`). | Author SHORT `displayTitle`s (≤~7ch wordmark/phrase) for `/compositions/hero` + `/foundations/intro` BEFORE the 375 capture; the semantic `title` stays for nav/breadcrumb/search. The svh term remains ONLY as a short-viewport guard, not the primary cap. |
| **P4-D (field timing)** | "`v-if(!focal)` flips at the focal boundary" | **R1: uncoordinated.** The shell `<Aurora v-if="!focal">` is a sibling OUTSIDE the RouterView out-in; the computed flips `true` synchronously on route-change → the shell aurora unmounts IMMEDIATELY while the leaving content page is still mid-out-in-leave → a **1-frame FIELD GAP** behind the leaving page. | **Gate the shell-aurora `v-if` on the SETTLED route** (the post-`afterEach` committed route ref), NOT the reactive `route.meta.focal`. The field persists through the leave; the focal flip lands after the new page mounts. Add a **content→focal mid-transition field-continuity** assert to the π. |
| **P4-E (field perf)** | (unaddressed) | The shell `<Aurora>` **eager import is the #1 perf risk**: importing it into `AppShell.vue` pulls `dist/aurora.js` (~16KB-gz WebGL chunk) into the **always-loaded shell critical path on EVERY route** incl. text-only foundations pages. The prior `.paper-field` was zero-JS CSS. `profile:budget` keeps plain-lazy precisely to avoid first-paint regressions. | Confirm `proof:lighthouse` first-paint un-regressed BEFORE close (Prototype-5). If it regresses, **lazy-mount the shell Aurora past first paint** (`scheduleAfterFirstPaint` — the pattern `useAurora` already uses); the CSS-gradient fallback covers the pre-mount frame. |
| **P4-F (a11y)** | (unaddressed) | Two gaps: **WCAG 2.2.2** — the shell aurora is NEW auto-start >5s continuous background motion (the `.paper-field` it replaces is static CSS); PRM-freeze covers only PRM-set users. **Focus-on-route-change** — `out-in` unmount strands keyboard/SR focus at `<body>`, and the deleted skeleton's `aria-busy` announcement is gone → zero route-change signal for AT. | **2.2.2**: keep shell drift **sub-perceptual** (`vividness:0` + minimal `nucleiDrift/paletteDrift` so it reads non-animated "sunrise behind frosted glass") — satisfies 2.2.2 by being effectively static; NO pause control needed (document the decision; the in-`/substrates` focal auroras keep their `DockBackgroundToggle`). **Focus**: on route settle, move focus to `<main>`/`h1` (`tabindex="-1"`) or `aria-live="polite"` announce the new page title. |

Plus four source-fact corrections (re-verified on disk):
- **`.paper-field` delete span is `paper.css:129-269`** (recipe :138-186 + `.dark` arm :188-215 + `::before` cel-drift :226-240 + `@keyframes field-cel-drift` :240+ + the PRT/PRM gates :260-269) — NOT pass-3's under-pointer "129-138/253". **+ the `@property --field-h-raw` / `--field-intensity` registrations (`property-regs.css:233-244`)** — both fully dead after the props strip. A partial cut greens `proof:no-paper-field` while the metallic ships in CSS.
- **`--scroll-build-rise` untangle is real** (`scroll-tokens.css:32` read by `story-hero.css:549` + `:579`); **`--scroll-build-step` (`:33`) is NOT** (only `scroll-choreography.css:126` reads it → delete with the recipe, no untangle).
- **`route-liquid` is genuinely distinct from `.pane-swap`** — `.pane-swap` is HORIZONTAL (`translateX(0.75rem)`, a side-pane idiom) with a transform-bearing leave; `route-liquid` is the VERTICAL iOS-NavStack settle (`translateY(0.75rem→0)`, `--spring-snappy` enter weight, **fade-only leave**). It DRYs the out-in STRUCTURE off pane-swap but the axis + curves + fade-only-leave differ FOR CAUSE (the reference design language). Mint it; do not reuse pane-swap.
- **The skeleton + no-match branches are DEAD** — `main.ts:11` `router.isReady().then(() => app.mount)` makes `Component` non-null after first paint; `/:pathMatch(.*)*` → `NotFound` makes the no-match `<Card>` unreachable. Safe to delete both + their `Skeleton`/`Card` imports.

---

## GESTALT GOAL

One shell, one route-swap, one persistent field, one fit law — the cure is **subtraction**, the close is **PAINT**:

1. **ROUTE (M1)** — collapse the 4-mechanism pile to `<Transition name="route-liquid" mode="out-in"><component :is :key="route.path"/>`, delete the 3-branch `v-if` + bloom-find-child + categoryId-VT in ONE cut, **keep the W-CUT P10c comments** (the #7956 sweep is a phantom — P4-A), keep plain-lazy (R1). Exactly 1 page root at every settle.
2. **FIELD (M2)** — retire `.paper-field` WHOLE (`paper.css:129-269` + the @property regs DELETED) for ONE shell `<Aurora v-if="!settledFocal">` (settled-route-gated — P4-D) with `vividness:0` recessive per-route hue. `meta.focal` **import-graph-derived** (P4-B). Monotonic exactly-one-GL by construction.
3. **TOP BAR (M4)** — `scroll(nearest block)` (sticky child, verified) + hoist `transform-origin:0 50%; transform:scaleX(0)` UNCONDITIONAL so any timeline failure rests INVISIBLE.
4. **HERO (M5)** — ONE chassis title path (hero+intro) + `#title-ornament` slot + MANDATORY short `displayTitle` (P4-C); svh fit term as a short-viewport guard with FIXED est-lines:2; ≥display-4 floor at ≥768.
5. **HYGIENE (M0)** — `errorHandler` + `onInitError` everywhere; route-change focus management (P4-F); delete redundant confounders; KEEP `firstResolved`.

Every motion leg is compositor-only, carries iOS-27 liquid weight (spring-on-spatial enter-overshoot / bezier-on-effects exit-no-overshoot), PRM keeps-fade/drops-transform, paints Chrome AND Safari (the `out-in` floor NEVER depends on native VT). The `<Aurora>` primitive + `--type-display-*` ladder are byte-untouched.

---

## MECHANISM (the pass-4 advance — concrete)

### M1 — The route swap (D1/D9, the linchpin) — SIMPLIFIED by P4-A

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism. NO Suspense, NO v-if branch chain, plain-lazy, COMMENTS KEPT -->
<RouterView v-slot="{ Component, route }">
    <Transition name="route-liquid" mode="out-in">
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
```

**(P4-A) The #7956 sweep is DROPPED.** Build-proven phantom (see STATUS). **KEEP** the W-CUT P10c rationale comments on `StoryPage.vue` / `SectionLanding.vue` / `hero.vue` / `intro.vue` / `auth-shell.vue` and every chassis SFC — they are self-documenting and harmless (Vue's `filterSingleRoot` skips them). The M5 hero re-author touches `hero.vue`/`intro.vue` for the title path; it does NOT need a comment strip. **`proof:route-single-root` is re-scoped** to the genuine #7956: for every `import.meta.glob` routed module, parse `<template>` and assert ≤1 top-level sibling ELEMENT (comments/text ignored, matching Vue's own `filterSingleRoot`). Planted bite: a synthetic 2-sibling-element root MUST flag. **Gated on Prototype-1** — if the un-normalized-tree build-proof DOES surface a `cannot be animated` warning on any route, fall back to a **targeted strip of ONLY that one root** (necessity-driven, never blanket). The expected outcome is zero warnings → keep all comments.

**(R1) Loader = PLAIN-LAZY, unchanged.** KEEP `manifest.ts:118` `import.meta.glob` (non-eager) → `() => import()`; KEEP `firstResolved` (`router.ts:81-90`, `typeof==='function'` filter). NO eager-glob (644.54 KB-gz regression), NO `defineAsyncComponent`, NEVER `<Suspense>` (pass-1 falsified). vue-router resolves the loader DURING navigation → the OLD page is HELD throughout the async load → the enter animates the REAL page, never a void.

- `mode="out-in"` → leave fully resolves → old unmounts BEFORE enter → exactly 1 page root at every settle. **(R5) Re-validate the author's out-in fear** (`AppShell.vue:399` comment: "DEFAULT mode … so the entrance does not race the scroll-to-top reset"): move the scroll-reset `watch` off `route.fullPath` onto `route.path`; Prototype-1 confirms the scroll-reset × out-in interaction is cosmetic (the scroll-to-top lands on the new mount, not a race). ONE scroll-reset owner.
- **NO `v-if`/`v-else-if` chain.** DELETE the no-match `<Card>` + its import (dead — NotFound catches `/:pathMatch`); DELETE the matched-pending skeleton branch + its `Skeleton` import (dead — `router.isReady().then(mount)` + the held-old-page leave no in-shell async window).

**`.scroll-build` RETIRES WHOLESALE — UNTANGLE the shared token FIRST:**
- Remove the class from `StoryPage.vue:72` + `SectionLanding.vue:85` (the only 2 consumers).
- **Mint `--story-hero-rise: 1.5rem`**, re-point `story-hero.css:549` (`story-hero-title-rise`) + `:579` (`story-hero-cluster-rise`), **THEN** delete the orphaned `--scroll-build-rise` (`scroll-tokens.css:32`). Delete `--scroll-build-step` (`:33`) WITH the recipe (only `scroll-choreography.css:126` reads it — no untangle).
- Delete the dead recipe: `scroll-choreography.css:102-160` (`gl-page-build`/`-fade`/`.scroll-build > *`/`.scroll-build-hero`), the `story-hero.css:534-579` hero-coupled `.scroll-build` RULES (keep the re-pointed keyframes), the `liquid-enter.css:14` "Bug B" fence (do the subtraction, never re-fence).
- Re-point the showcase (`motion/scroll-choreography.vue:68`, `manifest.ts:1081`) to `.scroll-cascade`. KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`.

**The `route-liquid` recipe** (mint in `transitions.css` — the iOS NavStack vertical settle, distinct from horizontal `.pane-swap`):

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

**Deletions (clean break, `proof:no-dual-path`):** `useBloomUp` IMPORT (`AppShell.vue:30`) + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom find-child `watch` (255-303); the categoryId no-op `startViewTransition` + the dead `dataset.categorySwitch` write (211-228, 0 readers). **`useBloomUp` the LEAF stays** (published, `AppleMusic.vue:30` consumer — only the AppShell route-bloom USAGE dies). **KEEP** `toggleShellMorph`'s `startViewTransition` (131 — functional dock-morph, moves WITH the WS2 morph-stage carve). **Coordinate the AppShell line deletions with WS2** (same 860-line file — land as ONE integration commit or strictly sequence).

**(P4-F) Route-change focus management (NEW).** On route settle (`router.afterEach` or the `<Transition>` `@after-enter`), move focus to `<main>` (`tabindex="-1"`) OR announce the new page title via an `aria-live="polite"` region — the deleted skeleton's `aria-busy` is gone; `out-in` strands focus at `<body>`. The aria-live region doubles as the SR route-change signal.

### M2 — The field: ONE shell aurora, settled-gated, vividness:0 (D2/C-FIELD + one-GL law)

```vue
<Aurora
    v-if="!settledRouteOwnsFocalSubstrate"   /* P4-D: gated on the SETTLED route, not the reactive one */
    :config="shellAuroraConfig"
    :opacity-ceiling="0.5"
    :on-init-error="onShellAuroraError"
    class="fixed inset-0 -z-10 shell-aurora"
    data-paper-field
    aria-hidden="true"
/>
```

1. **(P4-D) `v-if` gated on the SETTLED route.** `settledRouteOwnsFocalSubstrate` is a ref written in `router.afterEach` (the committed route), NOT the live `route.meta.focal` computed. So across non-focal→non-focal the boolean stays `false→false` (node PERSISTS — no reparent, the WebKit canvas-move-loses-context constraint never bites). At a focal flip the shell node persists THROUGH the leaving page's out-in leave and unmounts only after the new (focal) page has mounted → ZERO 1-frame field gap. `onBeforeUnmount → useAurora.dispose() → loseContext()`. **Monotonic exactly-one-GL by construction.**
2. **Per-route hue WITHOUT re-mount.** `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)`; non-focal navs re-upload the hue uniform on the PERSISTED node (Aurora's deep config watch).
3. **The MATERIAL is recessive — `vividness:0` MANDATORY** (the shader-floor; `aurora.frag.ts:373-385` `vividnessFloor`/`VIVID_TARGET 0.115` re-pigments every pale fragment to C≥0.115 whenever `uVividness>0.0001`; `heroAuroraConfig` spreads the HIGH `DEFAULT_AURORA_CONFIG`). Mint `shellAuroraConfig(hue)` in `aurora-hero.ts` = the calm band (`breathPeriod:48`, low `nucleiDrift/paletteDrift`, `saturation:0.95`) + **`vividness: 0`** + an EXPLICIT recessive C 0.05-0.09 palette + the per-route `warmFieldHue`. Result = "sunrise behind frosted glass", NO conic foil slab. If a recessive palette reads grey at the sand end (motion 85° / data 88°), lift chroma ONLY for the 80-95° sand projections, never amber. **(P4-F 2.2.2)** the sub-perceptual drift reads non-animated → satisfies 2.2.2 by being effectively static; document the decision.
4. **(P4-B) `route.meta.focal` is IMPORT-GRAPH-DERIVED, not a hand-list.** Generate `meta.focal` at build from the component import-graph reach (`useGpuSubstrate`/`useWebGLCanvas`/`useAurora`/`useMetaballRenderer`) — the SAME scan `proof:focal-complete` C1 runs. Section LANDINGS derive the same way (a landing whose `CATEGORY_HERO bgKind ∈ {aurora,constellation}` mounts GL). Generalize the existing `manifest.ts:153-158` ad-hoc "drop to paper to avoid a 2nd GL" hack INTO this one derived knob. ONE source of truth — the hand-list drift surface is gone.

   **`proof:focal-complete` becomes a CONSISTENCY gate (device-free):**
   - C1: every routed module whose import-graph reaches a GL leaf has `focal:true` in the derived set.
   - C2: every `focal:true` row HAS a GL reach (no focal-without-GL).
   - The section-landing arm cross-checks the SAME import-graph truth (the pass-3 hole — closed).
   - Planted bite: remove a viz's GL reach → C1 exit 1 (a COMMITTED subprocess bite, not a manual one-off).
   - **NAME the insufficiency:** this proves ENUMERATION CONSISTENCY, NOT the runtime one-GL law (the async-dispose/WebKit-budget race can leave 2 live contexts while it greens). **The close hinges on the LIVE monotonic-GL capture, never this gate alone.**
5. **The 2nd/3rd field systems RECONCILE onto the shell.** StoryHero retires its per-page full-bleed `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` on NON-focal routes (the shell IS the field); keeps the per-page focal mount ONLY for genuinely-focal viz-demo rows. DockStage keeps its own functional aurora ONLY where it must demonstrate pause/resume. The static `grid`/`paper` page-backgrounds collapse onto the shell aurora; grain demotes to OPT-IN (W-PAPER-GRAIN-OPTIN).
6. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR wash cap (so `proof:offscreen-pause` + `proof:perf-producer` stay GREEN). CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. The dispose→re-arm on focal-return shows the gradient fallback one frame — verify it reads warm, no black flash.

**M2 is a COMPLETE clean break (no-legacy):**
- **DELETE** the `.paper-field` recipe (`paper.css:129-269` — whole region incl. `.dark` arm + `::before` cel-drift + `@keyframes field-cel-drift` + the PRT/PRM gates) **+ the `@property --field-h-raw` / `--field-intensity` regs (`property-regs.css:233-244`)** and the `field`/`fieldHue`/`fieldIntensity`/`fieldStyle` props + the field `<div>` from `PaperBackdrop.vue` (29-75) → pure grain register.
- **`proof:no-paper-field` (SOURCE assert, NEW):** the recipe ABSENT **AND** the props/`fieldStyle` ABSENT **AND** the @property regs ABSENT (a tag-presence-only gate greens over a props delete).
- KEEP the `data-paper-field` DOM hook on the new Aurora wrapper (load-bearing — `cards.css:70-120` opaque-fallback suppressor + `liquid-morph.css:40-69` ambient-tint seam read the ATTR, not `--field-h`; the phantom-hook-never-set bug at HEAD is FIXED by the attr finally landing). Do NOT delete the separate `--field-h` register on `select.css`/`SectionPreviewCard.vue` (distinct writer).
- Re-point `proof:` references off `paper-field`/`scroll-progress-scroller` (`proof-ba-animate.mjs`, `gates.mjs`, `ba-animate.spec.ts`).

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `warmFieldHue` + the DEAD `warmFieldHueMap`) is a verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + same-named `clampWarm`, same `[25,95]` band). **Fold:** make `warmProjectHue` + a new `sectionHueDeg(idx)` accessor (reading `SECTION_COLOR_OKLCH` via `cssToOklch().h`) the canonical exports on `aurora-hero.ts`; collapse `warm-field.ts` to a ~12-line adapter `warmFieldHue(id) = warmProjectHue(sectionHueDeg(categoryHue(id)))`. DELETE the dup table/body + the dead `warmFieldHueMap` (grep-confirmed 0 consumers). **PRESERVE `projectWarm`'s richer mapping** — it carries a reds-floor (`h>=340||h<25→38`) + a warm-wedge passthrough (`h<=95`) that `warmProjectHue` LACKS; the fold must preserve those branches or hues drift. **(P4-G / R7) hue-PARITY assert (NEW, Prototype-6):** `cssToOklch(SECTION_COLOR_OKLCH[i]).h` must equal the `warm-field.ts` degree literal for ALL 13 indices (within a tight epsilon) BEFORE the fold lands — a ~1° value.js parse delta silently repaints every route. **PRESERVE all 3 `warmFieldHue` consumers** (`AppShell.vue:237`, `SectionLanding.vue:48`, `SectionPreviewCard.vue:167`). Rewire `useGlassBackdropLuminance` to sample the live SHELL canvas.

### M4 — The top-bar: `scroll(nearest block)` + the UNCONDITIONAL scaleX(0) floor (D5, BG.W-SCROLL-PROGRESS-RAIL)

```css
.scroll-progress {
    transform-origin: 0 50%;
    transform: scaleX(0);   /* HOISTED outside the gate — rest is INVISIBLE on any unsupported/invalid/PRM path (NOT opacity:0.85) */
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

- **M4 is CORRECT — `.demo-scroll-progress` is a `position:sticky` CHILD of `.demo-main-scroller`** (`dock-nav.css:230-232`), so `scroll(nearest block)` resolves to that scroller (the fixed-bar fixture finding does NOT transfer). The HEAD bug: `scroll(var(--scroll-progress-scroller,root) block)` with `--scroll-progress-scroller: --demo-main-progress` substitutes a `<dashed-ident>` into `scroll()`'s scroller slot → INVALID → `animation-timeline` computes to `auto` → keyframe resolves to `scaleX(1)` full-width.
- Hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL; drop the `opacity:0.85` rest (`dock-nav.css:248`). Drop `--scroll-progress-scroller`; `.demo-scroll-progress { --scroll-progress-timeline: scroll(nearest block); }`. Reserve named-timeline + `timeline-scope` for `scroll-vt.vue` (the genuine cross-element case). `animation-timeline` stays declared AFTER the `animation` shorthand (it is RESET-ONLY inside the shorthand).
- **Gate reads the COMPUTED value** (`animationTimeline !== 'auto'`, `animationRange`), never the declared string (the D14 silent-degrade lesson). Assert full-value-var + NO `scroll(var(` substring + a GLOBAL `scroll(\s*--` scan over `src`+`demo` (incl. `scroll-vt.vue`, currently unscanned) + a planted bite.
- **DE-CONFOUND grows-on-scroll in the π:** read `bar.getAnimations()[0].currentTime` + a screenshot bbox-width delta at scroll-top vs scrolled — NOT `getComputedStyle(transform)` (unreliable for compositor scroll-linked anims on WebKit).
- Reconcile the stale prose (`AppShell.vue:385-393`, `dock-nav.css:185-199`/`246-248`, `scroll-driven.css:33-35`). **(liquid law)** add a spring-eased trailing-glint on the fill edge ONLY AFTER the scaleX(0)-rest π passes.

### M5 — The hero fit: ONE chassis path + svh guard + MANDATORY displayTitle (D10, BG.W-HERO-FIT)

**Root cause:** `hero.vue`/`intro.vue` hand-author `<h1 class="text-display-{hero,mega} max-w-5xl">` via `:hero-title="false"` and bypass the chassis cap; `max-w-5xl` MANUFACTURES the wrap; the audacious rung wins on wide viewports (244.8px / 157% svh@1440, live-confirmed). The Δ3 "collision" is a PHANTOM (display-4@1440=86.1px, svh-term@est5=101.7px above it).

1. **ONE chassis title path with a `#title-ornament` slot — `hero.vue` + `intro.vue` ONLY (R4).** Retire `:hero-title="false"` + the bare `<h1>` (clean break); render through `.story-hero-title[data-hero-scale]` with a `#title-ornament` slot PRESERVING the bespoke eyebrow + ℱ wordmark + blurb. Drop `max-w-5xl`. **auth-shell KEEPS its bespoke title** (display-1, never viewport-dominating); it gets NO change (its comment stays — P4-A). KEEP the W-CUT comments on hero/intro (P4-A).
2. **(P4-C) MANDATORY short `displayTitle`.** Author SHORT wordmark/phrase `displayTitle`s (≤~7ch) for `/compositions/hero` + `/foundations/intro` so the 375 no-hyphenation π passes (the 38-char sentence wraps 3 lines + hyphenates otherwise). The chassis `<h1>` renders `displayTitle ?? title`; nav/breadcrumb/search KEEP the semantic `title` (verify all 3 read `.title`). This is the LOAD-BEARING fix, not the svh term.
3. **Height-aware fit-cap with an svh SHORT-VIEWPORT guard** (static `min()` resolution, not a layout-animated step — `proof:no-layout-animation` SAFE):

```css
.story-hero-title[data-hero-scale] {
    font-size: min(
        var(--story-hero-title-rung, var(--type-display-4)),
        var(--story-hero-title-fit, calc((100vw - 2 * var(--story-hero-pad, 2rem)) / var(--story-hero-cpl, 7))),
        var(--story-hero-title-svh, calc(0.62 * 100svh / var(--story-hero-est-lines, 2)))  /* svh NOT dvh — dvh jumps on scroll; short-viewport guard only */
    );
}
```

4. **(R3) `--story-hero-est-lines` FIXED `2`, NO ResizeObserver.** The svh term is near-inert for normal viewports (its real role is a short-viewport guard); the primary cap is routing through the chassis (display-4 rung + drop `max-w-5xl`). DELETE any dead `max-block-size:calc(0.62*100svh)` IF present (HEAD grep: absent — no-op). Single-source the line factor (`--story-hero-cpl` ≡ `HERO_CHARS_PER_LINE`).
5. **The ≥4 rung floor is a REGRESSION GUARD at ≥768 only (R2).** The dual-bound π asserts `block ≤ 0.62svh` AND `font-size ≥ computed(display-4)` at ≥768; at 375 it asserts NO hyphenation + NO horizontal overflow for the longest `displayTitle`. NO `--type-display-*` edit.

### M0 — Hygiene (folds into W-ROUTE-TRANSITION — NOT the cure)

```ts
// demo/main.ts
app.config.errorHandler = (err, _instance, info) => { console.error("[demo] app error", info, err); };
```

- Thread `onInitError` into EVERY Aurora mount (11 today only `liquid-playground` handles it): shell field, `StoryHero.vue:267`, `DockStage.vue:59`, `KonamiAurora.vue:48`, `buttons.vue:76`, `card.vue:147/303`, `glass-panel.vue:60`, `auth-shell.vue:58`, `rail.vue:80`, `overview.vue:626`.
- Correct the false docstring at `useAurora.ts:191`.
- **(P4-F) Route-change focus/announce** (see M1) — the aria-live region + `<main tabindex="-1">` focus on settle.
- DELETE the redundant window `scrollBehavior:()=>({top:0})` (`router.ts:73` — double-fires the AppShell `route.path` reset). **KEEP** `firstResolved` (`router.ts:81-90`).
- Gate: `proof:route-confounder` (device-free + a self-test bite — the four deleted mechanisms ABSENT).

---

## FILES TOUCHED

| file | change |
|---|---|
| `demo/layout/AppShell.vue` | M1 cut (out-in keyed swap, 3-branch delete, bloom/categoryId-VT delete, scroll-reset re-axis to `route.path`); M2 shell `<Aurora v-if=!settledFocal>` replaces `<PaperBackdrop field>`; M0 onInitError + route-change focus/announce; stale-prose reconcile. **KEEP the W-CUT P10c comments (P4-A). Coordinate with WS2** (morph-stage carve, same file). |
| `demo/main.ts` | M0 `app.config.errorHandler`. |
| `demo/router.ts` | M1 thread the import-graph-derived `meta.focal` + the `settledFocal` afterEach ref; DELETE redundant window `scrollBehavior`; **KEEP** `firstResolved`. |
| `demo/stories/manifest.ts` | KEEP plain-lazy; M2 **import-graph-derived** `focal` (P4-B, no hand-list); M5 MANDATORY `displayTitle` for hero/intro + optional `estLines`. |
| `src/styles/transitions.css` | M1 mint `.route-liquid-*` (vertical iOS settle + fade-only leave; DRYs structure off `.pane-swap`, axis/curves distinct). |
| `demo/stories/StoryPage.vue`, `demo/stories/SectionLanding.vue` | M1 drop `.scroll-build` from the article roots. **Comments KEPT (P4-A).** |
| `src/styles/tokens/scroll-tokens.css` | M1 **untangle FIRST** — mint `--story-hero-rise`, re-point hero keyframes, THEN delete `--scroll-build-rise`; delete `--scroll-build-step` with the recipe. |
| `src/styles/scroll-choreography.css`, `demo/stories/story-hero.css`, `src/styles/liquid-enter.css` | M1 DELETE the dead `.scroll-build` recipe + hero-coupled rules + the "Bug B" fence (after the untangle). |
| `demo/stories/motion/scroll-choreography.vue`, `manifest.ts:1081` | M1 re-point the showcase to `.scroll-cascade`. |
| `src/styles/paper.css` | M2 **DELETE `.paper-field` 129-269** (recipe + `.dark` + `::before` cel-drift + `@keyframes` + PRT/PRM gates). |
| `src/styles/tokens/property-regs.css` | M2 DELETE `@property --field-h-raw` / `--field-intensity` (233-244, dead). |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | M2 STRIP `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle` + the field div → pure grain register. |
| `demo/stories/aurora-hero.ts` | M2 mint `shellAuroraConfig(hue)` (vividness:0 + recessive C 0.05-0.09); M3 canonical `warmProjectHue` + `sectionHueDeg`. |
| `demo/stories/warm-field.ts` | M3 collapse to a ~12-line adapter; DELETE dup table/body + dead `warmFieldHueMap`; PRESERVE the reds-floor/warm-wedge branches. |
| `src/styles/scroll-driven.css`, `demo/layout/dock-nav.css` | M4 unconditional scaleX(0) floor + `scroll(nearest block)` + drop `--scroll-progress-scroller` + drop `opacity:0.85` rest + prose. |
| `demo/stories/motion/scroll-vt.vue` | M4 migrate to named-timeline + `timeline-scope`. |
| `demo/stories/story-hero.css`, `demo/stories/StoryHero.vue` | M5 svh guard + FIXED est-lines:2 + `#title-ornament` slot + `displayTitle` render. |
| `demo/stories/compositions/hero.vue`, `foundations/intro.vue` | M5 retire `:hero-title=false` + bare `<h1>` → chassis path + MANDATORY short `displayTitle`. **Comments KEPT (P4-A).** |
| `scripts/proof-*.mjs`, `tests-visual/*.spec.ts`, `scripts/gates.mjs`, `package.json` | re-point `paper-field`/`scroll-progress-scroller`; **REGISTER** NEW `proof:route-single-root` (genuine-multi-root, P4-A), `proof:focal-complete` (import-graph-consistency, P4-B), `proof:no-paper-field`, `proof:route-confounder`; ADD `route-liquid` to `proof-ba-animate.mjs` `PAGE_ENTER_RECIPES`; harden `proof:ba-animate`. |

> **NOTE the FILES-TOUCHED is SMALLER than pass-3** — the 13-file comment-strip set (`StoryHeader`/`StorySectionHeader`/`CodeBlock`/`AuroraStage`/`PresetPickerRow`/`DemoFrame`/`VizStudio` + the comment edits on the routed roots) is GONE (P4-A). That is the headline simplification.

---

## WAVE BREAKDOWN — each with its mechanism + the BINDING real-paint-π

> **Every π is a FRESH LIVE capture by a NON-AUTHORING agent, Chrome AND real Safari/WebKit, REAL GPU, on `:5199`. "rides W-REFLECT3" is SCRUBBED (no W-REFLECT3 in BG). `proof:ba-gestalt` carries no WS1 verdict (hardcoded BC roster) until WS7's `BG.W-GESTALT-REPOINT`. Playwright-WebKit has NO WebGPU → run the WebGPU probe on chromium.**

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
out-in keyed swap (`route.path`) + 3-branch `v-if` delete + bloom/categoryId-VT/`dataset.categorySwitch`/no-match-Card/skeleton-import delete; **#7956 sweep DROPPED, comments KEPT (P4-A)**; `proof:route-single-root` re-scoped to genuine-multi-root; mint `route-liquid`; `.scroll-build` retire (untangle FIRST); PLAIN-LAZY; KEEP `firstResolved`+`toggleShellMorph`VT+the ONE scroll-reset owner; route-change focus/announce (P4-F); + M0. **Device-free gates:** `proof:route-confounder` + `proof:route-single-root` (genuine-multi-root, planted-bite) + `mode="out-in"` present + deleted mechanisms ABSENT + `route-liquid` in `PAGE_ENTER_RECIPES`. **BINDING π:** the **5-nav-<300ms burst** → at +60/+360/+1260ms: **`main h1.textContent === last-dest title`** (PRIMARY; page-root identity where h1-less) AND **`main.children.length === 2`** AND **no orphan stale-heading node** AND **monotonic allocated-GL===1** (live-context canvases at SETTLE); + a **TRANSITION-FIDELITY** mid-frame assert on the REAL page; + a **leading-comment-root hop** (`/compositions/hero`, `/substrates/aurora`) asserting NO white-screen + NO `cannot be animated` console warn; PRM keeps-fade/drops-transform; route-change focus lands on `<main>`/h1; Chrome AND Safari/WebKit, real GPU. DELTA vs `category-card-waste.png`/`morph-modal.png`.

### 2. `BG.W-FIELD-AURORA` — lands WITH #1 (★★★ material reversal + the one-GL law)
retire `.paper-field` WHOLE (129-269 + @property regs + props; `proof:no-paper-field` source assert); ONE shell `<Aurora v-if="!settledFocal">` (P4-D settled-gate) + `dispose`; **import-graph-derived `meta.focal`** (P4-B) + section-landing cross-check; reconcile StoryHero+DockStage; `shellAuroraConfig` = calm band + **`vividness:0`** + recessive C 0.05-0.09 + `warmFieldHue`; 2.2.2 sub-perceptual-drift decision (P4-F). **Gates:** `proof:offscreen-pause`+`proof:perf-producer` un-regressed + `proof:no-paper-field` + `proof:focal-complete` (import-graph-consistency; runtime-insufficiency NAMED). **BINDING π (the LIVE monotonic-GL capture is the close):** the **getContext-instrumented oracle** (canvases with `isContextLost()===false` + `isConnected`, NOT raw `<canvas>` tags; sample at SETTLE) → **`glContextCount(allocated)===1`** on every non-substrate route AND on a content→substrate→content round-trip + the 5-nav burst (no monotonic leak, no double-allocate on focal) + **a content→focal mid-transition field-continuity** assert (no 1-frame gap — P4-D); **calm warm aurora — NO conic sheen, NO C>0.10 brown, NO visible speckle** at ≥3 hues incl. the WORST cool (motion 85° / data 88°) BOTH modes; glass clears AA at `opacityCeiling 0.5` BOTH modes **WITHOUT `contrast-color()`** (text-free bg patch + actual painted text color). DELTA vs `hero-broken.png`/`category-card-waste.png`.

### 3. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
hoist `transform-origin:0 50%`+`scaleX(0)` UNCONDITIONAL; SHELL bar → `scroll(nearest block)`; reserve named-timeline+`timeline-scope` for `scroll-vt.vue`; drop `--scroll-progress-scroller` + the `opacity:0.85` rest; `animation-timeline` declared AFTER the shorthand. Gate reads COMPUTED `animationTimeline`/`animationRange` + full-value-var + NO `scroll(var(` + GLOBAL `scroll(\s*--` scan + planted bite + re-point `proof:ba-animate`/`ba-animate.spec.ts`. **BINDING π (de-confounded):** `animationTimeline !== 'auto'` + `scaleX(0)` at scroll-top EVERY route + **GROWS via `getAnimations()[0].currentTime` + bbox-width delta** (NOT `getComputedStyle`) + a scroll-timeline-DISABLED engine resting `scaleX(0)`. Chrome AND Safari. DELTA vs `top-bar.png`.

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #2
M3 fold (canonical `warmProjectHue`+`sectionHueDeg`; collapse `warm-field.ts`; PRESERVE the reds-floor/warm-wedge branches + 3 consumers; rewire `useGlassBackdropLuminance` to the shell canvas). **(P4-G) hue-PARITY pre-assert** (cssToOklch parity for 13 indices). **Gate:** single-source-of-warm-hue + 3-consumer presence + AA over the aurora both modes.

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #2
Demote universal `.paper-underpaint` 0.22 grain → per-surface opt-in; `PaperBackdrop` → pure grain register; re-tune opt-in opacity sub-JND. **Gate:** no universal grain mount + grain tokens intact.

### 6. `BG.W-HERO-FIT` — depends on #1
ONE chassis title path (hero+intro) + `#title-ornament` + **MANDATORY short `displayTitle`** (P4-C); svh short-viewport guard + FIXED est-lines:2; ≥4 rung floor at ≥768; drop `max-w-5xl`. NO `--type-display-*` edit. **BINDING π (375/768/1440/1920, BOTH modes, both engines; titles read from `manifest.ts`):** rendered `<h1>` BLOCK **≤~0.62×svh** for the longest `displayTitle ?? title`; **`font-size ≥ computed(display-4)` at ≥768** (at 375: NO hyphenation + NO overflow); **≥1 preview card above the fold at 1440×820** on `/compositions/hero` + every hero page. DELTA vs `hero-broken.png`.

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
drive `router.push` through the SHIPPED `navigate()` with `types:['forward'|'back']` behind `supportsRouteTransitions()`; per-engine degrade to the `out-in` floor; NEVER concurrent. **GOTCHA if it lands:** exclude the persistent shell `<Aurora>` from the VT snapshot (`view-transition-name: none`) or it double-captures + crossfade-flashes.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the close condition)

> **C-PAINT (binding):** headless-green/visually-broken shipped 3×. Every WS1 acceptance is a FRESH LIVE capture by an agent who did NOT author the build, Chrome AND a real Safari/WebKit context, REAL GPU, `:5199`. The build agent must NOT capture its own acceptance.

**Routing:** ≥6 cross-category hops → `main h1.textContent === dest title` (page-root identity where h1-less) + `main.children.length===2` + no orphan stale-heading. 5-nav-<300ms burst → `main h1 === LAST-dest` + `children===2` + monotonic allocated-GL===1 (live-context, SETTLE) + TRANSITION-FIDELITY mid-frame. A leading-comment-root hop renders (no white-screen, no `cannot be animated` warn). Route-change focus lands on `<main>`/h1. Chrome AND Safari, real GPU. No reload. PRM keeps-fade/drops-transform.

**Field:** every non-substrate route paints a calm warm AURORA — NO conic, NO C>0.10 brown, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5` WITHOUT `contrast-color()` (text-free patch). Verified at motion 85° / data 88°. `glContextCount(allocated)===1` on every non-substrate route AND a content→substrate→content round-trip + a content→focal mid-transition field-continuity (no gap). Real GPU (Safari budget bites first).

**Top bar:** `animationTimeline !== 'auto'`; `scaleX(0)` at scroll-top EVERY route; GROWS on scroll (de-confounded: `getAnimations().currentTime` + bbox-width delta); a scroll-timeline-DISABLED engine rests `scaleX(0)`. Chrome AND Safari.

**Hero:** `<h1>` block ≤~0.62×svh at 375/768/1440/1920 BOTH modes (longest `displayTitle ?? title`); `font-size ≥ computed(display-4)` at ≥768; at 375 NO hyphenation + NO overflow; ≥1 preview card above the fold at 1440×820 every hero page.

**First-paint (P4-E):** plain-lazy is the LANDED loader. `proof:lighthouse` first-paint un-regressed vs the pinned floor — **the new variable is the shell-`<Aurora>` eager chunk** (the prior `.paper-field` was zero-JS CSS). If regressed → lazy-mount past first paint.

Capture DELTAs (screenshot + paired-π) against `hero-broken.png` / `top-bar.png` / `category-card-waste.png` / `morph-modal.png` — never a commit-message claim. **(R8) These 4 evidence PNGs do NOT exist in-repo** — the capture agent establishes the BROKEN baselines (from HEAD @879c0c41) BEFORE the fix capture, or the orchestrator provides them.

---

## FOLDED DEFERRED / CROSS-WS HANDOFFS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement; deferred/optional, gated on #1 green, additive, never concurrent; exclude the shell Aurora from the VT snapshot.
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, no carrier; a CONSUMER-ASSET arm (DEFER-with-trigger), not a library wave.
- **`BG.W-SCROLL-SHRINK-UNIFY`** (3-fork DRY collapse) → **WS4**; HARD-DEPENDS on W-ROUTE-TRANSITION (the page-title shrink is dead-because-frozen — re-validate after M1).
- **AppShell >500-line carve** → `demo/layout/ShellDockMorphStage.vue` → **WS2** (coordinate the M1 line deletions; `toggleShellMorph`'s `startViewTransition:131` moves WITH the stage).
- **`useGlassBackdropLuminance` rewire** to the live shell canvas → W-FIELD-ACCENT-RECONCILE.
- **`BG.W-GESTALT-REPOINT`** (re-point `proof:ba-gestalt` off the BC roster) → **WS7**; no WS1 wave waits on it; the live burst+Safari capture IS the WS1 gate.
- **`W-PAINT-IS-THE-GATE` / CONSTRAINTS.md** → **WS7**.

---

## OPEN RISKS / RESIDUAL GAPS

1. **(HIGHEST — Δ0) The build is UNBUILT and unpainted.** Land M1+M2+M3+M4+M5+M0 as ONE cut on `tranche/BG @879c0c41` (coordinate the AppShell deletions with WS2), REGISTER the four new gates, THEN a NON-AUTHORING agent captures the binding paint on a real GPU, Chrome AND real Safari/WebKit. THIS is the close.
2. **(P4-A) The #7956-phantom decision is build-proven but DECISION-INVERTING** — confirm on the un-normalized tree (Prototype-1) BEFORE dropping the sweep. If any route surfaces the warn, fall back to a TARGETED strip of only that root.
3. **(P4-D) The shell-aurora settled-gate timing** must be verified to leave ZERO field gap on content→focal (Prototype-2's mid-transition capture).
4. **(Δ5 / runtime one-GL) `proof:focal-complete` proves enumeration-consistency, NOT the runtime law.** The async-dispose/WebKit-budget race can leave 2 live contexts while it greens. The live monotonic-GL capture is the only proof — Safari budget bites first.
5. **(P4-E) The shell-`<Aurora>` eager import** may regress first-paint (the .paper-field was zero-JS). Confirm `proof:lighthouse`; lazy-mount-past-first-paint is the fallback.
6. **(P4-G / R7) M3 hue-fold paint-shift** — a ~1° `cssToOklch` parse delta repaints every route. Hue-parity pre-assert before the fold.
7. **Safari/WebKit has ZERO real-demo evidence.** Four named falsifiers: named-timeline lag (mitigated by `nearest`), per-window GL budget, canvas-move-loses-context (avoided by mount/unmount-never-reparent), premultiply-toward-black (oklch zero-stops). Playwright-WebKit ≠ real Safari for GL budget + scroll-grow — if real Safari-26 is unavailable, NAME the Safari evidence vacuous, do NOT claim the close.
8. **(R8) The 4 evidence baseline PNGs do not exist** — establish them from HEAD before the paired-π DELTA.
9. **GL dispose is ASYNC** — sample monotonic-GL at SETTLE (+360/+1260ms), count live-context canvases, not raw tags.

---

## CONVERGENCE LEDGER (pass-3-converged → pass-4)

| pass-3-converged | pass-4 advance |
|---|---|
| #7956 sweep MANDATORY (13+ roots + chain-recursion + necessity-verify) | **PHANTOM — build-proven 3 ways (P4-A). DROP the sweep, KEEP the W-CUT comments, re-scope `proof:route-single-root` to genuine-multi-root. The headline simplification.** |
| `meta.focal` per-row hand-list | **IMPORT-GRAPH-DERIVED (P4-B). The hand-list is the drift surface; the graph is the source `proof:focal-complete` C1 already scans.** |
| `displayTitle` is TASTE polish | **MANDATORY for hero+intro (P4-C). The 375 no-hyphenation π fails on the sentence; the svh backstop is near-inert; the chassis-route is the cap.** |
| `v-if(!focal)` at the boundary | **Settled-route-gated (P4-D) — no 1-frame field gap on content→focal.** |
| (perf unaddressed) | **Shell-`<Aurora>` eager import = #1 perf risk (P4-E); confirm lighthouse, lazy-mount-past-first-paint fallback.** |
| (a11y unaddressed) | **WCAG 2.2.2 sub-perceptual-drift decision + route-change focus/announce (P4-F).** |
| `.paper-field` 129-138/253 | **CORRECTED to 129-269 + the @property regs — a partial cut greens over the metallic-in-CSS.** |
| R1/R2/R3/R4 (loader/collision-phantom/est-lines/auth-shell) | **HOLD — do NOT re-litigate.** |
| Δ0 / Safari | **STILL the binding unconverged frontier — INTEGRATE then CAPTURE; zero real-demo Safari evidence today.** |
