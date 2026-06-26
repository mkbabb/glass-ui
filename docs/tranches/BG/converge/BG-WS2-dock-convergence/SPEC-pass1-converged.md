# BG-WS2 · Dock convergence — the hallmark dock, re-modularized + in-place-morphing (pass-1 CONVERGED spec)

> **Status:** pass-1 converged. Every BG.W-* wave below carries its VALIDATED mechanism (the prototype
> finding it earned), its REAL-PAINT-π acceptance bar, and the folded critique mustFixes. The
> unconverged frontier (the items that earned a `refine` and remain open) is named explicitly in
> §OPEN RISKS + §RESIDUAL FRONTIER — none silently dropped.
>
> **Owns:** the `src/components/custom/dock/` dir (33 files / 6772 LOC) · the demo shell docks
> (`demo/layout/SidebarDock.vue`, `BottomDock.vue`, `AppShell.vue` morph stage) · the dock CSS
> partials (`src/styles/dock/*`) · the dock stories.
> **Consumes (does NOT re-author):** WS3's unified glass-blur register (the dock is a PEER, not a
> heavier dock-special) + WS3's cast-retire on the dock chrome · WS1's `out-in` route swap + ONE
> shell aurora (the live-paint precondition).
> **Hands off:** the generic n-ary morph-primitive dedup (`useLiquidMorph` DELETE, the FLIP-trio →
> `useFlip`) → WS4 · the dead-gate `release`-tag downgrade roster → WS7.
> **Sequence:** WS3 + WS1 land FIRST. Inside WS2: UNIFY → BUSY-SINGLE → CUT → DECOMPOSE → FISSION-WIRE
> → PERSISTENT-CUT → CAP-SCROLLS → OVERFLOW-FADE → SHELL-DOCK-DRY → **INPLACE-MORPH** (headline, last —
> depends on SHELL-DOCK-DRY) → STORY-MODULARIZE (thin, deferrable).

---

## GESTALT GOAL

The dock is "the hallmark" (C-DOCK, the longest chronic). Today it is five `SpringProgress` engines,
two near-duplicate morph orchestrators, a 711-line god-SFC, ~1500 LOC of dead/≤1-consumer composables,
a V↔H morph trapped in an esc-broken `role="dialog"` modal over two SYNTHETIC docks defaulting to a
flat View-Transition crossfade, a persistent red script-ℱ brand egg with a continuous Fourier-redraw
animation, dock scrolling that is dead (a capped axis that never armed a scroll port → trailing
utility controls permanently unreachable at 1280×600), and a dock-special blur dialect heavier than
the components it sits beside.

After WS2 the dock reads as ONE coherent iOS-27 liquid-glass nav band:

1. **ONE spring, ONE morph engine, ONE busy signal.** Exactly one `new SpringProgress` in the dock
   dir (a `useDockSpring` factory, grep-asserted). The two near-duplicate morph orchestrators
   (`dockMorphContext` + `useLayerTransition`) collapse to ONE. The four overlapping "is the dock
   busy?" signals collapse to ONE `morphing` ref. The dir drops 33 → ~24 files with zero broken
   import.
2. **The V↔H morph is a BUTTON IN THE DOCK that flips the REAL nav dock in place** — Apple's own
   `GlassEffectContainer` + `.sidebarAdaptable` model (ONE adaptive chrome changing orientation,
   never two components, never a modal). No `role="dialog"`, no synthetic docks, esc moot. A
   continuous liquid teardrop (`--dock-morph-t` 0↔1, the goo bridge occluding the topology-reflow
   midpoint), bidirectional + interruptible (velocity-carried) + PRM-snap. **NO `startViewTransition`
   crossfade survives in the dock V↔H path.**
3. **No persistent brand egg.** The ℱ wordmark + its continuous Fourier-redraw long-press (Apple's
   named steady-state anti-pattern, "let glass rest in steady states") are gone from the SidebarDock.
   Foundations rejoins the category nav as a normal entry.
4. **A capped dock axis is ALWAYS a scroll axis.** At 1280×600 the SidebarDock trailing utility
   controls are reachable: `scrollHeight > clientHeight` AND `overflow-y: auto` AND every control
   hit-tests to itself AND the painted control plate keeps ≥1px slack inside its cell at hover/focus
   (the lozenge stays dead) AND the soft scroll-edge fades where the port meets the glass chrome.
5. **The dock blur is a PEER.** The dock reads WS3's unified `resting` blur register; the dock-special
   `--glass-blur-dock*` dialect is gone. Glassiness comes from edge lensing + specular (the shipped
   `.glass-lens`/`useSpecularPointer`), not a thicker Gaussian.
6. **Smoother + weightier motion.** The morph carries the 12 laws — arcs (the teardrop neck bows),
   overlapping-action + follow-through (the chrome legs settle at different rates via
   `animation-delay` staggers keyed off the ONE `--dock-morph-t` scalar), ζ<1 arrival overshoot
   (DOCK_SPRING already +7.3%). The flat `--dock-live` LINEAR cross-fade is replaced by the spring
   weld.

The cardinal bar is REAL paint, both modes, **Chrome AND Safari** (C-SAFARI is unaddressed at HEAD —
the headless-green/visually-broken trap shipped 3×). PRM seats synchronously: no 10×74 collapsed-from
sliver.

---

## WHAT THE PROTOTYPES PROVED (the validated load-bearing facts)

| # | Prototype | Build | Critique | What it LOCKED for this spec |
|---|---|---|---|---|
| WS2-03 | In-place V↔H on the REAL shell dock (no modal) | ✅ | 52% refine | **The headline mechanism is paint-verified.** On real Chrome :5199, both modes: the SidebarDock flipped vertical 67×373 → horizontal 381×59 IN PLACE (box reflows column→row at the same anchor); the midpoint = dock dim (opacity 0.05) + necked (scaleX 0.34) with the goo teardrop active occluding the reflow. R1 (the structural falsifier — can ONE real dock flip in place keeping nav live, both modes, reflow occluded?) is **YES**. This is the biggest de-risk of the workstream. |
| — | Teardrop goo-bridge real-GPU budget | ✅ | 42% refine | **Real-Metal measurement IS reachable on this Mac** — launch HEADED Google Chrome (NOT playwright/MCP headless = SwiftShader = the recorded trap) with `--remote-debugging-port`, drive via a ~50-line CDP/WebSocket driver (Node 26 global `WebSocket`); confirmed live renderer = "ANGLE Metal Renderer". **The real defect found: the hitch is the `filter:none↔url()` TOGGLE (118-184ms), not the goo itself.** → the surgical fix (M7-budget below) supersedes the droplet/clip-path rewrite. |
| M1+M2 | useDockSpring 5→1 + useLayerTransition fold | ✅ | 62% refine | **The 5→1 collapse is genuinely KISS** — the 5 sites are the SAME interruptible-spring shape; `playTo` with internal velocity-snapshot covers all 4 morph callers AND the drag. Self-dispose-on-settle (`if(spring===s)dispose()`) is established precedent. **BUT M2 must NOT fold the FLIP-measure into `dockMorphContext.ts`** (F3 collision + measure-free-orchestrator law) → a colocated `dockLayerFlip.ts` leaf instead. |
| M9 | Cap-axis-always-scrolls @1280×600 | ✅ | 62% refine | **D12 reproduces exactly + the root is sharper than the spec:** SidebarDock is `vertical always-expanded` default `overflow="grow"` → resolves `overflow: visible` (shell.css:205-208) → trailing controls fall below 600px. **BUT the spec's "cross-axis `visible` pin" is mechanically IMPOSSIBLE** (CSS Overflow §3 forces it to `auto`; shell.css:222-236 already documents this). The lozenge guard is the GEOMETRIC inset, not a cross-axis pin. → M9 acceptance bar CORRECTED below. |
| — | 12-laws weight off `--dock-morph-t` | ❌ | 35% refine | **The diagnosis is correct + partly already-shipped** (the layers.css center-out stagger IS working overlapping-action off the single scalar; geometry→t + smootherstep opacities are pure-f(t)). **The flat `--dock-live` LINEAR blend is the real culprit** (A-motion-arch:65). **BUT the concrete squish fix is defective (build FAILED, inverts its own intent; the |Δt| squish is frame-rate-coupled).** → re-derive as pure-f(t); this wave needs a RE-PROTOTYPE (§RESIDUAL FRONTIER). |

