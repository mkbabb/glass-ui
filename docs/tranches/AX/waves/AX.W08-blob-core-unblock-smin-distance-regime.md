# AX.W08 — Blob core unblock: re-derive the smin distance regime, un-flood the SDF

**Band** B · GRAPHICS · **Severity** blocker (co-headline) · **dependsOn** AX.W00 · **Charter** AX.md §3
(the `### AX.W08` block, lines 579-614) + §4 note 13 (the POS_SCALE disposition, lines 2069-2082) + §2b
band-B precept row (line 214) · **Audit** `deep-audit-corpus.json` slice `blob-breakage` (index 11,
findings F0-F3 + the ROOT-CAUSE-LOCKED notes) + `constellation-analysis-corpus.json` slice
`harden:dock-graphics` (index 28, finding F0 the POS_SCALE-contradiction blocker + F6 the
parallelization note) + slices `idiom:value.js` F3 / `leverage:value.js` F5 (the value.js goo-blob fork,
gated behind this wave, routed to W16/W34).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED on a **rendered-pixel** witness that does NOT exist at HEAD `eaba94f`. The blob is
**TOTALLY BROKEN — confirmed live on all three blob stories** (`/substrates/goo-blob`, `/blob-interaction`,
`/blob-mood`): it paints a **giant canvas-filling rounded slab hard-clipped at the top/right/bottom edges**,
not a contained gooey droplet. No console error, no GL-context loss, the shader COMPILES, and the W9.b lit
rim + W11.a iridescence sheen paint CORRECTLY on the visible curved edge — the defect is purely **geometric
over-merge**.

- **RED witness 1 (the headline — empirically-proven, device-instrumented).** The W9.a smin-normalization
  refactor (commit `799d5a8`, merge `a47d293`) added `k *= 4.0` to `sminQuadratic`
  (`sdf-body.glsl.ts:29`) so the blend band reads in true distance units, and DELETED the renderer's `/0.22`
  magic normalizer AND the `POS_SCALE` multiply on the `uSmoothK` upload — but the THREE coupled inputs were
  NEVER re-tuned for the new regime. Live, in-page reproduced: `config.smoothK * (params.smoothK /
  DEFAULTS.smoothK)` = `0.12 * (0.216 / 0.12)` = **uploaded `uSmoothK` ≈ 0.216**; the in-shader `k *= 4.0`
  makes **effective `k` ≈ 0.864** in a 1.0-wide UV space (half-extent 0.5) — a seam-pull of 0.216 distance
  units, **≈ 6.28× the old working band** (effective 0.1375, seam-pull 0.034). `min(a,b) - 0.216` floods the
  composite SDF **negative (inside) across nearly the whole canvas** → alpha = 1 everywhere → the slab. The
  falsifiable RED assertion: *mount GooBlob with `BLOB_CONFIG_DEFAULTS`, drive N frames, read back the
  canvas — at HEAD the opaque fraction is `> 0.9` (flood), the painted region touches all four canvas edges
  (hard clip), and there is no center-vs-corner alpha gradient (a slab, not a field). After the wave:
  opaque fraction lands in a contained band (~0.25-0.6), a transparent margin exists at every edge, and a
  center-vs-corner gradient is present (GREEN).*

- **RED witness 2 (the false gate — the canonical AW false-green).** `scripts/proof-blob-smin-normalized.mjs`
  is **GREEN at HEAD while the blob is totally broken**. Its two clauses are (1) a grep that the `/0.22` +
  `POS_SCALE` fudges are GONE — *which is exactly the change that broke the render* — and (2) a pure-math
  `k`-sweep asserting the smin function's seam-depth == k in isolation. Neither composes
  `config.smoothK * params.smoothK / DEFAULTS` against the body radius, neither renders a pixel. The gate
  certified the very deletion that shipped the regression. RED: the documented "smin is normalized" contract
  is GREEN over a flooded live field. (Every blob W9-W11 gate is static/pure-math — `gradient-unit-length`,
  `spec-premult`, `space-gamma`, `mood-resolved`, `tempo-suppression`; none renders a pixel.)

- **RED witness 3 (the missing POS_SCALE asymmetry — grep-falsifiable, length-coherence).**
  `useMetaballRenderer.ts:438-439` uploads `uSmoothK` **WITHOUT** `* POS_SCALE`, while every other
  length-like uniform carries it: `uBodyRadius` (`:404`), satellite radius (`:495`), `uPointer`/velocity
  (`:363`/`:376-377`/`:393-396`), `noiseAmp` (`:423`) all multiply by `POS_SCALE` (= `1 / 1.6`, the 0.625
  inner-region compression). The smin band **is** a length and must ride the same compression — the
  asymmetry is the second half of the flood. RED: `grep "uSmoothK" useMetaballRenderer.ts` shows the upload
  on the bare composed value with no `* POS_SCALE`; every sibling length carries it.

