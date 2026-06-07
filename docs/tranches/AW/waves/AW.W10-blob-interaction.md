# AW.W10 - Blob Interaction

## State

**Name**: W10 - Blob Interaction
**Opens after**: AW tranche open (blob arm; parallel-eligible with AW.W9 — disjoint file bounds)
**Agents**: 2 serial
**Hard gate**: `proof:blob-interaction-prm` green (every new motion axis collapses to no-op/instant under `prefers-reduced-motion`, routes through the substrate's single rAF, stays reachable by `pause()`/`resume()`, and the spring is frame-rate independent); the demo story drives the shipped interaction (no orphaned `pointerAttraction`); `proof:offscreen-pause` stays green.
**Status**: planned

## Goal criterion

The blob is a pointer-reactive creature that leans, stretches, and settles with weight instead of
tracking the cursor mechanically: a decaying-radius pointer trail makes it reach an elastic
pseudopod toward the cursor and snap back, a velocity-driven squash-and-stretch lets it lean into
motion, and under `prefers-reduced-motion` it resolves to a deliberate, beautiful static rest
pose. This wave succeeds if a hover-and-flick gesture visibly stretches then recovers the blob,
and a PRM render paints one composed still frame, both reachable by the dock pause toggle.

## Scope

1. Replace `useBlobPointer`'s fixed-α exponential lerp (`SMOOTH_FACTOR = 0.12`,
   framerate-dependent, `useBlobPointer.ts:3,59-64`) with a `dt`-normalized critically-damped
   spring fed the renderer's per-frame `dtMs`, reusing the real `useSpring` composable
   (`src/composables/motion/useSpring.ts` — wraps `@mkbabb/keyframes.js` `SpringProgress`,
   already exposes `value` + `velocity`; consume, do not hand-roll); expose smoothed position
   AND velocity.
2. Add a 15-position pointer trail buffer (mirroring the Codrops droplet pattern); surface the
   trail as decaying-radius `smin`-merged sphere sources reusing the existing `MAX_SATS` uniform
   array plumbing in `useMetaballRenderer.ts`, so the blob stretches an elastic pseudopod toward
   the cursor and snaps back.
3. Add velocity-driven squash-and-stretch: a volume-preserving anisotropic 2×2 UV warp applied
   before `sdCircle` in `metaball.frag.ts` (`uVelocity`, `uStretch`), stretching along the motion
   direction and compressing perpendicular, magnitude ∝ |velocity| (subtle 25-50%).
4. Honor the *sign* of `pointerAttraction` at `metaball.frag.ts:122-128` (lean-in vs shy-away;
   today the influence is hardcoded repulsion), and give `idle` a small non-zero default
   `pointerAttraction` so hover is always felt out of the box; wire the `click` emit to a one-shot
   spring impulse on `pulseAmp`/`smoothK` (overshoot then settle).
5. Resolve the reduced-motion contract: every new axis (spring, trail, squash, click-impulse)
   collapses to no-op/instant under PRM and routes through the substrate's single rAF — under
   reduce the blob settles to a deterministic composed rest pose (peak roundness, trail collapsed,
   velocity zero), not a frozen mid-gesture, and stays reachable by `pause()`/`resume()`.
6. Ship an interactive demo story under `demo/stories/` that exercises the trail-stretch, the
   squash, and the click-impulse (the overfitting-audit "no orphaned substrate" requirement —
   the shipped interaction must have a consumer).

## Triumvirate Dispatch

A triumvirate is mandatory when:

- the file bounds would expand beyond the listed composable/shader paths — e.g. the trail buffer
  cannot reuse the `MAX_SATS` uniform array and demands a new uniform-array seam in the shared
  `useWebGLCanvas` substrate (a substrate edit is out of blob-local scope);
- `proof:blob-interaction-prm` fails on the frame-rate-independence assertion in a way not
  recoverable by a local spring-parameter fix — i.e. the spring settle diverges across simulated
  60/120 Hz dt because `keyframes.js`'s solver does not expose a usable `tick(dt)` seam (re-plan
  toward the SmoothDamp closed form rather than redispatch);
