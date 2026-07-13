# BI.W-FIELD-CORE — the ONE interaction-physics field + the 4 legacy pointer-model retires

Band B5 (substrates). ONE evolved field core + a route pointer broadcaster + four pure per-viz mappings;
the dual-path/double-smooth/background-dead defects retired; the owner-ordered aurora-pointer rider
discharged.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-E2** — "All auroras should have proper interactability" (the wiring — aurora responds to the pointer).
- **UF-E3** — "The interaction with the goo blob is not smooth, intuitive, or robust… re-worked from first
  principles, and have proper demo with satellite blobs."
- **UF-E6** — "/substrates/fourier-field… should follow your cursor to be biased in that direction, more
  subtle, and gracefully fourier draw towards that. Similar for the blob, weighted and biased. Faster
  movements (velocity, acceleration) should influence this too." (the PHYSICS half; UF-E7 render → W-FOURIER-RIBBON).
- **VALUEJS-T-38 / RIDER-AURORA-POINTER (OWNER-ORDERED, 2026-07-11)** — the aurora pointer-honesty rider: a
  cursor-LOCAL luminance lean that reads on `smooth` fields + velocity burst routed into the domain-warp
  path + medium-gated interactivity atoms + the sized amplitude atom (the value.js demo's swirl/burst axes
  are perceptually DEAD on the smooth medium at HEAD; verify-at-cut W7).

## §Design

Decided mechanism — D-VIZ PASS-1 §1–§3 (the leading composition): the grammar EXISTS, the architecture is
split-brain. NO re-litigating (source-verified at exact lines: aurora runs BOTH `cursorModel.ts` AND the
field; goo-blob runs BOTH `useBlobPointer.ts` AND the field; `useMetaballRenderer.ts:254` feeds the
ALREADY-smoothed position — the compound-lag "not smooth" complaint verbatim; backgrounds are
`pointer-events:none` + `FourierField.vue:78` forces `interactive=false`).

- **Layer 0 — the evolved field core** (`usePointerVelocityField.ts`, evolve IN PLACE, additive, every
  existing output byte-FROZEN): `engagement` (smoothed active-envelope 0..1, ε-gated for the park contract) +
  `attractor`/`attractorVelocity` (a HAND-ROLLED 2nd-order semi-implicit-Euler mass-spring-damper —
  `a = -ω²(x-target) - 2ζω·v`, `target = lerp(restAnchor, position, engagement)`, burst coupled as an
  impulse LEAD `target += burst·normalize(velocity)·leadGain`) + `{mass, damping ζ, leadGain, restAnchor}`
  options + **halfLifeMs** authoring (feel as half-life, k derived internally). HAND-ROLLED not keyframes —
  the core lives on the root barrel + `/motion-core`, keyframes-FREE (the fence that rejected VIZ-C's
  spring-in-the-field). Allocation-free hot path; zero own rAF (fed `tick(dt)` from each renderer's
  `createCanvasLifecycle` onFrame); ω derives from the SAME `(response, dampingFraction)` convention the four
  existing hand-rolled integrators use (no second ω-formula).
- **Layer 0.5 — the route pointer broadcaster** (`useRoutePointer.ts`, NEW): ONE passive capture-phase
  window `pointermove` per route, viewport-normalized, provide/inject, PRM+paused-gated; the only structural
  answer to the backgrounds-interactive mandate (a `pointer-events:none` Teleport-to-body canvas cannot
  listen for itself). NEVER preventDefault/focus/steal-a-click.