- **RED witness 4 (doc-rot + dead spring keys — corroborating warts).** `goo-blob/README.md` documents the
  DEAD pre-W9 regime: `:91` example `smoothK: 0.28`, `:142` `default 0.22`, `:310`/`:322` further dead values —
  while `BLOB_CONFIG_DEFAULTS.smoothK` is now `0.12` (`types.ts:167`) under changed band semantics.
  `useBlobPointer.ts:46` constructs `SpringProgress` with `{ from: 0, to: 0, … }` keys that do NOT exist on
  `SpringProgressOptions` (it uses `initial`) — silently ignored, benign, but a dead/wrong option pair.

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN. **Method caveat (audit-cited):**
WebGL `readPixels`/`drawImage` returns 0 against this substrate (`preserveDrawingBuffer: false` clears
post-composite + the demand-loop parks) — the gate MUST render with a `preserveDrawingBuffer: true` test
context (the π workspace's `proof:substrate-paints-color` harness already does this) or assert on the
on-screen screenshot; do NOT trust naive readback against the live demand-loop.

---

## Goal

The blob renders as a **CONTAINED, bounded, gooey metaball droplet** — a single coherent `uSmoothK` distance
regime (re-tuned config default + mood multiplier + restored `POS_SCALE` compression) lands a tight wet
meniscus instead of a canvas-flooding slab, locked by a rendered-pixel gate that supersedes the
isolated-math gates.

---

## Scope (the gestalt fix — a SCALE re-derivation, not a magic-number patch, not a shader rewrite)

The audit ROOT-CAUSE is LOCKED with empirical proof: this is **NOT** a blank canvas, a failed shader compile,
a broken import, or a spring-API mismatch (all verified sound) — it is a **geometric over-merge** with three
coupled-input regressions and one missing compression. The lit rim / iridescence / OKLCh splice / palette
indexing / surfaceNormal all execute CORRECTLY and are salvageable as-is. One cohesive re-derivation:

1. **Re-derive the composed `uSmoothK` against the post-normalization `k` semantics (F0 — blocker root).**
   The uploaded `uSmoothK` is `config.smoothK * (params.smoothK / DEFAULTS.smoothK)`; the in-shader `k *= 4.0`
   then quadruples it. Re-tune **`BLOB_CONFIG_DEFAULTS.smoothK`** (`types.ts:167`, currently `0.12`) **and**
   the **`useBlobMood` smoothK lerp range** (`useBlobMood.ts:45`, currently `lerp(0.16, 0.32, arousal)` — left
   UN-rescaled across the W9.a regime change) so the COMPOSED uploaded value lands a tight wet meniscus:
   target **effective seam-pull ~0.03-0.08** (matching the pre-AW working 0.034), i.e. a default `smoothK`
   ~0.04-0.05 and a mood range scaled down ~5× from the live 0.216. This is the gestalt re-derivation: the
   config default and the mood lerp are re-solved as ONE budget against the `k *= 4.0` + `POS_SCALE` regime,
   not nudged.

2. **Reframe the mood smoothK as a unitless 1.0-centred MULTIPLIER, not an absolute distance (F0(d)).** The
   renderer comment already treats it as `params.smoothK / DEFAULTS.smoothK` (a ratio). Make that explicit:
   store the mood smoothK as a 1.0-centred scalar (`lerp` around 1.0, e.g. `lerp(<lo>, <hi>, arousal)` where
   1.0 is idle), so a future config retune does NOT silently re-scale every mood band. The single absolute
   distance lives in `BLOB_CONFIG_DEFAULTS.smoothK`; mood multiplies it.

3. **Restore `POS_SCALE` on the `uSmoothK` upload (F0(b) — the length-coherence fix; §4 note 13 DECIDED).**
   Re-apply `* POS_SCALE` to the `uSmoothK` upload (`useMetaballRenderer.ts:438-439`). The smin band IS a
   length and MUST ride the same 0.625 inner-region compression as every other length-like uniform
   (`uBodyRadius`/satRadius/orbit/pulse/noise) — the W9.a deletion of POS_SCALE-**on-smoothK** was the error;
   the `/0.22` deletion was fine. This is the **MINIMAL un-flood**: it makes the smin band coherent with the
   coordinate system every other length already uses. **W08 does NOT excise POS_SCALE** (see the POS_SCALE
   DISPOSITION block below — that gestalt is W15's atomic job).

4. **Drop the dead `from`/`to` spring keys (F3 — cosmetic).** `useBlobPointer.ts:46` `{ from: 0, to: 0, … }`
   — `SpringProgressOptions` has no `from`/`to` keys (it uses `initial`); silently ignored, harmless. In the
   cleanup pass read `initial: 0` (or omit), and grep `from:.*to:.*response` to confirm the pattern isn't
   copied elsewhere. No functional change; removes a misleading option pair.

5. **Sync the README dead regime (F2 — minor doc-rot).** Correct every dead `smoothK` value in
   `goo-blob/README.md` (`:91` `0.28`, `:142` `default 0.22`, `:310` `0.26`, `:322` `0.3`) to the reconciled
   W08 defaults, and document the `uSmoothK` distance-regime + the `POS_SCALE` compression explicitly so a
   consumer reasons about the merge band correctly. (The full research-backed README rewrite — SDF/IQ-smin
   lineage, OKLCh lit-droplet rationale, the README-defaults-currency gate — is the blob band's README close,
   routed to **W16**; W08 only un-rots the values it changes.)

## SOTA deepening (blob research)

The 32-facet blob corpus (`docs/tranches/AX/research/blob-research-corpus.json`, synthesis
`blob-synthesis.md`) makes the W08 root cause **DEFINITIVE** and the fix a measurable re-solve, not a
magic number. The facets unanimous on the un-flood: **smin-distance-regime [1]**, **containment [25]**,
**perf-budget [29]**, **goo-aesthetics [30]**, **affordance [23]**, **mood-model [14]**, **auto-mood-arcs [15]**,
**domain-warp [4]**, **analytic-gradients [2]**, **OKLCh-palette [13]**.

- **IQ-2024 NORMALIZES smin so `k` IS the max merge-inflation — this is the load-bearing fact ([1][25][29][30]).**
  IQ's 2024 rewrite pre-scales `k` by the kernel's `1/g(0)` (quadratic `k*=4.0`, with `g(0)=1/4`; circular
  `k*=1/(1-sqrt(0.5))`) so the parameter equals EXACTLY the maximum surface inflation in distance units — the
  seam dip at `a==b` is exactly `k`. `sdf-body.glsl.ts` ships this VERBATIM-correct (validation, not a change).
  The flood is therefore NOT a shader bug; it is a unit-regime mismatch in the JS `k` fed in. **The composed
  flood math, named precisely ([1][4]):** the uploaded `uSmoothK = config.smoothK × (mood.smoothK / DEFAULTS.smoothK)`
  = `0.12 × (0.216/0.12)` = `0.216`; the in-shader `k*=4.0` makes effective `k ≈ 0.864` in a 0.5-half-extent UV
  → every merged seam pulled `~0.86` units inward → `min(a,b) − k` drives the composite SDF **negative across the
  whole canvas** → `alpha=1` everywhere = the 84%-coverage slab. IQ's own proof of WHY this floods globally:
  the polynomial smin is **NON-LOCAL** ("lack of rigidity" — its effect "spans to infinity," underestimating
  the field even for shapes far apart [23]), so an over-large `k` floods non-locally, not just at one seam.

- **The fix is to RE-SOLVE the composed `k`, measurably — NOT a magic number ([1][25][29]).** Solve
  `k_effective = smoothK × mood_multiplier × POS_SCALE × 4.0` (the in-shader pre-scale) targeting the
  **~0.03-0.08 of the half-extent** wet-meniscus band (the pre-AW oracle ran `0.034`; commit `067473c`,
  effective `0.1375`). That lands a default `smoothK ~0.04-0.05` + a mood multiplier `~5×` down from the live
  `0.216`. The corpus targets are the same `~0.03-0.08` the spec already names — the research CONFIRMS the band,
  it is not a guess. The Codrops `k=7` premium-droplet reference is NOT a counter-example: it runs in a sub-unit
  coordinate space (`baseRadius = 8e-3`, so `k` is ~875× the radius yet contained because the WHOLE scene is
  sub-unit) — the lesson is **`k` is meaningless in isolation; it is a RATIO against the body/satellite radii**,
  which is exactly the re-solve [30]. Containment direction is confirmed: **smaller effective `k` = more
  contained** (the circular variant gives roundness at a SMALL `k`; raising `k` for roundness always floods [1]).

- **POS_SCALE on the band is LENGTH-COHERENCE, not a fudge ([1][25][29]).** Every length-like uniform rides
  `POS_SCALE = 1/1.6 = 0.625` (body `:404`, satRadius `:495`, pointer `:363`, noiseAmp `:423`, pulseAmp `:417`);
  `uSmoothK` alone (`:437-439`) does not. The smin inflation is measured in the SAME UV space as the radii, so it
  must carry the same compression or it is `1.6×` oversized relative to every other length — the second half of
  the flood. Restoring `* POS_SCALE` is the MINIMAL coordinate-system fix. **POS_SCALE recommended resolution
  (charter §4 note 13):** the corpus ratifies the spec's path — W08 takes the MINIMAL un-flood (restore POS_SCALE
  + re-solve the band), W15 KEEPS W08's POS_SCALE regime and budgets geometry on top of it (drop slice-12's
  "excise the fudge" language as scope-creep); a full raw-normalized re-expression, IF ratified, is ONE ATOMIC
  re-derivation of the entire cohort (body/sat/orbit/smin/noise) with `proof:blob-render` as the lock — **never a
  partial migration that re-floods across the wave seam** [1][25][4][15]. This is the highest-risk hazard in the
  blob band; the research names it the single highest-risk trap.

