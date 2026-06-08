# AX.W12 — Mediums substrate: StrokeProfile extraction + the high-quality painterly noise basis

**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07 (the aurora WGSL twin must paint a
non-black base field before a noise-basis twin is spliced into it; the π visual-runtime lane it closes on
rides W00 transitively through W07) · **Charter** AX.md §3 (the `### AX.W12` block, lines 740-767) + the
inline **"CORRECTION — the integer-PCG hash is NET-NEW"** ratification (lines 758-764) + §2b band-C precept
row (line 215) · **Audit** `deep-audit-corpus.json` slice `aurora-mediums-painterly` (index 8, findings
**F6** the `mediumOil` god-monolith / StrokeProfile-extraction root + **F4** the value-noise/sin-hash
fidelity-ceiling root, with the slice `notes` four-ceiling leverage order) + `constellation-analysis-corpus.json`
slice `harden:aurora-blob` (the **PHANTOM-reference correction** — there is NO in-tree integer-PCG GLSL hash;
W12 AUTHORS one) + the slice's `proposedWaves` `AX.W-mediums-refactor` + `AX.W-noise-basis` entries.

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on TWO independent witnesses that do NOT exist at HEAD `eaba94f`: (1) the
StrokeProfile substrate does not exist — new-medium work forks a 117-line monolith; (2) there is NO
GLSL↔WGSL integer-hash twin-equivalence gate, because there is NO integer-hash anywhere in `src/` to gate.

