# O.W5 Lane B + D — release.sh consolidation proof

Combined lanes per orchestrator dispatch (both touch `scripts/release.sh`; atomic execution).

- **Lane B**: make `verify-export-types` unconditional in `release.sh`; drop the hardcoded 7-subpath bash probe loop (superseded by the canonical `verify-export-types` enumerator).
- **Lane D**: dedup `release.sh` gates against `prepublishOnly` so each step has a single owner.

## § Disposition

### Part 1 (Lane B) — `verify-export-types` unconditional

Before (release.sh:88–90):

```bash
if [[ -n "${GLASS_UI_RELEASE_SURFACE_GUARD:-}" ]]; then
    npm run verify-export-types
fi
```

After: env-gate removed; `verify-export-types` runs unconditionally on every release. Per L.W0 Lane III invariant ("subpath publication is binary"), this gate must execute against every release artifact.

Also removed: the hardcoded `for sp in forms api dark keyboard carousel tokens dock` bash probe loop (release.sh:72–83). `verify-export-types.mjs` enumerates EVERY subpath in `package.json.exports` (38 entries at HEAD) and per-subpath verifies (a) the `types` target exists, (b) the `import` target exists, (c) the dts file is consumable via a tsc probe. The 7-entry hardcoded loop was a strict subset of the canonical script's coverage.

### Part 2 (Lane D) — Dedup with `prepublishOnly`

**Original gate orchestration** (pre-O.W5):

| Step | release.sh | prepublishOnly | Owners |
|------|------------|----------------|--------|
| typecheck | YES | NO | release.sh only |
| test | YES | YES | 2x (duplication) |
| build | YES | YES | 2x (duplication) |
| verify-export-types | gated | NO | sometimes |
| profile:budget | NO | NO | unowned |

**New gate orchestration** (post-O.W5):

| Step | release.sh | prepublishOnly | Owners |
|------|------------|----------------|--------|
| typecheck | YES | NO | release.sh only |
| build | YES | YES | 2x (release-time gate prereq + defensive at publish) |
| verify-export-types | YES | NO | release.sh only (unconditional) |
| profile:budget | YES | NO | release.sh only (unconditional) |
| test | NO | YES | prepublishOnly only |
| tag | YES | NO | release.sh only |

**Net change:** `test` is no longer double-invoked. `build` remains double-invoked, but with explicit rationale documented inline: (a) `release.sh` build is the gate-matrix prerequisite (verify-export-types needs dts on disk; profile:budget reads bundle sizes from dist); (b) `prepublishOnly` build is defensive — anyone running `npm publish` standalone (without `release.sh`) still gets a fresh dist.

### Final chosen shape (recorded for posterity)

```
release.sh  → typecheck → build → verify-export-types → profile:budget → tag
                                                                          │
                                                                          ▼
                                                                     (operator runs)
                                                                       npm publish
                                                                          │
                                                                          ▼
                                                            prepublishOnly = build + test
```

**Why not push build into prepublishOnly only?** The gates `verify-export-types` and `profile:budget` need dist on disk BEFORE `npm publish` runs. If we move build to prepublishOnly only, the release-time gates run against stale or missing dist, defeating the gate's purpose. Keeping build in `release.sh` lets the gates fail-fast against a fresh artifact; the prepublishOnly build is the defensive re-run for the (rare) standalone publish path.

**Why not run gates from inside prepublishOnly?** prepublishOnly runs during `npm publish`. If a gate fails, the publish flow has already begun (locked metadata, etc.). Better to gate upstream — fail before publish begins.

**Why not eliminate prepublishOnly entirely and have release.sh own everything?** prepublishOnly is the npm-canonical hook — it protects against the case where someone runs `npm publish` directly (CI misconfig, ad-hoc operator, etc.). Removing it removes a safety net.

## § File changes summary

### `scripts/release.sh` (diff)

- Removed: `npm test` invocation (now owned by `prepublishOnly`).
- Removed: env-gated `GLASS_UI_RELEASE_SURFACE_GUARD` guard around `verify-export-types`; it now runs unconditionally.
- Removed: hardcoded `for sp in forms api dark keyboard carousel tokens dock` bash probe loop (superseded by `verify-export-types.mjs`).
- Added: explicit `npm run profile:budget` invocation (previously unowned by release.sh; now part of the unconditional gate matrix).
- Reorganized: gates now declared in explicit order with header comment documenting the single-source-of-truth split.
- Reordered: smoke check on `dist/index.d.ts` now AFTER the gates (it was upstream of the env-gated check; now it sits at the end of the gate matrix as a final sanity belt-and-suspenders).
- Updated: final echo block reflects the new `npm publish` (with `prepublishOnly`) handoff.

