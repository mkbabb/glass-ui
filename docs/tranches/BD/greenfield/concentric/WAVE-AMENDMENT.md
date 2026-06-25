# Concentric — WAVE-AMENDMENT (the concrete tranche amendment)

> Reference implementation: `docs/tranches/BD/greenfield/concentric/GOLDEN.md` (hardened by
> `challenge/{1,2,3}.md`, assayed in `DELTA-ASSAY.md`). Verdict: **REFINE.** The level-set field is FIT
> and already shipped; the work is the FINISHING LAYER (opaque hypsometric fill + hillshade + two-tier
> index/minor ink + per-mode warm ground + velocity cursor-heave) on the KEPT fragment, plus a gate
> rewrite, a preset purge, and a stale-doc de-stale. Reconciled against the extant 116-wave set — NO
> duplicative work. One AMEND (the stale levelset wave) + one HARDEN (teal-purge) + one NEW wave.

---

## A. AMEND — `BD.W-CONCENTRIC-LEVELSET.md` (its mechanism SHIPPED; re-point at the finishing layer)

**Disposition: AMEND in place (its body is STALE — do NOT author a parallel "levelset" wave).**

**Why:** the wave specs the `ringField.ts` → `field:"rings"|"levelset"` field-source SWAP as future
work. HEAD has ALREADY done it — `ringField.ts` is gone, `levelField.ts` is the level-set oracle, the two
shaders transcribe it, there is no `rings` mode, no opt-in axis. The wave's mechanism (§1-§3) and its
gate clauses keyed to `sampleRingField`/`field:"levelset"`/`levelJitter` describe a surface that no longer
exists. Its real fences survive; its stale ones are excised.

**KEEP (re-state to HEAD):**
- The shared-basis fence (`waveField`+`curlFBM` single-source, no second noise basis).
- The kept-`contourInk` fence (the level-set extraction operator is byte-frozen; only the field/width it
  is FED changes — a re-derivation REDs).
- The numeric-parity fence (`shader-eval-harness.assertParity`, JS↔WGSL↔GLSL ΔE ≈ 0, the false-green
  name-presence C3 retired).
- DEPENDS `BD.W-FIELD-ENGINE` + `BD.W-WAVE-FIELD-HARNESS` (the basis + the harness — predecessor edges).

**EXCISE (stale — the swap already shipped):**
- The `field: "rings" | "levelset"` opt-in axis (L1/L2) — there is no rings mode; the level-set is sole.
- The byte-identical-default clause (L2) — there is no prior default to preserve.
- `sampleRingField`/`buildRingFamily`/`axisRatio` naming throughout.
- `levelJitter(round(F·N))` as the per-level distinctness mechanism — SUPERSEDED by the two-tier
  index/minor hierarchy (a richer, map-grammar distinctness; see the NEW wave §C).

**RE-POINT the body at the GOLDEN finishing layer** (the live work): opaque hypsometric fill + `tanh`
tone + analytic hillshade + two-tier index/minor + per-mode warm ground + velocity cursor-heave + the
preset purge + the doc de-stale. Cite `GOLDEN.md` as the reference implementation. The actual finishing
build + its born-RED gate are authored as the NEW wave §C (so the AMEND is a doc-truth correction; the
NEW wave carries the buildable gate).

---

## B. HARDEN — `proof:teal-navy-purge` (add the concentric demo preset to the census)

**Disposition: HARDEN (a census add + a warm-divergent re-theme target).**

`demo/stories/substrates/presets.ts:67-77 CONCENTRIC_THEME_PALETTE` = `h:250/210/190` + bg `h:255` —
teal-on-navy, inside the purge band [180,270]. It is currently demo-legal (presets-in-consumers; the demo
LEADS warm via `concentric.vue useTheme=FALSE`, so it is not default-shown — the gate's T2 already guards
that). But the iOS-27 §3 "colorful field" canon wants warm-DIVERGENT, never teal. The HARDEN re-themes it
to a warm-divergent alt (sunset-coral → magenta-ember over warm-plum, all hue ∉ [180,270]) and adds the
literal to the purge census so a re-introduced cool concentric demo stop REDs. No new gate — extend the
existing `scripts/proof-teal-navy-purge.mjs` census (the DEMO_PRESETS arm).

