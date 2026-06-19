# BC — asks & consumes (the cross-repo contract ledger)

The by-name record of every cross-repo edge BC depends on or hands off — the
foreign-tree fence (inv-26): glass-ui edits ZERO of a sibling's tree; every ask is a
by-name row here, dispositioned SATISFIED / BOOKED / RECORDED. The keyframes.js
one-clock contract is the headline (`BC.W-MOTION-ONE-CLOCK`).

## keyframes.js — the ONE source + clock contract

keyframes.js is the user-directed ONE animation source AND clock for glass-ui
(WAVE-IMPACTS.md:344; constellation.mjs:77). `BC.W-MOTION-ONE-CLOCK` PROVES the
completeness (the `proof:motion-one-clock` gate); the contract surface it stands over:

| edge | disposition | detail |
|---|---|---|
| **`springTimingFunction`** (the `{fn, css: linear()}` LIGHT spring curve) | ✅ **SATISFIED** | Published + stable on kf `4.3.0`. `src/composables/motion/curves.ts` consumes it via the `SPRING_PRESETS → springTimingFunction → MOTION_CURVES` path; `scripts/regen-spring-tokens.mjs` generates the `--spring-*` `linear()` strings + the `--spring-*-duration` clocks from the SAME `SPRING_PRESETS` table (`springLinearStops`). The curve and its clock fall out of ONE table — they cannot desync. NO kf change needed (KF-BC.md INFORM-2). |
| **`SpringProgress` / `ElementMorph` / `Draggable` / `Sequence` / `decayRest` / `springLinearStops`** (the one-clock substrate) | ✅ **SATISFIED** | Published on kf `4.3.0` (kf-vjs-facilities.md §1, machine-verified callable). Every glass-ui spring binds them through the `/motion` barrel (`useSpring`, `dockMorphContext`, `useLayerTransition`, `useDockOrientationMorph`, `useDrawerSnap`, `useSpringPress`, `useLiquidPress`, `useLiquidReveal`, `useDockCtaReceive`, `useDragMorph`, `useAnimatedNumber`). The UI-side spine is consumable NOW. |
| **`Oscillator` / `waveformValue`** (the LIGHT loop-clock leaf) | 🟡 **BOOKED** (republish-gated) | The `Oscillator` is LOCAL-ONLY in keyframes.js, **ABSENT from the published `4.3.0` dist** (`grep Oscillator node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` → 0; KF-BC.md INFORM-1). The booked loop-clock leaf of the ONE source+clock. INTERIM = the existing de-synced sine / `uTime` (KEEP — do NOT block). The actual consume lands in `BC.W-VIZ-CHOREOGRAPHY` (the viz loop — its C6 reds importing the not-in-dist export, its §F books the republish) + the `EasingPicker` `loop` playback seam (awaits the same republish; the picker's default is the one-shot rAF travel TODAY). A by-name cross-repo republish ask, **NO peer-spine widen** (the spine is `^4.0.0`). |
| **the dock-cure contract** (the compositor-transform morph + the PRM synchronous seat + the collapsed-circle) | ✅ **PRESERVED through `BC.W-DOCK-ENGINE`** | keyframes.js is the named 2nd consumer of `W-DOCK-MORPH-FAMILY` (WAVE-IMPACTS.md:344). The Band-2 dock-engine rebuild (`BC.W-DOCK-ENGINE`) MUST preserve kf's dock-cure: the `--dock-morph-t` scalar on ONE kf `SpringProgress` clock, the PRM synchronous seat, the collapsed-circle. `DOCK_SPRING` `(0.32, 0.7)` is value.js-fenced (WAVE-IMPACTS.md:168) — `BC.W-SPRING-EASE` owns any retune, coordinated with kf. `BC.W-MOTION-ONE-CLOCK` M4 records the dock morph rides the single kf spine; the orchestrator-single proof is Band 2's. |

**The foreign-tree fence (inv-26):** glass-ui edits ZERO of kf's tree. The `Oscillator`
republish (INFORM-1) is kf's tree; the by-name ask is the only channel (machine-locked
by `proof:crossrepo-asks`). The interim is non-blocking — the published spine is the
one-clock substrate this tranche rides; the `Oscillator` slots in on a kf republish.

## The CLOCK-FENCE reconcile (the M3a born-RED set — distributed downstream)

`proof:motion-one-clock` M3a is born-RED on the BB-batch source: a set of consumer
`--spring-*` legs still pair a generic `--duration-*` wall clock (the R10-2 dead-tail).
`BC.W-MOTION-ONE-CLOCK` (FIRST of Band 7) PLANTS the gate + NAMES every drift + its
owning wave in the gate's `CLOCK_FENCE_PENDING` bridge (the verify-not-edit precedent —
GREEN now via the named bridge, naturally clean when each owner lands the one-token
swap onto `--spring-<name>-duration`). The owners:

| file · leg | owning wave |
|---|---|
| `menu.css` `.glass-menu-row` `translate` | `BC.W-AFFORDANCE-MAP` / `BC.W-CONTROL-SMOOTH` |
| `ConfiguratorLayer.vue` chevron `transform` | `BC.W-AFFORDANCE-MAP` / `BC.W-CONFIG-RIGHT` |
| `cards.css` card-lift `translate` | `BC.W-AFFORDANCE-MAP` / `BC.W-SELECTION-CARD` |
| `dock/layer-group.css` rail `width`/`height`/`transform` | `BC.W-DOCK-ENGINE` |
| `base.css` `.tap-squish` `scale` | `BC.W-AFFORDANCE-MAP` / `BC.W-CONTROL-SMOOTH` |
| `Slider.vue` thumb/track `transform` | `BC.W-AFFORDANCE-MAP` / `BC.W-CONTROL-SMOOTH` |

Each owner removes its bridge row when it re-times the clock; a NEW spring-clock drift
NOT on the bridge reds immediately (the masked-accretion class is closed structurally).
