# P.W4 Lane A — Heap-bump disposition

## §1 Scope

Per `docs/tranches/P/research/Pepsilon-pipeline-post-O.md` §Pε-2 + §Heap-bump status + recommendation: the `NODE_OPTIONS=--max-old-space-size=8192` heap bump was previously wired into `scripts/release.sh:81` (release-time) and `.github/workflows/ci.yml:39-40` (CI build step), but NOT into `package.json.scripts.build` (the canonical local dev-loop and prepublishOnly build entry).

The split layered the bump as a workaround at two callers while leaving the third uncovered — `vite + vite-plugin-dts` OOMs under the default 4 GB Node heap on this codebase. P invariant 4 ("idiomatic / gestalt; no quick fixes; no workarounds") flags the absent third call site as drift.

Pε-2 enumerated two paths:
- **Path A** — vite-plugin-dts root-cause patch + remove the bump entirely.
- **Path B** — bake the bump into `package.json.scripts.build` as the documented baseline.

## §2 Path chosen + rationale

**Path B — bake into `package.json.scripts.build`.**

Rationale (root-cause profile drove the choice; full data in §3):

1. **Heap profile confirms the dominant allocators are upstream**: 397 MiB of sampled type-analysis allocations come from the project's `typescript/lib/typescript.js`, +10.78 MiB from api-extractor's bundled TypeScript, and the workload is `vite-plugin-dts → api-extractor` invoked **per library entry** with `rollupTypes: true` against a 44-entry matrix. Peak RSS measured at 6.74 GB on macOS — well above Node's default ≈4 GB heap ceiling.

2. **The root-cause is upstream-dep behavior, not glass-ui-local**: api-extractor's per-entry allocation pattern is documented; the rollup walks the full type graph for every entry. Pε-R4 already pre-staged this exact escape hatch: "vite-plugin-dts is upstream dep — its OOM is not glass-ui-local."

3. **Path A.(i) — bump to vite-plugin-dts ≥ 5.x — is a major version risk**: the installed devDep is `vite-plugin-dts@4.5.4`; latest is `5.0.0` (released, not beta). A major bump mid-tranche risks destabilising the entire downstream subpath dts publication that `verify-export-types` (L.W0 Lane III) guards. Out of scope for a 30-min HARD CAP investigation; deferred as a future hardening if vite-plugin-dts ≥ 5.x ships incremental-rollup memory fixes.

4. **Path A.(ii) — split build into N sub-builds — is a substrate violation**: it would fork the canonical entry matrix and complicate `verify-export-types`. Rejected.

5. **Path A.(iii) — replace `rollupTypes: true` with `vue-tsc --emitDeclarationOnly`** — drops the rolled-up dts artefact shape that K.WS subpath tests + L.W0 Lane III consumer probes rely on. Rejected.

