# Dock APIs — robustness · KISS · composability PROOF (BD viz/dock)

**Scope.** Proves the user's "prove … the dock … APIs" mandate against the SHIPPED dock composable surface on `prototype/liquid-dock`. Distinct from `viz/audit/dock-hallmark-gap.md` (which audits the *visual fidelity* of the BD dock spec) — this audits the **API contracts themselves**: are they robust, KISS, composable, and is the interactivity (drag/scroll/morph/link/keyboard) complete enough for the hallmark bar.

The APIs audited (read in full): `useDockState` (450L) · `useDockFission` (525L) · `useDockOrientationMorph` (286L) · `useDockContextSilhouette` (551L) · `useDragMorph` (motion/, ~640L) · `DockStack.vue` (238L) · plus the support leaves (`useDockSearch`, `useDockHold`, `useLayerTransition`, `dockMorphContext`, `railProjection`). **`useDockLink` does NOT exist** — it is the BD `[NEW]` largest-API-gap wave (`waves/BD.W-DOCK-LINK-API.md`), unbuilt at HEAD.

---

## VERDICT (headline)

**The dock physics engines are architecturally excellent — one-spring/one-scalar, interruptible-re-base, PRM-sync-seat, compositor-only, box-inviolate, descriptor-driven-DATA — and each composable is individually KISS + DRY (no second engine, no forked rAF). The robustness is real and well-tested at the PURE-logic layer.** But the SURFACE has three structural problems that block the hallmark bar:

1. **The orchestrators are STRANDED — built but not WIRED + not EXPORTED.** `useDockContextSilhouette` (the headline context-state-machine) has **zero exports** (absent from `composables/index.ts` AND the `/dock` barrel) and **zero call-sites** — a 551-line orchestrator reachable only by deep relative import. `useDockFission` is exported but `GlassDock.vue` composes NONE of {fission, silhouette, orientation-morph} — they live only in demo stories. The root component is `useDockState` ONLY. The hallmark "ONE living organism" cannot exist until these compose INTO the dock, not beside it in demos.

2. **There is NO FACADE — the link facility is N hand-wired composables against N rect/ref conventions.** A consumer wanting the iOS-27 dock (now-playing pill that splits, links to a dropdown, blooms a search field) must hand-wire `useDockFission` + `useDockContextSilhouette` + `useLiquidReveal` + `useDockCtaReceive` against four different `rootEl`/`resolveControl`/`trigger`/`ctaRef` conventions. This is the `useDockLink` gap — correctly identified in the BD union, correctly fenced (no-defineExpose, no-reka-internal-selector), but UNBUILT.

