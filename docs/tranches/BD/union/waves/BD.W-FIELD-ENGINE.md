# BD.W-FIELD-ENGINE — the shared `field/{noise,flow,color}` chunk (the GENUINE 6-fork DRY hoist, under the numeric net)

**Band 11 (V GPU-only spine + field) · depends: W-WAVE-FIELD-HARNESS** (the binding safety edge `W-FIELD-ENGINE ← W-WAVE-FIELD-HARNESS`, `EXECUTION-DAG.md:130,216` — the noise/flow hoist is a safety REGRESSION until the numeric net exists; a transcription drift in the hoist, a `2.02→2.0` lacunarity, is INVISIBLE to the pre-fix regex gates). The numeric round-trip net lands FIRST so every hoisted basis is parity-verified.

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build (the `field/` chunk + the 6-fork re-points + the `procedural-color.wgsl.ts` move) edits `src/` and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `critique/passd-field.md §2`, `PASSD-FOLD §Batch-2 W-FIELD-ENGINE CONFIRMED`)

The roster (`UNIFIED-ROSTER.md:146`) proposes a shared `field/{noise,wave,flow,color}` chunk. Pass-D traced the REAL fork count at HEAD and CONFIRMED it is a GENUINE DRY hoist (NOT a 1-consumer over-abstraction) — the 5-point NOT-OVERFIT bar PASSES:

1. **`valueNoise`/`hash21`/`potentialFBM` is forked 6× — confirmed at HEAD.** Independently transcribed across `paper-grid` (`composables/paperGrid.ts` ×14 references · `shaders/paper-grid.glsl.ts` ×11 · `shaders/paper-grid.wgsl.ts` ×10) AND `dot-flow-field` (`composables/flowField.ts` ×12 · `shaders/flow-field.glsl.ts` ×10 · `shaders/flow-field.compute.wgsl.ts` ×10) = **6 transcription sites** for the SAME value-noise basis. A `hash21(` appears in 14 strings suite-wide. A `2.02→2.0` lacunarity drift or a `mat2(0.8,0.6,…)` sign error in ONE of the 6 is invisible to the pre-fix regex gates (the exact reason `W-WAVE-FIELD-HARNESS` is the prerequisite).

2. **`ω=√(g·k)`, `g=9.81` is LIVE in BOTH concentric + dot-flow under TWO names for ONE constant — confirmed.** `concentric/composables/ringField.ts:66` `RING_GRAVITY = 9.81` (+ `concentric.wgsl.ts:27` + `concentric.glsl.ts:35`) AND `dot-flow-field/composables/flowField.ts:64` `FLOW_GRAVITY = 9.81` (+ `flow-field.glsl.ts:36` + `flow-field.compute.wgsl.ts:22`) — the same Tessendorf dispersion constant, dual-named. The `W-WAVE-FIELD-HARNESS` `waveFieldMath.ts` unifies the MATH (`WAVE_GRAVITY`); this wave re-points the dual names onto the ONE constant.

3. **`procedural-color.wgsl.ts` lives in aurora's feature-dir, NOT the shared chunk.** `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` is shared (the AV.W2 OETF/OKLCh chunk both `aurora.frag`/`metaball.frag` splice), but its WGSL twin `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` is TRAPPED inside aurora's dir — an asymmetry: the shared GLSL chunk has a non-shared WGSL home. The hoist moves it OUT to sit beside the GLSL twin (`field/color`).

4. **The over-abstraction fences TRACE-VERIFY (the NOT-OVERFIT bar holds).** Three registers STAY DISTINCT, confirmed against the actual shaders: the painterly `gnoise`/PCG2D in `procedural-color` (NPR pigment, §3a) stays; the blob's `metaball-noise.wgsl.ts` IQ-noise stays distinct (a different basis for a different surface); each viz's `hostField` (`sampleRingField`/`gridCoverage`/`gerstnerVelocity`) stays LOCAL (the hoist is the BASIS, not the field). The `curlFBM` OPERATOR is already shared (`flow.glsl.ts`/`flow.wgsl.ts`) — the BASIS underneath it is what's forked.

The ask is the field critique §2's KEEP-as-specced verdict with the named scoping: hoist the genuine value-noise basis (the 6 forks), unify the dual-named gravity constant, move `procedural-color.wgsl.ts` out of aurora's dir — under the numeric net W-WAVE-FIELD-HARNESS lands, with the over-abstraction fences MACHINE-LOCKED so the painterly/IQ/host-field registers stay distinct.

## The mechanism — the value-noise basis chunk, parity-gated at every move

ONE shared `field/` chunk for the genuine fork (noise/flow/color), the dual-named gravity unified, the WGSL color twin moved home — EVERY hoist verified by the W-WAVE-FIELD-HARNESS numeric round-trip (a moved basis must read byte-equivalent at the parity bar).

