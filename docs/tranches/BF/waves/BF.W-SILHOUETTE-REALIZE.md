# BF.W-SILHOUETTE-REALIZE — DECIDE-don't-rebook the context silhouette: wire it into the liquid surface OR retire-with-rationale

**Band 2 · Tier T5 · depends: W-DOCK-INTEGRATE (T4) · W-FLIP-SPINE (T1) · W-JUBILANCE-WIRE (sibling T5; the fission registrar) · W-GESTALT-WIRE (T1)**

## The defect / the ask

`useDockContextSilhouette` (read it — `src/components/custom/dock/composables/useDockContextSilhouette.ts`, 551 lines) is the BE headline LAYER+fusion engine: a declarative `DockSilhouetteDescriptor[]` state machine (`bar | bar+pill | split | search`) that on `setSilhouette(toId)` DIFFs the slots by `controlId` — survivors FLIP via the shipped `ElementMorph` + `springTimingFunction` on ONE `DOCK_SPRING`, from-only DETACH (drives `useDockFission.registerPiece`), to-only BLOOM (drives `useBloomUp`/`useLiquidReveal`), and the `bar+pill` descriptor DOCKS the now-playing pill DOWN and MELDS it into the tab-bar via a `--silhouette-fuse-t` clip-meld scalar written onto the dock root. The slot geometry is orientation-derived (`slotToRect`, the `dim`-idiom — vertical falls out by construction). It is a clean, idiomatic, compositor-only engine.

It has **ZERO real consumers**. A grep over `src/` finds `useDockContextSilhouette` referenced only by itself; it is **unpublished** (not in the `/dock` barrel), no SFC ever calls `setSilhouette`, and **no CSS consumes `--silhouette-fuse-t`** (the headline pill→tabbar meld scalar is written to a property nothing reads — the meld never paints). `proof:dock-context` (read it — `scripts/proof-dock-context.mjs`) is a **pure source-text scan** of the composable file: C1-C5 assert the descriptor map / `ElementMorph` import / a `fuse` marker + a `--silhouette-fuse-t` WRITE / a `prefersReducedMotion()` branch / the `DOCK_SPRING` read — it greens on the engine's source SHAPE and never asserts a real `setSilhouette` CALLER or a CSS reader of the fuse scalar.

