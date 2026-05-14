# O.W5 Lane E — CI gate expansion proof

**Lane**: E — CI gates expansion
**Bounds**: `.github/workflows/lint.yml` → `.github/workflows/ci.yml` (rename + expand)
**Status**: gate matrix expanded; PR-time gates match release-time gates

## Disposition

### Rename decision

`.github/workflows/lint.yml` → `.github/workflows/ci.yml`.

W5.md §Lane E suggests the rename ("`rename to ci.yml`?"). Rationale: the workflow name no longer reflects its scope. With four canonical gates (typecheck, test, verify-export-types, profile:budget) plus the build step they require, "lint" is a misnomer. "ci" matches the workflow's actual role — the PR-time gate matrix.

The old `lint.yml` is deleted; the new `ci.yml` is created. No alias, no shim (L invariant 4).

### Gate matrix

Per W5.md §Lane E goal: "every PR closes on the same gate matrix the release path uses". The matrix is:

| # | Gate | Script | Purpose |
|---|---|---|---|
| 1 | typecheck | `npm run typecheck` | `vue-tsc --noEmit` |
| 2 | test | `npm run test` | `vitest run` |
| 3 | build | `npm run build` | required for gates 4+5 |
| 4 | verify-export-types | `npm run verify-export-types` | subpath dts publication probe (L.W0 Lane III) |
| 5 | profile:budget | `GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget` | bundle-budget enforcement (K W4 Lane B re-land) |

The build step (gate 3) is not itself a "gate" in the W5.md list — it is a prerequisite for gates 4 and 5. The order is: fast checks first (typecheck, test), then the build, then the post-build probes. Any non-zero exit aborts the job (`set -e` is implicit in `run:` steps).

**Alignment with release path**: post-W5 Lane B+D, `scripts/release.sh` will run typecheck + test + build + verify-export-types + profile:budget (Lane B removes the `GLASS_UI_RELEASE_SURFACE_GUARD` env-gate; Lane D dedupes vs `prepublishOnly`). The CI gate matrix here matches that release matrix one-to-one.

### Heap bump

The `build` step sets `NODE_OPTIONS=--max-old-space-size=8192` per the W1 observation cited in the lane brief. The K W4 Lane B `lint.yml` predecessor already used this bump on its `npm run build` step; the new `ci.yml` preserves it scoped to the build step only (other steps don't need it).

## File changes summary

```diff
- .github/workflows/lint.yml   (23 lines, bundle-budget only)
+ .github/workflows/ci.yml     (53 lines, 5-gate matrix)
```

### Before — `lint.yml` (K W4 Lane B shape)

```yaml
name: lint
on:
    pull_request:
        branches: [master]
    push:
        branches: [master]
jobs:
    bundle-budget:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: 20
            - run: npm ci
            - run: NODE_OPTIONS=--max-old-space-size=8192 npm run build
            - run: GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget
```

### After — `ci.yml` (O.W5 Lane E shape)

Header comment block documents lineage, gate matrix, fail-fast posture, and the
heap-bump rationale (so future readers don't have to re-derive it from W1).

`jobs.gates.steps` carries 8 steps (checkout, setup-node, npm ci, plus 5 named
gate steps). Each gate step has a `name:` so the GitHub Actions UI labels them
distinctly in the run timeline.

The `profile:budget` step sets `GLASS_UI_BUDGET_SKIP_BUILD=1` in its `env:`
block (the dedicated build step already produced `dist/`; re-building inside
`profile:budget` would double the work).

## Verification

### YAML parse

Using Python's PyYAML (js-yaml not installed in the repo):

```
$ python3 -c "import yaml; data = yaml.safe_load(open('.github/workflows/ci.yml')); print(list(data['jobs'].keys()), len(data['jobs']['gates']['steps']))"
['gates'] 8
```

YAML parses; job key is `gates`; 8 steps registered (3 setup + 5 named gates).

### Local gate runs

Each gate ran cleanly on local checkout (Node 22.15.0; macOS Darwin 25.4.0):

```
$ npm run typecheck
> vue-tsc --noEmit
(no diagnostics — exit 0)

$ npm run test --silent
 Test Files  30 passed (30)
      Tests  348 passed (348)
   Duration  2.40s

$ npm run verify-export-types
(prints 38 export entries with resolved dts + js paths; exit 0)

$ npm run profile:budget
[PASS] dist/glass-ui.js   — raw 127787 / 190000 (67.3%); gzip 22942 / 33700 (68.1%)
[PASS] dist/glass-ui.css  — raw  33590 /  36000 (93.3%); gzip  6142 /  6700 (91.7%)
(exit 0)
```

Local `profile:budget` ran without `GLASS_UI_BUDGET_SKIP_BUILD=1`, so it did
its own build internally. In CI we set the env var because a dedicated build
step ran upstream — this avoids the double-build documented in Rε §2.4.

### Timing observations (local)

| Gate | Local duration |
|---|---|
| `npm ci` (cold) | not measured (CI-only step) |
| `typecheck` | ~10 s |
| `test` | ~2.4 s |
| `build` | ~1 s (incremental) / ~15-30 s (cold) |
| `verify-export-types` | ~2 s |
| `profile:budget` (with `SKIP_BUILD`) | ~1 s |

Sum well below the W5.md "< 5 min typical" budget. The dominant CI cost will
be `npm ci` + the cold `build`, both of which are unavoidable.

## Open questions for orchestrator

1. **`prepublishOnly` alignment**: Lane D plans to make `release.sh` run typecheck + verify-export-types + profile:budget upstream of `npm publish`, with `prepublishOnly` doing build + test. The CI matrix here covers all five gates in one job. Should CI also adopt the Lane D split (publish-time gates vs release-time gates), or keep the single-job shape? Recommendation: keep single-job CI — CI runs ARE the publish-time gates from a pull request's perspective.

2. **`proof:*` in CI**: Rε §4.1 Layer E suggests including `proof:consumers:static` and `proof:theme` in CI. This lane intentionally scopes only to the four W5.md §Lane E gates. If the orchestrator wants `proof:*` in CI, that is a follow-on (and depends on Lane A's `proof:all` cohort runner shape).

3. **Workflow filename precedent**: this repo has no other `.github/workflows/` files. Future workflows (release automation, scheduled benchmarks, etc.) should sit alongside `ci.yml` with their own role-named files. No existing precedent overridden.

4. **Caching `npm ci`**: not added in this lane. The `actions/setup-node@v4` supports `cache: 'npm'` which would shave ~30-60 s off cold runs. Deferring to a future hardening pass — the W5.md bounds for this lane are narrow.

## Worktree diff verification

```
$ git status --porcelain
 D .github/workflows/lint.yml
 M docs/tranches/K/audit/W4-bundle-profile.json   ← pre-existing (gitStatus snapshot); re-touched by local profile:budget run
?? .github/workflows/ci.yml
?? docs/tranches/O/audit/W5-Lane-E-ci-expansion-proof.md
```

Within bounds:

- `.github/workflows/lint.yml` — deleted (renamed to ci.yml per task).
- `.github/workflows/ci.yml` — new (this lane).
- `docs/tranches/O/audit/W5-Lane-E-ci-expansion-proof.md` — new (this proof doc).

Out of bounds but pre-existing:

- `docs/tranches/K/audit/W4-bundle-profile.json` — was already modified at the
  start of the conversation per the gitStatus snapshot. My local
  `profile:budget` gate-verification run re-touched it (it is `profile:budget`'s
  output artefact). Not part of Lane E semantics; orchestrator owns disposition.

No git mutations performed (hardened agent git clause). Worktree files left in
place for orchestrator pickup.
