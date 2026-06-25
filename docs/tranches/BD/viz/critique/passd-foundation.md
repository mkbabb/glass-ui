# Pass-D FOUNDATION critique — the GPU-ONLY spine + the perf budget + the Canvas2D purge

**Lane** BD viz / pass-D first-principles · **Stance** RUTHLESS / SUBSTANCE-bar (trace the real code, not the doc) · **Scope** PLANNING audit, zero edits ·
**Grounded** against the ACTUAL `src/composables/glass/webgpu/{useGpuSubstrate,useWebGPUCanvas,webgpuDevice}.ts`, `webgl/{useWebGLCanvas,createCanvasLifecycle}.ts`, `canvas2d/useCanvas2D.ts`, `scripts/proof-gpu-substrate-single.mjs`, `metaball.frag.ts`, the live viz consumers, `package.json` exports, + `VIZ-FINAL-ROSTER.md` / `UNIFIED-ROSTER.md`.

**VERDICT: CONDITIONAL-ACCEPT with FOUR substance holes the roster's one-liners hide.** The wave spec ALREADY absorbed batch-A's H1/H2/H3 (minimal-retry-survives, keep-headless-floor, cert-lands-WITH-purge) — credit where due. But tracing the REAL code surfaces: (F1) the `/canvas` PUBLIC SUBPATH purge is a registry breaking-change the roster never names as one; (F2) `W-VIZ-PERF-BUDGET` is a number-free, methodology-free shell with the actual cost owned by a DIFFERENT wave (a budget gate divorced from its derivation); (F3) the real D1-violation census is 2 live `src/` viz/glass surfaces + 1 demo egg, NOT just the egg — and one of them (`useGlassRenderer`) is the lens-raster-purge target whose CSS-gradient equivalence is UNPROVEN; (F4) `selectGpuBackend()` does not exist and the pipeline-validation poison is structurally un-hoistable at the SOURCE line I traced. HARDEST first.

---

## F1 (HARDEST — UNNAMED BREAKING CHANGE) — `/canvas` is a REGISTRY-PUBLISHED subpath; the purge is a breaking export removal the roster calls a "cleanup"

The roster says "purge `useCanvas2D`/`/canvas`/`auroraFallbackGround`/swraster" as if `/canvas` were an internal symbol. It is NOT. **`/canvas` is a published package export** — `package.json:371`:

```json
"./canvas": { "types": "./dist/canvas.d.ts", "import": "./dist/canvas.js" }
```

with `src/subpaths/canvas.ts` mirroring it and `dist/canvas.d.ts` enrolled in `typesVersions`. So:

- **The purge is a registry CONTRACT removal, not a refactor.** Per inv-11 (no out-of-band lineage publish) + the prune-census-must-probe-the-registry corollary the OTHER waves live by, removing a published subpath REQUIRES a registry+constellation consumer probe AND a NAMED fold/subsume/migration line in the cut notes — exactly the discipline `W-BLOB-RENAME`/`W-NDA-DECIDE`/`W-PRUNE-CONSOLIDATE` all carry. `W-GPU-ONLY-SPINE` carries none. The roster one-liner skips the disposition register entirely.
- **The INTERNAL strand is genuine + complete (the purge is honest on the in-tree axis).** I traced every `useCanvas2D`/`createCanvas2D` importer: the ONLY real importers are the two barrels (`composables/glass/index.ts:42`, `canvas2d/index.ts:9`). Both `constellation` (`useConstellation.ts:377`) and `fourier-field` (`useFourierField.ts:164`) **already migrated to `createGpuSubstrate`** — the `useCanvas2D` strings in those dirs are STALE README/comment prose, not imports. So in-tree, nothing renders on Canvas2D; the purge does NOT strand a live viz. GOOD. But that makes the EXTERNAL/registry axis the only real risk, and it's the one the roster ignores.
- **The gate strand is BIGGER than batch-A's "clause C."** `proof:gpu-substrate-single` clause C (lines 404-412) asserts `useCanvas2D` exists AND composes the leaf. Deleting the file REDs clause C. AND clauses A/B reuse `detectCanvas2DSingleSource` imported from `proof-webgl-substrate-single.mjs` (line 46) — the shared detector and `proof:canvas2d-substrate` (`package.json:876`, a standalone test gate) + `proof:resolve-canvas-color` (line 877) all assume the file. That's **3 gate entries + 1 shared detector**, not one clause. The wave must retire all four in lockstep or self-RED at first run.

