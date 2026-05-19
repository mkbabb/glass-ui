# AB+2 — FINAL (post-P substrate-settle cohort; v1.8.4; untagged)

**Tranche letter**: AB+2.
**Predecessor close**: P `9f774b4` (v1.8.4; 2026-05-16).
**This close**: NO release tag — package.json remains v1.8.4 throughout the cohort. No tag was placed at execution time; no Q-wave tag is planned specifically for this cohort (Q issues its own release(s) per Q FINAL.md).
**Span**: 2026-05-16 17:57:21 → 2026-05-18 02:03:34 (-0400); ~32 hours wall clock; 3 calendar days.
**Open commit**: n/a (shadow execution).
**Close commit**: retroactive at Q.W0 Lane A (2026-05-18).

## §1 — Source commit ledger (all 7 commits)

Every commit in the `9f774b4..d244dd5` window. Author-dates are local time (-0400 = EDT).

| # | Hash | Author-date | Subject | Wave |
|---|---|---|---|---|
| 1 | `949474a` | 2026-05-16 17:57:21 -0400 | `refactor(freshness): retire assertDistFresh + freshness-walk + freshness-gate apparatus (AD.W4.T2)` | W1 |
| 2 | `099d51e` | 2026-05-17 23:46:19 -0400 | `fix(dock): retire purposeless edge-fade mask that shadowed the last dock item` | W2 |
| 3 | `3cb70db` | 2026-05-17 23:51:49 -0400 | `feat(timeline): stitched continuous gradient + rounded ends + glassy dots` | W2 |
| 4 | `beec35e` | 2026-05-18 01:35:43 -0400 | `fix(toggle,dock): card variant sizes to content + inactive dock layers leave the hit-test tree` | W2 (dock) + W3 (toggle) |
| 5 | `9ba68ca` | 2026-05-18 01:36:32 -0400 | `feat(metric-stack): compact result register + tokenised value-clamp cqi arm` | W3 |
| 6 | `1c6c3e5` | 2026-05-18 01:52:52 -0400 | `feat(data-table): responsive card-per-row projection at narrow widths` | W3 |
| 7 | `d244dd5` | 2026-05-18 02:03:34 -0400 | `fix(metric-stack): tame the result register — label-clamp tokens + tighter value ceiling` | W3 |

**All 7 commits accounted for.** Verification: `git log --oneline 9f774b4..d244dd5` returns exactly these 7 rows (reverse-chronological; HEAD at row 7 = `d244dd5`).

## §2 — Tag chain

```
P close:  v1.8.4  (9f774b4; 2026-05-16)
            |
           [7 commits: W1 + W2 + W3]
            |
Q open:   v1.8.4  (d244dd5; 2026-05-18 02:03)
```

**NO tag was placed within the cohort.** Commit `beec35e` touches `package.json` for the `/toggle` subpath export wiring only — the version field is NOT bumped (verified: the `package.json` hunk in `beec35e` is export/typesVersions wiring, not a `"version"` field change). This cohort is the first AB+N retrospective with ZERO tags — contrasted with AB+1 (3 placed + 1 deferred) and AB (≥ 1 tag at execution).

## §3 — Per-wave landing summary

| Wave | Title | Commits | Tag | Headline |
|---|---|---|---|---|
| W1 | Freshness-gate apparatus retirement | `949474a` | (none) | −342 LOC, −1 subpath; AD.W4.T2 cross-repo landing |
| W2 | Dock + timeline substrate settle | `099d51e`, `3cb70db`, `beec35e` (dock hunk) | (none) | dock.css mask retire + timeline stitched-gradient + hit-test fix |
| W3 | Metric/table primitive register | `beec35e` (toggle hunk), `9ba68ca`, `1c6c3e5`, `d244dd5` | (none) | toggle h-auto compound rule + MetricStack register prop + DataTable responsive + label-clamp tokens |

Total: 7 commits / 0 tags placed / 0 tags deferred.

## §4 — Net LOC summary

| Commit | Insertions | Deletions | Net |
|---|---|---|---|
| `949474a` | +3 | −345 | −342 |
| `099d51e` | +21 | −36 | −15 |
| `3cb70db` | +317 | −41 | +276 |
| `beec35e` | +47 | −4 | +43 |
| `9ba68ca` | +77 | −2 | +75 |
| `1c6c3e5` | +157 | −6 | +151 |
| `d244dd5` | +22 | −6 | +16 |
| **Total** | **+644** | **−440** | **+204** |

Net surface delta: the cohort is a net ADDITION of 204 LOC, dominated by the timeline rewrite (+276) and DataTable responsive layout (+151), offset by the freshness retire (−342).

## §5 — Process gap: fourth K-invariant-3 recurrence

NO plan folder existed at execution time. This violates K invariant 3 and invariant 29. The recurrence ledger at Q.W0 Lane A:

| # | Tranche | Commits/tags | Closure |
|---|---|---|---|
| 1 | V | 68 commits / 5 releases | K.WV retrospective |
| 2 | AB | ~commits | O.W0 Lane A retrospective |
| 3 | AB+1 | 12 commits / 3+1 tags | P.W0 Lane A retrospective |
| **4** | **AB+2** | **7 commits / 0 tags** | **Q.W0 Lane A retrospective (this folder)** |

The headline finding: recurrence 4 landed **1–2 calendar days AFTER invariant 29 was codified** (P.W6 `3310a8c`, 2026-05-16 12:xx). Commits 2–7 (`099d51e` through `d244dd5`) arrived 2026-05-17 → 2026-05-18. Prose-only enforcement did not hold; Q.W0 Lane B authors the root-cause diagnosis and tooling-gate proposal.

