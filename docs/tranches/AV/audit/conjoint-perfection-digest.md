# Conjoint tranche-perfection synthesis (30-agent)

The augmented AV/G wave set + the dock/animation/UI-UX perfection + the cross-repo coordination.

All key claims verified against source. The lanes are accurate. Now I'll write the synthesis plan.

# THE AUGMENTED TRANCHE SET — AV (glass-ui) ∥ G (slides), conjoint with keyframes D · value.js M · fourier hub

Verified against HEAD (glass-ui 3.2.0, branch at-dock-convergence): aurora.frag.ts:817 emits `vec4(col * uAlpha, uAlpha)` with no `linearToSrgb` (metaball.frag.ts:278 has it — gap real); useLayerTransition.ts:237 constructs a fresh `SpringProgress` per swap from the static `DOCK_SPRING` preset, never re-seating from live state (C3 gap real); tokens.css:178/1261 carry the `--ease-apple-spring` cubic-bezier + `--vt-ease` alias (C2 debt real); tokens.css:601 `--glass-blur-overlay-radius: 24px` is out-of-band; useStagger.ts:135 hand-rolls `initialDelayMs + idx * delayMs` (D1 real); useWebGLCanvas.ts has zero content-visibility hook (F1 real); package.json peer/devDep value.js `^0.10.0` (E-valuepeer gap real).

---

## (1) THE DOCK PERFECTION — AV dock/motion augmentations

The dock motion foundation is correct and shipped: single-source `--spring-dock` ⇄ `DOCK_SPRING` (token + driver sample the same ODE), single-frame FLIP sync (AU.W8.1), one-rAF driver on the solver clock (AU.W8.3), the APG tabs a11y contract (roving tabindex, aria-selected, Arrow/Home/End), orphan-detect focus restoration, and the prefers-reduced-motion fast-path in both VT and FLIP paths. Four augmentations perfect it.

**D-dock-1 · keyframes flip() de-dup (AV.W3, D2).** `useLayerTransition.ts:178-269` hand-rolls the FLIP measure/pin/swap/measure/re-pin dance around the `SpringProgress` driver. The canonical `flip()`/`flipShared()`/`ElementMorph` LIGHT-tier orchestration (keyframes index.ts:64) owns this exact read-mutate-read sequence value.js-free. Fold: replace the getSize/setDim/measure/re-pin block with `flip(containerEl, mutate, { duration, timingFunction: springTimingFunction(DOCK_SPRING) })` where `mutate` performs the `leavingLayer`/`currentLayer` swap inside the batched frame. The SpringProgress-driven width path is preserved as the morph driver — flip() owns the read/invert batching, the spring owns the per-frame value. Same fold lands on `useGlassCarousel.ts:122-207` (CSS-transition-duration-driven, `FlipOptions.duration` from parsed `transition-duration`). Naming caveat (aug-keyframes-coord refine): the two consumers use different drivers (carousel = CSS transition + transitionend; layer = SpringProgress) — the flip() adoption must keep each driver, folding only the measure/pin/invert mechanics.

**D-dock-2 · velocity-continuity (AV.W3, C3 — the highest-leverage interaction-motion win).** On any resize/retarget, `useLayerTransition.ts:237` re-constructs `SpringProgress` from the static `DOCK_SPRING` preset, zeroing value+velocity. For an interrupted mid-flight gesture (swipe → change mind → swipe opposite) this snap-then-springs instead of preserving momentum. The keyframes SpringProgress solver already tracks live `(value, velocity)` and re-seats correctly on `target` assignment. Fold: detect the gesture-interrupt / retarget path, read the in-flight solver's current `(value, velocity)`, and re-seat the live solver instead of constructing fresh from preset. This is wiring, not architecture — the live solver and the re-seat are already in keyframes; the gap is reading in-flight state on retarget. C4 boundary convention lands alongside (doctrinal): the live solver is reserved for the interactive dock; ambient WebGL (aurora/blob) stays on cheap static curves.