- **RED witness 1 — the StrokeProfile substrate does NOT exist (grep-falsifiable + god-module-shaped).**
  `mediumOil` (`mediums.glsl.ts:209-326`) is a 117-line monolith: the per-mode knob block
  (`shapeType`/`bristleAmp`/`streakFreq…` for oil/knife/chunky) is an **imperative if-ladder** (`:217-246`),
  and the four stroke layers are **hand-unrolled `bestOil` invocations** (`:270-308`). `grep "StrokeProfile"`
  + `grep "profileFor"` + `grep "paintStrokeLayers"` over `src/` = **0** — there is no `struct StrokeProfile`,
  no `profileFor(medium, mode)` selector, no parameterized `paintStrokeLayers(profile)`. The falsifiable RED
  assertion: *the new-medium author (W13 `mediumVangogh` first-class body, the oil-pastel/crayon split) must
  EDIT the 117-line `mediumOil` if-ladder to add a profile, not call `paintStrokeLayers(vangoghProfile)` — the
  substrate the medium waves are supposed to ride does not exist.* (Slice 8 F6: "adding the new
  van-Gogh/oil-pastel profiles requires editing the monolith rather than adding a profile entry.")
  Note: `mediums.glsl.ts` is **337 lines at HEAD** — UNDER the `proof:no-god-module` 500-line `HARD_LIMIT`
  (`proof-no-god-module.mjs:20`), so the gate does NOT bite on line-count today. The born-RED witness for
  this wave is the EXTRACTION structural gate (the `mediumOil`-imperative-if-ladder + zero
  StrokeProfile/paintStrokeLayers exports), NOT a line-count bite — the charter's "`proof:no-god-module` over
  `mediums.glsl.ts`" is the REGRESSION-LOCK (the extraction must not push the file past 500), with the
  extraction-presence assertion as the born-RED arm (see HardGate). The wave does not invent a length crisis
  that isn't there; it locks the substrate carve and forbids a future regression.

- **RED witness 2 — the painterly noise basis is a low-quality `sin()`/value-noise ceiling, and there is NO
  integer-hash twin to gate (grep-falsifiable + device-visible).** Every medium-texture term (granulation,
  paper tooth, scumble masks, pastel grain, bristle/streak modulation) reads `vnoise`/`fbm`
  (`mediums.glsl.ts:97,102,112,115,119,154-156,169,195,311-312`). `vnoise` (`aurora.frag.ts:170-179`) is
  value-noise on `hash21` (`:158-162`, the chained-fract `fract(p*vec2(123.34,456.21))` → `fract(p.x*p.y)`);
  `hash22` (`:164-167`) is `fract(sin(p)*43758.5453)`. These are the characteristic blocky axis-aligned
  lattice + `sin()`-periodicity-banding hashes that read as "digital procedural texture," the silent fidelity
  ceiling under EVERY medium. **`grep "PCG"` + `grep "floatBitsToUint"` + `grep "floatConstruct"` over `src/`
  = 0** — there is NO integer-PCG/Sugar-style GLSL hash anywhere in the tree (the digest harden:aurora-blob
  PHANTOM-reference correction: the charter's prior "reuse the one already used cleanly elsewhere" is
  unactionable; `utils/prng.ts` is CPU-side mulberry32 + djb2, NOT a GLSL hash, NOT PCG, zero DRY overlap with
  a GPU hash). The falsifiable RED assertion: *there is no `pcgHash`/`pcg2d`/gradient-noise leaf in the shared
  `procedural-color` chunk, no GLSL↔WGSL hash twin, and therefore no `proof:aurora-noise-hash-equivalence`
  gate can pass — it has nothing to assert against.* The texture-quality consequence is device-visible (slice
  8 notes ceiling (c)): the painterly mediums magnify high-frequency detail the smooth-aurora-inherited basis
  cannot supply.

The wave is RED at HEAD on both; the HardGate below drives each to GREEN.

---

## Goal

Build the substrate the medium waves (W13) ride — a `StrokeProfile` struct + `profileFor(medium, mode)`
selector + a single parameterized `paintStrokeLayers(profile)` that turns new-medium work into authoring a
profile (not forking the 117-line `mediumOil`), AND author a NET-NEW high-quality integer-PCG GLSL hash +
gradient-noise variant in the shared `procedural-color` chunk (single-sourced across the GLSL+WGSL twins
under the existing OETF/FBM_ROT discipline) so the painterly mediums opt into an organic noise basis instead
of the `sin()`/value-noise lattice ceiling — both changes VISUALLY NEUTRAL on the existing oil medium.

---

## Scope (the gestalt fix — no workaround, no legacy, no silent ceiling)

Two findings (slice 8 F6 + F4), ONE substrate wave — the precondition the W13 medium waves cannot land
without. Three cohesive parts.

1. **Extract the `StrokeProfile` substrate from the `mediumOil` monolith (slice 8 F6 — DRY at the substrate,
   differentiated at the medium).** Replace the imperative per-mode knob if-ladder (`mediums.glsl.ts:217-246`)
   + the four hand-unrolled stroke-layer invocations (`:270-308`) with:
   - a **`struct StrokeProfile`** in the brush substrate carrying the full stroke-parameter cohort
     (`shapeType`, `bristleAmp`, `streakFreq`, `streakAmp`, `impastoAmp`, `hardness`, `tooth*`, `density*`,
     `lenMul`, `widMul`) — logic-as-DATA, the if-ladder's knobs become struct fields;
   - a **`profileFor(int medium, int mode)`** selector that returns the populated profile for a
     (medium, mode) pair (oil/knife/chunky today; the W13 van-Gogh + oil-pastel profiles are pure ADDITIONS
     to this selector, never edits to a monolith);
   - a single parameterized **`paintStrokeLayers(inout vec3 col, inout float height, StrokeProfile profile,
     vec2 p, float t)`** that runs the four-layer `bestOil`/`paintOver` cascade off the profile — the four
     hand-unrolled invocations collapse into ONE loop-or-call parameterized by the profile.
   `mediumOil` becomes a thin body: `StrokeProfile prof = profileFor(MEDIUM_OIL, mode); paintStrokeLayers(col,
   height, prof, p, t); …tooth/relight…`. The extraction is a **pure structural transposition — byte-equal (or
   1e-6-equal, accounting for float-eval reorder) output for the existing oil/knife/chunky/crayon bakes**
   (slice 8 `proposedWaves.AX.W-mediums-refactor`: "byte-equal output for existing oil/knife/chunky/crayon").
   The `bestOil`/`curvedStroke`/`paintOver`/`strokeShape` primitives in `brush.glsl.ts` STAY — they are the
   placement substrate the profile parameterizes; only the per-mode SELECTION moves from an imperative branch
   to a data table. **DRY without collapsing distinct media onto one dispatch body** — the W13 split (oil-pastel
   vs crayon; first-class van-Gogh) shares this SUBSTRATE, not the dispatch BODY (the §2.5/§2.6 fix this wave
   enables).

2. **Author the NET-NEW high-quality integer-PCG hash + gradient-noise variant in the shared chunk (slice 8 F4
   — the fidelity-ceiling lift; RATIFY-BEFORE-IMPL the hash choice).** This is **NET-NEW substrate, NOT a reuse
   of an in-tree hash** (the digest harden:aurora-blob PHANTOM-reference correction — there is no integer-PCG
   GLSL hash in `src/`):
   - **Author a `pcgHash`/`pcg2d` GLSL leaf** (the canonical Mark Jarzynski PCG2D/PCG3D integer-bit hash, or
     a `floatConstruct(pcg(floatBitsToUint(p)))` integer-bit construction) in the shared
     `procedural-color.glsl.ts` chunk as a new `export const PCG_HASH_GLSL` template-literal string, splice it
     into BOTH `aurora.frag.ts` AND `aurora.wgsl.ts` via the existing `${…}` interpolation, matching the
     OETF_GLSL/FBM_ROT_GLSL single-source discipline (the chunk's headline invariant: "the OETF lives here
     ONCE, both shaders splice it, so it can NEVER again drift"). Emit the WGSL twin `export const
     PCG_HASH_WGSL` in the same chunk (the `mat2x2f`/`u32`-bit form) so the hash, like every other shared math
     primitive, is two-twin-single-sourced.
   - **Author a gradient-noise (simplex/Perlin) variant** for the tooth/granulation fields — value-noise
     lattice is the wrong basis for organic paper/pigment grain (slice 8 F4 gestaltFix: "provide a
     gradient-noise variant for the tooth/granulation fields"). The painterly mediums OPT INTO the better basis
     (`gnoise`/`snoise`); the **smooth/atmospheric pole stays on the cheap value-noise `fbm`** (charter: "Keep
     the smooth/atmospheric pole on the cheap fBm") — the cost-tiering is preserved, the upgrade is
     painterly-medium-only.
   - **RATIFY-BEFORE-IMPL (the hash + gradient-noise basis choice).** The recommended path is the **Jarzynski
     PCG2D integer-bit hash + a 2D simplex-gradient noise** (the canonical SOTA basis the NPR literature uses
     for organic grain; integer-bit kills the `sin()` periodicity-banding permanently, gradient noise kills the
     value-noise blocky lattice). The orchestrator ratifies (a) PCG2D vs PCG3D-collapsed-to-2D (PCG2D is the
     cheaper correct default), and (b) simplex vs classic-Perlin gradient noise (simplex is the
     patent-expired, lower-directional-artifact default). The choice is RATIFIED before impl because it sets
     the twin-equivalence oracle the W12 gate locks.

3. **Keep the change VISUALLY NEUTRAL on the existing oil medium (the no-regression contract).** The
   StrokeProfile extraction is a structural transposition (oil/knife/chunky/crayon bake unchanged). The
   noise-basis upgrade is OPT-IN per painterly medium — the existing `mediumOil` either (a) keeps its current
   value-noise tooth so its bake is byte-stable, OR (b) opts into the new basis ONLY IF the live π-lane audit
   confirms the oil bake is visually neutral-or-better at close (the W12 close criterion: "the substrate
   change is visually neutral on the existing oil medium"). The NEW basis becomes load-bearing in W13 (the
   first-class van-Gogh / oil-pastel mediums that magnify high-frequency detail); W12 ships the basis + the
   twin-equivalence lock so W13 authors a profile + opts into the basis, never re-derives either.

**Explicitly OUT of W12 scope (routes elsewhere):**
- The first-class `mediumVangogh` body (comma/crescent stroke profile, atomic dab placement, swirl-row
  clustering, full-height impasto crowns) + the oil-pastel/crayon split (slice 8 F0/F1) → **AX.W13** (W12
  ships the substrate they author profiles against; W12 does NOT author a new medium body).
- The within-stroke OKLCh broken-color streak (slice 8 F5) + the OKLab/Kubelka-Munk stroke OVER-compositing
  (slice 8 F2) → **AX.W13** (the medium-fidelity wave; W12 does not touch `paintOver`'s composite math).
- The WGSL Kuwahara/LIC/tensor multi-pass wire-or-excise (slice 8 F3) → **AX.W14** (the WebGPU painterly
  parity wave; W12 splices a SINGLE-PASS hash twin, never an FBO ladder).
- The aurora color-seam hoist (samplePalette ramp gate-hole, the OKLCh catch-light) → **AX.W11** (W12's hash
  splice is the NOISE twin, not the COLOR/palette twin W11 owns).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` | Replace the `mediumOil` per-mode if-ladder (`:217-246`) + the four hand-unrolled stroke-layer invocations (`:270-308`) with a `struct StrokeProfile`, `profileFor(medium, mode)` selector, and `paintStrokeLayers(profile)` call. `mediumOil` becomes a thin profile-fetch + `paintStrokeLayers` + tooth/relight body. Repoint the painterly-medium texture terms onto the new `gnoise`/`pcgHash` basis (the OPT-IN tier); the smooth/atmospheric terms keep `vnoise`. (Stays UNDER the 500-line `HARD_LIMIT` — the extraction nets DOWN, not up.) |
| `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` | ADD `export const PCG_HASH_GLSL` (the Jarzynski PCG2D integer-bit hash + the gradient-noise `gnoise`/`snoise` variant) + its `export const PCG_HASH_WGSL` twin — the single-source NEW noise leaf, matching the OETF/FBM_ROT two-twin discipline. Update the chunk's `// What lives here` header inventory. |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | Splice `${PCG_HASH_GLSL}` from the chunk (the new import + the `${…}` interpolation site, alongside the existing `${FBM_ROT_GLSL}`/`${OETF_GLSL}`). The aurora-local `hash21`/`hash22`/`vnoise`/`fbm` LOOP STAYS (legitimately divergent per the chunk's §3a — only the new PCG/gradient leaf is shared); the painterly-medium consumers opt into the spliced `pcgHash`/`gnoise`. |
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` | Splice `${PCG_HASH_WGSL}` from the chunk (matching the existing `${FBM_ROT_WGSL}`/`${OETF_WGSL}` splice) so the WGSL twin carries the same single-sourced hash — the twin-equivalence target. (W12 does NOT alter the W07 f32-uniform/storage struct; it adds a noise-leaf splice only.) |
| `src/components/custom/aurora/constants/shaders/brush.glsl.ts` | ONLY IF `paintStrokeLayers` is sited here (the stroke-primitive home): host the `struct StrokeProfile` + `paintStrokeLayers` parameterized cascade alongside `bestOil`/`curvedStroke`/`paintOver`/`strokeShape` (which STAY unchanged). The selector `profileFor` may live here or in `mediums.glsl.ts` per the cleanest cohesion seam (ratified at impl-open). The stroke SDF primitives are NOT re-authored. |
| `scripts/proof-aurora-noise-hash-equivalence.mjs` | **NEW** — the GLSL↔WGSL hash + gradient-noise twin-equivalence gate driver, patterned on `proof:aurora-wgsl-equivalence` (the existing OETF/matrices/FBM twin gate): NUMERIC 1e-6 (the WGSL hash → TS port matches its GLSL twin oracle) + STRUCTURAL (both shaders SPLICE `PCG_HASH_GLSL`/`PCG_HASH_WGSL` from the chunk, neither re-authors the hash inline). |
| `tests/components/custom/aurora/noise-hash-equivalence.test.ts` | **NEW** (under the `tests/` mirror tree, NOT `src/` per `proof:no-test-in-src`) — the line-for-line TS transcription of the PCG hash + gradient noise, the 1e-6 GLSL↔WGSL assertion the gate runs. |
| `package.json` | ADD the `proof:aurora-noise-hash-equivalence` script entry + the W00 `proof:gate-script-parity` meta-gate match. |
| `tests-visual/aurora-mediums-substrate.spec.ts` | **NEW** (in the W00 `tests-visual/` workspace, OFF the publish surface) — the π-lane visual-neutrality spec: bake the existing oil medium BEFORE vs AFTER the substrate/basis change, assert the perceptual delta is below the neutrality threshold. |
| `src/components/custom/aurora/constants/shaders/__tests__/` or `tests/.../mediums-extraction.test.ts` | **NEW** — the StrokeProfile extraction byte/1e-6-equivalence regression (oil/knife/chunky/crayon bake unchanged) under the `tests/` mirror. |
| `docs/tranches/AX/audit/W12-mediums-substrate.json` | **NEW** — the wave's audit artefact (born-RED→GREEN evidence). |

**OUT of bounds:** `mediumVangogh`/`mediumOilPastel`/`mediumCrayon` BODIES (W13 authors them — W12 leaves
`mediumVangogh` as the `return mediumOil(...)` passthrough it inherits, untouched, so W13 owns the un-stub);
`paintOver`'s composite `mix` (W13 OKLab/KM); `painterly.wgsl.ts`/`wake.wgsl.ts` (W14); `samplePalette` /
the OKLCh palette arc / `color.ts` (W11); `atoms.ts`/`presets.ts`/`renderMode.ts`/`gpuRuntime.ts`/
`uniformBridge.ts` (W07/W10 — W12 touches no uniform-upload or config surface, only the noise/stroke shader
math). The aurora-local `hash21`/`hash22`/`vnoise`/`fbm` loop is NOT deleted (legitimately divergent per the
chunk's §3a) — W12 ADDS the shared PCG/gradient leaf the painterly mediums opt into, it does not replace the
smooth-pole basis.

---

## Disjointness (sibling waves it must NOT overlap)

W12 is in band C (AURORA), sequenced after band B (GRAPHICS, W07-W09). The disjointness contract:

- **vs W07 (aurora core unblock — `aurora.wgsl.ts` f32-uniform/storage struct + `renderMode.ts` +
  `gpuRuntime.ts` + `uniformBridge.ts`).** W12 **dependsOn W07** — the WGSL twin must paint a non-black base
  field before a noise-leaf twin is spliced into it. They SHARE `aurora.wgsl.ts` but DISJOINT in TIME and in
  REGION: W07 owns the struct/uniform/storage rewrite (`:58-79`, the count/enum fields + the `Field` storage
  buffer); W12 adds ONLY a `${PCG_HASH_WGSL}` splice line + the new chunk import, never touching the struct.
  Sequential after W07; no overlapping hunk.
- **vs W11 (aurora color seams — `procedural-color.glsl.ts` palette-ramp hoist + `samplePalette` + `color.ts`).**
  BOTH touch `procedural-color.glsl.ts` — the shared chunk. DISJOINT by EXPORT: W11 hoists the COLOR ramp
  (the smoothstep t-ease + OKLab-vs-OKLCh-arc dispatch) as a new color twin; W12 adds the NOISE/hash leaf
  (`PCG_HASH_GLSL`/`PCG_HASH_WGSL`). Different `export const` blocks, different splice consumers (W11 → the
  palette path; W12 → the medium-texture path). Coordinate the chunk's `// What lives here` header inventory
  hunk (two additive edits, different lines) and the two `package.json` `proof:*` script-block additions
  (different lines). If W11 and W12 dispatch concurrently, the chunk is the ONE shared file — resolve via the
  additive-export discipline (each appends its own `export const`, neither edits the other's). W11 and W12 do
  NOT share a gate (W11 extends `proof:aurora-wgsl-equivalence` for `samplePalette`; W12 adds
  `proof:aurora-noise-hash-equivalence` for the hash) — twin gates, disjoint assertions.
- **vs W13 (first-class van-Gogh + oil-pastel mediums).** W13 **dependsOn W12** — W13 authors the
  `mediumVangogh` first-class body + the oil-pastel/crayon split + the OKLab/KM composite + the within-stroke
  broken-color streak by AUTHORING PROFILES against W12's `StrokeProfile`/`paintStrokeLayers` substrate and
  OPTING INTO W12's noise basis. W12 must NOT pre-author any medium body (the `mediumVangogh` passthrough stays
  un-stubbed; the oil-pastel split stays uncut) — that is W13's blocker-sized scope. They SHARE
  `mediums.glsl.ts`/`brush.glsl.ts` but DISJOINT in TIME (W12 extracts the substrate; W13 adds bodies). The
  extraction MUST land first (the `proposedWaves` sequencing: refactor + noise-basis open, THEN the two medium
  waves). Sequential.
- **vs W14 (WebGPU painterly parity — `painterly.wgsl.ts`/`wake.wgsl.ts` multi-pass).** Disjoint by file —
  W12 never touches the multi-pass FBO scaffold; W14 never touches the single-pass noise/stroke math W12
  ships. W14 dependsOn W13 (which dependsOn W12). Sequential, no shared file.
- **vs W10 (aurora options converge — `atoms.ts`/`presets.ts` + the live config UI + dead `deriveScene`).**
  Disjoint by file entirely — W10 is the CONFIG door (zones/noise/color control-elements), W12 is the SHADER
  noise/stroke math. W12 touches no `.ts` config surface. Concurrent-eligible (no shared file).
- **vs W00 (the π lane).** W12 **dependsOn W00 transitively (via W07)** — the `tests-visual/` workspace +
  the readback harness W12's neutrality spec rides. W12 ADDS a sibling spec in the SAME workspace; it does NOT
  modify W00's `pi-manifest.ts` / the shared `substrate-paints-color.spec.ts` / the workspace `package.json`
  member (W00 owns those).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive shader-substrate fold).** Lands the `StrokeProfile`/`profileFor`/
  `paintStrokeLayers` extraction in `mediums.glsl.ts` (+ `brush.glsl.ts` if `paintStrokeLayers` sites there),
  the NET-NEW `PCG_HASH_GLSL`/`PCG_HASH_WGSL` leaf + gradient-noise variant in `procedural-color.glsl.ts`, the
  `${PCG_HASH_GLSL}`/`${PCG_HASH_WGSL}` splices into `aurora.frag.ts`/`aurora.wgsl.ts`, and the
  painterly-medium opt-in repoint. Lint + typecheck at every interval. The extraction lands as a structural
  transposition commit (oil/knife/chunky/crayon byte-stable); the hash leaf lands as a second commit (the
  twin-single-sourced basis). RATIFY the hash + gradient-noise choice (PCG2D + simplex, recommended) with the
  orchestrator BEFORE impl.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the two RED witnesses against the patched tree:
  confirms `StrokeProfile`/`profileFor`/`paintStrokeLayers` now exist and `mediumOil` is a thin profile-fetch
  body (the if-ladder is gone); confirms the oil/knife/chunky/crayon bakes are byte/1e-6-equal to HEAD (the
  extraction is genuinely neutral, not a silent behaviour change); confirms `PCG_HASH_GLSL`/`PCG_HASH_WGSL`
  exist in the chunk and are SPLICED (not re-authored inline) in BOTH shaders. ADVERSARIAL twists: (a)
  perturbs a PCG hash constant in the chunk and confirms `proof:aurora-noise-hash-equivalence` REDs (the 1e-6
  twin gate bites a divergence); (b) re-authors the hash inline in `aurora.wgsl.ts` (bypassing the chunk) and
  confirms the STRUCTURAL arm REDs (the splice-discipline is enforced, the two-copy class is blocked); (c)
  confirms the painterly-medium texture terms read the NEW basis while the smooth/atmospheric `fbm` pole still
  reads the cheap `vnoise` (the cost-tiering is preserved, not a blanket upgrade); (d) bakes the existing oil
  medium BEFORE/AFTER and confirms the visual delta is below the neutrality threshold (no regression).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `scripts/proof-aurora-noise-hash-equivalence.mjs` +
  `tests/components/custom/aurora/noise-hash-equivalence.test.ts` (the 1e-6 GLSL↔WGSL hash twin gate) + the
  `package.json` entry + the W00 `proof:gate-script-parity` match + the `tests-visual/aurora-mediums-substrate.spec.ts`
  visual-neutrality spec + the extraction byte-equivalence regression. Confirms each gate FAILS at `eaba94f`
  (no hash to gate / no StrokeProfile to assert) and PASSES on the patched tree; confirms
  `proof:no-god-module` over `mediums.glsl.ts` stays GREEN (the extraction nets the file DOWN, the
  regression-lock holds).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gates — born-RED→GREEN.**