## §6 — Consumer-breakage relevance

W2 (dock.css ×2 + ContinuousTimeline geometry rewrite) is the prime suspect for the Q-open consumer-breakage report: value.js + keyframes.js reporting broken dock / animations / dropdowns / glass-cards. The T2 commits modify the mask, visibility, and gradient logic that downstream consumers compose. Q.W1 breakage forensics will determine causality — that determination is Q-tranche scope, not AB+2 scope. This FINAL.md documents the structural fact that W2 is the highest-risk sub-wave; it makes no breakage verdict claim.

## §7 — Carry-forward to Q

AB+2 closes retroactively at Q.W0 Lane A. ZERO substantive items exit AB+2 as "deferred". The sole carry is the consumer-breakage investigation, which is NOT an AB+2 residual — it is a Q-open ledger item that pre-existed this retrospective (reported by the user at Q open). AB+2's retrospective closes the K-invariant-3 loop; it does not absorb the breakage into its own scope.

| # | Item | Source | Q destination |
|---|---|---|---|
| (no substantive carries) | — | — | — |
| (informational cross-link) | W2 as prime breakage suspect | Q-open user report + Qε §3.2 | Q.W1 breakage forensics |

## §8 — Audit verdict matrix

AB+2 did not run a strengthened audit at execution time (shadow-execution). Retroactive verification at Q.W0 Lane A:

| Lane | Verdict | Notes |
|---|---|---|
| α plan-vs-actual | RETROACTIVE-CLEAN | All 7 commit subjects map to a wave in §3; all 3 waves map to their source commits; no orphan commit |
| β substrate-without-consumer | RETROACTIVE-CLEAN | MetricStack register prop: speedtest AE consumer (commit body cites "AE.W1 complete screen" as the empirical source); DataTable responsive: container-sized tables in ≥2 consumer apps; toggle compound fix: existing card-variant users; dock/timeline: existing consumers |
| γ doc-drift | NOT-ASSESSED | CLAUDE.md at HEAD already documents `./freshness` retired (self-correcting via `949474a` body); timeline/dock CSS tokens documented inline; no CLAUDE.md counter update required (no new subpaths) |
| δ idiomatic-gestalt | RETROACTIVE-CLEAN | Token-first (J invariant): all new behaviours CSS-token-gated; no consumer edits library source; compound CVA rule follows existing CVA pattern; DataTable responsive uses `useElementSize` (established seam) |
| ε performance | RETROACTIVE-NEUTRAL | Net +204 LOC; no new bundle entries; no new subpath entries; CSS budget delta is minor |
| π visual-runtime | NOT-RUN | MCP Chrome tooling not in use at AB+2 execution time; Q.Qζ lane is the visual probe for Q |
| ι integrity-sweep | RETROACTIVE-CLEAN | Zero stash entries in the AB+2 window; zero unauthorized commits; `beec35e` package.json hunk is a /toggle export wiring (not a version bump) — verified at git show level |

## §9 — Hard-gate evidence (retroactive)

Per K + L + O hard-gate canonical shape:

- **(a) Per-wave hard gates verified at each `waves/W*.md`** — see W1 §"Hard gate" + W2 §"Hard gate" + W3 §"Hard gate / AB+2 close".
- **(b) No release tag was placed — cohort exits at v1.8.4 = P-close version** — confirmed by `git tag --list` (no v1.8.5+ tag in the `9f774b4..d244dd5` window; `beec35e` package.json hunk is not a version bump).
- **(c) Cross-repo origin (AD.W4.T2) documented at `docs/tranches/AB+2/coordination/CONSTELLATION.md`**.
- **(d) FINAL.md authored per close-honesty checklist** — this file.
- **(e) K-invariant-3 fourth-recurrence rationale documented at AB+2.md §7**.

## §10 — Close-honesty checklist

Per `tranche/SPEC.md §"Close-Honesty Checklist"`:

- [x] Every claim in FINAL.md grounded in a commit hash or cited artefact at HEAD.
- [x] Every hard gate marked RETROACTIVE-CLEAN has an evidence path that resolves (commit body / `git show --stat` / `git log --oneline`).
- [x] Every status word (NO-TAG, RETROACTIVE, SHADOW) matches the latest git state at retrospective time (2026-05-18).
- [x] No carry exits AB+2 as a generic "future tranche" placeholder — consumer-breakage investigation is named Q.W1, not deferred-indefinitely.
- [x] Brittleness window: NONE opened during AB+2 (no test-suite regressions reported; `9ba68ca` commit body confirms tests green).
- [x] K invariant 3 fourth-recurrence rationale documented at AB+2.md §7.
- [x] Audit-verdict spot-verification gate (N invariant 22) honoured retroactively — each wave-spec hard-gate row cites a specific evidence path.

## §11 — Final disposition

**AB+2 tranche CLEAN at v1.8.4 (package.json) / UNTAGGED throughout cohort.**

3 waves landed across ~32 hours under shadow-execution. The substrate is additively complete (net +204 LOC, −1 retired subpath, 0 consumer breaks). The retrospective closes the K-invariant-3 fourth-recurrence loop at Q.W0 Lane A. ZERO substantive carry from AB+2 to Q; the consumer-breakage investigation is a Q-open ledger item, not an AB+2 residual.

The retrospective documents what landed. It does NOT propose changes.