- **Layer 1 — four pure per-viz mappings** (`pointerFieldMappings.ts`, NEW; no DOM/rAF/state):
  - `fourierLeanMapping` — directional DRAW-BIAS (modulate the clock phase-rate by the alignment of the
    head's travel tangent with the cursor direction, `BIAS_GAIN ≤ 0.15` — the curve advances a hair faster
    drawing TOWARD the cursor, "gracefully draws toward" WITHOUT moving the figure) + a subtle LEAN
    (`FOLLOW_LEAN ≈ 0.15` WITH HEAD's corrected y-invert/aspect math; `FOLLOW_REACH=0.7` the centroid-teleport
    RETIRES). Ships against the LOD-interim render, shape-independent (untouched at W-FOURIER-RIBBON's swap).
  - `blobPullMapping` — HEAVY-mass attractor (mass ≈1.6, ζ ≈0.78–0.85 — the slight overshoot IS the weight;
    HEAD's ζ=1.0 critical damping reads weightless), target = cursor + `LEAD_K·pointerVelocity` (leads toward
    heading), accel adds a transient pseudopod stretch. Raw pointer feeds the field ONCE — the
    `useMetaballRenderer.ts:254` double-smooth dies unconditionally. Satellite wake-drag threaded as PARAMS
    into the pure `satelliteKinematics.ts` leaf.
  - `auroraCursorMapping` — cx/cy = attractor, strength = `engagement·cfg.strength`, vel/burst pass through
    onto the EXISTING `uCursor*` uniforms (`uniformBridge.ts` ships uCursor/uCursorStrength/uCursorRadius/
    uCursorVelocity/uCursorBurst — interactability is a WIRING gap, ZERO shader edit). **Discharges the T-38
    rider:** the cursor-local luminance lean reads on `smooth` (engagement-driven attractor, not a dead
    swirl axis) + the velocity BURST routes into the domain-warp path + the interactivity atoms are
    MEDIUM-GATED (the smooth-medium dead-axis fix) + the sized amplitude atom. Replaces `cursorModel.ts`
    entirely.
  - `constellationWellMapping` — position/engagement/burst over the KEPT per-node integrators.
- **Sharing STOPS at the field + mappings.** No simulation service, no shared clock, no particle-pool bus,
  no second rAF (VIZ-C's own adversarial fence adopted).

## §Work

- `src/composables/motion/usePointerVelocityField.ts` — the additive core evolution (engagement + attractor +
  options + halfLifeMs); existing outputs byte-frozen.
- `src/composables/motion/useRoutePointer.ts` (NEW) + `pointerFieldMappings.ts` (NEW).
- `demo/.../StoryHero.vue` — thread `useRoutePointer` into the full-bleed background vizzes;
  `FourierField.vue:78`'s hard `interactive=false` → the SUBTLE-interactive background register (influence
  ~2–6%, longer half-life; canvas stays `pointer-events:none`).
- **RETIRE (clean break, no alias):** `src/components/custom/aurora/composables/cursorModel.ts` (onto core +
  `auroraCursorMapping` — the CLAUDE.md "booked successor IFF byte-faithful" clause FIRES); aurora
  `runtime.ts:200-211,340-410` dual-path; `useBlobPointer.ts` raw-pointer re-implementation (~60L);
  `useMetaballRenderer.ts:254` smoothed-position re-feed (unconditional); `constants.ts FOLLOW_REACH=0.7`;
  `FourierField.vue:78` background `interactive=false` gate.
- **CONDITIONAL** (G2 feel-parity): `useBlobPointer.ts` SpringProgress x/y follow retires onto the core
  attractor IF parity passes; else the spring stays viz-local but is fed RAW pointer (the double-smooth dies
  either way).
- **The satellite-blob demo tile** (UF-E3's ask): an N-satellite orbit + fission/merge + wake-drag surface
  (demo, no src paint).

## §Acceptance

Gate: **`proof:field-core`** (NEW) + **`proof:pointer-velocity`** (EXTEND) + **`proof:viz-interaction`**
(extend). Born-RED at HEAD: aurora runs the dual `cursorModel`+field path; `useMetaballRenderer.ts:254`
double-smooths; `FourierField.vue:78` forces `interactive=false`. GREEN here.
- FC1 — the core is keyframes-FREE on the `/motion-core` reach (no `@mkbabb/keyframes.js` import); the
  attractor is hand-rolled; existing outputs byte-frozen (fixed-trace regression on smoothedPosition/velocity/
  acceleration/burst); allocation-free (heap snapshot 0 steady-state alloc/frame).
- FC2 — `cursorModel.ts`, the aurora dual-path, the blob raw-path, `FOLLOW_REACH=0.7`, the
  `interactive=false` gate all DEFINITION-ABSENT (no alias, no half-delete).
- FC3 — the double-smooth dies: raw pointer feeds the field ONCE (one smoothing stage).
- FC4 — `useRoutePointer` exists once; capture-phase; PRM + paused-gated; never preventDefault/focus/steal.
- FC5 — the four mappings are pure (no DOM/rAF/state; unit-testable); `auroraCursorMapping` wires the
  existing `uCursor*` uniforms (ZERO shader edit — the GL fence held).
- FC6 (T-38) — the aurora interactivity atoms are medium-gated (read on `smooth`); the velocity burst routes
  into the domain-warp path; the sized amplitude atom present.
- Self-test bite: a planted keyframes import in the core REDs; a planted second smoothing stage REDs; a
  planted dual pointer path (cursorModel re-mint) REDs.

## §π/DELTA

`tests-visual/viz-interaction.spec.ts` (extend; LOCAL real-GPU) + `W-FIELD-CORE-DELTA.md`:
- **Blob weight** — a scripted flick + edge-hover frame series: the blob leads toward heading, overshoots
  slightly (the weight), no engage-flicker at the SDF boundary (active-toggles/sec bounded; hit-test
  hysteresis); the trail/pseudopod desync check.
- **Fourier draw-bias** — the head-approaching-a-fixed-cursor frame series from 3 tangent angles: the curve
  gracefully draws toward WITHOUT the figure translating; BIAS_GAIN ≤0.15 reads intentional-not-stuttering.
- **Aurora interactability (T-38)** — `useRoutePointer` → a full-bleed SETTING_SUN aurora feeding setPointer
  + uCursorVelocity/uCursorBurst: the velocity-reactive swirl + burst track the real pointer over content +
  scrolled page, on the `smooth` medium (the axes are ALIVE, not dead). Chrome + Safari 26.
- **PRM** — all four vizzes paint exactly one static frame then park; pointer motion produces zero field
  change; offscreen frame-count → 0.
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE substrate verdict.

## §Obligations

- **Device run (SAF-1):** the broadcaster correctness (capture-phase survives child stopPropagation;
  viewport coords across scroll; silences under BOTH PRM and the substrate paused flag; zero click/scroll
  theft) + the acceleration robustness on Safari's under-delivered coalesced pointermove — Chrome + real
  WebKit. `dis:safari-metal-verify` seam.
- **Cross-repo (foreign-tree fence):** the T-38 rider is DISCHARGED here (the glass-ui aurora-interactability
  fix); the value.js demo's W2-5 pointer retune stays DEFERRED-in-value.js until this lands (verify-at-cut
  W7 — THEIR edit, recorded in the crossrepo-asks:bi roster). No glass-ui edit to the sibling tree.
- **Sequencing:** the draw-bias ships on W-FOURIER-RIBBON's LOD-interim + re-verifies shape-independence at
  the ribbon swap (the two waves coordinate; the biased curve-sample source is shared).

## §Dispositions

- **The blob SpringProgress retirement** (G2) is CONDITIONAL — decided by the feel-parity probe; if parity
  fails the spring stays viz-local (fed raw pointer). Recorded as a build-time measurement, not a re-book.
- **src:constellation-spatial-hash-1/2** (CHRONIC — the GPU spatial-hash successor books) → RETIRE (overfit
  substrate at default count=64, 0 consumers; a dense-register re-enters on a real high-count need). This
  wave's constellation mapping does not re-open them. Terminal.
- **The WebGPU wake ping-pong velocity texture** stays a BOOKED refinement (WebGPU-only; the honest degrade
  is the CPU burst term — present-but-simpler, never a fake). Recorded, no re-book.

## §Inbound acceptance constraints (the 2026-07-12 marking pass)

- **atlas O-E5 — renderMode-static + the WebGPU idle-gate**: the field core exposes the static
  render mode (one-frame paint, no loop) + the idle-gate (the WebGPU device stays un-acquired
  until first live need) — both consumer-visible seams on the core this wave builds.
