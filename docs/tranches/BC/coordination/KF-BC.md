# KF-BC — the keyframes.js-M ⇄ glass-ui-BC green-handshake

> The BC-side answer to `inbound/KF-INBOUND.md` (kf tranche M's ASK/INFORM dispatch). kf NEVER writes
> glass-ui (the foreign-tree fence, inv-26); this is the interface — every ASK is CONFIRMED + version-stamped,
> every INFORM is threaded onto a named BC wave, and the cut-surface-stability contract is recorded. The
> communication is content-only: glass-ui reads kf as version + response AUTHORITY and edits ZERO of kf's tree.
> Machine-locked by `proof:crossrepo-asks` (the no-silent-drop completeness law — every ask names a consumer
> wave + a disposition + the green-handshake).

**Versions at the handshake (grep-verified, 2026-06-18):** glass-ui published `4.0.1` (`npm view @mkbabb/glass-ui version` → `4.0.1`; `package.json:3` = `4.0.1`); the BC cut version is USER-DOMAIN (confirm-first at `BC.W-CUT` — may be `4.1.0` or higher per the honest cut). keyframes.js consumed at `^4.0.0` (peer) / dev `^4.3.0`; value.js consumed at `0.13.0`.

---

## ASKS (kf → BC) — the answer set

### ASK#1 (BLOCKER) — the peer range, the deploy unblock · **CONFIRMED GREEN**

kf installs glass-ui and the 4.0.0 peer (`value.js ^0.10.0||^0.11.0`) rejected installed `0.13.0` (the F-2 cycle blocking kf's auto-deploy). The cut must peer value.js `^0.13.0 || ^1.0.0` (forward-compatible with value.js O: `0.14.x → 1.x`) AND keep keyframes.js `^4.0.0`.

**VERIFIED LIVE — the widened peer is already shipped:**
- `package.json:927` — `"@mkbabb/value.js": "^0.13.0 || ^1.0.0"` (peerDependencies).
- `package.json:925` — `"@mkbabb/keyframes.js": "^4.0.0"` (peerDependencies).
- `package.json:951-953` — value.js + keyframes are `peerDependenciesMeta.optional` (the optional-peer discipline; `proof:peer-optional` holds the literal absent from `dist/glass-ui.js`).
- CLAUDE.md §Dependencies states `@mkbabb/value.js ^0.13.0 || ^1.0.0` + `@mkbabb/keyframes.js ^4.0.0` (the BB.W-SPINE-LATEST collapse — the `^2||^3||^4` union collapsed to the clean `^4` coherent-latest spine).
- **4.0.1 (published, the live registry version) ships the widened peer** — so kf's `0.13.0` install resolves NOW; the F-2 reject is already dead on the published `4.0.1`, no cut required for the unblock itself.

**Forward-compatible HOLD (the `^1.0.0` pre-guard):** the peer's `^1.0.0` leg is the pre-guard for value.js O's DECIDED 1.0.0 cut (`0.14.x → 1.x`). `proof:constellation-spine` clause 8 (`scripts/proof-constellation-spine.mjs:231`) reds the close if the value peer does NOT admit `^1.0.0` — so the BC cut CANNOT silently drop the forward-compat. The peer also satisfies clause 1 (`:137-143`): the hub's value peer ⊇ keyframes' value dep (no dual-install risk).

**OWNER (the gate, not a wave):** there is NO `BC.W-SPINE-LATEST` wave in BC — `SPINE-LATEST` was the BB wave that minted the `^4` collapse (CLAUDE.md §Dependencies). The peer-conformance is a STANDING gate fact (`proof:constellation-spine` + `proof:peer-conformance` + `proof:peer-optional`) RE-VERIFIED at the cut's pre-tag full battery (`BC.W-CUT` step 1, the `--run full` siblings-absent run, ~202 gates). The cut HOLDS the peer forward-compatible by gate construction.

**Disposition: CONFIRMED — 4.0.1 ships the widened peer; the BC cut holds it forward-compatible. Owner: `proof:constellation-spine`/`proof:peer-conformance` (re-verified at `BC.W-CUT`'s pre-tag battery). No new wave.** kf's deploy unblocks on the published `4.0.1` (or any later cut).

### ASK#2 (S1) — SegmentedTabs `aria-orientation` · **CONFIRMED EMITTED (not suppressed)**

kf deletes its `:aria-orientation="undefined"` suppression at `demo/spring/SpringSidebar.vue:43` (the audit also cited `AnimationControls.vue:72`; kf finds only `:43` live now). Which BC wave + version ships the fix?

**VERIFIED LIVE — `aria-orientation` is correctly EMITTED at HEAD, never suppressed:**
- `src/components/custom/tabs/SegmentedTabs.vue:401` — `:aria-orientation="isVertical ? 'vertical' : 'horizontal'"` (a real axis-derived value, NEVER `undefined`).
- `src/components/custom/tabs/SegmentedTabs.vue:400` — `:role="isUnderline ? 'tablist' : 'group'"` (the role-per-variant: `underline` → `role="tablist"` + `aria-selected`; `pill` → `role="group"` + `aria-pressed`). `:439`/`:463` carry the per-item `:role="isUnderline ? 'tab' : undefined"`.

**MAPPED to `BC.W-TABS-IOS` (Band 3, the iOS-27 glass-pill material upgrade).** The wave is a **CSS-only material wave** — its T4 clause (`waves/BC.W-TABS-IOS.md:69`) byte-fences `SegmentedTabs.vue` + `useTabIndicator.ts` + the ARIA-role-per-variant + the roving-tabindex (a content-hash assert over those files; reds only if the wave drifts into the SFC). So `aria-orientation` is emitted-not-suppressed THROUGH the cut by construction. `BB.W-CONTROL-TOKENS` (the BB wave that threaded the role-per-type radio semantics) is the upstream owner of the role contract; BC touches the MATERIAL, not the aria.

**Disposition: CONFIRMED — `aria-orientation` is emitted (not suppressed) at HEAD and byte-fenced through `BC.W-TABS-IOS`. Version: the BC cut (≥ `4.0.1`; the live `4.0.1` already emits it).** kf deletes its `:43` suppression on consume + re-verifies `AnimationControls.vue:72` (kf's tree).

### ASK#3 (S2, RF-17) — the dock crossfade · **CONFIRMED — `useDockClickIntegrity` ships, obsoletes the interim**

kf deletes the `onPlayPointerDown`/`pointerHandled` interim in `TransportDock.vue` (lines 181, 227, 387-411). Which BC dock-morph wave + version obsoletes it?

**VERIFIED LIVE — the click-integrity pass-through already SHIPS:**
- `src/components/custom/dock/composables/useDockClickIntegrity.ts` — the composable exists (`:67` `export function useDockClickIntegrity`).
- `src/components/custom/dock/GlassDock.vue:28` imports it; `:266` wires `{ onPointerDownCapture, onClickCapture, markExpandFlip }` — the identity-scoped pass-through + the morph-settle window + the no-witnessed-press pass-through (the AZ R5-TAP contract: a touch tap + a mid-morph race are swallowed, the settled click reaches the control). This is the mechanism that makes kf's `onPlayPointerDown`/`pointerHandled` pointer interim unnecessary — the dock handles the tap-vs-morph race internally.

**MAPPED to `BC.W-DOCK-ENGINE` (Band 2, the buttery-smooth springy compositor-only dock morph — FIRST of Band 2).** The wave KEEPS the morph mechanism (the single-scalar `--dock-morph-t`, `DOCK_SPRING` byte-fenced — `waves/BC.W-DOCK-ENGINE.md:22,68,93`) and settles the CURVE + compositor promotion; the click-integrity pass-through rides on top of it unchanged. The V↔H crossfade is the View-Transitions default (`BC.W-DOCK-ENGINE:68` — the VT crossfade the RF-17 case rides). `BC.W-DOCK-VERTICAL-FIX` ("the vertical dock works + is CLICKABLE") is the sibling that hardens the clickability the integrity composable guarantees.

**Disposition: CONFIRMED — `useDockClickIntegrity` ships at HEAD (`GlassDock.vue:28,266`) and obsoletes the `onPlayPointerDown` interim. Owner: `BC.W-DOCK-ENGINE` (the morph) + `BC.W-DOCK-VERTICAL-FIX` (the clickability). Version: the BC cut (≥ `4.0.1`; the integrity composable is already live on `4.0.1`).** kf deletes `TransportDock.vue:181,227,387-411` on consume.

### ASK#4 — the rebuilt glass + dock at the cut · **CONTRACT recorded (the cut-surface stability)**

kf needs the cut version + a stable `ChromeDock`/`TransportDock` + glass API so it re-pins + re-verifies its 8 instrument scenes on the new glass.

**The cut-surface stability contract.** Between now and the BC cut, the surfaces kf depends on — **dock, cards, dialogs, the 8 instrument scenes (`InstrumentChassis` + the phase bus)** — are NOT silently broken. The guarantees, by construction:

- **The dock public surface is unchanged.** `BC.W-DOCK-ENGINE` settles the curve + compositor promotion only (`:22,93` — "does NOT rebuild the morph"; the `--dock-morph-t` scalar, the reserved-footprint `scale()`, the `overflow:clip` aperture, the V↔H VT crossfade KEPT). The `DOCK_SPRING`/`dockMorphContext` byte-fence is binding. `GlassDock` consumer-prop + `defineExpose` surface is stable; `useDockClickIntegrity` is additive.
- **The glass API evolves at the TOKEN seam, not the public prop.** Band 1 (`BC.W-GLASS-IDENTITY` restore the warm-cream partial-transparency base · `BC.W-DIALOG-GLASS` the liquid-glass dialog · `BC.W-BUTTON-GLASS-IOS` the iOS-27 button register · `BC.W-GLASS-PRUNE` the two-register prune) is a `--glass-*`-token + material upgrade; the `--glass-level`/`--glass-tint-*`/`Surface` axis public seam is the stable API kf re-pins against. `InstrumentChassis` + the phase bus (`--phase-complete-color`, the `--chart-{phase}`/`--viz-*` register) are the BB consumer seams — unchanged by the Band-1 glass restore.
- **Every visual wave VERIFIES its own paint.** `BC.W-GESTALT-FIRST` (per-wave gestalt-first paint verification — the single-terminal-reflect deferral abolished) + `BC.W-PAINT-GATE` (gates MEASURE paint, not source-mechanism) + `BC.W-VISUAL-RECONCILE` (the BB liquid-glass-band LIVE re-walk over the rebuilt floor) + `proof:ba-gestalt` (the holistic per-surface acceptance gate, dock/cards/dialogs on the roster) mean a silently-broken consumed surface reds a gate before the cut. The pre-tag `--run full` battery (`BC.W-CUT` step 1, ~202 gates siblings-absent) is the last fail-closed floor before the irreversible tag.

**The 8 instrument scenes are KF'S surfaces** (`InstrumentChassis`/`TransportDock`/`ChromeDock` consumers in kf's demo) — the contract is "glass-ui does not break the CONSUMED primitives (dock, cards, dialogs, InstrumentChassis, the phase bus) the scenes compose." kf re-pins + re-verifies the 8 scenes on the cut (kf's `M.W-DESIGN-PAINT` re-verifies the demo paint on BC's glass, both modes × mobile/desktop — INFORM-5).

**Disposition: CONTRACT — the consumed surfaces are gate-fenced stable through the cut (Band 1 token-seam + `BC.W-DOCK-ENGINE` mechanism-kept + the paint gates + the pre-tag battery). Owner: the coordination clause + the Band-1 glass waves + `BC.W-CUT`. Version: the BC cut.** kf re-pins at the cut.

### ASK#5 — GlassControlPoint (the 7-tranche DM-2 chronic) · **ANSWER: NO**

kf plans a `DemoControlPoint` over its LIGHT `Draggable` (M.W14). Is BC shipping a curve-editor `GlassControlPoint`? Just the yes/no so kf doesn't duplicate.

**ANSWER: NO — BC ships NO standalone `GlassControlPoint` primitive.**

**VERIFIED LIVE:**
- `<EasingPicker>` ships (`src/components/custom/easing/EasingPicker.vue`, `/easing` subpath) with **draggable handles INTERNAL to the picker** (`EasingPicker.vue:40-41` `HANDLE_HIT_RADIUS`/`_TOUCH`, `:95` `setHandle`, `:166` `setHandle(dragIndex.value, x, y)`, `:230` "BEZIER: handle lines + draggable handles"). The handles are an implementation detail of the curve canvas, not an exported primitive.
- **`grep -rni GlassControlPoint src/` → 0 results** (no standalone export anywhere in the tree).
- The **≥2-binary-consumer bar is UNMET** — kf is the only named consumer of a hypothetical `GlassControlPoint`. Extracting the picker's internal handle into a standalone primitive for one consumer is the contrivance the bar forbids.

**The boundary:** `BC.W-EASING-PRIMITIVE` (the BB wave that shipped `<EasingPicker>`; there is no separate BC.W-EASING-PRIMITIVE wave file — the component is already live) owns the curve editor; it composes its handles, it does NOT export a `GlassControlPoint`. **kf closes its 7-tranche DM-2 chronic by building its own `DemoControlPoint` over its LIGHT `Draggable` (M.W14) — THEIR repo, the foreign-tree fence.** If a SECOND grounded binary consumer ever lands beside kf, the bar flips and a `GlassControlPoint` extraction is reconsidered then (a future wave, born-RED at mint) — but not now.

**Disposition: ANSWER NO (decision recorded). kf builds `DemoControlPoint` in kf's tree. No BC wave, no BC export.**

---

## INFORM (kf → BC) — threaded onto the named waves

### INFORM-1 — KF-OSCILLATOR consume-seam (the loop clock)

`Oscillator`/`waveformValue` (+ `OscillatorConfig`/`OscillatorWaveform`) ship value.js-free in kf's LIGHT surface. **CRITICAL CAVEAT (grep-verified):** the `Oscillator` is **LOCAL-ONLY in keyframes.js, ABSENT from the published `4.3.0` dist** (`waves/BC.W-VIZ-CHOREOGRAPHY.md:20` — `grep Oscillator node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` → 0; present in the local sibling, 30 commits past v4.3.0). So the "consumable NOW" claim in KF-INBOUND INFORM-1 is **half-true**: the LIGHT `Sequence` + `SpringProgress` + `springTimingFunction` ARE published NOW (the one-clock substrate is consumable), but the `Oscillator` itself is **republish-gated** (importing the not-in-dist export is forbidden — `BC.W-VIZ-CHOREOGRAPHY` C6 reds it).

**Threaded as foldNotes** (the Index phase wires these into the existing waves — see the foldNotes section). The seam:
- `BC.W-MOTION-ONE-CLOCK` (Band 7) — keyframes.js is the ONE source + clock; the `Oscillator` is the booked loop-clock leaf (interim = the existing de-synced sine / `uTime`).
- `BC.W-VIZ-CHOREOGRAPHY` (Band 4) — already DECIDES this: the four beats ride the published-4.3.0 `SpringProgress`/`Sequence` clock NOW; the `Oscillator` slots in on a kf republish (the §F book, `:41-42,61,70`). The interim loop clock is the existing sine/`uTime` (KEEP).
- the EasingPicker `loop` playback (the live `EasingPicker`/`useEasingPicker` — no BC wave re-touches it; the `loop` playback seam awaits the `Oscillator` republish; the picker's default playback is the one-shot rAF travel TODAY).

**The book:** the `Oscillator` is a by-name cross-repo republish ask (kf republishes the LIGHT `Oscillator` past v4.3.0), **NO peer-spine widen** (the spine is `^4.0.0`). Recorded in the relay; NOT a blocking dep.

### INFORM-2 — `springTimingFunction` stays stable · **CONFIRMED (no action)**

The `{ fn, css: linear() }` LIGHT export BC consumes for `--spring-deck` is unchanged. `src/composables/motion/curves.ts` consumes it via the `SPRING_PRESETS` → `springTimingFunction` → `MOTION_CURVES` path (`BC.W-MOTION-ONE-CLOCK:18`); the `--spring-*` `linear()` strings are generated from the same table (`regen-spring-tokens.mjs`). FYI, no action — `--spring-deck` unchanged.

### INFORM-3 — the boundary law · **CONFIRMED**

curve-MATH = value.js · playback/spring/oscillator = kf · editor/glass = glass-ui. This is already the `EasingPicker`/`useEasingPicker` fence (the live component composes value.js `CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms` for the math, kf `springTimingFunction`/`MOTION_CURVES` for the spring playback, glass-ui owns only the chassis). The boundary holds — confirmed, no duplication.

### INFORM-4 — value.js Tranche O + the `/color` subpath footprint-shrink · **BOOKED (the subpath is not yet shipped)**

(a) two P0 Baseline-CSS crashes → value.js `0.13.1` patch (transitive, no BC action). (b) the subpath split lets BC `import @mkbabb/value.js/color` over the 145 KB monolith. (c) `0.14.x → 1.x` (the forward-compat peer, ASK#1 — already shipped). (d) `parse-that` → primitives-only (transitive).

**VERIFIED LIVE — the `/color` subpath does NOT exist in the consumed dist:** `node_modules/@mkbabb/value.js@0.13.0` `package.json` `exports` keys = `.` ONLY (no `/color`). glass-ui has **7 live monolith import sites** (`@mkbabb/value.js` root): `src/composables/color/index.ts:29`, `src/composables/motion/curves.ts:26,212`, `src/components/custom/easing/composables/useEasingPicker.ts:23`, `src/components/custom/aurora/composables/color.ts:26`, `src/components/custom/aurora/constants/presets.ts:26`, `src/components/custom/border-progress/composables/useBorderSpectrum.ts:18`.

**Disposition: BOOK, NOT a new wave.** The `/color` subpath footprint-shrink consume (`import @mkbabb/value.js/color` over the 145 KB monolith) is **NOT a real BC action NOW** — the subpath is absent from the consumed `0.13.0` dist; authoring a `BC.W-KF-VALUEJS-COLOR` wave against a non-existent subpath would be a contrivance against the apply-the-bar discipline (the trigger is UNMET). It books as a foldNote onto `BC.W-PERF-PRODUCER` / `BC.W-CUT` (the perf band) with the named promotion trigger: **value.js Tranche O publishes the `/color` subpath in its `0.14.x`+ dist** (then the 6 non-easing import sites re-point monolith → `/color`, a consume-and-delete; `useBorderSpectrum.ts` re-points to `sampleColorRamp` separately at `BC.W-CUT` step 4, the ONE re-pointable-NOW consume since `0.13.0` ships it). The forward-compat peer (ASK#1) is already in place to admit the `1.0.0` cut the subpath split rides.

### INFORM-5 — the measured-paint convergence · **CONFIRMED (the gates COMPOSE)**

kf adopted `inv-M-observable-truth` (BC's measured-paint law); kf's `M.W-DESIGN-PAINT` re-verifies the demo paint on BC's glass (both modes × mobile/desktop). The two repos' paint gates COMPOSE: glass-ui's `proof:ba-gestalt` + `BC.W-PAINT-GATE` + `BC.W-GESTALT-FIRST` verify glass-ui's surfaces; kf's `M.W-DESIGN-PAINT` re-verifies kf's consuming scenes on the verified glass. kf re-pins after BC's glass is paint-verified (the cut). FYI — the convergence is the shared law, no glass-ui action beyond the standing paint gates.

### INFORM-6 — kf re-pins + re-verifies at the cut · **= ASK#4's contract**

The surfaces kf depends on (dock, cards, dialogs, the 8 instrument scenes) are ASK#4's cut-surface-stability contract. kf re-pins + re-verifies at the cut.

---

## The decision set (the answers, summarized)

| # | ask | answer | version | owner |
|---|---|---|---|---|
| 1 | peer range `^0.13.0 || ^1.0.0` value.js + `^4.0.0` kf | **CONFIRMED — already shipped on 4.0.1; cut holds forward-compatible** | 4.0.1 (live) / the cut | `proof:constellation-spine` cl.1+8 / `proof:peer-conformance` @ `BC.W-CUT` |
| 2 | SegmentedTabs `aria-orientation` | **CONFIRMED — emitted-not-suppressed at `SegmentedTabs.vue:401`, byte-fenced** | 4.0.1 (live) / the cut | `BC.W-TABS-IOS` (T4 byte-fence) / `BB.W-CONTROL-TOKENS` |
| 3 | dock crossfade / `onPlayPointerDown` interim | **CONFIRMED — `useDockClickIntegrity` ships, obsoletes it** | 4.0.1 (live) / the cut | `BC.W-DOCK-ENGINE` + `BC.W-DOCK-VERTICAL-FIX` |
| 4 | rebuilt glass + dock stability at the cut | **CONTRACT — consumed surfaces gate-fenced stable** | the cut | Band-1 glass waves + `BC.W-DOCK-ENGINE` + paint gates + `BC.W-CUT` |
| 5 | `GlassControlPoint` yes/no | **NO — `EasingPicker` handles are internal; ≥2-bar unmet; kf builds `DemoControlPoint`** | n/a | decision (no export, no wave) |

**Version stamps:** the live `4.0.1` already satisfies asks #1/#2/#3 (the widened peer, the emitted aria-orientation, the click-integrity composable are all shipped on `4.0.1`); the BC cut (USER-DOMAIN, ≥ `4.0.1`, confirm-first at `BC.W-CUT`) re-confirms them through the pre-tag full battery + adds the ask#4 stability contract.

---

## The foreign-tree fence (binding)

glass-ui edits ZERO of kf's tree. kf's `DemoControlPoint` (ASK#5), kf's `SpringSidebar.vue:43`/`AnimationControls.vue:72` suppression deletes (ASK#2), kf's `TransportDock.vue:181,227,387-411` interim delete (ASK#3), kf's 8-scene re-verify (ASK#4) all land in KF's repo on its `^4.x` re-pin. The `Oscillator` republish (INFORM-1) is kf's tree. The by-name ask is the only channel. Machine-locked by `proof:crossrepo-asks` (the no-silent-drop completeness law + the content-only fence).