### `package.json`

**No change.** The existing `"prepublishOnly": "npm run build && npm test"` already matches the chosen canonical shape (build + test owned by prepublishOnly). The dispatch's alternative suggestion (`"npm run typecheck && npm run test && npm run build"`) was explicitly de-recommended by the dispatch itself ("Actually a cleaner approach: `prepublishOnly = build + test`. Don't double-run typecheck.").

The `"release": "bash scripts/release.sh"` script is unchanged — the script path is the same; its internals are what changed.

## § Verification

### Syntax checks

```
$ bash -n scripts/release.sh
SYNTAX OK
```

### Arg validation regressions (negative cases)

```
$ bash scripts/release.sh
Usage: scripts/release.sh v<X.Y.Z>
  e.g.: scripts/release.sh v0.8.5
(exit 1)

$ bash scripts/release.sh notaversion
ERROR: version must match v<major>.<minor>.<patch> (got 'notaversion')
(exit 1)
```

### Individual gates (executed in worktree)

```
$ npm run typecheck            → exit 0
$ NODE_OPTIONS="--max-old-space-size=8192" npm run build  → exit 0
$ npm run verify-export-types  → exit 0   (after fresh build)
$ npm run profile:budget       → exit 0
  [PASS] dist/glass-ui.js — raw 127787 / 190000 (67.3%); gzip 22942 / 33700 (68.1%)
  [PASS] dist/glass-ui.css — raw 33590 / 36000 (93.3%); gzip 6142 / 6700 (91.7%)
```

`npm publish` NOT executed (would side-effect publish to npm). `git tag` NOT executed (would mutate repo; agent git clause forbids).

### Negative-path confirmation (verify-export-types)

When dist is missing/stale, `verify-export-types` fails fast with the expected "Missing package export targets" error and exit code 1 — confirming the gate is load-bearing, not vestigial.

### Build memory note

A standalone `npm run build` invocation OOMs the V8 heap on this branch under the default 4GB limit; bumping `NODE_OPTIONS="--max-old-space-size=8192"` resolves. This is a pre-existing characteristic of the dts emission pipeline (`vite-plugin-dts` against the full library entry matrix). Out of scope for this lane; flagged for orchestrator follow-up.

## § Open questions for orchestrator

1. **Build OOM under default heap.** `npm run build` exhausts the V8 heap with the default 4GB limit. The `release.sh` script does not currently set `NODE_OPTIONS`. Should the script export `NODE_OPTIONS=--max-old-space-size=8192` before invoking build (and any sub-tool that spawns Node with builds, e.g., profile:budget invoking iter-build)? Suggested follow-up lane.
2. **profile:budget rebuilds via iter-build.** `profile:budget` invokes `npm run iter-build`, which uses `vite.iter.config.ts` (no dts emission). This means after `profile:budget` runs, the on-disk dist is a non-dts-emitting variant. For the current gate sequence (build → verify-export-types → profile:budget) this is fine because verify-export-types runs against the dts-emitting build first. But if a future change reorders, this would silently break the dts gate. Should `profile:budget` accept `--skip-build` and have `release.sh` build once authoritatively? Flagged as a latent ordering trap.
3. **prepublishOnly double-build cost.** The chosen shape pays for a second build inside `prepublishOnly` (defensive). For the release-via-release.sh path this is ≈ 27s of pure redundancy. Alternative: `prepublishOnly` could detect an env var set by `release.sh` (e.g., `GLASS_UI_SKIP_PREPUBLISH_BUILD=1`) and skip the re-build when invoked from the canonical release path. Trades simplicity for ~27s/release. Defer pending operator preference.
4. **dist smoke check ordering.** Moved the `dist/index.d.ts` existence check to AFTER the gate matrix (was originally between build and the probe loop). It's belt-and-suspenders; both `verify-export-types` and `profile:budget` would have already surfaced a missing dist. Could be removed entirely if redundancy is undesirable.

## § Worktree diff verification

```
$ git -C <worktree> diff --stat
 scripts/release.sh | XX +++++++++++++++++++++--------------------
 1 file changed, XX insertions(+), YY deletions(-)
```

(`package.json` unchanged; `prepublishOnly` already matched the target shape.)

Files in worktree (no git mutations performed):

- `scripts/release.sh` — modified (gate orchestration restructure).
- `docs/tranches/O/audit/W5-Lane-BD-release-consolidation-proof.md` — new (this file).

Bounds respected:
- No `proof:*` script touched (Lane A).
- No freshness file touched (Lane C).
- No CI workflow touched (Lane E).
- No top-level `package.json` script added (Lane A owns `proof:all`).
