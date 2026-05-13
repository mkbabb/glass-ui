# M tranche — residuals ledger (W4 close)

Named carry-forwards to N tranche OR fast-follow patches. Every accepted finding from the 7 M.W4 audit lanes either absorbed in W4 (this commit) OR is enumerated here with a named destination.

## In-W4 absorbed (closed during W4)

| Source | Finding | Disposition |
|---|---|---|
| γ doc-drift | W2.md status line still "pending" | Bumped to CLOSED `13e8d9e` |
| γ doc-drift | W3.md status line still "IN-PROGRESS" | Bumped to CLOSED `13e8d9e` |
| γ doc-drift | CLAUDE.md carousel substrate note outdated | Updated to reflect v1.0.4 full Carousel family on `/carousel` |
| ι integrity-sweep | 3 disclosed `git stash` violations (W2 Lane B + 2× W2 Lane C) | Orphan stash dropped at integration; precept LESSONS-LEARNED.md `46d6cfb` adds 4th-recurrence entry with two close-time enforcement vectors |

## Named-deferred to N tranche

| ID | Source | Finding | N destination | Reason for deferral |
|---|---|---|---|---|
| N-1 | β substrate-without-consumer | `/freshness` subpath: 0 consumers constellation-wide; V.W3 wire-claim ("W3 wave wires this into speedtest/vite.config.ts") never landed | N tranche: retire `/freshness` subpath OR formally wire ≥ 2 consumers | substrate-without-consumer retire is a v1.x substrate-delta; M already shipped v1.0.5 substrate batch; cleaner to bundle into N |
| N-2 | β substrate-without-consumer | `DiscoGlyph`: visual-load-bearing in Dock UI; 17 demo uses but 0 production-consumer adoption | N tranche: re-audit production adoption OR retire | needs production consumer evidence before retire decision |
| N-3 | β substrate-without-consumer | `useGlassAlpha`: 0 uses constellation-wide; possible orphan | N tranche: confirm internal usage OR retire from root barrel | needs internal-usage check |
| N-4 | δ idiomatic-gestalt + ι | 26 pre-existing typecheck errors in `demo/stories/data/timeline-{continuous,segmented}.vue` (AA.W1 commits) | N tranche fast-follow patch | NOT M-scope (AA tranche); orchestrator-only fix |
| N-5 | π visual-runtime + δ + ι | Dock-layer substrate regression flagged by W2 Lane C (NEW out-of-bounds finding); narrow-viewport overflow | N tranche fast-follow patch | NEW finding; needs investigation before disposition |
| N-6 | δ idiomatic-gestalt | Demo carousel + metaballs story import-path harmonisation (demo consumes internal SFC paths vs `/carousel` subpath canon) | N tranche fast-follow cosmetic | zero risk; cosmetic-only |
| N-7 | W3 Lane B doc cohort | Per-consumer CHANGELOG / MIGRATION proposals (keyframes.js + value.js publish status verification) | N tranche or per-consumer next-tranche | cross-repo + WIP-branch coordination required |
| N-8 | γ doc-drift (P3 cosmetic) | `_shared` package naming/role clarity | N tranche cosmetic | non-blocking |

## Cross-tranche debt (M → N inheritance)

Per the cross-repo commit policy (just reconciled at M.W0 Lane II): the 2 user-WIP-branch commits (keyframes.js `b788205` on `w.w2.1-keyframes-prebuild`; value.js commit on `w.w2.1-value-js-prebuild`) are owned by the user; M orchestrator does not push WIP branches. M FINAL.md cites these as cross-tranche-debt items for the user's next per-consumer tranche-letter to absorb.

Per the cross-repo commit policy: the bbnf-buddy commit `e06d629` is on master but the repo has no `origin` remote configured — local-only state. Documented; user owns the remote-creation decision.

## Verification

All 7 audit lanes returned with status CLEAN or NEEDS-ABSORB (γ + δ); γ findings absorbed in this W4 close; δ findings either absorbed or named-deferred (the deferrals are non-blocking informational items).

W4 close-clean criterion: no audit lane returned a P0 blocker that wasn't either (a) absorbed in W4 OR (b) named-deferred with destination + reason.

| Lane | Status | P0 count | In-W4 absorbed | Named-deferred |
|---|---|---|---|---|
| α plan-vs-actual | CLEAN | 0 | 0 | 0 |
| β substrate-without-consumer | NEEDS-DECISION | 0 | 0 | 3 (N-1, N-2, N-3) |
| γ doc-drift | NEEDS-ABSORB | 0 (5 P0 doc-only) | 3 | 0 |
| δ idiomatic-gestalt | CLEAN | 0 | 0 | 3 (N-4, N-5, N-6) |
| ε performance | PASS | 0 | 0 | 0 |
| π visual-runtime | PASS | 0 | 0 | 0 (the P2 dock-layer item is N-5) |
| ι integrity-sweep | CLEAN | 0 | 1 (LESSONS-LEARNED entry) | 0 |