**D-dock-3 · a11y completions (AV.W7).** Two SOTA a11y gaps, both at the substrate/control layer, not the dock-layer machinery: (G1) lift the prefers-reduced-motion freeze-frame from aurora's `runtime.ts:197` into the `useWebGLCanvas` substrate so goo-blob and every future AV surface inherit it as a platform guarantee — currently aurora owns it alone, blob reads PRM once at init and never re-monitors; (G2) author a `DockIconButton` pause/play toggle for continuously-running AV backgrounds (WCAG 2.2.2 Level-A — the only Level-A obligation in scope, available to all users, not gated behind reduced-motion). goo-blob already returns `pause()`/`resume()`; no UI control binds them yet.

**D-dock-4 · perf lifecycle (AV.W7, F3).** No on-demand `will-change` lifecycle in `useLayerTransition`. Fold: set `will-change: transform, width` at gesture/swap start; clear to `auto` on spring-settle / transitionend. Never standing (standing will-change holds a compositor layer + VRAM). Pairs with the F5 inheritance-bomb guard: `--phase-color`/`--shadow-color` are SET per event, never TWEENED per frame (animating an inherited custom property forces whole-subtree style recalc).

**Dock hygiene (AV.W5, P5/P2).** `createDockContext<T>()` factory unifies `dockContext.ts` + `dockLayerContext.ts` (−30 to −40 LOC, ≥2-consumer-gated). The `--phase-color` dock-tint crossfades migrate to `color-mix(in oklch)` for perceptual hue arcs (B4). The `DOCK_SPRING` inline constant keeps its token-sync binding comment; a refine note records that `regen-spring-tokens.mjs` updates do not auto-sync the JS constant (manual double-touch — documented, accepted, not automated this round).

**Dock role/consumer status (perfect-already, no code).** Three resolving consumers clear the ≥2-context bar (slides DeckView ChromeDock, keyframes TopDock→ChromeDock D.W5, value.js Dock ToolDock). The README role-vocabulary ships; the `<Role>Dock` base component stays BOOK (no 2nd consumer needs the typed base beyond the vocabulary). All three consume only `@mkbabb/glass-ui/dock` — AT-disjoint, no demo migration. Slides DeckView optionally adopts the typed `DockContext` DI idiom (G.W0 cosmetic; not gated) instead of imperative `dockRef.keepOpen()`.

---

## (2) THE ANIMATION PERFECTION — AV.W3 + the D1-D8 routing

AV.W3 is the motion-composables + keyframes LIGHT orchestration-tier adoption wave. The clean ownership split holds: glass-ui owns Vue-reactive wrappers + lifecycle (useSpring, useAnimatedNumber, useRAFLoop, useIntersectionPause); keyframes owns the solver engines (SpringProgress, SmoothProgress, NumericAnimation, stagger, flip, Sequence). Solver logic never forks — duplication exists only in D1 (delay-distribution) and D2 (FLIP), both folded here.

**A-1 · stagger() adoption (D1, CONDITIONAL).** `useStagger.ts:135` and `useStaggerReveal.ts:68` hand-roll linear delay ramps (`initialDelayMs + idx * delayMs`, `staggerMs * idx`). keyframes `stagger()` (index.ts:62, value.js-free) owns the distribution generator. The §3 grep confirms exactly two hand-rolls; flip/Sequence/drag SKIP (no hand-roll to replace — KISS). Narrow fold: `const delay = stagger(count, { each })`; the Vue setTimeout/IntersectionObserver/reactivity machinery stays. **Decision gate at HEAD:** adopting makes both composables keyframes-bearing, forcing relocation /motion-core → /motion. Adopt IFF a demo/consumer actually wants the non-linear `from`/`ease` reshaping; else BOOK with the trigger "a non-linear distribution consumer appears" (linear-only relocation churn is not warranted).

**A-2 · useCountup lift (D3, /motion keyframes-bearing).** Slides `useCountup.ts:40-53` hand-rolls a requestAnimationFrame tick + ease-sampling loop with no unmount disposal (rAF leaks mid-tween). Lift to `glass-ui/src/composables/motion/useCountup.ts` re-expressed on the keyframes `NumericAnimation` LIGHT engine (the same engine `useNumericTransition` consumes). Preserve the `runActive`/`settle` interface + the `[data-countup]`/`-dur`/`-delay` DOM contract byte-for-byte so the slides DeckNav fork swaps the import with zero call-site change. The lift FIXES the leak via `onScopeDispose` + per-element handle tracking. Ships /motion (keyframes-bearing, NOT root).

