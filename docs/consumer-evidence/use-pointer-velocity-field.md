# usePointerVelocityField

## Artefact path

`src/composables/motion/usePointerVelocityField.ts` — published on `@mkbabb/glass-ui/motion-core` AND the root barrel (it imports `vue` only — engine-FREE + vueuse-FREE, so it is root-barrel safe per the `useLiquidFlex`/`useViewTransition` precedent).

## Disposition: published-EARLY with BOOKED binary consumers (the B4-EARLY placement)

The cross-repo relay (`docs/tranches/BB/coordination/cross-repo-inbound.md` §5, the B4 row) sequences this composable EARLY — BEFORE the WebGPU viz chain — explicitly so the born-WebGPU viz consume it AT BIRTH:

> B4 viz-pointer-physics `usePointerVelocityField` — NEW in-repo, EARLY (pre-W-GPU-SUBSTRATE so the born-WebGPU viz consume it) — shared composable, no own rAF, PRM `tick(0)`, accel term.

The visual-load-bearing ≥2-consumer bar (L invariant 8 / J-inv-10) is satisfied IN FACT by the surviving LIVE consumers below: the field is wired into every surviving procedural viz at HEAD. The composable was published early by design (the EARLY placement is the whole point — a substrate minted at the moment its consumers need it, not a speculative shelf primitive); the early publish is no longer a booking — the real call sites exist.

## Live binary consumers (the surviving procedural-viz set)

The originally-booked binaries were `<DotFlowField>` (W-FLOWFIELD) + `<Concentric>` (W-CONCENTRIC) — both **DELETED at BI.W-VIZ-DELETIONS** (the user-ordered clean-break prune of the 30+-attempt viz family; `dot-matrix` was likewise deleted). The ≥2-consumer bar RE-BASES onto the surviving live consumers — each a real `usePointerVelocityField()` call site feeding its renderer's per-frame uniform upload (verified by the `proof:pointer-velocity` V5 grep, NOT prose):

- **`<Aurora>`** (`src/components/custom/aurora/`) — the field feeds the pointer dynamics into the aurora runtime (`composables/runtime.ts` / `frameLoop.ts` / `wgpuSetup.ts`).
- **`<Blob>`** (`src/components/custom/blob/`) — `composables/useMetaballRenderer.ts` feeds the field for the pointer-wake + drag response.
- **`<Constellation>`** (`src/components/custom/constellation/`) — `useConstellation.ts` / `constellationInteraction.ts` read the shared `burst` for the flick-warp.
- **`<FourierField>`** (`src/components/custom/fourier-field/`) — `composables/useFourierField.ts` reads the critically-damped `smoothedPosition` for the pointer scrub.
- **`<LiquidGrid>`** (`src/components/custom/liquid-grid/`) — `composables/useLiquidGrid.ts` feeds the field for the local cursor swirl.

The surviving-consumer wiring is W-FIELD-CORE's domain (the one interaction-physics field + the surviving consumer set); this doc records the deletion re-base only. (The dock `useDockFission.ts` is a further live consumer at HEAD, retired by BI.W-DOCK-RETIRES — not part of this re-base.)

## The load-bearing constraints (recorded)

- **NO own rAF.** The field is a PUSH-API: the renderer (which already owns the frame loop via `createCanvasLifecycle`) calls `tick(delta)` from inside its existing frame callback. A second rAF here would break the one-loop / `proof:offscreen-pause` discipline (an offscreen-parked renderer would still run a private loop). The raw pointer POSITION is the only event-driven write (a `pointermove` listener, the `createSpecularWriter` precedent); velocity + acceleration are DERIVED in `tick`.
- **PRM = `tick(0)` freeze.** Under `prefers-reduced-motion: reduce` the position write is skipped AND `tick` snaps the field to rest (velocity/accel/burst zeroed) — a deterministic still field, no live velocity. The PRM signal is a SINGLE cached `matchMedia` listener (the AV.W7 `useWebGLCanvas` substrate pattern).
- **The accel term.** The acceleration is the second derivative (the velocity-delta, eased) — the relay's named requirement, distinct from the velocity itself, for a pointer "push" impulse the curl/flow viz read.
- **Frame-rate independent.** The lerps use the `1 - (1 - k)^(dt*60)` form and the derivatives are per-SECOND (`/dt`), so a 60Hz and a 120Hz renderer read the same physical velocity.

## Re-audit proof

This document satisfies the no-overfitting bar for `usePointerVelocityField` while it is published EARLY ahead of its consumers (the B4-EARLY placement). Once W-FLOWFIELD + W-CONCENTRIC land, the booked proof greps above MUST find the binary consumers; if neither viz materializes (the WebGPU band is abandoned), the composable retires (or a real consumer is wired). A consumer-count of <2 at the W-VIZ-SUITE close — with neither booked proof grep passing — REDs `proof:pointer-velocity` (its consumer-evidence clause).

## The gate-blindness CURE (BC.W-VIZ-INTERACTION — the prose-green path REMOVED)

This doc is **no longer a SUBSTITUTE for a real consumer.** The original `proof:pointer-velocity` V5 greened off this doc's PROSE (`evidenceExists && evidenceNamesBooked && evidenceHasReaudit`) — it NEVER ran the `rg src/components/custom/{viz}/` grep this doc itself promised, so the field shipped on a shelf with ZERO real consumers while greening (the SYNTHESIS class 2 disease — source-mechanism-gate-not-paint-gate). At **BC.W-VIZ-INTERACTION** the prose-green path is **REMOVED**: `proof:pointer-velocity` V5 now runs the REAL grep, and the ≥2-consumer bar (J-inv-10 / L-inv-8) must be met **IN FACT** — ≥2 live `usePointerVelocityField()` call sites under `src/components/custom/`, NOT a doc mention. This doc still carries the wire-or-retire re-audit clause (above), but a doc with zero real call site **REDs**.

The cross-cutting **`proof:viz-interaction`** gate is the substrate-floor enforcement net: each surviving canvas viz (aurora · blob · constellation · fourier-field — dot-flow-field · concentric · dot-matrix DELETED at BI.W-VIZ-DELETIONS) must IMPORT the field, FEED `.tick(delta)` from its `createCanvasLifecycle` frame callback, and read BOTH `velocity` AND `acceleration`/`burst` (V1/V2 — the user's velocity-AND-acceleration ask; the velocity-only half REDs). The binding paint truth is `tests-visual/viz-interaction.spec.ts` (V5/V6 — a synthetic pointer sweep + flick makes the composited frame DIFFER between rest / sweep / flick; under PRM the cursor produces NO change). Both gates are **born-RED at the BC.W-VIZ-INTERACTION substrate-floor close** (every per-viz grep EMPTY — the per-viz waves wire the field AFTER this floor, EXECUTION-DAG §4 Band-4) and go GREEN when ≥2 per-viz waves wire it in fact.
