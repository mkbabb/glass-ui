# BG-WS2 · Dock convergence — the hallmark dock, re-modularized + in-place-morphing (pass 1 spec)

> **Owns:** the `src/components/custom/dock/` dir (33 files / 6772 LOC) · the demo shell docks (`demo/layout/SidebarDock.vue`, `BottomDock.vue`, `AppShell.vue` morph stage) · the dock CSS partials (`src/styles/dock/*`) · the dock stories.
> **Consumes (does NOT re-author):** WS3's unified glass-blur register (the dock is a PEER, not a heavier dock-special) + WS3's cast-retire on the dock chrome · WS1's `out-in` route swap + ONE shell aurora (the live-paint precondition).
> **Hands off:** the generic n-ary morph-primitive dedup (`useLiquidMorph` DELETE, the FLIP-trio→`useFlip`) → WS4 · the dead-gate `release`-tag downgrade roster → WS7.
> **Sequence:** WS3 + WS1 land FIRST. Inside WS2: UNIFY → BUSY-SINGLE → CUT → DECOMPOSE → FISSION-WIRE → PERSISTENT-CUT → SCROLL-TRIO → SHELL-DOCK-DRY → **INPLACE-MORPH** (the headline, last — it depends on SHELL-DOCK-DRY) → STORY-MODULARIZE (thin, deferrable).

---

## GESTALT GOAL

The dock is "the hallmark" (C-DOCK, the longest chronic). Today it is five SpringProgress engines, two near-duplicate morph orchestrators, a 711-line god-SFC, ~1500 LOC of dead/≤1-consumer composables, a V↔H morph trapped in an esc-broken `role="dialog"` modal over two SYNTHETIC docks defaulting to a flat View-Transition crossfade, a persistent red script-ℱ brand egg with a continuous Fourier-redraw animation, dock scrolling that is dead (a capped axis that never armed a scroll port → trailing utility controls permanently unreachable at 1280×600), and a dock-special blur dialect heavier than the components it sits beside.

After WS2 the dock reads as ONE coherent iOS-27 liquid-glass nav band:

1. **ONE spring, ONE morph engine, ONE busy signal.** Exactly one `new SpringProgress` in the dock dir (a `useDockSpring` factory, grep-asserted). The two near-duplicate morph orchestrators (`dockMorphContext` + `useLayerTransition`) collapse to ONE. The four overlapping "is the dock busy?" signals collapse to ONE `morphing` ref. The dir drops 33 → ~24 files with zero broken import.
2. **The V↔H morph is a BUTTON IN THE DOCK that flips the REAL nav dock in place** — Apple's own `GlassEffectContainer` + `.sidebarAdaptable` model (ONE adaptive chrome changing orientation, never two components, never a modal). No `role="dialog"`, no synthetic docks, esc moot. A continuous liquid teardrop (`--dock-morph-t` 0↔1, the goo bridge occluding the topology-reflow midpoint), bidirectional + interruptible (velocity-carried) + PRM-snap. **NO `startViewTransition` crossfade survives in the dock V↔H path.**
3. **No persistent brand egg.** The ℱ wordmark + its continuous Fourier-redraw long-press (Apple's named steady-state anti-pattern, "let glass rest in steady states") are gone from the SidebarDock. Foundations rejoins the category nav as a normal entry.
4. **A capped dock axis is ALWAYS a scroll axis.** At 1280×600 the SidebarDock trailing utility controls are reachable: `scrollHeight > clientHeight` AND `overflow-y: auto` AND every control hit-tests to itself AND the cross-axis inset plate is NOT clipped (the soft scroll-edge fades where the port meets the glass chrome).
5. **The dock blur is a PEER.** The dock reads WS3's unified `resting` blur register; the dock-special `--glass-blur-dock*` dialect is gone. Glassiness comes from edge lensing + specular (the shipped `.glass-lens`/`useSpecularPointer`), not a thicker Gaussian.
6. **Smoother + weightier motion.** The morph carries the 12 laws — arcs (the teardrop neck bows, not a straight blend), overlapping-action + follow-through (the chrome legs settle at different rates via `animation-delay` staggers keyed off the ONE `--dock-morph-t` scalar), ζ<1 arrival overshoot (DOCK_SPRING already +7.3%). The flat `--dock-live` LINEAR cross-fade is replaced by the spring weld.

The cardinal bar is REAL paint, both modes, Chrome AND Safari (C-SAFARI is unaddressed at HEAD — the headless-green/visually-broken trap shipped 3×). PRM seats synchronously: no 10×74 collapsed-from sliver.

---

## MECHANISM (idiomatic, concrete)

### M1 — Five SpringProgress sites → ONE `useDockSpring` factory (`BG.W-DOCK-MORPH-UNIFY`)

The five sites (`dockMorphContext.ts:176`, `useDockOrientationMorph.ts:204`, `useLayerTransition.ts:259`, `useDockItemDrag.ts:106`, `useDockFission.ts:484`) repeat IDENTICAL boilerplate: construct `SpringProgress`, snapshot `inheritedVelocity = spring && !spring.settled ? spring.velocity : 0`, `disposeSpring()`, `reset(from, inheritedVelocity)`, `target = to`, `play(onFrame)`. This is the library's own "ONE spring ONE clock" canon (`useLayerTransition.ts:7`) violated 5× in its own dir.

Mint **`composables/useDockSpring.ts`** — a colocated factory owning create/dispose + the interruptible velocity-rebase + `play(0→1)` + the `respectReducedMotion` synchronous seat. It **PARAMETERIZES `(response, dampingFraction)`** (a hard fact: `useDockItemDrag.ts:106` passes a CONFIGURABLE register, NOT DOCK_SPRING — a factory hardcoding DOCK_SPRING breaks the drag) and takes `onFrame`/`onSettle` callbacks. The per-site side-effects stay AT the call sites (the `[data-punching]` arm, the `transitionId` guard, `morphing.value`/`[data-morphing]`). **DOCK_SPRING is byte-fenced** (`constants.ts:85` = `springPreset("dock")`, response 0.68 / ζ 0.64 — the value.js letter's explicit no-retune fence): the factory READS it, never re-tunes. keyframes.js stays OFF the root barrel (peer-optional; the factory rides the `/dock` chunk). All five sites compose `useDockSpring`. **Grep bar: exactly one `new SpringProgress` in the dock dir post-wave (in `useDockSpring.ts`).**

### M2 — Two near-duplicate morph orchestrators → ONE (`BG.W-DOCK-MORPH-UNIFY`, cont.)

`dockMorphContext.ts` (`useDockMorphOrchestrator`, the collapse/expand multi-target orchestrator that GlassDock provides) and `useLayerTransition.ts` (385L, the standalone per-`DockLayerGroup` FLIP engine) solve the IDENTICAL damped-harmonic ODE over a `--dock-morph-t` scalar with FLIP-pinned from/to + interruptible re-base + PRM jump. `useLayerTransition.ts:37-48` itself ADMITS the fold was BOOKED to AY.W-GOD1 and never ran; `DockLayerGroup.vue:224-244` runtime-branches `useOptionalDockMorphContext()` (nested) ELSE `useLayerTransition` (standalone). The drift-guard gate `proof:dock-orchestrator-single` exists only to keep the two byte-faithful copies byte-faithful — its existence IS the smell.

**Fold:** `GlassDock` always provides a `useDockMorphOrchestrator` instance; standalone `DockLayerGroup` MINTS its OWN orchestrator instance (instead of the `useLayerTransition` fork). Move the standalone path's only genuine deltas — the FLIP-measure + `seatSync` + `deferReposition` Popper seam — onto the orchestrator's standalone branch. **DELETE `useLayerTransition.ts` + its `dock/index.ts:57` public re-export (clean break, no alias — `proof:no-dual-path`).** **RETIRE `proof:dock-orchestrator-single`** (`gates.mjs` row dropped — the job evaporates when there is one engine).

### M3 — Four busy-signals → ONE `morphing` ref + kill the dead wiring (`BG.W-DOCK-BUSY-SINGLE`)

Four overlapping "is-dock-busy?" signals span four files: `useDockMorphWindow.isTransitioning`, `useDockClickIntegrity` (`MORPH_SETTLE` + `data-morphing` + `settleDeadline`), `useDockState` (`data-morphing` + `isTransitioning`), `dockMorphContext.data-morphing`. Collapse to ONE orchestrator-owned `morphing` ref (already the `[data-morphing]` source) read by every consumer. **Kill the dead wiring:** `GlassDock.vue:581-582` `@transitionend`/`@transitioncancel` + `constants.ts:95` `RESIZE_MORPH_PROPS = Set([width,height,padding,transform])` are events the `--dock-morph-t` spring path NEVER fires (the morph is a compositor transform, not a CSS transition) — DELETE them. **`useDockMorphWindow.ts` (118L) is vestigial once the busy-signal collapses + the dead `@transitionend` it listens for is gone — RETIRE it** (its single GlassDock consumer reads the orchestrator's `morphing` ref instead).

### M4 — The dead 551-line engine + the genuinely-dead cut (`BG.W-DOCK-CUT`)

`useDockContextSilhouette.ts` (551L) has ZERO real import consumers — verified live: its only references are itself, its own test (`tests/components/custom/dock/useDockContextSilhouette.test.ts`), and a COMMENT in `AppSwitcher.vue` (which actually imports + uses `useBloomUp`). It is off both dock barrels. **DELETE the composable + its test + RETIRE the 341-line `scripts/proof-dock-context.mjs` + its `gates.mjs` row** (a gate certifying a dead engine is dead-weight). Verify+drop the dead companions it carried (`DockSilhouetteDescriptor` type, `constants.ts` `DOCK_CONTEXT_LABEL` if no other reader). **Cross-WS / cross-workstream check (R7):** the "context silhouette" name overlaps WS6 (Siri/contextual). Confirm with WS6 it is NOT the contextual-silhouette substrate WS6 wants BEFORE the cut — if WS6 claims it, route to FISSION-WIRE's DECIDE instead. The risk-research + KISS-research + tranche-history all independently verify it dead; the WS6 confirmation is the one open coupling.

**Routed OUT (do NOT double-build):** `useLiquidMorph.ts` (462L, `src/composables/motion/`, 0 real consumers — manifest.ts prose only) + `glass/liquid-morph.css` are the dead n-ary-split SPIKE; they live OUTSIDE the dock dir and are WS4's `BG.W-DEADCODE-CUT` / motion-dedup territory (WS1 routed them to WS2/WS4). WS2 does NOT delete them — but FISSION-WIRE (M6) coordinates the n-ary-split engine choice with WS4 so the dock-fission wire does not bless a duplicate.

### M5 — The 711-line god-SFC decomposed (`BG.W-DOCK-DECOMPOSE`)

`GlassDock.vue` (711L) is one of three dock files grandfathered in `proof:no-god-module` `RATCHET_BASELINES` (the close demands `== {}`). The already-extracted single-consumer composables (`useDockShellProps` 317L, `useDockState`, `useDockClickIntegrity`, `useDockItemDrag`, `useDockMorphWindow`-now-retired) ARE the decomposition seam — they are KEPT (single-consumer-by-design decomposition leaves, not cuts; the brief WANTS the god-SFC carved). The remaining inline glue to extract WITHOUT contrivance (the >500-line law, colocated):

- The **fission piece-registration + pointer-drag-split** cluster (`GlassDock.vue:341-506` ≈ 165L: `splitSignature`/`splitPlacement` watches, `registerSplittablePieces`, `dockCenter`, the split-commit pointer handler, the drag-split state, `split`/`merge`/`toggleSplit`) → a colocated `composables/useDockFissionWiring.ts` (or absorbed into `useDockFission`'s own `registerPiece` surface; if FISSION-WIRE retires fission, this glue evaporates with it).
- The **touch-gate handlers** (`GlassDock.vue:278-321`) → `composables/useDockTouchGate.ts`.

With M2 (`useLayerTransition` deleted), M3 (`useDockMorphWindow` retired), M4 (silhouette deleted), and this carve, all three dock RATCHET rows reach `{}` for close. **Net file-count is offset by the merges** (M6 fold of `railProjection` into `DockStack`; the `dockContext` + `dockLayerContext` 65L+53L merge into one `dockContexts.ts` if their providers are co-located) so the +useDockSpring/+touch-gate adds do not regrow the dir — the directional bar is ~24, the HARD bars are the grep invariants (one SpringProgress, no broken import) + `RATCHET_BASELINES == {}`.

**Cross-WS note (the cartoon-cast):** WS3 owns the structural cast-retire on the dock chrome (`GlassDock.vue:606` `.cartoon-cast` span + `dock/shape.css` block + `[data-punching]` deepen + PRM arm — WS3 M2). WS2 does NOT also delete it (no double-build); WS2's decompose leaves the cast span to WS3's CAST-RETIRE wave and coordinates the line-range so the two waves do not collide on `GlassDock.vue`.

### M6 — Fission: the DECIDE (`BG.W-DOCK-FISSION-WIRE`)

The dock-arch audit's "CUT `useDockFission`" is OVERRULED — its "1 demo consumer" claim is STALE. Live grep at HEAD: `useDockFission` is consumed by `GlassDock.vue` (`:splittable`), `liquid-playground.vue`, `dock-gallery.vue`, `examples/DynamicIslandCall.vue`, `DockExampleTile.vue`, and is a published `/dock` + root-barrel export — 4+ live story consumers, and the user EXPLICITLY names goo-fission as core hallmark expressiveness (C-DOCK / WS2-04, "Apple-Music logo split, filament neck spans the gap"). This is a `BB.W-NDA-DECIDE`-shaped formal DECIDE, NOT a blind delete (standing-risk #5 — never blind-delete a loud-requested landed engine):

- **WIRE (the likely verdict):** revive the demo-private/broken fission to a real ≥2-consumer paint — fix the `url(#dock-fission-goo)` → `none` resolution on shipped surfaces (DRY the bridge onto the ONE Safari-safe `GooFilter` mount, the `feGaussianBlur stdDeviation≈9` + `feColorMatrix alpha×18−7` STATIC graph, regular `filter:url()` per WebKit bug 245510 — `BG.W-SHELL-DOCK-DRY` shares this seam), and revive the dead φ-tier projection (the `railProjection.ts` `tieredSpan`/`ringOffset` math; floor `fadeMinAlpha` off `0` so facet chips never fade to invisibility — the `mode="facets"` carousel is a persistent flex strip, NOT the macOS-stack hover-fan at `opacity:0`). Decompose `useDockFission` (604L, a RATCHET row) into a colocated `fission/` sub-dir to drain the row.
- **RETIRE (if the wire cannot reach ≥2 REAL paint consumers):** a formal `inv-11` registry-consumer-probed prune with rationale + successor, the `dock/index.ts` + `src/index.ts` + `api/index.ts` exports pruned in-diff, the demo `:splittable` stories retired — clean break, no alias.

**Coordinate the n-ary-split engine with WS4 FIRST** (D30): there are FOUR morph engines (`dockMorphContext`, `useDockOrientationMorph`, `useDockFission`, the dead `useLiquidMorph`). Pick ONE n-ary-split engine before wiring so FISSION-WIRE does not bless a duplicate. `railProjection.ts` (pure φ-math, single consumer `DockStack`) is KEEPABLE — fold it into `DockStack.vue` to drop a file, but the fission cut/wire must NOT collateral-delete it.

**Same DECIDE bar, softer:** `useDockItemDrag` (1 demo consumer) + `useDockSearch` (1 demo consumer + the booked speedtest consumer; a published `/dock` feature) — audit the ≥2-consumer bar; lean KEEP for the genuine published feature (`useDockSearch`), DECIDE-retire the demo-only drag if no second real consumer lands. Do not silently keep an overfit primitive.

### M7 — The V↔H morph: delete the modal, flip the REAL dock in place (`BG.W-SHELL-DOCK-DRY` → `BG.W-DOCK-INPLACE-MORPH`, the headline)

**The HEAD state IS the defect (D13).** `AppShell.vue` renders the morph as a hand-rolled `<div role="dialog" aria-modal="true" @keydown.esc="closeMorphStage">` (`:499-505`) — esc bound to a non-focusable, non-autofocused div with no focus-trap, so it never fires. The DEFAULT register is the dead VT crossfade (`liquidPreview = ref(false)` `:112`; `toggleShellMorph` `:128` wraps `startViewTransition` flipping `vtOrientation`); the teardrop is a mere opt-in `Switch`. The stage hosts TWO SYNTHETIC 5-icon docks (`morphEntries`, `:86`), not the real shell docks. A window-event triple-hop (`SidebarDock`/`BottomDock` dispatch `glass-ui-demo:toggle-dock-morph` → `AppShell` listener `:185` → `morphStageOpen` ref → modal) drives it. The sibling story `morph-showcase.vue:2-20` ALREADY killed the crossfade ("the crossfade DIES … ONE mode, the weld") — `AppShell` is a STALE FORK that never inherited the BD.W-MORPH-FIELD-WELD fix.

**The in-place mechanism (the KISS endpoint).** The web platform cannot continuously interpolate a flex column→row TOPOLOGY change (the `AX.W42` fold-7 limit) — Apple hides exactly this reflow inside the merge/blend at the merge threshold (the `GlassEffectContainer` + `.sidebarAdaptable` model: ONE adaptive chrome changing orientation, never two components). So:

1. **`BG.W-SHELL-DOCK-DRY` (prerequisite):** the duplicated chrome shared between `SidebarDock` and `BottomDock` (the category nav loop, the trailing utility group, the morph-button wiring) collapses into a shared seam (a `useShellNavDock` composable + shared sub-component) so a SINGLE morphable nav-dock instance can flip orientation in place. The original team's worry ("morphing SidebarDock into BottomDock would break navigation") was about a PERMANENT topology swap; a one-shot user-triggered demonstration morph that returns is fine, and the morphed state is itself a valid nav state (same live controls, re-laid-out). The responsive-specific affordances that genuinely differ (the mobile `BottomDock` category Sheet trigger — load-bearing mobile nav — `BottomDock.vue:210`) are PRESERVED; the DRY folds only the shared nav-loop + morph wiring. **P1 build-proves** whether this is a full single-SFC merge or a shared-composable-over-two-thin-SFCs, and the anchor behavior (in-place at the active dock's own fixed region, with the teardrop occluding the column→row reflow). The single-dock orientation-as-a-live-ref precedent is real (`liquid-playground.vue:92` — a single `<GlassDock :orientation>` flips column↔row in place; `useDockShellProps` orientation is fully reactive).

2. **`BG.W-DOCK-INPLACE-MORPH`:** the in-dock `ArrowLeftRight` `<DockIconButton>` (already imported, `SidebarDock.vue:32`) drives `useDockOrientationMorph` against the REAL shell dock root in place — a DIRECT ref toggle (delete the window-event triple-hop). The ONLY transition is the liquid teardrop: `--dock-morph-t` 0↔1, the `morph-bridge.css` SVG-goo (regular `filter:url(#…)`, gated to the occluded midpoint window `t∈0.18..0.82`) occluding the reflow at t≈0.5; bidirectional + interruptible (velocity-carried re-base via M1's `useDockSpring`) + PRM-snap (the `pin()` synchronous seat). The button is a real control with `aria-pressed` + `aria-label` reflecting orientation (NEVER an attr on the presentational dock root div — the `aria-allowed-attr` contract). **DELETE wholesale:** the `AppShell` modal stage (`:497-720`), the synthetic `morphEntries`, the VT-crossfade arm (`liquidPreview`/`vtOrientation`/`startViewTransition` `:112-133` — KEEP `startViewTransition` ONLY for the route-category crossfade at `:220`, a DIFFERENT use), the six modal fns, the `.demo-dock-morph-*` CSS (`:758-857`), the toggle event/listener, the `window.__shellDockMorph` test-hook. **No `startViewTransition` survives in the dock V↔H path** (grep-asserted). **KEEP the published two-DOM-dock `useDockOrientationMorph` for the `/dock/morph-showcase` story** (the fence — re-point its panes to real nav content, not synthetic entries).

**The teardrop budget (R2, the primed trap).** The recorded evidence (`W-DOCK-MORPH-INSITU-DELTA.md:146-154`): the per-frame `feGaussianBlur` teardrop MISSED budget on the real Metal dev-box (p50 13.7-15.1ms) while greening on headless SwiftShader (9.6ms) — the VT crossfade was chosen as the budget-clearing floor precisely here. The brief forbids VT survival, so the occlusion must be RE-ENGINEERED to clear (or transiently-acceptably-approach) budget, NOT fall back to VT. The filter graph stays STATIC (stdDeviation + matrix never animate — only `transform` on the shapes; the goo aspect is a pure `f(--dock-morph-t)`, no wall-clock). The morph is a ONE-SHOT user gesture (~0.7s, the goo only active ~0.4 of it) — a brief transient near-budget on a deliberate press is acceptable where a continuous animation would not be. **P2 build-proves the real-GPU cost** and, if frames exceed budget meaningfully, applies the cheaper occlusion (a `clip-path`/`mask` reveal-wipe between orientations — compositor-only, no filter re-raster — with a thin goo lip only at the wipe seam, OR a reduced blur region) that STILL reads as a liquid teardrop. C-SAFARI: the goo GRAPH is already WebKit-correct (regular `filter:url` + sRGB); the open risk is the backdrop-filter blur + per-frame repaint on WebKit/Metal — the orchestrator captures Safari paint at close.

**The 12-laws texture (reconciling R6 — single-scalar vs weight).** DOCK_SPRING is already weighty; the missing arcs/overlapping/follow-through come NOT from multi-channel springs (which would fragment the deterministic `morph.pin(t)` π capture seam) but from CSS `animation-delay` staggers + arc-origin transforms keyed off the ONE `--dock-morph-t` scalar (deterministic, compositor-only): the entering-child stagger front-loads on expand / reverses on collapse (overlapping-action), the chrome legs (bg/border/padding/radius) settle at different rates after the box stops (follow-through), the teardrop neck bows (arc). **Replace the flat `--dock-live` convex LINEAR blend in `layers.css` with the spring-weld follow-through** (the real "smoother/weightier" fix — A-motion-arch:65 finds the linear blend is the actual culprit, not the spring). Reuse the shipped `useLiquidFlex` volume-preserving reciprocal squish (squash/stretch = gravity/weight; ONE squish source, capped at `--dock-morph-max-stretch`).

### M8 — Persistent ℱ + Fourier egg removed (`BG.W-DOCK-PERSISTENT-CUT`)

C-PERSIST's "atop BOTH docks" is imprecise — only `SidebarDock` carries the ℱ (the script-glyph `&#x2131;` `#persistent` slot `:269-296` + the Fourier-redraw egg: `useLongPress` `:38`, `fireRedraw`/`wordmarkPress`/`@dblclick` `:177-283`, dispatching `glass-ui-demo:f-redraw`). The continuous-redraw animation is Apple's named steady-state anti-pattern ("let glass rest in steady states; avoid continuous rotation/animations"). The ℱ exists as a dedup workaround: Foundations is FILTERED OUT of the nav loop (`SidebarDock.vue:84` `c.id !== "foundations"`) only so ℱ can stand in for it.

**This is a COORDINATED edit, not a delete:** remove the ℱ `#persistent` slot + the egg cluster + the anchored (vestigial per BC.W-DOCK-STACK-RAIL topology) `DockSeparator`; **drop the foundations filter so Foundations rejoins category nav as a normal `Compass` `DockIconButton` entry**; remove the `AppShell` `FRedrawOverlay` import/render/`onFRedraw` listener (`:45,:347,:351,:488`); **DELETE `demo/eggs/FRedrawOverlay.vue` + `demo/eggs/useLongPress.ts`** — but VERIFY `useLongPress.ts` has no second consumer (codebase-deep flags `StoryHero.vue`; if it does, keep the composable, delete only the egg overlay) and **KEEP `demo/eggs/fGlyphPoints.ts`** (shared with `substrates/fourier-paths.ts`). **KEEP `BottomDock.vue:210` `#persistent`** — it is the mobile category Sheet trigger (`PanelLeft`), load-bearing mobile nav, NOT the brand. `proof:dock-region-model` asserts the `#persistent` slot collapses cleanly with no reserved void when empty.

### M9 — A capped axis is ALWAYS a scroll axis (`BG.W-DOCK-CAP-SCROLLS` + `BG.W-DOCK-OVERFLOW-FADE` + `BG.W-DOCK-UTILITY-REACH`)

**Root (live-reproduced @1280×600):** `shell.css:291` caps `.glass-dock.vertical` at `--dock-max-block-size` UNCONDITIONALLY, but the scroll port `overflow-y:auto` is GATED behind the `overflow="scroll"`/`.dock-scroll-y` opt-in (`overflow.css:62`) the demo `SidebarDock` never passes — so the capped block axis overflows `visible` and the bottom ~5 controls (dark-toggle, morph, gear) sit BELOW the 600px viewport, `document.elementFromPoint` → null, permanently unreachable.

**The fix is at the ROOT (clean break, no-legacy):** retire the `overflow` prop `"scroll"` union member + the `scrollClass` computed (`useDockShellProps.ts:107,:285`) + the `.dock-scroll-y` opt-in gate. Make capping unconditionally scroll its capped axis — when `--dock-max-block-size` (or `--dock-max-inline-size`) caps and content exceeds it, that axis is `overflow:auto` AND the cross axis is pinned `visible` IN THE SAME RULE. **The cross-axis `visible` pin is the answer DC-1 missed** (the BA.W-DOCK-GEOMETRY rationale removed scroll from the default rather than pinning the cross axis — but `overflow.css:69` already proves the pin in the opt-in path: a single-axis `overflow-y:auto` forces the cross axis to compute `auto`, clipping the 1.1× hover inset plate into a lozenge; the `overflow-x:visible` pin keeps the inset-plate clearance, `--dock-control-safe-inset` + `background-clip:content-box` preserved). Mirror the existing `.dock-scroll-x` horizontal pattern (`overflow.css:33-50`) for the vertical axis as the unconditional cap-derived rule. **`SidebarDock` needs ZERO prop change once the default is correct.** Keep the horizontal `overflow="scroll"` behaviour for `BottomDock` only where width is genuinely content-driven (a real choice there).

**The soft edge (`BG.W-DOCK-OVERFLOW-FADE`):** wire the shipped `useFadingScroll` / `--fade-scroll-width` soft edge where the capped scroll port meets the glass chrome — the iOS-26 `scrollEdgeEffectStyle(.soft)` model (scrolled content fades through the glass at the chrome edge), legibility cue (does NOT vanish under PRM, stops interpolating only).

**`BG.W-DOCK-UTILITY-REACH` is the acceptance arm** of CAP-SCROLLS (folded into its π bar, not a separate src change): the 1280×600 trailing-utility reachability readback.

### M10 — The dock blur is a PEER (consumed, not authored — WS3 owns the register)

WS3's M4 clean-break retires `--glass-blur-dock` / `--glass-blur-dock-radius` / `--glass-saturate-dock` and re-points `--dock-surface-blur` (`shell.css:17`) → `--glass-blur-resting`. WS2 does NOT mint or re-author a dock-special blur — it **grep-asserts no dock-special blur token survives in the dock CSS** (the convergence-bar peer invariant) and carries the dock's glassiness via the shipped lens/specular edge axis (`.glass-lens` / `useSpecularPointer`), not a thicker Gaussian. **Sequence: WS3 before WS2.** Flag the `DockStack` fan-out members' second backdrop-filter (`stack-rail.css:192`, a glass-on-glass violation in the dock gutter) to WS3 — dock-gutter members are flat tiers per the "no glass on glass" discipline, not a second glass plate.

### M11 — The dock stories (`BG.W-DOCK-STORY-MODULARIZE`, thin / deferrable)

Once the real shell dock morphs in place, `morph-showcase.vue` (two synthetic docks) is the canonical PUBLISHED two-DOM-dock demonstration of the `useDockOrientationMorph` primitive — KEEP it as the fence (re-pointed to real nav content). Re-modularize the oversized stories (`liquid-playground.vue` 46KB, `overview.vue` 34KB) onto the shared `DockStage`/`DockExampleTile` chassis (no demo-local re-fork) ONLY if the story sprawl proves a real maintenance cost; otherwise DEFER. Gate against broken imports.

---

## FILES TOUCHED (primary)

| File | Wave | Change |
|---|---|---|
| `src/components/custom/dock/composables/useDockSpring.ts` (NEW) | MORPH-UNIFY | the ONE SpringProgress factory (parameterized, velocity-rebase, PRM-seat) |
| `dockMorphContext.ts` · `useDockOrientationMorph.ts` · `useDockItemDrag.ts` · `useDockFission.ts` | MORPH-UNIFY | compose `useDockSpring`; drop own `new SpringProgress` |
| `useLayerTransition.ts` (DELETE) + `dock/index.ts:57` export | MORPH-UNIFY | fold FLIP-measure/seatSync/deferReposition into the orchestrator standalone path |
| `scripts/proof-dock-orchestrator-single.mjs` (RETIRE) + `gates.mjs` row | MORPH-UNIFY | drift-guard job evaporates |
| `DockLayerGroup.vue:224-244` | MORPH-UNIFY | standalone mints its own orchestrator (drop the `useLayerTransition` branch) |
| `useDockMorphWindow.ts` (RETIRE) · `GlassDock.vue:581-582` · `constants.ts:95` | BUSY-SINGLE | one `morphing` ref; delete dead `@transitionend`/`RESIZE_MORPH_PROPS` |
| `useDockClickIntegrity.ts` · `useDockState.ts` | BUSY-SINGLE | read the orchestrator `morphing` ref |
| `useDockContextSilhouette.ts` (DELETE) + its test + `scripts/proof-dock-context.mjs` (RETIRE) + `gates.mjs` row | CUT | the dead 551-line engine |
| `GlassDock.vue:341-506,278-321` → `useDockFissionWiring.ts` + `useDockTouchGate.ts` (NEW, colocated) | DECOMPOSE | drain the RATCHET row |
| `useDockFission.ts` (→ `fission/` sub-dir if WIRED) · `railProjection.ts` (`fadeMinAlpha` floor; fold into `DockStack.vue`) · the goo bridge DRY onto `GooFilter` | FISSION-WIRE | wire-or-retire DECIDE |
| `SidebarDock.vue:38,84,177-296` · `AppShell.vue:45,347,351,488` · `demo/eggs/FRedrawOverlay.vue` + `useLongPress.ts` (DELETE) | PERSISTENT-CUT | ℱ + egg out; Foundations rejoins nav |
| `src/styles/dock/overflow.css` · `shell.css:291` · `useDockShellProps.ts:107,285` | CAP-SCROLLS | cap ⇒ scroll + cross-axis `visible` pin; retire `"scroll"` member + `.dock-scroll-y` gate |
| `SidebarDock.vue` (scroll port) | OVERFLOW-FADE | `useFadingScroll` soft edge on the capped port |
| `demo/layout/SidebarDock.vue`/`BottomDock.vue` → shared `useShellNavDock` + sub-component | SHELL-DOCK-DRY | collapse the duplicated nav-loop + morph wiring → ONE morphable instance |
| `AppShell.vue:497-720,86,108-133,758-857,163,185,352` (DELETE modal+synthetic+VT+event-hop) · the in-dock button → direct ref toggle | INPLACE-MORPH | the headline |
| `scripts/proof-dock-morph-insitu.mjs` (M2/M4 flip born-RED→teardrop-only) · `tests-visual/dock-morph-insitu.spec.ts` + `storybook-meta.spec.ts:205-212` (drop `shell-dock-morph-*` testids) | INPLACE-MORPH | retire the crossfade-default enshrinement |
| `src/styles/dock/layers.css` (`--dock-live` linear blend → spring weld) · `morph-bridge.css` (occlusion re-engineer if P2 demands) | INPLACE-MORPH | 12-laws weight + teardrop budget |

**Cross-WS, do NOT touch in WS2:** the blur tokens (`glass.css`, `shell.css:17` — WS3) · the `.cartoon-cast` dock span (`GlassDock.vue:606`, `dock/shape.css` — WS3) · `useLiquidMorph.ts` + `liquid-morph.css` (WS4) · the FLIP-trio→`useFlip` (WS4).

---

## WAVE BREAKDOWN (11 waves; sequence by dependency)

**Pre:** WS3 (blur register + cast-retire) and WS1 (route swap + shell aurora) land FIRST — the cross-WS preconditions.

1. **`BG.W-DOCK-MORPH-UNIFY`** — mint `useDockSpring` (5→1, grep-asserted); fold `useLayerTransition` → orchestrator; retire `proof:dock-orchestrator-single`. *Independent; lands first (the AY.W-GOD1 fold, 4th deferral ends here).*
2. **`BG.W-DOCK-BUSY-SINGLE`** — 4 busy-signals → 1 `morphing` ref; kill dead `@transitionend`/`RESIZE_MORPH_PROPS`; retire `useDockMorphWindow`. *Depends on #1 (the orchestrator owns the ref).*
3. **`BG.W-DOCK-CUT`** — delete `useDockContextSilhouette` + test + `proof:dock-context` (after WS6 confirms it unwanted). *Independent.*
4. **`BG.W-DOCK-DECOMPOSE`** — carve `GlassDock` 711 → colocated fission-wiring + touch-gate; drain RATCHET rows. *Depends on #1-#3 (the deleted/folded files clear the way); coordinates the cast line-range with WS3.*
5. **`BG.W-DOCK-FISSION-WIRE`** — the DECIDE (wire ≥2 real or retire); floor `railProjection.fadeMinAlpha`; DRY the goo bridge. *Depends on WS4's n-ary-engine choice + #4.*
6. **`BG.W-DOCK-PERSISTENT-CUT`** — ℱ + egg out; Foundations rejoins nav. *Independent (demo-shell only).*
7. **`BG.W-DOCK-CAP-SCROLLS`** (+ folded **`-UTILITY-REACH`**) — cap ⇒ scroll + cross-axis `visible` pin; retire the opt-in. *Independent (CSS-first).*
8. **`BG.W-DOCK-OVERFLOW-FADE`** — `useFadingScroll` soft edge. *Depends on #7.*
9. **`BG.W-SHELL-DOCK-DRY`** — collapse the two shell docks → ONE morphable nav-dock instance. *Depends on #6 (the ℱ removal simplifies the shared chrome); prerequisite for #10.*
10. **`BG.W-DOCK-INPLACE-MORPH`** — the headline: delete modal+synthetic+VT; in-dock button flips the real dock in place via teardrop; 12-laws weight; flip `proof:dock-morph-insitu` born-RED. *Depends on #1 (`useDockSpring`) + #9 (single instance).*
11. **`BG.W-DOCK-STORY-MODULARIZE`** — thin demo-side; DEFERRABLE.

**Dead-gate downgrade roster → WS7** (each cut wave names its gate): `proof:dock-orchestrator-single` (retire), `proof:dock-context` (retire), `proof:dock-morph-insitu` M2/M4 (flip to teardrop-only or retire), `storybook-meta.spec.ts` `shell-dock-morph-*` testids (drop), `proof:dock-fission` (re-point to the real-paint π if WIRED). The false-green certifier must not ship a 4th broken close.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar — real paint, both modes, Chrome AND Safari)

**Grep / structural (CI, device-free):**
- Exactly ONE `new SpringProgress` in `src/components/custom/dock/` (in `useDockSpring.ts`).
- Zero `startViewTransition` in the dock V↔H path; `AppShell` has no `role="dialog"` morph stage, no synthetic `morphEntries`, no `liquidPreview`/`vtOrientation`.
- No dock-special blur token (`--glass-blur-dock*`/`--glass-saturate-dock`/`--dock-surface-blur` heavier than the WS3 `resting` peer) survives.
- No ℱ control atop either dock; Foundations present in the category nav loop; `BottomDock` `#persistent` (mobile category trigger) intact.
- Dir file-count ~24 (directional), zero broken import (`vue-tsc --noEmit` green), `proof:no-god-module` `RATCHET_BASELINES == {}`.
- `proof:no-layout-animation` green (the morph stays compositor transform-over-reserved-footprint; the `--dock-live` linear blend replaced, not a new width/height/padding lerp).
- `profile:budget --enforce` green (the re-modularization SHRINKS, never grows, the dock CSS draw; `dist/styles/index.css` ≤ 548k/140k HARD HALT; the `/dock` chunk keeps keyframes off the root barrel).

**Live π (real GPU, the binding paint — the orchestrator captures; headless lies here):**
- **V↔H in-place morph:** the `--dock-morph-t` 0→1 frame-series on the REAL shell nav dock (not a modal, not synthetic), the goo bridge PRESENT at the t≈0.5 midpoint, bidirectional, interruptible (a mid-morph re-press carries velocity — no snap-from-rest), PRM synchronous seat (no 10×74 sliver). The button carries `aria-pressed`/`aria-label`. **Chrome AND Safari** (the goo is regular `filter:url`; verify it actually morphs, no screen flash). **The teardrop clears (or transiently-acceptably-approaches) the 16.7ms budget on real Metal** — the P2 trace, NOT the SwiftShader number.
- **Layer-swap + collapse morph** paint identical light + dark; reads as arcs + overshoot (12 laws), not a flat blend.
- **Dock scroll @1280×600:** `scrollHeight > clientHeight` AND `overflow-y:auto` AND every trailing utility control (`document.elementFromPoint` → itself) AND the cross-axis inset plate `overflow:visible` (not clipped) — all four, the SidebarDock with no prop change. The soft scroll-edge fade reads where the port meets chrome.
- **Facets** (`mode="facets"`) read at rest at `opacity:1` (no fade-to-0) WITHOUT breaking the macOS-stack hover-fan.
- **Persistent-cut:** the SidebarDock `#persistent` slot collapses with no reserved void; Foundations clickable in nav; no continuous Fourier animation.

---

## FOLDED DEFERRED ITEMS (no silent drop)

- **Cross-WS — blur register:** WS3 owns the unified blur def; WS2 consumes it as a peer (M10). The `DockStack` fan-out glass-on-glass (`stack-rail.css:192`) is flagged to WS3.
- **Cross-WS — cartoon-cast retire on the dock chrome:** WS3 M2 (structural span + `dock/shape.css` block). WS2 coordinates the `GlassDock.vue` line-range to avoid a collision.
- **Cross-WS — n-ary morph dedup:** `useLiquidMorph` DELETE + the FLIP-trio (`useLiquidReveal`/`useBloomUp`/`useDockCtaReceive`) → one `useFlip` → WS4 (D30). FISSION-WIRE picks the ONE n-ary engine WITH WS4 before wiring.
- **`useDockContextSilhouette` ⇄ WS6:** confirm WS6 does not want it as the contextual-silhouette substrate before the cut (R7).
- **`useDockSearch` / `useDockItemDrag` ≥2-consumer audit:** softer DECIDE inside FISSION-WIRE (lean KEEP for the published search feature; DECIDE-retire demo-only drag if no second real consumer).
- **`containerName`-freezes-morph footgun (RC9):** while in `useDockShellProps.ts:241-265`, design out the `container-type:inline-size` clamp (resolve the container-query subject without clamping the box) rather than re-documenting it a 6th time. Booked to DECOMPOSE if it touches the carve; else a thin rider.
- **`DOCK_SPRING` byte-fence:** the value.js letter's explicit no-retune — `useDockSpring` wraps but never re-tunes; `railProjection.ts` pure φ-math kept (consumed by `DockStack`).

---

## OPEN RISKS

- **R1 (structural, highest) — the in-place morph needs the shell-dock unification.** The two shell docks are separate fixed-anchored SFCs; the team explicitly built the modal because a permanent topology swap breaks nav. The spec commits to a one-shot in-place morph on the active dock at its own anchor (`SHELL-DOCK-DRY` → `INPLACE-MORPH`), gated on **P1** build-proof. If P1 cannot build a real in-place flip that reads correctly + keeps nav live, WS2-03 is blocked and the spec's mechanism is wrong — the spec SAYS so.
- **R2 (the primed headless trap) — teardrop-only deletes the budget-clearing floor.** The recorded Metal miss (p50 13.7-15.1ms) is real; SwiftShader greens it falsely. **P2** must trace real GPU and re-engineer the occlusion (cheaper clip-path/mask wipe) if the transient exceeds budget meaningfully — NOT fall back to VT. Safari paint is unverifiable in this harness; the orchestrator captures it at close.
- **R3 — the 12-laws/single-scalar reconcile** is committed as `animation-delay` staggers off the ONE `--dock-morph-t` (deterministic, preserves the `morph.pin` capture) — verify it reads as weight + keeps the π capture seam (P-design).
- **R4 — concurrency:** the dock dir is the densest shared surface across the live worktree lanes; serialize dock-dir ownership for the WS2 pass (one agent at a time on the dir refactor).
- **R5 — file-count vs fission-wire:** wiring fission (decomposed into a sub-dir) adds files; the ~24 target is directional, the grep invariants are the hard bars.