1. **`proof:aurora-noise-hash-equivalence` (NEW — the GLSL↔WGSL hash twin gate, patterned on
   `proof:aurora-wgsl-equivalence`).** Two arms, the same shape as the existing OETF/matrices/FBM twin gate:
   - **(a) NUMERIC 1e-6** — the WGSL PCG hash + gradient noise, hand-transcribed to TS, asserted against its
     GLSL twin oracle (`tests/.../noise-hash-equivalence.test.ts`) to 1e-6 over a witness coordinate set. This
     is a **build/test artefact** (a real numeric equivalence run), the precept-valid form per SPEC.md §Hard
     Gates — NOT a grep-for-runtime-behaviour. **Born-RED at HEAD** (there is no PCG hash to transcribe; the
     gate has nothing to assert until the leaf exists).
   - **(b) STRUCTURAL** — both `aurora.frag.ts` and `aurora.wgsl.ts` SPLICE `PCG_HASH_GLSL`/`PCG_HASH_WGSL`
     from the shared chunk (regex over the import + interpolation site); neither re-authors the hash inline (a
     re-authored inline hash is the AV.W1 two-copy divergence class). RED if the chunk omits the twin export OR
     a shader re-authors the hash locally.
2. **`proof:no-god-module` over `mediums.glsl.ts` (the EXISTING gate — REGRESSION-LOCK + extraction-presence
   arm).** The wave's born-RED arm is the **extraction-presence assertion** — `StrokeProfile` + `profileFor` +
   `paintStrokeLayers` must EXIST (grep/AST over `mediums.glsl.ts`/`brush.glsl.ts`), born-RED at HEAD (the
   substrate does not exist). The REGRESSION-LOCK arm is the existing `proof:no-god-module` 500-line ceiling:
   the extraction must keep `mediums.glsl.ts` UNDER `HARD_LIMIT` (it nets DOWN — the if-ladder + four unrolled
   layers collapse into a profile table + one cascade). This is a **deletion/diff-shaped artefact** (the
   monolith if-ladder is gone, the substrate exports are present), the precept-valid form.
