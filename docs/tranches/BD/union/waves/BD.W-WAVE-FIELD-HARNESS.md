# BD.W-WAVE-FIELD-HARNESS — `waveFieldMath.ts` + the NUMERIC per-layer round-trip net (the parity safety net BEFORE the field hoist)

**Band 11 (V GPU-only spine + field) · depends: W-GATE-TRUTH-AUDIT** (it COMPOSES the `scripts/lib/shader-eval-harness.mjs` numeric leaf W-GATE-TRUTH-AUDIT mints — this is the field-arm's FIRST per-viz consumer; `EXECUTION-DAG.md:129`). It is none-inbound on the field arm (the prerequisite-FIRST node) and is the binding safety edge `W-FIELD-ENGINE ← W-WAVE-FIELD-HARNESS` (`EXECUTION-DAG.md:130,216`): the noise/wave/flow hoist is a safety REGRESSION until the numeric net exists.

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build (`waveFieldMath.ts` + the `proof:wave-field-single` gate + the calibrated bars) edits `src/` + `scripts/` and is user-gated. The D2 PoC (`docs/tranches/BD/viz/spikes/numeric-parity-poc.mjs`) already PROVED the JS-oracle + coefficient-flip-bite half runs in <1s and catches the sign-flip/wrong-constant the regex misses (RMS ΔE 7.5e-1 sign-flip / 1.28e-1 wrong-gravity, both shipped-regex-GREEN). This wave hardens that PoC into the shipped per-viz harness.

## The defect / the ask (Pass-D code-grounded — `critique/passd-field.md §1`, `critique/passd-gate-truth-census.md #3-5`, `PASSD-FOLD §GATE-SOUNDNESS + Batch-2 W-GATE-TRUTH-AUDIT`)

The roster's PREREQUISITE-FIRST instinct (`VIZ-FINAL-ROSTER.md:10`, `UNIFIED-ROSTER.md:145`) is correct + load-bearing: hoisting the noise/wave/flow basis under ONLY the existing regex gates is a genuine safety REGRESSION. Pass-D traced WHY at HEAD:

1. **The "round-trip" gates are REGEX-PRESENCE, not numeric, AND so are their self-test bites.** `proof:concentric` clause C3 (`scripts/proof-concentric.mjs:109-121`) is `/function sampleRingField/.test(js) && /fn sampleRingField/.test(wgsl) && /float sampleRingField/.test(glsl)` + a literal-string scan for `/sqrt\(\s*RING_GRAVITY\s*\*\s*k\s*\)/`. It asserts the function NAME appears in each backend; it NEVER evaluates `sampleRingField(p,t)` in JS and compares it to a transcribed value. Worse, the planted-mutation self-test bites DELETE a token (`fn sampleRingField() {}\n// no dispersion`) — they prove a DELETION is caught, never a coefficient flip. `proof:viz-dotflow` F3 (`:169-185`) + `proof:fourier-field` U3 share the shape (name-presence + ONE enumerated literal; the un-enumerated `springK` / Gerstner steepness / wave omega un-checked).

2. **A transcription drift in the hoist is INVISIBLE to those gates.** A `2.02→2.0` lacunarity, a `mat2(0.8,0.6,…)` sign, a `RING_GRAVITY 9.81→8.0`, a sign-flipped `omega` — all render WRONG and sail GREEN. The D2 PoC PROVED this: the wrong-gravity (RMS 1.28e-1) and the omega sign-flip (RMS 7.5e-1) both pass the shipped regex, both caught by a real numeric harness. The `gpu-parity-table.md` "ΔE 0.0" rows are hand-authored and re-read, never computed (the census #1 — the CI keystone).

3. **`waveFieldMath.ts` + `proof:wave-field-single` do NOT exist at HEAD** (confirmed: no file, no `package.json` script). The wave field math is LIVE in concentric (`ringField.ts:66` `RING_GRAVITY = 9.81`, `sampleRingField` at `:146`) AND dot-flow (`flowField.ts:64` `FLOW_GRAVITY = 9.81`, `sampleHeight` at `:240`) under TWO names for ONE constant — the W-FIELD-ENGINE hoist target. The Tessendorf dispersion `ω=√(g·k)` is the shared law trapped in 2 of the 3 hosts that need it.

The ask is `critique/passd-field.md §1`'s binding requirement: `waveFieldMath.ts` + `proof:wave-field-single` MUST do a NUMERIC JS-oracle↔shader parse-and-eval at a fixed sample set with a calibrated tolerance, and its planted-mutation bite MUST flip a COEFFICIENT (sign-flip, `2.02→2.0`, wrong-gravity) and assert the numeric ΔE REDs — NEVER delete a token. **If the executor clones the C3 regex shape, the harness is theater by inheritance.**

## The mechanism — the per-viz wave-field oracle that COMPOSES the shared numeric net

ONE per-viz field-math module (`waveFieldMath.ts`) + the per-viz parity gate (`proof:wave-field-single`) that COMPOSES `shader-eval-harness.mjs` (the W-GATE-TRUTH-AUDIT leaf — NO second oracle, NO re-forked transpiler). The harness is the leaf; this is its first field-arm consumer.

### 1. `src/components/custom/.../composables/waveFieldMath.ts` — the per-layer JS field math, the round-trip ORACLE

The shared deep-water wave-field math, extracted as a pure testable module (the `flowField.ts`/`ringField.ts` evaluator shape generalized to the layer the hoist targets):

- **`waveDispersion(k, g)` → `Math.sqrt(g * k)`** — the Tessendorf dispersion, the ONE law concentric's `RING_GRAVITY` + dot-flow's `FLOW_GRAVITY` both spell. It exports `WAVE_GRAVITY = 9.81` (the dual-named constant unified — `W-FIELD-ENGINE` re-points `RING_GRAVITY`/`FLOW_GRAVITY` onto it; see that wave's hoist).
- **`sampleWaveHeight({ p, t, waves, g })`** — `Σ amp·sin(k·p − ω·t + φ)`, `ω = waveDispersion(k, g)` — the PoC's `sampleHeight` made the shipped pure-JS oracle. Deterministic (no `Math.random`); the SAME `(p, t)` lattice produces the SAME `Float64Array` every run.
- These are PURE + side-effect-free (the `tests/**`/`scripts/**` TS-aware loader imports them directly), so `proof:wave-field-single` can `await import()` them as the JS-oracle arm of `shader-eval-harness.sampleOracle`.

### 2. `proof:wave-field-single` — the per-viz numeric round-trip that COMPOSES the harness

`scripts/proof-wave-field-single.mjs`, `tags: ["local","ci"]`. It is the FIRST per-viz consumer of `shader-eval-harness.mjs` — it does NOT re-implement the oracle/transpiler/ΔE (the W-GATE-TRUTH-AUDIT no-second-net fence — a gate shipping its own inline oracle / a second `oklabFromRgb` REDs `proof:gate-truth` G1/G2). For each wave-field viz (concentric `sampleRingField`, dot-flow `sampleHeight`):

- **W1 — the JS↔WGSL↔GLSL numeric round-trip (the real number, not a name-presence).** `import("../../src/.../waveFieldMath.ts")` → `sampleOracle(sampleWaveHeight, lattice)`; `sampleShader(resolveSplices(WGSL), "sampleRingField", lattice, { lang: "wgsl" })` + the GLSL twin (the harness's transpiler arm, or `headless-gl` for a body with an `fwidth`/texture sample); `assertParity(oracle, wgsl, BAR_concentric)` + `assertParity(oracle, glsl, BAR_concentric)`. A backend that ships `fn sampleRingField` with `RING_GRAVITY = 8.0` or a sign-flipped `omega` produces a NON-zero computed ΔE > bar → RED. A bare `/fn sampleRingField/.test(wgsl)` name-presence with no `import()`/`assertParity` call REDs `proof:gate-truth` G2 (the theater-by-inheritance ban).
- **W2 — the dual-named constant is ONE source.** The detector asserts `RING_GRAVITY`/`FLOW_GRAVITY` both resolve to `WAVE_GRAVITY` (or the same numeric value through `waveFieldMath.ts`) — a shader binding `RING_GRAVITY = 8.0` while the JS oracle binds `9.81` is caught because `sampleShader` binds the SHADER constant and `sampleOracle` binds the JS constant, and `assertParity` REDs on the divergence (the "read from the same source-of-truth" harness discipline).
- **W3 — the COEFFICIENT-FLIP self-test, the deletion-bite BAN.** The `--self-test` arm perturbs a REAL coefficient in the SHADER source string and asserts the COMPUTED ΔE clears the calibrated bar — NEVER a `srcOverride[key] = false` removal or a `fn f(){}` body-swap (FORBIDDEN, `proof:gate-truth` G4). The bite set, each sized to clear its OWN bar (the D2 calibration requirement):
  - **Sign flip:** `sqrt(RING_GRAVITY * k)` → `-sqrt(RING_GRAVITY * k)` MUST red (PoC RMS 7.5e-1 ≫ bar).
  - **Wrong constant:** `RING_GRAVITY 9.81 → 8.0` / `FLOW_GRAVITY 9.81 → 8.0` MUST red (PoC RMS 1.28e-1 ≫ bar).
  - **Lacunarity drift:** the noise basis `2.02 → 2.0` MUST red (the hoist-transcription-drift class — the exact regression the regex misses).
  - **Coefficient scale:** a Gerstner steepness ×2 / the wave `amp[0]` beyond the bar MUST red.
  - **Sub-threshold control:** `amp 0.6 → 0.5999` (RMS 7.3e-3 in the PoC) MUST PASS at a bar that catches MEANINGFUL drift, not a hair-trigger (the D2 "miss" lesson — the bar is per-viz tight, not a generic 0.02).
  - **Identical control:** a faithful re-transcription MUST PASS at ΔE ≈ 0.
- **W4 — the PER-VIZ calibrated bar is recorded + tight.** Each viz's parity bar lives in `docs/tranches/BD/audit/parity-bars.md` (or the harness `PER_VIZ_BARS` map) with the calibration rationale — the smallest meaningful drift it must catch (≤ ~0.005 RMS here, per the D2 calibration insight: a generic 0.02 bar MISSED a 1.7% amplitude drift at RMS 7.3e-3). A bar > 0.05 / one with no recorded calibration REDs (`proof:gate-truth` G7). Each W3 bite asserts the COMPUTED ΔE crosses the bar; a bite that moves the number BELOW its own bar is a BAD bite — the self-test fails loudly ("the planted perturbation did not clear the calibrated bar — the detector is not load-bearing").

**What reds on the pre-fix tree (born-RED by construction):** W1 (no `waveFieldMath.ts`, no `proof:wave-field-single`, the existing `proof:concentric` C3 is name-presence), W3 (the existing self-tests delete tokens, never perturb coefficients), W4 (no calibrated bars recorded). GREEN only after `waveFieldMath.ts` + the harness-composing gate + the coefficient-flip bites + the calibrated bars land.

## The binding "π" — the numeric-truth self-witness (device-free, no pixels)

This is a FIELD-MATH parity wave — its binding verification is the HARNESS RUNNING and producing the right numbers, NOT a `tests-visual/*.spec.ts` painted readback (it paints zero NEW pixels; the field-source render is unchanged — this proves the EXISTING transcription is faithful, the W-FOLD-LEDGER/W-GATE-TRUTH-AUDIT device-free precedent). Witnessed two ways:

1. **`node scripts/proof-wave-field-single.mjs --self-test`** — the coefficient-flip bites each flag their clause (born-RED on the sign-flip/wrong-gravity/lacunarity perturbations → GREEN on the faithful suite). If ANY bite fails to flag, the detector is not load-bearing → RED loudly.
2. **`node scripts/proof-wave-field-single.mjs --witness`** — runs the real oracle↔shader eval over concentric `sampleRingField` + dot-flow `sampleHeight` + their shipped WGSL/GLSL transcriptions and PRINTS the computed `{mean, p99, rms}` per viz (the numbers that REPLACE `gpu-parity-table.md`'s authored `0.0`s — the gate-written ΔE W-GATE-TRUTH-AUDIT G5 re-pins). A faithful transcription prints ≈0 (the proof the harness agrees with itself on identical math); a perturbed one prints > bar.

The REAL-GPU paint proof (per-GPU rasterizer drift, the live Metal capture-pair) stays W-REFLECT3 / the per-viz local close — this wave proves the STRUCTURAL-PROXY ΔE is a real computed number, not an authored zero.

## The gestalt row

**NO `proof:ba-gestalt` verdict, NO roster surface (device-free — BB inv-4).** This is a field-math numeric-integrity wave; it paints zero NEW pixels (the field-source render is byte-unchanged — it proves the transcription is faithful, never changes what paints). The W-CONCENTRIC-LEVELSET / W-PAPERGRID-WARP / W-FIELD-ENGINE waves that CHANGE the field carry their OWN gestalt rows; this wave makes their parity claims honest so THEIR gestalt rows close paint-true.

## Fences

- **No second numeric net.** `proof:wave-field-single` COMPOSES `shader-eval-harness.mjs` (the W-GATE-TRUTH-AUDIT leaf) — a gate shipping its own inline oracle / a second `oklabFromRgb` / a second transpiler REDs (`proof:gate-truth` G1/G2 + the `reflect-capture-verify` no-second-copy discipline). The harness is the ONE leaf; this is its first field-arm consumer, never a re-implementation.
- **No deletion bites — coefficient-flip MANDATORY.** A sign/constant/lacunarity/scale perturbation that clears the calibrated bar is REQUIRED; a `false`-override / `fn f(){}` body-swap as the only bite is FORBIDDEN (W3, `proof:gate-truth` G4). The clone-the-C3-regex-shape outcome is the theater this wave EXISTS to prevent.
- **Per-viz calibration, not a global bar.** The bar is tight enough to catch the smallest MEANINGFUL drift per viz (W4, the D2 lesson — a generic 0.02 bar is a regex by another name).
- **The numeric net is the PREREQUISITE — no hoist before it.** `W-FIELD-ENGINE ← W-WAVE-FIELD-HARNESS` is the binding safety edge: a transcription drift in the noise/wave/flow hoist (a `2.02→2.0`) is invisible until this net exists. The hoist is a safety regression until this lands.
- **Splice-following is inherited.** `sampleShader` reads `resolveSplices(WGSL)` (the assembled shader, not the literal file) — a concentric WGSL that splices its field body from an imported module is scanned post-splice (the harness's G3 discipline, carried).
- **Presets-in-consumers.** The demo hues (teal/coral) stay presets-in-consumers; the field math is the library identity. The harness proves the MATH transcription, never a consumer preset.

## Disposition links

- **`critique/passd-field.md §1`** (the round-trip gates are regex-presence + their self-test bites delete tokens; `waveFieldMath.ts` + `proof:wave-field-single` MUST be a numeric JS-oracle↔shader eval with a COEFFICIENT-FLIP bite, NOT cloned from the C3 regex shape) → BUILT (W1 numeric round-trip, W3 coefficient-flip bites, the deletion-bite ban). CLOSED at the spec level.
- **`critique/passd-gate-truth-census.md #3-5`** (`proof:concentric`/`viz-dotflow`/`fourier-field` "round-trips" = `.test(/fn name/)`; the bites DELETE the body) → this wave's per-viz field gate is the wave-field arm's real numeric net (the SUITE-WIDE fix is W-GATE-TRUTH-AUDIT; this is the field-viz consumer). CLOSED for the wave-field arm.
- **`PASSD-FOLD §GATE-SOUNDNESS + Batch-2 W-GATE-TRUTH-AUDIT`** (the false-green class is suite-wide; the `waveFieldMath.ts` harness MUST be the numeric net — if cloned from the C3 regex shape it is theater) → BUILT (W1-W4 numeric, the clone-the-regex outcome barred). CLOSED.
- **`docs/tranches/BD/viz/spikes/numeric-parity-poc.mjs` + `RESULTS.md`** (the D2 PoC: a pure-JS oracle + coefficient-flip bites catch the sign-flip/wrong-gravity the regex greens; the per-viz calibration is the "miss" lesson) → the SEED this wave hardens into the shipped per-viz harness (the shader arm is the W-GATE-TRUTH-AUDIT leaf this composes). De-risked.
- **COMPOSES `W-GATE-TRUTH-AUDIT`** (`scripts/lib/shader-eval-harness.mjs` — the `sampleOracle`/`sampleShader`/`fieldDeltaE`/`assertParity`/`resolveSplices` net; this is the FIRST field-arm consumer, `EXECUTION-DAG.md:129`). Inbound dep.
- **PREREQUISITE FOR `W-FIELD-ENGINE`** (the noise/wave/flow hoist is a safety REGRESSION until this numeric net exists — `EXECUTION-DAG.md:130,216` the binding safety edge). Forward. Also feeds `W-CONCENTRIC-LEVELSET` / `W-PAPERGRID-WARP` (both ← W-FIELD-ENGINE; both lean on the wave-field parity gate this lands).
- **Band 11 field-arm prerequisite-FIRST node (`EXECUTION-DAG.md:132` — the field-engine.md §7 ask #1, "no hoist before the numeric net")** — none-inbound on the field arm.
