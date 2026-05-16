# Rε—Pipeline orchestration (O.Rε)

Audit of the build / typecheck / test / release / freshness / profile-budget / proof-* pipeline at N close (`37288e0` / v1.1.4). Surfaces duplicated work, special-case branches, CI vs local divergence, and orchestration gaps.

Read-only audit. Hardened agent git clause inherited.

## 1. Angle summary

The pipeline is **functional but not orchestrated**. Each script is well-isolated and individually defensible, but there is no `proof:all` cohort runner, the build is invoked from three different entry points (two of them using different vite configs), the freshness-gate algorithm is duplicated across `scripts/freshness-gate.mjs` and `src/freshness.ts`, and the release script does subset checks where its own header invariant (L.W0 Lane III) says binary checks. CI runs one job (bundle budget); local invocations are responsible for the other six.

## 2. Evidence

### 2.1 npm scripts inventory (25 scripts)

| Script | Invokes | Lifecycle |
|---|---|---|
| `dev` | `vite` |—|
| `prebuild` | `node scripts/freshness-gate.mjs --pre` | lifecycle (auto before `build`) |
| `build` | `vite build` (uses `vite.config.ts`) |—|
| `prepare` | `test -f dist/glass-ui.js \|\| npm run build` | lifecycle (auto on `npm install`) |
| `typecheck` | `vue-tsc --noEmit` |—|
| `test` | `vitest run` |—|
| `verify-export-types` | `node scripts/verify-export-types.mjs` |—|
| `iter-check` | `vue-tsc --noEmit --project tsconfig.src.json` |—|
| `iter-build` | `vite build --config vite.iter.config.ts` |—|
| `iter-test` | `vitest run --reporter=verbose` |—|
| `iter-test-watch` | `vitest --watch` |—|
| `emit-types` | `vue-tsc --declaration --emitDeclarationOnly ...` |—|
| `iter` | `iter-check && iter-build && iter-test` |—|
| `proof:package` | `node scripts/proof-package.mjs` |—|
| `proof:consumers:static` | `node scripts/proof-consumers-static.mjs` |—|
| `proof:consumers:build` | `bash scripts/proof-consumers-build.sh` |—|
| `proof:runtime` | `node scripts/proof-runtime.mjs` |—|
| `proof:theme` | `node scripts/proof-theme-style.mjs` |—|
| `profile:bundle` | `node scripts/profile-bundle.mjs` | measurement-only |
| `profile:budget` | `node scripts/profile-bundle.mjs --enforce` | gate (CI) |
| `profile:aurora` | `node scripts/profile-aurora.mjs` |—|
| `validate-consumers` | `scripts/validate-consumers.sh` | wraps 2 proofs |
| `release` | `bash scripts/release.sh` |—|
| `prepublishOnly` | `npm run build && npm test` | lifecycle (auto on `npm publish`) |

### 2.2 Cross-script dependency map

```
prepare  ────────────────► [ test ] → build
prebuild ────────────────► freshness-gate.mjs --pre (permissive)
                                 │
                                 ▼
build ────────────────────► vite build (vite.config.ts)
                                 │
                                 ├──◄── proof:package (runs `npm run build` if dist missing OR --build)
                                 │              │
                                 │              ▼
                                 │      npm pack → tmpdir tarball → install + tsc probe
                                 │
                                 ├──◄── profile:bundle / :budget (calls `npm run iter-build`, NOT build)
                                 │              │                    └──► vite.iter.config.ts
                                 │              ▼
                                 │      walks dist/, gzips, compares to BUDGETS
                                 │
                                 └──◄── release.sh (calls `npm run build` again)
                                                │
                                                ├──► typecheck + test + build
                                                ├──► subpath probe loop (7 hardcoded subpaths)
                                                ├──► optional verify-export-types (env-gated)
                                                └──► git tag

proof:runtime         ──► spawns `npm run dev` + headless Chrome → 137 routes
profile:aurora        ──► spawns `npm run dev` + headless Chrome → preset matrix
proof:theme           ──► writes synthetic probe → invokes vite `build()` programmatically
proof:consumers:static──► reads parent dir consumers, scans imports
proof:consumers:build ──► runs `npm run build` in 4 sibling consumer repos
validate-consumers    ──► proof:consumers:static + proof:consumers:build

CI (.github/workflows/lint.yml):
  npm ci → npm run build → GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget
```

