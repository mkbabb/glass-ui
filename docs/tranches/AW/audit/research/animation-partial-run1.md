# Dock-animation SOTA — surviving lanes run1 (1/12)

## Lane 1

I have sufficient, well-cited Baseline data from the modern-web-guidance CLI itself (which embeds web.dev Baseline dates) plus the AV crosswalk. The CLI guidance confirms: same-document View Transitions Baseline 2025-10-14, `view-transition-class` Baseline 2025-10-14, `sibling-index()` Limited (Chrome 138 / Safari 26.2, no Firefox). I have everything needed. Let me compile the brief.

I've completed the research. Here is the brief.

---

# AW dock-animation SOTA brief — lane `modern-web-guidance-anim`

Research-only. No implementation. Sources = `modern-web-guidance@latest` CLI (embeds web.dev Baseline data, retrieved 2026-06-06), the AV SOTA-crosswalk, and the live dock source. keyframes.js is READ-ONLY (name-forward); every spring fold below re-seats the *existing* `SpringProgress`/`--spring-*` machinery, never edits the engine.

## What the dock already does well (don't re-tread)

The dock is already near-SOTA on the hard parts. Verified in source:

- **Lockstep size+opacity** is solved on the FLIP path. `useLayerTransition.ts:262-333` defers the layer class-swap into the *same rAF* that sets width, so opacity and width start in one frame origin (no shrink-before-fade). `dock.css:516-529` rides the pane fade on `--dock-motion-resize` (the same `--spring-dock` curve as the morph), so they settle together. This is the AU.W2 "not iOS-smooth" fix and the AU.W8.1 single-frame-origin fix — `proof:dock-motion-single-source` guards it.
- **Velocity-continuity / interruptible spring** is live. `useLayerTransition.ts:234-255,307-317` re-seats an in-flight `SpringProgress` from its current `(value, velocity)` on a re-toggle instead of dispose-and-restart (AV.W9.2, the iOS interruptible contract). This is C3 from the AV crosswalk — already landed.
- **One driver per concern.** AV.W9.0/W9.1 retired the native `interpolate-size` arm and the native discrete-visibility arm that were dual-driving width/opacity and freezing the dock. Size = spring *or* VT; opacity = CSS crossfade; visibility = the 3-state delayed-hold fork (`dock.css:486-573`).
- **View Transitions fork** exists for the layer swap (`useLayerTransition.ts:199-211`, `view-transition.css` `.gl-dock-layer`), timing-matched to the FLIP via `--dock-resize-spring`.
- **On-demand `will-change`** (F3) is correct: set on the morphing `dim` at gesture start, cleared to `auto` on settle — never standing (`useLayerTransition.ts:166-181,295,329`).
- **`linear()` springs** are the token architecture (`tokens.css:159-163`, `--spring-dock` = response 0.5 / ζ 0.5 / ~+18.5%), mirrored bit-identically to the JS driver const (`useLayerTransition.ts:19`).

So the headline goals (smooth, springy, iOS-like, lockstep, no lag) are largely *met on the layer/resize path*. The remaining wins are at the edges: per-control micro-motion, the rail, enter/leave of popovers, directional intent, reduced-motion replace-not-remove, and graceful wrap.

## Guidance → dock-fold map (each with Baseline date)