3. **`useDockState` interactivity is thin for the hallmark — desktop-mouse-shaped, with dead options.** It is a mouse/focus hover machine (`onMouseEnter`/`onMouseLeave`/`onFocusIn`/`onFocusOut` + click-to-pin). There is NO touch-tap-to-expand handler, NO keyboard activation beyond focus-in, and the `onStateChange` option has **zero consumers** (dead surface). The drag/scroll interactivity lives in OTHER composables (`useDragMorph`, `useDockSearch`'s scroll-shrink) that the dock does not compose.

Each engine is robust in isolation; the SYSTEM is under-integrated. The fix is wiring + one facade + a touch/keyboard hardening of the state machine — not a re-architecture.

---

## PART A — per-API proof

### A1. `useDockState` — ROBUST core, THIN interactivity, ONE dead option

**Robust + KISS (proven).** A clean 3-state machine (`collapsed | hover | pinned`) with a ref-counted `keepOpen`/`release` hold (≥1 token suppresses timer-collapse but NOT explicit click-away — a correct, documented two-tier dismissal). The `UseDockStateReturn` interface is a fully-named, exported contract (parallels `UseClipboardReturn`). Two genuinely hard problems are solved well:
- **The FLIP-thrash hysteresis** (`isMorphingEdgeSweep` + `HOVER_INTENT_MS` dwell) — a structurally-grounded fix for the moving-edge-re-crosses-static-cursor oscillation, gated on `[data-morphing]` + an `EDGE_BAND_PX` band so the steady-state path is untouched. This is robust, not a band-aid.
- **The teleport-aware click-away** (`isTeleportedTarget` + rAF-deferred capture-phase listener) — portaled reka content counts as "inside the dock"; the `requestAnimationFrame` defer correctly avoids the opening pointerdown reaching the just-installed listener.

**GAPS (interactivity thin for hallmark):**
- **No touch/pointer-tap expand.** The expand surface is `onMouseEnter` (hover) + `onClickCollapsed` (pin). On a coarse pointer there is no hover — a tap must go straight to the collapsed-layer click → pin. This *works* via `onClickCollapsed`, but there is no first-class tap-to-PEEK (hover-equivalent) state for touch; the iOS dock peek-on-tap-hold is unexpressed. **MISSING for the mobile hallmark.**
- **`onStateChange` is a DEAD option** — zero consumers in `src/`/`demo/`. Either wire it (the silhouette/now-playing surfaces SHOULD react to `collapsed→pinned`) or delete it (the no-dead-surface law).
- **Keyboard is focus-in only** — no Escape-to-collapse on the dock root (Escape dismissal rides reka portals, but a pinned dock with no open overlay has no keyboard collapse). Thin for a keyboard-first user.
- **`collapseDelay` 2500ms default** is long for a hover dock; defensible but worth a hallmark re-tune note.

**Composability:** GOOD — `rootEl` ref + getters, `alwaysExpanded` as `Ref|boolean`, the DI lift to `<GlassDock>` (`DOCK_CONTEXT_KEY`) composes `keepOpen`/`release`/`isHeld`. The Slider keep-dock-open contract proves the hold mechanism composes cross-component.

### A2. `useDockFission` — EXEMPLARY engine, STRANDED at the dock

**Robust + KISS (proven, the model the others follow).** This is the cleanest API of the set:
- **ONE `SpringProgress` on `DOCK_SPRING`** (no minted spring constant), ONE rAF loop writing `--dock-split-t` once/frame, the field `tick(delta)` fed from INSIDE that loop (no second rAF — the F4 one-loop discipline). Bidirectional on the SAME loop (`target` flips). Interruptible re-base (`inheritedVelocity`). PRM `seatSync()`. This is textbook.
- **The per-context signature is DATA not code paths** (`DOCK_SPLIT_SIGNATURES` map: search=radial / media=lateral / nav=inward-merge, each with `staggerRank`/`neckHold`/`squishPeak`) — the F3 floor. ONE `fission-bridge.css` recipe paints whatever vector the pieces carry. Genuinely DRY.
- **The piece registry** (`registerPiece` → `Set<FissionPiece>` + a release handle, the `MorphTarget` pattern) is the right shape, composes `useLiquidFlex` per-piece for the squish-only recoil.
- **Tested at the pure layer** (`tests/.../useDockFission.test.ts` exists; `DOCK_SPLIT_SIGNATURES` is data-assertable).

**GAP — STRANDED.** Exported from `/dock` ✓ but **`GlassDock.vue` composes it NOT** — it lives only in `demo/stories/dock/{liquid-playground,dock-gallery,examples/DynamicIslandCall}.vue`. Every demo re-wires `rootEl`+`signature`+`registerPiece`+`@pointermove="fission.onPointerMove"` by hand (liquid-playground does it across ~10 lines). The fission is a beside-the-dock seam by DESIGN (box-inviolate, correct), but with no in-dock composition and no facade, every consumer re-derives the wiring. **This is exactly the `useDockLink` gap.**

**Minor robustness note:** `seamTensionGain`/`seamTensionCap`/`staggerStep` are well-defaulted numeric knobs — KISS. The `--neck-specular-angle` write (jubilance) rides the SAME loop (no second clock) — good.

### A3. `useDockOrientationMorph` — ROBUST + deterministic, the `pin()` capture seam is excellent

**Robust + KISS (proven).** The V↔H driver honors the topology-jump limit (it does NOT attempt a continuous mismatched-topology clip morph — it crossfades two real docks under a goo bridge at the occluded `t≈0.5`). ONE `SpringProgress` on `DOCK_SPRING`, ONE `--dock-morph-t` scalar, both `useLiquidFlex` spans + the crossfade off that ONE scalar. The interruptible re-base is present. The `maxStretchOf()` getter reads `--dock-morph-max-stretch` per-read (cascade-override-safe).
- **`pin(value)` is the standout** — a deterministic no-spring exact-scalar seat for byte-reproducible capture (calls `writeScalar` twice to settle the squish derivative to ~1). This is the right primitive for the π capture seam AND doubles as the consumer's manual-scrub hook.
- **PRM** routes through `pin(targetT)` — robust regardless of the engine's own PRM seek.

**GAP:** exported on `/dock` ✓ but consumed only by `morph-showcase.vue` + the in-situ shell demo. `verticalSize`/`horizontalSize` are consumer-supplied px (or getters) — composable, but the consumer must measure them. The crossfade smootherstep is hardcoded at the 0.5 midpoint (fine — matches the bridge occlusion). No keyboard/gesture trigger built-in; `toggle()`/`morphTo()`/`pin()` are the only drivers (the consumer wires the gesture). **Acceptable** — this is a driver, not an input handler.

### A4. `useDockContextSilhouette` — the HEADLINE engine, completely UN-SHIPPED

**Robust + KISS (proven on read).** The most ambitious + most architecturally-correct API: a declarative `DockSilhouetteDescriptor[]` MAP (bar / bar+pill / split / search) the orchestrator DIFFs by `controlId` → survivors FLIP (`ElementMorph` + `springTimingFunction` from the SAME `SPRING_PRESETS` row), from-only DETACH (delegates to `useDockFission.registerPiece`), to-only BLOOM (delegates to `useBloomUp`). The `bar+pill` fusion (`--silhouette-fuse-t` pill-docks-into-bar meld) is the iOS-27 headline. Slots are ORIENTATION-DERIVED (`slotToRect` / `dimOf` — vertical is the same data, axes swapped). ONE rAF loop, every survivor reads the SAME spring sample. PRM sync-seats. **The pure diff logic is EXPORTED + TESTABLE** (`diffSilhouetteSlots`, `detachVector` — both exported, both have a unit test). The delegation fences (it CALLS fission/bloom, never re-implements) are the no-second-engine discipline done right.

**CRITICAL GAP — it does not ship.**
- **ZERO exports.** Absent from `composables/index.ts` AND `src/components/custom/dock/index.ts`. Unreachable except by deep relative import. (The fission test imports it directly; nothing else can.)
- **ZERO call-sites.** No SFC, no demo composes it. `GlassDock.vue` does not wire it.
- **The fission/bloom delegation is INTERFACE-ONLY** — `registerFissionPiece`/`bloomInPiece` are optional injected callbacks (`RegisterFissionPiece`/`BloomInPiece`), gracefully degrading when absent. So even where it WERE wired, the fission hand-off is a consumer-supplied adapter (it does not import `useDockFission` directly — it takes a `registerFissionPiece` the consumer maps onto fission's `registerPiece`). This is correct decoupling, but it means the silhouette↔fission bridge is hand-wiring the consumer must author — another facade gap.

This is the single biggest API-surface miss: a 551-line, well-built, well-tested orchestrator that is **invisible to every consumer.** W-SILHOUETTE-REALIZE must export + wire it; without that the context-silhouette hallmark is dead code.

### A5. `useDragMorph` — ROBUST grab-pull primitive, correctly NOT dock-coupled

**Robust + KISS (proven).** The pull-to-morph gesture composes kf `Draggable` (pointer-capture follow + velocity buffer + fling) + `SpringProgress` (`snappy` preset) + `useLiquidFlex` (`"tanh"` squish, capped at `--tab-indicator-max-stretch`). Owns NO hand-rolled sampler, NO parallel integrator. Compositor-only (`transform: translate` on the axis). ONE registry (`onSnap` single-commit, consumer writes `v-model`). PRM-safe (gesture works, squish off, instant snap). The LAZY spring (`ensureSpring` on first arm) keeps a never-dragged host from minting a `SpringProgress` (the one-morph-engine invariant). `refresh()` rebuilds the `Draggable` on a geometry change over the SAME reused spring.
- **The snap-resolution interim** is honestly documented: kf's `snap` option isn't on the published dist `DragOptions`, so it wires the free fling + `decayRest` projection + `spring.target` re-target HERE, books the kf `snap`-option adopt as a by-name ask (the foreign-tree fence). Robust + honest.

**Assessment:** This is a MOTION primitive (`/motion`), correctly NOT a dock composable — its consumers are `SegmentedTabs` (the liquid tab) + `DockLayerGroup` (pull-to-switch). It is robust and composable. **No gap** beyond the upstream kf `snap` interim. For the hallmark, the dock could COMPOSE it (grab the now-playing pill and pull) — but that's an additive wiring opportunity, not an API defect.

### A6. `DockStack.vue` — KISS two-mode rail, ONE registry, clean

**Robust + KISS (proven).** ONE component, TWO render modes (`stack` macOS-fan / `facets` accent-chip carousel) over the kept `.glass-dock-frame` non-clipping escape (box-inviolate, `deltaW=deltaH=0`). REUSES the `HOVER_INTENT_MS` hysteresis (not re-forked). ONE registry (`v-model:selected` consumer-owned; no internal selection shadow — the `expanded` is a transient UI state). The facet depth-tier composes the PURE `projectFacets` (railProjection.ts — stateless, no spring/rAF/DOM). The fork-delete discipline (no `DockRail.vue`/`useLiquidRail.ts`) is recorded. Composes `FadingScroll` for the n-set overflow.
- **`DockStackItem` descriptor** lives in `constants.ts` (the SFC-cannot-re-export-a-type home) — correct colocation.

**Minor gap:** the facet carousel is click-only — no drag-to-scrub the carousel (a `useDragMorph` opportunity for the facet strip). Defensible (the fan is a fold→expand, not a draggable strip). Keyboard is focus-in/out + click — adequate.

---

## PART B — interactivity matrix (drag · scroll · morph · link · keyboard)

| axis | shipped | where | gap |
|---|---|---|---|
| **drag** | ✓ robust | `useDragMorph` (tabs, layer-switch); `useDockFission.onPointerMove` (seam-tension) | dock root does NOT compose drag (no grab-the-pill); facet carousel not draggable |
| **scroll** | ⚠ partial | `useDockSearch` scroll-shrink; `FadingScroll` in DockStack; `useDockMorphWindow` | NO scroll-minimize on the dock itself (the BD W-SCROLL-MINIMIZE is unbuilt); `useDockState` reads no scroll |
| **morph** | ✓ robust | `dockMorphContext` (collapse/expand), `useDockOrientationMorph` (V↔H), `useDockFission` (split) | all STRANDED beside the dock — not composed INTO `GlassDock` |
| **link** | ✗ MISSING | — | NO `useDockLink` facade; the 4 link primitives are hand-wired against 4 conventions (largest gap) |
| **keyboard** | ⚠ thin | focus-in/out (`useDockState`); roving-tabindex (SegmentedTabs, DockLayerGroup) | NO Escape-collapse on dock; NO keyboard expand beyond focus; touch-tap-peek absent |

---

## PART C — where the API is THIN / MISSING for the hallmark bar (ranked)

1. **`useDockLink` does not exist (THE largest gap).** No ONE facade exposing `toSurface`/`receive`/`split`/`silhouette` as verbs keyed off the dock root. The BD union specs it correctly (`waves/BD.W-DOCK-LINK-API.md` — explicit-options handle boundary, no-defineExpose, no-reka-internal-selector, composes the shipped bloom entry points). **BUILD it.** It is the KISS+DRY realization that turns the 4 stranded engines into one coherent verb surface.

2. **`useDockContextSilhouette` is unexported + unwired (the headline engine is dead code).** Export from `composables/index.ts` + `/dock`; compose it into the now-playing dock SFC (W-SILHOUETTE-REALIZE). Until then the context-silhouette hallmark cannot run.

3. **`GlassDock` composes only `useDockState` — the morph/fission/silhouette orchestrators are demo-only.** The "ONE living organism on ONE orchestrator" charter is a fence, never a shipped composition. A `<DockNowPlaying>` (or `GlassDock` opt-in props) must compose fission+silhouette so the dock IS the organism, not a chrome the demos re-wire.

4. **`useDockState` interactivity is desktop-mouse-shaped.** Add: a touch-tap-peek state (coarse-pointer expand without hover), an Escape-collapse, and DECIDE `onStateChange` (wire it for the silhouette reaction, or delete the dead option). The hallmark must feel native on touch.

5. **No scroll-minimize on the dock itself.** `useDockSearch` shrinks on scroll but the dock chrome does not condense/minimize directionally (BD W-SCROLL-MINIMIZE unbuilt). The iOS-27 scroll-condense is a hallmark read.

6. **The silhouette↔fission↔bloom hand-off is consumer-authored adapters.** `useDockContextSilhouette` takes `registerFissionPiece`/`bloomInPiece` as injected callbacks — correct decoupling, but the bridge is hand-wiring. The `useDockLink` facade (gap 1) is the place to fold these into one construction so a consumer never maps the adapters by hand.

**What is genuinely robust + done (no action):** the spring engines (one-scalar/interruptible/PRM-sync-seat/compositor-only/box-inviolate), the descriptor-DATA discipline (`DOCK_SPLIT_SIGNATURES`, `DockSilhouetteDescriptor`), the pure-logic testability (`diffSilhouetteSlots`/`detachVector`/`DOCK_SPLIT_SIGNATURES`), `useDragMorph`'s kf reuse + honest snap interim, `DockStack`'s two-mode KISS + one-registry, and `useDockState`'s FLIP-thrash hysteresis + teleport-aware click-away. The engines are flagship-grade; the SURFACE is under-integrated.