- **Mood-as-multiplier kills the split-length regime ([1][14][15]).** The renderer already treats mood smoothK
  as the ratio `params.smoothK / DEFAULTS.smoothK`; SOTA authors it directly as a 1.0-centred multiplier
  (`lerp(0.85, 1.35, arousal)` — excited gooier, sleepy crisper) so there is ONE length authority (the
  POS_SCALE'd config band) and ONE unitless modulator (mood). The `/0.015` (pulseAmp `:416`) and `/0.025`
  (noiseAmp `:423`) magic divisors are the SAME smell — they exist only because some MoodParams are absolute and
  some are multipliers. Convert EVERY mood param that scales a config field to a 1.0-centred multiplier; the
  config holds the absolute, mood scales it. The circumplex model itself ([14][15] Russell valence/arousal) is
  SOTA-correct and PRESERVED — only the smoothK-as-multiplier reframing changes here.

- **The gate is structurally blind to a flood ([1][2]).** `proof:blob-smin-normalized` clause-1 *forbids*
  POS_SCALE on `uSmoothK` — W08 MANDATES it, so the gate REDs on the fix unless re-pointed (keep only the
  `/0.22` fudge-deletion clause; re-point clause-1). A static k-sweep renders zero pixels; the real lock is the
  render-and-readback `proof:blob-render` (opaque-fraction `0.25-0.6`, a transparent margin off all four edges,
  a centre-vs-corner gradient = a field, not a slab). Naive `readPixels` returns 0 against this substrate —
  the gate MUST use `preserveDrawingBuffer: true` [25]. Corpus flags the SECOND structurally-blind gate W15
  will own: `proof:blob-gradient-unit-length` ports only the Z-dome lift and ASSUMES `grad2d` is unit — it ships
  green over a wrong-DIRECTION gradient on the real warped+smin field [2]. W08 does not touch it (shaders are
  out of bounds), but the W08 artefact should flag it as the same false-green class.

- **Analytic-gradient smin DELETES the 4-tap normal (routed to W15, foreshadowed here [2]).** The IQ
  value-AND-gradient primitives (`sdgCircle` returning `vec3(d, p/d)` with `p/d` unit-length free; `vec3 smin`
  propagating `mix(a.yz, b.yz, h)`) let `sceneDist` return `vec3(dist, grad)` so `surfaceNormal` reads `grad2d`
  DIRECTLY — DELETING the 4 extra `sceneDist` evals per lit pixel (each running 3-octave FBM ×2 + the sat/trail
  loops ≈ a `~4-5×` field-cost cut on the normal). `noised()` already returns its analytic gradient in `.yz`,
  so the FBM membrane chains in via `circleGrad − amp*fbmGrad` (chain rule). W08 does NOT land this (out of
  bounds — `sdf-body.glsl.ts`/`metaball.frag.ts` are W15's), but it is the keystone quality+perf lever the W08
  un-flood makes worthwhile, and it is recorded here so W15 inherits the routing.

### POS_SCALE DISPOSITION (decided ONCE — W08 owns it, W15 inherits; §4 note 13)

This is the resolution of the `harden:dock-graphics` F0 **blocker contradiction**: W08 (slice-11) and W15
(slice-12) inherited mutually-exclusive source directives — W08 "re-apply POS_SCALE … its W9.a deletion was
the error"; W15 "drop POS_SCALE as a hidden fudge, express every length in wrapper-normalized units." The
asymmetry is real and verified live (`:438-439` no `*POS_SCALE` vs `:404`/`:495`/`:363`/`:423` all carry it).

**DECISION (charter §4 note 13, line 2075):** W08 takes the **MINIMAL un-flood** — restore `POS_SCALE` on
`uSmoothK` + re-tune the composed band to ~0.03-0.08 effective — to clear the blocker FAST. **W08 does NOT
excise POS_SCALE.** The full "express every length in raw wrapper-normalized units / bake the 0.625
compression into the constants" gestalt (slice-12) is the SURVIVING regime but is **W15's job**: W15 either
KEEPS W08's POS_SCALE regime (dropping slice-12's "eliminate the fudge" language as scope-creep → §J) OR, IF
it re-expresses all lengths in wrapper-normalized units, re-derives the **ENTIRE length cohort
(body/sat/orbit/smin/noise) ATOMICALLY** in that wave with `proof:blob-render` as the regression-lock —
**never a partial migration that re-floods across a wave boundary**. W08's spec carries this line so W15
inherits, not contradicts, it. The no-workaround / one-coherent-regime precept is satisfied because the fudge
is removed (if at all) in ONE atomic re-derivation, never split across the wave seam.

### NOT in scope (routed elsewhere — no scope-creep)

- **Geometry containment against the footprint** (body/orbit/satellite radii solved as one budget so the
  WHOLE merged field fits the box; lit warm-cream default; living-membrane edge) — that is **W15**
  (slice-12, blob-interaction-visual: 84.1% canvas coverage, ~1.34× footprint). W08 UN-FLOODS the smin
  over-merge (the slab); W15 PERFECTS the contained-droplet look on the un-flooded field. The two are
  sequential — W15 dependsOn W08.
- **Pause/resume seam restore, demand-gate quiescence, shared-context multi-instance, the `var()`-unwrap
  leaf, the research-backed README, the value.js fork repatriation** — all **W16** (blob integration/perf).
- **The value.js goo-blob fork retirement** (`demo/@/components/custom/goo-blob/` + the 343-line local
  `useMetaballRenderer` + 3 mount sites) is gated behind W08/W15/W16 landing the contained lit droplet;
  the consumer-adoption edit routes to **W34** (value.js consumes `@mkbabb/glass-ui/goo-blob` through the
  injected ColorResolver seam). W08 writes NO sibling source.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/goo-blob/types.ts` | Re-tune `BLOB_CONFIG_DEFAULTS.smoothK` (`:167`, `0.12` → ~0.04-0.05) against the re-derived regime; update the `:164-166` comment block to the reconciled band semantics. |
| `src/components/custom/goo-blob/composables/useBlobMood.ts` | Re-express the smoothK mood lerp (`:45`, `lerp(0.16, 0.32, arousal)`) as a unitless **1.0-centred multiplier** scaled ~5× down. |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | Re-apply `* POS_SCALE` to the `uSmoothK` upload (`:438-439`); update the `:429-436` upload comment to document "smin band rides POS_SCALE like every other length." |
| `src/components/custom/goo-blob/composables/useBlobPointer.ts` | Drop the dead `from`/`to` keys (`:46`); read `initial: 0` or omit. |
| `src/components/custom/goo-blob/README.md` | Sync the dead smoothK regime values (`:91`, `:142`, `:310`, `:322`) to the reconciled defaults + a short distance-regime/POS_SCALE note. (NOT the full §3.5 research rewrite — that is W16.) |
| `tests-visual/blob-render.spec.ts` | **NEW** — the born-RED π-lane rendered-pixel blob spec (opaque-fraction band + edge-clearance + center-vs-corner gradient), sibling to W00's `substrate-paints-color.spec.ts` and W07's `aurora-*.spec.ts`. |
| `scripts/proof-blob-render.mjs` | **NEW** — the `proof:blob-render` gate driver (invokes the π-workspace spec). |
| `package.json` | ADD the `proof:blob-render` script entry (+ the W00 meta-gate `proof:gate-script-parity` match). |
| `docs/tranches/AX/audit/W08-blob-core-unblock.json` | **NEW** — the wave's born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |

**OUT of bounds:** `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` — the `k *= 4.0` is CORRECT (it
makes the band read in true distance units; the regression is the un-tuned *coupled inputs*, not the
shader), so the shader is NOT touched (this is a scale re-derivation, not a shader rewrite). The geometry
constants (`bodyRadius`/`orbitRadius`/satellite radii) — W15. The pause/resume seam + the
substrate/multi-instance plumbing — W16. The full research README + the README-defaults-currency gate — W16.
The aurora WGSL/`packGPUUniforms`/`WEBGPU_PARITY` surface — W07 (the disjoint sibling graphics blocker).
`scripts/proof-blob-smin-normalized.mjs` + the other static blob gates — DEMOTED to corroborating-only by
`proof:blob-render` becoming the close criterion, but NOT edited here (they stay green over the now-correct
field; the demotion is a gate-fleet-precedence note, not a deletion in this wave).

---

## Disjointness (sibling waves it must NOT overlap)

W08 is one of the THREE graphics blockers (W07 aurora, W08 blob, W09 specular) that **all dependsOn W00 only**
and run as **INDEPENDENT concurrent lanes** the instant W00 lands (digest `harden:dock-graphics` F6:
"dock-first is a PRIORITY, not a serialization"). The dispatch contract:

- **vs W07 (aurora core unblock).** **Fully disjoint by file.** W07 touches the aurora WGSL shader,
  `packGPUUniforms`, `resolveRenderModeAsync` + the new `WEBGPU_PARITY` const, the aurora storage-buffer
  transposition; W08 touches ONLY the `goo-blob/` tree. They share the **W00 π workspace** (`tests-visual/`)
  but author SEPARATE spec files (`aurora-*.spec.ts` vs `blob-render.spec.ts` — the W00 boundary, line 93) and
  SEPARATE `proof:*` entries (`proof:aurora-webgpu-render` vs `proof:blob-render`). They can run in true
  parallel. The ONLY shared file is `package.json` (both add a `proof:*` entry + the meta-gate match) —
  coordinate the two `scripts` hunks (different keys, no semantic overlap).
- **vs W09 (specular tune-to-subtle).** Disjoint by file: W09 is `glass.css`, `Card.vue`, `DockIconButton.vue`,
  `tokens.css` (the `--glass-specular-*` cohort), and `proof-glass-material-unified.mjs`; W08 never touches
  any. No collision.
- **vs W15 (blob contained-droplet geometry).** **W15 dependsOn W08** and runs AFTER it — W08 un-floods the
  smin over-merge; W15 perfects containment on the un-flooded field, touching the geometry constants
  (body/orbit/satellite) W08 explicitly leaves alone. The POS_SCALE DISPOSITION line above is the contract
  that prevents W15 re-flooding what W08 just compressed. Sequential, not concurrent. W15 also re-points
  `proof:blob-render` thresholds (footprint-fit band) — it INHERITS W08's gate, never re-authors it.
- **vs W16 (blob integration + README).** W16 dependsOn W08 + W15; it owns the pause/resume seam, the
  full research-backed README rewrite, and the README-defaults-currency gate. W08's README sync is the
  minimal value-correction; W16's is the full rewrite. No collision (W08 touches only the dead numbers).
- **vs W00 (π lane).** W00 ships `proof:substrate-paints-color` (the SHARED readPixels harness + the
  non-black/contained-band FLOOR for both aurora AND blob) + the `tests-visual` workspace. W08 COMPOSES that
  primitive in its OWN `blob-render.spec.ts` with the blob-specific assertions (opaque-fraction band tuning,
  per-edge clearance, center-vs-corner gradient). Boundary per W00 line 93: W00 owns the harness + floor;
  W08 owns the blob parity assertions in its own spec file. W08 dependsOn W00 (the lane it closes on).
- **vs W34 (cross-repo consumer adoption).** W08 authors NO value.js source; the value.js goo-blob fork
  repatriation NOTE is folded into W16/W34. W08 writes the library fix only.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — the surface is one cohesive scale re-derivation across 4 small composable/type
  edits).** Lands the re-derived `BLOB_CONFIG_DEFAULTS.smoothK`, the 1.0-centred mood multiplier, the restored
  `* POS_SCALE` on the `uSmoothK` upload, the dead-spring-key drop, and the README value sync. Iterates the
  config default + mood range against the LIVE rendered field (the wet-meniscus target ~0.03-0.08 effective)
  — this is an empirical tune, validated on the π-lane render, not a one-shot constant. Lint + typecheck at
  every interval.
- **Adversarially-verify (≤1 read-only lane).** PROVES the un-flood is real and the gate is load-bearing:
  re-runs the live RED witness against the patched tree (mount GooBlob with defaults, render N frames, read
  back — confirm opaque fraction dropped from `>0.9` flood into the contained band, a transparent margin
  exists at all four edges, a center-vs-corner gradient is present); A/B-screenshots all three stories
  (`/substrates/goo-blob`, `/blob-interaction`, `/blob-mood`) before (slab) vs after (droplet); confirms the
  uploaded `uSmoothK` now carries `* POS_SCALE` and the effective seam-pull lands ~0.03-0.08; confirms the
  lit rim + iridescence sheen STILL paint correctly (no regression of the salvageable features). **ADVERSARIAL
  twist:** tries to make `proof:blob-render` pass on a STILL-FLOODED field (a config that re-floods) and
  confirms it goes RED — i.e. proves the gate catches the very defect that shipped green under
  `proof:blob-smin-normalized`. Also re-confirms mood-driven smoothK at min/max arousal stays in-band (no
  mood preset re-floods).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `tests-visual/blob-render.spec.ts` +
  `scripts/proof-blob-render.mjs` + the `package.json` entry + the W00 `proof:gate-script-parity` match.
  Confirms `proof:blob-render` FAILS at `eaba94f` (the flood) and PASSES on the patched tree (the droplet),
  using the `preserveDrawingBuffer: true` test context (the audit's readback caveat).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:blob-render` (NEW, π-lane, fail-CLOSED, in the W00
visual-runtime workspace, DEFAULT WebGL2 engine, `preserveDrawingBuffer: true`):

- Mounts `<GooBlob>` with `BLOB_CONFIG_DEFAULTS`, drives N frames, reads back the canvas. Asserts:
  1. **Opaque-fraction in a contained band** — roughly **0.25-0.6** of the canvas (a droplet occupies a
     bounded region; NOT `> 0.9` flood, NOT `0` blank). **Born-RED at HEAD** (HEAD floods `> 0.9`).
  2. **Bounded away from all four canvas edges** — a transparent margin exists on every side (a metaball must
     not touch the canvas border at rest). **Born-RED** (HEAD hard-clips top/right/bottom).
  3. **A center-vs-corner alpha gradient exists** — a field, not a slab. **Born-RED** (HEAD is alpha = 1
     everywhere).
- Composes the W00 `proof:substrate-paints-color` readPixels primitive (the shared non-black/contained-band
  floor); the blob-specific tuning (the contained band, the per-edge clearance, the gradient) is W08's
  parity assertion in its OWN spec file.
- Demotes `proof:blob-smin-normalized` + the sibling static math gates to **corroborating-only** —
  `proof:blob-render` is the blob's CLOSING gate. (No edit to the static gates in this wave; the demotion is
  recorded as a gate-fleet-precedence note in the artefact, formalized at the W33 fleet registration.)

