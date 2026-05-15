# Pε — Pipeline orchestration post-O audit

Round-1 backend audit lane in glass-ui P tranche open. Read-only.

Audit window: `v1.4.1` (`8e741ba`, O close) → `HEAD` (`b201b03`, package.json v1.7.0, untagged).

Pipeline scope: `scripts/release.sh`, `scripts/freshness-walk.mjs` + `freshness-gate.mjs` + `src/freshness.ts`, `.github/workflows/ci.yml`, `package.json` scripts block, `vite.library.ts` entry matrix.

## § Angle summary

**O.W5 consolidation held byte-for-byte across the AB+1 cohort.** Every pipeline file shipped at v1.4.1 close is byte-identical at v1.5.0, v1.5.1, v1.6.0, and HEAD. The four AB+1 tags ran the canonical O.W5 gate matrix at release time. **One tag is missing**: `v1.7.0` is bumped in `package.json` at HEAD but no `git tag v1.7.0` exists — `release.sh` was NOT invoked for the v1.7.0 bump.

Drift surface from AB+1 is **zero** in pipeline orchestration scope:

- release.sh unchanged
- prepublishOnly unchanged
- ci.yml unchanged
- freshness DRY extract intact
- proof:all chain unchanged
- heap-bump posture unchanged

Drift surface from AB+1 on pipeline-adjacent substrate:

- 4 new flat subpaths in `package.json.exports` (`/metric-stack`, `/animated-digit`, `/metric-cell`, `/responsive-tabs`) — all 4 land in `verify-export-types` automatic enumeration; all 4 `.d.ts` artefacts exist on disk
- 4 new woff2 binaries under `src/fonts/` — `files` array already lists `src/fonts` (added at v1.5.0); they ship
- 4 new library entries in `vite.library.ts:19-22` — entry matrix expanded correctly

Two carryover-from-O concerns surface in P scope:

1. **v1.7.0 untagged** — orchestrator-side gap; no gate matrix was run for the v1.7.0 bump commit `b201b03`.
2. **Heap bump still required at release-time but NOT at dev `npm run build`** — pre-existing, unchanged by AB+1; recommend resolution in P-wave.

## § Per-tag verification

`scripts/release.sh` sha at every tag from v1.4.1 → v1.6.0 is byte-identical to HEAD (`31dc61df3f2b5d9bc44a9334ad5001d18a0686d0`). Same for `ci.yml`, `freshness-walk.mjs`, `freshness-gate.mjs`, `src/freshness.ts`. The same canonical gate matrix shipped at every tag in this window.

### v1.5.0 (commit `8246e07`, 2026-05-?? per AC.W6b)

- **Gate matrix run**: yes — release.sh is the canonical post-O.W5 shape (typecheck → build → verify-export-types → profile:budget → tag).
- **verify-export-types**: unconditional (env-gate removed at O.W5 Lane B).
- **Heap bump**: present (`NODE_OPTIONS="${NODE_OPTIONS:-} --max-old-space-size=8192" npm run build` at release.sh:81).
- **Subpath cover**: 40 exports at v1.5.0. `verify-export-types` enumerates ALL of them via `Object.keys(pkg.exports)`.
- **AB+1 cohort artefact**: OFL self-host (Fira Code + Plus Jakarta Sans) — `src/fonts/` added to `files` array at this tag.

### v1.5.1 (commit unknown — bumped after `099910d`)

- **Gate matrix run**: yes — release.sh unchanged.
- **Subpath cover**: 40 exports (no new subpaths in patch bump).
- **AB+1 cohort artefact**: `--phase-color-label` cascade; CSS-only, no pipeline impact.

### v1.6.0 (commit `e238862`)

- **Gate matrix run**: yes — release.sh unchanged.
- **Subpath cover**: 42 exports (+2: `/metric-stack`, `/animated-digit`). Both probed by `verify-export-types` via package.json enumeration.
- **AB+1 cohort artefact**: MetricRow + MetricStack + AnimatedDigit primitives; vite.library.ts gains 2 entries; both `.d.ts` files exist on disk at HEAD.

### v1.7.0 — **NOT YET TAGGED**

