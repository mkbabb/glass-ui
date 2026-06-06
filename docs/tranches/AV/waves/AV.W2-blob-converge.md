# AV.W2 — Blob refinement + aurora↔blob procedural-shader CONVERGENCE

## 2. State

**Name**: W2 — blob-converge (the aurora↔blob shared-GLSL convergence; delete the shader-math duplication that let the aurora OETF diverge)
**Opens after**: AV.W1 (the aurora OETF fix lands FIRST — W1 copies `linearToSrgb()` into `aurora.frag.ts` + inserts `col = linearToSrgb(col)` before output + re-bakes the 11 presets; W2 then DE-DUPLICATES the now-identical OETF + the shared procedural math into one source). W2 cannot open before W1's atomic commit + preset re-bake are green.
**Agents**: 1 serial unit (the shared-chunk extraction touches BOTH `.frag.ts` modules + creates the chunk + the gate + the build wiring; the two frags are not file-disjoint from the chunk they compose, so this is one writer/worktree — see §4a).
**Hard gate**: one NEW born-RED gate green (`proof:shader-shared-source`); the existing shader-color gate matrix (`proof:blob-space-gamma`, `proof:blob-color-equivalence`, `proof:blob-value-free`, `proof:webgl-substrate-single` + AV.W1's `proof:aurora-space-gamma`) stays green with NO regression; `npm run typecheck` + `npm run build` green; both shaders compile + link on a live WebGL2 context (manual browser verify recorded in `PROGRESS.md`); the aurora preset snapshots + blob snapshots are byte-stable (the convergence is a refactor — the emitted GLSL string is character-equivalent modulo the chunk-splice boundary).

**Status**: planned

**Type:** IMPL (gestalt transposition — deletes duplication, lands after AV.W1's correctness fix; non-publish-blocking).
**Scope source:** `docs/tranches/AV/audit/AUDIT-DIGEST.md` Stream B (the AURORA↔BLOB CONVERGENCE finding — "Converge the duplicated shader math onto a SHARED procedural-shader color/noise GLSL chunk … that both shaders `#include`/inline from one source — deletes the duplication + guarantees the OETF can never again diverge between them (the root of this very bug)"). Grounded against HEAD (`aurora.frag.ts` + `metaball.frag.ts` + the `/color` leaf + the `useWebGLCanvas` substrate). This file is the FULLY-formed, execute-without-re-deriving spec for W2.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks — the chunk REPLACES the inline definitions, no shim). Gestalt transposition, not patch — extract the genuinely-shared math to ONE source; the duplication IS the design defect. KISS — extract ONLY what is genuinely shared AND identical; do NOT over-abstract aurora's atmospheric Gaussian softmax vs the blob's Quilez `smin` (those are LEGITIMATELY different and stay per-shader). value.js-FREE shaders (the chunk is GLSL string, no value.js import; the blob's value.js-free invariant must not regress). One color core (the runtime-JS `/color` leaf stays the single CPU color source; the GLSL chunk is the single GPU color source — the two are CPU-equivalence-gated).

## 2a. Goal criterion

W2 succeeds if the sRGB OETF (`linearToSrgb`), its inverse (`srgbToLinear`), the rotated-octave FBM rotation constant + the FBM helper, the value-noise helper, and the four Ottosson OKLCh↔OKLab/sRGB matrices live in ONE shared GLSL chunk module that BOTH `aurora.frag.ts` and `metaball.frag.ts` compose from — such that grepping either `.frag.ts` for a LOCAL re-definition of `linearToSrgb` / the Ottosson matrices / the FBM rotation returns ZERO (the chunk is the single definition). The reader's test: re-inline a local `linearToSrgb` into either shader → the gate goes RED. The aurora OETF (now sourced from the chunk) can NEVER again drift from the blob's OETF, because there is exactly one OETF.

## 3. Scope

1. **Create the shared procedural-color/noise GLSL chunk** — a `.glsl.ts` string module exporting the named GLSL sub-source(s) that both fragment shaders splice. Houses ONLY the genuinely-shared-AND-identical math (§3a enumerates exactly what; §3b enumerates what stays per-shader).
2. **Compose `metaball.frag.ts` from the chunk** — delete its local `srgbToLinearCh`/`srgbToLinear`/`linearToSrgbCh`/`linearToSrgb`, the four `mat3` Ottosson literals, `FBM_ROT`, `valueNoise`, and (if reconciled — see §3a) `hash21`/`fbm`; splice the chunk source in their place. The OKLab/OKLCh space-conversion FUNCTIONS that wrap the matrices (`srgbToOklab`, `oklabToLinearSrgb`, `oklabToOklch`, `oklchToOklab`) move to the chunk too (they are pure, matrix-only, and the gate certifies them via the existing equivalence port).
3. **Compose `aurora.frag.ts` from the chunk** — after AV.W1 has added the OETF, delete aurora's W1-added local `linearToSrgb` + its local `fbm`/`vnoise`/`hash21`/FBM-rotation and splice the SAME chunk. (Aurora has no in-shader OKLCh path today — it bakes its palette CPU-side in linear — so aurora consumes the OETF + the noise/FBM half of the chunk; it does NOT consume the OKLCh matrices unless a future feature gap closes. KISS: aurora splices the noise+OETF sub-source; the blob splices noise+OETF+OKLCh.)
4. **Wire the chunk into the build** — the chunk is a TS string module imported + template-spliced at shader-assembly time (same mechanism as the `.frag.ts`/`.vert.ts` string modules today: a `/* glsl */` template literal `export const`, consumed by `runtime.ts`/`useMetaballRenderer.ts` via `compile(gl, …, SRC)`). NO new bundler step, NO `#include` preprocessor — the splice is a JS template-literal interpolation at module load, so the emitted shader string is identical to a hand-inlined one. Confirm `npm run build` emits both shaders with the chunk inlined.
5. **Extend the glsl-port equivalence test to the shared chunk** — the existing `__tests__/metaball-color.glsl-port.ts` (the line-for-line TS transcription) + `blob-color-equivalence.test.ts` (the 8-assert 1e-6 CPU-equivalence) already certify the OKLCh/OETF math. Re-point the port's provenance comment at the SHARED chunk (the chunk is now the GLSL source of truth the port mirrors); the equivalence assertion is unchanged (the math did not change — only its home moved).
6. **Converge the color-resolution seam (DEC-AT-7).** Aurora resolves color CPU-side (`flattenPalette` → `oklchToLinear` from the `/color` leaf — already the single core). The blob resolves via the injected `ColorResolver` (`defaultBlobColorResolver` → `oklchToGammaRgb`, same `/color` leaf). Both ALREADY ride the `/color` leaf as the one CPU color source — so the "one color-resolution path" is SATISFIED at the leaf level at HEAD (verify + record; do NOT invent a forced shared resolver — aurora's bake is a PALETTE of stops, the blob's resolver is a SINGLE base color; forcing one signature would be over-abstraction). The convergence W2 OWNS is the GPU-side GLSL math; the CPU-side leaf convergence is already landed (DEC-AT-7 / AU.W5) and W2 records the no-op confirmation.
7. **Blob minor refinements (the audit's "minor fold only").** The blob is CORRECT at HEAD (W7). Note + apply ONLY a genuinely-small fold surfaced by the extraction (e.g. a comment-provenance line now pointing at the chunk; a redundant local constant the chunk subsumes). NO behavior change to the blob's color or SDF. If the extraction surfaces nothing, record "no blob refinement warranted" — do NOT invent one.

### 3a. What is GENUINELY shared AND identical (extract to the chunk)

Grounded against HEAD — the convergence is asymmetric because the blob is the SOTA reference (W7) and aurora gains the OETF only at AV.W1:

| GLSL artefact | aurora (HEAD / post-W1) | blob (HEAD) | converge? |
|---|---|---|---|
| `linearToSrgb` OETF (slope 12.92, transition 0.0031308, gamma 2.4, +0.055) | ADDED by AV.W1 (copied from blob) | `metaball.frag.ts:131-137` | **YES — the headline.** The W1 copy IS the duplication; W2 deletes it. One OETF. |
| `srgbToLinear` OETF-inverse | absent (aurora bakes linear CPU-side; not needed unless a future in-shader path) | `:124-129` | **chunk-house it**; aurora may not splice it (KISS — splice only what aurora references). |
| FBM rotation `mat2(0.8,0.6,-0.6,0.8)` | `:124` (inline in `fbm`) | `:91` (`FBM_ROT` const) | **YES — identical constant.** One `FBM_ROT` const in the chunk. |
| value-noise helper (`vnoise`/`valueNoise`) | `:110-119` | `:76-87` | **YES — same value-noise algorithm**, textually near-identical; reconcile to ONE `valueNoise`. |
| Ottosson OKLCh↔OKLab/sRGB matrices (4 `mat3`) + the wrapping space fns | absent (no in-shader OKLCh) | `:141-199` | **chunk-house** (one OKLCh sub-source); blob splices it, aurora does not (today). One matrix source. |

**Two HEAD divergences the extraction must RECONCILE (not blindly merge):**
- **`hash21` differs.** Aurora `:98-102` uses a 2D `fract(p*vec2(123.34,456.21))` hash; the blob `:70-74` uses a 3D `p3 = fract(vec3(p.xyx)*0.1031)` hash. These are DIFFERENT hash functions. Reconciling to one hash CHANGES the noise field of whichever shader is migrated → re-blesses its snapshots. **Decision (KISS):** extract the value-noise + FBM SHAPE to the chunk parametrized over a `hash21` the shader provides, OR pick ONE canonical `hash21` and re-bless the migrated shader's snapshots. Prefer the **parametrized-shape** route if the GLSL allows a clean function-pointer-free split (GLSL has no first-class fns — so in practice: the chunk defines `valueNoise`/`fbm` against a chunk-canonical `hash21`, and the migrated shader accepts the re-blessed field). Record the chosen route + the re-bless in `PROGRESS.md`. If reconciling `hash21` is NOT cleanly KISS, **scope `hash21` OUT of the chunk** (each shader keeps its own hash) and extract only the OETF + matrices + the FBM-rotation constant — the OETF is the load-bearing convergence; the hash is a nice-to-have. The gate (§6) targets the OETF + matrices + rotation as MANDATORY; the noise helpers are extract-if-clean.
- **`fbm` signature differs.** Aurora's `fbm(vec2 p)` reads a `uNoiseOctaves` uniform + steps `p = r*p*2.02`; the blob's `fbm(vec2 p, int octaves)` takes an octave param + a `freq` accumulator + steps `p = FBM_ROT*p`. SAME rotation matrix, DIFFERENT loop shape + lacunarity (2.02 vs 2.0). **Decision:** extract the SHARED `FBM_ROT` constant (mandatory — it is byte-identical) but KEEP each shader's `fbm` LOOP local (the loop shapes are legitimately tuned per-shader: aurora's 2.02 lacunarity + uniform-driven octaves vs the blob's 2.0 + param octaves). Forcing one `fbm` would re-bless BOTH shaders' fields for no gain — that is the over-abstraction the wave forbids. The chunk owns the CONSTANT; the loop stays per-shader.

### 3b. What stays PER-SHADER (do NOT over-abstract)

- aurora's atmospheric Gaussian softmax `nucleiField` (`:206-245`) vs the blob's Quilez quadratic `smin` (`:115-118`) — LEGITIMATELY different (atmospheric blend vs SDF merge). KEEP per-shader. The audit's Stream B explicitly says "do not force the blob's smin."
- aurora's full medium/stroke pipeline (`mediumOil`, `curvedStroke`, `bestOil`, crayon, watercolor, pastel) — aurora-exclusive. KEEP.
- aurora's `hueShift`/`saturate3`/`aces`/`brokenColorJitter`/`samplePalette`/`flowField`/`domainWarp` — aurora-exclusive. KEEP.
- the blob's `sdCircle`, satellite loop, `fwidth` AA edge, `gamutClampOklch` bisection, pointer deformation, edge-glow — blob-exclusive. KEEP.
- each shader's `fbm` LOOP body + lacunarity (per §3a). KEEP; only the rotation constant converges.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) — the orchestrator may NOT redispatch the failing
unit (AV.W2.1) alone — on any of:

- **File-bounds expansion that invalidates the wave**: the shared-chunk splice produces a syntactically-broken
  shader — the `${OETF_GLSL}`/`${OKLCH_MATRICES_GLSL}`/`${FBM_ROT_GLSL}` interpolation lands the chunk source at a
  scope where a chunk-emitted GLSL declaration collides with a surviving local one (a re-declared `mat3`/function
  name → `gl.linkProgram` fails on the live WebGL2 context), and the fix would require editing the chunk's emitted
  GLSL text to disambiguate a name the OTHER shader depends on (a change that re-blesses the un-touched shader's
  snapshots — out of the §3a-MANDATORY OETF+matrices+FBM-rot bounds); a `hash21`/value-noise reconciliation (§3a)
  that is NOT cleanly KISS and forces re-blessing BOTH shaders' noise fields (the over-abstraction the wave
  forbids — scope `hash21` OUT, do not expand the chunk to swallow both); any fix requiring an edit to the
  `/color` runtime-JS leaf (`src/composables/color/index.ts` — the CPU color source is already converged, READ-ONLY
  here per §3.6) or to `@mkbabb/value.js`/`@mkbabb/keyframes.js` (READ-ONLY upstream, inv-16); any fix requiring an
  `#include` preprocessor or a new bundler step (the splice is JS template-literal interpolation by design — adding
  a preprocessor is a build-mechanism expansion the SOTA crosswalk explicitly forbids).
- **Non-local-recoverable hard-gate failures**: `proof:blob-color-equivalence` (the 8-assert 1e-6 CPU-equivalence)
  goes RED after the splice — the matrices moved homes but the equivalence broke, meaning a Ottosson `mat3` literal
  was corrupted in the move (a 1e-6 EXACT-vs-convenience-matrix trap, `metaball.frag.ts:14-19`); this is NOT a
  local re-tweak — the chunk's matrix literals must be re-derived against value.js's core and re-certified, which
  is a research+redress cycle, not a redispatch. Likewise `proof:aurora-space-gamma` (AV.W1's OETF gate) cannot
  see the spliced OETF without aurora's output path being re-architected (the splice did not reach the output
  site). A born-RED `proof:shader-shared-source` that STAYS RED after BOTH frags are migrated AND the comment-strip
  false-witness pass is exhausted (the gate detects a chunk-owned artefact still locally re-defined that the
  migration cannot cleanly remove — the splice boundary fights a load-bearing local).
- **Third-iteration diagnostic halt**: any live WebGL2 compile+link failure (or `proof:shader-shared-source` RED)
  that survives three splice-position iterations (re-order the interpolation → split the chunk sub-source →
  scope-out the contested helper per §3a) must HALT and escalate, not loop a fourth.

See `ORCHESTRATION.md` §Triumvirate Auto-Triggers for measurable thresholds.

## 4. File Bounds

| File | Access |
|---|---|
| `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` | create (the shared chunk — final name/path at author's discretion under `src/composables/glass/webgl/shaders/`; if that dir is absent, create it) |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify (delete local OETF + matrices + FBM-rot + valueNoise; splice the chunk; re-point provenance comment) |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify (delete the W1-added local OETF + the noise helpers per §3a; splice the chunk) |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify-IFF-needed (only if the splice changes the import/assembly site; likely the `.frag.ts` exports the assembled `METABALL_FRAGMENT_SRC` unchanged and this file is untouched — confirm) |
| `src/components/custom/aurora/composables/runtime.ts` | modify-IFF-needed (same; likely untouched — the `.frag.ts` assembles internally) |
| `src/components/custom/goo-blob/__tests__/metaball-color.glsl-port.ts` | modify (re-point provenance comment at the chunk; the math is unchanged) |
| `scripts/proof-shader-shared-source.mjs` | create (the born-RED gate) |
| `scripts/gates.mjs` | modify (register, append-only row) |
| `package.json` | modify (scripts only — the `proof:shader-shared-source` entry) |
| `CLAUDE.md` | modify (Structure block — the `composables/glass/` sub-tree gains the `webgl/shaders/` chunk line; one line) |
| `docs/tranches/AV/PROGRESS.md` | modify (record the convergence, the chosen `hash21` route, any re-bless, the green run id) |
| aurora preset snapshots + blob snapshots | re-bless IFF a noise-helper reconciliation changed a field (§3a); otherwise byte-stable |

Do NOT touch: `src/composables/color/index.ts` (the `/color` leaf — the CPU color source is already converged; W2 only READS + records the no-op per §3.6) · the blob's SDF/satellite/AA math · aurora's medium/stroke/nuclei/flow math · `useWebGLCanvas.ts` (the substrate is shader-agnostic; it compiles whatever string it is handed) · `blob-color-equivalence.test.ts` (the 8-assert gate's MATH is unchanged; only the port's provenance comment moves — and that lives in the glsl-port file, not the test) · any runtime uniform-threading JS.

## 4a. Disjointness

Single serial lane. The chunk is composed BY both `.frag.ts` modules, so the three files (chunk + two frags) are NOT parallel-disjoint — a writer must create the chunk, then migrate each frag against it, then author the gate against the settled state. The gate is born-RED until BOTH frags are migrated (a half-migration — chunk exists but one frag still re-defines `linearToSrgb` locally — is RED, which is correct). `gates.mjs` + `package.json` registration is append-only to disjoint rows; the orchestrator integrates at close. One worktree:

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — shader-converge (AV.W2.1) | `/Users/mkbabb/Programming/glass-ui-w2-converge` | serial: create chunk → migrate `metaball.frag.ts` → migrate `aurora.frag.ts` → author gate → register. Branches from main with AV.W1 already committed + green. |

No `CARGO_TARGET_DIR` (Node/Vite repo). The lane runs `npm run typecheck`/`npm run build`/the shader gate matrix against its own checkout. The orchestrator runs `git worktree add` before dispatch and owns the `gates.mjs`/`package.json`/`CLAUDE.md`/`PROGRESS.md` integration at close.

## 5. Agent Units

### AV.W2.1 Shared procedural-color/noise GLSL chunk extraction

- **Goal:** the OETF + the Ottosson OKLCh matrices + the FBM rotation constant + (if cleanly KISS — §3a) the value-noise helper live in ONE `.glsl.ts` chunk; both `.frag.ts` modules splice it; no shader re-defines a chunk-owned artefact; the emitted GLSL is character-equivalent to a hand-inlined shader; the equivalence gate stays green.
- **Mechanism (serial):**
  1. **Create the chunk** `src/composables/glass/webgl/shaders/procedural-color.glsl.ts`. Export named `/* glsl */` template-literal string fragments — e.g. `OETF_GLSL` (the `srgbToLinearCh`/`srgbToLinear`/`linearToSrgbCh`/`linearToSrgb` block, VERBATIM from `metaball.frag.ts:124-137`), `OKLCH_MATRICES_GLSL` (the four `mat3` literals + the four space-conversion fns `srgbToOklab`/`oklabToLinearSrgb`/`oklabToOklch`/`oklchToOklab`, VERBATIM from `:141-199`), `FBM_ROT_GLSL` (the `const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);` line), and IFF the `hash21`/noise reconciliation is clean (§3a) `VALUE_NOISE_GLSL` (`hash21` + `valueNoise`). Keep the existing load-bearing provenance comments (the value.js EXACT / transposed-mat3 / radians notes) ON the chunk — they are the contract for the equivalence gate.
  2. **Migrate `metaball.frag.ts`** — delete the now-chunk-owned blocks; splice the chunk fragments into the `METABALL_FRAGMENT_SRC` template via `${OETF_GLSL}` / `${OKLCH_MATRICES_GLSL}` / `${FBM_ROT_GLSL}` interpolation at the same positions; verify the assembled string is character-equivalent (the splice boundary is the only diff). The blob's local `fbm` LOOP stays (per §3a — only `FBM_ROT` converges); re-point the `FBM_ROT` reference at the chunk const.
  3. **Migrate `aurora.frag.ts`** — delete the AV.W1-added local `linearToSrgb` block; splice `${OETF_GLSL}` (aurora uses only the forward OETF + maybe `srgbToLinear`; splice exactly what it references — do NOT splice the OKLCh matrices, aurora has no in-shader OKLCh path). Reconcile aurora's inline `mat2 r = mat2(0.8,0.6,-0.6,0.8)` to the chunk `FBM_ROT` const (splice `${FBM_ROT_GLSL}` + reference it). If §3a's `hash21` reconciliation is OUT-of-scope, aurora keeps its own `hash21`/`vnoise`/`fbm` loop and only the OETF + FBM-rot constant converge.
  4. **Re-point the glsl-port provenance** — `metaball-color.glsl-port.ts`'s header comment now cites the SHARED chunk as the GLSL source it mirrors. The TS math is unchanged.
  5. **Author the gate** (§6) against the settled state.
- **Files:** the chunk (create), the two frags (modify), the glsl-port (modify provenance), the gate (create), `gates.mjs`/`package.json` (register).
- **Sub-gate:** `proof:shader-shared-source` (NEW, born-RED) green + bite-verified; `proof:blob-color-equivalence` (the 8-assert 1e-6) STAYS green (the math moved homes, did not change — if it reddens, the splice corrupted a matrix → a real defect); `proof:blob-space-gamma` + AV.W1's `proof:aurora-space-gamma` stay green; `proof:blob-value-free` stays green (the chunk is GLSL string, value.js-free); `npm run typecheck` + `npm run build` green; both shaders compile + link on a live WebGL2 context (manual browser verify in `PROGRESS.md`).

## 6. Hard Gate

W2 closes when every condition below is evidence-backed:

1. **AV.W2.1** — the chunk exists at `src/composables/glass/webgl/shaders/procedural-color.glsl.ts`; both `.frag.ts` modules splice it; `proof:shader-shared-source` GREEN + bite-verified.
2. **`proof:shader-shared-source` (NEW, born-RED)** — GREEN. The gate (house template, comment-strip first) asserts: (a) the chunk EXISTS and exports the OETF + the four Ottosson `mat3` literals + the `FBM_ROT` constant as its SINGLE definition; (b) comment-strip `metaball.frag.ts` + `aurora.frag.ts` → NEITHER contains a LOCAL re-definition of `linearToSrgb`/`srgbToLinear` (the `float linearToSrgbCh`/`vec3 linearToSrgb` function bodies), the four Ottosson `mat3(...)` literals, or the `mat2(0.8, 0.6, -0.6, 0.8)` FBM rotation literal — each must be 0 in BOTH frags (the chunk is the single source; a re-inlined local definition is the bite); (c) both frags REFERENCE the chunk (the splice interpolation `${OETF_GLSL}` etc. is present in each `.frag.ts` source). Bite-check: re-inline a local `vec3 linearToSrgb(vec3 c)` body into `aurora.frag.ts` → RED; re-inline a `mat3 LMS_TO_OKLAB = mat3(...)` literal into `metaball.frag.ts` → RED.
3. **`proof:blob-color-equivalence`** — STAYS GREEN (the 8-assert 1e-6 CPU-equivalence; the matrices moved to the chunk but are byte-identical, so the port still matches value.js).
4. **`proof:blob-space-gamma`** — STAYS GREEN (the blob OETF seam intact via the chunk).
5. **`proof:aurora-space-gamma`** (AV.W1's aurora-OETF gate) — STAYS GREEN (aurora's OETF now sourced from the chunk; the gate sees the spliced definition).
6. **`proof:blob-value-free`** — STAYS GREEN (the chunk imports no value.js; the blob/watercolor-dot value.js-free invariant holds).
7. **No regression.** `proof:webgl-substrate-single`, `npm run typecheck`, `npm run build`, the existing shader-color suite stay GREEN. Both shaders compile + link on a live WebGL2 context; the aurora preset snapshots + blob snapshots are byte-stable OR re-blessed-with-rationale (only if a §3a noise reconciliation changed a field). `PROGRESS.md` records the wave with a green run id + the chosen `hash21` route + any re-bless.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:shader-shared-source` | `scripts/proof-shader-shared-source.mjs` | `["local","ci"]` | re-inline a local `vec3 linearToSrgb(...)` into `aurora.frag.ts` → RED; re-inline a Ottosson `mat3(...)` literal into `metaball.frag.ts` → RED |

**Canonical gate name:** `proof:shader-shared-source` is the canonical name across the AV wave specs and `gates.mjs`. The `AV.md §2` charter table + the §6 inv-θ list carry the earlier placeholder `proof:shader-chunk-single`; that is the same single gate under its pre-rename label — there is exactly ONE W2 convergence gate. (The charter row is the authoring placeholder; the spec name binds.)

The gate follows the house template (`scripts/proof-blob-space-gamma.mjs`): comment-strip first (false-witness discipline — the chunk's own provenance comments quote the matrix names; strip before matching so a COMMENT mention is not a false-RED), a pure exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs` (`gateArtifactPath`/`writeGateArtifact`/`snapshotStamp`), a human summary, `process.exit(1)` on any violation. Register in `package.json` scripts + `gates.mjs` manifest ONLY after BOTH frags are migrated (`verifyCi()` enforces manifest==ci; do not register a born-RED gate against an un-migrated frag).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after the chunk + both migrations land, and at close.
- `npm run build` — after the chunk + each frag migration, to confirm the template-splice emits both shaders with the chunk inlined (Vite bundles the `.glsl.ts` string module; confirm `dist` carries the assembled shader strings).
- `proof:shader-shared-source` + the no-regression shader-color gate matrix (`proof:blob-color-equivalence`, `proof:blob-space-gamma`, AV.W1's `proof:aurora-space-gamma`, `proof:blob-value-free`, `proof:webgl-substrate-single`) run after the migration completes and at close.
- A live WebGL2 compile+link verify (both shaders) — manual browser, recorded in `PROGRESS.md`. A splice that produces a syntactically-broken shader fails `gl.linkProgram`; the snapshot tests do not exercise a real GL context (the `proof:webgl-golden` headless runner is KEEP-BOOK debt per the audit), so the manual link verify is the binding evidence that the spliced GLSL compiles.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.

No formatter is intentionally skipped; the gate fleet + the live link verify are the binding evidence for the GLSL convergence.

## 8. Verification Artefacts

- `proof:shader-shared-source` JSON artefact (byte-stable, via `scripts/gate-output.mjs`) — the gate output path under the repo gate-artefact dir.
- The character-equivalence diff (assembled `METABALL_FRAGMENT_SRC` / `FRAGMENT_SRC` before vs after the splice) proving the emitted GLSL is identical modulo the splice boundary — recorded/linked in `PROGRESS.md`.
- The live WebGL2 compile+link verify note (both shaders) — `docs/tranches/AV/PROGRESS.md`.
- The chosen `hash21`/noise-reconciliation route + any snapshot re-bless rationale — `PROGRESS.md`.
- The `/color` leaf no-op confirmation (the CPU color-resolution path is already converged at the leaf — §3.6) — `PROGRESS.md`.
- The green CI run id for the wave — `PROGRESS.md`.
- The integration commit hashes (per §9).

## 9. Commit Plan

- **Implementation commit (chunk + migrations)** — `refactor(tranche-AV): W2 — extract shared procedural-color/noise GLSL chunk; converge aurora+blob OETF/matrices/FBM-rot onto one source`. (Body required — names the extracted artefacts (OETF, Ottosson matrices, FBM_ROT, value-noise), the two migrated frags, the `hash21` route decision, and that the emitted GLSL is character-equivalent.)
- **Gate-registration commit** — `chore(tranche-AV): W2 — register proof:shader-shared-source (born-RED, manifest==ci)`. (Body required — gate change; names the manifest row + tags + the bite.)
- **Integration + docs commit** — `docs(tranche-AV): W2 close — PROGRESS green run id + CLAUDE.md webgl/shaders chunk line + link-verify + char-equivalence diff`. (Body required — status/close; records the `/color` leaf no-op + any re-bless.)

(If a §3a noise reconciliation re-blesses snapshots, a separate `test(tranche-AV): W2 — re-bless <shader> snapshots for the converged value-noise field` commit precedes the docs commit, body naming the reconciled field + the visual-parity verify.)

## 10. Dependencies

- **Depends on**: **AV.W1** (the aurora OETF fix — W1 adds `linearToSrgb()` to `aurora.frag.ts` + inserts `col = linearToSrgb(col)` before output + re-bakes the 11 presets via `profile-aurora.mjs` + lands the `proof:aurora-space-gamma` (or widened `proof:blob-space-gamma`) gate + re-blesses aurora snapshots). W1 lands FIRST and must be green: W2 de-duplicates the OETF that W1 introduced as a copy. Landing W2 before W1 would have nothing to de-duplicate (aurora has no OETF yet) — the convergence is meaningless without the duplicated definition existing. The `useWebGLCanvas` substrate (AU.W6) + the `/color` leaf (AU.W5) + the blob shader-quality stage (AU.W7) are all landed at HEAD and unchanged by W2.
- **Blocks**: nothing publish-blocking (W2 is non-publish-blocking IMPL). The AV tranche FINAL/close depends on W2's gate matrix being green. W2 is the gestalt-transposition headline of the aurora-fix arm — it closes the divergence CLASS, so a future aurora/blob shader feature cannot re-introduce the OETF drift.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The convergence CLOSES the divergence that PRODUCED the AV.W1 bug. The archaeology IS the finding: aurora + goo-blob both ride `useWebGLCanvas` (AU.W6), both consume the `/color` leaf (AU.W5), both bake/resolve OKLCh, both need the sRGB OETF, both use the rotated-octave FBM + the Ottosson matrices — but the two shaders' color math was authored INDEPENDENTLY (the blob's W7 SOTA stage added `linearToSrgb`; aurora's verbatim-port pipeline never did), so the OETF DIVERGED: the blob applied it (`metaball.frag.ts:278`), aurora did not (`aurora.frag.ts:817` output linear without the OETF → ~2.2× too dark). That divergence IS the AV.W1 defect. W1 fixes it by COPYING the blob's OETF into aurora — which creates a TWO-COPY duplication. W2 deletes the duplication by extracting the OETF (+ the matrices + the FBM rotation) to ONE chunk both shaders splice, so the OETF can NEVER again diverge: there is exactly one definition. The root cause (independent shader-math authoring) is structurally eliminated, not merely patched. This is the gestalt transposition — delete the duplication that let the bug exist — over an incremental "fix aurora and move on."

Three HEAD-grounding decisions fold into §3a (NOT prior-failure archaeology — they are KISS-scoping corrections against the live shaders):
1. **`hash21` is NOT identical across the two shaders** (aurora 2D-fract vs blob 3D-`p3`). The naive "extract the noise helper" would silently change one shader's field. §3a reconciles or scopes-out; the gate targets the OETF + matrices + FBM-rot as MANDATORY, the noise helpers as extract-if-clean.
2. **`fbm` LOOP shapes differ** (lacunarity 2.02 vs 2.0; uniform-octaves vs param-octaves). Only the shared `FBM_ROT` CONSTANT converges; the loops stay per-shader (forcing one `fbm` would re-bless both fields for no gain — the over-abstraction the wave forbids).
3. **The CPU color-resolution path is ALREADY converged** at the `/color` leaf (DEC-AT-7 / AU.W5 — aurora's `oklchToLinear` bake + the blob's `oklchToGammaRgb` resolver both source value.js's Ottosson core through the one leaf). W2's convergence is the GPU-side GLSL math; §3.6 records the CPU-side as a landed no-op, NOT a new forced shared resolver (aurora bakes a palette of stops; the blob resolves one base color — different signatures, legitimately).

## SOTA crosswalk (folded)

Binding authority: `docs/tranches/AV/audit/SOTA-crosswalk.md`. W2 owns the §2.A A7 shared-noise-leaf row and ratifies the splice-mechanism choice the crosswalk frames.

### A7 — shared texture-free `snoise` GLSL leaf — DEFER (with the named trigger)

The §2.A A7 row: a shared texture-free `snoise` (simplex-noise) GLSL leaf under `composables/glass` (Ashima/Gustavson), canonical across aurora/goo-blob/constellation. Status in the crosswalk: **DEFER** — each shader currently self-contains its noise, and the two HEAD hashes already diverge (the §3a `hash21` 2D-vs-3D reconciliation). [SOTA §2.A A7, cit. B2 §4 / B7 §2]

- **W2 disposition: DEFER, consistent with the crosswalk.** W2 extracts the OETF + the Ottosson matrices + the `FBM_ROT` constant (the load-bearing convergence) and — IFF cleanly KISS per §3a — the value-noise helper. A NEW simplex `snoise` basis is NOT introduced: the shaders use value-noise/FBM, not simplex, and minting a simplex leaf no consumer references would be substrate-without-consumer (J inv 10).
- **The trigger (named):** **the AV.W8 constellation primitive lands needing the same procedural basis.** When the constellation's node-drift wants an fbm/domain-warp field (SOTA §2.D D3 — "fbm + domain-warp drift driving nuclei/blob positions … cheap in 2D"), the THIRD consumer materializes and the shared-noise leaf clears the ≥2-distinct-consumer bar with a real cross-surface need. At that point the `snoise`/value-noise basis folds into the W2 chunk.
- **The home when it folds:** `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — the SAME chunk W2 creates for the OETF/matrices/FBM-rot. The chunk is the named landing site; the simplex/value-noise sub-source is appended there when the constellation triggers it. Record the trigger in `PROGRESS.md` alongside the §3a `hash21`-route decision.

### Splice mechanism — the crosswalk RATIFIES the template-literal choice

The W2 splice is JS template-literal interpolation (`${OETF_GLSL}`) at module load — NO `#include` preprocessor, no bundler step. The SOTA corpus's include-library prior art (LYGIA / GM-Shaders) uses a `#include` preprocessor, which would add exactly the build step W2 deliberately avoids. The crosswalk's E3 row (§2.E — "author TSL/WGSL-parity WITHOUT taking the Three.js dep; glass-ui's hand-rolled substrate is the lighter correct choice") ratifies the same posture: **the hand-rolled string-splice is the KISS-correct choice over an include-preprocessor dependency.** The Ottosson "EXACT vs convenience-matrix" 1e-6 trap (already documented `metaball.frag.ts:14-19`) is the contract the `proof:blob-color-equivalence` 8-assert gate certifies — moving the matrices to the chunk does not change the math, so the equivalence stays green (the gate is the binding evidence the splice preserved the EXACT constants).

**No DEFER reversal in W2:** the A7 shared-noise leaf stays BOOK with the constellation trigger named; nothing in the crosswalk promotes it to an in-W2 ADOPT.