### 2.3 Vite config matrix

| Config | Used by | Notes |
|---|---|---|
| `vite.config.ts` | `npm run build`, `npm run dev` | demo + library entry |
| `vite.library.ts` | imported by both above | shared library entries / externals (not directly invoked) |
| `vite.iter.config.ts` | `npm run iter-build` (called from `profile-bundle.mjs`) | thin re-import of `vite.library`—library-only build |

`profile-bundle.mjs` line 66 hardcodes `npm run iter-build`. **The budget gate measures `iter-build` output, not the canonical `build` output that ships to consumers.** Both produce `dist/glass-ui.js` since they share `libraryEntries`, but tree-shaking / minify settings could in principle diverge.

### 2.4 Skip-flag / env-var matrix

| Flag / env var | Script | Purpose |
|---|---|---|
| `--skip-build` / `GLASS_UI_BUDGET_SKIP_BUILD=1` | `profile-bundle.mjs:49-50` | CI path—don't re-build after the dedicated build step |
| `--enforce` / `GLASS_UI_BUDGET_MODE=1` | `profile-bundle.mjs:51-52` | exits non-zero on FAIL (vs measurement-only) |
| `--pre` | `freshness-gate.mjs:125` | permissive (warn-only) for `prebuild` lifecycle |
| `--build` (argv) | `proof-package.mjs:86` | force rebuild even if `dist/` exists |
| `GLASS_UI_RELEASE_SURFACE_GUARD` | `release.sh:88` | opt-in `verify-export-types` (off by default) |
| `GLASS_UI_*_ARTIFACT` (8 of them) | each proof script | artifact path override |
| `GLASS_UI_CHROME_DEBUG_PORT`, `CHROME_PATH`, `GLASS_UI_RUNTIME_*` | `proof-runtime.mjs`, `profile-aurora.mjs` | local browser tuning |
| `GLASS_UI_AURORA_DISABLE_GPU=1` | `profile-aurora.mjs:684` | force `--disable-gpu` for headless |

### 2.5 Lifecycle hooks audit

- `prebuild`—runs freshness gate in **permissive** (`--pre`) mode. Workaround for the chicken-and-egg of "stale dist warned before the rebuild that fixes it." Consistent with the script's documented design.
- `prepare`—`test -f dist/glass-ui.js || npm run build`. **No freshness check.** A consumer workspace symlink that already has a `dist/` from an older version will skip rebuild and silently serve stale code; this is exactly the V.W8 drift class the freshness gate exists to prevent. The `prebuild` hook only fires when `npm run build` is explicitly invoked, not from this conditional.
- `prepublishOnly`—`npm run build && npm test`. Duplicates work that `release.sh` already does (release.sh runs typecheck + test + build), so `release` followed by `npm publish` builds twice.

## 3. Findings

### 3.1 Duplicated work

| # | Site | Description |
|---|---|---|
| D1 | `release.sh:57-61` vs `prepublishOnly` | release.sh runs `typecheck + test + build`; `npm publish` then re-runs `build + test` via prepublishOnly. Two builds, two test runs per release. |
| D2 | `proof-package.mjs:86-88` vs explicit `npm run build` | Conditionally runs `npm run build` if dist missing. If the user just ran `build`, fine; if they pass `--build`, also rebuilds. Independent of the lifecycle hooks. |
| D3 | `profile-bundle.mjs:66` vs `npm run build` | Bundle profile uses `iter-build` (vite.iter.config.ts), not the canonical build. Two builds may produce subtly different artefacts measured against budget. |
| D4 | `walkNewestMtime` algorithm | Implemented twice: `scripts/freshness-gate.mjs:43-70` and `src/freshness.ts:32-59`. Identical `SRC_EXT` / `SKIP_DIRS` constants, identical logic. `freshness.ts` header explicitly acknowledges the duplication and the rationale (TS-loader-free CLI path). |
| D5 | `release.sh:73` subpath probe | Hardcodes 7 subpaths (`forms api dark keyboard carousel tokens dock`)—but the package now ships 38 export subpaths (CLAUDE.md §"Subpath surface"). `verify-export-types` covers ALL 38 but is gated behind an env var. |
| D6 | `proof-package.mjs:113` | Synthetic consumer manifest still pulls `tailwind-merge` as a dep, even though v0.9.2 retired it (CLAUDE.md Dependencies §). Cruft, not a duplication, but lives in the same file. |

