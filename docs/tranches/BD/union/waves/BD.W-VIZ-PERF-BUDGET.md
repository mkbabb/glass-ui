# BD.W-VIZ-PERF-BUDGET — the WORST-CASE viz frame-time budget (real-GPU measured, the eval-count→cap derivation BINDING)

**Band 11 (V GPU-only spine + field) · depends: W-GPU-ONLY-SPINE** (`EXECUTION-DAG.md:127-128` — the budget gate measures the GPU-ONLY render path: after the Canvas2D/swraster purge, the only render is the WebGPU/WebGL2 dual-backend, so the budget is over the live GPU substrate, never a Canvas2D fallback). It carries the eval-count→M/K-cap derivation that BINDS on `W-BLOB-MULTICORE` (the wave that owns the actual per-fragment cost).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build (`proof:viz-perf-budget.mjs` + the real-GPU frame-time methodology + the derived cap) edits `scripts/` and is user-gated. The D2 spike (`spikes/RESULTS.md §Spike 0`) already MEASURED the floors (live real-GPU rAF sampler: blob + aurora avg 10.21ms / 0 long frames — vsync-capped, GPU headroom), so the methodology is grounded in real numbers, not reasoning.

## The defect / the ask (Pass-D code-grounded — `critique/passd-foundation.md F2`, `PASSD-FOLD §Batch-2 W-VIZ-PERF-BUDGET + D2 measurement`)

The roster row (`UNIFIED-ROSTER.md:147`, `VIZ-FINAL-ROSTER.md:17`) is verbatim *"The context-cap / compute-vs-fragment / DPR perf budget (`proof:viz-perf-budget`)."* That is the ENTIRE spec. Pass-D found it is a NUMBER-FREE, methodology-free shell with the actual cost owned by a DIFFERENT wave:

1. **No frame-time number, no methodology, no cap.** No `≤8ms p50 @ 4×-CPU`, no `≤16.7ms`, no per-DPR ceiling, no enrolled-surface roster. `proof:viz-perf-budget.mjs` is NOT authored (confirmed absent). A gate that names no number can only assert structure, never the BUDGET — it cannot FAIL the thing it is named for (the F2 finding: a budget gate with no number is a placeholder, the close-class lie the gestalt bar kills).

2. **The actual cost lives in a SEPARATE wave with no binding edge.** The real per-fragment number lives in `W-BLOB-MULTICORE` (`VIZ-FINAL-ROSTER.md:26`): *"sceneDistG inside the 24-step shadow raymarch → ~825 evals/frag at M6/K12."* Pass-D TRACED this in the live shader and CONFIRMED it: `sceneDistG` (`metaball.frag.ts:97`) = `1 body + MAX_SATS(4, constants.ts:13) + TRAIL_N(15, constants.ts:16)` = **20 evals**, called once at the main scene (`:286`) PLUS 24× inside `softShadow2D` (`:197` `for (int i = 0; i < 24; i++)` → `:199` `sceneDistG(...)`, invoked at `:387`) = **25 × 20 = 500 evals/frag at M=1 TODAY**, scaling to ~825 at the M6/K12 cap. The framework's old "~33 evals" counted ONE `sceneDistG` and FORGOT the 24× shadow multiplier — confirmed off by 24×. So the BUDGET (Band 11) and the DERIVATION (Band 13) are in different bands with NO binding edge.

3. **The floors have HEADROOM — they are NOT the test (D2 measurement, the methodology grounding).** Live measure (real Chrome, WebGPU, 1440×900, 3s rAF sample): blob (M=1 default) avg **10.21ms** / p95 11.7 / max 12.2 / **0 frames >20ms**; aurora avg **10.21ms** / p95 11.6 / max 12.2 / 0 long. The IDENTICAL 10.21ms across two DIFFERENT shaders PROVES both are DISPLAY-VSYNC-capped (~98-120Hz), NOT shader-bound — the GPU has SLACK at the floor. **So the budget gate must measure the WORST case** (M=6 multicore + retina DPR + multiple live contexts per route), NOT the floor (which has headroom and proves nothing), AND it must read the TRUE GPU cost (the rAF sampler is vsync-BLIND to GPU slack — a chrome-devtools performance-trace GPU-track read is needed for the real GPU time under the vsync ceiling).