**FIX:** name `/canvas` as a PUBLISHED-SUBPATH retirement with a DISPOSITION-REGISTER row + a MIGRATION.md line + a registry/constellation consumer probe (the same bar every other prune in this repo meets); retire `proof:canvas2d-substrate` + `proof:resolve-canvas-color` + clause C + the shared-detector reuse in ONE coordinated edit. Do NOT frame it as "cleanup."

## F2 (NUMBER-FREE GATE — the budget is divorced from its own derivation) — `W-VIZ-PERF-BUDGET` names NO frame-time, NO methodology, NO cap; the real cost lives in a DIFFERENT wave

`W-VIZ-PERF-BUDGET` (roster §Band 11, `UNIFIED-ROSTER.md:147`) is verbatim: *"The context-cap / compute-vs-fragment / DPR perf budget (`proof:viz-perf-budget`)."* That is the ENTIRE spec. There is:

- **No frame-time number.** No `≤8ms p50 @ 4×-CPU`, no `≤16.7ms`, no per-DPR ceiling, no enrolled-surface roster. `proof:viz-perf-budget.mjs` is NOT authored (confirmed — `ls` returns absent). A gate that names no number can only assert structure, never the BUDGET — it cannot fail the thing it is named for.
- **The actual cost is owned by a SEPARATE wave.** The real per-fragment number lives in `W-BLOB-MULTICORE` (`§Band 13`): *"sceneDistG inside the 24-step shadow raymarch → ~825 evals/frag at M6/K12."* I TRACED this in the live shader and it is CORRECT: `sceneDistG` (`metaball.frag.ts:97`) = `1 body + MAX_SATS(4) + TRAIL_N(15)` = **20 evals**, called once at the main scene (`:286`) PLUS 24× inside `softShadow2D` (`:197` `for (int i = 0; i < 24; i++)` → `:199` `sceneDistG(...)`, invoked at `:387`) = **25 × 20 = 500 evals/frag at M=1 TODAY**, scaling to 825 at the M6/K12 cap. The framework's old "~33 evals" counted ONE `sceneDistG` and forgot the 24× shadow multiplier — confirmed off by 24×.
- **So the BUDGET (Band 11) and the DERIVATION (Band 13) are in different bands with no binding edge.** `W-VIZ-PERF-BUDGET` is supposed to be the FLOOR every viz clears, but it ships before the one wave that actually computes the cost, names no number for the others (aurora's kuwahara 32-tap × structureTensor, the concentric/papergrid curl-fbm octaves, dot-flow's compute advection), and owns no M/K-cap derivation. It is a placeholder gate, not a budget.

**FIX:** `W-VIZ-PERF-BUDGET` must SPECIFY (a) the methodology — a real-GPU (Metal dev-box, NOT SwiftShader — the W-AURORA-SWRASTER lesson: the headless path is software and measures the wrong floor) `performance.now()` frame-time over N frames at the enrolled-surface DPR, the `proof:perf-producer`/`scripts/lighthouse` harness reused not re-forked; (b) the actual ceiling number per surface (the BC.W-LIGHTHOUSE precedent — the ACHIEVED number re-pinned, not a provisional shape); (c) the per-viz eval-count budget the M/K caps derive FROM (the 825 → cap M≤?, gate shadow at N>?), with that derivation BINDING on W-BLOB-MULTICORE not floating in prose. A budget gate with no number is the close-class lie the gestalt bar kills.