- the third successive integration attempt cannot make the PRM rest pose deterministic (the trail
  or velocity state leaks a non-zero residual into the static frame) — halt and re-plan the
  reset-to-rest path.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/goo-blob/composables/useBlobPointer.ts` | modify |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify |
| `src/components/custom/goo-blob/composables/useBlobSatellites.ts` | modify |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify |
| `src/components/custom/goo-blob/types.ts` | modify |
| `src/components/custom/goo-blob/GooBlob.vue` | modify |
| `demo/stories/.../blob-interaction.vue` | create |
| `scripts/proof-blob-interaction-prm.mjs` | create |
| `package.json` (the new `proof:blob-interaction-prm` entry) | modify-carve |

Do NOT touch: `src/composables/glass/webgl/` (the shared substrate — inherit its rAF/PRM freeze,
never add a parallel loop), `useBlobMood.ts` (AW.W11's mood-resolution surface),
`sdf-body.glsl.ts`/`oklch-perturb.glsl.ts`/`watercolor-edges.glsl.ts` (AW.W9's geometry/color
GLSL), any aurora or dock source.

## Disjointness

Two agent units run serially (W10.a then W10.b) — they share
`useMetaballRenderer.ts`, `metaball.frag.ts`, and `types.ts`, so they MUST NOT run in parallel.
W10's file bounds are disjoint from AW.W9's lit-surface block: W10 owns the pointer/satellite
composables + the pre-`sdCircle` UV warp + the demo; W9 owns the post-field lighting block and the
edge/smin GLSL. The one shared file, `metaball.frag.ts`, is touched in non-overlapping regions
(W9: edge + lighting; W10: the pre-`sdCircle` pointer/squash warp) — if the two waves run in the
same window they sequence (W9 before W10) rather than parallelize on that file.

## Worktree Plan

If AW.W9 and AW.W10 are dispatched in the same window (both touch `metaball.frag.ts` and
`useMetaballRenderer.ts`), they do NOT parallelize on those files — commit W9 to a clean main
first, then open W10 on it. If run in separate windows on a clean main, no sibling worktree is
needed (W10's two units are serial and share one tree).

## Agent Units

### AW.W10.a Spring Pointer And Trail

- Goal: the pointer is a frame-rate-independent critically-damped spring exposing position +
  velocity, and a decaying-radius trail makes the blob reach toward the cursor and snap back.
- Mechanism: replace `SMOOTH_FACTOR` lerp in `useBlobPointer.ts` with a `dtMs`-fed `useSpring`
  (`src/composables/motion/useSpring.ts`, the real composable wrapping `SpringProgress` and
  exposing `value` + `velocity`); add the 15-slot trail buffer; surface the trail as decaying-radius `smin` sources through
  the `MAX_SATS` uniform plumbing in `useMetaballRenderer.ts` + `useBlobSatellites.ts`; honor the
  sign of `pointerAttraction` and set the `idle` default non-zero in `types.ts`.
- Files: `useBlobPointer.ts`, `useMetaballRenderer.ts`, `useBlobSatellites.ts`,
  `metaball.frag.ts:122-128` (the pointer warp), `types.ts`.
- Sub-gate: the spring settle is identical (within tolerance) across simulated 60 Hz and 120 Hz
  `dt`; the trail collapses to the body when the pointer leaves; `proof:offscreen-pause` stays green.

### AW.W10.b Squash, Click-Impulse And PRM Rest

- Goal: the blob squashes along motion, springs on click, and resolves to a composed static rest
  pose under reduced-motion — and a demo story exercises all of it.
- Mechanism: add the volume-preserving anisotropic 2×2 UV warp (`uVelocity`, `uStretch`) before
  `sdCircle`; wire the `click` emit (`GooBlob.vue`) to a one-shot spring impulse on
  `pulseAmp`/`smoothK`; gate every axis behind the substrate PRM freeze so reduce → deterministic
  rest pose (roundness peak, trail collapsed, velocity zero); ship the interactive demo story.
- Files: `metaball.frag.ts` (the pre-`sdCircle` warp), `types.ts` (`stretch`/impulse config),
  `GooBlob.vue` (click → impulse), `demo/stories/.../blob-interaction.vue`,
  `scripts/proof-blob-interaction-prm.mjs`.
- Sub-gate: `proof:blob-interaction-prm` asserts each motion axis is no-op under PRM, the rest
  pose is deterministic, the demo story drives the shipped interaction, and there is no parallel rAF.

## Hard Gate

1. `npm run proof:blob-interaction-prm` exits 0: under a simulated `prefers-reduced-motion: reduce`
   the spring/trail/squash/click-impulse each resolve to no-op/instant and the rendered rest pose is
   bit-deterministic; the spring settle matches across 60/120 Hz `dt`; the only rAF is the
   substrate's (`rg` for a second `requestAnimationFrame` in the blob tree returns nothing); the
   demo story imports and binds the shipped interaction props (no orphaned `pointerAttraction`).
2. `npm run proof:offscreen-pause` exits 0: the new motion state parks offscreen/hidden/under PRM
   exactly as the baseline does (no new always-on loop).
3. `npm run typecheck` exits 0 (the trail buffer, velocity exposure, and config additions typecheck).
4. `npm run build` exits 0 (the blob chunk + the demo story build clean).
5. A runtime gesture probe (Playwright or equivalent, if available): a programmatic hover-then-flick
   over the demo blob produces a measurable stretch in the motion direction within 5 frames, then a
   recovery toward rest — captured as a frame sequence. If browser automation is unavailable, record
   the build-verification floor + the re-probe obligation to the next tranche (π contingency clause).

## Format And Lint Cadence

`npm run typecheck` + `npm run build` after each agent unit and before close; `git diff --check`
on every commit. The demo story runs the repository's available Vue/TS lint pass. The
load-bearing behavioral check is `proof:blob-interaction-prm` (the PRM + frame-rate-independence +
no-orphan assertions), run after each unit and at close.

## Verification Artefacts

- `scripts/proof-blob-interaction-prm.mjs` (the new gate).
- `demo/stories/.../blob-interaction.vue` (the consumer that exercises trail/squash/click).
- The gesture-probe frame sequence (hover→flick→recover), saved if automation is available.
- Gate logs under `docs/tranches/AW/audit/W10-blob-interaction.json` (each gate name + exit code +
  the 60/120 Hz settle delta + the PRM-rest determinism measurement).

## Commit Plan

- `feat(goo-blob): critically-damped spring pointer + decaying-radius trail (W10.a)` — body names
  the `SMOOTH_FACTOR` retirement, the `keyframes.js` reuse, and the `MAX_SATS` trail plumbing.
- `feat(goo-blob): velocity squash-and-stretch + click spring-impulse + PRM rest pose (W10.b)` —
  body names the sign-honoring pointer fix and the deterministic reduced-motion rest pose.
- `feat(demo): interactive blob story exercising trail/squash/click` — the consumer story.
- `test(goo-blob): blob-interaction-prm gate (PRM no-op + frame-rate independence + no-orphan)`.
- `docs(tranche-AW): W10 interaction close — gate ledger + gesture-probe artefacts`.

## Dependencies

- **Depends on**: AW tranche open. Independent of AW.W9's lit-surface block (disjoint regions);
  parallel-eligible with W9 only if W9 commits first (shared `metaball.frag.ts`/
  `useMetaballRenderer.ts`). Reuses the real `useSpring` composable
  (`src/composables/motion/useSpring.ts`, wrapping `@mkbabb/keyframes.js` `SpringProgress` — a
  blob peer dep already; it exposes `value` + `velocity` per frame, exactly the seam needed).
- **Blocks**: AW.W11 (Blob Mood) consumes the spring + pointer/idle state from W10 to drive moods
  from interaction (curious on approach, excited on click, sleepy after inactivity); W11's
  state-driven mood arc depends on the W10 pointer-velocity + idle-timer seam.

## Archaeology

This wave promotes the interaction half of the blob SOTA seed `AW.Wb6` (spring pointer + velocity
squash + interaction wiring) from `docs/tranches/AW/blob/wave-seeds.md`, deferring the mood-model
resolution to AW.W11 where it belongs with the expressiveness/palette work. The prior posture is a
stateless per-frame pointer warp with a hardcoded repulsion and a framerate-dependent lerp
(`useBlobPointer.ts:3`); the `pointerAttraction` default is `0.0`, so an out-of-the-box blob is
inert to the pointer. The full pressure soft-body (Charlotte Dann / Matyka) and the Verlet
control-ring are the documented *deferred* sim path (a render-model change, not this wave); the
velocity-skinning squash gets ~80% of the soft-body feel with zero sim. The guardrail is the
single-substrate-rAF invariant (`proof:offscreen-pause` + the new `proof:blob-interaction-prm`) —
no new motion path may bypass the substrate's offscreen-park + live PRM freeze, the recurring
failure class for added animation.