| Guidance item (CLI id) | Baseline | Dock fold | Status in dock today |
|---|---|---|---|
| `physics-based-easing` (`linear()`) | **WA — 2023-12-11** (crosses Widely-Available ~2026-06-11) | All dock springs read `--spring-*`; demote any cubic-bezier to fallback-only | ✓ shipped; audit for stragglers |
| `individual-transform-properties` | **WA — 2022-08-05** | Control press/hover declare ONLY the changed axis (`scale`/`translate`), with identity base to pin stacking context | Partial — dock root has `scale:1` identity base (`dock.css`), but per-control press/hover not audited for individual-transform discipline |
| `animate-element-entry-exit` (`@starting-style` + `allow-discrete`) | **NA — 2024-08-06** | Dock dropdown/select/popover/tooltip enter-leave including `display:none`, via the `.glass-top-layer` grammar | GAP — dock controls (`DockDropdownTrigger`, `DockSelectTrigger`) host portals but the dock's own collapsed→expanded uses FLIP; the *spawned overlays* could use the declarative entry grammar |
| `animate-to-from-top-layer` (`overlay` + `allow-discrete`) | `@starting-style`/`transition-behavior` **NA — 2024-08-06**; `overlay` **Limited (Chromium only)** | Dock popovers/dropdowns animate in/out of top layer with `overlay` in the transition list | GAP — verify dock-spawned reka portals carry `overlay` transition; `overlay` is Chromium-only so keep `@supports`-gated |
| `same-document-transitions` + `group-element-transitions` (`view-transition-class`) | **NA — 2025-10-14** (FF 144 crossed it) | Layer swap morph; widen to dock *tab*/rail swaps + configurator-preset swaps | ✓ shipped for layer swap; GAP — rail tab indicator + cross-layer content not VT-grouped |
| Typed/active VT (`types`, `:active-view-transition-type()`) | **NA — 2026-01-13** | Directional dock-layer slides (left/right by tab index delta) — replaces hand-rolled FLIP-direction branching | GAP — no directional intent today; layers crossfade only |
| `animate-to-intrinsic-sizes` (`interpolate-size`/`calc-size()`) | **Limited — Chromium 129 only** (no FF/Safari) | True `height:auto` dock morph without pixel FLIP | DEFER — explicitly retired (AV.W9.0) because it dual-drove the spring and froze the dock. Trigger to revisit: 2-of-3 engines. Keep FLIP/`dim`. |
| scroll-driven `scroll()`/`view()` | **Limited** — not Baseline (FF flag-gated) | Not a dock concern (dock is not scroll-anchored); skip | N/A for dock — correctly out of scope |
| `dynamic-sibling-animations` (`sibling-index()`) | **Limited — Chrome 138 / Safari 26.2, no FF** | Staggered entrance of dock items/controls on expand (rhythmic iOS reveal) | GAP — items currently fade as one block; a stagger is the "polish" lever. Must be `@supports`-gated with a JS `--sibling-index` fallback |
| `interactions-in-complex-layouts` / `faster-spa-view-transitions` (`content-visibility`) | **NA — 2025-09-15** | Inactive dock layers get `content-visibility:hidden` to cache render state + isolate reflow | GAP — inactive layers use `visibility:hidden` (keeps layout for FLIP measure) — `content-visibility` is incompatible with the FLIP measure but viable on the VT path |
| `will-change` (compositor hygiene) | (property, long-supported) | On-demand only, cleared on settle | ✓ shipped (F3) |
| `prefers-reduced-motion` replace-not-remove (G3) | media query | Under `reduce`: drop size/translate FLIP, keep opacity crossfade | ✓ FLIP path gated (`useLayerTransition.ts:219-228`); VT path CSS-gated (`view-transition.css`) |

## Diagnosis: where the dock is NOT yet iOS-grade

Reading the source against the "consistent language, polished layering + rail, graceful wrap" goal:

1. **Per-control micro-motion is inconsistent.** The rail tabs transition `background`/`color` on `--dock-motion-fast` (`dock.css:794-797`) while the layer morph rides `--dock-motion-resize` (spring). Icon-button press/hover, tab-button, select/dropdown triggers each declare their own timing. There is no single *control-motion* token family the way there's a single *resize* family. iOS-consistency means one press-spring, one hover-curve across every dock control. `--dock-press-spring` exists (`tokens.css:1310`) but isn't proven to be the sole authority across all five control families.

2. **No directional intent on layer/tab swaps.** Switching rail tab 1→3 looks identical to 3→1 — both crossfade. iOS slides *in the direction of travel*. Typed VT (`:active-view-transition-type()`, Baseline 2026-01-13) is the clean primitive: tag the transition `forward`/`backward` from the tab-index delta and let CSS own the slide direction. This replaces any hand-rolled FLIP-direction branching and is the single biggest "feels alive" upgrade left.

3. **Items don't stagger on expand.** The collapsed→expanded reveal fades the whole `.dock-layer--full` as one opacity block. The polished iOS dock reveals children with a short rhythmic stagger. `sibling-index()` (Limited) or a JS `--sibling-index` fallback on `animation-delay`/`transition-delay` gives this. Low-risk, `@supports`-gated.

4. **Rail indicator vs. layer morph are not choreographed.** The travelling `TabsIndicator` (`dock.css:770-776`, reka) moves on its own clock; the layer crossfade moves on `--spring-dock`. They should share a curve so the indicator and the content arrive together (the same lockstep principle already applied to size+opacity, extended to the rail).

5. **Wrap is a hard layout switch, not a morph.** `.dock-overflow-wrap` (`dock.css:676-706`) flips `white-space`, `border-radius`, `max-width`, and `flex-wrap` at `--dock-overflow-bp` with no transition — a single-frame reflow snap. "Graceful wrap" wants the row→multi-row reflow to ride a transition (height morph on the FLIP/`dim` path the dock already owns), or at minimum a `@media` cross-fade rather than a hard cut.

6. **Enter/leave of dock-spawned overlays bypasses the declarative grammar.** Dropdowns/selects/popovers spawned from dock triggers are reka portals; their enter/leave should use `@starting-style` + `transition-behavior:allow-discrete` (+ `overlay` where Chromium) for `display:none`-aware exit, consistent with the `.glass-top-layer` grammar the library already ships (`animations.css §TOP-LAYER`). Today they likely pop without the discrete-exit polish.

