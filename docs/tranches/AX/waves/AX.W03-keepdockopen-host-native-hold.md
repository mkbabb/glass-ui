# AX.W03 — keepDockOpen rebuild: the host-native hold, held as first-class morph state

**Band** A · DOCK · **Severity** blocker · **dependsOn** AX.W01

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer
> session drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave
> does NOT close on a green headless gate; it closes on a LIVE Playwright + frontend-design audit.

---

## State

**Name**: W03 — keepDockOpen rebuild: the host-native hold, held as first-class morph state
**Opens after**: AX.W01 (the single-scalar morph driver + `useDockState` rebuild it must re-seat onto)
**Agents**: 3 parallel-then-serial (1 implement → 1 adversarial-verify → 1 gate-author; the ≤6 impl / ≤7 read-only ceiling is honored with a single implement lane on the disjoint `Slider.vue` + new `useDockHold.ts` surface)
**Hard gate**: `proof:dock-hold-contract` (NEW, born-RED) — a jsdom `@vue/test-utils` MOUNT test of `<GlassDock><Slider/></GlassDock>` that dispatches a real `pointerdown` on the slider host and asserts `keepOpen()` fired / the dock root carries `data-held`; FAILS at HEAD, passes after the fix — PLUS the mandatory π-lane live Playwright + frontend-design visual-truth audit (halo + substrate tier-shade paint through a real drag past the collapse delay).
**Status**: planned

**Born-RED witness (the wave must START red).** The keepDockOpen contract has NEVER worked through a
real reka-ui drag. Slice 2 F0 is LIVE-PROVEN against the demo (`/compositions/dock-with-slider`
`[data-testid=dock-slider-hold]`): driving the exact proof gesture (hover-expand → `pointerdown` on the
slider → `pointerleave` the dock → wait past the 600ms collapse delay) yields
`heldAfterPointerdown=FALSE`, `expandedDuringHold_900ms=FALSE` — the dock collapses under the held thumb;
`data-held` never flips on the dock OR the slider. The mechanism is device-bisected: a native
`addEventListener('pointerdown')` on the SAME `data-slot='slider'` DOM node FIRES
(`nativeAddEventListenerRuns=true`), reka's own `onPointerdown` FIRES (it threw `NotFoundError` on
`setPointerCapture` during the synthetic drag), yet `Slider.vue`'s `onPointerDown` — whose first line
`acquire()` is capture-independent and synchronous — NEVER runs. The only automated guard
(`proof:dock-layering-polish` `detectSliderHold`) SKIPs fail-open with `EXIT=0` and no Playwright
harness, so the broken contract shipped GREEN across 3.4.0→3.6.0 (AW.W3 claimed the fix; it did not
land). The NEW `proof:dock-hold-contract` mount gate, written first, fails at HEAD — that is the
falsifiable RED.

---

## Goal

This wave succeeds if, when work ends, a `<Slider>` dragged inside a `<GlassDock>` holds the dock open
for the gesture's full duration on pointer AND touch — because the hold is acquired from the slider's
ACTUAL host element via native listeners and fed as a first-class `held` input to the one morph state
machine — and a deterministic CI mount gate (not a fail-open SKIP) plus a live π-lane visual audit both
prove it.

---

## Scope

The gestalt fix from slice 2 F0 / F2 + slice 1 F4 — fix the contract at its device-proven root, no
workaround, no second hold path:

1. **Stop fighting the reka forwarding boundary.** Delete the dead `@pointerdown`/`@touchstart`/
   `@touchmove`/`@touchend` template bindings on `<SliderRoot>` in `Slider.vue` (the listeners that
   `$attrs`-fall-through and are DROPPED across the Slot/forwardRef boundary — reka's own
   `onPointerdown` shadows rather than merges them). They never fire; they are the bug.

