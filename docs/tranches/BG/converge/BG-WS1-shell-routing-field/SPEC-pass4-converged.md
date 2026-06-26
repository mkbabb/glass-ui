# BG-WS1 · Shell · Routing · Field — SPEC (pass 4 CONVERGED — INTEGRATE-then-CAPTURE; the paint is the only gate)

> Workstream: **Shell · Routing · Field**. Defects: D1 routing-freeze · D2 metallic→aurora · D5 top-bar · D9 transitions-broken · D10 hero-too-large. Directives: **C-ROUTE** (★★★ regressed, linchpin) · **C-FIELD** (★★★ regressed) · aberrant top bar · hero-too-large · **C-PAINT** (the close — headless-green/visually-broken shipped 3×).
> **Supersedes `SPEC-pass4.md`** (folds the pass-4 critique fleet + the 6 prototype build-proofs onto it). The MECHANISM is converged; pass 4 lands ONE architectural simplification of the linchpin (the route swap is a **bare keyed `<component>` atomic swap**, NOT a Vue `<Transition mode="out-in">` — the swap CANNOT wedge by construction), corrects six rationale errors the critiques caught on disk, then closes on the **BUILT-TREE PAINT** (Δ0: nothing is integrated; the binding real-paint-π is uncaptured by a non-authoring agent on a real GPU; Safari has ZERO real-demo evidence). Grounded against HEAD `tranche/BG @879c0c41` (4.2.0); every pass-4-contested fact re-verified on disk in this pass.

---

## STATUS — what pass-4-CONVERGED changes vs pass 4 (the honest delta)

Pass 3's four contradictions (R1 plain-lazy / R2 hero-collision-phantom / R3 fixed-est-lines / R4 auth-shell-keeps-title) HOLD — do NOT re-litigate. Pass 4 proposed seven advances (P4-A…G); the critique fleet + on-disk re-verification corrects FIVE of them and inverts ONE. The converged decisions:

| # | pass-4 said | pass-4-CONVERGED correction (critique-folded, disk-verified) | source |
|---|---|---|---|
| **C1 (HEADLINE — the linchpin)** | `<Transition name="route-liquid" mode="out-in"><component :is :key="route.path"/>` | **DROP the `<Transition>` wrapper entirely. Bare keyed atomic swap:** `<component :is="Component" :key="route.path" class="route-enter"/>`. A keyed `<component>` swap unmounts the old + mounts the new in ONE patch → `main.children.length===2`, exactly 1 `<article>`, `h1===dest` **by construction** (no leave-hook to wedge, no leave/enter race, no `.scroll-build`×`<Transition>` collision class — the exact mechanism the directive named as the C-ROUTE root cause). The liquid-weight enter is a pure **on-mount `@keyframes`** (`gl-route-enter`) on the `.route-enter` class applied to the keyed component (lands on ANY route root — fixes the `.story-page-article`-only selector gap). This is MORE subtraction, MORE KISS, MORE DEFT than out-in, and structurally eliminates the wedge failure class the spec exists to fix. | Critique-1 HEADLINE; convergence-bar "leaving page ALWAYS unmounts" |
| **C2 (focal: the RIGHT signal)** | `meta.focal` IMPORT-GRAPH-DERIVED via an AST walker (P4-B) | **DROP the AST walker. Derive `focal` from the route's declared `background.kind` + a small explicit self-stage set.** The import-graph is the WRONG signal — it conflates "imports a viz value" with "page background IS a viz field": `buttons.vue`/`card.vue` mount CONTAINED specimen auroras inside a card (the shell field must stay behind them) → an import-graph walk falsely marks them focal → bare-canvas void OR forced 2-GL. The RIGHT signal already exists on disk: `StoryHero.vue:199-207` computes `fullBleed = kind ∈ {aurora,constellation,fourier,liquid-grid}` from the manifest `background` descriptor. `focal = (resolvedBackground.kind ∈ GL_KINDS) OR (route ∈ SELF_STAGES_GL)` — KISS, declarative, no babel/SFC-walker/Vite-plugin subsystem, semantically correct (contained specimens are NOT focal). | Critique-1, Critique-4 (KISS), Critique-2 (self-stage); `StoryHero.vue:199-207`, `manifest.ts:111-181` |
| **C3 (M3 fold rationale — FALSE claim corrected)** | "`warmProjectHue` LACKS the reds-floor/warm-wedge branches; the fold must preserve them" | **FALSE — re-verified on disk.** `aurora-hero.ts:96-102` `warmProjectHue` ALREADY carries the reds-floor (`h>=340\|\|h<25→38`) AND the warm-wedge passthrough (`h<=95→h`) — functionally byte-identical to `warm-field.ts` `projectWarm` (whose only delta is a no-op `clampWarm(h)` on an already-in-band value). The fold's REAL risk is the degree-INPUT delta (`SECTION_HUE_DEG` literal vs `cssToOklch(SECTION_COLOR_OKLCH).h`); Prototype-6 measured MAX_HUE_DELTA = **0.0000°** → the silent-repaint risk is RETIRED. Keep the parity pre-assert as a regression guard; delete the false "lacks-the-branches" rationale. | Critique-1, Critique-6 (independently re-ran cssToOklch); `aurora-hero.ts:96-102` |
| **C4 (perf — INVERTED phantom)** | "the shell `<Aurora>` eager import is the **#1 perf risk** (+16KB-gz on every route)" | **PHANTOM, build-proven.** `KonamiAurora.vue` is STATICALLY imported at `AppShell.vue:44` and statically imports `Aurora` → `dist/aurora.js` is ALREADY in the eager entry chunk at HEAD. The shell `<Aurora>` import adds **~+50 bytes-gz** of transfer, not a 16KB chunk. `proof:lighthouse` first-paint is CONFIRMATORY (plain-lazy already decided), NOT a gating risk; the lazy-mount-past-first-paint fallback is de-prioritized (kept only as a documented escape if the confirmatory run surprises). | Critique-5 (built the demo SPA, traced the chunk); `AppShell.vue:44`, `KonamiAurora.vue:11` |
| **C5 (recessive palette — EXPLICIT, not hue-rotation)** | `shellAuroraConfig` = spread `DEFAULT_AURORA_CONFIG` + `vividness:0` + per-route hue | **Use the EXPLICIT recessive C 0.05-0.09 palette, NOT a hue-rotation of `DEFAULT_AURORA_CONFIG`.** `vividness:0` neuters the shader RE-PIGMENT floor (`aurora.frag.ts:373-385`, `VIVID_TARGET 0.115`) but NOT the base palette chroma; `DEFAULT_AURORA_CONFIG`'s C 0.16/0.13/0.095 zones still paint C>0.10 at the worst-cool sand projections → fails the C≤0.10 bar. Prototype-3 (the explicit recessive palette + `vividness:0`) MEASURED OKLab C max **0.069** (32% under ceiling) at the worst-cool hues (motion 85° / data 88°), meanLum ~0.62 (genuinely light/warm). Mint the explicit palette. | Critique-2, Critique-3 (verified vividnessFloor); Prototype-3 |
| **C6 (field timing — never-2-contexts under the atomic swap)** | shell `<Aurora v-if="!settledFocal">`, settled-route-gated through the out-in leave window | **Re-worked for the atomic swap (no leave window exists).** The rule is **NEVER two GL contexts mounted simultaneously; accept a ≤1-frame CSS-gradient bridge at every content↔focal boundary.** The shell `v-if` reads `shellFieldActive = !destinationOwnsFocalGL`, flipped in `router.afterEach` (the committed route), which under the bare swap coincides with the atomic unmount/mount patch; the explicit warm `oklch(L C H / 0)` zero-stop CSS-gradient fallback covers any sub-frame gap (NO black flash, NO bare-canvas). The binding LIVE capture is the only proof the transient stays ≤1 context on Safari's per-window GL budget. | Critique-1, Critique-2 (settled-gate is an out-in artifact) |
| **C7 (`data-paper-field` placement)** | attr on the fixed-position shell `<Aurora>` wrapper | **Move `data-paper-field` to an ANCESTOR of `<main>`** (the shell content root `<div class="relative flex h-screen">` or a body-level wrapper). `cards.css:70-120` `:where([data-paper-field]) [data-slot=card]` suppressor + `liquid-morph.css:40-69` `[data-paper-field]` ambient-tint scope are DESCENDANT selectors that must REACH the cards; the `<Aurora>` is a fixed sibling OUTSIDE the content tree, so the attr there never reaches them (the HEAD phantom-hook-never-set bug). Bind `:data-paper-field="shellFieldActive ? '' : null"`. | Critique-2 (verified the selector scope); `cards.css:70-120`, `liquid-morph.css:40-69` |
| **C8 (`.paper-field` delete — SURGICAL, grain survives)** | DELETE `paper.css:129-269` whole | **Surgical, NOT a blind line-span delete.** The terminal `@media (prefers-reduced-transparency: reduce)` block carries BOTH `.paper-field { --field-intensity: 0 }` AND `.paper-underpaint, .paper-grain-overlay::after { opacity: 0 }` — the GRAIN register PaperBackdrop BECOMES, which MUST survive. Delete ONLY the `.paper-field` rule, its `.dark .paper-field` arm, the `::before` cel-drift, `@keyframes field-cel-drift`, the `.paper-field`-specific PRT/PRM lines; PRESERVE the `.paper-underpaint`/`.paper-grain-overlay::after` PRM opacity rule. `proof:no-paper-field` asserts BOTH (`.paper-field` absent AND the grain register intact). Re-verify exact spans on disk (the line numbers have drifted before). | Critique-1 (verified the shared @media block); `paper.css` field region |