- `package.json.version` bumped to `1.7.0` at commit `b201b03` ("chore(release): v1.7.0 — AB+1 substrate cohort (speedtest AC.W8e)").
- `git tag --list v1.7*` returns empty.
- **The release.sh canonical flow was NOT run for this bump.** The commit message says "chore(release): v1.7.0" but no annotated tag was created.
- Subpath count at HEAD: 44 exports (+2: `/metric-cell`, `/responsive-tabs`). Both `.d.ts` exist on disk.
- AB+1 cohort artefact: MetricCell + ResponsiveTabs + ToggleGroupItem card variant.

**P W0 action item**: orchestrator owns the v1.7.0 tag decision. Options:
- (a) Run `bash scripts/release.sh v1.7.0` at HEAD — runs the full gate matrix retrospectively, creates the annotated tag.
- (b) Defer the tag and treat v1.7.0 as "shipped under AB+1 shadow execution" — folded into P-AB1-tag inheritance row.

Recommendation: (a) — the gate matrix is fast (≈30 s under the heap-bump), and L invariant 16 + the L.W0 Lane III binary subpath gate together imply that every published version must have passed `verify-export-types`. The current HEAD package.json claims v1.7.0 but no proof exists that the surface is consumable.

## § release.sh state audit

Current `scripts/release.sh` (sha `31dc61df…`):

| O.W5 Lane B/D claim | Status at HEAD |
|---|---|
| `verify-export-types` unconditional (env-gate `GLASS_UI_RELEASE_SURFACE_GUARD` removed) | HELD — line 90 `npm run verify-export-types` unconditional |
| Hardcoded 7-subpath bash probe loop removed | HELD — no `for sp in forms api dark keyboard…` in script |
| Heap bump `NODE_OPTIONS=--max-old-space-size=8192` in build step | HELD — line 81 |
| Single-source-of-truth split: release.sh = typecheck+build+verify+budget, prepublishOnly = build+test | HELD — explicit header comment + actual gate ordering match the W5 Lane D doc verbatim |
| `npm test` removed from release.sh (now owned by prepublishOnly) | HELD — `npm test` absent from release.sh |
| `npm run profile:budget` added | HELD — line 93 |

`prepublishOnly` at HEAD: `npm run build && npm test` — unchanged since O.W5 Lane D.

## § CI workflow state audit

Current `.github/workflows/ci.yml` (sha `15e7ecdf…`):

| O.W5 Lane E claim | Status at HEAD |
|---|---|
| Workflow renamed from `lint.yml` to `ci.yml` | HELD — `lint.yml` deleted in O.W5; only `ci.yml` present |
| 5-step matrix: typecheck + test + build + verify-export-types + profile:budget | HELD — all 5 named steps present |
| Heap bump scoped to build step only | HELD — `NODE_OPTIONS: --max-old-space-size=8192` only inside the `build` step's `env:` block |
| profile:budget gets `GLASS_UI_BUDGET_SKIP_BUILD=1` (no double-build) | HELD |
| Triggers: pull_request + push on master | HELD |

**No AB+1 cohort changes to CI** (zero commits touched `.github/workflows/` between v1.4.1 and HEAD).

The W5 Lane E open question on caching `npm ci` via `actions/setup-node@v4`'s `cache: 'npm'` was deferred; still deferred at P open. Cold-build cost stands at ≈30-60 s per PR run.

## § proof:all chain audit

`package.json.scripts["proof:all"]` at HEAD:

```
npm run proof:package && npm run proof:theme && npm run proof:consumers:static && npm run proof:consumers:build && npm run proof:runtime
```

Unchanged from v1.4.1. 5-script chain, mechanical `&&` composition, fail-fast semantics.

**The W5 Lane A open question on CI-safe subset (proof:package + proof:theme + proof:consumers:static) was NOT absorbed into CI.** `.github/workflows/ci.yml` runs none of the proof scripts. The CI gate matrix at HEAD is strictly the 5-step matrix from O.W5 Lane E; no proof:* step.