2. **Author `useDockHold(rootRef)` — colocated under `src/components/custom/dock/composables/`.** A tiny
   composable that, in `onMounted`, resolves the slider's real host element (through the existing
   `getRootEl()` template-ref seam, `Slider.vue:96` — live-proven to receive the event) and attaches
   native `addEventListener('pointerdown', …)` + `addEventListener('touchstart', …)` on THAT element,
   with `onBeforeUnmount` teardown. It owns acquire/release ONCE and keeps the window-scoped
   `pointerup`/`pointercancel` release (which already works — pointer-capture retargets to the captured
   element and bubbles to `window`). It consumes the dock via the existing `useOptionalDockContext()` DI
   (`keepOpen()` / `release()` / `held` — the typed `DockContext` already in
   `dock/composables/dockContext.ts`), so a slider outside any dock is a befitting-silent no-op.

3. **Fold touch parity into the one hold.** Delete the redundant parallel `watch(touchGate.isActive, …)`
   acquire/release path (`Slider.vue:128-134`) — `useDockHold` attaches `touchstart` on the same real
   host element and drives the SAME single acquire/release, so there is one owner, one acquire path. The
   `useTouchGate` scroll-vs-drag arbitration stays (it is a separate concern: deciding whether a touch is
   a drag), but it FEEDS the one hold rather than racing it through a dead binding surface.

4. **Make `held` a FIRST-CLASS input to the single morph state machine (slice 1 F4).** After AX.W01 the
   dock state is a function of `(hoverIntent, pinned, heldCount)` and the morph is a function of that
   state, with ONE driver owning the morph scalar. The hold is therefore a synchronous reactive edge
   INTO that state — not a side-channel token that races the driver's `data-held` writes. There is no
   orphan-able async listener and no attribute write-race: `useDockHold` increments/decrements
   `heldCount` (via `keepOpen()`/`release()`), the driver reads `held` as a state input, and the driver
   alone writes `data-held`.

5. **Re-seat onto the W01/W02 collapse-machinery rebuild (CAVEAT, slice 2 notes).** The hold wiring must
   compose with whatever `GlassDock`/`useDockState` shape AX.W01 lands — coordinate so the hold is not
   re-broken by the collapse-machinery rewrite. The slider thumb-halo (`.glass-slider[data-held]`) and
   the dock substrate tier-shade (`.glass-dock[data-held]`) are BOTH already correct in CSS
   (live-confirmed responsive) — they light up the moment `keepOpen()` fires; no CSS change is in scope
   for this wave beyond what AX.W01 owns.

**Preserve the proven DI shape (RATIFY: keep the keepOpen/portal contract — §4 note 23, hist:keyframes.js
action).** `useDockHold` MUST preserve the `provide`/`inject` `keepOpen`/`release` DI pair + the
`data-glass-dock-portal` teleport contract keyframes.js dogfoods (the canonical mis-wire is the kf D9
break). Do NOT re-route the hold through a new injection key or a bespoke event bus — consume the
existing `DockContext`. **RATIFY-BEFORE-IMPL:** slice 1 F4's fix text floats an alternative — "subscribe
to reka-ui's `SliderRoot` pressed/dragging state directly rather than hand-rolling window pointerup." The
charter §3 W03 block ratifies the NATIVE-HOST-LISTENER path (the live-proven fix), NOT the reka-state
subscription: reka does not publicly expose a stable `dragging` ref on `SliderRoot`, and binding to it
would re-introduce the same forwarding-boundary fragility the wave excises. The recommended path is
native host listeners; record this disposition in §Archaeology and proceed.

---

## FileBounds