3. **The extraction byte/1e-6-equivalence regression** — the oil/knife/chunky/crayon bakes are byte-equal (or
   1e-6 accounting for float-eval reorder) BEFORE vs AFTER the StrokeProfile extraction. A **test artefact**
   that the structural transposition changed no existing-medium output.

These are **build/test/runtime-observation** gates (the precept-valid artefact forms per SPEC.md §Hard Gates),
NOT grep-only-for-runtime-behaviour. The hash equivalence is a real numeric run; the extraction regression is
a real bake comparison; the splice-discipline structural arm is a source-shape assertion over a NON-runtime
property (the splice topology), which is a valid grep target (it asserts a source FACT, not a runtime
behaviour).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live aurora demo (`/substrates/aurora`), at **≥ 3 viewports** (375×667 /
1280×800 / 1440×900) in **light AND dark**, on the OIL medium preset (the existing medium the substrate
change must not regress):
- **The substrate change is VISUALLY NEUTRAL on oil** — the live oil-medium bake AFTER the StrokeProfile
  extraction + the noise-basis opt-in reads identical-or-better than HEAD (no banding regression, no stroke
  placement shift, no tooth/granulation degradation). The paired-π BEFORE/AFTER + DELTA capture is the binding
  evidence (the W00 protocol): the HEAD oil bake vs the post-W12 oil bake, with the perceptual delta below the
  neutrality threshold.
