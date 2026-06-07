# AW.W8 — AURORA-INTERACTIVE (cursor-as-light + velocity-reactive flow + the stateful pointer wake)

## 2. State

**Name**: W8 — AURORA-INTERACTIVE (pointer flow-coupling — beyond the stateless cursor swirl)
**Opens after**: AW.W4 (impasto — the `uLightDir` axis) + AW.W7 (WebGPU — the stateful-wake feedback pass). The cheap cursor-as-light + velocity axes ship on WebGL2; the stateful ping-pong wake is the WebGPU/feedback half.
**Agents**: 2 serial — AW.W8.1 (the WebGL2 axes — cursor-as-light + velocity-reactive flow + scroll coupling, all PRM-gated), AW.W8.2 (the WebGPU stateful wake — the ping-pong velocity texture + the click-ripple impulse). Serial: .1 lands the cheap axes on WebGL2, .2 adds the stateful feedback pass on the AW.W7 WebGPU branch.
**Hard gate**: one born-RED gate green — `proof:aurora-interaction-prm` (every new interactive/parallax axis is SUPPRESSED under `prefers-reduced-motion: reduce` AND the master tempo scalar zeroes the stateful field; the `DockBackgroundToggle` pause stops every axis). `typecheck` + `build` + the existing gate matrix (`proof:offscreen-pause` extended to the wake) stay green.
**Status**: planned

**Type:** IMPL (VISUAL/INTERACTION — the user-mandated "fully dynamic + interactive if requested"). Not publish-blocking; interactivity is opt-in (a config flag), the default wispy-sky background is non-interactive.
**Scope source:** `docs/tranches/AW/aurora/PATH-FORWARD.md` §5 (interactivity — cursor-as-light, velocity-reactive flow, the stateful wake, scroll coupling, the binding accessibility), `docs/tranches/AW/waves/aurora-wave-seeds.md` W9 (interactivity), and the SOTA digest (`docs/tranches/AW/audit/research/aurora-digest.md` Lanes 1/2/9 — the stateful pointer-coupling / dye-field self-advection, the Bridson procedural vortex, the WCAG 2.3.3 / 2.2.2 gates).

**Precepts in force.** No legacy / no back-compat — the new axes EXTEND the existing cursor seam (`cursorModel.ts`, `useCursorInteraction.ts`), they do not fork a parallel interaction path; the stateless cursor swirl (`aurora.frag.ts:229-244`, `flow.glsl.ts:35-49`) is SUPERSEDED by the velocity-reactive form (a fast flick injects a transient swirl-burst, distinct from the steady attraction), not kept alongside it. Gestalt: the pointer writes into a velocity/dye field that advects and decays — a stateful wake, not an instantaneous swirl — reusing the AW.W7 ping-pong feedback substrate. DRY: cursor-as-light REUSES the AW.W4 impasto `uLightDir` seam (no new lighting path — the pointer drives the movable light the impasto wave already lands); scroll coupling REUSES the existing `useScrollProgress` motion composable (a glass-ui public composable — the ≥2-consumer rule already satisfied); the velocity extension extends `cursorModel.ts` (position-only today). KISS: ONE master tempo scalar dials the whole interactive stack to stillness (PRM + a `breathIntensity` knob converge on it). Accessibility is BINDING — every interactive/parallax axis honors `prefers-reduced-motion` (WCAG 2.3.3 Animation from Interactions) via the substrate's live PRM freeze, and the `DockBackgroundToggle` (WCAG 2.2.2 Pause/Stop/Hide) pause stops every axis. The default wispy-sky background is non-interactive (interactivity is opt-in).

## 2a. Goal criterion

This wave succeeds if the aurora can respond to the pointer in a stateful, physical way — the cursor drives the impasto catch-light (a slow auto-orbit when idle), a fast flick injects a transient swirl-burst that eases out, and on the WebGPU branch the pointer leaves a self-advecting decaying wake (lingering eddies, not an instantaneous swirl) with a click→radial-ripple impulse — while every interactive axis is fully suppressible under `prefers-reduced-motion` and the `DockBackgroundToggle` pause. The reader's test: with interactivity on, the impasto catch-light tracks the pointer (cursor-as-light reusing the AW.W4 `uLightDir`); a fast pointer flick produces a decaying swirl-burst distinct from the steady attraction; on WebGPU the wake self-advects and dissipates (a ping-pong velocity texture); under `prefers-reduced-motion: reduce` EVERY new axis is suppressed and the master tempo scalar zeroes the stateful field; the `DockBackgroundToggle` pause stops every axis. The cheap axes ship on WebGL2; the stateful wake is the WebGPU half. Interactivity is opt-in; the default background is unchanged.