## F3 (D1-VIOLATION CENSUS — the real count is 2 live src surfaces + 1 demo egg; the lens-purge equivalence is UNPROVEN)

Batch-A flagged `FRedrawOverlay.vue:47` (the fourier demo egg). The full code-aware census (`getContext("2d")`, comment-stripped) is:

| File:line | Class | D1 verdict |
|---|---|---|
| `demo/eggs/FRedrawOverlay.vue:47` | demo egg, fourier draw-overlay | **TRUE D1 violation** — a live Canvas2D draw on a viz surface; batch-A correct |
| `src/composables/glass/useGlassRenderer.ts:55,98` | the Snell displacement-map BAKE (R/G = X/Y displacement, `putImageData`) | **the lens-raster-purge TARGET** — see below; consumers `GlassPanel.vue` + `DockGooFilter.vue` |
| `src/components/custom/aurora/composables/auroraFallbackGround.ts:346` | the swraster CSS-fallback ground | **the swraster-purge TARGET** (already in scope) |
| `src/composables/glass/useGlassBackdropLuminance.ts:316` | the dock adaptive-darken SAMPLER (`drawImage`+`getImageData`, `willReadFrequently`) | **NOT a viz — LEGITIMATE KEEP.** It samples the backdrop to write `--glass-backdrop-luma`; there is no GPU API that reads pixels behind a `backdrop-filter`. Deleting it breaks the dock iOS-27 darken. The GPU-only mandate is about VIZ RENDER, not a 1-shot downsampled probe — the census must EXEMPT it or it self-RED's a load-bearing keep. |
| `src/composables/glass/canvas2d/useCanvas2D.ts:214` | the backend itself (being purged) | scope of F1 |

Two substance points the roster misses:

1. **The lens-raster purge equivalence is ASSERTED, not proven (batch-A H-minor stands, re-confirmed at source).** `W-LENS-RASTER-PURGE` rides W-GPU-ONLY-SPINE and proposes replacing `useGlassRenderer`'s Snell displacement-map bake (`useGlassRenderer.ts:30-46` — a per-pixel `128 + dispX*127` R/G-channel encode of the squircle-bevel profile) with the `.glass-lens` CSS-gradient. But `useGlassRenderer` has TWO LIVE consumers (`GlassPanel.vue`, `DockGooFilter.vue`), and the `.glass-lens` CSS-gradient is a crossed-linear-gradient APPROXIMATION of the Snell `f(x)=⁴√(1-(1-x)⁴)` profile — they are NOT pixel-equivalent (the CSS gradient cannot encode the edge-concentrated quartic falloff a data-URI displacement map carries). The purge needs a MIGRATE-WITH-π (a rendered capture-pair proving the refraction reads equivalent on `GlassPanel`/`DockGooFilter`), not a presumed delete. The roster's "subsumes W-LENS-RASTER-PURGE" hand-waves this.

2. **The D1 gate (`proof:gpu-only-spine`) must be CODE-AWARE (batch-A H4 re-confirmed).** A naive `getContext("2d")` grep REDs on `useGlassBackdropLuminance` (legitimate keep) AND on the negation-comment strings in `useFourierField.ts:8` ("carries NO `getContext("2d")`") + the constellation/dot-flow comment prose. The gate must AST-parse or carry an explicit EXEMPT allowlist (the luminance sampler + the comment-bearing files), or it self-RED's at first run.

## F4 (selectGpuBackend DOES NOT EXIST + the poison is structurally un-hoistable) — the transposition is sound for 2/3 classes; the SOURCE confirms the third survives