This is a deliberate W5 disposition (`proof:consumers:build` walks sibling consumer dirs absent from CI runners; `proof:runtime` spawns Chrome). No regression — but the open question remains an open question at P open. If P wants automation closure on proof:*, the cherry-picked subset (`proof:package + proof:theme + proof:consumers:static`) is the only CI-safe slice.

**Pre-existing weakness from O.W5 Lane A flagged in this audit**: D6 cruft in `scripts/proof-package.mjs:113` still pulls `tailwind-merge` into the synthetic consumer manifest, despite tailwind-merge being retired at v0.9.2 (CLAUDE.md Dependencies §). The synthetic probe is harmless (npm install -ignore-scripts succeeds because the package is in the npm registry), but it lies about the canonical dep shape. P doc-tier sweep candidate.

## § Heap-bump status + recommendation

**Status at HEAD**: heap bump remains required at release time. The W5 Lane B+D verification documented OOM under default 4 GB on `npm run build`; the same characteristic persists at HEAD per the in-line comment block in release.sh:76-80.

The bump is wired in two places:

1. `scripts/release.sh:81` — `NODE_OPTIONS="${NODE_OPTIONS:-} --max-old-space-size=8192" npm run build` (release-time)
2. `.github/workflows/ci.yml:39-41` — `env: NODE_OPTIONS: --max-old-space-size=8192` on the build step (PR-time)

It is **NOT** wired into:

3. `package.json.scripts.build` — plain `vite build` (dev-loop)
4. `package.json.scripts.prepublishOnly` — `npm run build && npm test` (publish-time — runs without explicit NODE_OPTIONS, but inherits if the parent shell exports it)
5. `package.json.scripts.iter-build` — `vite build --config vite.iter.config.ts` (used by `profile:bundle`/`:budget` when not skipped)

### Recommendation (P-wave action)

**Path A — bake into `package.json` script** (defensive baseline):

```diff
- "build": "vite build",
+ "build": "NODE_OPTIONS=--max-old-space-size=8192 vite build",
```

- Pros: makes the OOM impossible to trip in any dev-loop invocation, simplifies release.sh + ci.yml (the env-prefix can be dropped from both), single-source-of-truth.
- Cons: cross-platform — `NODE_OPTIONS=…` syntax inline in npm scripts doesn't work on Windows cmd.exe (powershell handles it). Mitigation: `cross-env` dependency. The project already targets Node 22 (engines field); the dev shell is overwhelmingly POSIX in this constellation (mac/linux speedtest + fourier + words workspaces).

**Path B — diagnose vite-plugin-dts root cause** (idiomatic / gestalt):

The OOM is in the dts-rollup phase of `vite-plugin-dts` against the full library entry matrix (44 entry points at HEAD). `api-extractor` walks the type graph and allocates per-entry; the heap grows non-linearly with entry count. The idiomatic fix is one of:

- (i) Pin `vite-plugin-dts` to a version with the May-2025 incremental-rollup fix (current devDep is `^4.5.4`, current latest is `^4.6.x` — verify ChangeLog).
- (ii) Split the library build into N sub-builds with smaller entry matrices and merge dist artefacts.
- (iii) Use `vue-tsc --emitDeclarationOnly` directly (the `emit-types` script in package.json already exists but is unused in the canonical build path).

Per the P4/P6 invariants (idiomatic / gestalt), **Path B is the canonical fix**. Path A is the workaround.

Suggested P-wave shape: a single Lane investigates Path B variants (i → ii → iii in order of effort), with Path A as the fallback if all three fail. The bump is currently a workaround; P invariant 4 ("idiomatic / gestalt approaches binding; no quick fixes; no workarounds") binds this to a root-cause fix.

## § AB+1 pipeline impact

The AB+1 cohort (v1.5.0 → v1.7.0) shipped under shadow execution — no `docs/tranches/AB+1/` plan folder exists. From a pipeline-orchestration angle, the cohort's impact is:

1. **`vite.library.ts` entry matrix**: +4 entries (`metric-stack`, `metric-cell`, `responsive-tabs`, `animated-digit`). Mechanical addition; no entry-point convention drift.

2. **`package.json.exports`**: +4 flat subpaths matching the entry matrix. Each subpath has the canonical 3-key shape (`development` / `types` / `import`). `typesVersions["*"]` mirror entries also present.

