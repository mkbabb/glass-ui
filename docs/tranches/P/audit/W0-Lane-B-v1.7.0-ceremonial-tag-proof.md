# P.W0 Lane B—v1.7.0 ceremonial tag (orchestrator-solo gate matrix)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-solo (per W0.md Lane B + AGENT.md "Cross-repo dispatch authorization").

## §1—Scope

Per `docs/tranches/P/waves/W0.md` Lane B + Pε-1. The `package.json` bump landed at commit `b201b03` (`chore(release): v1.7.0—AB+1 substrate cohort (speedtest AC.W8e)`) but the git tag `v1.7.0` was absent, and the canonical release gate matrix (typecheck + build + verify-export-types + profile:budget + test) had not run against the v1.7.0 surface. Lane B closes both gaps.

## §2—Canonical gate matrix (O.W5 Lane A precedent)

Each gate run from `/Users/mkbabb/Programming/glass-ui` against HEAD `b8a61ec` (typography dock-label + timeline opacity cascade post-P-open commits already landed; v1.7.0 surface unchanged in shape from `b201b03`).

| Gate | Command | Result |
|---|---|---|
| 1. Type check | `npm run typecheck` | **PASS** (vue-tsc --noEmit; zero diagnostics) |
| 2. Build | `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | **PASS** (44 dist entries; declaration files built in 43_952 ms; total 44.95 s) |
| 3. Verify export types | `npm run verify-export-types` | **PASS** (`All package export targets and type resolutions are valid.`) |
| 4. Profile budget | `npm run profile:budget` | **PASS** (post-rebaseline; see §3 below) |
| 5. Tests | `npm test` | **PASS** (32 test files / 361 tests / 2.98 s) |

### Heap-bump observation (Pε-2 carry-forward)

`NODE_OPTIONS=--max-old-space-size=8192` remains the build-time invariant. P.W4 Lane A pursues root-cause OR bake into `package.json.build` per `docs/tranches/P/waves/W4.md`. Not closed at W0.

## §3—Bundle-budget rebaseline (P-2 absorbed in Lane C)

The 4-gate matrix initially showed `profile:budget` FAIL for CSS:

```
[FAIL] dist/glass-ui.css—raw 38006 / 36000 (105.6%); gzip 7096 / 6700 (105.9%)
```

This is the canonical AB+1 cohort accumulation: AC.W6b OFL font self-host + AC.W6c phase-color-label cascade + AC.W6d primitive trio + AC.W8e secondary primitive trio + commit `b8a61ec` `--continuous-fill-opacity` cascade. Per P.md §4 P-2 carry-forward, the budget rebaselines at this wave (Lane C work)—analog of the N.W0 rebaseline against the AB tranche additions.

New CSS baseline: **42_000 raw / 7_400 gzip** (≈ 10 % headroom over the 38_006 / 7_096 current draw). Post-rebaseline gate result:

```
[PASS] dist/glass-ui.css—raw 38006 / 42000 (90.5%); gzip 7096 / 7400 (95.9%)
```

Rebaseline rationale captured inline in `scripts/profile-bundle.mjs` and the `1.7.0` CHANGELOG entry. Future tranches rebaseline at their own close per the invariant-29 AB+1 retrospective discipline (codified at P.W6).

## §4—Tag operation

`v1.7.0` ceremonial tag is annotated and placed on the W0 close commit (which bundles Lane A AB+1 retrospective + Lane B gate-matrix proof + Lane C doc-counter resync). Message: `v1.7.0—AB+1 cohort ceremonial tag (release per O.W5 canonical gate matrix; P.W0 Lane B)`.

Tag + commit pushed to `origin/master` + `origin v1.7.0`.

## §5—Hard-gate verification

(a) All 5 canonical gates PASS post-rebaseline.
(b) Tag `v1.7.0` annotated + placed on W0 close commit.
(c) Tag + commit pushed to `origin`.
(d) CHANGELOG `## 1.7.0` entry updated with P.W0 sub-section (Lane B ceremonial tag + Lane C doc-counter + bundle-budget rebaseline).
(e) Pε-1 closed: `git tag --list 'v1.7*'` returns `v1.7.0`.
(f) Pε-2 deferred to P.W4 Lane A (in-scope at the W4 ceremony; not a W0 deliverable).

## §6—Hardened agent git clause compliance

Lane B is orchestrator-solo. The orchestrator owns the mutating git operations (`git tag` + `git push`). No agent was dispatched in this lane; no agent ran any mutating git command. The 6th-recurrence stash-anti-pattern window remains clean at W0 close.

## §7—Status: COMPLETED.