## ADOPT / wave-seed list (concrete AW dock-animation folds)

Ordered by leverage. All re-seat existing machinery; none touch keyframes.js.

- **AW-W: dock-control-motion token convergence.** One `--dock-press-spring` + one `--dock-hover-curve` as the *sole* authority across all five control families (icon-button, tab-button, select-trigger, dropdown-trigger, dark-mode-toggle) and the rail tab. Demote any per-control bespoke timing/cubic-bezier to fallback-only. Audit gate: every dock control transition reads a `--spring-*`/`--dock-*` token (extends C2). Cites `physics-based-easing` (WA 2023-12-11), `individual-transform-properties` (WA 2022-08-05). *Lowest risk, highest consistency payoff.*

- **AW-W: directional typed View Transitions for layer + rail-tab swaps.** Add `types: ['forward'|'backward']` (from tab-index delta) to the `startViewTransition` call in `useLayerTransition.ts`; CSS `:active-view-transition-type(forward)` drives a directional slide via `view-transition-class: gl-dock-layer`. Replaces crossfade-only with iOS directional travel. `@supports`-gated; FLIP fallback unchanged. Cites typed VT **NA 2026-01-13**, `group-element-transitions` **NA 2025-10-14**. *Biggest "feels alive" win.*

- **AW-W: staggered item reveal on expand.** `transition-delay`/`animation-delay: calc(sibling-index() * var(--dock-stagger))` on `.dock-layer--full > *`, with a JS `--sibling-index` fallback under `@supports not (...)`. Short stagger (~30-50ms/item), zeroed under `reduce`. Cites `dynamic-sibling-animations` (**Limited** — Chrome 138 / Safari 26.2, no FF; MANDATORY fallback). *Pure polish, low risk.*

- **AW-W: rail-indicator/layer-content choreography.** Bind the `TabsIndicator` travel curve to `--dock-resize-spring` (the same `--spring-dock` the layer morph uses) so the indicator and the swapped content arrive in lockstep. Extends the size+opacity lockstep principle to the rail. No new primitive.

- **AW-W: graceful wrap morph.** Route the `.dock-overflow-wrap` row→multi-row transition through the dock's existing `dim`/FLIP height path (or a `@media`-boundary crossfade) instead of the hard `white-space`/`max-width`/`flex-wrap` cut at `--dock-overflow-bp`. Cites `animate-to-intrinsic-sizes` as the *ideal* primitive but **DEFER** the native `interpolate-size` (Limited, Chromium-only, and already retired for dual-drive) — implement via the FLIP `dim` morph the dock owns. *Closes the last hard-cut in dock motion.*

- **AW-W: declarative enter/leave for dock-spawned overlays.** Extend the `.glass-top-layer` `@starting-style` + `transition-behavior:allow-discrete` grammar to dropdown/select/popover content spawned from dock triggers, including `overlay` in the transition list (`@supports`-gated — `overlay` is Chromium-only). Cites `animate-element-entry-exit` + `animate-to-from-top-layer` (**NA 2024-08-06**; `overlay` Limited). *Consistency: every dock overlay enters/exits with one grammar.*

- **AW-W (DEFER, trigger-noted): `content-visibility:hidden` on inactive layers.** Caches inactive-layer render state + isolates reflow (`faster-spa-view-transitions` / `interactions-in-complex-layouts`, **NA 2025-09-15**). Incompatible with the FLIP measure (which needs inactive layout flow), so viable ONLY on the VT path or for a 3+-layer `DockLayerGroup`. Trigger: a dock with many heavy layers shows measurable swap cost.

## Citations