The ask is `critique/passd-foundation.md F2`'s FIX: SPECIFY (a) the real-GPU (NOT SwiftShader — the W-AURORA-SWRASTER lesson: the headless path is software and measures the wrong floor) frame-time methodology over N frames at the enrolled-surface DPR (the `proof:lighthouse`/`floor.baseline.json` harness REUSED, not re-forked); (b) the ACTUAL ceiling number per surface (the BC.W-LIGHTHOUSE precedent — the ACHIEVED number re-pinned, not a provisional shape); (c) the per-viz eval-count→M/K-cap derivation that BINDS on W-BLOB-MULTICORE (the 825 → cap M≤?, gate shadow at N>?). A budget gate with no number is the placeholder this wave kills.

## The mechanism — the worst-case frame-time gate, the cap DERIVED from a measured number

ONE measured-number budget gate (the `floor.baseline.json` read-baseline-vs-write-rebaseline discipline reused) over the WORST-CASE viz render path + the eval-count→M/K-cap derivation BINDING on W-BLOB-MULTICORE.

### 1. The methodology — real-GPU, worst-case, dual-instrument

`proof:viz-perf-budget.mjs` measures frame-time over the GPU-ONLY render path (after W-GPU-ONLY-SPINE — WebGPU/WebGL2, never Canvas2D), on a REAL GPU (the Metal dev-box, NOT SwiftShader — the headless software path measures the wrong floor):

- **The WORST case, not the floor.** Each enrolled viz is captured at its WORST-case parameters: the blob at **M=6 (max cores) + K=12 (max satellites) + shadow ON** (the 825-eval/frag concern, `metaball.frag.ts:197` the 24-step raymarch × `sceneDistG`); aurora at its kuwahara 32-tap × structureTensor medium; concentric/paper-grid at the deepest curl-fbm octave count; dot-flow at its compute-advection particle ceiling — at the enrolled-surface DPR (the retina `2dppx` case, where the per-fragment cost ×4). The floor (M=1, default) is NOT the test (it has GPU headroom — D2 proved it is vsync-capped at 10.21ms).
- **Dual-instrument (the vsync-blindness fix).** TWO measurements per surface: (a) the rAF `performance.now()` frame-time sampler over N frames for JANK (frames > the per-frame budget — the user-visible stall); AND (b) a chrome-devtools `performance_start_trace`/`performance_stop_trace` GPU-track read for the TRUE GPU cost under the vsync ceiling (the rAF sampler is vsync-blind to GPU slack — a viz at 10.21ms rAF may be using 4ms or 14ms of GPU; only the GPU-track read distinguishes a viz with headroom from one at the cliff edge). The budget is BOTH: jank-free (0 frames > budget on the rAF arm) AND GPU-cost under the per-surface ceiling (the GPU-track arm).
- **The harness is REUSED, not re-forked.** The `proof:lighthouse` / `scripts/lighthouse/` real-`vite preview` harness + `floor.baseline.json`'s read-baseline-vs-write-`--rebaseline` discipline (`scripts/proof-lighthouse.mjs:50`) is the host; the viz-perf budget is a NEW per-surface row family in the SAME baseline file (or a sibling `viz-budget.baseline.json` on the same discipline), never a parallel harness.

### 2. The numbers — per-surface ceiling, the ACHIEVED value re-pinned

The budget is the ACHIEVED worst-case number + a tolerance band (the BC.W-LIGHTHOUSE precedent — `floor.baseline.json provisional: false` at the achieved per-surface scores, NOT a provisional shape; the floor is the achieved value + a small band, NEVER a lowered bar). Per enrolled viz surface:

- **The per-frame jank budget:** **≤16.7ms p95 at 60Hz** (no frame misses the vsync deadline at the worst case) — the binding user-visible floor. The D2 floors (10.21ms at M=1) are NOT the budget; the worst-case M=6/retina capture sets it.
- **The GPU-cost ceiling:** the per-surface GPU-track milliseconds at the worst case, re-pinned via `--rebaseline` at the MEASURED number (a regression that climbs the GPU cost over the ceiling REDs — the bite the number enables). PROVISIONAL at the born-RED shape until the real-GPU worst-case run lands the achieved number (the gate is genuinely RED at HEAD until measured).
- **The DPR ceiling:** the retina (`2dppx`) per-fragment multiplier is bounded (the aurora wash sub-2×-DPR cap is the `proof:perf-producer` precedent — the budget extends it across the viz suite).

### 3. The eval-count→M/K-cap derivation (BINDING on W-BLOB-MULTICORE)

The budget DERIVES the multicore cap from the MEASURED worst-case, and that derivation BINDS on W-BLOB-MULTICORE (the wave that ships the N-core generalize):

- The blob's 825-eval/frag worst case (M=6/K=12/shadow-ON) is MEASURED on the real GPU. If it misses the ≤16.7ms p95 budget, the **likely real conclusion (Pass-D §Per-viz batch A): force shadow OFF in multicore + cap M≤3** (NOT M≤6) — the cap DERIVED from a real frame-time, not a one-liner. The gate WRITES the cap (`MAX_BLOB_CORES`, the `softShadow2D` shadow-gate threshold) off the measured number, and W-BLOB-MULTICORE's `MAX_SATS`/core-count constants must NOT exceed it (a `W-BLOB-MULTICORE` that ships M=6 when the budget derived M≤3 REDs this gate — the binding edge).
- The derivation is RECORDED in `docs/tranches/BD/audit/viz-perf-budget.md` (the measured worst-case frame-time per viz + the derived cap + the calibration rationale — the BC.W-LIGHTHOUSE DELTA precedent).

## The gate — `proof:viz-perf-budget` (born-RED → GREEN; a MEASURED number, never a structure-only shell)

`scripts/proof-viz-perf-budget.mjs`, `tags: ["local"]` (a real GPU + real `vite preview` + real perf trace — the `proof:lighthouse` `local`-only precedent; a software-raster CI run measures the wrong floor, so the binding worst-case measure is the local real-GPU close, mirroring `proof:lighthouse`). The CI arm asserts the gate is INVOKABLE + the baseline shape is sound (the enrollment-soundness mirror); the local real-GPU run is the binding number (W-REFLECT3 close).