| File | Access |
|---|---|
| `src/components/custom/dock/composables/useDockHold.ts` | create |
| `src/components/custom/dock/composables/index.ts` | modify (export `useDockHold`) |
| `src/components/ui/slider/Slider.vue` | modify (delete dead template bindings + parallel touch-watch; consume `useDockHold`) |
| `scripts/proof-dock-hold-contract.mjs` | create (the NEW born-RED mount-gate runner, if not a pure vitest entry) |
| `tests/components/ui/slider/dock-hold-contract.test.ts` | create (the jsdom mount test) |
| `package.json` | modify (register `proof:dock-hold-contract`; retire the fail-open `detectSliderHold` arm of `proof:dock-layering-polish` per §HardGate) |
| `scripts/proof-dock-layering-polish.mjs` | modify-carve (REMOVE the fail-open `detectSliderHold` SKIP arm, lines ~458-479 + 543-546 — its responsibility migrates to the bite-in-CI mount gate; the rest of the polish gate is untouched) |

**Do NOT touch:** `src/styles/dock.css`, `src/styles/dock-controls.css`, `src/components/custom/dock/GlassDock.vue`, `src/components/custom/dock/composables/useLayerTransition.ts`, `src/components/custom/dock/composables/useDockState.ts` (AX.W01 owns the morph driver + `useDockState` rebuild; W03 only CONSUMES the rebuilt `held` edge — it does not rewrite the state machine), `src/styles/tokens.css`/`theme.css` (AX.W05 owns the spring tokens). The `.glass-slider[data-held]` thumb-halo CSS and `.glass-dock[data-held]` substrate CSS are already correct — leave them.

---

## Disjointness

W03 is the ONLY dock-band wave that touches `Slider.vue` and the ONLY one that creates
`dock/composables/useDockHold.ts` — its primary write surface is fully disjoint from its siblings
(slice 28 harden:dock-graphics FileBounds map):

- **vs AX.W01** — W01 rewrites `useLayerTransition.ts` + the dock.css morph rules + removes the VT fork
  from `GlassDock.vue`, and rebuilds `useDockState`. W03 does NOT write any of those; it CONSUMES the
  rebuilt `held` state edge. **Shared dependency, not shared file:** W03's §Scope item 4 ("`held` as a
  first-class state input") DEPENDS ON W01's state-machine shape, which is why `dependsOn AX.W01`. W03
  re-seats onto W01's `useDockState`; it must run AFTER W01 lands so it consumes the final shape, never
  mid-churn.
- **vs AX.W02** — W02 folds the inner `DockLayerGroup` onto the outer orchestrator; no `Slider.vue` or
  hold surface. Disjoint.
- **vs AX.W04** — W04 writes the dock.css wrap rules + a `GlassDock.vue` wrap-guard. W03 touches neither.
  Disjoint.
- **vs AX.W05** — W05 writes `tokens.css`/`theme.css` spring tokens + re-points the Slider's spring
  CURVE consumer. **Shared file risk: `Slider.vue`.** W05 changes the slider's spring TOKEN reference
  (`--spring-snappy` → the governed dock register); W03 changes the slider's HOLD wiring (template
  listeners + touch watch). These are non-overlapping line ranges, but to guarantee parallel-dispatch
  disjointness they MUST be SEQUENCED, not run concurrently on `Slider.vue`. W03 lands first (it is the
  blocker); W05 re-points the spring curve afterward. Declared so the orchestrator never parallelizes the
  two against the same file.
- **vs AX.W06** — W06 SPLITS `dock.css` into partials, LAST in the band. W03 does not write dock.css.
  Disjoint.

No two units WITHIN this wave share a `modify`/`create` path: the implement lane owns
`useDockHold.ts` + `Slider.vue` + the index export; the gate-author lane owns
`tests/…/dock-hold-contract.test.ts` + `package.json` + the `proof-dock-layering-polish.mjs` carve.
These are disjoint paths and may proceed in parallel after the implement lane lands the seam.

---

## Triumvirate

- **Implement.** Author `useDockHold(rootRef)` (native host `pointerdown`/`touchstart` on the resolved
  `getRootEl()` element + window `pointerup`/`pointercancel` release + `onBeforeUnmount` teardown +
  `useOptionalDockContext()` consumption). Rewire `Slider.vue`: delete the dead `<SliderRoot>` template
  event bindings, delete the duplicated acquire/release booleans, delete the parallel
  `watch(touchGate.isActive)` acquire path, consume `useDockHold`. Export from
  `dock/composables/index.ts`.