**A-3 · vReveal lift (/motion-core root-safe).** Slides `reveal.ts` (15 lines, Vue type-only, dependency-free) lifts to `glass-ui/src/composables/motion/vReveal.ts` as a directive setting `[data-reveal]` + the `--d` step custom property. Ships /motion-core + root-barrel (keyframes-FREE, per the useViewTransition precedent). Preserves `v-reveal="N"` / `v-reveal:fade="N"`.

**A-4 · spring-coverage sweep (C2, Baseline `linear()` crossed WA 2026-06-11).** Retire the three surviving `--ease-apple-spring` cubic-bezier sites: tokens.css:1261 (`--vt-ease` default), animations.css:334, cards.css:41. The +27.5% apple-spring overshoot maps onto `--spring-bouncy` (+20.5%) / `--spring-snappy` (+6.8%); retarget per-curve to the `--spring-*` linear() token, then delete `--ease-apple-spring` from tokens.css once no consumers (clean break, no fallback alias). D6 deckSpring dedup: slides `--spring-deck` recompute (response 0.5, ζ 0.85) is sub-percent identical to glass-ui `--spring-smooth` (ζ 0.86) — slides pins `--spring-deck: var(--spring-smooth)` and retires the CSS recompute half, keeping only the JS `deckEase` swap for the count-up rAF.

**A-5 · Baseline CSS-motion folds (typed-VT, @starting-style, scroll DEFER).** Typed/active View-Transitions (NA 2026-01-13) layer above the base-VT dock-layer recipes for directional slides as a 2nd progressive-enhancement tier (FLIP fallback retained). `@starting-style` + `transition-behavior: allow-discrete` extends the existing `.glass-top-layer` grammar to dock/popover/tooltip enter-leave. `color-mix(in oklch)` for dock phase-tint. The E.W9 native-scroll bridge (`createNativeTimeline`) stays DEFER — glass-ui's hand-rolled native-scroll-first contract (`supportsCssTimeline.ts` garbage-value probe, inert-on-native single-writer) is a different shape (go-inert-let-CSS-own vs JS timeline object); revisit when a consumer needs reactive JS scroll value on a supporting engine driving a non-CSS animation.

**The D1-D8 routing table (binding):**

| Fold | Description | Owner wave |
|------|-------------|-----------|
| D1 | useStagger/useStaggerReveal → keyframes stagger() | AV.W3 (CONDITIONAL) |
| D2 | useGlassCarousel + useLayerTransition FLIP → keyframes flip()/ElementMorph | AV.W3 |
| D3 | useCountup rAF → keyframes NumericAnimation (lift to /motion) | AV.W3 + G.W2 |
| D4 | constellation RAF-park → useRAFLoop + useIntersectionPause | G.W2 (unblocks AV.W8) |
| D5 | slides easing-token forks (deck.css:141-142, deck-theme.css:59-60) → alias glass-ui | G.W0 |
| D6 | slides `--spring-deck` recompute → pin var(--spring-smooth) | G.W0 |
| D7 | goo-blob easing helpers → goo-blob/easing.ts (scoped); constellation easeInOutQuad stays editorial in-place | AV.W5 (blob arm) / G (editorial) |
| D8 | glass-ui keyframes devDep ^2.2.0 → ^2.2.0\|\|^3.0.0 (peer parity) | AV.W0 |

**Gate:** `proof:motion-composables-consumer` (born-RED, manifest==ci) — each NEW composable (useCountup, vReveal) tallies ≥2 resolving-at-HEAD consumers (in-repo demo route + a second in-repo story). The slides DeckNav fork is an eventual consumer post-3.3.0 publish and does NOT count toward ≥2 until it lands. BOOKed items (kept-private useIdleSchedule, BOOKed stagger) are excluded from the tally. `proof:motion-value-free` greps the adopted composables for zero static value.js edge.

---

## (3) THE UI/UX PERFECTION — glass · component · configurator · deck · constellation · perf · a11y · cohesion