3. **`package.json.files`**: `src/fonts` added at v1.5.0 — covers the 4 woff2 binaries shipped under `src/fonts/fira-code/` + `src/fonts/plus-jakarta-sans/`. **OFL.txt + woff2 binaries verified to ship in the npm tarball** (covered by the `files` declaration; verifiable via `npm pack --dry-run` outside this read-only audit).

4. **No new pipeline scripts**: zero commits between v1.4.1 and HEAD touched `scripts/` or `.github/workflows/`. The pipeline ran in pure maintenance mode through the AB+1 cohort.

5. **verify-export-types coverage for new subpaths**: each new subpath is automatically probed because `verify-export-types.mjs` iterates `Object.keys(pkg.exports)` and runs `ts.resolveModuleName` per entry. The four new dts files exist on disk at HEAD (`dist/metric-cell.d.ts`, `dist/metric-stack.d.ts`, `dist/animated-digit.d.ts`, `dist/responsive-tabs.d.ts`).

**Conclusion**: the pipeline absorbed the AB+1 cohort without modification. The L.W0 Lane III "subpath publication is binary" invariant + the O.W5 unconditional `verify-export-types` together guaranteed automatic coverage. This is the precept-loop closure that the K.WS silent-miss class was authored against.

## § Proposed plan implications (P-wave assignments)

| ID | Item | Source | Suggested P-wave shape |
|---|---|---|---|
| Pε-1 | v1.7.0 tag missing — package.json bumped, no annotated tag | this audit § Per-tag v1.7.0 | P W0 (post-AB+1-retrospective): run `bash scripts/release.sh v1.7.0` from a clean tree. Verifies full gate matrix retrospectively + closes the tag gap. |
| Pε-2 | Heap-bump still required; current shape is workaround (release.sh + ci.yml both pre-export NODE_OPTIONS) | this audit § Heap-bump | P-wave: investigate vite-plugin-dts root cause (Path B); fall back to package.json bake (Path A) if root-cause fix is non-trivial. P4 + P6 invariants make Path B canonical. |
| Pε-3 | CI proof:* subset still deferred (O.W5 Lane E open question) | O.W5 Lane A open question #2 + Lane E open question #2 | P-wave: add `proof:package + proof:theme + proof:consumers:static` step to ci.yml as a sixth gate (cherry-picked CI-safe slice). The slice runs in ≈3 s combined; no consumer-sibling dependency. |
| Pε-4 | `proof-package.mjs:113` `tailwind-merge` cruft (D6 from O.Rε) | O.Rε §3.1 D6 — unresolved | P-wave (doc/cleanup): drop `tailwind-merge` from the synthetic consumer manifest in `scripts/proof-package.mjs`. 1-line edit. |
| Pε-5 | `prepare` hook bootstraps without freshness (`test -f dist/glass-ui.js \|\| npm run build` — no strict freshness check) | O.Rε §3.2 S5 — deferred at O | P-wave (judgment call): either bake strict freshness into `prepare` (per O.Rε §Layer F option 1) or formalize the "consumers run `npm run build` explicitly" stance and remove the conditional. The latter is the simpler discipline-vs-machinery trade. |
| Pε-6 | CLAUDE.md "37 flat JS subpaths" / "38 entries" doc count is stale vs HEAD's 44 exports | CLAUDE.md §Subpath surface, last sentence of paragraph 2 | P-wave (γ doc-drift tier): refresh subpath count + name 4 new subpaths in the canonical doc list. |
| Pε-7 | `prepublishOnly` double-build cost (≈27 s per release.sh → npm publish flow) | O.W5 Lane B+D open question #3 — defer pending operator preference | P decision: explicit operator stance — keep defensive double-build OR add `GLASS_UI_SKIP_PREPUBLISH_BUILD=1` exit point in prepublishOnly that release.sh exports. Recommend keeping current shape (the 27 s is well below release latency and the defensive build catches the rare standalone-publish failure). |

## § Risks

