# BI.W-DOCK-CROSSFADE — the thin `<DockCrossfade :active>` face-swap + the peak-reserve compound

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §2.6 (layers/faces), PASS-4B ruling 3 (factor as a thin
`<DockCrossfade :active>` core; `useSelectionGroup` COMPOSES it where a rail exists; the controlled-no-rail
5-pane speedtest case consumes DockCrossfade directly), G6/G11 CLOSED (crossfade beats VT). Lands ON the
W-DOCK-SPINE plate scalar + W-DOCK-CONTROLS selection engine.

## §Mandate

Discharges: the `DockLayerGroup` registration machinery (524L) + `DockLayer` + `useLayerTransition` (408L) →
ONE crossfade slot (PASS-1 §2.6); the G11 layer-slot sufficiency (peak-reserve across differing-height faces,
keyboard face-switch, switcher persistence while collapsed); the G12 content-wrapper clip coexisting with a
mid-flight crossfade; the compound integration the synthetic prototypes never composed (PASS-4B obligation).

## §Design

`DockLayerGroup`/`DockLayer`/`useLayerTransition` fold to **ONE crossfade slot** (PASS-1 §2.6): the content
layer hosts one active face; a switch is a two-child opacity overlap on `--dock-t` (the W-DOCK-SPINE plate
scalar), the reserved box sized to the PEAK face (the self-reserve survives as a **measure-ONCE**, not a
per-swap FLIP). The DOCK-B harvest applies: **a focus-holding face that dissolves transfers focus to its
successor, else the body** (un-inert-before-focus is load-bearing).

**Crossfade beats VT (G6 CLOSED — PASS-1 §2.6).** `startViewTransition` is UA-eased + **non-interruptible**
(a hard cut on rapid re-toggle — a direct violation of the liquid-weight edict), and VT snapshot fidelity on a
live `backdrop-filter` plate over aurora is unproven (blur ghost / edge pop). The two-child crossfade needs no
VT, stays spring-driven + interruptible (velocity-continuous). G6 root cause was proven `menu.css` keyboard-
lift (NOT scrollbar-gutter on macOS) with a 12→0 wobble A/B. VT is a non-goal here.

**The factoring (PASS-4B ruling 3 — the split, decided).** `<DockCrossfade :active>` is a THIN core (the
controlled face-swap: a no-selection two-child opacity overlap sized to the peak). Where a rail exists,
`useSelectionGroup` COMPOSES it (the switcher run drives `:active`). The **controlled-no-rail 5-pane case
(speedtest) consumes `<DockCrossfade :active>` DIRECTLY** — a no-selection face-swap does NOT route through a
selection engine (in that mode the roving machine + indicator + selection model are all INERT; don't abstract
them over a case that never selects). The proven 6/6 controlled-no-rail mechanism (G11 CLOSED) carries over
unchanged; only the factoring splits.

**The G12 content-wrapper clip lives here (the compound).** With no L1 content clip, if a face's row visibly
spills past the narrowing plate mid-morph, the clip lands on a CONTENT WRAPPER only (`clip-path: inset()` on a
non-interactive text/glyph wrapper) — NEVER on the interactive run, so hover plates still overflow (PASS-1
§2.1). This must COEXIST with a mid-flight crossfade (a face-swap during a simultaneous collapse-morph) —
the compound the synthetic prototypes never composed.

## §Work

- Mint `dock/DockCrossfade.vue` (thin: `:active` face-swap, two-child opacity overlap on `--dock-t`,
  peak-reserve measure-once, focus-transfer-on-dissolve). `/dock` + `/api` publication (the controlled-no-rail
  speedtest consumer imports it directly).