**Self-test bite:** a `{h:210}` stop re-smuggled into `CONCENTRIC_THEME_PALETTE` → the purge census REDs.

---

## C. NEW — `BD.W-CONCENTRIC-RELIEF` (the opaque hypsometric finishing layer; born-RED)

**Band 13 (per-viz redevelopments) · depends: `BD.W-FIELD-ENGINE` · `BD.W-WAVE-FIELD-HARNESS` ·
`BD.W-CONCENTRIC-LEVELSET` (amended) · consumes `BD.W-PAGE-BACKGROUND` · depends `BD.W-CARTOON-PUNCH`
(the `--ease-cartoon-punch` heave envelope) · hardens `proof:teal-navy-purge`.**

Reference: `GOLDEN.md` §2-§5 (the spike panels are the eye-witness; the numeric witness is re-captured per
the challenge R1/D fold). The mechanism is a fragment-`main()` recomposition + tunables on the EXISTING
uniform struct (one +16B vec4) + a gate rewrite + a preset purge + a doc de-stale. **No new composable,
no new shader file, no re-fork, no second noise basis, no `field` axis.**

### The mechanism (the KEPT field, a recomposed finish)

1. **Opaque hypsometric FILL** (the load-bearing root-fix). `fs_main`/`main()` returns `alpha=1` on the
   default background. `tone = 0.5 + 0.5·tanh(H·toneGain)` (toneGain ≈ 1.6) → `samplePaletteLin(tone)`
   (the KEPT operator, warm-DIVERGENT 4-stop ramp). Deletes the `rgb*ink` over-transparent bleed
   (`concentric.{wgsl,glsl}.ts` final block) that the live `lumVar 0.0005` flatness indicts.
2. **Analytic hillshade.** One ∇H finite-diff at a SHARED `e` constant (pinned in `levelField.ts`,
   consumed by both shaders — challenge R8), dotted with a fixed cel light; `fill *= mix(1-shadeAmp,
   1+shadeAmp, shade)` (shadeAmp ≈ 0.18). 2.5-D relief.
3. **Two-tier index/minor contour.** `isIndex` = a pure `f(level)` via `floor`+`mod`+select (the form the
   spike used, NOT the discarded `step` form — challenge R5); `hw = mix(line.x, line.x·indexMul,
   isIndex)` (indexMul ≈ 1.9) is FED to the byte-frozen `contourInk` (a parameter, not a re-derivation).
4. **Ink of its own band.** `inkCol = mix(fill, fill·inkDarken, 0.85)` — the edge-of-its-own-band
   signature. `col = mix(fill, inkCol, ink)`.
5. **ONE color path** (challenge R9). The shader samples the palette it is given; per-mode is resolved in
   the CONSUMED stops + the background token (plain per-mode arms, NOT CSS `light-dark()` — the inset trap;
   NOT an in-shader `uMode` branch — no second color seam).
6. **Warm-DIVERGENT default palette** (challenge-A). `WARM_IDENTITY_PALETTE` widens 3→4 stops, multi-warm
   (deep-plum/rose → ember → amber → wheat → warm-gold; hues spanning [330..90] wrapping through red,
   NEVER [180,270]). `constants.ts` `background` default flips off `"transparent"` to a per-mode warm
   floor resolved via `bgStyle`.
7. **Velocity cursor-HEAVE** (challenge-B + R3). Scale the EXISTING `cursorWell` depth+radius by
   `usePointerVelocityField.velocity` magnitude JS-side in `packConcentricUniforms` (free — no lane). The
   cursor Gaussian gains a `smoothstep` falloff so the heave is a SOFT bulge, not the hard-edged quad the
   live dark render shows. Where reachable the well-engage rides the `--ease-cartoon-punch` pre-dip→
   overshoot shape (the curve a spring cannot give — design.md:309). Index contours pack around the bulge
   automatically (1/|∇H|).
8. **Contour continuity under heave** (challenge R4). `aaW` floors against a DPR-aware minimum so the
   index line stays continuous where the heave packs contours (steep `|∇H|` saturates `fwidth`).

