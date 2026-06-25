# Pass-D deep-challenge — BLOB + the 4-split (RUTHLESS / CODE-GROUNDED)

**Scope:** `W-BLOB-RENAME` · `W-BLOB-MULTICORE` · `W-BLOB-EMOTION` · `W-BLOB-LAVA` (+ `W-LAVA-FIELD`).
Read against the ACTUAL source, not the doc's claim:
- `src/components/custom/goo-blob/shaders/{metaball.frag.ts,metaball.wgsl.ts,sdf-body.glsl.ts,metaball-uniforms.glsl.ts}`
- `src/components/custom/goo-blob/composables/{useBlobMood,useBlobSatellites}.ts`, `constants.ts` (`paramsFor`/`MOOD_AVA`)
- `tests-visual/blob-render.spec.ts` (the cage bounds) + the `proof:blob-*`/`goo-redress`/`viz-hybrid` cohort
- `src/components/custom/goo-dot-matrix/shaders/goo-dot.frag.ts` (the `sceneDistG` splice)
- `src/components/custom/dock/composables/useDockFission.ts` + `DockGooFilter.vue` (the "2nd consumer")
- the plan: `VIZ-FINAL-ROSTER.md §Band 12-13`, `UNIFIED-ROSTER.md`, `framework/lava-lamp-fluid.md`

**VERDICT.** The 4-split is the RIGHT structural response to the prior `blob-redevelop.md` god-wave critique
— RENAME · MULTICORE+budget · EMOTION-reauthor · LAVA-frozen-default-gates is the correct carve, and the
roster correctly re-points the lava ≥2-consumer off the CSS dock-filter onto goo-dot-matrix. BUT the
**framework doc that the waves cite still carries the two errors the prior critique demolished** — the ~33-eval
budget (off by the 24× shadow multiplier) and the incompatible dock-fission consumer — and the **EMOTION
re-author is STILL under-scoped**: the proposed §3.3 modulation does NOT cross-couple the default orbit
blob's motion to valence; it only adds a buoyancy axis that exists ONLY in lava mode. Three live findings
below, hardest first.

---

## FINDING 1 (HARDEST) — the framework's "~33 evals/frag" budget is STILL off by the 24× shadow multiplier; no wave produces the REAL number

`framework/lava-lamp-fluid.md §4.4` (line 235-238) asserts verbatim:

> "At M≤6 cores + K≤12 satellites + J≤15 trail ≈ **33 SDF evals/fragment** — well within a fullscreen pass."

This is the EXACT arithmetic error the prior `blob-redevelop.md §2` destroyed, re-committed into the binding
framework artifact the lava/multicore waves cite. The real per-fragment cost — traced in the LIVE shader:

- `sceneDistG` (`metaball.frag.ts:97-167`) = `1 body + MAX_SATS + TRAIL_N` SDF evals. With `MAX_SATS=4`,
  `TRAIL_N=15` (`metaball-uniforms.glsl.ts:94,104` + `constants.ts:13,16`) that is **up to 20 evals/call TODAY**.
- `sceneDistG` is called inside a **24-step soft-shadow raymarch**: `softShadow2D` (`metaball.frag.ts:193-208`,
  `for (i<24) { sceneDistG(ro+rd*t).x }`), gated `uShadow > 0.5` (line 385). The WGSL twin is byte-identical
  (`metaball.wgsl.ts:236-244`, `for (var i=0;i<24…) sceneDistG(...)`). So shadow-ON cost =
  `sceneDistG(main) + 24×sceneDistG(shadow)` = **25 × 20 ≈ up to 500 SDF evals/frag at M=1 TODAY.**
- At the multicore M=6/K=12/J=15 cap each `sceneDistG` = 33 terms → shadow-ON = `33 + 24×33 = **825 evals/frag**`.
  The framework counted ONE `sceneDistG` and forgot the 24× multiplier — `~33` is the cost of a single call,
  not a fragment.

Each eval is an `sdgCircle` (`sdf-body.glsl.ts:31`: `length` + a `normalize` divide) plus a `sminG`
(`sminCircularG` runs `sqrt(1 - h(h-2))`, `sdf-body.glsl.ts:78-86`); the body term additionally runs a
3-octave `fbmWarpedG` (`metaball.frag.ts:130`). At 825 evals/frag over a hero canvas at mobile DPR this is a
real frame cliff.

**The fix is named but unowned.** `W-BLOB-MULTICORE` (roster line 26) says "cap M/K, gate shadow at high N" —
correct direction — but `W-VIZ-PERF-BUDGET` (`UNIFIED-ROSTER.md:147`) is a one-liner ("context-cap /
compute-vs-fragment / DPR") that names NO measured frame-time and does NOT own the M/K-cap derivation. The
prior critique's REQUIRED FIX was explicit: *produce a real measured frame-time on a real mobile GPU (or
SwiftShader-throttle proxy) at the M/K cap WITH shadow ON, and set the cap BY that number.* That number does
not exist anywhere in the plan. Until it does, the multicore cap (M≤? K≤? shadow-forced-off above N=?) is
asserted, not measured — unbudgeted speculation. **The single most likely real conclusion the trace forces:
shadow must be force-OFF in multicore mode (the 24× term IS the killer), and M caps at ≤3, not 6.** The
framework §4.4 must be CORRECTED (it teaches the wrong number to every downstream agent) and the budget wave
must run the measurement.