- **The new noise basis reads ORGANIC, not "digital procedural"** — where the painterly-medium texture terms
  opt into the PCG/gradient basis, the grain reads as organic paper/pigment (no `sin()`-periodicity banding,
  no value-noise axis-aligned lattice). This is the device-visible fidelity lift the W13 mediums ride; a
  frontend-design eye confirms the ceiling is genuinely raised.
- **Affordance / hierarchy / NO visual occlusion** per the AX cardinal gate — the aurora wash composites
  correctly under the demo chrome at every viewport.

**The wave does NOT close on the headless gates alone** — the executed live audit (the paired-π
BEFORE/AFTER + DELTA on the oil medium, plus the organic-grain confirmation) is the binding close criterion.
This is the AX cardinal lesson made concrete: a passthrough + a shared body both PASS the current text/snapshot
gates (slice 8 notes — the W4 shipment was "headless-green-only"); only a live bake against a designer's eye
catches the fidelity gap. W12 is the SUBSTRATE wave — its visual-truth bar is NEUTRALITY (don't regress oil)
+ the organic-basis lift; W13's bar is congruence-to-real-works.

---

## Cadence (sub-step order)

1. **RATIFY-BEFORE-IMPL.** The orchestrator ratifies (a) the integer-hash choice (recommended: Jarzynski
   PCG2D integer-bit hash), and (b) the gradient-noise variant (recommended: 2D simplex). The ratification
   sets the twin-equivalence oracle the W12 gate locks. Record the ratified choice in
   `audit/W12-mediums-substrate.json`.
2. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the two RED witnesses against HEAD `eaba94f`:
   `grep "StrokeProfile|profileFor|paintStrokeLayers"` = 0 + the `mediumOil` if-ladder is live at
   `mediums.glsl.ts:217-246,270-308`; `grep "PCG|floatBitsToUint|floatConstruct"` = 0 + the painterly-medium
   texture terms read `vnoise`/`fbm`/`hash22`-`sin`. Bake the HEAD oil medium as the neutrality baseline.
   Record in `audit/W12-mediums-substrate.json` as the born-RED baseline. Do NOT proceed on the audit's word —
   re-prove (and confirm `mediums.glsl.ts` is 337 lines, UNDER the 500-line limit, so the witness is the
   extraction-presence arm, not a line-count bite).
3. **Author the born-RED gates.** `scripts/proof-aurora-noise-hash-equivalence.mjs` +
   `tests/.../noise-hash-equivalence.test.ts` + the `package.json` entry + the extraction byte-equivalence
   regression + `tests-visual/aurora-mediums-substrate.spec.ts`; confirm each FAILS at HEAD (no hash to gate,
   no StrokeProfile to assert).
4. **The StrokeProfile extraction.** `mediums.glsl.ts` (+ `brush.glsl.ts` if `paintStrokeLayers` sites there):
   extract `struct StrokeProfile` + `profileFor(medium, mode)` + `paintStrokeLayers(profile)`; collapse the
   if-ladder + the four unrolled layers; `mediumOil` becomes a thin profile-fetch body. Confirm the
   oil/knife/chunky/crayon byte/1e-6-equivalence regression GREEN. Lint + typecheck.
5. **The NET-NEW PCG hash + gradient-noise leaf.** `procedural-color.glsl.ts`: add `PCG_HASH_GLSL` +
   `PCG_HASH_WGSL` (the ratified PCG2D + simplex) + update the `// What lives here` header inventory; splice
   `${PCG_HASH_GLSL}` into `aurora.frag.ts` + `${PCG_HASH_WGSL}` into `aurora.wgsl.ts`; repoint the
   painterly-medium texture terms onto the new basis (the OPT-IN tier; the smooth pole keeps `vnoise`). Confirm
   `proof:aurora-noise-hash-equivalence` GREEN (numeric 1e-6 + structural splice). Lint + typecheck.
6. **Gate GREEN + visual-truth.** Confirm all three headless gates GREEN (`proof:aurora-noise-hash-equivalence`
   + the `proof:no-god-module` regression-lock + the extraction byte-equivalence + `proof:gate-script-parity`);
   run the VISUAL-TRUTH live audit on the oil medium (the neutrality bake + the organic-grain confirmation);
   capture the paired-π BEFORE/AFTER + DELTA; discharge any W00 painterly re-probe row routed here; write
   `audit/W12-mediums-substrate.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W12-mediums-substrate.json` — the born-RED→GREEN ledger: the ratified hash +
  gradient-noise choice (step 1); the two RED witnesses (the `StrokeProfile`/`profileFor`/`paintStrokeLayers`
  grep=0 + the `mediumOil` if-ladder line refs; the `PCG`/`floatBitsToUint` grep=0 + the `sin`/value-noise
  texture-term refs); the per-finding (slice 8 F6 + F4) disposition with the OUT-of-scope routes
  (W13/W14/W11); and the post-wave GREEN measurements (the StrokeProfile substrate exists, `mediumOil` thinned,
  the PCG/gradient leaf single-sourced + spliced + 1e-6-twin-equal, the oil bake neutral).
- `scripts/proof-aurora-noise-hash-equivalence.mjs` + `tests/components/custom/aurora/noise-hash-equivalence.test.ts`
  — the new GLSL↔WGSL hash twin-equivalence gate (numeric 1e-6 + structural splice-discipline).
- The extraction byte/1e-6-equivalence regression test (oil/knife/chunky/crayon bake unchanged).
- `tests-visual/aurora-mediums-substrate.spec.ts` — the π-lane oil-medium visual-neutrality spec.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the HEAD oil-medium bake (value-noise
  ceiling) vs the post-W12 oil bake (StrokeProfile-substrate + organic basis), at ≥ 3 viewports × light/dark,
  with the perceptual delta below the neutrality threshold + the organic-grain confirmation.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): proof:aurora-noise-hash-equivalence born-RED + StrokeProfile-extraction regression — the mediums-substrate gates (AX.W12)`
2. `refactor(aurora): extract StrokeProfile + profileFor + paintStrokeLayers from the mediumOil monolith — DRY substrate, byte-stable oil/knife/chunky/crayon (AX.W12 slice8-F6)`
3. `feat(aurora): NET-NEW PCG2D integer-bit hash + simplex gradient-noise leaf in the shared procedural-color chunk — single-sourced GLSL+WGSL twins, painterly-medium opt-in basis (AX.W12 slice8-F4)`
4. `chore(AX.W12): audit ledger GREEN + paired-π oil-medium BEFORE/AFTER + DELTA (visual-neutral substrate + organic grain)`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W07 (aurora core unblock) — HARD (charter §3 `### AX.W12` dependsOn AX.W07).** The WGSL twin must paint
  a non-black base field (the f32-uniform/storage struct fix) BEFORE a noise-leaf twin is spliced into it —
  splicing `${PCG_HASH_WGSL}` into a black-rendering shader could not be visually verified. W07 also
  establishes the `aurora.wgsl.ts` struct W12's splice must not disturb. Transitively, W07 dependsOn W00 (the
  π lane W12's visual-neutrality spec rides).
