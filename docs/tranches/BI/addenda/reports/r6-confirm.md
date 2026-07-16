# R6 · CONFIRM critic — light fold-regression pass (NON-AUTHOR, round 6)

Posture: round-6 CONFIRM gate, second of the two-consecutive-clean convergence. Round 5 was CLEAN
on both lenses (0 substantive); its four minor findings per lens (M1-M4 / r5-1..r5-4) were folded to
produce **v3.2**. Charge: confirm the fold landed with no regression and the artifact remains clean.
LIGHT pass — no full re-audit; but the clean verdict is honest (a surviving substantive defect ⇒ NOT
CLEAN). Fences honored: `/Users/mkbabb/Programming/glass-ui` READ-ONLY (read-only git/find only, zero
mutations, zero builds); my only write is this file. Every pin below is grounded in a command against
the live working tree (HEAD `e5b3a209`, the in-flight 7.0.0 transaction).

**Verdict: CLEAN.** All six mandated minor-folds landed and each verifies on disk. No fold broke a
cross-reference, contradicted a wave, or re-introduced a struck claim. The reworded Q033/Q040 lines
mint nothing. One residual note (registry supporting-doc pin not reconciled) — pre-existing, already
flagged in r5, non-load-bearing, not a regression.

---

## A · MINOR-FOLDS LANDED — verified in v3.2 + on disk

| fold | required landing | v3.2 location | disk verification | verdict |
|---|---|---|---|---|
| **M2** (C-5 pin :29+:31) | Q050 cites both MIGRATION rows | plan:181 "(MIGRATION.md:29 + :31 — one row each; line pins drift under the transaction; both live-deleted)" | `sed -n '27,33p' MIGRATION.md`: **:29** = `SplitChars`/`useCharStagger` row; **:31** = standalone `Toggle` row. Exact. | **FOLDED** ✓ |
| **M3 / r5-2** (header stamp) | header → v3.2, rounds 3-5; no stale dup | plan:1 "(v3.2, post rounds 3–5; the placement artifact)" | `grep -nE 'v3\b\|v3\.1\|round-[34]'` → **only** line 1 (v3.2). The duplicate v3 stamp r5 flagged is gone. | **FOLDED** ✓ |
| **M4** (Q041 ~100/~60%) | soften collision framing | plan:142-144 "the ~100 carrier files overlap heavily with the 125 M demo files … (~60% at the R5 census); a second pass would collide" | demo `^ M` = **125** (exact); ~100/~60% is the softened form r5-M4 recommended (~101 sweep, ~62% subset). | **FOLDED** ✓ |
| **r5-1** (Q033+Q040 already-staged-VERIFY) | reframe deletes → verify-already-staged | Q033 plan:124 "deletions ALREADY STAGED ' D' … VERIFY at their commit boundary, else delete"; Q040 plan:137 "no-masking-manifest.mjs: deletion ALREADY STAGED … ratified" | `git status`: `audit-stash-list.mjs` ` D`, `worktree-gc.mjs` ` D`, `no-masking-manifest.mjs` ` D`; `reflect-capture-verify.mjs` ` M` (LIVE, KEEP). | **FOLDED** ✓ |
| **r5-3** (Q032 44-file re-pin) | true count + re-pin note | plan:115-116 "re-pin the file list at execution; **44** .ts at the R5 recount" | `find src/composables/motion -name '*.ts'` = **44**. | **FOLDED** ✓ |
| **r5-4** (C-6 by ID; C-2/G-4 tag) | name C-6 in Q050; tag the sweep | Q050 plan:183 "**C-6 dock-evolution rows dispositioned by distribution, named here for legibility**"; Q002 plan:49 "**the C-2/G-4 verify sweep**" | matches registry C-6 (:103) distribution + G-4 (:150) P117-verify routing. | **FOLDED** ✓ |

**M1** (inbox-note husk 15→13) — correctly DEFERRED-BY-DESIGN to the final-placement amendment; the
plan already carries **13** (Q033 plan:130), which disk confirms. Not a finding. ✓

## B · NO REGRESSION — folded edits vs neighbors

- **Q050 bullet list** intact and consistent: C-5 row (plan:180-182) and C-6 row (plan:183-185) sit
  cleanly among the A1/A2 · D1/D2 · E1/C1 · AX-cluster · F1+G1 · PROVENANCE-RATIFY bullets; no list
  structure broken, no adjacent disposition contradicted. C-5 "both live-deleted" holds on disk:
  `split-chars/{README.md,SplitChars.vue,index.ts}` + `toggle/{Toggle.vue,index.ts}` all ` D`.