## 3. Scope

1. **Cursor-as-light (AW.W8.1 — WebGL2, ships with the impasto seam).** Reuse the cursor seam to drive AW.W4's `uLightDir` so the impasto catch-lights track the pointer and the relief reads tactile; a slow auto-orbit when idle. No new lighting path — the pointer drives the movable light the impasto wave already lands.
2. **Velocity-reactive flow (AW.W8.1 — WebGL2).** Extend `cursorModel.ts` (position-only today) with pointer/scroll *velocity*; a fast flick injects a transient swirl-burst easing out over ~1s, distinct from the steady attraction. The velocity-reactive form supersedes the stateless cursor swirl.
3. **Scroll coupling (AW.W8.1 — WebGL2).** Bind palette/breath progress to scroll via the existing `useScrollProgress` motion composable (a glass-ui public composable — no new substrate).
4. **The stateful pointer wake (AW.W8.2 — WebGPU branch).** On the AW.W7 WebGPU branch, one ping-pong velocity texture: the pointer writes a delta-tracked Gaussian splat (Pavel Dobryakov's stable-fluids pattern) that self-advects and dissipates, biasing the flow — the cursor leaves lingering eddies, not an instantaneous swirl. Click → a radial-ripple impulse.
5. **The master tempo scalar + the PRM/pause convergence (both units).** ONE master tempo scalar dials the whole interactive stack to stillness; PRM (and a `breathIntensity` knob) converge on it. Every new axis hooks the substrate's live PRM freeze (WCAG 2.3.3) + the `DockBackgroundToggle` pause (WCAG 2.2.2) — the same gates the offscreen-park machinery already owns.
6. **The interactivity config flag.** Interactivity is opt-in (a config flag, default off — the wispy-sky default stays non-interactive). The flag enumerates the axes (light · flow · scroll · wake).
7. **The born-RED gate** — `proof:aurora-interaction-prm` (§6).
8. **DESIGN.md §interactivity update** — document the cursor-as-light/velocity/wake/scroll axes, the master tempo scalar, the binding WCAG 2.3.3 / 2.2.2 gates, and the WebGL2-cheap / WebGPU-stateful split.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **An interactive axis escapes the PRM/pause gate.** If ANY new axis (cursor-as-light, velocity-burst, scroll coupling, the stateful wake) still animates under `prefers-reduced-motion: reduce` OR continues after the `DockBackgroundToggle` pause, that is a WCAG 2.3.3 / 2.2.2 VIOLATION (the binding accessibility floor) — the redress is wiring the axis onto the master tempo scalar that PRM/pause zero, an architectural decision about the suppression seam, not a local per-axis guard. Halt and triumvirate; no axis ships that escapes the gate.
- **The stateful wake's feedback pass does not respect the offscreen-park.** The ping-pong velocity texture is a feedback pass on the AW.W7 WebGPU branch; if a parked rAF (offscreen / PRM / paused) STILL advances the wake's self-advection (the feedback pass is on a dispatch path the park gate does not reach), the wake accumulates while hidden — a perf + a11y violation. The redress is the same compute-dispatch park-gate wiring AW.W7.3 lands; if the wake escapes it, that is a substrate-seam decision. Halt and triumvirate.
- **The velocity extension destabilizes the cursor model.** If extending `cursorModel.ts` with velocity makes the existing position-only consumers (the stateless swirl AW.W8.1 supersedes) jitter or NaN (a delta-tracking instability at low frame rates), the redress is the velocity-smoothing/clamping model — a stability decision about the cursor model, not a local delta tweak. Halt and triumvirate.
- **Any diagnostic loop reaches its third iteration** on the PRM-suppression assertion (an axis keeps leaking motion under reduce across redress attempts) — halt; the leak is a missing tempo-scalar hookup, not a gate-tolerance tweak.

File-bound expansion BEYOND the §4 table (a new substrate feedback path outside AW.W7's `createGPUCanvas`, a `useWebGLCanvas` PRM-seam edit) invalidates the wave scope and triggers the triumvirate — the PRM/park seam is AW.W7-owned; this wave HOOKS it, it does not re-author it.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/aurora/composables/cursorModel.ts` | modify (AW.W8.1 — the velocity extension; position-only today) |
| `src/components/custom/aurora/composables/useCursorInteraction.ts` | modify (AW.W8.1 — the cursor-as-light + velocity-burst + the master tempo scalar wiring) |
| `src/components/custom/aurora/constants/shaders/flow.glsl.ts` | modify (AW.W8.1 — the velocity-reactive flow bias replacing the stateless swirl `:35-49`) |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify (AW.W8.1 — the cursor-as-light `uLightDir` drive + the velocity-burst uniform; the stateless swirl `:229-244` superseded) |
| `src/components/custom/aurora/composables/useAurora.ts` | modify (AW.W8.1 — the scroll coupling via `useScrollProgress`; the interactivity config flag) |
| `src/components/custom/aurora/constants/shaders/wake.wgsl.ts` | create (AW.W8.2 — the ping-pong velocity-texture feedback pass) |
| `src/components/custom/aurora/composables/runtime.ts` | modify (AW.W8.2 — the wake feedback pass on the AW.W7 WebGPU branch, on the park gate) |
| `src/components/custom/aurora/constants/presets.ts` | modify (the interactivity config flag + the axis enumeration) |
| `src/components/custom/aurora/DESIGN.md` | modify (§interactivity — the axes, the master tempo scalar, the WCAG gates) |
| `src/components/custom/aurora/__tests__/interaction-prm.test.ts` | create (the PRM-suppression + tempo-scalar-zeroes + pause-stops asserts) |
| `scripts/proof-aurora-interaction-prm.mjs` | create |
| `scripts/gates.mjs` | modify (register the gate) |
| `package.json` | modify (scripts only — the gate entry) |
| `docs/tranches/AW/PROGRESS.md` | modify (record the green run + the PRM/pause browser verify) |

Do NOT touch: `src/composables/glass/useWebGLCanvas.ts` + `createGPUCanvas.ts` (the substrate PRM/offscreen-park seam — AW.W7-owned; this wave HOOKS the master tempo scalar onto it, it does not re-author the park machinery) · `src/components/custom/dock/DockBackgroundToggle.vue` (the WCAG 2.2.2 pause control — the aurora WIRES `@update:paused` to the renderer's pause/resume the existing seam exposes, it does not edit the toggle) · `src/composables/motion/useScrollProgress.ts` (the public scroll composable — CONSUMED, not edited) · `composition.glsl.ts` / `brush.glsl.ts` / `mediums.glsl.ts` (the painterly shaders — AW.W4-owned; this wave drives their `uLightDir`/flow inputs, it does not re-edit them) · `tonemap.glsl.ts` (the locked pipeline) · the wispy-sky `DEFAULT_AURORA_CONFIG` (interactivity is opt-in; the default stays non-interactive). **The substrate PRM/park seam is AW.W7-owned — this wave hooks it.**

## 4a. Disjointness

Two serial agent units in ONE worktree (they share `flow.glsl.ts`, `aurora.frag.ts`, `runtime.ts`, `presets.ts` across the WebGL2-axes → WebGPU-wake sequence — NOT file-disjoint):

- **AW.W8.1** (the WebGL2 axes) lands FIRST. Owns `cursorModel.ts`, `useCursorInteraction.ts`, `flow.glsl.ts` (the velocity-reactive bias), `aurora.frag.ts` (the cursor-as-light + velocity-burst), `useAurora.ts` (scroll + the flag), the `interaction-prm` gate. It establishes the master tempo scalar the gate asserts.
- **AW.W8.2** (the WebGPU stateful wake) lands SECOND — it consumes .1's master tempo scalar + the AW.W7 WebGPU branch. Owns `wake.wgsl.ts`, `runtime.ts` (the wake feedback pass on the park gate), `presets.ts` (the wake axis on the flag).

`presets.ts` is touched by .1 (the flag) and .2 (the wake axis) — serial on the same worktree (.1 → .2). `runtime.ts` is touched by .2 only. `scripts/gates.mjs` + `package.json` register the one gate (.1). Net: ONE serial lane (.1 → .2), then the close. No parallel writers.

## 4b. Worktree Plan

Single serial lane — one worktree, two sequential agent units.

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — interactivity (AW.W8.1 → .2, serial) | `/Users/mkbabb/Programming/glass-ui-aw-w8` | serial within; branches from the W4+W7-integrated HEAD; owns the cursor model + the shader axes + the wake + the gate + the test |

No `CARGO_TARGET_DIR` (Node/Vite repo). The orchestrator runs `git worktree add` and owns the close integration (the docs/PROGRESS commit can fold into the same lane — this wave has no separate bake/docs lane since it adds no new preset thumbnails; the interactivity is opt-in/runtime, not baked into a default thumbnail).

## 5. Agent Units

### AW.W8.1 The WebGL2 axes — cursor-as-light + velocity-reactive flow + scroll coupling

- **Goal**: the aurora responds to the pointer on WebGL2 — the cursor drives the impasto catch-light (idle auto-orbit), a fast flick injects a decaying swirl-burst, and scroll couples palette/breath — every axis on a master tempo scalar that PRM and the `DockBackgroundToggle` pause zero.
- **Mechanism**:
  - **Cursor-as-light (`useCursorInteraction.ts` + `aurora.frag.ts`).** Reuse the cursor seam to drive AW.W4's `uLightDir` (the movable impasto light); the catch-lights track the pointer, a slow auto-orbit when idle. No new lighting path.
  - **Velocity extension (`cursorModel.ts`).** Extend the position-only model with pointer/scroll velocity (a delta-tracked, smoothed/clamped velocity vector).
  - **Velocity-reactive flow (`flow.glsl.ts:35-49` + `aurora.frag.ts:229-244`).** Replace the stateless cursor swirl with a velocity-reactive bias: a fast flick injects a transient swirl-burst easing out over ~1s (a decaying `uCursorVelocity`-driven term), distinct from the steady attraction. The stateless swirl is superseded.
  - **Scroll coupling (`useAurora.ts`).** Bind palette/breath progress to scroll via `useScrollProgress` (the existing public composable).
  - **The master tempo scalar.** ONE scalar dials the whole interactive stack to stillness; PRM (the substrate's live freeze) + a `breathIntensity` knob converge on it. The interactivity config flag (default off) enumerates the axes.
- **Files**: `cursorModel.ts` (modify), `useCursorInteraction.ts` (modify), `flow.glsl.ts` (modify), `aurora.frag.ts` (modify), `useAurora.ts` (modify), `presets.ts` (modify — the flag), `interaction-prm.test.ts` (create), `scripts/proof-aurora-interaction-prm.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-interaction-prm` GREEN + bite-verified — assert every new axis (cursor-as-light, velocity-burst, scroll) is SUPPRESSED under `prefers-reduced-motion: reduce` AND the master tempo scalar zeroes the field; the `DockBackgroundToggle` pause stops every axis. Bite: detach an axis from the master tempo scalar (so it animates under reduce) → RED. `interaction-prm.test.ts` green. `build` green.

### AW.W8.2 The WebGPU stateful pointer wake

- **Goal**: on the AW.W7 WebGPU branch the pointer leaves a self-advecting decaying wake — lingering eddies, not an instantaneous swirl — with a click→radial-ripple impulse, all on the master tempo scalar and the offscreen-park gate.
- **Mechanism**:
  - **`wake.wgsl.ts` — the ping-pong velocity texture.** One ping-pong velocity texture; the pointer writes a delta-tracked Gaussian splat (Pavel Dobryakov's stable-fluids pattern) that self-advects and dissipates, biasing the flow — lingering eddies. Click → a radial-ripple impulse.
  - **`runtime.ts` — the feedback pass on the park gate.** The wake feedback pass runs on the AW.W7 WebGPU branch, on the SAME `shouldContinue()`/`isRunning()` park gate the compute dispatch uses — a parked rAF (offscreen / PRM / paused) skips the wake's self-advection (it does not accumulate while hidden). The master tempo scalar zeroes the wake's injection.
- **Files**: `wake.wgsl.ts` (create), `runtime.ts` (modify — the wake feedback pass, serial after .1), `presets.ts` (modify — the wake axis on the flag, serial after .1).
- **Sub-gate**: `proof:aurora-interaction-prm` EXTENDED to the wake GREEN — the stateful wake is suppressed under PRM (the master tempo scalar zeroes the injection) AND `proof:offscreen-pause` (AW.W7-extended) confirms a parked rAF skips the wake's self-advection. Bite: let the wake advance under a parked rAF → `proof:offscreen-pause` REDs. `build` green (the WGSL compiles). Depends on AW.W7's WebGPU branch.

## 6. Hard Gate

W8 closes when every condition below is evidence-backed:

1. **AW.W8.1** — cursor-as-light drives AW.W4's `uLightDir` (idle auto-orbit); `cursorModel.ts` carries velocity; the velocity-reactive flow supersedes the stateless swirl (a flick → a decaying burst); scroll couples via `useScrollProgress`; the master tempo scalar dials the stack. `proof:aurora-interaction-prm` GREEN + bite-verified (every axis suppressed under reduce + the pause stops it; detaching an axis from the tempo scalar → RED).
2. **AW.W8.2** — the WebGPU stateful wake (the ping-pong velocity texture, the delta-tracked splat self-advecting + dissipating, the click-ripple) runs on the AW.W7 branch, on the park gate. `proof:aurora-interaction-prm` extended to the wake GREEN; `proof:offscreen-pause` (AW.W7-extended) confirms a parked rAF skips the wake.
3. **Accessibility is BINDING** — every interactive/parallax axis honors `prefers-reduced-motion` (WCAG 2.3.3) via the substrate's live PRM freeze + the `DockBackgroundToggle` pause (WCAG 2.2.2); the master tempo scalar is the single suppression seam.
4. **Interactivity is opt-in** — the config flag defaults off; the wispy-sky `DEFAULT_AURORA_CONFIG` is non-interactive and byte-unchanged.
5. **The substrate park seam is NOT re-authored** — `useWebGLCanvas.ts`/`createGPUCanvas.ts` byte-unchanged (this wave HOOKS the master tempo scalar onto the AW.W7 seam); `DockBackgroundToggle.vue` unchanged (the aurora wires the existing pause/resume seam).
6. **The painterly + tonemap shaders are NOT re-edited** — `composition.glsl.ts`/`brush.glsl.ts`/`mediums.glsl.ts`/`tonemap.glsl.ts` byte-unchanged (this wave drives their `uLightDir`/flow inputs); `proof:aurora-space-gamma` + the AW.W4 painterly gates GREEN.
7. **No regression.** The existing gate matrix stays GREEN: `proof:offscreen-pause`, `proof:aurora-space-gamma`, `proof:webgl-substrate-single`, `npm run typecheck`, `npm run build`, the aurora unit suite. `PROGRESS.md` records the green run id + the PRM/pause browser verify (every axis freezes under reduce + the pause).

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:aurora-interaction-prm` | `scripts/proof-aurora-interaction-prm.mjs` | `["local","ci"]` | detach an axis from the master tempo scalar (it animates under `prefers-reduced-motion: reduce`) → RED; OR let the wake advance under a parked rAF → `proof:offscreen-pause` REDs |

Follows the house gate template (`scripts/proof-aurora-space-gamma.mjs`): a vitest-driven assertion that every axis routes through the master tempo scalar PRM/pause zero + the offscreen-park-on-wake, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on violation. Register in `package.json` + `gates.mjs` ONLY after the axes land (`gates:verify-ci` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after each unit and at close.
- `npm run build` — after .1 (the WebGL2 axes compile) and .2 (the wake WGSL compiles) and at close.
- `proof:aurora-interaction-prm` + `proof:offscreen-pause` (extended to the wake) + the no-regression existing-gate matrix — after each unit and at close.
- `vitest run src/components/custom/aurora/__tests__/interaction-prm.test.ts` — after .1 (the WebGL2 axes) and .2 (the wake).
- `git diff --check` on `DESIGN.md` + `PROGRESS.md` at close.

No formatter is intentionally skipped; the PRM gate + the offscreen-park-on-wake are the binding evidence; the PRM/pause browser verify (every axis freezes under reduce + the `DockBackgroundToggle` pause) is the binding accessibility evidence.

## 8. Verification Artefacts

- The `proof:aurora-interaction-prm` JSON gate artefact (byte-stable) — born-RED (pre-axes) AND green (post-axes), including the wake extension.
- The `interaction-prm.test.ts` run (every axis suppressed under reduce + the master tempo scalar zeroes the field + the pause stops it) green.
- The `proof:offscreen-pause` artefact extended to the wake (a parked rAF skips the self-advection).
- DESIGN.md §interactivity (the cursor-as-light/velocity/wake/scroll axes, the master tempo scalar, the binding WCAG 2.3.3 / 2.2.2 gates, the WebGL2-cheap / WebGPU-stateful split).
- Browser-verify notes (the catch-light tracks the pointer; a flick → a decaying burst; the wake self-advects on WebGPU; EVERY axis freezes under `prefers-reduced-motion: reduce` + the `DockBackgroundToggle` pause) + the green CI run id + integration commit hashes — `docs/tranches/AW/PROGRESS.md`.

## 9. Commit Plan

- **AW.W8.1 (WebGL2 axes) commit** — `feat(tranche-AW): W8 — aurora cursor-as-light + velocity-reactive flow + scroll coupling (master tempo scalar) + born-RED proof:aurora-interaction-prm` (body: the impasto-uLightDir reuse, the cursorModel velocity extension, the superseded stateless swirl, the useScrollProgress reuse, the binding WCAG 2.3.3/2.2.2 suppression via the master tempo scalar).
- **AW.W8.2 (WebGPU wake) commit** — `feat(tranche-AW): W8 — aurora stateful pointer wake (ping-pong velocity texture, click-ripple) on the WebGPU branch + the park gate` (body: the delta-tracked Gaussian splat, the self-advection/dissipation, the offscreen-park-on-wake, the master-tempo-scalar suppression).
- **Orchestrator integration + docs commit** — `docs(tranche-AW): W8 close — DESIGN.md §interactivity + PROGRESS green run id + the PRM/pause browser verify` (body: status/close).

## 10. Dependencies

- **Depends on**: **AW.W4** (impasto) — cursor-as-light reuses the `uLightDir` movable light the impasto wave lands (no new lighting path). **AW.W7** (WebGPU) — the stateful wake is the WebGPU/feedback-pass form on the AW.W7 branch + the compute-dispatch park gate; the cheap cursor-as-light + velocity + scroll axes ship on WebGL2 in this wave, the stateful wake is the WebGPU half. The substrate's live PRM freeze + the `DockBackgroundToggle` WCAG-2.2.2 pause (the AV.W7 G2 control) are the gates every axis hooks.
- **Blocks**: nothing in the aurora arc — interactivity is the last aurora feature wave. The AW aurora README documents the interactive axes + the binding accessibility.

**Deferred against this wave (with trigger):** richer interaction surfaces (a particle/ember layer advected by the wake, multi-pointer/touch eddies). DEFER — the cursor-as-light + velocity + scroll + the single wake are the complete interactive set; an ember layer is a separate visual fold (it needs the AW.W7 per-stroke compute buffer). Trigger: a design pass requesting an emissive particle layer OR a consumer requiring multi-touch eddies.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The interactivity gap is named in PATH-FORWARD §5: today interaction is cursor-swirl only — the pointer rotates the warp and bends the flow (`aurora.frag.ts:229-244`, `flow.glsl.ts:35-49`), stateless and instantaneous. The SOTA move is STATEFUL — the pointer leaves a wake that advects and decays. Cursor-as-light is cheap (it ships with the impasto wave's `uLightDir`); velocity-reactive flow extends `cursorModel.ts` (position-only today) with pointer/scroll velocity (a fast flick → a transient swirl-burst easing out over ~1s); the stateful wake is the WebGPU/feedback wave (one ping-pong velocity texture; the pointer writes a delta-tracked Gaussian splat — Pavel Dobryakov's WebGL-Fluid-Simulation stable-fluids pattern — that self-advects and dissipates; click → a radial ripple); scroll coupling binds palette/breath to scroll via the existing `useScrollProgress` composable. The technique is Pavel Dobryakov's WebGL-Fluid-Simulation (the delta-tracked splat) + Bridson 2007 (the procedural vortex). Accessibility is BINDING: every interactive/parallax axis must honor `prefers-reduced-motion` (WCAG 2.3.3 Animation from Interactions) — the substrate already freezes to one static frame under PRM (the AV.W7 G1 substrate-level live-monitor); the new stateful field and any parallax hook the SAME gate, and the `DockBackgroundToggle` (WCAG 2.2.2 Pause, Stop, Hide — the AV.W7 G2 control) pause stops it too. The design is one master tempo scalar that PRM (and a `breathIntensity` knob) dial toward stillness — the single suppression seam this wave's gate asserts. All accessed 2026-06-06.