### 3.2 Special-case / fallback paths

| # | Site | Description |
|---|---|---|
| S1 | `freshness-gate.mjs:120-138` `isMain` detection | Dual-mode (importable + CLI-runnable). Works, but adds a branching invocation surface. |
| S2 | `freshness-gate.mjs:30-37` `defaultRoot()` | Falls back to `process.cwd()` under non-file loaders (vitest transform pipeline). The freshness.ts twin uses `import.meta.url` exclusively. Slight algorithmic divergence in root resolution. |
| S3 | `profile-aurora.mjs:752-760` Chrome fallback | If `CHROME_PATH` fails, falls back to hardcoded macOS path. Reasonable but Darwin-specific. |
| S4 | `release.sh:88-90` surface-guard env gate | Opt-in `verify-export-types` despite L.W0 Lane III stating "Subpath publication is binary." This should be the unconditional default. |
| S5 | `prepare` script | Conditional rebuild only on missing dist file, no freshness check. |

### 3.3 CI vs local divergence

CI runs one job: `bundle-budget` (`.github/workflows/lint.yml`). Path is `npm ci → npm run build → GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget`.

CI does NOT run: `typecheck`, `test`, `proof:*` (any), `verify-export-types`, `profile:aurora`. All seven of those are local-only gates. The release script bundles five of them, but only the release path enforces them.

A PR touching `src/` can land without `npm test`, `vue-tsc --noEmit`, or any proof script having been executed by automation. The bundle-budget gate is the only automated guard.

### 3.4 Pre/post hook consistency

`prebuild` and `prepare` are the only lifecycle hooks; `prepublishOnly` adds a publish-time safety net. There is no `posttest`, `postbuild`, `pretest`, etc. The `prepare` hook is a workaround for workspace-symlink bootstrap—a real "always ensure dist is fresh on install" would invoke the strict (not `--pre`) freshness gate plus a conditional rebuild.

### 3.5 Release pipeline redundancy

`release.sh` runs (in order): version check, clean tree check, **typecheck**, **test**, **build**, dist sanity check, **subpath import probe** (7 subpaths), optional verify-export-types, git tag.

Of these, the typecheck/test/build trio is repeated by `prepublishOnly` if the operator runs `npm publish` after `release`. Two of the same builds and test runs in series, separated by `git tag`.

## 4. Proposed plan implications

### 4.1 Orchestration shape—recommended

**Layer A—single canonical build entry.** Pick one of `vite.config.ts` vs `vite.iter.config.ts` for library artefacts (or extract a shared internal). `profile-bundle.mjs` should invoke the same build the release pipeline uses.

**Layer B—`proof:all` cohort runner.** Add:
```
"proof:all": "npm run proof:package && npm run proof:theme && npm run proof:consumers:static && npm run proof:consumers:build && npm run proof:runtime"
```
Optional sequenced variant or parallel orchestrator (e.g. `npm-run-all -p`).

**Layer C—freshness algorithm centralization.** Extract `walkNewestMtime` + `SRC_EXT`/`SKIP_DIRS` into a single source. Three viable shapes:
- (i) keep `freshness-gate.mjs` canonical; have `src/freshness.ts` dynamic-import it at runtime (the file header already gestures at this—the comment "re-imports the same mtime-walk via dynamic import + a tiny pure-TS fallback" describes intent that the code does NOT implement).
- (ii) extract a tiny `scripts/freshness-walk.mjs` consumed by both.
- (iii) declare the duplication intentional and lock it via a test that snapshots both algorithms.