- **R13** (contextual switching — the silhouette reconfigures per context) — ENGINE DEAD (zero real consumers).
- **D12** — `useDockContextSilhouette` (551L, the LAYER+fusion headline) ZERO consumers, unpublished → BUILD (decide-don't-rebook).

This is a **DECIDE-don't-rebook** wave (the BB.W-NDA-DECIDE discipline — the founding chronic DECIDED-TERMINAL, never re-stamped un-MET another tranche). The engine has ridden one tranche un-decided; BF DECIDES: BUILD (wire it into the flagship liquid surface with a real context-switch + a CSS `--silhouette-fuse-t` consumer) OR RETIRE-with-rationale.

## The mechanism

**DECISION: BUILD — wire it (the engine is real, idiomatic, and the headline iOS-27 betters-move; a retire would discard a genuine LAYER+fusion mechanism the user explicitly asked for, R13).** The wiring rides the `<DockNowPlaying>` surface W-DOCK-INTEGRATE ships — the same dock that fissions is the natural silhouette host.

1. **Publish + wire `useDockContextSilhouette` onto `<DockNowPlaying>` (the flagship liquid surface).** Re-export it from `src/components/custom/dock/index.ts` (beside `useDockFission`). `<DockNowPlaying>` composes it with a real three-context descriptor map:
   - **`nav` (`bar`)** — the resting nav silhouette: the controls in a row, no pill.
   - **`media` (`bar+pill`)** — the now-playing pill DOCKS DOWN and MELDS into the bar (a `fuse: true` slot whose `to`-rect is the bar's top crown). This is the headline fusion — `setSilhouette('media')` drives `--silhouette-fuse-t` 0→1.
   - **`split`** — the transport CARVES: the from-only flanking controls DETACH (the orchestrator's `registerFissionPiece` hand-off wires to W-DOCK-INTEGRATE's `useDockFission.registerPiece` — the SAME fission engine, the CONSUMING seam reconciled), the survivors FLIP to their split slots.

   The SFC resolves controls off its slot refs (`resolveControl`), passes the dock root for the origin measure + the `--silhouette-fuse-t` write, and wires the fission registrar so a `media → split` transition's from-only controls bud off the body via the shipped fission orchestrator (no second detach engine).

2. **The `--silhouette-fuse-t` CSS consumer (the meld PAINTS).** A shipped CSS rule in `src/styles/dock/` reads `--silhouette-fuse-t` to drive the pill→bar clip-meld: the pill's `clip-path` insets its bottom edge + `translateY` docks it down so its bottom MELDS into the bar's top edge as ONE continuous translucent glass plate (the engine writes the scalar; the CSS paints the meld — compositor-only: `clip-path` + `transform`, never a layout property). At `--silhouette-fuse-t: 0` the pill floats above the bar (byte-identical resting); at `1` it is one fused glass module. This is the load-bearing fix — the headline scalar was written to nothing; now a real recipe reads it.

3. **The FLIP composes the one spine (no re-fork — W-FLIP-SPINE reconcile).** The engine's in-flight FLIP loop currently runs a hand-rolled rAF stepping `easing.fn(t)` over `ElementMorph` (`useDockContextSilhouette.ts:467-498`). W-FLIP-SPINE mints the ONE `useElementBloom` FLIP-inversion runner and folds the re-forks onto it; this wave's wiring composes the silhouette's FLIP through that shared spine (the engine's own rAF loop is replaced by the spine call — the no-fifth-rAF discipline). The `setSilhouette`/diff/descriptor LOGIC is byte-untouched; only the loop is re-pointed onto the spine.

## The gate — proof:dock-context (HARDENED, born-RED → GREEN)

Extend `proof:dock-context` IN PLACE (no new gate) from a pure source-text scan of the composable to a **real-consumer assertion** (the phantom-consumer-class fix — the W-JUBILANCE-WIRE / W-DOCK-INTEGRATE call-site discipline). The C1-C5 source clauses STAY (they prove the engine SHAPE); the new clauses prove it is WIRED:

- **C6 — a REAL SFC calls `setSilhouette`.** A `src/` SFC (`DockNowPlaying.vue`) imports `useDockContextSilhouette`, constructs it with a `silhouettes` descriptor array carrying ≥3 contexts (one of kind `bar+pill` with a `fuse: true` slot, one `split`), and calls `setSilhouette(` from a real handler — asserted as a `src/` file path that imports-and-calls, NEVER a `demo/` story and NEVER a markdown keyword. REDS while no SFC calls it.
- **C7 — `--silhouette-fuse-t` has a CSS READER.** A shipped `src/styles/` rule reads `var(--silhouette-fuse-t` to drive a `clip-path`/`transform` meld (the engine's WRITE is matched by a paint-side READ). The anti-evasion floor: a `--silhouette-fuse-t` written to a property nothing reads is the dead-scalar class — the gate asserts a real consumer rule. REDS while the scalar is write-only.
- **C8 — published + the fission registrar reconciled.** `useDockContextSilhouette` is re-exported from the `/dock` barrel, AND the SFC passes a real `registerFissionPiece` resolving to `useDockFission.registerPiece` (the detach hand-off is the SAME shipped fission engine, not a second detach path).
- **C9 — the FLIP composes the one spine.** The composable imports the `useElementBloom` spine (W-FLIP-SPINE) for its survivor FLIP loop, OR the gate records the spine-fold; it owns NO standalone rAF spring integrator besides the spine (the no-fifth-rAF fence — the `proof:no-layout-animation`/W-FLIP-SPINE duplication-bite mirror).

**Self-test bites:** (a) the `setSilhouette` caller is a `demo/` story → C6 RED; (b) `--silhouette-fuse-t` written but no CSS reader → C7 RED; (c) the engine unpublished from `/dock` → C8 RED; (d) a `media` descriptor with no `fuse: true` slot (a pill-above-bar literal) → the existing C3 RED; (e) a standalone rAF in the composable beside the spine → C9 RED.

**What reds on the pre-fix tree:** C6 (no SFC calls setSilhouette), C7 (no CSS reads the fuse scalar), C8 (unpublished + no registrar reconcile) — the engine greens its SHAPE (C1-C5) but FAILS every wired-consumer clause, exactly the phantom-engine state this wave kills.

## The binding π — tests-visual/dock-context.spec.ts

The painted-truth readback, BOTH modes AND the **webkit project**:

- **Surface:** `demo/stories/dock/dock-nowplaying.vue` (composing the SHIPPED `<DockNowPlaying>` with its silhouette wired), at `:5199`.
- **The fusion MELDS:** `setSilhouette('media')` and capture the pill→bar dock-down frame-series — assert `--silhouette-fuse-t` runs 0→1 AND the pill's bottom edge VISIBLY melds into the bar's top edge (a getImageData scan across the pill/bar seam reads continuous glass at fuse-t=1, NOT a gap — the headline iOS-27 betters-move actually paints). The controls GLIDE (transform-matrix FLIP), never teleport (capture the survivor mid-FLIP transform).
- **The split DETACHES via the shipped fission:** `media → split` buds the from-only controls off the body (the `useDockFission` registrar fires — the goo neck reads, reconciled with W-DOCK-INTEGRATE).
- **Vertical:** the SAME descriptor data under `orientation="vertical"` reads as a column reflow (the `slotToRect` `dim`-idiom — never a `display:none` amputation), the slots stacked.
- **PRM single-paint:** under reduce, `setSilhouette` seats every survivor at its `to`-rect + the fuse scalar at its endpoint in one step (zero FLIP frames).

## The gestalt row

**BF-roster surface: `dock-context` (the contextual silhouette).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture of the silhouette transition, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: switching context RECONFIGURES the dock SHAPE — the now-playing pill DOCKS DOWN and reads as ONE fused glass module with the bar (not a pill floating above a separate bar); the transport split CARVES; controls GLIDE between silhouettes. Born-FAIL on the BE tree (the engine is dead — no consumer, the fuse scalar paints nothing); flips PASS at W-REFLECT. Wired into the BF roster by W-GESTALT-WIRE.

## Fences

- **No-legacy / clean break.** No `data-mode` block-swap, no `v-if`/`v-show` context teleport (the prototype disease the engine kills, kept dead). The FLIP loop folds onto the one spine — no fifth rAF survives.
- **No re-fork.** The wiring COMPOSES the shipped `useDockContextSilhouette` (the diff/descriptor logic), `ElementMorph`/`springTimingFunction`/`DOCK_SPRING` (the FLIP substrate), `useDockFission.registerPiece` (the detach engine — the SAME one W-DOCK-INTEGRATE ships), the `useElementBloom` spine (the FLIP runner). It re-implements NONE.
- **Decide-don't-rebook (BB.W-NDA-DECIDE).** This row is DECIDED-TERMINAL: BUILD. It does NOT re-stamp `useDockContextSilhouette` un-MET for another tranche. If a future re-evaluation finds the wiring un-shippable, the disposition flips to RETIRE-with-rationale IN PLACE (the no-silent-rebook fence — `proof:be-fold-ledger` owns the disposition register).
- **Presets-in-consumers.** The descriptor slot geometry (the app's specific control layout) is the consumer's; the engine + the `--silhouette-fuse-t` meld recipe are the library's identity. The fuse default (0) is byte-identical resting.
- **The specific anti-pattern this must NOT become:** a `setSilhouette` call wired into a `demo/` story only (the demo-private engine the BE work shipped), OR a `--silhouette-fuse-t` write with no CSS reader (the dead-scalar class — the gate's C7 kills it).

## Disposition links

- **D12** — `useDockContextSilhouette` ZERO consumers, unpublished → BUILD (decide-don't-rebook): wired into `<DockNowPlaying>` with a real context-switch + a CSS `--silhouette-fuse-t` consumer; `proof:dock-context` hardened to assert a real `setSilhouette` caller. CLOSED-TERMINAL.
- **R13** — contextual switching (silhouette reconfigures per context) → BUILT on the flagship liquid surface. CLOSED (the LAYER half — the route→layer fold — is W-LAYER-IN-LIQUID's; this wave realizes the descriptor→silhouette fusion).