- **B1 — the gate names a NUMBER per surface (the F2 placeholder-kill).** The detector asserts `viz-budget.baseline.json` (or the `floor.baseline.json` viz-budget rows) carries a per-frame jank budget (≤16.7ms p95) AND a GPU-cost ceiling per enrolled viz surface — a budget file with NO number / a `provisional` shape that was never measured REDs (the placeholder bite — a gate that names no number cannot fail the thing it is named for).
- **B2 — the WORST-case is measured, not the floor.** The detector asserts each enrolled viz's captured parameters are the WORST case (blob M=6/K=12/shadow-ON, the retina DPR) — a capture at M=1 default (the floor with headroom) REDs (the D2 lesson: the floor is not the test). `facts.worstCaseParams` records each surface's measured config.
- **B3 — dual-instrument (the rAF JANK arm AND the GPU-track arm).** The detector asserts BOTH measurements ran per surface: the rAF `performance.now()` frame-time (jank: frames > budget) AND the chrome-devtools GPU-track read (the true GPU cost under vsync) — a budget proven on the rAF arm ALONE REDs (the vsync-blindness bite: a viz at 10.21ms rAF may be at the GPU cliff; only the GPU-track distinguishes it).
- **B4 — real-GPU, not SwiftShader.** The detector asserts the worst-case measure ran on a hardware GPU (the protocol's GPU/throttle-honesty axis, `proof:lighthouse.mjs:67` precedent — a `runtimeError`/software-raster gather is flagged) — a budget measured on SwiftShader REDs (the W-AURORA-SWRASTER lesson: the software path measures the wrong floor).
- **B5 — the eval-count→cap derivation BINDS on W-BLOB-MULTICORE.** The detector asserts the blob's `MAX_BLOB_CORES`/core-count constant ≤ the cap DERIVED from the measured worst-case (recorded in `viz-perf-budget.md`), AND the `softShadow2D` shadow-gate fires above the derived N — a `W-BLOB-MULTICORE` shipping M=6 when the budget derived M≤3 REDs (the binding edge the F2 finding demanded: the BUDGET and the DERIVATION are no longer in disconnected bands). `facts.blobCap` records the derived + the shipped value.
- **B6 — the multi-context-per-route ceiling.** The detector asserts no enrolled route runs MORE live GPU contexts than the one-GL-per-route budget allows at the worst-case DPR (the multi-context worst case the F2/D2 named — a route with 2 live aurora + a blob over the budget REDs). The DockStage one-shared-backdrop precedent is the model.

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a budget file with NO frame-time number (the placeholder shell) → B1 RED.
- (b) a capture at M=1 default (the floor with headroom) → B2 RED (the floor-is-not-the-test bite).
- (c) a budget proven on the rAF arm alone (no GPU-track read) → B3 RED (the vsync-blindness bite).
- (d) a worst-case measure on SwiftShader → B4 RED (the software-floor bite).
- (e) a `MAX_BLOB_CORES = 6` when the budget derived M≤3 → B5 RED (the binding-edge bite).
- (f) a route with 2 live aurora + a blob over the budget → B6 RED (the multi-context bite).

**What reds on the pre-fix tree (born-RED by construction):** B1 (`proof:viz-perf-budget.mjs` does not exist, no budget file, no number), B2 (no worst-case capture), B3 (no dual-instrument), B5 (no derived cap — the 825-eval cost is in a disconnected band). GREEN only after the real-GPU worst-case measure + the per-surface ceiling re-pin + the dual-instrument + the eval-count→cap derivation land.

## The binding measure — the real-GPU worst-case frame-time capture (the DELTA)

The binding verification is the MEASURED worst-case frame-time (not a `tests-visual/*.spec.ts` painted readback — the budget is a PERFORMANCE number, not a pixel; the `proof:lighthouse` DELTA precedent). The DELTA artefact at `docs/tranches/BD/audit/visual/W-VIZ-PERF-BUDGET-DELTA.md`:

1. **The real-GPU worst-case run** — each enrolled viz at its worst case (blob M=6/K=12/shadow-ON, retina DPR), the dual-instrument (rAF jank + chrome-devtools GPU-track), on the Metal dev-box. The achieved per-surface frame-time + GPU cost is RE-PINNED (the `--rebaseline` reviewed write).
2. **The derived cap** — the blob's M≤? / shadow-gate-at-N derived from the measured number (the binding W-BLOB-MULTICORE edge), recorded with the calibration rationale.

The D2 spike (`spikes/RESULTS.md §Spike 0`) is the throwaway floor measure; this is the gated worst-case build (the floors had headroom — the worst case is the test). The queued D2 spike (`RESULTS.md` Next: "The blob M=6 worst-case frame-time — force 6 cores + shadow-on, measure") is this wave's binding capture.

## The gestalt row

**NO `proof:ba-gestalt` viz-render verdict (this is a PERFORMANCE budget, not a visual surface — BB inv-4).** The budget changes NO viz render (it MEASURES the render, then derives a cap); the viz waves (W-BLOB-MULTICORE, W-CONCENTRIC-LEVELSET, …) carry the gestalt verdicts. The acceptance is the MEASURED number: the worst case clears the budget, the cap is derived from a real frame-time, the dual-instrument ran on a real GPU. A budget proven on a number-free shell / a software floor / the M=1 floor-with-headroom is the placeholder the F2 finding named.

## Fences

- **The gate names a NUMBER (the placeholder-kill).** A budget gate with no frame-time, no methodology, no cap is a placeholder (the F2 finding) — B1 demands a per-surface measured number, or REDs.
- **Measure the WORST case, not the floor.** The floor (M=1) has GPU headroom (D2: vsync-capped 10.21ms — it proves nothing); the worst case (M=6/retina/multi-context) is the test (B2). A floor-capture REDs.
- **Dual-instrument — the rAF sampler is vsync-BLIND.** The rAF arm catches jank; the GPU-track arm catches the true GPU cost under the vsync ceiling (a viz at 10.21ms rAF may be at the GPU cliff). BOTH are required (B3).
- **Real-GPU, never SwiftShader.** The software-raster path measures the wrong floor (the W-AURORA-SWRASTER lesson); the binding measure is the Metal dev-box, the `local`-only `proof:lighthouse` precedent (B4).
- **The cap is DERIVED from a measured number, BINDING on W-BLOB-MULTICORE.** The 825-eval worst case → the M/K cap is DERIVED, not a one-liner; W-BLOB-MULTICORE's constants must not exceed it (B5 — the binding edge the F2 finding demanded). The likely conclusion is force-shadow-OFF-in-multicore + cap M≤3, but the NUMBER decides.
- **Reuse the `proof:lighthouse` harness, don't re-fork.** The real-`vite preview` + `floor.baseline.json` read-baseline-vs-`--rebaseline` discipline is the host; the viz budget is a new row family, never a parallel harness.
- **The achieved number re-pinned, never a lowered bar.** The BC.W-LIGHTHOUSE precedent — `provisional: false` at the achieved worst-case + a tolerance band; a regression climbing over the ceiling REDs.

## Disposition links

- **`critique/passd-foundation.md F2`** (`W-VIZ-PERF-BUDGET` is number-free, methodology-free; the cost lives in a disconnected band; give it a real-GPU frame-time + per-surface ceiling + the eval-count→M/K-cap derivation BINDING on W-BLOB-MULTICORE) → BUILT (B1 the number, B3/B4 the methodology, B5 the binding cap). CLOSED at the spec level.
- **`PASSD-FOLD §Batch-2 W-VIZ-PERF-BUDGET + D2 measurement`** (number-free; the floors are vsync-capped ~10ms with GPU headroom → test the WORST case M=6/DPR/multi-context; a real frame-time methodology + the derived cap, not a number-free gate) → BUILT (B2 worst-case-not-floor, B3 the dual-instrument vsync-blindness fix, B6 multi-context). CLOSED.
- **`spikes/RESULTS.md §Spike 0`** (the live frame-time floors — blob+aurora avg 10.21ms / 0 long frames, vsync-capped, GPU headroom → test the WORST case) → the throwaway floor measure; this is the gated worst-case build (the floor is not the test). The queued "blob M=6 worst-case" spike is this wave's binding capture. De-risked.
- **BINDS ON `W-BLOB-MULTICORE`** (the wave owning the 825-eval/frag cost; the M/K cap this wave DERIVES from the measured worst-case binds W-BLOB-MULTICORE's core-count constants — B5 the binding edge, `VIZ-FINAL-ROSTER.md:26`). Forward binding edge.
- **COMPOSES `W-GPU-ONLY-SPINE`** (`depends`, `EXECUTION-DAG.md:127-128` — the budget measures the GPU-only render path after the Canvas2D/swraster purge). Inbound dep.
- **Band 11 V GPU-only spine + field (`EXECUTION-DAG.md:128` — context-cap / compute-vs-fragment / DPR; `proof:viz-perf-budget`)** — the budget after the GPU-only selector.
