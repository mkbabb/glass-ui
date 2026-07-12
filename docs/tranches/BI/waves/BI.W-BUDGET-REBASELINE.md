# BI.W-BUDGET-REBASELINE — profile:budget rebaseline (the enforced bundle floor)

Band B0 (cut-blocker). Born-RED at HEAD.

## Mandate

- **FAM-1** `profile:budget` FAIL ✔: "Bundle budget exceeded" — `aurora.js` gzip 64.12 KB over the 50 KB ceiling; `goo-blob` 36.43 KB at 129% of its ceiling (+725% drift per RECAP-2); unbaselined chunks. Disposition: W-BUDGET-REBASELINE.
- **H-9**: `profile:budget` FAILS while the cut claims readiness; an `--enforce` CI gate rides `--run full`.

## Design

`profile:budget` (`scripts/profile-bundle.mjs`, `--enforce` mode in CI, tagged `local/ci/release` in `gates.manifest.mjs:72`) is the standing bundle-weight floor. The failure is TWO classes:

1. **Legitimate capability growth** — the BB/BG viz + medium GLSL growth lifted named chunks past their prior ceiling (the CLAUDE.md `dist/aurora.js` 50000 lift precedent for the kuwahara medium). Where growth is the DECIDED identity (a shipped capability, not a leak), the ceiling is re-pinned WITH RATIONALE via `--rebaseline`.
2. **Real leaks** — a chunk that should NOT have grown (e.g. a value.js/color-math leaf reaching an eager graph it must not — the `critical-path-walk.mjs` arm). A leak is FIXED, never rebaselined.

This wave is SEQUENCED LATE within B0-adjacent scheduling — the rebaseline pins the TRUE post-drain, post-blob-rename byte weight. It must run AFTER `BI.W-BLOB-RENAME-LAND` (the `goo-blob`→`blob` chunk rename changes the chunk key + optional-peer inlining) and after the D-VIZ deletions land (concentric/dot-flow-field/dot-matrix drops remove chunks), else the pin captures a stale set. **Cut-precondition: `profile:budget --enforce` GREEN in `--run full`, every ceiling either MET or lifted with a recorded rationale.**

Clean break: no phantom "will-shrink-later" ceiling — a lifted ceiling carries its rationale IN the baseline JSON.

## Work

- `node scripts/profile-bundle.mjs --enforce` (`npm run profile:budget`) — run against the post-blob-rename, post-viz-deletion dist; enumerate every over-ceiling chunk.
- For each over-ceiling chunk: adjudicate leak-vs-capability. Fix leaks (the critical-path arm — the root barrel eager graph must reach ZERO of {WebGL substrate, GL shader strings, a value.js color-math leaf}). Re-pin capability ceilings via `--rebaseline` with a rationale line per lifted ceiling in the baseline file.
- Confirm the per-entry gzip ceilings on the four WebGL chunks (`profile:budget` critical-path-WEIGHT arm) are honest post-drain.
- `docs/tranches/BI/audit/W-BUDGET-REBASELINE-NOTE.md` — record each lifted ceiling + its capability rationale (the anti-phantom trail).

## Acceptance

Gate: **`profile:budget --enforce`** — GREEN at close (BORN-RED at HEAD: exit 1, aurora 64.12 KB > 50 KB, goo-blob 129%).

Clauses:
- B1 every chunk under its (possibly lifted) ceiling.
- B2 every lifted ceiling carries a recorded rationale (capability, not leak) — no silent lift.
- B3 the critical-path-WEIGHT arm GREEN: the root barrel eager graph reaches none of the four heavy leaves.
- Self-test bite: the existing `profile:budget` enforce mode reds on an over-ceiling chunk (its native contract); a synthetic +1 KB over a pinned ceiling must RED.

## π/DELTA

None — device-free bundle-weight gate; zero pixel change.

## Obligations

- **Sequencing**: MUST run after `BI.W-BLOB-RENAME-LAND` + the D-VIZ deletions (chunk-set stability). Flag to the orchestrator: this wave rebaselines LAST among the chunk-affecting B0/B5 waves; a re-run at the B10 close confirms the pin holds against the final tree.

## Dispositions

- Discharges **H-9** (profile:budget FAILS while the cut claims readiness). The `--enforce`-in-`--run full` enforcement is the standing floor; a future capability lift re-pins with rationale, never silently.