Plus the disk-corrected source facts (re-verified this pass):
- **`warm-field.ts` has TWO function-call consumers, not three** — `AppShell.vue:237` + `SectionLanding.vue:48`. `SectionPreviewCard.vue:167` is a COMMENT consuming the upstream-written `--card-field-h` CSS var; it never imports `warmFieldHue`. Any consumer-presence assert keys on the 2 real callers (+ optionally the CSS-var hand-off as a third, distinct, channel).
- **`.scroll-build`-token untangle is real** (`--scroll-build-rise` `scroll-tokens.css:32` read by `story-hero.css:549`+`:579`); `--scroll-build-step` (`:33`) is NOT shared (only `scroll-choreography.css:126`) → delete it with the recipe.
- **The skeleton + no-match branches are DEAD** — `main.ts` `router.isReady().then(mount)` + `/:pathMatch(.*)*`→`NotFound` make both unreachable; under the bare swap the 3-branch chain is replaced wholesale by the single keyed `<component>`. Delete both + their `Skeleton`/`Card` imports.
- **The W-CUT P10c "single-element-root for the AppShell route `<Transition>`" comments are MOOT under the bare swap** — with no `<Transition>` wrapper the `non-element root node that cannot be animated` Vue warning (`runtime-core` `:4638`) CANNOT fire at all (it is gated on a transitioning component). Reconcile the comment TEXT (trim the removed-Transition rationale) — a doc-hygiene micro-edit, NOT the pass-3 13-file comment-strip dance (that dance is dropped — P4-A's phantom finding stands and is strengthened: the bare swap removes the warning's only trigger).

---

## GESTALT GOAL

One shell, one atomic route-swap, one persistent field, one fit law — the cure is **subtraction**, the close is **PAINT**:

1. **ROUTE (M1)** — collapse the 4-mechanism pile to a **bare keyed `<component :is :key="route.path" class="route-enter"/>`** (NO `<Transition>`, NO Suspense, NO `v-if` chain), delete bloom-find-child + categoryId-VT + dead skeleton/no-match branches in ONE cut, plain-lazy (R1). Exactly 1 page root at every settle, by construction.
2. **FIELD (M2)** — retire `.paper-field` (surgical — grain survives) for ONE shell `<Aurora v-if="shellFieldActive">` with `vividness:0` + the EXPLICIT recessive C 0.05-0.09 palette + per-route `warmFieldHue`. `focal` **`background.kind`-derived** + a self-stage set. Never-2-contexts boundary rule. Monotonic exactly-one-GL.
3. **TOP BAR (M4)** — `scroll(nearest block)` (sticky child, verified) + hoist `transform-origin:0 50%; transform:scaleX(0)` UNCONDITIONAL so any timeline failure rests INVISIBLE.
4. **HERO (M5)** — ONE chassis title path (hero+intro) + `#title-ornament` slot + MANDATORY short `displayTitle` (P4-C); svh fit term as a short-viewport guard with FIXED est-lines:2; ≥display-4 floor at ≥768.
5. **HYGIENE (M0)** — `errorHandler` + `onInitError` everywhere; route-change focus management (P4-F); delete redundant confounders; KEEP `firstResolved`.

Every motion leg is compositor-only, carries iOS-27 liquid weight (spring-on-spatial enter overshoot / bezier-on-effects, fade-coupled-to-transform), PRM keeps-fade/drops-transform, paints Chrome AND Safari (NO native-VT dependency anywhere on the floor). The `<Aurora>` primitive + `--type-display-*` ladder are byte-untouched.

---

## MECHANISM (concrete)

### M1 — The route swap (D1/D9, the linchpin) — BARE KEYED ATOMIC SWAP

```vue
<!-- demo/layout/AppShell.vue — the ONE mechanism. NO Transition, NO Suspense, NO v-if chain, plain-lazy. -->
<RouterView v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" class="route-enter" />
</RouterView>
```