- `composables/useLayerTransition.ts` (408L, `new SpringProgress` at :287) — DEFINITION-ABSENT (its 2nd
  SpringProgress dies in W-DOCK-SPRING-UNIFY; its FLIP measure folds to the crossfade slot; the AY.W-GOD1
  book resolves). The registration machinery in `DockLayerGroup.vue` (`register`/`unregister` at :83/:90,
  524L) folds to the crossfade slot (`DockLayer.vue` 3.0K registration retires; the switcher run is
  W-DOCK-CONTROLS' `useSelectionGroup`).
- `src/styles/dock/layers.css` (26K) + `layer-group.css` (17K) → the crossfade-slot rule (peak-reserve
  `min-block-size` measure-once, the two-child opacity overlap, the G12 content-wrapper clip). The clip-era
  layer partials retire.
- The G12 content-wrapper clip rule (`clip-path: inset()` on a `.dock-face-content` non-interactive wrapper)
  coexisting with the mid-flight crossfade.
- `demo/stories/dock/layers.vue` + `sections.vue` — rebuild on the crossfade slot (the G11 sufficiency
  demo: differing-height faces, keyboard face-switch, collapsed switcher persistence).
- The COMPOUND integration build ({collapse-morph clip-path plate} × {face-swap crossfade} × {peak-reserve
  box} × real density/coarse/adaptive-legibility cascade — incl. idle-EMPTY→running peak-reserve holding under
  a SIMULTANEOUS collapse).

## §Acceptance

Gate: **`proof:dock-crossfade`** (NEW, born-RED at HEAD — `useLayerTransition.ts` 408L + its 2nd
SpringProgress + the `DockLayerGroup` register/unregister machinery are live).
- X1 **one-crossfade-slot** (BORN-RED): the face-swap is a two-child opacity overlap on `--dock-t`; ZERO
  `useLayerTransition` / per-swap-FLIP-measure / registration machinery survives → GREEN at the fold.
- X2 **no-VT-face-swap**: ZERO `startViewTransition` in the dock face-swap path (the interruptible spring
  crossfade is the sole mechanism).
- X3 **thin-core-factoring**: `<DockCrossfade :active>` exists as a standalone `/dock` export the
  controlled-no-rail case imports WITHOUT a `useSelectionGroup` (the ruling-3 split asserted).
- X4 **peak-reserve-measure-once + focus-transfer**: the reserved box is a measure-once `min-block-size`
  (not a per-swap FLIP); a dissolving focus-holder transfers focus to its successor (un-inert-before-focus).
- X5 **G12-compound**: the content-wrapper clip is on a non-interactive wrapper only (never L1), and coexists
  with a mid-flight crossfade.
- Self-test bites: a synthetic re-added `startViewTransition` REDs X2; a synthetic per-swap FLIP measure REDs
  X1; a synthetic content clip on the interactive run REDs X5.

## §π/DELTA

- **The mid-swap frame-series** (Chrome + Safari, both modes): a face-swap DURING a simultaneous collapse-
  morph — no blur ghost / edge pop, content complete, the crossfade interruptible under rapid re-toggle
  (velocity-continuous, no hard cut — the liquid-weight edict held vs the VT arm).
- **Peak-reserve holds** the box across genuinely-differing face heights, incl. idle-EMPTY→running under a
  simultaneous collapse (the compound).
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-CROSSFADE-DELTA.md`. Rides W-DOCK-DEVICE (the visible-Metal
  crossfade mid-swap interrupt + the real-Safari temporal VT frame — which does NOT change the crossfade
  winner) + the `proof:ba-gestalt` dock verdict.

## §Obligations

- The **speedtest 5-pane controlled-no-rail crossfade-slot fold** (isolated to speedtest alone — the
  registration machinery replaced by `<DockCrossfade :active>`) is a cross-repo migration → W-DOCK-FOLD's
  G10 census (this wave mints the primitive the speedtest fold consumes).
- Visible-Safari.app Metal crossfade mid-swap interrupt at 60fps → W-DOCK-DEVICE.

## §Dispositions

- **src:dock-flip-fold** (`useLayerTransition.ts:37,40` `BOOKED: AY.W-GOD1` — useLayerTransition→
  dockMorphContext FLIP-engine fold; D28 routed BG.W-DOCK-MORPH-UNIFY, re-opened) → TERMINALIZED:
  `useLayerTransition` DEFINITION-ABSENT post-greenfield (the fold-and-DELETE lands natively). The AY.W-GOD1
  book resolves. Decided-terminal.
- **src:dock-persist-rail** (`DockLayerGroup.vue:352,360` `BOOKED: AY.W-GOD1` — persistent switcher rail
  surviving collapse) → TERMINALIZED: the crossfade slot + the `useSelectionGroup` switcher run provides the
  persistent rail natively (survives collapse); the AY.W-GOD1 book resolves. Decided-terminal.