---

## FINDING 2 — the EMOTION re-author is STILL under-scoped: the DEFAULT orbit blob's motion never couples to valence

`W-BLOB-EMOTION` (roster line 27) correctly diagnoses the defect — "valence→motion, not arousal-only … CALM≈
MELANCHOLY." Confirmed at HEAD, numerically. `paramsFor` (`constants.ts:64-104`) drives EVERY motion param off
arousal alone: `orbitSpeedScale`/`wobbleScale`/`pulseFreq`/`pulseAmp`/`noiseAmp`/`smoothK`/`mergeRate`/
`iridScale` are all `lerp(..., arousal)`. Valence touches ONLY `hueRange` (40% weight), `satShift`,
`brightnessShift`, `pointerAttraction` (color + one lean scalar). I evaluated the proposed 4-state quadrants
through the live `paramsFor`:

```
CALM {v:0.15,a:0.20} vs MELANCHOLY {v:-0.55,a:0.25} — MOTION euclidean dist = 0.166
  orbitSpeedScale Δ=0.090 (5% of the [0.4,2.2] range)   pulseAmp Δ=0.0021   noiseAmp Δ=0.0015
  → two low-arousal creatures move IDENTICALLY; the ONLY separation is hue (hueRange Δ=2.42).
```

So a `proof:emotional-state` "separate on ≥3 axes" assertion written honestly against `paramsFor` FAILS at
HEAD. The roster row says "RE-AUTHOR the affect surface" — good, that names the real work. **But the
framework's §3.3 emotion table (lines 191-200) does NOT actually re-author `paramsFor`.** It adds exactly ONE
new valence-coupled axis — `verticalBias` (buoyancy direction: Calm/Excited rise, Melancholy sinks) — and that
axis exists ONLY in the lava lifecycle (`§3.2` buoyancy is the lava-field's `useLavaField`, not the default
orbit `useBlobSatellites`). The `count` knob is still arousal-driven, `smoothK` still arousal-driven, and the
table explicitly says "re-derive params each frame via `paramsFor`" — the SAME arousal-only function. So:

- In **lava mode**, valence gets ONE motion axis (rise/sink). That is a 2.5-axis model — better, but the
  framework's own "the 4-state model needs" gloss over-claims it as the full circumplex.
- In the **default orbit blob** (the library identity, the contained bead that ships at N=1), valence still
  only retints. A re-author that lands the buoyancy axis inside `useLavaField` leaves the default `Blob`'s
  motion arousal-only — CALM and MELANCHOLY still move identically unless the blob is in lava mode.

**REQUIRED:** `W-BLOB-EMOTION` must re-author `paramsFor` ITSELF (cross-couple at least viscosity/`smoothK`
and wander-irregularity/`noiseAmp` to valence — a melancholy blob should drift SLOWER and SAGGIER than a calm
one, not merely cooler) so the ≥3-axis separation holds in the DEFAULT register, and `proof:emotional-state`
must assert a measured param-distance MATRIX (motion-distinct across valence AND arousal), not a presence
check. The current plan still asserts (b)'s outcome while the framework scopes (a)'s effort — the exact gap
the prior critique flagged, partially un-closed.

---

## FINDING 3 — the framework doc CONTRADICTS the roster on `useLavaField`'s 2nd consumer, and the roster's substitute does NOT consume the lava SIM

