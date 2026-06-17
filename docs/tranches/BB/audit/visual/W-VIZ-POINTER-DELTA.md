# BB.B4 (W-VIZ-POINTER) — DELTA (usePointerVelocityField: the shared viz-pointer-physics field, minted EARLY for the born-WebGPU viz)

**Wave**: BB.B4 / W-VIZ-POINTER (the cross-repo B-ask band, B4-EARLY placement) · **Branch**: tranche/BB · **Date**: 2026-06-17
**HEAD sha (ground)**: `9b181790` (BB integrity sweep — master CI genuinely green siblings-absent)
**Gate**: `proof:pointer-velocity` born-RED @ HEAD (the leaf absent) → GREEN. No-regress: `proof:vueuse-free-root` ✓ (the new root-barrel export imports `vue` only), `npm run typecheck` ✓, 8/8 unit tests ✓.
**π (painted truth)**: rides **W-REFLECT3** (Batch 7) once the born-WebGPU viz (W-FLOWFIELD + W-CONCENTRIC) land + read the field — the field's binding paint is a viz responding to pointer velocity/acceleration; this wave is the SUBSTRATE + the headless math half (the unit test) + the device-free SOURCE gate.

## §0 RE-GROUND — drift at HEAD (recorded, never re-diagnosed)

There is no dedicated spec doc for B4 (the relay placement IS the spec — `docs/tranches/BB/coordination/cross-repo-inbound.md` §5, the B4 row). Every cite re-grepped at HEAD:

| cite (relay / context) | HEAD reality | note |
|---|---|---|
| B4 row: "viz-pointer-physics `usePointerVelocityField` — shared composable, no own rAF, PRM `tick(0)`, accel term" | EXACT — the four load-bearing constraints are the build contract | the placement IS the spec |
| B4 row: "EARLY (pre-W-GPU-SUBSTRATE so the born-WebGPU viz consume it)" | EXACT — W-VIZ-SUITE + the 5 sub-waves are all **SPEC** at HEAD (PROGRESS.md:140-145); none built | the EARLY publish needs the consumer-evidence doc (no live binary consumer yet) |
| precedent: `useSpecularTracking`/`createSpecularWriter` (pointer-read) | EXACT — `src/composables/glass/useSpecularTracking.ts` is the rAF-coalesced + cached-PRM pointer-position-write seam; this leaf reuses the cached-matchMedia + PRM-gated-position-write PATTERN (not the rAF — this leaf is a pure push-API) | the position-read precedent |
| precedent: `useDragMorph` (velocity-sample) | EXACT — `src/composables/motion/useDragMorph.ts` composes kf `Draggable` for velocity; this leaf is the NON-kf, NON-rAF generalization (a renderer-fed derivation, not a gesture engine) | the velocity precedent; DISTINCT (no kf) |
| precedent: `cursorModel.ts` `advanceCursor(tempo)` (frame-fed velocity model) | EXACT — `src/components/custom/aurora/composables/cursorModel.ts` is a module-local frame-fed velocity+burst model (no own rAF; advanced by the renderer's frame). THIS leaf is the PUBLISHED generalization of that pattern. | the closest precedent; aurora keeps its own (no forced fold) |
| `/motion-core` barrel + root barrel re-export shape | EXACT — `composables/motion/core/index.ts` + `src/index.ts` carry the `useLiquidFlex`/`useViewTransition` engine-free precedent the new leaf follows | the publication home |
| W-DRAG-MORPH note "no second pointer-velocity sampler / rAF spring integrator" | the DRAG gesture's fence; THIS leaf is the SHARED viz-pointer field (a different consumer set — the viz renderers, not the gesture) | not a conflict — useDragMorph owns gesture pointer-velocity, this owns viz pointer-velocity, both no-own-rAF |

**Drift ruling**: zero source drift — a clean greenfield leaf at its named locus. The only finding is the WebGPU viz are SPEC (expected — that is the whole point of the EARLY placement), so the ≥2-consumer bar is met via the consumer-evidence doc naming the booked binaries.

## What landed (DISJOINT from the siblings — a NEW src/composables/motion/ leaf)

| file | change |
|---|---|
| `src/composables/motion/usePointerVelocityField.ts` | NEW — the leaf (289 lines). Pointer POSITION (event-driven, PRM-gated) + derived VELOCITY + derived ACCELERATION (the accel term) + a flick BURST, advanced by the renderer's frame `tick(deltaMs)` (NO own rAF), frozen under PRM (`tick(0)`). Vue-only (no @vueuse, no @mkbabb/keyframes). |
| `src/composables/motion/core/index.ts` | `export * from "../usePointerVelocityField"` — published on `/motion-core` (engine-free). |
| `src/index.ts` | targeted root-barrel export (`usePointerVelocityField` + `PointerVec2`/`UsePointerVelocityField`/`UsePointerVelocityFieldOptions` types) per the `useLiquidFlex` precedent. |
| `docs/consumer-evidence/use-pointer-velocity-field.md` | NEW — names the booked binary consumers (W-FLOWFIELD `<DotFlowField>` + W-CONCENTRIC `<Concentric>`) with the no-overfitting re-audit/retire clause (the EARLY-publish bar). |
| `scripts/proof-pointer-velocity.mjs` | NEW — the born-RED→GREEN gate (V1-V5 + a 3-bite self-test). |
| `tests/composables/motion/usePointerVelocityField.test.ts` | NEW — 8 unit tests (rest / velocity-derives / accel-impulse / tick(0)-freeze / PRM-freeze / frame-rate-independent / active / clamp). |

## The design (the four load-bearing constraints, each met + machine-locked)

1. **NO own rAF (the one-loop discipline).** The field is a PUSH-API. The viz renderer ALREADY owns the frame loop (`createCanvasLifecycle`); it calls `field.tick(delta)` from inside its existing frame callback. The leaf calls NO `requestAnimationFrame`/`setInterval`/`setTimeout` — a private loop would break `proof:offscreen-pause` (an offscreen-parked renderer would still run the field's loop). Only the raw pointer POSITION is event-driven (the `createSpecularWriter` precedent). Gate clause **V2**.
2. **PRM = `tick(0)` freeze (deterministic).** Under `prefers-reduced-motion: reduce` the position write is skipped AND `tick` snaps the field to rest (velocity/accel/burst zeroed) — no live velocity. The PRM signal is a SINGLE cached `matchMedia` listener (the AV.W7 substrate pattern). A `tick(0)`/`tick(<=0)` is the same deterministic freeze. Gate clause **V3**.
3. **The accel term is real (the second derivative).** `acceleration` is DERIVED in `tick` as the velocity-delta / dt, eased — the curl/flow viz read it for a pointer "push" impulse distinct from steady drag. NOT a stub. Gate clause **V4**.
4. **Vue-only / root-barrel safe + ≥2-consumer bar.** No @vueuse, no @mkbabb/keyframes → ships on `/motion-core` AND the root barrel. The booked binary consumers (W-FLOWFIELD + W-CONCENTRIC, both authored WebGPU-first to read pointer dynamics at birth) satisfy the ≥2-consumer bar via the consumer-evidence doc (the EARLY-publish path). Gate clauses **V1** (publication) + **V5** (consumer bar).

The derivatives are per-SECOND (`/dt`) with framerate-independent lerps (`1 - (1-k)^(dt*60)`), so a 60Hz and a 120Hz renderer read the same physical velocity (unit-tested).

## Born-RED → GREEN evidence

```
# leaf absent (the pre-build HEAD):
$ mv src/composables/motion/usePointerVelocityField.ts /tmp && node scripts/proof-pointer-velocity.mjs; echo $?
  ✗ V1: src/composables/motion/usePointerVelocityField.ts does not exist (the composable is absent)
  status: FAIL   →  exit 1

# after the wire:
$ node scripts/proof-pointer-velocity.mjs; echo $?
  published: core=true root=true
  no own loop (push-API tick): raf=false interval=false timeout=false hasTick=true vueuse=false keyframes=false
  PRM tick(0) freeze: cachedMatchMedia=true tickFreezes=true positionGated=true
  accel term derived: accel=true velocity=true
  consumer bar: liveConsumers=0 evidence=true booked=true met=true
  self-test bites all flagged: true
  status: PASS   →  exit 0
```

## Fences held

- **No own rAF** — `proof:offscreen-pause`/one-loop discipline preserved (the push-API is fed by the renderer's existing loop).
- **SCC-trap** — vue-only, no heavy peer; the root-barrel export is heavy-peer-free (`proof:vueuse-free-root` GREEN).
- **No needless churn** — the aurora/blob pointer models (`cursorModel.ts`/`useBlobPointer.ts`) are NOT re-pointed (a fold onto the shared field is a booked successor IFF byte-faithful, never forced).
- **GL shader fence + ppmycota** — untouched (no shader edit, no library color token).
- **Compositor-only** — N/A (the field writes no DOM style; it feeds the viz uniform upload — the consumer owns the paint).
