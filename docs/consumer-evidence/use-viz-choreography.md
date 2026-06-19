# useVizChoreography

## Artefact path

`src/composables/glass/useVizChoreography.ts` — the procedural-viz family's ONE
start · transition · end · restart choreography clock (BC.W-VIZ-CHOREOGRAPHY). It
composes the published-4.3.0 keyframes.js clock (`SpringProgress` for the coupled
`revealT` scalar + `SmoothProgress` for the config-transition lerp +
`springTimingFunction` for the cross-fade timing) and is FED `tick(dt)` from each
consuming viz's existing `createCanvasLifecycle` frame callback — it owns NO rAF (the
one-loop / `proof:offscreen-pause` discipline). INTERNAL (off the public `/glass`
barrel — the substrate-picker / `useGpuSubstrate` precedent); every canvas viz composes
it via a direct relative import.

## Verdict

`substrate-floor` — **the GPU choreography foundation the per-viz waves consume, minted
at the BC Band-4 substrate floor (AFTER BC.W-WEBGPU-EVERYWHERE + BC.W-VIZ-INTERACTION,
WITH BC.W-MOTION-ONE-CLOCK).** Mirrors `usePointerVelocityField` (BB.B4) — the shared
field minted EARLY so the per-viz waves wire it at birth. The four beats (start /
transition / end / restart) move onto ONE published keyframes.js clock; the ad-hoc
`scheduleAfterFirstPaint` / `setTimeout` reveal is removed (the BB disease: the viz
arm/fade-in/park rode ad-hoc timing, NOT a kf clock — viz-codebase.md §8).

## The ≥2-consumer bar (born-RED at the floor → GREEN when the per-viz waves wire it)

The bar is the per-viz waves' OWN wiring: each viz's renderer feeds the choreography
`tick(dt)` from its `createCanvasLifecycle` frame callback and drives its canvas opacity
+ a build-in uniform off `revealT`. The booked binary consumers (the EARLY-publish path,
the EXECUTION-DAG §4 Band-4 per-viz waves):

- **#1 — aurora** (`BC.W-VIZ-AURORA` / the aurora reveal): `useAurora.ts` drops
  `scheduleAfterFirstPaint`/`setTimeout` (lines 81-114) for the kf `revealT` bloom; the
  nuclei bloom in on the coupled fade.
- **#2 — goo-blob** (`BC.W-GOOBLOB-*`): the metaball settles-from-scatter on the reveal
  scalar.
- **+ the dot-field / constellation / fourier / dot-matrix / concentric reveals** (each
  per-viz wave wires its OWN settle-from-scatter / bloom / assemble on the shared clock).

At the BC.W-VIZ-CHOREOGRAPHY substrate-floor close this is born-RED (every per-viz grep
EMPTY — the per-viz waves wire the clock AFTER this floor lands). It goes GREEN when ≥2
per-viz waves wire it. Mid-build RED is BY-DESIGN (the SYNTHESIS class-2 cure — the grep
CATCHING the unmet bar, not a prose pass papering over it; the `proof:viz-choreography`
C1 consumer clause runs the REAL `grep useVizChoreography src/components/custom/{viz}/`).

## Consumer proof (re-runnable)

```bash
grep -rln 'useVizChoreography(' src/components/custom/ \
  | grep -v '/useVizChoreography.ts' | grep -v '\.\(test\|spec\)\.ts$'
#   → (born-RED at the floor — empty; GREEN when the per-viz waves wire it)
```

## Re-audit / retire trigger

If the per-viz reveal waves do NOT land within the BC Band-4 chain (the choreography
clock stays consumer-less past the per-viz waves), this leaf is RETIRED with rationale
(the substrate-without-consumer-binary invariant, J-inv-10 / L-inv-8). The
`proof:viz-choreography` consumer clause is the enforcement net — it reds until ≥2 real
per-viz call sites land, never a doc-prose green (the BB `usePointerVelocityField`
gate-blindness class, cured).