- **Adversarially verify.** Independently re-run the slice-2 live probe AGAINST the fix: confirm
  `nativeAddEventListenerRuns` is now the PRODUCTION path (not a probe artefact), `heldAfterPointerdown=true`,
  `data-held` flips on BOTH the dock root and the slider root, release re-arms the idle timer, and the
  touch path acquires through the SAME single owner (no second acquire). Adversarial angle: attempt to
  orphan the listener (unmount-during-drag, pointer-capture transfer, teleport into a dock portal) and
  prove the `onBeforeUnmount` + window-release safety net holds with no leaked `keepOpenCount`. Confirm
  W01's `useDockState` `held` edge is the ONLY `data-held` writer (no write-race re-introduced).
- **Gate-author.** Write `tests/components/ui/slider/dock-hold-contract.test.ts` (jsdom `@vue/test-utils`
  MOUNT of `<GlassDock><Slider/></GlassDock>`, dispatch a real `pointerdown` on the slider host, spy
  `keepOpen()` / assert `data-held`) so it FAILS at HEAD and passes after the fix. Register
  `proof:dock-hold-contract` in `package.json`. Carve the fail-open `detectSliderHold` SKIP arm out of
  `proof-dock-layering-polish.mjs`. Author the π-lane visual-truth Playwright probe spec (below).

---

## HardGate

**Born-RED → GREEN headless gate.** `proof:dock-hold-contract` — a deterministic, browser-FREE
`@vue/test-utils` + jsdom MOUNT test that bites in CI (the seam that actually breaks IS a
component-mount fact, so it is gateable without a browser, slice 2 F2 gestaltFix):

1. Mount `<GlassDock><Slider/></GlassDock>`.
2. Resolve the slider's host element; dispatch a real `pointerdown` Event on it.
3. Assert the dock context's `keepOpen()` was invoked (spy on the provided `DockContext.keepOpen`) AND
   the dock root carries `data-held` after a tick.
4. Dispatch `pointerup` on `window`; assert `release()` fired and `data-held` cleared.
5. A touch arm: dispatch `touchstart` on the host; assert the SAME single acquire path fires (no second,
   parallel acquire).

This FAILS at HEAD (the listener never binds to the host that receives the event) and passes after the
fix — moving the guard from a fail-open SKIP that exits 0 with no harness to a deterministic mount test
that bites. Concurrently RETIRE the `detectSliderHold` fail-open arm of `proof:dock-layering-polish`
(scripts/proof-dock-layering-polish.mjs:458-479 + the SKIP at 543-546) — its responsibility migrates to
the bite-in-CI mount gate (slice 2 F2: "a behavioral gate that silently passes when its harness is absent
provides false assurance"). This is a precept-valid artefact (a test that fails-then-passes — Hard Gates
§"runtime observation" / "test output"), NOT a grep-only string match.

**MANDATORY VISUAL-TRUTH live audit (non-negotiable per AX.W00 / §0 cardinal gate).** The wave does NOT
close on the mount gate alone. The π-lane (Playwright + Chrome MCP) drives a REAL drag on the live demo
(`/compositions/dock-with-slider`) — `page.hover` to expand, real `pointerdown` on the slider, real
drag, `pointerleave` the dock, hold past the collapse delay — and a frontend-design audit confirms on the
APPEARANCE/INTERACTION axis:
- the dock substrate tier-shade (`.glass-dock[data-held]`) paints through the held drag and does NOT
  idle-collapse;
- the thumb halo (`.glass-slider[data-held]`) intensifies for the gesture;
- release re-arms the idle timer (the dock collapses AFTER, not DURING, the drag);
- touch-emulated drag holds identically;
- captured at the π-lane viewport matrix (≥3 viewports) with the BEFORE/AFTER + DELTA.md compare-at-close
  protocol (AX.W00 paired-π) — the broken-HEAD capture (collapses under the thumb) vs the fixed capture
  (holds), so the visual delta is the close evidence.