6. **Path B promotes the bump from workaround to documented baseline**: the bump becomes the single canonical site (package.json's `scripts.build`); release.sh + ci.yml's env-prefixes become defensive no-ops (they layer redundantly on top of the script-baked value). Per P invariant 28 (ADDRESS not defer), this retires the workaround taxonomy entry by making the bump first-class.

7. **POSIX-only inline `NODE_OPTIONS=` syntax**: the constellation is POSIX (macOS/Linux). Pε-R2 documented the Windows risk; mitigated by the existing `engines.node >=22` discipline + constellation conventions. If cross-platform support is required later, `cross-env` is the one-dep escape hatch.

## §3 Heap profile findings

Profiling invocation:

```
rm -rf .heap-profile && mkdir -p .heap-profile && \
/usr/bin/time -l env NODE_OPTIONS='--max-old-space-size=8192 --heap-prof \
    --heap-prof-dir=.heap-profile --heap-prof-interval=524288' \
    npm run build
```

Results (HEAD = master, working tree clean in `src/`):

| Metric | Value |
|---|---|
| Wall time | 29.45 s |
| Max RSS | **6.74 GB** |
| `[vite:dts] Declaration files built in` | 28.6 s (96% of total) |
| Sampled allocations | 705 MiB |
| Build status | success (no OOM with 8 GB heap) |

Top allocators rolled up by source file (sample heap-profile, 512 KB sampling interval):

| Rank | MiB | Source |
|---:|---:|---|
| 1 | **397.49** | `node_modules/typescript/lib/typescript.js` |
| 2 | 135.77 | `(no-url)` (runtime/native frames) |
| 3 | 32.51 | `node_modules/@babel/parser/lib/index.js` |
| 4 | 28.87 | `node:buffer` |
| 5 | 25.26 | `node:fs` (file reads) |
| 6 | **10.78** | `node_modules/@microsoft/api-extractor/node_modules/typescript/lib/typescript.js` |
| 7 | 6.92 | `node:internal/encoding` |
| 8 | 6.50 | `node_modules/@vue/compiler-core/dist/compiler-core.cjs.prod.js` |
| 9 | 5.13 | `node:internal/modules/cjs/loader` |
| 10 | 5.00 | `node_modules/alien-signals/cjs/index.cjs` |
| 11 | 4.50 | `node_modules/@vue/language-core/lib/virtualFile/computedEmbeddedCodes.js` |
| 12 | 4.02 | `node_modules/rollup/dist/es/shared/node-entry.js` |

Top self-size allocations: TypeScript node factories (`createBaseNode`, `createBaseDeclaration`, `createStringLiteral`, `parseNonArrayType`) and `readFileSync` calls from the api-extractor type-graph walk. The 30+ `*** The target project appears to use TypeScript 5.9.3 which is newer than the bundled compiler engine` stderr lines confirm api-extractor is re-instantiating its bundled TypeScript per library entry.

**Conclusion**: 408+ MiB of TypeScript-instance allocations (≈58% of sampled bytes; resident memory diverges from sampled bytes by ≈10× because TS instances retain large per-Program graphs not visible to the sample profiler). The dominant allocator is `vite-plugin-dts → @microsoft/api-extractor`'s per-entry analysis pass on the 44-entry library matrix. This is upstream-dep behavior; no glass-ui-local config knob bounds it without sacrificing the rolled-up dts artefact shape.

## §4 Bake diff

### `package.json` — single-line edit

```diff
-        "build": "vite build",
+        "build": "NODE_OPTIONS=--max-old-space-size=8192 vite build",
```

### `CLAUDE.md` — Build section paragraph addition

The `## Build` block now ends with a 1-paragraph rationale explaining the bake (post the existing 4-command code fence). Excerpt:

> The `build` script prefixes `NODE_OPTIONS=--max-old-space-size=8192` (P.W4 Lane A bake). `vite-plugin-dts` invokes `api-extractor` per library entry with `rollupTypes: true`; with the 44-entry matrix the per-entry type-graph walk allocates ≈6.7 GB peak RSS, which exceeds Node's default 4 GB heap. The 8 GB bump is the documented baseline rather than a release-script workaround — release.sh + ci.yml previously layered the env-var on top of `npm run build`; the bake makes the prefix the single canonical site (consumers and CI inherit it automatically). Root-cause profiling at P.W4 confirmed TypeScript + api-extractor are the dominant allocators (≈408 MiB of sampled allocations); a future upstream incremental-rollup fix in vite-plugin-dts ≥ 5.x may retire the bump.

### `scripts/release.sh` + `.github/workflows/ci.yml` — left untouched

W4.md file bounds for Lane A under Path B are `package.json` + `CLAUDE.md` only. The existing env-prefixes in release.sh:81 + ci.yml:39-40 become defensive no-ops (they re-export `NODE_OPTIONS` on top of the script-baked value). A future cleanup pass can drop them; doing so here would step outside the Lane-A scope and conflict with Lane B's concurrent ci.yml edit.

## §5 Verification

Verified `npm run build` (no external `NODE_OPTIONS` prefix; relies entirely on the baked script) succeeds at HEAD with the Lane A edits applied:

```
$ unset NODE_OPTIONS; /usr/bin/time -l npm run build
...
[vite:dts] Declaration files built in 28501ms.
✓ built in 29.29s
       30.26 real        44.51 user         4.62 sys
          6746161152  maximum resident set size
```

Wall time 29.29 s, max RSS 6.75 GB. Build PASS. Heap headroom margin = (8.00 − 6.75) GB = 1.25 GB (≈16% of the bumped ceiling). The 8 GB level holds with comfortable margin; no need to bump further.

Cross-check: the previous run (still with the heap-prof flags set) measured 6742507520 bytes (6.74 GB) max RSS, identical to within sampling noise — confirming the workload is deterministic and the headroom is stable.

## §6 Operational constraint compliance

| Constraint | Compliance |
|---|---|
| NO `git stash` (any form) | ✓ — zero git mutations performed |
| NO `npm run build` mid-task IF sibling-lane edits in `src/` | ✓ — checked `git status --porcelain` before each build run; only docs + ci.yml + scripts/proof-package.mjs modified by sibling lanes; `src/` untouched |
| Read-only git only (no commit / stash / checkout / reset / etc.) | ✓ |
| 30-min HARD CAP | ✓ — Path A root-cause profile completed in ≈8 min; Path B bake + verification + proof doc within budget |
| File bounds (package.json + CLAUDE.md under Path B) | ✓ — edits scoped to those two files; release.sh + ci.yml left untouched (Lane B-owned) |

Build invocations counted: 2 total (one with heap-prof flags for profiling, one bake-verification run without external NODE_OPTIONS). Both ran with no sibling-lane edits to `src/` present — coordination via `git status` before each invocation.

## §7 Status: COMPLETED

- Path B applied: 1-line edit to `package.json.scripts.build` + 1-paragraph addition to `CLAUDE.md` `## Build`.
- `npm run build` succeeds without external NODE_OPTIONS at HEAD.
- Root-cause profile confirms upstream-dep (api-extractor) allocator dominance; Path A.(i) bump-to-vite-plugin-dts-5 deferred as future hardening.
- Heap-bump promoted from workaround taxonomy (P invariant 4 violation) to documented baseline (P invariant 28 ADDRESS).
- Pε-2 closed.
