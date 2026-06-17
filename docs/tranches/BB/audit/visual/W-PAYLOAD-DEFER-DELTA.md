# W-PAYLOAD-DEFER — the perf DELTA

**Wave**: BB.W-PAYLOAD-DEFER (the JS critical path defended + the dts build arm shortened)
**Branch**: `tranche/BB`
**Captured**: 2026-06-17 (re-grounded at HEAD `bdbcd479` — BB Batch 2)
**Status**: lock + budget arm + demo recipe + dts arm LANDED; the aurora medium split is a **GL-fence scope-reveal** (reported, not widened)

This is the on-disk perf evidence (the cardinal lesson — a recorded artefact, not a commit-message claim). The wave is STRUCTURAL + PERF (zero paint change), so there is NO `proof:ba-gestalt` requirement; the binding truth is `profile:budget` GREEN (the four witnesses) + the dts-arm timing fact + `verify-export-types`/`proof:resolution` GREEN.

---

## (a) The dts build arm — the L32-PERF-1 number moved

The `emit-types` arm (`vue-tsc --project tsconfig.build.json`) is ~82% of the `build` total. The lever: `incremental: true` + a `.cache/`-routed `tsBuildInfoFile` in `tsconfig.build.json`. `skipLibCheck` is ALREADY inherited from the base `tsconfig.json` (`skipLibCheck: true`) — the cold path already trims the peer `.d.ts`, so there is no further skipLibCheck lever to pull (the audit's recorded finding).

| dts-arm measure | before (no incremental) | after (incremental + buildinfo) |
|---|---|---|
| COLD re-emit (no cache) | 4077 ms | 3812 ms |
| WARM re-emit (unchanged source) | 4077 ms (no cache → always cold) | **1342 ms** (≈3.0× faster, ~2735 ms saved) |
| WARM re-emit, steady-state | — | 1351 ms |

**The warm re-emit bound (recorded ceiling): < 1500 ms.** The incremental cache PROVES the shortening (a no-op second `build` skips the unchanged declarations).

**The binding floor — ZERO declaration dropped (verified):**
- The flat per-entry `dist/<name>.d.ts` set is **byte-identical** pre/post (sha of the concatenated sorted set: `65f307b9…` cold == warm == pre-wave), **75** files (unchanged count).
- `verify-export-types` → `All package export targets and type resolutions are valid.` (exit 0)
- `proof:subpath-enumeration` → PASS (75 chunks · ENUM-COMPLETE · BATCH-EQUIV)
- `proof:resolution` → PASS (contract-v2 satisfied; the one `[pending]` is a value.js cross-repo note, not a glass-ui failure)
- The W4 self-test bite: `typecheck` (`vue-tsc --noEmit`) uses the BASE `tsconfig.json`, NOT `tsconfig.build.json` — the two configs are distinct, so the build-arm speed knob cannot mask a real source type error.

The `tsBuildInfoFile` routes to `.cache/tsbuild/glass-ui-dts.tsbuildinfo` (`.cache/` is already gitignored — the AS.W2 pure-output discipline; a warm `build` leaves git status clean).

---

## (b) The aurora medium tail — a GL-fence SCOPE-REVEAL (the split did NOT land)

**Scope 2 (split the aurora medium tail into a lazy chunk) is BLOCKED — reported as a scope-reveal, the GL fence NOT widened.**

The §0 re-ground found the medium tail eager in `aurora.js` (44× `impasto` / 28× `oil-pastel` / 11× `vangogh` / 13× `MEDIUM_` in `dist/aurora.js`), confirming defect 3. But the split CANNOT land without a shader-CONTENT edit — exactly the Triumvirate Dispatch §1 scope-reveal:

- `aurora.frag.ts` builds `FRAGMENT_SRC` as ONE template-literal string at module load — `AURORA_MEDIUMS_PRE_BRUSH_GLSL` + `AURORA_BRUSH_GLSL` + `AURORA_MEDIUMS_POST_BRUSH_GLSL` are all **template-spliced into the single source string** (aurora.frag.ts:342/346).
- `runtime.ts:186` compiles the ENTIRE `FRAGMENT_SRC` into ONE `createGlProgram(gl, VERTEX_SRC, FRAGMENT_SRC)` — a single GL program with all six mediums baked in as `if (uMedium == N)` branches in `main()` (aurora.frag.ts:376-381).
- The medium GLSL bodies (`mediumVangogh`, `mediumOilPastel`, …) reference shared functions (`sampleBase`, `domainWarp`, `samplePalette`, `nucleiField`, `flowField`, `W_LUMA`, the brush primitive) defined in the SAME compilation unit.

A lazy `import()` of a per-medium module cannot split this — splitting requires either (a) editing the shader CONTENT to remove the medium dispatch from `main()` and compiling separate GL programs per medium (a `gl_FragColor`/dispatch-content edit — the GL fence forbids it), or (b) a multi-program runtime re-architecture that changes the single-program contract + shader boundaries (a `runtime.ts` re-shape beyond the medium MODULE boundary, and a shader-content edit by consequence).

Per the hard constraint (**a shader-content edit is a scope-reveal → report it, never widen the fence**), the split is NOT attempted. The GL fence held: `git status` shows ZERO modified shader file (`*.frag.ts` / `*.glsl.ts` / `metaball*`).

**The W3 witness records this honestly:** `profile:budget`'s critical-path arm records `auroraEagerMediumHits: 89` + `auroraMediumSplit: "eager (compile-time spliced — GL-fence scope-reveal, named-successor split)"` as a FACT, never a green-faking pass. A future GL-fence-widening wave (the W-GOO-COLOR 4.x class for the goo seam, or a dedicated aurora multi-program transposition) that makes the mediums runtime-selectable modules flips the witness to a separate-chunk assert.

**Named successor (no silent drop):** the aurora medium lazy-tail split is BOOKED to a wave that may touch shader content under a widened fence (the multi-program transposition: remove the `uMedium` dispatch from `main()`, compile a base + per-medium program set, lazy-`import()` the painterly program GLSL). This is a TRIUMVIRATE/plan-augment, not a unilateral fence-widen.

---

## (c) The four-WebGL-entry-ceiling table (W2 — recorded caps + HEAD measures)

The three new entries join the pre-existing aurora ceiling (the AW.W4.0 governor preamble). Sized at the HEAD measure + ~10% tranche-close headroom.

| chunk | HEAD gzip | gzip cap | util | HEAD raw | raw cap | util |
|---|---|---|---|---|---|---|
| `dist/aurora.js` (pre-existing) | 38 709 | 40 000 | 96.8% | 114 749 | 130 000 | 88.3% |
| `dist/goo-blob.js` (NEW) | 20 757 | 22 900 | 90.6% | 56 940 | 62 700 | 90.8% |
| `dist/constellation.js` (NEW) | 6 026 | 6 700 | 89.9% | 17 281 | 19 000 | 91.0% |
| `dist/fourier-field.js` (NEW) | 2 839 | 3 200 | 88.7% | 7 690 | 8 500 | 90.5% |

An overrun HALTS the budget gate (fail-closed, the same shape the aurora ceiling has) — a payload regression, not a silent re-base. A renderer landing on the root path also reds `glass-ui.js`'s budget (the W1 lock catches the EDGE, W2 catches the BYTE). The three new entries are recorded as drift-NEW in the per-subpath drift report; the orchestrator rebaselines `docs/tranches/AP/W4-bundle-profile.baseline.json` at the BB cut (the human-reviewed `--rebaseline` path, not a silent write).

---

## (d) The `profile:budget` born-RED → GREEN log

**Born-RED on the arm's ABSENCE at HEAD** (the favourable HEAD locked, NOT a violation):
`grep -nE 'criticalPath|CRITICAL_PATH|webglEntryCeiling' scripts/profile-bundle.mjs` → 0 before the wave (the arm did not exist).

**GREEN at close** (`node scripts/profile-bundle.mjs --skip-build --enforce`, exit 0):
```
Critical-path-weight report (BB.W-PAYLOAD-DEFER):
  [W1 SOURCE] root-barrel heavy-leaf reach : none ✓
  [W1 DIST]   dist/glass-ui.js heavy hits : 0
  [W3 AURORA] medium tail                  : eager (compile-time spliced — GL-fence scope-reveal, named-successor split) (89 eager hits)
  [W4 DTS]    emit-types arm cold / warm   : 4077ms / 1342ms
```
Per-entry ceilings (W2): all four WebGL chunks PASS at 88-97% utilization.

The W1 SOURCE clean is born-FAVOURABLE (the root barrel is already WebGL-free + value.js-free — the L.W1 vueuse-SCC closure + the named-carve glass barrel `composables/glass/index.ts` re-exports only `useSpecularTracking` + `canvas2d`, NOT `useWebGLCanvas`/`useGlassRenderer`/the shaders/the value.js color leaf). The arm LOCKS it: the inverse-DataTable bite — re-exporting the WebGL substrate or a value.js color core into any root-reachable module reddens the SOURCE tier EVEN WHILE the DIST tier passes (the consumer's bundler walks the eager graph the dist split tree-shook).

---

## (e) The shared-walker extraction + the GL-fence byte-isomorphism witness

- The transitive-import walker (`stripComments` + `.vue`-`<script>`-extract + relative-edge-follow) is EXTRACTED to the SHARED leaf `scripts/lib/critical-path-walk.mjs`. `proof-vueuse-free-root.mjs` re-points its inline copy to the leaf (`findReach(entry, vueuseMatch)`), so BOTH gates walk IDENTICALLY (the no-second-copy discipline). The re-pointed vueuse gate is GREEN post-extraction (`SOURCE reach: none ✓`, `DIST hits: 0`) — the walk semantics did NOT drift.
- The GL fence held — `git status` over `src/components/custom/aurora/` + `src/composables/glass/webgl/` shows ZERO modified `.frag.ts`/`.glsl.ts`/`metaball*` file. The shader strings are byte-untouched.

---

## (f) Cross-reference — W-LIGHTHOUSE (the runtime-cost twin)

This wave bounds the PAYLOAD weight (gzip bytes + eager-graph reach); W-LIGHTHOUSE bounds the runtime DRAW (TBT/LCP/CLS). A smaller critical-path chunk should move W-LIGHTHOUSE's TBT — recorded here as a cross-reference, NOT double-gated. At HEAD the root barrel is already a tiny 8.6 KiB-gzip chunk (the structural work was the L.W1 split), so the critical-path WEIGHT is already favourable; this wave LOCKS it. The TBT win comes from the dts-arm build-time shortening (a developer-loop + CI win) more than a consumer payload shrink.