The prior critique proved the dock goo-split is a CSS `filter: url(#…)` graph, incompatible with a GPU smin
field. The ROSTER fixed it (line 22: "≥2-consumer = blob + goo-dot-matrix, the GPU-SDF; **NOT** the dock
CSS-filter"). **But `framework/lava-lamp-fluid.md` STILL names the dock fission as the 2nd consumer** — line 37-38
("the dock goo-split-to-sub-dock … is the **second binary consumer**"), §4.3 (line 224-232), §8 (line 353).
Confirmed live: `useDockFission.ts:44` imports `SpringProgress` and drives `DockGooFilter.vue`, which is a
"REGULAR `filter: url(#…)` graph (feGaussianBlur + feColorMatrix threshold + feComposite)" (`DockGooFilter.vue:19`).
It shares ZERO mechanism with `sceneDistG`. The framework doc is the binding artifact the lava wave cites — it
must be reconciled to the roster's goo-dot consumer, or the wave inherits a contrived ≥2 bar (J-inv-10).

**The deeper problem the roster's substitute does NOT solve:** goo-dot-matrix consumes the GPU FIELD
(`goo-dot.frag.ts:18` splices `METABALL_FRAGMENT_SRC`, slicing at `void main()`) AND the CPU sim
`useBlobSatellites` (`useGooDotMatrix.ts:106` — `useBlobSatellites(field, "goo-dot")` + `uploadBlobUniforms`).
It consumes the **orbit** satellite model, not `useLavaField` (the buoyancy/lifecycle REPLACEMENT). So naming
goo-dot as `useLavaField`'s 2nd consumer requires goo-dot to MIGRATE off `useBlobSatellites` onto the lava
buoyancy lifecycle — a default-changing migration that would alter goo-dot's own gated render (its satellites
ORBIT today; lava satellites birth→rise→dissolve). Either (a) goo-dot genuinely migrates (then say so + own
its π re-baseline), or (b) `useLavaField` is NOT abstracted as a shipped primitive — keep the lava logic
blob-LOCAL (a `mode="lava"` register inside `blob/`) until a real 2nd GPU-smin sim-consumer lands. The
framework's "≥2 bar met at birth" is met on paper by an incompatible (dock) OR an un-migrated (goo-dot)
consumer; the honest count of the LAVA SIM is ONE today.

---

## What the 4-split GOT RIGHT (credit where due)

- **`W-BLOB-LAVA` frozen-default-gates is correct.** The `blob-render.spec.ts` cage is verified hard + multi-bite:
  `COVERAGE_MAX=0.55` (line 68), `SIDE_MARGIN_MAX_FRAC=0.6` (105), the four-side footprint (78), `DOME_LUMA_STD`
  9-80 (126-127), `SILHOUETTE_CV_MIN=0.015` (143). A lava-lamp cannot clear these without deleting the
  field-not-slab bites. The row's "lava is an OPT-IN register with its OWN looser π, the cage stays the DEFAULT"
  is the only honest path (presets-in-consumers; the contained bead is the library identity). KEEP.
- **`W-BLOB-RENAME` as an atomic FIRST wave with a DAG edge before MULTICORE/EMOTION/DOT-UNIFY is correct.** The
  hard predecessor edge is real: `goo-dot.frag.ts:18`/`goo-dot.wgsl.ts:26` import from `../../goo-blob/shaders/…`
  + `useGooDotMatrix.ts:48` from `../../goo-blob/composables/…`. The rename must move the dir + import paths +
  gate `cliPaths` + spec filenames + artefact env keys in ONE diff. NOTE the slice survives: goo-dot cuts on the
  literal `"void main()"` marker (`goo-dot.frag.ts:23` `MAIN_MARKER`), which the rename does NOT touch — so the
  byte-slice is robust, the ONLY edge is the import path string (mechanical, atomic-able).
- **The merge/split-is-emergent-smin-topology framing (§2.2) is genuinely SOTA** — the IQ smin band crossing `k`
  IS the cut, no topology bookkeeping; that is the correct van-der-Merwe model and it composes the gate-green
  `sminQuadraticG`/`sminCircularG` without re-deriving (`sdf-body.glsl.ts:67-90`). The buoyancy-as-one-scalar-τ
  convection cell is a real lava read, not a hand-wave (`framework §3.2`).

═══════════════════════ 7-LINE VERDICT ═══════════════════════
The 4-split correctly carves the god-wave (RENAME · MULTICORE+budget · EMOTION · LAVA-frozen-gates), and the
LAVA frozen-default-gates + the atomic-rename-first DAG edge are SOUND. THREE live findings remain. (1)
HARDEST — `framework §4.4` STILL asserts "~33 evals/frag," re-committing the prior critique's error: the live
shader runs `sceneDistG` inside a 24-step `softShadow2D` march (`metaball.frag.ts:197` / `.wgsl.ts:240`) →
~500 evals/frag at M=1 TODAY, ~825 at M=6 — and NO wave produces the real measured number the cap must derive
from (almost certainly: force shadow OFF in multicore, cap M≤3). (2) EMOTION is still under-scoped — `paramsFor`
drives ALL 8 motion params off arousal alone (verified: CALM vs MELANCHOLY motion-dist=0.166, hue-dist=2.42),
and the framework's §3.3 fix only adds a buoyancy axis that exists in LAVA mode, leaving the DEFAULT orbit
blob's motion arousal-only — `paramsFor` itself must be re-authored + a param-distance MATRIX gated. (3) The
framework doc CONTRADICTS the roster — it still names the CSS-filter dock-fission as `useLavaField`'s 2nd
consumer (incompatible mechanism, `useDockFission.ts:44`/`DockGooFilter.vue:19`), and the roster's substitute
(goo-dot) consumes the ORBIT `useBlobSatellites`, not the lava SIM — so the lava-sim ≥2-bar is honestly ONE;
reconcile the doc or keep lava blob-LOCAL.