**Glass tiers (AV.W1 + AV.W7).** The 5-rung ladder (wash/quiet/resting/floating/overlay) is alpha-monotonic and coherent. The shipped defect: aurora outputs linear-sRGB without the OETF (aurora.frag.ts:817), ~2.2× too dark — AV.W1 copies `linearToSrgb()` from metaball.frag.ts:132-137 and applies `col = linearToSrgb(col)` before line 817, then re-bakes all 11 presets, gated by `proof:aurora-space-gamma`. AV.W7 clamps `--glass-blur-overlay-radius` 24px → 15px (the one out-of-band token; band is 8-15px), adds `contain: content` (or `strict` for fixed-size hosts) to aurora/blob/dock hosts (50-80% paint-area reduction — only `.glass-card` has containment today), and migrates the two-color `color-mix(in srgb)` sites (glass.css:258 destructive tint, glass.css:154 btn-hover) to `in oklab`. Alpha-only `token N%, transparent` mixes stay srgb (benign).

**Components (perfect-already, one refine).** Button focus-ring discipline, Card focus-elevation (`:has(:focus-visible)` → one tier up), Dialog spring entrance, Slider held-halo + keep-open token, dock four-state contract, NumberField label-binding, Card tier/surface orthogonality — all clean. The single refine is the D1 stagger hand-roll (routed to AV.W3 above).