### 1. `src/composables/glass/webgl/shaders/field/` — the shared chunk (the genuine-fork hoist ONLY)

- **`field/noise.glsl.ts` + `field/noise.wgsl.ts`** — the value-noise basis: `hash21`, `valueNoise`, `potentialFBM` (the 6-fork target). Each is the AV.W2 `procedural-color` shared-chunk precedent applied to the value-noise basis: a pure shader STRING export, basis-agnostic, declaring no uniforms. `paperGrid.ts`/`paper-grid.{glsl,wgsl}.ts` + `flowField.ts`/`flow-field.{glsl,compute.wgsl}.ts` re-point onto it (the 6 sites splice the ONE chunk instead of transcribing the basis). The ASSEMBLED shader string is byte-equivalent (a splice-recompose, NOT a value change — the `mediums.glsl.ts` oil-modes carve precedent).
- **`field/flow.*`** — the `curlFBM` operator is ALREADY shared (`flow.glsl.ts`/`flow.wgsl.ts`); the roster says "don't gratuitously MOVE `flow.*`." This wave does NOT relocate the flow files — it re-homes the value-noise BASIS the curl operator's `potentialFBM` prototype consumes (the basis-agnostic split the existing `flow.glsl.ts` `CURL_FBM_GLSL` already declares via the forward-declared `potentialFBM` prototype). The flow operator stays put; its basis dependency points at `field/noise`.
- **`field/color`** — `procedural-color.wgsl.ts` MOVES out of `src/components/custom/aurora/constants/shaders/` to sit beside its GLSL twin (the shared-chunk symmetry restored). Every aurora/blob splice of the WGSL color chunk re-points to the new path; the GLSL twin path is unchanged. The MOVE is byte-identical (the chunk content is unedited — a relocation, not a rewrite).

### 2. The dual-named gravity unified

`RING_GRAVITY` (`ringField.ts:66`) + `FLOW_GRAVITY` (`flowField.ts:64`) both re-point onto `W-WAVE-FIELD-HARNESS`'s `WAVE_GRAVITY = 9.81` (the JS oracle's source-of-truth). The shader-side `RING_GRAVITY: f32 = 9.81` / `#define FLOW_GRAVITY 9.81` stay as the per-backend constant (a shader cannot import a JS const), but the W-WAVE-FIELD-HARNESS gate binds the JS `WAVE_GRAVITY` AND the shader constant from the SAME source-of-truth and `assertParity` REDs if they diverge — so a `RING_GRAVITY = 8.0` after the hoist is caught (the gate reads both, they MUST agree). The unification is the NAME (one constant, two backend spellings verified equal), not a re-derivation.

### 3. Every hoist is PARITY-GATED (the safety edge made binding)