This is a **runtime-observation / rendered-pixel** gate (the precept-valid artefact form per SPEC.md §Hard
Gates — render-and-readback on a real device), the structural antidote to the
`proof:blob-smin-normalized`-is-green-while-broken trap. It is NOT a grep-for-source-string-as-runtime gate;
the POS_SCALE-restored / effective-seam-pull checks are computed against the *actual uploaded value composed
with the body scale*, not asserted at the input-param level (the exact gap that let the static gate ship
green over a flood).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on all THREE blob stories (`/substrates/goo-blob`, `/blob-interaction`, `/blob-mood`) at
**≥ 3 viewports** (375×667 / 1280×800 / 1440×900) in **light AND dark**:

- **Containment correctness:** the blob reads as a CONTAINED, bounded, organic gooey droplet — the
  canvas-filling slab is visibly GONE; a transparent margin frames it on every side; it does not clip at any
  canvas edge at rest.
- **Merge legibility:** the body + satellites read as a single wet-meniscus metaball (a tight seam, not a
  fused flood and not a hard split); mood-driven smoothK at low/high arousal stays a legible droplet.
- **Salvaged-feature integrity:** the W9.b lit rim (Blinn-Phong + Fresnel) and W11.a iridescence/SSS sheen
  paint correctly on the contained droplet's curved edge (the features the audit confirmed render fine —
  verify the un-flood did not break them).
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate — and crucially, the
  blob no longer OCCLUDES the surfaces behind it (the slab covered the canvas; the droplet must not).

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, the W00 protocol: the slab-before vs
droplet-after screenshots) is the binding close criterion. The cardinal AX lesson: `proof:blob-smin-normalized`
shipped GREEN over this exact flood — only the live render catches the class.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the RED witnesses against HEAD `eaba94f` on the
   live demo: render all three blob stories, capture the slab screenshots, reproduce in-page the uploaded
   `uSmoothK ≈ 0.216` → effective `k ≈ 0.864` → seam-pull 0.216 (6.28× the working band), and the missing
   `* POS_SCALE` asymmetry. Record as the born-RED baseline in `audit/W08-blob-core-unblock.json`. Do NOT
   proceed on the audit's word — re-prove the flood live (per the §4 note 12 "verify against HEAD" discipline).