### The uniform-lane HONESTY (challenge R2/C)
Add ONE `tune: vec4<f32>` (toneGain, shadeAmp, indexMul, inkDarken); fold `lightDir.xy`/`indexEvery` into
the spare `norm.zw`/`line.w`. Bind GROUP unchanged; struct grows +16B via the single-source layout table;
`CONCENTRIC_UNIFORM_BYTES` 208 → 224. `velocityHeave` is JS-side. **`castLen`/cel-cast is CUT** (no parked
lane — challenge R6; a future wave if wanted). Honest: 4 new scalars in 1 new vec4 + 3 folded; no new bind
group.

### The gate — REWRITE `proof:concentric` (born-RED → GREEN; painted-pixel, NOT name-presence)
The stale ring-engine gate is DELETED clause-by-clause (it asserts `sampleRingField`/`ringField.ts`/
`axisRatio`/`ringIsolineInk`/`buildRingFamily`/`ellipsoidalGradMag` — 0 of these exist; it is RED + exits
1 today, the born-RED witness). Reborn against the level-set + finishing surface; `tags:["local","ci"]`.

- **L1 — field source is the shared level-set topography.** `sampleHeight` reads `heightField(waveFlow(...))`
  over the SHARED `waveField`+`curlFBM` (no re-forked basis). A re-fork REDs.
- **L2 — the ring engine is GONE + the ellipsoid copy purged.** NO `sampleRingField`/`buildRingFamily`/
  `ringField.ts`/`axisRatio`/`ringIsolineInk`/`ellipsoidalGradMag` anywhere in live `src/.../concentric/`
  **NOR in `demo/stories/manifest.ts`** (challenge-2 R2 — the census includes the manifest) NOR the README
  / `useConcentric.ts:60` docstrings. A re-introduced ring/ellipsoid symbol REDs (no-legacy fence).
- **L3 — `contourInk` is byte-frozen.** Body (comment-stripped) identical WGSL↔GLSL, FED a per-level width
  parameter (`hw`), not re-derived. A re-derived isoline operator REDs.
- **L4 — the finishing layer is pure + OPAQUE.** The fragment returns `alpha=1` on the default background
  (NOT `rgb*ink`); `isIndex`/`lvl` read NO accumulation buffer; the hillshade is a read-only ∇H re-sample
  at the SHARED `e`; the ramp composes the KEPT `samplePaletteLin` (no second color seam, no in-shader
  `uMode` branch). A lines-over-transparent regression, a stateful index buffer, a second palette, or an
  in-shader per-mode color branch REDs.
- **L5 — warm-DIVERGENT identity, no teal/navy, both modes.** `constants.ts` carries NO hue ∈ [180,270];
  the default `WARM_IDENTITY_PALETTE` spans ≥N distinct warm hue bins (a single-bin amber wash REDs — the
  hue-SPREAD floor, challenge-A); the demo preset is warm-divergent (the purged `CONCENTRIC_THEME_PALETTE`).
  Inherits `proof:teal-navy-purge`. A cool hue OR a monochrome-amber collapse REDs.
- **L6 — transcription closes NUMERICALLY.** `shader-eval-harness.assertParity` for `sampleHeight` + the
  finishing read (`tone`/`fN`/`lvl`/`isIndex`/`shade`) JS↔WGSL↔GLSL ΔE ≤ bar, sampled at the level-boundary
  lattice (lvl = 4.999/5.0/5.001 for `isIndex`, plus the `tanh` saturation tails — challenge R5). A
  `tanh`-gain drift, a sign-flipped hillshade, or a `mod`/index-hash drift in ONE backend REDs (NOT a
  `/fn name/.test()`).

**Self-test bites:** (a) re-forked `valueNoise` → L1 RED; (b) re-introduced `sampleRingField` OR a live
"ellipsoid rings" manifest string → L2 RED; (c) re-derived `contourInk` → L3 RED; (d) `rgb*ink`
transparent-output regression OR an in-shader `uMode` color branch → L4 RED; (e) `h:240` in constants OR a
single-bin amber wash OR `h:210` left in the demo preset → L5 RED; (f) `tanh`-gain or boundary-`isIndex`
drift in WGSL only → L6 RED.