The W-WAVE-FIELD-HARNESS `proof:wave-field-single` numeric round-trip runs over each re-pointed host AFTER the hoist: the JS oracle (`sampleWaveHeight` / `paperGrid`'s `gridCoverage` over the value-noise basis) vs the SHADER eval (the spliced `field/noise` chunk) at the fixed lattice, `assertParity` ≤ the per-viz calibrated bar. A hoist that drifts the basis (a `2.02→2.0` slip in the moved chunk) produces a NON-zero computed ΔE → RED. The hoist is byte-equivalent OR the gate catches it.

## The gate — `proof:field-engine` (born-RED → GREEN; SPLICE-FOLLOWING + numeric-parity-COMPOSING, never a presence-regex)

`scripts/proof-field-engine.mjs`, `tags: ["local","ci"]` (the source-structure + the over-abstraction-fence arm; the numeric basis-parity is W-WAVE-FIELD-HARNESS's `proof:wave-field-single`, COMPOSED here over the moved hosts — never re-implemented). The detector comment-strips first and exports a pure detector for the self-test bites.

- **E1 — the value-noise basis exists ONCE in `field/noise.*` + the 6 forks SPLICE it (no surviving transcription).** The detector resolves the `${...}` splices (`resolveSplices`, the harness leaf) and asserts: (a) `field/noise.{glsl,wgsl}.ts` exports `hash21`/`valueNoise`/`potentialFBM`; (b) each of the 6 former-fork hosts (`paperGrid.ts`, `paper-grid.{glsl,wgsl}.ts`, `flowField.ts`, `flow-field.{glsl,compute.wgsl}.ts`) SPLICES the chunk (an `import` + a `${FIELD_NOISE_*}` splice) and carries NO LOCAL `function valueNoise`/`fn valueNoise`/`float valueNoise` transcription (the fork is gone, not duplicated). A surviving local `valueNoise` body in a re-pointed host REDs (the half-hoist bite). `facts.forkSites` records each host's verdict (spliced / surviving-fork).
- **E2 — the assembled-shader byte-equivalence (the splice-recompose, not a value change).** For each re-pointed host, the detector asserts the ASSEMBLED shader string (`resolveSplices`) over the moved chunk is byte-equivalent to the HEAD pre-hoist assembled string at the basis lines (the same byte multiset re-ordered by the splice concat, NOT a coefficient change — the `mediums.glsl.ts`/`composable-return-types` recompose-hash precedent). A hoist that ALTERS a basis coefficient (`2.02→2.0`) REDs E2 (the byte-recompose) AND `proof:wave-field-single` (the numeric ΔE) — belt-and-suspenders.
- **E3 — the numeric basis-parity COMPOSES the harness (no presence-regex).** `proof:field-engine` calls `proof:wave-field-single`'s round-trip over the re-pointed hosts (it COMPOSES `shader-eval-harness.mjs` — a bare `/FIELD_NOISE/.test(src)` presence-check that the chunk is spliced WITHOUT a numeric parity run REDs `proof:gate-truth` G2). The hoist is verified by a COMPUTED ΔE, not a name-presence of the chunk.
- **E4 — the dual-named gravity is ONE source.** The detector asserts `RING_GRAVITY` + `FLOW_GRAVITY` both resolve to the SAME numeric value AND the W-WAVE-FIELD-HARNESS gate binds them against `WAVE_GRAVITY` (the source-of-truth). A `RING_GRAVITY = 8.0` after the hoist REDs (caught by the harness's read-both-constants discipline). `facts.gravityUnified` records the resolved values.
- **E5 — the over-abstraction fences HOLD (the NOT-OVERFIT bar, machine-locked).** The detector asserts the DISTINCT registers stay un-hoisted: (a) the painterly `gnoise`/PCG2D in `procedural-color` is NOT re-pointed onto `field/noise` (a different basis — NPR pigment); (b) the blob's `metaball-noise.wgsl.ts` IQ-noise stays distinct (not folded into the chunk); (c) each viz's `hostField` (`sampleRingField`/`gridCoverage`/`gerstnerVelocity`) stays LOCAL (the hoist is the BASIS, never the field). An over-cut folding the painterly gnoise / the IQ-noise / a host field into `field/noise` REDs (the over-abstraction bite — the NOT-OVERFIT fence made structural).
- **E6 — `procedural-color.wgsl.ts` is MOVED out of aurora's dir + the splices re-point.** The detector asserts (a) `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` is ABSENT (the file moved); (b) the new `field/color`/shared path exports the SAME chunk byte-identical; (c) every aurora/blob WGSL color splice re-points to the new path (no broken `${...}` import). A move that leaves a broken splice import REDs.

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a re-pointed host with a surviving LOCAL `valueNoise` body (a half-hoist) → E1 RED.
- (b) a hoist that drifts a basis coefficient `2.02 → 2.0` → E2 (byte-recompose) RED + the numeric `proof:wave-field-single` RED.
- (c) a `/FIELD_NOISE/.test(src)` presence-check with no numeric parity run → E3 RED (the theater-by-inheritance bite).
- (d) a `RING_GRAVITY = 8.0` after the hoist → E4 RED (the dual-named-divergence bite).
- (e) the painterly `gnoise` / the IQ-noise / a host field folded into `field/noise` → E5 RED (the over-abstraction bite).
- (f) a `procedural-color.wgsl.ts` move leaving a broken splice import → E6 RED.

**What reds on the pre-fix tree (born-RED by construction):** E1 (the 6 forks transcribe the basis locally, no `field/noise` chunk), E4 (the dual-named gravity is two constants), E6 (`procedural-color.wgsl.ts` is in aurora's dir). GREEN only after the basis chunk + the 6 re-points + the gravity unify + the WGSL color move land, each parity-verified.

## The binding "π" — device-free, no NEW pixels (the byte-equivalence + numeric witness)

This is a DRY-hoist wave — its binding verification is the BYTE-EQUIVALENCE + the numeric parity, NOT a `tests-visual/*.spec.ts` painted readback (the hoist changes NO viz render — a byte-equivalent basis splice paints byte-identical; BB inv-4, the `W-CARVE5`/`mediums.glsl.ts` carve precedent). Witnessed:

1. **`node scripts/proof-field-engine.mjs --self-test`** — the 6 bites each flag their clause (the half-hoist, the coefficient drift, the presence-check, the dual-named divergence, the over-abstraction fold, the broken-splice move).
2. **The composed numeric witness** — `proof:wave-field-single --witness` (W-WAVE-FIELD-HARNESS) over the re-pointed hosts PRINTS ≈0 ΔE (the proof the hoist is faithful — the moved basis reads byte-equivalent at the calibrated bar). A deliberately-drifted hoist prints > bar.

The hoist paints byte-identical (E2 byte-recompose); there is NO new gestalt surface (the field-source render is unchanged — `W-CONCENTRIC-LEVELSET`/`W-PAPERGRID-WARP` CHANGE the field and carry their own gestalt rows; this wave only collapses the fork).

## The gestalt row

**NO `proof:ba-gestalt` verdict (device-free — BB inv-4; the DRY hoist changes zero paint where the basis already paints).** A byte-equivalent basis splice paints byte-identical; the acceptance is mechanical: the 6 forks collapse onto the ONE chunk, the byte-recompose holds, the numeric parity is ≈0, the over-abstraction fences hold, the WGSL color twin moves home. The waves that CHANGE the field (`W-CONCENTRIC-LEVELSET`, `W-PAPERGRID-WARP`) carry the gestalt verdicts.

## Fences

- **The numeric net is the PREREQUISITE — no hoist before it.** `W-FIELD-ENGINE ← W-WAVE-FIELD-HARNESS` (the binding safety edge). A transcription drift in the hoist (`2.02→2.0`) is invisible until the numeric round-trip net exists; the hoist is a safety regression without it.
- **The over-abstraction fences are ABSOLUTE (the NOT-OVERFIT bar, machine-locked E5).** The painterly `gnoise`/PCG2D (NPR pigment) STAYS distinct; the blob's IQ-noise STAYS distinct; each viz's `hostField` STAYS local. The hoist is the value-noise BASIS ONLY — never a host field, never the painterly/IQ register. An over-cut folding them in REDs.
- **The hoist is byte-equivalent — a splice-recompose, not a value change (E2).** The assembled shader string over the moved chunk is byte-equivalent at the basis lines; a coefficient change REDs both the byte-recompose AND the numeric parity.
- **The dual-named gravity is ONE source (E4).** `RING_GRAVITY`/`FLOW_GRAVITY` resolve to the SAME value, verified against `WAVE_GRAVITY` (the W-WAVE-FIELD-HARNESS source-of-truth). A post-hoist divergence REDs.
- **Don't gratuitously MOVE `flow.*`.** The `curlFBM` operator stays put (already shared); only the value-noise BASIS it consumes is hoisted. The roster's "don't gratuitously MOVE `flow.*`" fence is honored.
- **DEFER the `wave` layer.** The roster scopes the chunk to noise/flow/color; the `wave` layer is DEFERRED (concentric mid-redesign at W-CONCENTRIC-LEVELSET). The shared wave-field math lives in W-WAVE-FIELD-HARNESS's `waveFieldMath.ts` for the gate, not yet hoisted into a shared shader chunk — this wave does NOT pre-hoist the wave layer.
- **`procedural-color.wgsl.ts` MOVES, not re-writes (E6).** The chunk content is byte-identical; only its path changes (out of aurora's dir to sit beside the GLSL twin). Every splice re-points; no broken import.

## Disposition links

- **`critique/passd-field.md §2`** (`W-FIELD-ENGINE` is a GENUINE DRY hoist — `valueNoise`/`hash21`/`potentialFBM` ×6, `ω=√(g·k)` dual-named in concentric+dot-flow; the over-abstraction fences trace-verify; KEEP as specced) → BUILT (E1 the 6-fork splice, E4 the gravity unify, E5 the over-abstraction fences). CLOSED at the spec level.
- **`PASSD-FOLD §Batch-2 W-FIELD-ENGINE CONFIRMED`** (the genuine fork count + the dual-named gravity + the trace-verified over-abstraction fences + move `procedural-color.wgsl.ts` out of aurora's dir) → BUILT (E5 fences, E6 the WGSL color move). CLOSED.
- **`UNIFIED-ROSTER.md:146`** (the `field/{noise,wave,flow,color}` chunk; SCOPE to the ~3 genuine value-noise hosts; DEFER the wave layer; don't gratuitously MOVE `flow.*`; move `procedural-color.wgsl.ts` out of aurora's feature-dir) → each scoping is a fence (E1 the value-noise hosts, the DEFER-wave fence, the don't-move-flow fence, E6 the color move). CLOSED.
- **COMPOSES `W-WAVE-FIELD-HARNESS`** (`proof:wave-field-single`'s numeric round-trip verifies every hoisted basis; E3 — the byte-equivalence is belt-and-suspenders to the numeric ΔE). Inbound dep — the binding safety edge.
- **PREREQUISITE FOR** `W-CONCENTRIC-LEVELSET` (`← W-FIELD-ENGINE` — the curl-warped fbm terrain reads the shared basis), `W-PAPERGRID-WARP` (`← W-FIELD-ENGINE` — the multi-scale warp reads the shared basis), `W-DOT-IMAGE` (`← W-DOT-UNIFY + W-FIELD-ENGINE`). Forward.
- **Band 11 field arm (`EXECUTION-DAG.md:130` — the field/{noise,flow,color} chunk scoped to the value-noise hosts; the safety net BEFORE the regex hoist)** — the hoist after the numeric net.