**Why the bare swap, not `<Transition mode="out-in">` (the decision-inverting call).** A keyed `<component>` swap is ATOMIC: vue patches the old-unmount + new-mount in ONE pass, so `<main>` carries exactly the new page at every settle — `children.length===2` (the `<component>` + the sticky scroll-progress bar), exactly 1 `<article>`, `h1===dest` **structurally, with no leave hook to wedge**. `mode="out-in"` re-introduces a leave window whose `transitionend`/`animationend` completion is the exact class the directive named as the C-ROUTE root cause (`.scroll-build` animation collides with the `<Transition>` leave so the leave hook never resolves → URL advances, page freezes, reload required). The bare swap removes the leave window entirely → the wedge is impossible. It is also the maximal-subtraction / gestalt-not-patch answer (one fewer mechanism than out-in) and is iOS-27-NavStack-idiomatic (the incoming view animates in; the outgoing is gone). REJECTED ALTERNATIVE: out-in (carries the wedge risk the spec exists to kill; only structurally-safe if the `.scroll-build` removal is total AND every transitioning root has exactly one CSS animation — a fragile invariant the bare swap doesn't need).

**The liquid enter is a pure on-mount `@keyframes`** (NOT a Vue `<Transition>` recipe — that recipe is vestigial under the bare swap and shipping a dead recipe violates no-legacy/no-dual-path). Mint in `transitions.css`:

```css
/* The iOS-NavStack vertical settle — SPATIAL spring enter, fade-coupled, on-mount, compositor-only. */
.route-enter { animation: gl-route-enter var(--spring-snappy-duration) var(--spring-snappy) both; }
@keyframes gl-route-enter {
    from { opacity: 0; transform: translateY(0.75rem); }
    to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
    .route-enter { animation: gl-route-fade var(--duration-fast) var(--ease-out) both; }  /* P6: keeps fade, drops transform */
    @keyframes gl-route-fade { from { opacity: 0; } to { opacity: 1; } }
}
```

> The `.route-enter` class lands on the keyed `<component>` in AppShell, so the entrance reaches EVERY route root (StoryPage, SectionLanding, hero, intro, auth-shell, NotFound) — the `.story-page-article`-only selector gap (it exists ONLY on `StoryPage.vue:72`, not SectionLanding nor other roots) is closed. The `both` fill-mode holds the from-state before the first animation frame so there is no flash-of-final-then-animate.

**(R1) Loader = PLAIN-LAZY, unchanged.** KEEP `manifest.ts` `import.meta.glob` (non-eager) → `() => import()`; KEEP `firstResolved` (`router.ts:81-90`, `typeof==='function'` filter). NO eager-glob (644.54 KB-gz regression), NO `defineAsyncComponent`, NEVER `<Suspense>` (pass-1 falsified, re-affirmed by the orchestrator brief). vue-router resolves the loader DURING navigation → the OLD page is HELD mounted throughout the async load → the atomic swap lands on the REAL resolved component, never a void.

**The deletions (clean break, `proof:no-dual-path` / `proof:route-confounder`):**
- the `<Transition name="fade-slide">` wrapper (`AppShell.vue:405`) + the 3-branch `v-if`/`v-else-if` chain (`:404-426+`) → the single keyed `<component>`.
- the no-match `<Card>` branch + its `Card` import (`:15`) — dead (`NotFound` catches `/:pathMatch`).
- the matched-pending `<SectionLandingSkeleton>`/`Skeleton` branch + the `Skeleton` import (`:29`) — dead (`router.isReady().then(mount)` + held-old-page leaves no in-shell async window).
- `useBloomUp` IMPORT (`:30`) + `skeletonEl`/`routeContentEl`/`skeletonWasShowing` refs + the bloom find-child `watch` (`:255-303`). **`useBloomUp` the LEAF stays** (published, `AppleMusic.vue:30` consumer — only the AppShell route-bloom USAGE dies).
- the categoryId no-op `startViewTransition` + the dead `document.documentElement.dataset.categorySwitch` write (`:205-228`, 0 readers).
- **KEEP** `toggleShellMorph`'s `startViewTransition` (`:127-131` — functional dock-morph; moves WITH the WS2 morph-stage carve). **KEEP** `firstResolved`.
- the scroll-reset `watch` re-axes off `route.fullPath` onto `route.path` (`:196`) — ONE scroll-reset owner; the `route.path` reset lands on the new atomic mount (no race — there is no leave window to race).

**`.scroll-build` RETIRES WHOLESALE — UNTANGLE the shared token FIRST:**
- Remove the class from `StoryPage.vue:72` + `SectionLanding.vue:85` (the only 2 consumers).
- **Mint `--story-hero-rise: 1.5rem`** (`scroll-tokens.css`), re-point `story-hero.css:549` + `:579`, **THEN** delete the orphaned `--scroll-build-rise` (`scroll-tokens.css:32`). Delete `--scroll-build-step` (`:33`) WITH the recipe (only `scroll-choreography.css:126` reads it).
- Delete the dead recipe: `scroll-choreography.css:102-160` (`gl-page-build`/`-fade`/`.scroll-build > *`/`.scroll-build-hero`), the `story-hero.css:534-579` hero-coupled `.scroll-build` RULES (keep the re-pointed keyframes), the `liquid-enter.css:14` "Bug B" fence (do the subtraction, never re-fence).
- Re-point the showcase (`motion/scroll-choreography.vue:68`, `manifest.ts:1081`) to `.scroll-cascade`. KEEP `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`.

**Reconcile the W-CUT P10c comments** (`StoryPage.vue:64`, `SectionLanding.vue:80`, `hero.vue`, `intro.vue`, `auth-shell.vue`, the chassis SFCs): TRIM the "single-element root for the AppShell route `<Transition>`" rationale (the `<Transition>` is gone; the requirement no longer exists). This is a doc-hygiene text edit, NOT a structural strip — the single-root requirement evaporates with the wrapper. `proof:route-single-root` is re-scoped (below) to a HYGIENE assert, not a #7956 protection.

**`proof:route-single-root` (re-scoped — device-free).** With no `<Transition>`, the `cannot be animated` warning cannot fire, so the gate is a structural-hygiene assert, not a phantom protector: for every `import.meta.glob` routed module, parse `<template>` and assert ≤2 top-level sibling ELEMENTS where a keyed-swap multi-root is acceptable (Vue renders a keyed multi-root component as a fragment without warning when un-transitioned) — narrowed to flag a GENUINE pathology (a routed root that is text-only or teleport-only, which would break the `.route-enter` class application + the `main.children===2` assert). Planted bite: a synthetic text-root routed module MUST flag. **AST-verified empty on the current tree** (all 129 routed SFCs have an element root; `NotFound`'s as-child `<Button>` is ONE element).

**(P4-F) Route-change focus management (NEW).** On route settle (`router.afterEach`), move focus to `<main>` (`tabindex="-1"`) OR announce the new page title via an `aria-live="polite"` region — the deleted skeleton's `aria-busy` is gone; the atomic swap strands focus at `<body>`. The aria-live region doubles as the SR route-change signal (zero-route-change-signal-for-AT gap closed).

### M2 — The field: ONE shell aurora, `background.kind`-derived focal, vividness:0 recessive (D2/C-FIELD + one-GL law)

```vue
<!-- on the shell CONTENT ANCESTOR of <main> (NOT the Aurora sibling) -->
<div class="relative flex h-screen" :data-paper-field="shellFieldActive ? '' : null">
  ...
  <Aurora
      v-if="shellFieldActive"
      :config="shellAuroraConfig"
      :opacity-ceiling="0.5"
      :on-init-error="onShellAuroraError"
      class="fixed inset-0 -z-10 shell-aurora"
      aria-hidden="true"
  />
  ...
  <main tabindex="-1"> ... </main>
</div>
```

1. **`shellFieldActive = !destinationOwnsFocalGL`, flipped in `router.afterEach`** (the committed route, NOT the live `route.meta.focal` computed). The **NEVER-2-CONTEXTS rule:** across non-focal→non-focal the boolean stays `false→false` so the node PERSISTS (no reparent — the WebKit canvas-move-loses-context constraint never bites; the per-route hue re-uploads on the persisted node). At a content↔focal boundary the flip coincides with the bare swap's atomic unmount/mount patch; the explicit warm `oklch(L C H / 0)` zero-stop CSS-gradient fallback (M2.6) covers any ≤1-frame sub-frame gap. `onBeforeUnmount → useAurora.dispose() → loseContext()` on the shell node. **Monotonic exactly-one-GL by construction — the binding LIVE capture is the only proof the content↔focal transient never holds 2 contexts on Safari's per-window budget (named insufficiency).**
2. **Per-route hue WITHOUT re-mount.** `shellAuroraConfig` is a `computed` driven by `warmFieldHue(route.meta.categoryId)`; non-focal navs re-upload the hue uniform on the PERSISTED node (Aurora's deep config watch).
3. **The MATERIAL is recessive — the EXPLICIT C 0.05-0.09 palette + `vividness:0` (BOTH mandatory).** `vividness:0` neuters the shader re-pigment floor (`aurora.frag.ts:373-385`, `VIVID_TARGET 0.115` re-pigments every pale fragment to C≥0.115 whenever `uVividness>0.0001`) — **but it does NOT lower the base palette chroma**, so a hue-rotation of the C 0.16/0.13/0.095 `DEFAULT_AURORA_CONFIG` palette would still paint C>0.10 at the worst-cool sand projections. Mint `shellAuroraConfig(hue)` in `aurora-hero.ts` = the calm band (`breathPeriod:48`, low `nucleiDrift:0.012`/`paletteDrift:0.012`, `saturation:0.95`) + **`vividness:0`** + an **EXPLICIT recessive C 0.05-0.09 palette** (NOT spread-DEFAULT) + the per-route `warmFieldHue`. Prototype-3 measured this combo at OKLab C max **0.069** (32% under the 0.10 ceiling) at the worst-cool hues (motion 85° / data 88°), meanLum ~0.62 → "sunrise behind frosted glass", NO conic foil slab, NO brown, NO speckle. (The "lift chroma only for 80-95° sand" caveat is likely UNNEEDED at 0.069; keep as a documented escape only if a live capture reads grey.)
4. **`route.meta.focal` is `background.kind`-DERIVED, not an AST walk, not a hand-list.** The focal signal already exists on disk: `StoryHero.vue:199-207` computes `fullBleed = kind ∈ {aurora,constellation,fourier,liquid-grid}` from the manifest `background` descriptor (`manifest.ts:373-388` resolves `opts.background ?? CATEGORY_DEFAULT_BG[cat]`). The unified resolver:

   ```ts
   // demo/router.ts (or a tiny demo/stories/focal.ts leaf)
   const GL_BG_KINDS = new Set(["aurora", "constellation", "fourier", "liquid-grid"]);
   // Routes that mount a route-dominant GL canvas OUTSIDE the `background` channel:
   // the DockStage-hoisted shared aurora + the morph-showcase functional aurora.
   // Grep-derived (committed bite): `grep -rln "<DockStage" demo/stories/dock/` ∪ {dock/morph-showcase}.
   const SELF_STAGES_GL = new Set([/* dock/overview, dock/layers, dock/dock-gallery,
       dock/dock-search, dock/cta-receive, dock/morph-showcase, ... */]);
   export function isFocalRoute(row): boolean {
     const bg = resolveBackground(row);                      // same opts.background ?? CATEGORY_DEFAULT_BG
     const kind = typeof bg === "string" ? bg : bg.kind;
     return GL_BG_KINDS.has(kind) || SELF_STAGES_GL.has(row.id);
   }
   ```

   Contained specimens (`buttons.vue`/`card.vue` mount an aurora INSIDE a rounded card — `StoryHero.vue`'s `StoryBackgroundKind` deliberately EXCLUDES the contained `blob`/specimen case) are NOT focal → the shell field correctly stays behind their card (the bare-canvas-void / forced-2-GL trap the import-graph walk would have triggered is avoided). `manifest.ts:153-158`'s ad-hoc "drop to paper to avoid a 2nd GL" hack folds INTO `SELF_STAGES_GL` / the resolver. Honest framing (Critique-4): focal is derived from TWO declarative sources (the route's `background.kind` + the explicit `SELF_STAGES_GL` set), UNIFIED behind ONE `isFocalRoute` resolver — NOT "one source of truth," NOT a hand-list, NOT an AST walk.

   **`proof:focal-complete` (CONSISTENCY gate, device-free):**
   - C1: every `focal:true` route resolves to a GL `background.kind` OR is in `SELF_STAGES_GL` (no focal-without-a-field).
   - C2: `SELF_STAGES_GL` ⊇ a committed grep of `<DockStage` over the routed SFCs (a SELF-STAGE route that mounts GL outside `background` MUST be in the set — closes the silent "add a DockStage route → shell + DockStage = 2 GL" drift). The grep is a COMMITTED subprocess bite, not a manual one-off.
   - C3: every route whose resolved `background.kind ∈ GL_BG_KINDS` is focal (the resolver is total).
   - Planted bite: drop a route from `SELF_STAGES_GL` while it still greps `<DockStage` → C2 exit 1.
   - **NAME the insufficiency:** this proves ENUMERATION CONSISTENCY, NOT the runtime one-GL law (the async-dispose/WebKit-budget race can leave 2 live contexts while it greens). **The close hinges on the LIVE monotonic-GL capture, never this gate alone.**
5. **The 2nd/3rd field systems RECONCILE onto the shell.** StoryHero retires its per-page full-bleed `<Aurora>`/`<Constellation>`/`<FourierField>`/`<PaperGrid>` on NON-focal routes (the shell IS the field); keeps the per-page focal mount ONLY for genuinely-focal viz-demo rows (where `fullBleed===true`). DockStage keeps its own functional aurora (its routes are in `SELF_STAGES_GL` → shell suppressed → 1 GL). The static `grid`/`paper` page-backgrounds collapse onto the shell aurora; grain demotes to OPT-IN (W-PAPER-GRAIN-OPTIN).
6. **Aurora's shipped machinery is composed, not forked** — `useIntersectionPause`, live-PRM one-static-frame-then-park, the software-raster `auroraFallbackGround` guard, the sub-2×-DPR wash cap (so `proof:offscreen-pause` + `proof:perf-producer` stay GREEN). CSS-gradient fallback uses explicit `oklch(L C H / 0)` zero-stops (never bare `transparent` — WebKit premultiply hole), plain `.dark` per-mode arms. The dispose→re-arm on focal-return shows the gradient fallback one frame — verify it reads warm, no black flash.
7. **(P4-F WCAG 2.2.2)** the sub-perceptual `vividness:0` + minimal drift reads non-animated ("sunrise behind frosted glass") → satisfies 2.2.2 by being effectively static; NO pause control needed on the shell field (document the decision; the in-`/substrates` + DockStage focal auroras keep their `DockBackgroundToggle`).

**M2 is a COMPLETE clean break (no-legacy), SURGICAL on the grain:**
- **DELETE** the `.paper-field` recipe + `.dark .paper-field` arm + the `::before` cel-drift + `@keyframes field-cel-drift` + the `.paper-field`-specific PRT/PRM lines (`paper.css` field region) **+ the `@property --field-h-raw` / `--field-intensity` regs (`property-regs.css:233-244`, dead after the props strip)** and the `field`/`fieldHue`/`fieldIntensity`/`fieldStyle` props + the field `<div>` from `PaperBackdrop.vue` (29-75) → pure grain register. **PRESERVE** the `.paper-underpaint, .paper-grain-overlay::after { opacity: 0 }` PRM rule (the grain register — it sits in the SAME terminal `@media (prefers-reduced-transparency: reduce)` block as `.paper-field { --field-intensity: 0 }`; a blind line-span delete orphans/clobbers it). Re-verify exact spans on disk before cutting.
- **`proof:no-paper-field` (SOURCE assert, NEW):** the `.paper-field` recipe ABSENT **AND** the props/`fieldStyle` ABSENT **AND** the @property regs ABSENT **AND the grain register (`.paper-underpaint`/`.paper-grain-overlay::after`) PRESENT** (a tag-presence-only gate greens over a props delete; a blind delete reds the grain-survival arm).
- KEEP the `data-paper-field` DOM hook **on the shell content ANCESTOR** (load-bearing — `cards.css:70-120` opaque-fallback suppressor + `liquid-morph.css:40-69` ambient-tint seam are DESCENDANT selectors reading the ATTR; the HEAD phantom-hook-never-set bug is FIXED by the attr landing on an ANCESTOR of the cards). Do NOT delete the separate `--field-h` register on `select.css`/`SectionPreviewCard.vue` (distinct writer).
- Re-point `proof:` references off `paper-field`/`scroll-progress-scroller` (`proof-ba-animate.mjs`, `gates.mjs`, `ba-animate.spec.ts`).

### M3 — The duplicated warm-projection fold (D2 rider, BG.W-FIELD-ACCENT-RECONCILE)

`warm-field.ts` (`SECTION_HUE_DEG[13]` + `projectWarm` + `clampWarm` + `warmFieldHue` + the DEAD `warmFieldHueMap`) is a verbatim parallel of `aurora-hero.ts` (`SECTION_COLOR_OKLCH[13]` + `warmProjectHue` + same-named `clampWarm`, same `[25,95]` band). **Both `projectWarm` and `warmProjectHue` ALREADY carry the reds-floor (`→38`) + warm-wedge passthrough** (verified `aurora-hero.ts:96-102` — the pass-4 "warmProjectHue LACKS the branches" claim is FALSE and is deleted). **Fold (LAND it — the exports must EXIST for the gate to run):**
- export `warmProjectHue` + `SECTION_COLOR_OKLCH` + add+export `sectionHueDeg(idx) = cssToOklch(SECTION_COLOR_OKLCH[((idx%13)+13)%13]).h` (precomputed ONCE into a `const SECTION_HUE_DEG_DERIVED = SECTION_COLOR_OKLCH.map(s => cssToOklch(s).h)`, not per-call) on `aurora-hero.ts`.
- collapse `warm-field.ts` to the ~12-line adapter `warmFieldHue(id) = warmProjectHue(sectionHueDeg(categoryHue(id)))`; DELETE the dup `SECTION_HUE_DEG` table + `projectWarm` body + `clampWarm` dup + the dead `warmFieldHueMap` (grep-confirmed 0 consumers).
- PRESERVE the TWO real `warmFieldHue` call consumers (`AppShell.vue:237`, `SectionLanding.vue:48`) — NOT three (`SectionPreviewCard.vue:167` is a `--card-field-h` CSS-var comment, never imports `warmFieldHue`).
- Rewire `useGlassBackdropLuminance` to sample the live SHELL canvas.
- **(P4-G hue-PARITY pre-assert, FOLDED INTO `proof:field-accent-reconcile`, NOT a vitest test):** a `proof:*` gate (it must run in the `gates.mjs --run` battery — a vitest test does NOT) asserts `cssToOklch(SECTION_COLOR_OKLCH[i]).h === SECTION_HUE_DEG[i]` for all 13 indices within a tight epsilon (Prototype-6 measured 0.0000°; epsilon 0.5° is generous), single-source-of-warm-hue (one `warmProjectHue`), 2-consumer presence (the 2 real callers + optionally the `--card-field-h` CSS-var channel), and AA over the aurora both modes. Run end-to-end against the POST-fold tree (vue-tsc clean + the gate green against the REAL exports — Prototype-6 only proved an inline-transcribed copy; the actual exports must land).

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

- **`.demo-scroll-progress` is a `position:sticky` CHILD of `.demo-main-scroller`** (`dock-nav.css:230-232`), so `scroll(nearest block)` resolves to that scroller. The HEAD bug: `scroll(var(--scroll-progress-scroller,root) block)` with `--scroll-progress-scroller: --demo-main-progress` substitutes a `<dashed-ident>` into `scroll()`'s scroller slot → INVALID → `animation-timeline` computes to `auto` → keyframe resolves to `scaleX(1)` full-width (the confirmed D5 defect, commit `879c0c41`).
- Hoist `transform-origin:0 50%`+`transform:scaleX(0)` UNCONDITIONAL; drop the `opacity:0.85` rest (`dock-nav.css:248`). Drop `--scroll-progress-scroller`; `.demo-scroll-progress { --scroll-progress-timeline: scroll(nearest block); }`. Reserve named-timeline + `timeline-scope` for `scroll-vt.vue` (the genuine cross-element case). `animation-timeline` stays declared AFTER the `animation` shorthand (it is RESET-ONLY inside the shorthand).
- **Gate reads the COMPUTED value** (`animationTimeline !== 'auto'`, `animationRange`), never the declared string (the D14 silent-degrade lesson). Assert full-value-var + NO `scroll(var(` substring + a GLOBAL `scroll(\s*--` scan over `src`+`demo` (incl. `scroll-vt.vue`, currently unscanned) + a planted bite.
- **DE-CONFOUND grows-on-scroll in the π:** read `bar.getAnimations()[0].currentTime` + a screenshot bbox-width delta at scroll-top vs scrolled — NOT `getComputedStyle(transform)` (unreliable for compositor scroll-linked anims on WebKit).
- Reconcile the stale prose (`AppShell.vue:385-393`, `dock-nav.css:185-199`/`246-248`, `scroll-driven.css:33-35`). **(liquid law)** add a spring-eased trailing-glint on the fill edge ONLY AFTER the scaleX(0)-rest π passes.

### M5 — The hero fit: ONE chassis path + svh guard + MANDATORY displayTitle (D10, BG.W-HERO-FIT)

**Root cause:** `hero.vue`/`intro.vue` hand-author `<h1 class="text-display-{hero,mega} max-w-5xl">` via `:hero-title="false"` and bypass the chassis cap; `max-w-5xl` MANUFACTURES the wrap; the audacious rung wins on wide viewports (244.8px / 157% svh@1440, live-confirmed). The Δ3 "collision" is a PHANTOM (display-4@1440=86.1px, svh-term@est5=101.7px above it).

1. **ONE chassis title path with a `#title-ornament` slot — `hero.vue` + `intro.vue` ONLY (R4).** Retire `:hero-title="false"` + the bare `<h1>` (clean break); render through `.story-hero-title[data-hero-scale]` with a `#title-ornament` slot PRESERVING the bespoke eyebrow + ℱ wordmark + blurb. Drop `max-w-5xl`. **auth-shell KEEPS its bespoke title** (display-1, never viewport-dominating); NO change.
2. **(P4-C) MANDATORY short `displayTitle`.** Author SHORT wordmark/phrase `displayTitle`s (≤~7ch) for `/compositions/hero` + `/foundations/intro` so the 375 no-hyphenation π passes (the 38-char sentence wraps 3 lines + hyphenates otherwise — the svh est-lines:2 backstop is near-INERT for normal viewports, so this is the LOAD-BEARING fix, not the svh term). The chassis `<h1>` renders `displayTitle ?? title`; nav/breadcrumb/search KEEP the semantic `title` (verify all 3 read `.title`).
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

4. **(R3) `--story-hero-est-lines` FIXED `2`, NO ResizeObserver.** The primary cap is routing through the chassis (display-4 rung + drop `max-w-5xl`); the svh term is a short-viewport guard. Single-source the line factor (`--story-hero-cpl` ≡ `HERO_CHARS_PER_LINE`).
5. **The ≥4 rung floor is a REGRESSION GUARD at ≥768 only (R2).** The dual-bound π asserts `block ≤ 0.62svh` AND `font-size ≥ computed(display-4)` at ≥768; at 375 it asserts NO hyphenation + NO horizontal overflow for the longest `displayTitle`. NO `--type-display-*` edit.

### M0 — Hygiene (folds into W-ROUTE-TRANSITION — NOT the cure)

```ts
// demo/main.ts
app.config.errorHandler = (err, _instance, info) => { console.error("[demo] app error", info, err); };
```

- Thread `onInitError` into EVERY Aurora mount (11 today only `liquid-playground` handles it): shell field, `StoryHero.vue:267`, `DockStage.vue:59`, `KonamiAurora.vue:48`, `buttons.vue:76`, `card.vue:147/303`, `glass-panel.vue:60`, `auth-shell.vue:58`, `rail.vue:80`, `overview.vue:626`.
- Correct the false docstring at `useAurora.ts:191`.
- **(P4-F) Route-change focus/announce** (see M1) — the `aria-live="polite"` region + `<main tabindex="-1">` focus on settle.
- DELETE the redundant window `scrollBehavior:()=>({top:0})` (`router.ts:73` — double-fires the AppShell `route.path` reset). **KEEP** `firstResolved` (`router.ts:81-90`).
- Gate: `proof:route-confounder` (device-free + a self-test bite — the four deleted mechanisms ABSENT: `<Transition name="fade-slide">`, the bloom find-child watch, the categoryId-VT/`dataset.categorySwitch`, the skeleton/no-match branches).

---

## FILES TOUCHED

| file | change |
|---|---|
| `demo/layout/AppShell.vue` | M1 cut (bare keyed `<component :is :key=route.path class=route-enter>`, 3-branch+Transition delete, bloom/categoryId-VT/skeleton/no-match-Card delete, scroll-reset re-axis to `route.path`); M2 shell `<Aurora v-if=shellFieldActive>` replaces `<PaperBackdrop field>`, `data-paper-field` on the CONTENT ANCESTOR; M0 onInitError + route-change focus/announce; stale-prose reconcile; W-CUT comment-text trim. **Coordinate with WS2** (morph-stage carve, same 860-line file — ONE integration commit or strictly sequence). |
| `demo/main.ts` | M0 `app.config.errorHandler`. |
| `demo/router.ts` | M1 the `isFocalRoute` resolver + the `shellFieldActive` afterEach ref; M2 thread `meta.focal`/`meta.categoryId`; DELETE redundant window `scrollBehavior`; **KEEP** `firstResolved`. |
| `demo/stories/manifest.ts` | KEEP plain-lazy; M2 the `background.kind`-derived `focal` + `SELF_STAGES_GL` (P4-B converged, no hand-list, no AST walk); M5 MANDATORY short `displayTitle` for hero/intro + optional `estLines`. |
| `demo/stories/focal.ts` (NEW, optional leaf) | M2 the `isFocalRoute` resolver + `GL_BG_KINDS` + `SELF_STAGES_GL` (or co-locate in router.ts). |
| `src/styles/transitions.css` | M1 mint the `.route-enter` mount `@keyframes gl-route-enter`/`gl-route-fade` (NOT a Vue `<Transition>` recipe — no `.route-liquid-*`). |
| `demo/stories/StoryPage.vue`, `demo/stories/SectionLanding.vue` | M1 drop `.scroll-build` from the article roots; trim the W-CUT comment rationale. |
| `src/styles/tokens/scroll-tokens.css` | M1 **untangle FIRST** — mint `--story-hero-rise`, re-point hero keyframes, THEN delete `--scroll-build-rise`; delete `--scroll-build-step` with the recipe. |
| `src/styles/scroll-choreography.css`, `demo/stories/story-hero.css`, `src/styles/liquid-enter.css` | M1 DELETE the dead `.scroll-build` recipe + hero-coupled rules + the "Bug B" fence (after the untangle). |
| `demo/stories/motion/scroll-choreography.vue`, `manifest.ts:1081` | M1 re-point the showcase to `.scroll-cascade`. |
| `src/styles/paper.css` | M2 **SURGICAL delete** of `.paper-field` (recipe + `.dark` + `::before` cel-drift + `@keyframes` + the `.paper-field`-specific PRT/PRM lines); **PRESERVE the `.paper-underpaint`/`.paper-grain-overlay::after` PRM grain rule**. Re-verify spans on disk. |
| `src/styles/tokens/property-regs.css` | M2 DELETE `@property --field-h-raw` / `--field-intensity` (233-244, dead). |
| `src/components/custom/paper-backdrop/PaperBackdrop.vue` | M2 STRIP `field`/`fieldHue`/`fieldIntensity` props + `fieldStyle` + the field div (29-75) → pure grain register. |
| `demo/stories/aurora-hero.ts` | M2 mint `shellAuroraConfig(hue)` (vividness:0 + EXPLICIT recessive C 0.05-0.09 palette); M3 export `warmProjectHue` + `SECTION_COLOR_OKLCH` + `sectionHueDeg` (precomputed table). |
| `demo/stories/warm-field.ts` | M3 collapse to a ~12-line adapter; DELETE dup table/`projectWarm`/`clampWarm`/`warmFieldHueMap`. |
| `src/styles/scroll-driven.css`, `demo/layout/dock-nav.css` | M4 unconditional scaleX(0) floor + `scroll(nearest block)` + drop `--scroll-progress-scroller` + drop `opacity:0.85` rest + prose. |
| `demo/stories/motion/scroll-vt.vue` | M4 migrate to named-timeline + `timeline-scope`. |
| `demo/stories/story-hero.css`, `demo/stories/StoryHero.vue` | M2 retire per-page full-bleed viz on non-focal routes; M5 svh guard + FIXED est-lines:2 + `#title-ornament` slot + `displayTitle` render. |
| `demo/stories/compositions/hero.vue`, `foundations/intro.vue` | M5 retire `:hero-title=false` + bare `<h1>` → chassis path + MANDATORY short `displayTitle`; trim W-CUT comment rationale. |
| `scripts/proof-*.mjs`, `tests-visual/*.spec.ts`, `scripts/gates.mjs`, `package.json` | re-point `paper-field`/`scroll-progress-scroller`; **REGISTER** NEW `proof:route-single-root` (hygiene re-scope), `proof:focal-complete` (background.kind-consistency + the `<DockStage` grep bite), `proof:no-paper-field` (recipe-absent + grain-survives), `proof:route-confounder`, `proof:field-accent-reconcile` (hue-parity + single-source + 2-consumer + AA); re-point `proof-ba-animate.mjs` `PAGE_ENTER_RECIPES` to assert the `.route-enter` mount `@keyframes` (NOT a removed `<Transition name>`); harden `proof:ba-animate`. |

> **NOTE the FILES-TOUCHED is SMALLER than pass-3** — the 13-file comment-strip set is GONE (P4-A phantom, strengthened: the bare swap removes the warning's only trigger), the AST-walker subsystem is GONE (P4-B converged to `background.kind`), the `.route-liquid-*` Vue-transition recipe is GONE (bare swap → on-mount `@keyframes`). The headline simplification.

---

## WAVE BREAKDOWN — each with its mechanism + the BINDING real-paint-π

> **Every π is a FRESH LIVE capture by a NON-AUTHORING agent, Chrome AND real Safari/WebKit, REAL GPU, on `:5199`. "rides W-REFLECT3" is SCRUBBED (no W-REFLECT3 in BG). `proof:ba-gestalt` carries no WS1 verdict (hardcoded BC roster) until WS7's `BG.W-GESTALT-REPOINT`. Playwright-WebKit has NO WebGPU → run the WebGPU probe on chromium.**

### 1. `BG.W-ROUTE-TRANSITION` — the linchpin (blocks all SPA paint-verify)
Bare keyed atomic swap (`<component :is :key=route.path class=route-enter>`) + 3-branch+`<Transition>` delete + bloom/categoryId-VT/`dataset.categorySwitch`/no-match-Card/skeleton-import delete; **W-CUT comment-text trimmed** (the `<Transition>` rationale is moot); `proof:route-single-root` re-scoped to a hygiene assert; mint the `.route-enter` on-mount `@keyframes`; `.scroll-build` retire (untangle FIRST); PLAIN-LAZY; KEEP `firstResolved`+`toggleShellMorph`VT+the ONE scroll-reset owner; route-change focus/announce (P4-F); + M0. **Device-free gates:** `proof:route-confounder` + `proof:route-single-root` (hygiene, planted-bite) + the bare keyed `<component :key=route.path>` present + `<Transition name="fade-slide">` + bloom + categoryId-VT ABSENT + the `.route-enter` mount-`@keyframes` in `PAGE_ENTER_RECIPES`. **BINDING π:** the **5-nav-<300ms burst** → at +60/+360/+1260ms: **`main h1.textContent === last-dest title`** (PRIMARY; page-root identity where h1-less) AND **`main.children.length === 2`** AND **no orphan stale-heading node** AND **monotonic allocated-GL===1** (live-context canvases at SETTLE); + a **TRANSITION-FIDELITY** mid-frame assert on the REAL page (the `.route-enter` rise+fade runs); + a **leading-comment-root hop** (`/compositions/hero`, `/substrates/aurora`) asserting NO white-screen + NO console error; PRM keeps-fade/drops-transform; route-change focus lands on `<main>`/h1; Chrome AND Safari/WebKit, real GPU. DELTA vs `category-card-waste.png`/`morph-modal.png`.

### 2. `BG.W-FIELD-AURORA` — lands WITH #1 (★★★ material reversal + the one-GL law)
retire `.paper-field` SURGICALLY (recipe+@property regs+props out; grain PRESERVED; `proof:no-paper-field` recipe-absent+grain-survives); ONE shell `<Aurora v-if="shellFieldActive">` (C6 never-2-contexts afterEach-gate) + `dispose`; `data-paper-field` on the CONTENT ANCESTOR (C7); **`background.kind`-derived `meta.focal`** (C2) + `SELF_STAGES_GL` + section-landing cross-check; reconcile StoryHero+DockStage; `shellAuroraConfig` = calm band + **`vividness:0`** + **EXPLICIT recessive C 0.05-0.09 palette** (C5) + `warmFieldHue`; 2.2.2 sub-perceptual-drift decision (P4-F). **Gates:** `proof:offscreen-pause`+`proof:perf-producer` un-regressed + `proof:no-paper-field` + `proof:focal-complete` (background.kind-consistency + `<DockStage` grep bite; runtime-insufficiency NAMED). **BINDING π (the LIVE monotonic-GL capture is the close):** the **getContext-instrumented oracle** (canvases with `isContextLost()===false` + `isConnected`, NOT raw `<canvas>` tags; sample at SETTLE +360/+1260ms) → **`glContextCount(allocated)===1`** on every non-substrate route AND on a content→substrate→content round-trip AND **content→dock(DockStage)→content** + the 5-nav burst (no monotonic leak, no double-allocate on focal) + **a content→focal mid-transition field-continuity** assert (no 1-frame black/void gap — C6); **calm warm aurora — NO conic sheen, NO C>0.10 brown, NO visible speckle** at ≥3 hues incl. the WORST cool (motion 85° / data 88°) BOTH modes; glass clears AA at `opacityCeiling 0.5` BOTH modes **WITHOUT `contrast-color()`** (text-free bg patch + actual painted text color). DELTA vs `hero-broken.png`/`category-card-waste.png`. **The 2-live-context transient is the named Safari per-window-GL-budget falsifier — zero real-WebKit evidence today.**

### 3. `BG.W-SCROLL-PROGRESS-RAIL` — independent (parallel with #1)
hoist `transform-origin:0 50%`+`scaleX(0)` UNCONDITIONAL; SHELL bar → `scroll(nearest block)`; reserve named-timeline+`timeline-scope` for `scroll-vt.vue`; drop `--scroll-progress-scroller` + the `opacity:0.85` rest; `animation-timeline` declared AFTER the shorthand. Gate reads COMPUTED `animationTimeline`/`animationRange` + full-value-var + NO `scroll(var(` + GLOBAL `scroll(\s*--` scan + planted bite + re-point `proof:ba-animate`/`ba-animate.spec.ts`. **BINDING π (de-confounded):** `animationTimeline !== 'auto'` + `scaleX(0)` at scroll-top EVERY route + **GROWS via `getAnimations()[0].currentTime` + bbox-width delta** (NOT `getComputedStyle`) + a scroll-timeline-DISABLED engine resting `scaleX(0)`. Chrome AND Safari. DELTA vs `top-bar.png`.

### 4. `BG.W-FIELD-ACCENT-RECONCILE` — depends on #2
M3 fold LANDED (export `warmProjectHue`+`SECTION_COLOR_OKLCH`+`sectionHueDeg` precomputed; collapse `warm-field.ts`; PRESERVE the 2 real consumers; rewire `useGlassBackdropLuminance` to the shell canvas). **(P4-G) hue-PARITY pre-assert FOLDED into `proof:field-accent-reconcile`** (a `proof:*` gate in the `gates.mjs` battery — NOT a vitest test): cssToOklch parity for 13 indices (ε 0.5°, measured 0.0000) + single-source-of-warm-hue + 2-consumer presence + AA over the aurora both modes; run end-to-end against the POST-fold tree (vue-tsc clean + green against REAL exports).

### 5. `BG.W-PAPER-GRAIN-OPTIN` — depends on #2
Demote universal `.paper-underpaint` 0.22 grain → per-surface opt-in; `PaperBackdrop` → pure grain register; re-tune opt-in opacity sub-JND. **Gate:** no universal grain mount + grain tokens intact (the grain register PRESERVED by `proof:no-paper-field`'s grain-survival arm).

### 6. `BG.W-HERO-FIT` — depends on #1
ONE chassis title path (hero+intro) + `#title-ornament` + **MANDATORY short `displayTitle`** (P4-C); svh short-viewport guard + FIXED est-lines:2; ≥4 rung floor at ≥768; drop `max-w-5xl`. NO `--type-display-*` edit. **BINDING π (375/768/1440/1920, BOTH modes, both engines; titles read from `manifest.ts`):** rendered `<h1>` BLOCK **≤~0.62×svh** for the longest `displayTitle ?? title`; **`font-size ≥ computed(display-4)` at ≥768** (at 375: NO hyphenation + NO overflow); **≥1 preview card above the fold at 1440×820** on `/compositions/hero` + every hero page. DELTA vs `hero-broken.png`.

### 7. `BG.W-VT-ROUTE-ENHANCE` — DEFERRED/OPTIONAL, gated on #1 green
drive `router.push` through the SHIPPED `navigate()` with `types:['forward'|'back']` behind `supportsRouteTransitions()`; per-engine degrade to the bare-swap floor; NEVER concurrent. **GOTCHA if it lands:** exclude the persistent shell `<Aurora>` from the VT snapshot (`view-transition-name: none`) or it double-captures + crossfade-flashes. (Under the bare swap the floor is already atomic + correct; VT is purely additive polish.)

---

## ACCEPTANCE / REAL-PAINT-π BAR (the close condition)

> **C-PAINT (binding):** headless-green/visually-broken shipped 3×. Every WS1 acceptance is a FRESH LIVE capture by an agent who did NOT author the build, Chrome AND a real Safari/WebKit context, REAL GPU, `:5199`. The build agent must NOT capture its own acceptance.

**Routing:** ≥6 cross-category hops → `main h1.textContent === dest title` (page-root identity where h1-less) + `main.children.length===2` + no orphan stale-heading. 5-nav-<300ms burst → `main h1 === LAST-dest` + `children===2` + monotonic allocated-GL===1 (live-context, SETTLE) + TRANSITION-FIDELITY mid-frame (the `.route-enter` rise+fade). A leading-comment-root hop renders (no white-screen, no console error). Route-change focus lands on `<main>`/h1. Chrome AND Safari, real GPU. No reload. PRM keeps-fade/drops-transform.

**Field:** every non-substrate route paints a calm warm AURORA — NO conic, NO C>0.10 brown, NO visible speckle; per-route hue; glass clears AA both modes at `opacityCeiling 0.5` WITHOUT `contrast-color()` (text-free patch). Verified at motion 85° / data 88°. `glContextCount(allocated)===1` on every non-substrate route AND a content→substrate→content AND content→dock(DockStage)→content round-trip + a content→focal mid-transition field-continuity (no gap). Real GPU (Safari budget bites first).

**Top bar:** `animationTimeline !== 'auto'`; `scaleX(0)` at scroll-top EVERY route; GROWS on scroll (de-confounded: `getAnimations().currentTime` + bbox-width delta); a scroll-timeline-DISABLED engine rests `scaleX(0)`. Chrome AND Safari.

**Hero:** `<h1>` block ≤~0.62×svh at 375/768/1440/1920 BOTH modes (longest `displayTitle ?? title`); `font-size ≥ computed(display-4)` at ≥768; at 375 NO hyphenation + NO overflow; ≥1 preview card above the fold at 1440×820 every hero page.

**First-paint (C4):** plain-lazy is the LANDED loader. `proof:lighthouse` first-paint CONFIRMATORY un-regressed — the shell-`<Aurora>` import is a +50-byte phantom (`aurora.js` already eager via `KonamiAurora`), NOT the prior "#1 risk." Lazy-mount-past-first-paint is a documented escape only.

Capture DELTAs (screenshot + paired-π) against `hero-broken.png` / `top-bar.png` / `category-card-waste.png` / `morph-modal.png` — never a commit-message claim. **(R8) These 4 evidence PNGs do NOT exist in-repo** — the capture agent establishes the BROKEN baselines (from HEAD @879c0c41) BEFORE the fix capture, or the orchestrator provides them.

---

## FOLDED DEFERRED / CROSS-WS HANDOFFS (no silent drop)

- **`BG.W-VT-ROUTE-ENHANCE`** — native VT enhancement; deferred/optional, gated on #1 green, additive, never concurrent; exclude the shell Aurora from the VT snapshot.
- **WS1-09 blurred-image-bg + macro-flower bg** — UNADDRESSED, no carrier; a CONSUMER-ASSET arm (DEFER-with-trigger), not a library wave.
- **`BG.W-SCROLL-SHRINK-UNIFY`** (3-fork DRY collapse) → **WS4**; HARD-DEPENDS on W-ROUTE-TRANSITION (the page-title shrink is dead-because-frozen — re-validate after M1).
- **AppShell >500-line carve** → `demo/layout/ShellDockMorphStage.vue` → **WS2** (coordinate the M1 line deletions; `toggleShellMorph`'s `startViewTransition` moves WITH the stage).
- **`useGlassBackdropLuminance` rewire** to the live shell canvas → W-FIELD-ACCENT-RECONCILE.
- **`BG.W-GESTALT-REPOINT`** (re-point `proof:ba-gestalt` off the BC roster) → **WS7**; no WS1 wave waits on it; the live burst+Safari capture IS the WS1 gate.
- **`W-PAINT-IS-THE-GATE` / CONSTRAINTS.md** → **WS7**.

---

## OPEN RISKS / RESIDUAL GAPS

1. **(HIGHEST — Δ0) The build is UNBUILT and unpainted.** Land M1+M2+M3+M4+M5+M0 as ONE cut on `tranche/BG @879c0c41` (coordinate the AppShell deletions with WS2), REGISTER the five new gates (`route-single-root`, `focal-complete`, `no-paper-field`, `route-confounder`, `field-accent-reconcile`) in `gates.mjs` + `package.json`, THEN a NON-AUTHORING agent captures the binding paint on a real GPU, Chrome AND real Safari/WebKit. THIS is the close.
2. **(C1) The bare-swap is a LOGIC call, not yet pass-4 build-proven** — the #7956 prototype ran a burst with no white-screens but did not isolate out-in-vs-bare-swap on the full M1 cut. The atomic swap CANNOT wedge by construction (no leave hook), but the LIVE burst capture (`children===2`, `h1===last-dest`, the `.route-enter` enter runs) is the binding proof. If a live capture ever shows the bare swap stranding, the GL confounder is load-bearing → fall to M2-first and re-measure; NEVER re-introduce Suspense, NEVER re-introduce out-in.
3. **(C6 / runtime one-GL) the content↔focal transient** must hold ≤1 GL context on Safari's per-window budget. The afterEach-gate + the CSS-gradient zero-stop bridge is the never-2-contexts mechanism; `proof:focal-complete` proves enumeration-consistency, NOT the runtime law. The live monotonic-GL capture (incl. content→dock→content) is the only proof — Safari budget bites first.
4. **(C5) the recessive palette** must MEASURE C≤0.10 at the worst-cool (motion 85° / data 88°) on the LIVE shell — Prototype-3 read 0.069 on an isolated config; re-confirm on the integrated shell.
5. **Safari/WebKit has ZERO real-demo evidence.** Four named falsifiers: named-timeline lag (mitigated by `nearest`), per-window GL budget (the content↔focal transient), canvas-move-loses-context (avoided by mount/unmount-never-reparent), premultiply-toward-black (oklch zero-stops). Playwright-WebKit ≠ real Safari for GL budget + scroll-grow — if real Safari-26 is unavailable, NAME the Safari evidence vacuous, do NOT claim the close.
6. **(R8) The 4 evidence baseline PNGs do not exist** — establish them from HEAD before the paired-π DELTA.
7. **GL dispose is ASYNC** — sample monotonic-GL at SETTLE (+360/+1260ms), count live-context canvases (`isContextLost()===false` + `isConnected`), not raw tags.

---

## CONVERGENCE LEDGER (pass-4 → pass-4-CONVERGED)

| pass-4 | pass-4-CONVERGED |
|---|---|
| `<Transition name="route-liquid" mode="out-in">` keyed swap | **BARE keyed `<component :key=route.path class=route-enter>` atomic swap — NO Transition. The swap cannot wedge by construction; the enter is an on-mount `@keyframes`. The headline simplification (Critique-1).** |
| `meta.focal` IMPORT-GRAPH-DERIVED (AST walker) | **`background.kind`-DERIVED + `SELF_STAGES_GL` set. The import-graph conflates contained specimens with page fields; the right signal already lives at `StoryHero.vue:199-207`. No AST walker (Critique-1/4).** |
| `warmProjectHue` LACKS the reds-floor/warm-wedge | **FALSE — it already has both (verified `aurora-hero.ts:96-102`). The real risk is the degree-input delta (parity 0.0000, retired). Land the fold; 2 consumers not 3 (Critique-1/6).** |
| shell-`<Aurora>` eager import = #1 perf risk | **PHANTOM — `aurora.js` already eager via `KonamiAurora`; +50 bytes. Lighthouse confirmatory only (Critique-5).** |
| `shellAuroraConfig` = spread DEFAULT + vividness:0 | **EXPLICIT recessive C 0.05-0.09 palette + vividness:0 (vividness:0 doesn't lower base chroma). Measured C 0.069 (Critique-2/3, Prototype-3).** |
| `v-if(!settledFocal)` through the out-in leave window | **Re-worked: never-2-contexts afterEach-gate + CSS-gradient zero-stop bridge (the leave window is an out-in artifact the bare swap removes) (Critique-1/2).** |
| `data-paper-field` on the Aurora wrapper | **On the CONTENT ANCESTOR of `<main>` (the suppressor/ambient selectors are descendant — Critique-2).** |
| DELETE `paper.css:129-269` whole | **SURGICAL — preserve the `.paper-underpaint`/`.paper-grain-overlay::after` PRM grain rule in the shared @media block; `proof:no-paper-field` asserts grain survival (Critique-1).** |
| #7956 sweep MANDATORY (pass-3) | **PHANTOM (pass-4 P4-A) STRENGTHENED — the bare swap removes the warning's only trigger; comment-TEXT trimmed, not stripped.** |
| R1/R2/R3/R4 (loader/collision-phantom/est-lines/auth-shell) | **HOLD — do NOT re-litigate.** |
| Δ0 / Safari | **STILL the binding unconverged frontier — INTEGRATE then CAPTURE; zero real-demo Safari evidence today. The spec is converged; the PAINT is the only remaining gate.** |