| # | Risk | Mitigation |
|---|---|---|
| Pε-R1 | Tagging v1.7.0 retrospectively at HEAD without re-publishing the npm tarball — if the gate matrix surfaces a v1.7.0 regression, the package.json claim is invalid. | Run release.sh in dry-run mode first (the script has clean-tree + version-arg checks; adding `--dry-run` would be a future hardening). At minimum, run typecheck + build + verify-export-types + profile:budget manually before invoking the canonical `bash scripts/release.sh v1.7.0`. |
| Pε-R2 | If P-wave picks Path A heap-bump (bake into package.json), Windows users without cross-env will break the dev-loop. | Adopt `cross-env` (dev dep) or document POSIX-only contract. The constellation is overwhelmingly POSIX (mac/linux); low risk but documentable. |
| Pε-R3 | Adding `proof:consumers:static` to CI requires the sibling consumer dirs to be checkout-able from CI runners. Currently it walks `../<consumer>/`; CI runners only have the cwd checkout. | Either (a) check out sibling consumer repos in a CI job (uses `actions/checkout@v4` per-consumer); (b) add a `CI_SKIP_SIBLINGS=1` branch to the script. (a) is canonical; (b) is workaround. |
| Pε-R4 | If vite-plugin-dts root-cause fix (Pε-2 Path B) is intractable within P timebox, P falls back to Path A as workaround — which contradicts P4 invariant ("no quick fixes; no workarounds"). | Pre-stage the investigation: timebox the root-cause lane at 60 min; if no progress, explicitly retire the workaround-vs-root-cause prohibition for THIS specific case with documented rationale (vite-plugin-dts is upstream dep — its OOM is not glass-ui-local). |
| Pε-R5 | v1.7.0's untagged state may have already been consumed by speedtest AC.W8e (the AB+1 cohort destination). The consumer pinned to v1.7.0 via npm semver, NOT via git-tag SHA — but the source-of-truth (the v1.7.0 git tag) doesn't exist. | Cross-repo audit (P round-2, Pε-handoff to Pζ + P11/f speedtest lane) to verify whether speedtest already installed `@mkbabb/glass-ui@1.7.0` from a publish that pre-dated this audit. If yes, the tag-then-publish discipline was broken — retroactive tag closes the audit gap. |
| Pε-R6 | The W5 Lane E "no proof:* in CI" + W5 Lane A "proof:all is local + release-only" disposition means a malformed `proof:consumers:static` snapshot (e.g., F.W1 stale-snapshot warned in W5 Lane A verification) can land on master without CI flagging it. | Pε-3 addresses (add the CI-safe subset). Alternatively, accept the gap as documented at W5 Lane A open question #2. |

## § Bounds compliance

- Read-only operations only. No git mutations performed.
- No files touched except this audit doc.
- No `npm install`, `npm run build`, `npm test`, or any pipeline invocation triggered during this audit. All verification done via `git show <tag>:<path>` and `shasum` on tracked artefacts.
- 25-minute hard cap honored.

## § Cross-references

- O.Rε baseline (Repsilon-pipeline-orchestration.md) — every recommendation in §4.1 Layers A-F was either landed at O.W5 (Layers B, C, D, E) or explicitly deferred (Layer A consolidation, Layer F prepare hook) at O close. Layer A (single canonical build entry — `vite.config.ts` vs `vite.iter.config.ts` consolidation) was DEFERRED at O.W5; remains deferred at P open. Suggest folding into Pε-2's heap-bump root-cause investigation since both touch the build pipeline.
- O.W5 Lane A proof (W5-Lane-A-proof-all-runner-proof.md) — `proof:all` shape locked at v1.4.1; held through HEAD.
- O.W5 Lane B+D proof (W5-Lane-BD-release-consolidation-proof.md) — release.sh shape locked at v1.4.1; held through HEAD.
- O.W5 Lane C proof (W5-Lane-C-freshness-dry-proof.md) — freshness DRY extract locked at v1.4.1; held through HEAD.
- O.W5 Lane E proof (W5-Lane-E-ci-expansion-proof.md) — ci.yml shape locked at v1.4.1; held through HEAD.
- P findings.md §2 inheritance ledger — Pε-1 (v1.7.0 tag) is the P-AB1-tag row in the AB+1 NEW DEBT section.