`selectGpuBackend()` does not exist (`grep` confirms — it's the proposed transposition). The wave's premise is right that the CURRENT shape (`useGpuSubstrate.ts:239` `armAsync` tries WebGPU then `fallToWebGL2`) can be reordered to probe-first. But tracing the REAL acquisition path confirms batch-A H1 at the line level — and the roster's "minimal retry survives" framing is CORRECT but UNDER-specified:

- `acquireDevice()` (`useWebGPUCanvas.ts:291`) runs `requestAdapter` (`:298`) → `isSoftwareWebGPUAdapter` (`:312`) → `requestDevice` (`:320`) — ALL before any `getContext`. A `selectGpuBackend()` CAN hoist these two classes (adapter-null + software-adapter) ahead of the canvas, evaporating the clone for them. ✓
- BUT the **pipeline-validation reject** is at `armAsync:388`, which fires AFTER `lifecycle.arm()` (`:366`) → `buildContext()` → **`canvas.getContext("webgpu")` (`:197`)** has ALREADY poisoned the canvas, → `ctx.configure` (`:201`) → `setup` + `probePipeline()` (`:210`) inside `pushErrorScope("validation")` (`:207`), popped at `:213`. You CANNOT validate a render pipeline without a configured `webgpu` context, and configuring IS the poison. So on a lying-adapter host (Metal reporting `apple/metal-3` that passes adapter+device but fails the metaball pipeline — the exact class the probe at `:253` exists for) the canvas is poisoned when the reject fires, and `freshCanvasForFallback` (`:147`) is structurally REQUIRED. The "~120 LOC evaporate" elegance claim is false; what's true is "the clone fires for 1 rarer class instead of 3."

The roster ALREADY says "a MINIMAL fresh-canvas retry SURVIVES" — so this is absorbed. The remaining substance gap: the roster must (a) NAME which class the residual clone serves (pipeline-validation ONLY) so a future reader doesn't re-attempt to delete it, and (b) re-quantify the LOC honestly (the clone + a narrowed single-class chain stay; `onBackendFallback` + the multi-class try/catch shrink). And the gate `proof:gpu-only-spine` must assert the residual clone PERSISTS for pipeline-validation (a future over-cut deleting it REDs) — the symmetric closure W-PRUNE-CONSOLIDATE's D-clauses teach.

## MINOR / VERIFIED-SOUND
- `armAsync`-only seam SAFE — aurora `runtime.ts` prefers `armAsync`; all viz call it. Retiring sync `arm` is low-risk (batch-A ✓, re-confirmed).
- `device.lost` self-heal (`useWebGPUCanvas:339`) is NOT touched by the reorder — re-acquires on the SAME context (device-restore, not backend-switch). ✓
- The `.wgsl`↔`.glsl` twin KEEP is correct (the Safari-26-floor path); the BOOKED-not-built transpiler is correct restraint.
- The headless paint floor: the roster's "palette-derived AA cert lands WITH the purge, cross-repo-coordinated" correctly absorbs batch-A H3 (don't strand speedtest's `proof:aurora-swraster` CI). But the cross-repo TIMING is an open orchestrator decision — name it as a BLOCKING precondition on the purge wave (the cert must land in speedtest BEFORE glass-ui deletes `auroraFallbackGround`, or speedtest's CI captures black).

## THE FIVE FIXES (priority order)
1. **F1 — `/canvas` is a PUBLISHED subpath:** disposition-register row + MIGRATION line + registry probe + retire all 4 gate entries in lockstep. Not "cleanup."
2. **F2 — give `W-VIZ-PERF-BUDGET` a NUMBER + methodology:** real-GPU (not SwiftShader) frame-time, per-surface ceiling, the eval-count→M/K-cap derivation BINDING on W-BLOB-MULTICORE. A number-free budget gate is a placeholder.
3. **F3 — fix the D1 census:** EXEMPT `useGlassBackdropLuminance` (legit keep, no GPU equivalent); make the gate code-aware (comment-strings false-RED); demand a MIGRATE-WITH-π for the `useGlassRenderer` Snell→CSS-gradient (UNPROVEN equivalence, 2 live consumers).
4. **F4 — name the residual clone's class:** pipeline-validation ONLY; re-quantify the LOC honestly; gate that the clone PERSISTS (symmetric-closure).
5. **Cross-repo TIMING:** the swraster-cert-in-speedtest is a BLOCKING precondition on the `auroraFallbackGround` delete, not a parallel.