**Born-RED on HEAD:** L2 (the gate currently asserts ring symbols that are gone — and the manifest STILL
says "ellipsoid rings"), L4 (the live output IS `rgb*ink` over transparent — `lumVar 0.0005` flatness),
L5 (the default palette is single-family monochrome amber; the demo preset is still teal-navy), L6 (the
current C3 is name-presence). GREEN only after the finishing layer + the warm-divergent palette + the
de-stale + the numeric parity land.

### The binding π — `tests-visual/concentric-relief.spec.ts`
Painted-pixel readback, BOTH modes + the **webkit project** (the GLSL twin paints on Safari), over the
live `BD.W-PAGE-BACKGROUND` field, NEVER `reducedMotion` except the PRM arm. **A non-cleared-buffer
precondition FIRST** (`nonzeroFrac > 0.9` before any assert — challenge R4/D; the live dark readback hit
samples=0, the exact gotcha). Each verdict ships a captured DELTA artefact (screenshot + paired-π —
`live-verify-capture`). The floors are set from the HONEST spike re-capture (the committed witness is
born-dead — challenge R1/D; re-shoot reading the drawn context after ≥2 rAF over the painted interior,
strike "PIXEL-PROVEN" until the panel numbers match the table):
1. **VIVID, not gray** — avgChroma > floor, grayFrac < 0.15, both modes.
2. **WARM-DIVERGENT** — warmFrac > 0.40, hue histogram entirely ∉ [180,270] AND occupying ≥N warm bins (a
   single-bin amber wash FAILS — challenge-A).
3. **TRUE level-sets, NOT circles** — non-constant inter-line spacing along a radius (a circle-proxy
   false-passes).
4. **TWO-TIER contour** — an index-line pixel is detectably bolder than an intermediate-line pixel.
5. **RELIEF reads** — luminance variance across the fill clears a floor (the live `lumVar 0.0005` is the
   born-fail baseline).
6. **ALIVE** — two frames Δt apart differ above a motion floor; under PRM identical (the freeze).
7. **CURSOR HEAVE, SOFT + CONTINUOUS** — a synthetic pointer move produces local contour-spacing
   compression (squash) with NO luminance step-discontinuity at the well boundary (C1-smooth — challenge
   R3) AND the index line stays continuous (max gap below floor — challenge R4).
8. **LIVE WARM GROUND** — a non-uniform live field behind the viz (inherits `proof:page-background`).

Born-FAIL on HEAD (the live screenshots `delta-head-canvas-{light,dark}.png` of anemic faint contours on
a flat plate, `lumVar 0.0005`, are the born-fail witness).

### The doc de-stale (folded into this wave)
`manifest.ts:657` ("ellipsoid rings / radial Fourier ring-interference / ellipsoidal norm"),
`useConcentric.ts:60` ("the ONE math source `ringField.ts`"), `README.md`, the `Concentric.vue`
StoryHero → "living level-set hypsometric survey." The gate L2 census enforces it.

---

## D. NO-OP (cited for completeness — reconciled, no edit)

- **`BD.W-PAPERGRID-WARP.md`** — DISJOINT/kindred; concentric inherits the +1 warp octave via the shared
  leaf. No re-deepen here.
- **`BD.W-CONCENTRIC-RADIUS.md`** — ORTHOGONAL namespace (`--radius-concentric` CSS register, not the
  viz). Its own §3 fence already disclaims the collision. No edit.
- **`BD.W-PAGE-BACKGROUND`** — CONSUMED (the warm-mesh page chassis), not duplicated. Concentric now
  CONTRIBUTES a field (opaque) rather than revealing a flat plate.
- **`BD.W-FIELD-ENGINE` / `BD.W-WAVE-FIELD-HARNESS`** — predecessor edges (basis + harness), KEPT.

## E. SUMMARY OF TOUCHED WAVES
- **AMEND:** `BD.W-CONCENTRIC-LEVELSET.md` (stale swap → finishing-layer re-point).
- **HARDEN:** `proof:teal-navy-purge` (concentric demo preset census + warm-divergent re-theme).
- **NEW:** `BD.W-CONCENTRIC-RELIEF` (opaque hypsometric finishing layer; gate `proof:concentric` REWRITE
  L1-L6 born-RED, painted-pixel π both modes + webkit).
- **PRUNE/EXCISE:** none (the levelset wave is amended, not pruned; no parallel fork created).