**Visual-truth gate one-liner.** π-lane Playwright on `/compositions/dock-with-slider`: a REAL pointer
(and touch) drag of the in-dock slider keeps the dock open + paints `.glass-dock[data-held]` substrate
tier-shade and `.glass-slider[data-held]` thumb-halo through the whole gesture, the dock idle-collapses
only AFTER release, captured as a BEFORE(broken)/AFTER(fixed)/DELTA over ≥3 viewports — and the wave does
not close until a human-readable frontend-design audit signs off that appearance.

---

## Cadence

1. **Live re-diagnosis FIRST (the AX.W00 wave-open ritual).** Re-run the slice-2 live probe against the
   CURRENT HEAD (post-W01) to confirm the forwarding-drop is STILL the live root cause on the rebuilt
   `useDockState`, not a hypothesis carried from the audit. Record the witness in §Archaeology.
2. **Gate-author writes the born-RED mount test FIRST** — `proof:dock-hold-contract` must FAIL at HEAD
   before any fix (the RED witness is the wave's entry condition).
3. **Implement `useDockHold(rootRef)`** under `dock/composables/`; export it.
4. **Rewire `Slider.vue`** to consume it; delete the dead `<SliderRoot>` template bindings + the parallel
   `touchGate` watch.
5. **Turn the mount gate GREEN**; retire the fail-open `detectSliderHold` arm of
   `proof:dock-layering-polish`.
6. **Adversarial verify** (re-run the live probe, attempt the orphan/teleport/unmount-during-drag edges,
   confirm single `data-held` writer).
7. **π-lane visual-truth audit** (BEFORE/AFTER/DELTA over ≥3 viewports + frontend-design sign-off) — the
   close criterion.
8. **Consumer-verification fold (read-only, routes to W34).** Record the muster `SignalsLayer.vue`
   non-load-bearing `:keep-dock-open="true"` finding (the slider is NOT a dock descendant in the real
   App.vue layout — the prop is a dead no-op + the rationale comment misdescribes the tree) and the
   bbnf-playground `:wrap`→`overflow="wrap"` binding-verification sweep as ADOPTION/CLEANUP legs for W34;
   do NOT edit sibling repos in this wave.

---

## Artefacts

- `docs/tranches/AX/audit/W03-dock-hold-live.json` — the live re-diagnosis witness (pre-fix:
  `heldAfterPointerdown=false`, `expandedDuringHold_900=false`, `nativeAddEventListenerRuns=true` while
  `dataHeld=false`; post-fix: all green) on the post-W01 HEAD.
- `docs/tranches/AX/audit/W03-visual-truth/` — the π-lane BEFORE(broken)/AFTER(fixed) capture set over
  ≥3 viewports + `DELTA.md` compare-at-close (the paired-π protocol) + the frontend-design audit
  sign-off.
- `proof:dock-hold-contract` gate output (born-RED → GREEN transcript).
- The deletion proof for the retired fail-open `detectSliderHold` SKIP arm (the diff carving it out of
  `proof-dock-layering-polish.mjs` + the `package.json` gate-table update).
- A short cross-repo adoption-leg note appended to the W34 ledger (muster `SignalsLayer` dead-prop +
  rationale-comment fix; bbnf-playground `:wrap` rename verification) — read-only routing, not an edit.

---

## CommitPlan

One conventional-commit per sub-step (the orchestrator owns the index — agents are read-only on git per
the hardened agent git clause):

1. `test(slider): born-RED dock-hold mount gate — pointerdown on the slider host must acquire keepOpen()`
2. `feat(dock): useDockHold(rootRef) — native host pointerdown/touchstart hold on the resolved slider element`
3. `refactor(slider): consume useDockHold; delete the dropped <SliderRoot> listeners + parallel touchGate acquire`
4. `chore(gates): register proof:dock-hold-contract; retire the fail-open detectSliderHold SKIP arm of proof:dock-layering-polish`
5. `docs(ax-w03): live re-diagnosis witness + π-lane BEFORE/AFTER/DELTA visual-truth evidence`

---

## Dependencies

- **dependsOn AX.W01** (charter §3 + §4 note 23). The hold must re-seat onto W01's single-scalar morph
  driver + rebuilt `useDockState`: §Scope item 4 makes `held` a first-class STATE INPUT to that one
  driver, so the driver's shape must exist before the hold can subscribe as a synchronous reactive edge
  (rather than the orphan-able async token race slice 1 F4 names). Running W03 before W01 would wire the
  hold into the old multi-authority state, then re-break it at W01 — the explicit CAVEAT in slice 2's
  notes ("this slice's fix must re-seat onto whatever GlassDock/useDockState rebuild the §1.1/§1.2 waves
  land").
- **Sequenced-before AX.W05 on `Slider.vue`** (not a `dependsOn`, a disjointness ordering). W03 owns the
  slider's HOLD wiring; W05 re-points the slider's spring CURVE. Same file, non-overlapping ranges — W03
  lands first (blocker), W05 follows. Declared so they are never parallelized.
- **Feeds AX.W34** (read-only routing). The muster `SignalsLayer` dead-prop cleanup + the bbnf-playground
  `:wrap` rename verification are consumer-side adoption legs routed to W34's §16 receiver — W03 records
  them, it does not execute sibling-repo edits.

---

## Archaeology

The git/tranche lineage the audit cited as evidence — and the live witnesses that grounded the
root-cause:

- **The `@pointerdown` has sat on `<SliderRoot>` since H.W3 `f3caa9f`** — the contract has effectively
  NEVER worked through a real reka drag (slice 2 F0). The listener-on-a-forwarding-component placement is
  the original defect, carried unbroken across every subsequent slider/dock wave.
- **AW.W3 claimed the fix and it did NOT land.** `docs/tranches/AW/waves/AW.W3-dock-layering-rail-wrap.md`
  (the spec scope-5 + commit-plan `fix(slider): restore dockKeepOpen acquire/release on in-dock drag`)
  asserts the contract was restored; the live re-diagnosis (slice 2 F0) falsifies it — the dock collapses
  under the held thumb on the published 3.4.0→3.6.0 line. AW.W3 was "closed" on the fail-open
  `proof:dock-layering-polish` SKIP (the headless-green/visually-broken gap, §0 / §13 cardinal lesson).
- **O.W2 Lane B** migrated the slider from 3 raw string-key injects to the single typed
  `DockContext`/`DOCK_CONTEXT_KEY` `InjectionKey` (`dockContext.ts` header comment) — the typed-key +
  paired-DI shape `useDockHold` MUST preserve (it consumes the SAME `DockContext`, not a new key).
- **§4 note 23 + hist:keyframes.js (slice 0).** keyframes.js's `isTeleportedTarget.ts`
  `data-glass-dock-portal` teleport contract + the `keepOpen`/`release` provide/inject DI pair are the
  proven DI shape the host-native `useDockHold` preserves; the kf D9 mis-wire (a dropdown mounted in a
  dock OUTSIDE the keepOpen+portal contract) is the canonical break this rebuild must not re-introduce.
- **§4 note 12 (publish-currency, scoping clarification).** Unlike the Card-specular / VT-swallow class,
  the keepDockOpen break is a CODE gap, NOT a publish-currency gap — the contract is broken at HEAD too
  (the forwarding-drop is in the source, not only the published line). This wave fixes the code; the
  publish hinge (W33/W41) ships it.
- **§4 note 11 (the live-re-diagnosis-before-the-fix ritual).** The AW dock-misdiagnosis (AW.W1 blamed
  `useLayerTransition` measurement from a hypothesis; the real cause was `container-type: inline-size`)
  is the cautionary precedent — W03's §Cadence step 1 re-diagnoses the forwarding-drop LIVE on the
  post-W01 HEAD before touching anything.
- **Live witnesses (slice 2, device-instrumented Playwright on the demo).** `Slider.vue:69-82`
  (`onPointerDown` + window pointerup, on `<SliderRoot>` at :151), :103-134 (touch handlers + the
  parallel `isActive` watch), :96-101 (`getRootEl` — the resolved host the fix attaches to), :138
  (`isHeld` binding), :239 thumb-halo CSS; `reka-ui/dist/Slider/SliderRoot.js:159` +
  `SliderImpl.js:46-52` (reka's own `onPointerdown` + `setPointerCapture`);
  `proof-dock-layering-polish.mjs:458-479` + :543-546 (the fail-open SKIP);
  `GlassDock.vue:368-393` (the canonical touch-gate consumer that binds on its OWN real `<div>` host —
  why its gate works and the slider's does not).

---

## PreceptAlignment

Pursuant to `docs/precepts/` (pinned `63240e6`); the A·DOCK band binding precepts (AX.md §2b) this wave
pursues and MUST NOT violate:

- **one-path / no-legacy-code** — the fix collapses BOTH defects + the two redundant acquire paths
  (pointer template-binding + parallel `touchGate.isActive` watch) onto ONE owner (`useDockHold`) with
  ONE acquire path. No second hold path, no compatibility bridge. The dead `<SliderRoot>` template
  bindings are DELETED, not left as a fallback (§0 "excise or fail explicitly").
- **abrogate-before-patch** — the contract is re-derived from its device-proven root (native host
  listeners on the resolved element), not patched at the forwarding boundary it has fought since H.W3.
  The fail-open `detectSliderHold` SKIP is RETIRED, not supplemented.
- **typed-key + paired DI** — `useDockHold` consumes the EXISTING typed `DockContext`
  (`createStrictContext`/`useOptionalDockContext`, the `keepOpen`/`release`/`held` triplet); it does not
  mint a new injection key or a parallel DI surface. Preserves the O.W2 single-typed-key collapse.
- **substrate-with-consumer / wire-before-retire** — `useDockHold` ships WITH its consumer (`Slider.vue`,
  consumer #1) and is the reusable seam any future in-dock drag primitive consumes (the audit's "consumed
  by Slider and any future in-dock drag primitive"); it is not unconsumed scaffolding. The retired
  `detectSliderHold` arm is replaced by the bite-in-CI mount gate before removal.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation** — a slider
  mounted OUTSIDE a dock is a BEFITTING-silent no-op (`useOptionalDockContext` returns the silent
  default — a primitive may legitimately render outside a dock); this is NOT collapsed with a
  library-internal contract violation (which would throw). The two are kept distinct per the §0 precept.
- **binding-verification (MEMORY `feedback_glass_ui_binding_verification.md`)** — this wave IS the
  canonical binding-verification class: a stale reka-ui listener-on-a-forwarding-component that vue-tsc +
  units pass but only e2e catches. The fix makes the binding native + the gate e2e-real (the mount test
  that dispatches a real event on the real host), closing the silent-no-op class.
- **π visual-runtime lane / "Runtime Truth Beats Source Claims"** (SPEC.md §"The π visual-runtime lane";
  AX.W00) — the wave closes on a LIVE Playwright + frontend-design audit (the halo + substrate paint
  through a real drag), never on the headless mount gate alone. The mount gate is a precept-valid Hard
  Gate (test output that fails-then-passes — NOT a grep-only runtime assertion, NOT a fail-open SKIP).
- **no-silent-deferrals / goal+completion paired** — the §2a Goal (held works on pointer + touch) is
  paired with the §HardGate completion criterion (mount gate + π audit); no item is "deferred to next
  tranche" — the muster/bbnf-playground consumer legs have a NAMED destination (W34), satisfying P-inv-28
  zero-deferral.