**Configurator (AV.W4, documentation folds).** Aurora uses `cloneMode="per-preset"` (preserves slider edits across preset switches), blob uses default commit-on-write. The CSS-grid animated-reveal (no JS watchers) avoids the prior Collapsible recursion race. Aurora hand-authors `DockLayerGroup`+`DockLayer` chrome rather than `ConfiguratorLayer` — a design choice (layer switching + crossfades exceed ConfiguratorLayer's collapse pattern), not a gap. Documentation folds only: name the dividers prop, the density cascade, the clone-mode semantics, the preset-picker slot shape, and the per-preset rationale in CLAUDE.md / Configurator JSDoc.

**Slides deck (G).** Structurally coherent navigation (focus-guarded keyboard, pager-fit windowing, gate flow, mobile edge-zones). Three platform-seam gaps: (1) FOUC — `index.html:6 content="light"` over a dark deck → `content="light dark"` (G.W0 one-liner); (2) the 700-1000px tablet mid-range band is undefined — G.W3 decides explicitly (bless the 16:9 stage-lock OR add a `@container` breakpoint); (3) constellation RAF/PRM unlifted — G.W2.

**Constellation (G.W2 → AV.W8).** Slides `constellation.ts` hand-rolls the RAF triplet (`anyActive`/`ensureRunning`/`frame`, lines 448-461), a MutationObserver state-cache (463-476), per-frame PRM check (393), and O(n²) brute-force neighbor query (240-247). G.W2 swaps the RAF/visibility machinery for `useRAFLoop` + `useIntersectionPause`, extracts `drawAnomaly(ctx, node, phase, k)` as a slides-local method, and preserves the static-frame path under `?freeze`/PRM. This makes slides the 2nd resolving consumer that unblocks AV.W8 (`useCanvas2D` + Constellation primitive). AV.W8 lands the generic lattice (proximity-graph + spatial-binning O(n) + optional Verlet settle) with D2 draw discipline (no shadowBlur — pre-rendered glow sprite, polyline batching per opacity bucket, floored coords, never getImageData). The slides red ANOMALY skin is a consumer overlay (FOLD-G extract), never baked into the primitive. AV.W8 is ADOPT-gated: lands at ≥2 resolving consumers (demo story + G.W2 swap), else GATED-NOT-LANDED with G.W2 named as the trigger.

**Perf (AV.W7, the headline wave).** F1 (the #1 unpulled lever): `content-visibility: auto` + `contentvisibilityautostatechange` listener on `useWebGLCanvas` gating `shouldContinue()`/`armed`, with IntersectionObserver `rootMargin: 200px` fallback. F2 contain + blur-budget (above). F3 will-change lifecycle (dock). F4 wire aurora + blob RAF through `useIntersectionPause` + `document.visibilityState`. F6 promote the DPR clamp `Math.min(dpr, 2)` (runtime.ts:257) to `--av-dpr-max` + budget-cap constants (≤2-3 blobs, 3-4 colors, 8-15s loop). Gate: `proof:offscreen-pause` (born-RED; bite = remove the hook → RAF runs offscreen → RED). F7 LoAF frame-budget gate is DEFERRED (needs a stable headless runner; offscreen-pause is the shippable substitute).

**A11y motion (AV.W7).** PRM compliance is partial: lift the freeze into `useWebGLCanvas` (G1), add the WCAG 2.2.2 pause toggle (G2), wire blob through the intersection seam (it composes useWebGLCanvas only today). Optionally hoist the PRM freeze/wake pattern (`setReducedMotion` + matchMedia change listener + `wake()`) into a `useReducedMotionToggle()` motion-core composable both aurora + blob compose (AV.W5 hygiene, non-breaking).

**Cohesion (cross-repo).** The DAG is clean and single-sourced (color math in value.js, spring math value.js→keyframes→glass-ui tokens). Six tactical folds: aurora OETF (AV.W1), two-color oklab migration (AV.W7/G.W3), apple-spring retire (AV.W3-C2), slides easing-fork delete (G.W0-D5), spring-deck alias (G.W0-D6), shadow-cartoon-lg reconcile-to-token (G.W0). Document the color-mix discipline (two-color → oklab, alpha-only → srgb), the radius/typography override contracts, in CLAUDE.md.

---

## (4) THE AUGMENTED AV WAVES — per-wave concrete augmentations

The AV charter is 9 waves; execution order W0→W1→W2→W3→W4→W5→W7→W8→W6. Binding authority for every fold is `SOTA-crosswalk.md` (Baseline-dated). Every fold cites its Baseline status; NOT-Baseline capabilities (scroll-driven, WebGPU, interpolate-size) stay `@supports`-gated with fallback.

**AV.W0 — manifest + harmonize (pre-publish, AT-disjoint).** D8: keyframes devDep `^2.2.0` → `^2.2.0 || ^3.0.0` (peer parity, dev runs the downstream-resolved version). Stage the value.js peer+devDep bump `^0.10.0 → ^0.11.0` (E-valuepeer; lands on the 3.3.0 cut, gated on value.js 0.11.0 publishing first).

**AV.W1 — aurora-fix (pre-publish, AT-disjoint).** Add `linearToSrgb()` helper + `col = linearToSrgb(col)` before aurora.frag.ts:817 (verbatim from metaball). fwidth-based stroke AA (smoothstep bands). IGN dither at 1/255 LSB post-OETF (`col += (1.0/255.0)*ign(gl_FragCoord.xy) - 0.5/255.0`, promote to `--av-dither` token) — the #1 soft-gradient banding fix, one line, texture-free. Re-bake 11 presets. DESIGN.md §7 OETF note. Born-RED `proof:aurora-space-gamma`.

**AV.W2 — blob-converge (opens after W1).** Create `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (the OETF + Ottosson OKLab/OKLCh matrices + `FBM_ROT` constant + value-noise). Migrate metaball.frag.ts + aurora.frag.ts to splice the chunk — de-duplicates the now-identical OETF so it can NEVER diverge again (the root of the aurora bug). KISS reconcile: keep each shader's fbm loop, hoist only the shared constants. Born-RED `proof:shader-shared-source` (duplicate-definition grep = 0). Document the shadow-cartoon-lg consumer-override contract.

**AV.W3 — motion-composables + orchestration-tier (AT-disjoint, opens NOW).** D1 stagger() adoption (CONDITIONAL — decide relocation at HEAD). D2 flip()/ElementMorph adoption into useLayerTransition + useGlassCarousel. useCountup lift (NumericAnimation, /motion, fix leak). vReveal lift (/motion-core, root-safe). C2 spring-coverage sweep. C3 dock velocity-continuity. Baseline CSS-motion folds (typed-VT, @starting-style, color-mix oklch). Demo routes `countup.vue` + `reveal.vue` (≥2 consumers). useIdleSchedule: KEEP-BOOK default (`scheduleAfterFirstPaint` runActive is imperatively post-paint; no genuine 2nd consumer; trigger recorded). Born-RED `proof:motion-composables-consumer` + `proof:motion-value-free`.

**AV.W4 — deferred lifts.** Configurator documentation folds. shadow-cartoon-lg override contract. Drawer `:native`/GlassNativeDrawer AV-GATED (2nd-consumer muster unmet — BOOK). Card `surface="cartoon"` dark arm FOLD IFF ≥2 divergent dark values.

**AV.W5 — hygiene transpositions (net-deletion-or-neutral).** `createDockContext<T>()` factory (−30-40 LOC). 33-barrel metadir → `src/subpaths/` (exports unchanged). orphaned composables → domain sub-trees. useIdleSchedule extract IFF 2nd consumer. Optional `useReducedMotionToggle()` hoist. Gates `proof:dock-context-factory` (LOC≤0), `proof:subpath-metadir`.

**AV.W7 — perf (opens after W1+W2, the SOTA #2 lever).** F1 content-visibility offscreen-pause + IO fallback on useWebGLCanvas. F2 contain + blur-budget clamp. F3 on-demand will-change lifecycle (dock). F4 RAF↔visibility wiring (aurora + blob). G1 lift PRM freeze into substrate. G2 WCAG 2.2.2 pause toggle. F6 DPR/budget tokens. F5 inheritance-bomb guard (recorded convention). Born-RED `proof:offscreen-pause`. F7 LoAF DEFERRED.

**AV.W8 — constellation primitive (CONDITIONAL, ≥2-consumer-gated).** `useCanvas2D` substrate (Canvas2D sibling to useWebGLCanvas, no GPU-init tax, composes useRAFLoop + useIntersectionPause — never re-rolls rAF). Constellation primitive: generic lattice (proximity-graph + spatial-binning O(n) + optional Verlet) WITHOUT the slides ANOMALY skin. D2 draw discipline. Born-RED `proof:canvas2d-substrate-consumer`. LANDED at ≥2 (demo story + G.W2 swap); else GATED-NOT-LANDED with trigger named.

**AV.W6 — gate-fleet hardening (close).** Run the full fleet. `/api` discovery-layer completion (promote the ~10 composables + ~13 option/return types named in union-digest §4 from dom/keyboard/sortable/filter/interval/timer subtrees). `proof:dock-vocabulary` + `proof:dock-controls-split`. Every gate registered in `gates.mjs` with `{local,ci,release,sibling}` tags (not hand-listed ci.yml). inv-27 green-means-green: every DONE cites AV's own green CI run id.

**No new AV wave needed** — the 9-wave charter absorbs every fold at its placeholder.

---

## (5) THE AUGMENTED G WAVES — consume + slides-local ripening (4 waves)

G.W0/W2/W3 are AT-disjoint and open now; G.W1 fires on the 3.3.0 publish.

**G.W0 — bootstrap + de-dup wave (DEV, the new slides-local language + dedup wave).** Initialize slides CLAUDE.md (the new language/precept wave). D5: delete the 4 easing-token forks (deck.css:141-142, deck-theme.css:59-60), alias glass-ui `--ease-out-expo`/`--ease-standard` (already imported). D6: pin `--spring-deck: var(--spring-smooth)`, retire the CSS recompute half. LV-1: `markRaw` the slide component refs (6 slides emit Vue reactive-component warnings — deck.ts makes `content.slides[].component` deeply reactive). shadow-cartoon-lg: reconcile-to-ship — override only the COLOR/offset axis, consume the library `@theme --shadow-cartoon-lg` token, delete the full re-declaration at feedback-coder/theme.css:127 (token-first, NOT delete-as-dead). FOUC: index.html:6 `content="light dark"`. Optional: DeckView adopts the typed DockContext DI idiom.

**G.W1 — dock-consume (GATED on `npm view @mkbabb/glass-ui` ≥ 3.3.0).** Pin `^3.2.0 → ^3.3.0`. Consume the dock-motion fix (velocity-continuity + single-frame FLIP sync + `--spring-dock` token) — library changes, zero slides-side code beyond the bump. Retire F-01 close-hack via Dialog `showClose`. Run the binding-verify sweep (stale reka-ui `:pressed`/`v-model:search-term`/`tag=` props that silently no-op). typecheck + e2e. Deploy to Cloudflare Pages confirm-first.

**G.W2 — constellation (REFACTOR, the slides de-dup wave's motion arm).** D4: swap the hand-rolled RAF-park (`anyActive`/`ensureRunning`/`frame` + MutationObserver + per-frame PRM) for `useRAFLoop` + `useIntersectionPause` + `document.visibilityState`. Extract `drawAnomaly(ctx, node, phase, k)` as a slides-local method. Preserve the static-frame path under `?freeze`/PRM. Snapshot-equivalence via the `?freeze` deterministic seed (zero diff against HEAD). Register `proof:constellation-raf-composable` (born-RED; bite = grep finds surviving hand-rolled requestAnimationFrame). This is the 2nd resolving consumer that unblocks AV.W8.

**G.W3 — deck-lift decide (DEV/decide).** Resolve the `/deck` ≥2-consumer gate precondition (record AV authoring `glass-ui/demo/stories/compositions/deck.vue` as consumer #2 — the goo-blob DEC-AT-5 precedent accepts a demo story as #2 with honest motive). Decide the 700-1000px mid-range tablet band EXPLICITLY (bless the 16:9 stage-lock OR add a `@container` breakpoint). Color-discipline sweep: feedback-coder two-color `color-mix(in srgb)` (lines 84-107, 137) → `in oklab` (color-correctness, not critical path).

---

## (6) THE CONJOINT COORDINATION

**The root hinge (E1).** glass-ui 3.3.0 → npm (USER-DOMAIN, confirm-first) is the single event that fans out. AV.W0-W1 are AT-disjoint and open before publish. Agents stage to READY-TO-PUBLISH, never run the irreversible release. The publish unblocks: keyframes D.W5 (dock consume), slides G.W1 (pin bump + dock-motion fix), value.js M.W7 (blob extirpation).

**keyframes (D.W5).** glass-ui consumes the keyframes LIGHT tier (SpringProgress, stagger, flip/flipShared, ElementMorph, Sequence) value.js-free; the root barrel stays keyframes-free. keyframes is READ-ONLY for the dock-fix — the spring solver is consumed at BUILD time via `regen-spring-tokens.mjs`, not a new export. D.W5 is GATED on glass-ui publishing 3.3.0 (registry, not branch): keyframes renames TopDock→ChromeDock + AnimationMenuBar→TransportDock LOCALLY (composing the published primitives), bumps the glass-ui pin to `^3.3.0`, validates against `proof:dock-vocabulary`. E.W10 ships the orchestration tier (stagger/flip/Sequence/drag/decay) value.js-free, authored-now-run-later. Author `glass-ui/docs/tranches/AV/coordination-keyframes-lite.md` naming the consumption seam: what glass-ui imports (SpringProgress + LIGHT barrel, the version pin), what keyframes ships (the tier + the value.js-free guarantee), inv-16 name-forward (every keyframes export is documented public API; no back-import). keyframes demo keyboard usage is already idiomatic (registerShortcut + useRegisteredShortcuts + formatComboParts).

**value.js (M).** Color ownership is acyclic and singly-sourced: value.js owns parseCSSColor + the 9 Ottosson primitives; glass-ui's `/color` leaf re-exports the tier + composes oklchToLinear (aurora bake) + oklchToGammaRgb (blob exit). The blob-color contract is proved bit-identical (8/8, ~2e-16) — the runtime edge is settled. The E-valuepeer knot is SemVer-range only: glass-ui peer+devDep `^0.10.0` excludes 0.11.0. Publish order: value.js M.W4 publishes 0.11.0 FIRST → glass-ui 3.3.0 cut bumps peer+devDep `^0.10.0 → ^0.11.0` (AV.W0/W7). M is KISS (delete the `development` export violation via mechanism-C dist-resolution + build:watch; collapse two CSS-color→RGB resolvers into one library-backed primitive; WithId read-side transposition deletes 25 casts). Post-publish, M.W7 extirpates the bespoke value.js demo blob dirs onto `@mkbabb/glass-ui/goo-blob` + `/watercolor-dot` + the injected ColorResolver seam.

**fourier (the hub).** Owns ONLY `docs/constellation/**` — the SOTA-crosswalk (Baseline-dated binding authority), the adoption-asks ledger, the orchestration manifest. Writes no sibling source (inv-16 airtight). The SOTA-crosswalk is the glass-ui/slides gospel: every AV fold cites its section; the 5 highest-value adopts (IGN dither, content-visibility RAF-pause, reduced-motion substrate lift + WCAG pause toggle, dock velocity-continuity, contain+blur-budget+spring-convergence) are grounded in real gaps. Horn signals (the ≥2-consumer gate, the E1 publish gate) propagate bidirectionally.

**Demos-consume-glass-ui name-forward plan.** Both demos consume glass-ui idiomatically for chrome. The name-forward asks: (1) glass-ui exports + documents `useDockState` + the DockContext shape + imperative seals (keepOpen/release/expand) via /dock + /api so value.js demo wires reactive dock state instead of bare ref calls; (2) document the ColorResolver seam + defaultBlobColorResolver injection for goo-blob/watercolor-dot consumers; (3) complete the `/api` discovery layer (the ~10 composables + ~13 types); (4) value.js + keyframes demos register as resolving consumers for `/deck` (consumer #1, blocked on the glass-ui demo story) + `useCanvas2D` constellation (consumer #2, blocked on slides G.W2). No demo-side code is forced now — coordination records the muster.

---

## (7) THE UPDATED CONSTELLATION MAP

```
                          fourier (hub)
                  docs/constellation/** ONLY — SOTA-crosswalk binding authority
                  inv-16: writes no sibling source
                              │ (cites)
        ┌─────────────────────┼──────────────────────┐
        ▼                     ▼                       ▼
   value.js (M)          glass-ui (AV)            slides (G)
   color + parsing       UI + substrates          editorial + deck
   SINK, cohort-free     spring-regen chain        consumes subpaths
        │                     │                       │
        │ 0.11.0 publishes    │ E1: 3.3.0 → npm       │ pin ^3.3.0
        │ FIRST (peer precond)│ (USER-DOMAIN)         │
        └────────────────────►│◄──────────────────────┘
                              │
   ACYCLIC DAG:  value.js ◄── keyframes.js ◄── glass-ui ◄── slides
                 (color)      (LIGHT tier,      (consumes      (consumes
                              value.js-free)    both as          /dock /motion-core
                                                optional         /color subpaths)
                                                subpath peers)

   E1 (3.3.0 publish) FANS TO:
     ├─► keyframes D.W5  — dock rename (TopDock→ChromeDock), pin ^3.3.0
     ├─► slides   G.W1   — pin bump + dock-motion fix consume + deploy
     └─► value.js M.W7   — blob extirpation onto /goo-blob + /watercolor-dot + ColorResolver

   2ND-CONSUMER GATE (≥2 resolving-at-HEAD):
     AV.W8 useCanvas2D + Constellation ◄── unblocked by ─── G.W2 constellation RAF swap
                                       └── + glass-ui demo story (consumer pair)
     /deck lift (FG.W-deck)            ◄── gate = AV authors demo/stories/compositions/deck.vue

   D1-D8 ROUTING:
     D1,D2 → AV.W3 (stagger/flip de-dup onto keyframes LIGHT tier)
     D3    → AV.W3 (useCountup lift) + G.W2 (slides consume)
     D4    → G.W2 (constellation RAF → useRAFLoop+useIntersectionPause)
     D5,D6 → G.W0 (slides token/spring alias to glass-ui canonical)
     D7    → AV.W5 (goo-blob easing scoped) / G (constellation easeInOutQuad editorial)
     D8    → AV.W0 (keyframes devDep parity)

   PUBLISH SPINE: value.js 0.11.0 → glass-ui 3.3.0 (peer bump) → {keyframes D.W5 ∥ slides G.W1 ∥ value.js M.W7}
```

---

**The perfected constellation: one OETF, one spring source, one orchestration tier, one offscreen-pause seam — the dock re-seats from live velocity, the aurora paints true, the constellation runs on the shared substrate, and glass-ui 3.3.0 is the single hinge the three repos turn on.**