2. **Author the born-RED gate.** `tests-visual/blob-render.spec.ts` + `scripts/proof-blob-render.mjs` +
   `package.json` entry (+ W00 meta-gate match); confirm it FAILS at HEAD (the flood: opaque `> 0.9`, edge
   clip, no gradient).
3. **Restore POS_SCALE + re-derive the composed band.** Re-apply `* POS_SCALE` on the `uSmoothK` upload
   (`useMetaballRenderer.ts:438-439`); re-tune `BLOB_CONFIG_DEFAULTS.smoothK` (`types.ts:167`) against the
   regime; iterate on the LIVE render toward the ~0.03-0.08 effective wet meniscus. Lint + typecheck.
4. **Reframe the mood smoothK as a 1.0-centred multiplier.** `useBlobMood.ts:45` re-expressed; confirm
   min/max arousal both stay in-band on the live render.
5. **Drop the dead spring keys (F3).** `useBlobPointer.ts:46` `{ from, to }` → `initial: 0` or omit; grep
   `from:.*to:.*response` to confirm no copies.
6. **Sync the README dead regime (F2).** Correct `:91`/`:142`/`:310`/`:322` to the reconciled defaults + a
   short distance-regime/POS_SCALE note.
7. **Gate GREEN.** Confirm `proof:blob-render` passes; run the VISUAL-TRUTH live audit across all three
   stories × ≥3 viewports × light/dark; capture the paired-π BEFORE/AFTER + DELTA (slab→droplet); write
   `audit/W08-blob-core-unblock.json` to GREEN with the demotion note for the static gates.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W08-blob-core-unblock.json` — the born-RED→GREEN ledger: the live RED witnesses
  (the three-story flood screenshots, the in-page `uSmoothK ≈ 0.216` → effective `0.864` → 6.28× reproduction,
  the missing-`POS_SCALE` asymmetry grep, the `proof:blob-smin-normalized`-green-while-broken false-gate
  record), the per-finding (F0-F3) disposition, the reconciled defaults (final `smoothK` + mood range + the
  effective seam-pull achieved), and the gate-fleet-precedence note (static gates → corroborating-only).
- `scripts/proof-blob-render.mjs` + `tests-visual/blob-render.spec.ts` — the new fail-CLOSED π-lane
  rendered-pixel blob gate (the blob's closing gate, superseding the isolated-math cohort).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the canvas-filling-slab screenshots
  (HEAD) vs the contained-droplet screenshots (after) across all three stories × ≥3 viewports × light/dark,
  with the opaque-fraction delta (`>0.9` → ~0.25-0.6) and the per-edge clearance delta annotated.
- A POS_SCALE-DISPOSITION inheritance note (echoed into the W15 spec's "POS_SCALE disposition" line so W15
  inherits the MINIMAL-un-flood regime, not contradicts it).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(blob): proof:blob-render born-RED — rendered-pixel opaque-fraction + edge-clearance + gradient gate (AX.W08)`