- **Downstream:** **AX.W13 (first-class van-Gogh + oil-pastel mediums) dependsOn W12** — W13 authors the new
  medium bodies AGAINST W12's `StrokeProfile`/`paintStrokeLayers` substrate and OPTS INTO W12's noise basis.
  The charter §1 names W12 "the precondition for the medium waves"; the slice 8 `proposedWaves` sequence is
  "refactor + noise-basis open at HEAD, THEN the two medium waves." Without W12, W13 forks the 117-line
  monolith — the exact debt this wave retires. **AX.W14** (WebGPU painterly parity) is downstream of W13
  (transitively of W12).
- **Sibling-coordinate (NOT a hard dependency):** **AX.W11** also edits `procedural-color.glsl.ts` (the COLOR
  ramp hoist vs W12's NOISE leaf) — additive-export discipline keeps them disjoint (see Disjointness). W10
  (config door) is file-disjoint and concurrent-eligible.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **AW.W4.3 / `AW.W4-aurora-painterly.md` §5** (the van-Gogh DRY collapse ORIGIN) — reused `bestOil` +
  `curvedStroke` verbatim ("only the direction source, the energy grading, and the height accumulation
  change"), the DRY decision that collapsed the van-Gogh medium into a thin `uMedium==5` energy-grade switch
  on the oil engine (slice 8 F0 root). The W12 StrokeProfile extraction is the substrate that lets W13 UNDO
  that collapse without forking the monolith — the gestalt-correct DRY (shared substrate, differentiated
  body), not the W4 over-DRY (shared dispatch body).
- **The serial W4-fold accretion of `mediumOil`** (slice 8 F6 root) — the oil medium "accreted four stroke
  modes + four stroke layers + crosshatch + tooth + relight in one function as each W4 fold landed serially on
  one worktree," producing the 117-line monolith with the imperative if-ladder mode-selection
  (`mediums.glsl.ts:217-246`). The extraction is the post-hoc decomposition the §0 no-god-module mandate
  prescribes.
- **AV.W2 (the shared `procedural-color` chunk ORIGIN)** — established the single-source GLSL+WGSL twin
  discipline (OETF_GLSL/FBM_ROT_GLSL + their WGSL twins) that "DELETES the two-copy duplication: the OETF lives
  here ONCE, both shaders splice it, so it can NEVER again drift" (`procedural-color.glsl.ts:1-36`). W12's
  NET-NEW PCG hash + gradient-noise leaf RIDES this discipline — the new noise primitive is two-twin
  single-sourced from birth, never a divergent hand-copy.
- **The digest harden:aurora-blob PHANTOM-reference correction (charter lines 758-764).** The charter's prior
  framing ("replace `hash22`'s `sin`-hash with the integer-PCG/Sugar-style hash already used cleanly
  elsewhere") rested on a non-existent in-tree GLSL hash: `grep` proves there is NO integer-PCG GLSL hash
  anywhere in `src/`; the only shared PRNG leaf (`utils/prng.ts`) is CPU-side mulberry32 + djb2, unrelated to a
  GPU hash (zero DRY overlap). W12 AUTHORS a new GLSL integer-bit hash leaf — it does NOT cite a non-existent
  in-tree hash. This correction is RATIFIED in the charter and binds the W12 scope.
- **The slice 8 notes four-ceiling leverage order** — (a) the dead WGSL Kuwahara/LIC (→ W14), (b) linear-RGB
  stroke compositing mudding to grey (→ W13), (c) the value-noise/sin-hash basis ceiling (→ W12, this wave),
  (d) per-cell-not-within-stroke broken color (→ W13). W12 owns ceiling (c) — the substrate fidelity lift the
  deposition/scumble/atomic-stroke work all ride.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the `mediumOil` if-ladder
  monolith + the `grep`-confirmed absent integer-PCG hash + the `sin`/value-noise texture terms are live here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-C (AURORA) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **no-god-modules + DRY (the §0 mandate + `proof:no-god-module`).** The `mediumOil` 117-line monolith with
  its imperative per-mode if-ladder + four hand-unrolled layers is exactly the logic-as-data-as-branches
  anti-pattern §0 forbids. The StrokeProfile extraction is the gestalt-correct DRY: shared SUBSTRATE
  (`paintStrokeLayers`), differentiated BODY (each medium authors its own profile). The
  `proof:no-god-module` regression-lock keeps `mediums.glsl.ts` under 500; the extraction-presence arm proves
  the substrate exists. MUST NOT VIOLATE — DRY without collapsing distinct media onto one dispatch body (the
  W4 over-DRY error this wave exists to make undo-able).
- **one-path / single-source-shader (the AV.W1 two-copy lesson + the chunk's headline invariant).** The
  NET-NEW PCG hash + gradient-noise leaf lives ONCE in the shared `procedural-color` chunk as
  GLSL+WGSL twins, spliced into both `aurora.frag.ts` and `aurora.wgsl.ts` — never a re-authored inline hash
  (the AV.W1 two-copy divergence class). The `proof:aurora-noise-hash-equivalence` STRUCTURAL arm enforces the
  splice discipline; the NUMERIC arm locks the twins to 1e-6 so they can NEVER drift. MUST NOT VIOLATE — a
  hand-copied hash in either shader is the forbidden second drifting copy.
- **substrate-with-consumer (Design-Axis-3 / the visual-load-bearing-ness bar).** W12 ships substrate
  (`StrokeProfile`/`paintStrokeLayers` + the noise basis) WITH its consumer named and sequenced: **AX.W13**
  consumes the StrokeProfile substrate (authors the van-Gogh + oil-pastel profiles) AND the noise basis (the
  painterly mediums opt in). The substrate is NOT shipped speculatively — the charter §1 names W12 "the
  precondition for the medium waves," and W13 is the binding consumer. MUST NOT VIOLATE — if W13 were not the
  named consumer, the StrokeProfile abstraction would be substrate-without-consumer; it is consumer-bound by
  construction.
- **no-overfitting.** The StrokeProfile struct carries ONLY the parameters the existing oil/knife/chunky modes
  + the W13 van-Gogh/oil-pastel profiles need (the slice 8 F6 enumerated cohort: shapeType/bristleAmp/
  streak*/impastoAmp/hardness/tooth*/density*/len-widMul) — not a speculative every-conceivable-stroke-knob
  surface. The gradient-noise variant is painterly-medium-OPT-IN (the smooth pole keeps the cheap value-noise),
  not a blanket upgrade that over-pays for the atmospheric case. MUST NOT VIOLATE — the abstraction is sized to
  the two named medium-wave consumers, not a hypothetical medium zoo.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates — no grep-only runtime gate; the AX
  cardinal precept).** The hash twin gate is a real 1e-6 numeric run; the extraction regression is a real bake
  comparison; the structural splice arm asserts a source-topology FACT (a valid grep target, not a runtime
  behaviour). The wave's CLOSE is the executed live Playwright + frontend-design audit on the oil medium
  (visual neutrality + organic grain), never the headless gates alone — the cardinal AX lesson (slice 8 notes:
  the W4 shipment was "headless-green-only" because a passthrough + a shared body both PASS the text/snapshot
  gates). MUST NOT VIOLATE — close on the live bake, not the proof.
- **RATIFY-BEFORE-IMPL (the integer-hash + gradient-noise choice).** The recommended path — Jarzynski PCG2D
  integer-bit hash + 2D simplex gradient noise — is the SOTA NPR basis (integer-bit kills `sin()`
  periodicity-banding; gradient noise kills the value-noise blocky lattice). The orchestrator MUST ratify the
  PCG2D-vs-PCG3D and simplex-vs-Perlin choice before impl, because it sets the twin-equivalence oracle the W12
  gate locks and the basis W13 opts into. The charter has already ratified the NET-NEW disposition (the hash is
  authored, not reused); the remaining ratification is the specific hash/noise construction.