---

## MECHANISM (idiomatic, concrete — hardened)

### M1 — Five SpringProgress sites → ONE `useDockSpring` factory (`BG.W-DOCK-MORPH-UNIFY`)

The five sites (`dockMorphContext.ts:176`, `useDockOrientationMorph.ts:204`, `useLayerTransition.ts:259`,
`useDockItemDrag.ts:106`, `useDockFission.ts:484` — **confirmed live at HEAD**) repeat IDENTICAL
boilerplate: construct `SpringProgress`, snapshot `inheritedVelocity = spring && !spring.settled ?
spring.velocity : 0`, `disposeSpring()`, `reset(from, inheritedVelocity)`, `target = to`,
`play(onFrame)`. This is the library's own "ONE spring ONE clock" canon (`useLayerTransition.ts:7`)
violated 5× in its own dir.

Mint **`composables/useDockSpring.ts`** — a colocated factory owning create/dispose + the interruptible
velocity-rebase + `playTo(from→to, {onFrame, onSettle})` + the `respectReducedMotion` synchronous seat
+ self-dispose-on-settle (`if (spring === s) dispose()` — the validated lifecycle). It
**PARAMETERIZES `(response, dampingFraction)`** (a hard fact: `useDockItemDrag.ts:106` passes a
CONFIGURABLE register, NOT DOCK_SPRING — a factory hardcoding DOCK_SPRING breaks the drag). The
per-site side-effects stay AT the call sites (the `[data-punching]` arm, the `transitionId` guard,
`morphing.value`/`[data-morphing]`). **DOCK_SPRING is byte-fenced** (`constants.ts:85` =
`springPreset("dock")`, response 0.68 / ζ 0.64 — the value.js letter's explicit no-retune fence): the
factory READS it, never re-tunes. keyframes.js stays OFF the root barrel (peer-optional; the factory
rides the `/dock` chunk). All five sites compose `useDockSpring`. **Grep bar: exactly one
`new SpringProgress` in the dock dir post-wave (in `useDockSpring.ts`).**

**FOLDED (critique mustFix — the drag lifecycle):** the drag's `subscribe → onFrame/onSettle`
migration must preserve the FULL guard (`grabbed && dragging.value === false && flingActive`), the
`liquid.drive(min(1, v))` squish, the finish-fling-on-settle, AND the **zero-spring-when-never-dragged
invariant** (the drag uses a LAZY persistent reused spring + subscribe; collapsing to fresh-per-fling
`playTo` changes the lifecycle and must lose no inter-fling state). The factory exposes BOTH the
fresh-episode `playTo` (the 4 morph callers + each drag fling = a fresh 0→1) AND a lazy-construct guard
so a never-dragged surface constructs ZERO spring.

### M2 — Two near-duplicate orchestrators → ONE, via a colocated FLIP leaf (`BG.W-DOCK-MORPH-UNIFY`, cont.)

`dockMorphContext.ts` (`useDockMorphOrchestrator`, the collapse/expand multi-target orchestrator that
GlassDock provides) and `useLayerTransition.ts` (385L, the standalone per-`DockLayerGroup` FLIP engine)
solve the IDENTICAL damped-harmonic ODE over a `--dock-morph-t` scalar. `useLayerTransition.ts:37-48`
itself ADMITS the fold was BOOKED to AY.W-GOD1 and never ran; `DockLayerGroup.vue:224-244`
runtime-branches `useOptionalDockMorphContext()` (nested) ELSE `useLayerTransition` (standalone).

**The fold (CORRECTED per critique — the F3-collision is the trap):**

- **`dockMorphContext.ts` STAYS MEASURE-FREE.** Do NOT fold the FLIP-measure into it — that collides
  with `proof:dock-morph-family` F3's negative regex AND `BD.W-DOCK-CORE`'s measure-free-orchestrator
  law. Extract `useLayerTransition`'s only genuine standalone deltas — the per-swap FLIP from/to
  measure + `seatSync` + the `deferReposition` Popper A'-4 seam + `directionTypes` + the VT-native
  layer-swap fork at `DockLayerGroup.vue:258-269` — into a NEW colocated **`composables/dockLayerFlip.ts`**
  leaf. `GlassDock` always provides a `useDockMorphOrchestrator` instance; standalone `DockLayerGroup`
  MINTS its own orchestrator instance AND composes `dockLayerFlip.ts` for the measure/seat deltas. The
  orchestrator stays measure-free; the FLIP-measure lives in the leaf the standalone branch composes.
- **The public-API break is handled, not silent (critique mustFix):** `useLayerTransition` is a
  published `/dock` export (`dock/index.ts:57` — **confirmed**). Removing it requires: (a) a
  `MIGRATION.md` clean-break row (none exists), (b) drop it from BOTH `tests/public-surface.spec.ts`
  lists (lines ~250 + ~343), (c) verify the `api/index.ts` discovery surface. A bare delete strands
  external consumers silently — forbidden.
- **`proof:dock-orchestrator-single` is RE-HOMED, not blind-retired (critique mustFix).** The static
  drift-guard (keeping two byte-faithful copies byte-faithful) evaporates — but its RUNTIME invariant
  (`engineCount == 1` + the one-clock onset π: a mounted nested `DockLayerGroup` constructs exactly
  ONE spring, DEFERRING to the dock's, never a second) must STILL be proven; static grep (one
  `new SpringProgress`) does NOT prove the deferral fires. Re-point the spring-COUNT + one-clock-onset
  assertion onto `useDockSpring` (a `proof:dock-spring-single` successor or the existing job
  re-pointed) and fix the importing `tests/components/custom/dock/dock-orchestrator-single.detect.test.ts`
  (it RUN-breaks the instant the script retires).
- **SEQUENCE the gate re-points BEFORE the file delete (critique mustFix — confirmed live):** SIX
  gates + TWO tests read `useLayerTransition.ts` BY FILE — `proof:dock-orchestrator-single`,
  `proof:composable-return-types`, `proof:spring-tokens-synced`, `proof:perf-producer` (the A'-4
  `deferReposition` assert), `proof:motion-value-free`, `proof:dock-vocabulary`, plus
  `public-surface.spec.ts` + `dock-orchestrator-single.detect.test.ts`. A dangling file-read reds the
  close the moment the file is gone. Re-point each onto `dockLayerFlip.ts` / `useDockSpring` /
  `dockMorphContext.ts` FIRST, delete the file LAST.

### M3 — Four busy-signals → ONE `morphing` ref + kill the dead wiring (`BG.W-DOCK-BUSY-SINGLE`)

Four overlapping "is-dock-busy?" signals span four files: `useDockMorphWindow.isTransitioning`,
`useDockClickIntegrity` (`MORPH_SETTLE` + `data-morphing` + `settleDeadline`), `useDockState`
(`data-morphing` + `isTransitioning`), `dockMorphContext.data-morphing`. Collapse to ONE
orchestrator-owned `morphing` ref (already the `[data-morphing]` source) read by every consumer.
**Kill the dead wiring:** `GlassDock.vue:581-582` `@transitionend`/`@transitioncancel` +
`constants.ts:95` `RESIZE_MORPH_PROPS = Set([width,height,padding,transform])` are events the
`--dock-morph-t` spring path NEVER fires (the morph is a compositor transform, not a CSS transition) —
DELETE them. **`useDockMorphWindow.ts` (118L) is vestigial once the busy-signal collapses + the dead
`@transitionend` it listens for is gone — RETIRE it** (its single GlassDock consumer reads the
orchestrator's `morphing` ref instead). *Depends on M1/M2 (the orchestrator owns the ref).*

### M4 — The dead 551-line engine + the genuinely-dead cut (`BG.W-DOCK-CUT`)

`useDockContextSilhouette.ts` (551L) has ZERO real import consumers — verified live: its only references
are itself, its own test, and a COMMENT in `AppSwitcher.vue` (which actually imports + uses
`useBloomUp`). It is off both dock barrels. **DELETE the composable + its test + RETIRE the 341-line
`scripts/proof-dock-context.mjs` + its `gates.mjs` row** (a gate certifying a dead engine is
dead-weight). Verify+drop the dead companions (`DockSilhouetteDescriptor` type, `constants.ts`
`DOCK_CONTEXT_LABEL` if no other reader).

**Cross-WS gate (R7, BLOCKING):** the "context silhouette" name overlaps WS6 (Siri/contextual). Confirm
with WS6 it is NOT the contextual-silhouette substrate WS6 wants BEFORE the cut — if WS6 claims it,
route to FISSION-WIRE's DECIDE instead. The risk-research + KISS-research + tranche-history all
independently verify it dead; the WS6 confirmation is the one open coupling.

**Routed OUT (do NOT double-build):** `useLiquidMorph.ts` (462L, `src/composables/motion/`, 0 real
consumers) + `glass/liquid-morph.css` are the dead n-ary-split SPIKE; they live OUTSIDE the dock dir
and are WS4's `BG.W-DEADCODE-CUT` territory. WS2 does NOT delete them — but FISSION-WIRE (M6)
coordinates the n-ary-split engine choice with WS4.

### M5 — The 711-line god-SFC decomposed (`BG.W-DOCK-DECOMPOSE`)

`GlassDock.vue` (711L) is one of three dock files grandfathered in `proof:no-god-module`
`RATCHET_BASELINES` (the close demands `== {}`). The already-extracted single-consumer composables
(`useDockShellProps` 317L, `useDockState`, `useDockClickIntegrity`, `useDockItemDrag`,
`useDockMorphWindow`-now-retired) ARE the decomposition seam — KEPT (single-consumer-by-design leaves,
not cuts). The remaining inline glue to extract WITHOUT contrivance (the >500-line law, colocated):

- The **fission piece-registration + pointer-drag-split** cluster (`GlassDock.vue:341-506` ≈ 165L) →
  a colocated `composables/useDockFissionWiring.ts` (or absorbed into `useDockFission`'s own
  `registerPiece` surface; if FISSION-WIRE retires fission, this glue evaporates with it).
- The **touch-gate handlers** (`GlassDock.vue:278-321`) → `composables/useDockTouchGate.ts`.

With M2 (`useLayerTransition` deleted), M3 (`useDockMorphWindow` retired), M4 (silhouette deleted), and
this carve, all three dock RATCHET rows reach `{}` for close. Net file-count is offset by the merges
(M6 fold of `railProjection` into `DockStack`; the `dockContext` + `dockLayerContext` 65L+53L merge into
one `dockContexts.ts` if their providers are co-located) — the directional bar is ~24, the HARD bars
are the grep invariants (one SpringProgress, no broken import) + `RATCHET_BASELINES == {}`.

**Cross-WS note (the cartoon-cast — DO NOT collide):** WS3 owns the structural cast-retire on the dock
chrome (`GlassDock.vue:606` `.cartoon-cast` span + `dock/shape.css` block + `[data-punching]` deepen +
PRM arm — WS3 M2). WS2 does NOT also delete it (no double-build); WS2's decompose leaves the cast span
to WS3 and coordinates the line-range so the two waves do not collide on `GlassDock.vue`.

**`containerName`-freezes-morph footgun (RC9):** while in `useDockShellProps.ts:241-265`, design OUT
the `container-type:inline-size` clamp (resolve the container-query subject without clamping the box)
rather than re-documenting it a 6th time. Booked to DECOMPOSE if it touches the carve; else a thin
rider.

### M6 — Fission: the DECIDE (`BG.W-DOCK-FISSION-WIRE`)

The dock-arch audit's "CUT `useDockFission`" is OVERRULED — its "1 demo consumer" claim is STALE. Live
grep at HEAD: `useDockFission` is consumed by `GlassDock.vue` (`:splittable`), `liquid-playground.vue`,
`dock-gallery.vue`, `examples/DynamicIslandCall.vue`, `DockExampleTile.vue`, and is a published
`/dock` + root-barrel export — 4+ live story consumers, and the user EXPLICITLY names goo-fission as
core hallmark expressiveness (C-DOCK / WS2-04). This is a `BB.W-NDA-DECIDE`-shaped formal DECIDE, NOT a
blind delete (standing-risk #5 — never blind-delete a loud-requested landed engine):

- **WIRE (the likely verdict):** revive the demo-private/broken fission to a real ≥2-consumer paint —
  fix the `url(#dock-fission-goo)` → `none` resolution on shipped surfaces (DRY the bridge onto the ONE
  Safari-safe `GooFilter` mount, the `feGaussianBlur stdDeviation≈9` + `feColorMatrix alpha×18−7`
  STATIC graph, regular `filter:url()` per WebKit bug 245510 — `BG.W-SHELL-DOCK-DRY` shares this seam),
  and revive the dead φ-tier projection (the `railProjection.ts` `tieredSpan`/`ringOffset` math; floor
  `fadeMinAlpha` off `0` so facet chips never fade to invisibility). Decompose `useDockFission` (604L,
  a RATCHET row) into a colocated `fission/` sub-dir to drain the row.
- **RETIRE (if the wire cannot reach ≥2 REAL paint consumers):** a formal `inv-11`
  registry-consumer-probed prune with rationale + successor, the `dock/index.ts` + `src/index.ts` +
  `api/index.ts` exports pruned in-diff, the demo `:splittable` stories retired — clean break, no alias.

**The dual-path liquid-merge decision (critique mustFix — dir-wide):** FISSION-WIRE uses
`url(#dock-fission-goo)`, the INPLACE-MORPH teardrop uses the morph-bridge goo. If the teardrop ever
falls back to a `clip-path`/`mask` wipe (M7-budget fallback), the dir carries TWO liquid-merge
mechanisms — contradicting `fission-bridge.css`'s stated no-dual-path generalization and FISSION-WIRE's
DRY-onto-ONE-`GooFilter` goal. **Pick ONE liquid-merge mechanism for the whole dock dir** (both goo,
the preferred default; OR both clip-path) in coordination with the teardrop-budget decision. The
surgical filter-toggle fix (M7-budget) keeps the teardrop on goo, so the default verdict is **both
goo** — no dual path.

**Coordinate the n-ary-split engine with WS4 FIRST** (D30): there are FOUR morph engines
(`dockMorphContext`, `useDockOrientationMorph`, `useDockFission`, the dead `useLiquidMorph`). Pick ONE
n-ary-split engine before wiring so FISSION-WIRE does not bless a duplicate. `railProjection.ts` (pure
φ-math, single consumer `DockStack`) is KEEPABLE — fold it into `DockStack.vue` to drop a file, but the
fission cut/wire must NOT collateral-delete it.

**Same DECIDE bar, softer:** `useDockSearch` (1 demo consumer + the booked speedtest consumer; a
published `/dock` feature) — lean KEEP for the genuine published feature; `useDockItemDrag` (1 demo
consumer) — DECIDE-retire the demo-only drag if no second real consumer lands. Do not silently keep an
overfit primitive.

### M7 — The V↔H morph: delete the modal, flip the REAL dock in place (`BG.W-SHELL-DOCK-DRY` → `BG.W-DOCK-INPLACE-MORPH`, the headline)

**The HEAD state IS the defect (D13).** `AppShell.vue` renders the morph as a hand-rolled
`<div role="dialog" aria-modal="true" @keydown.esc="closeMorphStage">` (`:499-505`) — esc bound to a
non-focusable, non-autofocused div with no focus-trap, so it never fires. The DEFAULT register is the
dead VT crossfade (`liquidPreview = ref(false)` `:112`; `toggleShellMorph` `:128` wraps
`startViewTransition` flipping `vtOrientation`); the teardrop is a mere opt-in `Switch`. The stage
hosts TWO SYNTHETIC 5-icon docks (`morphEntries`, `:86`), not the real shell docks. A window-event
triple-hop drives it. The sibling story `morph-showcase.vue:2-20` ALREADY killed the crossfade —
`AppShell` is a STALE FORK that never inherited the `BD.W-MORPH-FIELD-WELD` fix.

**The in-place mechanism (the KISS endpoint — paint-verified, the headline de-risk).** The prototype
LIVE-PROVED on real Chrome (both modes) that ONE real dock flips column→row in place (vertical 67×373 →
horizontal 381×59) keeping nav live, with the goo teardrop occluding the reflow at t≈0.5. The web
platform cannot continuously interpolate a flex column→row TOPOLOGY change (the `AX.W42` fold-7 limit) —
Apple hides exactly this reflow inside the merge/blend (the `GlassEffectContainer` + `.sidebarAdaptable`
model). So:

1. **`BG.W-SHELL-DOCK-DRY` (prerequisite):** the duplicated chrome shared between `SidebarDock` and
   `BottomDock` (the category nav loop, the trailing utility group, the morph-button wiring) collapses
   into a shared seam (a `useShellNavDock` composable + shared sub-component) so a SINGLE morphable
   nav-dock instance can flip orientation in place. The responsive-specific affordances that genuinely
   differ (the mobile `BottomDock` category Sheet trigger — load-bearing mobile nav,
   `BottomDock.vue:210`) are PRESERVED; the DRY folds only the shared nav-loop + morph wiring. P1
   build-proves whether this is a full single-SFC merge or a shared-composable-over-two-thin-SFCs. The
   single-dock orientation-as-a-live-ref precedent is real (`liquid-playground.vue:92`; `useDockShellProps`
   orientation is fully reactive).

2. **`BG.W-DOCK-INPLACE-MORPH`:** the in-dock `ArrowLeftRight` `<DockIconButton>` (already imported,
   `SidebarDock.vue:32`) drives the orientation morph against the REAL shell dock root in place — a
   DIRECT ref toggle (delete the window-event triple-hop). **The in-place case COMPOSES `useDockSpring`
   (critique mustFix — NOT a new `new SpringProgress`).** The KISS form: ADD a `boundOrientation =
   computed(() => t.value >= 0.5)` + the neck/opacity output computeds onto the EXISTING
   `useDockOrientationMorph` (which already owns the eager-`orientation`-ref-vs-scalar-`t` split — the
   "two orientation concepts" is already solved in HEAD, NOT a new architectural insight). The
   two-dock showcase and the one-dock in-place become THIN adapters that each add only their output
   computeds over the ONE `useDockSpring`-backed scalar core — satisfying the grep bar AND killing the
   duplication.

   The ONLY transition is the liquid teardrop: `--dock-morph-t` 0↔1, the `morph-bridge.css` SVG-goo
   (regular `filter:url(#…)`) occluding the reflow at t≈0.5; bidirectional + interruptible
   (velocity-carried re-base via M1's `useDockSpring`) + PRM-snap (the `pin()` synchronous seat). The
   button is a real control with `aria-pressed` + `aria-label` reflecting orientation (NEVER an attr on
   the presentational dock root div — the `aria-allowed-attr` contract).

   **DELETE wholesale:** the `AppShell` modal stage (`:497-720`), the synthetic `morphEntries`, the
   VT-crossfade arm (`liquidPreview`/`vtOrientation`/`startViewTransition` `:112-133` — **KEEP
   `startViewTransition` ONLY for the route-category crossfade at `:220`**, a DIFFERENT use), the six
   modal fns, the `.demo-dock-morph-*` CSS (`:758-857`), the toggle event/listener, the
   `window.__shellDockMorph` test-hook. **No `startViewTransition` survives in the dock V↔H path**
   (grep-asserted). **KEEP the published two-DOM-dock `useDockOrientationMorph` for the
   `/dock/morph-showcase` story** (the fence — re-point its panes to real nav content).

**The fixed-anchor placement (R1's unproven half — critique mustFix, NOW a build deliverable).** The
prototype proved the flip in a free-floating story; the REAL SidebarDock is `position:fixed` left. P1
must resolve + prove IN-SITU where the flipped-horizontal dock sits: anchor-edge `transform-origin`
(the morph grows/shrinks about the dock's pinned edge, the BB.W-DOCK-MORPH-FAMILY pinned-edge
precedent), the horizontal form anchored at the same corner the vertical occupied (NOT re-centered to
the viewport). The π capture is on the REAL shell dock at its own fixed region, not a center-origin
story.

**The V↔H-vs-collapse-morph interaction (critique mustFix — NEW, was unspecified).** The shell dock
COLLAPSES (`--dock-morph-t`/`--stretch`/`scale:` channels) AND the V↔H morph deforms the same root
(inline `transform`/`opacity`). A mid-collapse V↔H (or vice versa) composes two uncoordinated
deformations. **Resolve by SERIALIZING through the ONE `useDockSpring`-owned `morphing` ref:** the
orientation morph and the collapse morph are MUTUALLY EXCLUSIVE episodes — a V↔H toggle while collapsed
first expands (or seats the collapse), and the `morphing` guard rejects a second deformation start
while one is live (the press is debounced, not a second overlapping spring). Prove the two compose
cleanly (or are correctly serialized) on the REAL shell dock — a frame-series showing no double-deform.

**The teardrop budget (R2, the primed trap — the SURGICAL fix supersedes the rewrite).** The recorded
evidence (`W-DOCK-MORPH-INSITU-DELTA.md:146-154`): the per-frame `feGaussianBlur` teardrop MISSED budget
on the real Metal dev-box (p50 13.7-15.1ms) while greening on headless SwiftShader (9.6ms). The
prototype found the REAL defect: **the 118-184ms hitch is the `filter:none↔url()` TOGGLE (the
`gooFilter` computed swapping the filter on/off), NOT the goo render.** So the fix is SURGICAL, not a
mechanism rewrite:

- **KEEP `filter:url(#dock-morph-goo)` applied ALWAYS** (never toggle to `none`) and gate the PLATE
  `opacity` to the occluded midpoint window (`t ∈ 0.18..0.82`) instead. OR pre-warm the filter texture
  at mount. This kills the decode-and-pop hitch at the COMPOSITION CLASS (the `glass-grain` pop-kill
  precedent — keep the longhand always-present, cross-fade opacity only).
- **The filter graph stays STATIC** (stdDeviation + matrix never animate — only `transform` on the
  shapes; the goo aspect is a pure `f(--dock-morph-t)`, no wall-clock).
- **KEEP the two-plate goo (`BD.W-MORPH-FIELD-WELD` `--morph-neck-frac` waist) — do NOT delete it on an
  un-captured claim (critique mustFix).** This preserves `proof:morph-showcase` M2 (requires
  `.dock-morph-bridge-plate--vertical` AND `--horizontal` present) + M5 (`filter:url(#dock-morph-goo)`
  reference) + `proof:metaball-bridge2` + `proof:liquid-morph` M4 ALL GREEN — none silently red'd.
- **P2 build-proves the real-Metal cost of the surgical fix** (the in-place dock-local region is SMALLER
  than the modal stage — name this win; the morph is a ONE-SHOT ~0.7s gesture, goo active ~0.4 of it,
  so a brief transient near-budget on a deliberate press is acceptable where a continuous animation
  would not be — the spec ALREADY permits a one-shot transient near-miss). **Re-scope honestly: the AZ
  failure-class slow-Metal box (p50 13.7-15.1ms) is STILL unmeasured (an M5-Max ≠ that box);** frame
  any residual as a measured number, never "VALIDATED/RESOLVED" on an unmeasured box.
- **The clip-path/mask wipe is a FALLBACK OPTION, not the plan (critique correction):** if the surgical
  fix STILL meaningfully exceeds budget on the failure box, the cheaper occlusion is a `clip-path`/`mask`
  reveal-wipe with a thin goo lip at the seam. BUT (a) frame it HONESTLY — `clip-path inset()` animation
  is a per-frame repaint `O(paint_area)`, NOT compositor-only; `will-change:clip-path` does NOT
  compositor-promote; (b) it requires EXPLICIT re-point authorization for `proof:morph-showcase` +
  `proof:metaball-bridge2`, updated in LOCKSTEP — never a silent red of a kept-green gate; (c) it
  triggers the dual-path decision (M6) — coordinate dir-wide. **The brief FORBIDS falling back to VT.**
- **Verify occlusion ADEQUACY (critique mustFix):** capture every midpoint frame in BOTH directions and
  confirm the occluder covers the real dock reflow (V 296px tall / H 332px wide). The two-plate goo
  spans the full extent; a droplet (~170×154 at t=0.5) is SMALLER than either plate — if the fallback
  is ever taken, prove no jump-cut leak.
- **Fix the PRM carve coupling (critique mustFix):** ensure the parent `.dock-morph-bridge` rule's
  `opacity:var(--dock-bridge-opacity,1)` survives and multiplies down so the PRM rule
  (`--dock-bridge-opacity:0`) zeroes the bridge; assert PRM single-paint (zero neck frame) explicitly.

**C-SAFARI (critique mustFix — the cardinal bar):** the goo GRAPH is already WebKit-correct (regular
`filter:url` + sRGB). The open risk is the backdrop-filter blur + per-frame repaint on WebKit/Metal.
The orchestrator captures Safari paint at CLOSE — verify the morph actually drives, the goo
`filter:url` renders, no screen flash, reads as LIQUID GLASS (not a flat sliding pill), both modes.
Chrome-only is the 3×-shipped trap.

**The 12-laws texture (reconciling R6 — single-scalar vs weight; the validated diagnosis, the
re-derived fix).** DOCK_SPRING is already weighty. The validated finding: **the flat `--dock-live`
convex LINEAR blend in `layers.css` is the actual culprit** (A-motion-arch:65), NOT the spring — replace
it with the spring-weld follow-through. The arcs/overlapping/follow-through come NOT from multi-channel
springs (which would fragment the deterministic `morph.pin(t)` π capture seam) but from CSS
`animation-delay` staggers + arc-origin transforms keyed off the ONE `--dock-morph-t` scalar
(deterministic, compositor-only, pure-f(t)): the layers.css center-out ring stagger is ALREADY a working
overlapping-action texture off the single scalar (reversed-by-construction). **REJECT the prototype's
defective concrete squish fix** (build FAILED; the `|Δt|` squish is frame-rate-coupled — it inverts its
own intent). Re-derive the squish as PURE-f(t): drive `useLiquidFlex`'s volume-preserving reciprocal
squish off the spring's ANALYTIC velocity (a function of the scalar + the spring envelope, frame-rate
independent) OR a pure transfer function of `t`, capped LOW at `--dock-morph-max-stretch` — never a
per-frame `|Δt|`. **This sub-mechanism needs a RE-PROTOTYPE before INPLACE-MORPH closes** (§RESIDUAL
FRONTIER — the least-converged arm, build=false at pass 1).

### M8 — Persistent ℱ + Fourier egg removed (`BG.W-DOCK-PERSISTENT-CUT`)

C-PERSIST's "atop BOTH docks" is imprecise — only `SidebarDock` carries the ℱ (the script-glyph
`&#x2131;` `#persistent` slot `:269-296` + the Fourier-redraw egg: `useLongPress` `:38`,
`fireRedraw`/`wordmarkPress`/`@dblclick` `:177-283`, dispatching `glass-ui-demo:f-redraw`). The
continuous-redraw animation is Apple's named steady-state anti-pattern. The ℱ exists as a dedup
workaround: Foundations is FILTERED OUT of the nav loop (`SidebarDock.vue:84` `c.id !== "foundations"`)
only so ℱ can stand in for it.

**This is a COORDINATED edit, not a delete:** remove the ℱ `#persistent` slot + the egg cluster + the
anchored (vestigial per BC.W-DOCK-STACK-RAIL topology) `DockSeparator`; **drop the foundations filter so
Foundations rejoins category nav as a normal `Compass` `DockIconButton` entry**; remove the `AppShell`
`FRedrawOverlay` import/render/`onFRedraw` listener (`:45,:347,:351,:488`); **DELETE
`demo/eggs/FRedrawOverlay.vue` + `demo/eggs/useLongPress.ts`** — but VERIFY `useLongPress.ts` has no
second consumer (codebase-deep flags `StoryHero.vue`; if it does, keep the composable, delete only the
egg overlay) and **KEEP `demo/eggs/fGlyphPoints.ts`** (shared with `substrates/fourier-paths.ts`).
**KEEP `BottomDock.vue:210` `#persistent`** — it is the mobile category Sheet trigger (`PanelLeft`),
load-bearing mobile nav, NOT the brand. `proof:dock-region-model` asserts the `#persistent` slot
collapses cleanly with no reserved void when empty. *Independent (demo-shell only); lands before
SHELL-DOCK-DRY (simplifies the shared chrome).*

### M9 — A capped axis is ALWAYS a scroll axis (`BG.W-DOCK-CAP-SCROLLS` + `BG.W-DOCK-OVERFLOW-FADE` + `BG.W-DOCK-UTILITY-REACH`)

**Root (live-reproduced @1280×600):** `shell.css:291` caps `.glass-dock.vertical` at
`--dock-max-block-size` UNCONDITIONALLY, but the scroll port `overflow-y:auto` is GATED behind the
`overflow="scroll"`/`.dock-scroll-y` opt-in (`overflow.css:62`) the demo `SidebarDock` never passes — so
the capped block axis overflows `visible` (shell.css:205-208) and the bottom ~5 controls (dark-toggle,
morph, gear) sit BELOW the 600px viewport, `document.elementFromPoint` → null, permanently unreachable.

**The fix is at the ROOT (clean break, no-legacy):** retire the `overflow` prop `"scroll"` union member
+ the `scrollClass` computed (`useDockShellProps.ts:107,:285`) + the `.dock-scroll-y` opt-in gate. Make
capping unconditionally scroll its capped axis — when `--dock-max-block-size` (or
`--dock-max-inline-size`) caps and content exceeds it, that axis becomes `overflow:auto`. **`SidebarDock`
needs ZERO prop change once the default is correct.**

**THE STRUCTURAL CORRECTION (critique mustFix — the spec's M9 was WRONG):** the spec claimed the
cross-axis `visible` pin keeps the inset-plate clearance and cited `overflow.css:69` as "proving the
pin." **This is mechanically impossible.** Per CSS Overflow §3, a single-axis `overflow-y:auto` FORCES
the sibling `overflow-x:visible` to COMPUTE to `auto` — the cross axis WILL clip. **shell.css:222-236
(BA.W-DOCK-GEOMETRY) already documents this exact fact** ("`overflow-y: auto` is a scroll value, and CSS
Overflow §3 FORCES the sibling `overflow-x: visible` to COMPUTE to `auto` — so the F6 pin never
survived"). The spec's mechanism reverses BA's DC-1 finding.

**The CORRECT mechanism (the lozenge guard is GEOMETRIC, not a cross-axis pin):**

- Author `overflow-x: visible` for documentation/intent, but ACKNOWLEDGE it computes to `auto` — the
  cross-axis clip fires.
- The lozenge is prevented PURELY by the geometric inset guard (`BA.W-DOCK-GEOMETRY`,
  `--dock-control-safe-inset` = `control-size × 0.1` per side → an 80%-of-cell painted plate +
  `background-clip:content-box`). The painted plate (80%) × the 1.1× hover scale (88%) stays STRICTLY
  inside the cell (100%) with ≥1px slack — so the cross-axis clip NEVER reaches the painted plate. The
  HIT BOX stays the full `--dock-control-size` (WCAG 2.5.5 floor on the cell).
- **The acceptance bar CHANGES (was wrong):** drop "cross-axis `overflow:visible` / not clipped"
  (impossible). The new bar: **the inline-axis painted-plate slack ≥1px at hover/focus across ALL
  SidebarDock control types** (icon button, dark-toggle, morph button, gear, facet chips — NOT just
  `.first()`, the critique's harden), since the inset budget is now the SOLE lozenge guarantee on a
  clip-armed cross axis.

**Re-point `proof:dock-plate-clearance` FULLY (critique mustFix — the spec OMITTED it entirely):** both
the W2 xPort (deleted `.dock-scroll-x`) AND yPort source checks, the `gates.mjs:1438` note text, and the
live G2 "cross-axis overflow:visible" assertion → the geometric-slack guard. **Add `proof:dock-plate-clearance`
+ `dock-plate-clearance.spec.ts` to the WS7 dead-gate roster** (the spec's roster currently omits both).

**Complete the clean break (critique mustFix — no-legacy = COMPLETE):**
- DELETE/rewrite `tests/components/custom/dock/GlassDock.scroll-overflow.test.ts` (8 vitest assertions
  break the instant the `"scroll"` union member drops, under `tsconfig.test.json`).
- Add a `MIGRATION.md` row for the dropped public `overflow="scroll"` member.
- Fix the stale `BottomDock.vue:4` header comment.
- **Run the REAL gate:** `npm run typecheck` (BOTH arms — `tsconfig.test.json` covers `tests/`) AND
  `npm run test`. The prototype's "vue-tsc green / BUILD PASSED" is FALSE until the test is rewritten.

**Resolve the keep-horizontal contradiction IN WRITING (critique mustFix):** KEEP the horizontal
`overflow="scroll"` behaviour for `BottomDock` ONLY where width is genuinely content-driven (a real
choice there) — `scrollClass` returns `dock-scroll-x` for horizontal, `null` for vertical; the `.dock-scroll-x`
horizontal port + its xPort gate SURVIVE. The vertical `.dock-scroll-y` opt-in is what retires (folded
into the unconditional cap-derived rule). State this explicitly so the W2 xPort + the horizontal unit
arm survive.

**Acknowledge the OVERFLOW-FADE dependency (critique mustFix):** CAP-SCROLLS ALONE ships a
scrollbar-hidden, fade-less, affordance-less scroll — acceptance #4's soft-edge half is UNMET until
OVERFLOW-FADE lands. The two are NOT independently shippable to the soft-edge bar; sequence FADE
immediately after CAP-SCROLLS.

**The soft edge (`BG.W-DOCK-OVERFLOW-FADE`):** wire the shipped `useFadingScroll` / `--fade-scroll-width`
soft edge where the capped scroll port meets the glass chrome — the iOS-26 `scrollEdgeEffectStyle(.soft)`
model, a legibility cue (does NOT vanish under PRM, stops interpolating only).

**Verify the broken at-rest `overflow:visible` contract (critique mustFix):** confirm no non-portaled
grown content / focus ring is clipped on the now `overflow:auto auto` root for capped vertical docks.

**`BG.W-DOCK-UTILITY-REACH` is the acceptance arm** of CAP-SCROLLS (folded into its π bar): the
1280×600 trailing-utility reachability readback.

### M10 — The dock blur is a PEER (consumed, not authored — WS3 owns the register)

WS3's M4 clean-break retires `--glass-blur-dock` / `--glass-blur-dock-radius` / `--glass-saturate-dock`
and re-points `--dock-surface-blur` (`shell.css:17`) → `--glass-blur-resting`. WS2 does NOT mint or
re-author a dock-special blur — it **grep-asserts no dock-special blur token survives in the dock CSS**
(the convergence-bar peer invariant) and carries the dock's glassiness via the shipped lens/specular
edge axis (`.glass-lens` / `useSpecularPointer`), not a thicker Gaussian. **Sequence: WS3 before WS2.**
Flag the `DockStack` fan-out members' second backdrop-filter (`stack-rail.css:192`, a glass-on-glass
violation in the dock gutter) to WS3 — dock-gutter members are flat tiers per the "no glass on glass"
discipline.

### M11 — The dock stories (`BG.W-DOCK-STORY-MODULARIZE`, thin / deferrable)

Once the real shell dock morphs in place, `morph-showcase.vue` (two synthetic docks) is the canonical
PUBLISHED two-DOM-dock demonstration of the `useDockOrientationMorph` primitive — KEEP it as the fence
(re-pointed to real nav content). Re-modularize the oversized stories (`liquid-playground.vue` 46KB,
`overview.vue` 34KB) onto the shared `DockStage`/`DockExampleTile` chassis (no demo-local re-fork) ONLY
if the story sprawl proves a real maintenance cost; otherwise DEFER. Gate against broken imports.

---

## FILES TOUCHED (primary)

| File | Wave | Change |
|---|---|---|
| `src/components/custom/dock/composables/useDockSpring.ts` (NEW) | MORPH-UNIFY | the ONE SpringProgress factory (parameterized `(response,ζ)`, velocity-rebase, self-dispose-on-settle, PRM-seat) |
| `dockMorphContext.ts` · `useDockOrientationMorph.ts` · `useDockItemDrag.ts` · `useDockFission.ts` | MORPH-UNIFY | compose `useDockSpring`; drop own `new SpringProgress`; preserve drag's full guard + zero-spring-when-never-dragged |
| `composables/dockLayerFlip.ts` (NEW) | MORPH-UNIFY | the standalone FLIP-measure/seatSync/deferReposition/directionTypes/VT-native-layer-swap leaf — `dockMorphContext` STAYS measure-free (F3) |
| `useLayerTransition.ts` (DELETE) + `dock/index.ts:57` export + `MIGRATION.md` row + `public-surface.spec.ts` ×2 + `api/index.ts` | MORPH-UNIFY | clean public-API break; sequence the 6 gate + 2 test re-points BEFORE the delete |
| `scripts/proof-dock-orchestrator-single.mjs` (RE-HOME, not blind-retire) + `dock-orchestrator-single.detect.test.ts` | MORPH-UNIFY | re-point the `engineCount==1` + one-clock-onset runtime invariant onto `useDockSpring`/`dockLayerFlip` |
| `proof-composable-return-types` · `proof-spring-tokens-synced` · `proof-perf-producer` · `proof-motion-value-free` · `proof-dock-vocabulary` · `proof-dock-morph-family` | MORPH-UNIFY | re-point off `useLayerTransition.ts` (by-file reads) FIRST |
| `DockLayerGroup.vue:224-244,258-269` | MORPH-UNIFY | standalone mints its own orchestrator + composes `dockLayerFlip` (drop the `useLayerTransition` branch) |
| `useDockMorphWindow.ts` (RETIRE) · `GlassDock.vue:581-582` · `constants.ts:95` | BUSY-SINGLE | one `morphing` ref; delete dead `@transitionend`/`RESIZE_MORPH_PROPS` |
| `useDockClickIntegrity.ts` · `useDockState.ts` | BUSY-SINGLE | read the orchestrator `morphing` ref |
| `useDockContextSilhouette.ts` (DELETE) + its test + `scripts/proof-dock-context.mjs` (RETIRE) + `gates.mjs` row | CUT | the dead 551-line engine (after WS6 confirms it unwanted — R7) |
| `GlassDock.vue:341-506,278-321` → `useDockFissionWiring.ts` + `useDockTouchGate.ts` (NEW, colocated) | DECOMPOSE | drain the RATCHET row; design out the `container-type` clamp (RC9) |
| `useDockFission.ts` (→ `fission/` sub-dir if WIRED) · `railProjection.ts` (`fadeMinAlpha` floor; fold into `DockStack.vue`) · the goo bridge DRY onto `GooFilter` | FISSION-WIRE | wire-or-retire DECIDE; coordinate n-ary engine w/ WS4; dual-path = both-goo |
| `SidebarDock.vue:38,84,177-296` · `AppShell.vue:45,347,351,488` · `demo/eggs/FRedrawOverlay.vue` + `useLongPress.ts` (DELETE, verify no 2nd consumer) | PERSISTENT-CUT | ℱ + egg out; Foundations rejoins nav; KEEP `fGlyphPoints.ts` |
| `src/styles/dock/overflow.css` · `shell.css:291,222-236` · `useDockShellProps.ts:107,285` | CAP-SCROLLS | cap ⇒ scroll; retire `.dock-scroll-y` + vertical `"scroll"` member; KEEP `.dock-scroll-x` horizontal; lozenge = geometric inset guard (NOT a cross-axis pin) |
| `GlassDock.scroll-overflow.test.ts` (rewrite) · `MIGRATION.md` · `BottomDock.vue:4` · `proof-dock-plate-clearance.mjs` + `dock-plate-clearance.spec.ts` (re-point) | CAP-SCROLLS | complete the clean break + re-point the geometric-slack gate |
| `SidebarDock.vue` (scroll port) | OVERFLOW-FADE | `useFadingScroll` soft edge on the capped port |
| `demo/layout/SidebarDock.vue`/`BottomDock.vue` → shared `useShellNavDock` + sub-component | SHELL-DOCK-DRY | collapse the duplicated nav-loop + morph wiring → ONE morphable instance; PRESERVE the mobile Sheet trigger |
| `useDockOrientationMorph.ts` (+`boundOrientation`/neck/opacity computeds over `useDockSpring`) · `AppShell.vue:497-720,86,108-133,758-857,163,185,352` (DELETE modal+synthetic+VT+event-hop) · in-dock button → direct ref toggle | INPLACE-MORPH | the headline; compose `useDockSpring`, NOT a new spring; fixed-anchor `transform-origin`; serialize V↔H vs collapse |
| `scripts/proof-dock-morph-insitu.mjs` (M2/M4 flip born-RED→teardrop-only) · `tests-visual/dock-morph-insitu.spec.ts` + `storybook-meta.spec.ts:205-212` (drop `shell-dock-morph-*` testids) | INPLACE-MORPH | retire the crossfade-default enshrinement |
| `src/styles/dock/layers.css` (`--dock-live` linear blend → spring weld) · `morph-bridge.css` (filter-toggle→always-on + opacity-gated; PRM coupling) | INPLACE-MORPH | 12-laws weight (re-derived pure-f(t)) + the surgical teardrop budget fix; KEEP the two-plate goo waist |

**Cross-WS, do NOT touch in WS2:** the blur tokens (`glass.css`, `shell.css:17` — WS3) · the
`.cartoon-cast` dock span (`GlassDock.vue:606`, `dock/shape.css` — WS3) · `useLiquidMorph.ts` +
`liquid-morph.css` (WS4) · the FLIP-trio→`useFlip` (WS4).

---

## WAVE BREAKDOWN (11 waves; sequence by dependency)

**Pre:** WS3 (blur register + cast-retire) and WS1 (route swap + shell aurora) land FIRST.

1. **`BG.W-DOCK-MORPH-UNIFY`** — mint `useDockSpring` (5→1, grep-asserted); extract `dockLayerFlip.ts`
   leaf (orchestrator stays measure-free); fold `useLayerTransition` → orchestrator; SEQUENCE the 6
   gate + 2 test re-points BEFORE the delete; clean public-API break (MIGRATION + public-surface ×2 +
   api); RE-HOME (not blind-retire) `proof:dock-orchestrator-single`'s runtime invariant onto
   `useDockSpring`. *Independent; lands first (the AY.W-GOD1 fold, 4th deferral ends).*
2. **`BG.W-DOCK-BUSY-SINGLE`** — 4 busy-signals → 1 `morphing` ref; kill dead
   `@transitionend`/`RESIZE_MORPH_PROPS`; retire `useDockMorphWindow`. *Depends on #1.*
3. **`BG.W-DOCK-CUT`** — delete `useDockContextSilhouette` + test + `proof:dock-context` (after WS6
   confirms it unwanted — R7). *Independent.*
4. **`BG.W-DOCK-DECOMPOSE`** — carve `GlassDock` 711 → colocated fission-wiring + touch-gate; design out
   the `container-type` clamp; drain RATCHET rows. *Depends on #1-#3; coordinates the cast line-range
   with WS3.*
5. **`BG.W-DOCK-FISSION-WIRE`** — the DECIDE (wire ≥2 real or retire); floor `railProjection.fadeMinAlpha`;
   DRY the goo bridge onto ONE `GooFilter`; the dual-path = both-goo. *Depends on WS4's n-ary-engine
   choice + #4.*
6. **`BG.W-DOCK-PERSISTENT-CUT`** — ℱ + egg out; Foundations rejoins nav. *Independent; lands before #9
   (simplifies the shared chrome).*
7. **`BG.W-DOCK-CAP-SCROLLS`** (+ folded **`-UTILITY-REACH`**) — cap ⇒ scroll; retire the vertical opt-in;
   lozenge = geometric inset guard; complete the clean break (rewrite the unit test + MIGRATION +
   re-point `proof:dock-plate-clearance`). *Independent (CSS-first).*
8. **`BG.W-DOCK-OVERFLOW-FADE`** — `useFadingScroll` soft edge. *Depends on #7; NOT independently
   shippable to the soft-edge bar.*
9. **`BG.W-SHELL-DOCK-DRY`** — collapse the two shell docks → ONE morphable nav-dock instance; PRESERVE
   the mobile Sheet trigger. *Depends on #6; prerequisite for #10; gated on P1 build-proof.*
10. **`BG.W-DOCK-INPLACE-MORPH`** — the headline: delete modal+synthetic+VT; in-dock button flips the
    real dock in place via teardrop (compose `useDockSpring`; fixed-anchor `transform-origin`; serialize
    V↔H vs collapse; surgical filter-budget fix; re-derived pure-f(t) 12-laws weight); flip
    `proof:dock-morph-insitu` born-RED. *Depends on #1 + #9 + the 12-laws re-prototype.*
11. **`BG.W-DOCK-STORY-MODULARIZE`** — thin demo-side; DEFERRABLE.

**Dead-gate downgrade roster → WS7** (each cut wave names its gate): `proof:dock-orchestrator-single`
(RE-HOME onto `useDockSpring`, not blind-retire), `proof:dock-context` (retire), `proof:dock-morph-insitu`
M2/M4 (flip to teardrop-only), `storybook-meta.spec.ts` `shell-dock-morph-*` testids (drop),
`proof:dock-fission` (re-point to the real-paint π if WIRED), **`proof:dock-plate-clearance` +
`dock-plate-clearance.spec.ts`** (re-point off the impossible cross-axis-visible assertion onto the
geometric-slack guard). The false-green certifier must not ship a 4th broken close.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar — real paint, both modes, Chrome AND Safari)

**Grep / structural (CI, device-free):**
- Exactly ONE `new SpringProgress` in `src/components/custom/dock/` (in `useDockSpring.ts`).
- `dockMorphContext.ts` stays MEASURE-FREE (`proof:dock-morph-family` F3 green); the FLIP-measure lives
  in `dockLayerFlip.ts`.
- `useLayerTransition.ts` gone; the 6 gate + 2 test by-file reads re-pointed FIRST (no dangling read);
  MIGRATION row present; `public-surface.spec.ts` ×2 + `api/index.ts` updated.
- Zero `startViewTransition` in the dock V↔H path; `AppShell` has no `role="dialog"` morph stage, no
  synthetic `morphEntries`, no `liquidPreview`/`vtOrientation`. (`startViewTransition` survives ONLY at
  the route-category crossfade `:220`.)
- No dock-special blur token (`--glass-blur-dock*`/`--glass-saturate-dock`/`--dock-surface-blur` heavier
  than the WS3 `resting` peer) survives.
- No ℱ control atop either dock; Foundations present in the category nav loop; `BottomDock` `#persistent`
  (mobile category trigger) intact.
- Dir file-count ~24 (directional), zero broken import (`npm run typecheck` BOTH arms green + `npm run
  test` green), `proof:no-god-module` `RATCHET_BASELINES == {}`.
- `proof:no-layout-animation` green (the morph stays compositor transform-over-reserved-footprint; the
  `--dock-live` linear blend replaced, not a new width/height/padding lerp).
- `profile:budget --enforce` green (the re-modularization SHRINKS, never grows; `dist/styles/index.css`
  ≤ 548k/140k HARD HALT; the `/dock` chunk keeps keyframes off the root barrel).
- `proof:morph-showcase` M2/M5 + `proof:metaball-bridge2` + `proof:liquid-morph` M4 STAY green (the
  two-plate goo waist kept; the surgical fix does NOT silently red them).
- `proof:dock-plate-clearance` re-pointed onto the geometric-slack guard (NOT the impossible cross-axis
  `visible` assertion); the `"scroll"` vertical member retired, `.dock-scroll-x` horizontal kept.

**Live π (real GPU, the binding paint — the orchestrator captures; headless lies here):**
- **V↔H in-place morph:** the `--dock-morph-t` 0→1 frame-series on the REAL shell nav dock (not a modal,
  not synthetic), at its OWN FIXED ANCHOR (`transform-origin` at the pinned edge, the horizontal form at
  the corner the vertical occupied), the goo bridge PRESENT at the t≈0.5 midpoint, occluder COVERS the
  reflow (V 296px tall / H 332px wide), bidirectional, interruptible (a mid-morph re-press carries
  velocity — no snap-from-rest), PRM synchronous seat (no 10×74 sliver, zero neck frame). The V↔H vs
  collapse interaction reads clean (serialized — no double-deform). The button carries
  `aria-pressed`/`aria-label`. **Chrome AND Safari** (the goo is regular `filter:url`; verify it actually
  morphs, no screen flash, reads as liquid glass). **The teardrop clears (or transiently-acceptably-
  approaches) the 16.7ms budget on real Metal** — the P2 trace of the SURGICAL fix (filter-always-on +
  opacity-gated), NOT the SwiftShader number; the AZ failure-class box number stated honestly if
  unmeasured.
- **Layer-swap + collapse morph** paint identical light + dark; reads as arcs + overshoot (12 laws,
  re-derived pure-f(t)), not a flat blend. A rapid mid-morph re-press frame-series shows no 1-frame
  scalar-write gap / flash / allocation hitch on the `useDockSpring` `playTo` dispose+recreate.
- **Dock scroll @1280×600:** `scrollHeight > clientHeight` AND `overflow-y:auto` AND every trailing
  utility control (`document.elementFromPoint` → itself) AND the inline-axis painted-plate slack ≥1px at
  hover/focus across ALL control types (the lozenge dead via the geometric inset guard) — all four, the
  SidebarDock with no prop change. The soft scroll-edge fade reads where the port meets chrome
  (OVERFLOW-FADE). **Safari paint verified.**
- **Facets** (`mode="facets"`) read at rest at `opacity:1` (no fade-to-0, `fadeMinAlpha` floored)
  WITHOUT breaking the macOS-stack hover-fan.
- **Persistent-cut:** the SidebarDock `#persistent` slot collapses with no reserved void; Foundations
  clickable in nav; no continuous Fourier animation.

---

## FOLDED DEFERRED ITEMS (no silent drop)

- **Cross-WS — blur register:** WS3 owns the unified blur def; WS2 consumes it as a peer (M10). The
  `DockStack` fan-out glass-on-glass (`stack-rail.css:192`) is flagged to WS3.
- **Cross-WS — cartoon-cast retire on the dock chrome:** WS3 M2 (structural span + `dock/shape.css`
  block). WS2 coordinates the `GlassDock.vue` line-range to avoid a collision.
- **Cross-WS — n-ary morph dedup:** `useLiquidMorph` DELETE + the FLIP-trio
  (`useLiquidReveal`/`useBloomUp`/`useDockCtaReceive`) → one `useFlip` → WS4 (D30). FISSION-WIRE picks
  the ONE n-ary engine WITH WS4 before wiring; the dir-wide liquid-merge mechanism = both-goo (no
  dual-path).
- **`useDockContextSilhouette` ⇄ WS6:** confirm WS6 does not want it as the contextual-silhouette
  substrate before the cut (R7, BLOCKING the CUT wave).
- **`useDockSearch` / `useDockItemDrag` ≥2-consumer audit:** softer DECIDE inside FISSION-WIRE (lean
  KEEP for the published search feature; DECIDE-retire demo-only drag if no second real consumer).
- **`containerName`-freezes-morph footgun (RC9):** design OUT the `container-type:inline-size` clamp in
  DECOMPOSE rather than re-documenting it a 6th time.
- **`DOCK_SPRING` byte-fence:** the value.js letter's explicit no-retune — `useDockSpring` wraps but
  never re-tunes; `railProjection.ts` pure φ-math kept (consumed by `DockStack`).
- **The clip-path/mask wipe FALLBACK (teardrop budget):** only if the surgical filter-toggle fix STILL
  meaningfully misses the failure box; framed honestly (per-frame repaint, NOT compositor-only),
  requires explicit `proof:morph-showcase` + `proof:metaball-bridge2` re-point authorization in
  lockstep, triggers the dir-wide dual-path decision.

---

## OPEN RISKS

- **R1 (structural, PARTLY de-risked) — the in-place morph + shell-dock unification.** The flip IS
  paint-verified in a free-floating story; the UNPROVEN half is the FIXED-ANCHOR placement on the REAL
  `position:fixed` SidebarDock (where the horizontal form sits) + the V↔H-vs-collapse interaction. P1
  build-proves both IN-SITU on the real shell dock. If P1 cannot, WS2-03 is blocked.
- **R2 (the primed headless trap) — teardrop-only deletes the budget-clearing floor.** The recorded
  Metal miss (p50 13.7-15.1ms) is real; the prototype found the actual hitch is the `filter:none↔url()`
  toggle, not the goo. The SURGICAL fix (filter-always-on + opacity-gated) is the plan; P2 traces it on
  real Metal. The AZ failure-class box is STILL unmeasured — state any residual honestly, never
  "RESOLVED" on an unmeasured box. Safari paint captured at close. Clip-path is a framed-honest FALLBACK,
  not the plan; VT survival is forbidden.
- **R3 (the 12-laws weight, LEAST converged — build=false at pass 1) — needs a re-prototype.** The
  diagnosis (the flat `--dock-live` LINEAR blend is the culprit; the layers.css stagger is already-shipped
  overlapping-action) is VALID; the prototype's concrete squish fix is DEFECTIVE (frame-rate-coupled
  `|Δt|`, inverts its own intent). Re-derive the squish as pure-f(t) (off the spring's analytic velocity)
  and RE-PROTOTYPE before INPLACE-MORPH closes — verify it reads as weight AND keeps the `morph.pin`
  capture seam.
- **R4 — concurrency:** the dock dir is the densest shared surface across the live worktree lanes;
  serialize dock-dir ownership for the WS2 pass (one agent at a time on the dir refactor).
- **R5 — file-count vs fission-wire:** wiring fission (decomposed into a sub-dir) adds files; the ~24
  target is directional, the grep invariants are the hard bars.
- **R6 (C-SAFARI, the cardinal cross-engine bar) — zero Safari verification at HEAD.** Every live-π arm
  above carries a Safari capture at close (the morph drives, the goo renders, the scroll/fade reads, no
  screen flash). Chrome-only is the 3×-shipped trap; the orchestrator captures Safari paint for every
  binding π.

---

## RESIDUAL FRONTIER (the unconverged arms carried to pass 2 / build-time)

These are the items that earned a `refine` and remain open after this synthesis — the focused next-pass
brief:

1. **The 12-laws weight (R3) — RE-PROTOTYPE.** build=false at pass 1; the concrete squish fix is
   defective. Re-derive the volume-preserving squish as pure-f(t) off the spring's analytic velocity
   (frame-rate independent), keep the `morph.pin` capture seam, prove it reads as weight + the
   spring-weld replaces the `--dock-live` linear blend. (35% → needs a clean build.)
2. **The teardrop real-Metal budget (R2) — BUILD-TIME P2 TRACE.** Measure the SURGICAL fix
   (filter-always-on + midpoint-opacity-gate) on real headed Chrome/Metal AND on (or honest-about) the
   AZ failure-class slow box; confirm occlusion adequacy in both directions; assert PRM single-paint.
   (42% → the surgical fix is specified but unmeasured.)
3. **The fixed-anchor in-place placement + V↔H-vs-collapse interaction (R1) — BUILD-TIME P1.** Prove the
   horizontal form's anchor on the REAL `position:fixed` SidebarDock + clean serialization with the
   collapse morph. (52% → the free-floating flip is proven; the in-situ anchor is not.)
4. **C-SAFARI across every binding π (R6) — CLOSE-TIME CAPTURE.** No Safari verification exists at HEAD;
   every morph/scroll/fade/facet π needs a WebKit/Metal capture at close.
5. **The useDockSpring/dockLayerFlip real-GPU paint identity (M1/M2) — BUILD-TIME.** Collapse +
   layer-swap byte-identical both modes, PRM synchronous seat, rapid mid-morph re-press with no
   scalar-write gap on the dispose+recreate lifecycle. (62% → the static 5→1 is sound; the paint identity
   is unproven.)
