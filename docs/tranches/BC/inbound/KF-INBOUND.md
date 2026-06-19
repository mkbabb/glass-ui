# BC — the keyframes.js-M cross-repo dispatch intake

> keyframes.js tranche **M** delivered an ASK/INFORM dispatch (the successor to `KF-TO-GLASSUI-BB-ASKS.md`).
> kf NEVER writes glass-ui (the foreign-tree fence) — this is the interface. BC maps each to a wave +
> a published version + a consume-seam. The natural artifact on kf's side is `docs/tranches/M/KF-TO-GLASSUI-BC.md`;
> this is BC's intake mirror.

## ASKS (kf → BC) — each owed a BC wave + version + answer

| # | ask (grounded anchor) | urgency | BC disposition |
|---|---|---|---|
| **1** | **The peer range — the deploy unblock.** Installed glass-ui 4.0.0 peers value.js `^0.10.0\|\|^0.11.0`, rejecting installed 0.13.0 (the live F-2 cycle blocking auto-deploy). The BC cut must peer value.js `^0.13.0 \|\| ^1.0.0` (forward-compatible with value.js O: 0.14.x→1.x) AND keep keyframes.js `^4.0.0`. | **BLOCKER** | **VERIFY+CONFIRM** — CLAUDE.md §Dependencies already states value.js `^0.13.0 \|\| ^1.0.0` + keyframes `^4` (the W-SPINE-LATEST collapse). 4.0.1 (published 2026-06-18) widens it. **Disposition: confirm 4.0.1 ships the widened peer; the BC cut HOLDS it forward-compatible. Owner: `BC.W-SPINE-LATEST` / the peer-conformance gate.** Record the green-handshake. |
| **2** | **S1 — SegmentedTabs aria-orientation.** kf deletes the `:aria-orientation="undefined"` suppression at `demo/spring/SpringSidebar.vue:43` (+ audit cited `AnimationControls.vue:72` — kf finds only `:43` live now). Which BC wave + version ships the fix? | S | **MAP** to the tabs aria work (`BC.W-CONTROL-TOKENS`/`W-TABS` — the role-per-variant + aria contract). Confirm `aria-orientation` is correctly emitted (not suppressed) on the published cut; record the version. kf re-verifies `AnimationControls.vue:72`. |
| **3** | **S2 — the dock crossfade (RF-17).** kf deletes the `onPlayPointerDown`/`pointerHandled` interim in `TransportDock.vue` (lines 181, 227, 387-411). Which BC dock-morph wave + version obsoletes it? | S | **MAP** to `BC.W-DOCK-ENGINE` / the `W-DOCK-MORPH-FAMILY` repair + `useDockClickIntegrity` (the click-integrity pass-through that makes the pointer interim unnecessary). Record the version; kf deletes on consume. |
| **4** | **The rebuilt glass + dock at the cut.** The cut version + a stable `ChromeDock`/`TransportDock` + glass API so kf re-pins + re-verifies its 8 instrument scenes on the new glass. | S | **CONTRACT** — the BC cut-surface stability note (do not silently break dock/cards/dialogs/8 scenes between now and the cut). Owner: a coordination clause + the glass-band waves. |
| **5** | **GlassControlPoint (the 7-tranche DM-2 chronic) — yes/no.** kf plans a `DemoControlPoint` over its LIGHT `Draggable` (M.W14). Is BC shipping a curve-editor `GlassControlPoint`? Just need the answer so kf doesn't duplicate. | — | **ANSWER: NO** (decision). `BC.W-EASING-PRIMITIVE` ships `<EasingPicker>` with draggable handles INTERNAL to the picker; it does NOT export a standalone `GlassControlPoint` primitive (the ≥2-consumer bar is unmet — kf is the only named consumer). **kf closes the chronic by building its own `DemoControlPoint`.** Record the no, the boundary (kf's `DemoControlPoint` is THEIR repo). |

## INFORM (kf → BC) — thread into the named waves

1. **KF-OSCILLATOR is READY (published LIGHT).** `Oscillator`/`waveformValue` (+ `OscillatorConfig`/`OscillatorWaveform`) ship value.js-free in kf's LIGHT surface (`src/animation/index.ts:74-75`). **→ thread the loop consume-seam into `BC.W-EASING-PRIMITIVE` (the picker `loop` playback), `BC.W-VIZ-CHOREOGRAPHY`, `BC.W-MOTION-ONE-CLOCK`** — the one motion clock is consumable NOW (no longer a blocking book).
2. **`springTimingFunction` stays stable** — the `{fn, css:linear()}` LIGHT export BC consumes for `--spring-deck` is unchanged. (FYI, no action.)
3. **The boundary law** (so BC doesn't duplicate): curve-MATH = value.js · playback/spring/oscillator = kf · editor/glass = glass-ui. Already the `W-EASING-PRIMITIVE` fence — confirm.
4. **value.js Tranche O is coming + BC is a value.js consumer.** (a) two P0 Baseline-CSS crashes fixed → 0.13.1 patch; (b) the subpath split lets BC `import @mkbabb/value.js/color` instead of the 145 KB monolith (footprint shrink); (c) 0.14.x→1.x (hence the forward-compatible peer, ask #1); (d) `parse-that` → primitives-only (transitive, no BC action). **→ book the `/color` subpath import as a BC perf/spine consume (`BC.W-SPINE-LATEST`/a perf wave); the forward-compat peer is ask #1.**
5. **The measured-paint convergence.** kf adopted `inv-M-observable-truth` (BC's measured-paint law); kf's `M.W-DESIGN-PAINT` re-verifies the demo paint on BC's glass (both modes × mobile/desktop). **→ the two repos' paint gates COMPOSE; kf re-pins after BC's glass is paint-verified.** (FYI.)
6. **kf re-pins + re-verifies at the cut** — the surfaces kf depends on are dock, cards, dialogs, the 8 instrument scenes (= ask #4's contract).

## Net BC actions
- **Confirm** (no new wave): #1 peer (W-SPINE-LATEST), #2 tabs aria, #3 dock crossfade — version-stamped at the cut.
- **Thread** the KF-OSCILLATOR consume-seam (INFORM-1) into EASING-PRIMITIVE / VIZ-CHOREOGRAPHY / MOTION-ONE-CLOCK.
- **Decision recorded:** GlassControlPoint = NO (ask #5).
- **Coordination doc** `coordination/KF-BC.md` (the green-handshake + the cut-surface-stability contract).
- **Book** the value.js `/color` subpath footprint-shrink consume.