- `modern-web-guidance@latest` CLI, retrieved 2026-06-06: `retrieve` of `animate-element-entry-exit`, `animate-to-from-top-layer`, `animate-to-intrinsic-sizes`, `individual-transform-properties`, `physics-based-easing`, `same-document-transitions`, `group-element-transitions`, `faster-spa-view-transitions`, `dynamic-sibling-animations`, `interactions-in-complex-layouts`. Each guide embeds its web.dev Baseline status/date (quoted in the table above).
- Chrome modern-web-guidance landing: https://developer.chrome.com/docs/modern-web-guidance (overview only; per-topic Baseline data lives in the CLI guides, which mirror web.dev).
- MDN `sibling-index()` (https://developer.mozilla.org/en-US/docs/Web/CSS/sibling-index, fetched 2026-06-06): "Not Baseline … limited availability."
- AV SOTA-crosswalk: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AV/audit/SOTA-crosswalk.md:21-36,64-69,85-96` (Baseline crosswalk + C3 velocity-continuity, F3 will-change, G3 reduce replace-not-remove).

## Key source seams (absolute paths)

- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts:199-211` (VT fork), `:219-228` (PRM gate), `:234-255,307-317` (velocity-continuity re-seat), `:262-333` (single-frame-origin lockstep), `:166-181,295,329` (on-demand will-change)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue:202-230` (outer layer VT name), `:262-288` (resize-morph prop guard)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockLayerGroup.vue:57-89` (inner group VT), `:132-162` (reka Tabs rail)
- `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:454-573` (layer crossfade + lockstep), `:676-706` (wrap hard-cut), `:770-808` (rail + indicator motion)
- `/Users/mkbabb/Programming/glass-ui/src/styles/view-transition.css` (`.gl-dock-layer` recipe)
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:159-163` (`--spring-*`), `:1295-1310` (`--dock-resize-spring`, `--dock-press-spring`)

## Partial synthesis

I have everything needed. The brief is well-cited, and I've verified the precise source seams for both known bugs and the token architecture. I'll now compile the synthesis.

---

# AW DOCK-ANIMATION SYNTHESIS

Research + diagnosis. No implementation. keyframes.js is READ-ONLY (name-forward). Baseline dates from `modern-web-guidance@latest` (retrieved 2026-06-06).

---

## PART 1 — THE DOCK ANIMATION-LANGUAGE PATH

### 1.1 The motion-language law: one concern, one driver, one curve

The dock has already converged on the correct architecture; AW does not re-found it, it *finishes* it and extends it to the un-converged edges. The law in one line:

> **Size has exactly one driver. Opacity has exactly one driver. Visibility has exactly one driver. Every driver reads the same `(0.5, 0.5)` source curve. Parent and children run on ONE timeline.**

This is hard-won. AV.W9.0 retired the native `interpolate-size` arm and AV.W9.1 retired the native discrete-visibility arm precisely *because* they were second drivers racing the spring (`dock.css:460-475,562-573`). The single-driver table at HEAD:

| Concern | Sole driver | Curve source |
|---|---|---|
| size (width/height) | `SpringProgress` FLIP **or** View-Transition group (never both per swap) | `DOCK_SPRING (0.5, 0.5)` const == `--spring-dock` token, bit-identical (`useLayerTransition.ts:19`, `tokens.css --spring-dock`) |
| opacity | CSS `opacity var(--dock-motion-resize)` crossfade on `.dock-layer{,-item-host}` | `--dock-motion-resize` → `--dock-resize-spring` → `--spring-dock` (`dock.css:526-529`) |
| visibility | delayed-hold 3-state fork (`visibility 0s linear var(--duration-normal)`) | `--duration-normal` hold (the a11y-006 bite-anchor, LOAD-BEARING) |

The token cascade is the law's substrate: `--spring-dock` (the linear() ladder, ζ=0.5, ~+18.5% overshoot, in the iOS 15-30% band) → `--dock-resize-spring` → `--dock-motion-resize` (`= var(--duration-normal) var(--dock-resize-spring)`). One retune of `--spring-dock` re-curves *every* size+opacity surface. This is the J token-first invariant applied to motion.

### 1.2 The iOS-grade springiness — what makes it feel alive

Three properties, all present on the layer/resize path, none yet universal:

1. **Overshoot in the 15-30% band.** `--spring-dock` peaks at ~+16.3% near the 14% slot then settles — the felt iOS bounce. `--spring-snappy` (ζ=0.65, +6.8%) was tried and rejected as "mechanical" (`tokens.css` AU.W8 note). AW keeps `--spring-dock` as the size/resize authority and introduces `--spring-bouncy`-backed `--dock-press-spring` (already defined, `tokens.css:1310` = `var(--duration-fast) var(--spring-bouncy)`) as the *control press* authority — a faster, transform-only squish-with-springback.

2. **Velocity continuity through interruption.** `useLayerTransition.ts:234-255,307-317` re-seats an in-flight `SpringProgress` from its live `(value, velocity)` on a re-toggle (the solver's `set target` re-seats the closed-form) instead of dispose+reconstruct-from-rest. A re-toggle mid-morph carries momentum — the iOS interruptible-spring contract. This is C3 from the AV crosswalk, landed. AW must not regress it: every new fold (directional VT, stagger) layers ON this, never replaces the re-seat.

3. **On-demand compositor hygiene.** `will-change:<dim>` set at gesture start, cleared to `auto` on settle AFTER the final paint so it never races the last frame (`useLayerTransition.ts:175-181,295,329`). F3, landed. The press-spring fold must follow the same discipline (transform-only, no standing hint).

### 1.3 THE TWO KNOWN BUGS — root cause + gestalt fix

Both bugs are the **same disease in two locations**: a second driver, or a fork in the start-frame origin, breaks the single-timeline law. Both are fixed by the same medicine the layer path already takes.

#### BUG A — the simple-collapse width-morph regression

**Symptom:** GlassDock's outer collapsed↔expanded swap (the *simple* dock, no `DockLayerGroup`) jerks/snaps on width instead of morphing — the binary `width:auto` non-interpolation R1/R6 originally diagnosed, re-surfacing.

**Root cause (precise):** The outer pair routes through the *same* `useLayerTransition` composable as the inner group (`GlassDock.vue:206-210`), so on the **FLIP fallback path** it is correct. The regression lives on the **native VT path**. `GlassDock.vue:223-230` sets `view-transition-name` + `view-transition-class: gl-dock-layer` on `.dock-layers` ONLY when `supportsVT`. When VT is supported, the swap goes through `startViewTransition` (`useLayerTransition.ts:199-211`) and the browser is supposed to capture+morph the box. But the **outer** `.dock-layers` box width is governed by `transition: width var(--dock-motion-resize)` (`dock.css:457`) which is STILL LIVE on the VT path — and the VT snapshot captures a box that is *simultaneously* being CSS-transitioned. Two size authorities on one box during the VT window: the VT group morph and the standing `transition: width`. The standing CSS `width` transition is the regression's second driver — it is the exact AV.W9.0 disease (`interpolate-size` was retired but the plain `transition: width` on `.dock-layers` at `:457` was left standing). On the simple dock the destination is `width:auto` (intrinsic), so the standing transition can't interpolate it and snaps, while the VT path's snapshot fights it.

**Gestalt fix (single-driver, name-forward):** On the VT path the `.dock-layers` standing `transition: width` MUST be suppressed (the VT group owns size). The clean expression: gate `transition: width var(--dock-motion-resize)` behind `@supports not (...)` for the VT-capable engine, OR set `transition-property` to exclude `width` on the `view-transition-name`-bearing box — so width has ONE owner per engine (VT group on supporting engines, FLIP spring on the fallback). This re-expresses the `e8380d7` "one driver owns the morph" invariant on the *outer* box, which W9.0 applied only to the inner subtree. Name-forward: nothing in keyframes.js changes; this is a CSS-cascade gate + the existing `startViewTransition` substrate.

#### BUG B — the shrink-before-fade lockstep lag

**Symptom:** on expand/collapse the pill resizes a beat *before* the items fade in/out — the "items lag the pill," "not iOS-smooth" report.

**Root cause (precise):** two independent root causes, both historically patched, with a residual:
- *Cause B1 (duration mismatch — FIXED, guard against regression):* the host opacity used to ride `--dock-motion-fast` (0.2s) while the container morphed on `--dock-motion-resize` (0.3s+spring) — a 100ms-apart settle (`dock.css:516-523`, AU.W2). FIXED: the fade now rides `--dock-motion-resize`, the SAME curve as the morph. **AW must lock this with a gate** — any control or layer that fades on `--dock-motion-fast` instead of `--dock-motion-resize` re-opens B1.
- *Cause B2 (start-frame fork — FIXED, the load-bearing fix):* the layer ref swap (→ class-opacity) and the width set (→ size morph) used to start in *different* animation frames — the box shrank in frame N, items faded in frame N+1. FIXED: the swap is DEFERRED into the *same* rAF that sets width (`useLayerTransition.ts:260-273`), one frame ORIGIN for both. `proof:dock-motion-single-source` guards it.

**The residual the user still feels:** B1+B2 align the *layer* fade with the *size* morph, but the **rail indicator** (`TabsIndicator`, `dock.css:794-797`) and **per-control** transitions still run on `--dock-motion-fast`, NOT `--dock-motion-resize`. So when a layer swap also moves the rail indicator, the indicator arrives ~100ms before the content — a *second* shrink-before-fade, displaced onto the rail. The gestalt fix is the **same medicine**: bind the rail indicator travel and any swap-coupled control motion to `--dock-resize-spring`, so parent box + child fade + rail indicator settle on ONE timeline.

**Gestalt fix (one timeline, parent+children):** extend the AU.W2 lockstep principle from {size, opacity} to {size, opacity, rail-indicator, swap-coupled controls}. Every surface that moves *as part of a layer swap* reads `--dock-motion-resize`/`--dock-resize-spring`. Press/hover micro-motion (NOT swap-coupled) reads `--dock-press-spring` — a deliberately faster, separate timeline, because a press is a discrete user gesture, not part of the morph choreography. The law: **swap-coupled motion shares the resize timeline; gesture motion shares the press timeline; nothing rides a bare `--dock-motion-fast` cubic-bezier.**

### 1.4 Layering + rail + wrap refinements

- **Rail/content choreography (fixes Bug B residual):** `TabsIndicator` travel → `--dock-resize-spring`, lockstep with the layer crossfade.
- **Directional intent (the biggest felt upgrade):** typed View Transitions — tag the swap `forward`/`backward` from the tab-index delta, let `:active-view-transition-type(forward)` drive an iOS directional slide. Replaces crossfade-only. Baseline **2026-01-13**; `@supports`-gated, FLIP fallback unchanged.
- **Staggered reveal:** `transition-delay: calc(sibling-index() * var(--dock-stagger))` on `.dock-layer--full > *`, ~30-50ms/item, zeroed under `reduce`. `sibling-index()` is **Limited** (Chrome 138 / Safari 26.2, no Firefox) — a JS `--sibling-index` fallback under `@supports not (...)` is MANDATORY.
- **Graceful wrap:** `.dock-overflow-wrap` (`dock.css:676-706`) flips `white-space`/`border-radius`/`max-width`/`flex-wrap` at the `--dock-overflow-bp` `@media` (`dock.css:919`) with NO transition — a single-frame reflow snap. Route the row→multi-row height delta through the dock's existing `dim`/FLIP height path (the dock already owns height morph for vertical docks). DEFER the native `interpolate-size`/`calc-size()` ideal (Limited, Chromium-only, already retired for dual-drive) — implement via the owned FLIP `dim` morph.
- **Declarative overlay enter/leave:** dock-spawned dropdowns/selects/popovers (reka portals from `DockDropdownTrigger`/`DockSelectTrigger`) should use the shipped `.glass-top-layer` grammar — `@starting-style` + `transition-behavior: allow-discrete` (+ `overlay` in the transition list, `@supports`-gated since `overlay` is Chromium-only). Baseline **2024-08-06** (`overlay` Limited).
- **DEFER `content-visibility:hidden` on inactive layers:** incompatible with the FLIP measure (needs inactive layout flow), viable only on the VT path or a 3+-layer group. Baseline **2025-09-15**. Trigger: a many-heavy-layer dock shows measurable swap cost.

### 1.5 keyframes.js consumption — name-forward

glass-ui adopts from keyframes.js, NEVER edits it:

- **`SpringProgress`** — the analytic spring ODE solver. glass-ui constructs it with `{response, dampingFraction, initial, respectReducedMotion}`, drives via `.play(onFrame)`, reads `.value`/`.velocity`/`.settled`, retargets via `.target =` setter (re-seats closed-form from live `(value, velocity)`), and `.dispose()`. This is the LIGHT surface — it owns its own `RAFPlayback`, carries no value.js edge. **NEVER** import `AnimationGroup`/`loadAnimationEngine`/`CSSKeyframesAnimation`/`.fromString` — those cross the HEAVY `./engine` boundary and drag value.js into the dock bundle (`useLayerTransition.ts:13-17`).
- The `--spring-*` `linear()` token ladder is BUILD-GENERATED from keyframes.js spring presets via `scripts/regen-spring-tokens.mjs`, so the CSS token and the JS driver const sample the SAME analytic ODE — bit-identical motion. The mirror invariant: a retune touches BOTH `DOCK_SPRING` and the PRESETS row, or the curves drift.
- **What AW adds is name-forward only:** new motion re-seats the EXISTING `SpringProgress`/`--spring-*` machinery. Directional VT, stagger, rail-choreography, wrap-morph all reuse the already-imported `SpringProgress` + `startViewTransition` substrate + the existing token ladder. Zero engine edits.

---

## PART 2 — THE AW DOCK WAVE SEEDS

Ordered by leverage. Each: scope · technique · behavioral gate (PROVES lockstep + width-morph at runtime).

### AW-W0 — width-morph single-driver restoration (Bug A fix) — **HEADLINE FIX**
- **Scope:** the simple GlassDock collapsed↔expanded width-morph regression on the native VT path.
- **Technique:** suppress the standing `transition: width var(--dock-motion-resize)` on `.dock-layers` (`dock.css:457`) for the VT-capable engine — gate it behind `@supports not (...)` or strip `width` from `transition-property` on the `view-transition-name`-bearing box. One size authority per engine: VT group (supporting) | FLIP spring (fallback). No keyframes.js touch.
- **Behavioral gate (`proof:dock-width-morph-live`, runtime):** drive a real engine (Playwright/`browser_evaluate`); toggle the simple dock collapsed→expanded; sample `.dock-layers` `getBoundingClientRect().width` across frames. PROVE: width traverses ≥ N intermediate values monotonically-ish toward the spring overshoot (NOT a 2-value snap), AND no frame shows two simultaneous width authorities (VT pseudo + inline). Born-RED before the gate by asserting the current snap.

### AW-W1 — swap-timeline lockstep extension (Bug B residual fix)
- **Scope:** rail `TabsIndicator` + any swap-coupled control motion onto the resize timeline.
- **Technique:** rebind `.dock-layer-tab-indicator` travel from `--dock-motion-fast` to `--dock-resize-spring`; audit every swap-coupled transition for `--dock-motion-resize`. Tab GLYPH color/background stays `--dock-press-spring`/`--dock-motion-fast` (gesture motion, separate timeline by design).
- **Behavioral gate (`proof:dock-lockstep-rail`, runtime):** trigger a 1→3 rail swap; sample `.dock-layers` width settle-time AND `.dock-layer-tab-indicator` transform settle-time. PROVE: |settle_size − settle_indicator| < one frame (~16ms). Extends `proof:dock-motion-single-source`.

### AW-W2 — dock-control-motion token convergence
- **Scope:** all five control families (icon-button, tab-button, select-trigger, dropdown-trigger, dark-mode-toggle) + rail tab.
- **Technique:** `--dock-press-spring` (transform-only squish, already defined) as the SOLE press authority; one `--dock-hover-curve` as the sole hover authority. Demote every per-control bespoke cubic-bezier/`--dock-motion-fast` to fallback-only. Cites `physics-based-easing` (WA **2023-12-11**), `individual-transform-properties` (WA **2022-08-05** — declare ONLY the changed axis: `scale`/`translate` with an identity base to pin the stacking context).
- **Behavioral gate (`proof:dock-control-motion-single-source`, static+runtime):** grep every dock control transition resolves to a `--spring-*`/`--dock-*` token (no bare `cubic-bezier`); runtime-assert a press fires a transform-only spring (no background/border on the press timeline). *Lowest risk, highest consistency.*

### AW-W3 — directional typed View Transitions (the "feels alive" win)
- **Scope:** layer + rail-tab swaps gain directional intent.
- **Technique:** add `types: [delta > 0 ? 'forward' : 'backward']` to the `startViewTransition` call (`useLayerTransition.ts:202`) from the tab-index delta; CSS `:active-view-transition-type(forward)` drives a directional slide via `view-transition-class: gl-dock-layer`. `@supports`-gated; FLIP fallback unchanged; PRM CSS-gated. Cites typed VT **NA 2026-01-13**, `group-element-transitions` **NA 2025-10-14**.
- **Behavioral gate (`proof:dock-directional-vt`, runtime):** 1→3 swap slides one direction, 3→1 the opposite; assert the VT pseudo carries the correct `:active-view-transition-type`. Under `reduce`: crossfade only, no slide.

### AW-W4 — staggered item reveal on expand
- **Scope:** `.dock-layer--full > *` rhythmic entrance on collapsed→expanded.
- **Technique:** `transition-delay: calc(sibling-index() * var(--dock-stagger))` (~30-50ms/item), JS `--sibling-index` fallback under `@supports not (...)`, zeroed under `reduce`. Cites `dynamic-sibling-animations` **Limited** (Chrome 138 / Safari 26.2, no Firefox — MANDATORY fallback).
- **Behavioral gate (`proof:dock-stagger`, runtime):** on expand, item N's opacity-start lags item N-1 by `--dock-stagger` ± frame; under `reduce` all deltas == 0. Verify the fallback path on a non-`sibling-index` engine.

### AW-W5 — graceful wrap morph
- **Scope:** the `.dock-overflow-wrap` row→multi-row hard cut.
- **Technique:** route the wrap height delta through the dock's owned `dim`/FLIP height morph (the same `useLayerTransition` height path vertical docks use) instead of the single-frame `white-space`/`max-width`/`flex-wrap` snap at `--dock-overflow-bp`. DEFER native `interpolate-size`/`calc-size()` (Limited, Chromium-only, retired for dual-drive).
- **Behavioral gate (`proof:dock-wrap-morph`, runtime):** cross the `--dock-overflow-bp` boundary; sample dock height across frames — PROVE it morphs (≥ N intermediate values) rather than snapping in one frame.

### AW-W6 — declarative overlay enter/leave
- **Scope:** dock-spawned dropdown/select/popover/tooltip content.
- **Technique:** extend `.glass-top-layer` `@starting-style` + `transition-behavior: allow-discrete` grammar (`animations.css §TOP-LAYER`) to dock-trigger portals, `overlay` in the transition list `@supports`-gated. Cites `animate-element-entry-exit` + `animate-to-from-top-layer` **NA 2024-08-06** (`overlay` Limited).
- **Behavioral gate (`proof:dock-overlay-discrete`, runtime):** assert a dock dropdown's exit animation completes BEFORE `display:none` (discrete-exit), not a pop-out.

### AW-W7 (DEFER, trigger-noted) — `content-visibility:hidden` on inactive layers
- **Scope:** inactive layers in a 3+-layer `DockLayerGroup` on the VT path.
- **Technique:** `content-visibility:hidden` to cache render state + isolate reflow. Incompatible with the FLIP measure (needs inactive flow) — VT-path / 3+-layer only. Cites `faster-spa-view-transitions` / `interactions-in-complex-layouts` **NA 2025-09-15**.
- **Trigger:** a many-heavy-layer dock shows measurable swap cost.

---

## PART 3 — DOCK README OUTLINE

`src/components/custom/dock/README.md` (proposed):

1. **What the dock is** — collapsible glass pill, dual-layer grid, horizontal | vertical, multi-layer `DockLayerGroup`.
2. **The motion law** — one concern/one driver/one curve table (§1.1); the `--spring-dock` → `--dock-resize-spring` → `--dock-motion-resize` cascade; the bit-identical CSS-token ↔ JS-driver mirror.
3. **The two timelines** — *resize timeline* (`--dock-motion-resize`, swap-coupled: size + opacity + rail + stagger) vs *press timeline* (`--dock-press-spring`, gesture: hover/press squish). When to reach for which.
4. **The three engine paths** — native View-Transition (size+crossfade, browser-owned) | FLIP spring fallback (one inline-size driver) | PRM fast-path (synchronous swap). The fork condition + why exactly one runs per swap.
5. **Interruptible springs** — the velocity-continuity re-seat contract; never dispose+restart mid-morph.
6. **Directional + stagger** — typed VT direction-of-travel; `sibling-index()` stagger with mandatory JS fallback; Baseline-gating discipline.
7. **Orientation + multi-layer** — `orientation` prop, `DockLayerGroup`/`DockLayer`, the switcher rail, `inert` on inactive layers.
8. **a11y contracts** — root is presentational (no `aria-expanded` on root; on the trigger child); `DockBackgroundToggle` WCAG 2.2.2; the 3-state visibility fork (a11y-006 bite-anchor).
9. **Token reference** — every `--dock-*` axis, default, what it tunes.
10. **The gates** — `proof:dock-motion-single-source`, `proof:dock-width-morph-live`, `proof:dock-lockstep-rail`, `proof:dock-a11y-contract`, `proof:offscreen-pause`; what each PROVES.
11. **keyframes.js boundary** — LIGHT `SpringProgress` only; the HEAVY `./engine` import ban + why (value.js bundle bloat).

---

## HEADLINE + LOCKSTEP/REGRESSION FIX SUMMARY

**Headline:** the dock is already near-SOTA on the hard parts — single-driver size/opacity/visibility, bit-identical CSS-token ↔ JS-spring mirror, velocity-continuous interruptible springs, on-demand `will-change`. AW finishes the convergence and extends the lockstep law to the un-converged edges: **directional typed View Transitions (the biggest "feels alive" win, Baseline 2026-01-13), one control-motion token family, staggered reveal, rail/content choreography, and graceful wrap** — every fold re-seats the existing `SpringProgress`/`--spring-*` machinery, zero keyframes.js edits.

**Both known bugs are one disease — a broken single-timeline — fixed by the medicine the layer path already takes:**

- **Bug A (simple-collapse width-morph regression):** root cause is a *second size driver* — the standing `transition: width var(--dock-motion-resize)` on `.dock-layers` (`dock.css:457`) survives on the native VT path and fights the VT group's box morph; on the simple dock the `width:auto` destination can't interpolate and snaps. Fix: suppress the standing width transition on the VT-capable engine so width has ONE owner per engine (VT group | FLIP spring) — the W9.0 "one driver owns the morph" invariant applied to the *outer* box it never reached. **Gate: `proof:dock-width-morph-live` samples runtime width across frames — proves ≥ N intermediate values, not a 2-value snap.**

- **Bug B (shrink-before-fade lockstep lag):** two historical root causes already fixed — the duration mismatch (fade was 0.2s vs morph 0.3s+spring; now both ride `--dock-motion-resize`, AU.W2) and the start-frame fork (swap deferred into the *same* rAF as the width set, one frame origin, AU.W8.1 / `proof:dock-motion-single-source`). The **residual** the user still feels is the rail indicator on `--dock-motion-fast` arriving ~100ms before the content — the same shrink-before-fade displaced onto the rail. Fix (AW-W1): bind the rail indicator + all swap-coupled motion to `--dock-resize-spring` so parent box + child fade + rail settle on ONE timeline. **Gate: `proof:dock-lockstep-rail` asserts |settle_size − settle_indicator| < one frame.**

The unifying law: **swap-coupled motion shares the resize timeline; gesture motion shares the press timeline; nothing rides a bare `--dock-motion-fast` cubic-bezier — and every box has exactly one size authority per engine.**

**Key source seams (absolute):** `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts:199-211,234-255,260-273,307-333` · `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue:202-230,262-288` · `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:457,460-475,516-573,676-706,770-808,919` · `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css` (`--spring-dock`, `--dock-resize-spring`, `--dock-press-spring`, `--dock-overflow-bp:640px`) · `/Users/mkbabb/Programming/glass-ui/src/styles/view-transition.css` (`.gl-dock-layer`).