- **Q033 / Q040** verify-language reframes do not conflict: Q033 keeps `reflect-capture-verify.mjs`
  (` M`, LIVE) while marking the two orphans + manifest already-staged; Q040 relocates the masking
  LAW to Q003 F-4 + review, so nothing is orphaned by the manifest delete. The old Q040 conditional
  ("unless codex proves a catch-record") is fully removed — no lingering husk of it.
- **Q041** header (~100/~60% collision estimate) vs body (105 .d.ts + 4 shader + 259 demo comments /
  97 files scrub scope) describe the demo-carrier population two ways (≈100 sweep vs 97 census) — an
  approximate collision hedge over a precise scrub scope, not a contradiction. Acceptance stays "the
  one-time RED→GREEN grep differential … NO standing grep," so counts are explicitly non-binding.
- **Q032** "7 buckets" (spring/scroll/number/reveal/pointer/morph+selection/core) + "44 .ts" — the
  struck D-3 "43 files/6-way" is NOT re-introduced; the corrected 44/7 stands.
- **Q002** C-2/G-4 sweep roster unchanged otherwise; E-3 fonts-glob look and the disease-carrier SHAs
  all still present.
- **No struck claim resurrected:** eyeglass treated as delivered pill-default (Q020 addresses the
  unconsumed *spring* / static-only loupe = H-3, not the struck "absent" C-4/F-3); muster/words
  "NO glass dep — R1 fabrication, corrected" (Q060 plan:226). ✓

## C · GATE-RULING SPOT-CHECK — Q033/Q040 mint nothing

- **Q033**: "VERIFY at their commit boundary, else delete" + "KEEP" + "rmdir or ignore (git won't
  ship them)" — verify/delete language, no script, no probe, no census tool, no CI line. ✓
- **Q040**: "One page, not a runner"; invariants.json → DESCRIPTIVE CANON (no engine); manifest
  deletion ratified; masking law → review + Q003 F-4; structure enforcement = the build's own
  fail-closed classification + review language. Deletes/relabels — mints nothing. ✓

Both honor the ⚖ gate ruling (plan:21-29): standing checks = typecheck · build · unit tests only.

## D · FRESH-EYES SKIM — whole plan

One pass over all 277 lines. Held under refutation:
- Wave count reconciles: bands 1-8 = 2+1+4+4+4+2+2+1 = **20**; Band 9 = recalled/banked (Q080
  retracted, Q081 banked, 0 active waves) — "8 bands" of waves is accurate.
- Every wave carries a SEQ tag; GATE waves (Q021/Q051) route the ruling to Q051; Q021's row lives in
  Q051 item 1 (fission). Consistent.
- Q051 roster = 17 items incl. item 14 completion/border-progress and item 17 struck Q080. Recap
  spans a-n (14 mappings). Do-not-relitigate + inbox-note sections intact.
- No dead-wave live dependency: Q022/Q034/Q061/Q062/Q071/Q072/Q080/Q081 appear only as fold/absorb
  provenance.

**Residual note (not a regression, not substantive):** REGISTRY.md's C-5 row (:102) still cites
"MIGRATION.md:**31**" only, and the R2-corrections block (:19-21) still cites "MIGRATION.md:**23,25**"
— stale supporting-doc pins that the M2 fold updated in the *plan* (now correctly :29+:31) but did not
reconcile in the registry. This is exactly the pre-existing imprecision r5-fixes M2 already flagged as
minor; the plan is the authoritative placement artifact and is now correct, git line-pins drift under
the live transaction anyway, and no executor action turns on the registry cite. Recorded for the
final-placement sweep; not a convergence blocker.

---

## VERIFICATIONS THAT HELD (genuine break attempts)

- All six mandated folds landed in v3.2 **and** verify on disk (MIGRATION :29/:31; motion 44;
  husks 13; demo M 125; three orphan scripts ` D`; reflect-capture-verify ` M`; split-chars+toggle
  5 files ` D`; border-progress file-less).
- No stale version string survives (only v3.2 on line 1).
- Q033/Q040 reworded lines mint no standing check — gate ruling honored.
- No struck claim (eyeglass-absent, muster/words, 43/6-way motion) re-introduced.
- Q050 bullet list, Q041, Q032, Q002 all consistent with neighbors after the fold.

## Bottom line

**CLEAN.** Substantive (major/moderate) findings surviving refutation: **0**. All six round-5 minor
folds landed and verify against the live tree; the fold introduced no regression; the reworded lines
mint nothing. The sole residue is a pre-existing registry supporting-doc pin the plan already
supersedes — a final-placement hygiene touch-up, not a defect. This is the second-consecutive-clean
confirmation; the convergence closes.