2. `fix(blob): restore POS_SCALE on the uSmoothK upload + re-derive BLOB_CONFIG_DEFAULTS.smoothK — un-flood the SDF (AX.W08 F0)`
3. `refactor(blob): reframe mood smoothK as a unitless 1.0-centred multiplier (AX.W08 F0d)`
4. `fix(blob): drop the dead from/to SpringProgress keys in useBlobPointer (AX.W08 F3)`
5. `docs(blob): sync the goo-blob README dead 0.22/0.28 smoothK regime to the reconciled defaults (AX.W08 F2)`
6. `chore(AX.W08): audit ledger GREEN + paired-π slab→droplet BEFORE/AFTER + DELTA capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause (K W0). These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — HARD (the sole dependency).** The fail-CLOSED π workspace
  (`tests-visual/`) is the home of `proof:blob-render` and the binding live-audit close criterion; W08
  COMPOSES W00's `proof:substrate-paints-color` readPixels harness + non-black/contained-band floor. W08
  cannot close on a headless gate alone — W00 stands up the lane it closes on, and W00 explicitly enumerates
  the blob W9/W10/W11 browserVerify items as named re-probe obligations (so the flood is not silently
  assumed-done). Charter §3 dependsOn = AX.W00; this is the ONLY dependency (W08 is a single-surface,
  independently-root-caused graphics blocker — it does NOT depend on the dock band W01-W06; it runs
  concurrently with W07/W09 the instant W00 lands, per digest F6).
- **Downstream:** **AX.W15** dependsOn W08 (the contained-droplet geometry perfects the un-flooded field;
  inherits the POS_SCALE MINIMAL-un-flood regime + the `proof:blob-render` gate). **AX.W16** dependsOn
  W08 + W15 (pause/resume seam, research README, value.js fork repatriation). **AX.W34** receives the
  value.js goo-blob fork consumer-adoption note (gated behind W08/W15/W16 landing the droplet).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`799d5a8`** (W9.a smin-normalization) — the REGRESSION's first half. Added `k *= 4.0` to `sminQuadratic`
  (`sdf-body.glsl.ts:29`) so the blend band reads in true distance units (CORRECT in itself), and DELETED the
  renderer's `/0.22` magic normalizer AND the `POS_SCALE` multiply on the `uSmoothK` upload — but left the
  THREE coupled inputs (config default, mood lerp, POS_SCALE) un-reconciled for the new regime. The `/0.22`
  deletion was fine; the POS_SCALE-on-smoothK deletion was the error.
- **`953fdf4`** + merge **`a47d293`** (W9 cohort) — where the un-reconciled regime shipped. The config default
  dropped `0.22 → 0.12` (`types.ts:167`) but the mood smoothK lerp was LEFT at `0.16-0.32` (`useBlobMood.ts:45`)
  un-rescaled, so the composed upload lands `0.12 * (0.216 / 0.12) = 0.216` → effective `0.864` → the flood.
- **`067473c`** (pre-merge ORACLE — the last working blob) — `useMetaballRenderer.ts:273` uploaded
  `((config.smoothK * params.smoothK) / 0.22) * POS_SCALE` with config default `0.22`, mood `0.16-0.32`, and
  the smin with NO `4×` → a working effective `k` of **0.1375**, seam-pull **0.034** (the tight meniscus W08
  re-derives back to). This is the regime W08 reconstructs in the NEW (post-`k*=4.0`, POS_SCALE-restored)
  coordinate system.
- **The W9-W11 static-gate cohort** (`proof-blob-smin-normalized.mjs` + `gradient-unit-length` / `spec-premult`
  / `space-gamma` / `mood-resolved` / `tempo-suppression`) — all pure-math/static analyzers that test shader
  sub-properties in isolation; NONE renders a pixel. `proof:blob-smin-normalized` shipped GREEN by grep-ing
  the exact fudge-deletion that broke the render + a pure-math k-sweep — the canonical AW
  headless-green/visually-broken false-green that AX exists to close. The `proof:blob-render` rendered-pixel
  gate is the structural antidote.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the config-invariant
  canvas-filling slab is live-proven here across all three stories (the audit's saved screenshots
  `blob-goo-blob-story.png` / `blob-interaction-story.png` / `blob-mood-story.png`).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-B binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / one coherent distance regime (no-legacy, no-workaround).** The fix reconciles the `uSmoothK`
  pipeline as ONE coherent distance regime — the config default, the mood multiplier, and the POS_SCALE
  compression are re-solved as a single budget against the `k *= 4.0` semantics, NOT patched as three
  independent magic numbers. The smin band is brought onto the SAME coordinate system every other length-like
  uniform already uses (no asymmetric special-case for smoothK). MUST NOT introduce a second normalizer or a
  per-config fudge (the `/0.22` magic normalizer stays deleted — it was the right deletion). The POS_SCALE
  DISPOSITION makes the (eventual) fudge-removal a SINGLE atomic re-derivation (W15), never a partial
  migration that re-floods across the wave seam — the no-workaround / one-coherent-regime precept is
  satisfied precisely because the coordinate-system decision is made ONCE and inherited.
- **fail-explicit (vs befitting-silent browser-API degradation).** The blob flood is a library-internal
  geometric defect — it is FIXED at its root + LOCKED by a rendered-pixel gate that goes RED on a re-flood,
  NOT papered over with a clamp or a graceful fall-through. (Device-loss / WebGL-context-loss is the
  befitting-silent browser-API arm and is NOT in this wave's scope — it rides the aurora device-loss work
  W14; the two are never collapsed.) The static `proof:blob-smin-normalized` green-while-broken is the
  silent-failure class this wave converts to a loud rendered-pixel RED.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates + §π).** The close is a
  render-and-readback artefact on a real device (the precept-valid form) + the executed live Playwright +
  frontend-design audit across ≥3 viewports × light/dark — NEVER a headless proof alone (the cardinal AX
  precept, "Runtime Truth Beats Source Claims"). The static math gates are explicitly DEMOTED to
  corroborating-only because they certified the regression green; the rendered-pixel gate is the close
  criterion. The π β-lane visual-load-bearing-ness bar is met: the blob was a shipped substrate rendering a
  broken (flooded) frame; W08 makes it paint the right image and proves it live.
- **no-overfitting / substrate-with-consumer.** The blob is a real consumed substrate (`/goo-blob` subpath,
  the value.js downstream fork waiting on this fix); the re-derived constants are tuned against the LIVE
  render (the empirical wet-meniscus target), not fitted to the gate's threshold. The dead `from`/`to` spring
  keys (a no-op artefact) are excised (the no-orphan discipline). The value.js fork retirement is NOT
  silently dropped — it is routed to W16/W34 with a named adoption note (substrate-with-consumer /
  wire-before-retire: the library fix lands FIRST, the consumer adopts after the droplet is device-true).
- **presets-in-consumers (glass-ui MEMORY).** W08 re-derives the library's OWN default tokens
  (`BLOB_CONFIG_DEFAULTS.smoothK` + the mood range) as the lib's identity evolves — the correct un-flooded
  default IS library identity, not a consumer preset. value.js supplies only its color through the injected
  ColorResolver seam (a clean preset boundary), never the merge-band scale.
- **no-silent-deferrals / goal+completion-criterion paired.** The W08 goal (a contained droplet) is paired
  with the `proof:blob-render` completion criterion at the wave unit; the W15/W16 containment + integration
  work is explicitly ROUTED (not deferred-to-next-tranche), and the POS_SCALE DISPOSITION line is carried so
  W15 inherits a decision rather than re-litigating it.