The header at `src/freshness.ts:13-17` declares intent (i); the implementation is intent (iii). Resolve the precept-vs-code mismatch.

**Layer D—release.sh hard gates.**
- Remove the `GLASS_UI_RELEASE_SURFACE_GUARD` env gate; run `verify-export-types` unconditionally (binary per L.W0 Lane III).
- Drop the hardcoded 7-subpath probe loop; defer to `verify-export-types` which iterates the full export set.
- Trim typecheck/test/build duplication with `prepublishOnly` by deferring those to publish-time, or invert the order (release.sh → npm publish → git tag, with prepublishOnly carrying the gates).

**Layer E—CI gate expansion.** Run at minimum `typecheck`, `test`, `verify-export-types` alongside `bundle-budget`. Optional: `proof:consumers:static` (no sibling consumer assumption) and `proof:theme` (synthetic, no sibling dep).

**Layer F—`prepare` hook freshness.** Either run the strict freshness gate (not `--pre`) and rebuild on stale, or document that workspace-symlink consumers should run `npm run build` explicitly.

### 4.2 Artifact destination canon

`profile-bundle.mjs` writes to `docs/tranches/K/audit/W4-bundle-profile.json`—pinned to the closed K tranche. All other proof artefacts default to `docs/tranches/F/audit/`. Either canonicalize a current-tranche path or move budget artefacts to a tranche-neutral location (e.g. `docs/audits/`).

## 5. Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | Consolidating `vite.iter.config.ts` and `vite.config.ts` may change bundle bytes—could trip the budget gate. | Re-baseline budget at consolidation close (the script already supports re-baselining; N.W0 has precedent). |
| R2 | Removing `GLASS_UI_RELEASE_SURFACE_GUARD` opt-in turns an opt-in into a hard gate—a flaky `verify-export-types` would block releases. | The script reads only `package.json` + `dist/` + does a TS `resolveModuleName`; failure modes are deterministic. Low flake risk. |
| R3 | Adding `proof:*` to CI requires consumer sibling repos to be checked out—current `proof:consumers:build` walks `../<consumer>`. CI runners don't have this. | Either skip `proof:consumers:*` in CI or add a `CI_SKIP_SIBLINGS=1` branch. `proof:consumers:static` reads paths but only fails on missing dirs—also requires the same shape. |
| R4 | Centralizing freshness via dynamic import couples `src/freshness.ts` to a script path—consumer bundlers may try to inline `scripts/freshness-gate.mjs`. | Mark the path as external in `vite.library.ts` (already done for node built-ins; the import would be `import("../scripts/freshness-gate.mjs")` relative to dist—easy to externalize). |
| R5 | Moving subpath probe to `verify-export-types` changes the release-time symptom of a missing subpath from a clear bash error to a tsc-resolution error. | `verify-export-types.mjs` already prints `TypeScript cannot resolve <specifier>`—equivalent clarity. |
| R6 | Adding `proof:all` and wiring it to release.sh increases release time (each proof currently 30 s – 5 min). | Make `proof:all` opt-in for release; or split into fast (`package`, `theme`, `consumers:static`) vs slow (`runtime`, `consumers:build`) cohorts. |

## 6. Open questions

- Should `prepare` invoke strict freshness + rebuild, or stay as-is and rely on consumer discipline?
- Is the `vite.iter.config.ts` / `vite.config.ts` fork load-bearing (e.g. demo build vs library build), or vestigial?
- Should bundle-budget artefacts move out of `docs/tranches/K/audit/` now that K is closed?
- Does the project want `verify-export-types` to run on every `npm run build` (as a `postbuild` hook), or only at release?
- Is there appetite for a single `npm run gates` that wraps the full N close hard-gate suite (typecheck + test + build + profile:budget + proof:all + verify-export-types)?
